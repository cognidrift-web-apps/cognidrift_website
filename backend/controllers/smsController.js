import twilio from 'twilio';
import Conversation from '../models/Conversation.js';
import { getAIResponse, detectCallRequest } from '../services/llmService.js';
import { ConversationManager } from '../services/conversationManager.js';
import axios from 'axios';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Initiate Retell call when user requests phone call
 */
async function initiateRetellCall(phoneNumber, smsContext, messageId) {
  try {
    console.log(`📞 Initiating Retell call to ${phoneNumber}...`);

    const response = await axios.post(
      'https://api.retellai.com/v2/create-phone-call',
      {
        agent_id: process.env.RETELL_AGENT_ID,
        from_number: process.env.TWILIO_PHONE_NUMBER,
        to_number: phoneNumber,
        metadata: {
          sms_context: smsContext,
          message_id: messageId,
          initiated_from: 'sms_conversation',
          timestamp: new Date().toISOString()
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`✅ Call initiated. Call ID: ${response.data.call_id}`);
    return response.data;

  } catch (error) {
    console.error('❌ Retell call error:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Handle incoming SMS - Main Controller
 */
export async function handleIncomingSMS(req, res) {
  try {
    const { From: phoneNumber, Body: messageContent, MessageSid } = req.body;

    console.log(`📩 SMS from ${phoneNumber}: ${messageContent}`);

    // Step 1: Find or create conversation
    let conversation = await Conversation.findOne({ phoneNumber });
    
    if (!conversation) {
      conversation = new Conversation({
        phoneNumber,
        messages: [],
        status: 'active',
        metadata: {}
      });
      console.log(`🆕 New conversation started for ${phoneNumber}`);
    }

    // Step 2: Add user message to history
    conversation.messages.push({
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    });
    conversation.lastMessageAt = new Date();

    // Step 3: Check if user wants a phone call
    const wantsCall = detectCallRequest(messageContent);

    if (wantsCall) {
      console.log(`📞 Call requested by ${phoneNumber}`);
      
      // Send confirmation SMS
      const confirmationMessage = "Perfect! Calling you now... 📞";
      
      await twilioClient.messages.create({
        body: confirmationMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      // Add assistant confirmation to history
      conversation.messages.push({
        role: 'assistant',
        content: confirmationMessage,
        timestamp: new Date()
      });
      
      conversation.status = 'call_requested';
      if (!conversation.metadata) conversation.metadata = {};
      conversation.metadata.callRequested = true;
      conversation.metadata.callScheduledAt = new Date();
      
      await conversation.save();

      // Get optimized context for Retell
      const conversationContext = await ConversationManager.getCallContext(conversation);

      // Trigger Retell call after 2 seconds
      setTimeout(async () => {
        try {
          await initiateRetellCall(phoneNumber, conversationContext, MessageSid);
        } catch (error) {
          console.error('Failed to initiate call:', error);
          // Send error SMS
          await twilioClient.messages.create({
            body: "Sorry, I couldn't connect the call right now. Please try again or text us back.",
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
          });
        }
      }, 2000);

      // Send TwiML response
      const twiml = new twilio.twiml.MessagingResponse();
      res.type('text/xml');
      res.send(twiml.toString());

    } else {
      // Step 4: Generate AI response using LLM
      const aiResponse = await getAIResponse(conversation);

      console.log(`🤖 AI Response: ${aiResponse}`);

      // Step 5: Send SMS response
      await twilioClient.messages.create({
        body: aiResponse,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });

      // Step 6: Save assistant response to history
      conversation.messages.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });

      await conversation.save();

      // Archive old messages if conversation is too long
      await ConversationManager.archiveOldMessages(conversation);

      // Send TwiML response
      const twiml = new twilio.twiml.MessagingResponse();
      res.type('text/xml');
      res.send(twiml.toString());
    }

  } catch (error) {
    console.error('❌ SMS handling error:', error);
    
    // Send error SMS
    try {
      await twilioClient.messages.create({
        body: "Sorry, I'm having technical difficulties. Please try again in a moment.",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.From
      });
    } catch (smsError) {
      console.error('Failed to send error SMS:', smsError);
    }

    // Send TwiML response even on error
    const twiml = new twilio.twiml.MessagingResponse();
    res.type('text/xml');
    res.send(twiml.toString());
  }
}

/**
 * Get conversation history (for debugging/dashboard)
 */
export async function getConversationHistory(req, res) {
  try {
    const { phoneNumber } = req.params;
    
    // Format phone number if needed
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    const conversation = await Conversation.findOne({ 
      phoneNumber: { $in: [phoneNumber, formattedPhone] }
    });
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      phoneNumber: conversation.phoneNumber,
      status: conversation.status,
      messageCount: conversation.messages.length,
      archivedCount: conversation.archivedMessageCount || 0,
      summary: conversation.summary,
      messages: conversation.messages,
      lastMessageAt: conversation.lastMessageAt,
      stats: ConversationManager.getStats(conversation)
    });

  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get all conversations (for dashboard)
 */
export async function getAllConversations(req, res) {
  try {
    const conversations = await Conversation.find()
      .select('phoneNumber status messages lastMessageAt summary metadata')
      .sort({ lastMessageAt: -1 })
      .limit(50);

    res.json({
      count: conversations.length,
      conversations: conversations.map(conv => ({
        phoneNumber: conv.phoneNumber,
        status: conv.status,
        messageCount: conv.messages.length,
        lastMessage: conv.messages[conv.messages.length - 1]?.content || '',
        lastMessageAt: conv.lastMessageAt,
        hasSummary: !!conv.summary
      }))
    });

  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: error.message });
  }
}

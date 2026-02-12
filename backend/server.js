import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import Customer from './models/Customer.js';
import Callback from './models/Callback.js';
import Conversation from './models/Conversation.js';
import { handleIncomingSMS, getConversationHistory, getAllConversations } from './controllers/smsController.js';
import {
  authMiddleware,
  login,
  getStats,
  getConversations,
  getConversation,
  getCustomers,
  getCallbacks,
  updatePassword
} from './controllers/dashboardController.js';
import { submitContactForm, getContacts, updateContactStatus } from './controllers/contactController.js';
import WidgetChatHistory from './models/WidgetChatHistory.js';
import { generateWidgetResponse } from './services/widgetLLMService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Check required environment variables
const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'RETELL_API_KEY',
  'RETELL_AGENT_ID',
  'MONGODB_URI',
  'OPENAI_API_KEY'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please set them in Railway dashboard or your .env file');
  process.exit(1);
}

// Twilio client initialization
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for active calls (use Redis/Database in production)
const activeCalls = new Map();
const callHistory = [];

// ============================================
// UTILITY FUNCTIONS
// ============================================

function logInfo(message, data = {}) {
  console.log(`ℹ️  ${message}`, data);
}

function logError(message, error) {
  console.error(`❌ ${message}`, error);
}

function logSuccess(message, data = {}) {
  console.log(`✅ ${message}`, data);
}

// ============================================
// 1. SMS WEBHOOK - Intelligent LLM Conversation
// ============================================
app.post('/webhook/sms', handleIncomingSMS);

// ============================================
// 1.1 GET CONVERSATION HISTORY
// ============================================
app.get('/api/conversation/:phoneNumber', getConversationHistory);

// ============================================
// 1.2 GET ALL CONVERSATIONS
// ============================================
app.get('/api/conversations', getAllConversations);

// ============================================
// 2. INITIATE RETELL AI CALL
// ============================================
async function initiateRetellCall(toNumber, smsContent, messageId) {
  try {
    logInfo('Initiating Retell call', { to: toNumber });

    // Create phone call via Retell AI API
    const response = await axios.post(
      'https://api.retellai.com/v2/create-phone-call',
      {
        agent_id: process.env.RETELL_AGENT_ID,
        from_number: process.env.TWILIO_PHONE_NUMBER,
        to_number: toNumber,
        metadata: {
          sms_content: smsContent,
          message_id: messageId,
          initiated_from: 'sms',
          timestamp: new Date().toISOString()
        },
        retell_llm_dynamic_variables: {
          customer_name: 'Valued Customer',
          sms_message: smsContent
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const callId = response.data.call_id;
    
    // Store active call information
    activeCalls.set(callId, {
      phoneNumber: toNumber,
      smsContent,
      messageId,
      startTime: new Date(),
      status: 'initiated'
    });

    logSuccess('Call initiated', { callId, to: toNumber });

    return { success: true, callId };

  } catch (error) {
    logError('Error initiating Retell call', error.response?.data || error.message);
    throw error;
  }
}

// ============================================
// 3. RETELL CUSTOM FUNCTION WEBHOOK
// ============================================
app.post('/webhook/retell-function', async (req, res) => {
  try {
    const { call_id, function_name, arguments: functionArgs } = req.body;

    logInfo('Retell function called', { callId: call_id, function: function_name, args: functionArgs });

    let result = {};

    switch (function_name) {
      case 'send_sms':
      case 'send_smsmessage':
        try {
          const { to, message } = functionArgs;
          
          if (!to || !message) {
            result = {
              success: false,
              error: 'Phone number and message are required'
            };
            break;
          }

          const smsResponse = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
          });

          // Update call data
          const callData = activeCalls.get(call_id);
          if (callData) {
            if (!callData.smsSent) callData.smsSent = [];
            callData.smsSent.push({
              messageSid: smsResponse.sid,
              message,
              timestamp: new Date()
            });
          }

          logSuccess('SMS sent via function', { messageSid: smsResponse.sid, to });

          result = {
            success: true,
            messageSid: smsResponse.sid,
            message: 'SMS sent successfully'
          };
        } catch (error) {
          logError('Error in send_sms function', error);
          result = {
            success: false,
            error: error.message
          };
        }
        break;

      default:
        result = {
          success: false,
          error: `Unknown function: ${function_name}`
        };
    }

    // Return result to Retell
    res.json({ result });

  } catch (error) {
    logError('Retell function webhook error', error);
    res.status(500).json({
      result: {
        success: false,
        error: 'Internal server error'
      }
    });
  }
});

// ============================================
// 4. CALL STATUS WEBHOOK
// ============================================
app.post('/webhook/call-status', async (req, res) => {
  try {
    const { call_id, call_status, call_analysis, transcript } = req.body;

    logInfo('Call status update', { callId: call_id, status: call_status });

    const callData = activeCalls.get(call_id);

    if (callData) {
      callData.status = call_status;
      callData.lastUpdate = new Date();

      if (call_status === 'ended') {
        callData.endTime = new Date();
        callData.duration = Math.floor((callData.endTime - callData.startTime) / 1000);
        callData.analysis = call_analysis;
        callData.transcript = transcript;

        // Move to history
        callHistory.push({
          type: 'call',
          ...callData
        });

        // Remove from active calls
        activeCalls.delete(call_id);

        logSuccess('Call ended', { 
          callId: call_id, 
          duration: `${callData.duration}s`,
          phone: callData.phoneNumber 
        });
      }
    }

    res.sendStatus(200);

  } catch (error) {
    logError('Call status webhook error', error);
    res.status(500).send('Error processing call status');
  }
});

// ============================================
// 4. SEND SMS DURING CALL (Custom Function)
// ============================================
app.post('/api/send-sms-during-call', async (req, res) => {
  try {
    const { to, message, callId } = req.body;

    if (!to || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and message are required' 
      });
    }

    logInfo('Sending SMS during call', { to, callId });

    const smsResponse = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    // Update call data
    const callData = activeCalls.get(callId);
    if (callData) {
      if (!callData.smsSent) callData.smsSent = [];
      callData.smsSent.push({
        messageSid: smsResponse.sid,
        message,
        timestamp: new Date()
      });
    }

    logSuccess('SMS sent during call', { 
      messageSid: smsResponse.sid, 
      to 
    });

    res.json({
      success: true,
      messageSid: smsResponse.sid,
      message: 'SMS sent successfully'
    });

  } catch (error) {
    logError('Error sending SMS', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// 5. SCHEDULE CALLBACK
// ============================================
app.post('/api/schedule-callback', async (req, res) => {
  try {
    const { phoneNumber, datetime, reason, timezone = 'Asia/Dhaka', callId } = req.body;

    if (!phoneNumber || !datetime || !reason) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number, datetime, and reason are required' 
      });
    }

    logInfo('Scheduling callback', { phoneNumber, datetime, reason });

    const callbackId = `cb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const callbackData = {
      callbackId,
      phoneNumber,
      datetime,
      reason,
      timezone,
      callId,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Save to MongoDB
    const callback = new Callback(callbackData);
    await callback.save();

    // Also add to in-memory storage for backwards compatibility
    callHistory.push({
      type: 'callback_scheduled',
      ...callbackData
    });

    logSuccess('Callback scheduled and saved to database', callbackData);

    res.json({
      success: true,
      callbackId,
      scheduledTime: datetime,
      message: `Callback scheduled for ${new Date(datetime).toLocaleString('en-US', { timeZone: timezone })}`,
      saved: true
    });

  } catch (error) {
    logError('Error scheduling callback', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// 6. SAVE CUSTOMER INFO
// ============================================
app.post('/api/save-customer-info', async (req, res) => {
  try {
    const { phoneNumber, name, email, interest, notes, callId } = req.body;

    if (!phoneNumber || !name) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and name are required' 
      });
    }

    logInfo('Saving customer info', { name, phoneNumber });

    const customerId = `cust_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const customerData = {
      customerId,
      phoneNumber,
      name,
      email,
      interest,
      notes,
      callId,
      createdAt: new Date().toISOString(),
      source: 'sms_to_call'
    };

    // Save to MongoDB
    const customer = new Customer(customerData);
    await customer.save();

    // Also add to in-memory storage for backwards compatibility
    callHistory.push({
      type: 'customer_info',
      ...customerData
    });

    logSuccess('Customer info saved to database', customerData);

    res.json({
      success: true,
      customerId,
      message: 'Customer information saved successfully',
      saved: true
    });

  } catch (error) {
    logError('Error saving customer info', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// 7. MANUAL CALL TRIGGER (For Testing)
// ============================================
app.post('/api/trigger-call', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number is required' 
      });
    }

    logInfo('Manual call trigger', { to: phoneNumber });

    const result = await initiateRetellCall(
      phoneNumber, 
      message || 'Manual test call', 
      'manual-trigger'
    );

    res.json({
      success: true,
      message: 'Call initiated successfully',
      callId: result.callId
    });

  } catch (error) {
    logError('Error triggering manual call', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// 9. GET ACTIVE CALLS
// ============================================
app.get('/api/active-calls', (req, res) => {
  const calls = Array.from(activeCalls.entries()).map(([callId, data]) => ({
    callId,
    ...data
  }));

  res.json({
    success: true,
    count: calls.length,
    calls
  });
});

// ============================================
// 10. GET CALL HISTORY
// ============================================
app.get('/api/call-history', (req, res) => {
  const limit = parseInt(req.query.limit) || 50;
  const history = callHistory.slice(-limit).reverse();

  res.json({
    success: true,
    count: history.length,
    history
  });
});

// ============================================// 6. SCHEDULE CALLBACK
// ============================================
app.post('/api/schedule-callback', async (req, res) => {
  try {
    const { phoneNumber, datetime, reason, timezone, callId } = req.body;

    if (!phoneNumber || !datetime || !reason) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number, datetime, and reason are required' 
      });
    }

    const callbackId = `cb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const callbackData = {
      callbackId,
      phoneNumber,
      datetime,
      reason,
      timezone: timezone || 'Asia/Dhaka',
      callId,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // TODO: Save to database
    // await db.callbacks.insert(callbackData);
    
    // TODO: Schedule actual callback with cron job or scheduler
    // Example: schedule(datetime, () => initiateRetellCall(phoneNumber, reason))

    logSuccess('Callback scheduled', callbackData);

    res.json({
      success: true,
      callbackId,
      scheduledTime: datetime,
      message: `Callback scheduled for ${new Date(datetime).toLocaleString('en-US', { timeZone: timezone || 'Asia/Dhaka' })}`
    });

  } catch (error) {
    logError('Error scheduling callback', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// 7. SAVE CUSTOMER INFO
// ============================================
app.post('/api/save-customer-info', async (req, res) => {
  try {
    const { phoneNumber, name, email, interest, notes, callId } = req.body;

    if (!phoneNumber || !name) {
      return res.status(400).json({ 
        success: false, 
        error: 'Phone number and name are required' 
      });
    }

    const customerId = `cust_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const customerData = {
      customerId,
      phoneNumber,
      name,
      email: email || null,
      interest: interest || null,
      notes: notes || null,
      callId,
      source: 'sms_to_call',
      createdAt: new Date().toISOString()
    };

    // ⚠️ TODO: Save to your database
    // Examples:
    // MongoDB: await Customer.create(customerData);
    // PostgreSQL: await db.query('INSERT INTO customers...', customerData);
    // Firebase: await db.collection('customers').add(customerData);
    // Airtable: await base('Customers').create([{fields: customerData}]);
    
    logSuccess('Customer info saved (in memory)', customerData);
    
    // For now, just log it - you can add to callHistory
    callHistory.push({
      type: 'customer_info',
      ...customerData
    });

    res.json({
      success: true,
      customerId,
      message: 'Your information has been saved successfully.'
    });

  } catch (error) {
    logError('Error saving customer info', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================
// CHAT WIDGET API ROUTES
// ============================================

/**
 * POST /api/widget/chat
 * Send a message and get AI response
 */
app.post('/api/widget/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        error: 'Missing required fields: sessionId and message'
      });
    }

    // Find or create chat history for this session
    let chatHistory = await WidgetChatHistory.findOne({ sessionId });

    if (!chatHistory) {
      chatHistory = new WidgetChatHistory({
        sessionId,
        messages: []
      });
    }

    // Add user message to history
    chatHistory.messages.push({
      role: 'user',
      content: message
    });

    // Get AI response using conversation history
    const aiResponse = await generateWidgetResponse(chatHistory.messages);

    // Add AI response to history
    chatHistory.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    // Save to database
    await chatHistory.save();

    logSuccess('Widget chat message processed', { sessionId });

    res.json({
      success: true,
      response: aiResponse,
      sessionId: sessionId
    });

  } catch (error) {
    logError('Widget Chat Error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
});

/**
 * GET /api/widget/chat/:sessionId
 * Get chat history for a session
 */
app.get('/api/widget/chat/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const chatHistory = await WidgetChatHistory.findOne({ sessionId });

    if (!chatHistory) {
      return res.json({
        sessionId,
        messages: []
      });
    }

    res.json({
      sessionId: chatHistory.sessionId,
      messages: chatHistory.messages,
      createdAt: chatHistory.createdAt,
      updatedAt: chatHistory.updatedAt
    });

  } catch (error) {
    logError('Get Widget History Error:', error);
    res.status(500).json({
      error: 'Failed to get chat history'
    });
  }
});

/**
 * DELETE /api/widget/chat/:sessionId
 * Clear chat history for a session
 */
app.delete('/api/widget/chat/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    await WidgetChatHistory.deleteOne({ sessionId });

    res.json({
      success: true,
      message: 'Chat history cleared'
    });

  } catch (error) {
    logError('Delete Widget History Error:', error);
    res.status(500).json({
      error: 'Failed to clear chat history'
    });
  }
});

// ============================================
// CONTACT FORM API ROUTES
// ============================================

// Public - Submit contact form (no auth required)
app.post('/api/contact', submitContactForm);

// Protected - Get all contacts (dashboard)
app.get('/api/contacts', authMiddleware, getContacts);

// Protected - Update contact status (dashboard)
app.patch('/api/contacts/:id', authMiddleware, updateContactStatus);

// ============================================
// DASHBOARD API ROUTES
// ============================================

// Dashboard Login (no auth required)
app.post('/api/dashboard/login', login);

// Protected Dashboard Routes
app.get('/api/dashboard/stats', authMiddleware, getStats);
app.get('/api/dashboard/conversations', authMiddleware, getConversations);
app.get('/api/dashboard/conversation/:phoneNumber', authMiddleware, getConversation);
app.get('/api/dashboard/customers', authMiddleware, getCustomers);
app.get('/api/dashboard/callbacks', authMiddleware, getCallbacks);
app.put('/api/dashboard/password', authMiddleware, updatePassword);

// ============================================
// WEB CALL API - Create web call for website voice chat
// ============================================
app.post('/api/create-web-call', async (req, res) => {
  try {
    logInfo('Creating web call for website voice chat');

    const response = await axios.post(
      'https://api.retellai.com/v2/create-web-call',
      {
        agent_id: process.env.RETELL_AGENT_ID,
        metadata: {
          source: 'website',
          initiated_from: 'web_widget',
          timestamp: new Date().toISOString()
        },
        retell_llm_dynamic_variables: {
          customer_name: 'Website Visitor'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    logSuccess('Web call created', { callId: response.data.call_id });

    res.json({
      success: true,
      access_token: response.data.access_token,
      call_id: response.data.call_id
    });

  } catch (error) {
    logError('Error creating web call', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || error.message
    });
  }
});

// ============================================
// 10. HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
  const isConfigured = !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.RETELL_API_KEY &&
    process.env.RETELL_AGENT_ID
  );

  res.json({
    status: 'healthy',
    configured: isConfigured,
    activeCalls: activeCalls.size,
    totalHistory: callHistory.length,
    timestamp: new Date().toISOString(),
    webhooks: {
      sms: `${process.env.WEBHOOK_BASE_URL}/webhook/sms`,
      callStatus: `${process.env.WEBHOOK_BASE_URL}/webhook/call-status`
    }
  });
});

// ============================================
// ROOT ENDPOINT
// ============================================
app.get('/', (req, res) => {
  res.json({
    message: '🤖 CogniDrift SMS-to-Call Agent API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      smsWebhook: '/webhook/sms',
      callStatusWebhook: '/webhook/call-status',
      sendSms: '/api/send-sms-during-call',
      scheduleCallback: '/api/schedule-callback',
      saveCustomerInfo: '/api/save-customer-info',
      triggerCall: '/api/trigger-call',
      activeCalls: '/api/active-calls',
      history: '/api/call-history',
      dashboard: {
        login: '/api/dashboard/login',
        stats: '/api/dashboard/stats',
        conversations: '/api/dashboard/conversations',
        customers: '/api/dashboard/customers',
        callbacks: '/api/dashboard/callbacks'
      }
    },
    dashboard: '/dashboard/index.html',
    documentation: 'See README.md for setup instructions'
  });
});

// ============================================
// ERROR HANDLING
// ============================================
app.use((err, req, res, next) => {
  logError('Unhandled error', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log('   CogniDrift SMS-to-Call Agent Server');
  console.log('========================================\n');
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Base URL: ${process.env.WEBHOOK_BASE_URL}`);
  console.log(`\n📱 Webhooks:`);
  console.log(`   SMS: ${process.env.WEBHOOK_BASE_URL}/webhook/sms`);
  console.log(`   Call: ${process.env.WEBHOOK_BASE_URL}/webhook/call-status`);
  console.log(`\n🔧 API Endpoints:`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Trigger: http://localhost:${PORT}/api/trigger-call`);
  console.log(`\n📊 Dashboard API Ready`);
  console.log(`   Default Password: cognidrift2024`);
  console.log(`   Deploy dashboard folder to Vercel`);
  console.log(`\n✨ Ready to receive SMS and make calls!\n`);
});

export default app;

import OpenAI from 'openai';
import { ConversationManager } from './conversationManager.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the AI
const SYSTEM_PROMPT = `You are CogniDrift AI assistant, helping customers via SMS.

Your capabilities:
- Answer questions about CogniDrift AI receptionist service
- Help with scheduling demos
- Provide pricing information
- Explain features and benefits
- Share booking links for appointments

Important Instructions:
1. Keep SMS responses SHORT (1-2 sentences, max 160 characters when possible)
2. Be conversational and friendly
3. If customer wants to schedule a demo/meeting, share: https://cal.com/cognidrift-llc-alefpr
4. If customer wants to talk on phone, respond: "I'd love to call you! Just reply 'call me' and I'll ring you right away 📞"
5. If customer says "call me", "call now", "phone me", respond: "Great! Calling you now... 📞"
6. Use emojis sparingly (max 1-2 per message)
7. Ask one question at a time
8. Remember conversation context (summary provided when available)

About CogniDrift:
- 24/7 AI phone receptionist
- Never miss calls/leads
- Integrates with calendars & CRMs
- Pricing: Custom based on call volume
- Demo: Free 15-minute demo available
- Book demo: https://cal.com/cognidrift-llc-alefpr

When to share booking link:
- Customer asks about "demo", "meeting", "appointment", "schedule", "book"
- Example: "I'd love to show you! Book a quick demo here: https://cal.com/cognidrift-llc-alefpr 📅"
- Example: "Sure! Pick a time that works: https://cal.com/cognidrift-llc-alefpr"
`;

/**
 * Detect if user wants a phone call
 */
export function detectCallRequest(message) {
  const callKeywords = [
    'call me', 'call now', 'phone me', 'ring me',
    'talk on phone', 'speak to someone', 'want a call',
    'need to talk', 'call please', 'phone call',
    'give me a call', 'can you call'
  ];
  
  const lowerMessage = message.toLowerCase();
  return callKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Main function - Uses ConversationManager for context optimization
 */
export async function getAIResponse(conversation) {
  // Get optimized context (with summarization if needed)
  const optimizedContext = await ConversationManager.getOptimizedContext(conversation);
  
  console.log(`📊 Context size: ${optimizedContext.length} messages`);
  
  return await generateResponseOpenAI(optimizedContext);
}

/**
 * Generate response using OpenAI GPT-4
 */
export async function generateResponseOpenAI(conversationHistory) {
  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add summary if present in first message
    if (conversationHistory[0]?.role === 'system') {
      messages.push({
        role: 'system',
        content: conversationHistory[0].content
      });
    }

    // Add conversation messages
    messages.push(
      ...conversationHistory
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }))
    );

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages,
      max_tokens: 150,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('❌ OpenAI Error:', error);
    throw error;
  }
}

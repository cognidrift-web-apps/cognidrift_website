import OpenAI from 'openai';
import { ConversationManager } from './conversationManager.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt for the AI
const SYSTEM_PROMPT = `You are **CogniDrift AI assistant**, helping customers via SMS.

**Your capabilities:**
- Answer questions about CogniDrift AI receptionist service
- Help with scheduling demos
- Provide pricing information
- Explain features and benefits
- Share booking links for appointments

**CRITICAL SMS Rules:**
1. **ULTRA SHORT** responses (1 sentence, max 100 characters)
2. **Be friendly** and conversational
3. **One question** at a time only
4. **Max 1 emoji** per message
5. **No long explanations** - keep it brief!

**Phone Call Triggers:**
- If they want demo/meeting → Share: https://cal.com/cognidrift
- If they want phone call → "I'd love to call you! Reply 'call me' 📞"
- If they say "call me/now/phone" → "**Calling you now...** 📞"

**About CogniDrift (Keep answers SHORT):**
- **24/7 AI receptionist** - never miss calls
- **Pricing:** Custom based on volume
- **Demo:** Free 15-min demo available
- **Book:** https://cal.com/cognidrift

**Response Examples:**
❌ "CogniDrift is a comprehensive 24/7 AI phone receptionist service that integrates with your calendar..."
✅ "24/7 AI receptionist - never miss leads! Want a demo? 📅"

❌ "I'd be happy to help you schedule a meeting to discuss our services..."
✅ "Book here: https://cal.com/cognidrift"

**Remember: SMS = SHORT. Every character counts!**`;

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

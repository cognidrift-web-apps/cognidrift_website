import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configuration - Aggressive summarization every 6 messages
const MAX_CONTEXT_MESSAGES = 6;      // Keep last 6 messages
const SUMMARIZE_THRESHOLD = 6;        // Summarize after 6 messages
const SUMMARIZE_FREQUENCY = 4;        // Re-summarize every 4 new messages

/**
 * Manage conversation context efficiently with frequent summarization
 */
export class ConversationManager {
  
  /**
   * Get optimized context for LLM
   * Strategy: Summary + Last 6 Messages
   */
  static async getOptimizedContext(conversation) {
    const totalMessages = conversation.messages.length;

    // Case 1: Very short conversation (≤6 messages) - send all
    if (totalMessages <= SUMMARIZE_THRESHOLD) {
      return conversation.messages;
    }

    // Case 2: Need summarization
    const messagesSinceLastSummary = totalMessages - (conversation.lastSummarizedAt || 0);
    
    // Summarize if:
    // - No summary exists and we have more than 6 messages
    // - Or 4+ new messages since last summary
    if (!conversation.summary || messagesSinceLastSummary >= SUMMARIZE_FREQUENCY) {
      await this.updateConversationSummary(conversation);
    }

    // Return: Summary + Recent 6 Messages
    const recentMessages = conversation.messages.slice(-MAX_CONTEXT_MESSAGES);
    
    if (conversation.summary) {
      return [
        {
          role: 'system',
          content: `Previous conversation summary: ${conversation.summary}`,
          timestamp: new Date()
        },
        ...recentMessages
      ];
    }

    return recentMessages;
  }

  /**
   * Generate concise summary of older messages
   */
  static async updateConversationSummary(conversation) {
    try {
      const totalMessages = conversation.messages.length;
      
      // Messages to summarize (all except last 6)
      const messagesToSummarize = conversation.messages.slice(
        0, 
        totalMessages - MAX_CONTEXT_MESSAGES
      );

      if (messagesToSummarize.length === 0) return;

      // If we have existing summary, include it in context
      let conversationText = '';
      
      if (conversation.summary) {
        conversationText += `Previous summary: ${conversation.summary}\n\nNew messages:\n`;
      }

      conversationText += messagesToSummarize
        .slice(conversation.lastSummarizedAt || 0) // Only new messages
        .map(msg => `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`)
        .join('\n');

      // Generate concise summary
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Fast & cheap for summarization
        messages: [
          {
            role: 'system',
            content: `You are a conversation summarizer. Create a brief 2-3 sentence summary that captures:
            1. Customer's main needs/questions
            2. Key information provided
            3. Current status/next steps
            
            Be concise but preserve important context. If there's a previous summary, update it with new information.`
          },
          {
            role: 'user',
            content: conversationText
          }
        ],
        max_tokens: 100,
        temperature: 0.3
      });

      const summary = response.choices[0].message.content;

      // Update conversation
      conversation.summary = summary;
      conversation.lastSummarizedAt = totalMessages - MAX_CONTEXT_MESSAGES;
      await conversation.save();

      console.log(`📝 Conversation summarized (${totalMessages} messages): ${summary.substring(0, 80)}...`);

      return summary;

    } catch (error) {
      console.error('❌ Summarization error:', error);
      // Don't fail the main flow if summarization fails
      return null;
    }
  }

  /**
   * Get context for Retell call (when user requests phone call)
   */
  static async getCallContext(conversation) {
    const optimizedContext = await this.getOptimizedContext(conversation);
    
    // Format for Retell agent
    let context = '';
    
    if (conversation.summary) {
      context += `Summary: ${conversation.summary}\n\n`;
    }
    
    context += 'Recent SMS conversation:\n';
    context += optimizedContext
      .filter(msg => msg.role !== 'system')
      .slice(-6)
      .map(msg => `${msg.role === 'user' ? 'Customer' : 'AI'}: ${msg.content}`)
      .join('\n');
    
    return context;
  }

  /**
   * Archive very old messages (after 30 messages)
   */
  static async archiveOldMessages(conversation) {
    const ARCHIVE_THRESHOLD = 30;

    if (conversation.messages.length > ARCHIVE_THRESHOLD) {
      // Keep summary + recent 10 messages
      const recentMessages = conversation.messages.slice(-10);
      
      conversation.archivedMessageCount = conversation.messages.length - 10;
      conversation.messages = recentMessages;
      
      await conversation.save();
      
      console.log(`🗄️ Archived ${conversation.archivedMessageCount} old messages for ${conversation.phoneNumber}`);
    }
  }

  /**
   * Get conversation stats for monitoring
   */
  static getStats(conversation) {
    return {
      totalMessages: conversation.messages.length,
      archivedMessages: conversation.archivedMessageCount || 0,
      hasSummary: !!conversation.summary,
      lastSummarizedAt: conversation.lastSummarizedAt,
      messagesSinceLastSummary: conversation.messages.length - (conversation.lastSummarizedAt || 0)
    };
  }
}

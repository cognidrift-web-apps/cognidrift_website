import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const conversationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    index: true
  },
  messages: [messageSchema],
  
  // Summary fields for context optimization
  summary: {
    type: String,
    default: null
  },
  lastSummarizedAt: {
    type: Number, // Message index when last summarized
    default: 0
  },
  archivedMessageCount: {
    type: Number,
    default: 0
  },
  
  status: {
    type: String,
    enum: ['active', 'call_requested', 'completed'],
    default: 'active'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    customerName: String,
    email: String,
    interest: String,
    callRequested: Boolean,
    callScheduledAt: Date
  }
}, {
  timestamps: true
});

// Auto-expire conversations after 48 hours of inactivity
conversationSchema.index({ lastMessageAt: 1 }, { expireAfterSeconds: 172800 });

export default mongoose.model('Conversation', conversationSchema);

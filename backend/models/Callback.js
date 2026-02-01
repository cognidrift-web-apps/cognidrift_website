import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema({
  callbackId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true
  },
  datetime: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    default: ''
  },
  timezone: {
    type: String,
    default: 'America/New_York'
  },
  callId: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'failed', 'cancelled'],
    default: 'scheduled',
    index: true
  },
  completedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for scheduled callbacks
callbackSchema.index({ datetime: 1, status: 1 });

export default mongoose.model('Callback', callbackSchema);

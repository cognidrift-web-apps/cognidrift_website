import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  customerId: {
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
  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  interest: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  callId: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    default: 'phone_call'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
customerSchema.index({ phoneNumber: 1, createdAt: -1 });

export default mongoose.model('Customer', customerSchema);

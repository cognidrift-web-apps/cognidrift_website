import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Check required environment variables
const requiredEnvVars = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'RETELL_API_KEY',
  'RETELL_AGENT_ID'
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
// 1. SMS WEBHOOK - When someone sends SMS
// ============================================
app.post('/webhook/sms', async (req, res) => {
  try {
    const { From, Body, MessageSid, To } = req.body;
    
    logInfo('SMS received', { from: From, body: Body, sid: MessageSid });

    // Respond to SMS immediately
    const twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Thank you for contacting CogniDrift! 🤖 Our AI assistant will call you shortly. 📞');
    
    res.type('text/xml');
    res.send(twiml.toString());

    // Store SMS in history
    callHistory.push({
      type: 'sms',
      from: From,
      to: To,
      message: Body,
      timestamp: new Date(),
      messageSid: MessageSid
    });

    // Initiate call after 2 seconds
    setTimeout(async () => {
      await initiateRetellCall(From, Body, MessageSid);
    }, 2000);

  } catch (error) {
    logError('SMS webhook error', error);
    res.status(500).send('Error processing SMS');
  }
});

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
// 3. CALL STATUS WEBHOOK
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

    // TODO: Save to database and implement actual scheduling
    // For now, just log it
    callHistory.push({
      type: 'callback_scheduled',
      ...callbackData
    });

    logSuccess('Callback scheduled', callbackData);

    res.json({
      success: true,
      callbackId,
      scheduledTime: datetime,
      message: `Callback scheduled for ${new Date(datetime).toLocaleString('en-US', { timeZone: timezone })}`
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

    // TODO: Save to database (MongoDB, PostgreSQL, etc.)
    // For now, just log it
    callHistory.push({
      type: 'customer_info',
      ...customerData
    });

    logSuccess('Customer info saved', { customerId, name });

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

// ============================================// 10. HEALTH CHECK
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
      history: '/api/call-history'
    },
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
  console.log(`\n✨ Ready to receive SMS and make calls!\n`);
});

export default app;

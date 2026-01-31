// Retell AI Custom Functions for SMS-to-Call Agent

export const retellCustomFunctions = [
  {
    name: 'send_sms',
    description: 'Send an SMS message to the customer during the phone call. Use this when the customer asks for information to be texted, wants a link, confirmation, or any written information.',
    parameters: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The SMS message content to send to the customer. Keep it concise and professional.'
        }
      },
      required: ['message']
    },
    returns: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        messageSid: { type: 'string' },
        message: { type: 'string' }
      }
    }
  },
  {
    name: 'schedule_callback',
    description: 'Schedule a callback for the customer at a specific date and time. Use this when customer wants to be called back later.',
    parameters: {
      type: 'object',
      properties: {
        datetime: {
          type: 'string',
          description: 'ISO 8601 format datetime for the callback (e.g., 2026-02-01T14:30:00Z)'
        },
        reason: {
          type: 'string',
          description: 'Brief reason for the callback'
        },
        timezone: {
          type: 'string',
          description: 'Customer timezone (e.g., Asia/Dhaka, America/New_York)',
          default: 'Asia/Dhaka'
        }
      },
      required: ['datetime', 'reason']
    },
    returns: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        callbackId: { type: 'string' },
        scheduledTime: { type: 'string' }
      }
    }
  },
  {
    name: 'save_customer_info',
    description: 'Save important customer information collected during the call (name, email, preferences, etc.)',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Customer full name'
        },
        email: {
          type: 'string',
          description: 'Customer email address'
        },
        interest: {
          type: 'string',
          description: 'What the customer is interested in (service/product)'
        },
        notes: {
          type: 'string',
          description: 'Additional notes or requirements'
        }
      },
      required: ['name']
    },
    returns: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        customerId: { type: 'string' }
      }
    }
  }
];

// Function implementations
export async function handleRetellFunction(functionName, args, callContext) {
  console.log(`🔧 Executing function: ${functionName}`, args);

  try {
    switch (functionName) {
      case 'send_sms':
        return await sendSMSDuringCall(args.message, callContext);
      
      case 'schedule_callback':
        return await scheduleCallback(args.datetime, args.reason, args.timezone, callContext);
      
      case 'save_customer_info':
        return await saveCustomerInfo(args, callContext);
      
      default:
        throw new Error(`Unknown function: ${functionName}`);
    }
  } catch (error) {
    console.error(`❌ Function execution error: ${functionName}`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Send SMS during call
async function sendSMSDuringCall(message, callContext) {
  try {
    const backendUrl = process.env.WEBHOOK_BASE_URL || 'http://localhost:3000';
    
    const response = await fetch(`${backendUrl}/api/send-sms-during-call`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: callContext.phoneNumber,
        message: message,
        callId: callContext.callId
      })
    });
    
    const result = await response.json();
    
    return {
      success: result.success,
      messageSid: result.messageSid,
      message: 'SMS has been sent successfully to your phone.'
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return {
      success: false,
      error: 'Failed to send SMS. Please try again.'
    };
  }
}

// Schedule callback
async function scheduleCallback(datetime, reason, timezone = 'Asia/Dhaka', callContext) {
  try {
    // In production, save to database and use job scheduler (node-cron, bull, etc.)
    const callbackId = `cb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log('📅 Callback scheduled:', {
      callbackId,
      phoneNumber: callContext.phoneNumber,
      datetime,
      reason,
      timezone
    });

    // TODO: Implement actual scheduling logic with database
    // - Save to database
    // - Schedule with cron job or background worker
    // - Send reminder SMS before callback
    
    return {
      success: true,
      callbackId,
      scheduledTime: datetime,
      message: `Callback scheduled for ${new Date(datetime).toLocaleString('en-US', { timeZone: timezone })}`
    };
  } catch (error) {
    console.error('Callback scheduling error:', error);
    return {
      success: false,
      error: 'Failed to schedule callback.'
    };
  }
}

// Save customer information
async function saveCustomerInfo(customerData, callContext) {
  try {
    const customerId = `cust_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const customerRecord = {
      customerId,
      phoneNumber: callContext.phoneNumber,
      ...customerData,
      createdAt: new Date().toISOString(),
      source: 'sms_to_call',
      callId: callContext.callId
    };

    console.log('💾 Customer info saved:', customerRecord);

    // TODO: Save to database (MongoDB, PostgreSQL, etc.)
    // await db.customers.insert(customerRecord);
    
    return {
      success: true,
      customerId,
      message: 'Your information has been saved successfully.'
    };
  } catch (error) {
    console.error('Customer info save error:', error);
    return {
      success: false,
      error: 'Failed to save customer information.'
    };
  }
}

export default {
  retellCustomFunctions,
  handleRetellFunction
};

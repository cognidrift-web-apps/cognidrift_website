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
  }
];

// Function implementations
export async function handleRetellFunction(functionName, args, callContext) {
  console.log(`🔧 Executing function: ${functionName}`, args);

  try {
    switch (functionName) {
      case 'send_sms':
        return await sendSMSDuringCall(args.message, callContext);
      
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

export default {
  retellCustomFunctions,
  handleRetellFunction
};

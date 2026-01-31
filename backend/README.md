# 🤖 CogniDrift SMS-to-Call Agent Backend

Automatic AI phone calls triggered by SMS using Retell AI + Twilio.

## 🎯 Features

- ✅ **SMS Trigger**: Customer sends SMS → Auto call initiated
- ✅ **Smart Responses**: AI understands SMS context and responds accordingly
- ✅ **Mid-Call SMS**: Send text messages during phone conversations
- ✅ **Call Tracking**: Monitor active calls and view history
- ✅ **Custom Functions**: Schedule callbacks, save customer info
- ✅ **Webhook Integration**: Real-time updates from Twilio & Retell

## 📋 Prerequisites

1. **Twilio Account** - https://console.twilio.com
   - Phone number with SMS + Voice capabilities
   - Account SID and Auth Token

2. **Retell AI Account** - https://dashboard.retellai.com
   - API Key
   - Agent ID

3. **Node.js** - v18 or higher

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Fill in your credentials:

```env
# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Retell AI
RETELL_API_KEY=key_xxxxxxxxxxxxx
RETELL_AGENT_ID=agent_4656c1fe4b5b11b7602885338e

# Server
PORT=3000
WEBHOOK_BASE_URL=http://localhost:3000
```

### 3. Run the Server

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

Server will start at: `http://localhost:3000`

## 🌐 Deployment & Webhook Setup

### Deploy Backend (Choose One):

#### Option A: Railway (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Option B: Render
1. Connect GitHub repo
2. Select "Web Service"
3. Add environment variables
4. Deploy

#### Option C: Vercel (Serverless)
```bash
npm i -g vercel
vercel --prod
```

### Configure Webhooks:

1. **Twilio SMS Webhook**:
   - Go to: https://console.twilio.com/phone-numbers
   - Select your phone number
   - Under "Messaging Configuration" → "A MESSAGE COMES IN"
   - Set Webhook URL: `https://your-backend.com/webhook/sms`
   - Method: POST
   - Save

2. **Retell AI Webhook** (Optional for call updates):
   - Go to: https://dashboard.retellai.com/agents
   - Select your agent
   - Add webhook URL: `https://your-backend.com/webhook/call-status`

## 📱 Testing

### Test SMS Flow (End-to-End)

Send SMS to your Twilio number:
```
"Hi, I need information about your AI services"
```

Expected flow:
1. You receive confirmation SMS
2. Within 2 seconds, you get an AI call
3. AI references your SMS in conversation

### Test Manual Call Trigger

```bash
curl -X POST http://localhost:3000/api/trigger-call \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+8801XXXXXXXXX",
    "message": "Test manual call"
  }'
```

### Test SMS During Call

```bash
curl -X POST http://localhost:3000/api/send-sms-during-call \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+8801XXXXXXXXX",
    "message": "Here is your booking link: https://example.com",
    "callId": "call_xxxxx"
  }'
```

### Check System Health

```bash
curl http://localhost:3000/health
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | System health check |
| `/webhook/sms` | POST | Twilio SMS webhook |
| `/webhook/call-status` | POST | Retell call status webhook |
| `/api/trigger-call` | POST | Manual call trigger |
| `/api/send-sms-during-call` | POST | Send SMS during call |
| `/api/active-calls` | GET | List active calls |
| `/api/call-history` | GET | View call history |

## 🎨 Retell Agent Configuration

### Agent Prompt Template:

```
You are CogniDrift AI, a professional AI assistant. You received an SMS from the customer and are now calling them back.

**Customer's SMS:** {{sms_message}}

**Your Role:**
- Acknowledge their message professionally
- Address their inquiry or request
- Be helpful, friendly, and efficient
- Use available functions when appropriate

**Available Functions:**
- send_sms(message): Send information via text
- schedule_callback(datetime, reason): Schedule future callback
- save_customer_info(name, email, interest, notes): Save customer details

**Guidelines:**
1. Greet warmly and reference their SMS
2. Ask clarifying questions if needed
3. Offer to send details via SMS when appropriate
4. Always confirm before ending call
5. Keep conversations natural and conversational
```

### Add Custom Functions:

In Retell Dashboard → Your Agent → Functions:

Copy functions from `utils/retellFunctions.js` and paste into Retell dashboard.

## 🔄 Complete Flow Diagram

```
User sends SMS
    ↓
Twilio receives SMS → /webhook/sms
    ↓
Backend responds with confirmation SMS
    ↓
Backend calls Retell API
    ↓
Retell initiates phone call
    ↓
User receives AI call
    ↓
During call: AI can trigger functions
    - Send SMS
    - Schedule callback
    - Save info
    ↓
Call ends → /webhook/call-status
    ↓
Data saved in history
```

## 📊 Monitoring

### View Active Calls:
```bash
curl http://localhost:3000/api/active-calls
```

### View Call History:
```bash
curl http://localhost:3000/api/call-history?limit=10
```

### Logs:
- ✅ Success: Green checkmark
- ℹ️ Info: Blue info icon
- ❌ Error: Red X

## 🔒 Security Best Practices

1. **Validate Twilio Requests**:
   ```javascript
   import { validateRequest } from 'twilio';
   // Verify webhook signatures
   ```

2. **Rate Limiting**:
   ```javascript
   import rateLimit from 'express-rate-limit';
   // Add rate limiters to endpoints
   ```

3. **Environment Variables**:
   - Never commit `.env` file
   - Use different credentials for dev/prod

4. **HTTPS Only** in production

## 🐛 Troubleshooting

### Issue: SMS received but no call
- Check Retell API key is correct
- Verify agent ID is valid
- Check backend logs for errors
- Ensure phone number format is E.164 (+country code)

### Issue: Call made but no SMS context
- Verify metadata is passed in create-phone-call API
- Check Retell agent can access dynamic variables

### Issue: Webhooks not working
- Confirm webhook URLs are publicly accessible
- Check firewall/security group settings
- Verify webhook URLs in Twilio/Retell dashboard

## 📚 Resources

- [Retell AI Docs](https://docs.retellai.com)
- [Twilio SMS Docs](https://www.twilio.com/docs/sms)
- [Express.js Guide](https://expressjs.com)

## 🤝 Support

For issues or questions:
- Check logs: `npm run dev`
- Test health endpoint: `/health`
- Review call history: `/api/call-history`

---

Built with ❤️ for CogniDrift

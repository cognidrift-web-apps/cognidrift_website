# Vercel Email Setup Guide

## Environment Variables Required

Add these environment variables to your Vercel project:

### Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add the following:

```
SMTP_HOST=mail.cognidrift.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@cognidrift.com
SMTP_PASS=CogniDriftContact.1234
SMTP_FROM_NAME=CogniDrift
SMTP_FROM_EMAIL=contact@cognidrift.com
```

## How to Add Environment Variables in Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (cognidrift-agent or similar)
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. Add each variable:
   - Key: `SMTP_HOST`
   - Value: `mail.cognidrift.com`
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **Save**
6. Repeat for all 7 variables above

## After Adding Variables:

**Redeploy your application** for changes to take effect:
- Go to **Deployments** tab
- Click the **⋯** menu on the latest deployment
- Click **Redeploy**

## Testing:

1. **Local test:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173/contact and submit the form

2. **Production test:**
   - Visit your deployed site: https://your-site.vercel.app/contact
   - Submit a test form
   - Check if you receive emails at contact@cognidrift.com

## Troubleshooting:

- **405 Error:** Make sure the API route is at `/api/contact.js` (not in a subfolder)
- **500 Error:** Check Vercel Function Logs for SMTP connection errors
- **No email received:** Verify all SMTP credentials are correct
- **Vercel Function Timeout:** Default is 10s (Hobby) or 60s (Pro). Email sending should complete within this.

## Current Setup:

✅ Serverless function: `frontend/api/contact.js`  
✅ SMTP Server: `mail.cognidrift.com` (port 465, SSL)  
✅ From Address: `contact@cognidrift.com`  
✅ Nodemailer installed in package.json

# Vercel Deployment Guide for Contact Form

## ✅ Setup Complete!

Your contact form is now configured to use Vercel serverless functions instead of Railway.

### What Changed:
1. ✅ Created `/api/contact.js` - Vercel serverless function
2. ✅ Updated `Contact.jsx` - Now uses `/api/contact` endpoint
3. ✅ Added `nodemailer` dependency
4. ✅ Created `.env` file with SMTP credentials

---

## 🚀 Deployment Steps

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Test Locally (Optional)
```bash
npm run dev
# Visit http://localhost:5173/contact and test the form
```

### Step 3: Deploy to Vercel

#### Option A: Via Vercel CLI (Recommended)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel

# Follow prompts and it will deploy
```

#### Option B: Via Vercel Dashboard
1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `cognidrift-agent` repository
4. Set Root Directory to `frontend`
5. Click "Deploy"

### Step 4: Add Environment Variables to Vercel

**CRITICAL:** After deployment, add these environment variables:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add these variables:

```
SMTP_HOST = mail.cognidrift.com
SMTP_PORT = 465
SMTP_SECURE = true
SMTP_USER = contact@cognidrift.com
SMTP_PASS = CogniDriftContact.1234
SMTP_FROM_NAME = CogniDrift
SMTP_FROM_EMAIL = contact@cognidrift.com
```

4. Click "Save"
5. Go to "Deployments" → Click "..." → "Redeploy"

---

## ✅ Verification

After redeployment:
1. Visit your site
2. Fill out the contact form
3. Submit
4. Check your email (contact@cognidrift.com) for:
   - Admin notification (you should receive this)
   - Customer confirmation (sent to form submitter)

---

## 🔍 Troubleshooting

### Emails not sending?
1. Check Vercel logs: Dashboard → Deployments → Select deployment → View Function Logs
2. Verify environment variables are set correctly
3. Try port 587 with SMTP_SECURE=false if 465 doesn't work

### CORS errors?
The API route automatically handles CORS. If issues persist:
- Ensure you're using `/api/contact` (relative path)
- Check browser console for specific errors

### Build errors?
```bash
# Make sure nodemailer is installed
cd frontend
npm install nodemailer
```

---

## 📊 What About Railway?

Your Railway backend is still running and handles:
- ✅ SMS webhooks (Twilio)
- ✅ Call webhooks (Retell AI)
- ✅ Real-time WebSockets
- ✅ Background processes

The contact form now runs independently on Vercel! 🎉

---

## 💡 Benefits

✅ **Faster** - Vercel's edge network
✅ **More Reliable** - Vercel has better SMTP connectivity
✅ **Cost Effective** - Free on Vercel
✅ **Separate Concerns** - Contact form isolated from main backend
✅ **Better Logs** - Easy debugging in Vercel dashboard

---

## 📞 Need Help?

If emails still don't work after deployment:
1. Check Vercel Function Logs
2. Verify SMTP credentials in Namecheap cPanel
3. Try alternative SMTP settings (port 587)

Good luck! 🚀

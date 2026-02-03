# 🚀 Vercel Deployment Checklist for Contact Form

## ✅ Pre-Deployment Steps

### 1. Verify Files are Ready
- ✅ `api/contact.js` - Serverless function exists
- ✅ `vercel.json` - Configuration file created
- ✅ `.env.example` - Template with all variables
- ✅ `package.json` - nodemailer dependency added

### 2. Test Locally (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Run locally with serverless functions
vercel dev

# Test the contact form at http://localhost:3000/contact
```

---

## 🚀 Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: add vercel serverless contact form with SMTP"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. **Root Directory:** Select `frontend`
5. **Framework Preset:** Vite
6. Click **Deploy**

#### Step 3: Add Environment Variables
1. After deployment, go to **Settings** → **Environment Variables**
2. Add these variables (copy from your `.env` file):

```
VITE_RETELL_PUBLIC_KEY=public_key_bf22fb5e1e7bf6743cc5b
VITE_RETELL_AGENT_ID=agent_4656c1fe4b5b11b7602885338e
SMTP_HOST=mail.cognidrift.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@cognidrift.com
SMTP_PASS=CogniDriftContact.1234
SMTP_FROM_NAME=CogniDrift
SMTP_FROM_EMAIL=contact@cognidrift.com
```

**Important:** 
- For each variable, select **Production**, **Preview**, AND **Development**
- Click **Save** after adding each one

#### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **⋯** menu on latest deployment
3. Click **Redeploy** to apply environment variables

---

### Method 2: Using Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy to production
cd frontend
vercel --prod

# Add environment variables via CLI
vercel env add SMTP_HOST production
vercel env add SMTP_PORT production
vercel env add SMTP_SECURE production
vercel env add SMTP_USER production
vercel env add SMTP_PASS production
vercel env add SMTP_FROM_NAME production
vercel env add SMTP_FROM_EMAIL production
vercel env add VITE_RETELL_PUBLIC_KEY production
vercel env add VITE_RETELL_AGENT_ID production

# Redeploy with env vars
vercel --prod
```

---

## 🧪 Testing After Deployment

### 1. Test Contact Form
1. Visit your deployed site: `https://your-project.vercel.app/contact`
2. Fill out the contact form with test data
3. Submit the form

### 2. Check for Success
- ✅ Form shows success message
- ✅ Email arrives at `contact@cognidrift.com`
- ✅ Customer receives confirmation email

### 3. Check Vercel Logs (if issues)
1. Go to **Deployments** → Select latest deployment
2. Click **Functions** tab
3. Find `/api/contact` function
4. View logs for errors

---

## 🐛 Troubleshooting

### Error: 404 on /api/contact
- **Cause:** Vercel can't find the serverless function
- **Fix:** Ensure `api/contact.js` is in the `frontend/api/` folder
- **Fix:** Redeploy after confirming file location

### Error: 405 Method Not Allowed
- **Cause:** Happens in Vite dev mode (serverless functions don't run locally)
- **Fix:** Use `vercel dev` instead of `npm run dev` OR deploy to Vercel

### Error: 500 Internal Server Error
- **Cause:** SMTP connection failed or environment variables missing
- **Fix:** 
  1. Check Vercel logs: Deployments → Functions → `/api/contact`
  2. Verify all SMTP environment variables are set correctly
  3. Test SMTP credentials separately

### Email Not Received
- ✅ Check spam folder
- ✅ Verify `SMTP_USER` and `SMTP_PASS` are correct
- ✅ Confirm SMTP server allows connections from Vercel IPs
- ✅ Check Vercel function logs for SMTP errors

### SMTP Connection Timeout
- **Cause:** Port 465/587 might be blocked
- **Fix:** Try alternate port (465 → 587 or vice versa)
- **Fix:** Set `SMTP_SECURE=false` for port 587

---

## 📊 Verify Deployment

### Check These URLs:
- ✅ Homepage: `https://your-project.vercel.app/`
- ✅ Contact Page: `https://your-project.vercel.app/contact`
- ✅ API Health: Try POST to `https://your-project.vercel.app/api/contact`

### Expected Behavior:
1. Form submission → Loading state
2. Success message appears
3. Admin email received at `contact@cognidrift.com`
4. Customer confirmation email sent

---

## 🔒 Security Notes

- ✅ SMTP credentials are stored in Vercel (not in code)
- ✅ Environment variables are encrypted
- ✅ API is protected with CORS headers
- ✅ Rate limiting handled by Vercel
- ⚠️ Never commit `.env` file to Git (already in `.gitignore`)

---

## 📝 Final Checklist

Before going live:

- [ ] All environment variables added to Vercel
- [ ] Test submission on production URL
- [ ] Confirm email delivery works
- [ ] Check mobile responsiveness
- [ ] Test form validation
- [ ] Monitor Vercel function logs for first 24 hours

---

## 🎉 Success!

Your contact form is now live with working email functionality via Vercel serverless functions!

**Production URL:** `https://your-project.vercel.app`

For support: Check [Vercel Docs](https://vercel.com/docs) or [Nodemailer Docs](https://nodemailer.com/about/)

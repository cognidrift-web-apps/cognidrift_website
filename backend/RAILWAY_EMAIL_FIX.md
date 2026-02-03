# Update Railway Environment Variables
# ======================================
# 
# Your backend is deployed on Railway. The .env file on your local machine
# doesn't affect the production server. You need to update environment variables
# on Railway directly.
#
# STEPS TO FIX EMAIL ON RAILWAY:
#
# 1. Go to: https://railway.app
# 2. Open your project: "cognidrift-send-and-receive-sms"
# 3. Click on your service
# 4. Go to "Variables" tab
# 5. Update these variables:
#
#    SMTP_HOST=mail.cognidrift.com
#    SMTP_PORT=587
#    SMTP_SECURE=false
#    SMTP_USER=contact@cognidrift.com
#    SMTP_PASS=CogniDriftContact.1234
#    SMTP_FROM_NAME=CogniDrift
#    SMTP_FROM_EMAIL=contact@cognidrift.com
#
# 6. Railway will automatically redeploy with new variables
# 7. Wait 1-2 minutes for deployment to complete
# 8. Test the contact form again
#
# ALTERNATIVE: Deploy from local
# -------------------------------
# If you have Railway CLI installed:
#   cd backend
#   railway up
#
# This will deploy your local .env variables to Railway.
#
# CHECK LOGS:
# -----------
# To see email errors:
# 1. Go to Railway dashboard
# 2. Click on "Deployments"
# 3. Click "View Logs"
# 4. Submit a form and watch for email-related messages

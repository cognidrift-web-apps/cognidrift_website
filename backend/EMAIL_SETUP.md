# Instructions for Setting Up Email
# =====================================
# 
# If emails are not sending, try these configurations one by one:
#
# CONFIGURATION 1: Namecheap Shared Hosting (Most Common)
# --------------------------------------------------------
# SMTP_HOST=mail.cognidrift.com
# SMTP_PORT=587
# SMTP_SECURE=false
#
# CONFIGURATION 2: Namecheap SSL
# -------------------------------
# SMTP_HOST=mail.cognidrift.com
# SMTP_PORT=465
# SMTP_SECURE=true
#
# CONFIGURATION 3: Namecheap Private Email
# -----------------------------------------
# SMTP_HOST=mail.privateemail.com
# SMTP_PORT=587
# SMTP_SECURE=false
#
# HOW TO FIND YOUR SETTINGS:
# 1. Login to Namecheap cPanel
# 2. Go to "Email Accounts"
# 3. Click "Connect Devices" next to contact@cognidrift.com
# 4. Copy the "Outgoing Mail Server" settings
# 5. Update the values above and restart the server
#
# TROUBLESHOOTING:
# - Make sure contact@cognidrift.com exists in cPanel
# - Verify the password is correct
# - Check if SMTP is enabled for the email account
# - Try sending a test email from webmail first

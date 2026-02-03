const nodemailer = require('nodemailer');

/**
 * Vercel Serverless Function for Contact Form
 * Handles email sending without exposing SMTP credentials to frontend
 */
module.exports = async function handler(req, res) {
  // Enable CORS for your frontend domain
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const { name, email, company, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Name is required'
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address'
      });
    }

    console.log('📧 Contact form submission:', { name, email, company });

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_PORT === '465' || process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      }
    });

    // Send email to admin
    const adminEmailPromise = transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'CogniDrift'}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Demo Request from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; padding: 12px; background: white; border-radius: 6px; }
            .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company ? `
              <div class="field">
                <div class="label">Company</div>
                <div class="value">${company}</div>
              </div>
              ` : ''}
              ${message ? `
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} CogniDrift LLC. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${message ? `\nMessage:\n${message}` : ''}
      `.trim()
    });

    // Send confirmation to customer
    const customerEmailPromise = transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'CogniDrift'}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: white; padding: 40px 30px; border: 1px solid #e2e8f0; }
            .footer { background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${name}!</h1>
              <p>We've received your demo request</p>
            </div>
            <div class="content">
              <h2>What Happens Next?</h2>
              <p>Our team is reviewing your request and will reach out within <strong>24 hours</strong> to schedule your personalized demo.</p>
              <br>
              <p>Best regards,<br><strong>CogniDrift Team</strong></p>
            </div>
            <div class="footer">
              <p>CogniDrift - AI-Powered Voice Automation</p>
              <p>&copy; ${new Date().getFullYear()} CogniDrift LLC. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hi ${name},

Thank you for your interest in CogniDrift!

We've received your demo request and our team will reach out within 24 hours to schedule your personalized demo.

Best regards,
CogniDrift Team
      `.trim()
    });

    // Wait for both emails
    await Promise.all([adminEmailPromise, customerEmailPromise]);

    console.log('✅ Emails sent successfully');

    return res.status(200).json({ 
      success: true, 
      message: "Thank you! We'll be in touch within 24 hours."
    });

  } catch (error) {
    console.error('❌ Email error:', error);
    
    return res.status(500).json({ 
      success: false,
      error: 'Something went wrong. Please try again or email us directly at contact@cognidrift.com'
    });
  }
}

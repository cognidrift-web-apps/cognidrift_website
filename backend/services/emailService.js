import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
      // Do not fail on invalid certs (useful for some hosting providers)
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    debug: true // Enable debug logging
  };
  
  console.log('📧 Creating SMTP transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user
  });
  
  return nodemailer.createTransporter(config);
};

/**
 * Send notification email to admin when contact form is submitted
 */
export const sendAdminNotification = async (contactData) => {
  const transporter = createTransporter();

  const { name, email, company, message } = contactData;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
        .field { margin-bottom: 20px; }
        .field-label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .field-value { margin-top: 5px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #e2e8f0; }
        .message-box { white-space: pre-wrap; }
        .footer { background: #1e293b; color: #94a3b8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
        .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 15px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">A potential customer has reached out via the website</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">Name</div>
            <div class="field-value">${name}</div>
          </div>
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          ${company ? `
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${company}</div>
          </div>
          ` : ''}
          ${message ? `
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value message-box">${message}</div>
          </div>
          ` : ''}
          <a href="mailto:${email}?subject=Re: Your CogniDrift Demo Request" class="cta-button">Reply to ${name}</a>
        </div>
        <div class="footer">
          <p>This email was sent from the CogniDrift website contact form.</p>
          <p>&copy; ${new Date().getFullYear()} CogniDrift LLC. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.SMTP_USER, // Send to self (admin)
    replyTo: email, // Reply goes to the customer
    subject: `New Demo Request from ${name}${company ? ` (${company})` : ''}`,
    html: htmlContent,
    text: `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${message ? `\nMessage:\n${message}` : ''}

---
Reply to this email to respond to ${name}.
    `.trim()
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send confirmation email to the customer
 */
export const sendCustomerConfirmation = async (contactData) => {
  const transporter = createTransporter();

  const { name, email } = contactData;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 40px 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 15px 0 0 0; opacity: 0.9; font-size: 16px; }
        .content { background: white; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none; }
        .content h2 { color: #1e293b; margin-top: 0; }
        .highlight-box { background: #f0f9ff; border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
        .features { margin: 30px 0; }
        .feature { display: flex; align-items: flex-start; margin-bottom: 15px; }
        .feature-icon { background: #dbeafe; color: #2563eb; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 14px; flex-shrink: 0; }
        .cta-section { text-align: center; margin: 30px 0; }
        .cta-button { display: inline-block; background: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; }
        .cta-button:hover { background: #1d4ed8; }
        .footer { background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
        .footer a { color: #60a5fa; text-decoration: none; }
        .social-links { margin: 20px 0; }
        .social-links a { margin: 0 10px; color: #94a3b8; text-decoration: none; }
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

          <div class="highlight-box">
            <strong>Can't wait?</strong> Book your demo directly on our calendar to secure your preferred time slot.
          </div>

          <div class="features">
            <h3 style="color: #1e293b;">What You'll See in Your Demo:</h3>
            <div class="feature">
              <span class="feature-icon">&#10003;</span>
              <span>Live AI voice agent handling real conversations</span>
            </div>
            <div class="feature">
              <span class="feature-icon">&#10003;</span>
              <span>Custom integration possibilities for your business</span>
            </div>
            <div class="feature">
              <span class="feature-icon">&#10003;</span>
              <span>ROI analysis and pricing tailored to your needs</span>
            </div>
            <div class="feature">
              <span class="feature-icon">&#10003;</span>
              <span>Q&A session with our AI specialists</span>
            </div>
          </div>

          <div class="cta-section">
            <a href="https://cognidrift-agent.vercel.app/contact" class="cta-button">Book Your Demo Now</a>
          </div>
        </div>
        <div class="footer">
          <p><strong>CogniDrift</strong></p>
          <p>AI-Powered Voice Automation</p>
          <div class="social-links">
            <a href="mailto:contact@cognidrift.com">contact@cognidrift.com</a> |
            <a href="tel:+18445841083">+1 (844) 584-1083</a>
          </div>
          <p style="margin-top: 20px; font-size: 12px;">&copy; ${new Date().getFullYear()} CogniDrift LLC. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: `Thanks for reaching out, ${name}! Your demo request is confirmed`,
    html: htmlContent,
    text: `
Hi ${name},

Thank you for your interest in CogniDrift!

We've received your demo request and our team will reach out within 24 hours to schedule your personalized demo.

What You'll See in Your Demo:
- Live AI voice agent handling real conversations
- Custom integration possibilities for your business
- ROI analysis and pricing tailored to your needs
- Q&A session with our AI specialists

Can't wait? Book your demo directly: https://cognidrift-agent.vercel.app/contact

---
CogniDrift - AI-Powered Voice Automation
Email: contact@cognidrift.com
Phone: +1 (844) 584-1083
    `.trim()
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Verify SMTP connection
 */
export const verifyConnection = async () => {
  const transporter = createTransporter();
  return transporter.verify();
};

export default {
  sendAdminNotification,
  sendCustomerConfirmation,
  verifyConnection
};

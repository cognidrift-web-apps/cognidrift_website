import pkg from 'nodemailer';
const { createTransporter } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const transporter = createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  },
  debug: true,
  logger: true
});

console.log('🔍 Testing SMTP connection...');
console.log('Host:', process.env.SMTP_HOST);
console.log('Port:', process.env.SMTP_PORT);
console.log('User:', process.env.SMTP_USER);
console.log('Secure:', process.env.SMTP_SECURE);

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.error('\n❌ SMTP Connection Error:', error);
  } else {
    console.log('\n✅ SMTP Connection Successful!');
    
    // Try sending a test email
    console.log('\n📧 Sending test email...');
    
    transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_USER,
      subject: 'Test Email from CogniDrift',
      html: `
        <h1>Test Email</h1>
        <p>If you're reading this, the email service is working correctly!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
      text: `Test Email - If you're reading this, the email service is working correctly! Timestamp: ${new Date().toISOString()}`
    }, (error, info) => {
      if (error) {
        console.error('\n❌ Failed to send test email:', error);
      } else {
        console.log('\n✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);
      }
      process.exit(error ? 1 : 0);
    });
  }
});

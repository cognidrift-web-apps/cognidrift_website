#!/usr/bin/env node
/**
 * Email Diagnostic Tool
 * Tests SMTP connection and sends a test email
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sendAdminNotification, sendCustomerConfirmation } from './services/emailService.js';

dotenv.config();

console.log('====================================');
console.log('  CogniDrift Email Diagnostic Tool');
console.log('====================================\n');

// Step 1: Check environment variables
console.log('📋 Step 1: Checking environment variables...');
const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM_NAME', 'SMTP_FROM_EMAIL'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars.join(', '));
  process.exit(1);
}

console.log('✅ All SMTP environment variables are set');
console.log(`   Host: ${process.env.SMTP_HOST}`);
console.log(`   Port: ${process.env.SMTP_PORT}`);
console.log(`   User: ${process.env.SMTP_USER}`);
console.log(`   From: ${process.env.SMTP_FROM_EMAIL}`);
console.log(`   Secure: ${process.env.SMTP_SECURE}\n`);

// Step 2: Test SMTP connection
console.log('🔌 Step 2: Testing SMTP connection...');

const transporter = nodemailer.createTransporter({
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
  debug: false
});

try {
  await transporter.verify();
  console.log('✅ SMTP connection successful!\n');
} catch (error) {
  console.error('❌ SMTP connection failed:', error.message);
  console.error('   Error details:', error);
  process.exit(1);
}

// Step 3: Send test emails using actual service functions
console.log('📧 Step 3: Sending test emails...\n');

const testContactData = {
  name: 'Test User',
  email: process.env.SMTP_USER, // Send to yourself
  company: 'Test Company',
  message: 'This is a test message from the email diagnostic tool.'
};

console.log('📨 Sending admin notification...');
try {
  const adminResult = await sendAdminNotification(testContactData);
  console.log('✅ Admin notification sent successfully!');
  console.log('   Message ID:', adminResult.messageId);
  console.log('   Response:', adminResult.response, '\n');
} catch (error) {
  console.error('❌ Failed to send admin notification:', error.message);
  console.error('   Error details:', error, '\n');
}

console.log('📨 Sending customer confirmation...');
try {
  const customerResult = await sendCustomerConfirmation(testContactData);
  console.log('✅ Customer confirmation sent successfully!');
  console.log('   Message ID:', customerResult.messageId);
  console.log('   Response:', customerResult.response, '\n');
} catch (error) {
  console.error('❌ Failed to send customer confirmation:', error.message);
  console.error('   Error details:', error, '\n');
}

// Step 4: Summary
console.log('====================================');
console.log('  Diagnostic Complete');
console.log('====================================');
console.log('\nIf you see ✅ for all tests, your email service is working correctly.');
console.log('Check your inbox at:', process.env.SMTP_USER);
console.log('\nIf emails are not arriving:');
console.log('  1. Check your spam/junk folder');
console.log('  2. Verify email credentials in cPanel');
console.log('  3. Check if the email account exists and is active');
console.log('  4. Contact your hosting provider (Namecheap)');

process.exit(0);

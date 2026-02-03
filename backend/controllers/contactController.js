import Contact from '../models/Contact.js';
import { sendAdminNotification, sendCustomerConfirmation } from '../services/emailService.js';

/**
 * Handle contact form submission
 * POST /api/contact
 */
export const submitContactForm = async (req, res) => {
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

    console.log('📧 New contact form submission:', { name, email, company });

    // Create contact record in database
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || '',
      message: message?.trim() || '',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || ''
    };

    const contact = new Contact(contactData);
    await contact.save();

    console.log('✅ Contact saved to database:', contact._id);

    // Send emails in parallel
    const emailPromises = [];

    // Send notification to admin
    emailPromises.push(
      sendAdminNotification(contactData)
        .then(() => console.log('✅ Admin notification email sent'))
        .catch((err) => console.error('❌ Failed to send admin notification:', err.message))
    );

    // Send confirmation to customer
    emailPromises.push(
      sendCustomerConfirmation(contactData)
        .then(() => console.log('✅ Customer confirmation email sent'))
        .catch((err) => console.error('❌ Failed to send customer confirmation:', err.message))
    );

    // Wait for both emails (don't fail if email sending fails)
    await Promise.allSettled(emailPromises);

    res.status(201).json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
      contactId: contact._id
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Something went wrong. Please try again or email us directly at contact@cognidrift.com'
    });
  }
};

/**
 * Get all contact submissions (for dashboard)
 * GET /api/contacts
 */
export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    const query = status ? { status } : {};

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts'
    });
  }
};

/**
 * Update contact status
 * PATCH /api/contacts/:id
 */
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('❌ Error updating contact:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact'
    });
  }
};

export default {
  submitContactForm,
  getContacts,
  updateContactStatus
};

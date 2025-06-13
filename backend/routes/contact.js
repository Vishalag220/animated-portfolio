const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const Analytics = require('../models/Analytics');
const { 
  getContactNotificationTemplate, 
  getAutoReplyTemplate,
  getContactNotificationText,
  getAutoReplyText 
} = require('../utils/emailTemplates');

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    return nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
};

// Validation middleware
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters')
    .escape(),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
    .escape(),
];

// POST /api/contact - Submit contact form
router.post('/', validateContact, async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    await contact.save();

    // Track analytics
    const analytics = new Analytics({
      type: 'contact_form_submit',
      page: '/contact',
      referrer: req.get('Referer') || '',
      userAgent,
      ipAddress,
      sessionId: req.sessionID || `${Date.now()}-${Math.random()}`,
      metadata: {
        contactId: contact._id,
        subject: subject.substring(0, 50), // First 50 chars for analytics
      },
    });

    await analytics.save();

    // Send email notification
    try {
      const transporter = createTransporter();
      const contactData = { name, email, subject, message, ipAddress, userAgent };

      // Email to site owner
      const ownerMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio Contact: ${subject}`,
        html: getContactNotificationTemplate(contactData),
        text: getContactNotificationText(contactData),
      };

      // Auto-reply to sender
      const autoReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting me!',
        html: getAutoReplyTemplate(contactData),
        text: getAutoReplyText(contactData),
      };

      await Promise.all([
        transporter.sendMail(ownerMailOptions),
        transporter.sendMail(autoReplyOptions)
      ]);

      console.log(`📧 Contact email sent for: ${email}`);
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        timestamp: contact.createdAt,
      },
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
});

// GET /api/contact - Get all contacts (for admin use)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;

    const query = status ? { status } : {};
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    const contacts = await Contact.find(query)
      .sort(options.sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total,
        },
      },
    });

  } catch (error) {
    console.error('❌ Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
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
        message: 'Contact not found',
      });
    }

    res.json({
      success: true,
      data: contact,
    });

  } catch (error) {
    console.error('❌ Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status',
    });
  }
});

module.exports = router; 
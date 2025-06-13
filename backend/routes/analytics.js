const express = require('express');
const { body, validationResult } = require('express-validator');
const Analytics = require('../models/Analytics');

const router = express.Router();

// Helper function to parse user agent
const parseUserAgent = (userAgent) => {
  const device = {
    type: 'unknown',
    browser: 'unknown',
    os: 'unknown'
  };

  if (!userAgent) return device;

  // Device type detection
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad/i.test(userAgent)) {
      device.type = 'tablet';
    } else {
      device.type = 'mobile';
    }
  } else {
    device.type = 'desktop';
  }

  // Browser detection
  if (/Chrome/i.test(userAgent) && !/Edge|Edg/i.test(userAgent)) {
    device.browser = 'Chrome';
  } else if (/Firefox/i.test(userAgent)) {
    device.browser = 'Firefox';
  } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    device.browser = 'Safari';
  } else if (/Edge|Edg/i.test(userAgent)) {
    device.browser = 'Edge';
  } else if (/Opera|OPR/i.test(userAgent)) {
    device.browser = 'Opera';
  }

  // OS detection
  if (/Windows/i.test(userAgent)) {
    device.os = 'Windows';
  } else if (/Mac/i.test(userAgent)) {
    device.os = 'macOS';
  } else if (/Linux/i.test(userAgent)) {
    device.os = 'Linux';
  } else if (/Android/i.test(userAgent)) {
    device.os = 'Android';
  } else if (/iOS|iPhone|iPad/i.test(userAgent)) {
    device.os = 'iOS';
  }

  return device;
};

// Validation middleware
const validateAnalytics = [
  body('type')
    .isIn(['page_view', 'contact_form_view', 'contact_form_submit', 'project_click', 'resume_download'])
    .withMessage('Invalid analytics type'),
  body('page')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Page path is required')
    .escape(),
  body('sessionId')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Session ID is required'),
];

// POST /api/analytics/track - Track an event
router.post('/track', validateAnalytics, async (req, res) => {
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

    const { type, page, sessionId, metadata = {} } = req.body;

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('User-Agent') || 'unknown';
    const referrer = req.get('Referer') || '';

    // Parse device information
    const device = parseUserAgent(userAgent);

    // Create analytics entry
    const analytics = new Analytics({
      type,
      page,
      referrer,
      userAgent,
      ipAddress,
      device,
      sessionId,
      metadata,
    });

    await analytics.save();

    res.status(201).json({
      success: true,
      message: 'Event tracked successfully',
      data: {
        id: analytics._id,
        timestamp: analytics.createdAt,
      },
    });

  } catch (error) {
    console.error('❌ Analytics tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track event',
    });
  }
});

// GET /api/analytics/stats - Get analytics statistics
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate, type, page } = req.query;
    
    // Build query filter
    const filter = {};
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }
    
    if (type) filter.type = type;
    if (page) filter.page = page;

    // Aggregate statistics
    const [
      totalEvents,
      eventsByType,
      eventsByPage,
      eventsByDevice,
      eventsByBrowser,
      eventsByDate,
      uniqueSessions
    ] = await Promise.all([
      // Total events
      Analytics.countDocuments(filter),

      // Events by type
      Analytics.aggregate([
        { $match: filter },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Events by page
      Analytics.aggregate([
        { $match: filter },
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 }
      ]),

      // Events by device type
      Analytics.aggregate([
        { $match: filter },
        { $group: { _id: '$device.type', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Events by browser
      Analytics.aggregate([
        { $match: filter },
        { $group: { _id: '$device.browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Events by date (last 30 days)
      Analytics.aggregate([
        { 
          $match: {
            ...filter,
            createdAt: { 
              $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) 
            }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),

      // Unique sessions
      Analytics.distinct('sessionId', filter)
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalEvents,
          uniqueSessions: uniqueSessions.length,
          avgEventsPerSession: uniqueSessions.length > 0 
            ? Math.round(totalEvents / uniqueSessions.length * 100) / 100 
            : 0
        },
        breakdown: {
          byType: eventsByType,
          byPage: eventsByPage,
          byDevice: eventsByDevice,
          byBrowser: eventsByBrowser,
          byDate: eventsByDate
        }
      },
    });

  } catch (error) {
    console.error('❌ Analytics stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics',
    });
  }
});

// GET /api/analytics/recent - Get recent events
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const type = req.query.type;

    const filter = type ? { type } : {};

    const recentEvents = await Analytics.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-userAgent -ipAddress') // Hide sensitive data
      .exec();

    res.json({
      success: true,
      data: recentEvents,
    });

  } catch (error) {
    console.error('❌ Recent analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve recent events',
    });
  }
});

// GET /api/analytics/popular - Get popular pages/content
router.get('/popular', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [popularPages, popularProjects] = await Promise.all([
      // Popular pages
      Analytics.aggregate([
        { 
          $match: { 
            type: 'page_view', 
            createdAt: { $gte: startDate } 
          } 
        },
        { $group: { _id: '$page', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 10 }
      ]),

      // Popular projects (from project clicks)
      Analytics.aggregate([
        { 
          $match: { 
            type: 'project_click', 
            createdAt: { $gte: startDate } 
          } 
        },
        { 
          $group: { 
            _id: '$metadata.projectId', 
            clicks: { $sum: 1 },
            projectName: { $first: '$metadata.projectName' }
          } 
        },
        { $sort: { clicks: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      success: true,
      data: {
        pages: popularPages,
        projects: popularProjects,
        timeframe: `Last ${days} days`
      },
    });

  } catch (error) {
    console.error('❌ Popular content error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular content',
    });
  }
});

module.exports = router; 
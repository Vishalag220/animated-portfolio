const Analytics = require('../models/Analytics');

// Middleware to automatically track API usage
const trackApiUsage = (eventType = 'api_request') => {
  return async (req, res, next) => {
    try {
      // Skip tracking for health checks and analytics endpoints
      if (req.path.includes('/health') || req.path.includes('/analytics')) {
        return next();
      }

      const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
      const userAgent = req.get('User-Agent') || 'unknown';
      const sessionId = req.sessionID || `${Date.now()}-${Math.random()}`;

      // Create analytics entry (fire and forget)
      setImmediate(async () => {
        try {
          const analytics = new Analytics({
            type: eventType,
            page: req.originalUrl,
            referrer: req.get('Referer') || '',
            userAgent,
            ipAddress,
            sessionId,
            metadata: {
              method: req.method,
              endpoint: req.path,
              query: req.query,
            },
          });

          await analytics.save();
        } catch (error) {
          console.error('❌ Analytics middleware error:', error);
          // Don't affect the main request flow
        }
      });

      next();
    } catch (error) {
      console.error('❌ Analytics middleware error:', error);
      next(); // Don't break the request flow
    }
  };
};

// Middleware to track specific events
const trackEvent = (eventType, getMetadata = null) => {
  return async (req, res, next) => {
    // Store original send method
    const originalSend = res.send;

    // Override send method to track after successful response
    res.send = function(data) {
      // Only track on successful responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        setImmediate(async () => {
          try {
            const ipAddress = req.ip || req.connection.remoteAddress || 'unknown';
            const userAgent = req.get('User-Agent') || 'unknown';
            const sessionId = req.sessionID || `${Date.now()}-${Math.random()}`;

            let metadata = {};
            if (getMetadata && typeof getMetadata === 'function') {
              metadata = getMetadata(req, res, data);
            }

            const analytics = new Analytics({
              type: eventType,
              page: req.originalUrl,
              referrer: req.get('Referer') || '',
              userAgent,
              ipAddress,
              sessionId,
              metadata,
            });

            await analytics.save();
          } catch (error) {
            console.error('❌ Event tracking error:', error);
          }
        });
      }

      // Call original send method
      originalSend.call(this, data);
    };

    next();
  };
};

module.exports = {
  trackApiUsage,
  trackEvent,
}; 
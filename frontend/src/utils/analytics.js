import axios from 'axios';

// Generate a session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('portfolio_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('portfolio_session_id', sessionId);
  }
  return sessionId;
};

// Track an analytics event
export const trackEvent = async (type, page, metadata = {}) => {
  try {
    await axios.post('/api/analytics/track', {
      type,
      page,
      sessionId: getSessionId(),
      metadata,
    });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
    // Don't throw error to avoid breaking user experience
  }
};

// Track page view
export const trackPageView = (page) => {
  trackEvent('page_view', page);
};

// Track contact form view
export const trackContactFormView = () => {
  trackEvent('contact_form_view', '/contact');
};

// Track contact form submission
export const trackContactFormSubmit = (subject) => {
  trackEvent('contact_form_submit', '/contact', {
    subject: subject.substring(0, 50), // First 50 chars only
  });
};

// Track project click
export const trackProjectClick = (projectId, projectName, action = 'view') => {
  trackEvent('project_click', '/projects', {
    projectId,
    projectName,
    action, // 'view', 'github', 'live_demo'
  });
};

// Track resume download
export const trackResumeDownload = () => {
  trackEvent('resume_download', '/resume');
};

// Hook for tracking page views in React components
export const usePageTracking = () => {
  const trackPage = (page) => {
    // Add delay to ensure page is fully loaded
    setTimeout(() => {
      trackPageView(page);
    }, 1000);
  };

  return { trackPage };
};

// Debounced event tracking to prevent spam
const eventTrackingDebounce = new Map();

export const trackEventDebounced = (type, page, metadata = {}, delay = 2000) => {
  const key = `${type}-${page}`;
  
  if (eventTrackingDebounce.has(key)) {
    clearTimeout(eventTrackingDebounce.get(key));
  }
  
  const timeoutId = setTimeout(() => {
    trackEvent(type, page, metadata);
    eventTrackingDebounce.delete(key);
  }, delay);
  
  eventTrackingDebounce.set(key, timeoutId);
}; 
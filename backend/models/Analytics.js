const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['page_view', 'contact_form_view', 'contact_form_submit', 'project_click', 'resume_download'],
    required: true
  },
  page: {
    type: String,
    required: true,
    trim: true
  },
  referrer: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  country: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  device: {
    type: {
      type: String,
      enum: ['desktop', 'tablet', 'mobile', 'unknown'],
      default: 'unknown'
    },
    browser: {
      type: String,
      trim: true
    },
    os: {
      type: String,
      trim: true
    }
  },
  sessionId: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
analyticsSchema.index({ createdAt: -1 });
analyticsSchema.index({ type: 1, createdAt: -1 });
analyticsSchema.index({ page: 1, createdAt: -1 });
analyticsSchema.index({ sessionId: 1 });

// Virtual for date grouping
analyticsSchema.virtual('dateGroup').get(function() {
  return this.createdAt.toISOString().split('T')[0];
});

module.exports = mongoose.model('Analytics', analyticsSchema); 
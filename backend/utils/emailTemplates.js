// Email template for contact form notification to site owner
const getContactNotificationTemplate = (contactData) => {
  const { name, email, subject, message, ipAddress, userAgent } = contactData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 30px 20px;
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .content {
          background: #ffffff;
          padding: 30px;
          border: 1px solid #e2e8f0;
          border-top: none;
        }
        .contact-info {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .message-content {
          background: #ffffff;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          margin: 20px 0;
        }
        .tech-details {
          background: #f1f5f9;
          padding: 15px;
          border-radius: 8px;
          font-size: 12px;
          color: #64748b;
          margin-top: 20px;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          margin-top: 10px;
        }
        .btn:hover {
          background: #2563eb;
        }
        .priority-high {
          border-left: 4px solid #ef4444;
          padding-left: 16px;
        }
        .priority-normal {
          border-left: 4px solid #3b82f6;
          padding-left: 16px;
        }
        .meta-row {
          margin: 8px 0;
        }
        .meta-label {
          font-weight: 600;
          display: inline-block;
          width: 100px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">📧 New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Website</p>
      </div>
      
      <div class="content">
        <div class="contact-info priority-normal">
          <h2 style="margin-top: 0; color: #1e293b;">Contact Details</h2>
          <div class="meta-row">
            <span class="meta-label">Name:</span>
            <strong>${name}</strong>
          </div>
          <div class="meta-row">
            <span class="meta-label">Email:</span>
            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
          </div>
          <div class="meta-row">
            <span class="meta-label">Subject:</span>
            <strong>${subject}</strong>
          </div>
          <div class="meta-row">
            <span class="meta-label">Submitted:</span>
            ${new Date().toLocaleString()}
          </div>
        </div>

        <div class="message-content">
          <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
          <div style="line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" class="btn">
            Reply to ${name}
          </a>
        </div>

        <div class="tech-details">
          <h4 style="margin-top: 0; color: #475569;">Technical Details</h4>
          <div class="meta-row">
            <span class="meta-label">IP Address:</span>
            ${ipAddress}
          </div>
          <div class="meta-row">
            <span class="meta-label">User Agent:</span>
            ${userAgent}
          </div>
          <div class="meta-row">
            <span class="meta-label">Timestamp:</span>
            ${new Date().toISOString()}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email template for auto-reply to contact form sender
const getAutoReplyTemplate = (contactData) => {
  const { name, subject } = contactData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting me!</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #10b981, #3b82f6);
          color: white;
          padding: 40px 20px;
          border-radius: 12px 12px 0 0;
          text-align: center;
        }
        .content {
          background: #ffffff;
          padding: 40px 30px;
          border: 1px solid #e2e8f0;
          border-top: none;
        }
        .summary-box {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin: 25px 0;
          border-left: 4px solid #10b981;
        }
        .social-links {
          text-align: center;
          margin: 30px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          padding: 10px 20px;
          background: #f1f5f9;
          color: #3b82f6;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .social-links a:hover {
          background: #3b82f6;
          color: white;
        }
        .footer {
          background: #f8fafc;
          padding: 20px;
          border-radius: 0 0 12px 12px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
          border: 1px solid #e2e8f0;
          border-top: none;
        }
        .response-time {
          background: #ecfdf5;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 12px 16px;
          border-radius: 6px;
          margin: 20px 0;
          font-weight: 500;
        }
        ul {
          padding-left: 20px;
        }
        li {
          margin: 8px 0;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">🙏 Thank You, ${name}!</h1>
        <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 16px;">
          I've received your message and I'm excited to connect!
        </p>
      </div>
      
      <div class="content">
        <p style="font-size: 16px; margin-bottom: 20px;">
          Hi ${name},
        </p>
        
        <p>
          Thank you for reaching out through my portfolio website! I truly appreciate you taking the time to get in touch.
        </p>

        <div class="response-time">
          ⚡ <strong>Quick Response Promise:</strong> I'll get back to you within 24-48 hours, usually much sooner!
        </div>

        <div class="summary-box">
          <h3 style="margin-top: 0; color: #1e293b;">Your Message Summary</h3>
          <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
          <p style="margin: 8px 0;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: 500;">✅ Delivered Successfully</span></p>
        </div>
        
        <p>
          While you're waiting for my response, feel free to:
        </p>
        
        <ul>
          <li>🚀 Explore my latest projects and case studies</li>
          <li>💡 Check out my technical blog posts and insights</li>
          <li>🤝 Connect with me on social media</li>
          <li>📄 Download my resume for detailed experience</li>
        </ul>

        <div class="social-links">
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://twitter.com" target="_blank">Twitter</a>
        </div>
        
        <p style="margin-top: 30px;">
          I'm looking forward to learning more about your project and discussing how we can work together to bring your ideas to life!
        </p>
        
        <p>
          Best regards,<br>
          <strong>Your Name</strong><br>
          <em>Full-Stack Developer & Creative Problem Solver</em>
        </p>
      </div>
      
      <div class="footer">
        <p style="margin: 0;">
          This is an automated confirmation email. Please do not reply directly to this message.
        </p>
        <p style="margin: 5px 0 0 0;">
          For urgent matters, feel free to call me at +1 (555) 123-4567
        </p>
      </div>
    </body>
    </html>
  `;
};

// Text versions for email clients that don't support HTML
const getContactNotificationText = (contactData) => {
  const { name, email, subject, message, ipAddress, userAgent } = contactData;
  
  return `
NEW CONTACT FORM SUBMISSION
Portfolio Website

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}
Submitted: ${new Date().toLocaleString()}

Message:
${message}

Technical Details:
IP Address: ${ipAddress}
User Agent: ${userAgent}
Timestamp: ${new Date().toISOString()}

Reply to this inquiry: mailto:${email}?subject=Re: ${encodeURIComponent(subject)}
  `.trim();
};

const getAutoReplyText = (contactData) => {
  const { name, subject } = contactData;
  
  return `
Thank you for contacting me, ${name}!

I've received your message and will get back to you within 24-48 hours.

Your Message Summary:
Subject: ${subject}
Received: ${new Date().toLocaleString()}
Status: ✅ Delivered Successfully

While you wait, feel free to:
- Check out my projects: https://github.com
- Connect on LinkedIn: https://linkedin.com
- Follow on Twitter: https://twitter.com

Looking forward to our conversation!

Best regards,
Your Name
Full-Stack Developer

---
This is an automated response. Please do not reply to this email.
  `.trim();
};

module.exports = {
  getContactNotificationTemplate,
  getAutoReplyTemplate,
  getContactNotificationText,
  getAutoReplyText,
}; 
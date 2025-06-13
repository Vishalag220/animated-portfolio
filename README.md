# 🚀 Animated Portfolio

A modern, responsive portfolio website built with React, Three.js, and cutting-edge web technologies.

## ✨ Features

- **Modern Design**: Black & white theme with glass morphism effects
- **3D Animations**: Three.js powered hero section with animated sphere and particles
- **Responsive**: Works perfectly on all devices
- **Working Contact Form**: Powered by Getform for reliable message delivery
- **Fast Performance**: Optimized bundle size (331.99 kB)
- **Automated Deployment**: GitHub Actions + Vercel integration

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion, Three.js
- **Form Backend**: Getform
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 📱 Live Demo

Visit the live portfolio: [Coming Soon]

## 🚀 Quick Deploy

```bash
./deploy.ps1 "Your update message"
```

---

**Last deployed**: January 13, 2025 - Getform integration with enhanced contact form

## Features

- 🎨 Modern React frontend with Tailwind CSS
- 🎭 Smooth animations with Framer Motion
- 🌐 3D interactive elements with Three.js
- 📱 Fully responsive design
- 🌙 Dark/Light mode toggle
- 📧 Contact form with email functionality
- 🚀 Deploy-ready configuration

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion
- Three.js (@react-three/fiber)
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Nodemailer for email
- CORS middleware

## Quick Start

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your MongoDB connection string and email credentials

3. **Run the development servers:**
   ```bash
   npm run dev
   ```

   This will start both frontend (port 3000) and backend (port 5000) concurrently.

## Project Structure

```
animated-portfolio/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions
│   │   └── hooks/      # Custom hooks
├── backend/            # Node.js backend
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   └── middleware/     # Custom middleware
└── README.md
```

## Deployment

### Frontend (Vercel/Netlify)
- Build command: `npm run build`
- Output directory: `frontend/build`

### Backend (Render/Railway)
- Start command: `npm start`
- Root directory: `backend`

## Environment Variables

See `backend/.env.example` for required environment variables. 
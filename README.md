# Animated Portfolio Website

A modern, full-stack portfolio website built with React, Three.js, Framer Motion, and Node.js.

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
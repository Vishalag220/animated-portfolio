#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Deployment script for portfolio website
console.log('🚀 Portfolio Deployment Script\n');

const deployOptions = {
  vercel: {
    name: 'Vercel (Recommended for frontend)',
    command: 'npx vercel --prod',
    setup: [
      'npm install -g vercel',
      'vercel login',
      'vercel --prod'
    ]
  },
  netlify: {
    name: 'Netlify (Frontend alternative)',
    command: 'npx netlify deploy --prod',
    setup: [
      'npm install -g netlify-cli',
      'netlify login',
      'netlify init',
      'netlify deploy --prod'
    ]
  },
  render: {
    name: 'Render (Backend)',
    command: 'git push origin main',
    setup: [
      'Connect your GitHub repo to Render',
      'Set environment variables in Render dashboard',
      'Deploy automatically on git push'
    ]
  },
  railway: {
    name: 'Railway (Backend alternative)',
    command: 'railway up',
    setup: [
      'npm install -g @railway/cli',
      'railway login',
      'railway link',
      'railway up'
    ]
  }
};

function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📋 ${description}...`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`⚠️  Warning: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function buildFrontend() {
  console.log('🏗️  Building frontend...\n');
  
  try {
    await runCommand('cd frontend && npm run build', 'Building React app');
    console.log('✅ Frontend build completed!\n');
  } catch (error) {
    console.error('❌ Frontend build failed:', error.message);
    process.exit(1);
  }
}

async function testBackend() {
  console.log('🧪 Testing backend...\n');
  
  try {
    // Check if backend dependencies are installed
    if (!fs.existsSync('backend/node_modules')) {
      await runCommand('cd backend && npm install', 'Installing backend dependencies');
    }
    
    // Run a quick test
    await runCommand('cd backend && npm run test --passWithNoTests', 'Running backend tests');
    console.log('✅ Backend tests passed!\n');
  } catch (error) {
    console.error('⚠️  Backend tests failed, but continuing with deployment...\n');
  }
}

function displayDeploymentOptions() {
  console.log('🌐 Deployment Options:\n');
  
  Object.entries(deployOptions).forEach(([key, option]) => {
    console.log(`${key.toUpperCase()}:`);
    console.log(`  📝 ${option.name}`);
    console.log(`  📋 Setup steps:`);
    option.setup.forEach(step => console.log(`     • ${step}`));
    console.log(`  🚀 Deploy command: ${option.command}\n`);
  });
}

function createVercelConfig() {
  const vercelConfig = {
    "version": 2,
    "name": "portfolio-website",
    "builds": [
      {
        "src": "frontend/package.json",
        "use": "@vercel/static-build",
        "config": {
          "distDir": "build"
        }
      }
    ],
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "https://your-backend-url.com/api/$1"
      },
      {
        "src": "/(.*)",
        "dest": "/frontend/$1"
      }
    ],
    "env": {
      "REACT_APP_API_URL": "https://your-backend-url.com"
    }
  };
  
  fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
  console.log('✅ Created vercel.json configuration');
}

function createNetlifyConfig() {
  const netlifyConfig = `[build]
  base = "frontend/"
  publish = "build/"
  command = "npm run build"

[build.environment]
  REACT_APP_API_URL = "https://your-backend-url.com"

[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.com/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`;
  
  fs.writeFileSync('netlify.toml', netlifyConfig);
  console.log('✅ Created netlify.toml configuration');
}

function createDockerfiles() {
  // Frontend Dockerfile
  const frontendDockerfile = `FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;

  // Backend Dockerfile
  const backendDockerfile = `FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD ["npm", "start"]`;

  // Nginx config for frontend
  const nginxConfig = `server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}`;

  fs.writeFileSync('frontend/Dockerfile', frontendDockerfile);
  fs.writeFileSync('backend/Dockerfile', backendDockerfile);
  fs.writeFileSync('frontend/nginx.conf', nginxConfig);
  
  console.log('✅ Created Docker configurations');
}

async function main() {
  const args = process.argv.slice(2);
  const platform = args[0];

  if (!platform) {
    displayDeploymentOptions();
    console.log('💡 Usage: node deploy.js [platform]');
    console.log('   Example: node deploy.js vercel\n');
    return;
  }

  // Pre-deployment steps
  await buildFrontend();
  await testBackend();

  // Create platform-specific configurations
  switch (platform.toLowerCase()) {
    case 'vercel':
      createVercelConfig();
      console.log('🚀 Ready for Vercel deployment!');
      console.log('💡 Next steps:');
      console.log('   1. Install Vercel CLI: npm install -g vercel');
      console.log('   2. Login: vercel login');
      console.log('   3. Deploy: vercel --prod');
      break;
      
    case 'netlify':
      createNetlifyConfig();
      console.log('🚀 Ready for Netlify deployment!');
      console.log('💡 Next steps:');
      console.log('   1. Install Netlify CLI: npm install -g netlify-cli');
      console.log('   2. Login: netlify login');
      console.log('   3. Deploy: netlify deploy --prod');
      break;
      
    case 'docker':
      createDockerfiles();
      console.log('🚀 Ready for Docker deployment!');
      console.log('💡 Next steps:');
      console.log('   1. Build frontend: docker build -t portfolio-frontend ./frontend');
      console.log('   2. Build backend: docker build -t portfolio-backend ./backend');
      console.log('   3. Run with docker-compose');
      break;
      
    default:
      console.log(`❌ Unknown platform: ${platform}`);
      displayDeploymentOptions();
      break;
  }

  console.log('\n🎉 Deployment preparation completed!');
  console.log('📖 Don\'t forget to:');
  console.log('   • Set up environment variables');
  console.log('   • Configure your database connection');
  console.log('   • Update API URLs in your config');
  console.log('   • Test your deployment thoroughly\n');
}

main().catch(console.error); 
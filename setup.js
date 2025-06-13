#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio Website Setup Script\n');

function runCommand(command, description, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`📋 ${description}...`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr && !stderr.includes('npm WARN')) {
        console.error(`⚠️  Warning: ${stderr}`);
      }
      console.log('✅ Done!\n');
      resolve(stdout);
    });
  });
}

async function setupFrontend() {
  console.log('🎨 Setting up frontend...\n');
  
  try {
    const frontendPath = path.join(process.cwd(), 'frontend');
    
    if (!fs.existsSync(frontendPath)) {
      console.log('❌ Frontend directory not found!');
      return;
    }
    
    // Install frontend dependencies
    await runCommand('npm install', 'Installing frontend dependencies', frontendPath);
    
    // Create environment file if it doesn't exist
    const envPath = path.join(frontendPath, '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Frontend Environment Variables
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SITE_URL=http://localhost:3000
REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id
REACT_APP_ENVIRONMENT=development
`;
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created frontend .env file');
    }
    
    console.log('✅ Frontend setup completed!\n');
  } catch (error) {
    console.error('❌ Frontend setup failed:', error.message);
  }
}

async function setupBackend() {
  console.log('🔧 Setting up backend...\n');
  
  try {
    const backendPath = path.join(process.cwd(), 'backend');
    
    if (!fs.existsSync(backendPath)) {
      console.log('❌ Backend directory not found!');
      return;
    }
    
    // Install backend dependencies
    await runCommand('npm install', 'Installing backend dependencies', backendPath);
    
    // Create environment file if it doesn't exist
    const envPath = path.join(backendPath, '.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Backend Environment Variables
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com

# Security
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created backend .env file');
    }
    
    console.log('✅ Backend setup completed!\n');
  } catch (error) {
    console.error('❌ Backend setup failed:', error.message);
  }
}

async function setupRoot() {
  console.log('📦 Setting up root dependencies...\n');
  
  try {
    // Install root dependencies
    await runCommand('npm install', 'Installing root dependencies');
    
    console.log('✅ Root setup completed!\n');
  } catch (error) {
    console.error('❌ Root setup failed:', error.message);
  }
}

function createGitignore() {
  const gitignoreContent = `# Dependencies
node_modules/
*/node_modules/

# Production builds
frontend/build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Deployment
vercel.json
netlify.toml
`;

  if (!fs.existsSync('.gitignore')) {
    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ Created .gitignore file');
  }
}

function displayNextSteps() {
  console.log('🎉 Setup completed! Here are your next steps:\n');
  
  console.log('📝 CONFIGURATION:');
  console.log('   1. Update environment variables in:');
  console.log('      • frontend/.env');
  console.log('      • backend/.env');
  console.log('   2. Set up your MongoDB database');
  console.log('   3. Configure email settings for contact form\n');
  
  console.log('🚀 DEVELOPMENT:');
  console.log('   • Start development: npm run dev');
  console.log('   • Frontend only: npm run frontend');
  console.log('   • Backend only: npm run backend');
  console.log('   • Build frontend: npm run build:frontend\n');
  
  console.log('🌐 DEPLOYMENT:');
  console.log('   • Deploy to Vercel: node deploy.js vercel');
  console.log('   • Deploy to Netlify: node deploy.js netlify');
  console.log('   • Create Docker files: node deploy.js docker\n');
  
  console.log('📖 CUSTOMIZATION:');
  console.log('   • Update personal information in frontend/src/components/');
  console.log('   • Replace placeholder images and content');
  console.log('   • Customize colors in frontend/tailwind.config.js');
  console.log('   • Add your projects data in frontend/src/components/Projects.js\n');
  
  console.log('🔧 TROUBLESHOOTING:');
  console.log('   • Check all .env files are configured');
  console.log('   • Ensure MongoDB is running (if using local database)');
  console.log('   • Verify email credentials for contact form');
  console.log('   • Update CORS settings for your domain\n');
  
  console.log('📚 DOCUMENTATION:');
  console.log('   • README.md - Complete setup guide');
  console.log('   • API documentation: http://localhost:5000/api');
  console.log('   • Component documentation in source files\n');
}

async function main() {
  try {
    console.log('🏁 Starting portfolio website setup...\n');
    
    // Create .gitignore
    createGitignore();
    
    // Setup all parts
    await setupRoot();
    await setupFrontend();
    await setupBackend();
    
    // Display next steps
    displayNextSteps();
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup if called directly
if (require.main === module) {
  main();
}

module.exports = { setupFrontend, setupBackend, setupRoot }; 
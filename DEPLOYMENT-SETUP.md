# 🚀 Automated Deployment Setup

## What This Does
- **Auto-deploy**: Every time you push code to GitHub, it automatically deploys to Vercel
- **Manual deploy**: You can also trigger deployments manually from GitHub Actions
- **Quick deploy**: Use the `deploy.ps1` script for one-command deployment

## Setup Steps

### 1️⃣ Deploy to Vercel (First Time)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your `animated-portfolio` repository
4. **Change these settings**:
   - **Project Name**: `vishal-portfolio`
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./frontend`
5. Click "Deploy"

### 2️⃣ Get Vercel Secrets
After your first deployment:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project (`vishal-portfolio`)
3. Go to **Settings** → **General**
4. Copy these values:
   - **Project ID** (near the top)
   - **Team ID** (if you have a team, otherwise leave empty)

### 3️⃣ Create Vercel Token
1. Go to [Vercel Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name: `GitHub Actions`
4. Copy the token (starts with `vercel_`)

### 4️⃣ Add Secrets to GitHub
1. Go to your GitHub repository: https://github.com/Vishalag220/animated-portfolio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret" and add these 3 secrets:

   | Secret Name | Value |
   |-------------|-------|
   | `VERCEL_TOKEN` | Your Vercel token (vercel_xxx...) |
   | `PROJECT_ID` | Your Project ID from Vercel |
   | `ORG_ID` | Your Team ID (or leave empty if no team) |

## 🎯 How to Use

### Method 1: Quick Deploy Script
```powershell
# Deploy with custom message
./deploy.ps1 "Added new animations"

# Deploy with default message
./deploy.ps1
```

### Method 2: Manual GitHub Actions
1. Go to https://github.com/Vishalag220/animated-portfolio/actions
2. Click "🚀 Auto Deploy to Vercel"
3. Click "Run workflow"
4. Add optional message and click "Run workflow"

### Method 3: Auto Deploy
Just push to main branch - it deploys automatically!
```powershell
git add .
git commit -m "Updated portfolio"
git push origin main
```

## 🌐 Your Live Site
After setup, your portfolio will be live at:
**https://vishal-portfolio.vercel.app**

## 🔍 Check Deployment Status
- **GitHub Actions**: https://github.com/Vishalag220/animated-portfolio/actions
- **Vercel Dashboard**: https://vercel.com/dashboard

## ✅ Benefits
- ⚡ **Instant**: Deploy in ~2 minutes
- 🔄 **Automatic**: Push code → Live site
- 📱 **Mobile optimized**: Vercel handles everything
- 🌍 **Global CDN**: Fast worldwide
- 🔒 **HTTPS**: Secure by default
- 📊 **Analytics**: Built-in performance monitoring 
# 🔐 GitHub Setup Guide

## Step 1: Create Repository on GitHub.com

1. **Go to [github.com](https://github.com) and sign in**
2. **Click the "+" icon** → "New repository"
3. **Repository settings:**
   - **Name:** `animated-portfolio`
   - **Description:** `Modern animated portfolio with React, Three.js, and Framer Motion`
   - **Public** ✅
   - **Don't initialize** with README, .gitignore, or license
4. **Click "Create repository"**

## Step 2: Push Your Code

After creating the repository, run these commands one by one:

```powershell
# Add the new remote repository
git remote add origin https://github.com/Vishalag220/animated-portfolio.git

# Push your code (you'll be prompted for GitHub credentials)
git push -u origin main
```

## Step 3: GitHub Authentication

When prompted for credentials:

### Option A: Personal Access Token (Recommended)
1. **Go to GitHub Settings** → Developer settings → Personal access tokens → Tokens (classic)
2. **Click "Generate new token"**
3. **Select scopes:** `repo` (full control of private repositories)
4. **Copy the token** and use it as your password when pushing

### Option B: GitHub Desktop
1. **Download GitHub Desktop** from [desktop.github.com](https://desktop.github.com)
2. **Sign in** with your GitHub account
3. **Clone or add** your repository through the GUI

## Step 4: Verify Upload

After successful push, your repository will be available at:
**https://github.com/Vishalag220/animated-portfolio**

## Step 5: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Import your `animated-portfolio` repository**
4. **Configure:**
   - **Framework:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. **Deploy!**

## Expected Result

Your portfolio will be live at:
`https://animated-portfolio-[random].vercel.app`

---

**🎯 Your code is ready to upload! Just follow the steps above.** 
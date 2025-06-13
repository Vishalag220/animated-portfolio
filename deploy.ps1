#!/usr/bin/env pwsh

# 🚀 Quick Deploy Script for Portfolio
# Usage: ./deploy.ps1 "Your commit message"

param(
    [string]$message = "Update portfolio"
)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "📦 Adding changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $message

# Push to GitHub (triggers auto-deployment)
Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Deployment triggered!" -ForegroundColor Green
Write-Host "🌐 Your site will be live in ~2 minutes at: https://vishal-portfolio.vercel.app" -ForegroundColor Cyan
Write-Host "📊 Check deployment status: https://github.com/Vishalag220/animated-portfolio/actions" -ForegroundColor Cyan 
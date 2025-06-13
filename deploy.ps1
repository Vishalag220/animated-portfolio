#!/usr/bin/env pwsh

# Portfolio Deployment Script
# Usage: .\deploy.ps1 "Your commit message"

param(
    [string]$message = "Portfolio update"
)

Write-Host "🚀 Deploying Portfolio..." -ForegroundColor Green
Write-Host "📝 Commit message: $message" -ForegroundColor Blue

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "Error: Not a git repository!" -ForegroundColor Red
    exit 1
}

# Add all changes
Write-Host "📂 Adding changes..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m $message

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🔄 GitHub Actions will now build your portfolio" -ForegroundColor Cyan
    Write-Host "🔗 Check progress at: https://github.com/Vishalag220/animated-portfolio/actions" -ForegroundColor Blue
    
    # Ask if user wants to deploy to Vercel as well
    $deployVercel = Read-Host "Would you like to deploy to Vercel now? (y/N)"
    
    if ($deployVercel -eq "y" -or $deployVercel -eq "Y") {
        Write-Host "🌐 Starting Vercel deployment..." -ForegroundColor Yellow
        .\deploy-vercel.ps1 $message
    }
    
    Write-Host "🎉 Deployment process complete!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to push to GitHub!" -ForegroundColor Red
} 
# Automated Vercel Deployment Script
# Usage: .\deploy-vercel.ps1 "Deployment message"

param(
    [string]$message = "Portfolio deployment update"
)

Write-Host "🚀 Starting Vercel Deployment..." -ForegroundColor Green
Write-Host "📝 Message: $message" -ForegroundColor Blue

# Navigate to frontend directory
Set-Location frontend

# Build the project
Write-Host "🏗️ Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Deploy to Vercel
    Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
    vercel --token c9Y54BwujfIKqrijCfD773Qn --prod --yes
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "🔗 Your portfolio is now live!" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Deployment failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
}

# Return to root directory
Set-Location ..

Write-Host "✨ Deployment process complete!" -ForegroundColor Green 
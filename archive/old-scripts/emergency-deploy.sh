#!/bin/bash
# Emergency: Deploy directly to Vercel via CLI

cd /Users/htanweer/Desktop/thebestinlondon

echo "🚨 EMERGENCY VERCEL DEPLOY"
echo "========================="
echo ""

# Check if vercel CLI installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    echo ""
fi

echo "🔐 Login to Vercel..."
echo "(Browser will open - use your Vercel account)"
vercel login
echo ""

echo "🚀 Deploying to Production..."
echo ""
echo "This will:"
echo "  1. Build the site locally"
echo "  2. Upload to Vercel"
echo "  3. Deploy to production (thebestinlondon.co.uk)"
echo ""
echo "⏰ Estimated time: 3-5 minutes"
echo ""

# Deploy
vercel --prod

echo ""
echo "✅ Deploy command executed!"
echo ""
echo "Check deployment status:"
echo "https://vercel.com/dashboard"

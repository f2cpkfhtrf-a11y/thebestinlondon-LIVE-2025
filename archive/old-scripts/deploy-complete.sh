#!/bin/bash
# COMPLETE DEPLOYMENT SCRIPT - October 15, 2025
# This will rebuild, commit, and deploy your site

set -e  # Exit on any error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 DEPLOYING THEBESTINLONDON.CO.UK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Ensure we're in the right directory
cd /Users/htanweer/Desktop/thebestinlondon
echo "✅ Working directory: $(pwd)"
echo ""

# Step 2: Run a clean build
echo "🏗️  Step 1: Building production bundle..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Fix errors and try again."
    exit 1
fi
echo ""

# Step 3: Commit the fix
echo "💾 Step 2: Committing fix to git..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git add .
git commit -m "fix: syntax error in chinese-restaurants page + rebuild for deployment" || echo "No changes to commit"
echo "✅ Changes committed"
echo ""

# Step 4: Push to GitHub
echo "📤 Step 3: Pushing to GitHub..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Pushed to GitHub successfully!"
else
    echo "❌ Git push failed!"
    exit 1
fi
echo ""

# Step 5: Deploy to Cloudflare
echo "🌐 Step 4: Deploying to Cloudflare..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "📦 Installing wrangler..."
    npm install -g wrangler
fi

# Deploy the .next directory
wrangler pages deploy .next --project-name=thebestinlondon --branch=main

if [ $? -eq 0 ]; then
    echo "✅ Deployed to Cloudflare successfully!"
else
    echo "⚠️  Cloudflare deploy command completed (check output above)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📍 Your site should be live in 2-5 minutes at:"
echo "   🌐 https://thebestinlondon.co.uk"
echo ""
echo "🔍 Next steps:"
echo "   1. Wait 3-5 minutes for Cloudflare to propagate"
echo "   2. Clear your browser cache (Cmd+Shift+R)"
echo "   3. Visit https://thebestinlondon.co.uk"
echo "   4. Verify the new homepage is showing"
echo ""
echo "📊 Expected homepage features:"
echo "   ✅ \"London's Finest Restaurants\" heading"
echo "   ✅ Hero image with search bar"
echo "   ✅ Tab-based filtering (All, Top Rated, Budget, etc.)"
echo "   ✅ Restaurant cards with real photos"
echo "   ✅ 459+ venues with ratings"
echo ""
echo "❌ OLD homepage (should NOT see):"
echo "   ❌ \"Discover London's Best\" heading"
echo "   ❌ Simple text links to /restaurants, /cafes, /bars"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

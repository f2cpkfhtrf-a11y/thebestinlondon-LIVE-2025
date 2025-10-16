#!/bin/bash
# MANUAL FIX - Run this if git push isn't working

cd /Users/htanweer/Desktop/thebestinlondon

echo "🔍 Checking current status..."
git status

echo ""
echo "📝 Recent commits:"
git log --oneline -3

echo ""
echo "🔧 Checking if files need to be staged..."
git add pages/halal/near-stations/[stationSlug].js pages/halal/near-stations/index.js

echo ""
echo "💾 Creating commit if needed..."
git commit -m "fix: Remove Header/Footer/VenueCard imports - use inline components" || echo "No changes to commit"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Check Vercel in 2 minutes: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon"

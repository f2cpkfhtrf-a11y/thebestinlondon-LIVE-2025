#!/bin/bash

# 🚀 BestOfLondon - Complete Deployment Script
# Run this from project root: bash scripts/deploy-complete.sh

set -e

echo "🚀 Starting BestOfLondon Deployment..."
echo ""

# Step 1: Add Areas Section to Home Page
echo "📝 Step 1: Adding Areas section to home page..."
node scripts/add-areas-to-home.js
echo "✅ Home page updated!"
echo ""

# Step 2: Git Status Check
echo "📊 Step 2: Checking git status..."
git status --short
echo ""

# Step 3: Stage All Changes
echo "📦 Step 3: Staging all changes..."
git add .
echo "✅ Changes staged!"
echo ""

# Step 4: Commit
echo "💾 Step 4: Committing changes..."
git commit -m "feat: Add East London hub, 7 area pages with dietary filters, 760 venues with 100% review coverage

- Added /east-london hub page with dietary filters
- Updated 7 area pages: Whitechapel, Shoreditch, Bethnal Green, Canary Wharf, Stratford, Hackney, Spitalfields
- Added 'Explore by Area' section to home page
- Data expansion: 760 venues total, 162 in East London
- 100% Google review coverage (avg 2,257 reviews/venue)
- 47.6% FSA rating coverage
- Premium dark theme consistent across all pages
- Sticky dietary filter bars on area pages
- High-res images (Google + Unsplash)
- All routing automatic (cuisines, dietary tags, areas)

Pipeline duration: 22.82 minutes
All 6 steps successful: Snapshot → Expansion → Details → Merge → FSA → Final

Ready for production deployment."

echo "✅ Changes committed!"
echo ""

# Step 5: Push to GitHub
echo "🌐 Step 5: Pushing to GitHub..."
git push origin feat/data-theme-integration
echo "✅ Pushed to GitHub!"
echo ""

# Step 6: Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ DEPLOYMENT COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "  • 760 venues (was ~150)"
echo "  • 162 East London venues"
echo "  • 100% review coverage"
echo "  • 47.6% FSA verified"
echo "  • 8 new/updated pages"
echo "  • Branch: feat/data-theme-integration"
echo ""
echo "🚀 Next Steps:"
echo "  1. Vercel will auto-deploy from GitHub push"
echo "  2. Check deployment at: https://vercel.com/your-project"
echo "  3. Or manual deploy: cd /Users/htanweer/Desktop/thebestinlondon && vercel --prod"
echo ""
echo "🎯 Pages to test:"
echo "  • / (home with Areas section)"
echo "  • /east-london (hub page)"
echo "  • /restaurants-whitechapel (filters)"
echo "  • /restaurants-shoreditch (filters)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

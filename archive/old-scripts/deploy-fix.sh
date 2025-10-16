#!/bin/bash
# deploy-fix.sh - Fix and deploy BestOfLondon
set -e

cd "$(dirname "$0")"

echo "🔍 PHASE 1: Pre-deployment Check"
echo "================================="

# Check Node version
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Check for required files
echo ""
echo "📁 Checking files..."
[ -f ".nvmrc" ] && echo "✅ .nvmrc exists" || echo "❌ .nvmrc missing"
[ -f "vercel.json" ] && echo "✅ vercel.json exists" || echo "❌ vercel.json missing"
[ -f "package-lock.json" ] && echo "✅ package-lock.json exists" || echo "❌ package-lock.json missing"
[ -f ".env.local" ] && echo "✅ .env.local exists" || echo "❌ .env.local missing"

echo ""
echo "🧹 PHASE 2: Clean Build"
echo "======================="

# Clean previous builds
echo "Removing .next and node_modules..."
rm -rf .next node_modules

# Fresh install
echo "Running npm ci..."
npm ci

# Build
echo "Running npm run build..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ BUILD SUCCESSFUL!"
    echo ""
    echo "🚀 PHASE 3: Deploy Options"
    echo "=========================="
    echo ""
    echo "Choose deployment method:"
    echo ""
    echo "Option 1 (Recommended): Git Push"
    echo "  This will trigger Vercel auto-deploy from GitHub"
    echo "  Run: git add -A && git commit -m 'fix: CI configuration' && git push origin main"
    echo ""
    echo "Option 2: Vercel CLI (Bypass GitHub)"
    echo "  Deploy the prebuilt version directly"
    echo "  Run: vercel build && vercel deploy --prebuilt --prod"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Review changes: git status"
    echo "2. Commit files: git add -A && git commit -m 'fix: CI config + build health docs'"
    echo "3. Push: git push origin main"
    echo "4. Monitor: https://vercel.com/dashboard"
    echo ""
else
    echo ""
    echo "❌ BUILD FAILED!"
    echo ""
    echo "Check errors above and fix before deploying."
    exit 1
fi

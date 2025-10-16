#!/bin/bash
set -e

echo "🚀 SIMPLE FSA FIX & DEPLOY"
echo "════════════════════════════════════════"

# 1. Fix field names
node scripts/fix-fsa-simple.js

# 2. Clear cache
rm -rf .next

# 3. Build
echo ""
echo "📦 Building..."
npm run build

# 4. Deploy
echo ""
echo "🌐 Deploying..."
npx vercel --prod --yes

echo ""
echo "════════════════════════════════════════"
echo "✅ DEPLOYED!"
echo ""
echo "Visit: https://thebestinlondon.co.uk/restaurants"
echo "Hard refresh: Cmd+Shift+R"
echo ""

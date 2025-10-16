#!/bin/bash

echo "🔄 UPDATING DOMAIN TO LATEST DEPLOYMENT"
echo "══════════════════════════════════════════════════════════"

# Get the latest production deployment URL
echo ""
echo "Step 1: Getting latest deployment URL..."
LATEST_URL=$(npx vercel ls --prod 2>/dev/null | grep "thebestinlondon" | head -1 | awk '{print $2}')

if [ -z "$LATEST_URL" ]; then
  echo "❌ Could not find latest deployment"
  echo ""
  echo "Manual fix:"
  echo "1. Visit: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon"
  echo "2. Find the latest deployment (top of list)"
  echo "3. Click '...' menu → 'Promote to Production'"
  echo "4. Wait 30 seconds, then visit thebestinlondon.co.uk"
  exit 1
fi

echo "✅ Latest deployment: $LATEST_URL"

# Promote it
echo ""
echo "Step 2: Promoting to production..."
npx vercel promote $LATEST_URL --yes

echo ""
echo "══════════════════════════════════════════════════════════"
echo "✅ DOMAIN UPDATED!"
echo ""
echo "Wait 30-60 seconds, then:"
echo "1. Visit: https://thebestinlondon.co.uk"
echo "2. Hard refresh: Cmd+Shift+R"
echo "3. FSA badges should now appear!"
echo ""

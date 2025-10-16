#!/bin/bash

echo "🔍 VERCEL DOMAIN VERIFICATION"
echo "══════════════════════════════════════════════════════════"
echo ""

# Check current Vercel project
echo "📦 Current Vercel Project:"
cat .vercel/project.json | grep -E 'projectName|projectId' | sed 's/[",]//g'
echo ""

# List domains
echo "🌐 Checking domains for this project..."
npx vercel domains ls

echo ""
echo "══════════════════════════════════════════════════════════"
echo ""
echo "🎯 WHAT TO DO:"
echo ""
echo "IF 'thebestinlondon.co.uk' appears above:"
echo "  ✅ Domain is connected - visit https://thebestinlondon.co.uk/restaurants"
echo "  ✅ Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)"
echo ""
echo "IF domain NOT listed:"
echo "  1. Visit: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/settings/domains"
echo "  2. Add domain: thebestinlondon.co.uk"
echo "  3. Wait 60 seconds for DNS propagation"
echo ""
echo "Current deployment URL (works now):"
echo "  https://thebestinlondon-4jecafup1-hassans-projects-cc46d45a.vercel.app"
echo ""

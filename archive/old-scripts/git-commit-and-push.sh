#!/bin/bash
# git-commit-and-push.sh - Simple commit script
cd /Users/htanweer/Desktop/thebestinlondon
git add .nvmrc vercel.json package.json build-health.md deploy-fix.sh
git add pages/halal/near-stations/
git commit -m "fix: CI config - Node 20, vercel.json, build docs, station pages"
git push origin main
echo ""
echo "✅ PUSHED! Check Vercel in 60 seconds: https://vercel.com/dashboard"

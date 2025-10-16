#!/bin/bash
# fix-vercel-github-webhook.sh - Diagnose and fix Vercel GitHub integration

set -e
cd "$(dirname "$0")"

echo "🔍 DIAGNOSING GITHUB → VERCEL CONNECTION"
echo "========================================"
echo ""

# Check git remote
echo "1. Checking Git Remote:"
git remote -v
echo ""

# Check recent commits
echo "2. Recent Commits (local):"
git log --oneline -5
echo ""

# Check if commits are pushed
echo "3. Checking if local is ahead of origin:"
git status -sb
echo ""

# Check GitHub API to see if commits are there
echo "4. Checking GitHub repository..."
REPO="f2cpkfntrf-a1ly/thebestinlondon-LIVE-2025"
BRANCH="main"

echo "Latest commit on GitHub $BRANCH:"
curl -s "https://api.github.com/repos/$REPO/commits/$BRANCH" | grep '"sha"' | head -1
echo ""

echo "5. Last 5 commits on GitHub:"
curl -s "https://api.github.com/repos/$REPO/commits?sha=$BRANCH&per_page=5" | grep '"message"' | head -5
echo ""

echo "✅ DIAGNOSIS COMPLETE"
echo ""
echo "📋 NEXT STEPS TO FIX WEBHOOK:"
echo "================================"
echo ""
echo "If local commits are NOT on GitHub:"
echo "  → Run: git push origin main --force"
echo ""
echo "If commits ARE on GitHub but Vercel isn't deploying:"
echo "  → Webhook is broken. Follow manual steps below."
echo ""
echo "🔧 MANUAL FIX (takes 2 minutes):"
echo "================================"
echo ""
echo "Option A: Disconnect and Reconnect GitHub"
echo "  1. Vercel → Settings → Git"
echo "  2. Click 'Disconnect' next to GitHub repo"
echo "  3. Click 'Connect Git Repository'"
echo "  4. Select: f2cpkfntrf-a1ly/thebestinlondon-LIVE-2025"
echo "  5. Confirm"
echo ""
echo "Option B: Force Webhook Trigger"
echo "  1. Go to GitHub.com → Your repo"
echo "  2. Settings → Webhooks"
echo "  3. Find Vercel webhook (vercel.com)"
echo "  4. Click 'Recent Deliveries'"
echo "  5. Click 'Redeliver' on latest"
echo ""
echo "Option C: Use Vercel CLI (fastest)"
echo "  Run: npm install -g vercel && vercel --prod"
echo ""

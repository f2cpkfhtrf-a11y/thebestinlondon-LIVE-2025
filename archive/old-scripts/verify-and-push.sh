#!/bin/bash
# Manual deployment verification and push

cd /Users/htanweer/Desktop/thebestinlondon

echo "🔍 Deployment Status Check"
echo "=========================="
echo ""

# Check git status
echo "📝 Git Status:"
git status --short
echo ""

# Check recent commits
echo "📜 Recent Commits:"
git log --oneline -5
echo ""

# Check if we're ahead of origin
echo "📡 Push Status:"
git status | grep "Your branch"
echo ""

# Force push if needed
echo "🚀 Ensuring latest code is on GitHub..."
git add -A
git commit -m "fix: station pages optimization - confirmed" --allow-empty
git push origin main --force
echo ""

# Check Vercel webhook
echo "🔗 Vercel Connection:"
echo "Repo: f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025"
echo "Branch: main"
echo ""

echo "✅ Push complete!"
echo ""
echo "⏭️  MANUAL STEPS:"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Find project: thebestinlondon"
echo "3. Check 'Deployments' tab"
echo "4. Look for deployment triggered in last 2 minutes"
echo "5. Click on it to see build logs"
echo ""
echo "If NO deployment triggered:"
echo "• Check Vercel Git integration settings"
echo "• Verify webhook is active"
echo "• Try manual deploy from Vercel dashboard"

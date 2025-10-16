#!/bin/bash
# Check if Vercel CLI deployment succeeded

echo "🔍 Checking Vercel CLI Deployment Status"
echo "========================================"
echo ""

# Check if deployment URL was output
if [ -f /tmp/vercel-deploy.log ]; then
    echo "📄 Deployment log found:"
    cat /tmp/vercel-deploy.log
    echo ""
else
    echo "⚠️  No deployment log found"
    echo ""
fi

# Check Vercel deployments
echo "🌐 Fetching recent Vercel deployments..."
echo ""

# Alternative: Check if we have deployment URL in Terminal
echo "📋 Instructions:"
echo "1. Go to Vercel Dashboard → thebestinlondon → Deployments"
echo "2. Look for deployment from 'main' branch"
echo "3. Should show status: Building / Ready / Error"
echo ""

echo "🔗 Quick links:"
echo "Deployments: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/deployments"
echo "Project: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon"
echo ""

echo "If NO new deployment visible:"
echo "• The CLI deploy may have failed"
echo "• Try manual redeploy from dashboard"
echo "• Or check Terminal for errors"

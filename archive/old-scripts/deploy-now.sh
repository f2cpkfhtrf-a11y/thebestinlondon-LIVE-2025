#!/bin/bash
# deploy-now.sh - Automated deployment to Vercel via GitHub
# Usage: ./deploy-now.sh "your commit message"

set -e
cd "$(dirname "$0")"

CORRECT_REPO="git@github.com:f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025.git"

echo "🚀 BESTOF LONDON - AUTOMATED DEPLOYMENT"
echo "========================================"
echo ""

# Check if commit message provided
if [ -z "$1" ]; then
    echo "❌ ERROR: Commit message required"
    echo "Usage: ./deploy-now.sh \"your commit message\""
    exit 1
fi

COMMIT_MSG="$1"

# 1. Verify correct branch
echo "1️⃣  Checking branch..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  WARNING: You're on branch '$CURRENT_BRANCH', not 'main'"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
echo "✅ On branch: $CURRENT_BRANCH"
echo ""

# 2. Verify correct git remote
echo "2️⃣  Verifying git remote..."
CURRENT_REMOTE=$(git config --get remote.origin.url)
if [ "$CURRENT_REMOTE" != "$CORRECT_REPO" ]; then
    echo "❌ ERROR: Wrong git remote!"
    echo "   Current: $CURRENT_REMOTE"
    echo "   Expected: $CORRECT_REPO"
    echo ""
    echo "Fix with:"
    echo "  git remote remove origin"
    echo "  git remote add origin $CORRECT_REPO"
    exit 1
fi
echo "✅ Git remote correct: f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025"
echo ""

# 3. Check for uncommitted changes
echo "3️⃣  Checking for changes..."
if git diff-index --quiet HEAD --; then
    echo "⚠️  No changes to commit"
    read -p "Push existing commits anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 0
    fi
else
    echo "✅ Changes detected"
    git status --short
    echo ""
fi

# 4. Add changes
echo "4️⃣  Staging changes..."
git add .
echo "✅ Changes staged"
echo ""

# 5. Commit
echo "5️⃣  Creating commit..."
git commit -m "$COMMIT_MSG" || echo "ℹ️  No new changes to commit"
echo ""

# 6. Push to GitHub
echo "6️⃣  Pushing to GitHub..."
git push origin $CURRENT_BRANCH
if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Push failed!"
    exit 1
fi
echo ""

# 7. Show last commit
echo "7️⃣  Last commit:"
git log --oneline -1
echo ""

# 8. Summary
echo "✅✅✅ DEPLOYMENT INITIATED ✅✅✅"
echo ""
echo "📊 Next Steps:"
echo "1. Check Vercel dashboard (opening in browser...)"
echo "2. Wait ~30 seconds for webhook to trigger"
echo "3. Build takes 2-4 minutes"
echo "4. Test: https://www.thebestinlondon.co.uk"
echo ""
echo "🔗 Vercel Dashboard:"
echo "https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/deployments"
echo ""

# 9. Open Vercel dashboard
sleep 2
open "https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/deployments" 2>/dev/null || echo "Open the URL above manually"

echo ""
echo "🎉 Done! Monitor Vercel for deployment status."

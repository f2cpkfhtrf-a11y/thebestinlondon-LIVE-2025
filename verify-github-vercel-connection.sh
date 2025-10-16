#!/bin/bash
# verify-github-vercel-connection.sh - Verify webhook connectivity

set -e
cd "$(dirname "$0")"

CORRECT_REPO="f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025"

echo "🔍 GITHUB ↔️ VERCEL CONNECTION TEST"
echo "===================================="
echo ""

# 1. Check local git remote
echo "1️⃣  Local Git Remote:"
LOCAL_REMOTE=$(git config --get remote.origin.url)
echo "   $LOCAL_REMOTE"

if [[ "$LOCAL_REMOTE" == *"f2cpkfhtrf-a11y"* ]]; then
    echo "   ✅ Correct username (f2cpkfhtrf-a11y)"
else
    echo "   ❌ WRONG USERNAME! Should be f2cpkfhtrf-a11y"
fi

if [[ "$LOCAL_REMOTE" == *"thebestinlondon-LIVE-2025"* ]]; then
    echo "   ✅ Correct repo name"
else
    echo "   ❌ WRONG REPO!"
fi
echo ""

# 2. Check current branch
echo "2️⃣  Current Branch:"
git branch --show-current
echo ""

# 3. Check last local commit
echo "3️⃣  Last Local Commit:"
git log --oneline -1
echo ""

# 4. Check GitHub commits
echo "4️⃣  Last 3 GitHub Commits:"
curl -s "https://api.github.com/repos/$CORRECT_REPO/commits?sha=main&per_page=3" | \
    grep -E '"sha"|"message"' | \
    sed 's/.*"sha": "\([^"]*\)".*/  \1/' | \
    sed 's/.*"message": "\([^"]*\)".*/    → \1/' | \
    head -6 || echo "   ⚠️  Failed to fetch GitHub commits"
echo ""

# 5. Instructions
echo "5️⃣  Manual Checks:"
echo ""
echo "   A) Verify Vercel Connection:"
echo "      → https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/settings/git"
echo "      → Should show: f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025"
echo ""
echo "   B) Check GitHub Webhooks:"
echo "      → https://github.com/$CORRECT_REPO/settings/hooks"
echo "      → Look for vercel.com webhook"
echo "      → Click it → 'Recent Deliveries' → check for green checkmarks"
echo ""

# 6. Summary
echo "📋 CONNECTION STATUS:"
if [[ "$LOCAL_REMOTE" == *"f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025"* ]]; then
    echo "   ✅ Local git remote is correct"
    echo ""
    echo "   If deployments still not working:"
    echo "   1. Check Vercel Settings → Git (link above)"
    echo "   2. Verify webhook on GitHub (link above)"
    echo "   3. Try manual redeploy in Vercel dashboard"
else
    echo "   ❌ Local git remote is WRONG!"
    echo ""
    echo "   Fix with these commands:"
    echo "   git remote remove origin"
    echo "   git remote add origin git@github.com:$CORRECT_REPO.git"
    echo "   git push -u origin main"
fi
echo ""

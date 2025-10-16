#!/bin/bash

# Wait for pipeline to complete
echo "⏳ Waiting 2 minutes for data pipeline to complete..."
sleep 120

echo ""
echo "🚀 AUTO MODE STATUS REPORT"
echo "================================================================"
echo "Time: $(date)"
echo "================================================================"
echo ""

cd /Users/htanweer/Desktop/thebestinlondon

# 1. Check Git Status
echo "1️⃣  GIT STATUS"
echo "-------------------"
echo "Latest commit:"
git log --oneline -1
echo ""
echo "Files changed in last commit:"
git diff --name-only HEAD~1 HEAD | head -10
echo ""

# 2. Check venues.json
echo "2️⃣  VENUES.JSON STATUS"
echo "-------------------"
if [ -f "public/venues.json" ]; then
    FILE_SIZE=$(ls -lh public/venues.json | awk '{print $5}')
    VENUE_COUNT=$(cat public/venues.json | grep -o '"name":' | wc -l | tr -d ' ')
    LAST_MOD=$(stat -f '%Sm' -t '%Y-%m-%d %H:%M:%S' public/venues.json)
    
    echo "✅ File exists"
    echo "   Size: $FILE_SIZE"
    echo "   Venues: $VENUE_COUNT"
    echo "   Last modified: $LAST_MOD"
    echo ""
    
    # Check for reviews
    if grep -q '"reviews":' public/venues.json; then
        REVIEW_FIELDS=$(cat public/venues.json | grep -o '"reviews":' | wc -l | tr -d ' ')
        echo "   ✅ Review fields: $REVIEW_FIELDS"
        
        if grep -q '"author_name"' public/venues.json; then
            REVIEW_DATA=$(cat public/venues.json | grep -o '"author_name"' | wc -l | tr -d ' ')
            echo "   ✅ Review data confirmed: $REVIEW_DATA reviews with authors"
            echo ""
            echo "   📝 Sample review:"
            cat public/venues.json | grep -A 3 '"author_name"' | head -4 | sed 's/^/      /'
        else
            echo "   ⚠️  Review fields exist but no author data"
        fi
    else
        echo "   ❌ No review fields found"
    fi
else
    echo "❌ File not found - pipeline may still be running"
fi

echo ""
echo "3️⃣  VERCEL DEPLOYMENT"
echo "-------------------"
echo "Project: thebestinlondon-live-2025"
echo "Account: hassans-projects-cc46d45a"
echo "URL: https://thebestinlondon-live-2025.vercel.app"
echo ""
echo "Opening Vercel dashboard..."
open https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025
echo ""

# 4. Check if processes are still running
echo "4️⃣  PIPELINE PROCESSES"
echo "-------------------"
RUNNING=$(ps aux | grep node | grep -E 'fetch|build' | grep -v grep | wc -l | tr -d ' ')
if [ "$RUNNING" -gt 0 ]; then
    echo "⚠️  $RUNNING pipeline process(es) still running"
    echo ""
    echo "Active processes:"
    ps aux | grep node | grep -E 'fetch|build' | grep -v grep | awk '{print "   " $11 " " $12 " " $13}'
else
    echo "✅ No pipeline processes running - pipeline complete!"
fi

echo ""
echo "================================================================"
echo "📊 SUMMARY"
echo "================================================================"
echo ""

if [ -f "public/venues.json" ] && grep -q '"author_name"' public/venues.json; then
    echo "✅ SUCCESS! Reviews are in venues.json"
    echo ""
    echo "NEXT STEPS:"
    echo "1. Wait for Vercel deployment to show ✅ Ready"
    echo "2. Test: https://thebestinlondon-live-2025.vercel.app"
    echo "3. Click any restaurant"
    echo "4. Scroll to 'What People Say' section"
    echo "5. You should see Google reviews! 🎉"
    echo ""
elif [ -f "public/venues.json" ]; then
    echo "⚠️  venues.json exists but reviews not confirmed"
    echo ""
    echo "TROUBLESHOOTING:"
    echo "1. Check if Google data has reviews:"
    echo "   cat data/google/details/_details-index.json | grep -o '\"reviews\"' | wc -l"
    echo ""
    echo "2. If no reviews in Google data, re-run fetchPlaceDetails.js:"
    echo "   cd scripts && node fetchPlaceDetails.js"
    echo ""
else
    echo "⚠️  Pipeline still in progress"
    echo ""
    echo "Wait another 2-3 minutes and run:"
    echo "  bash check-reviews-status.sh"
    echo ""
fi

echo "================================================================"

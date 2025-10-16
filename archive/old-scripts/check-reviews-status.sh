#!/bin/bash

echo ""
echo "🔍 CHECKING REVIEWS STATUS - AUTO MODE"
echo "======================================"
echo ""

cd /Users/htanweer/Desktop/thebestinlondon

# Check latest commit
echo "📋 Latest Git Commit:"
git log --oneline -1
echo ""

# Check if venues.json exists and has reviews
if [ -f "public/venues.json" ]; then
    LAST_MODIFIED=$(stat -f '%Sm' -t '%Y-%m-%d %H:%M:%S' public/venues.json)
    VENUE_COUNT=$(cat public/venues.json | grep -o '"name":' | wc -l | tr -d ' ')
    
    echo "✅ venues.json Status:"
    echo "   Venues: $VENUE_COUNT"
    echo "   Last modified: $LAST_MODIFIED"
    echo ""
    
    # Check for reviews with actual data
    if grep -q '"author_name"' public/venues.json; then
        REVIEW_COUNT=$(cat public/venues.json | grep -o '"author_name"' | wc -l | tr -d ' ')
        echo "✅ REVIEWS CONFIRMED: $REVIEW_COUNT reviews found!"
        echo ""
        
        # Show first review as sample
        echo "📝 Sample Review (first occurrence):"
        cat public/venues.json | grep -B 2 -A 4 '"author_name"' | head -7
        echo ""
        echo "======================================"
        echo "✅ SUCCESS! Reviews are in the data!"
        echo ""
        echo "Now checking Vercel deployment status..."
        echo "Opening: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025"
        open https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025
        echo ""
        echo "After Vercel shows ✅ Ready:"
        echo "👉 Test: https://thebestinlondon-live-2025.vercel.app"
        echo "👉 Click any restaurant to see reviews!"
        echo ""
        
    else
        echo "⚠️  Reviews: Field may exist but no author data yet"
        echo ""
        echo "Possible reasons:"
        echo "1. Data pipeline is still running (wait 2-3 more minutes)"
        echo "2. Google data doesn't include reviews for this dataset"
        echo ""
        echo "Check if pipeline is still running:"
        echo "ps aux | grep node | grep -E 'fetch|build'"
        echo ""
    fi
else
    echo "⚠️  venues.json not found!"
    echo ""
    echo "This means the data pipeline is still running."
    echo "Wait 2-3 minutes and run this script again:"
    echo "  bash check-reviews-status.sh"
    echo ""
fi

echo "======================================"

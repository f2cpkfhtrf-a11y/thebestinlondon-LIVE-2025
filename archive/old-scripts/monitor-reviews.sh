#!/bin/bash

echo ""
echo "⏰ REVIEW PIPELINE PROGRESS MONITOR"
echo "===================================="
echo ""

cd /Users/htanweer/Desktop/thebestinlondon

# Wait 6 minutes for pipeline to complete
echo "⏳ Pipeline typically takes 5-10 minutes..."
echo "   Waiting 6 minutes before checking..."
echo ""

for i in {1..6}; do
    echo "   ⏰ Minute $i/6..."
    sleep 60
done

echo ""
echo "🔍 CHECKING PIPELINE RESULTS"
echo "============================"
echo ""

# Check if pipeline completed
if grep -q '"author_name"' public/venues.json 2>/dev/null; then
    REVIEW_COUNT=$(grep -o '"author_name"' public/venues.json | wc -l | tr -d ' ')
    
    echo "✅ PIPELINE COMPLETE!"
    echo ""
    echo "📊 Results:"
    echo "   Total reviews found: $REVIEW_COUNT"
    echo ""
    
    # Show sample venue with reviews
    echo "📝 Sample venue:"
    cat public/venues.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
venues = data.get('venues', data) if isinstance(data, dict) else data
for venue in venues[:50]:
    if 'reviews' in venue and venue['reviews'] and len(venue['reviews']) > 0:
        print(f'  Name: {venue[\"name\"]}')
        print(f'  Reviews: {len(venue[\"reviews\"])}')
        if len(venue['reviews']) > 0:
            review = venue['reviews'][0]
            print(f'  Sample: \"{review.get(\"text\", \"\")\"}\"[:80]')
        break
" 2>/dev/null
    
    echo ""
    echo "📋 Git Status:"
    git log --oneline -1
    echo ""
    
    echo "🚀 NEXT STEPS:"
    echo "=============="
    echo ""
    echo "1. Check Vercel deployment:"
    echo "   https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025"
    echo ""
    echo "2. Wait for latest deployment to show ✅ Ready"
    echo ""
    echo "3. Test the live site:"
    echo "   https://thebestinlondon-live-2025.vercel.app"
    echo ""
    echo "4. Click any restaurant and look for 'What People Say' section"
    echo ""
    echo "✅ REVIEWS WILL NOW BE VISIBLE!"
    echo ""
    
    # Open Vercel dashboard
    echo "Opening Vercel dashboard..."
    open https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025
    
else
    echo "⚠️  Pipeline still running or failed"
    echo ""
    echo "Check terminal window running the pipeline for errors"
    echo ""
    echo "Or wait another 2-3 minutes and run this script again:"
    echo "  bash monitor-reviews.sh"
fi

echo ""
echo "===================================="

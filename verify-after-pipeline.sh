#!/bin/bash

echo ""
echo "⏳ WAITING FOR DATA PIPELINE TO COMPLETE..."
echo "==========================================="
echo ""

# Wait 8 minutes (pipeline typically takes 5-10 min)
echo "Waiting 8 minutes for data pipeline..."
sleep 480

cd /Users/htanweer/Desktop/thebestinlondon

echo ""
echo "🔍 VERIFICATION AFTER PIPELINE"
echo "=============================="
echo ""

# 1. Check if reviews are now in venues.json
if grep -q '"author_name"' public/venues.json; then
    REVIEW_COUNT=$(grep -o '"author_name"' public/venues.json | wc -l | tr -d ' ')
    echo "✅ Reviews in data: $REVIEW_COUNT"
    echo ""
    
    # Show sample review
    echo "📝 Sample review from data:"
    cat public/venues.json | grep -A 5 '"author_name"' | head -6
    echo ""
    
    # Check git status
    echo "📋 Latest commit:"
    git log --oneline -1
    echo ""
    
    # Check Vercel
    echo "🚀 Vercel Status:"
    echo "Opening: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025"
    open https://vercel.com/hassans-projects-cc46d45a/thebestinlondon-live-2025
    echo ""
    
    echo "=============================="
    echo "✅ DATA PIPELINE COMPLETE!"
    echo "=============================="
    echo ""
    echo "NEXT STEPS:"
    echo "1. Wait for Vercel to show ✅ Ready"
    echo "2. Test: https://thebestinlondon-live-2025.vercel.app"
    echo "3. Click any restaurant"
    echo "4. Look for 'What People Say' section"
    echo ""
    echo "If reviews STILL don't show after Vercel deploys,"
    echo "the issue is in the React component code."
    echo ""
    
else
    echo "❌ REVIEWS STILL NOT IN DATA"
    echo ""
    echo "The pipeline may have failed or is still running."
    echo ""
    echo "Manual check needed:"
    echo "1. Check if fetchPlaceDetails.js completed"
    echo "2. Check if buildVenues.js ran successfully"
    echo "3. Look at terminal output for errors"
    echo ""
fi

echo "=============================="

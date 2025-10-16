#!/bin/bash

echo ""
echo "🔬 REVIEW DATA DIAGNOSTIC SUMMARY"
echo "================================================================"
echo ""

cd /Users/htanweer/Desktop/thebestinlondon

# Wait for all checks to complete
echo "⏳ Waiting 10 seconds for all diagnostic checks to complete..."
sleep 10

echo ""
echo "📊 COLLECTING DIAGNOSTIC RESULTS"
echo "================================"
echo ""

# 1. Check if reviews field exists in venues.json
echo "1️⃣ VENUES.JSON STATUS:"
echo "-------------------"

HAS_REVIEWS_FIELD=$(cat public/venues.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
venues = data.get('venues', data) if isinstance(data, dict) else data
print('yes' if 'reviews' in venues[0] else 'no')
" 2>/dev/null)

if [ "$HAS_REVIEWS_FIELD" = "yes" ]; then
    echo "✅ 'reviews' field EXISTS in venues.json"
    
    # Check if it has data
    REVIEW_COUNT=$(cat public/venues.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
venues = data.get('venues', data) if isinstance(data, dict) else data
count = 0
for venue in venues[:50]:
    if 'reviews' in venue and venue['reviews'] and len(venue['reviews']) > 0:
        count += 1
print(count)
" 2>/dev/null)
    
    echo "   Venues with reviews (first 50): $REVIEW_COUNT"
    
    if [ "$REVIEW_COUNT" -gt 0 ]; then
        echo "   ✅ REVIEWS DATA IS PRESENT!"
        echo ""
        echo "   Problem: Reviews exist but not displaying"
        echo "   Likely cause: React component issue"
        echo ""
    else
        echo "   ⚠️  Reviews field exists but is EMPTY"
        echo ""
        echo "   Problem: Field exists but no data"
        echo "   Likely cause: buildVenues.js not copying reviews"
        echo ""
    fi
else
    echo "❌ 'reviews' field MISSING from venues.json"
    echo ""
    echo "   Problem: Field doesn't exist"
    echo "   Likely cause: buildVenues.js not creating field"
    echo ""
fi

echo ""

# 2. Check Google source data
echo "2️⃣ GOOGLE SOURCE DATA:"
echo "-------------------"

if [ -f "data/google/details/_details-index.json" ]; then
    GOOGLE_REVIEW_COUNT=$(cat data/google/details/_details-index.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
places = data.get('places', [])
count = 0
for place in places[:50]:
    if 'reviews' in place and place['reviews'] and len(place['reviews']) > 0:
        count += 1
print(count)
" 2>/dev/null)
    
    echo "✅ Google details data exists"
    echo "   Places with reviews (first 50): $GOOGLE_REVIEW_COUNT"
    
    if [ "$GOOGLE_REVIEW_COUNT" -gt 0 ]; then
        echo "   ✅ Reviews exist in Google source data!"
    else
        echo "   ❌ No reviews in Google source data"
        echo "   Need to re-fetch from Google API"
    fi
else
    echo "❌ Google source data not found"
    echo "   Need to run data pipeline"
fi

echo ""
echo "================================================================"
echo "🎯 DIAGNOSIS & FIX"
echo "================================================================"
echo ""

# Determine the issue and fix
if [ "$HAS_REVIEWS_FIELD" = "yes" ] && [ "$REVIEW_COUNT" -gt 0 ]; then
    echo "DIAGNOSIS: ✅ Reviews data is present in venues.json"
    echo ""
    echo "ISSUE: React component not displaying reviews"
    echo ""
    echo "FIX NEEDED: Check [slug].js component logic"
    echo ""
    echo "Checking component code..."
    echo ""
    
    # Check if component has correct logic
    if grep -q "venue.reviews && venue.reviews.length > 0" pages/restaurant/[slug].js; then
        echo "✅ Component has correct conditional check"
        echo ""
        echo "Possible issues:"
        echo "1. Review data structure mismatch"
        echo "2. Field name typo"
        echo "3. Build/cache issue"
        echo ""
        echo "RECOMMENDED ACTION:"
        echo "1. Clear Next.js cache: rm -rf .next"
        echo "2. Rebuild: npm run build"
        echo "3. Redeploy to Vercel"
    else
        echo "⚠️  Component missing review display logic"
        echo ""
        echo "Need to add review section to [slug].js"
    fi
    
elif [ "$HAS_REVIEWS_FIELD" = "yes" ] && [ "$REVIEW_COUNT" -eq 0 ]; then
    echo "DIAGNOSIS: ⚠️  'reviews' field exists but is EMPTY"
    echo ""
    echo "ISSUE: buildVenues.js not copying reviews from Google data"
    echo ""
    echo "FIX: Re-run buildVenues.js to regenerate venues.json"
    echo ""
    echo "Running fix now..."
    cd scripts
    node buildVenues.js
    cd ..
    
    echo ""
    echo "✅ Regenerated venues.json"
    echo "Committing and pushing..."
    git add public/venues.json
    git commit -m "fix: regenerated venues.json with reviews from Google data"
    git push origin main
    
elif [ "$HAS_REVIEWS_FIELD" = "no" ]; then
    echo "DIAGNOSIS: ❌ 'reviews' field MISSING"
    echo ""
    echo "ISSUE: buildVenues.js not creating reviews field"
    echo ""
    echo "FIX: Check buildVenues.js line ~257 for reviews mapping"
    echo ""
    
    if [ "$GOOGLE_REVIEW_COUNT" -gt 0 ]; then
        echo "Google data HAS reviews - just need to copy them"
        echo ""
        echo "Running buildVenues.js..."
        cd scripts
        node buildVenues.js
        cd ..
    else
        echo "Google data has NO reviews - need full pipeline"
        echo ""
        echo "This will take 5-10 minutes..."
        echo "Run: cd scripts && node fetchPlaceDetails.js && node buildVenues.js"
    fi
fi

echo ""
echo "================================================================"

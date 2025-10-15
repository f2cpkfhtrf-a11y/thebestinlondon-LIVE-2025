#!/bin/bash

# BestOfLondon - Daily Data Refresh Script
# This script updates venue data from Google Places and FSA

echo "=================================================="
echo "🔄 BestOfLondon - Data Refresh Starting"
echo "=================================================="
echo ""

# Set working directory
cd "$(dirname "$0")/.."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local not found"
    echo "Please create .env.local with NEXT_PUBLIC_GOOGLE_PLACES_KEY"
    exit 1
fi

# Timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "⏰ Starting refresh at: $TIMESTAMP"
echo ""

# Run the data pipeline
echo "📊 Step 1: Fetching places from Google..."
node scripts/fetchPlaces.js
if [ $? -ne 0 ]; then
    echo "❌ fetchPlaces.js failed"
    exit 1
fi

echo ""
echo "📋 Step 2: Fetching place details..."
node scripts/fetchPlaceDetails.js
if [ $? -ne 0 ]; then
    echo "❌ fetchPlaceDetails.js failed"
    exit 1
fi

echo ""
echo "🏗️  Step 3: Building venues database..."
node scripts/buildVenues.js
if [ $? -ne 0 ]; then
    echo "❌ buildVenues.js failed"
    exit 1
fi

echo ""
echo "🍽️  Step 4: Recategorizing cuisines..."
node scripts/recategorize-cuisines.js
if [ $? -ne 0 ]; then
    echo "⚠️  Recategorization warning (continuing...)"
fi

echo ""
echo "🗺️  Step 5: Regenerating sitemaps..."
node scripts/generate-sitemaps.js
if [ $? -ne 0 ]; then
    echo "❌ Sitemap generation failed"
    exit 1
fi

# Count venues
VENUE_COUNT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('public/venues.json')).length)")

echo ""
echo "=================================================="
echo "✅ Data Refresh Complete!"
echo "=================================================="
echo "📊 Total venues: $VENUE_COUNT"
echo "⏰ Completed at: $(date +"%Y-%m-%d %H:%M:%S")"
echo ""

# Log to file
LOG_DIR="reports/refresh-logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/refresh-$(date +"%Y%m%d-%H%M%S").log"

echo "Refresh completed at $TIMESTAMP with $VENUE_COUNT venues" > "$LOG_FILE"
echo "📝 Log saved: $LOG_FILE"
echo ""

# Optional: Deploy to Vercel after refresh
# Uncomment the following lines to auto-deploy after refresh
# echo "🚀 Deploying to Vercel..."
# vercel --prod --yes

echo "🎉 All done!"

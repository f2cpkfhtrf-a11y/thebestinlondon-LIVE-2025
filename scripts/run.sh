#!/bin/bash

# London Venue Data Collection Script
# This script sets up and runs the venue data collection

echo "🚀 London Venue Data Collection"
echo "================================"

# Check if .env file exists
if [ ! -f "../.env" ]; then
    echo "❌ .env file not found!"
    echo "Please create a .env file in the project root with your Google Places API key:"
    echo ""
    echo "GOOGLE_PLACES_API_KEY=your_api_key_here"
    echo "API_DELAY_MS=100"
    echo "MAX_CONCURRENT_REQUESTS=5"
    echo ""
    exit 1
fi

# Check if API key is set
if ! grep -q "GOOGLE_PLACES_API_KEY=" ../.env || grep -q "GOOGLE_PLACES_API_KEY=your_api_key_here" ../.env; then
    echo "❌ Google Places API key not configured!"
    echo "Please add your API key to the .env file"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run the data collection script
echo "🔍 Starting venue data collection..."
echo "This may take 30-60 minutes depending on venue density."
echo ""

node fetchVenueData.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Data collection completed successfully!"
    echo "📁 Data saved to: ../public/venues.json"
    echo ""
    echo "Next steps:"
    echo "1. Review the generated data"
    echo "2. Update your Next.js site to use the new data"
    echo "3. Deploy your updated site"
else
    echo ""
    echo "❌ Data collection failed!"
    echo "Check the error messages above for details."
    exit 1
fi



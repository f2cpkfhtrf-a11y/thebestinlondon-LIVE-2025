#!/bin/bash
# Emergency fix: Ensure static export works for station pages

echo "🔧 Emergency Fix: Station Pages"
echo "================================"

cd /Users/htanweer/Desktop/thebestinlondon

# Check if venues.json exists
if [ ! -f "public/venues.json" ]; then
    echo "❌ venues.json missing! Running pipeline..."
    node scripts/run-data-pipeline.js
fi

# Try a quick build test
echo "📦 Testing build with station pages..."
npm run build 2>&1 | tee build-output.log

# Check for errors
if grep -q "Error" build-output.log; then
    echo "❌ BUILD FAILED"
    echo ""
    echo "Errors found:"
    grep -A 5 "Error" build-output.log
    exit 1
else
    echo "✅ Build succeeded!"
    
    # Check if .next has the station pages
    if [ -d ".next/server/pages/halal/near-stations" ]; then
        echo "✅ Station pages generated"
        ls -la .next/server/pages/halal/near-stations/
    else
        echo "⚠️  Station pages directory missing"
    fi
fi

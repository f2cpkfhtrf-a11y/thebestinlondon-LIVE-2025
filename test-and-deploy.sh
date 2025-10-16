#!/bin/bash
# Quick test and deploy script

cd /Users/htanweer/Desktop/thebestinlondon

echo "🧪 TESTING STATION PAGE"
echo "======================"
echo ""

# Test build
echo "Building Next.js..."
npm run build 2>&1 | tee /tmp/station-build.log

# Check if station page built
if grep -q "halal-near-stations-simple" /tmp/station-build.log; then
    echo ""
    echo "✅ Station page built successfully!"
    echo ""
    
    # Check build output
    if [ -f ".next/server/pages/halal-near-stations-simple.html" ] || [ -f ".next/server/pages/halal-near-stations-simple.js" ]; then
        echo "✅ Station page file exists in build"
        echo ""
        echo "🚀 READY TO DEPLOY"
        echo ""
        echo "Options:"
        echo "1. Visit Vercel dashboard and click 'Redeploy'"
        echo "2. Or run: npx vercel --prod"
        echo ""
        echo "Test URL after deploy:"
        echo "https://thebestinlondon.co.uk/halal-near-stations-simple"
    else
        echo "⚠️  Build succeeded but file not found"
        echo "Checking build structure..."
        ls -la .next/server/pages/ | grep halal
    fi
else
    echo "❌ Station page not in build output"
    echo ""
    echo "Last 30 lines of build:"
    tail -30 /tmp/station-build.log
fi

#!/bin/bash
# Check if local build works first

cd /Users/htanweer/Desktop/thebestinlondon

echo "🔍 Testing Local Build..."
echo "========================"

# Clear previous build
rm -rf .next

# Run build
npm run build 2>&1 | tee /tmp/local-build-output.txt

echo ""
echo "📊 Checking for station pages in build output..."
if grep -q "halal/near-stations" /tmp/local-build-output.txt; then
    echo "✅ Station pages found in build output"
    grep "halal/near-stations" /tmp/local-build-output.txt
else
    echo "❌ Station pages NOT in build output"
    echo ""
    echo "Last 50 lines of build:"
    tail -50 /tmp/local-build-output.txt
fi

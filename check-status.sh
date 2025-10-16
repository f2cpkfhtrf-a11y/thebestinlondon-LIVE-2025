#!/bin/bash
# Quick deployment status checker

echo "🚀 BestOfLondon Deployment Status"
echo "=================================="
echo ""

# Check if venues.json exists
if [ -f "public/venues.json" ]; then
    VENUE_COUNT=$(grep -o '"slug":' public/venues.json | wc -l)
    echo "✅ venues.json: $VENUE_COUNT venues"
else
    echo "❌ venues.json: MISSING"
fi

# Check sitemaps
for sitemap in sitemap.xml sitemap-pages.xml sitemap-venues.xml robots.txt; do
    if [ -f "public/$sitemap" ]; then
        echo "✅ $sitemap: EXISTS"
    else
        echo "❌ $sitemap: MISSING"
    fi
done

echo ""
echo "📍 Git Status:"
git log -1 --oneline

echo ""
echo "🌐 Expected URLs (after Vercel deploy):"
echo "  • https://thebestinlondon.co.uk"
echo "  • https://thebestinlondon.co.uk/halal/restaurants"
echo "  • https://thebestinlondon.co.uk/halal/near-stations"
echo "  • https://thebestinlondon.co.uk/sitemap.xml"

echo ""
echo "⏳ Check Vercel dashboard for deployment progress"
echo "   https://vercel.com/dashboard"

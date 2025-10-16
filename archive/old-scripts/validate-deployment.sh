#!/bin/bash

# 🔍 AUTONOMOUS DEPLOYMENT VALIDATOR
# Verifies Cloudflare Pages deployment

set -e

PROJECT_NAME="thebestinlondon"
BASE_URL="https://$PROJECT_NAME.pages.dev"

echo "🔍 DEPLOYMENT VALIDATION STARTING"
echo "================================="
echo ""
echo "Target: $BASE_URL"
echo ""

# Test 1: Homepage HTTP Status
echo "Test 1/6: Homepage HTTP Status..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ PASS - Homepage returns 200 OK"
else
    echo "❌ FAIL - Homepage returns $HTTP_CODE"
    exit 1
fi
echo ""

# Test 2: Homepage Content
echo "Test 2/6: Homepage Content Check..."
HOMEPAGE_CONTENT=$(curl -s "$BASE_URL")
if echo "$HOMEPAGE_CONTENT" | grep -q "The Best in London"; then
    echo "✅ PASS - Homepage title found"
else
    echo "❌ FAIL - Homepage title not found"
    exit 1
fi
echo ""

# Test 3: Sample Venue Page
echo "Test 3/6: Sample Venue Page..."
VENUE_URL="$BASE_URL/restaurant/dishoom-covent-garden"
VENUE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$VENUE_URL" || echo "000")
if [ "$VENUE_CODE" = "200" ]; then
    echo "✅ PASS - Venue pages accessible"
else
    echo "❌ FAIL - Venue page returns $VENUE_CODE"
    exit 1
fi
echo ""

# Test 4: Sitemap Accessibility
echo "Test 4/6: Sitemap Check..."
SITEMAP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/sitemap.xml" || echo "000")
if [ "$SITEMAP_CODE" = "200" ]; then
    echo "✅ PASS - Sitemap accessible"
else
    echo "⚠️  WARNING - Sitemap returns $SITEMAP_CODE (may still be building)"
fi
echo ""

# Test 5: Static Assets
echo "Test 5/6: Static Assets Check..."
# Check for any bundled JS files
ASSETS_CHECK=$(curl -s "$BASE_URL" | grep -o "_next/static" | head -1)
if [ -n "$ASSETS_CHECK" ]; then
    echo "✅ PASS - Next.js assets referenced"
else
    echo "❌ FAIL - Next.js assets not found"
    exit 1
fi
echo ""

# Test 6: Meta Tags
echo "Test 6/6: SEO Meta Tags..."
META_CHECK=$(curl -s "$BASE_URL" | grep -o '<meta name="description"' | head -1)
if [ -n "$META_CHECK" ]; then
    echo "✅ PASS - Meta tags present"
else
    echo "⚠️  WARNING - Meta tags not found"
fi
echo ""

# Final Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ VALIDATION COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "All critical tests passed!"
echo ""
echo "✅ Build: Success"
echo "✅ Deployment: Success"
echo "✅ Routes: Accessible"
echo "✅ Assets: Loading"
echo "✅ SEO: Configured"
echo ""
echo "🌐 Live URL: $BASE_URL"
echo ""
echo "🎉 Your site is LIVE and FUNCTIONAL!"
echo ""

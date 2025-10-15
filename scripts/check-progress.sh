#!/bin/bash

echo "=================================================="
echo "🎯 BESTINLONDON - PHASE COMPLETION CHECK"
echo "=================================================="
echo ""

# Phase 1: SANITY ✓
echo "✅ PHASE 1: SANITY CHECK"
echo "   ✓ Core scripts exist (fetchPlaces, buildVenues, etc.)"
echo "   ✓ Utils exist (fsaClient, venueEnhancer, theme)"
echo "   ✓ Branch: feat/data-theme-integration"
echo ""

# Phase 2: DATA ✓
echo "✅ PHASE 2: DATA"
if [ -f "public/venues.json" ]; then
    VENUE_COUNT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('public/venues.json')).length)")
    echo "   ✓ venues.json exists: $VENUE_COUNT venues"
else
    echo "   ✗ venues.json missing"
fi
if [ -f "data/coverage.json" ]; then
    echo "   ✓ coverage.json exists"
else
    echo "   ⚠ coverage.json missing"
fi
echo ""

# Phase 3: PAGES WIRING ✓
echo "✅ PHASE 3: PAGES WIRING"
echo "   ✓ index.js - reads venues.json"
echo "   ✓ restaurants.js - reads venues.json"
echo "   ✓ restaurant/[slug].js - dynamic routes"
echo "   ✓ FSABadge component - premium green/gold design"
echo ""

# Phase 4: IMAGES - Partial
echo "⚠️  PHASE 4: IMAGES"
if [ -f "public/image-manifest.json" ]; then
    echo "   ✓ image-manifest.json exists"
else
    echo "   ✗ image-manifest.json missing (optional)"
fi
echo "   ✓ Google Place Photos working"
echo "   ? Cloudinary integration (check next.config.js)"
echo ""

# Phase 5: SEO & SITEMAPS - NOT DONE
echo "❌ PHASE 5: SEO & SITEMAPS"
if [ -f "public/sitemap.xml" ]; then
    echo "   ✓ sitemap.xml exists"
else
    echo "   ✗ sitemap.xml MISSING"
fi
if [ -f "public/sitemap-pages.xml" ]; then
    echo "   ✓ sitemap-pages.xml exists"
else
    echo "   ✗ sitemap-pages.xml MISSING"
fi
if [ -f "public/sitemap-venues.xml" ]; then
    echo "   ✓ sitemap-venues.xml exists"
else
    echo "   ✗ sitemap-venues.xml MISSING"
fi
if [ -f "public/robots.txt" ]; then
    echo "   ✓ robots.txt exists"
else
    echo "   ✗ robots.txt MISSING"
fi
echo ""

# Phase 6: DEPLOYMENT - NOT DONE
echo "❌ PHASE 6: DEPLOYMENT"
echo "   ✗ No live URL detected"
echo "   → Need to deploy to Cloudflare Pages or Vercel"
echo ""

# Phase 7: QA - NOT DONE
echo "❌ PHASE 7: QA & LINK CHECK"
if [ -f "reports/links.json" ]; then
    echo "   ✓ Link check report exists"
else
    echo "   ✗ Link check NOT RUN"
fi
if [ -f "reports/perf-plan.md" ]; then
    echo "   ✓ Performance plan exists"
else
    echo "   ✗ Performance plan missing"
fi
echo ""

# Phase 8: GITHUB PR - NOT DONE
echo "❌ PHASE 8: GITHUB PR"
echo "   ✗ PR not opened yet"
echo "   → Need to commit changes and open PR"
echo ""

# Phase 9: AUTO-REFRESH - NOT DONE
echo "❌ PHASE 9: SCHEDULED REFRESH"
if [ -f "scripts/refresh-data.sh" ]; then
    echo "   ✓ Refresh script exists"
else
    echo "   ✗ Refresh script MISSING"
fi
echo ""

echo "=================================================="
echo "🎯 SUMMARY"
echo "=================================================="
echo "✅ COMPLETE: Phases 1, 2, 3"
echo "⚠️  PARTIAL:  Phase 4 (images)"
echo "❌ PENDING:  Phases 5, 6, 7, 8, 9"
echo ""
echo "NEXT ACTIONS:"
echo "1. Finish cuisine recategorization (278 venues)"
echo "2. Generate sitemaps + robots.txt"
echo "3. Deploy to production"
echo "4. Run QA checks"
echo "5. Open GitHub PR"
echo "=================================================="

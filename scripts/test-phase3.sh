#!/bin/bash

# Quick Test Script for Phase 3

echo "🧪 Testing Updated Pages..."
echo ""

cd /Users/htanweer/Desktop/thebestinlondon

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Dev server already running on :3000"
else
    echo "⚠️  Dev server not running. Start with: npm run dev"
    echo ""
fi

echo "📋 Test Checklist:"
echo ""
echo "1. Homepage (http://localhost:3000)"
echo "   [ ] Hero shows: 459+ premium venues • Expert curation • Verified quality"
echo "   [ ] Venue cards render with real data"
echo "   [ ] FSA badges visible when available"
echo "   [ ] No console errors"
echo ""
echo "2. Venue Detail Page (click any card)"
echo "   [ ] Name, rating, address display correctly"
echo "   [ ] Photos load"
echo "   [ ] FSA badge in sidebar (if available)"
echo "   [ ] Google Maps link works"
echo "   [ ] Related venues show (bottom)"
echo ""
echo "3. Listing Page (e.g., /indian-restaurants-london)"
echo "   [ ] Multiple venues render"
echo "   [ ] Filters work"
echo "   [ ] Click card goes to detail page"
echo ""
echo "If all checks pass: ✅ Phase 3 Complete!"
echo "If issues: paste errors here and I'll fix them"
echo ""

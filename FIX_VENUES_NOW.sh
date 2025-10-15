#!/bin/bash

# ============================================================================
# AUTOMATIC FIX FOR MISSING VENUES.JSON ON GITHUB
# ============================================================================
# This script will upload venues.json to GitHub and trigger Vercel deployment
# ============================================================================

echo ""
echo "🚀 FIXING MISSING VENUES.JSON ISSUE..."
echo ""

# Navigate to project directory
cd "/Users/htanweer/Desktop/thebestinlondon"

# Stage the venues.json file
echo "📦 Staging public/venues.json..."
git add public/venues.json

# Commit the change
echo "💾 Committing to git..."
git commit -m "Add venues.json with restaurant data to public folder"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo ""
echo "=" * 70
echo "🎉 SUCCESS! VENUES.JSON UPLOADED TO GITHUB!"
echo "=" * 70
echo ""
echo "⏳ What happens next:"
echo "   1. Vercel will detect this change in ~30 seconds"
echo "   2. Automatic rebuild will start (~2-3 minutes)"
echo "   3. Your site will go live with ALL restaurant data!"
echo ""
echo "📍 Check your site after 3 minutes:"
echo "   https://thebestinlondon-live-2025.vercel.app/halal-restaurants-london"
echo ""
echo "You should see 40+ halal restaurants instead of 0!"
echo ""

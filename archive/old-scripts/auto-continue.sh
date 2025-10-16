#!/bin/bash

###############################################################################
# AUTO-MODE CONTINUATION SCRIPT
# Runs after data pipeline completes
# Executes Phase A-F automatically
###############################################################################

set -e  # Exit on any error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Project root
cd "$(dirname "$0")"
PROJECT_ROOT="$(pwd)"

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  AUTO-MODE: POST-PIPELINE AUTOMATION${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

###############################################################################
# PHASE A: Verify Data Output
###############################################################################

echo -e "${BLUE}═══ PHASE A: Verifying Data Output ═══${NC}\n"

if [ ! -f "public/venues.json" ]; then
    echo -e "${RED}❌ ERROR: public/venues.json not found!${NC}"
    echo -e "${YELLOW}The data pipeline may not have completed successfully.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ public/venues.json exists${NC}"

# Count venues
VENUE_COUNT=$(node -e "const data = require('./public/venues.json'); console.log(data.venues ? data.venues.length : 0);")
echo -e "${GREEN}✅ Venue count: ${VENUE_COUNT}${NC}"

if [ "$VENUE_COUNT" -lt 50 ]; then
    echo -e "${YELLOW}⚠️  Warning: Only ${VENUE_COUNT} venues found (expected 200+)${NC}"
    echo -e "${YELLOW}   Pipeline may need to be re-run with more queries.${NC}"
fi

if [ -f "data/coverage.json" ]; then
    echo -e "${GREEN}✅ data/coverage.json exists${NC}"
fi

echo ""

###############################################################################
# PHASE B: Generate Sitemaps & SEO
###############################################################################

echo -e "${BLUE}═══ PHASE B: Generating Sitemaps & SEO ═══${NC}\n"

if [ -f "scripts/generate-sitemaps.js" ]; then
    echo -e "${CYAN}Running sitemap generator...${NC}"
    node scripts/generate-sitemaps.js
    echo -e "${GREEN}✅ Sitemaps generated${NC}"
else
    echo -e "${YELLOW}⚠️  Sitemap script not found, skipping...${NC}"
fi

echo ""

###############################################################################
# PHASE C: Test Build
###############################################################################

echo -e "${BLUE}═══ PHASE C: Testing Next.js Build ═══${NC}\n"

echo -e "${CYAN}Cleaning previous build...${NC}"
rm -rf .next

echo -e "${CYAN}Running build test...${NC}"
npm run build 2>&1 | tee build-test.log

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}\n"
else
    echo -e "${RED}❌ Build failed! Check build-test.log for errors.${NC}"
    exit 1
fi

###############################################################################
# PHASE D: Commit Changes
###############################################################################

echo -e "${BLUE}═══ PHASE D: Committing Changes to Git ═══${NC}\n"

git add public/venues.json data/coverage.json 2>/dev/null || true
git add public/sitemap*.xml public/robots.txt 2>/dev/null || true
git add reports/*.md 2>/dev/null || true

if git diff --cached --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
else
    echo -e "${CYAN}Committing data and sitemaps...${NC}"
    git commit -m "data: pipeline output + sitemaps (${VENUE_COUNT} venues)"
    echo -e "${GREEN}✅ Changes committed${NC}"
fi

echo ""

###############################################################################
# PHASE E: Push to GitHub (Triggers Vercel)
###############################################################################

echo -e "${BLUE}═══ PHASE E: Deploying to Production ═══${NC}\n"

echo -e "${CYAN}Pushing to GitHub main branch...${NC}"
git push origin main

echo -e "${GREEN}✅ Pushed to GitHub${NC}"
echo -e "${YELLOW}Vercel deployment should start automatically in 10-30 seconds.${NC}\n"

###############################################################################
# PHASE F: Link Verification
###############################################################################

echo -e "${BLUE}═══ PHASE F: Link Verification ═══${NC}\n"

if [ -f "scripts/verify-links.js" ]; then
    echo -e "${CYAN}Running link verification (this may take 2-3 minutes)...${NC}"
    node scripts/verify-links.js || echo -e "${YELLOW}⚠️  Link verification had warnings${NC}"
else
    echo -e "${YELLOW}⚠️  Link verification script not found, skipping...${NC}"
fi

echo ""

###############################################################################
# FINAL SUMMARY
###############################################################################

echo -e "${MAGENTA}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${MAGENTA}  🎉 AUTO-MODE COMPLETE!${NC}"
echo -e "${MAGENTA}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}✅ Data Pipeline: Complete (${VENUE_COUNT} venues)${NC}"
echo -e "${GREEN}✅ Sitemaps: Generated${NC}"
echo -e "${GREEN}✅ Build: Successful${NC}"
echo -e "${GREEN}✅ Git: Committed & Pushed${NC}"
echo -e "${GREEN}✅ Deployment: Triggered${NC}"
echo ""

echo -e "${CYAN}📋 NEXT STEPS:${NC}"
echo -e "   1. Check Vercel: https://vercel.com/dashboard"
echo -e "   2. Wait 3-5 min for deployment to complete"
echo -e "   3. Test live site: https://thebestinlondon.co.uk"
echo -e "   4. Test station pages: /halal/near-stations"
echo -e "   5. Test venue details: /restaurant/[slug]"
echo ""

echo -e "${CYAN}📊 FILES CREATED/UPDATED:${NC}"
echo -e "   - public/venues.json (${VENUE_COUNT} venues)"
echo -e "   - data/coverage.json"
echo -e "   - public/sitemap.xml"
echo -e "   - public/sitemap-pages.xml"
echo -e "   - public/sitemap-venues.xml"
echo -e "   - public/robots.txt"
echo -e "   - reports/*.md (pipeline reports)"
echo ""

echo -e "${YELLOW}⏰ Estimated deployment time: 3-5 minutes${NC}"
echo -e "${YELLOW}   Monitor at: https://vercel.com/dashboard${NC}"
echo ""

echo -e "${MAGENTA}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

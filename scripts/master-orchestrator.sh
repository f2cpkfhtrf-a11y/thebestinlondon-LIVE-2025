#!/bin/bash

# ============================================================================
# 🤖 BESTOF LONDON - MASTER AUTOMATION ORCHESTRATOR
# Runs complete diagnostic → FSA fix → Sitemap regen → Deploy prep
# ============================================================================

set -e # Exit on error

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

echo ""
echo "================================================================================"
echo "🤖 BESTOF LONDON - MASTER AUTOMATION ORCHESTRATOR"
echo "================================================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# === STEP 1: DIAGNOSTIC ===
echo -e "${BLUE}📊 STEP 1: Running comprehensive diagnostic...${NC}"
echo ""

if node scripts/master-diagnostic.js; then
  echo -e "${GREEN}✅ Diagnostic complete${NC}"
else
  echo -e "${RED}❌ Diagnostic failed - check output above${NC}"
  exit 1
fi

echo ""
echo "Press Enter to continue to FSA enhancement, or Ctrl+C to stop..."
read -r

# === STEP 2: FSA ENHANCEMENT ===
echo ""
echo -e "${BLUE}🏥 STEP 2: Enhancing FSA coverage...${NC}"
echo ""

if node scripts/enhance-fsa-coverage-v2.js; then
  echo -e "${GREEN}✅ FSA enhancement complete${NC}"
else
  echo -e "${YELLOW}⚠️  FSA enhancement had issues but continuing...${NC}"
fi

# === STEP 3: REGENERATE SITEMAPS ===
echo ""
echo -e "${BLUE}🗺️  STEP 3: Regenerating sitemaps...${NC}"
echo ""

if [ -f "scripts/generate-sitemaps.js" ]; then
  if node scripts/generate-sitemaps.js; then
    echo -e "${GREEN}✅ Sitemaps regenerated${NC}"
  else
    echo -e "${YELLOW}⚠️  Sitemap generation had issues${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  Sitemap generator not found, skipping${NC}"
fi

# === STEP 4: VERIFY DEPLOYMENT READINESS ===
echo ""
echo -e "${BLUE}🚀 STEP 4: Verifying deployment readiness...${NC}"
echo ""

# Check if build works
echo "Testing Next.js build..."
if npm run build; then
  echo -e "${GREEN}✅ Next.js build successful${NC}"
else
  echo -e "${RED}❌ Next.js build failed${NC}"
  exit 1
fi

# === STEP 5: FINAL REPORT ===
echo ""
echo "================================================================================"
echo -e "${GREEN}✅ AUTOMATION COMPLETE${NC}"
echo "================================================================================"
echo ""

# Run final diagnostic
node scripts/master-diagnostic.js

echo ""
echo "🎯 DEPLOYMENT OPTIONS:"
echo ""
echo "1. Cloudflare Pages (Static Export):"
echo "   - Add 'output: export' to next.config.js"
echo "   - Run: npm run build"
echo "   - Upload .next/export to Cloudflare Pages"
echo ""
echo "2. Vercel (Full SSR/ISR):"
echo "   - Install Vercel CLI: npm i -g vercel"
echo "   - Run: vercel --prod"
echo ""
echo "3. Manual Deployment:"
echo "   - The project is ready in the 'out' or '.next' directory"
echo ""

echo "================================================================================"
echo ""

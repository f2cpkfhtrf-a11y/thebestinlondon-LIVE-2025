#!/bin/bash

###############################################################################
# THEBESTINLONDON.CO.UK - FOUNDER-LEVEL BUILD
# Complete autonomous execution script
# 
# Run: bash scripts/execute-founder-build.sh
###############################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo -e "\n${BOLD}${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${CYAN}🚀 FOUNDER-LEVEL BUILD - AUTONOMOUS EXECUTION${NC}"
echo -e "${BOLD}${CYAN}   Project: thebestinlondon.co.uk${NC}"
echo -e "${BOLD}${CYAN}═══════════════════════════════════════════════════════════════════════${NC}\n"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm found: $(npm --version)${NC}\n"

# Run master coordinator
echo -e "${BOLD}${BLUE}▶️  Running Master Build Coordinator...${NC}\n"

node scripts/master-build-coordinator.js

# Check if successful
if [ $? -eq 0 ]; then
    echo -e "\n${BOLD}${GREEN}═══════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${GREEN}✅ CORE BUILD COMPLETE${NC}"
    echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════════════════════════════${NC}\n"
    
    echo -e "${CYAN}📁 Generated Files:${NC}"
    echo -e "${GREEN}   ✅ public/venues.json${NC}"
    echo -e "${GREEN}   ✅ data/coverage.json${NC}"
    echo -e "${GREEN}   ✅ public/image-manifest.json${NC}"
    echo -e "${GREEN}   ✅ public/sitemap*.xml${NC}"
    echo -e "${GREEN}   ✅ reports/*${NC}\n"
    
    echo -e "${YELLOW}🚀 NEXT STEPS:${NC}"
    echo -e "${CYAN}   1. Test site: ${BOLD}npm run dev${NC}"
    echo -e "${CYAN}   2. Visit: ${BOLD}http://localhost:3000${NC}"
    echo -e "${CYAN}   3. Run link verification (with server running)${NC}"
    echo -e "${CYAN}   4. Build: ${BOLD}npm run build${NC}"
    echo -e "${CYAN}   5. Deploy: ${BOLD}npx vercel${NC} or ${BOLD}wrangler pages publish${NC}\n"
    
    echo -e "${CYAN}📖 Documentation:${NC}"
    echo -e "${CYAN}   - Data refresh: ${BOLD}cat DATA-REFRESH-GUIDE.md${NC}"
    echo -e "${CYAN}   - Build report: ${BOLD}cat reports/build-report.json${NC}\n"
    
else
    echo -e "\n${BOLD}${RED}═══════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${BOLD}${RED}❌ BUILD FAILED${NC}"
    echo -e "${BOLD}${RED}═══════════════════════════════════════════════════════════════════════${NC}\n"
    
    echo -e "${YELLOW}Check logs above for details.${NC}"
    echo -e "${YELLOW}Common issues:${NC}"
    echo -e "${CYAN}   - Google API quota exceeded (wait or enable billing)${NC}"
    echo -e "${CYAN}   - Network issues (check internet connection)${NC}"
    echo -e "${CYAN}   - Missing dependencies (run: npm install)${NC}\n"
    
    exit 1
fi

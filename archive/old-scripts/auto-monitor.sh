#!/bin/bash

###############################################################################
# PIPELINE MONITOR & AUTO-TRIGGER
# Monitors the data pipeline and auto-runs continuation when complete
###############################################################################

cd "$(dirname "$0")"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  MONITORING DATA PIPELINE${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}Waiting for pipeline to complete...${NC}"
echo -e "${YELLOW}Expected time: 10-15 minutes${NC}"
echo -e "${YELLOW}Checking every 30 seconds...${NC}\n"

CHECKS=0
MAX_CHECKS=40  # 40 * 30s = 20 minutes max

while [ $CHECKS -lt $MAX_CHECKS ]; do
    CHECKS=$((CHECKS + 1))
    
    # Check if venues.json exists
    if [ -f "public/venues.json" ]; then
        VENUE_COUNT=$(node -e "const data = require('./public/venues.json'); console.log(data.venues ? data.venues.length : 0);" 2>/dev/null)
        
        if [ ! -z "$VENUE_COUNT" ] && [ "$VENUE_COUNT" -gt 10 ]; then
            echo -e "\n${GREEN}✅ Pipeline Complete! Found ${VENUE_COUNT} venues.${NC}\n"
            
            echo -e "${CYAN}Auto-triggering continuation script in 5 seconds...${NC}"
            sleep 5
            
            echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}\n"
            
            # Run continuation script
            bash auto-continue.sh
            
            exit 0
        fi
    fi
    
    # Still waiting
    ELAPSED=$((CHECKS * 30))
    MIN=$((ELAPSED / 60))
    SEC=$((ELAPSED % 60))
    
    echo -e "${YELLOW}⏱️  Check #${CHECKS} — ${MIN}m ${SEC}s elapsed — Still running...${NC}"
    
    sleep 30
done

echo -e "\n${YELLOW}⚠️  Pipeline has been running for 20+ minutes.${NC}"
echo -e "${YELLOW}   Check the Terminal tab running the pipeline for errors.${NC}\n"

exit 1

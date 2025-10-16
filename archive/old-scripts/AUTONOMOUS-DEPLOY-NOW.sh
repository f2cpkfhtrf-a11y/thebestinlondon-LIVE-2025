#!/bin/bash

# 🤖 AUTONOMOUS DEPLOYMENT SCRIPT
# Deploys thebestinlondon to Cloudflare Pages automatically

set -e  # Exit on error

echo "🤖 AUTONOMOUS BUILD AGENT - Starting deployment..."
echo ""

# Navigate to project
cd /Users/htanweer/Desktop/thebestinlondon

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📍 Step 1: Verifying environment...${NC}"

# Check if wrangler is installed
if ! command -v npx &> /dev/null; then
    echo -e "${RED}❌ npx not found. Please install Node.js${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npx found${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables found${NC}"

echo ""
echo -e "${BLUE}📍 Step 2: Building project...${NC}"

# Build the project
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build complete!${NC}"
echo ""
echo -e "${BLUE}📍 Step 3: Logging into Cloudflare...${NC}"

# Check if already logged in, if not, login
npx wrangler whoami || npx wrangler login

echo ""
echo -e "${BLUE}📍 Step 4: Creating/deploying Pages project...${NC}"

# Deploy to Cloudflare Pages
# This will create the project if it doesn't exist
npx wrangler pages deploy .next \
  --project-name=thebestinlondon \
  --branch=main \
  --commit-message="Automated deployment from autonomous build agent"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
    echo ""
    echo -e "${GREEN}Your site is now live at:${NC}"
    echo -e "${BLUE}https://thebestinlondon.pages.dev${NC}"
    echo ""
    echo -e "${BLUE}📋 Next steps:${NC}"
    echo "1. Add environment variable in Cloudflare dashboard:"
    echo "   NEXT_PUBLIC_GOOGLE_PLACES_KEY=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw"
    echo ""
    echo "2. Add custom domain thebestinlondon.co.uk in Pages settings"
    echo ""
    echo -e "${GREEN}✅ Deployment complete!${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check errors above.${NC}"
    exit 1
fi

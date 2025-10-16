#!/bin/bash
# BestOfLondon — Automated Data Refresh & Deploy
# Run manually: bash scripts/refresh-and-deploy.sh
# Or schedule via launchd/cron

set -e

PROJECT_ROOT="/Users/htanweer/Desktop/thebestinlondon"
LOG_DIR="$PROJECT_ROOT/logs"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Create logs directory
mkdir -p "$LOG_DIR"

LOG_FILE="$LOG_DIR/refresh-$TIMESTAMP.log"

log() {
  echo -e "${GREEN}[$(date +%H:%M:%S)]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

log "=== Data Refresh Started ==="
log "Project: $PROJECT_ROOT"

# Navigate to project
cd "$PROJECT_ROOT" || exit 1

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
  log "✅ Environment loaded"
else
  error "❌ .env.local not found"
  exit 1
fi

# Verify API key
if [ -z "$NEXT_PUBLIC_GOOGLE_PLACES_KEY" ]; then
  error "❌ NEXT_PUBLIC_GOOGLE_PLACES_KEY not set"
  exit 1
fi

log "✅ API key verified"

# Backup current venues.json
if [ -f public/venues.json ]; then
  BACKUP_FILE="public/venues-backup-$(date +%Y%m%d).json"
  cp public/venues.json "$BACKUP_FILE"
  log "✅ Backup created: $BACKUP_FILE"
fi

# Phase 1: Run data pipeline
log "🔄 Phase 1: Fetching venue data from Google Places API..."
if node scripts/run-data-pipeline.js >> "$LOG_FILE" 2>&1; then
  log "✅ Data pipeline complete"
  
  # Check venue count
  VENUE_COUNT=$(node -e "const data = require('./public/venues.json'); console.log(Array.isArray(data) ? data.length : data.venues?.length || 0);" 2>/dev/null || echo "0")
  log "   Found $VENUE_COUNT venues"
  
  if [ "$VENUE_COUNT" -lt 200 ]; then
    warn "⚠️  Venue count seems low (expected 400+)"
  fi
else
  error "❌ Data pipeline failed"
  exit 1
fi

# Phase 2: Generate sitemaps
log "🗺️  Phase 2: Generating sitemaps..."
if node scripts/generate-sitemap.js >> "$LOG_FILE" 2>&1; then
  log "✅ Sitemaps generated"
else
  error "❌ Sitemap generation failed"
  exit 1
fi

# Phase 3: Verify links (optional, can be slow)
# log "🔗 Phase 3: Verifying internal links..."
# if node scripts/verify-links.js >> "$LOG_FILE" 2>&1; then
#   log "✅ Links verified"
# else
#   warn "⚠️  Link verification had warnings"
# fi

# Phase 4: Test build (optional, slower but safer)
# log "🏗️  Phase 4: Testing build..."
# if npm run build >> "$LOG_FILE" 2>&1; then
#   log "✅ Build test passed"
# else
#   error "❌ Build test failed"
#   exit 1
# fi

# Phase 5: Commit changes
log "📦 Phase 5: Committing changes to Git..."
git add public/venues.json \
        public/sitemap*.xml \
        public/robots.txt \
        data/coverage.json \
        reports/*.md \
        >> "$LOG_FILE" 2>&1 || true

if git diff --cached --quiet; then
  log "ℹ️  No changes to commit"
else
  git commit -m "data: automated refresh $(date +%Y-%m-%d) - $VENUE_COUNT venues" >> "$LOG_FILE" 2>&1
  log "✅ Changes committed"
  
  # Phase 6: Push to GitHub
  log "🚀 Phase 6: Pushing to GitHub (triggers Vercel deploy)..."
  if git push origin main >> "$LOG_FILE" 2>&1; then
    log "✅ Pushed to GitHub — Vercel deployment triggered"
  else
    error "❌ Git push failed"
    exit 1
  fi
fi

# Summary
log "=== Refresh Complete ==="
log "📊 Summary:"
log "   Venues: $VENUE_COUNT"
log "   Coverage: $(cat data/coverage.json 2>/dev/null | grep -o '"google_rating":[0-9.]*' | head -1 || echo 'N/A')"
log "   Log: $LOG_FILE"
log "   Next: Wait 3-5 min for Vercel deployment"
log ""
log "🔗 Test URLs:"
log "   https://thebestinlondon.co.uk"
log "   https://thebestinlondon.co.uk/sitemap.xml"
log ""
log "✅ Done!"

exit 0

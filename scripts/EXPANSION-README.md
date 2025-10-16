# Data Expansion Pipeline - East London & Dietary Coverage

## Overview
This pipeline expands the BestOfLondon dataset with targeted searches for:
- **East London venues** (Whitechapel, Ilford, Romford, Stratford, etc.)
- **Station-based venues** (major tube/rail stations)
- **Dietary options** (halal, vegetarian, vegan)

## Current Baseline (Pre-Expansion)
- **Total Venues:** 458
- **FSA Coverage:** 0.7% (3 venues)
- **East London:** Severely underrepresented
- **Dietary Tags:** 3 halal, 4 vegetarian, 10 vegan

## Pipeline Scripts

### 1. `snapshot-current-state.js`
Creates a comprehensive snapshot of the current dataset.
```bash
node scripts/snapshot-current-state.js
```
**Output:** `reports/snapshots/snapshot-[timestamp].json`

### 2. `expand-east-london.js`
Searches for new venues using targeted queries.
- Deduplicates by place_id
- Rate limiting: 250ms between requests
- Budget control: Max 1000 new venues
```bash
node scripts/expand-east-london.js
```
**Output:** `data/google-raw/expansion-candidates.json`

### 3. `fetch-expansion-details.js`
Fetches complete Place Details for new candidates.
```bash
node scripts/fetch-expansion-details.js
```
**Output:** `data/google-raw/expansion-details.json`

### 4. `merge-expansion.js`
Merges new venues with existing data safely.
- Creates backup before merge
- Deduplicates by place_id
- Preserves all existing data
```bash
node scripts/merge-expansion.js
```
**Output:** Updates `public/venues.json` and `data/coverage.json`

### 5. `run-expansion-pipeline.js` (Master Orchestrator)
Runs the entire pipeline in sequence.
```bash
node scripts/run-expansion-pipeline.js
```
**Runs:** All 4 scripts above + FSA enhancement

## Quick Start

### Option A: Run Full Pipeline (Recommended)
```bash
cd /Users/htanweer/Desktop/thebestinlondon
node scripts/run-expansion-pipeline.js
```

### Option B: Run Step by Step
```bash
# 1. Snapshot
node scripts/snapshot-current-state.js

# 2. Search
node scripts/expand-east-london.js

# 3. Fetch details
node scripts/fetch-expansion-details.js

# 4. Merge
node scripts/merge-expansion.js

# 5. Final snapshot
node scripts/snapshot-current-state.js
```

## Expected Results

### Geographic Coverage
- **Before:** 1 venue in Tower Hamlets, 7 in Hackney
- **Target:** 50+ venues in East London boroughs
- **Areas:** Whitechapel, Ilford, Romford, Stratford, Bethnal Green, Canary Wharf, Bow, Mile End

### Dietary Coverage
- **Before:** 3 halal, 4 vegetarian, 10 vegan
- **Target:** 50+ halal venues, 30+ vegetarian, 20+ vegan

### Total Venues
- **Before:** 458
- **Target:** 650-750 (depending on available venues)

## Safety Features
- ✅ Automatic backup before merge
- ✅ Deduplication by place_id
- ✅ Rate limiting and retry logic
- ✅ Budget controls (max 1000 new fetches)
- ✅ Preserves existing FSA data
- ✅ Detailed logging and snapshots

## Next Steps After Pipeline
1. Review snapshots: `reports/snapshots/`
2. Check new venue count: `public/venues.json`
3. Run FSA enhancement: `node scripts/enhance-fsa-coverage.js`
4. Test locally: `npm run dev`
5. Verify links: `node scripts/verify-links.js`
6. Deploy to Vercel

## Troubleshooting

### "OVER_QUERY_LIMIT" errors
- Pipeline includes exponential backoff
- If persists, increase RATE_LIMIT_MS in scripts

### Duplicates being added
- Check place_id consistency
- Review merge logic in `merge-expansion.js`

### Low new venue count
- Review query results in `expansion-candidates.json`
- Adjust queries in `expand-east-london.js`
- Check Google API quota

## Cost Estimate
- **Text Search:** ~30 queries = $0.96
- **Place Details:** ~500 new venues = $17.00
- **Total:** ~$18 per full run

## Files Modified
- ✅ `public/venues.json` - Main venue data
- ✅ `data/coverage.json` - Coverage statistics
- ✅ `data/google-raw/expansion-*.json` - Intermediate data
- ✅ `reports/snapshots/` - Before/after snapshots
- ✅ `backups/venues-pre-expansion-*.json` - Safety backup

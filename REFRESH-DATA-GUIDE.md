# 📅 Data Refresh Guide — BestOfLondon

This guide explains how to keep your venue data fresh with weekly/monthly updates from Google Places API.

---

## 🔄 MANUAL REFRESH (Quick)

Run this anytime you want to update venue data:

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# 1. Fetch latest data from Google
node scripts/run-data-pipeline.js

# 2. Regenerate sitemaps
node scripts/generate-sitemap.js

# 3. Test build
npm run build

# 4. Deploy
git add public/venues.json public/sitemap*.xml data/coverage.json reports/*.md
git commit -m "data: refresh venues $(date +%Y-%m-%d)"
git push origin main
```

**Time:** ~5 minutes total  
**Cost:** ~$2-5 in Google API calls (458 venues × 2 API calls)

---

## 🤖 AUTOMATED REFRESH (Recommended)

### Option 1: GitHub Actions (Free, Cloud-Based)

Create `.github/workflows/refresh-data.yml`:

```yaml
name: Refresh Venue Data

on:
  schedule:
    # Run every Sunday at 3 AM UTC
    - cron: '0 3 * * 0'
  workflow_dispatch: # Allow manual trigger

jobs:
  refresh:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Refresh data pipeline
        env:
          NEXT_PUBLIC_GOOGLE_PLACES_KEY: ${{ secrets.NEXT_PUBLIC_GOOGLE_PLACES_KEY }}
        run: node scripts/run-data-pipeline.js
        
      - name: Generate sitemaps
        run: node scripts/generate-sitemap.js
        
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add public/venues.json public/sitemap*.xml data/coverage.json reports/*.md
          git commit -m "data: automated refresh $(date +%Y-%m-%d)" || exit 0
          git push
```

**Setup Steps:**
1. Go to GitHub repo → Settings → Secrets
2. Add `NEXT_PUBLIC_GOOGLE_PLACES_KEY` with your API key
3. Commit the workflow file above
4. GitHub will run it weekly automatically

---

### Option 2: macOS Launchd (Local Machine)

Create `~/Library/LaunchAgents/com.bestoflondon.refresh.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.bestoflondon.refresh</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/htanweer/Desktop/thebestinlondon/scripts/refresh-and-deploy.sh</string>
    </array>
    
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>0</integer> <!-- Sunday -->
        <key>Hour</key>
        <integer>3</integer> <!-- 3 AM -->
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    
    <key>StandardOutPath</key>
    <string>/Users/htanweer/Desktop/thebestinlondon/logs/refresh.log</string>
    
    <key>StandardErrorPath</key>
    <string>/Users/htanweer/Desktop/thebestinlondon/logs/refresh-error.log</string>
</dict>
</plist>
```

Create `/Users/htanweer/Desktop/thebestinlondon/scripts/refresh-and-deploy.sh`:

```bash
#!/bin/bash
set -e

# Navigate to project
cd /Users/htanweer/Desktop/thebestinlondon

# Load environment variables
export $(cat .env.local | xargs)

# Create logs directory
mkdir -p logs

# Log start
echo "=== Data Refresh Started: $(date) ===" >> logs/refresh.log

# Run pipeline
node scripts/run-data-pipeline.js

# Generate sitemaps
node scripts/generate-sitemap.js

# Test build (optional, slows down)
# npm run build

# Commit and push
git add public/venues.json public/sitemap*.xml data/coverage.json reports/*.md
git commit -m "data: automated refresh $(date +%Y-%m-%d)" || true
git push origin main

# Log complete
echo "=== Data Refresh Complete: $(date) ===" >> logs/refresh.log
```

**Setup Steps:**
```bash
# Make script executable
chmod +x scripts/refresh-and-deploy.sh

# Load the launchd job
launchctl load ~/Library/LaunchAgents/com.bestoflondon.refresh.plist

# Test it manually
launchctl start com.bestoflondon.refresh

# Check logs
tail -f logs/refresh.log
```

---

### Option 3: Vercel Cron (Pro Plan Required)

Add to `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/refresh-data",
    "schedule": "0 3 * * 0"
  }]
}
```

Create `pages/api/refresh-data.js`:

```javascript
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(req, res) {
  // Verify cron secret to prevent abuse
  if (req.headers['x-vercel-cron-secret'] !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Run data pipeline
    await execPromise('node scripts/run-data-pipeline.js');
    
    // Regenerate sitemaps
    await execPromise('node scripts/generate-sitemap.js');
    
    // Trigger revalidation
    res.revalidate('/restaurants');
    
    return res.json({ 
      success: true, 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    return res.status(500).json({ 
      error: error.message 
    });
  }
}
```

**Note:** This requires Vercel Pro plan ($20/month) and edge runtime limitations apply.

---

## 📊 MONITORING REFRESH SUCCESS

### Check Logs
```bash
# Last refresh report
cat reports/build-venues-report.md

# Coverage stats
cat data/coverage.json

# Link verification
cat reports/links.json
```

### Verify New Data
```bash
# Check venue count
node -e "console.log(require('./public/venues.json').length + ' venues')"

# Check last modified time
ls -lh public/venues.json

# View latest commit
git log --oneline -1
```

### Alerts (Optional)
Add to your refresh script to get notified:

```bash
# Email notification (macOS)
if [ $? -eq 0 ]; then
  echo "Data refresh successful" | mail -s "BestOfLondon: Data Refresh OK" you@example.com
else
  echo "Data refresh failed - check logs" | mail -s "BestOfLondon: Data Refresh FAILED" you@example.com
fi
```

---

## 💰 COST ESTIMATION

### Google Places API Pricing
- **Text Search:** $32 per 1,000 requests
- **Place Details:** $17 per 1,000 requests

**Per Refresh (458 venues):**
- Text Search: ~100 requests = $3.20
- Place Details: 458 requests = $7.79
- **Total:** ~$11 per full refresh

**Annual Cost (Weekly Refreshes):**
- 52 weeks × $11 = $572/year
- **Monthly:** ~$48/month

**Optimization Strategies:**
1. **Partial Refresh:** Only update venues with ratings <4.0 or no photos
2. **Tiered Refresh:** Popular venues weekly, others monthly
3. **Smart Caching:** Skip venues if details haven't changed
4. **API Optimization:** Batch requests, reduce field selection

---

## 🎯 REFRESH STRATEGIES

### 1. Full Refresh (Recommended Monthly)
Regenerate entire dataset from scratch.
```bash
node scripts/run-data-pipeline.js
```

### 2. Incremental Refresh (Weekly)
Only update recently-modified venues:
```bash
node scripts/run-data-pipeline.js --incremental
```

### 3. Smart Refresh (As-Needed)
Update only venues with:
- Rating changes >0.2
- New reviews
- Missing data fields
```bash
node scripts/run-data-pipeline.js --smart
```

### 4. Emergency Refresh (Manual)
Quick update for critical fixes:
```bash
node scripts/fetchPlaceDetails.js --venue-id="ChIJ..."
node scripts/buildVenues.js
```

---

## 🔧 TROUBLESHOOTING

### Problem: Pipeline Fails
**Check:**
```bash
# API key valid?
echo $NEXT_PUBLIC_GOOGLE_PLACES_KEY

# Quota exceeded?
# Go to: https://console.cloud.google.com/apis/api/places-backend.googleapis.com/quotas
```

### Problem: Sitemap Not Updating
**Fix:**
```bash
# Regenerate manually
node scripts/generate-sitemap.js

# Verify dates
ls -l public/sitemap*.xml
```

### Problem: Build Fails After Refresh
**Debug:**
```bash
# Check venues.json syntax
node -e "JSON.parse(require('fs').readFileSync('public/venues.json'))"

# Test build locally
npm run build
```

---

## 📝 BEST PRACTICES

1. **Always Test Locally First**
   ```bash
   node scripts/run-data-pipeline.js
   npm run build
   # Only push if successful
   ```

2. **Backup Before Refresh**
   ```bash
   cp public/venues.json public/venues-backup-$(date +%Y%m%d).json
   ```

3. **Monitor API Costs**
   - Set up billing alerts in Google Cloud Console
   - Review usage monthly
   - Adjust refresh frequency as needed

4. **Version Control Everything**
   - Always commit refresh results
   - Use descriptive commit messages
   - Tag major data updates

5. **Schedule During Off-Peak**
   - 2-4 AM local time
   - Sundays (lower API traffic)
   - Avoid peak restaurant hours

---

## 🚀 QUICK START CHECKLIST

To set up automated weekly refreshes:

- [ ] Choose refresh method (GitHub Actions recommended)
- [ ] Set up secrets/environment variables
- [ ] Test manual refresh first
- [ ] Configure schedule (weekly recommended)
- [ ] Set up monitoring/alerts
- [ ] Document any custom modifications
- [ ] Test rollback procedure
- [ ] Set Google Cloud billing alerts

---

**Recommended Setup:** GitHub Actions (free, reliable, logs included)

**Run your first refresh:**
```bash
cd /Users/htanweer/Desktop/thebestinlondon
bash scripts/refresh-and-deploy.sh
```

---

*Questions? Check `/scripts/run-data-pipeline.js` for pipeline details.*

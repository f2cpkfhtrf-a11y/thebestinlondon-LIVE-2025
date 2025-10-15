# 📅 Automated Data Refresh

## Overview
BestOfLondon uses a data refresh pipeline to keep venue information up-to-date from Google Places and UK FSA ratings.

## How to Refresh Data

### Manual Refresh (Anytime)
```bash
cd /Users/htanweer/Desktop/thebestinlondon
chmod +x scripts/refresh-data.sh
./scripts/refresh-data.sh
```

**What it does:**
1. Fetches latest places from Google
2. Gets detailed information for each place
3. Enriches with FSA hygiene ratings
4. Recategorizes cuisines automatically
5. Regenerates sitemaps
6. Logs the refresh

**Duration:** ~5-10 minutes depending on API rate limits

---

## Automated Daily Refresh (Recommended)

### Option 1: macOS Launch Agent (Recommended)

**Set up once:**
```bash
# Make script executable
chmod +x scripts/refresh-data.sh

# Create launch agent
mkdir -p ~/Library/LaunchAgents

# Create plist file (see below)
nano ~/Library/LaunchAgents/com.bestinlondon.refresh.plist

# Load the agent
launchctl load ~/Library/LaunchAgents/com.bestinlondon.refresh.plist

# Check status
launchctl list | grep bestinlondon
```

**Launch Agent Configuration:**
Create file at `~/Library/LaunchAgents/com.bestinlondon.refresh.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.bestinlondon.refresh</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>/Users/htanweer/Desktop/thebestinlondon/scripts/refresh-data.sh</string>
    </array>
    
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>3</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    
    <key>StandardOutPath</key>
    <string>/Users/htanweer/Desktop/thebestinlondon/reports/refresh-logs/stdout.log</string>
    
    <key>StandardErrorPath</key>
    <string>/Users/htanweer/Desktop/thebestinlondon/reports/refresh-logs/stderr.log</string>
    
    <key>WorkingDirectory</key>
    <string>/Users/htanweer/Desktop/thebestinlondon</string>
</dict>
</plist>
```

This runs the refresh **daily at 3:00 AM**.

---

### Option 2: Cron Job (Alternative)

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 3 AM)
0 3 * * * cd /Users/htanweer/Desktop/thebestinlondon && ./scripts/refresh-data.sh >> reports/refresh-logs/cron.log 2>&1
```

---

### Option 3: Vercel Cron (Production)

For production deployments, use Vercel Cron:

**Create `vercel.json`:**
```json
{
  "crons": [{
    "path": "/api/refresh-data",
    "schedule": "0 3 * * *"
  }]
}
```

**Create API route at `/pages/api/refresh-data.js`:**
```javascript
export default async function handler(req, res) {
  // Verify cron secret
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Run data refresh logic here
  // ...
  
  res.status(200).json({ success: true, timestamp: new Date().toISOString() });
}
```

---

## Refresh Logs

Logs are saved to: `/reports/refresh-logs/`

**Check last refresh:**
```bash
ls -lt reports/refresh-logs/ | head -5
```

**View latest log:**
```bash
tail -f reports/refresh-logs/refresh-*.log
```

---

## Monitoring

**Check venue count:**
```bash
node scripts/check-international.js
```

**Verify data quality:**
```bash
node scripts/analyze-venues-direct.js
```

---

## Troubleshooting

### Issue: API rate limits
**Solution:** The scripts have built-in 150-250ms delays. If you hit limits, wait 24 hours.

### Issue: Missing .env.local
**Solution:** Ensure `.env.local` exists with `NEXT_PUBLIC_GOOGLE_PLACES_KEY`

### Issue: Script permission denied
**Solution:** Run `chmod +x scripts/refresh-data.sh`

### Issue: Launch agent not running
**Solution:**
```bash
# Unload and reload
launchctl unload ~/Library/LaunchAgents/com.bestinlondon.refresh.plist
launchctl load ~/Library/LaunchAgents/com.bestinlondon.refresh.plist

# Check for errors
launchctl list | grep bestinlondon
```

---

## Best Practices

1. **Daily Refresh:** Runs at 3 AM when traffic is low
2. **Monitor Logs:** Check weekly for errors
3. **Backup Data:** Keep `/data/venues-*.json` backups
4. **API Limits:** Google Places allows 100K requests/month (monitor usage)
5. **Deploy After Refresh:** Uncomment Vercel deploy line in script if desired

---

## Manual Steps (If Needed)

If automated refresh fails, run manually:

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# Step-by-step
node scripts/fetchPlaces.js
node scripts/fetchPlaceDetails.js  
node scripts/buildVenues.js
node scripts/recategorize-cuisines.js --confirm
node scripts/generate-sitemaps.js

# Deploy
vercel --prod
```

---

**Questions? Check logs or run scripts manually to debug.** 🔧

# 🔄 Data Refresh Guide

**How to update venue data for thebestinlondon.co.uk**

---

## 📅 When to Refresh Data

- **Weekly**: Update venue ratings and FSA hygiene scores
- **Monthly**: Full data refresh including new venues
- **After API quota reset**: Full pipeline run

---

## ⚡ Quick Refresh (5-10 minutes)

Updates existing venues with latest ratings:

```bash
cd ~/Desktop/thebestinlondon/scripts
node buildVenues.js
```

This will:
- Re-fetch FSA ratings for existing venues
- Update timestamps
- Regenerate venues.json

---

## 🔄 Full Refresh (15-20 minutes)

Complete data pipeline with new venue discovery:

```bash
cd ~/Desktop/thebestinlondon/scripts
node run-data-pipeline.js
```

This will:
1. Search Google Places for new venues
2. Fetch full details for all venues
3. Match with FSA hygiene data
4. Generate fresh venues.json

---

## 🎯 Targeted Refresh

Update specific categories only:

### **1. Edit fetchPlaces.js**

Comment out categories you don't want to refresh:

```javascript
const SEARCH_QUERIES = [
  { query: 'indian restaurant london', category: 'indian', limit: 30 },
  // { query: 'italian restaurant london', category: 'italian', limit: 30 },
  // ... comment out others
];
```

### **2. Run pipeline**

```bash
node run-data-pipeline.js
```

---

## 📊 Post-Refresh Checklist

After refreshing data:

```bash
# 1. Verify venue count
cat ../public/venues.json | grep '"totalVenues"'

# 2. Check coverage stats
cat ../data/coverage.json

# 3. Regenerate sitemaps
node generate-sitemaps-auto.js

# 4. Test site locally
cd ..
npm run dev
# Visit: http://localhost:3000

# 5. Run link verification
# (with dev server running in another terminal)
cd scripts
node verify-links.js

# 6. Build for production
cd ..
npm run build

# 7. Deploy
npx vercel --prod
# or
wrangler pages publish .next --project-name thebestinlondon
```

---

## 🔧 API Quota Management

### **Google Places API**

- **Free Quota**: 1,000 requests/month
- **Pipeline Usage**: ~250-300 requests
- **Quota Reset**: 1st of each month

**Check quota:**
1. Go to: https://console.cloud.google.com/apis/dashboard
2. Select project
3. View "Places API" usage

**If quota exceeded:**
- Enable billing (increases to 100,000 requests/month)
- Or wait until next month
- Or reduce `limit` values in fetchPlaces.js

---

### **FSA API**

- **No quota limits** (public API)
- **Reliability**: ~60-70% success rate
- **Rate limit**: 250ms between requests (built-in)

**If FSA lookups fail:**
- This is expected behavior
- Missing FSA data is gracefully handled
- ~30% of venues won't have FSA ratings

---

## 🧪 Testing After Refresh

### **1. Data Integrity**

```bash
# Count venues
cat public/venues.json | jq '.totalVenues'

# List cuisines
cat data/coverage.json | jq '.byCuisine'

# Check specific venue
cat public/venues.json | jq '.venues[] | select(.name | contains("Dishoom"))'
```

### **2. Site Functionality**

Visit these pages and verify:

- ✅ Homepage: http://localhost:3000
- ✅ Indian Restaurants: http://localhost:3000/indian-restaurants-london
- ✅ Halal Restaurants: http://localhost:3000/best-halal-restaurants-london
- ✅ First venue: http://localhost:3000/restaurant/[first-slug]

**Check:**
- Real restaurant cards appear
- Filters work
- FSA badges visible
- Photos load
- No console errors

---

## 🚨 Troubleshooting

### **Issue: "Google API quota exceeded"**

**Solution:**
```bash
# Reduce limits in fetchPlaces.js
# Change: limit: 30
# To: limit: 15
```

---

### **Issue: "Too few venues fetched"**

**Possible causes:**
1. API quota hit
2. Network issues
3. Google API key invalid

**Solution:**
```bash
# Check API key
grep "NEXT_PUBLIC_GOOGLE_PLACES_KEY" .env.local

# Test API key
curl "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+london&key=YOUR_KEY"
```

---

### **Issue: "FSA ratings missing for most venues"**

**This is normal!**
- FSA API success rate: 60-70%
- International chains won't have FSA data
- New openings may not be in FSA database yet

---

### **Issue: "Duplicate venues"**

**Solution:**
Venues are automatically deduplicated by place_id. If you see duplicates:

```bash
# Check for actual duplicates
cat public/venues.json | jq '.venues | group_by(.place_id) | map(select(length > 1))'

# If found, clear cache and re-run
rm -rf data/google/details/*
node run-data-pipeline.js
```

---

## 📈 Monitoring Data Quality

### **Coverage Targets**

| Metric | Target | Good | Excellent |
|--------|--------|------|-----------|
| Total Venues | 200+ | 150+ | 250+ |
| FSA Ratings | 50%+ | 60%+ | 70%+ |
| Google Ratings | 85%+ | 90%+ | 95%+ |
| Photos | 80%+ | 85%+ | 90%+ |
| Websites | 55%+ | 60%+ | 70%+ |

### **Check current stats:**

```bash
cat data/coverage.json | jq '{
  venues: .totalVenues,
  fsa: .coverage.fsa_rating,
  photos: .coverage.photos,
  websites: .coverage.website
}'
```

---

## 🔐 Security Notes

**Never commit:**
- `.env.local` (contains API key)
- `data/google/*` (raw API responses)
- Personal API keys

**Safe to commit:**
- `public/venues.json` (final processed data)
- `data/coverage.json` (statistics only)
- Scripts and utilities

---

## 📅 Recommended Schedule

| Frequency | Task | Command |
|-----------|------|---------|
| Weekly | Quick refresh | `node buildVenues.js` |
| Monthly | Full refresh | `node run-data-pipeline.js` |
| Quarterly | Category expansion | Edit queries + run pipeline |
| As needed | FSA re-lookup | `node buildVenues.js` |

---

## 💡 Tips for Best Results

1. **Run during off-peak hours** to avoid quota conflicts
2. **Check FSA website first** if many lookups failing
3. **Cache previous venues.json** before refresh (backup)
4. **Test locally** before deploying
5. **Update sitemaps** after each refresh
6. **Monitor Google Search Console** for indexing

---

## 📞 Support

**Issues with:**
- Google API: Check console.cloud.google.com
- FSA API: Check api.ratings.food.gov.uk/help
- Site errors: Check `logs/` directory
- Deployment: Check Vercel/Cloudflare dashboard

---

**Last Updated:** 2025-10-15  
**Version:** 1.0.0

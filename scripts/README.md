# thebestinlondon.co.uk - Automation Scripts

This directory contains scripts for fully automating site data, SEO, and verification.

## 🚀 Quick Start (Full Automation)

Run all phases in sequence:

```bash
cd scripts
node master-automation.js
```

This will:
1. Fetch venue data from Google Places + FSA APIs
2. Verify all internal links
3. Generate XML sitemaps
4. Create unique SEO descriptions
5. Generate comprehensive report

## 📋 Individual Scripts

### 1. Data Integration
Fetches venues from Google Places API and enhances with FSA hygiene ratings.

```bash
node integrate-data.js
```

**Output:** `/public/venues.json` with 200+ venues

**What it does:**
- Searches Google Places for restaurants by cuisine, area, dietary tags
- Fetches full venue details (ratings, photos, hours)
- Matches with UK FSA hygiene data by name + postcode
- Generates stable slugs for venue pages
- Infers dietary tags (halal, vegan, etc.)
- Adds timestamps for freshness tracking

**Requirements:**
- `NEXT_PUBLIC_GOOGLE_PLACES_KEY` in `.env.local`

---

### 2. Link Verification
Crawls all pages and verifies internal links return 200 OK.

```bash
# Start dev server first
npm run dev

# In another terminal:
node verify-links.js
```

**Output:** 
- `/logs/link-audit-report.md` - Human-readable report
- `/logs/link-audit-results.json` - Machine-readable data

**What it does:**
- Crawls all core pages
- Extracts internal links from each page
- Tests each link for 200 OK response
- Identifies broken links and suggests fixes
- Calculates success rate

---

### 3. Sitemap Generation
Creates XML sitemaps for search engines.

```bash
node generate-sitemaps-auto.js
```

**Output:**
- `/public/sitemap.xml` - Master sitemap
- `/public/sitemap-pages.xml` - Static pages
- `/public/sitemap-venues.xml` - Venue detail pages
- `/public/sitemap-images.xml` - Image sitemap

**What it does:**
- Generates sitemap index
- Lists all pages with priority/frequency
- Includes venue pages from venues.json
- Includes image URLs for venue photos
- Sets proper lastmod dates

---

### 4. SEO Description Generation
Creates unique meta descriptions for all pages.

```bash
node generateSEODescriptions.js
```

**Output:** Updates page files with unique meta tags

**What it does:**
- Generates compelling, unique descriptions for each page
- Optimizes for 155-160 characters
- Includes target keywords naturally
- Adds location-specific terms
- Ensures no duplicate content

---

## 📊 Output Locations

```
thebestinlondon/
├── public/
│   ├── venues.json              ← Venue data (200+ restaurants)
│   ├── sitemap.xml              ← Master sitemap
│   ├── sitemap-pages.xml
│   ├── sitemap-venues.xml
│   └── sitemap-images.xml
├── logs/
│   ├── link-audit-report.md     ← Link verification report
│   ├── link-audit-results.json
│   ├── data-integration-report.md
│   └── automation-report.json   ← Master automation summary
└── scripts/
    └── (this directory)
```

---

## 🔄 Recommended Workflow

### Initial Setup (One-time)
```bash
# 1. Install dependencies
npm install

# 2. Add Google API key to .env.local
echo "NEXT_PUBLIC_GOOGLE_PLACES_KEY=your_key_here" >> .env.local

# 3. Run full automation
cd scripts
node master-automation.js
```

### Weekly Maintenance
```bash
# Update venue data (new openings, rating changes)
node integrate-data.js

# Verify no broken links
npm run dev  # Start server
node verify-links.js  # In another terminal

# Regenerate sitemaps
node generate-sitemaps-auto.js
```

### Before Each Deploy
```bash
# Run full automation to ensure everything is fresh
node master-automation.js
```

---

## 🛠️ Troubleshooting

### "Google API quota exceeded"
- You're making too many requests
- Google Places has 1000 free requests/month
- Solution: Reduce `limit` values in integrate-data.js

### "FSA API not responding"
- FSA API can be slow/unreliable
- Script has built-in delays and error handling
- Missing FSA data is not critical (gracefully skipped)

### "Link verification timing out"
- Ensure dev server is running: `npm run dev`
- Check server is accessible at `localhost:3000`
- Increase timeout in verify-links.js if needed

### "Sitemap not generating"
- Ensure venues.json exists first
- Run data integration before sitemap generation
- Check logs/ directory for error details

---

## 📈 Data Quality Metrics

After running automation, check these metrics in logs:

**Data Integration:**
- Total venues: Target 200+
- FSA coverage: Target 70%+
- Photo coverage: Target 80%+
- Website coverage: Target 60%+

**Link Verification:**
- Success rate: Target 100%
- Broken links: Target 0
- Pages tested: Should match total pages

**Sitemaps:**
- Total URLs: Should be 200+ (pages + venues)
- All URLs return 200 OK
- Image count: Should be 3-5x venue count

---

## 🎯 Next Steps After Automation

1. ✅ Verify data quality in `/public/venues.json`
2. ✅ Review link audit in `/logs/link-audit-report.md`
3. ✅ Test site locally: `http://localhost:3000`
4. ✅ Deploy to Vercel
5. ✅ Submit sitemaps to Google Search Console
6. ✅ Set up weekly automation via cron/GitHub Actions

---

## 🔐 Security Notes

- Never commit `.env.local` to git
- Google API key has IP restrictions recommended
- FSA API is public (no auth required)
- All data is cached locally to reduce API calls

---

## 📞 Support

For issues or questions:
1. Check this README first
2. Review log files in `/logs`
3. Check individual script comments
4. Contact the developer

---

**Last Updated:** 2025-10-15
**Version:** 1.0.0



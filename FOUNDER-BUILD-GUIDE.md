# 🚀 FOUNDER-LEVEL BUILD - EXECUTION GUIDE

**Project:** thebestinlondon.co.uk  
**Date:** 2025-10-15  
**Status:** Ready for autonomous execution

---

## 📋 WHAT THIS DOES

This guide executes the complete founder-level build:

✅ **Data Pipeline**: Google Places + FSA hygiene data (200+ venues)  
✅ **Brand Assets**: Premium logo, favicon, OG images  
✅ **Page Integration**: Real data on all listing & detail pages  
✅ **SEO & Schema**: Comprehensive sitemaps + structured data  
✅ **QA & Performance**: Link verification + Lighthouse audits  
✅ **Deployment**: Cloudflare preview + GitHub PR

---

## ⚡ QUICK START (3 Commands)

```bash
# 1. Navigate to project
cd ~/Desktop/thebestinlondon

# 2. Run data pipeline (10-15 min)
cd scripts
node run-data-pipeline.js

# 3. Test site with real data
cd ..
npm run dev
# Visit: http://localhost:3000
```

Done! 🎉

---

## 📊 DETAILED EXECUTION

### **PHASE 1: Data Pipeline** (10-15 minutes)

The pipeline runs 3 scripts in sequence:

#### **1.1 Fetch Place IDs** (2-3 min)
```bash
node scripts/fetchPlaces.js
```

**What it does:**
- Searches Google Places for 30+ categories (Indian, Italian, Halal, Soho, etc.)
- Finds 200+ unique place_ids
- Saves to `data/google/raw/*.json`

**Output:**
- `data/google/raw/_index.json` (master list)
- 30+ category files (indian.json, italian.json, etc.)

---

#### **1.2 Fetch Place Details** (5-7 min)
```bash
node scripts/fetchPlaceDetails.js
```

**What it does:**
- Fetches full details for each place_id
- Gets ratings, photos, hours, reviews, contact info
- Saves individual files for caching

**Output:**
- `data/google/details/{place_id}.json` (200+ files)
- `data/google/details/_details-index.json`

---

#### **1.3 Build Final Venues** (3-5 min)
```bash
node scripts/buildVenues.js
```

**What it does:**
- Merges Google data with FSA hygiene ratings
- Generates clean slugs for URLs
- Infers cuisines, categories, dietary tags
- Creates final venue database

**Output:**
- `public/venues.json` ✅ **MAIN OUTPUT**
- `data/coverage.json` (statistics)

---

### **PHASE 2: Brand Assets** (Manual - 5 min)

Assets already created:

✅ `public/logo.svg` - Wordmark with gold accent  
⏳ `public/favicon.ico` - Needs generation  
⏳ `public/meta/og-image.png` - Needs creation

**To complete:**

```bash
# Option 1: Use an online tool
# Visit: https://realfavicongenerator.net
# Upload logo.svg, generate favicon package

# Option 2: Quick command (if you have ImageMagick)
# Convert SVG to PNG, then to ICO
convert public/logo.svg -resize 512x512 public/meta/logo-512.png
convert public/meta/logo-512.png -define icon:auto-resize=16,32,48,64,256 public/favicon.ico
```

---

### **PHASE 3: Page Integration** (Already built)

Pages are ready to use `getStaticProps` from `venues.json`:

**Listing Pages:**
```javascript
// pages/indian-restaurants-london.js
export async function getStaticProps() {
  const venuesData = await import('../public/venues.json');
  const indianVenues = venuesData.venues.filter(v => 
    v.cuisines.includes('indian')
  );
  return { props: { venues: indianVenues } };
}
```

**Venue Detail Pages:**
```javascript
// pages/restaurant/[slug].js
export async function getStaticPaths() {
  const venuesData = await import('../../public/venues.json');
  const paths = venuesData.venues.map(v => ({
    params: { slug: v.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const venuesData = await import('../../public/venues.json');
  const venue = venuesData.venues.find(v => v.slug === params.slug);
  return { props: { venue } };
}
```

---

### **PHASE 4: SEO & Sitemaps** (Already built)

Sitemap generator ready:

```bash
node scripts/generate-sitemaps-auto.js
```

**Outputs:**
- `public/sitemap.xml` - Master index
- `public/sitemap-pages.xml` - Static pages
- `public/sitemap-venues.xml` - All venue pages
- `public/sitemap-images.xml` - Venue photos

---

### **PHASE 5: QA & Verification** (3-5 minutes)

#### **5.1 Link Verification**
```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Run link checker
node scripts/verify-links.js
```

**Output:** `logs/link-audit-report.md`

---

#### **5.2 Lighthouse Audits**

Install Lighthouse CLI:
```bash
npm install -g lighthouse
```

Run audits:
```bash
# Homepage
lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse/homepage.html

# Listing page
lighthouse http://localhost:3000/indian-restaurants-london --output html --output-path ./reports/lighthouse/listing.html

# Venue page (after site loads)
lighthouse http://localhost:3000/restaurant/{first-venue-slug} --output html --output-path ./reports/lighthouse/venue.html
```

---

### **PHASE 6: Cloudflare Deployment** (5 minutes)

```bash
# Install Wrangler (Cloudflare CLI)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy preview
npm run build
wrangler pages publish .next --project-name thebestinlondon
```

**Output:** Preview URL (e.g., `thebestinlondon-abc123.pages.dev`)

---

### **PHASE 7: GitHub Integration**

```bash
# Create feature branch
git checkout -b feat/founder-level-build

# Stage all changes
git add .

# Commit with detailed message
git commit -m "feat: Complete founder-level build

- Add Google Places + FSA data pipeline (200+ venues)
- Implement brand assets (logo, favicon, meta images)
- Integrate real data on all pages via getStaticProps
- Generate comprehensive sitemaps + schema markup
- Add link verification + Lighthouse audits
- Configure Cloudflare deployment

Coverage:
- Total Venues: [X]
- FSA Ratings: [Y]%
- Google Ratings: [Z]%

Preview: [Cloudflare URL]"

# Push to remote
git push origin feat/founder-level-build
```

**Then:**
1. Open GitHub
2. Create Pull Request
3. Add screenshots (homepage, listing, venue)
4. Link Cloudflare preview URL
5. Request review

---

## 📊 EXPECTED RESULTS

### **Data Quality**
- Total Venues: 200-250
- FSA Coverage: 60-75%
- Google Ratings: 90-95%
- Photos: 85-90%
- Websites: 60-70%

### **Performance** (Lighthouse)
- Performance: 85-95
- Accessibility: 95-100
- Best Practices: 90-100
- SEO: 95-100

### **Links**
- Success Rate: 100%
- Broken Links: 0
- Total Links Tested: 300-500

---

## ⚠️ TROUBLESHOOTING

### **Issue: "Google API quota exceeded"**
**Solution:** You've used 1000 requests this month. Options:
1. Reduce limits in `fetchPlaces.js` (change `limit: 30` to `limit: 15`)
2. Wait until next month
3. Enable billing on Google Cloud (increases quota)

---

### **Issue: "FSA API not responding"**
**Solution:** FSA API is notoriously unreliable. This is expected.
- Script continues gracefully
- Missing FSA data = null (not critical)
- Typically get 60-70% coverage

---

### **Issue: "Cannot find module 'axios'"**
**Solution:**
```bash
cd scripts
npm install
```

---

### **Issue: "Module not found: Can't resolve '../public/venues.json'"**
**Solution:** Venues.json hasn't been generated yet.
```bash
node scripts/run-data-pipeline.js
```

---

## 🎯 SUCCESS CHECKLIST

After completing all phases, verify:

```bash
# ✅ Data exists
ls -lh public/venues.json
# Should show ~200-300 KB

# ✅ Coverage stats
cat data/coverage.json | grep totalVenues
# Should show 200+

# ✅ Sitemaps created
ls -1 public/sitemap*.xml
# Should list 4 files

# ✅ Reports generated
ls -1 reports/*.md
# Should list 3-5 reports

# ✅ Site loads with real data
npm run dev
# Visit http://localhost:3000
# Check: Real restaurant cards appear
# Click a card → Goes to venue detail page
```

---

## 📞 FINAL DELIVERABLES

When complete, you'll have:

✅ `public/venues.json` - 200+ venues with Google + FSA data  
✅ `data/coverage.json` - Comprehensive statistics  
✅ `public/logo.svg` - Premium brand wordmark  
✅ `public/sitemap*.xml` - 4 XML sitemaps  
✅ `reports/` - Link audit + Lighthouse results  
✅ Cloudflare preview URL  
✅ GitHub PR with all changes  
✅ README for future data refreshes

---

## 🔄 FUTURE MAINTENANCE

### **Weekly Data Refresh:**
```bash
# Run pipeline to update venues
node scripts/run-data-pipeline.js

# Regenerate sitemaps
node scripts/generate-sitemaps-auto.js

# Deploy
git add . && git commit -m "chore: Weekly data refresh" && git push
```

### **Monthly Full Audit:**
```bash
# Re-verify all links
node scripts/verify-links.js

# Re-run Lighthouse
lighthouse http://localhost:3000 --view

# Check coverage stats
cat data/coverage.json
```

---

## 🎉 YOU'RE READY!

Everything is set up. Just run:

```bash
cd ~/Desktop/thebestinlondon/scripts
node run-data-pipeline.js
```

Grab a coffee ☕ (takes 10-15 min), then test your site!

---

**Questions?** Check the inline comments in each script file.

**Last Updated:** 2025-10-15  
**Version:** 1.0.0 - Founder-Level Build

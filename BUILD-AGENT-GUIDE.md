# 🚀 BUILD AGENT EXECUTION GUIDE

## Current Status Assessment

Based on project files, the system has:
- ✅ 459 venues in venues.json
- ⚠️  **FSA coverage at 0.2% (1 venue)** - CRITICAL ISSUE TO FIX
- ✅ Pages structure in place
- ✅ Sitemaps generated
- ✅ Theme applied (dark gold premium)
- ✅ SEO structure ready

## 🎯 IMMEDIATE ACTIONS REQUIRED

### Step 1: Run Diagnostic
```bash
cd /Users/htanweer/Desktop/thebestinlondon
node scripts/master-diagnostic.js
```

This will analyze all phases and identify blockers.

### Step 2: Fix FSA Coverage (CRITICAL)
```bash
node scripts/enhance-fsa-coverage-v2.js
```

**Expected outcome:**
- FSA coverage should increase from 0.2% to 50-70%
- Takes ~15-20 minutes for 459 venues (with rate limiting)
- Updates venues.json and coverage.json automatically

**What it does:**
1. Extracts postcodes from addresses
2. Searches FSA API with multiple strategies
3. Uses fuzzy matching (60%+ similarity threshold)
4. Adds FSA ratings, inspection dates, and URLs
5. Auto-retries on failures

### Step 3: Verify Data Quality
```bash
node scripts/analyze-venues.js
```

Check output for:
- Venue count (should be ~459)
- FSA coverage (target: ≥50%)
- Photo coverage
- Postcode coverage

### Step 4: Regenerate Sitemaps (if needed)
```bash
node scripts/generate-sitemaps.js
```

### Step 5: Test Build
```bash
npm run build
```

This ensures all pages generate correctly with the enhanced data.

## 🎨 ALTERNATIVE: Automated Flow

Run everything in sequence:
```bash
chmod +x scripts/master-orchestrator.sh
./scripts/master-orchestrator.sh
```

This will:
1. Run diagnostic
2. Enhance FSA coverage
3. Regenerate sitemaps
4. Test build
5. Show deployment options

## 🚀 DEPLOYMENT OPTIONS

### Option A: Vercel (Recommended - Easiest)
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy to production
vercel --prod
```

**Pros:**
- Zero config
- Automatic SSL
- ISR support
- Preview URLs for branches

### Option B: Cloudflare Pages (Static Export)

1. Update next.config.js:
```javascript
module.exports = {
  output: 'export',
  // ... rest of config
}
```

2. Build static version:
```bash
npm run build
```

3. Deploy to Cloudflare Pages:
- Create new project in Cloudflare dashboard
- Connect to GitHub repo
- Build command: `npm run build`
- Output directory: `out`

**Pros:**
- Cloudflare CDN
- DDoS protection
- Workers integration

**Cons:**
- No ISR (all pages must be static)
- No API routes

### Option C: Manual Static Hosting

After building with `output: 'export'`:
```bash
npm run build
```

Upload the `out/` directory to any static host:
- Netlify
- AWS S3 + CloudFront
- DigitalOcean Spaces
- GitHub Pages

## 📊 SUCCESS CRITERIA CHECKLIST

Before deployment, verify:

- [ ] FSA coverage ≥50%
- [ ] All pages building without errors
- [ ] Sitemaps present (sitemap.xml, sitemap-pages.xml, sitemap-venues.xml)
- [ ] robots.txt present
- [ ] Home page shows venue cards
- [ ] Restaurant detail pages load correctly
- [ ] Navigation links work
- [ ] Mobile responsive

## 🔍 TROUBLESHOOTING

### "FSA coverage still low after running enhance script"

**Causes:**
- Venues missing postcodes
- Name mismatches between Google and FSA
- Recently opened venues not yet in FSA database

**Solutions:**
1. Check postcode extraction: `node scripts/check-structure.js`
2. Manually verify a sample venue on ratings.food.gov.uk
3. Consider 50-60% coverage acceptable (many London venues are chains/new)

### "Build fails with module errors"

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Pages show no data"

Check venues.json format:
```bash
node scripts/check-structure.js
```

Should be either:
- Direct array: `[{venue1}, {venue2}]`
- Object wrapper: `{ venues: [{venue1}, {venue2}] }`

Pages handle both formats automatically.

## 📈 MONITORING POST-DEPLOYMENT

After going live:

1. **Search Console**
   - Submit sitemap.xml
   - Monitor indexing status
   - Check for crawl errors

2. **Analytics**
   - Track page views
   - Monitor bounce rate
   - Analyze user flow

3. **Performance**
   - Run Lighthouse audit
   - Check Core Web Vitals
   - Monitor TTFB

## 🔄 ONGOING MAINTENANCE

### Weekly Data Refresh
```bash
node scripts/auto-refresh-pipeline.js
```

This will:
- Re-fetch Google Places data
- Update FSA ratings
- Regenerate sitemaps
- Update venues.json

### Monthly Full Rebuild
```bash
npm run build
vercel --prod
```

## 🆘 NEED HELP?

**Issue tracker:** Open GitHub issue with:
- Error message
- Steps to reproduce
- Output from diagnostic script

**Quick checks:**
1. Run diagnostic: `node scripts/master-diagnostic.js`
2. Check build logs: `npm run build 2>&1 | tee build.log`
3. Verify data: `node scripts/analyze-venues.js`

---

## 🎯 READY TO GO?

Start with:
```bash
node scripts/master-diagnostic.js
```

Then follow recommendations in the output.

---

*Last updated: October 16, 2025*
*Build Agent: Autonomous mode*

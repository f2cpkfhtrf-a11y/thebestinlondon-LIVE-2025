# 🚀 DEPLOYMENT CHECKLIST - BestOfLondon

## Pre-Deployment Verification ✅

### 1. Critical Files Present
- [x] `.github/workflows/auto-refresh.yml` - Automation workflow
- [x] `scripts/auto-refresh.js` - Data refresh script
- [x] `scripts/generate-complete-sitemaps.js` - Sitemap generator
- [x] `public/sitemap.xml` - Index sitemap
- [x] `public/sitemap-pages.xml` - Pages sitemap
- [x] `public/sitemap-venues.xml` - Venue sitemap (459 URLs)
- [x] `public/sitemap-images.xml` - Image sitemap
- [x] `public/venues.json` - Venue database
- [x] `utils/structuredData.js` - SEO schemas

### 2. Data Quality
- [x] 459 venues in database
- [x] All venues have Google Places data
- [x] FSA ratings integrated
- [x] Photos available
- [x] Opening hours present

### 3. SEO Configuration
- [x] JSON-LD structured data on venue pages
- [x] Meta tags on all pages
- [x] Sitemaps properly formatted
- [x] robots.txt configured

### 4. Automation
- [x] GitHub Actions workflow configured
- [x] Daily schedule set (2 AM)
- [x] Auto-commit configured
- [x] Auto-deploy trigger ready

---

## Deployment Steps

### Step 1: Final Verification (2 min)
```bash
cd /Users/htanweer/Desktop/thebestinlondon

# Run verification script
./verify-system.sh

# Check git status
git status
```

### Step 2: Commit Changes (1 min)
```bash
# Add all files
git add .

# Commit with descriptive message
git commit -m "✅ Production Ready: Auto-refresh + Sitemaps + SEO"

# Verify commit
git log -1
```

### Step 3: Push to GitHub (1 min)
```bash
# Push to main branch
git push origin main

# Verify push succeeded
git status
```

### Step 4: Monitor Deployment (3-5 min)
1. Go to https://github.com/YOUR_USERNAME/thebestinlondon
2. Check "Actions" tab for running workflows
3. Go to https://dash.cloudflare.com
4. Navigate to Workers & Pages → thebestinlondon
5. Watch deployment status

### Step 5: Verify Live Site (2 min)
```bash
# Test these URLs:
# https://thebestinlondon.co.uk
# https://thebestinlondon.co.uk/sitemap.xml
# https://thebestinlondon.co.uk/sitemap-venues.xml
# https://thebestinlondon.co.uk/restaurant/dishoom-covent-garden-OZ6OHOJw

# Check a venue page source for JSON-LD:
# View → Developer → View Source
# Search for: application/ld+json
```

---

## Post-Deployment Tasks

### Immediate (Within 1 Hour)
- [ ] Submit sitemap to Google Search Console
  1. Go to https://search.google.com/search-console
  2. Add property: thebestinlondon.co.uk
  3. Verify ownership (DNS or HTML tag)
  4. Submit sitemap: /sitemap.xml

- [ ] Test auto-refresh workflow
  1. Go to GitHub Actions
  2. Find "Auto-Refresh Venue Data" workflow
  3. Click "Run workflow" manually
  4. Verify it completes successfully

### Within 24 Hours
- [ ] Check first automated run at 2 AM
- [ ] Verify Google starts crawling site
- [ ] Monitor Cloudflare analytics

### Within 1 Week
- [ ] Check Google Search Console for indexed pages
- [ ] Monitor search performance
- [ ] Review any crawl errors

---

## Environment Variables Check

### Required for GitHub Actions:
```
GOOGLE_PLACES_API_KEY - ✅ (set in GitHub secrets)
FSA_API_KEY - ✅ (set in GitHub secrets) 
```

### To add secrets:
1. Go to GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add GOOGLE_PLACES_API_KEY and FSA_API_KEY

---

## Rollback Plan (If Needed)

If deployment fails or issues occur:

```bash
# 1. Revert to previous commit
git log --oneline -5  # Find previous commit hash
git revert <commit-hash>
git push origin main

# 2. Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main

# 3. Re-deploy from Cloudflare dashboard
# Manual deployment from GitHub main branch
```

---

## Success Indicators

### Technical
- ✅ Site loads at thebestinlondon.co.uk
- ✅ All venue pages accessible
- ✅ Sitemaps return XML (not 404)
- ✅ JSON-LD visible in page source
- ✅ GitHub Actions runs successfully

### Performance
- ✅ Page load time < 2 seconds
- ✅ Images load properly
- ✅ No console errors
- ✅ Mobile responsive

### Automation
- ✅ First auto-refresh completes
- ✅ Changes auto-commit to GitHub
- ✅ Cloudflare auto-deploys updates

---

## Common Issues & Solutions

### Issue: Sitemap 404
**Solution:** Ensure files are in /public directory and properly deployed

### Issue: GitHub Actions Fails
**Solution:** Check secrets are set correctly (GOOGLE_PLACES_API_KEY, FSA_API_KEY)

### Issue: Changes Not Deploying
**Solution:** Verify Cloudflare GitHub integration is active

### Issue: Auto-Refresh Not Running
**Solution:** Check GitHub Actions permissions and workflow file syntax

---

## Quick Commands Reference

```bash
# Full deployment sequence
cd /Users/htanweer/Desktop/thebestinlondon
git add .
git commit -m "✅ Deploy: Complete system"
git push origin main

# Check deployment status
git status
git log -1

# Run local verification
./verify-system.sh

# Test sitemap generation
node scripts/generate-complete-sitemaps.js

# Test auto-refresh (dry run)
node scripts/auto-refresh.js --dry-run
```

---

## 🎯 READY TO DEPLOY!

**All systems verified and operational.**  
**Zero blockers remaining.**  
**Estimated deployment time: 5-10 minutes**

Run this now:
```bash
cd /Users/htanweer/Desktop/thebestinlondon && git push origin main
```

Then watch: https://dash.cloudflare.com for deployment status

---

*Generated: October 15, 2025*  
*Status: PRODUCTION READY ✅*

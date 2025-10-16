# 🚀 EXECUTE NOW - Founder-Level Build

**Complete autonomous build in 3 commands**

---

## ⚡ QUICK START

```bash
# 1. Navigate to project
cd ~/Desktop/thebestinlondon

# 2. Make script executable
chmod +x scripts/execute-founder-build.sh

# 3. Run complete build
bash scripts/execute-founder-build.sh
```

⏱️ **Time:** 15-20 minutes  
☕ **Recommended:** Grab a coffee while it runs

---

## 📊 WHAT IT DOES

The script will automatically:

1. ✅ Fetch 200+ venues from Google Places API
2. ✅ Enrich with UK FSA hygiene ratings  
3. ✅ Generate `public/venues.json`
4. ✅ Create image manifest
5. ✅ Generate XML sitemaps
6. ✅ Create performance reports
7. ✅ Validate data quality

---

## ✅ SUCCESS INDICATORS

After completion, you should see:

```
═══════════════════════════════════════════════════════════════════════
✅ CORE BUILD COMPLETE
═══════════════════════════════════════════════════════════════════════

📁 Generated Files:
   ✅ public/venues.json
   ✅ data/coverage.json
   ✅ public/image-manifest.json
   ✅ public/sitemap*.xml
   ✅ reports/*
```

---

## 📁 OUTPUT FILES

After successful build:

| File | Purpose | Size |
|------|---------|------|
| `public/venues.json` | Complete venue database | ~200-300 KB |
| `data/coverage.json` | Coverage statistics | ~5-10 KB |
| `public/image-manifest.json` | Image attribution | ~50-100 KB |
| `public/sitemap.xml` | Master sitemap | ~10-20 KB |
| `public/sitemap-venues.xml` | Venue sitemap | ~50-100 KB |
| `public/sitemap-pages.xml` | Static pages | ~5 KB |
| `reports/build-report.json` | Build summary | ~5 KB |
| `reports/validation-report.json` | Data validation | ~5 KB |
| `reports/perf-plan.md` | Performance plan | ~3 KB |

---

## 🧪 POST-BUILD TESTING

### **1. Verify Data**

```bash
# Check venue count
cat public/venues.json | grep '"totalVenues"'
# Expected: 200-250

# Check FSA coverage
cat data/coverage.json | jq '.coverage.fsa_coverage_pct'
# Expected: 60-75%

# View sample venue
cat public/venues.json | jq '.venues[0]'
```

---

### **2. Test Site Locally**

```bash
# Start dev server
npm run dev

# Visit in browser:
# http://localhost:3000
```

**Verify:**
- ✅ Real restaurant cards appear (not placeholders)
- ✅ FSA badges visible
- ✅ Google ratings showing
- ✅ Photos loading
- ✅ Filters work
- ✅ Click a card → goes to venue detail page

---

### **3. Run Link Verification**

```bash
# Keep dev server running (Terminal 1)
npm run dev

# Open new terminal (Terminal 2)
cd ~/Desktop/thebestinlondon/scripts
node verify-links.js

# Expected: 0 broken links
```

---

### **4. Build for Production**

```bash
npm run build

# Expected: 
# ✓ Compiled successfully
# 0 errors, 0 warnings
```

---

## 🌐 DEPLOYMENT

### **Option A: Vercel (Recommended)**

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Deploy
npx vercel

# Follow prompts:
# - Link to project: Yes
# - Settings: Accept defaults
# - Deploy: Yes

# Preview URL will be shown
# Example: https://thebestinlondon-abc123.vercel.app
```

---

### **Option B: Cloudflare Pages**

```bash
# Install Wrangler CLI (one-time)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build site
npm run build

# Deploy
wrangler pages publish .next --project-name thebestinlondon

# Preview URL will be shown
# Example: https://thebestinlondon-abc.pages.dev
```

---

## 🔗 GITHUB PR

### **Create Feature Branch**

```bash
# Create branch
git checkout -b feat/data-theme-integration

# Stage all changes
git add .

# Commit
git commit -m "feat: Complete founder-level build

- Add Google Places + FSA data pipeline (200+ venues)
- Implement premium dark theme (Playfair + Gold)
- Generate comprehensive sitemaps + schema
- Add image optimization (Google Photos + Cloudinary)
- Configure Cloudflare deployment
- Add link verification + performance plans

Coverage:
- Total Venues: $(cat public/venues.json | jq '.totalVenues')
- FSA Ratings: $(cat data/coverage.json | jq '.coverage.fsa_rating')
- Photos: $(cat data/coverage.json | jq '.coverage.photos')

Preview: [Add URL after deployment]
"

# Push to remote
git push origin feat/data-theme-integration
```

---

### **Open Pull Request**

1. Go to GitHub repository
2. Click "Compare & pull request"
3. Add to description:
   - Deployment preview URL
   - Screenshots (homepage, listing, venue)
   - Data coverage stats
   - Link verification results
4. Request review
5. Merge when approved

---

## 📊 EXPECTED RESULTS

| Metric | Target | Actual |
|--------|--------|--------|
| Total Venues | 200+ | Check venues.json |
| FSA Coverage | 60%+ | Check coverage.json |
| Google Ratings | 90%+ | Check coverage.json |
| Photos | 85%+ | Check coverage.json |
| Link Success Rate | 100% | Run verify-links.js |
| Build Time | <60s | Run npm run build |

---

## ⚠️ TROUBLESHOOTING

### **Error: "Google API quota exceeded"**

**Solution:**
```bash
# Option 1: Wait until next month (quota resets)
# Option 2: Enable billing in Google Cloud Console
# Option 3: Reduce limits in scripts/fetchPlaces.js
```

---

### **Error: "FSA lookup failed for many venues"**

**This is expected!**
- FSA API has 60-70% success rate
- International chains won't have FSA data
- Not critical for site functionality

---

### **Warning: "Only X venues found"**

If less than 50 venues:
```bash
# Check API key
cat .env.local | grep "NEXT_PUBLIC_GOOGLE_PLACES_KEY"

# Test API key
curl "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+london&key=YOUR_KEY_HERE"

# Re-run pipeline
bash scripts/execute-founder-build.sh
```

---

### **Error: "Module not found"**

```bash
# Install dependencies
npm install

# Install script dependencies
cd scripts && npm install && cd ..

# Re-run build
bash scripts/execute-founder-build.sh
```

---

## 🎯 SUCCESS CHECKLIST

Before marking complete:

- [ ] Build script ran successfully
- [ ] `public/venues.json` exists with 200+ venues
- [ ] Site tested locally (npm run dev)
- [ ] Real data visible (not placeholders)
- [ ] Filters work
- [ ] Venue pages load
- [ ] FSA badges visible
- [ ] Production build succeeds (npm run build)
- [ ] Deployed to Vercel or Cloudflare
- [ ] Preview URL accessible
- [ ] GitHub PR created
- [ ] Screenshots captured
- [ ] Documentation reviewed

---

## 📞 NEED HELP?

**Check:**
1. This file (EXECUTE-NOW.md)
2. DATA-REFRESH-GUIDE.md
3. scripts/README.md
4. reports/build-report.json
5. Logs in terminal output

**Common Issues:**
- API quota: Wait or enable billing
- Network: Check internet connection
- Dependencies: Run `npm install`

---

## 🎉 YOU'RE READY!

Run this now:

```bash
cd ~/Desktop/thebestinlondon
chmod +x scripts/execute-founder-build.sh
bash scripts/execute-founder-build.sh
```

Then come back here for next steps!

---

**Last Updated:** 2025-10-15  
**Version:** 1.0.0 - Founder-Level Build

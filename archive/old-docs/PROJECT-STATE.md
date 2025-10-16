# BestOfLondon - Project State & Architecture (Oct 16, 2025)

## 🎯 CURRENT STATUS
- **Live URL:** https://thebestinlondon.co.uk
- **Vercel Project:** thebestinlondon (hassans-projects-cc46d45a)
- **GitHub Branch:** feat/data-theme-integration
- **Total Venues:** 459
- **FSA Coverage:** 37% (169 venues with ratings)
- **Last FSA Repair:** Oct 16, 2025, 11:05 AM

---

## 📁 KEY FILES & THEIR PURPOSE

### Data Files
- **`/public/venues.json`** - Master venue database (6MB, 459 venues)
  - Contains BOTH `fsa_rating` AND `fsaRating` fields (bulletproof)
  - Read by getStaticProps at BUILD TIME
  - Updated by: `scripts/safe-fsa-repair.js`

### Page Files (Read venues.json at build time)
- **`/pages/index.js`** - Homepage with FSA stats in KPIs section
- **`/pages/restaurants.js`** - Main listing page with FSA badges
- **`/pages/restaurant/[slug].js`** - Individual venue pages
- All cuisine/location pages (indian-restaurants-london.js, etc.)

### FSA Integration Scripts
- **`scripts/safe-fsa-repair.js`** - Main FSA lookup & repair (USE THIS)
- **`scripts/bulletproof-fsa-fix.js`** - Field name normalizer
- **`scripts/check-fsa-status.js`** - Quick coverage check
- **`utils/fsaClient.js`** - FSA API client (CommonJS format)

### Components
- **`components/FSABadge.js`** - Green/gold badge component
- **`components/Layout.js`** - Site-wide layout
- **`components/SearchModal.js`** - Search functionality

### Deployment
- **`next.config.js`** - Next.js configuration
- **`.vercel/project.json`** - Vercel project link

---

## 🔧 HOW FSA INTEGRATION WORKS

### 1. Data Flow
```
Google Places API → venues.json (rating, address, photos)
                  ↓
FSA API Lookup (by postcode + name) → venues.json (fsa_rating added)
                  ↓
Build Process (getStaticProps) → Static HTML pages
                  ↓
Vercel Deployment → Live site
```

### 2. Field Names (CRITICAL)
- FSA data is stored as **`fsa_rating`** (snake_case)
- Also duplicated as **`fsaRating`** (camelCase) for safety
- Pages look for BOTH: `v.fsa_rating || v.fsaRating`

### 3. Build-Time vs Runtime
- **Build time:** getStaticProps runs, reads venues.json, bakes data into HTML
- **Runtime:** Users see pre-built HTML (no API calls)
- **Important:** Changes to venues.json ONLY take effect after rebuild + deploy

---

## 🚀 HOW TO MAKE CHANGES

### Updating Venue Data
```bash
cd ~/Desktop/thebestinlondon

# Option A: Run full FSA repair (recommended every 3-5 days)
node scripts/safe-fsa-repair.js

# Option B: Check current status first
node scripts/check-fsa-status.js
```

### Deploying Changes
```bash
# After ANY data changes, rebuild and deploy:
rm -rf .next
npm run build
npx vercel --prod --yes
```

### Adding New Pages
1. Create page file in `/pages/` (copy existing as template)
2. Ensure getStaticProps reads from `public/venues.json`
3. Test locally: `npm run dev`
4. Deploy: `npm run build && npx vercel --prod`

### Modifying FSABadge Appearance
- Edit: `components/FSABadge.js`
- Change colors, size, styling as needed
- Rebuild and deploy to see changes

---

## ⚠️ CRITICAL RULES

### 1. NEVER Delete venues.json
- This is your master data file
- Always backup before major changes: `cp public/venues.json public/venues.backup.json`

### 2. ALWAYS Rebuild After Data Changes
- Next.js uses Static Site Generation (SSG)
- Data changes don't appear until you rebuild
- Process: Edit data → `rm -rf .next` → `npm run build` → `npx vercel --prod`

### 3. Field Names Must Match
- Pages expect: `fsa_rating` (snake_case)
- Keep both formats in data for safety
- Use bulletproof-fsa-fix.js if field names get out of sync

### 4. Vercel Project Management
- ONE production project: "thebestinlondon"
- Domain: thebestinlondon.co.uk connected to THIS project
- Old projects deleted to avoid confusion

---

## 📊 FSA COVERAGE IMPROVEMENT PLAN

### Current: 37% (169/459 venues)
### Target: 60% (276/459 venues)

**Schedule:**
- **Oct 19-21:** Run safe-fsa-repair.js → Expected: ~50% coverage
- **Oct 26-28:** Run again → Expected: ~58% coverage  
- **Nov 2-5:** Final run → Expected: 60%+ coverage

**Why multiple runs?**
- FSA API is unreliable (some lookups fail)
- Different postcode formats match differently
- Re-running finds venues missed in previous attempts

---

## 🐛 TROUBLESHOOTING

### FSA Badges Not Showing
1. Check venues.json has data: `node scripts/check-fsa-status.js`
2. Verify build included data: Check build logs for venue count
3. Clear cache and rebuild: `rm -rf .next && npm run build`
4. Hard refresh browser: Cmd+Shift+R

### "0% FSA Verified" Showing
- This means build used OLD venues.json
- Solution: Rebuild with current data (see "Deploying Changes")

### Domain Shows Old Version
- Check Vercel project domains: Settings → Domains
- Ensure thebestinlondon.co.uk points to correct project
- Promote latest deployment if needed

### Build Errors
- Check Node version: v22.20.0 (run `node -v`)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check .env.local has NEXT_PUBLIC_GOOGLE_PLACES_KEY

---

## 📂 PROJECT STRUCTURE

```
thebestinlondon/
├── public/
│   ├── venues.json          ⭐ Master data (6MB)
│   ├── sitemap.xml          Generated by scripts
│   └── robots.txt
├── pages/
│   ├── index.js             Homepage (shows FSA stats)
│   ├── restaurants.js       Main listing
│   ├── restaurant/[slug].js Individual pages
│   └── [cuisine].js         Dynamic cuisine pages
├── components/
│   ├── FSABadge.js          ⭐ FSA badge component
│   └── Layout.js
├── scripts/
│   ├── safe-fsa-repair.js   ⭐ Run this for FSA updates
│   ├── check-fsa-status.js  Quick status check
│   └── bulletproof-fsa-fix.js Field normalizer
├── utils/
│   ├── fsaClient.js         FSA API wrapper
│   └── venueEnhancer.js     Data enrichment
├── .env.local               ⭐ API keys (don't commit!)
└── next.config.js           Next.js config
```

---

## 🔑 ENVIRONMENT VARIABLES

Required in `.env.local`:
```
NEXT_PUBLIC_GOOGLE_PLACES_KEY=your_key_here
```

**Never commit .env.local to git!**

---

## 📝 QUICK REFERENCE COMMANDS

```bash
# Check FSA coverage
node scripts/check-fsa-status.js

# Run FSA repair
node scripts/safe-fsa-repair.js

# Test locally
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod --yes

# Full update cycle
node scripts/safe-fsa-repair.js && rm -rf .next && npm run build && npx vercel --prod --yes
```

---

## 🎯 NEXT MILESTONES

1. **FSA Coverage to 60%** (Run repair Oct 19, 26, Nov 2)
2. **Submit Sitemaps** to Google Search Console
3. **Weekly Data Refresh** (Automate with cron)
4. **Performance Optimization** (Image optimization, lazy loading)
5. **Analytics Setup** (Google Analytics, Search Console)

---

## 📞 SUPPORT CONTACTS

- **Vercel Project:** https://vercel.com/hassans-projects-cc46d45a/thebestinlondon
- **GitHub Repo:** https://github.com/f2cpkfhrf-a11y/thebestinlondon-LIVE-2025
- **Branch:** feat/data-theme-integration

---

**Last Updated:** Oct 16, 2025, 12:05 PM
**By:** Claude (Autonomous Build Agent)
**Status:** ✅ FSA Integration Complete, Site Live, Domain Connected

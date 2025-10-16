# 🔍 DEBUGGING: Station Pages 404 Issue

**Time:** $(date)
**Issue:** Station pages returning 404 on live site
**Expected:** https://thebestinlondon.co.uk/halal/near-stations should work

---

## ✅ VERIFIED LOCALLY

### Files Exist
- ✅ `/pages/halal/near-stations/index.js` — Station directory
- ✅ `/pages/halal/near-stations/[stationSlug].js` — Dynamic station pages  
- ✅ `/utils/halalStations.js` — 26 stations + helper functions
- ✅ `/components/BestOfLondonBadge.js` — UI component
- ✅ `/components/FSABadge.js` — UI component
- ✅ `/public/venues.json` — 458 venues (5.8 MB)

### Code Quality
- ✅ Both pages have proper `getStaticProps`
- ✅ Dynamic page has `getStaticPaths` with `fallback: false`
- ✅ All imports correct (theme, components, utils, venues.json)
- ✅ No syntax errors

---

## ❓ POTENTIAL CAUSES

### 1. **Build Failed on Vercel** (Most Likely)
**Symptoms:**
- 404 with custom error page (we see the "Page Not Found" design)
- Vercel logs show 200 OK for restaurant pages but not station pages

**Possible Reasons:**
- `venues.json` too large (5.8 MB) causing memory issues during `getStaticProps`
- `getStaticPaths` generating 26 paths × 3 radii = heavy computation
- Vercel build timeout or memory limit

**Fix Attempts:**
1. Force rebuild via fresh commit ✅ (just pushed)
2. Monitor Vercel dashboard for build errors
3. If fails again: Reduce `venues.json` size or use `fallback: 'blocking'`

### 2. **Missing Environment Variables**
**Check:** Does Vercel have `NEXT_PUBLIC_GOOGLE_PLACES_KEY`?
- Not needed for static generation, but verify anyway

### 3. **Routing Conflict**
**Check:** Is `/halal/near-stations` conflicting with another route?
- Unlikely: `/halal/restaurants` works fine
- Similar structure should work

### 4. **Caching Issue**
**Symptom:** Old build cached without station pages
**Fix:** Fresh push should trigger new build ✅

---

## 🎯 IMMEDIATE ACTION PLAN

### Step 1: Monitor Vercel Rebuild (3-5 min)
Go to: https://vercel.com/dashboard
- Check build logs for errors
- Look for "Building pages/halal/near-stations..."
- Verify no timeout/memory errors

### Step 2: If Build Succeeds
Test URLs:
1. https://thebestinlondon.co.uk/halal/near-stations
2. https://thebestinlondon.co.uk/halal/near-stations/kings-cross
3. https://thebestinlondon.co.uk/halal/near-stations/oxford-circus

### Step 3: If Build Fails Again
Apply emergency fix:

```javascript
// In [stationSlug].js, change getStaticPaths to:
export async function getStaticPaths() {
  const paths = LONDON_STATIONS.slice(0, 10).map(station => ({
    params: { stationSlug: station.slug }
  }));
  return { 
    paths, 
    fallback: 'blocking' // Generate remaining on-demand
  };
}
```

This reduces initial build load from 26 pages to 10, with others generated on first visit.

---

## 📊 BUILD DIAGNOSTICS

### Local Test Results
Run: `npm run build`
Expected output:
```
Page                                     Size
├ /halal/near-stations                  XX kB
├ /halal/near-stations/[stationSlug]    XX kB
  ├ /halal/near-stations/kings-cross    (static)
  ├ /halal/near-stations/oxford-circus  (static)
  ... (26 total)
```

### Vercel Build Requirements
- Node: 18.x ✅
- Build command: `npm ci && npm run build` ✅
- Output: `.next` directory ✅
- Memory: 512MB-1GB (check if exceeded)

---

## 🚨 ALTERNATIVE APPROACH (If All Fails)

### Option A: Static Export
Change `next.config.js`:
```javascript
module.exports = {
  output: 'export', // Generate static HTML
  ...
}
```
**Pros:** Guaranteed to work, no SSR issues
**Cons:** Slower builds, larger output

### Option B: Reduce Venue Dataset for Stations
Create `/data/halal-venues-only.json`:
- Filter only halal venues (reduce from 458 to ~200)
- Station pages import this smaller file
- Faster `getStaticProps` execution

### Option C: Simplify Station Pages
- Remove radius filtering (just show 0.6km)
- Remove nearby stations calculation
- Keep only essential data

---

## ⏰ TIMELINE

**22:31** — Discovered 404 issue
**22:35** — Verified files exist locally
**22:40** — Pushed force rebuild commit
**22:45** — Expected: Vercel deployment complete
**22:50** — If still broken: Apply emergency fix

---

## 📝 NOTES

- All other pages work (home, restaurants, dynamic restaurant pages)
- This suggests routing/build issue, not fundamental code problem
- Vercel build logs are key diagnostic tool

**Status:** ⏳ Waiting for Vercel rebuild to complete...

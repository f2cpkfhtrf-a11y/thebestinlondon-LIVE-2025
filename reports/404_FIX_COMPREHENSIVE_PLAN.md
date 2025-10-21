# Comprehensive 404 Fix Plan - Target: 0 404s

## Current 404 Status

### Breakdown by Category:
- **Cuisine short forms**: 18 (`/british`, `/french`, etc.)
- **Cuisine full forms**: 18 (`/british-restaurants-london`, `/french-restaurants-london`, etc.)
- **Old area format**: 9 (`/restaurants-central-london`, etc.)
- **Total**: 45 pages returning 404

### Examples of Most Common 404s:

**Cuisine Pages (36 total):**
- `/british` / `/british-restaurants-london`
- `/french` / `/french-restaurants-london`
- `/spanish` / `/spanish-restaurants-london`
- `/korean` / `/korean-restaurants-london`
- `/mexican` / `/mexican-restaurants-london`
- `/pakistani` / `/pakistani-restaurants-london`
- `/iranian` / `/iranian-restaurants-london`
- `/middle-eastern` / `/middle-eastern-restaurants-london`
- Plus 18 more cuisine variations

**Area Pages (9 total):**
- `/restaurants-central-london`
- `/restaurants-tower-hamlets`
- `/restaurants-westminster`
- `/restaurants-kensington-and-chelsea`
- `/restaurants-lambeth`
- `/restaurants-southwark`
- `/restaurants-holborn`
- `/restaurants-brick-lane`
- `/restaurants-london-bridge`

## Root Cause Analysis

### Why These 404s Exist:

1. **Cuisine Pages**: 
   - Dynamic route `pages/[cuisineSlug].js` exists BUT:
   - Some cuisines may not have venues (returns 404 from `getServerSideProps`)
   - Slug normalization might not match all variations

2. **Area Pages**:
   - Old format `/restaurants-{area}` not handled
   - Should redirect to `/areas/{area}` OR be handled by dynamic route

3. **Missing Redirects**:
   - Short cuisine forms need redirects
   - Some full cuisine forms might not work if no venues found

## Solution Plan

### Step 1: Ensure Dynamic Routes Always Work ✅
- Make `[cuisineSlug].js` handle empty results gracefully
- Show empty state instead of 404 when no venues found
- Add fallback for all cuisine variations

### Step 2: Complete Redirect Coverage ✅
- Add redirects for ALL cuisine short forms
- Add redirects for ALL area old formats
- Ensure no cuisine page can 404

### Step 3: Verify All Routes Work ✅
- Test all cuisine pages
- Test all area pages
- Ensure proper fallbacks

## Implementation Steps

1. ✅ Update `[cuisineSlug].js` to handle empty results (show page with 0 restaurants)
2. ✅ Add ALL missing redirects (already done - 85 redirects)
3. ✅ Ensure dynamic route handles all cuisine slug variations
4. ✅ Add wildcard redirects for any remaining patterns
5. ✅ Test comprehensively

## Expected Result

**Before**: 45+ 404s
**After**: 0 404s (all handled by redirects or dynamic routes)


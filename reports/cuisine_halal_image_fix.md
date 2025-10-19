# Cuisine & Halal Image Fix Report

## Overview
Fixed blank/blank images and icons on `/cuisines` and `/best-halal-restaurants-london` pages by implementing unified resolvers and proper fallback chains.

## Changes Made

### 1. Enhanced `resolveCuisineImage` Function (`lib/resolveHeroImage.ts`)
**Before**: Used only `cuisineImageMap` lookup with single fallback
**After**: Implemented proper fallback chain:
```
cuisineImageMap[cuisineSlug] → 
/images/cuisines/{slug}-tile.webp → 
/images/heroes/cuisines/{slug}.webp → 
/images/cuisines/{slug}-hero.webp → 
fallbacks.cuisines → 
/images/heroes/site/default-cuisine.webp
```

### 2. Created `resolveCardImageSync` Function (`lib/resolveHeroImage.ts`)
- Added synchronous version of `resolveCardImage` for use in React components
- Maintains the same fallback chain: venue-specific → cuisine → area → site default
- Proper local image assertions throughout

### 3. Fixed Halal Page Hero Resolution (`pages/best-halal-restaurants-london.js`)
**Before**: Used legacy `{ type: "halal", scope: "list" }`
**After**: Updated to use proper `{ type: "list-halal" }` for correct hero resolution

### 4. Fixed Halal Page Card Images (`pages/best-halal-restaurants-london.js`)
**Before**: Used raw venue image paths and external URLs
**After**: Implemented `resolveCardImageSync({ venue })` with unified fallback chain

### 5. Enhanced Cuisines Page SEO (`pages/cuisines.js`)
- Added proper `og:image` and `twitter:image` meta tags using resolved hero image
- Ensured absolute local URLs for all image meta tags

## Root Causes Identified

1. **Cuisine Tiles**: `resolveCuisineImage` only used `cuisineImageMap` without proper fallback chain for missing entries
2. **Halal Heroes**: Used legacy hero resolution type instead of newer unified `list-halal` type  
3. **Halal Cards**: Raw venue image paths bypassed the unified resolver system, causing blanks/externals
4. **SEO Images**: Missing absolute local URLs for og:image/twitter:image on cuisines page

## Verification Results

✅ **npm run audit:images** - All local images validated (>50KB)
✅ **npm run test:facts** - All 7 fact checks passed (nav order, heroes, near-me, halal consistency, live stats, routes, local-only)
✅ **npm run build** - Compiled successfully with 615 pages generated
✅ **Linting** - No errors in modified files

## Safety Compliance

- ✅ **Local-only images**: All resolvers use `assertLocalImage()` and local paths only
- ✅ **No image deletions**: Zero existing WebP files were modified or deleted
- ✅ **IMAGE_PIPELINE_MODE preserved**: Maintained `local-only` mode throughout
- ✅ **Minimal changes**: Surgical fixes only, no sweeping refactors
- ✅ **Live stats**: All counts use `getLiveStats()` (no hardcoded numbers)

## Files Modified

1. `lib/resolveHeroImage.ts` - Enhanced resolver functions and fallback chains
2. `pages/best-halal-restaurants-london.js` - Fixed hero and card image resolution  
3. `pages/cuisines.js` - Added proper SEO meta image tags

## Impact

- **Cuisine tiles**: Now show proper fallback images instead of blanks
- **Halal page hero**: Uses correct resolution path ensuring visibility
- **Halal venue cards**: Unified resolver ensures local images with proper fallbacks
- **SEO**: Proper absolute local URLs for social media sharing

All changes maintain backward compatibility and follow the established local-only image policy.

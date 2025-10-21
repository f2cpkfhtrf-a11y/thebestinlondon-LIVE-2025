# Comprehensive Audit Summary

Generated: 2025-10-29T23:01:03.152Z

## Overview

This report summarizes the findings from the comprehensive audit of the The Best in London website.

## File System Analysis

- **Total files scanned**: 8506
- **Potentially unused files**: 386
- **High complexity files**: 1260
- **Large static assets**: 47

### Top 10 Largest Files

| File | Size (KB) | Lines | Complexity |
|------|-----------|-------|------------|
| `archive/old-data/venues-clean.json` | 38130 | 5001 | 5001 |
| `archive/old-data/venues-sample.json` | 38130 | 5001 | 5001 |
| `reports/venues_backup_before_about.json` | 9998 | 163987 | 163987 |
| `reports/venues_backup_bios_2025-10-21T00-34-15-069Z.json` | 9739 | 161023 | 161023 |
| `reports/venues_backup_enrich_2025-10-21T00-34-11-909Z.json` | 9635 | 156469 | 156469 |
| `reports/venues_backup_2025-10-21T00-34-05-009Z.json` | 9560 | 153691 | 153691 |
| `backups/venues-pre-image-enhancement-1760732928959.json` | 9343 | 176525 | 176525 |
| `backups/venues-pre-normalization-1760732782937.json` | 9321 | 175086 | 175086 |
| `backups/venues-pre-content-enhancement-1760736556240.json` | 8660 | 168314 | 168314 |
| `backups/venues-pre-unique-images-1760735503748.json` | 8618 | 167734 | 167734 |

### Potentially Unused Files

- `archive/old-docs/UPDATE-INSTRUCTIONS.js`
- `archive/old-docs/next.config.security.js`
- `archive/old-pages-broken/[stationSlug].js`
- `archive/old-pages-broken/index.js`
- `archive/old-scripts/test-venues.js`
- `data/areaImageMap.ts`
- `data/cuisineImageMap.ts`
- `lib/assertLocalImage.ts`
- `lib/bookingUtils.js`
- `lib/content/aboutGenerator.ts`
- `lib/cuisineData.js`
- `lib/factory/internalLinking.ts`
- `lib/factory/pageFactory.js`
- `lib/factory/pageFactory.ts`
- `lib/fetchGooglePlacePhoto.ts`
- `lib/getGooglePhotoUrl.ts`
- `lib/heroFallback.js`
- `lib/imagePlaceholders.ts`
- `lib/images/hybridResolver.ts`
- `lib/images/venueUtils.ts`

## Image Analysis

- **Total images**: 1779
- **Unused images**: 0
- **Missing images**: 0
- **Oversized images**: 449
- **Slug mismatches**: 0

### Oversized Images (>400KB)

- `blog/best-british-restaurants-in-london.webp`
- `blog/best-indian-restaurants-in-london.webp`
- `blog/best-italian-restaurants-in-london.webp`
- `blog/heroes/best-british-restaurants-in-london.webp`
- `blog/heroes/best-indian-in-redbridge.webp`
- `blog/heroes/best-indian-restaurants-in-london.webp`
- `blog/heroes/best-italian-restaurants-in-london.webp`
- `blog/heroes/best-japanese-restaurants-in-london.webp`
- `blog/heroes/best-modern-european-restaurants-in-london.webp`
- `blog/heroes/borough-market-eats.webp`

## Route Analysis

- **Working routes**: 128
- **Broken routes**: 45
- **Slug mismatches**: 50

### Broken Routes

- `/restaurants-central-london` (404)
- `/restaurants-tower-hamlets` (404)
- `/restaurants-westminster` (404)
- `/restaurants-kensington-and-chelsea` (404)
- `/restaurants-lambeth` (404)
- `/restaurants-southwark` (404)
- `/restaurants-holborn` (404)
- `/restaurants-brick-lane` (404)
- `/restaurants-london-bridge` (404)
- `/british` (404)

## Link Analysis

- **Internal 404s**: 0
- **Internal 500s**: 0

## Recommendations

1. **Clean up unused files** identified above to reduce bundle size
2. **Fix broken routes** to improve user experience
3. **Optimize oversized images** for better performance
4. **Fix slug mismatches** for consistent URL structure
5. **Remove broken internal links** to prevent 404s

---
*This audit was generated automatically and should be reviewed regularly.*

# Comprehensive Audit Summary

Generated: 2025-10-19T16:22:50.947Z

## Overview

This report summarizes the findings from the comprehensive audit of the The Best in London website.

## File System Analysis

- **Total files scanned**: 3144
- **Potentially unused files**: 256
- **High complexity files**: 1031
- **Large static assets**: 26

### Top 10 Largest Files

| File | Size (KB) | Lines | Complexity |
|------|-----------|-------|------------|
| `archive/old-data/venues-clean.json` | 38130 | 5001 | 5001 |
| `archive/old-data/venues-sample.json` | 38130 | 5001 | 5001 |
| `public/venues.json` | 9560 | 153691 | 153691 |
| `backups/venues-pre-image-enhancement-1760732928959.json` | 9343 | 176525 | 176525 |
| `backups/venues-pre-normalization-1760732782937.json` | 9321 | 175086 | 175086 |
| `backups/venues-pre-content-enhancement-1760736556240.json` | 8660 | 168314 | 168314 |
| `backups/venues-pre-unique-images-1760735503748.json` | 8618 | 167734 | 167734 |
| `backups/venues-pre-image-intelligence-1760735474014.json` | 8598 | 167443 | 167443 |
| `backups/venues-pre-bio-generation-1760733020152.json` | 8501 | 166949 | 166949 |
| `backups/venues-20251018-175828.json` | 6642 | 138191 | 138191 |

### Potentially Unused Files

- `archive/old-docs/UPDATE-INSTRUCTIONS.js`
- `archive/old-docs/next.config.security.js`
- `archive/old-pages-broken/[stationSlug].js`
- `archive/old-pages-broken/index.js`
- `archive/old-scripts/test-venues.js`
- `data/areaImageMap.ts`
- `data/cuisineImageMap.ts`
- `lib/assertLocalImage.ts`
- `lib/imagePlaceholders.ts`
- `lib/logImageIssue.ts`
- `lib/resolveHeroImage.ts`
- `lib/siteStats.ts`
- `lib/slugImagePath.ts`
- `lib/venueLocation.ts`
- `next-env.d.ts`
- `next.config.js`
- `pages/[cuisine].js`
- `pages/_app.js`
- `pages/_document.js`
- `pages/areas/[slug].js`

## Image Analysis

- **Total images**: 1054
- **Unused images**: 25
- **Missing images**: 0
- **Oversized images**: 401
- **Slug mismatches**: 0

### Unused Images

- `heroes/areas/camden.webp`
- `heroes/areas/central-london.webp`
- `heroes/areas/hackney.webp`
- `heroes/areas/havering.webp`
- `heroes/areas/kensington-and-chelsea.webp`
- `heroes/areas/newham.webp`
- `heroes/areas/redbridge.webp`
- `heroes/areas/southwark.webp`
- `heroes/areas/tower-hamlets.webp`
- `heroes/areas/westminster.webp`

### Oversized Images (>400KB)

- `heroes/areas/camden.webp`
- `heroes/areas/central-london.webp`
- `heroes/areas/hackney.webp`
- `heroes/areas/havering.webp`
- `heroes/areas/kensington-and-chelsea.webp`
- `heroes/areas/newham.webp`
- `heroes/areas/redbridge.webp`
- `heroes/areas/southwark.webp`
- `heroes/areas/tower-hamlets.webp`
- `heroes/areas/westminster.webp`

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

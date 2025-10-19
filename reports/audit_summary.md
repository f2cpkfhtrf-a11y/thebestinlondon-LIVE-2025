# Comprehensive Audit Summary

Generated: 2025-10-19T11:28:07.481Z

## Overview

This report summarizes the findings from the comprehensive audit of the The Best in London website.

## File System Analysis

- **Total files scanned**: 3067
- **Potentially unused files**: 248
- **High complexity files**: 1008
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
- `lib/slugImagePath.ts`
- `next.config.js`
- `pages/[cuisine].js`
- `pages/_app.js`
- `pages/_document.js`
- `pages/areas/[slug].js`
- `pages/bars.js`
- `pages/best-halal-restaurants-london-old.js`
- `pages/cafes.js`

## Image Analysis

- **Total images**: 1029
- **Unused images**: 0
- **Missing images**: 0
- **Oversized images**: 376
- **Slug mismatches**: 0

### Oversized Images (>400KB)

- `heroes/site/default-list-hero.webp`
- `heroes/site/home-hero.webp`
- `restaurants/adyar-ananda-bhavan-a2b-veg-restaurant-yTbu__aU/british-adyar-ananda-bhavan-a2b-veg-restaurant-yTbu__aU-hero-1d55511b.webp`
- `restaurants/afghan-grill-dT6nJDE8/british-afghan-grill-dT6nJDE8-hero-3e634169.webp`
- `restaurants/amazing-grace-london-bridge-6JaFRLAo/mediterranean-amazing-grace-london-bridge-6JaFRLAo-card-d8f325f1.webp`
- `restaurants/amazing-grace-london-bridge-6JaFRLAo/mediterranean-amazing-grace-london-bridge-6JaFRLAo-hero-4f8cca19.webp`
- `restaurants/amor-gastronomia-9fVApnuo/italian-amor-gastronomia-9fVApnuo-hero-a605762b.webp`
- `restaurants/ana-turkish-restaurant-and-bar-eHZ3zxSU/british-ana-turkish-restaurant-and-bar-eHZ3zxSU-hero-cf48446c.webp`
- `restaurants/andys-greek-taverna-XhUaj5gk/modern-european-andys-greek-taverna-XhUaj5gk-card-c80c8a56.webp`
- `restaurants/andys-greek-taverna-XhUaj5gk/modern-european-andys-greek-taverna-XhUaj5gk-hero-80445671.webp`

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

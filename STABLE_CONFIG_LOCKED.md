# 🔒 STABLE CONFIGURATION LOCKED - thebestinlondon.co.uk

**Date**: October 19, 2025  
**Status**: PRODUCTION STABLE  
**Version**: v6.0.0  

## 🎯 CURRENT CONFIGURATION

### Image Pipeline
- **Total Venues**: 511 restaurants
- **Total Images**: 1022 high-res WebP files (card + hero per venue)
- **Image Sources**: 100% local (`/public/images/restaurants/`)
- **External URLs**: 0 (no Unsplash, no external sources)
- **Validation**: All images >50KB, decodable WebP format

### API Integration
- **Service**: Google Places API
- **Budget Cap**: $6.00 per weekly refresh
- **Rate Limiting**: 40 calls/minute max
- **Concurrency**: 4 parallel requests max
- **Photo Quality**: Minimum 50KB, prefer food shots

### Caching & Performance
- **Image Cache**: `public, max-age=31536000, immutable` (1 year)
- **HTML Cache**: `must-revalidate` for fresh content
- **CDN**: Vercel Edge Network

### CI/CD & Automation
- **CI Guard**: Blocks external/Unsplash URLs in PRs
- **Weekly Refresh**: Sundays 01:30 UTC, automated
- **Validation**: Pre-commit image validation required

## 🧠 FUTURE CONTEXT MEMORY

### When Adding New Venues
1. Run `npm run images:validate` before commit
2. Use Google Places API with budget controls
3. Store WebP >50KB locally under `/public/images/restaurants/`
4. Update `public/venues.json` with local paths only
5. Never use Unsplash or external image sources

### When Adding New Features
1. Ensure SEO JSON-LD uses local absolute URLs
2. Maintain image caching headers in `vercel.json`
3. Run Lighthouse audit (target SEO ≥95)
4. Validate via CI Guard before deployment

### Pipeline Commands
```bash
npm run images:validate      # Check all images
npm run images:list-missing  # Find venues needing images  
npm run images:fix-failed    # Fetch missing images (budget-capped)
npm run images:scan-code     # Verify no external URLs
npm run images:report        # Generate cost/provenance report
```

## 📊 LOCKED CONFIGURATIONS

### vercel.json
- Immutable caching for `/images/restaurants/(.*)`
- Fresh validation for HTML and data files

### GitHub Workflows
- `.github/workflows/image-guard.yml` - CI protection
- `.github/workflows/nightly-image-refresh.yml` - Weekly automation

### Environment
- `GOOGLE_MAPS_API_KEY` - Google Places API access
- `PIPELINE_BUDGET_USD=6.00` - Weekly spend limit
- `PIPELINE_MIN_FILE_KB=50` - Image size validation

## 🚀 DEPLOYMENT STATUS
- **Build**: ✅ 609 pages generated successfully
- **Production**: ✅ Live at https://www.thebestinlondon.co.uk
- **Automation**: ✅ All workflows active and scheduled

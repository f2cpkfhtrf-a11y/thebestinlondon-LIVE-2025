# Branding Guide - 2025-10-15T11:17:35.653Z

## Data Summary
- **Total Venues:** 459
- **FSA Coverage:** 206/459 (44.9%)

## Branding Strategy: FSA-SECONDARY

### Tagline
**"Premium • Trusted • Curated"**

### Hero Description
459+ premium venues • Expert curation • Verified quality

## FSA Display Strategy


### Secondary Trust Badge (44.9% coverage - Good)
- ✅ Show FSA badges on cards (when available)
- ⚠️  Don't feature FSA in hero/tagline
- ✅ Lead with Google ratings
- ✅ FSA as supporting credibility element
- ✅ Mention "FSA verified where available"

**Example Card Layout:**
```
[Photo]
Restaurant Name ⭐ 4.6 (1,234 reviews)
Italian • Soho • ££

```


## Field Mappings Applied

| Old Field | New Field |
|-----------|-----------|
| `venue.google?.rating` | `venue.rating` |
| `venue.google?.reviews` | `venue.user_ratings_total` |
| `venue.google.rating` | `venue.rating` |
| `venue.google.reviews` | `venue.user_ratings_total` |
| `venue.fsa?.rating` | `venue.fsa_rating` |
| `venue.fsa.rating` | `venue.fsa_rating` |
| `venue.fsa?.authority` | `venue.fsa_authority` |
| `venue.fsa.authority` | `venue.fsa_authority` |
| `venue.fsa?.url` | `venue.fsa_url` |
| `venue.fsa.url` | `venue.fsa_url` |
| `venue.cuisine` | `venue.cuisines?.[0]` |

## Pages Updated

- pages/index.js
- pages/restaurant/[slug].js
- pages/404.js
- pages/best-cafes-london.js
- pages/best-coffee-shops-london.js
- pages/best-halal-restaurants-london.js
- pages/chinese-restaurants-london.js
- pages/halal-restaurants-london.js
- pages/indian-restaurants-london.js
- pages/italian-restaurants-london.js
- pages/japanese-restaurants-london.js
- pages/restaurants-bethnal-green.js
- pages/restaurants-bloomsbury.js
- pages/restaurants-borough.js
- pages/restaurants-brixton.js
- pages/restaurants-camden.js
- pages/restaurants-canary-wharf.js
- pages/restaurants-chelsea.js
- pages/restaurants-clapham.js
- pages/restaurants-clerkenwell.js
- pages/restaurants-covent-garden.js
- pages/restaurants-fitzrovia.js
- pages/restaurants-greenwich.js
- pages/restaurants-hackney.js
- pages/restaurants-islington.js
- pages/restaurants-kensington.js
- pages/restaurants-kings-cross.js
- pages/restaurants-marylebone.js
- pages/restaurants-mayfair.js
- pages/restaurants-near-london-eye.js
- pages/restaurants-notting-hill.js
- pages/restaurants-richmond.js
- pages/restaurants-shoreditch.js
- pages/restaurants-soho.js
- pages/restaurants-spitalfields.js
- pages/restaurants-stratford.js
- pages/restaurants-whitechapel.js
- pages/restaurants-wimbledon.js
- pages/restaurants.js
- pages/seo-demo.js
- pages/thai-restaurants-london.js
- pages/turkish-restaurants-london.js
- pages/vegan-restaurants-london.js
- pages/vegetarian-restaurants-london.js

## Next Steps

1. ✅ Test site: `npm run dev`
2. ✅ Check homepage renders correctly
3. ✅ Click through to a venue detail page
4. ✅ Verify FSA badges display correctly
5. ✅ Test filters and search
6. ✅ Run Phase 6 (link verification)

## Messaging Examples

### Homepage Hero
> 459+ premium venues • Expert curation • Verified quality

### About Section
> The Best in London curates 459+ of London's finest restaurants. Real reviews, expert picks, updated daily.

### Footer
> Trusted by thousands. Quality curated. Updated daily.

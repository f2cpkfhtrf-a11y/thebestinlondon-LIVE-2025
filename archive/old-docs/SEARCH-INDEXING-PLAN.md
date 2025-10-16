# 🔍 SEARCH & INDEXING PLAN

## INDEXABLE PAGES (Allow in robots.txt, Include in Sitemap)

### Core Pages ✅
- `/` - Homepage
- `/restaurants` - Master restaurant list

### Cuisine Pages ✅ (Priority: High)
- `/indian-restaurants-london`
- `/italian-restaurants-london`
- `/japanese-restaurants-london`
- `/chinese-restaurants-london`
- `/thai-restaurants-london`
- `/turkish-restaurants-london`
- `/halal-restaurants-london`

### Niche/Dietary Pages ✅ (Priority: High)
- `/best-halal-restaurants-london`
- `/vegan-restaurants-london`
- `/vegetarian-restaurants-london`

### Area Pages ✅ (Priority: Medium)
- `/restaurants-shoreditch`
- `/restaurants-soho`
- `/restaurants-camden`
- `/restaurants-covent-garden`
- `/restaurants-canary-wharf`
- `/restaurants-bethnal-green`
- `/restaurants-bloomsbury`
- `/restaurants-borough`
- `/restaurants-brixton`
- `/restaurants-chelsea`
- `/restaurants-clapham`
- `/restaurants-clerkenwell`
- `/restaurants-fitzrovia`
- `/restaurants-greenwich`
- `/restaurants-hackney`
- `/restaurants-islington`
- `/restaurants-kensington`
- `/restaurants-kings-cross`
- `/restaurants-marylebone`
- `/restaurants-mayfair`
- `/restaurants-notting-hill`
- `/restaurants-richmond`
- `/restaurants-spitalfields`
- `/restaurants-stratford`
- `/restaurants-whitechapel`
- `/restaurants-wimbledon`

### Individual Venue Pages ✅ (When implemented)
- `/restaurant/[slug]` - All individual venue pages

---

## NON-INDEXABLE PAGES (Noindex, Exclude from Sitemap)

### System/Internal Pages ⛔
- `/api/*` - All API routes
- `/admin/*` - Admin dashboard (if exists)
- `/_next/*` - Next.js internal files
- `/private/*` - Private content

### Demo/Test Pages ⛔
- `/seo-demo` - Test page only
- Any pages with `/test` or `/demo` in URL

### Legal/Utility Pages (Noindex, Follow)
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/404` - 404 error page

### Filtered/Parameter Pages (Conditional)
- `?tab=` - Use canonical to base URL
- `?filter=` - Use canonical to base URL
- `?page=` - Allow indexing with rel="prev/next"

---

## ROBOTS.TXT CONFIGURATION

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/

Sitemap: https://thebestinlondon.co.uk/sitemap.xml
```

---

## SITEMAP STRUCTURE

### Primary Sitemap Index
`/sitemap.xml` → Points to child sitemaps

### Child Sitemaps
1. `/sitemap-pages.xml` - All static pages (cuisine, area, niche)
2. `/sitemap-venues.xml` - Individual restaurant pages
3. `/sitemap-images.xml` - Image gallery for rich results

---

## CANONICAL TAG STRATEGY

### Homepage
```html
<link rel="canonical" href="https://thebestinlondon.co.uk/" />
```

### Cuisine Pages
```html
<link rel="canonical" href="https://thebestinlondon.co.uk/indian-restaurants-london" />
```

### Filtered Views (with parameters)
```html
<!-- Remove query params from canonical -->
<link rel="canonical" href="https://thebestinlondon.co.uk/indian-restaurants-london" />
```

### Venue Pages
```html
<link rel="canonical" href="https://thebestinlondon.co.uk/restaurant/dishoom-kings-cross" />
```

---

## META ROBOTS CONFIGURATION

### Indexable Pages
```html
<!-- No meta robots tag = default indexable -->
```

### Non-Indexable Pages
```html
<meta name="robots" content="noindex,follow" />
```

### Test/Demo Pages
```html
<meta name="robots" content="noindex,nofollow" />
```

---

## GOOGLE SEARCH CONSOLE SETUP

### 1. Verification
- Add DNS TXT record: `google-site-verification=YOUR_CODE`
- Or upload HTML file to `/public/google[code].html`

### 2. Sitemap Submission
Submit all sitemaps:
- `https://thebestinlondon.co.uk/sitemap.xml`
- `https://thebestinlondon.co.uk/sitemap-pages.xml`
- `https://thebestinlondon.co.uk/sitemap-venues.xml`

### 3. URL Inspection
Request indexing for:
- Homepage (immediately)
- Top 10 cuisine pages (within 24h)
- Top 5 area pages (within 48h)

### 4. Performance Monitoring
Track:
- Impressions
- Click-through rate (CTR)
- Average position
- Mobile usability issues

---

## BING WEBMASTER TOOLS SETUP

### 1. Verification
- Add meta tag to homepage
- Or import from Google Search Console

### 2. Sitemap Submission
Same as Google: `/sitemap.xml`

### 3. URL Submission API
Consider bulk submission for faster indexing

---

## INDEXING TIMELINE

### Week 1 (Launch)
- Submit homepage to GSC
- Submit sitemap index
- Request indexing for top 5 pages

### Week 2
- Monitor GSC for crawl errors
- Request indexing for remaining cuisine pages
- Check first impressions data

### Week 3
- Request indexing for area pages
- Fix any crawl errors discovered
- Add internal links to speed up discovery

### Week 4
- Full site should be indexed
- Begin tracking rankings
- Optimize low-performing pages

---

## ONGOING MAINTENANCE

### Daily
- Monitor GSC for new errors

### Weekly
- Check indexation status (indexed vs. total pages)
- Review new backlinks
- Check mobile usability

### Monthly
- Full crawl with Screaming Frog
- Update sitemap if new pages added
- Re-submit priority pages if needed

---

## TROUBLESHOOTING

### "Pages not indexed"
1. Check robots.txt isn't blocking
2. Verify sitemap is accessible
3. Check for noindex tags
4. Request indexing via GSC
5. Add internal links to page

### "Indexed but no traffic"
1. Check keyword targeting
2. Improve meta titles/descriptions
3. Add more quality content
4. Build backlinks
5. Optimize for featured snippets

### "Dropped from index"
1. Check for manual actions in GSC
2. Review recent site changes
3. Check for duplicate content
4. Verify canonical tags
5. Request re-indexing

---

## SUCCESS METRICS

### Target (3 Months Post-Launch)
- ✅ 100% of sitemap pages indexed
- ✅ 50+ keywords ranking top 20
- ✅ 10+ keywords ranking top 3
- ✅ 10,000+ monthly organic impressions
- ✅ 3%+ organic CTR

### Target (6 Months Post-Launch)
- ✅ 100+ keywords ranking top 20
- ✅ 25+ keywords ranking top 3
- ✅ 50,000+ monthly organic impressions
- ✅ 5%+ organic CTR
- ✅ 1,000+ monthly organic clicks

---

**Status:** ✅ Ready for submission to Google & Bing
**Next Action:** Submit sitemap to GSC immediately after deployment

# BestOfLondon - thebestinlondon.co.uk

**Premium London restaurant directory with real-time data, SEO optimization, and curated recommendations.**

---

## 🎯 Project Overview

BestOfLondon is a Next.js-powered directory featuring:
- **458 verified venues** with Google Places data
- **Real-time ratings & reviews** from Google
- **FSA food hygiene ratings** (UK Food Standards Agency)
- **Halal restaurant directory** with station-based search
- **Premium dark theme** (#0B0B0B background, #D4AF37 gold accents)
- **Full SEO optimization** (sitemaps, structured data, meta tags)

**Live Site:** https://thebestinlondon.co.uk

---

## 📁 Project Structure

```
thebestinlondon/
├── components/          # React components (badges, modals, layouts)
├── data/               # Coverage reports and analytics
├── pages/              # Next.js pages (all routes)
│   ├── halal/         # Halal restaurant pages
│   ├── restaurant/    # Dynamic restaurant detail pages
│   └── [cuisine].js   # Cuisine-based listings
├── public/            # Static assets
│   ├── venues.json    # Main venue dataset (458 venues)
│   ├── sitemap*.xml   # SEO sitemaps
│   └── logo.svg       # Branding
├── scripts/           # Data pipeline & utilities
├── styles/            # Global CSS
├── utils/             # Helper functions (theme, FSA, venue enhancer)
├── archive/           # Archived old files (safe to delete after 30 days)
└── reports/           # Build and pipeline reports
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Visit http://localhost:3000
```

### Build
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_GOOGLE_PLACES_KEY=your_google_api_key_here
```

---

## 📊 Data Pipeline

### Refresh Venue Data
```bash
# Full pipeline (20-30 minutes)
node scripts/run-data-pipeline.js

# Individual steps
node scripts/fetchPlaces.js      # Get venues from Google Places
node scripts/fetchPlaceDetails.js # Enrich with full details
node scripts/buildVenues.js       # Generate venues.json
```

### Generate Sitemaps
```bash
node scripts/generate-sitemaps.js
```

**Output:**
- `/public/venues.json` - Main dataset
- `/public/sitemap.xml` - Main sitemap index
- `/public/sitemap-pages.xml` - Static pages
- `/public/sitemap-venues.xml` - Restaurant pages
- `/data/coverage.json` - Data quality metrics

---

## 🎨 Design System

### Colors
```javascript
Primary Background: #0B0B0B (near-black)
Primary Text: #FAFAFA (off-white)
Secondary Text: #9AA0A6 (gray)
Accent Gold: #D4AF37 (premium gold)
```

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

### Theme
Import from `utils/theme.js` for consistent styling.

---

## 🗺️ Key Routes

### Live Pages
- `/` - Homepage
- `/best-halal-restaurants-london` - Halal directory
- `/halal-near-stations-simple` - Station-based search (NEW)
- `/restaurant/[slug]` - Restaurant detail pages (458 pages)
- `/[cuisine]-restaurants-london` - Cuisine listings
- `/restaurants-[location]` - Location-based listings

### Dynamic Routes
- **Restaurant details:** `/restaurant/dishoom-covent-garden`
- **Cuisines:** `/italian-restaurants-london`
- **Locations:** `/restaurants-soho`

---

## 🔧 Adding New Features

### Add a New Page
1. Create file in `/pages/` directory
2. Use `/pages/best-halal-restaurants-london.js` as template
3. Import theme from `utils/theme.js`
4. Build and test locally
5. Deploy

### Add a New Component
1. Create file in `/components/`
2. Export as default or named export
3. Use in pages with proper imports

### Modify Venue Data
1. Update scripts in `/scripts/`
2. Run data pipeline
3. Verify `venues.json` updated
4. Regenerate sitemaps
5. Deploy

---

## 🚀 Deployment

### Vercel (Current)
- **Auto-deploy:** Pushes to `main` branch trigger deployment
- **Domain:** thebestinlondon.co.uk
- **Build command:** `npm run build`
- **Output:** `.next` directory

### Manual Deploy
```bash
# Using Vercel CLI
npx vercel --prod
```

---

## 📈 SEO & Analytics

### Structured Data
- WebSite + SearchAction (homepage)
- ItemList (listing pages)
- Restaurant (detail pages)

### Sitemaps
- Main index: `/sitemap.xml`
- Pages: `/sitemap-pages.xml`
- Venues: `/sitemap-venues.xml`
- Images: `/sitemap-images.xml`

### robots.txt
Located at `/public/robots.txt`

---

## 🧪 Testing

### Local Build Test
```bash
npm run build
npm start
# Verify all pages load
```

### Link Checker
```bash
node scripts/verify-links.js
# Output: /reports/links.json
```

---

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM rendering

### Data
- `axios` - HTTP client (Google Places API)
- Custom FSA scraper (utils/fsaClient.js)

### Development
- Standard Next.js dev dependencies

---

## 🗄️ Archive Folder

The `/archive/` directory contains old files from previous iterations:
- `old-docs/` - Status reports, guides (90+ files)
- `old-scripts/` - One-time scripts (30+ files)
- `old-logs/` - Build logs
- `old-data/` - Duplicate venue files

**Safe to delete after 30 days** once confident everything works.

---

## 🤝 Contributing

1. Create a new branch
2. Make changes
3. Test locally (`npm run build`)
4. Push and create PR
5. Deploy after review

---

## 📝 Maintenance

### Daily
- Monitor Vercel deployments
- Check for 404 errors

### Weekly
- Review Google Analytics (if enabled)
- Check venue data freshness

### Monthly
- Run data pipeline to refresh venues
- Update FSA ratings
- Regenerate sitemaps

---

## 🆘 Troubleshooting

### Build Fails
1. Check `/reports/` for error logs
2. Verify `venues.json` exists and is valid
3. Check dependencies: `npm install`

### 404 Errors
1. Verify page file exists in `/pages/`
2. Check build output includes the page
3. Verify Vercel deployment succeeded

### Data Issues
1. Verify API key in `.env.local`
2. Check Google Places quota
3. Re-run data pipeline

---

## 📞 Support

**Domain:** thebestinlondon.co.uk  
**Framework:** Next.js 13+  
**Node:** 18.x  
**Deployment:** Vercel  

---

## ✅ Recent Changes (Oct 16, 2025)

- ✅ Cleaned up root directory (archived 90+ junk files)
- ✅ Added simplified station pages (`/halal-near-stations-simple`)
- ✅ Organized project structure
- ✅ Created comprehensive documentation

---

**Status:** ✅ Production Ready  
**Last Updated:** October 16, 2025
# Force deployment Fri Oct 17 01:28:19 BST 2025

# Force deployment Fri Oct 17 15:16:17 BST 2025

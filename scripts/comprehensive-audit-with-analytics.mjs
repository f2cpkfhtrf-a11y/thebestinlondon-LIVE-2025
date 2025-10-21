#!/usr/bin/env node
/**
 * Comprehensive Site Audit with Analytics & Ranking Summary
 * Includes: Technical audit, SEO audit, Analytics setup, Ranking summary
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORT_DIR = path.join(__dirname, '../reports');
const REPORT_FILE = path.join(REPORT_DIR, `comprehensive-audit-${new Date().toISOString().split('T')[0]}.md`);

if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const report = {
  timestamp: new Date().toISOString(),
  technical: {},
  seo: {},
  analytics: {},
  ranking: {},
  recommendations: []
};

// 1. Technical Audit
console.log('🔍 Running technical audit...');

// Check core files
const coreFiles = [
  'pages/index.js',
  'pages/[cuisineSlug].js',
  'pages/areas/[slug].js',
  'pages/restaurant/[slug].js',
  'lib/resolveHeroImage.ts',
  'components/StandardizedCard.js',
  'components/Breadcrumbs.js'
];

report.technical.files = {
  checked: coreFiles.length,
  missing: [],
  present: []
};

coreFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    report.technical.files.present.push(file);
  } else {
    report.technical.files.missing.push(file);
  }
});

// Check SEO implementations
report.seo.implementations = {
  homepage: {},
  cuisinePages: {},
  areaPages: {},
  structuredData: {}
};

// Check homepage SEO
const homepagePath = path.join(__dirname, '..', 'pages/index.js');
if (fs.existsSync(homepagePath)) {
  const homepageContent = fs.readFileSync(homepagePath, 'utf8');
  report.seo.implementations.homepage = {
    hasTitle2025: homepageContent.includes('2025'),
    hasKeywords: homepageContent.includes('keywords'),
    hasDescription: homepageContent.includes('description'),
    hasOGTags: homepageContent.includes('og:title'),
    hasBreadcrumbs: homepageContent.includes('Breadcrumbs')
  };
}

// Check cuisine pages SEO
const cuisinePagePath = path.join(__dirname, '..', 'pages/[cuisineSlug].js');
if (fs.existsSync(cuisinePagePath)) {
  const cuisinePageContent = fs.readFileSync(cuisinePagePath, 'utf8');
  report.seo.implementations.cuisinePages = {
    hasTitle2025: cuisinePageContent.includes('2025'),
    hasKeywords: cuisinePageContent.includes('keywords'),
    hasDescription: cuisinePageContent.includes('description'),
    hasOGTags: cuisinePageContent.includes('og:title'),
    hasBreadcrumbs: cuisinePageContent.includes('Breadcrumbs'),
    hasJSONLD: cuisinePageContent.includes('application/ld+json')
  };
}

// Check area pages SEO
const areaPagePath = path.join(__dirname, '..', 'pages/areas/[slug].js');
if (fs.existsSync(areaPagePath)) {
  const areaPageContent = fs.readFileSync(areaPagePath, 'utf8');
  report.seo.implementations.areaPages = {
    hasTitle2025: areaPageContent.includes('2025'),
    hasKeywords: areaPageContent.includes('keywords'),
    hasDescription: areaPageContent.includes('description'),
    hasOGTags: areaPageContent.includes('og:title'),
    hasBreadcrumbs: areaPageContent.includes('Breadcrumbs')
  };
}

// 2. Analytics Configuration
console.log('📊 Checking analytics setup...');

const documentPath = path.join(__dirname, '..', 'pages/_document.js');
if (fs.existsSync(documentPath)) {
  const documentContent = fs.readFileSync(documentPath, 'utf8');
  
  report.analytics = {
    googleAnalytics: {
      configured: documentContent.includes('gtag/js'),
      id: documentContent.match(/G-[A-Z0-9]+/)?.[0] || 'Not found'
    },
    googleSearchConsole: {
      configured: documentContent.includes('google-site-verification'),
      verified: documentContent.includes('JXlXLBYM0IKbIxKjsGtl2p5YG3vguJ2Nuxie2muNDIY')
    }
  };
}

// 3. Check sitemaps
console.log('🗺️  Checking sitemaps...');

const publicDir = path.join(__dirname, '..', 'public');
const sitemapFiles = [
  'sitemap.xml',
  'sitemap-pages.xml',
  'sitemap-venues.xml',
  'sitemap-blog.xml',
  'sitemap-faq.xml',
  'sitemap-cuisines.xml',
  'sitemap-areas.xml'
];

report.seo.sitemaps = {
  files: [],
  missing: []
};

sitemapFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    report.seo.sitemaps.files.push(file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const urlCount = (content.match(/<url>/g) || []).length;
      report.seo.sitemaps[file] = urlCount;
    } catch (e) {
      report.seo.sitemaps[file] = 'error reading';
    }
  } else {
    report.seo.sitemaps.missing.push(file);
  }
});

// 4. Check venue data
console.log('📋 Checking venue data...');

const venuesPath = path.join(__dirname, '..', 'data/venues.json');
if (fs.existsSync(venuesPath)) {
  try {
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    report.technical.venues = {
      total: venues.length,
      withRating: venues.filter(v => v.rating && v.rating > 0).length,
      withReviews: venues.filter(v => v.user_ratings_total && v.user_ratings_total > 0).length,
      withFSA: venues.filter(v => v.fsaRating || v.fsa_rating).length,
      withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length,
      withBookingUrl: venues.filter(v => v.booking_url).length,
      withMenuUrl: venues.filter(v => v.menu_url).length,
      uniqueCuisines: new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean)).size,
      uniqueAreas: new Set(venues.map(v => v.borough || v.area).filter(Boolean)).size
    };
  } catch (e) {
    report.technical.venues = { error: e.message };
  }
}

// 5. Generate report
console.log('📝 Generating comprehensive report...');

const reportContent = `# Comprehensive Site Audit & Analytics Report
**Date:** ${new Date().toISOString().split('T')[0]}  
**Generated:** ${new Date().toISOString()}

---

## 📊 EXECUTIVE SUMMARY

### ✅ Technical Health
- **Core Files:** ${report.technical.files.present.length}/${report.technical.files.checked} present
- **Missing Files:** ${report.technical.files.missing.length}
- **Venue Data:** ${report.technical.venues?.total || 0} venues total

### ✅ SEO Implementation
- **Homepage:** ${Object.values(report.seo.implementations.homepage).filter(v => v).length}/${Object.keys(report.seo.implementations.homepage).length} checks passed
- **Cuisine Pages:** ${Object.values(report.seo.implementations.cuisinePages).filter(v => v).length}/${Object.keys(report.seo.implementations.cuisinePages).length} checks passed
- **Area Pages:** ${Object.values(report.seo.implementations.areaPages).filter(v => v).length}/${Object.keys(report.seo.implementations.areaPages).length} checks passed

### 📈 Analytics Setup
- **Google Analytics 4:** ${report.analytics.googleAnalytics.configured ? '✅ Configured' : '❌ Not configured'} (ID: ${report.analytics.googleAnalytics.id})
- **Google Search Console:** ${report.analytics.googleSearchConsole.configured ? '✅ Verified' : '❌ Not verified'}

---

## 🔍 TECHNICAL AUDIT

### Core Files Status
${report.technical.files.missing.length > 0 ? 
  `⚠️ **Missing Files:**\n${report.technical.files.missing.map(f => `- ${f}`).join('\n')}\n` : 
  '✅ All core files present\n'}

### Venue Data Quality
${report.technical.venues ? `
- **Total Venues:** ${report.technical.venues.total}
- **With Ratings:** ${report.technical.venues.withRating} (${((report.technical.venues.withRating / report.technical.venues.total) * 100).toFixed(1)}%)
- **With Reviews:** ${report.technical.venues.withReviews} (${((report.technical.venues.withReviews / report.technical.venues.total) * 100).toFixed(1)}%)
- **With FSA Ratings:** ${report.technical.venues.withFSA} (${((report.technical.venues.withFSA / report.technical.venues.total) * 100).toFixed(1)}%)
- **With Photos:** ${report.technical.venues.withPhotos} (${((report.technical.venues.withPhotos / report.technical.venues.total) * 100).toFixed(1)}%)
- **With Booking URLs:** ${report.technical.venues.withBookingUrl} (${((report.technical.venues.withBookingUrl / report.technical.venues.total) * 100).toFixed(1)}%)
- **With Menu URLs:** ${report.technical.venues.withMenuUrl} (${((report.technical.venues.withMenuUrl / report.technical.venues.total) * 100).toFixed(1)}%)
- **Unique Cuisines:** ${report.technical.venues.uniqueCuisines}
- **Unique Areas:** ${report.technical.venues.uniqueAreas}
` : '⚠️ Could not load venue data\n'}

---

## 🎯 SEO AUDIT

### Homepage SEO
${Object.entries(report.seo.implementations.homepage).map(([key, value]) => 
  `- **${key.replace(/([A-Z])/g, ' $1').trim()}:** ${value ? '✅' : '❌'}`
).join('\n')}

### Cuisine Pages SEO
${Object.entries(report.seo.implementations.cuisinePages).map(([key, value]) => 
  `- **${key.replace(/([A-Z])/g, ' $1').trim()}:** ${value ? '✅' : '❌'}`
).join('\n')}

### Area Pages SEO
${Object.entries(report.seo.implementations.areaPages).map(([key, value]) => 
  `- **${key.replace(/([A-Z])/g, ' $1').trim()}:** ${value ? '✅' : '❌'}`
).join('\n')}

### Sitemaps
${report.seo.sitemaps.files.length > 0 ? 
  report.seo.sitemaps.files.map(file => {
    const count = report.seo.sitemaps[file];
    return `- **${file}:** ${count} URLs`;
  }).join('\n') : 
  '⚠️ No sitemap files found\n'}

${report.seo.sitemaps.missing.length > 0 ? 
  `\n⚠️ **Missing Sitemaps:**\n${report.seo.sitemaps.missing.map(f => `- ${f}`).join('\n')}` : ''}

---

## 📊 ANALYTICS & TRACKING

### Google Analytics 4
- **Status:** ${report.analytics.googleAnalytics.configured ? '✅ Active' : '❌ Not configured'}
- **Measurement ID:** ${report.analytics.googleAnalytics.id}
- **Location:** \`pages/_document.js\`

**📈 To View Traffic Data:**
1. Go to: https://analytics.google.com
2. Select property: G-${report.analytics.googleAnalytics.id.replace('G-', '')}
3. View: Realtime → Overview (for current visitors)
4. View: Reports → Engagement → Pages and screens (for page views)
5. View: Reports → Acquisition → Traffic acquisition (for traffic sources)

**Key Metrics to Monitor:**
- **Users:** Total unique visitors
- **Sessions:** Total visits
- **Page Views:** Total page loads
- **Average Session Duration:** Time on site
- **Bounce Rate:** % of single-page sessions
- **Top Pages:** Most visited pages
- **Traffic Sources:** Where visitors come from (organic search, direct, social, etc.)

### Google Search Console
- **Status:** ${report.analytics.googleSearchConsole.configured ? '✅ Verified' : '❌ Not verified'}
- **Property:** https://thebestinlondon.co.uk

**🔍 To View Search Performance:**
1. Go to: https://search.google.com/search-console
2. Select property: thebestinlondon.co.uk
3. View: Performance → Overview (for search rankings & clicks)
4. View: Coverage → Pages (for indexing status)
5. View: Experience → Core Web Vitals (for page speed metrics)

**Key Metrics to Monitor:**
- **Total Clicks:** Clicks from Google search results
- **Total Impressions:** Times your site appeared in search results
- **Average Position:** Average ranking position
- **Click-Through Rate (CTR):** Clicks / Impressions
- **Top Queries:** Search terms that brought visitors
- **Top Pages:** Pages receiving the most search traffic
- **Coverage Status:** Indexed vs. excluded pages
- **Core Web Vitals:** Page speed metrics (LCP, FID, CLS)

---

## 🎯 SEARCH RANKING SUMMARY

### Current Status
**Note:** Real-time search ranking data requires Google Search Console API access or manual checking.

**To Check Rankings:**
1. **Google Search Console:** Performance → Queries (see average position for keywords)
2. **Manual Checks:** Search for target keywords and note position:
   - "best restaurants London"
   - "best Indian restaurants London"
   - "best halal restaurants London"
   - "[cuisine] restaurants London"
   - "restaurants in [area] London"

### Target Keywords (From SEO Implementation)
Based on the SEO optimizations, we're targeting:
- ✅ **Homepage:** "best restaurants London", "London restaurants", "best restaurants in London"
- ✅ **Cuisine Pages:** "best [cuisine] restaurants London", "[cuisine] restaurants London"
- ✅ **Area Pages:** "best restaurants [area]", "restaurants [area] London"

### Expected Ranking Timeline
- **Week 1-2:** Pages start getting indexed
- **Week 2-4:** Initial rankings appear (positions 50-100)
- **Month 1-3:** Rankings improve (positions 20-50)
- **Month 3-6:** Target top 20 positions for primary keywords

---

## ✅ RECOMMENDATIONS

### Immediate Actions
1. **Verify Analytics Access:**
   - Confirm you have access to Google Analytics dashboard
   - Set up custom reports for key metrics
   - Enable email alerts for traffic spikes/drops

2. **Check Search Console:**
   - Review Performance report for current search visibility
   - Submit updated sitemaps if needed
   - Fix any coverage errors

3. **Monitor Core Web Vitals:**
   - Check Google Search Console → Experience → Core Web Vitals
   - Aim for "Good" ratings on all metrics
   - Address any "Poor" ratings immediately

4. **Set Up Ranking Tracking:**
   - Use Google Search Console → Performance → Queries
   - Track top 20 keywords weekly
   - Document ranking improvements

### Short-Term (Next 30 Days)
1. **Content Expansion:**
   - Add more venue pages (target: 1000+ venues)
   - Expand blog content for long-tail keywords
   - Add FAQ pages for common queries

2. **Backlink Building:**
   - Reach out to London food blogs for backlinks
   - Submit to London restaurant directories
   - Engage with London food communities

3. **Local SEO:**
   - Ensure all venues have complete Google Business Profile links
   - Add location-specific schema markup
   - Create area-specific landing pages

### Long-Term (Next 90 Days)
1. **Performance Optimization:**
   - Achieve 90+ Lighthouse scores
   - Optimize images further (WebP, lazy loading)
   - Implement service worker for offline support

2. **User Experience:**
   - Add user reviews/ratings functionality
   - Implement advanced filtering
   - Add comparison tool for restaurants

---

## 📞 NEXT STEPS

1. **Access Analytics:** Log into Google Analytics and Google Search Console
2. **Baseline Metrics:** Document current traffic and rankings
3. **Set Goals:** Define target traffic and ranking goals
4. **Monitor Weekly:** Check analytics and rankings every week
5. **Optimize Based on Data:** Use insights to improve content and SEO

---

**Report Generated:** ${new Date().toISOString()}  
**Next Audit:** Recommended in 7 days
`;

fs.writeFileSync(REPORT_FILE, reportContent, 'utf8');

console.log(`\n✅ Comprehensive audit complete!`);
console.log(`📄 Report saved to: ${REPORT_FILE}`);
console.log(`\n📊 Summary:`);
console.log(`   - Technical: ${report.technical.files.present.length}/${report.technical.files.checked} files ✅`);
console.log(`   - SEO: All implementations checked`);
console.log(`   - Analytics: ${report.analytics.googleAnalytics.configured ? '✅' : '❌'} GA4, ${report.analytics.googleSearchConsole.configured ? '✅' : '❌'} GSC`);
console.log(`   - Venues: ${report.technical.venues?.total || 0} total`);


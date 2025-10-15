// AUTOMATED SITEMAP GENERATOR
// Generates complete sitemaps from pages and venue data

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thebestinlondon.co.uk';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages with priorities
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/restaurants', priority: '0.9', changefreq: 'daily' },
  
  // Cuisine pages
  { path: '/indian-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/italian-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/japanese-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/chinese-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/thai-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/turkish-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  
  // Dietary/Niche
  { path: '/best-halal-restaurants-london', priority: '0.8', changefreq: 'weekly' },
  { path: '/vegan-restaurants-london', priority: '0.7', changefreq: 'weekly' },
  { path: '/vegetarian-restaurants-london', priority: '0.7', changefreq: 'weekly' },
  
  // Categories
  { path: '/best-cafes-london', priority: '0.7', changefreq: 'weekly' },
  { path: '/best-coffee-shops-london', priority: '0.7', changefreq: 'weekly' },
  { path: '/best-bakeries-london', priority: '0.7', changefreq: 'weekly' },
  { path: '/best-brunch-london', priority: '0.7', changefreq: 'weekly' },
  { path: '/best-bars-london', priority: '0.7', changefreq: 'weekly' },
  
  // Areas (top ones)
  { path: '/restaurants-shoreditch', priority: '0.7', changefreq: 'weekly' },
  { path: '/restaurants-soho', priority: '0.7', changefreq: 'weekly' },
  { path: '/restaurants-camden', priority: '0.6', changefreq: 'weekly' },
  { path: '/restaurants-covent-garden', priority: '0.6', changefreq: 'weekly' },
  { path: '/restaurants-canary-wharf', priority: '0.6', changefreq: 'weekly' },
  
  // Utility
  { path: '/search', priority: '0.6', changefreq: 'monthly' },
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.5', changefreq: 'monthly' },
  { path: '/guides', priority: '0.6', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

function generateSitemapXML(urls) {
  const urlEntries = urls.map(url => `
  <url>
    <loc>${BASE_URL}${url.path}</loc>
    <lastmod>${url.lastmod || TODAY}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;
}

function generateImageSitemap(venues) {
  const imageEntries = venues
    .filter(v => v.photos && v.photos.length > 0)
    .map(venue => {
      const images = venue.photos.slice(0, 3).map(photo => `
      <image:image>
        <image:loc>https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.reference}&key=YOUR_API_KEY</image:loc>
        <image:caption>${venue.name} - ${venue.category} in ${venue.borough || 'London'}</image:caption>
        <image:title>${venue.name}</image:title>
      </image:image>`).join('');
      
      return `
  <url>
    <loc>${BASE_URL}/restaurant/${venue.slug}</loc>
    <lastmod>${TODAY}</lastmod>${images}
  </url>`;
    }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${imageEntries}
</urlset>`;
}

function generateSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-venues.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-images.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;
}

async function generateSitemaps() {
  console.log('🗺️  Generating sitemaps...\n');
  
  const publicDir = path.join(__dirname, '../public');
  
  // Generate pages sitemap
  console.log('📄 Generating pages sitemap...');
  const pagesSitemap = generateSitemapXML(STATIC_PAGES);
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
  console.log(`   ✓ sitemap-pages.xml (${STATIC_PAGES.length} URLs)`);
  
  // Load venues data if exists
  let venues = [];
  const venuesPath = path.join(publicDir, 'venues.json');
  
  if (fs.existsSync(venuesPath)) {
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    venues = venuesData.venues || [];
    
    // Generate venues sitemap
    console.log('\n🍽️  Generating venues sitemap...');
    const venueUrls = venues.map(v => ({
      path: `/restaurant/${v.slug}`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: v.updatedAt ? v.updatedAt.split('T')[0] : TODAY
    }));
    
    const venuesSitemap = generateSitemapXML(venueUrls);
    fs.writeFileSync(path.join(publicDir, 'sitemap-venues.xml'), venuesSitemap);
    console.log(`   ✓ sitemap-venues.xml (${venues.length} venues)`);
    
    // Generate images sitemap
    console.log('\n📸 Generating images sitemap...');
    const imagesSitemap = generateImageSitemap(venues);
    fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imagesSitemap);
    console.log(`   ✓ sitemap-images.xml (${venues.filter(v => v.photos?.length > 0).length} venues with images)`);
    
  } else {
    console.log('\n⚠️  No venues.json found - creating placeholder sitemaps');
    
    const placeholderVenues = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Venue pages will appear here after data integration -->
</urlset>`;
    
    fs.writeFileSync(path.join(publicDir, 'sitemap-venues.xml'), placeholderVenues);
    fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), placeholderVenues);
  }
  
  // Generate index
  console.log('\n📑 Generating sitemap index...');
  const sitemapIndex = generateSitemapIndex();
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
  console.log('   ✓ sitemap.xml (index)');
  
  // Generate report
  const report = `# Sitemap Generation Report

**Date:** ${new Date().toISOString()}
**Status:** ✅ Complete

## Generated Files
- \`/sitemap.xml\` - Sitemap index
- \`/sitemap-pages.xml\` - ${STATIC_PAGES.length} static pages
- \`/sitemap-venues.xml\` - ${venues.length} venue pages
- \`/sitemap-images.xml\` - ${venues.filter(v => v.photos?.length > 0).length} venues with images

## Total URLs
- **Pages:** ${STATIC_PAGES.length}
- **Venues:** ${venues.length}
- **Images:** ${venues.reduce((acc, v) => acc + (v.photos?.length || 0), 0)}
- **Total:** ${STATIC_PAGES.length + venues.length}

## Priority Distribution
- Priority 1.0: ${STATIC_PAGES.filter(p => p.priority === '1.0').length}
- Priority 0.9: ${STATIC_PAGES.filter(p => p.priority === '0.9').length}
- Priority 0.8: ${STATIC_PAGES.filter(p => p.priority === '0.8').length}
- Priority 0.7: ${STATIC_PAGES.filter(p => p.priority === '0.7').length + venues.length}
- Priority 0.6: ${STATIC_PAGES.filter(p => p.priority === '0.6').length}
- Priority 0.5: ${STATIC_PAGES.filter(p => p.priority === '0.5').length}

## Next Steps
1. ✅ Sitemaps generated
2. ⏳ Submit to Google Search Console
3. ⏳ Submit to Bing Webmaster Tools
4. ⏳ Monitor indexation status
`;
  
  const logsDir = path.join(__dirname, '../logs');
  fs.mkdirSync(logsDir, { recursive: true });
  fs.writeFileSync(path.join(logsDir, 'sitemap-generation-report.md'), report);
  
  console.log('\n' + '='.repeat(60));
  console.log('SITEMAP GENERATION COMPLETE');
  console.log('='.repeat(60));
  console.log(`Static Pages: ${STATIC_PAGES.length}`);
  console.log(`Venue Pages: ${venues.length}`);
  console.log(`Total URLs: ${STATIC_PAGES.length + venues.length}`);
  console.log('='.repeat(60));
  console.log(`\nFiles saved to: ${publicDir}/`);
  console.log(`Report saved to: ${logsDir}/sitemap-generation-report.md\n`);
  
  return {
    pages: STATIC_PAGES.length,
    venues: venues.length,
    total: STATIC_PAGES.length + venues.length
  };
}

// Run if called directly
if (require.main === module) {
  generateSitemaps()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { generateSitemaps };

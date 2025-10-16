#!/usr/bin/env node

/**
 * COMPREHENSIVE SITEMAP GENERATOR
 * Generates XML sitemaps for all pages
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://thebestinlondon.co.uk';

// Load venues data
const venuesPath = path.join(__dirname, '../../public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = venuesData.venues;

console.log('\n🗺️  SITEMAP GENERATOR\n');
console.log('='.repeat(70));

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/restaurants', priority: '0.9', changefreq: 'daily' },
  { url: '/cuisines', priority: '0.8', changefreq: 'weekly' },
  { url: '/best-halal-restaurants-london', priority: '0.9', changefreq: 'weekly' },
  { url: '/about', priority: '0.5', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' }
];

// Cuisine pages
const cuisines = [...new Set(venues.flatMap(v => v.cuisines || []))];
const cuisinePages = cuisines.map(cuisine => ({
  url: `/cuisine/${cuisine}`,
  priority: '0.8',
  changefreq: 'weekly'
}));

// Dietary pages
const dietaryPages = [
  { url: '/halal', priority: '0.9', changefreq: 'weekly' },
  { url: '/vegan', priority: '0.8', changefreq: 'weekly' },
  { url: '/vegetarian', priority: '0.8', changefreq: 'weekly' },
  { url: '/gluten-free', priority: '0.7', changefreq: 'weekly' }
];

// Station pages (major London stations)
const stations = [
  'kings-cross', 'london-bridge', 'oxford-circus', 'waterloo',
  'liverpool-street', 'paddington', 'victoria', 'euston',
  'leicester-square', 'covent-garden', 'bond-street', 'piccadilly-circus'
];
const stationPages = stations.map(station => ({
  url: `/restaurants-near-${station}`,
  priority: '0.7',
  changefreq: 'weekly'
}));

// Venue detail pages
const venuePages = venues.map(venue => ({
  url: `/restaurant/${venue.slug}`,
  priority: '0.7',
  changefreq: 'weekly',
  lastmod: venue.lastVerified || venue.lastUpdated
}));

// Generate sitemap XML
function generateSitemapXML(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
    if (page.lastmod) {
      xml += `    <lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>\n`;
    }
    if (page.changefreq) {
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    }
    if (page.priority) {
      xml += `    <priority>${page.priority}</priority>\n`;
    }
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${DOMAIN}/${sitemap}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}

// Generate all sitemaps
const publicDir = path.join(__dirname, '../../public');

// 1. Pages sitemap (static + cuisine + dietary + stations)
const allPages = [...staticPages, ...cuisinePages, ...dietaryPages, ...stationPages];
const pagesSitemap = generateSitemapXML(allPages);
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
console.log(`✅ Generated sitemap-pages.xml (${allPages.length} pages)`);

// 2. Venues sitemap (split if >1000 venues)
const venuesSitemap = generateSitemapXML(venuePages);
fs.writeFileSync(path.join(publicDir, 'sitemap-venues.xml'), venuesSitemap);
console.log(`✅ Generated sitemap-venues.xml (${venuePages.length} venues)`);

// 3. Main sitemap index
const sitemapIndex = generateSitemapIndex([
  'sitemap-pages.xml',
  'sitemap-venues.xml'
]);
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
console.log(`✅ Generated sitemap.xml (index)`);

// 4. Generate robots.txt
const robotsTxt = `# Robots.txt for thebestinlondon.co.uk
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${DOMAIN}/sitemap.xml
Sitemap: ${DOMAIN}/sitemap-pages.xml
Sitemap: ${DOMAIN}/sitemap-venues.xml

# Crawl-delay for good citizenship
Crawl-delay: 0.5

# Disallow admin/internal paths (if any)
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log(`✅ Generated robots.txt`);

// Summary
console.log('\n' + '='.repeat(70));
console.log('📊 SITEMAP SUMMARY');
console.log('='.repeat(70));
console.log(`\nTotal URLs: ${allPages.length + venuePages.length}`);
console.log(`  Static Pages: ${staticPages.length}`);
console.log(`  Cuisine Pages: ${cuisinePages.length}`);
console.log(`  Dietary Pages: ${dietaryPages.length}`);
console.log(`  Station Pages: ${stationPages.length}`);
console.log(`  Venue Pages: ${venuePages.length}`);
console.log(`\nFiles Created:`);
console.log(`  ✅ public/sitemap.xml (index)`);
console.log(`  ✅ public/sitemap-pages.xml`);
console.log(`  ✅ public/sitemap-venues.xml`);
console.log(`  ✅ public/robots.txt`);
console.log(`\n🚀 Submit to:`);
console.log(`  - Google Search Console: ${DOMAIN}/sitemap.xml`);
console.log(`  - Bing Webmaster: ${DOMAIN}/sitemap.xml\n`);

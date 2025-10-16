#!/usr/bin/env node

/**
 * SITEMAP GENERATOR - Automatic
 * Generates all sitemaps for SEO
 */

const fs = require('fs');
const path = require('path');

console.log('\n🗺️  SITEMAP GENERATOR\n');
console.log('═'.repeat(70) + '\n');

const ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const SITE_URL = 'https://thebestinlondon.co.uk';

// Load venues
const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
const venues = data.venues || [];

console.log(`📊 Found ${venues.length} venues\n`);

// 1. Sitemap for static pages
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily' },
  { url: '/restaurants', priority: 0.9, changefreq: 'daily' },
  { url: '/indian-restaurants-london', priority: 0.8, changefreq: 'weekly' },
  { url: '/best-halal-restaurants-london', priority: 0.8, changefreq: 'weekly' },
  { url: '/japanese-restaurants-london', priority: 0.7, changefreq: 'weekly' },
  { url: '/italian-restaurants-london', priority: 0.7, changefreq: 'weekly' },
  { url: '/chinese-restaurants-london', priority: 0.7, changefreq: 'weekly' },
  { url: '/thai-restaurants-london', priority: 0.7, changefreq: 'weekly' },
  { url: '/best-cafes-london', priority: 0.7, changefreq: 'weekly' },
  { url: '/about', priority: 0.5, changefreq: 'monthly' },
  { url: '/contact', priority: 0.5, changefreq: 'monthly' }
];

let staticSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

staticPages.forEach(page => {
  staticSitemap += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
});

staticSitemap += `</urlset>`;

fs.writeFileSync(path.join(ROOT, 'public/sitemap-pages.xml'), staticSitemap);
console.log('✅ sitemap-pages.xml created');

// 2. Sitemap for venues
let venuesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

venues.forEach(venue => {
  venuesSitemap += `  <url>
    <loc>${SITE_URL}/restaurant/${venue.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
`;
});

venuesSitemap += `</urlset>`;

fs.writeFileSync(path.join(ROOT, 'public/sitemap-venues.xml'), venuesSitemap);
console.log('✅ sitemap-venues.xml created');

// 3. Sitemap index
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-venues.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), sitemapIndex);
console.log('✅ sitemap.xml (index) created');

// 4. robots.txt
const robotsTxt = `# BestOfLondon - thebestinlondon.co.uk
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin/internal pages
Disallow: /api/
Disallow: /admin/
`;

fs.writeFileSync(path.join(ROOT, 'public/robots.txt'), robotsTxt);
console.log('✅ robots.txt created\n');

console.log('═'.repeat(70));
console.log('\n📊 SUMMARY:\n');
console.log(`   Static pages: ${staticPages.length}`);
console.log(`   Venue pages: ${venues.length}`);
console.log(`   Total URLs: ${staticPages.length + venues.length}`);
console.log(`\n   Files created:`);
console.log(`   - public/sitemap.xml (index)`);
console.log(`   - public/sitemap-pages.xml`);
console.log(`   - public/sitemap-venues.xml`);
console.log(`   - public/robots.txt\n`);
console.log('═'.repeat(70) + '\n');

console.log('✅ Sitemaps ready for search engines!\n');

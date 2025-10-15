const fs = require('fs');
const path = require('path');

// Load venues
const venuesPath = path.join(__dirname, '../public/venues.json');
const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

console.log(`\n🗺️  Generating sitemaps for ${venues.length} venues...\n`);

// 1. SITEMAP FOR STATIC PAGES
const staticPages = [
  { url: '', changefreq: 'daily', priority: '1.0' },
  { url: 'restaurants', changefreq: 'daily', priority: '0.9' },
  { url: 'bars', changefreq: 'weekly', priority: '0.8' },
  { url: 'cafes', changefreq: 'weekly', priority: '0.8' },
];

const sitemapPages = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>https://thebestinlondon.co.uk/${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap-pages.xml'), sitemapPages);
console.log('✅ sitemap-pages.xml created');

// 2. SITEMAP FOR VENUES
const sitemapVenues = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${venues.map(venue => `  <url>
    <loc>https://thebestinlondon.co.uk/restaurant/${venue.slug}</loc>
    <lastmod>${venue.lastVerified || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap-venues.xml'), sitemapVenues);
console.log(`✅ sitemap-venues.xml created (${venues.length} venues)`);

// 3. SITEMAP INDEX
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://thebestinlondon.co.uk/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://thebestinlondon.co.uk/sitemap-venues.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapIndex);
console.log('✅ sitemap.xml (index) created');

// 4. ROBOTS.TXT
const robotsTxt = `# thebestinlondon.co.uk
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://thebestinlondon.co.uk/sitemap.xml
Sitemap: https://thebestinlondon.co.uk/sitemap-pages.xml
Sitemap: https://thebestinlondon.co.uk/sitemap-venues.xml

# Crawl-delay
Crawl-delay: 1
`;

fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
console.log('✅ robots.txt created');

console.log('\n🎉 All SEO files generated!\n');
console.log('📁 Files created:');
console.log('   - /public/sitemap.xml (index)');
console.log('   - /public/sitemap-pages.xml (4 static pages)');
console.log(`   - /public/sitemap-venues.xml (${venues.length} venues)`);
console.log('   - /public/robots.txt');
console.log('');

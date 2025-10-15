// SITEMAP GENERATOR
// Generates XML sitemaps for all routes

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://thebestinlondon.co.uk';
const TODAY = new Date().toISOString().split('T')[0];

// Core static pages
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/restaurants', changefreq: 'daily', priority: '0.9' },
  { url: '/best-halal-restaurants-london', changefreq: 'weekly', priority: '0.8' },
  { url: '/vegan-restaurants-london', changefreq: 'weekly', priority: '0.8' },
  { url: '/vegetarian-restaurants-london', changefreq: 'weekly', priority: '0.8' },
];

// Cuisine pages
const cuisines = [
  'indian', 'italian', 'japanese', 'chinese', 'thai', 'turkish'
];

const cuisinePages = cuisines.map(cuisine => ({
  url: `/${cuisine}-restaurants-london`,
  changefreq: 'weekly',
  priority: '0.8'
}));

// Area pages
const areas = [
  'shoreditch', 'soho', 'camden', 'covent-garden', 'canary-wharf',
  'bethnal-green', 'bloomsbury', 'borough', 'brixton', 'chelsea',
  'clapham', 'clerkenwell', 'fitzrovia', 'greenwich', 'hackney',
  'islington', 'kensington', 'kings-cross', 'marylebone', 'mayfair',
  'notting-hill', 'richmond', 'spitalfields', 'stratford', 'whitechapel', 'wimbledon'
];

const areaPages = areas.map(area => ({
  url: `/restaurants-${area}`,
  changefreq: 'weekly',
  priority: '0.7'
}));

function generateSitemapXML(pages) {
  const urls = pages.map(page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

// Generate main sitemap index
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

// Generate page sitemap
const allPages = [...staticPages, ...cuisinePages, ...areaPages];
const pagesSitemap = generateSitemapXML(allPages);

// Generate venue sitemap (placeholder - will be populated from venues.json)
const venueSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Venue pages will be dynamically added from venues.json -->
</urlset>`;

// Generate image sitemap
const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Image entries will be dynamically added -->
</urlset>`;

// Write files
const publicDir = path.join(__dirname, '../public');

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), generateSitemapIndex());
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
fs.writeFileSync(path.join(publicDir, 'sitemap-venues.xml'), venueSitemap);
fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imageSitemap);

console.log('✅ Sitemaps generated successfully:');
console.log('   - /sitemap.xml (index)');
console.log('   - /sitemap-pages.xml');
console.log('   - /sitemap-venues.xml');
console.log('   - /sitemap-images.xml');
console.log(`\n📊 Total URLs: ${allPages.length} pages`);

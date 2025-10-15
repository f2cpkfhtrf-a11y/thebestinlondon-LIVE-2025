const fs = require('fs');
const path = require('path');

// Read venues data
const venuesPath = path.join(__dirname, '../public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

const domain = 'https://thebestinlondon.co.uk';
const today = new Date().toISOString().split('T')[0];

// Generate venue sitemap
function generateVenueSitemap() {
  const urls = venuesData.venues.map(venue => {
    return `  <url>
    <loc>${domain}/restaurant/${venue.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap-venues.xml'),
    sitemap
  );
  console.log(`✅ Generated sitemap-venues.xml with ${venuesData.venues.length} venues`);
}

// Generate image sitemap
function generateImageSitemap() {
  const urls = venuesData.venues
    .filter(v => v.photos && v.photos.length > 0)
    .map(venue => {
      const images = venue.photos.slice(0, 3).map(photo => {
        return `      <image:image>
        <image:loc>${photo.url || photo}</image:loc>
        <image:caption>${venue.name} - ${venue.cuisine || 'Restaurant'}</image:caption>
      </image:image>`;
      }).join('\n');

      return `  <url>
    <loc>${domain}/restaurant/${venue.slug}</loc>
${images}
  </url>`;
    }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap-images.xml'),
    sitemap
  );
  const imageCount = venuesData.venues.filter(v => v.photos && v.photos.length > 0).length;
  console.log(`✅ Generated sitemap-images.xml with images from ${imageCount} venues`);
}

// Execute
try {
  generateVenueSitemap();
  generateImageSitemap();
  console.log('\n✅ ALL SITEMAPS GENERATED SUCCESSFULLY');
  console.log('\nSitemap files:');
  console.log('  - sitemap.xml (index)');
  console.log('  - sitemap-pages.xml (static pages)');
  console.log('  - sitemap-venues.xml (venue pages)');
  console.log('  - sitemap-images.xml (venue images)');
} catch (error) {
  console.error('❌ Error generating sitemaps:', error.message);
  process.exit(1);
}

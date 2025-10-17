const fs = require('fs');
const path = require('path');

// Generate comprehensive sitemaps
async function generateSitemaps() {
  console.log('🗺️ Generating sitemaps...');
  
  try {
    // Read venues data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    const baseUrl = 'https://www.thebestinlondon.co.uk';
    const currentDate = new Date().toISOString();
    
    // Main sitemap
    const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/restaurants</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/best-halal-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/vegan-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/indian-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/italian-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/japanese-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/chinese-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/thai-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/turkish-restaurants-london</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/halal/near-stations</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/cookies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;
    
    // Area pages sitemap
    const areas = ['soho', 'covent-garden', 'mayfair', 'kensington', 'chelsea', 'shoreditch', 'camden', 'islington', 'hackney', 'greenwich', 'richmond', 'wimbledon'];
    const areaSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${areas.map(area => `  <url>
    <loc>${baseUrl}/restaurants-${area}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;
    
    // Venues sitemap
    const venuesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${venues.map(venue => `  <url>
    <loc>${baseUrl}/restaurant/${venue.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;
    
    // Images sitemap
    const imagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${venues.filter(venue => venue.photos && venue.photos[0]).map(venue => `  <url>
    <loc>${baseUrl}/restaurant/${venue.slug}</loc>
    <image:image>
      <image:loc>${venue.photos[0].url}</image:loc>
      <image:title>${venue.name}</image:title>
      <image:caption>${venue.description}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`;
    
    // Main sitemap index
    const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-venues.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
    
    // Write sitemaps
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemapIndex);
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-pages.xml'), mainSitemap);
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-venues.xml'), venuesSitemap);
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap-images.xml'), imagesSitemap);
    
    console.log('✅ Sitemaps generated successfully!');
    console.log(`📊 Generated ${venues.length} venue URLs`);
    console.log(`📊 Generated ${areas.length} area URLs`);
    console.log(`📊 Generated ${venues.filter(v => v.photos && v.photos[0]).length} image URLs`);
    
    return {
      venues: venues.length,
      areas: areas.length,
      images: venues.filter(v => v.photos && v.photos[0]).length
    };
    
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error);
    throw error;
  }
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://www.thebestinlondon.co.uk/sitemap.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-pages.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-venues.xml
Sitemap: https://www.thebestinlondon.co.uk/sitemap-images.xml

# Crawl delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/
Disallow: /backups/`;

  fs.writeFileSync(path.join(process.cwd(), 'public/robots.txt'), robotsTxt);
  console.log('✅ robots.txt generated successfully!');
}

// Run if called directly
if (require.main === module) {
  generateSitemaps()
    .then(() => generateRobotsTxt())
    .catch(console.error);
}

module.exports = { generateSitemaps, generateRobotsTxt };

#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Generate comprehensive sitemaps
async function generateSitemaps() {
  console.log('🗺️ Generating sitemaps...');
  
  const baseUrl = 'https://www.thebestinlondon.co.uk';
  const reportsDir = path.join(process.cwd(), 'reports');
  
  // Load venues data
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues;

  // Load collection pages
  const collectionPages = [];
  const pagesDir = path.join(process.cwd(), 'pages');
  const files = fs.readdirSync(pagesDir);
  
  files.forEach(file => {
    if (file.startsWith('best-') && file.endsWith('-2025.js')) {
      const slug = file.replace('.js', '');
      collectionPages.push({
        url: `${baseUrl}/${slug}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
  });

  // Generate restaurant sitemap
  const restaurantUrls = venues.map(venue => ({
    url: `${baseUrl}/restaurant/${venue.slug}`,
    lastmod: venue.last_updated ? venue.last_updated.split('T')[0] : new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  }));

  const restaurantSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${restaurantUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate cuisines sitemap
  const cuisineUrls = [
    { url: `${baseUrl}/indian-restaurants-london`, priority: '0.9' },
    { url: `${baseUrl}/italian-restaurants-london`, priority: '0.9' },
    { url: `${baseUrl}/japanese-restaurants-london`, priority: '0.9' },
    { url: `${baseUrl}/chinese-restaurants-london`, priority: '0.9' },
    { url: `${baseUrl}/turkish-restaurants-london`, priority: '0.9' },
    { url: `${baseUrl}/korean-restaurants-london`, priority: '0.8' },
    { url: `${baseUrl}/mediterranean-restaurants-london`, priority: '0.8' },
    { url: `${baseUrl}/vegan-restaurants-london`, priority: '0.8' },
    { url: `${baseUrl}/vegetarian-restaurants-london`, priority: '0.8' }
  ];

  const cuisineSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cuisineUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate areas sitemap
  const areaUrls = [
    { url: `${baseUrl}/restaurants-central-london`, priority: '0.9' },
    { url: `${baseUrl}/restaurants-westminster`, priority: '0.9' },
    { url: `${baseUrl}/restaurants-camden`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-islington`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-greenwich`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-hackney`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-tower-hamlets`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-southwark`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-lambeth`, priority: '0.8' },
    { url: `${baseUrl}/restaurants-wandsworth`, priority: '0.8' }
  ];

  const areaSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${areaUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate blog sitemap
  const blogUrls = [
    { url: `${baseUrl}/blog`, priority: '0.8' },
    { url: `${baseUrl}/blog/london-restaurant-trends-2025`, priority: '0.7' },
    { url: `${baseUrl}/blog/best-halal-restaurants-central-london`, priority: '0.7' },
    { url: `${baseUrl}/blog/michelin-starred-restaurants-london`, priority: '0.7' }
  ];

  const blogSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate FAQ sitemap
  const faqUrls = [
    { url: `${baseUrl}/faq`, priority: '0.7' },
    { url: `${baseUrl}/faq/halal-restaurants`, priority: '0.6' },
    { url: `${baseUrl}/faq/fsa-ratings`, priority: '0.6' },
    { url: `${baseUrl}/faq/restaurant-reviews`, priority: '0.6' }
  ];

  const faqSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${faqUrls.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate collection pages sitemap
  const collectionSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${collectionPages.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Generate main sitemap index
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-venues.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-cuisines.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-areas.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-faq.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-collections.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Generate pages sitemap (static pages)
  const staticPages = [
    { url: `${baseUrl}/`, priority: '1.0' },
    { url: `${baseUrl}/restaurants`, priority: '0.9' },
    { url: `${baseUrl}/cuisines`, priority: '0.9' },
    { url: `${baseUrl}/areas`, priority: '0.9' },
    { url: `${baseUrl}/best-halal-restaurants-london`, priority: '0.8' },
    { url: `${baseUrl}/about`, priority: '0.6' },
    { url: `${baseUrl}/contact`, priority: '0.6' }
  ];

  const pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(url => `  <url>
    <loc>${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write sitemaps to public directory
  const publicDir = path.join(process.cwd(), 'public');
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
  fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), pagesSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-venues.xml'), restaurantSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-cuisines.xml'), cuisineSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-areas.xml'), areaSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), blogSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-faq.xml'), faqSitemap);
  fs.writeFileSync(path.join(publicDir, 'sitemap-collections.xml'), collectionSitemap);

  // Update robots.txt
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-pages.xml
Sitemap: ${baseUrl}/sitemap-venues.xml
Sitemap: ${baseUrl}/sitemap-cuisines.xml
Sitemap: ${baseUrl}/sitemap-areas.xml
Sitemap: ${baseUrl}/sitemap-blog.xml
Sitemap: ${baseUrl}/sitemap-faq.xml
Sitemap: ${baseUrl}/sitemap-collections.xml

# Image optimization
Allow: /images/
Allow: /*.webp
Allow: /*.avif

# Disallow admin and private areas
Disallow: /admin
Disallow: /api/admin/
Disallow: /private/
Disallow: /reports/
Disallow: /scripts/
Disallow: /backups/

# Disallow staging/preview routes
Disallow: /_next/
Disallow: /api/
`;

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    sitemaps: {
      index: 'sitemap.xml',
      pages: 'sitemap-pages.xml',
      venues: 'sitemap-venues.xml',
      cuisines: 'sitemap-cuisines.xml',
      areas: 'sitemap-areas.xml',
      blog: 'sitemap-blog.xml',
      faq: 'sitemap-faq.xml',
      collections: 'sitemap-collections.xml'
    },
    counts: {
      totalUrls: staticPages.length + restaurantUrls.length + cuisineUrls.length + areaUrls.length + blogUrls.length + faqUrls.length + collectionPages.length,
      restaurantUrls: restaurantUrls.length,
      collectionPages: collectionPages.length,
      staticPages: staticPages.length
    }
  };

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(reportsDir, 'sitemap_generation.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('✅ Generated sitemaps:');
  console.log(`   - Main index: sitemap.xml`);
  console.log(`   - Pages: ${staticPages.length} URLs`);
  console.log(`   - Venues: ${restaurantUrls.length} URLs`);
  console.log(`   - Collections: ${collectionPages.length} URLs`);
  console.log(`   - Total: ${report.counts.totalUrls} URLs`);
  console.log('📄 Report saved to: reports/sitemap_generation.json');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemaps().catch(console.error);
}





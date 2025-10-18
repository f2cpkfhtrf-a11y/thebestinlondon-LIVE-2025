const fs = require('fs');
const path = require('path');

function generateSitemap() {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = data.venues || data;
    console.log(`🔍 Generating sitemap for ${venues.length} venues...`);
    
    const baseUrl = 'https://thebestinlondon.co.uk';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/restaurants', priority: '0.9', changefreq: 'daily' },
      { url: '/cuisines', priority: '0.9', changefreq: 'weekly' },
      { url: '/areas', priority: '0.9', changefreq: 'weekly' },
      { url: '/best-halal-restaurants-london', priority: '0.8', changefreq: 'weekly' },
      { url: '/nearby', priority: '0.8', changefreq: 'weekly' },
      { url: '/about', priority: '0.6', changefreq: 'monthly' },
      { url: '/contact', priority: '0.6', changefreq: 'monthly' }
    ];
    
    // Restaurant pages
    const restaurantPages = venues.map(venue => ({
      url: `/restaurant/${venue.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: currentDate
    }));
    
    // Cuisine pages
    const cuisines = [...new Set(venues.map(v => v.cuisines).flat())].filter(Boolean);
    const cuisinePages = cuisines.map(cuisine => ({
      url: `/cuisine/${cuisine.toLowerCase().replace(/\s+/g, '-')}`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: currentDate
    }));
    
    // Area pages
    const areas = [...new Set(venues.map(v => v.area || v.borough).filter(Boolean))];
    const areaPages = areas.map(area => ({
      url: `/area/${area.toLowerCase().replace(/\s+/g, '-')}`,
      priority: '0.7',
      changefreq: 'weekly',
      lastmod: currentDate
    }));
    
    // Combine all pages
    const allPages = [...staticPages, ...restaurantPages, ...cuisinePages, ...areaPages];
    
    // Generate XML sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    allPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${page.lastmod || currentDate}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    // Write sitemap
    const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    
    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /scripts/
Disallow: /reports/

# Allow important pages
Allow: /restaurant/
Allow: /cuisine/
Allow: /area/
Allow: /best-halal-restaurants-london
`;
    
    const robotsPath = path.join(process.cwd(), 'public/robots.txt');
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
    
    console.log(`\n✅ Generated sitemap with ${allPages.length} pages`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Restaurant pages: ${restaurantPages.length}`);
    console.log(`   - Cuisine pages: ${cuisinePages.length}`);
    console.log(`   - Area pages: ${areaPages.length}`);
    console.log(`   - Sitemap: ${baseUrl}/sitemap.xml`);
    console.log(`   - Robots.txt: ${baseUrl}/robots.txt`);
    
    return { success: true, pageCount: allPages.length };
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    return { success: false, error: error.message };
  }
}

// Run the generator
const result = generateSitemap();

if (result.success) {
  console.log('\n✅ Sitemap generation completed successfully!');
} else {
  console.log(`\n❌ Generation failed: ${result.error}`);
}

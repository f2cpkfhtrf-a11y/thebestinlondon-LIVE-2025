#!/usr/bin/env node
/**
 * Generate COMPLETE sitemap including all static pages, dynamic cuisine pages, area pages, and venues
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BASE_URL = 'https://www.thebestinlondon.co.uk';
const TODAY = new Date().toISOString().split('T')[0];

console.log('🗺️  GENERATING COMPLETE SITEMAP\n');

// 1. Read all static pages
const pagesDir = path.join(ROOT, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => 
  f.endsWith('.js') && 
  !f.startsWith('_') && 
  f !== '404.js' &&
  !f.includes('[')
);

console.log(`📄 Found ${pageFiles.length} static page files`);

const staticPages = pageFiles.map(file => {
  const route = file === 'index.js' ? '/' : '/' + file.replace('.js', '');
  return {
    path: route,
    priority: route === '/' ? '1.0' : route.startsWith('/restaurants') ? '0.9' : '0.7',
    changefreq: route === '/' ? 'daily' : 'weekly',
    lastmod: TODAY
  };
});

// 2. Read venues data to get dynamic pages
const venuesPath = path.join(ROOT, 'data/venues.json');
let venues = [];
let cuisines = [];
let areas = [];

if (fs.existsSync(venuesPath)) {
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  // Get unique cuisines
  const cuisineSet = new Set();
  venues.forEach(v => {
    if (v.cuisines) {
      v.cuisines.forEach(c => {
        const slug = c.toLowerCase().replace(/\s+/g, '-');
        cuisineSet.add(slug);
      });
    }
  });
  cuisines = Array.from(cuisineSet);
  
  // Get unique areas
  const areaSet = new Set();
  venues.forEach(v => {
    if (v.area) {
      const slug = v.area.toLowerCase().replace(/\s+/g, '-');
      areaSet.add(slug);
    }
    if (v.borough) {
      const slug = v.borough.toLowerCase().replace(/\s+/g, '-');
      areaSet.add(slug);
    }
  });
  areas = Array.from(areaSet);
  
  console.log(`🍽️  Found ${venues.length} venues`);
  console.log(`🍜 Found ${cuisines.length} unique cuisines`);
  console.log(`📍 Found ${areas.length} unique areas`);
}

// 3. Generate cuisine page URLs
const cuisinePages = cuisines.map(cuisine => ({
  path: `/${cuisine}-restaurants-london`,
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: TODAY
}));

// 4. Generate area page URLs  
const areaPages = areas.map(area => ({
  path: `/areas/${area}`,
  priority: '0.7',
  changefreq: 'weekly',
  lastmod: TODAY
}));

// Also include restaurant-area pages format
const restaurantAreaPages = areas.map(area => ({
  path: `/restaurants-${area}`,
  priority: '0.7',
  changefreq: 'weekly',
  lastmod: TODAY
}));

// 5. Generate venue pages
const venuePages = venues.map(venue => ({
  path: `/restaurant/${venue.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
  lastmod: venue.updatedAt ? venue.updatedAt.split('T')[0] : TODAY
}));

// 6. Read cuisineData to get additional cuisines
const cuisineDataPath = path.join(ROOT, 'lib/cuisineData.js');
if (fs.existsSync(cuisineDataPath)) {
  const cuisineDataContent = fs.readFileSync(cuisineDataPath, 'utf8');
  const cuisineMatches = cuisineDataContent.matchAll(/"([^"]+)":\s*\{[^}]*"slug":\s*"([^"]+)"/g);
  for (const match of cuisineMatches) {
    const slug = match[2];
    if (!cuisines.includes(slug)) {
      cuisinePages.push({
        path: `/${slug}-restaurants-london`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: TODAY
      });
    }
  }
}

// 7. Combine all pages
const allPages = [
  ...staticPages,
  ...cuisinePages,
  ...areaPages,
  ...restaurantAreaPages,
  ...venuePages
];

console.log(`\n📊 TOTAL URLs TO GENERATE:`);
console.log(`   Static pages: ${staticPages.length}`);
console.log(`   Cuisine pages: ${cuisinePages.length}`);
console.log(`   Area pages: ${areaPages.length + restaurantAreaPages.length}`);
console.log(`   Venue pages: ${venuePages.length}`);
console.log(`   TOTAL: ${allPages.length}`);

// 8. Generate XML
function generateSitemapXML(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${url.path}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  return xml;
}

// 9. Generate separate sitemaps (to avoid 50K URL limit)
const MAX_URLS_PER_SITEMAP = 45000;
const sitemaps = [];

// Static + Cuisine pages sitemap
const pagesSitemap = [...staticPages, ...cuisinePages];
const pagesXML = generateSitemapXML(pagesSitemap);
fs.writeFileSync(path.join(ROOT, 'public/sitemap-pages.xml'), pagesXML);
sitemaps.push({ loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: TODAY });
console.log(`\n✅ Generated sitemap-pages.xml (${pagesSitemap.length} URLs)`);

// Area pages sitemap
const areasSitemap = [...areaPages, ...restaurantAreaPages];
const areasXML = generateSitemapXML(areasSitemap);
fs.writeFileSync(path.join(ROOT, 'public/sitemap-areas.xml'), areasXML);
sitemaps.push({ loc: `${BASE_URL}/sitemap-areas.xml`, lastmod: TODAY });
console.log(`✅ Generated sitemap-areas.xml (${areasSitemap.length} URLs)`);

// Venue pages sitemap
const venuesXML = generateSitemapXML(venuePages);
fs.writeFileSync(path.join(ROOT, 'public/sitemap-venues.xml'), venuesXML);
sitemaps.push({ loc: `${BASE_URL}/sitemap-venues.xml`, lastmod: TODAY });
console.log(`✅ Generated sitemap-venues.xml (${venuePages.length} URLs)`);

// Images sitemap
const imagesSitemap = venues.filter(v => v.image_hero_path || v.image_card_path).map(venue => ({
  path: `/restaurant/${venue.slug}`,
  images: [
    venue.image_hero_path?.replace('/public', '') || venue.image_card_path?.replace('/public', '')
  ].filter(Boolean)
}));

let imagesXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
imagesXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

imagesSitemap.forEach(item => {
  if (item.images.length > 0) {
    imagesXML += `  <url>\n`;
    imagesXML += `    <loc>${BASE_URL}${item.path}</loc>\n`;
    item.images.forEach(img => {
      imagesXML += `    <image:image>\n`;
      imagesXML += `      <image:loc>${BASE_URL}${img}</image:loc>\n`;
      imagesXML += `    </image:image>\n`;
    });
    imagesXML += `  </url>\n`;
  }
});

imagesXML += '</urlset>';
fs.writeFileSync(path.join(ROOT, 'public/sitemap-images.xml'), imagesXML);
sitemaps.push({ loc: `${BASE_URL}/sitemap-images.xml`, lastmod: TODAY });
console.log(`✅ Generated sitemap-images.xml (${imagesSitemap.length} URLs with images)`);

// Blog sitemap (if exists)
const blogDir = path.join(ROOT, 'content/blog');
if (fs.existsSync(blogDir)) {
  const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
  if (blogFiles.length > 0) {
    const blogPages = blogFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        path: `/blog/${slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: TODAY
      };
    });
    const blogXML = generateSitemapXML(blogPages);
    fs.writeFileSync(path.join(ROOT, 'public/sitemap-blog.xml'), blogXML);
    sitemaps.push({ loc: `${BASE_URL}/sitemap-blog.xml`, lastmod: TODAY });
    console.log(`✅ Generated sitemap-blog.xml (${blogPages.length} URLs)`);
  }
}

// FAQ sitemap (if exists)
const faqDir = path.join(ROOT, 'content/faq');
if (fs.existsSync(faqDir)) {
  const faqFiles = fs.readdirSync(faqDir).filter(f => f.endsWith('.json'));
  if (faqFiles.length > 0) {
    const faqPages = faqFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        path: `/faq/${slug}`,
        priority: '0.5',
        changefreq: 'monthly',
        lastmod: TODAY
      };
    });
    const faqXML = generateSitemapXML(faqPages);
    fs.writeFileSync(path.join(ROOT, 'public/sitemap-faq.xml'), faqXML);
    sitemaps.push({ loc: `${BASE_URL}/sitemap-faq.xml`, lastmod: TODAY });
    console.log(`✅ Generated sitemap-faq.xml (${faqPages.length} URLs)`);
  }
}

// Collections sitemap
const collectionsPages = [
  { path: '/collections/halal', priority: '0.8' },
  { path: '/best-halal-restaurants-london', priority: '0.8' },
];
const collectionsXML = generateSitemapXML(collectionsPages.map(p => ({ ...p, changefreq: 'weekly', lastmod: TODAY })));
fs.writeFileSync(path.join(ROOT, 'public/sitemap-collections.xml'), collectionsXML);
sitemaps.push({ loc: `${BASE_URL}/sitemap-collections.xml`, lastmod: TODAY });
console.log(`✅ Generated sitemap-collections.xml (${collectionsPages.length} URLs)`);

// 10. Generate sitemap index
let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapIndex += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

sitemaps.forEach(sitemap => {
  sitemapIndex += '  <sitemap>\n';
  sitemapIndex += `    <loc>${sitemap.loc}</loc>\n`;
  sitemapIndex += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
  sitemapIndex += '  </sitemap>\n';
});

sitemapIndex += '</sitemapindex>';

fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), sitemapIndex);
console.log(`\n✅ Generated sitemap.xml (index with ${sitemaps.length} sitemaps)`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SITEMAP GENERATION COMPLETE\n');
console.log(`Total Static Pages: ${staticPages.length}`);
console.log(`Total Cuisine Pages: ${cuisinePages.length}`);
console.log(`Total Area Pages: ${areasSitemap.length}`);
console.log(`Total Venue Pages: ${venuePages.length}`);
console.log(`Total URLs: ${allPages.length}`);
console.log(`Total Sitemaps: ${sitemaps.length}`);
console.log('='.repeat(60));


/**
 * Safe Sitemap Generator
 * Generates XML sitemaps without breaking existing functionality
 * Run with: node scripts/generate-sitemaps-safe.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://www.thebestinlondon.co.uk';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_DIR = path.join(process.cwd(), 'content');

// Backup existing sitemaps before regenerating
function backupExistingSitemaps() {
  const backupDir = path.join(process.cwd(), 'backups', 'sitemaps', new Date().toISOString().split('T')[0]);
  
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  const sitemapFiles = fs.readdirSync(PUBLIC_DIR).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));
  
  sitemapFiles.forEach(file => {
    const source = path.join(PUBLIC_DIR, file);
    const dest = path.join(backupDir, file);
    
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log(`✅ Backed up: ${file}`);
    }
  });
  
  console.log(`\n📦 Backup created at: ${backupDir}\n`);
  return backupDir;
}

// Generate XML sitemap format
function generateXML(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod || new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq || 'weekly'}</changefreq>\n`;
    xml += `    <priority>${url.priority || '0.5'}</priority>\n`;
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
    xml += `    <loc>${DOMAIN}/${sitemap.file}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
}

// Generate static pages sitemap
function generatePagesSitemap() {
  const staticPages = [
    { loc: `${DOMAIN}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${DOMAIN}/restaurants`, priority: '0.9', changefreq: 'daily' },
    { loc: `${DOMAIN}/areas`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${DOMAIN}/cuisines`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${DOMAIN}/best-halal-restaurants-london`, priority: '0.9', changefreq: 'daily' },
    { loc: `${DOMAIN}/best-halal-restaurants-london/by-area`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${DOMAIN}/near-me`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${DOMAIN}/blog`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${DOMAIN}/faq`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${DOMAIN}/about`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${DOMAIN}/contact`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${DOMAIN}/search`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${DOMAIN}/privacy`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${DOMAIN}/terms`, priority: '0.3', changefreq: 'yearly' },
    { loc: `${DOMAIN}/cookies`, priority: '0.3', changefreq: 'yearly' },
  ];
  
  return generateXML(staticPages);
}

// Generate venues sitemap
function generateVenuesSitemap() {
  try {
    const venuesPath = path.join(DATA_DIR, 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      console.warn('⚠️  venues.json not found, skipping venues sitemap');
      return null;
    }
    
    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    const urls = venues
      .filter(v => v.slug)
      .map(v => ({
        loc: `${DOMAIN}/restaurant/${v.slug}`,
        priority: '0.7',
        changefreq: 'weekly'
      }));
    
    console.log(`✅ Found ${urls.length} venues`);
    return generateXML(urls);
  } catch (error) {
    console.error('❌ Error generating venues sitemap:', error.message);
    return null;
  }
}

// Generate blog sitemap
function generateBlogSitemap() {
  try {
    const blogDir = path.join(CONTENT_DIR, 'blog');
    
    if (!fs.existsSync(blogDir)) {
      console.warn('⚠️  blog directory not found, skipping blog sitemap');
      return null;
    }
    
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
    
    const urls = blogFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        loc: `${DOMAIN}/blog/${slug}`,
        priority: '0.6',
        changefreq: 'monthly'
      };
    });
    
    console.log(`✅ Found ${urls.length} blog posts`);
    return generateXML(urls);
  } catch (error) {
    console.error('❌ Error generating blog sitemap:', error.message);
    return null;
  }
}

// Generate FAQ sitemap
function generateFAQSitemap() {
  try {
    const faqDir = path.join(CONTENT_DIR, 'faq');
    
    if (!fs.existsSync(faqDir)) {
      console.warn('⚠️  faq directory not found, skipping FAQ sitemap');
      return null;
    }
    
    const faqFiles = fs.readdirSync(faqDir).filter(f => f.endsWith('.json'));
    
    const urls = faqFiles.map(file => {
      const slug = file.replace('.json', '');
      return {
        loc: `${DOMAIN}/faq/${slug}`,
        priority: '0.5',
        changefreq: 'monthly'
      };
    });
    
    console.log(`✅ Found ${urls.length} FAQ pages`);
    return generateXML(urls);
  } catch (error) {
    console.error('❌ Error generating FAQ sitemap:', error.message);
    return null;
  }
}

// Generate areas sitemap
function generateAreasSitemap() {
  try {
    const areasPath = path.join(DATA_DIR, 'areas.json');
    
    if (!fs.existsSync(areasPath)) {
      console.warn('⚠️  areas.json not found, skipping areas sitemap');
      return null;
    }
    
    const areas = JSON.parse(fs.readFileSync(areasPath, 'utf8'));
    
    const urls = areas
      .filter(a => a.slug)
      .map(a => ({
        loc: `${DOMAIN}/areas/${a.slug}`,
        priority: '0.6',
        changefreq: 'weekly'
      }));
    
    console.log(`✅ Found ${urls.length} areas`);
    return generateXML(urls);
  } catch (error) {
    console.error('❌ Error generating areas sitemap:', error.message);
    return null;
  }
}

// Generate cuisines sitemap
function generateCuisinesSitemap() {
  try {
    const venuesPath = path.join(DATA_DIR, 'venues.json');
    
    if (!fs.existsSync(venuesPath)) {
      console.warn('⚠️  venues.json not found, skipping cuisines sitemap');
      return null;
    }
    
    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get unique cuisines
    const cuisines = new Set();
    venues.forEach(v => {
      if (v.cuisines && Array.isArray(v.cuisines)) {
        v.cuisines.forEach(c => cuisines.add(c.toLowerCase()));
      }
    });
    
    const urls = Array.from(cuisines).map(cuisine => ({
      loc: `${DOMAIN}/${cuisine}-restaurants-london`,
      priority: '0.7',
      changefreq: 'weekly'
    }));
    
    console.log(`✅ Found ${urls.length} cuisines`);
    return generateXML(urls);
  } catch (error) {
    console.error('❌ Error generating cuisines sitemap:', error.message);
    return null;
  }
}

// Main execution
async function main() {
  console.log('🗺️  Safe Sitemap Generator\n');
  console.log('='.repeat(60));
  
  try {
    // Step 1: Backup existing sitemaps
    console.log('\n📦 Step 1: Backing up existing sitemaps...\n');
    const backupDir = backupExistingSitemaps();
    
    // Step 2: Generate new sitemaps
    console.log('\n🔨 Step 2: Generating new sitemaps...\n');
    
    const sitemaps = [];
    
    // Pages sitemap
    const pagesXML = generatePagesSitemap();
    if (pagesXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-pages.xml'), pagesXML);
      sitemaps.push({ file: 'sitemap-pages.xml' });
      console.log('✅ Generated: sitemap-pages.xml');
    }
    
    // Venues sitemap
    const venuesXML = generateVenuesSitemap();
    if (venuesXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-venues.xml'), venuesXML);
      sitemaps.push({ file: 'sitemap-venues.xml' });
      console.log('✅ Generated: sitemap-venues.xml');
    }
    
    // Blog sitemap
    const blogXML = generateBlogSitemap();
    if (blogXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blog.xml'), blogXML);
      sitemaps.push({ file: 'sitemap-blog.xml' });
      console.log('✅ Generated: sitemap-blog.xml');
    }
    
    // FAQ sitemap
    const faqXML = generateFAQSitemap();
    if (faqXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-faq.xml'), faqXML);
      sitemaps.push({ file: 'sitemap-faq.xml' });
      console.log('✅ Generated: sitemap-faq.xml');
    }
    
    // Areas sitemap
    const areasXML = generateAreasSitemap();
    if (areasXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-areas.xml'), areasXML);
      sitemaps.push({ file: 'sitemap-areas.xml' });
      console.log('✅ Generated: sitemap-areas.xml');
    }
    
    // Cuisines sitemap
    const cuisinesXML = generateCuisinesSitemap();
    if (cuisinesXML) {
      fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-cuisines.xml'), cuisinesXML);
      sitemaps.push({ file: 'sitemap-cuisines.xml' });
      console.log('✅ Generated: sitemap-cuisines.xml');
    }
    
    // Step 3: Generate sitemap index
    console.log('\n📑 Step 3: Generating sitemap index...\n');
    const indexXML = generateSitemapIndex(sitemaps);
    fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), indexXML);
    console.log('✅ Generated: sitemap.xml (index)');
    
    // Step 4: Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n✅ SUCCESS! Sitemaps generated safely\n');
    console.log('Generated files:');
    sitemaps.forEach(s => console.log(`  • ${s.file}`));
    console.log(`  • sitemap.xml (index)`);
    console.log(`\n📦 Backup location: ${backupDir}`);
    console.log('\n💡 Next steps:');
    console.log('  1. Review generated sitemaps in /public/');
    console.log('  2. Submit sitemap.xml to Google Search Console');
    console.log('  3. Add to robots.txt: Sitemap: https://www.thebestinlondon.co.uk/sitemap.xml');
    console.log('\n🔄 To rollback, restore files from backup directory');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\n💡 Backups are available if needed');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generatePagesSitemap, generateVenuesSitemap, generateBlogSitemap };


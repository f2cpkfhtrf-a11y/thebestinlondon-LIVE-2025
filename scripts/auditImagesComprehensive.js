const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const venuesFilePath = path.join(process.cwd(), 'public/venues.json');
const reportPath = path.join(process.cwd(), 'reports', 'images.md');

// Image classification categories
const IMAGE_CATEGORIES = {
  FOOD_OK: 'food_ok',
  LOGO_WHITE: 'logo/white',
  STOREFRONT: 'storefront',
  LOW_RES: 'low_res',
  MISSING: 'missing'
};

// Pages to audit
const PAGES_TO_AUDIT = [
  { path: '/', name: 'Home' },
  { path: '/restaurants', name: 'Restaurants List' },
  { path: '/best-halal-restaurants-london', name: 'Halal Page' },
  { path: '/cuisines', name: 'Cuisines Hub' },
  { path: '/areas', name: 'Areas Hub' }
];

async function fetchImageMetadata(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) return null;
    
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    return {
      bytes: contentLength ? parseInt(contentLength) : null,
      contentType: contentType,
      status: response.status
    };
  } catch (error) {
    return null;
  }
}

function classifyImage(url, alt, venueName, cuisine) {
  if (!url || url === '') {
    return IMAGE_CATEGORIES.MISSING;
  }
  
  const urlLower = url.toLowerCase();
  const altLower = (alt || '').toLowerCase();
  const venueLower = (venueName || '').toLowerCase();
  
  // Check for logos, white backgrounds, placeholders
  if (urlLower.includes('logo') || 
      urlLower.includes('placeholder') || 
      urlLower.includes('generic') ||
      urlLower.includes('white') ||
      urlLower.includes('blank') ||
      altLower.includes('logo') ||
      altLower.includes('placeholder') ||
      altLower.includes('generic')) {
    return IMAGE_CATEGORIES.LOGO_WHITE;
  }
  
  // Check for storefront/exterior images
  if (urlLower.includes('storefront') ||
      urlLower.includes('exterior') ||
      urlLower.includes('building') ||
      urlLower.includes('facade') ||
      altLower.includes('storefront') ||
      altLower.includes('exterior') ||
      altLower.includes('building')) {
    return IMAGE_CATEGORIES.STOREFRONT;
  }
  
  // Check for low resolution (assuming URLs with specific dimensions)
  if (urlLower.includes('w=800') || 
      urlLower.includes('w=400') ||
      urlLower.includes('w=300') ||
      urlLower.includes('maxwidth=800') ||
      urlLower.includes('maxwidth=400')) {
    return IMAGE_CATEGORIES.LOW_RES;
  }
  
  // Check for food-related indicators
  if (urlLower.includes('food') ||
      urlLower.includes('dish') ||
      urlLower.includes('meal') ||
      urlLower.includes('cuisine') ||
      altLower.includes('food') ||
      altLower.includes('dish') ||
      altLower.includes('meal') ||
      altLower.includes('cuisine') ||
      altLower.includes(cuisine?.toLowerCase() || '')) {
    return IMAGE_CATEGORIES.FOOD_OK;
  }
  
  // Default to food_ok if it's a valid image URL
  if (urlLower.includes('http') && 
      (urlLower.includes('.jpg') || 
       urlLower.includes('.jpeg') || 
       urlLower.includes('.png') || 
       urlLower.includes('.webp') ||
       urlLower.includes('unsplash') ||
       urlLower.includes('googleapis'))) {
    return IMAGE_CATEGORIES.FOOD_OK;
  }
  
  return IMAGE_CATEGORIES.MISSING;
}

async function auditPageImages(pagePath, pageName) {
  console.log(`🔍 Auditing ${pageName} (${pagePath})...`);
  
  try {
    const response = await fetch(`${BASE_URL}${pagePath}`);
    if (!response.ok) {
      console.log(`❌ Failed to fetch ${pagePath}: ${response.status}`);
      return [];
    }
    
    const html = await response.text();
    const images = [];
    
    // Extract image URLs from HTML (simplified regex approach)
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    const altRegex = /alt=["']([^"']*)["']/i;
    
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      const src = match[1];
      const altMatch = match[0].match(altRegex);
      const alt = altMatch ? altMatch[1] : '';
      
      // Skip data URLs and very small images
      if (src.startsWith('data:') || src.includes('icon') || src.includes('favicon')) {
        continue;
      }
      
      images.push({
        src: src,
        alt: alt,
        page: pagePath,
        pageName: pageName
      });
    }
    
    return images;
  } catch (error) {
    console.log(`❌ Error auditing ${pagePath}:`, error.message);
    return [];
  }
}

async function auditVenueImages(venues) {
  console.log(`🔍 Auditing ${venues.length} venue images...`);
  
  const venueImages = [];
  
  for (let i = 0; i < Math.min(50, venues.length); i++) {
    const venue = venues[i];
    const images = [];
    
    // Check image_url field
    if (venue.image_url) {
      images.push({
        src: venue.image_url,
        alt: venue.image_alt || `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`,
        page: `/restaurant/${venue.slug}`,
        pageName: 'Restaurant Detail',
        venue: venue
      });
    }
    
    // Check photos array
    if (venue.photos && venue.photos.length > 0) {
      venue.photos.forEach(photo => {
        images.push({
          src: photo.url,
          alt: photo.alt || `${venue.name} — ${venue.cuisines?.[0] || 'Restaurant'}, ${venue.area || venue.borough || 'London'}, London`,
          page: `/restaurant/${venue.slug}`,
          pageName: 'Restaurant Detail',
          venue: venue
        });
      });
    }
    
    venueImages.push(...images);
  }
  
  return venueImages;
}

async function auditCuisineAndAreaPages(venues) {
  console.log(`🔍 Auditing cuisine and area pages...`);
  
  const pages = [];
  
  // Get unique cuisines
  const cuisines = [...new Set(venues.map(v => v.cuisines?.[0]).filter(Boolean))];
  const areas = [...new Set(venues.map(v => v.area).filter(Boolean))];
  
  // Add cuisine pages
  cuisines.slice(0, 10).forEach(cuisine => {
    const slug = cuisine.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      path: `/${slug}-restaurants-london`,
      name: `${cuisine} Restaurants`
    });
  });
  
  // Add area pages
  areas.slice(0, 10).forEach(area => {
    const slug = area.toLowerCase().replace(/\s+/g, '-');
    pages.push({
      path: `/restaurants-${slug}`,
      name: `${area} Restaurants`
    });
  });
  
  const allImages = [];
  
  for (const page of pages) {
    const images = await auditPageImages(page.path, page.name);
    allImages.push(...images);
  }
  
  return allImages;
}

async function generateImageAuditReport() {
  console.log('📊 PHASE 1 — COMPREHENSIVE IMAGE AUDIT\n');
  
  // Load venues data
  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  const data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);
  
  console.log(`📊 Analyzing ${venues.length} venues...\n`);
  
  let allImages = [];
  
  // 1. Audit main pages
  console.log('1️⃣ AUDITING MAIN PAGES:');
  for (const page of PAGES_TO_AUDIT) {
    const images = await auditPageImages(page.path, page.name);
    allImages.push(...images);
    console.log(`   ${page.name}: ${images.length} images found`);
  }
  console.log('');
  
  // 2. Audit venue detail pages (sample)
  console.log('2️⃣ AUDITING VENUE DETAIL PAGES:');
  const venueImages = await auditVenueImages(venues);
  allImages.push(...venueImages);
  console.log(`   Venue Details: ${venueImages.length} images found\n`);
  
  // 3. Audit cuisine and area pages
  console.log('3️⃣ AUDITING CUISINE & AREA PAGES:');
  const cuisineAreaImages = await auditCuisineAndAreaPages(venues);
  allImages.push(...cuisineAreaImages);
  console.log(`   Cuisine/Area Pages: ${cuisineAreaImages.length} images found\n`);
  
  // 4. Classify all images
  console.log('4️⃣ CLASSIFYING IMAGES:');
  const classifiedImages = [];
  
  for (const image of allImages) {
    const venue = image.venue;
    const classification = classifyImage(
      image.src, 
      image.alt, 
      venue?.name, 
      venue?.cuisines?.[0]
    );
    
    classifiedImages.push({
      ...image,
      classification: classification,
      venueName: venue?.name || 'Unknown',
      cuisine: venue?.cuisines?.[0] || 'Unknown'
    });
  }
  
  // 5. Generate counts and statistics
  const counts = {};
  Object.values(IMAGE_CATEGORIES).forEach(category => {
    counts[category] = classifiedImages.filter(img => img.classification === category).length;
  });
  
  console.log('   📈 Classification Results:');
  Object.entries(counts).forEach(([category, count]) => {
    const percentage = ((count / classifiedImages.length) * 100).toFixed(1);
    console.log(`   ${category}: ${count} (${percentage}%)`);
  });
  console.log('');
  
  // 6. Find top offenders
  const topOffenders = classifiedImages
    .filter(img => img.classification !== IMAGE_CATEGORIES.FOOD_OK)
    .slice(0, 20);
  
  console.log('5️⃣ TOP OFFENDERS:');
  topOffenders.forEach((img, index) => {
    console.log(`   ${index + 1}. ${img.venueName} (${img.classification})`);
    console.log(`      Page: ${img.page}`);
    console.log(`      URL: ${img.src}`);
    console.log(`      Alt: ${img.alt}`);
    console.log('');
  });
  
  // 7. Generate report
  let reportContent = `# 📊 PHASE 1 — COMPREHENSIVE IMAGE AUDIT REPORT\n\n`;
  reportContent += `**Generated:** ${new Date().toISOString()}\n`;
  reportContent += `**Total Images Analyzed:** ${classifiedImages.length}\n`;
  reportContent += `**Total Venues:** ${venues.length}\n\n`;
  
  reportContent += `## 📈 Classification Results\n\n`;
  Object.entries(counts).forEach(([category, count]) => {
    const percentage = ((count / classifiedImages.length) * 100).toFixed(1);
    reportContent += `- **${category}**: ${count} (${percentage}%)\n`;
  });
  
  reportContent += `\n## 🎯 Target Goals\n\n`;
  reportContent += `- **food_ok**: ${counts[IMAGE_CATEGORIES.FOOD_OK]} (Target: ${classifiedImages.length})\n`;
  reportContent += `- **logo/white**: ${counts[IMAGE_CATEGORIES.LOGO_WHITE]} (Target: 0)\n`;
  reportContent += `- **storefront**: ${counts[IMAGE_CATEGORIES.STOREFRONT]} (Target: 0)\n`;
  reportContent += `- **low_res**: ${counts[IMAGE_CATEGORIES.LOW_RES]} (Target: 0)\n`;
  reportContent += `- **missing**: ${counts[IMAGE_CATEGORIES.MISSING]} (Target: 0)\n\n`;
  
  reportContent += `## 🚨 Top Offenders\n\n`;
  topOffenders.forEach((img, index) => {
    reportContent += `### ${index + 1}. ${img.venueName}\n`;
    reportContent += `- **Classification**: ${img.classification}\n`;
    reportContent += `- **Page**: ${img.page}\n`;
    reportContent += `- **URL**: ${img.src}\n`;
    reportContent += `- **Alt**: ${img.alt}\n`;
    reportContent += `- **Cuisine**: ${img.cuisine}\n\n`;
  });
  
  reportContent += `## 📋 Next Steps\n\n`;
  reportContent += `1. **PHASE 2**: Build deterministic image pipeline\n`;
  reportContent += `2. **PHASE 3**: Wire everywhere & remove placeholders\n`;
  reportContent += `3. **PHASE 4**: Bust caches & make it sticky\n`;
  reportContent += `4. **PHASE 5**: Verify & report with live deployment\n\n`;
  
  reportContent += `## 📊 Detailed Analysis\n\n`;
  reportContent += `### Pages Audited\n`;
  PAGES_TO_AUDIT.forEach(page => {
    const pageImages = classifiedImages.filter(img => img.page === page.path);
    reportContent += `- **${page.name}** (${page.path}): ${pageImages.length} images\n`;
  });
  
  reportContent += `\n### Venue Detail Pages\n`;
  reportContent += `- **Sample Size**: 50 venues\n`;
  reportContent += `- **Images Found**: ${venueImages.length}\n`;
  
  reportContent += `\n### Cuisine & Area Pages\n`;
  reportContent += `- **Images Found**: ${cuisineAreaImages.length}\n`;
  
  fs.writeFileSync(reportPath, reportContent, 'utf8');
  
  console.log(`✅ Image audit completed!`);
  console.log(`📄 Report saved to: ${reportPath}`);
  console.log(`📊 Total images analyzed: ${classifiedImages.length}`);
  console.log(`🎯 Food OK images: ${counts[IMAGE_CATEGORIES.FOOD_OK]} (${((counts[IMAGE_CATEGORIES.FOOD_OK] / classifiedImages.length) * 100).toFixed(1)}%)`);
  console.log(`🚨 Issues found: ${classifiedImages.length - counts[IMAGE_CATEGORIES.FOOD_OK]}`);
  
  return {
    totalImages: classifiedImages.length,
    counts: counts,
    topOffenders: topOffenders,
    classifiedImages: classifiedImages
  };
}

// Run the audit
generateImageAuditReport().catch(console.error);

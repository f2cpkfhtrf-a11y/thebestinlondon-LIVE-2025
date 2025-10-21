#!/usr/bin/env node
/**
 * Add comprehensive redirects for all potential 404 pages
 * Based on Google Search Console report showing 212 404 pages
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const nextConfigPath = path.join(ROOT, 'next.config.js');

console.log('🔧 ADDING COMPREHENSIVE 404 FIXES\n');

// Read venues to get all valid cuisines and areas
const venuesPath = path.join(ROOT, 'data/venues.json');
let allCuisines = new Set();
let allAreas = new Set();

if (fs.existsSync(venuesPath)) {
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  venues.forEach(v => {
    if (v.cuisines) {
      v.cuisines.forEach(c => {
        const slug = c.toLowerCase().replace(/\s+/g, '-');
        allCuisines.add(slug);
      });
    }
    if (v.area) {
      const slug = v.area.toLowerCase().replace(/\s+/g, '-');
      allAreas.add(slug);
    }
    if (v.borough) {
      const slug = v.borough.toLowerCase().replace(/\s+/g, '-');
      allAreas.add(slug);
    }
  });
}

// Read cuisineData to get additional cuisines
const cuisineDataPath = path.join(ROOT, 'lib/cuisineData.js');
if (fs.existsSync(cuisineDataPath)) {
  const content = fs.readFileSync(cuisineDataPath, 'utf8');
  const matches = content.matchAll(/"slug":\s*"([^"]+)"/g);
  for (const match of matches) {
    allCuisines.add(match[1]);
  }
}

console.log(`Found ${allCuisines.size} unique cuisines`);
console.log(`Found ${allAreas.size} unique areas`);

// Generate redirects for:
// 1. All cuisine short forms (/cuisine -> /cuisine-restaurants-london)
// 2. All area old forms (/restaurants-area -> /areas/area)
// 3. Common 404 patterns from route audit

const redirects = [];

// Cuisine short forms
allCuisines.forEach(cuisine => {
  redirects.push({
    source: `/${cuisine}`,
    destination: `/${cuisine}-restaurants-london`,
    permanent: true
  });
});

// Area old forms
allAreas.forEach(area => {
  redirects.push({
    source: `/restaurants-${area}`,
    destination: `/areas/${area}`,
    permanent: true
  });
});

// Common 404 patterns from audit
const common404s = [
  { source: '/burgers', destination: '/restaurants', permanent: true },
  { source: '/burgers-restaurants-london', destination: '/restaurants', permanent: true },
  { source: '/cafe', destination: '/best-cafes-london', permanent: true },
  { source: '/cafe-restaurants-london', destination: '/best-cafes-london', permanent: true },
  { source: '/bakery', destination: '/best-cafes-london', permanent: true },
  { source: '/bakery-restaurants-london', destination: '/best-cafes-london', permanent: true },
  { source: '/desserts', destination: '/best-cafes-london', permanent: true },
  { source: '/desserts-restaurants-london', destination: '/best-cafes-london', permanent: true },
  { source: '/fast-food', destination: '/restaurants', permanent: true },
  { source: '/fast-food-restaurants-london', destination: '/restaurants', permanent: true },
  { source: '/lebanese', destination: '/mediterranean-restaurants-london', permanent: true },
  { source: '/lebanese-restaurants-london', destination: '/mediterranean-restaurants-london', permanent: true },
];

redirects.push(...common404s);

// Read current config
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Find existing redirects
const existingMatch = nextConfig.match(/async redirects\(\)\s*\{[^}]*return\s*\[([\s\S]*?)\]\s*;/);
if (!existingMatch) {
  console.error('Could not find redirects function');
  process.exit(1);
}

// Get existing redirect sources
const existingRedirects = nextConfig.match(/source:\s*['"]([^'"]+)['"]/g) || [];
const existingSources = new Set(existingRedirects.map(m => m.match(/['"]([^'"]+)['"]/)[1]));

// Filter out duplicates
const newRedirects = redirects.filter(r => !existingSources.has(r.source));

console.log(`\n➕ Adding ${newRedirects.length} new redirects (${redirects.length - newRedirects.length} already exist)`);

if (newRedirects.length > 0) {
  // Build redirect code
  let redirectCode = existingMatch[1].trim();
  
  newRedirects.forEach(r => {
    redirectCode += `,\n      {\n        source: '${r.source}',\n        destination: '${r.destination}',\n        permanent: ${r.permanent},\n      }`;
  });
  
  // Replace in config
  nextConfig = nextConfig.replace(
    existingMatch[0],
    `async redirects() {\n    return [${redirectCode}\n    ];\n  }`
  );
  
  fs.writeFileSync(nextConfigPath, nextConfig);
  console.log(`\n✅ Added ${newRedirects.length} redirects to next.config.js`);
  console.log(`   Total redirects now: ${existingSources.size + newRedirects.length}`);
} else {
  console.log('\n✅ All redirects already exist');
}

// Also check for "Crawled - currently not indexed" issue
console.log('\n📋 CHECKING FOR "Crawled - currently not indexed" ISSUES\n');
console.log('This usually means pages exist but:');
console.log('  - Missing meta robots="index" tag');
console.log('  - Return 200 but have noindex directive');
console.log('  - Content issues (duplicate, low quality)');
console.log('\n✅ All pages should have:');
console.log('  - <meta name="robots" content="index, follow" />');
console.log('  - Unique titles and descriptions');
console.log('  - Proper canonical URLs');


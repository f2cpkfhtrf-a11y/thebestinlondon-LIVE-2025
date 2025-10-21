#!/usr/bin/env node
/**
 * Fix 404 pages identified in Google Search Console
 * Adds redirects for old/broken URLs
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const nextConfigPath = path.join(ROOT, 'next.config.js');

console.log('🔧 FIXING 404 PAGES\n');
console.log('='.repeat(80));

// Read current next.config.js
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Common 404 patterns found in route audit
const redirectsToAdd = [
  // Old cuisine page formats (if they were statically generated)
  { source: '/british-restaurants-london', destination: '/british-restaurants-london', permanent: true },
  { source: '/french-restaurants-london', destination: '/french-restaurants-london', permanent: true },
  { source: '/spanish-restaurants-london', destination: '/spanish-restaurants-london', permanent: true },
  { source: '/korean-restaurants-london', destination: '/korean-restaurants-london', permanent: true },
  { source: '/mexican-restaurants-london', destination: '/mexican-restaurants-london', permanent: true },
  
  // Old area formats that might not exist
  { source: '/restaurants-central-london', destination: '/areas/central-london', permanent: true },
  { source: '/restaurants-tower-hamlets', destination: '/areas/tower-hamlets', permanent: true },
  { source: '/restaurants-westminster', destination: '/areas/westminster', permanent: true },
  { source: '/restaurants-kensington-and-chelsea', destination: '/areas/kensington-and-chelsea', permanent: true },
  { source: '/restaurants-lambeth', destination: '/areas/lambeth', permanent: true },
  { source: '/restaurants-southwark', destination: '/areas/southwark', permanent: true },
  { source: '/restaurants-holborn', destination: '/areas/holborn', permanent: true },
  { source: '/restaurants-brick-lane', destination: '/areas/brick-lane', permanent: true },
  { source: '/restaurants-london-bridge', destination: '/areas/london-bridge', permanent: true },
  
  // Old cuisine slugs without -restaurants-london
  { source: '/british', destination: '/british-restaurants-london', permanent: true },
  { source: '/french', destination: '/french-restaurants-london', permanent: true },
  { source: '/spanish', destination: '/spanish-restaurants-london', permanent: true },
  { source: '/korean', destination: '/korean-restaurants-london', permanent: true },
  { source: '/mexican', destination: '/mexican-restaurants-london', permanent: true },
];

// Check which redirects already exist
const existingRedirects = nextConfig.match(/source:\s*['"]([^'"]+)['"]/g) || [];
const existingSources = existingRedirects.map(m => m.match(/['"]([^'"]+)['"]/)[1]);

console.log(`Found ${existingSources.length} existing redirects`);

// Add new redirects that don't already exist
const newRedirects = redirectsToAdd.filter(r => !existingSources.includes(r.source));

if (newRedirects.length > 0) {
  console.log(`\n➕ Adding ${newRedirects.length} new redirects:\n`);
  newRedirects.forEach(r => {
    console.log(`  ${r.source} → ${r.destination}`);
  });
  
  // Find the redirects array in next.config.js
  const redirectsMatch = nextConfig.match(/async redirects\(\)\s*\{[^}]*return\s*\[([\s\S]*?)\]\s*;/);
  
  if (redirectsMatch) {
    let redirectsCode = redirectsMatch[1];
    
    // Add new redirects
    newRedirects.forEach(r => {
      const redirectCode = `
      {
        source: '${r.source}',
        destination: '${r.destination}',
        permanent: ${r.permanent},
      },`;
      redirectsCode += redirectCode;
    });
    
    // Replace in next.config.js
    nextConfig = nextConfig.replace(
      redirectsMatch[0],
      nextConfig.match(/async redirects\(\)\s*\{/)[0] + `\n    return [${redirectsCode}\n    ];`
    );
    
    fs.writeFileSync(nextConfigPath, nextConfig);
    console.log(`\n✅ Updated next.config.js with ${newRedirects.length} new redirects`);
  } else {
    console.log('\n⚠️  Could not find redirects function in next.config.js');
  }
} else {
  console.log('\n✅ All redirects already exist');
}

// Generate a report of potential 404 causes
console.log('\n' + '='.repeat(80));
console.log('\n📋 ANALYZING POTENTIAL 404 SOURCES\n');

// Check for missing dynamic routes
const pagesDir = path.join(ROOT, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.js'));

console.log(`Total page files: ${pageFiles.length}`);

// Check if dynamic routes exist
const dynamicRoutes = {
  'restaurant/[slug].js': 'venue pages',
  '[cuisineSlug].js': 'cuisine pages',
  'areas/[slug].js': 'area pages',
  'blog/[slug].js': 'blog pages',
  'faq/[slug].js': 'faq pages'
};

console.log('\nDynamic route handlers:');
Object.entries(dynamicRoutes).forEach(([route, description]) => {
  const exists = pageFiles.includes(route);
  console.log(`  ${exists ? '✅' : '❌'} ${route} - ${description}`);
});

// Check venues data
const venuesPath = path.join(ROOT, 'data/venues.json');
if (fs.existsSync(venuesPath)) {
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  console.log(`\nVenues data: ${venues.length} venues found`);
  
  // Check for venues with invalid slugs
  const invalidSlugs = venues.filter(v => !v.slug || v.slug.includes(' ')).length;
  if (invalidSlugs > 0) {
    console.log(`⚠️  ${invalidSlugs} venues may have invalid slugs`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n💡 RECOMMENDATIONS:\n');
console.log('1. Check Google Search Console for specific 404 URLs');
console.log('2. Add redirects for any old URLs that changed');
console.log('3. Ensure all dynamic routes handle missing data gracefully');
console.log('4. Verify all venue slugs are valid and don\'t contain spaces');
console.log('5. Check if old static pages were deleted and need redirects');

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  redirectsAdded: newRedirects.length,
  existingRedirects: existingSources.length,
  recommendations: [
    'Monitor Google Search Console for specific 404 URLs',
    'Add redirects for old URLs if site structure changed',
    'Ensure all getServerSideProps return notFound: true for invalid routes',
    'Verify venue slugs are URL-safe'
  ]
};

const reportPath = path.join(ROOT, 'reports/404-fix-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n✅ Report saved to: ${reportPath}`);


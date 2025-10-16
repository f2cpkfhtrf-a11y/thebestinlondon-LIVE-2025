// Link verification script for BestOfLondon
// Finds all internal links and checks if pages/files exist
// Run with: node scripts/verify-links.js

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../pages');
const PUBLIC_DIR = path.join(__dirname, '../public');
const REPORTS_DIR = path.join(__dirname, '../reports');

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /\.bak$/,
  /\.backup$/
];

// Extract links from JSX/TSX content
function extractLinks(content, filePath) {
  const links = [];
  
  // href="..." or href={...}
  const hrefPattern = /href=["'`]([^"'`]+)["'`]/g;
  let match;
  
  while ((match = hrefPattern.exec(content)) !== null) {
    const href = match[1];
    
    // Skip external links, anchors, and dynamic routes with actual params
    if (href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href === '#' ||
        href.includes('${') ||
        href.includes('place_id:')) {
      continue;
    }
    
    links.push({
      href,
      file: path.relative(path.join(__dirname, '..'), filePath),
      line: content.substring(0, match.index).split('\n').length
    });
  }
  
  return links;
}

// Check if a page exists
function pageExists(href) {
  // Remove query params and hash
  const cleanHref = href.split('?')[0].split('#')[0];
  
  // Root
  if (cleanHref === '/' || cleanHref === '') {
    return { exists: true, type: 'root' };
  }
  
  // Remove leading slash
  const pagePath = cleanHref.startsWith('/') ? cleanHref.slice(1) : cleanHref;
  
  // Check if it's a static file in public/
  const publicPath = path.join(PUBLIC_DIR, pagePath);
  if (fs.existsSync(publicPath)) {
    return { exists: true, type: 'static', path: publicPath };
  }
  
  // Check for page file (try multiple extensions)
  const possiblePagePaths = [
    path.join(PAGES_DIR, `${pagePath}.js`),
    path.join(PAGES_DIR, `${pagePath}.tsx`),
    path.join(PAGES_DIR, pagePath, 'index.js'),
    path.join(PAGES_DIR, pagePath, 'index.tsx'),
  ];
  
  for (const pagePath of possiblePagePaths) {
    if (fs.existsSync(pagePath)) {
      return { exists: true, type: 'page', path: pagePath };
    }
  }
  
  // Check if it's a dynamic route pattern
  if (pagePath.includes('[')) {
    // Extract the base path
    const basePath = pagePath.split('[')[0];
    const dynamicPagePaths = [
      path.join(PAGES_DIR, basePath, '[slug].js'),
      path.join(PAGES_DIR, basePath, '[slug].tsx'),
      path.join(PAGES_DIR, basePath, '[id].js'),
      path.join(PAGES_DIR, basePath, '[id].tsx'),
    ];
    
    for (const dynamicPath of dynamicPagePaths) {
      if (fs.existsSync(dynamicPath)) {
        return { exists: true, type: 'dynamic', path: dynamicPath };
      }
    }
  }
  
  // Special case: check if it's a known dynamic route
  const knownDynamicRoutes = [
    { pattern: /^\/restaurant\/.+/, page: '/pages/restaurant/[slug].js' },
    { pattern: /^\/cuisine\/.+/, page: '/pages/cuisine/[cuisine].js' },
    { pattern: /^\/location\/.+/, page: '/pages/location/[location].js' },
    { pattern: /^\/halal\/near-stations\/.+/, page: '/pages/halal/near-stations/[stationSlug].js' }
  ];
  
  for (const route of knownDynamicRoutes) {
    if (route.pattern.test(`/${pagePath}`)) {
      const fullPath = path.join(__dirname, '..', route.page);
      if (fs.existsSync(fullPath)) {
        return { exists: true, type: 'dynamic', path: fullPath };
      }
    }
  }
  
  return { exists: false, type: null };
}

// Recursively scan directory for .js/.tsx files
function scanDirectory(dir, files = []) {
  const entries = fs.readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    
    // Skip ignored patterns
    if (IGNORE_PATTERNS.some(pattern => pattern.test(fullPath))) {
      continue;
    }
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, files);
    } else if (entry.endsWith('.js') || entry.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('🔍 Scanning for broken links...\n');

// Scan all pages and components
const filesToScan = [
  ...scanDirectory(PAGES_DIR),
  ...scanDirectory(path.join(__dirname, '../components'))
];

const allLinks = [];
const brokenLinks = [];

for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf8');
  const links = extractLinks(content, file);
  allLinks.push(...links);
}

console.log(`Found ${allLinks.length} internal links\n`);

// Check each link
for (const link of allLinks) {
  const check = pageExists(link.href);
  
  if (!check.exists) {
    console.log(`❌ ${link.file}:${link.line}`);
    console.log(`   Link: ${link.href}`);
    console.log('');
    
    brokenLinks.push({
      href: link.href,
      file: link.file,
      line: link.line
    });
  }
}

// Summary
console.log('\n📊 Summary:\n');
console.log(`   Total links: ${allLinks.length}`);
console.log(`   ✅ Valid: ${allLinks.length - brokenLinks.length}`);
console.log(`   ❌ Broken: ${brokenLinks.length}\n`);

// Write report
const report = {
  generated_at: new Date().toISOString(),
  summary: {
    total: allLinks.length,
    valid: allLinks.length - brokenLinks.length,
    broken: brokenLinks.length
  },
  broken_links: brokenLinks
};

fs.mkdirSync(REPORTS_DIR, { recursive: true });
const reportPath = path.join(REPORTS_DIR, 'links.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📄 Report saved: ${reportPath}`);

if (brokenLinks.length > 0) {
  console.log('\n⚠️  Fix broken links before deployment');
  process.exit(1);
} else {
  console.log('\n✅ All internal links are valid!');
}

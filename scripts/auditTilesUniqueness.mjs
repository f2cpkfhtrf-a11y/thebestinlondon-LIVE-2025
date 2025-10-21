import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/tiles_uniqueness.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/tiles_uniqueness.md');

function fetchPage(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          ok: res.statusCode === 200,
          content: data
        });
      });
    }).on('error', () => {
      resolve({ url, status: 0, ok: false, content: '', error: 'Network error' });
    });
  });
}

function extractTileImages(content, pageType) {
  const imgMatches = content.match(/<img[^>]+src="([^"]+)"/gi) || [];
  const bgMatches = content.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/gi) || [];
  
  const imgUrls = imgMatches.map(match => {
    const src = match.match(/src="([^"]+)"/i);
    return src ? src[1] : null;
  }).filter(Boolean);
  
  const bgUrls = bgMatches.map(match => {
    const url = match.match(/url\(['"]?([^'"]+)['"]?\)/i);
    return url ? url[1] : null;
  }).filter(Boolean);
  
  const allUrls = [...imgUrls, ...bgUrls];
  
  // Filter based on page type
  switch (pageType) {
    case 'blog':
      return allUrls.filter(url => 
        url.includes('/images/blog/') || 
        url.includes('/images/tiles/') ||
        url.includes('/images/heroes/')
      );
    case 'cuisines':
      return allUrls.filter(url => 
        url.includes('/images/tiles/cuisines/') ||
        url.includes('/images/cuisines/')
      );
    case 'areas':
      return allUrls.filter(url => 
        url.includes('/images/tiles/areas/') ||
        url.includes('/images/areas/')
      );
    case 'stations':
      return allUrls.filter(url => 
        url.includes('/images/tiles/stations/') ||
        url.includes('/images/stations/')
      );
    default:
      return allUrls;
  }
}

function findDuplicates(images) {
  const counts = {};
  const duplicates = [];
  
  images.forEach(img => {
    counts[img] = (counts[img] || 0) + 1;
  });
  
  Object.entries(counts).forEach(([img, count]) => {
    if (count > 1) {
      duplicates.push({ image: img, count });
    }
  });
  
  return duplicates;
}

async function auditTilesUniqueness() {
  console.log('🔍 Starting tiles uniqueness audit...');
  
  const pages = [
    { url: '/blog', type: 'blog' },
    { url: '/cuisines', type: 'cuisines' },
    { url: '/areas', type: 'areas' }
  ];
  
  // Check if stations page exists
  try {
    const stationsPage = await fetchPage(`${BASE_URL}/stations`);
    if (stationsPage.ok) {
      pages.push({ url: '/stations', type: 'stations' });
    }
  } catch {
    // Stations page doesn't exist, skip
  }
  
  const results = [];
  
  for (const page of pages) {
    const url = `${BASE_URL}${page.url}`;
    console.log(`📄 Auditing: ${url}`);
    
    const pageData = await fetchPage(url);
    if (!pageData.ok) {
      results.push({
        url: page.url,
        type: page.type,
        status: 'FAIL',
        error: `HTTP ${pageData.status}`,
        images: [],
        duplicates: []
      });
      continue;
    }
    
    const images = extractTileImages(pageData.content, page.type);
    const duplicates = findDuplicates(images);
    
    results.push({
      url: page.url,
      type: page.type,
      status: duplicates.length > 0 ? 'FAIL' : 'PASS',
      images: images,
      duplicates: duplicates,
      uniqueCount: images.length - duplicates.reduce((sum, dup) => sum + (dup.count - 1), 0),
      totalCount: images.length
    });
  }

  const summary = {
    total: results.length,
    pass: results.filter(r => r.status === 'PASS').length,
    fail: results.filter(r => r.status === 'FAIL').length,
    totalImages: results.reduce((sum, r) => sum + r.totalCount, 0),
    totalDuplicates: results.reduce((sum, r) => sum + r.duplicates.length, 0),
    results: results
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Tiles Uniqueness Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Pages:** ${summary.total}
- **Passed:** ${summary.pass}
- **Failed:** ${summary.fail}
- **Total Images:** ${summary.totalImages}
- **Total Duplicates:** ${summary.totalDuplicates}

## Results

${results.map(r => `
### ${r.url} (${r.type})
- **Status:** ${r.status}
- **Total Images:** ${r.totalCount}
- **Unique Images:** ${r.uniqueCount}
- **Duplicates:** ${r.duplicates.length}
${r.duplicates.length > 0 ? `
**Duplicate Details:**
${r.duplicates.map(dup => `- ${dup.image} (used ${dup.count} times)`).join('\n')}
` : ''}
`).join('\n')}

## Issues Summary
${results.filter(r => r.status === 'FAIL').map(r => `
- **${r.url}:** ${r.duplicates.length} duplicate images found
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Tiles uniqueness audit complete: ${summary.pass}/${summary.total} passed`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditTilesUniqueness().then(result => {
    if (result.fail > 0) {
      console.log(`⚠️ ${result.fail} pages have duplicate tiles`);
      process.exit(1);
    }
  });
}

export { auditTilesUniqueness };

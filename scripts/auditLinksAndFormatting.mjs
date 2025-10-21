import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/audit_links_formatting.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/audit_links_formatting.md');

const ROUTES = [
  "/", "/restaurants", "/cuisines", "/areas", "/best-halal-restaurants-london",
  "/blog", "/faq",
  "/areas/soho", "/areas/southall", "/areas/ilford", "/areas/romford",
  "/italian", "/indian", "/pakistani", "/afghan"
];

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
          content: data,
          contentType: res.headers['content-type']
        });
      });
    }).on('error', () => {
      resolve({ url, status: 0, ok: false, content: '', error: 'Network error' });
    });
  });
}

function getRandomVenues(count = 10) {
  try {
    const venuesPath = path.join(ROOT, 'public/venues.json');
    if (!fs.existsSync(venuesPath)) return [];
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    return venues
      .filter(v => v.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map(v => `/restaurant/${v.slug}`);
  } catch {
    return [];
  }
}

function auditPage(page) {
  const { url, ok, content } = page;
  const issues = [];
  let status = 'PASS';

  if (!ok) {
    issues.push(`HTTP ${page.status} - Page not accessible`);
    status = 'FAIL';
    return { url, status, issues };
  }

  // Check for PageHero with visible text
  const pageHeroMatch = content.match(/<[^>]*class="[^"]*PageHero[^"]*"[^>]*>([\s\S]*?)<\/[^>]*>/i);
  if (!pageHeroMatch) {
    issues.push('PageHero component not found');
    status = 'FAIL';
  } else {
    const heroText = pageHeroMatch[1].replace(/<[^>]*>/g, '').trim();
    if (heroText.length < 10) {
      issues.push('PageHero has insufficient visible text');
      status = 'FAIL';
    }
  }

  // Check for local images
  const imgMatches = content.match(/<img[^>]+src="([^"]+)"/gi) || [];
  const bgMatches = content.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)/gi) || [];
  const allImages = [...imgMatches, ...bgMatches];
  
  const localImages = allImages.filter(img => {
    const src = img.match(/src="([^"]+)"/i) || img.match(/url\(['"]?([^'"]+)['"]?\)/i);
    return src && src[1].startsWith('/images/');
  });

  if (localImages.length === 0) {
    issues.push('No local images found (/images/ paths)');
    status = 'FAIL';
  }

  // Check H1 presence
  if (!content.includes('<h1')) {
    issues.push('H1 heading not found');
    status = 'FAIL';
  }

  // Check meta title
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    issues.push('Meta title not found');
    status = 'FAIL';
  }

  // Venue-specific checks
  if (url.includes('/restaurant/')) {
    const anchors = ['overview', 'menu', 'reviews', 'location', 'similar'];
    const missingAnchors = anchors.filter(anchor => !content.includes(`id="${anchor}"`));
    
    if (missingAnchors.length > 0) {
      issues.push(`Missing anchor IDs: ${missingAnchors.join(', ')}`);
      status = 'FAIL';
    }

    // Check FSA badge display rules
    const fsaBadgeMatch = content.match(/FSA[^<]*(\d+\/\d+)/i);
    if (fsaBadgeMatch) {
      const score = parseFloat(fsaBadgeMatch[1].split('/')[0]);
      if (score <= 0 || score > 5) {
        issues.push(`Invalid FSA score displayed: ${fsaBadgeMatch[1]}`);
        status = 'FAIL';
      }
    }
  }

  // Blog-specific checks
  if (url.includes('/blog') && !url.includes('/blog/')) {
    const paragraphs = content.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
    if (paragraphs.length < 3) {
      issues.push(`Insufficient paragraph content: ${paragraphs.length} paragraphs`);
      status = 'FAIL';
    }
  }

  // FAQ-specific checks
  if (url.includes('/faq')) {
    const qaPairs = content.match(/<[^>]*class="[^"]*question[^"]*"[^>]*>[\s\S]*?<[^>]*class="[^"]*answer[^"]*"[^>]*>/gi) || [];
    if (qaPairs.length === 0) {
      issues.push('No Q/A pairs found on FAQ page');
      status = 'FAIL';
    }
  }

  return { url, status, issues, localImages: localImages.length };
}

async function auditLinksAndFormatting() {
  console.log('🔍 Starting links and formatting audit...');
  
  const allRoutes = [...ROUTES, ...getRandomVenues()];
  const results = [];
  
  for (const route of allRoutes) {
    const url = `${BASE_URL}${route}`;
    console.log(`📄 Auditing: ${url}`);
    
    const page = await fetchPage(url);
    const audit = auditPage(page);
    results.push(audit);
  }

  const summary = {
    total: results.length,
    pass: results.filter(r => r.status === 'PASS').length,
    fail: results.filter(r => r.status === 'FAIL').length,
    results: results
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Links and Formatting Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Pages:** ${summary.total}
- **Passed:** ${summary.pass}
- **Failed:** ${summary.fail}
- **Success Rate:** ${((summary.pass / summary.total) * 100).toFixed(1)}%

## Results

${results.map(r => `
### ${r.url}
- **Status:** ${r.status}
- **Issues:** ${r.issues.length > 0 ? r.issues.join(', ') : 'None'}
- **Local Images:** ${r.localImages || 0}
`).join('\n')}

## Issues Summary
${results.filter(r => r.status === 'FAIL').map(r => `
- **${r.url}:** ${r.issues.join(', ')}
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Links and formatting audit complete: ${summary.pass}/${summary.total} passed`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditLinksAndFormatting().then(result => {
    if (result.fail > 0) {
      console.log(`⚠️ ${result.fail} pages failed audit`);
      process.exit(1);
    }
  });
}

export { auditLinksAndFormatting };

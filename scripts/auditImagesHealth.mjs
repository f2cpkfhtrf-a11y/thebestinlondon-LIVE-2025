import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/images_health.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/images_health.md');

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
          content: data
        });
      });
    }).on('error', () => {
      resolve({ url, status: 0, ok: false, content: '', error: 'Network error' });
    });
  });
}

function checkImageHealth(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      const contentType = res.headers['content-type'];
      const contentLength = parseInt(res.headers['content-length'] || '0', 10);
      
      resolve({
        url,
        status: res.statusCode,
        ok: res.statusCode === 200,
        contentType,
        contentLength,
        isWebP: contentType === 'image/webp',
        isLocal: url.includes('/images/'),
        isLargeEnough: contentLength >= 50 * 1024, // 50KB
        isLogo: url.includes('/images/brand/') || url.endsWith('.svg')
      });
    });
    
    req.on('error', () => {
      resolve({ url, status: 0, ok: false, error: 'Network error' });
    });
    
    req.end();
  });
}

function extractImageUrls(content) {
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
  
  return [...imgUrls, ...bgUrls];
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

async function auditImagesHealth() {
  console.log('🔍 Starting images health audit...');
  
  const allRoutes = [...ROUTES, ...getRandomVenues()];
  const allImageUrls = new Set();
  const pageResults = [];
  
  // Collect all image URLs from pages
  for (const route of allRoutes) {
    const url = `${BASE_URL}${route}`;
    console.log(`📄 Scanning: ${url}`);
    
    const page = await fetchPage(url);
    if (page.ok) {
      const imageUrls = extractImageUrls(page.content);
      imageUrls.forEach(imgUrl => allImageUrls.add(imgUrl));
      
      pageResults.push({
        url,
        imageCount: imageUrls.length,
        imageUrls: imageUrls
      });
    }
  }

  // Check health of each unique image
  console.log(`🔍 Checking health of ${allImageUrls.size} unique images...`);
  const imageHealthResults = [];
  
  for (const imageUrl of allImageUrls) {
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${BASE_URL}${imageUrl}`;
    const health = await checkImageHealth(fullUrl);
    imageHealthResults.push(health);
  }

  // Analyze results
  const analysis = {
    totalImages: imageHealthResults.length,
    accessible: imageHealthResults.filter(img => img.ok).length,
    localOnly: imageHealthResults.filter(img => img.isLocal).length,
    webpFormat: imageHealthResults.filter(img => img.isWebP).length,
    largeEnough: imageHealthResults.filter(img => img.isLargeEnough || img.isLogo).length,
    duplicates: 0, // Will be calculated below
    issues: {
      inaccessible: imageHealthResults.filter(img => !img.ok),
      nonLocal: imageHealthResults.filter(img => !img.isLocal),
      nonWebP: imageHealthResults.filter(img => !img.isWebP && !img.isLogo),
      tooSmall: imageHealthResults.filter(img => !img.isLargeEnough && !img.isLogo)
    }
  };

  // Check for blog tile duplicates
  const blogPageResults = pageResults.filter(p => p.url.includes('/blog') && !p.url.includes('/blog/'));
  if (blogPageResults.length > 0) {
    const blogImageUrls = blogPageResults[0].imageUrls;
    const uniqueBlogImages = new Set(blogImageUrls);
    analysis.duplicates = blogImageUrls.length - uniqueBlogImages.size;
  }

  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    analysis,
    pageResults,
    imageHealthResults
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Images Health Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Images:** ${analysis.totalImages}
- **Accessible:** ${analysis.accessible} (${((analysis.accessible / analysis.totalImages) * 100).toFixed(1)}%)
- **Local Only:** ${analysis.localOnly} (${((analysis.localOnly / analysis.totalImages) * 100).toFixed(1)}%)
- **WebP Format:** ${analysis.webpFormat} (${((analysis.webpFormat / analysis.totalImages) * 100).toFixed(1)}%)
- **Large Enough:** ${analysis.largeEnough} (${((analysis.largeEnough / analysis.totalImages) * 100).toFixed(1)}%)
- **Blog Tile Duplicates:** ${analysis.duplicates}

## Issues

### Inaccessible Images (${analysis.issues.inaccessible.length})
${analysis.issues.inaccessible.map(img => `- ${img.url} (HTTP ${img.status})`).join('\n')}

### Non-Local Images (${analysis.issues.nonLocal.length})
${analysis.issues.nonLocal.map(img => `- ${img.url}`).join('\n')}

### Non-WebP Images (${analysis.issues.nonWebP.length})
${analysis.issues.nonWebP.map(img => `- ${img.url}`).join('\n')}

### Too Small Images (${analysis.issues.tooSmall.length})
${analysis.issues.tooSmall.map(img => `- ${img.url} (${(img.contentLength / 1024).toFixed(1)}KB)`).join('\n')}

## Page Results
${pageResults.map(page => `
### ${page.url}
- **Images Found:** ${page.imageCount}
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Images health audit complete: ${analysis.accessible}/${analysis.totalImages} accessible`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditImagesHealth().then(result => {
    const issues = result.analysis.issues;
    const totalIssues = issues.inaccessible.length + issues.nonLocal.length + issues.nonWebP.length + issues.tooSmall.length;
    if (totalIssues > 0) {
      console.log(`⚠️ ${totalIssues} image issues found`);
      process.exit(1);
    }
  });
}

export { auditImagesHealth };

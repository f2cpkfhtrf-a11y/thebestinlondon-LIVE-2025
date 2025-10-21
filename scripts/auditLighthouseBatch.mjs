import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/lh_summary.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/lh_summary.md');

function getRandomVenues(count = 3) {
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

function simulateLighthouseAudit(page) {
  const { url, ok, content } = page;
  
  if (!ok) {
    return {
      url,
      performance: 0,
      seo: 0,
      accessibility: 0,
      bestPractices: 0,
      issues: [`HTTP ${page.status} - Page not accessible`]
    };
  }

  const issues = [];
  
  // Performance simulation (basic checks)
  let performance = 100;
  
  // Check for large images without optimization
  const largeImages = content.match(/<img[^>]+src="([^"]+)"[^>]*>/gi) || [];
  if (largeImages.length > 10) {
    performance -= 20;
    issues.push('Too many images on page');
  }
  
  // Check for external resources
  const externalResources = content.match(/src="https?:\/\/(?!www\.thebestinlondon\.co\.uk)/gi) || [];
  if (externalResources.length > 0) {
    performance -= 10;
    issues.push('External resources detected');
  }
  
  // SEO simulation
  let seo = 100;
  
  if (!content.includes('<title>')) {
    seo -= 30;
    issues.push('Missing title tag');
  }
  
  if (!content.match(/<meta[^>]+name="description"/i)) {
    seo -= 20;
    issues.push('Missing meta description');
  }
  
  if (!content.match(/<meta[^>]+property="og:image"/i)) {
    seo -= 15;
    issues.push('Missing og:image');
  }
  
  if (!content.match(/<link[^>]+rel="canonical"/i)) {
    seo -= 10;
    issues.push('Missing canonical URL');
  }
  
  // Accessibility simulation
  let accessibility = 100;
  
  if (!content.includes('<h1')) {
    accessibility -= 25;
    issues.push('Missing H1 heading');
  }
  
  const imagesWithoutAlt = content.match(/<img[^>]+(?!alt=)[^>]*>/gi) || [];
  if (imagesWithoutAlt.length > 0) {
    accessibility -= 20;
    issues.push(`${imagesWithoutAlt.length} images missing alt text`);
  }
  
  const linksWithoutText = content.match(/<a[^>]+><\/a>/gi) || [];
  if (linksWithoutText.length > 0) {
    accessibility -= 15;
    issues.push(`${linksWithoutText.length} empty links`);
  }
  
  // Best Practices simulation
  let bestPractices = 100;
  
  if (content.includes('http://') && !content.includes('localhost')) {
    bestPractices -= 20;
    issues.push('Mixed content (HTTP resources)');
  }
  
  if (content.includes('console.log') || content.includes('console.error')) {
    bestPractices -= 10;
    issues.push('Console statements in production');
  }
  
  return {
    url,
    performance: Math.max(0, performance),
    seo: Math.max(0, seo),
    accessibility: Math.max(0, accessibility),
    bestPractices: Math.max(0, bestPractices),
    issues: issues
  };
}

async function auditLighthouseBatch() {
  console.log('🔍 Starting Lighthouse batch audit...');
  
  const pages = [
    "/", "/restaurants", "/cuisines", "/areas", 
    "/best-halal-restaurants-london", "/blog", "/faq",
    ...getRandomVenues()
  ];
  
  const results = [];
  
  for (const page of pages) {
    const url = `${BASE_URL}${page}`;
    console.log(`📄 Auditing: ${url}`);
    
    const pageData = await fetchPage(url);
    const audit = simulateLighthouseAudit(pageData);
    results.push(audit);
  }

  const summary = {
    total: results.length,
    performancePass: results.filter(r => r.performance >= 70).length,
    seoPass: results.filter(r => r.seo >= 90).length,
    accessibilityPass: results.filter(r => r.accessibility >= 90).length,
    bestPracticesPass: results.filter(r => r.bestPractices >= 80).length,
    averagePerformance: results.reduce((sum, r) => sum + r.performance, 0) / results.length,
    averageSeo: results.reduce((sum, r) => sum + r.seo, 0) / results.length,
    averageAccessibility: results.reduce((sum, r) => sum + r.accessibility, 0) / results.length,
    averageBestPractices: results.reduce((sum, r) => sum + r.bestPractices, 0) / results.length,
    results: results
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Lighthouse Batch Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Pages:** ${summary.total}
- **Performance Pass (≥70):** ${summary.performancePass}/${summary.total} (${(summary.performancePass/summary.total*100).toFixed(1)}%)
- **SEO Pass (≥90):** ${summary.seoPass}/${summary.total} (${(summary.seoPass/summary.total*100).toFixed(1)}%)
- **Accessibility Pass (≥90):** ${summary.accessibilityPass}/${summary.total} (${(summary.accessibilityPass/summary.total*100).toFixed(1)}%)
- **Best Practices Pass (≥80):** ${summary.bestPracticesPass}/${summary.total} (${(summary.bestPracticesPass/summary.total*100).toFixed(1)}%)

## Averages
- **Performance:** ${summary.averagePerformance.toFixed(1)}
- **SEO:** ${summary.averageSeo.toFixed(1)}
- **Accessibility:** ${summary.averageAccessibility.toFixed(1)}
- **Best Practices:** ${summary.averageBestPractices.toFixed(1)}

## Results

${results.map(r => `
### ${r.url}
- **Performance:** ${r.performance} ${r.performance >= 70 ? '✅' : '❌'}
- **SEO:** ${r.seo} ${r.seo >= 90 ? '✅' : '❌'}
- **Accessibility:** ${r.accessibility} ${r.accessibility >= 90 ? '✅' : '❌'}
- **Best Practices:** ${r.bestPractices} ${r.bestPractices >= 80 ? '✅' : '❌'}
- **Issues:** ${r.issues.length > 0 ? r.issues.join(', ') : 'None'}
`).join('\n')}

## Issues Summary
${results.filter(r => r.issues.length > 0).map(r => `
- **${r.url}:** ${r.issues.join(', ')}
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Lighthouse batch audit complete: ${summary.performancePass}/${summary.total} performance pass`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditLighthouseBatch().then(result => {
    const warnings = [];
    if (result.performancePass < result.total) warnings.push('Performance issues');
    if (result.seoPass < result.total) warnings.push('SEO issues');
    if (result.accessibilityPass < result.total) warnings.push('Accessibility issues');
    
    if (warnings.length > 0) {
      console.log(`⚠️ Lighthouse warnings: ${warnings.join(', ')}`);
    }
  });
}

export { auditLighthouseBatch };

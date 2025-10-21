import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/seo_jsonld_audit.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/seo_jsonld_audit.md');

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

function getRandomItems(data, count) {
  if (!Array.isArray(data)) return [];
  return data
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function getRandomBlogs(count = 8) {
  try {
    const blogDir = path.join(ROOT, 'content/blog');
    if (!fs.existsSync(blogDir)) return [];
    
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
    return getRandomItems(files, count).map(file => `/blog/${file.replace('.json', '')}`);
  } catch {
    return [];
  }
}

function getRandomFAQs(count = 8) {
  try {
    const faqDir = path.join(ROOT, 'content/faq');
    if (!fs.existsSync(faqDir)) return [];
    
    const files = fs.readdirSync(faqDir).filter(f => f.endsWith('.json'));
    return getRandomItems(files, count).map(file => `/faq/${file.replace('.json', '')}`);
  } catch {
    return [];
  }
}

function getRandomVenues(count = 10) {
  try {
    const venuesPath = path.join(ROOT, 'public/venues.json');
    if (!fs.existsSync(venuesPath)) return [];
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    return getRandomItems(venues, count)
      .filter(v => v.slug)
      .map(v => `/restaurant/${v.slug}`);
  } catch {
    return [];
  }
}

function auditSEOAndJsonLD(page) {
  const { url, ok, content } = page;
  const issues = [];
  let status = 'PASS';

  if (!ok) {
    issues.push(`HTTP ${page.status} - Page not accessible`);
    status = 'FAIL';
    return { url, status, issues, seo: {}, jsonld: {} };
  }

  const seo = {
    hasTitle: !!content.match(/<title>([^<]+)<\/title>/i),
    hasMetaDescription: !!content.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i),
    hasCanonical: !!content.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i),
    hasOgImage: !!content.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i),
    hasTwitterImage: !!content.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i),
    canonicalIsAbsolute: false,
    ogImageIsAbsolute: false,
    ogImageIsLocal: false,
    twitterImageIsAbsolute: false,
    twitterImageIsLocal: false
  };

  // Check canonical URL
  const canonicalMatch = content.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  if (canonicalMatch) {
    seo.canonicalIsAbsolute = canonicalMatch[1].startsWith('http');
  }

  // Check og:image
  const ogImageMatch = content.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
  if (ogImageMatch) {
    seo.ogImageIsAbsolute = ogImageMatch[1].startsWith('http');
    seo.ogImageIsLocal = ogImageMatch[1].includes('/images/');
  }

  // Check twitter:image
  const twitterImageMatch = content.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i);
  if (twitterImageMatch) {
    seo.twitterImageIsAbsolute = twitterImageMatch[1].startsWith('http');
    seo.twitterImageIsLocal = twitterImageMatch[1].includes('/images/');
  }

  // Extract JSON-LD schemas
  const jsonldMatches = content.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const jsonldSchemas = jsonldMatches.map(match => {
    const contentMatch = match.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (contentMatch) {
      try {
        return JSON.parse(contentMatch[1]);
      } catch {
        return null;
      }
    }
    return null;
  }).filter(Boolean);

  const jsonld = {
    schemasFound: jsonldSchemas.length,
    hasBlogPosting: jsonldSchemas.some(schema => schema['@type'] === 'BlogPosting'),
    hasFAQPage: jsonldSchemas.some(schema => schema['@type'] === 'FAQPage'),
    hasRestaurant: jsonldSchemas.some(schema => schema['@type'] === 'Restaurant'),
    hasOrganization: jsonldSchemas.some(schema => schema['@type'] === 'Organization'),
    schemas: jsonldSchemas
  };

  // Validate based on page type
  if (url.includes('/blog/')) {
    if (!jsonld.hasBlogPosting) {
      issues.push('Missing BlogPosting schema');
      status = 'FAIL';
    }
  }

  if (url.includes('/faq')) {
    if (!jsonld.hasFAQPage) {
      issues.push('Missing FAQPage schema');
      status = 'FAIL';
    }
  }

  if (url.includes('/restaurant/')) {
    if (!jsonld.hasRestaurant) {
      issues.push('Missing Restaurant schema');
      status = 'FAIL';
    }
  }

  // Check SEO requirements
  if (!seo.hasTitle) {
    issues.push('Missing title tag');
    status = 'FAIL';
  }

  if (!seo.hasMetaDescription) {
    issues.push('Missing meta description');
    status = 'FAIL';
  }

  if (seo.hasCanonical && !seo.canonicalIsAbsolute) {
    issues.push('Canonical URL is not absolute');
    status = 'FAIL';
  }

  if (seo.hasOgImage && !seo.ogImageIsAbsolute) {
    issues.push('og:image is not absolute');
    status = 'FAIL';
  }

  if (seo.hasOgImage && !seo.ogImageIsLocal) {
    issues.push('og:image is not local');
    status = 'FAIL';
  }

  if (seo.hasTwitterImage && !seo.twitterImageIsAbsolute) {
    issues.push('twitter:image is not absolute');
    status = 'FAIL';
  }

  if (seo.hasTwitterImage && !seo.twitterImageIsLocal) {
    issues.push('twitter:image is not local');
    status = 'FAIL';
  }

  return { url, status, issues, seo, jsonld };
}

async function auditSEOJsonLD() {
  console.log('🔍 Starting SEO and JSON-LD audit...');
  
  const allRoutes = [
    ...getRandomBlogs(),
    ...getRandomFAQs(),
    ...getRandomVenues()
  ];
  
  const results = [];
  
  for (const route of allRoutes) {
    const url = `${BASE_URL}${route}`;
    console.log(`📄 Auditing: ${url}`);
    
    const page = await fetchPage(url);
    const audit = auditSEOAndJsonLD(page);
    results.push(audit);
  }

  const summary = {
    total: results.length,
    pass: results.filter(r => r.status === 'PASS').length,
    fail: results.filter(r => r.status === 'FAIL').length,
    seoSummary: {
      hasTitle: results.filter(r => r.seo.hasTitle).length,
      hasMetaDescription: results.filter(r => r.seo.hasMetaDescription).length,
      hasCanonical: results.filter(r => r.seo.hasCanonical).length,
      hasOgImage: results.filter(r => r.seo.hasOgImage).length,
      hasTwitterImage: results.filter(r => r.seo.hasTwitterImage).length,
      canonicalAbsolute: results.filter(r => r.seo.canonicalIsAbsolute).length,
      ogImageAbsolute: results.filter(r => r.seo.ogImageIsAbsolute).length,
      ogImageLocal: results.filter(r => r.seo.ogImageIsLocal).length,
      twitterImageAbsolute: results.filter(r => r.seo.twitterImageIsAbsolute).length,
      twitterImageLocal: results.filter(r => r.seo.twitterImageIsLocal).length
    },
    jsonldSummary: {
      totalSchemas: results.reduce((sum, r) => sum + r.jsonld.schemasFound, 0),
      blogPostingSchemas: results.filter(r => r.jsonld.hasBlogPosting).length,
      faqPageSchemas: results.filter(r => r.jsonld.hasFAQPage).length,
      restaurantSchemas: results.filter(r => r.jsonld.hasRestaurant).length,
      organizationSchemas: results.filter(r => r.jsonld.hasOrganization).length
    },
    results: results
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# SEO and JSON-LD Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Pages:** ${summary.total}
- **Passed:** ${summary.pass}
- **Failed:** ${summary.fail}
- **Success Rate:** ${((summary.pass / summary.total) * 100).toFixed(1)}%

## SEO Summary
- **Has Title:** ${summary.seoSummary.hasTitle}/${summary.total}
- **Has Meta Description:** ${summary.seoSummary.hasMetaDescription}/${summary.total}
- **Has Canonical:** ${summary.seoSummary.hasCanonical}/${summary.total}
- **Has og:image:** ${summary.seoSummary.hasOgImage}/${summary.total}
- **Has twitter:image:** ${summary.seoSummary.hasTwitterImage}/${summary.total}
- **Canonical Absolute:** ${summary.seoSummary.canonicalAbsolute}/${summary.seoSummary.hasCanonical}
- **og:image Absolute:** ${summary.seoSummary.ogImageAbsolute}/${summary.seoSummary.hasOgImage}
- **og:image Local:** ${summary.seoSummary.ogImageLocal}/${summary.seoSummary.hasOgImage}
- **twitter:image Absolute:** ${summary.seoSummary.twitterImageAbsolute}/${summary.seoSummary.hasTwitterImage}
- **twitter:image Local:** ${summary.seoSummary.twitterImageLocal}/${summary.seoSummary.hasTwitterImage}

## JSON-LD Summary
- **Total Schemas:** ${summary.jsonldSummary.totalSchemas}
- **BlogPosting Schemas:** ${summary.jsonldSummary.blogPostingSchemas}
- **FAQPage Schemas:** ${summary.jsonldSummary.faqPageSchemas}
- **Restaurant Schemas:** ${summary.jsonldSummary.restaurantSchemas}
- **Organization Schemas:** ${summary.jsonldSummary.organizationSchemas}

## Results

${results.map(r => `
### ${r.url}
- **Status:** ${r.status}
- **Issues:** ${r.issues.length > 0 ? r.issues.join(', ') : 'None'}
- **SEO:** Title: ${r.seo.hasTitle ? '✅' : '❌'}, Meta: ${r.seo.hasMetaDescription ? '✅' : '❌'}, Canonical: ${r.seo.hasCanonical ? '✅' : '❌'}
- **JSON-LD:** ${r.jsonld.schemasFound} schemas found
`).join('\n')}

## Issues Summary
${results.filter(r => r.status === 'FAIL').map(r => `
- **${r.url}:** ${r.issues.join(', ')}
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ SEO and JSON-LD audit complete: ${summary.pass}/${summary.total} passed`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditSEOJsonLD().then(result => {
    if (result.fail > 0) {
      console.log(`⚠️ ${result.fail} pages failed audit`);
      process.exit(1);
    }
  });
}

export { auditSEOJsonLD };

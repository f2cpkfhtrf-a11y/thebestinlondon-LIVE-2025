import fs from 'fs';
import path from 'path';
import https from 'https';

interface SEOAuditResult {
  url: string;
  hasTitle: boolean;
  hasMetaDescription: boolean;
  hasCanonical: boolean;
  hasOgImage: boolean;
  hasTwitterImage: boolean;
  hasJsonLd: boolean;
  titleContent?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  twitterImageUrl?: string;
  jsonLdTypes?: string[];
  issues: string[];
}

function fetchPageContent(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = https.request(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
    
    request.end();
  });
}

function parseHTMLContent(html: string, baseUrl: string): Partial<SEOAuditResult> {
  const issues: string[] = [];
  let hasTitle = false;
  let hasMetaDescription = false;
  let hasCanonical = false;
  let hasOgImage = false;
  let hasTwitterImage = false;
  let hasJsonLd = false;
  
  let titleContent = '';
  let metaDescription = '';
  let canonicalUrl = '';
  let ogImageUrl = '';
  let twitterImageUrl = '';
  const jsonLdTypes: string[] = [];

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    hasTitle = true;
    titleContent = titleMatch[1].trim();
    if (titleContent.length < 30) {
      issues.push(`Title too short: "${titleContent}"`);
    }
    if (titleContent.length > 60) {
      issues.push(`Title too long: "${titleContent}"`);
    }
  } else {
    issues.push('Missing title tag');
  }

  // Extract meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (metaDescMatch) {
    hasMetaDescription = true;
    metaDescription = metaDescMatch[1].trim();
    if (metaDescription.length < 120) {
      issues.push(`Meta description too short: "${metaDescription}"`);
    }
    if (metaDescription.length > 160) {
      issues.push(`Meta description too long: "${metaDescription}"`);
    }
  } else {
    issues.push('Missing meta description');
  }

  // Extract canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  if (canonicalMatch) {
    hasCanonical = true;
    canonicalUrl = canonicalMatch[1];
    if (!canonicalUrl.startsWith('https://')) {
      issues.push(`Canonical URL not absolute: ${canonicalUrl}`);
    }
  } else {
    issues.push('Missing canonical link');
  }

  // Extract og:image
  const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (ogImageMatch) {
    hasOgImage = true;
    ogImageUrl = ogImageMatch[1];
    if (ogImageUrl.includes('unsplash.com') || ogImageUrl.includes('googleusercontent.com')) {
      issues.push(`External og:image URL detected: ${ogImageUrl}`);
    }
  } else {
    issues.push('Missing og:image');
  }

  // Extract twitter:image
  const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (twitterImageMatch) {
    hasTwitterImage = true;
    twitterImageUrl = twitterImageMatch[1];
    if (twitterImageUrl.includes('unsplash.com') || twitterImageUrl.includes('googleusercontent.com')) {
      issues.push(`External twitter:image URL detected: ${twitterImageUrl}`);
    }
  } else {
    issues.push('Missing twitter:image');
  }

  // Extract JSON-LD
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  if (jsonLdMatches && jsonLdMatches.length > 0) {
    hasJsonLd = true;
    jsonLdMatches.forEach(match => {
      const contentMatch = match.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      if (contentMatch) {
        try {
          const jsonContent = JSON.parse(contentMatch[1]);
          if (jsonContent['@type']) {
            jsonLdTypes.push(jsonContent['@type']);
          }
        } catch (e) {
          issues.push('Invalid JSON-LD found');
        }
      }
    });
  } else {
    issues.push('Missing JSON-LD schema');
  }

  return {
    hasTitle,
    hasMetaDescription,
    hasCanonical,
    hasOgImage,
    hasTwitterImage,
    hasJsonLd,
    titleContent,
    metaDescription,
    canonicalUrl,
    ogImageUrl,
    twitterImageUrl,
    jsonLdTypes,
    issues
  };
}

async function auditSEO() {
  console.log('🔍 Starting SEO audit...');
  
  const baseUrl = 'https://www.thebestinlondon.co.uk';
  const urlsToTest = [
    '/',
    '/restaurants',
    '/areas',
    '/areas/whitechapel',
    '/cuisines',
    '/italian',
    '/best-halal-restaurants-london',
    '/restaurant/dishoom-covent-garden-OZ6OHOJw'
  ];

  const results: SEOAuditResult[] = [];

  for (const url of urlsToTest) {
    const fullUrl = `${baseUrl}${url}`;
    console.log(`Testing ${fullUrl}...`);
    
    try {
      const html = await fetchPageContent(fullUrl);
      const parsed = parseHTMLContent(html, fullUrl);
      
      results.push({
        url,
        ...parsed,
        issues: parsed.issues || []
      } as SEOAuditResult);
    } catch (error) {
      console.log(`❌ Failed to fetch ${fullUrl}: ${error}`);
      results.push({
        url,
        hasTitle: false,
        hasMetaDescription: false,
        hasCanonical: false,
        hasOgImage: false,
        hasTwitterImage: false,
        hasJsonLd: false,
        issues: [`Failed to fetch page: ${error}`]
      });
    }
  }

  // Calculate summary statistics
  const totalPages = results.length;
  const pagesWithTitle = results.filter(r => r.hasTitle).length;
  const pagesWithMetaDescription = results.filter(r => r.hasMetaDescription).length;
  const pagesWithCanonical = results.filter(r => r.hasCanonical).length;
  const pagesWithOgImage = results.filter(r => r.hasOgImage).length;
  const pagesWithTwitterImage = results.filter(r => r.hasTwitterImage).length;
  const pagesWithJsonLd = results.filter(r => r.hasJsonLd).length;

  console.log('\n📊 SEO AUDIT SUMMARY');
  console.log('=====================');
  console.log(`📄 Total pages tested: ${totalPages}`);
  console.log(`📝 Pages with title: ${pagesWithTitle}/${totalPages} (${Math.round(pagesWithTitle/totalPages*100)}%)`);
  console.log(`📋 Pages with meta description: ${pagesWithMetaDescription}/${totalPages} (${Math.round(pagesWithMetaDescription/totalPages*100)}%)`);
  console.log(`🔗 Pages with canonical: ${pagesWithCanonical}/${totalPages} (${Math.round(pagesWithCanonical/totalPages*100)}%)`);
  console.log(`🖼️  Pages with og:image: ${pagesWithOgImage}/${totalPages} (${Math.round(pagesWithOgImage/totalPages*100)}%)`);
  console.log(`🐦 Pages with twitter:image: ${pagesWithTwitterImage}/${totalPages} (${Math.round(pagesWithTwitterImage/totalPages*100)}%)`);
  console.log(`📊 Pages with JSON-LD: ${pagesWithJsonLd}/${totalPages} (${Math.round(pagesWithJsonLd/totalPages*100)}%)`);

  // Report issues
  const pagesWithIssues = results.filter(r => r.issues.length > 0);
  if (pagesWithIssues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:');
    pagesWithIssues.forEach(result => {
      console.log(`\n🔍 ${result.url}:`);
      result.issues.forEach(issue => {
        console.log(`   ❌ ${issue}`);
      });
    });
  }

  // Save results
  const reportPath = 'reports/seo_audit.json';
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    summary: {
      totalPages,
      pagesWithTitle,
      pagesWithMetaDescription,
      pagesWithCanonical,
      pagesWithOgImage,
      pagesWithTwitterImage,
      pagesWithJsonLd
    },
    results
  }, null, 2));

  console.log(`\n✅ SEO audit complete! Results saved to ${reportPath}`);
}

auditSEO().catch(console.error);

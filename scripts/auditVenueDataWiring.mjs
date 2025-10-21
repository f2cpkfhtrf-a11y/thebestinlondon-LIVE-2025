import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ROOT = process.cwd();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const REPORT_PATH = path.join(ROOT, 'reports/venue_wiring.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/venue_wiring.md');

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

function getRandomVenues(count = 30) {
  try {
    const venuesPath = path.join(ROOT, 'public/venues.json');
    if (!fs.existsSync(venuesPath)) return [];
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    return venues
      .filter(v => v.slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  } catch {
    return [];
  }
}

function auditVenuePage(page, venue) {
  const { url, ok, content } = page;
  const issues = [];
  let status = 'PASS';

  if (!ok) {
    issues.push(`HTTP ${page.status} - Page not accessible`);
    status = 'FAIL';
    return { url, venue: venue.slug, status, issues, hero: {}, tabs: {}, fsa: {} };
  }

  // Check hero presence and source
  const heroImgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*hero[^"]*"/i) ||
                      content.match(/background-image:\s*url\(['"]?([^'"]+)['"]?\)[^>]*class="[^"]*hero[^"]*"/i);
  
  const hero = {
    present: !!heroImgMatch,
    src: heroImgMatch ? heroImgMatch[1] : null,
    isWhite: false,
    isBlank: false,
    source: 'unknown'
  };

  if (hero.present) {
    hero.isWhite = hero.src.includes('white') || hero.src.includes('blank') || hero.src.includes('placeholder');
    hero.isBlank = hero.src.includes('blank') || hero.src.includes('placeholder');
    
    // Determine source based on path
    if (hero.src.includes('/venues/') && hero.src.includes('/card')) {
      hero.source = 'card';
    } else if (hero.src.includes('/venues/') && hero.src.includes('/hero')) {
      hero.source = 'hero';
    } else if (hero.src.includes('/images/venues/')) {
      hero.source = 'first_image';
    } else if (hero.src.includes('/tiles/cuisines/')) {
      hero.source = 'cuisine_tile';
    } else if (hero.src.includes('/tiles/areas/')) {
      hero.source = 'area_tile';
    } else if (hero.src.includes('/heroes/site-default')) {
      hero.source = 'site_default';
    }
  } else {
    issues.push('Hero image not found');
    status = 'FAIL';
  }

  if (hero.isWhite || hero.isBlank) {
    issues.push(`Hero image is white/blank: ${hero.src}`);
    status = 'FAIL';
  }

  // Check tab anchors
  const anchors = ['overview', 'menu', 'reviews', 'location', 'similar'];
  const tabs = {
    anchorsPresent: anchors.filter(anchor => content.includes(`id="${anchor}"`)),
    anchorsMissing: anchors.filter(anchor => !content.includes(`id="${anchor}"`)),
    tabLinksPresent: content.includes('RestaurantDetailTabs') || content.includes('HeroTabs')
  };

  if (tabs.anchorsMissing.length > 0) {
    issues.push(`Missing tab anchors: ${tabs.anchorsMissing.join(', ')}`);
    status = 'FAIL';
  }

  if (!tabs.tabLinksPresent) {
    issues.push('Tab navigation component not found');
    status = 'FAIL';
  }

  // Check reviews section
  const reviewsPresent = content.includes('id="reviews"') && 
                        (content.includes('reviews') || content.includes('rating') || content.includes('placeholder'));
  
  if (!reviewsPresent) {
    issues.push('Reviews section not found or empty');
    status = 'FAIL';
  }

  // Check FSA badge display rules
  const fsaBadgeMatch = content.match(/FSA[^<]*(\d+\/\d+)/i);
  const fsaRatingMatch = content.match(/fsa[^>]*>(\d+)/i);
  
  const fsa = {
    badgePresent: !!fsaBadgeMatch,
    ratingPresent: !!fsaRatingMatch,
    badgeValue: fsaBadgeMatch ? fsaBadgeMatch[1] : null,
    ratingValue: fsaRatingMatch ? parseInt(fsaRatingMatch[1]) : null,
    isValid: true
  };

  if (fsa.badgePresent) {
    const score = parseFloat(fsa.badgeValue.split('/')[0]);
    fsa.isValid = score > 0 && score <= 5;
    
    if (!fsa.isValid) {
      issues.push(`Invalid FSA score displayed: ${fsa.badgeValue}`);
      status = 'FAIL';
    }
  }

  if (fsa.ratingPresent && (fsa.ratingValue <= 0 || fsa.ratingValue > 5)) {
    issues.push(`Invalid FSA rating: ${fsa.ratingValue}`);
    status = 'FAIL';
  }

  return { url, venue: venue.slug, status, issues, hero, tabs, fsa };
}

async function auditVenueDataWiring() {
  console.log('🔍 Starting venue data wiring audit...');
  
  const venues = getRandomVenues();
  if (venues.length === 0) {
    console.log('❌ No venues found in venues.json');
    return { total: 0, pass: 0, fail: 0, results: [] };
  }
  
  const results = [];
  
  for (const venue of venues) {
    const url = `${BASE_URL}/restaurant/${venue.slug}`;
    console.log(`📄 Auditing: ${url}`);
    
    const page = await fetchPage(url);
    const audit = auditVenuePage(page, venue);
    results.push(audit);
  }

  const summary = {
    total: results.length,
    pass: results.filter(r => r.status === 'PASS').length,
    fail: results.filter(r => r.status === 'FAIL').length,
    heroSources: {},
    tabIssues: results.filter(r => r.tabs.anchorsMissing.length > 0).length,
    fsaIssues: results.filter(r => !r.fsa.isValid).length,
    results: results
  };

  // Count hero sources
  results.forEach(r => {
    if (r.hero.source) {
      summary.heroSources[r.hero.source] = (summary.heroSources[r.hero.source] || 0) + 1;
    }
  });

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Venue Data Wiring Audit Report

**Generated:** ${new Date().toISOString()}
**Base URL:** ${BASE_URL}

## Summary
- **Total Venues:** ${summary.total}
- **Passed:** ${summary.pass}
- **Failed:** ${summary.fail}
- **Success Rate:** ${((summary.pass / summary.total) * 100).toFixed(1)}%
- **Tab Issues:** ${summary.tabIssues}
- **FSA Issues:** ${summary.fsaIssues}

## Hero Sources
${Object.entries(summary.heroSources).map(([source, count]) => 
  `- **${source}:** ${count} venues`
).join('\n')}

## Results

${results.map(r => `
### ${r.venue}
- **Status:** ${r.status}
- **Issues:** ${r.issues.length > 0 ? r.issues.join(', ') : 'None'}
- **Hero Source:** ${r.hero.source}
- **Tab Anchors:** ${r.tabs.anchorsPresent.length}/5 present
- **FSA Valid:** ${r.fsa.isValid ? '✅' : '❌'}
`).join('\n')}

## Issues Summary
${results.filter(r => r.status === 'FAIL').map(r => `
- **${r.venue}:** ${r.issues.join(', ')}
`).join('')}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Venue data wiring audit complete: ${summary.pass}/${summary.total} passed`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditVenueDataWiring().then(result => {
    if (result.fail > 0) {
      console.log(`⚠️ ${result.fail} venues failed audit`);
      process.exit(1);
    }
  });
}

export { auditVenueDataWiring };

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to check halal consistency
function checkHalalConsistency(venue) {
  const cuisines = venue.cuisines || [];
  const halalVerified = venue.halal_verified;
  
  // Pakistani, Afghan, Turkish, Middle Eastern venues should generally be halal
  const halalCuisines = ['pakistani', 'afghan', 'turkish', 'middle-eastern', 'lebanese'];
  const hasHalalCuisine = cuisines.some(c => halalCuisines.some(hc => c.toLowerCase().includes(hc)));
  
  if (hasHalalCuisine && halalVerified === false) {
    return { consistent: false, issue: 'Halal cuisine but halal_verified is false' };
  }
  
  return { consistent: true };
}

async function verifyCompleteness() {
  console.log('🔍 Starting completeness verification...');
  
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  const imagesReportPath = path.join(__dirname, '../../reports/images_quality.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  console.log(`🔍 Verifying ${venues.length} venues...`);
  
  const results = {
    generated_at: new Date().toISOString(),
    summary: {
      total_venues: venues.length,
      hero_pass_rate: 0,
      card_pass_rate: 0,
      menu_coverage: 0,
      pricing_coverage: 0,
      halal_inconsistencies: 0,
      overall_status: 'pass'
    },
    thresholds: {
      hero_pass_min: 92,
      card_pass_min: 95,
      menu_coverage_min: 85,
      pricing_coverage_min: 70
    },
    details: {
      missing_heroes: [],
      missing_cards: [],
      missing_menu: [],
      missing_pricing: [],
      halal_issues: []
    },
    gaps: []
  };
  
  // Load image quality report if available
  let imageResults = null;
  if (fs.existsSync(imagesReportPath)) {
    try {
      imageResults = JSON.parse(fs.readFileSync(imagesReportPath, 'utf8'));
    } catch (error) {
      console.log('⚠️  Could not load images_quality.json');
    }
  }
  
  // Calculate image pass rates from image report
  if (imageResults && imageResults.summary) {
    const totalHeroes = imageResults.summary.hero_passed + imageResults.summary.hero_failed;
    const totalCards = imageResults.summary.card_passed + imageResults.summary.card_failed;
    
    results.summary.hero_pass_rate = totalHeroes > 0 ? (imageResults.summary.hero_passed / totalHeroes) * 100 : 0;
    results.summary.card_pass_rate = totalCards > 0 ? (imageResults.summary.card_passed / totalCards) * 100 : 0;
  } else {
    // Fallback: count missing images directly
    let heroCount = 0;
    let cardCount = 0;
    
    for (const venue of venues) {
      if (venue.image_hero_path) heroCount++;
      if (venue.image_card_path) cardCount++;
    }
    
    results.summary.hero_pass_rate = (heroCount / venues.length) * 100;
    results.summary.card_pass_rate = (cardCount / venues.length) * 100;
  }
  
  // Check menu coverage
  let menuCount = 0;
  for (const venue of venues) {
    if (venue.menu_url || venue.menu_tbd) {
      menuCount++;
    } else {
      results.details.missing_menu.push({
        slug: venue.slug,
        name: venue.name
      });
    }
  }
  results.summary.menu_coverage = (menuCount / venues.length) * 100;
  
  // Check pricing coverage
  let pricingCount = 0;
  for (const venue of venues) {
    if (venue.price_level || venue.price_range_tbd) {
      pricingCount++;
    } else {
      results.details.missing_pricing.push({
        slug: venue.slug,
        name: venue.name
      });
    }
  }
  results.summary.pricing_coverage = (pricingCount / venues.length) * 100;
  
  // Check halal consistency
  for (const venue of venues) {
    const halalCheck = checkHalalConsistency(venue);
    if (!halalCheck.consistent) {
      results.summary.halal_inconsistencies++;
      results.details.halal_issues.push({
        slug: venue.slug,
        name: venue.name,
        issue: halalCheck.issue
      });
    }
  }
  
  // Generate gaps CSV data
  results.gaps = [
    ...results.details.missing_menu.map(v => ({ type: 'missing_menu', ...v })),
    ...results.details.missing_pricing.map(v => ({ type: 'missing_pricing', ...v })),
    ...results.details.halal_issues.map(v => ({ type: 'halal_inconsistency', ...v }))
  ];
  
  // Check thresholds
  const failures = [];
  
  if (results.summary.hero_pass_rate < results.thresholds.hero_pass_min) {
    failures.push(`Hero pass rate (${results.summary.hero_pass_rate.toFixed(1)}%) below ${results.thresholds.hero_pass_min}% threshold`);
  }
  
  if (results.summary.card_pass_rate < results.thresholds.card_pass_min) {
    failures.push(`Card pass rate (${results.summary.card_pass_rate.toFixed(1)}%) below ${results.thresholds.card_pass_min}% threshold`);
  }
  
  if (results.summary.menu_coverage < results.thresholds.menu_coverage_min) {
    failures.push(`Menu coverage (${results.summary.menu_coverage.toFixed(1)}%) below ${results.thresholds.menu_coverage_min}% threshold`);
  }
  
  if (results.summary.pricing_coverage < results.thresholds.pricing_coverage_min) {
    failures.push(`Pricing coverage (${results.summary.pricing_coverage.toFixed(1)}%) below ${results.thresholds.pricing_coverage_min}% threshold`);
  }
  
  if (results.summary.halal_inconsistencies > 0) {
    failures.push(`${results.summary.halal_inconsistencies} halal inconsistencies found`);
  }
  
  if (failures.length > 0) {
    results.summary.overall_status = 'fail';
    results.summary.failures = failures;
  }
  
  // Create reports directory
  const reportsDir = path.join(__dirname, '../../reports');
  fs.mkdirSync(reportsDir, { recursive: true });
  
  // Write reports
  const summaryPath = path.join(reportsDir, 'completeness_summary.json');
  const gapsPath = path.join(reportsDir, 'completeness_gaps.csv');
  const execPath = path.join(reportsDir, 'executive_summary.md');
  
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  
  // Write CSV gaps
  if (results.gaps.length > 0) {
    const csvHeader = 'type,slug,name,issue\n';
    const csvRows = results.gaps.map(gap => 
      `${gap.type},${gap.slug},${gap.name},"${gap.issue || ''}"`
    ).join('\n');
    fs.writeFileSync(gapsPath, csvHeader + csvRows);
  } else {
    fs.writeFileSync(gapsPath, 'type,slug,name,issue\n');
  }
  
  // Write executive summary
  const execSummary = `# Executive Summary - Venue Completeness Report

**Generated:** ${new Date().toISOString()}
**Status:** ${results.summary.overall_status.toUpperCase()}

## Key Metrics

- **Total Venues:** ${results.summary.total_venues}
- **Hero Pass Rate:** ${results.summary.hero_pass_rate.toFixed(1)}% (threshold: ${results.thresholds.hero_pass_min}%)
- **Card Pass Rate:** ${results.summary.card_pass_rate.toFixed(1)}% (threshold: ${results.thresholds.card_pass_min}%)
- **Menu Coverage:** ${results.summary.menu_coverage.toFixed(1)}% (threshold: ${results.thresholds.menu_coverage_min}%)
- **Pricing Coverage:** ${results.summary.pricing_coverage.toFixed(1)}% (threshold: ${results.thresholds.pricing_coverage_min}%)
- **Halal Inconsistencies:** ${results.summary.halal_inconsistencies}

## Issues Found

${results.summary.failures ? results.summary.failures.map(f => `- ${f}`).join('\n') : 'No threshold failures detected.'}

## Recommendations

${results.summary.overall_status === 'fail' ? 
  'Address the threshold failures above before deploying to production.' : 
  'All quality thresholds met. Ready for production deployment.'}
`;
  
  fs.writeFileSync(execPath, execSummary);
  
  // Output results
  console.log('📊 Completeness verification results:');
  console.log(`   🖼️  Hero pass rate: ${results.summary.hero_pass_rate.toFixed(1)}%`);
  console.log(`   🃏 Card pass rate: ${results.summary.card_pass_rate.toFixed(1)}%`);
  console.log(`   📋 Menu coverage: ${results.summary.menu_coverage.toFixed(1)}%`);
  console.log(`   💰 Pricing coverage: ${results.summary.pricing_coverage.toFixed(1)}%`);
  console.log(`   ☪️  Halal issues: ${results.summary.halal_inconsistencies}`);
  console.log(`   📄 Reports: ${summaryPath}, ${gapsPath}, ${execPath}`);
  
  if (results.summary.overall_status === 'fail') {
    console.log(`❌ Verification FAILED: ${failures.join(', ')}`);
    process.exit(1);
  } else {
    console.log('✅ All completeness thresholds met');
  }
}

// Run the script
verifyCompleteness().catch(console.error);

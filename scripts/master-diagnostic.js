#!/usr/bin/env node

/**
 * 🔍 COMPREHENSIVE PROJECT DIAGNOSTIC
 * Analyzes all aspects of BestOfLondon project and identifies blockers
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');

// === UTILITY FUNCTIONS ===

function checkFileExists(filepath) {
  return fs.existsSync(filepath);
}

function getFileSize(filepath) {
  if (!checkFileExists(filepath)) return 0;
  return fs.statSync(filepath).size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function runDiagnostic() {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 BESTOF LONDON - COMPREHENSIVE PROJECT DIAGNOSTIC');
  console.log('='.repeat(80) + '\n');
  
  const report = {
    timestamp: new Date().toISOString(),
    phases: {
      phase1_data: { status: 'unknown', details: {} },
      phase2_pages: { status: 'unknown', details: {} },
      phase3_seo: { status: 'unknown', details: {} },
      phase4_images: { status: 'unknown', details: {} },
      phase5_deployment: { status: 'unknown', details: {} }
    },
    blockers: [],
    recommendations: []
  };
  
  // === PHASE 1: DATA AUDIT ===
  console.log('📊 PHASE 1: DATA AUDIT\n');
  
  const venuesPath = path.join(PROJECT_ROOT, 'public', 'venues.json');
  const coveragePath = path.join(PROJECT_ROOT, 'data', 'coverage.json');
  
  if (!checkFileExists(venuesPath)) {
    report.phases.phase1_data.status = 'failed';
    report.blockers.push({ phase: 1, issue: 'venues.json missing', severity: 'critical' });
    console.log('❌ venues.json NOT FOUND');
  } else {
    const venuesSize = getFileSize(venuesPath);
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    
    let venues = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];
    const venueCount = venues.length;
    
    // FSA coverage
    const withFSA = venues.filter(v => (v.fsa_rating || v.fsaRating) !== null && (v.fsa_rating || v.fsaRating) !== undefined).length;
    const fsaCoverage = (withFSA / venueCount * 100).toFixed(1);
    
    // Other metrics
    const withPhotos = venues.filter(v => v.photos && v.photos.length > 0).length;
    const withPostcode = venues.filter(v => v.postcode || v.address?.postcode).length;
    const withRating = venues.filter(v => v.rating && v.rating > 0).length;
    const withWebsite = venues.filter(v => v.website).length;
    
    report.phases.phase1_data.details = {
      venueCount,
      fsaCoverage: `${withFSA}/${venueCount} (${fsaCoverage}%)`,
      photoCoverage: `${withPhotos}/${venueCount} (${(withPhotos/venueCount*100).toFixed(1)}%)`,
      postcodeCoverage: `${withPostcode}/${venueCount} (${(withPostcode/venueCount*100).toFixed(1)}%)`,
      ratingCoverage: `${withRating}/${venueCount} (${(withRating/venueCount*100).toFixed(1)}%)`,
      websiteCoverage: `${withWebsite}/${venueCount} (${(withWebsite/venueCount*100).toFixed(1)}%)`,
      fileSize: formatBytes(venuesSize)
    };
    
    console.log(`✅ venues.json found (${formatBytes(venuesSize)})`);
    console.log(`   Total venues: ${venueCount}`);
    console.log(`   FSA coverage: ${withFSA}/${venueCount} (${fsaCoverage}%)`);
    console.log(`   Photos: ${withPhotos}/${venueCount} (${(withPhotos/venueCount*100).toFixed(1)}%)`);
    console.log(`   Postcodes: ${withPostcode}/${venueCount} (${(withPostcode/venueCount*100).toFixed(1)}%)`);
    console.log(`   Ratings: ${withRating}/${venueCount} (${(withRating/venueCount*100).toFixed(1)}%)`);
    
    // Assess status
    if (venueCount < 200) {
      report.phases.phase1_data.status = 'warning';
      report.blockers.push({ phase: 1, issue: 'Low venue count (<200)', severity: 'medium' });
    } else if (parseFloat(fsaCoverage) < 50) {
      report.phases.phase1_data.status = 'warning';
      report.blockers.push({ phase: 1, issue: 'Low FSA coverage (<50%)', severity: 'high' });
      report.recommendations.push('Run: node scripts/enhance-fsa-coverage-v2.js');
    } else {
      report.phases.phase1_data.status = 'complete';
    }
  }
  
  if (checkFileExists(coveragePath)) {
    console.log(`✅ coverage.json found`);
  } else {
    console.log(`⚠️  coverage.json missing (non-critical)`);
  }
  
  // === PHASE 2: PAGES AUDIT ===
  console.log('\n📄 PHASE 2: PAGES AUDIT\n');
  
  const pagesDir = path.join(PROJECT_ROOT, 'pages');
  const requiredPages = [
    'index.js',
    'restaurants.js',
    'restaurant/[slug].js',
    '_app.js'
  ];
  
  let pagesComplete = true;
  for (const page of requiredPages) {
    const pagePath = path.join(pagesDir, page);
    if (checkFileExists(pagePath)) {
      console.log(`✅ ${page}`);
    } else {
      console.log(`❌ ${page} - MISSING`);
      pagesComplete = false;
      report.blockers.push({ phase: 2, issue: `Missing ${page}`, severity: 'critical' });
    }
  }
  
  report.phases.phase2_pages.status = pagesComplete ? 'complete' : 'failed';
  report.phases.phase2_pages.details = { requiredPages: requiredPages.length, foundPages: requiredPages.filter(p => checkFileExists(path.join(pagesDir, p))).length };
  
  // === PHASE 3: SEO AUDIT ===
  console.log('\n🔍 PHASE 3: SEO AUDIT\n');
  
  const sitemapIndex = path.join(PROJECT_ROOT, 'public', 'sitemap.xml');
  const sitemapPages = path.join(PROJECT_ROOT, 'public', 'sitemap-pages.xml');
  const sitemapVenues = path.join(PROJECT_ROOT, 'public', 'sitemap-venues.xml');
  const robotsTxt = path.join(PROJECT_ROOT, 'public', 'robots.txt');
  
  const seoFiles = [
    { name: 'sitemap.xml', path: sitemapIndex },
    { name: 'sitemap-pages.xml', path: sitemapPages },
    { name: 'sitemap-venues.xml', path: sitemapVenues },
    { name: 'robots.txt', path: robotsTxt }
  ];
  
  let seoComplete = true;
  for (const file of seoFiles) {
    if (checkFileExists(file.path)) {
      console.log(`✅ ${file.name}`);
    } else {
      console.log(`❌ ${file.name} - MISSING`);
      seoComplete = false;
      report.blockers.push({ phase: 3, issue: `Missing ${file.name}`, severity: 'medium' });
    }
  }
  
  report.phases.phase3_seo.status = seoComplete ? 'complete' : 'warning';
  report.phases.phase3_seo.details = { seoFiles: seoFiles.length, found: seoFiles.filter(f => checkFileExists(f.path)).length };
  
  // === PHASE 4: IMAGES AUDIT ===
  console.log('\n🖼️ PHASE 4: IMAGES AUDIT\n');
  
  const logoPath = path.join(PROJECT_ROOT, 'public', 'logo.svg');
  console.log(checkFileExists(logoPath) ? '✅ logo.svg found' : '❌ logo.svg missing');
  
  report.phases.phase4_images.status = checkFileExists(logoPath) ? 'complete' : 'warning';
  report.phases.phase4_images.details = { logo: checkFileExists(logoPath) };
  
  // === PHASE 5: DEPLOYMENT READINESS ===
  console.log('\n🚀 PHASE 5: DEPLOYMENT READINESS\n');
  
  const nextConfig = path.join(PROJECT_ROOT, 'next.config.js');
  const packageJson = path.join(PROJECT_ROOT, 'package.json');
  const envLocal = path.join(PROJECT_ROOT, '.env.local');
  
  console.log(checkFileExists(nextConfig) ? '✅ next.config.js' : '❌ next.config.js missing');
  console.log(checkFileExists(packageJson) ? '✅ package.json' : '❌ package.json missing');
  console.log(checkFileExists(envLocal) ? '✅ .env.local' : '⚠️  .env.local missing');
  
  const deploymentReady = checkFileExists(nextConfig) && checkFileExists(packageJson);
  report.phases.phase5_deployment.status = deploymentReady ? 'ready' : 'blocked';
  report.phases.phase5_deployment.details = { nextConfig: checkFileExists(nextConfig), packageJson: checkFileExists(packageJson), envLocal: checkFileExists(envLocal) };
  
  // === SUMMARY ===
  console.log('\n' + '='.repeat(80));
  console.log('📋 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(80) + '\n');
  
  const phaseStatus = Object.entries(report.phases).map(([name, phase]) => {
    const emoji = phase.status === 'complete' || phase.status === 'ready' ? '✅' :
                  phase.status === 'warning' ? '⚠️' : '❌';
    return `${emoji} ${name}: ${phase.status}`;
  });
  
  phaseStatus.forEach(status => console.log(status));
  
  if (report.blockers.length > 0) {
    console.log('\n🚨 BLOCKERS:\n');
    report.blockers.forEach((blocker, i) => {
      const severityEmoji = blocker.severity === 'critical' ? '🔴' : blocker.severity === 'high' ? '🟠' : '🟡';
      console.log(`${i + 1}. ${severityEmoji} [Phase ${blocker.phase}] ${blocker.issue}`);
    });
  }
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:\n');
    report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
  }
  
  // === SAVE REPORT ===
  const reportPath = path.join(PROJECT_ROOT, 'reports', `diagnostic-${new Date().toISOString().split('T')[0]}.json`);
  const reportsDir = path.join(PROJECT_ROOT, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n💾 Full report saved: ${reportPath}\n`);
  
  // === NEXT STEPS ===
  console.log('🎯 NEXT STEPS:\n');
  
  if (report.blockers.some(b => b.severity === 'critical')) {
    console.log('❌ CRITICAL BLOCKERS DETECTED - Cannot proceed to deployment');
    console.log('\nResolve critical issues first, then run this diagnostic again.\n');
    return { success: false, report };
  }
  
  if (report.phases.phase1_data.status === 'warning') {
    console.log('1. ⚠️  Fix FSA coverage:');
    console.log('   Command: node scripts/enhance-fsa-coverage-v2.js\n');
  }
  
  if (report.phases.phase5_deployment.status === 'ready') {
    console.log('✅ PROJECT IS READY FOR DEPLOYMENT\n');
    console.log('Deploy options:');
    console.log('   1. Cloudflare Pages (recommended for static)');
    console.log('   2. Vercel (recommended for SSR/ISR)');
    console.log('\n');
  }
  
  return { success: true, report };
}

// === RUN DIAGNOSTIC ===
if (require.main === module) {
  runDiagnostic()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('\n❌ Diagnostic failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

module.exports = { runDiagnostic };

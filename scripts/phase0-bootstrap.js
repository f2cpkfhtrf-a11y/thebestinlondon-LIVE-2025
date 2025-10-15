#!/usr/bin/env node

/**
 * PHASE 0: BOOTSTRAP & SANITY CHECK
 * 
 * This script verifies:
 * 1. All required directories exist
 * 2. All scripts are present and valid
 * 3. .env.local has Google API key
 * 4. venues.json exists and has data
 * 5. Utils exist (fsaClient, venueEnhancer)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const REPORTS_DIR = path.join(ROOT, 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

const report = {
  timestamp: new Date().toISOString(),
  phase: 'PHASE 0: BOOTSTRAP & SANITY CHECK',
  checks: [],
  errors: [],
  warnings: [],
  summary: {}
};

function check(name, condition, details = '') {
  const result = {
    name,
    passed: condition,
    details
  };
  
  report.checks.push(result);
  
  if (condition) {
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
  } else {
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
    report.errors.push(name);
  }
  
  return condition;
}

function warn(name, message) {
  console.log(`⚠️  ${name}`);
  console.log(`   ${message}`);
  report.warnings.push({ name, message });
}

console.log('\n🚀 PHASE 0: BOOTSTRAP & SANITY CHECK\n');

// 1. Check required directories
console.log('📁 Checking Directories...\n');

const requiredDirs = [
  'scripts',
  'data/google/raw',
  'data/google/details',
  'data/fsa',
  'reports',
  'public/meta',
  'utils'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(ROOT, dir);
  const exists = fs.existsSync(fullPath);
  
  if (!exists) {
    fs.mkdirSync(fullPath, { recursive: true });
    check(`Directory: ${dir}`, true, 'Created');
  } else {
    check(`Directory: ${dir}`, true, 'Exists');
  }
});

// 2. Check required scripts
console.log('\n📜 Checking Scripts...\n');

const requiredScripts = [
  'scripts/fetchPlaces.js',
  'scripts/fetchPlaceDetails.js',
  'scripts/buildVenues.js',
  'scripts/run-data-pipeline.js'
];

requiredScripts.forEach(script => {
  const fullPath = path.join(ROOT, script);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const size = fs.statSync(fullPath).size;
    check(`Script: ${script}`, size > 100, `${(size/1024).toFixed(1)}KB`);
  } else {
    check(`Script: ${script}`, false, 'Missing');
  }
});

// 3. Check utils
console.log('\n🔧 Checking Utils...\n');

const requiredUtils = [
  'utils/fsaClient.js',
  'utils/venueEnhancer.js'
];

requiredUtils.forEach(util => {
  const fullPath = path.join(ROOT, util);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    const size = fs.statSync(fullPath).size;
    check(`Util: ${util}`, size > 100, `${(size/1024).toFixed(1)}KB`);
  } else {
    check(`Util: ${util}`, false, 'Missing');
  }
});

// 4. Check .env.local
console.log('\n🔑 Checking Environment Variables...\n');

const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasGoogleKey = envContent.includes('NEXT_PUBLIC_GOOGLE_PLACES_KEY=');
  
  if (hasGoogleKey) {
    // Extract just to verify it's not empty (don't log it)
    const match = envContent.match(/NEXT_PUBLIC_GOOGLE_PLACES_KEY=(.+)/);
    const keyPresent = match && match[1].trim().length > 10;
    check('.env.local - Google API Key', keyPresent, 'Present (not shown)');
  } else {
    check('.env.local - Google API Key', false, 'Missing or empty');
  }
} else {
  check('.env.local', false, 'File missing');
}

// 5. Check venues.json
console.log('\n📊 Checking Data Files...\n');

const venuesPath = path.join(ROOT, 'public/venues.json');
if (fs.existsSync(venuesPath)) {
  const size = fs.statSync(venuesPath).size;
  const sizeKB = (size / 1024).toFixed(1);
  const sizeMB = (size / 1024 / 1024).toFixed(2);
  
  check('public/venues.json', size > 50000, `${sizeMB}MB`);
  
  // Try to parse and get venue count
  try {
    const content = fs.readFileSync(venuesPath, 'utf-8');
    const data = JSON.parse(content);
    
    const venueCount = data.totalVenues || (data.venues ? data.venues.length : 0);
    report.summary.venueCount = venueCount;
    report.summary.fileSize = `${sizeMB}MB`;
    
    if (venueCount > 0) {
      console.log(`   📍 Total Venues: ${venueCount}`);
      
      if (data.lastUpdated) {
        console.log(`   🕒 Last Updated: ${data.lastUpdated}`);
      }
      
      if (data.coverage) {
        console.log(`   📈 Coverage Stats:`);
        Object.entries(data.coverage).forEach(([key, value]) => {
          if (typeof value === 'number') {
            const pct = venueCount > 0 ? ((value / venueCount) * 100).toFixed(0) : 0;
            console.log(`      - ${key}: ${value} (${pct}%)`);
          }
        });
      }
      
      if (venueCount < 150) {
        warn('Venue Count', `Only ${venueCount} venues. Target is 150+. May need to expand queries.`);
      }
    } else {
      warn('Venue Data', 'venues.json exists but appears empty or malformed');
    }
    
  } catch (e) {
    warn('Venue Data', `Could not parse venues.json: ${e.message}`);
  }
} else {
  check('public/venues.json', false, 'Missing - will be generated in Phase 1');
}

// Check coverage.json
const coveragePath = path.join(ROOT, 'data/coverage.json');
if (fs.existsSync(coveragePath)) {
  check('data/coverage.json', true, 'Exists');
} else {
  check('data/coverage.json', false, 'Will be generated in Phase 1');
}

// 6. Check logo
console.log('\n🎨 Checking Brand Assets...\n');

const logoPath = path.join(ROOT, 'public/logo.svg');
if (fs.existsSync(logoPath)) {
  const size = fs.statSync(logoPath).size;
  check('public/logo.svg', size > 100, `${(size/1024).toFixed(1)}KB`);
} else {
  check('public/logo.svg', false, 'Missing');
}

// 7. Summary
console.log('\n' + '='.repeat(60));
console.log('PHASE 0 SUMMARY');
console.log('='.repeat(60));

const totalChecks = report.checks.length;
const passedChecks = report.checks.filter(c => c.passed).length;
const failedChecks = totalChecks - passedChecks;

console.log(`\n✅ Passed: ${passedChecks}/${totalChecks}`);
console.log(`❌ Failed: ${failedChecks}/${totalChecks}`);
console.log(`⚠️  Warnings: ${report.warnings.length}`);

if (report.summary.venueCount) {
  console.log(`\n📊 Current Data:`);
  console.log(`   Venues: ${report.summary.venueCount}`);
  console.log(`   File Size: ${report.summary.fileSize}`);
}

// Write report
const reportPath = path.join(REPORTS_DIR, 'bootstrap.log');
const reportContent = `PHASE 0: BOOTSTRAP & SANITY CHECK
Generated: ${report.timestamp}

SUMMARY
=======
Total Checks: ${totalChecks}
Passed: ${passedChecks}
Failed: ${failedChecks}
Warnings: ${report.warnings.length}

${report.summary.venueCount ? `Current Venue Count: ${report.summary.venueCount}\n` : ''}

DETAILED RESULTS
================

${report.checks.map(c => 
  `${c.passed ? '✅' : '❌'} ${c.name}${c.details ? ` - ${c.details}` : ''}`
).join('\n')}

${report.warnings.length > 0 ? `
WARNINGS
========

${report.warnings.map(w => `⚠️  ${w.name}\n   ${w.message}`).join('\n\n')}
` : ''}

${report.errors.length > 0 ? `
ERRORS
======

${report.errors.join('\n')}
` : ''}
`;

fs.writeFileSync(reportPath, reportContent);
console.log(`\n📄 Report saved to: reports/bootstrap.log`);

// Write JSON report too
const jsonReportPath = path.join(REPORTS_DIR, 'bootstrap.json');
fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2));

// Exit with appropriate code
const exitCode = failedChecks > 0 ? 1 : 0;

if (exitCode === 0) {
  console.log('\n✅ PHASE 0 COMPLETE - Ready to proceed\n');
} else {
  console.log('\n⚠️  PHASE 0 COMPLETE - Some checks failed\n');
  console.log('Review the report above and fix critical issues before proceeding.\n');
}

process.exit(exitCode);

#!/usr/bin/env node

/**
 * PRE-DEPLOY VALIDATION
 * Checks everything before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 PRE-DEPLOY VALIDATION\n');
console.log('═'.repeat(70) + '\n');

const ROOT = process.cwd();
const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

// Check 1: venues.json exists and is valid
console.log('CHECK 1: venues.json');
const venuesPath = path.join(ROOT, 'public/venues.json');
if (fs.existsSync(venuesPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(venuesPath, 'utf-8'));
    const venues = data.venues || [];
    const withFSA = venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length;
    const coverage = ((withFSA / venues.length) * 100).toFixed(1);
    
    console.log(`   ✅ Valid (${venues.length} venues, ${coverage}% FSA)`);
    checks.passed++;
  } catch (error) {
    console.log(`   ❌ Corrupt: ${error.message}`);
    checks.failed++;
  }
} else {
  console.log('   ❌ Missing');
  checks.failed++;
}

// Check 2: package.json
console.log('CHECK 2: package.json');
if (fs.existsSync(path.join(ROOT, 'package.json'))) {
  console.log('   ✅ Present');
  checks.passed++;
} else {
  console.log('   ❌ Missing');
  checks.failed++;
}

// Check 3: Environment variables
console.log('CHECK 3: Environment');
if (fs.existsSync(path.join(ROOT, '.env.local'))) {
  const env = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf-8');
  if (env.includes('NEXT_PUBLIC_GOOGLE_PLACES_KEY')) {
    console.log('   ✅ Google API key present');
    checks.passed++;
  } else {
    console.log('   ⚠️  Google API key missing');
    checks.warnings++;
  }
} else {
  console.log('   ⚠️  .env.local missing');
  checks.warnings++;
}

// Check 4: Git status
console.log('CHECK 4: Git Repository');
if (fs.existsSync(path.join(ROOT, '.git'))) {
  console.log('   ✅ Git initialized');
  checks.passed++;
} else {
  console.log('   ❌ Not a git repo');
  checks.failed++;
}

// Check 5: Vercel config
console.log('CHECK 5: Vercel');
if (fs.existsSync(path.join(ROOT, '.vercel/project.json'))) {
  console.log('   ✅ Vercel connected');
  checks.passed++;
} else {
  console.log('   ⚠️  Vercel not linked');
  checks.warnings++;
}

// Check 6: Build files
console.log('CHECK 6: Build System');
if (fs.existsSync(path.join(ROOT, 'next.config.js'))) {
  console.log('   ✅ Next.js configured');
  checks.passed++;
} else {
  console.log('   ❌ next.config.js missing');
  checks.failed++;
}

// Check 7: Sitemaps
console.log('CHECK 7: SEO Files');
const sitemapExists = fs.existsSync(path.join(ROOT, 'public/sitemap.xml'));
const robotsExists = fs.existsSync(path.join(ROOT, 'public/robots.txt'));
if (sitemapExists && robotsExists) {
  console.log('   ✅ Sitemaps + robots.txt ready');
  checks.passed++;
} else if (!sitemapExists) {
  console.log('   ⚠️  Sitemap missing (will generate)');
  checks.warnings++;
} else {
  console.log('   ⚠️  robots.txt missing (will generate)');
  checks.warnings++;
}

// Check 8: Backups
console.log('CHECK 8: Data Safety');
const backupsDir = path.join(ROOT, 'backups');
if (fs.existsSync(backupsDir)) {
  const backups = fs.readdirSync(backupsDir).filter(f => f.endsWith('.json'));
  if (backups.length > 0) {
    console.log(`   ✅ ${backups.length} backup(s) available`);
    checks.passed++;
  } else {
    console.log('   ⚠️  No backups found');
    checks.warnings++;
  }
} else {
  console.log('   ⚠️  Backups directory missing');
  checks.warnings++;
}

// Summary
console.log('\n' + '═'.repeat(70) + '\n');
console.log('📊 VALIDATION SUMMARY:\n');
console.log(`   Passed: ${checks.passed}`);
console.log(`   Failed: ${checks.failed}`);
console.log(`   Warnings: ${checks.warnings}\n`);

if (checks.failed > 0) {
  console.log('❌ VALIDATION FAILED - Fix errors before deploying\n');
  process.exit(1);
} else if (checks.warnings > 0) {
  console.log('⚠️  VALIDATION PASSED WITH WARNINGS');
  console.log('   You can deploy, but consider fixing warnings\n');
  process.exit(0);
} else {
  console.log('✅ ALL CHECKS PASSED - Ready to deploy!\n');
  process.exit(0);
}

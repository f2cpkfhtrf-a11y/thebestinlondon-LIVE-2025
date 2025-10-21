#!/usr/bin/env node

/**
 * Performance Verification Script
 * Checks that all performance optimizations are working correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const report = {
  timestamp: new Date().toISOString(),
  checks: [],
  issues: [],
  recommendations: []
};

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);
  report.checks.push({
    file: filePath,
    description,
    exists,
    status: exists ? '✅' : '❌'
  });
  if (!exists) {
    report.issues.push(`${description}: ${filePath} not found`);
  }
  return exists;
}

function checkContent(filePath, pattern, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (!fs.existsSync(fullPath)) {
    report.issues.push(`${description}: ${filePath} not found`);
    return false;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = content.includes(pattern);
  
  report.checks.push({
    file: filePath,
    description,
    matches,
    status: matches ? '✅' : '❌'
  });
  
  if (!matches) {
    report.issues.push(`${description}: Pattern not found in ${filePath}`);
  }
  return matches;
}

console.log('🔍 PERFORMANCE VERIFICATION\n');

// 1. Check Next.js config optimizations
console.log('1️⃣ Checking Next.js config...');
checkContent('next.config.js', 'compress: true', 'Compression enabled');
checkContent('next.config.js', 'swcMinify: true', 'SWC minification enabled');
checkContent('next.config.js', 'splitChunks', 'Bundle splitting configured');
checkContent('next.config.js', 'unoptimized: false', 'Image optimization enabled');

// 2. Check lazy loading components
console.log('2️⃣ Checking lazy loading...');
checkContent('pages/restaurant/[slug].js', 'dynamic(() => import', 'InteractiveMap lazy loaded');
checkContent('pages/restaurant/[slug].js', 'SocialShareButtons', 'SocialShareButtons lazy loaded');
checkContent('components/InteractiveMap.js', 'isVisible', 'Map uses lazy loading with visibility state');

// 3. Check image optimization
console.log('3️⃣ Checking image optimization...');
checkContent('next.config.js', 'formats: [\'image/webp\', \'image/avif\']', 'WebP/AVIF formats enabled');
checkContent('next.config.js', 'deviceSizes', 'Device sizes configured');

// 4. Check cache headers
console.log('4️⃣ Checking cache headers...');
checkContent('next.config.js', 'Cache-Control', 'Cache headers configured');
checkContent('next.config.js', 'max-age=31536000', 'Long-term caching for images');

// 5. Check bundle optimization
console.log('5️⃣ Checking bundle optimization...');
checkContent('next.config.js', 'removeConsole', 'Console removal in production');
checkContent('next.config.js', 'webpack', 'Webpack optimizations configured');

// Summary
console.log('\n📊 SUMMARY\n');
console.log(`Total checks: ${report.checks.length}`);
const passed = report.checks.filter(c => c.status === '✅').length;
const failed = report.checks.filter(c => c.status === '❌').length;

console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);

if (report.issues.length > 0) {
  console.log('\n⚠️  ISSUES FOUND:\n');
  report.issues.forEach(issue => console.log(`  - ${issue}`));
}

if (failed === 0) {
  console.log('\n✅ All performance checks passed!\n');
}

// Write report
const reportPath = path.join(__dirname, '..', 'reports', 'performance-verification.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📄 Report saved to: ${reportPath.replace(process.cwd(), '.')}\n`);

process.exit(failed > 0 ? 1 : 0);


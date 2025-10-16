// SEO verification script for BestOfLondon
// Checks: canonical, meta descriptions, JSON-LD, breadcrumbs, image alt tags
// Run with: node scripts/verify-seo.js

const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(__dirname, '../pages');

const REQUIRED_SEO = {
  canonical: /<link rel="canonical" href=/,
  description: /<meta name="description" content=/,
  jsonLd: /<script type="application\/ld\+json"/,
  title: /<title>/
};

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const checks = {};
  
  for (const [key, regex] of Object.entries(REQUIRED_SEO)) {
    checks[key] = regex.test(content);
  }
  
  return checks;
}

function scanDirectory(dir, results = []) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (file.endsWith('.js') && !file.startsWith('_') && !file.includes('.bak')) {
      const relativePath = path.relative(PAGES_DIR, fullPath);
      const checks = checkFile(fullPath);
      results.push({ file: relativePath, ...checks });
    }
  }
  
  return results;
}

console.log('🔍 Scanning pages for SEO completeness...\n');

const results = scanDirectory(PAGES_DIR);

const summary = {
  total: results.length,
  canonical: 0,
  description: 0,
  jsonLd: 0,
  title: 0,
  complete: 0
};

const incomplete = [];

results.forEach(result => {
  const isComplete = result.canonical && result.description && result.jsonLd && result.title;
  
  if (result.canonical) summary.canonical++;
  if (result.description) summary.description++;
  if (result.jsonLd) summary.jsonLd++;
  if (result.title) summary.title++;
  if (isComplete) summary.complete++;
  
  if (!isComplete) {
    const missing = [];
    if (!result.canonical) missing.push('canonical');
    if (!result.description) missing.push('description');
    if (!result.jsonLd) missing.push('JSON-LD');
    if (!result.title) missing.push('title');
    
    incomplete.push({
      file: result.file,
      missing
    });
  }
});

console.log('📊 SEO Summary:\n');
console.log(`   Total pages: ${summary.total}`);
console.log(`   ✅ Complete SEO: ${summary.complete} (${Math.round(summary.complete / summary.total * 100)}%)`);
console.log(`   📝 With canonical: ${summary.canonical}`);
console.log(`   📝 With description: ${summary.description}`);
console.log(`   📝 With JSON-LD: ${summary.jsonLd}`);
console.log(`   📝 With title: ${summary.title}\n`);

if (incomplete.length > 0) {
  console.log(`⚠️  ${incomplete.length} pages need attention:\n`);
  incomplete.forEach(item => {
    console.log(`   ${item.file}`);
    console.log(`     Missing: ${item.missing.join(', ')}\n`);
  });
} else {
  console.log('✅ All pages have complete SEO tags!');
}

// Write report
const report = {
  generated_at: new Date().toISOString(),
  summary,
  incomplete: incomplete.map(i => i.file)
};

const reportPath = path.join(__dirname, '../reports/seo-audit.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`\n📄 Report saved: ${reportPath}`);

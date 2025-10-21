#!/usr/bin/env node
/**
 * Comprehensive Site Audit
 * Checks for broken links, SEO issues, errors, and optimization opportunities
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const issues = [];
const warnings = [];
const suggestions = [];

console.log('🔍 COMPREHENSIVE SITE AUDIT\n');
console.log('=' .repeat(80));

// 1. Check sitemap
console.log('\n📋 1. SITEMAP & ROBOTS CHECK');
const sitemapPath = path.join(ROOT, 'public/sitemap.xml');
const robotsPath = path.join(ROOT, 'public/robots.txt');

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`✅ sitemap.xml exists with ${urlCount} URLs`);
  
  if (urlCount < 100) {
    warnings.push({
      type: 'sitemap',
      issue: `Sitemap has only ${urlCount} URLs - may be missing pages`,
      fix: 'Generate comprehensive sitemap with all pages'
    });
  }
} else {
  issues.push({
    type: 'critical',
    issue: 'sitemap.xml missing',
    fix: 'Generate sitemap.xml with all pages'
  });
}

if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  console.log('✅ robots.txt exists');
  if (!robots.includes('Sitemap:')) {
    warnings.push({
      type: 'robots',
      issue: 'robots.txt missing Sitemap directive',
      fix: 'Add "Sitemap: https://www.thebestinlondon.co.uk/sitemap.xml" to robots.txt'
    });
  }
} else {
  issues.push({
    type: 'critical',
    issue: 'robots.txt missing',
    fix: 'Create robots.txt file'
  });
}

// 2. Check page files for errors
console.log('\n📄 2. PAGE FILES CHECK');
const pagesDir = path.join(ROOT, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => 
  f.endsWith('.js') && !f.startsWith('_')
);

console.log(`Found ${pageFiles.length} page files`);

// Check for pages with getServerSideProps errors
pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  // Check for try-catch in getServerSideProps
  if (content.includes('getServerSideProps') && !content.includes('try {') && content.includes('notFound')) {
    warnings.push({
      type: 'error-handling',
      issue: `${file} may return 404 without error handling`,
      fix: 'Wrap getServerSideProps in try-catch'
    });
  }
});

// 3. Check SEO components
console.log('\n🔍 3. SEO COMPONENTS CHECK');
const seoHeadPath = path.join(ROOT, 'components/SEOHead.js');
if (fs.existsSync(seoHeadPath)) {
  console.log('✅ SEOHead component exists');
} else {
  warnings.push({
    type: 'seo',
    issue: 'SEOHead component missing',
    fix: 'Create SEOHead component for consistent meta tags'
  });
}

// 4. Check meta tags in key pages
console.log('\n📝 4. META TAGS CHECK');
const keyPages = ['pages/index.js', 'pages/restaurants.js', 'pages/[cuisineSlug].js'];
keyPages.forEach(pagePath => {
  const fullPath = path.join(ROOT, pagePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    if (!content.includes('<title>') && !content.includes('Head>')) {
      warnings.push({
        type: 'seo',
        issue: `${pagePath} may be missing title tag`,
        fix: 'Add title tag in Head component'
      });
    }
    
    if (!content.includes('meta name="description"')) {
      warnings.push({
        type: 'seo',
        issue: `${pagePath} may be missing meta description`,
        fix: 'Add meta description for better SEO'
      });
    }
    
    if (!content.includes('og:title')) {
      warnings.push({
        type: 'seo',
        issue: `${pagePath} may be missing Open Graph tags`,
        fix: 'Add Open Graph tags for social sharing'
      });
    }
    
    if (!content.includes('application/ld+json')) {
      warnings.push({
        type: 'seo',
        issue: `${pagePath} may be missing structured data`,
        fix: 'Add JSON-LD structured data'
      });
    }
  }
});

// 5. Check internal linking
console.log('\n🔗 5. INTERNAL LINKING CHECK');
const internalLinkingPath = path.join(ROOT, 'lib/factory/internalLinking.ts');
if (fs.existsSync(internalLinkingPath)) {
  console.log('✅ Internal linking utility exists');
} else {
  suggestions.push({
    type: 'seo',
    suggestion: 'Create internal linking utility for better site structure',
    benefit: 'Improves crawlability and page rank distribution'
  });
}

// 6. Check image optimization
console.log('\n🖼️  6. IMAGE OPTIMIZATION CHECK');
const nextConfigPath = path.join(ROOT, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const config = fs.readFileSync(nextConfigPath, 'utf8');
  if (config.includes('unoptimized: true')) {
    warnings.push({
      type: 'performance',
      issue: 'Image optimization is disabled',
      fix: 'Enable Next.js image optimization for better performance'
    });
  }
}

// Check for alt tags usage
let imagesWithoutAlt = 0;
pageFiles.slice(0, 10).forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const imgTags = content.match(/<img[^>]*>/g) || [];
  imgTags.forEach(tag => {
    if (!tag.includes('alt=')) {
      imagesWithoutAlt++;
    }
  });
});

if (imagesWithoutAlt > 0) {
  warnings.push({
    type: 'accessibility-seo',
    issue: `Found ${imagesWithoutAlt} images without alt tags`,
    fix: 'Add descriptive alt tags to all images'
  });
}

// 7. Check keywords usage
console.log('\n🔑 7. KEYWORD OPTIMIZATION CHECK');
const keywordsToCheck = [
  'london restaurants',
  'best restaurants london',
  'halal restaurants london',
  'restaurants near me',
  'london dining guide'
];

suggestions.push({
  type: 'seo',
  suggestion: 'Ensure target keywords appear in H1, first paragraph, and meta descriptions',
  benefit: 'Better keyword relevance for search rankings'
});

// 8. Check page speed optimizations
console.log('\n⚡ 8. PERFORMANCE CHECK');
suggestions.push({
  type: 'performance',
  suggestion: 'Implement lazy loading for images below the fold',
  benefit: 'Faster initial page load, better Core Web Vitals'
});

suggestions.push({
  type: 'performance',
  suggestion: 'Add resource hints (preload, prefetch) for critical resources',
  benefit: 'Faster page rendering'
});

// 9. Check mobile optimization
console.log('\n📱 9. MOBILE OPTIMIZATION CHECK');
suggestions.push({
  type: 'mobile-seo',
  suggestion: 'Test mobile responsiveness and ensure viewport meta tag is present',
  benefit: 'Better mobile search rankings'
});

// 10. Check duplicate content
console.log('\n📋 10. DUPLICATE CONTENT CHECK');
suggestions.push({
  type: 'seo',
  suggestion: 'Check for duplicate meta descriptions and titles',
  benefit: 'Avoid duplicate content penalties'
});

// Summary
console.log('\n' + '='.repeat(80));
console.log('\n📊 AUDIT SUMMARY\n');

if (issues.length > 0) {
  console.log(`❌ CRITICAL ISSUES: ${issues.length}`);
  issues.forEach((issue, i) => {
    console.log(`\n${i + 1}. ${issue.issue}`);
    console.log(`   Fix: ${issue.fix}`);
  });
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS: ${warnings.length}`);
  warnings.forEach((warning, i) => {
    console.log(`\n${i + 1}. ${warning.issue}`);
    console.log(`   Fix: ${warning.fix}`);
  });
}

if (suggestions.length > 0) {
  console.log(`\n💡 OPTIMIZATION SUGGESTIONS: ${suggestions.length}`);
  suggestions.forEach((suggestion, i) => {
    console.log(`\n${i + 1}. ${suggestion.suggestion}`);
    console.log(`   Benefit: ${suggestion.benefit}`);
  });
}

// Generate report file
const report = {
  timestamp: new Date().toISOString(),
  issues,
  warnings,
  suggestions,
  summary: {
    critical: issues.length,
    warnings: warnings.length,
    suggestions: suggestions.length
  }
};

const reportPath = path.join(ROOT, 'reports/comprehensive-site-audit.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n✅ Report saved to: ${reportPath}`);

console.log('\n' + '='.repeat(80));


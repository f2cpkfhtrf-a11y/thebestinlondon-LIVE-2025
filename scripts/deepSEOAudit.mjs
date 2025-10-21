#!/usr/bin/env node
/**
 * Deep SEO Audit - Checks for broken links, missing SEO elements, and optimization opportunities
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const issues = [];
const warnings = [];
const seoOpportunities = [];

console.log('🔍 DEEP SEO AUDIT\n');
console.log('='.repeat(80));

// 1. Check for missing titles and descriptions
console.log('\n📝 1. TITLE & META DESCRIPTION AUDIT');
const pagesDir = path.join(ROOT, 'pages');
const pageFiles = fs.readdirSync(pagesDir).filter(f => 
  f.endsWith('.js') && !f.startsWith('_') && f !== '404.js' && !f.includes('[')
);

let missingTitles = 0;
let missingDescriptions = 0;
let missingOG = 0;
let missingStructuredData = 0;

pageFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('<title>') && !content.includes('Head>')) {
    missingTitles++;
    warnings.push({
      type: 'seo',
      file,
      issue: 'Missing title tag',
      fix: 'Add <title> in Head component'
    });
  }
  
  if (!content.includes('meta name="description"') && !content.includes('description')) {
    missingDescriptions++;
    warnings.push({
      type: 'seo',
      file,
      issue: 'Missing meta description',
      fix: 'Add meta description for better click-through rates'
    });
  }
  
  if (!content.includes('og:title')) {
    missingOG++;
  }
  
  if (!content.includes('application/ld+json') && !content.includes('structuredData')) {
    missingStructuredData++;
  }
});

console.log(`Found ${pageFiles.length} page files`);
console.log(`  ⚠️  Missing titles: ${missingTitles}`);
console.log(`  ⚠️  Missing descriptions: ${missingDescriptions}`);
console.log(`  ⚠️  Missing Open Graph: ${missingOG}`);
console.log(`  ⚠️  Missing structured data: ${missingStructuredData}`);

// 2. Check keyword optimization
console.log('\n🔑 2. KEYWORD OPTIMIZATION CHECK');
const keywordsToCheck = [
  'london restaurants',
  'best restaurants london',
  'restaurants near me',
  'halal restaurants london',
  'fine dining london',
  'london dining guide'
];

const homepagePath = path.join(pagesDir, 'index.js');
if (fs.existsSync(homepagePath)) {
  const homepageContent = fs.readFileSync(homepagePath, 'utf8');
  
  keywordsToCheck.forEach(keyword => {
    const count = (homepageContent.match(new RegExp(keyword, 'gi')) || []).length;
    if (count < 2) {
      seoOpportunities.push({
        type: 'keyword',
        keyword,
        issue: `Keyword "${keyword}" appears ${count} times - should appear 3-5 times`,
        fix: `Naturally incorporate "${keyword}" in H1, first paragraph, and meta description`
      });
    }
  });
}

// 3. Check H1 structure
console.log('\n📋 3. HEADING STRUCTURE CHECK');
let pagesWithoutH1 = 0;
pageFiles.slice(0, 10).forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  if (!content.includes('<h1') && !content.includes('h1 className')) {
    pagesWithoutH1++;
  }
});

if (pagesWithoutH1 > 0) {
  warnings.push({
    type: 'seo',
    issue: `${pagesWithoutH1} pages may be missing H1 tags`,
    fix: 'Ensure each page has exactly one H1 tag with target keyword'
  });
}

// 4. Check internal linking
console.log('\n🔗 4. INTERNAL LINKING CHECK');
const internalLinkingPath = path.join(ROOT, 'lib/factory/internalLinking.ts');
if (fs.existsSync(internalLinkingPath)) {
  const content = fs.readFileSync(internalLinkingPath, 'utf8');
  if (!content.includes('generateInternalLinks')) {
    seoOpportunities.push({
      type: 'internal-linking',
      issue: 'Internal linking utility exists but may not be fully utilized',
      fix: 'Ensure all pages have 3-5 internal links to related content'
    });
  }
}

// 5. Check for canonical URLs
console.log('\n🔗 5. CANONICAL URL CHECK');
let pagesWithoutCanonical = 0;
pageFiles.slice(0, 10).forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  if (!content.includes('canonical') && !content.includes('rel="canonical"')) {
    pagesWithoutCanonical++;
  }
});

if (pagesWithoutCanonical > 0) {
  warnings.push({
    type: 'seo',
    issue: `${pagesWithoutCanonical} pages missing canonical URLs`,
    fix: 'Add canonical URLs to prevent duplicate content issues'
  });
}

// 6. Check image alt tags
console.log('\n🖼️  6. IMAGE ALT TAGS CHECK');
let imagesWithoutAlt = 0;
pageFiles.slice(0, 10).forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  imgMatches.forEach(img => {
    if (!img.includes('alt=') && !img.includes('alt =')) {
      imagesWithoutAlt++;
    }
  });
});

if (imagesWithoutAlt > 0) {
  warnings.push({
    type: 'accessibility-seo',
    issue: `Found ${imagesWithoutAlt} images without alt attributes`,
    fix: 'Add descriptive alt text to all images for SEO and accessibility'
  });
}

// 7. Check page load optimization
console.log('\n⚡ 7. PERFORMANCE CHECK');
const nextConfigPath = path.join(ROOT, 'next.config.js');
const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

if (nextConfig.includes('unoptimized: true')) {
  issues.push({
    type: 'performance',
    issue: 'Image optimization disabled - impacts page speed',
    fix: 'Enable Next.js image optimization for better Core Web Vitals',
    impact: 'high'
  });
}

seoOpportunities.push({
  type: 'performance',
  issue: 'Lazy loading images below the fold',
  fix: 'Implement lazy loading for non-critical images',
  impact: 'medium'
});

// 8. Check mobile optimization
console.log('\n📱 8. MOBILE SEO CHECK');
let missingViewport = 0;
pageFiles.slice(0, 10).forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  if (!content.includes('viewport') && !content.includes('_document')) {
    missingViewport++;
  }
});

if (missingViewport > 5) {
  warnings.push({
    type: 'mobile-seo',
    issue: 'Viewport meta tag may be missing from some pages',
    fix: 'Ensure viewport meta tag is in _document.js for all pages'
  });
}

// 9. Check for duplicate content
console.log('\n📋 9. DUPLICATE CONTENT CHECK');
const titles = new Map();
const descriptions = new Map();

pageFiles.forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const descMatch = content.match(/meta name="description" content="([^"]+)"/);
  
  if (titleMatch) {
    const title = titleMatch[1];
    if (titles.has(title)) {
      warnings.push({
        type: 'duplicate',
        issue: `Duplicate title: "${title}" in ${file} and ${titles.get(title)}`,
        fix: 'Make titles unique for each page'
      });
    } else {
      titles.set(title, file);
    }
  }
  
  if (descMatch) {
    const desc = descMatch[1];
    if (descriptions.has(desc)) {
      warnings.push({
        type: 'duplicate',
        issue: `Duplicate description in ${file} and ${descriptions.get(desc)}`,
        fix: 'Make descriptions unique for each page'
      });
    } else {
      descriptions.set(desc, file);
    }
  }
});

// 10. Check sitemap completeness
console.log('\n🗺️  10. SITEMAP CHECK');
const sitemapPagesPath = path.join(ROOT, 'public/sitemap-pages.xml');
if (fs.existsSync(sitemapPagesPath)) {
  const sitemap = fs.readFileSync(sitemapPagesPath, 'utf8');
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`  ✅ sitemap-pages.xml has ${urlCount} URLs`);
  
  if (urlCount < pageFiles.length) {
    warnings.push({
      type: 'sitemap',
      issue: `Sitemap has ${urlCount} URLs but ${pageFiles.length} page files exist`,
      fix: 'Update sitemap generation to include all pages'
    });
  }
} else {
  issues.push({
    type: 'critical',
    issue: 'sitemap-pages.xml missing',
    fix: 'Generate sitemap-pages.xml'
  });
}

// Summary
console.log('\n' + '='.repeat(80));
console.log('\n📊 DEEP AUDIT SUMMARY\n');

if (issues.length > 0) {
  console.log(`❌ CRITICAL ISSUES: ${issues.length}`);
  issues.forEach((issue, i) => {
    console.log(`\n${i + 1}. [${issue.impact || 'HIGH'}] ${issue.issue}`);
    console.log(`   Fix: ${issue.fix}`);
  });
}

if (warnings.length > 0) {
  console.log(`\n⚠️  WARNINGS: ${warnings.length}`);
  warnings.slice(0, 10).forEach((warning, i) => {
    console.log(`\n${i + 1}. ${warning.issue}`);
    if (warning.file) console.log(`   File: ${warning.file}`);
    console.log(`   Fix: ${warning.fix}`);
  });
  if (warnings.length > 10) {
    console.log(`\n   ... and ${warnings.length - 10} more warnings`);
  }
}

if (seoOpportunities.length > 0) {
  console.log(`\n💡 SEO OPPORTUNITIES: ${seoOpportunities.length}`);
  seoOpportunities.forEach((opp, i) => {
    console.log(`\n${i + 1}. [${opp.impact || 'MEDIUM'}] ${opp.issue}`);
    console.log(`   Fix: ${opp.fix}`);
  });
}

// Generate detailed report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPages: pageFiles.length,
    criticalIssues: issues.length,
    warnings: warnings.length,
    opportunities: seoOpportunities.length
  },
  issues,
  warnings,
  seoOpportunities,
  statistics: {
    missingTitles,
    missingDescriptions,
    missingOG,
    missingStructuredData,
    imagesWithoutAlt,
    pagesWithoutH1,
    pagesWithoutCanonical
  }
};

const reportPath = path.join(ROOT, 'reports/deep-seo-audit.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n✅ Detailed report saved to: ${reportPath}`);

console.log('\n' + '='.repeat(80));


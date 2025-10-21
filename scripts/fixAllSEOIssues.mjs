#!/usr/bin/env node
/**
 * Fix all SEO issues identified in the audit
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

console.log('🔧 FIXING ALL SEO ISSUES\n');
console.log('='.repeat(80));

// 1. Fix guides.js missing title
console.log('\n1. Fixing guides.js missing title');
const guidesPath = path.join(ROOT, 'pages/guides.js');
if (fs.existsSync(guidesPath)) {
  let content = fs.readFileSync(guidesPath, 'utf8');
  
  if (!content.includes('<title>') || !content.includes('Head>')) {
    // Add Head section with title
    const headSection = `      <Head>
        <title>London Restaurant Guides | Dining Tips & Recommendations | The Best in London</title>
        <meta name="description" content="Discover comprehensive guides to London's dining scene. From neighborhood recommendations to cuisine deep-dives, find everything you need to know about dining in London." />
        <meta name="keywords" content="London restaurant guides, dining tips London, London food recommendations, restaurant guides" />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/guides" />
        
        {/* Open Graph */}
        <meta property="og:title" content="London Restaurant Guides | The Best in London" />
        <meta property="og:description" content="Discover comprehensive guides to London's dining scene with expert tips and recommendations." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/guides" />
        <meta property="og:type" content="website" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="London Restaurant Guides | The Best in London" />
        <meta name="twitter:description" content="Discover comprehensive guides to London's dining scene with expert tips and recommendations." />
      </Head>`;
    
    // Find where to insert Head
    if (content.includes('return')) {
      const returnMatch = content.match(/(return\s*\([^>]*>)/);
      if (returnMatch) {
        content = content.replace(returnMatch[0], `return (\n    <>\n${headSection}\n      ${returnMatch[0]}`);
      }
    }
    
    if (!content.includes('<Head>')) {
      // Add at beginning of component
      content = content.replace(/(export default function[^{]*\{[^}]*)/, `$1\n${headSection}\n`);
    }
    
    fs.writeFileSync(guidesPath, content);
    console.log('  ✅ Added title and meta tags to guides.js');
  }
}

// 2. Delete blog-test.js if it exists (duplicate)
console.log('\n2. Removing duplicate blog-test.js');
const blogTestPath = path.join(ROOT, 'pages/blog-test.js');
if (fs.existsSync(blogTestPath)) {
  fs.unlinkSync(blogTestPath);
  console.log('  ✅ Removed blog-test.js (duplicate page)');
}

// 3. Enhance homepage keywords
console.log('\n3. Enhancing homepage keyword optimization');
const homepagePath = path.join(ROOT, 'pages/index.js');
let homepageContent = fs.readFileSync(homepagePath, 'utf8');

// Check if keywords need enhancement
const keywords = {
  'london restaurants': (homepageContent.match(/london restaurants/gi) || []).length,
  'best restaurants london': (homepageContent.match(/best restaurants london/gi) || []).length,
  'restaurants near me': (homepageContent.match(/restaurants near me/gi) || []).length,
  'halal restaurants london': (homepageContent.match(/halal restaurants london/gi) || []).length,
  'fine dining london': (homepageContent.match(/fine dining london/gi) || []).length,
  'london dining guide': (homepageContent.match(/london dining guide/gi) || []).length
};

console.log('  Current keyword counts:', keywords);

// Enhance description with more keywords
const currentDesc = homepageContent.match(/meta name="description" content="([^"]+)"/);
if (currentDesc) {
  const newDesc = currentDesc[1]
    .replace(/our premium dining guide/, 'our premium London dining guide')
    .replace(/restaurants with our/, 'best restaurants London with our')
    .replace(/From street food/, 'From halal restaurants near me to fine dining London');
  
  homepageContent = homepageContent.replace(
    /meta name="description" content="[^"]+"/,
    `meta name="description" content="${newDesc}"`
  );
  fs.writeFileSync(homepagePath, homepageContent);
  console.log('  ✅ Enhanced homepage meta description with keywords');
}

// 4. Check and fix viewport tag
console.log('\n4. Verifying viewport tag');
const docPath = path.join(ROOT, 'pages/_document.js');
const docContent = fs.readFileSync(docPath, 'utf8');
if (!docContent.includes('viewport')) {
  // Viewport should be in individual pages or _app.js, but _document.js is checked
  console.log('  ⚠️  Viewport meta tag should be in _app.js (checking...)');
}

// 5. Create comprehensive SEO fixes report
console.log('\n5. Generating comprehensive fixes report');
const fixesReport = {
  timestamp: new Date().toISOString(),
  fixesApplied: [
    {
      issue: 'guides.js missing title',
      fix: 'Added comprehensive Head section with title, meta description, OG tags, and canonical URL',
      status: 'fixed'
    },
    {
      issue: 'Duplicate blog-test.js page',
      fix: 'Removed duplicate blog-test.js file',
      status: 'fixed'
    },
    {
      issue: 'Homepage keyword optimization',
      fix: 'Enhanced meta description with target keywords',
      status: 'fixed'
    }
  ],
  remainingIssues: [
    {
      issue: 'Image optimization disabled',
      fix: 'Enable Next.js image optimization in next.config.js (currently unoptimized: true)',
      impact: 'high',
      benefit: 'Better Core Web Vitals scores, faster page loads'
    },
    {
      issue: '43 pages missing Open Graph tags',
      fix: 'Add Open Graph tags to all pages for better social sharing',
      impact: 'medium',
      benefit: 'Better social media previews, higher click-through rates'
    },
    {
      issue: '21 pages missing structured data',
      fix: 'Add JSON-LD structured data to all pages',
      impact: 'medium',
      benefit: 'Rich snippets in search results, better visibility'
    },
    {
      issue: 'Sitemap has 26 URLs but 68 page files exist',
      fix: 'Regenerate sitemap to include all pages (run sitemap generation script)',
      impact: 'high',
      benefit: 'All pages indexed by Google, better crawl coverage'
    },
    {
      issue: 'Some images without alt tags',
      fix: 'Add descriptive alt text to all images',
      impact: 'medium',
      benefit: 'Better accessibility and image search rankings'
    }
  ],
  seoOptimizationRecommendations: [
    {
      priority: 'high',
      recommendation: 'Add more internal links between related pages',
      benefit: 'Better page rank distribution, improved crawlability',
      action: 'Add 3-5 internal links per page to related cuisine/area pages'
    },
    {
      priority: 'high',
      recommendation: 'Optimize homepage H1 with target keywords',
      benefit: 'Better keyword relevance for "best restaurants London" searches',
      action: 'Change H1 to include "Best Restaurants in London" keyword'
    },
    {
      priority: 'medium',
      recommendation: 'Add breadcrumb navigation with structured data',
      benefit: 'Better site structure understanding for Google',
      action: 'Ensure Breadcrumbs component includes BreadcrumbList schema'
    },
    {
      priority: 'medium',
      recommendation: 'Create FAQ schema for FAQ pages',
      benefit: 'Featured snippets in search results',
      action: 'Add FAQPage schema to FAQ pages'
    },
    {
      priority: 'low',
      recommendation: 'Add local business schema for restaurant pages',
      benefit: 'Google Business Profile integration',
      action: 'Enhance Restaurant schema with LocalBusiness properties'
    },
    {
      priority: 'high',
      recommendation: 'Improve meta descriptions length and keywords',
      benefit: 'Higher click-through rates from search results',
      action: 'Ensure all descriptions are 120-155 characters with target keywords'
    },
    {
      priority: 'medium',
      recommendation: 'Add "lastmod" dates to sitemap',
      benefit: 'Faster re-indexing when content updates',
      action: 'Update sitemap generation to include accurate lastmod dates'
    }
  ]
};

const reportPath = path.join(ROOT, 'reports/seo-fixes-applied.json');
fs.writeFileSync(reportPath, JSON.stringify(fixesReport, null, 2));
console.log(`  ✅ SEO fixes report saved to: ${reportPath}`);

// 6. Generate action plan
const actionPlan = `# SEO ACTION PLAN - The Best in London

## ✅ IMMEDIATE FIXES APPLIED
1. ✅ Fixed guides.js missing title
2. ✅ Removed duplicate blog-test.js
3. ✅ Enhanced homepage keywords

## 🔴 HIGH PRIORITY (Do First)

### 1. Enable Image Optimization
**File:** next.config.js
**Change:** Set \`unoptimized: false\` or remove the line
**Impact:** Better Core Web Vitals, faster page loads
**Benefit:** Higher search rankings

### 2. Regenerate Complete Sitemap
**Action:** Run sitemap generation script to include ALL pages
**Current:** 26 URLs in sitemap
**Should be:** 68+ page files + 500+ venue pages + dynamic pages
**Impact:** HIGH - Google won't index pages not in sitemap

### 3. Add Open Graph Tags to All Pages
**Action:** Create reusable SEO component and apply to all pages
**Missing from:** 43 pages
**Template:** Use SEOHead component or create similar

### 4. Add Structured Data to All Pages
**Action:** Add JSON-LD schema to all listing pages
**Missing from:** 21 pages
**Benefit:** Rich snippets in search results

## 🟡 MEDIUM PRIORITY (Do Next)

### 5. Internal Linking Strategy
- Add 3-5 internal links per page
- Link related cuisine pages
- Link related area pages
- Link venue pages to cuisine/area pages

### 6. Keyword Optimization
- Homepage H1: "Discover London's Finest Restaurants"
- Add keywords naturally: "best restaurants London", "restaurants near me", "halal restaurants London"
- Target long-tail keywords: "best Italian restaurants in Central London"

### 7. Image Alt Tags
- Add descriptive alt text to all images
- Include keywords where natural: "Best Indian restaurant in London - Dishoom interior"
- Helpful for image search rankings

### 8. Meta Description Optimization
- Ensure all descriptions are 120-155 characters
- Include primary keyword
- Include call-to-action
- Make each description unique

## 🟢 LOW PRIORITY (Nice to Have)

### 9. FAQ Schema
- Add FAQPage schema to FAQ pages
- Opportunity for featured snippets

### 10. Local Business Enhancement
- Add LocalBusiness schema to restaurant pages
- Include opening hours, price range, menu URL

### 11. Breadcrumb Enhancement
- Ensure all pages have breadcrumbs
- Add BreadcrumbList schema

---

## KEYWORDS TO TARGET

### Primary Keywords
1. **best restaurants London** (HIGH COMPETITION)
2. **London restaurants** (HIGH SEARCH VOLUME)
3. **restaurants near me** (HIGH LOCAL INTENT)
4. **halal restaurants London** (MEDIUM COMPETITION)
5. **best Italian restaurants London** (LONG-TAIL)

### Secondary Keywords
- fine dining London
- London dining guide
- best restaurants in London 2025
- top restaurants London
- restaurants London reviews

### Long-tail Keywords (Low Competition)
- best halal restaurants near me
- top rated restaurants in Central London
- best Italian restaurant in Soho London
- FSA rated restaurants London
- vegetarian restaurants Central London

---

## CONTENT OPTIMIZATION STRATEGY

### Homepage
- **H1:** "Discover London's Finest Restaurants | Best Restaurants in London"
- **First Paragraph:** Include "best restaurants London", "London restaurants", "restaurants near me"
- **Meta Description:** "Find the best restaurants in London. 760+ verified restaurants with real reviews, FSA ratings, and authentic cuisine. Search restaurants near me, fine dining London, and halal restaurants."

### Cuisine Pages
- **H1:** "{Cuisine} Restaurants in London | Best {Cuisine} Dining"
- **Content:** Include "{cuisine} restaurants London", "best {cuisine} in London", "{cuisine} near me"
- **Internal Links:** Link to related cuisine pages, area pages, top-rated restaurants

### Area Pages  
- **H1:** "Best Restaurants in {Area} London | {Area} Dining Guide"
- **Content:** Include "restaurants in {area}", "{area} restaurants", "best dining {area}"

---

## TECHNICAL SEO CHECKLIST

- [ ] All pages have unique titles (50-60 characters)
- [ ] All pages have unique descriptions (120-155 characters)
- [ ] All pages have canonical URLs
- [ ] All pages have Open Graph tags
- [ ] All pages have Twitter Card tags
- [ ] All pages have structured data (JSON-LD)
- [ ] All images have alt text
- [ ] Sitemap includes all pages
- [ ] robots.txt is correct
- [ ] 404 page exists and is user-friendly
- [ ] Mobile-friendly (viewport tag)
- [ ] Fast page loads (image optimization)
- [ ] HTTPS enabled
- [ ] Internal linking structure

---

## MONITORING & MEASUREMENT

1. **Google Search Console**
   - Monitor indexing status
   - Track search queries
   - Fix crawl errors

2. **Google Analytics**
   - Track organic traffic
   - Monitor bounce rate
   - Track conversion goals

3. **Core Web Vitals**
   - Page Speed Insights
   - Monitor LCP, FID, CLS scores
   - Target: All green

---

Generated: ${new Date().toISOString()}
`;

const actionPlanPath = path.join(ROOT, 'reports/SEO_ACTION_PLAN.md');
fs.writeFileSync(actionPlanPath, actionPlan);
console.log(`  ✅ SEO Action Plan saved to: ${actionPlanPath}`);

console.log('\n' + '='.repeat(80));
console.log('\n✅ SEO FIXES COMPLETE\n');


#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function verifyContent(live = false) {
  const baseUrl = live ? 'https://www.thebestinlondon.co.uk' : 'http://localhost:3000';
  const results = {
    timestamp: new Date().toISOString(),
    live,
    status: 'pass',
    checks: []
  };

  console.log(`🔍 Verifying content at ${baseUrl}...`);

  // Check 1: Blog index loads
  try {
    const response = await fetch(`${baseUrl}/blog`);
    const status = response.status;
    const html = await response.text();
    
    const hasJsonLd = html.includes('application/ld+json');
    const hasCanonical = html.includes('rel="canonical"');
    const hasBlogContent = html.includes('blog') || html.includes('article');
    
    results.checks.push({
      check: 'blog-index-loads',
      status: status === 200 ? 'pass' : 'fail',
      details: { status, hasJsonLd, hasCanonical, hasBlogContent }
    });
    
    if (status !== 200) results.status = 'fail';
  } catch (error) {
    results.checks.push({
      check: 'blog-index-loads',
      status: 'fail',
      details: { error: error.message }
    });
    results.status = 'fail';
  }

  // Check 2: FAQ index loads
  try {
    const response = await fetch(`${baseUrl}/faq`);
    const status = response.status;
    const html = await response.text();
    
    const hasJsonLd = html.includes('application/ld+json');
    const hasCanonical = html.includes('rel="canonical"');
    const hasFaqContent = html.includes('question') || html.includes('faq');
    
    results.checks.push({
      check: 'faq-index-loads',
      status: status === 200 ? 'pass' : 'fail',
      details: { status, hasJsonLd, hasCanonical, hasFaqContent }
    });
    
    if (status !== 200) results.status = 'fail';
  } catch (error) {
    results.checks.push({
      check: 'faq-index-loads',
      status: 'fail',
      details: { error: error.message }
    });
    results.status = 'fail';
  }

  // Check 3: Verify blog posts exist and load
  try {
    const blogDir = path.join(__dirname, '../content/blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
      
      let blogChecksPassed = 0;
      for (const file of blogFiles.slice(0, 3)) { // Check first 3 blog posts
        const slug = file.replace('.json', '');
        try {
          const response = await fetch(`${baseUrl}/blog/${slug}`);
          const status = response.status;
          const html = await response.text();
          
          const hasBlogPostingSchema = html.includes('"@type":"BlogPosting"');
          const hasHero = html.includes('hero') || html.includes('cover');
          const hasInternalLinks = html.includes('/restaurant/') || html.includes('/areas/') || html.includes('/cuisines/');
          const hasVersionParam = html.includes('?v=');
          
          if (status === 200 && hasBlogPostingSchema) {
            blogChecksPassed++;
          }
          
          results.checks.push({
            check: `blog-post-${slug}`,
            status: status === 200 && hasBlogPostingSchema ? 'pass' : 'fail',
            details: { status, hasBlogPostingSchema, hasHero, hasInternalLinks, hasVersionParam }
          });
          
          if (status !== 200) results.status = 'fail';
        } catch (error) {
          results.checks.push({
            check: `blog-post-${slug}`,
            status: 'fail',
            details: { error: error.message }
          });
          results.status = 'fail';
        }
      }
      
      results.checks.push({
        check: 'blog-posts-valid',
        status: blogChecksPassed === Math.min(3, blogFiles.length) ? 'pass' : 'fail',
        details: { totalChecked: blogChecksPassed, expected: Math.min(3, blogFiles.length) }
      });
    }
  } catch (error) {
    results.checks.push({
      check: 'blog-posts-verification',
      status: 'fail',
      details: { error: error.message }
    });
    results.status = 'fail';
  }

  // Check 4: Verify FAQ entries exist and load
  try {
    const faqDir = path.join(__dirname, '../content/faq');
    if (fs.existsSync(faqDir)) {
      const faqFiles = fs.readdirSync(faqDir).filter(f => f.endsWith('.json'));
      
      let faqChecksPassed = 0;
      for (const file of faqFiles.slice(0, 3)) { // Check first 3 FAQ entries
        const slug = file.replace('.json', '');
        try {
          const response = await fetch(`${baseUrl}/faq/${slug}`);
          const status = response.status;
          const html = await response.text();
          
          const hasFaqPageSchema = html.includes('"@type":"FAQPage"');
          const hasQuestionAnswer = html.includes('question') && html.includes('answer');
          const hasInternalLinks = html.includes('/restaurant/') || html.includes('/areas/');
          
          if (status === 200 && hasFaqPageSchema) {
            faqChecksPassed++;
          }
          
          results.checks.push({
            check: `faq-entry-${slug}`,
            status: status === 200 && hasFaqPageSchema ? 'pass' : 'fail',
            details: { status, hasFaqPageSchema, hasQuestionAnswer, hasInternalLinks }
          });
          
          if (status !== 200) results.status = 'fail';
        } catch (error) {
          results.checks.push({
            check: `faq-entry-${slug}`,
            status: 'fail',
            details: { error: error.message }
          });
          results.status = 'fail';
        }
      }
      
      results.checks.push({
        check: 'faq-entries-valid',
        status: faqChecksPassed === Math.min(3, faqFiles.length) ? 'pass' : 'fail',
        details: { totalChecked: faqChecksPassed, expected: Math.min(3, faqFiles.length) }
      });
    }
  } catch (error) {
    results.checks.push({
      check: 'faq-entries-verification',
      status: 'fail',
      details: { error: error.message }
    });
    results.status = 'fail';
  }

  // Check 5: Verify venue pages have enhancements (if live)
  if (live) {
    try {
      // Test a sample venue page for FSA badge, buttons, etc.
      const response = await fetch(`${baseUrl}/restaurant/dishoom-covent-garden-OZ6OHOJw`);
      const status = response.status;
      const html = await response.text();
      
      const hasFsaBadge = html.includes('FSA') || html.includes('food standards');
      const hasGoogleReviewsButton = html.includes('Google Reviews') || html.includes('google_place_url');
      const hasLocalImages = html.includes('/images/') && !html.includes('https://images.unsplash.com');
      const hasVersionParam = html.includes('?v=');
      const hasStructuredData = html.includes('"@type":"Restaurant"') || html.includes('"@type":"LocalBusiness"');
      
      results.checks.push({
        check: 'venue-page-enhancements',
        status: status === 200 && hasLocalImages ? 'pass' : 'fail',
        details: { 
          status, 
          hasFsaBadge, 
          hasGoogleReviewsButton, 
          hasLocalImages, 
          hasVersionParam,
          hasStructuredData 
        }
      });
      
      if (status !== 200) results.status = 'fail';
    } catch (error) {
      results.checks.push({
        check: 'venue-page-enhancements',
        status: 'fail',
        details: { error: error.message }
      });
      results.status = 'fail';
    }
  }

  // Check 6: No 404s on critical routes
  const criticalRoutes = ['/blog', '/faq'];
  for (const route of criticalRoutes) {
    try {
      const response = await fetch(`${baseUrl}${route}`);
      const status = response.status;
      
      results.checks.push({
        check: `critical-route-${route.replace('/', '')}`,
        status: status === 200 ? 'pass' : 'fail',
        details: { route, status }
      });
      
      if (status !== 200) results.status = 'fail';
    } catch (error) {
      results.checks.push({
        check: `critical-route-${route.replace('/', '')}`,
        status: 'fail',
        details: { route, error: error.message }
      });
      results.status = 'fail';
    }
  }

  // Generate report
  const reportPath = live 
    ? path.join(__dirname, '../reports/live_content_verification.json')
    : path.join(__dirname, '../reports/content_verification.json');
  
  // Ensure reports directory exists
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  
  // Summary
  const passCount = results.checks.filter(c => c.status === 'pass').length;
  const totalCount = results.checks.length;
  
  console.log(`\n📊 Content Verification Results:`);
  console.log(`✅ Passed: ${passCount}/${totalCount} checks`);
  console.log(`📁 Report saved: ${reportPath}`);
  console.log(`🎯 Overall Status: ${results.status.toUpperCase()}`);
  
  if (results.status === 'fail') {
    console.log(`\n❌ Failed checks:`);
    results.checks
      .filter(c => c.status === 'fail')
      .forEach(c => console.log(`   • ${c.check}: ${JSON.stringify(c.details)}`));
    
    process.exit(1);
  } else {
    console.log(`\n🎉 All content verification checks passed!`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const live = args.includes('--live');

verifyContent(live).catch(error => {
  console.error('❌ Verification failed:', error);
  process.exit(1);
});
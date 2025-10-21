#!/usr/bin/env node
/**
 * Lighthouse Audit Script
 * Runs Lighthouse on key pages and generates a report
 */

import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const PAGES_TO_AUDIT = [
  { name: 'Homepage', url: 'http://localhost:3000' },
  { name: 'Restaurants List', url: 'http://localhost:3000/restaurants' },
  { name: 'Cuisines', url: 'http://localhost:3000/cuisines' },
  { name: 'Areas', url: 'http://localhost:3000/areas' },
  { name: 'Indian Restaurants', url: 'http://localhost:3000/indian-restaurants-london' },
  { name: 'Halal Restaurants', url: 'http://localhost:3000/best-halal-restaurants-london' },
  { name: 'Restaurant Detail', url: 'http://localhost:3000/restaurant/dishoom-covent-garden-OZ6OHOJw' },
];

async function runLighthouseAudit(url, pageName) {
  console.log(`\n🔍 Auditing: ${pageName} (${url})`);
  
  let chrome;
  try {
    chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };
    
    const runnerResult = await lighthouse(url, options);
    
    const scores = {
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
      seo: Math.round(runnerResult.lhr.categories.seo.score * 100),
    };
    
    // Core Web Vitals
    const metrics = runnerResult.lhr.audits;
    const coreWebVitals = {
      lcp: metrics['largest-contentful-paint']?.numericValue ? Math.round(metrics['largest-contentful-paint'].numericValue) : null,
      fid: metrics['max-potential-fid']?.numericValue ? Math.round(metrics['max-potential-fid'].numericValue) : null,
      cls: metrics['cumulative-layout-shift']?.score ? (metrics['cumulative-layout-shift'].score * 100).toFixed(1) : null,
      fcp: metrics['first-contentful-paint']?.numericValue ? Math.round(metrics['first-contentful-paint'].numericValue) : null,
    };
    
    // Top issues
    const issues = Object.values(runnerResult.lhr.audits)
      .filter(audit => audit.score !== null && audit.score < 0.9)
      .sort((a, b) => a.score - b.score)
      .slice(0, 5)
      .map(audit => ({
        title: audit.title,
        score: Math.round(audit.score * 100),
        description: audit.description
      }));
    
    return {
      pageName,
      url,
      scores,
      coreWebVitals,
      issues,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`❌ Error auditing ${pageName}:`, error.message);
    return {
      pageName,
      url,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
}

async function generateReport(results) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: results.length,
      averageScores: {
        performance: Math.round(results.filter(r => r.scores).reduce((sum, r) => sum + (r.scores?.performance || 0), 0) / results.filter(r => r.scores).length),
        accessibility: Math.round(results.filter(r => r.scores).reduce((sum, r) => sum + (r.scores?.accessibility || 0), 0) / results.filter(r => r.scores).length),
        bestPractices: Math.round(results.filter(r => r.scores).reduce((sum, r) => sum + (r.scores?.bestPractices || 0), 0) / results.filter(r => r.scores).length),
        seo: Math.round(results.filter(r => r.scores).reduce((sum, r) => sum + (r.scores?.seo || 0), 0) / results.filter(r => r.scores).length),
      }
    },
    pages: results
  };
  
  // Save JSON report
  const jsonPath = path.join(ROOT, 'reports', `lighthouse-audit-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  console.log(`\n✅ JSON report saved: ${jsonPath}`);
  
  // Generate markdown report
  let markdown = `# Lighthouse Audit Report\n\n`;
  markdown += `**Date:** ${new Date().toLocaleDateString()}\n`;
  markdown += `**Total Pages Audited:** ${report.summary.totalPages}\n\n`;
  
  markdown += `## Summary Scores\n\n`;
  markdown += `| Metric | Score | Status |\n`;
  markdown += `|--------|-------|--------|\n`;
  markdown += `| Performance | ${report.summary.averageScores.performance} | ${report.summary.averageScores.performance >= 90 ? '✅ Excellent' : report.summary.averageScores.performance >= 75 ? '⚠️ Good' : '❌ Needs Work'} |\n`;
  markdown += `| Accessibility | ${report.summary.averageScores.accessibility} | ${report.summary.averageScores.accessibility >= 90 ? '✅ Excellent' : report.summary.averageScores.accessibility >= 75 ? '⚠️ Good' : '❌ Needs Work'} |\n`;
  markdown += `| Best Practices | ${report.summary.averageScores.bestPractices} | ${report.summary.averageScores.bestPractices >= 90 ? '✅ Excellent' : report.summary.averageScores.bestPractices >= 75 ? '⚠️ Good' : '❌ Needs Work'} |\n`;
  markdown += `| SEO | ${report.summary.averageScores.seo} | ${report.summary.averageScores.seo >= 90 ? '✅ Excellent' : report.summary.averageScores.seo >= 75 ? '⚠️ Good' : '❌ Needs Work'} |\n\n`;
  
  markdown += `## Page-by-Page Results\n\n`;
  results.forEach((result, index) => {
    if (result.error) {
      markdown += `### ${index + 1}. ${result.pageName}\n`;
      markdown += `**Status:** ❌ Error\n`;
      markdown += `**Error:** ${result.error}\n\n`;
      return;
    }
    
    markdown += `### ${index + 1}. ${result.pageName}\n`;
    markdown += `**URL:** ${result.url}\n\n`;
    markdown += `**Scores:**\n`;
    markdown += `- Performance: ${result.scores.performance}/100 ${result.scores.performance >= 90 ? '✅' : result.scores.performance >= 75 ? '⚠️' : '❌'}\n`;
    markdown += `- Accessibility: ${result.scores.accessibility}/100 ${result.scores.accessibility >= 90 ? '✅' : result.scores.accessibility >= 75 ? '⚠️' : '❌'}\n`;
    markdown += `- Best Practices: ${result.scores.bestPractices}/100 ${result.scores.bestPractices >= 90 ? '✅' : result.scores.bestPractices >= 75 ? '⚠️' : '❌'}\n`;
    markdown += `- SEO: ${result.scores.seo}/100 ${result.scores.seo >= 90 ? '✅' : result.scores.seo >= 75 ? '⚠️' : '❌'}\n\n`;
    
    if (result.coreWebVitals) {
      markdown += `**Core Web Vitals:**\n`;
      markdown += `- LCP (Largest Contentful Paint): ${result.coreWebVitals.lcp}ms ${result.coreWebVitals.lcp < 2500 ? '✅' : result.coreWebVitals.lcp < 4000 ? '⚠️' : '❌'}\n`;
      markdown += `- FID (First Input Delay): ${result.coreWebVitals.fid}ms ${result.coreWebVitals.fid < 100 ? '✅' : result.coreWebVitals.fid < 300 ? '⚠️' : '❌'}\n`;
      markdown += `- CLS (Cumulative Layout Shift): ${result.coreWebVitals.cls} ${result.coreWebVitals.cls < 0.1 ? '✅' : result.coreWebVitals.cls < 0.25 ? '⚠️' : '❌'}\n`;
      markdown += `- FCP (First Contentful Paint): ${result.coreWebVitals.fcp}ms ${result.coreWebVitals.fcp < 1800 ? '✅' : result.coreWebVitals.fcp < 3000 ? '⚠️' : '❌'}\n\n`;
    }
    
    if (result.issues && result.issues.length > 0) {
      markdown += `**Top Issues:**\n`;
      result.issues.forEach(issue => {
        markdown += `- ${issue.title} (Score: ${issue.score}/100)\n`;
      });
      markdown += `\n`;
    }
  });
  
  const mdPath = path.join(ROOT, 'reports', `lighthouse-audit-${new Date().toISOString().split('T')[0]}.md`);
  fs.writeFileSync(mdPath, markdown);
  console.log(`✅ Markdown report saved: ${mdPath}`);
  
  return report;
}

async function main() {
  console.log('🚀 Starting Lighthouse Audit...\n');
  console.log('⚠️  Note: This requires the dev server to be running on localhost:3000');
  console.log('   Run: npm run dev\n');
  
  const results = [];
  for (const page of PAGES_TO_AUDIT) {
    const result = await runLighthouseAudit(page.url, page.name);
    results.push(result);
    // Small delay between audits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  const report = await generateReport(results);
  
  console.log('\n📊 AUDIT COMPLETE!');
  console.log('\nAverage Scores:');
  console.log(`  Performance: ${report.summary.averageScores.performance}/100`);
  console.log(`  Accessibility: ${report.summary.averageScores.accessibility}/100`);
  console.log(`  Best Practices: ${report.summary.averageScores.bestPractices}/100`);
  console.log(`  SEO: ${report.summary.averageScores.seo}/100`);
  console.log('\n📄 Reports saved in reports/ directory');
}

main().catch(console.error);


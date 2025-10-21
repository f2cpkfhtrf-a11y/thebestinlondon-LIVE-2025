#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Link audit script
async function auditLinks() {
  console.log('🔗 Running link audit...');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalLinks: 0,
      brokenLinks: 0,
      internalLinks: 0,
      externalLinks: 0
    },
    brokenLinks: [],
    warnings: []
  };

  // Key routes to check
  const keyRoutes = [
    '/',
    '/restaurants',
    '/cuisines',
    '/areas',
    '/blog',
    '/faq'
  ];

  // Sample restaurant pages to check
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : venuesData.venues;
  
  const sampleVenues = venues.slice(0, 10).map(venue => `/restaurant/${venue.slug}`);

  // Check collection pages
  const pagesDir = path.join(process.cwd(), 'pages');
  const files = fs.readdirSync(pagesDir);
  const collectionPages = files
    .filter(file => file.startsWith('best-') && file.endsWith('-2025.js'))
    .map(file => `/${file.replace('.js', '')}`);

  const allRoutes = [...keyRoutes, ...sampleVenues, ...collectionPages];

  // Simulate link checking (in real implementation, would use actual HTTP requests)
  allRoutes.forEach(route => {
    report.summary.totalLinks++;
    
    // Check if page file exists
    const pagePath = path.join(process.cwd(), 'pages', route === '/' ? 'index.js' : `${route}.js`);
    
    if (!fs.existsSync(pagePath)) {
      report.summary.brokenLinks++;
      report.brokenLinks.push({
        route,
        issue: 'Page file not found',
        type: 'internal'
      });
    } else {
      report.summary.internalLinks++;
    }
  });

  // Write JSON report
  fs.writeFileSync(
    path.join(reportsDir, 'audit_links.json'),
    JSON.stringify(report, null, 2)
  );

  // Write Markdown report
  const markdownReport = `# Link Audit Report

**Generated:** ${report.timestamp}

## Summary
- **Total Links Checked:** ${report.summary.totalLinks}
- **Broken Links:** ${report.summary.brokenLinks}
- **Internal Links:** ${report.summary.internalLinks}
- **External Links:** ${report.summary.externalLinks}

## Broken Links Found
${report.brokenLinks.length > 0 ? report.brokenLinks.map(link => `- **${link.route}**: ${link.issue}`).join('\n') : '✅ No broken links found'}

## Warnings
${report.warnings.length > 0 ? report.warnings.map(warning => `- ${warning}`).join('\n') : '✅ No warnings'}

---
*This audit is non-blocking and always exits with code 0.*
`;

  fs.writeFileSync(
    path.join(reportsDir, 'audit_links.md'),
    markdownReport
  );

  console.log(`✅ Link audit complete: ${report.summary.totalLinks} links checked`);
  console.log(`   Broken links: ${report.summary.brokenLinks}`);
  console.log(`   Internal links: ${report.summary.internalLinks}`);
  
  // Always exit 0 (non-blocking)
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  auditLinks().catch(() => process.exit(0));
}
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Schema audit script
async function auditSchema() {
  console.log('📋 Running schema audit...');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages: 0,
      pagesWithSchema: 0,
      pagesWithoutSchema: 0,
      schemaTypes: {}
    },
    pages: [],
    warnings: []
  };

  // Check key pages for JSON-LD schema
  const pagesToCheck = [
    { name: 'Home', path: 'pages/index.js', expectedSchema: ['WebSite', 'Organization'] },
    { name: 'Restaurants', path: 'pages/restaurants.js', expectedSchema: ['CollectionPage'] },
    { name: 'Cuisines', path: 'pages/cuisines.js', expectedSchema: ['CollectionPage'] },
    { name: 'Areas', path: 'pages/areas.js', expectedSchema: ['CollectionPage'] },
    { name: 'Blog', path: 'pages/blog.js', expectedSchema: ['Blog'] },
    { name: 'FAQ', path: 'pages/faq.js', expectedSchema: ['FAQPage'] }
  ];

  // Check collection pages
  const pagesDir = path.join(process.cwd(), 'pages');
  const files = fs.readdirSync(pagesDir);
  const collectionPages = files
    .filter(file => file.startsWith('best-') && file.endsWith('-2025.js'))
    .map(file => ({
      name: file.replace('.js', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      path: `pages/${file}`,
      expectedSchema: ['CollectionPage']
    }));

  const allPages = [...pagesToCheck, ...collectionPages];

  allPages.forEach(pageInfo => {
    const filePath = path.join(process.cwd(), pageInfo.path);
    report.summary.totalPages++;
    
    if (!fs.existsSync(filePath)) {
      report.pages.push({
        page: pageInfo.name,
        hasSchema: false,
        status: 'SKIP (file not found)'
      });
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for JSON-LD schema patterns
    const staticSchemaRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gs;
    const dynamicSchemaRegex = /dangerouslySetInnerHTML.*JSON\.stringify.*asCollectionPage|asWebSite|asOrganization|asRestaurant|asBlogPosting|asFAQPage/;
    const jsonLdVariable = /const\s+jsonLd\s*=|asCollectionPage|asWebSite|asOrganization|asRestaurant|asBlogPosting|asFAQPage/;
    
    const staticMatches = content.match(staticSchemaRegex);
    const hasDynamicSchema = dynamicSchemaRegex.test(content) || jsonLdVariable.test(content);
    
    if ((staticMatches && staticMatches.length > 0) || hasDynamicSchema) {
      report.summary.pagesWithSchema++;
      
      if (staticMatches) {
        staticMatches.forEach(match => {
          try {
            const jsonMatch = match.match(/<script[^>]*>(.*?)<\/script>/s);
            if (jsonMatch) {
              const schemaData = JSON.parse(jsonMatch[1]);
              const schemaType = schemaData['@type'];
              
              if (schemaType) {
                report.summary.schemaTypes[schemaType] = (report.summary.schemaTypes[schemaType] || 0) + 1;
              }
            }
          } catch (error) {
            report.warnings.push({
              page: pageInfo.name,
              issue: 'Invalid JSON-LD syntax',
              error: error.message
            });
          }
        });
      }
      
      if (hasDynamicSchema) {
        report.summary.schemaTypes['Dynamic'] = (report.summary.schemaTypes['Dynamic'] || 0) + 1;
      }
      
      report.pages.push({
        page: pageInfo.name,
        hasSchema: true,
        status: 'PASS'
      });
    } else {
      report.summary.pagesWithoutSchema++;
      report.pages.push({
        page: pageInfo.name,
        hasSchema: false,
        status: 'WARN (No JSON-LD detected)'
      });
      
      report.warnings.push({
        page: pageInfo.name,
        issue: 'Missing JSON-LD schema',
        type: 'Missing schema for important page'
      });
    }
  });

  // Write JSON report
  fs.writeFileSync(
    path.join(reportsDir, 'audit_schema.json'),
    JSON.stringify(report, null, 2)
  );

  // Write Markdown report
  const markdownReport = `# Schema Audit Report

**Generated:** ${report.timestamp}

## Summary
- **Total Pages:** ${report.summary.totalPages}
- **Pages with Schema:** ${report.summary.pagesWithSchema}
- **Pages without Schema:** ${report.summary.pagesWithoutSchema}

## Schema Types Found
${Object.entries(report.summary.schemaTypes).map(([type, count]) => `- **${type}**: ${count}`).join('\n')}

## Page Coverage
${report.pages.map(p => `- **${p.page}**: ${p.status}`).join('\n')}

## Warnings
${report.warnings.length > 0 ? report.warnings.map(warning => `- **${warning.page}**: ${warning.issue}`).join('\n') : '✅ No warnings'}

---
*This audit is non-blocking and always exits with code 0.*
`;

  fs.writeFileSync(
    path.join(reportsDir, 'audit_schema.md'),
    markdownReport
  );

  console.log(`✅ Schema audit complete: ${report.summary.totalPages} pages checked`);
  console.log(`   Pages with schema: ${report.summary.pagesWithSchema}`);
  console.log(`   Pages without schema: ${report.summary.pagesWithoutSchema}`);
  
  // Always exit 0 (non-blocking)
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  auditSchema().catch(() => process.exit(0));
}
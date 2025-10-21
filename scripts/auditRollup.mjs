#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Audit rollup script
async function auditRollup() {
  console.log('📊 Running audit rollup...');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const rollup = {
    timestamp: new Date().toISOString(),
    summary: {
      overallStatus: 'PASS',
      totalIssues: 0,
      totalWarnings: 0,
      audits: {
        images: { status: 'PASS', issues: 0, warnings: 0 },
        links: { status: 'PASS', issues: 0, warnings: 0 },
        schema: { status: 'PASS', issues: 0, warnings: 0 }
      }
    },
    details: {},
    recommendations: []
  };

  // Load individual audit reports
  const auditFiles = ['audit_images.json', 'audit_links.json', 'audit_schema.json'];
  
  auditFiles.forEach(auditFile => {
    const auditPath = path.join(reportsDir, auditFile);
    if (fs.existsSync(auditPath)) {
      const auditData = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
      const auditType = auditFile.replace('audit_', '').replace('.json', '');
      
      rollup.details[auditType] = auditData;
      
      // Update rollup summary
      const issues = auditData.issues?.length || 0;
      const warnings = auditData.warnings?.length || 0;
      
      rollup.summary.audits[auditType].issues = issues;
      rollup.summary.audits[auditType].warnings = warnings;
      
      if (issues > 0) {
        rollup.summary.audits[auditType].status = 'WARN';
        rollup.summary.totalIssues += issues;
      }
      
      rollup.summary.totalWarnings += warnings;
    }
  });

  // Determine overall status
  if (rollup.summary.totalIssues > 0) {
    rollup.summary.overallStatus = 'WARN';
  }

  // Generate recommendations
  if (rollup.summary.audits.images.issues > 0) {
    rollup.recommendations.push('Review image usage - some venues may be using generic tiles as primary images');
  }
  
  if (rollup.summary.audits.links.issues > 0) {
    rollup.recommendations.push('Fix broken internal links to improve user experience');
  }
  
  if (rollup.summary.audits.schema.issues > 0) {
    rollup.recommendations.push('Add JSON-LD schema to pages missing structured data');
  }

  // Write JSON report
  fs.writeFileSync(
    path.join(reportsDir, 'audit_rollup.json'),
    JSON.stringify(rollup, null, 2)
  );

  // Write Markdown report
  const markdownReport = `# Audit Rollup Report

**Generated:** ${rollup.timestamp}

## Overall Status: ${rollup.summary.overallStatus}

### Summary
- **Total Issues:** ${rollup.summary.totalIssues}
- **Total Warnings:** ${rollup.summary.totalWarnings}

### Audit Results
${Object.entries(rollup.summary.audits).map(([audit, data]) => 
  `- **${audit.toUpperCase()}**: ${data.status} (${data.issues} issues, ${data.warnings} warnings)`
).join('\n')}

### Recommendations
${rollup.recommendations.length > 0 ? 
  rollup.recommendations.map(rec => `- ${rec}`).join('\n') : 
  '✅ No recommendations - all audits passed'}

### Detailed Results
${Object.entries(rollup.details).map(([audit, data]) => 
  `#### ${audit.toUpperCase()}\n- **Status**: ${data.summary ? 'Completed' : 'Not found'}\n- **Issues**: ${data.issues?.length || 0}\n- **Warnings**: ${data.warnings?.length || 0}`
).join('\n\n')}

---
*This audit is non-blocking and always exits with code 0.*
`;

  fs.writeFileSync(
    path.join(reportsDir, 'audit_rollup.md'),
    markdownReport
  );

  console.log(`✅ Audit rollup complete: ${rollup.summary.overallStatus}`);
  console.log(`   Total issues: ${rollup.summary.totalIssues}`);
  console.log(`   Total warnings: ${rollup.summary.totalWarnings}`);
  
  // Always exit 0 (non-blocking)
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  auditRollup().catch(() => process.exit(0));
}
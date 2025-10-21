import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, 'reports/quality_rollup.json');
const REPORT_MD_PATH = path.join(ROOT, 'reports/quality_rollup.md');

async function runAudit(scriptName) {
  try {
    console.log(`🔍 Running ${scriptName}...`);
    const { execSync } = await import('child_process');
    const result = execSync(`node scripts/${scriptName}.mjs`, { 
      encoding: 'utf8',
      cwd: ROOT,
      stdio: 'pipe'
    });
    
    // Try to parse the result as JSON to get the summary
    try {
      const reportPath = path.join(ROOT, `reports/${scriptName.replace('audit', '').replace(/([A-Z])/g, '_$1').toLowerCase()}.json`);
      if (fs.existsSync(reportPath)) {
        return JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      }
    } catch {
      // If we can't parse, return a basic success indicator
      return { status: 'completed', output: result };
    }
  } catch (error) {
    console.log(`⚠️ ${scriptName} failed: ${error.message}`);
    return { status: 'failed', error: error.message };
  }
}

async function auditAllQuality() {
  console.log('🔍 Starting comprehensive quality audit...');
  
  const audits = [
    'auditLinksAndFormatting',
    'auditImagesHealth', 
    'auditSEOJsonLd',
    'auditTilesUniqueness',
    'auditVenueDataWiring',
    'auditLighthouseBatch'
  ];
  
  const results = {};
  let overallStatus = 'GREEN';
  const actionItems = [];
  
  for (const audit of audits) {
    const result = await runAudit(audit);
    results[audit] = result;
    
    // Determine status based on results
    if (result && result.status === 'failed') {
      overallStatus = 'RED';
      actionItems.push(`Fix ${audit} - ${result.error}`);
    } else if (result && result.fail && result.fail > 0) {
      if (overallStatus === 'GREEN') overallStatus = 'YELLOW';
      actionItems.push(`Address ${result.fail} failures in ${audit}`);
    }
  }
  
  // Calculate overall metrics
  const summary = {
    timestamp: new Date().toISOString(),
    overallStatus,
    totalAudits: audits.length,
    completedAudits: Object.values(results).filter(r => r && r.status !== 'failed').length,
    failedAudits: Object.values(results).filter(r => r && r.status === 'failed').length,
    totalIssues: Object.values(results).reduce((sum, r) => sum + (r && r.fail ? r.fail : 0), 0),
    actionItems,
    results
  };

  // Write JSON report
  fs.writeFileSync(REPORT_PATH, JSON.stringify(summary, null, 2));

  // Write Markdown report
  const mdContent = `# Quality Audit Rollup Report

**Generated:** ${new Date().toISOString()}
**Overall Status:** ${overallStatus === 'GREEN' ? '🟢 GREEN' : overallStatus === 'YELLOW' ? '🟡 YELLOW' : '🔴 RED'}

## Summary
- **Total Audits:** ${summary.totalAudits}
- **Completed:** ${summary.completedAudits}
- **Failed:** ${summary.failedAudits}
- **Total Issues:** ${summary.totalIssues}

## Audit Results

${Object.entries(results).map(([name, result]) => `
### ${name}
- **Status:** ${result.status === 'failed' ? '❌ FAILED' : result.fail > 0 ? '⚠️ ISSUES' : '✅ PASS'}
- **Details:** ${result.status === 'failed' ? result.error : 
    result.fail ? `${result.fail} failures out of ${result.total || 'N/A'} checks` : 
    'All checks passed'}
`).join('\n')}

## Action Items
${actionItems.length > 0 ? actionItems.map(item => `- ${item}`).join('\n') : '- No action items required'}

## Next Steps
${overallStatus === 'GREEN' ? 
  'All quality checks passed. Site is ready for production.' :
  overallStatus === 'YELLOW' ? 
  'Some issues found. Review and address before production deployment.' :
  'Critical issues found. Fix all failures before proceeding.'}
`;

  fs.writeFileSync(REPORT_MD_PATH, mdContent);

  console.log(`✅ Quality audit rollup complete: ${overallStatus}`);
  return summary;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditAllQuality().then(result => {
    if (result.overallStatus === 'RED') {
      console.log('❌ Critical issues found - audit failed');
      process.exit(1);
    } else if (result.overallStatus === 'YELLOW') {
      console.log('⚠️ Issues found - review required');
    } else {
      console.log('✅ All quality checks passed');
    }
  });
}

export { auditAllQuality };

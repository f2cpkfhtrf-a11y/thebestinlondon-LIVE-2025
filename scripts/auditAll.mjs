import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

async function runAudit(scriptName) {
  console.log(`🔍 Running ${scriptName}...`);
  try {
    execSync(`node scripts/${scriptName}.mjs`, { stdio: 'inherit', cwd: ROOT });
    return { success: true, script: scriptName };
  } catch (error) {
    console.error(`❌ ${scriptName} failed:`, error.message);
    return { success: false, script: scriptName, error: error.message };
  }
}

async function runAllAudits() {
  const audits = [
    "auditProject",
    "auditDataUsage", 
    "auditImages",
    "auditRoutesLinks",
    "auditDuplicates",
    "auditSEO",
    "auditUX"
  ];

  const results = [];
  const reports = {};

  for (const audit of audits) {
    const result = await runAudit(audit);
    results.push(result);
    
    if (result.success) {
      // Load the generated report
      const reportFile = path.join(REPORT_DIR, `audit_${audit.replace('audit', '').toLowerCase()}.json`);
      if (fs.existsSync(reportFile)) {
        try {
          reports[audit] = JSON.parse(fs.readFileSync(reportFile, "utf8"));
        } catch (e) {
          console.log(`Warning: Could not load report for ${audit}`);
        }
      }
    }
  }

  // Generate rollup report
  const rollup = {
    timestamp: new Date().toISOString(),
    audits: results,
    summary: {
      totalAudits: audits.length,
      successfulAudits: results.filter(r => r.success).length,
      failedAudits: results.filter(r => !r.success).length
    },
    reports: reports
  };

  // Calculate overall metrics
  const metrics = {
    totalPages: reports.auditProject?.summary?.totalPages || 0,
    totalImages: reports.auditImages?.summary?.totalImages || 0,
    totalVenues: reports.auditDataUsage?.summary?.totalVenues || 0,
    dataGaps: reports.auditDataUsage?.summary?.gapsFound || 0,
    imageIssues: reports.auditImages?.summary?.issuesFound || 0,
    routeIssues: reports.auditRoutesLinks?.summary?.issuesFound || 0,
    duplicateIssues: reports.auditDuplicates?.summary?.totalIssues || 0,
    seoIssues: reports.auditSEO?.summary?.totalIssues || 0,
    uxIssues: reports.auditUX?.summary?.totalIssues || 0
  };

  rollup.metrics = metrics;

  // Generate action items
  const actions = {
    do: [],
    defer: [],
    discuss: []
  };

  // Critical issues (DO)
  if (metrics.dataGaps > 100) {
    actions.do.push("Fix critical data gaps in venue information");
  }
  if (metrics.imageIssues > 50) {
    actions.do.push("Resolve image quality and coverage issues");
  }
  if (metrics.routeIssues > 0) {
    actions.do.push("Fix broken routes and links");
  }

  // Important issues (DEFER)
  if (metrics.duplicateIssues > 0) {
    actions.defer.push("Address duplicate content and images");
  }
  if (metrics.seoIssues > 0) {
    actions.defer.push("Improve SEO metadata and structured data");
  }
  if (metrics.uxIssues > 0) {
    actions.defer.push("Enhance UX consistency and component usage");
  }

  // Strategic issues (DISCUSS)
  if (metrics.totalImages > 2000) {
    actions.discuss.push("Consider image optimization strategy for large asset base");
  }
  if (metrics.totalVenues > 1000) {
    actions.discuss.push("Review venue data management and update processes");
  }

  rollup.actions = actions;

  // Save rollup report
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_rollup.json"),
    JSON.stringify(rollup, null, 2)
  );

  // Generate markdown summary
  const markdown = `# Comprehensive Audit Rollup

**Timestamp:** ${rollup.timestamp}

## Executive Summary
- **Total Audits:** ${rollup.summary.totalAudits}
- **Successful:** ${rollup.summary.successfulAudits}
- **Failed:** ${rollup.summary.failedAudits}

## Key Metrics
- **Pages:** ${metrics.totalPages}
- **Images:** ${metrics.totalImages}
- **Venues:** ${metrics.totalVenues}
- **Data Gaps:** ${metrics.dataGaps}
- **Image Issues:** ${metrics.imageIssues}
- **Route Issues:** ${metrics.routeIssues}
- **Duplicate Issues:** ${metrics.duplicateIssues}
- **SEO Issues:** ${metrics.seoIssues}
- **UX Issues:** ${metrics.uxIssues}

## Action Items

### DO (Critical - Fix Now)
${actions.do.length > 0 ? actions.do.map(action => `- ${action}`).join('\n') : '- None'}

### DEFER (Important - Schedule)
${actions.defer.length > 0 ? actions.defer.map(action => `- ${action}`).join('\n') : '- None'}

### DISCUSS (Strategic - Review)
${actions.discuss.length > 0 ? actions.discuss.map(action => `- ${action}`).join('\n') : '- None'}

## Audit Results
${results.map(result => 
  `### ${result.script}
- **Status:** ${result.success ? '✅ Success' : '❌ Failed'}
${result.error ? `- **Error:** ${result.error}` : ''}`
).join('\n')}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_rollup.md"),
    markdown
  );

  console.log("✅ All audits complete. Rollup report generated.");
  return rollup;
}

(async () => {
  try {
    await runAllAudits();
  } catch (error) {
    console.error("❌ Audit rollup failed:", error);
    process.exit(1);
  }
})();

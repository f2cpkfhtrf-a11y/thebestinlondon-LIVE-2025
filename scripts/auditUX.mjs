import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

function scanFiles(dir, extensions = []) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanFiles(fullPath, extensions));
    } else if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function analyzeUX() {
  const report = {
    timestamp: new Date().toISOString(),
    components: {},
    pages: {},
    issues: [],
    summary: {}
  };

  console.log("🔍 Analyzing UX components...");
  
  // Check for PageHero usage
  const pageFiles = scanFiles(path.join(ROOT, "pages"), [".js", ".tsx", ".ts"]);
  const componentFiles = scanFiles(path.join(ROOT, "components"), [".js", ".tsx", ".ts"]);
  
  const pageHeroUsage = [];
  const breadcrumbUsage = [];
  const tabAnchorUsage = [];
  const fsaBadgeUsage = [];
  
  for (const file of pageFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(ROOT, file);
      
      if (content.includes("PageHero")) {
        pageHeroUsage.push(relativePath);
      }
      
      if (content.includes("breadcrumb") || content.includes("Breadcrumb")) {
        breadcrumbUsage.push(relativePath);
      }
      
      if (content.includes("#overview") || content.includes("#menu") || content.includes("#reviews")) {
        tabAnchorUsage.push(relativePath);
      }
      
      if (content.includes("fsa") || content.includes("FSA")) {
        fsaBadgeUsage.push(relativePath);
      }
      
    } catch (error) {
      report.issues.push(`Error reading ${file}: ${error.message}`);
    }
  }

  report.pages = {
    pageHeroUsage: pageHeroUsage,
    breadcrumbUsage: breadcrumbUsage,
    tabAnchorUsage: tabAnchorUsage,
    fsaBadgeUsage: fsaBadgeUsage
  };

  // Check component consistency
  console.log("🔍 Checking component consistency...");
  
  const standardCardFiles = componentFiles.filter(f => f.includes("Card"));
  const heroFiles = componentFiles.filter(f => f.includes("Hero"));
  
  const componentIssues = [];
  
  for (const file of standardCardFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(ROOT, file);
      
      // Check for FSA validation
      if (content.includes("fsa") && !content.includes("isValidFsaScore")) {
        componentIssues.push(`${relativePath}: FSA badge without validation`);
      }
      
      // Check for versioned URLs
      if (content.includes("src=") && !content.includes("appendVersion")) {
        componentIssues.push(`${relativePath}: Image URLs not versioned`);
      }
      
    } catch (error) {
      report.issues.push(`Error reading component ${file}: ${error.message}`);
    }
  }

  report.components = {
    cardFiles: standardCardFiles.map(f => path.relative(ROOT, f)),
    heroFiles: heroFiles.map(f => path.relative(ROOT, f)),
    issues: componentIssues
  };

  // Check for common UX issues
  console.log("🔍 Checking for UX issues...");
  
  const uxIssues = [];
  
  // Check for empty grid patterns
  for (const file of pageFiles) {
    try {
      const content = fs.readFileSync(file, "utf8");
      const relativePath = path.relative(ROOT, file);
      
      if (content.includes("grid") && content.includes("empty")) {
        uxIssues.push(`${relativePath}: Potential empty grid`);
      }
      
      if (content.includes("aspect-ratio") && !content.includes("aspect-square")) {
        uxIssues.push(`${relativePath}: Inconsistent aspect ratios`);
      }
      
    } catch (error) {
      // Skip files that can't be read
    }
  }

  report.issues.push(...uxIssues);

  // Summary
  report.summary = {
    pagesWithPageHero: pageHeroUsage.length,
    pagesWithBreadcrumbs: breadcrumbUsage.length,
    pagesWithTabAnchors: tabAnchorUsage.length,
    pagesWithFsaBadges: fsaBadgeUsage.length,
    componentIssues: componentIssues.length,
    totalIssues: report.issues.length
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_ux.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# UX Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Pages with PageHero:** ${report.summary.pagesWithPageHero}
- **Pages with Breadcrumbs:** ${report.summary.pagesWithBreadcrumbs}
- **Pages with Tab Anchors:** ${report.summary.pagesWithTabAnchors}
- **Pages with FSA Badges:** ${report.summary.pagesWithFsaBadges}
- **Component Issues:** ${report.summary.componentIssues}
- **Total Issues:** ${report.summary.totalIssues}

## Page Analysis
### PageHero Usage (${report.pages.pageHeroUsage.length} pages)
${report.pages.pageHeroUsage.map(page => `- ${page}`).join('\n')}

### Breadcrumb Usage (${report.pages.breadcrumbUsage.length} pages)
${report.pages.breadcrumbUsage.map(page => `- ${page}`).join('\n')}

### Tab Anchor Usage (${report.pages.tabAnchorUsage.length} pages)
${report.pages.tabAnchorUsage.map(page => `- ${page}`).join('\n')}

### FSA Badge Usage (${report.pages.fsaBadgeUsage.length} pages)
${report.pages.fsaBadgeUsage.map(page => `- ${page}`).join('\n')}

## Component Analysis
### Card Components (${report.components.cardFiles.length})
${report.components.cardFiles.map(comp => `- ${comp}`).join('\n')}

### Hero Components (${report.components.heroFiles.length})
${report.components.heroFiles.map(comp => `- ${comp}`).join('\n')}

### Component Issues
${report.components.issues.map(issue => `- ${issue}`).join('\n')}

## UX Issues
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_ux.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeUX();
    saveReports(report);
    console.log("✅ UX audit complete:", report.summary);
  } catch (error) {
    console.error("❌ UX audit failed:", error);
    process.exit(1);
  }
})();

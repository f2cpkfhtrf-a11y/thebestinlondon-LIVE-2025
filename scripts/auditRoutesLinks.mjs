import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");

function scanRoutes() {
  const routes = {
    static: [],
    dynamic: [],
    api: []
  };

  const pagesDir = path.join(ROOT, "pages");
  if (!fs.existsSync(pagesDir)) return routes;

  const scanDir = (dir, prefix = "") => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const route = prefix + "/" + entry.name.replace(/\.(js|tsx|ts)$/, "");
      
      if (entry.isDirectory()) {
        scanDir(fullPath, route);
      } else {
        if (entry.name.startsWith("api")) {
          routes.api.push(route);
        } else if (entry.name.includes("[")) {
          routes.dynamic.push(route);
        } else {
          routes.static.push(route);
        }
      }
    }
  };

  scanDir(pagesDir);
  return routes;
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(ROOT, filePath));
}

function analyzeRoutes() {
  const report = {
    timestamp: new Date().toISOString(),
    routes: {},
    issues: [],
    summary: {}
  };

  console.log("🔍 Analyzing routes...");
  const routes = scanRoutes();
  
  report.routes = routes;

  // Check for common issues
  const expectedStatic = ["/", "/about", "/contact", "/privacy", "/terms", "/cookies"];
  const expectedDynamic = ["/restaurant/[slug]", "/areas/[slug]", "/blog/[slug]", "/faq/[slug]"];

  for (const route of expectedStatic) {
    const filePath = route === "/" ? "pages/index.js" : `pages${route}.js`;
    if (!checkFileExists(filePath)) {
      report.issues.push(`Missing static route: ${route}`);
    }
  }

  // Check dynamic routes
  const dynamicFiles = [
    "pages/restaurant/[slug].js",
    "pages/areas/[slug].js", 
    "pages/blog/[slug].js",
    "pages/faq/[slug].js"
  ];

  for (const file of dynamicFiles) {
    if (!checkFileExists(file)) {
      report.issues.push(`Missing dynamic route: ${file}`);
    }
  }

  report.summary = {
    totalRoutes: routes.static.length + routes.dynamic.length + routes.api.length,
    staticRoutes: routes.static.length,
    dynamicRoutes: routes.dynamic.length,
    apiRoutes: routes.api.length,
    issuesFound: report.issues.length
  };

  return report;
}

function analyzeLinks() {
  const report = {
    timestamp: new Date().toISOString(),
    internalLinks: [],
    externalLinks: [],
    issues: [],
    summary: {}
  };

  console.log("🔍 Analyzing links...");
  
  // Scan for links in components and pages
  const files = [
    ...scanDirectory(path.join(ROOT, "components"), [".js", ".tsx", ".ts"]),
    ...scanDirectory(path.join(ROOT, "pages"), [".js", ".tsx", ".ts"])
  ];

  const linkPatterns = [
    /href=["']([^"']+)["']/g,
    /to=["']([^"']+)["']/g,
    /Link.*href=["']([^"']+)["']/g
  ];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, "utf8");
      
      for (const pattern of linkPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const link = match[1];
          if (link.startsWith("/")) {
            report.internalLinks.push({
              file: path.relative(ROOT, file),
              link: link
            });
          } else if (link.startsWith("http")) {
            report.externalLinks.push({
              file: path.relative(ROOT, file),
              link: link
            });
          }
        }
      }
    } catch (error) {
      report.issues.push(`Error reading ${file}: ${error.message}`);
    }
  }

  // Check for common broken links
  const commonBroken = ["/menu", "/reviews", "/location", "/similar"];
  for (const link of report.internalLinks) {
    if (commonBroken.some(broken => link.link.includes(broken))) {
      report.issues.push(`Potential broken link: ${link.link} in ${link.file}`);
    }
  }

  report.summary = {
    totalInternalLinks: report.internalLinks.length,
    totalExternalLinks: report.externalLinks.length,
    issuesFound: report.issues.length
  };

  return report;
}

function scanDirectory(dir, extensions = []) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...scanDirectory(fullPath, extensions));
    } else if (extensions.length === 0 || extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function saveReports(routesReport, linksReport) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON reports
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_routes.json"),
    JSON.stringify(routesReport, null, 2)
  );
  
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_links.json"),
    JSON.stringify(linksReport, null, 2)
  );

  // Markdown report
  const markdown = `# Routes & Links Audit Report

**Timestamp:** ${routesReport.timestamp}

## Routes Summary
- **Total Routes:** ${routesReport.summary.totalRoutes}
- **Static Routes:** ${routesReport.summary.staticRoutes}
- **Dynamic Routes:** ${routesReport.summary.dynamicRoutes}
- **API Routes:** ${routesReport.summary.apiRoutes}
- **Issues Found:** ${routesReport.summary.issuesFound}

## Links Summary
- **Internal Links:** ${linksReport.summary.totalInternalLinks}
- **External Links:** ${linksReport.summary.totalExternalLinks}
- **Issues Found:** ${linksReport.summary.issuesFound}

## Static Routes
${routesReport.routes.static.map(route => `- ${route}`).join('\n')}

## Dynamic Routes
${routesReport.routes.dynamic.map(route => `- ${route}`).join('\n')}

## API Routes
${routesReport.routes.api.map(route => `- ${route}`).join('\n')}

## Issues
${routesReport.issues.length > 0 ? routesReport.issues.map(issue => `- ${issue}`).join('\n') : '- None'}

## Link Issues
${linksReport.issues.length > 0 ? linksReport.issues.map(issue => `- ${issue}`).join('\n') : '- None'}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_routes.md"),
    markdown
  );
}

(async () => {
  try {
    const routesReport = analyzeRoutes();
    const linksReport = analyzeLinks();
    saveReports(routesReport, linksReport);
    console.log("✅ Routes & links audit complete:", routesReport.summary, linksReport.summary);
  } catch (error) {
    console.error("❌ Routes & links audit failed:", error);
    process.exit(1);
  }
})();

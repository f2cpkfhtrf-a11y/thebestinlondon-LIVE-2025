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

function extractSEOMeta(content) {
  const seo = {
    title: null,
    description: null,
    canonical: null,
    ogImage: null,
    twitterImage: null,
    jsonLd: []
  };

  // Extract title
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) seo.title = titleMatch[1];

  // Extract meta description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (descMatch) seo.description = descMatch[1];

  // Extract canonical
  const canonMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (canonMatch) seo.canonical = canonMatch[1];

  // Extract og:image
  const ogImageMatch = content.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (ogImageMatch) seo.ogImage = ogImageMatch[1];

  // Extract twitter:image
  const twitterImageMatch = content.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  if (twitterImageMatch) seo.twitterImage = twitterImageMatch[1];

  // Extract JSON-LD
  const jsonLdMatches = content.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi);
  if (jsonLdMatches) {
    for (const match of jsonLdMatches) {
      try {
        const jsonContent = match.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/, '').replace(/<\/script>/, '');
        const parsed = JSON.parse(jsonContent);
        seo.jsonLd.push(parsed);
      } catch (e) {
        // Invalid JSON-LD
      }
    }
  }

  return seo;
}

function analyzeSEO() {
  const report = {
    timestamp: new Date().toISOString(),
    pages: {},
    issues: [],
    summary: {}
  };

  console.log("🔍 Analyzing SEO...");
  
  // Key pages to check
  const keyPages = [
    { path: "pages/index.js", type: "home" },
    { path: "pages/restaurants.js", type: "list" },
    { path: "pages/cuisines.js", type: "list" },
    { path: "pages/areas.js", type: "list" },
    { path: "pages/blog/index.js", type: "blog_index" },
    { path: "pages/faq/index.js", type: "faq_index" },
    { path: "pages/restaurant/[slug].js", type: "venue" },
    { path: "pages/blog/[slug].js", type: "blog_post" },
    { path: "pages/faq/[slug].js", type: "faq_item" }
  ];

  const pageAnalysis = {};

  for (const page of keyPages) {
    const filePath = path.join(ROOT, page.path);
    if (!fs.existsSync(filePath)) {
      report.issues.push(`Missing page: ${page.path}`);
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf8");
      const seo = extractSEOMeta(content);
      
      pageAnalysis[page.path] = {
        type: page.type,
        seo: seo,
        issues: []
      };

      // Check for common SEO issues
      if (!seo.title) {
        pageAnalysis[page.path].issues.push("Missing title");
      }
      if (!seo.description) {
        pageAnalysis[page.path].issues.push("Missing meta description");
      }
      if (!seo.canonical) {
        pageAnalysis[page.path].issues.push("Missing canonical URL");
      }
      if (!seo.ogImage) {
        pageAnalysis[page.path].issues.push("Missing og:image");
      }
      if (!seo.twitterImage) {
        pageAnalysis[page.path].issues.push("Missing twitter:image");
      }

      // Check JSON-LD
      const expectedTypes = {
        home: ["WebSite"],
        list: ["CollectionPage", "ItemList"],
        venue: ["Restaurant"],
        blog_index: ["CollectionPage"],
        blog_post: ["BlogPosting"],
        faq_index: ["CollectionPage"],
        faq_item: ["FAQPage"]
      };

      const expected = expectedTypes[page.type] || [];
      const foundTypes = seo.jsonLd.map(item => item["@type"]).filter(Boolean);
      
      for (const expectedType of expected) {
        if (!foundTypes.includes(expectedType)) {
          pageAnalysis[page.path].issues.push(`Missing JSON-LD type: ${expectedType}`);
        }
      }

    } catch (error) {
      report.issues.push(`Error reading ${page.path}: ${error.message}`);
    }
  }

  report.pages = pageAnalysis;

  // Summary
  const totalIssues = Object.values(pageAnalysis).reduce((sum, page) => sum + page.issues.length, 0) + report.issues.length;
  
  report.summary = {
    pagesAnalyzed: Object.keys(pageAnalysis).length,
    totalIssues: totalIssues,
    pagesWithIssues: Object.values(pageAnalysis).filter(page => page.issues.length > 0).length
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_seo.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# SEO Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Pages Analyzed:** ${report.summary.pagesAnalyzed}
- **Total Issues:** ${report.summary.totalIssues}
- **Pages With Issues:** ${report.summary.pagesWithIssues}

## Page Analysis
${Object.entries(report.pages).map(([path, analysis]) => 
  `### ${path} (${analysis.type})
**Issues:** ${analysis.issues.length}
${analysis.issues.length > 0 ? analysis.issues.map(issue => `- ${issue}`).join('\n') : '- None'}

**SEO Elements:**
- Title: ${analysis.seo.title ? '✅' : '❌'}
- Description: ${analysis.seo.description ? '✅' : '❌'}
- Canonical: ${analysis.seo.canonical ? '✅' : '❌'}
- og:image: ${analysis.seo.ogImage ? '✅' : '❌'}
- twitter:image: ${analysis.seo.twitterImage ? '✅' : '❌'}
- JSON-LD: ${analysis.seo.jsonLd.length} found
`
).join('\n')}

## General Issues
${report.issues.length > 0 ? report.issues.map(issue => `- ${issue}`).join('\n') : '- None'}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_seo.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeSEO();
    saveReports(report);
    console.log("✅ SEO audit complete:", report.summary);
  } catch (error) {
    console.error("❌ SEO audit failed:", error);
    process.exit(1);
  }
})();

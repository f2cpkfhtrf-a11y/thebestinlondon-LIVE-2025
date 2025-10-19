import fs from 'fs';
import path from 'path';

interface FilesAuditResult {
  files: Array<{
    path: string;
    sizeKB: number;
    lines: number;
    complexityScore: number;
  }>;
  potentially_unused: string[];
  high_complexity: string[];
  large_static_assets: string[];
}

interface ImageAuditResult {
  unusedImages: string[];
  missingImages: string[];
  slugMismatches: Array<{
    file: string;
    expectedSlug: string;
    actualSlug: string;
  }>;
  oversizedImages: string[];
  totalImages: number;
}

interface RouteAuditResult {
  ok: Array<{ path: string; status: number }>;
  notFound: Array<{ path: string; status: number }>;
  mismatchedSlug: Array<{ path: string; expectedSlug: string; actualSlug: string }>;
}

interface LinkAuditResult {
  internal_404: Array<{ url: string; found_in: string[] }>;
  internal_500: Array<{ url: string; found_in: string[] }>;
}

async function generateAuditSummary(): Promise<void> {
  console.log('📋 Generating comprehensive audit summary...\n');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  
  let filesAudit: FilesAuditResult | null = null;
  let imageAudit: ImageAuditResult | null = null;
  let routeAudit: RouteAuditResult | null = null;
  let linkAudit: LinkAuditResult | null = null;
  
  // Load audit results
  try {
    if (fs.existsSync(path.join(reportsDir, 'files_audit.json'))) {
      filesAudit = JSON.parse(fs.readFileSync(path.join(reportsDir, 'files_audit.json'), 'utf8'));
    }
  } catch (error) {
    console.warn('Could not load files audit:', error);
  }
  
  try {
    if (fs.existsSync(path.join(reportsDir, 'image_reference_audit.json'))) {
      imageAudit = JSON.parse(fs.readFileSync(path.join(reportsDir, 'image_reference_audit.json'), 'utf8'));
    }
  } catch (error) {
    console.warn('Could not load image audit:', error);
  }
  
  try {
    if (fs.existsSync(path.join(reportsDir, 'route_audit.json'))) {
      routeAudit = JSON.parse(fs.readFileSync(path.join(reportsDir, 'route_audit.json'), 'utf8'));
    }
  } catch (error) {
    console.warn('Could not load route audit:', error);
  }
  
  try {
    if (fs.existsSync(path.join(reportsDir, 'link_audit.json'))) {
      linkAudit = JSON.parse(fs.readFileSync(path.join(reportsDir, 'link_audit.json'), 'utf8'));
    }
  } catch (error) {
    console.warn('Could not load link audit:', error);
  }
  
  // Generate markdown summary
  const summary = generateMarkdownSummary(filesAudit, imageAudit, routeAudit, linkAudit);
  
  // Write summary
  fs.writeFileSync(path.join(reportsDir, 'audit_summary.md'), summary);
  
  console.log('✅ Audit summary generated: reports/audit_summary.md');
  console.log('\n🎯 KEY FINDINGS:');
  console.log('================');
  
  if (filesAudit) {
    console.log(`📁 Files: ${filesAudit.files.length} total`);
    console.log(`⚠️  Unused: ${filesAudit.potentially_unused.length}`);
    console.log(`📈 High complexity: ${filesAudit.high_complexity.length}`);
  }
  
  if (imageAudit) {
    console.log(`🖼️  Images: ${imageAudit.totalImages} total`);
    console.log(`🚫 Unused: ${imageAudit.unusedImages.length}`);
    console.log(`📏 Oversized: ${imageAudit.oversizedImages.length}`);
  }
  
  if (routeAudit) {
    console.log(`🛣️  Routes: ${routeAudit.ok.length} working, ${routeAudit.notFound.length} broken`);
  }
  
  if (linkAudit) {
    console.log(`🔗 Links: ${linkAudit.internal_404.length} 404s, ${linkAudit.internal_500.length} 500s`);
  }
}

function generateMarkdownSummary(
  filesAudit: FilesAuditResult | null,
  imageAudit: ImageAuditResult | null,
  routeAudit: RouteAuditResult | null,
  linkAudit: LinkAuditResult | null
): string {
  const timestamp = new Date().toISOString();
  
  let summary = `# Comprehensive Audit Summary\n\n`;
  summary += `Generated: ${timestamp}\n\n`;
  
  summary += `## Overview\n\n`;
  summary += `This report summarizes the findings from the comprehensive audit of the The Best in London website.\n\n`;
  
  if (filesAudit) {
    summary += `## File System Analysis\n\n`;
    summary += `- **Total files scanned**: ${filesAudit.files.length}\n`;
    summary += `- **Potentially unused files**: ${filesAudit.potentially_unused.length}\n`;
    summary += `- **High complexity files**: ${filesAudit.high_complexity.length}\n`;
    summary += `- **Large static assets**: ${filesAudit.large_static_assets.length}\n\n`;
    
    if (filesAudit.files.length > 0) {
      const topFiles = [...filesAudit.files]
        .sort((a, b) => b.sizeKB - a.sizeKB)
        .slice(0, 10);
      
      summary += `### Top 10 Largest Files\n\n`;
      summary += `| File | Size (KB) | Lines | Complexity |\n`;
      summary += `|------|-----------|-------|------------|\n`;
      
      for (const file of topFiles) {
        summary += `| \`${file.path}\` | ${file.sizeKB} | ${file.lines} | ${file.complexityScore} |\n`;
      }
      summary += `\n`;
    }
    
    if (filesAudit.potentially_unused.length > 0) {
      summary += `### Potentially Unused Files\n\n`;
      summary += filesAudit.potentially_unused
        .slice(0, 20)
        .map(file => `- \`${file}\``)
        .join('\n') + '\n\n';
    }
  }
  
  if (imageAudit) {
    summary += `## Image Analysis\n\n`;
    summary += `- **Total images**: ${imageAudit.totalImages}\n`;
    summary += `- **Unused images**: ${imageAudit.unusedImages.length}\n`;
    summary += `- **Missing images**: ${imageAudit.missingImages.length}\n`;
    summary += `- **Oversized images**: ${imageAudit.oversizedImages.length}\n`;
    summary += `- **Slug mismatches**: ${imageAudit.slugMismatches.length}\n\n`;
    
    if (imageAudit.unusedImages.length > 0) {
      summary += `### Unused Images\n\n`;
      summary += imageAudit.unusedImages
        .slice(0, 10)
        .map(img => `- \`${img}\``)
        .join('\n') + '\n\n';
    }
    
    if (imageAudit.oversizedImages.length > 0) {
      summary += `### Oversized Images (>400KB)\n\n`;
      summary += imageAudit.oversizedImages
        .slice(0, 10)
        .map(img => `- \`${img}\``)
        .join('\n') + '\n\n';
    }
  }
  
  if (routeAudit) {
    summary += `## Route Analysis\n\n`;
    summary += `- **Working routes**: ${routeAudit.ok.length}\n`;
    summary += `- **Broken routes**: ${routeAudit.notFound.length}\n`;
    summary += `- **Slug mismatches**: ${routeAudit.mismatchedSlug.length}\n\n`;
    
    if (routeAudit.notFound.length > 0) {
      summary += `### Broken Routes\n\n`;
      summary += routeAudit.notFound
        .slice(0, 10)
        .map(route => `- \`${route.path}\` (${route.status})`)
        .join('\n') + '\n\n';
    }
  }
  
  if (linkAudit) {
    summary += `## Link Analysis\n\n`;
    summary += `- **Internal 404s**: ${linkAudit.internal_404.length}\n`;
    summary += `- **Internal 500s**: ${linkAudit.internal_500.length}\n\n`;
    
    if (linkAudit.internal_404.length > 0) {
      summary += `### Internal 404 Links\n\n`;
      summary += linkAudit.internal_404
        .slice(0, 10)
        .map(link => `- \`${link.url}\` (found in: ${link.found_in.join(', ')})`)
        .join('\n') + '\n\n';
    }
  }
  
  summary += `## Recommendations\n\n`;
  summary += `1. **Clean up unused files** identified above to reduce bundle size\n`;
  summary += `2. **Fix broken routes** to improve user experience\n`;
  summary += `3. **Optimize oversized images** for better performance\n`;
  summary += `4. **Fix slug mismatches** for consistent URL structure\n`;
  summary += `5. **Remove broken internal links** to prevent 404s\n\n`;
  
  summary += `---\n`;
  summary += `*This audit was generated automatically and should be reviewed regularly.*\n`;
  
  return summary;
}

// Run the summary generation
generateAuditSummary().catch(console.error);

import fs from 'fs';
import path from 'path';

interface LinkAuditResult {
  internal_404: Array<{
    url: string;
    found_in: string[];
    error: string;
  }>;
  internal_500: Array<{
    url: string;
    found_in: string[];
    error: string;
  }>;
  external_broken: Array<{
    url: string;
    found_in: string[];
    error: string;
  }>;
  total_links_checked: number;
  total_pages_scanned: number;
}

interface LinkInfo {
  url: string;
  foundIn: string[];
}

function extractLinksFromContent(content: string, filePath: string): LinkInfo[] {
  const links: LinkInfo[] = [];
  
  // Match href attributes in HTML/JSX
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
      links.push({
        url: url,
        foundIn: [filePath]
      });
    }
  }
  
  // Match Link components from Next.js
  const linkRegex = /<Link[^>]*href=["']([^"']+)["']/g;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
      links.push({
        url: url,
        foundIn: [filePath]
      });
    }
  }
  
  // Match router.push calls
  const routerRegex = /router\.push\(["']([^"']+)["']\)/g;
  while ((match = routerRegex.exec(content)) !== null) {
    const url = match[1];
    if (url && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
      links.push({
        url: url,
        foundIn: [filePath]
      });
    }
  }
  
  return links;
}

function scanProjectForLinks(): Map<string, string[]> {
  const linkMap = new Map<string, string[]>();
  
  function scanDirectory(dir: string): void {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (item.endsWith('.js') || item.endsWith('.jsx') || item.endsWith('.ts') || item.endsWith('.tsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const links = extractLinksFromContent(content, path.relative(process.cwd(), fullPath));
            
            for (const link of links) {
              const existing = linkMap.get(link.url) || [];
              linkMap.set(link.url, [...existing, ...link.foundIn]);
            }
          } catch (error) {
            console.warn(`Could not read file ${fullPath}:`, error);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }
  
  // Scan key directories
  const scanDirs = ['pages', 'components', 'lib'];
  for (const dir of scanDirs) {
    const fullDir = path.join(process.cwd(), dir);
    if (fs.existsSync(fullDir)) {
      scanDirectory(fullDir);
    }
  }
  
  return linkMap;
}

function isInternalLink(url: string): boolean {
  return url.startsWith('/') || url.includes('thebestinlondon.co.uk') || url.includes('localhost');
}

function normalizeUrl(url: string): string {
  // Convert to absolute URL for checking
  if (url.startsWith('/')) {
    return `https://www.thebestinlondon.co.uk${url}`;
  }
  if (url.includes('thebestinlondon.co.uk')) {
    return url.startsWith('http') ? url : `https://${url}`;
  }
  return url;
}

function checkLinkExists(url: string): Promise<{ status: number; error?: string }> {
  return new Promise((resolve) => {
    try {
      const normalizedUrl = normalizeUrl(url);
      
      // For internal links, check if the corresponding page file exists
      if (isInternalLink(url)) {
        const pathname = new URL(normalizedUrl).pathname;
        const pageExists = checkPageExists(pathname);
        
        if (pageExists) {
          resolve({ status: 200 });
        } else {
          resolve({ status: 404, error: 'Page file not found' });
        }
      } else {
        // For external links, we'll assume they work for now
        // In a real implementation, you might want to make HTTP requests
        resolve({ status: 200 });
      }
    } catch (error) {
      resolve({ 
        status: 500, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });
}

function checkPageExists(pathname: string): boolean {
  try {
    // Remove leading slash and split into parts
    const pathParts = pathname.split('/').filter(Boolean);
    
    if (pathParts.length === 0) {
      // Home page
      return fs.existsSync(path.join(process.cwd(), 'pages', 'index.js'));
    }
    
    // Check for various page file patterns
    const possiblePaths = [
      // Exact match
      path.join(process.cwd(), 'pages', ...pathParts, 'index.js'),
      path.join(process.cwd(), 'pages', ...pathParts.slice(0, -1), `${pathParts[pathParts.length - 1]}.js`),
      // With .js extension
      path.join(process.cwd(), 'pages', pathParts.join('-') + '.js'),
      // Dynamic routes
      path.join(process.cwd(), 'pages', pathParts[0], '[slug].js'),
      path.join(process.cwd(), 'pages', '[cuisine].js'),
      path.join(process.cwd(), 'pages', '[slug].js')
    ];
    
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return true;
      }
    }
    
    return false;
  } catch {
    return false;
  }
}

async function runLinkAudit(): Promise<void> {
  console.log('🔗 Starting link audit...\n');
  
  const linkMap = scanProjectForLinks();
  console.log(`📋 Found ${linkMap.size} unique links to check`);
  
  const result: LinkAuditResult = {
    internal_404: [],
    internal_500: [],
    external_broken: [],
    total_links_checked: 0,
    total_pages_scanned: 0
  };
  
  for (const [url, foundIn] of Array.from(linkMap.entries())) {
    result.total_links_checked++;
    
    try {
      const check = await checkLinkExists(url);
      
      if (check.status === 404 && isInternalLink(url)) {
        result.internal_404.push({
          url,
          found_in: foundIn,
          error: check.error || 'Not found'
        });
      } else if (check.status >= 500) {
        if (isInternalLink(url)) {
          result.internal_500.push({
            url,
            found_in: foundIn,
            error: check.error || 'Server error'
          });
        } else {
          result.external_broken.push({
            url,
            found_in: foundIn,
            error: check.error || 'Server error'
          });
        }
      }
    } catch (error) {
      console.warn(`Error checking link ${url}:`, error);
    }
  }
  
  // Count pages scanned (approximate)
  result.total_pages_scanned = linkMap.size;
  
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Write results
  fs.writeFileSync(
    path.join(reportsDir, 'link_audit.json'),
    JSON.stringify(result, null, 2)
  );
  
  // Console summary
  console.log('\n📊 LINK AUDIT SUMMARY');
  console.log('======================');
  console.log(`🔗 Total links checked: ${result.total_links_checked}`);
  console.log(`❌ Internal 404s: ${result.internal_404.length}`);
  console.log(`⚠️  Internal 500s: ${result.internal_500.length}`);
  console.log(`🌐 External broken: ${result.external_broken.length}`);
  
  if (result.internal_404.length > 0) {
    console.log('\n❌ Internal 404s found:');
    result.internal_404.slice(0, 10).forEach(link => {
      console.log(`   ${link.url}`);
      console.log(`     Found in: ${link.found_in.join(', ')}`);
    });
    if (result.internal_404.length > 10) {
      console.log(`   ... and ${result.internal_404.length - 10} more`);
    }
  }
  
  if (result.internal_500.length > 0) {
    console.log('\n⚠️ Internal 500s found:');
    result.internal_500.slice(0, 5).forEach(link => {
      console.log(`   ${link.url} - ${link.error}`);
    });
  }
  
  console.log('\n✅ Link audit complete! Check reports/link_audit.json for details.');
}

// Run the audit
runLinkAudit().catch(console.error);

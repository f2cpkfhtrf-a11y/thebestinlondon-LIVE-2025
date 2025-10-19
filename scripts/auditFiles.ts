import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface FileInfo {
  path: string;
  sizeKB: number;
  lines: number;
  importCount: number;
  exportCount: number;
  complexityScore: number;
  lastModified: string;
  type: string;
}

interface AuditResult {
  files: FileInfo[];
  potentially_unused: string[];
  duplicated: Array<{
    files: string[];
    hash: string;
    sizeKB: number;
  }>;
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
  totalSizeMB: number;
}

function calculateFileHash(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  } catch {
    return '';
  }
}

function countImportsAndExports(filePath: string): { imports: number; exports: number } {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    let imports = 0;
    let exports = 0;
    
    for (const line of lines) {
      if (line.includes('import ') && (line.includes(' from ') || line.includes('('))) {
        imports++;
      }
      if (line.includes('export ') || (line.includes('module.exports') && !line.includes('import'))) {
        exports++;
      }
    }
    
    return { imports, exports };
  } catch {
    return { imports: 0, exports: 0 };
  }
}

function scanDirectory(dir: string, baseDir: string, excludeDirs: Set<string>): FileInfo[] {
  const files: FileInfo[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(baseDir, fullPath);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!excludeDirs.has(item) && !item.startsWith('.')) {
          files.push(...scanDirectory(fullPath, baseDir, excludeDirs));
        }
      } else {
        const ext = path.extname(item);
        if (['.ts', '.tsx', '.js', '.jsx', '.json', '.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
          try {
            const lines = ext !== '.webp' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' 
              ? fs.readFileSync(fullPath, 'utf8').split('\n').length 
              : 0;
            
            const { imports, exports } = (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx') 
              ? countImportsAndExports(fullPath) 
              : { imports: 0, exports: 0 };
            
            files.push({
              path: relativePath.replace(/\\/g, '/'),
              sizeKB: Math.round(stat.size / 1024),
              lines,
              importCount: imports,
              exportCount: exports,
              complexityScore: imports + lines,
              lastModified: stat.mtime.toISOString(),
              type: ext.substring(1)
            });
          } catch (error) {
            console.warn(`Could not process file ${fullPath}:`, error);
          }
        }
      }
    }
  } catch (error) {
    console.warn(`Could not scan directory ${dir}:`, error);
  }
  
  return files;
}

function findUnusedFiles(files: FileInfo[]): string[] {
  const codeFiles = files.filter(f => ['ts', 'tsx', 'js', 'jsx'].includes(f.type));
  const potentiallyUnused: string[] = [];
  
  for (const file of codeFiles) {
    const fileName = path.basename(file.path, path.extname(file.path));
    const isImported = files.some(f => {
      if (f.type === 'js' || f.type === 'ts' || f.type === 'tsx' || f.type === 'jsx') {
        try {
          const content = fs.readFileSync(path.join(process.cwd(), f.path), 'utf8');
          return content.includes(`import.*${fileName}`) || 
                 content.includes(`require.*${fileName}`) ||
                 content.includes(`from.*${fileName}`) ||
                 content.includes(`'${fileName}'`) ||
                 content.includes(`"${fileName}"`);
        } catch {
          return false;
        }
      }
      return false;
    });
    
    // Exclude entry points and common files
    if (!isImported && 
        !file.path.includes('pages/_') && 
        !file.path.includes('components/') ||
        file.path.includes('index.') ||
        file.path.includes('layout.') ||
        file.path.includes('_app') ||
        file.path.includes('_document')) {
      potentiallyUnused.push(file.path);
    }
  }
  
  return potentiallyUnused;
}

function findDuplicatedFiles(files: FileInfo[]): Array<{files: string[], hash: string, sizeKB: number}> {
  const hashMap = new Map<string, string[]>();
  const duplicates: Array<{files: string[], hash: string, sizeKB: number}> = [];
  
  for (const file of files) {
    if (file.sizeKB > 10) { // Only check files larger than 10KB
      const hash = calculateFileHash(path.join(process.cwd(), file.path));
      if (hash) {
        if (!hashMap.has(hash)) {
          hashMap.set(hash, []);
        }
        hashMap.get(hash)!.push(file.path);
      }
    }
  }
  
  for (const [hash, fileList] of hashMap.entries()) {
    if (fileList.length > 1) {
      const firstFile = files.find(f => f.path === fileList[0]);
      duplicates.push({
        files: fileList,
        hash,
        sizeKB: firstFile?.sizeKB || 0
      });
    }
  }
  
  return duplicates;
}

function auditImages(): ImageAuditResult {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const result: ImageAuditResult = {
    unusedImages: [],
    missingImages: [],
    slugMismatches: [],
    oversizedImages: [],
    totalImages: 0,
    totalSizeMB: 0
  };
  
  if (!fs.existsSync(imagesDir)) {
    return result;
  }
  
  // Get all image files
  const imageFiles: string[] = [];
  function scanImages(dir: string, base: string) {
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativePath = path.relative(base, fullPath);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanImages(fullPath, base);
        } else if (item.match(/\.(webp|jpg|jpeg|png)$/i)) {
          imageFiles.push(relativePath.replace(/\\/g, '/'));
          const sizeMB = stat.size / (1024 * 1024);
          result.totalSizeMB += sizeMB;
          result.totalImages++;
          
          if (sizeMB > 0.4) { // 400KB
            result.oversizedImages.push(relativePath.replace(/\\/g, '/'));
          }
        }
      }
    } catch (error) {
      console.warn(`Could not scan images directory ${dir}:`, error);
    }
  }
  
  scanImages(imagesDir, imagesDir);
  
  // Check references in venues.json and other data files
  try {
    const venuesPath = path.join(process.cwd(), 'public/venues.json');
    if (fs.existsSync(venuesPath)) {
      const venuesContent = fs.readFileSync(venuesPath, 'utf8');
      
      for (const imageFile of imageFiles) {
        const imageName = path.basename(imageFile);
        if (!venuesContent.includes(imageName) && !imageFile.includes('.blur.')) {
          // Check if referenced in code
          const isReferenced = scanCodebaseForImage(imageName);
          if (!isReferenced) {
            result.unusedImages.push(imageFile);
          }
        }
      }
    }
  } catch (error) {
    console.warn('Could not check venue references:', error);
  }
  
  // Check slug mismatches for area/cuisine images
  for (const imageFile of imageFiles) {
    if (imageFile.includes('/areas/') || imageFile.includes('/cuisines/')) {
      const expectedSlug = path.basename(imageFile, path.extname(imageFile))
        .replace(/-hero$/, '')
        .replace(/-card$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '');
      
      const actualSlug = path.basename(imageFile, path.extname(imageFile));
      
      if (expectedSlug !== actualSlug) {
        result.slugMismatches.push({
          file: imageFile,
          expectedSlug,
          actualSlug
        });
      }
    }
  }
  
  return result;
}

function scanCodebaseForImage(imageName: string): boolean {
  try {
    const searchDirs = ['pages', 'components', 'lib', 'data'];
    
    for (const dir of searchDirs) {
      const fullDir = path.join(process.cwd(), dir);
      if (fs.existsSync(fullDir)) {
        const files = getAllFiles(fullDir, ['.ts', '.tsx', '.js', '.jsx']);
        for (const file of files) {
          try {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes(imageName)) {
              return true;
            }
          } catch {
            // Ignore files that can't be read
          }
        }
      }
    }
  } catch {
    // Ignore errors in search
  }
  
  return false;
}

function getAllFiles(dir: string, extensions: string[]): string[] {
  const files: string[] = [];
  
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  } catch {
    // Ignore errors
  }
  
  return files;
}

async function runFileAudit(): Promise<void> {
  console.log('🔍 Starting comprehensive file audit...\n');
  
  const excludeDirs = new Set(['node_modules', '.vercel', '.git', '.next']);
  const baseDir = process.cwd();
  
  // Scan all files
  console.log('📁 Scanning project files...');
  const files = scanDirectory(baseDir, baseDir, excludeDirs);
  
  // Analyze files
  console.log('🔍 Analyzing file patterns...');
  const potentiallyUnused = findUnusedFiles(files);
  const duplicates = findDuplicatedFiles(files);
  const highComplexity = files
    .filter(f => f.lines > 400 || f.complexityScore > 10)
    .map(f => f.path);
  const largeAssets = files
    .filter(f => f.sizeKB > 500 && !f.path.includes('.webp') && !f.path.includes('.jpg'))
    .map(f => f.path);
  
  const fileAudit: AuditResult = {
    files,
    potentially_unused: potentiallyUnused,
    duplicated: duplicates,
    high_complexity: highComplexity,
    large_static_assets: largeAssets
  };
  
  // Audit images
  console.log('🖼️ Auditing images...');
  const imageAudit = auditImages();
  
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Write results
  fs.writeFileSync(
    path.join(reportsDir, 'files_audit.json'),
    JSON.stringify(fileAudit, null, 2)
  );
  
  fs.writeFileSync(
    path.join(reportsDir, 'image_reference_audit.json'),
    JSON.stringify(imageAudit, null, 2)
  );
  
  // Generate summary
  console.log('\n📊 AUDIT SUMMARY');
  console.log('==================');
  console.log(`✅ Total files scanned: ${files.length}`);
  console.log(`⚠️  Potentially unused: ${potentiallyUnused.length}`);
  console.log(`🔄 Duplicated files: ${duplicates.length}`);
  console.log(`📈 High complexity: ${highComplexity.length}`);
  console.log(`💾 Large assets: ${largeAssets.length}`);
  console.log(`🖼️  Total images: ${imageAudit.totalImages}`);
  console.log(`📦 Total image size: ${Math.round(imageAudit.totalSizeMB)}MB`);
  console.log(`🚫 Unused images: ${imageAudit.unusedImages.length}`);
  console.log(`📏 Oversized images: ${imageAudit.oversizedImages.length}`);
  console.log(`🔗 Slug mismatches: ${imageAudit.slugMismatches.length}`);
  
  if (potentiallyUnused.length > 0) {
    console.log('\n🔍 Potentially unused files:');
    potentiallyUnused.slice(0, 5).forEach(file => console.log(`   ${file}`));
    if (potentiallyUnused.length > 5) {
      console.log(`   ... and ${potentiallyUnused.length - 5} more`);
    }
  }
  
  console.log('\n✅ File audit complete! Check reports/files_audit.json for details.');
}

// Run the audit
runFileAudit().catch(console.error);

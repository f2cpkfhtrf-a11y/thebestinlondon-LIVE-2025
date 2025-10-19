import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { normaliseImagePath, withHashIfMissing } from '../lib/slugImagePath';

interface AuditReport {
  fixedPaths: Array<{ original: string; normalized: string; found?: boolean }>;
  renamedFiles: Array<{ oldPath: string; newPath: string; reason: string }>;
  unresolved: Array<{ path: string; reason: string }>;
  totalProcessed: number;
  totalFixed: number;
  totalRenamed: number;
  totalUnresolved: number;
}

interface Venue {
  image_card_path?: string;
  image_hero_path?: string;
  [key: string]: any;
}

function checkOnlyMode(): boolean {
  return process.argv.includes('--check-only');
}

function findFileVariants(normalizedPath: string): string | null {
  // Convert /public/ path to proper relative path
  let cleanPath = normalizedPath;
  if (normalizedPath.startsWith('/public/')) {
    cleanPath = normalizedPath.substring(7); // Remove '/public'
  } else if (normalizedPath.startsWith('public/')) {
    cleanPath = normalizedPath.substring(7); // Remove 'public/'
  }
  
  const fullPath = path.join(process.cwd(), cleanPath);
  const dir = path.dirname(fullPath);
  const filename = path.basename(cleanPath);
  
  if (!fs.existsSync(dir)) {
    return null;
  }
  
  try {
    const files = fs.readdirSync(dir);
    
    // Try exact match first (case-sensitive)
    if (fs.existsSync(fullPath)) {
      return cleanPath;
    }
    
    // Try case-insensitive match
    const caseMatch = files.find(file => 
      file.toLowerCase() === filename.toLowerCase()
    );
    if (caseMatch) {
      return path.join(path.dirname(cleanPath), caseMatch);
    }
    
    // Try replacing spaces with hyphens
    const hyphenated = filename.replace(/\s+/g, '-');
    const hyphenMatch = files.find(file => 
      file.toLowerCase() === hyphenated.toLowerCase()
    );
    if (hyphenMatch) {
      return path.join(path.dirname(cleanPath), hyphenMatch);
    }
    
    // Try removing query strings
    const cleanFilename = filename.split('?')[0];
    const cleanMatch = files.find(file => 
      file.toLowerCase() === cleanFilename.toLowerCase()
    );
    if (cleanMatch) {
      return path.join(path.dirname(cleanPath), cleanMatch);
    }
    
  } catch (error) {
    console.warn(`Error checking directory ${dir}:`, error);
  }
  
  return null;
}

function isValidWebP(filePath: string): boolean {
  try {
    // Convert /public/ path to proper relative path
    let cleanPath = filePath;
    if (filePath.startsWith('/public/')) {
      cleanPath = filePath.substring(7); // Remove '/public'
    } else if (filePath.startsWith('public/')) {
      cleanPath = filePath.substring(7); // Remove 'public/'
    }
    
    const fullPath = path.join(process.cwd(), cleanPath);
    const stats = fs.statSync(fullPath);
    
    // Check file size (must be > 50KB)
    if (stats.size < 50 * 1024) {
      return false;
    }
    
    // Basic WebP header check
    const buffer = fs.readFileSync(fullPath);
    if (buffer.length < 12) return false;
    const header = buffer.toString('ascii', 0, 4);
    return header === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
    
  } catch {
    return false;
  }
}

function computeFileHash(filePath: string): Buffer {
  // Convert /public/ path to proper relative path
  let cleanPath = filePath;
  if (filePath.startsWith('/public/')) {
    cleanPath = filePath.substring(7); // Remove '/public'
  } else if (filePath.startsWith('public/')) {
    cleanPath = filePath.substring(7); // Remove 'public/'
  }
  
  const fullPath = path.join(process.cwd(), cleanPath);
  const buffer = fs.readFileSync(fullPath);
  return Buffer.from(crypto.createHash('sha1').update(buffer).digest('hex').substring(0, 8), 'hex');
}

async function processImagePath(originalPath: string, isCheckOnly: boolean): Promise<{
  normalized: string;
  found: boolean;
  needsHash: boolean;
  isValid: boolean;
  actualPath?: string;
}> {
  if (!originalPath) {
    return { normalized: '', found: false, needsHash: false, isValid: false };
  }
  
  // Normalize the path
  const normalized = normaliseImagePath(originalPath);
  
  // Try to find the file with smart matching
  let actualPath = findFileVariants(normalized);
  
  const found = !!actualPath;
  let needsHash = false;
  let isValid = false;
  
  if (found && actualPath) {
    isValid = isValidWebP(actualPath);
    
    // Check if filename needs hash
    const hashPattern = /-[a-f0-9]{8}\.webp$/i;
    needsHash = !hashPattern.test(actualPath);
    
    // If file is too small or invalid, we'll need to fallback
    if (!isValid) {
      actualPath = undefined;
    }
  }
  
  return { normalized, found: !!actualPath, needsHash, isValid, actualPath };
}

async function auditAndFixImages(): Promise<void> {
  const isCheckOnly = checkOnlyMode();
  console.log(`🔍 Starting image audit${isCheckOnly ? ' (check-only mode)' : ''}...\n`);
  
  // Load venues.json
  const venuesPath = path.join(process.cwd(), 'public', 'venues.json');
  if (!fs.existsSync(venuesPath)) {
    console.error('❌ venues.json not found');
    process.exit(1);
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues: Venue[] = Array.isArray(venuesData) ? venuesData : venuesData.venues || [];
  
  console.log(`📊 Processing ${venues.length} venues...`);
  
  const report: AuditReport = {
    fixedPaths: [],
    renamedFiles: [],
    unresolved: [],
    totalProcessed: 0,
    totalFixed: 0,
    totalRenamed: 0,
    totalUnresolved: 0
  };
  
  const updates: Array<{ venue: Venue; cardPath?: string; heroPath?: string }> = [];
  
  for (const venue of venues) {
    let venueUpdated = false;
    
    // Process card image
    if (venue.image_card_path) {
      report.totalProcessed++;
      const result = await processImagePath(venue.image_card_path, isCheckOnly);
      
      report.fixedPaths.push({
        original: venue.image_card_path,
        normalized: result.normalized,
        found: result.found
      });
      
      if (result.found && result.isValid && result.actualPath) {
        if (!isCheckOnly && result.needsHash) {
          // Add hash to filename
          const buffer = fs.readFileSync(path.join(process.cwd(), 'public', result.actualPath));
          const newPath = withHashIfMissing(result.actualPath, buffer);
          
          if (newPath !== result.actualPath) {
            const oldFullPath = path.join(process.cwd(), 'public', result.actualPath);
            const newFullPath = path.join(process.cwd(), 'public', newPath);
            
            try {
              fs.renameSync(oldFullPath, newFullPath);
              report.renamedFiles.push({
                oldPath: result.actualPath,
                newPath,
                reason: 'Added hash to filename'
              });
              report.totalRenamed++;
              updates.push({ venue, cardPath: newPath });
            } catch (error) {
              console.warn(`Failed to rename ${result.actualPath} to ${newPath}:`, error);
            }
          } else {
            updates.push({ venue, cardPath: result.actualPath });
          }
        } else {
          updates.push({ venue, cardPath: result.actualPath });
        }
        
        if (result.normalized !== result.actualPath) {
          venueUpdated = true;
        }
      } else {
        // File not found or invalid - will need fallback
        report.unresolved.push({
          path: venue.image_card_path,
          reason: result.found ? 'File too small or invalid WebP' : 'File not found'
        });
        report.totalUnresolved++;
      }
    }
    
    // Process hero image
    if (venue.image_hero_path) {
      report.totalProcessed++;
      const result = await processImagePath(venue.image_hero_path, isCheckOnly);
      
      report.fixedPaths.push({
        original: venue.image_hero_path,
        normalized: result.normalized,
        found: result.found
      });
      
      if (result.found && result.isValid && result.actualPath) {
        if (!isCheckOnly && result.needsHash) {
          // Add hash to filename
          const buffer = fs.readFileSync(path.join(process.cwd(), 'public', result.actualPath));
          const newPath = withHashIfMissing(result.actualPath, buffer);
          
          if (newPath !== result.actualPath) {
            const oldFullPath = path.join(process.cwd(), 'public', result.actualPath);
            const newFullPath = path.join(process.cwd(), 'public', newPath);
            
            try {
              fs.renameSync(oldFullPath, newFullPath);
              report.renamedFiles.push({
                oldPath: result.actualPath,
                newPath,
                reason: 'Added hash to filename'
              });
              report.totalRenamed++;
              updates.push({ venue, heroPath: newPath });
            } catch (error) {
              console.warn(`Failed to rename ${result.actualPath} to ${newPath}:`, error);
            }
          } else {
            updates.push({ venue, heroPath: result.actualPath });
          }
        } else {
          updates.push({ venue, heroPath: result.actualPath });
        }
        
        if (result.normalized !== result.actualPath) {
          venueUpdated = true;
        }
      } else {
        // File not found or invalid - will need fallback
        report.unresolved.push({
          path: venue.image_hero_path,
          reason: result.found ? 'File too small or invalid WebP' : 'File not found'
        });
        report.totalUnresolved++;
      }
    }
    
    if (venueUpdated) {
      report.totalFixed++;
    }
  }
  
  // Update venues.json with corrected paths
  if (!isCheckOnly && updates.length > 0) {
    console.log('\n💾 Updating venues.json with corrected paths...');
    
    for (const update of updates) {
      if (update.cardPath) {
        update.venue.image_card_path = update.cardPath;
      }
      if (update.heroPath) {
        update.venue.image_hero_path = update.heroPath;
      }
    }
    
    // Write updated venues.json
    const updatedData = Array.isArray(venuesData) ? venues : { ...venuesData, venues };
    fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
  }
  
  // Write report
  const reportPath = path.join(process.cwd(), 'reports', 'image_audit_fix_report.json');
  const reportsDir = path.dirname(reportPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  report.totalFixed = updates.length;
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Summary
  console.log('\n📊 AUDIT SUMMARY');
  console.log('================');
  console.log(`✅ Total paths processed: ${report.totalProcessed}`);
  console.log(`🔧 Paths fixed: ${report.totalFixed}`);
  console.log(`📁 Files renamed: ${report.totalRenamed}`);
  console.log(`❌ Unresolved: ${report.totalUnresolved}`);
  console.log(`📄 Report written to: ${reportPath}`);
  
  if (report.totalUnresolved > 0) {
    console.log('\n⚠️  UNRESOLVED PATHS:');
    report.unresolved.slice(0, 10).forEach(item => {
      console.log(`   ${item.path} - ${item.reason}`);
    });
    if (report.unresolved.length > 10) {
      console.log(`   ... and ${report.unresolved.length - 10} more`);
    }
  }
  
  if (report.totalUnresolved > 0) {
    console.log('\n❌ Audit failed - unresolved paths detected');
    process.exit(1);
  } else {
    console.log('\n✅ Audit completed successfully');
  }
}

// Run the audit
auditAndFixImages().catch(error => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});

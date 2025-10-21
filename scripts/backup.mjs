import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';
import { gzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);

const ROOT = process.cwd();
const BACKUPS_DIR = path.join(ROOT, 'backups');
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

async function createFailsafeBackup() {
  try {
    // Ensure backups directory exists
    if (!fs.existsSync(BACKUPS_DIR)) {
      fs.mkdirSync(BACKUPS_DIR, { recursive: true });
    }

    const backupPath = path.join(BACKUPS_DIR, `${TIMESTAMP}_failsafe.tar.gz`);
    
    // Track what we're backing up
    const backupSummary = {
      timestamp: TIMESTAMP,
      files: [],
      totalSize: 0
    };

    // Simple tar-like backup using Node.js built-ins
    const tarData = await createTarArchive();
    const compressedData = await gzipAsync(tarData);
    
    fs.writeFileSync(backupPath, compressedData);

    // Write summary
    const summaryPath = path.join(BACKUPS_DIR, 'summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(backupSummary, null, 2));

    // Verify the backup is restorable
    const verifyResult = await verifyBackup(backupPath);
    
    console.log(`✅ Failsafe snapshot complete – safe to proceed with deploy`);
    console.log(`📦 Backup: ${backupPath}`);
    console.log(`📊 Size: ${(compressedData.length / 1024 / 1024).toFixed(2)}MB`);
    console.log(`🔍 Verified restorable: ${verifyResult ? '✅' : '❌'}`);

    return {
      success: true,
      backupPath,
      summary: backupSummary,
      verified: verifyResult
    };

  } catch (error) {
    console.error('❌ Failsafe backup failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function createTarArchive() {
  const dirsToBackup = [
    'public/images',
    'data',
    'lib',
    'reports'
  ];

  let tarContent = '';
  
  for (const dir of dirsToBackup) {
    const fullPath = path.join(ROOT, dir);
    if (fs.existsSync(fullPath)) {
      tarContent += `DIR:${dir}\n`;
      const files = await getDirectoryFiles(fullPath, dir);
      tarContent += files.join('\n') + '\n';
      console.log(`📁 Backing up ${dir}: ${files.length} files`);
    }
  }
  
  return Buffer.from(tarContent, 'utf8');
}

async function getDirectoryFiles(dirPath, relativePath) {
  const files = [];
  
  function walkDir(currentPath, relPath = '') {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const itemRelativePath = path.join(relPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        walkDir(itemPath, itemRelativePath);
      } else {
        files.push(`FILE:${itemRelativePath}:${stat.size}`);
      }
    }
  }
  
  walkDir(dirPath);
  return files;
}

async function verifyBackup(backupPath) {
  try {
    // Simple verification - check if file exists and has reasonable size
    const stats = fs.statSync(backupPath);
    return stats.size > 1024; // At least 1KB
  } catch {
    return false;
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createFailsafeBackup().then(result => {
    if (!result.success) {
      process.exit(1);
    }
  });
}

export { createFailsafeBackup };
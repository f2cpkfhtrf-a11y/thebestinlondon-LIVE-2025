import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import unzipper from 'unzipper';

const pipelineAsync = promisify(pipeline);

const ROOT = process.cwd();
const BACKUPS_DIR = path.join(ROOT, 'backups');

async function restoreLastBackup() {
  try {
    // Find the most recent backup
    const backupFiles = fs.readdirSync(BACKUPS_DIR)
      .filter(file => file.endsWith('_failsafe.zip'))
      .sort()
      .reverse();

    if (backupFiles.length === 0) {
      console.error('❌ No failsafe backups found');
      return { success: false, error: 'No backups found' };
    }

    const latestBackup = path.join(BACKUPS_DIR, backupFiles[0]);
    console.log(`🔄 Restoring from: ${latestBackup}`);

    const restoreTimestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const restoreLog: Array<{ path: string; restored: boolean; error?: string }> = [];

    // Extract the backup
    const stream = fs.createReadStream(latestBackup)
      .pipe(unzipper.Parse({ forceStream: true }));

    for await (const entry of stream) {
      const fileName = entry.path;
      const type = entry.type;
      
      if (type === 'Directory') {
        const dirPath = path.join(ROOT, fileName);
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }
        restoreLog.push({ path: fileName, restored: true });
        continue;
      }

      if (type === 'File') {
        try {
          const filePath = path.join(ROOT, fileName);
          const dirPath = path.dirname(filePath);
          
          // Ensure directory exists
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          
          // Extract file
          const extracted = entry.pipe(fs.createWriteStream(filePath));
          await new Promise((resolve, reject) => {
            extracted.on('close', resolve);
            extracted.on('error', reject);
          });
          
          restoreLog.push({ path: fileName, restored: true });
        } catch (error) {
          restoreLog.push({ 
            path: fileName, 
            restored: false, 
            error: error.message 
          });
        }
      }
    }

    // Write restore log
    const logPath = path.join(BACKUPS_DIR, `restore_log_${restoreTimestamp}.json`);
    fs.writeFileSync(logPath, JSON.stringify(restoreLog, null, 2));

    const successCount = restoreLog.filter(item => item.restored).length;
    const failCount = restoreLog.filter(item => !item.restored).length;

    console.log(`✅ Restore complete: ${successCount} files restored, ${failCount} failed`);
    console.log(`📝 Log: ${logPath}`);

    return {
      success: failCount === 0,
      restored: successCount,
      failed: failCount,
      logPath
    };

  } catch (error) {
    console.error('❌ Restore failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  restoreLastBackup().then(result => {
    if (!result.success) {
      process.exit(1);
    }
  });
}

export { restoreLastBackup };

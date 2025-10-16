#!/usr/bin/env node

/**
 * STABILITY LAYER - Data Safety & Validation
 * 
 * Wraps all data mutation scripts with:
 * - Automatic backups before changes
 * - Validation after changes
 * - Rollback on failure
 * - Integrity checks
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const BACKUPS_DIR = path.join(ROOT, 'backups');

// Ensure backups directory exists
if (!fs.existsSync(BACKUPS_DIR)) {
  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
}

/**
 * Create timestamped backup of venues.json
 */
function createBackup() {
  if (!fs.existsSync(VENUES_PATH)) {
    console.log('⚠️  No venues.json to backup (will be created)');
    return null;
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUPS_DIR, `venues-${timestamp}.json`);
  
  fs.copyFileSync(VENUES_PATH, backupPath);
  console.log(`✅ Backup created: ${path.basename(backupPath)}`);
  
  return backupPath;
}

/**
 * Validate venues.json structure and data quality
 */
function validateVenues() {
  if (!fs.existsSync(VENUES_PATH)) {
    return { valid: false, errors: ['venues.json does not exist'] };
  }
  
  const errors = [];
  
  try {
    const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
    
    // Check structure
    if (!data.venues || !Array.isArray(data.venues)) {
      errors.push('Missing or invalid venues array');
    }
    
    if (!data.totalVenues) {
      errors.push('Missing totalVenues field');
    }
    
    if (!data.lastUpdated) {
      errors.push('Missing lastUpdated timestamp');
    }
    
    // Check data quality
    if (data.venues) {
      const venues = data.venues;
      
      // Check for required fields
      const requiredFields = ['place_id', 'name', 'slug', 'address'];
      venues.forEach((v, i) => {
        requiredFields.forEach(field => {
          if (!v[field]) {
            errors.push(`Venue ${i} missing required field: ${field}`);
          }
        });
      });
      
      // Check for duplicates
      const placeIds = new Set();
      venues.forEach((v, i) => {
        if (placeIds.has(v.place_id)) {
          errors.push(`Duplicate place_id at index ${i}: ${v.place_id}`);
        }
        placeIds.add(v.place_id);
      });
      
      // Check data counts match
      if (data.totalVenues !== venues.length) {
        errors.push(`totalVenues (${data.totalVenues}) doesn't match actual count (${venues.length})`);
      }
    }
    
    return {
      valid: errors.length === 0,
      errors,
      stats: data.venues ? {
        total: data.venues.length,
        withFSA: data.venues.filter(v => v.fsa_rating).length,
        withRating: data.venues.filter(v => v.rating).length,
        withPhotos: data.venues.filter(v => v.photos && v.photos.length > 0).length
      } : null
    };
    
  } catch (error) {
    return {
      valid: false,
      errors: [`JSON parse error: ${error.message}`]
    };
  }
}

/**
 * Restore from most recent backup
 */
function restoreBackup(backupPath = null) {
  if (!backupPath) {
    // Find most recent backup
    const backups = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.startsWith('venues-') && f.endsWith('.json'))
      .sort()
      .reverse();
    
    if (backups.length === 0) {
      console.error('❌ No backups found to restore');
      return false;
    }
    
    backupPath = path.join(BACKUPS_DIR, backups[0]);
  }
  
  console.log(`🔄 Restoring from: ${path.basename(backupPath)}`);
  fs.copyFileSync(backupPath, VENUES_PATH);
  console.log('✅ Restored successfully');
  
  return true;
}

/**
 * Clean old backups (keep last 10)
 */
function cleanOldBackups() {
  const backups = fs.readdirSync(BACKUPS_DIR)
    .filter(f => f.startsWith('venues-') && f.endsWith('.json'))
    .sort()
    .reverse();
  
  if (backups.length > 10) {
    const toDelete = backups.slice(10);
    toDelete.forEach(backup => {
      fs.unlinkSync(path.join(BACKUPS_DIR, backup));
      console.log(`🗑️  Deleted old backup: ${backup}`);
    });
  }
}

/**
 * Wrap a function with safety checks
 */
async function safeExecute(name, fn) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🛡️  SAFETY LAYER: ${name}`);
  console.log(`${'═'.repeat(70)}\n`);
  
  // 1. Validate current state
  console.log('STEP 1: Pre-flight validation...\n');
  const preCheck = validateVenues();
  
  if (preCheck.valid) {
    console.log('✅ Current data is valid');
    if (preCheck.stats) {
      console.log(`   - ${preCheck.stats.total} venues`);
      console.log(`   - ${preCheck.stats.withFSA} with FSA ratings`);
      console.log(`   - ${preCheck.stats.withRating} with Google ratings\n`);
    }
  } else {
    console.log('⚠️  Current data has issues:');
    preCheck.errors.slice(0, 5).forEach(err => console.log(`   - ${err}`));
    console.log('');
  }
  
  // 2. Create backup
  console.log('STEP 2: Creating backup...\n');
  const backupPath = createBackup();
  
  // 3. Execute function
  console.log(`STEP 3: Executing ${name}...\n`);
  console.log(`${'─'.repeat(70)}\n`);
  
  try {
    await fn();
    
    console.log(`\n${'─'.repeat(70)}\n`);
    
    // 4. Validate result
    console.log('STEP 4: Post-execution validation...\n');
    const postCheck = validateVenues();
    
    if (!postCheck.valid) {
      console.error('❌ VALIDATION FAILED after execution!');
      postCheck.errors.slice(0, 5).forEach(err => console.error(`   - ${err}`));
      
      if (backupPath) {
        console.log('\n🔄 Rolling back to backup...');
        restoreBackup(backupPath);
        console.log('✅ Rollback complete\n');
      }
      
      throw new Error('Post-execution validation failed');
    }
    
    console.log('✅ Post-execution validation passed');
    if (postCheck.stats) {
      console.log(`   - ${postCheck.stats.total} venues`);
      console.log(`   - ${postCheck.stats.withFSA} with FSA ratings (${((postCheck.stats.withFSA/postCheck.stats.total)*100).toFixed(1)}%)`);
      console.log(`   - ${postCheck.stats.withRating} with Google ratings (${((postCheck.stats.withRating/postCheck.stats.total)*100).toFixed(1)}%)\n`);
    }
    
    // 5. Clean old backups
    cleanOldBackups();
    
    console.log(`${'═'.repeat(70)}`);
    console.log(`✅ ${name} COMPLETED SAFELY`);
    console.log(`${'═'.repeat(70)}\n`);
    
    return { success: true, backup: backupPath };
    
  } catch (error) {
    console.error(`\n❌ ERROR in ${name}:`, error.message);
    
    if (backupPath) {
      console.log('\n🔄 Rolling back to backup...');
      restoreBackup(backupPath);
    }
    
    throw error;
  }
}

module.exports = {
  createBackup,
  validateVenues,
  restoreBackup,
  cleanOldBackups,
  safeExecute
};

// CLI usage
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'validate':
      const result = validateVenues();
      if (result.valid) {
        console.log('✅ Venues data is valid');
        if (result.stats) {
          console.log(`\nStats:`);
          console.log(`  - Total: ${result.stats.total}`);
          console.log(`  - FSA: ${result.stats.withFSA} (${((result.stats.withFSA/result.stats.total)*100).toFixed(1)}%)`);
          console.log(`  - Ratings: ${result.stats.withRating}`);
        }
        process.exit(0);
      } else {
        console.error('❌ Validation errors:');
        result.errors.forEach(err => console.error(`  - ${err}`));
        process.exit(1);
      }
      break;
      
    case 'backup':
      createBackup();
      break;
      
    case 'restore':
      restoreBackup();
      break;
      
    case 'clean':
      cleanOldBackups();
      break;
      
    default:
      console.log('Usage:');
      console.log('  node scripts/stability-layer.js validate   - Check data validity');
      console.log('  node scripts/stability-layer.js backup     - Create backup');
      console.log('  node scripts/stability-layer.js restore    - Restore latest backup');
      console.log('  node scripts/stability-layer.js clean      - Clean old backups');
  }
}

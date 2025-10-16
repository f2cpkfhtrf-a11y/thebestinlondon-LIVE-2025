#!/usr/bin/env node

/**
 * EMERGENCY DIAGNOSTIC - FSA Coverage Drop Analysis
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚨 EMERGENCY DIAGNOSTIC - FSA COVERAGE DROP\n');
console.log('═'.repeat(70) + '\n');

const ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const BACKUPS_DIR = path.join(ROOT, 'backups');

// Check current state
console.log('📊 CURRENT STATE:\n');
const current = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
const currentVenues = current.venues || [];
const currentWithFSA = currentVenues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length;
const currentCoverage = ((currentWithFSA / currentVenues.length) * 100).toFixed(1);

console.log(`   Total Venues: ${currentVenues.length}`);
console.log(`   With FSA: ${currentWithFSA} (${currentCoverage}%)`);
console.log(`   Last Updated: ${current.lastUpdated}\n`);

// Check backups
console.log('📁 CHECKING BACKUPS:\n');

if (!fs.existsSync(BACKUPS_DIR)) {
  console.log('   ❌ No backups directory found!\n');
} else {
  const backups = fs.readdirSync(BACKUPS_DIR)
    .filter(f => f.startsWith('venues-') && f.endsWith('.json'))
    .sort()
    .reverse();
  
  console.log(`   Found ${backups.length} backup(s)\n`);
  
  if (backups.length > 0) {
    // Analyze most recent backup
    const recentBackup = backups[0];
    const backupPath = path.join(BACKUPS_DIR, recentBackup);
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    const backupVenues = backup.venues || [];
    const backupWithFSA = backupVenues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length;
    const backupCoverage = ((backupWithFSA / backupVenues.length) * 100).toFixed(1);
    
    console.log(`   Most Recent Backup: ${recentBackup}`);
    console.log(`   Total Venues: ${backupVenues.length}`);
    console.log(`   With FSA: ${backupWithFSA} (${backupCoverage}%)`);
    console.log(`   Last Updated: ${backup.lastUpdated}\n`);
    
    // Calculate difference
    console.log('═'.repeat(70) + '\n');
    console.log('📉 CHANGE ANALYSIS:\n');
    
    const venueDiff = currentVenues.length - backupVenues.length;
    const fsaDiff = currentWithFSA - backupWithFSA;
    const coverageDiff = (parseFloat(currentCoverage) - parseFloat(backupCoverage)).toFixed(1);
    
    console.log(`   Venues: ${venueDiff >= 0 ? '+' : ''}${venueDiff}`);
    console.log(`   FSA Ratings: ${fsaDiff >= 0 ? '+' : ''}${fsaDiff}`);
    console.log(`   Coverage: ${coverageDiff >= 0 ? '+' : ''}${coverageDiff}%\n`);
    
    if (fsaDiff < 0) {
      console.log('   🚨 WARNING: FSA ratings DECREASED!');
      console.log(`   Lost ${Math.abs(fsaDiff)} FSA ratings\n`);
    }
    
    if (parseFloat(coverageDiff) < -5) {
      console.log('   🚨 CRITICAL: Coverage dropped by more than 5%!');
      console.log('   This indicates data loss.\n');
      
      console.log('═'.repeat(70) + '\n');
      console.log('🔧 RECOMMENDED ACTION:\n');
      console.log(`   1. Restore backup: node scripts/stability-layer.js restore`);
      console.log(`   2. Investigate root cause before re-running repair\n`);
    }
    
    // Compare individual venues
    console.log('═'.repeat(70) + '\n');
    console.log('🔍 DETAILED COMPARISON:\n');
    
    const backupMap = new Map(backupVenues.map(v => [v.place_id, v]));
    let lostFSA = 0;
    let gainedFSA = 0;
    
    currentVenues.forEach(curr => {
      const prev = backupMap.get(curr.place_id);
      if (prev) {
        // Venue existed in backup
        const hadFSA = prev.fsa_rating !== null && prev.fsa_rating !== undefined;
        const hasFSA = curr.fsa_rating !== null && curr.fsa_rating !== undefined;
        
        if (hadFSA && !hasFSA) {
          lostFSA++;
        } else if (!hadFSA && hasFSA) {
          gainedFSA++;
        }
      }
    });
    
    console.log(`   Venues that LOST FSA: ${lostFSA}`);
    console.log(`   Venues that GAINED FSA: ${gainedFSA}`);
    console.log(`   Net change: ${gainedFSA >= lostFSA ? '+' : ''}${gainedFSA - lostFSA}\n`);
    
    if (lostFSA > 0) {
      console.log('   🚨 DATA LOSS CONFIRMED!');
      console.log('   Some venues lost their FSA ratings.\n');
      
      // Show examples
      console.log('   Examples of lost FSA ratings:\n');
      let shown = 0;
      for (const curr of currentVenues) {
        const prev = backupMap.get(curr.place_id);
        if (prev) {
          const hadFSA = prev.fsa_rating !== null && prev.fsa_rating !== undefined;
          const hasFSA = curr.fsa_rating !== null && curr.fsa_rating !== undefined;
          
          if (hadFSA && !hasFSA && shown < 5) {
            console.log(`   - ${curr.name} (had FSA: ${prev.fsa_rating}, now: null)`);
            shown++;
          }
        }
      }
      console.log('');
    }
  }
}

console.log('═'.repeat(70) + '\n');

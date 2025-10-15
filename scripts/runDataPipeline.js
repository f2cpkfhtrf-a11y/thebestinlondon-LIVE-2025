#!/usr/bin/env node

/**
 * MASTER DATA PIPELINE
 * 
 * Runs the complete data fetch and build process:
 * 1. fetchPlaces.js - Search Google Places
 * 2. fetchPlaceDetails.js - Get full details
 * 3. buildVenues.js - Merge with FSA data
 * 
 * Usage: node runDataPipeline.js
 */

const { spawn } = require('child_process');
const path = require('path');

const scripts = [
  {
    name: 'Fetch Places',
    script: 'fetchPlaces.js',
    description: 'Searching Google Places for venues'
  },
  {
    name: 'Fetch Details',
    script: 'fetchPlaceDetails.js',
    description: 'Getting full venue details'
  },
  {
    name: 'Build Venues',
    script: 'buildVenues.js',
    description: 'Merging Google + FSA data'
  }
];

function runScript(scriptPath, name) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`RUNNING: ${name}`);
    console.log('='.repeat(70) + '\n');
    
    const child = spawn('node', [scriptPath], {
      cwd: __dirname,
      stdio: 'inherit'
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${name} completed successfully`);
        resolve();
      } else {
        reject(new Error(`${name} failed with exit code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(new Error(`${name} error: ${error.message}`));
    });
  });
}

async function main() {
  console.log('\n' + '🚀 '.repeat(35));
  console.log('MASTER DATA PIPELINE - thebestinlondon.co.uk');
  console.log('🚀 '.repeat(35) + '\n');
  
  const startTime = Date.now();
  
  try {
    for (const { name, script, description } of scripts) {
      console.log(`\n📍 ${description}...`);
      await runScript(path.join(__dirname, script), name);
    }
    
    const duration = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    console.log('\n\n' + '🎉 '.repeat(35));
    console.log('PIPELINE COMPLETE!');
    console.log('🎉 '.repeat(35));
    console.log(`\nTotal time: ${minutes}m ${seconds}s`);
    console.log('\nNext steps:');
    console.log('  1. Check public/venues.json for venue data');
    console.log('  2. Check data/coverage.json for statistics');
    console.log('  3. Run: npm run dev');
    console.log('  4. Visit: http://localhost:3000\n');
    
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error.message);
    process.exit(1);
  }
}

// Run
main();

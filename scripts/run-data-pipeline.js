#!/usr/bin/env node

/**
 * MASTER DATA PIPELINE
 * Orchestrates the complete data fetch → build → verify workflow
 * 
 * Pipeline:
 * 1. fetchPlaces.js → Google Text Search (get place_ids)
 * 2. fetchPlaceDetails.js → Google Place Details (full venue info)
 * 3. buildVenues.js → Merge with FSA + generate venues.json
 * 
 * Usage: node run-data-pipeline.js
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  const line = '='.repeat(70);
  console.log('\n' + colors.bright + colors.cyan + line + colors.reset);
  console.log(colors.bright + colors.cyan + message.toUpperCase() + colors.reset);
  console.log(colors.bright + colors.cyan + line + colors.reset + '\n');
}

function runScript(scriptPath, description) {
  return new Promise((resolve, reject) => {
    log(`\n▶️  Running: ${description}...`, 'blue');
    log(`Script: ${path.basename(scriptPath)}`, 'cyan');
    
    const process = spawn('node', [scriptPath], {
      cwd: path.dirname(scriptPath),
      stdio: 'inherit'
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        log(`\n✅ ${description} - Complete\n`, 'green');
        resolve();
      } else {
        log(`\n❌ ${description} - Failed (exit code ${code})\n`, 'red');
        reject(new Error(`${description} failed`));
      }
    });
    
    process.on('error', (error) => {
      log(`\n❌ ${description} - Error: ${error.message}\n`, 'red');
      reject(error);
    });
  });
}

async function checkPrerequisites() {
  header('Checking Prerequisites');
  
  const checks = [
    { file: '.env.local', name: 'Environment file', required: false },
    { file: 'package.json', name: 'Package.json', required: true },
    { file: 'scripts/fetchPlaces.js', name: 'fetchPlaces.js', required: true },
    { file: 'scripts/fetchPlaceDetails.js', name: 'fetchPlaceDetails.js', required: true },
    { file: 'scripts/buildVenues.js', name: 'buildVenues.js', required: true },
  ];
  
  let allPass = true;
  
  for (const check of checks) {
    const filepath = path.join(__dirname, '..', check.file);
    const exists = fs.existsSync(filepath);
    
    if (exists) {
      log(`✅ ${check.name}`, 'green');
    } else {
      if (check.required) {
        log(`❌ ${check.name} - REQUIRED`, 'red');
        allPass = false;
      } else {
        log(`⚠️  ${check.name} - Optional`, 'yellow');
      }
    }
  }
  
  if (!allPass) {
    throw new Error('Prerequisites check failed');
  }
  
  log('\n✅ All prerequisites met\n', 'green');
}

async function runPipeline() {
  try {
    header('The Best in London - Data Pipeline');
    
    log('🚀 Starting automated data pipeline...', 'cyan');
    log('This will take approximately 10-15 minutes.\n', 'yellow');
    
    // Check prerequisites
    await checkPrerequisites();
    
    // Confirm with user
    log('This pipeline will:', 'yellow');
    log('  1. Fetch 200+ place_ids from Google (2-3 min)', 'cyan');
    log('  2. Get full details for each venue (5-7 min)', 'cyan');
    log('  3. Merge with FSA hygiene data (3-5 min)', 'cyan');
    log('  4. Generate venues.json + coverage stats\n', 'cyan');
    
    log('⚠️  Note: Google Places API has 1000 free requests/month', 'yellow');
    log('This will use approximately 200-300 requests.\n', 'yellow');
    
    const startTime = Date.now();
    
    // Phase 1: Fetch Places
    header('Phase 1: Fetching Place IDs');
    await runScript(
      path.join(__dirname, 'fetchPlaces.js'),
      'Google Places Text Search'
    );
    
    // Phase 2: Fetch Details
    header('Phase 2: Fetching Place Details');
    await runScript(
      path.join(__dirname, 'fetchPlaceDetails.js'),
      'Google Place Details'
    );
    
    // Phase 3: Build Venues
    header('Phase 3: Building Final Venues');
    await runScript(
      path.join(__dirname, 'buildVenues.js'),
      'Venue Builder (Google + FSA)'
    );
    
    // Calculate duration
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    
    // Final summary
    header('Pipeline Complete');
    
    log(`⏱️  Total Time: ${duration} minutes\n`, 'magenta');
    
    // Check outputs
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const coveragePath = path.join(__dirname, '../data/coverage.json');
    
    if (fs.existsSync(venuesPath)) {
      const venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
      const fileSize = (fs.statSync(venuesPath).size / 1024).toFixed(2);
      
      log('📊 Output Summary:', 'cyan');
      log(`   Total Venues: ${venues.totalVenues}`, 'green');
      log(`   Google Ratings: ${venues.coverage.google_rating}`, 'green');
      log(`   FSA Ratings: ${venues.coverage.fsa_rating}`, 'green');
      log(`   Photos: ${venues.coverage.photos}`, 'green');
      log(`   File Size: ${fileSize} KB`, 'green');
      log(`   Location: public/venues.json\n`, 'green');
    }
    
    if (fs.existsSync(coveragePath)) {
      log('📈 Coverage Report: data/coverage.json\n', 'cyan');
    }
    
    // Reports
    log('📋 Reports Generated:', 'cyan');
    log('   reports/fetch-places-report.md', 'green');
    log('   reports/fetch-details-report.md', 'green');
    log('   reports/build-venues-report.md\n', 'green');
    
    // Next steps
    header('Next Steps');
    log('✅ Data pipeline complete!', 'green');
    log('\nYou can now:', 'cyan');
    log('  1. Test the site: npm run dev', 'yellow');
    log('  2. Update pages to use venues.json', 'yellow');
    log('  3. Generate venue detail pages', 'yellow');
    log('  4. Run link verification', 'yellow');
    log('  5. Deploy to production\n', 'yellow');
    
    log('🎉 Success! Site is ready for integration.\n', 'green');
    
    process.exit(0);
    
  } catch (error) {
    header('Pipeline Failed');
    log(`❌ Error: ${error.message}\n`, 'red');
    log('Check the logs above for details.', 'yellow');
    log('You can resume from the last successful phase.\n', 'yellow');
    process.exit(1);
  }
}

// Run pipeline
if (require.main === module) {
  runPipeline();
}

module.exports = { runPipeline };

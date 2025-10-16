#!/usr/bin/env node

/**
 * AUTOMATED DATA REFRESH PIPELINE
 * Updates venues from Google Places API + FSA
 * Run daily/weekly via cron or launchd
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const REFRESH_LOG = path.join(__dirname, '../reports/auto-refresh-log.md');

function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
  
  // Append to log file
  fs.appendFileSync(
    REFRESH_LOG,
    `\n## ${timestamp}\n${message}\n`,
    'utf8'
  );
}

function runScript(scriptPath, description) {
  return new Promise((resolve, reject) => {
    log(`🔄 Running: ${description}`);
    
    const child = spawn('node', [scriptPath], {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });
    
    let output = '';
    
    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });
    
    child.stderr.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stderr.write(text);
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${description} completed successfully`);
        resolve(output);
      } else {
        log(`❌ ${description} failed with code ${code}`);
        reject(new Error(`Script failed: ${description}`));
      }
    });
  });
}

async function refreshData() {
  try {
    log('🚀 Starting automated data refresh pipeline');
    log('='.repeat(70));
    
    // 1. Fetch fresh place data from Google
    await runScript(
      path.join(__dirname, 'fetchPlaces.js'),
      'Fetch Places from Google Places API'
    );
    
    // 2. Fetch detailed place information
    await runScript(
      path.join(__dirname, 'fetchPlaceDetails.js'),
      'Fetch Place Details (reviews, photos, hours)'
    );
    
    // 3. Build venues.json with enhanced data
    await runScript(
      path.join(__dirname, 'buildVenues.js'),
      'Build venues.json with all data'
    );
    
    // 4. Update FSA ratings (optional - can be slow)
    // Uncomment to enable:
    // await runScript(
    //   path.join(__dirname, 'enhance-fsa-coverage.js'),
    //   'Enhance FSA coverage'
    // );
    
    // 5. Regenerate sitemaps
    await runScript(
      path.join(__dirname, 'seo/generate-sitemaps.js'),
      'Regenerate sitemaps'
    );
    
    // 6. Check coverage
    await runScript(
      path.join(__dirname, 'check-coverage.js'),
      'Check data coverage'
    );
    
    log('='.repeat(70));
    log('✅ DATA REFRESH COMPLETE');
    log('📊 Check updated files:');
    log('   - public/venues.json');
    log('   - data/coverage.json');
    log('   - public/sitemap*.xml');
    log('\n🚀 Next steps:');
    log('   1. Review changes: git status');
    log('   2. Commit: git add . && git commit -m "data: automated refresh"');
    log('   3. Deploy: git push origin main');
    log('');
    
  } catch (error) {
    log('❌ ERROR during data refresh:');
    log(error.message);
    log(error.stack);
    process.exit(1);
  }
}

// Initialize log file if it doesn't exist
if (!fs.existsSync(REFRESH_LOG)) {
  fs.writeFileSync(
    REFRESH_LOG,
    '# Automated Data Refresh Log\n\nThis file tracks all automated data refreshes.\n',
    'utf8'
  );
}

// Run refresh
if (require.main === module) {
  refreshData()
    .then(() => {
      log('✅ Pipeline completed successfully\n');
      process.exit(0);
    })
    .catch((error) => {
      log(`❌ Pipeline failed: ${error.message}\n`);
      process.exit(1);
    });
}

module.exports = { refreshData };

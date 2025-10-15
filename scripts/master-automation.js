#!/usr/bin/env node

/**
 * MASTER AUTOMATION SCRIPT
 * Runs all phases of site automation in sequence
 * 
 * Phases:
 * 1. Data Integration (Google Places + FSA)
 * 2. Link Verification
 * 3. Sitemap Generation
 * 4. Performance Audit (Lighthouse)
 * 5. Final Report
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function header(message) {
  const line = '='.repeat(70);
  console.log('\n' + colors.bright + colors.cyan + line + colors.reset);
  console.log(colors.bright + colors.cyan + message + colors.reset);
  console.log(colors.bright + colors.cyan + line + colors.reset + '\n');
}

function runScript(scriptPath, description) {
  return new Promise((resolve, reject) => {
    log(`\n▶️  ${description}...`, 'blue');
    
    const process = spawn('node', [scriptPath], {
      cwd: path.dirname(scriptPath),
      stdio: 'inherit'
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${description} - Complete`, 'green');
        resolve();
      } else {
        log(`❌ ${description} - Failed (exit code ${code})`, 'red');
        reject(new Error(`${description} failed`));
      }
    });
    
    process.on('error', (error) => {
      log(`❌ ${description} - Error: ${error.message}`, 'red');
      reject(error);
    });
  });
}

async function checkPrerequisites() {
  header('CHECKING PREREQUISITES');
  
  const checks = [
    { file: '.env.local', name: 'Environment file' },
    { file: 'package.json', name: 'Package.json' },
    { file: 'pages/index.js', name: 'Homepage' },
  ];
  
  let allPass = true;
  
  for (const check of checks) {
    const exists = fs.existsSync(path.join(__dirname, '..', check.file));
    if (exists) {
      log(`✅ ${check.name} exists`, 'green');
    } else {
      log(`❌ ${check.name} missing`, 'red');
      allPass = false;
    }
  }
  
  if (!allPass) {
    throw new Error('Prerequisites check failed');
  }
  
  log('\n✅ All prerequisites met', 'green');
}

async function runPhase1() {
  header('PHASE 1: DATA INTEGRATION');
  log('Fetching venue data from Google Places + FSA APIs...', 'cyan');
  await runScript(
    path.join(__dirname, 'integrate-data.js'),
    'Data Integration'
  );
}

async function runPhase2() {
  header('PHASE 2: LINK VERIFICATION');
  log('Crawling site and verifying all internal links...', 'cyan');
  
  // Check if dev server is running
  log('⚠️  Make sure dev server is running on localhost:3000', 'yellow');
  log('   Run: npm run dev', 'yellow');
  log('\nPress ENTER when server is ready...', 'yellow');
  
  // Wait for user input
  await new Promise(resolve => {
    process.stdin.once('data', () => resolve());
  });
  
  await runScript(
    path.join(__dirname, 'verify-links.js'),
    'Link Verification'
  );
}

async function runPhase3() {
  header('PHASE 3: SITEMAP GENERATION');
  log('Generating XML sitemaps...', 'cyan');
  await runScript(
    path.join(__dirname, 'generate-sitemaps-auto.js'),
    'Sitemap Generation'
  );
}

async function runPhase4() {
  header('PHASE 4: SEO DESCRIPTIONS');
  log('Generating unique meta descriptions for all pages...', 'cyan');
  await runScript(
    path.join(__dirname, 'generateSEODescriptions.js'),
    'SEO Description Generation'
  );
}

async function generateFinalReport() {
  header('GENERATING FINAL REPORT');
  
  const report = {
    timestamp: new Date().toISOString(),
    phases: []
  };
  
  // Check data integration
  const venuesPath = path.join(__dirname, '../public/venues.json');
  if (fs.existsSync(venuesPath)) {
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    report.phases.push({
      phase: 'Data Integration',
      status: 'complete',
      metrics: {
        totalVenues: venuesData.totalVenues,
        googleRatings: venuesData.coverage.google_rating,
        fsaRatings: venuesData.coverage.fsa_rating,
        photos: venuesData.coverage.photos
      }
    });
  } else {
    report.phases.push({
      phase: 'Data Integration',
      status: 'failed',
      error: 'venues.json not found'
    });
  }
  
  // Check link verification
  const linkAuditPath = path.join(__dirname, '../logs/link-audit-results.json');
  if (fs.existsSync(linkAuditPath)) {
    const linkData = JSON.parse(fs.readFileSync(linkAuditPath, 'utf8'));
    report.phases.push({
      phase: 'Link Verification',
      status: linkData.summary.failed === 0 ? 'complete' : 'warnings',
      metrics: {
        totalLinks: linkData.summary.totalTested,
        passed: linkData.summary.passed,
        failed: linkData.summary.failed,
        successRate: linkData.summary.successRate
      }
    });
  } else {
    report.phases.push({
      phase: 'Link Verification',
      status: 'skipped',
      error: 'No audit results found'
    });
  }
  
  // Check sitemaps
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    report.phases.push({
      phase: 'Sitemap Generation',
      status: 'complete',
      metrics: {
        sitemapExists: true
      }
    });
  } else {
    report.phases.push({
      phase: 'Sitemap Generation',
      status: 'failed',
      error: 'sitemap.xml not found'
    });
  }
  
  // Save report
  const reportPath = path.join(__dirname, '../logs/automation-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Print summary
  header('AUTOMATION COMPLETE');
  
  report.phases.forEach(phase => {
    const statusIcon = phase.status === 'complete' ? '✅' : 
                       phase.status === 'warnings' ? '⚠️' : '❌';
    log(`${statusIcon} ${phase.phase}: ${phase.status}`, 
        phase.status === 'complete' ? 'green' : 
        phase.status === 'warnings' ? 'yellow' : 'red');
    
    if (phase.metrics) {
      Object.entries(phase.metrics).forEach(([key, value]) => {
        log(`   ${key}: ${value}`, 'cyan');
      });
    }
    
    if (phase.error) {
      log(`   Error: ${phase.error}`, 'red');
    }
  });
  
  log(`\n📊 Full report saved to: ${reportPath}`, 'cyan');
  
  const allComplete = report.phases.every(p => p.status === 'complete' || p.status === 'warnings');
  
  if (allComplete) {
    log('\n🎉 All automation phases complete! Site ready for launch.', 'green');
  } else {
    log('\n⚠️  Some phases incomplete. Review report above.', 'yellow');
  }
}

async function main() {
  try {
    header('THEBESTINLONDON.CO.UK - MASTER AUTOMATION');
    log('Starting full site automation...', 'cyan');
    
    await checkPrerequisites();
    
    // Run phases
    await runPhase1();  // Data Integration
    await runPhase2();  // Link Verification
    await runPhase3();  // Sitemap Generation
    await runPhase4();  // SEO Descriptions
    
    // Generate final report
    await generateFinalReport();
    
    log('\n✅ Automation pipeline complete!', 'green');
    process.exit(0);
    
  } catch (error) {
    log(`\n❌ Automation failed: ${error.message}`, 'red');
    log('\nCheck logs for details.', 'yellow');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };

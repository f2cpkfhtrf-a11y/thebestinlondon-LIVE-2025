#!/usr/bin/env node

/**
 * MASTER DATA EXPANSION PIPELINE
 * Orchestrates the full data expansion process
 * 
 * Steps:
 * 1. Snapshot current state
 * 2. Search for new East London & dietary venues
 * 3. Fetch details for new venues
 * 4. Merge with existing data
 * 5. Enhance FSA coverage
 * 6. Generate final report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.join(__dirname, '..');
const REPORTS_DIR = path.join(PROJECT_ROOT, 'reports');

function runScript(scriptPath, description) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`🚀 ${description}`);
  console.log(`${'='.repeat(70)}\n`);
  
  try {
    execSync(`node ${scriptPath}`, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit'
    });
    return true;
  } catch (error) {
    console.error(`\n❌ Failed: ${description}`);
    return false;
  }
}

function saveJSON(filepath, data) {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

async function runPipeline() {
  console.log('\n');
  console.log('█'.repeat(70));
  console.log('█ MASTER DATA EXPANSION PIPELINE');
  console.log('█ BestOfLondon - East London & Dietary Coverage Enhancement');
  console.log('█'.repeat(70));
  console.log('\n');
  
  const startTime = Date.now();
  const pipelineLog = {
    started: new Date().toISOString(),
    steps: []
  };
  
  // Step 1: Snapshot
  console.log('📸 STEP 1/6: Creating pre-expansion snapshot...');
  const step1Success = runScript(
    path.join(__dirname, 'snapshot-current-state.js'),
    'STEP 1: Snapshot Current State'
  );
  pipelineLog.steps.push({ step: 1, name: 'Snapshot', success: step1Success });
  
  if (!step1Success) {
    console.error('\n❌ Pipeline failed at Step 1');
    process.exit(1);
  }
  
  // Step 2: Search expansion
  console.log('\n🔍 STEP 2/6: Searching for new venues in East London...');
  const step2Success = runScript(
    path.join(__dirname, 'expand-east-london.js'),
    'STEP 2: East London & Dietary Expansion Search'
  );
  pipelineLog.steps.push({ step: 2, name: 'Expansion Search', success: step2Success });
  
  if (!step2Success) {
    console.error('\n❌ Pipeline failed at Step 2');
    process.exit(1);
  }
  
  // Step 3: Fetch details
  console.log('\n📋 STEP 3/6: Fetching detailed information for new venues...');
  const step3Success = runScript(
    path.join(__dirname, 'fetch-expansion-details.js'),
    'STEP 3: Fetch Place Details'
  );
  pipelineLog.steps.push({ step: 3, name: 'Fetch Details', success: step3Success });
  
  if (!step3Success) {
    console.error('\n❌ Pipeline failed at Step 3');
    process.exit(1);
  }
  
  // Step 4: Merge
  console.log('\n🔄 STEP 4/6: Merging new venues with existing data...');
  const step4Success = runScript(
    path.join(__dirname, 'merge-expansion.js'),
    'STEP 4: Merge Expansion Data'
  );
  pipelineLog.steps.push({ step: 4, name: 'Merge Data', success: step4Success });
  
  if (!step4Success) {
    console.error('\n❌ Pipeline failed at Step 4');
    process.exit(1);
  }
  
  // Step 5: FSA Enhancement (if script exists)
  const fsaScript = path.join(__dirname, 'enhance-fsa-coverage.js');
  if (fs.existsSync(fsaScript)) {
    console.log('\n🏥 STEP 5/6: Enhancing FSA coverage...');
    const step5Success = runScript(fsaScript, 'STEP 5: FSA Enhancement');
    pipelineLog.steps.push({ step: 5, name: 'FSA Enhancement', success: step5Success });
  } else {
    console.log('\n⏭️  STEP 5/6: FSA enhancement script not found, skipping...');
    pipelineLog.steps.push({ step: 5, name: 'FSA Enhancement', success: true, skipped: true });
  }
  
  // Step 6: Final snapshot
  console.log('\n📊 STEP 6/6: Creating post-expansion snapshot...');
  const step6Success = runScript(
    path.join(__dirname, 'snapshot-current-state.js'),
    'STEP 6: Final Snapshot'
  );
  pipelineLog.steps.push({ step: 6, name: 'Final Snapshot', success: step6Success });
  
  // Summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);
  
  pipelineLog.completed = new Date().toISOString();
  pipelineLog.durationMinutes = duration;
  pipelineLog.success = pipelineLog.steps.every(s => s.success);
  
  // Save pipeline log
  const logPath = path.join(REPORTS_DIR, `expansion-pipeline-${Date.now()}.json`);
  saveJSON(logPath, pipelineLog);
  
  console.log('\n\n');
  console.log('█'.repeat(70));
  console.log('█ PIPELINE COMPLETE');
  console.log('█'.repeat(70));
  console.log(`Duration: ${duration} minutes`);
  console.log(`Success: ${pipelineLog.success ? 'YES ✅' : 'NO ❌'}`);
  console.log(`Log: ${logPath}`);
  console.log('');
  console.log('Steps Summary:');
  pipelineLog.steps.forEach(step => {
    const status = step.skipped ? '⏭️  SKIPPED' : (step.success ? '✅ SUCCESS' : '❌ FAILED');
    console.log(`  ${step.step}. ${step.name}: ${status}`);
  });
  console.log('');
  console.log('Next Actions:');
  console.log('  1. Review snapshots in reports/snapshots/');
  console.log('  2. Check venue count increase in public/venues.json');
  console.log('  3. Run link verification: node scripts/verify-links.js');
  console.log('  4. Test pages locally: npm run dev');
  console.log('  5. Deploy to Vercel when ready');
  console.log('█'.repeat(70));
  console.log('\n');
  
  return pipelineLog;
}

if (require.main === module) {
  runPipeline()
    .then(log => {
      process.exit(log.success ? 0 : 1);
    })
    .catch(error => {
      console.error('\n❌ Pipeline error:', error);
      process.exit(1);
    });
}

module.exports = { runPipeline };

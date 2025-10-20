#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_ORG = process.env.VERCEL_ORG || process.env.VERCEL_SCOPE;
const VERCEL_PROJECT = process.env.VERCEL_PROJECT;

if (!VERCEL_TOKEN || !VERCEL_ORG || !VERCEL_PROJECT) {
  console.error('❌ Missing required environment variables:');
  console.error('  VERCEL_TOKEN, VERCEL_ORG/VERCEL_SCOPE, VERCEL_PROJECT');
  process.exit(1);
}

async function safeDeploy() {
  console.log('🚀 Starting safe Vercel deployment...');
  
  const report = {
    timestamp: new Date().toISOString(),
    steps: [],
    deploymentUrl: null,
    aliasStatus: {},
    verificationResults: {}
  };
  
  try {
    // Step 1: Pre-deployment checks
    console.log('📋 Running pre-deployment checks...');
    report.steps.push({ step: 'prechecks', status: 'running' });
    
    // Verify build works
    console.log('  - Building locally...');
    execSync('npm run build', { stdio: 'inherit' });
    report.steps.push({ step: 'build', status: 'success' });
    
    // Step 2: Deploy
    console.log('\n🚀 Deploying to Vercel...');
    report.steps.push({ step: 'deploy', status: 'running' });
    
    const deployCmd = `npx vercel deploy --prebuilt --prod --yes --scope ${VERCEL_ORG} --token ${VERCEL_TOKEN}`;
    const deployOutput = execSync(deployCmd, { encoding: 'utf8' });
    
    // Extract deployment URL from output
    const urlMatch = deployOutput.match(/https:\/\/[^\s]+/);
    if (!urlMatch) {
      throw new Error('Could not extract deployment URL from Vercel output');
    }
    
    const deploymentUrl = urlMatch[0];
    report.deploymentUrl = deploymentUrl;
    report.steps.push({ step: 'deploy', status: 'success', url: deploymentUrl });
    
    console.log(`✅ Deployed to: ${deploymentUrl}`);
    
    // Step 3: Set aliases
    console.log('\n🔗 Setting up aliases...');
    const aliases = [
      { name: 'www.thebestinlondon.co.uk', description: 'www alias' },
      { name: 'thebestinlondon.co.uk', description: 'apex alias' }
    ];
    
    for (const alias of aliases) {
      try {
        const aliasCmd = `npx vercel alias set ${deploymentUrl} ${alias.name} --scope ${VERCEL_ORG} --token ${VERCEL_TOKEN}`;
        execSync(aliasCmd, { encoding: 'utf8' });
        report.aliasStatus[alias.name] = 'success';
        console.log(`  ✅ ${alias.description}: ${alias.name}`);
      } catch (error) {
        report.aliasStatus[alias.name] = 'error';
        console.error(`  ❌ Failed to set ${alias.name}: ${error.message}`);
      }
    }
    
    // Step 4: Smoke tests
    console.log('\n🧪 Running smoke tests...');
    await runSmokeTests(report);
    
    // Step 5: Save report
    const reportPath = path.join(__dirname, '../reports/post_deploy_verification.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n🎉 Deployment completed successfully!');
    console.log(`📄 Report saved: ${reportPath}`);
    
    return report;
    
  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    report.steps.push({ step: 'deploy', status: 'error', error: error.message });
    
    const reportPath = path.join(__dirname, '../reports/post_deploy_verification.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    process.exit(1);
  }
}

async function runSmokeTests(report) {
  const testRoutes = [
    '/',
    '/blog',
    '/faq',
    '/cuisines',
    '/areas',
    '/best-halal-restaurants-london'
  ];
  
  const baseUrl = report.deploymentUrl;
  const results = {};
  
  for (const route of testRoutes) {
    try {
      console.log(`  - Testing ${route}...`);
      const response = await fetch(`${baseUrl}${route}`);
      results[route] = {
        status: response.status,
        success: response.status === 200
      };
      
      if (response.status === 200) {
        console.log(`    ✅ ${route}: ${response.status}`);
      } else {
        console.log(`    ❌ ${route}: ${response.status}`);
      }
    } catch (error) {
      results[route] = {
        error: error.message,
        success: false
      };
      console.log(`    ❌ ${route}: ${error.message}`);
    }
  }
  
  report.verificationResults = results;
  
  const successCount = Object.values(results).filter(r => r.success).length;
  const totalCount = testRoutes.length;
  
  console.log(`\n📊 Smoke test results: ${successCount}/${totalCount} routes successful`);
  
  if (successCount < totalCount) {
    console.log('⚠️  Some routes failed - check the report for details');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  safeDeploy();
}

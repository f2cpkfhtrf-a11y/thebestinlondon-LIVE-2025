#!/usr/bin/env node
/**
 * Full Site Audit - Comprehensive Check
 * Verifies all recent fixes, image integration, and design consistency
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPORT_DIR = path.join(__dirname, '../reports');
const REPORT_FILE = path.join(REPORT_DIR, `full-site-audit-${new Date().toISOString().split('T')[0]}.md`);

// Ensure reports directory exists
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}

const report = {
  timestamp: new Date().toISOString(),
  issues: [],
  warnings: [],
  checks: [],
  summary: {
    totalIssues: 0,
    totalWarnings: 0,
    passedChecks: 0
  }
};

// 1. Check Image Integration
function checkImageIntegration() {
  console.log('🔍 Checking image integration...');
  
  // Check if getGooglePhotoUrl.ts exists
  const googlePhotoUrlPath = path.join(__dirname, '../lib/getGooglePhotoUrl.ts');
  if (!fs.existsSync(googlePhotoUrlPath)) {
    report.issues.push({
      category: 'Image Integration',
      severity: 'HIGH',
      message: 'getGooglePhotoUrl.ts missing',
      fix: 'Ensure Google Places Photo API integration file exists'
    });
    return;
  }
  
  // Check if resolveHeroImage.ts uses Google Photos
  const resolveHeroPath = path.join(__dirname, '../lib/resolveHeroImage.ts');
  if (fs.existsSync(resolveHeroPath)) {
    const content = fs.readFileSync(resolveHeroPath, 'utf8');
    if (content.includes('getVenueGooglePhotoUrl')) {
      report.checks.push({
        category: 'Image Integration',
        status: 'PASS',
        message: 'Google Places Photo API integrated in resolveHeroImage.ts'
      });
    } else {
      report.issues.push({
        category: 'Image Integration',
        severity: 'HIGH',
        message: 'resolveHeroImage.ts does not use getVenueGooglePhotoUrl',
        fix: 'Add Google Places Photo API fallback in resolveCardImageSync'
      });
    }
  }
  
  // Check StandardizedCard.js uses Google Photos
  const cardPath = path.join(__dirname, '../components/StandardizedCard.js');
  if (fs.existsSync(cardPath)) {
    const content = fs.readFileSync(cardPath, 'utf8');
    if (content.includes('getVenueGooglePhotoUrl') || content.includes('maps.googleapis.com')) {
      report.checks.push({
        category: 'Image Integration',
        status: 'PASS',
        message: 'StandardizedCard.js includes Google Photos fallback'
      });
    } else {
      report.warnings.push({
        category: 'Image Integration',
        message: 'StandardizedCard.js may not have Google Photos fallback in onError handler'
      });
    }
  }
  
  // Check venue data has photos
  const venuesPath = path.join(__dirname, '../data/venues.json');
  if (fs.existsSync(venuesPath)) {
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    const venuesWithPhotos = venues.filter(v => v.photos && Array.isArray(v.photos) && v.photos.length > 0);
    const realPlaceIds = venues.filter(v => v.place_id && !v.place_id.startsWith('seed-'));
    
    report.checks.push({
      category: 'Image Integration',
      status: 'INFO',
      message: `${venuesWithPhotos.length} venues have photo references, ${realPlaceIds.length} have real place_ids`
    });
    
    if (venuesWithPhotos.length === 0) {
      report.warnings.push({
        category: 'Image Integration',
        message: 'No venues have photo references - Google Photos won\'t work'
      });
    }
  }
}

// 2. Check Design Consistency
function checkDesignConsistency() {
  console.log('🎨 Checking design consistency...');
  
  const pages = [
    '../pages/[cuisineSlug].js',
    '../pages/areas/[slug].js',
    '../pages/restaurant/[slug].js'
  ];
  
  const designElements = {
    cardComponent: 'StandardizedCard',
    headerComponent: 'StandardizedHeader',
    filterBar: 'FilterBar',
    backToHome: 'BackToHome'
  };
  
  pages.forEach(pagePath => {
    const fullPath = path.join(__dirname, pagePath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const pageName = path.basename(pagePath);
      
      Object.entries(designElements).forEach(([element, component]) => {
        if (content.includes(component)) {
          report.checks.push({
            category: 'Design Consistency',
            status: 'PASS',
            message: `${pageName} uses ${component}`
          });
        } else {
          report.warnings.push({
            category: 'Design Consistency',
            message: `${pageName} missing ${component} - may not match design`
          });
        }
      });
      
      // Check for consistent styling classes
      const hasConsistentStyling = content.includes('bg-charcoal') || 
                                   content.includes('text-gold') || 
                                   content.includes('rounded-xl');
      
      if (hasConsistentStyling) {
        report.checks.push({
          category: 'Design Consistency',
          status: 'PASS',
          message: `${pageName} uses consistent styling classes`
        });
      }
    }
  });
}

// 3. Check Workflow Status
function checkWorkflowStatus() {
  console.log('⚙️ Checking workflow status...');
  
  const workflowFiles = [
    '../.github/workflows/image-guard.yml',
    '../.github/workflows/quality-ci.yml',
    '../.github/workflows/weekly-data-update.yml'
  ];
  
  workflowFiles.forEach(workflowPath => {
    const fullPath = path.join(__dirname, workflowPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const workflowName = path.basename(workflowPath);
      
      // Check for continue-on-error in quality-ci
      if (workflowName === 'quality-ci.yml') {
        if (content.includes('continue-on-error: true')) {
          report.checks.push({
            category: 'Workflow',
            status: 'PASS',
            message: 'Quality CI has non-blocking audits configured'
          });
        }
      }
      
      // Check for Google Places API whitelist in image-guard
      if (workflowName === 'image-guard.yml') {
        if (content.includes('maps.googleapis.com/maps/api/place/photo')) {
          report.checks.push({
            category: 'Workflow',
            status: 'PASS',
            message: 'image-guard allows Google Places Photo API URLs'
          });
        } else {
          report.issues.push({
            category: 'Workflow',
            severity: 'HIGH',
            message: 'image-guard may block Google Places Photo API URLs',
            fix: 'Add maps.googleapis.com/maps/api/place/photo to whitelist'
          });
        }
      }
    }
  });
}

// 4. Check Recent Commits
function checkRecentCommits() {
  console.log('📝 Checking recent commits...');
  
  // Check if verifyImages.mjs exists (recent fix)
  const verifyImagesPath = path.join(__dirname, '../scripts/verifyImages.mjs');
  if (fs.existsSync(verifyImagesPath)) {
    report.checks.push({
      category: 'Recent Fixes',
      status: 'PASS',
      message: 'verifyImages.mjs exists (ES module fix applied)'
    });
  } else {
    report.warnings.push({
      category: 'Recent Fixes',
      message: 'verifyImages.mjs not found - may still be .js'
    });
  }
  
  // Check package.json references correct file
  const packageJsonPath = path.join(__dirname, '../package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.scripts['audit:images']?.includes('verifyImages.mjs')) {
      report.checks.push({
        category: 'Recent Fixes',
        status: 'PASS',
        message: 'package.json references verifyImages.mjs correctly'
      });
    }
  }
}

// Run all checks
console.log('🚀 Starting comprehensive site audit...\n');

checkImageIntegration();
checkDesignConsistency();
checkWorkflowStatus();
checkRecentCommits();

// Generate summary
report.summary.totalIssues = report.issues.length;
report.summary.totalWarnings = report.warnings.length;
report.summary.passedChecks = report.checks.filter(c => c.status === 'PASS').length;

// Generate markdown report
let markdown = `# Full Site Audit Report\n\n`;
markdown += `**Date:** ${new Date().toLocaleString()}\n\n`;
markdown += `## Summary\n\n`;
markdown += `- ✅ **Passed Checks:** ${report.summary.passedChecks}\n`;
markdown += `- ⚠️ **Warnings:** ${report.summary.totalWarnings}\n`;
markdown += `- ❌ **Issues:** ${report.summary.totalIssues}\n\n`;

if (report.checks.length > 0) {
  markdown += `## ✅ Passed Checks\n\n`;
  report.checks.filter(c => c.status === 'PASS').forEach(check => {
    markdown += `- **${check.category}:** ${check.message}\n`;
  });
  markdown += `\n`;
}

if (report.warnings.length > 0) {
  markdown += `## ⚠️ Warnings\n\n`;
  report.warnings.forEach(warning => {
    markdown += `- **${warning.category}:** ${warning.message}\n`;
  });
  markdown += `\n`;
}

if (report.issues.length > 0) {
  markdown += `## ❌ Issues\n\n`;
  report.issues.forEach(issue => {
    markdown += `- **${issue.category}** (${issue.severity}): ${issue.message}\n`;
    if (issue.fix) {
      markdown += `  - Fix: ${issue.fix}\n`;
    }
  });
  markdown += `\n`;
}

markdown += `## Recommendations\n\n`;
if (report.summary.totalIssues === 0 && report.summary.totalWarnings === 0) {
  markdown += `✅ **All checks passed!** The site appears to be in good shape.\n\n`;
} else {
  markdown += `1. Address ${report.summary.totalIssues} critical issue(s)\n`;
  markdown += `2. Review ${report.summary.totalWarnings} warning(s)\n`;
  markdown += `3. Verify all fixes are deployed\n\n`;
}

// Save report
fs.writeFileSync(REPORT_FILE, markdown);
console.log(`\n✅ Audit complete! Report saved to: ${REPORT_FILE}\n`);

// Print summary
console.log('📊 Audit Summary:');
console.log(`   ✅ Passed: ${report.summary.passedChecks}`);
console.log(`   ⚠️  Warnings: ${report.summary.totalWarnings}`);
console.log(`   ❌ Issues: ${report.summary.totalIssues}\n`);

// Exit with error code if issues found
if (report.summary.totalIssues > 0) {
  process.exit(1);
}


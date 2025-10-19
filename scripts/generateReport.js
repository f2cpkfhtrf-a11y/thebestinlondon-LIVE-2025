#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateReport() {
  console.log('📊 GENERATING REPORTS');
  console.log('=====================');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Find the latest image replacement summary
  let latestReport = null;
  let latestTimestamp = 0;
  
  try {
    const files = fs.readdirSync(reportsDir);
    const reportFiles = files.filter(f => f.startsWith('image_replacement_summary_') && f.endsWith('.json'));
    
    for (const file of reportFiles) {
      const filePath = path.join(reportsDir, file);
      const stats = fs.statSync(filePath);
      if (stats.mtime.getTime() > latestTimestamp) {
        latestTimestamp = stats.mtime.getTime();
        latestReport = filePath;
      }
    }
  } catch (error) {
    console.log('❌ No report files found');
    return false;
  }
  
  if (!latestReport) {
    console.log('❌ No image replacement reports found');
    return false;
  }
  
  try {
    // Copy latest report to the standardized name
    const latestContent = fs.readFileSync(latestReport, 'utf8');
    const standardizedPath = path.join(reportsDir, 'image_replacement_summary_latest.json');
    fs.writeFileSync(standardizedPath, latestContent);
    console.log(`✅ Created: reports/image_replacement_summary_latest.json`);
    
    // Parse and validate the report
    const reportData = JSON.parse(latestContent);
    console.log(`📈 Report contains ${reportData.results?.length || 0} venue results`);
    console.log(`💰 Total cost: $${reportData.stats?.totalCost?.toFixed(2) || '0.00'}`);
    
    // Check for provenance and API usage files
    const provenanceFiles = fs.readdirSync(reportsDir).filter(f => f.includes('provenance') && f.endsWith('.json'));
    const usageFiles = fs.readdirSync(reportsDir).filter(f => f.includes('api_usage') && f.endsWith('.csv'));
    
    if (provenanceFiles.length > 0) {
      const latestProvenance = provenanceFiles[provenanceFiles.length - 1];
      fs.copyFileSync(
        path.join(reportsDir, latestProvenance),
        path.join(reportsDir, 'image_provenance_latest.json')
      );
      console.log(`✅ Created: reports/image_provenance_latest.json`);
    }
    
    if (usageFiles.length > 0) {
      const latestUsage = usageFiles[usageFiles.length - 1];
      fs.copyFileSync(
        path.join(reportsDir, latestUsage),
        path.join(reportsDir, 'api_usage_latest.csv')
      );
      console.log(`✅ Created: reports/api_usage_latest.csv`);
    }
    
    return true;
  } catch (error) {
    console.log('❌ Error generating reports:', error.message);
    return false;
  }
}

if (require.main === module) {
  generateReport();
}

module.exports = { generateReport };

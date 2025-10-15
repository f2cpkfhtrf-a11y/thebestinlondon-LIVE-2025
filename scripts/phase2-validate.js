#!/usr/bin/env node

/**
 * PHASE 2: DATA VALIDATION
 * 
 * Validates the venues.json data and generates a comprehensive report
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const VENUES_PATH = path.join(ROOT, 'public/venues.json');
const COVERAGE_PATH = path.join(ROOT, 'data/coverage.json');
const REPORTS_DIR = path.join(ROOT, 'reports');

// Ensure reports directory exists
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

console.log('\n🔍 PHASE 2: DATA VALIDATION\n');

// Check if venues.json exists
if (!fs.existsSync(VENUES_PATH)) {
  console.error('❌ venues.json not found!');
  console.error('   Run Phase 1 first: node scripts/run-data-pipeline.js');
  process.exit(1);
}

// Read and parse venues data
const venuesData = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
const venues = venuesData.venues || [];
const totalVenues = venues.length;

console.log(`📊 Analyzing ${totalVenues} venues...\n`);

// Validation report
const report = {
  timestamp: new Date().toISOString(),
  phase: 'PHASE 2: DATA VALIDATION',
  totalVenues,
  fileSize: (fs.statSync(VENUES_PATH).size / 1024 / 1024).toFixed(2) + 'MB',
  metrics: {},
  samples: [],
  issues: [],
  recommendations: []
};

// Calculate metrics
const metrics = {
  withRating: venues.filter(v => v.rating && v.rating > 0).length,
  withReviews: venues.filter(v => v.user_ratings_total && v.user_ratings_total > 0).length,
  withPhotos: venues.filter(v => v.photos && v.photos.length > 0).length,
  withWebsite: venues.filter(v => v.website).length,
  withPhone: venues.filter(v => v.phone).length,
  withAddress: venues.filter(v => v.address).length,
  withFSA: venues.filter(v => v.fsaRating).length,
  withCuisines: venues.filter(v => v.cuisines && v.cuisines.length > 0).length,
  withDietary: venues.filter(v => v.dietaryTags && v.dietaryTags.length > 0).length,
  withSlug: venues.filter(v => v.slug).length,
  withCoordinates: venues.filter(v => v.lat && v.lng).length
};

// Calculate percentages
const pct = (count) => ((count / totalVenues) * 100).toFixed(1) + '%';

console.log('📈 Coverage Statistics:\n');
console.log(`   Google Rating:     ${metrics.withRating}/${totalVenues} (${pct(metrics.withRating)})`);
console.log(`   Review Count:      ${metrics.withReviews}/${totalVenues} (${pct(metrics.withReviews)})`);
console.log(`   Photos:            ${metrics.withPhotos}/${totalVenues} (${pct(metrics.withPhotos)})`);
console.log(`   FSA Rating:        ${metrics.withFSA}/${totalVenues} (${pct(metrics.withFSA)})`);
console.log(`   Website:           ${metrics.withWebsite}/${totalVenues} (${pct(metrics.withWebsite)})`);
console.log(`   Phone:             ${metrics.withPhone}/${totalVenues} (${pct(metrics.withPhone)})`);
console.log(`   Address:           ${metrics.withAddress}/${totalVenues} (${pct(metrics.withAddress)})`);
console.log(`   Cuisines:          ${metrics.withCuisines}/${totalVenues} (${pct(metrics.withCuisines)})`);
console.log(`   Dietary Tags:      ${metrics.withDietary}/${totalVenues} (${pct(metrics.withDietary)})`);
console.log(`   Valid Slug:        ${metrics.withSlug}/${totalVenues} (${pct(metrics.withSlug)})`);
console.log(`   Coordinates:       ${metrics.withCoordinates}/${totalVenues} (${pct(metrics.withCoordinates)})`);

report.metrics = metrics;

// Quality checks
console.log('\n🔍 Quality Checks:\n');

// Check 1: Minimum venue count
if (totalVenues < 50) {
  console.log('⚠️  Low venue count (target: 150+)');
  report.issues.push('Low venue count');
  report.recommendations.push('Expand search queries to more cuisines/areas');
}

// Check 2: FSA coverage
const fsaPct = (metrics.withFSA / totalVenues) * 100;
if (fsaPct < 50) {
  console.log(`⚠️  FSA coverage low (${fsaPct.toFixed(1)}% - target: 60%+)`);
  report.issues.push('Low FSA coverage');
  report.recommendations.push('Retry FSA lookups with relaxed matching');
} else {
  console.log(`✅ FSA coverage acceptable (${fsaPct.toFixed(1)}%)`);
}

// Check 3: Photo coverage
const photoPct = (metrics.withPhotos / totalVenues) * 100;
if (photoPct < 80) {
  console.log(`⚠️  Photo coverage low (${photoPct.toFixed(1)}% - target: 85%+)`);
  report.issues.push('Low photo coverage');
  report.recommendations.push('Fill gaps with Cloudinary placeholders');
} else {
  console.log(`✅ Photo coverage good (${photoPct.toFixed(1)}%)`);
}

// Check 4: Data completeness
const completeness = (
  metrics.withRating +
  metrics.withAddress +
  metrics.withCuisines +
  metrics.withSlug +
  metrics.withCoordinates
) / (totalVenues * 5) * 100;

console.log(`\n📊 Overall Data Completeness: ${completeness.toFixed(1)}%`);

if (completeness < 80) {
  console.log('⚠️  Some venues missing critical data');
  report.issues.push('Incomplete venue data');
} else {
  console.log('✅ Data completeness acceptable');
}

// Calculate average rating
const avgRating = venues
  .filter(v => v.rating > 0)
  .reduce((sum, v) => sum + v.rating, 0) / metrics.withRating;

console.log(`\n⭐ Average Rating: ${avgRating.toFixed(2)}/5.0`);

// Sample venues (3 random)
const sampleVenues = [];
const sampleIndices = [
  Math.floor(Math.random() * totalVenues),
  Math.floor(Math.random() * totalVenues),
  Math.floor(Math.random() * totalVenues)
];

console.log('\n📍 Sample Venues:\n');
sampleIndices.forEach((idx, i) => {
  const v = venues[idx];
  const sample = {
    name: v.name,
    area: v.borough || v.area || 'Unknown',
    rating: v.rating || 'N/A',
    fsa: v.fsaRating || 'N/A',
    photos: v.photos ? v.photos.length : 0,
    cuisines: v.cuisines ? v.cuisines.join(', ') : 'N/A'
  };
  
  console.log(`   ${i + 1}. ${sample.name}`);
  console.log(`      Area: ${sample.area}`);
  console.log(`      Rating: ${sample.rating}/5.0`);
  console.log(`      FSA: ${sample.fsa}`);
  console.log(`      Photos: ${sample.photos}`);
  console.log(`      Cuisines: ${sample.cuisines}`);
  console.log();
  
  sampleVenues.push(sample);
});

report.samples = sampleVenues;
report.avgRating = avgRating.toFixed(2);
report.completeness = completeness.toFixed(1) + '%';

// Check coverage.json
if (fs.existsSync(COVERAGE_PATH)) {
  console.log('✅ coverage.json exists\n');
} else {
  console.log('⚠️  coverage.json not found (optional)\n');
}

// Generate markdown report
const mdReport = `# PHASE 2: DATA VALIDATION REPORT

Generated: ${report.timestamp}

## Summary

- **Total Venues**: ${totalVenues}
- **File Size**: ${report.fileSize}
- **Average Rating**: ${report.avgRating}/5.0
- **Data Completeness**: ${report.completeness}

## Coverage Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| Google Rating | ${metrics.withRating} | ${pct(metrics.withRating)} |
| Review Count | ${metrics.withReviews} | ${pct(metrics.withReviews)} |
| Photos | ${metrics.withPhotos} | ${pct(metrics.withPhotos)} |
| FSA Rating | ${metrics.withFSA} | ${pct(metrics.withFSA)} |
| Website | ${metrics.withWebsite} | ${pct(metrics.withWebsite)} |
| Phone | ${metrics.withPhone} | ${pct(metrics.withPhone)} |
| Address | ${metrics.withAddress} | ${pct(metrics.withAddress)} |
| Cuisines | ${metrics.withCuisines} | ${pct(metrics.withCuisines)} |
| Dietary Tags | ${metrics.withDietary} | ${pct(metrics.withDietary)} |
| Valid Slug | ${metrics.withSlug} | ${pct(metrics.withSlug)} |
| Coordinates | ${metrics.withCoordinates} | ${pct(metrics.withCoordinates)} |

## Sample Venues

${sampleVenues.map((v, i) => `
### ${i + 1}. ${v.name}
- **Area**: ${v.area}
- **Rating**: ${v.rating}/5.0
- **FSA**: ${v.fsa}
- **Photos**: ${v.photos}
- **Cuisines**: ${v.cuisines}
`).join('\n')}

## Issues

${report.issues.length > 0 ? report.issues.map(i => `- ${i}`).join('\n') : '_No critical issues found_'}

## Recommendations

${report.recommendations.length > 0 ? report.recommendations.map(r => `- ${r}`).join('\n') : '_None_'}

---

✅ Data validation complete
`;

// Write reports
const mdPath = path.join(REPORTS_DIR, 'PHASE-2-validation.md');
const jsonPath = path.join(REPORTS_DIR, 'validation.json');

fs.writeFileSync(mdPath, mdReport);
fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

console.log('━'.repeat(60));
console.log('PHASE 2 COMPLETE');
console.log('━'.repeat(60));
console.log(`\n📄 Reports saved:`);
console.log(`   - reports/PHASE-2-validation.md`);
console.log(`   - reports/validation.json`);
console.log();

// Determine if we should proceed
const canProceed = totalVenues >= 50 && completeness >= 70;

if (canProceed) {
  console.log('✅ Data quality sufficient - ready for Phase 3\n');
  process.exit(0);
} else {
  console.log('⚠️  Data quality below threshold');
  console.log('   Consider re-running Phase 1 with expanded queries\n');
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

// Comprehensive data audit and normalization
async function auditAndNormalizeData() {
  console.log('📊 Starting comprehensive data audit...');
  
  try {
    // Read venues data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    console.log(`📊 Processing ${venues.length} venues...`);
    
    const auditResults = {
      totalVenues: venues.length,
      validVenues: 0,
      venuesWithIssues: 0,
      issues: [],
      cuisineDistribution: {},
      dietaryDistribution: {},
      areaDistribution: {},
      ratingDistribution: {},
      duplicates: [],
      normalizationNeeded: []
    };
    
    // Track all values for analysis
    const allNames = new Set();
    const allSlugs = new Set();
    
    // Validate each venue
    venues.forEach((venue, index) => {
      const issues = [];
      
      // Check for duplicates
      if (allNames.has(venue.name)) {
        auditResults.duplicates.push({
          name: venue.name,
          index: index,
          type: 'name_duplicate'
        });
      }
      allNames.add(venue.name);
      
      if (allSlugs.has(venue.slug)) {
        auditResults.duplicates.push({
          name: venue.name,
          index: index,
          type: 'slug_duplicate'
        });
      }
      allSlugs.add(venue.slug);
      
      // Required fields validation
      if (!venue.name || venue.name.trim().length === 0) {
        issues.push('Missing or empty name');
      }
      
      if (!venue.slug || venue.slug.trim().length === 0) {
        issues.push('Missing or empty slug');
      }
      
      if (!venue.cuisines || !Array.isArray(venue.cuisines) || venue.cuisines.length === 0) {
        issues.push('Missing or invalid cuisines');
      }
      
      if (!venue.rating || venue.rating < 1 || venue.rating > 5) {
        issues.push('Invalid rating (must be 1-5)');
      }
      
      if (!venue.photos || !Array.isArray(venue.photos) || venue.photos.length === 0) {
        issues.push('Missing or invalid photos');
      }
      
      if (!venue.address || !venue.address.formatted) {
        issues.push('Missing or invalid address');
      }
      
      // Track distributions
      if (venue.cuisines) {
        venue.cuisines.forEach(cuisine => {
          auditResults.cuisineDistribution[cuisine] = (auditResults.cuisineDistribution[cuisine] || 0) + 1;
        });
      }
      
      if (venue.dietary_tags) {
        Object.entries(venue.dietary_tags).forEach(([tag, value]) => {
          if (value === true) {
            auditResults.dietaryDistribution[tag] = (auditResults.dietaryDistribution[tag] || 0) + 1;
          }
        });
      }
      
      if (venue.borough) {
        auditResults.areaDistribution[venue.borough] = (auditResults.areaDistribution[venue.borough] || 0) + 1;
      }
      
      // Rating distribution
      const ratingRange = Math.floor(venue.rating || 0);
      auditResults.ratingDistribution[ratingRange] = (auditResults.ratingDistribution[ratingRange] || 0) + 1;
      
      if (issues.length === 0) {
        auditResults.validVenues++;
      } else {
        auditResults.venuesWithIssues++;
        auditResults.issues.push({
          venue: venue.name,
          index: index,
          issues: issues
        });
      }
    });
    
    // Generate comprehensive report
    console.log('\\n📈 COMPREHENSIVE AUDIT REPORT:');
    console.log(`Total venues: ${auditResults.totalVenues}`);
    console.log(`Valid venues: ${auditResults.validVenues}`);
    console.log(`Venues with issues: ${auditResults.venuesWithIssues}`);
    console.log(`Success rate: ${Math.round((auditResults.validVenues / auditResults.totalVenues) * 100)}%`);
    console.log(`Duplicates found: ${auditResults.duplicates.length}`);
    
    // Cuisine distribution
    console.log('\\n🍽️ CUISINE DISTRIBUTION:');
    const sortedCuisines = Object.entries(auditResults.cuisineDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15);
    sortedCuisines.forEach(([cuisine, count]) => {
      console.log(`  ${cuisine}: ${count}`);
    });
    
    // Dietary distribution
    console.log('\\n🥗 DIETARY DISTRIBUTION:');
    Object.entries(auditResults.dietaryDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([tag, count]) => {
        console.log(`  ${tag}: ${count}`);
      });
    
    // Area distribution
    console.log('\\n📍 AREA DISTRIBUTION:');
    const sortedAreas = Object.entries(auditResults.areaDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
    sortedAreas.forEach(([area, count]) => {
      console.log(`  ${area}: ${count}`);
    });
    
    // Rating distribution
    console.log('\\n⭐ RATING DISTRIBUTION:');
    Object.entries(auditResults.ratingDistribution)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .forEach(([rating, count]) => {
        console.log(`  ${rating} stars: ${count}`);
      });
    
    // Save detailed report
    const reportPath = path.join(process.cwd(), 'reports/data-audit.json');
    fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));
    console.log(`\\n📄 Detailed report saved: ${reportPath}`);
    
    return auditResults;
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  auditAndNormalizeData().catch(console.error);
}

module.exports = { auditAndNormalizeData };

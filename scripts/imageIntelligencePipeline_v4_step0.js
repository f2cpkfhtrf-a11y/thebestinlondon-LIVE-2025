const fs = require('fs');
const path = require('path');

// IMAGE INTELLIGENCE PIPELINE v4.0 - STEP 0: VALIDATION BEFORE ACTION
function performImageAudit() {
  console.log('🧠 THE BEST IN LONDON – IMAGE INTELLIGENCE PIPELINE v4.0');
  console.log('='.repeat(70));
  console.log('🔒 STEP 0 — VALIDATION BEFORE ACTION');
  console.log('='.repeat(70));
  
  const results = {
    timestamp: new Date().toISOString(),
    totalRestaurants: 0,
    totalCuisines: 0,
    duplicates: [],
    lowRes: [],
    broken: [],
    unsplash: [],
    missing: [],
    highQuality: [],
    auditData: []
  };
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    results.totalRestaurants = venues.length;
    
    console.log(`📊 Scanning ${results.totalRestaurants} restaurants...`);
    
    // Track image usage for duplicate detection
    const imageUsageMap = new Map();
    const cuisineImageMap = new Map();
    
    // Process each restaurant
    venues.forEach((venue, index) => {
      const auditEntry = {
        index: index + 1,
        name: venue.name || 'Unknown',
        cuisines: venue.cuisines || [],
        image_url: venue.image_url || null,
        photos: venue.photos || [],
        image_source: 'unknown',
        resolution: 'unknown',
        filename: 'unknown',
        status: 'unknown',
        issues: []
      };
      
      // Determine primary cuisine
      const primaryCuisine = venue.cuisines && venue.cuisines.length > 0 ? venue.cuisines[0] : 'unknown';
      
      // Analyze image sources
      let currentImageUrl = null;
      let imageSource = 'missing';
      
      if (venue.image_url) {
        currentImageUrl = venue.image_url;
        auditEntry.image_url = currentImageUrl;
        
        // Determine image source
        if (currentImageUrl.includes('unsplash.com')) {
          imageSource = 'unsplash';
          results.unsplash.push(venue.name);
          auditEntry.issues.push('unsplash_image');
        } else if (currentImageUrl.includes('googleapis.com') || currentImageUrl.includes('maps.googleapis.com')) {
          imageSource = 'google_places';
        } else if (currentImageUrl.includes('dishoom.com') || currentImageUrl.includes('gymkhanalondon.com')) {
          imageSource = 'restaurant_website';
        } else if (currentImageUrl.includes('localhost') || currentImageUrl.includes('127.0.0.1')) {
          imageSource = 'local';
        } else {
          imageSource = 'external';
        }
        
        // Extract filename
        try {
          const urlParts = currentImageUrl.split('/');
          auditEntry.filename = urlParts[urlParts.length - 1].split('?')[0];
        } catch (e) {
          auditEntry.filename = 'unknown';
        }
        
        // Check for duplicates
        const imageKey = currentImageUrl.split('?')[0]; // Remove query params
        if (imageUsageMap.has(imageKey)) {
          imageUsageMap.get(imageKey).push(venue.name);
          auditEntry.issues.push('duplicate_image');
        } else {
          imageUsageMap.set(imageKey, [venue.name]);
        }
        
        // Estimate resolution (basic check)
        if (currentImageUrl.includes('w=1600') || currentImageUrl.includes('maxwidth=1600')) {
          auditEntry.resolution = '1600px';
        } else if (currentImageUrl.includes('w=1200') || currentImageUrl.includes('maxwidth=1200')) {
          auditEntry.resolution = '1200px';
        } else if (currentImageUrl.includes('w=800') || currentImageUrl.includes('maxwidth=800')) {
          auditEntry.resolution = '800px';
        } else {
          auditEntry.resolution = 'unknown';
        }
        
      } else if (venue.photos && venue.photos.length > 0) {
        currentImageUrl = venue.photos[0].url;
        auditEntry.image_url = currentImageUrl;
        imageSource = 'google_places';
        auditEntry.resolution = 'unknown';
        auditEntry.issues.push('no_primary_image');
      } else {
        imageSource = 'missing';
        auditEntry.issues.push('no_image');
        results.missing.push(venue.name);
      }
      
      auditEntry.image_source = imageSource;
      
      // Categorize by quality
      if (imageSource === 'restaurant_website' || (imageSource === 'google_places' && auditEntry.resolution === '1600px')) {
        results.highQuality.push(venue.name);
        auditEntry.status = 'high_quality';
      } else if (imageSource === 'unsplash' || auditEntry.resolution === '800px' || auditEntry.resolution === 'unknown') {
        auditEntry.status = 'low_quality';
        if (imageSource === 'unsplash') {
          auditEntry.issues.push('unsplash_image');
        }
        if (auditEntry.resolution === '800px' || auditEntry.resolution === 'unknown') {
          auditEntry.issues.push('low_resolution');
        }
      } else {
        auditEntry.status = 'medium_quality';
      }
      
      // Track cuisine distribution
      if (!cuisineImageMap.has(primaryCuisine)) {
        cuisineImageMap.set(primaryCuisine, []);
      }
      cuisineImageMap.get(primaryCuisine).push({
        name: venue.name,
        image_url: currentImageUrl,
        source: imageSource,
        status: auditEntry.status
      });
      
      results.auditData.push(auditEntry);
    });
    
    // Identify duplicates
    imageUsageMap.forEach((restaurants, imageUrl) => {
      if (restaurants.length > 1) {
        results.duplicates.push({
          image_url: imageUrl,
          restaurants: restaurants,
          count: restaurants.length
        });
      }
    });
    
    // Count low-res images
    results.auditData.forEach(entry => {
      if (entry.resolution === '800px' || entry.resolution === 'unknown') {
        results.lowRes.push(entry.name);
      }
    });
    
    // Count broken images (basic check)
    results.auditData.forEach(entry => {
      if (!entry.image_url || entry.image_url === 'null' || entry.image_url === '') {
        results.broken.push(entry.name);
      }
    });
    
    // Generate CSV report
    const csvHeader = 'Index,Name,Cuisines,Image_URL,Filename,Image_Source,Resolution,Status,Issues';
    const csvRows = results.auditData.map(entry => {
      const cuisines = entry.cuisines.join(';');
      const issues = entry.issues.join(';');
      return `${entry.index},"${entry.name}","${cuisines}","${entry.image_url}","${entry.filename}","${entry.image_source}","${entry.resolution}","${entry.status}","${issues}"`;
    });
    
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const csvPath = path.join(__dirname, '../reports/image_audit.csv');
    fs.writeFileSync(csvPath, csvContent);
    
    // Generate summary
    console.log('\n📊 AUDIT SUMMARY:');
    console.log('='.repeat(50));
    console.log(`Total Restaurants: ${results.totalRestaurants}`);
    console.log(`High Quality Images: ${results.highQuality.length}`);
    console.log(`Low Quality Images: ${results.lowRes.length}`);
    console.log(`Missing Images: ${results.missing.length}`);
    console.log(`Unsplash Images: ${results.unsplash.length}`);
    console.log(`Duplicate Images: ${results.duplicates.length}`);
    console.log(`Broken Images: ${results.broken.length}`);
    
    console.log('\n🎯 CUISINE DISTRIBUTION:');
    console.log('='.repeat(30));
    cuisineImageMap.forEach((venues, cuisine) => {
      const highQuality = venues.filter(v => v.status === 'high_quality').length;
      const lowQuality = venues.filter(v => v.status === 'low_quality').length;
      console.log(`${cuisine}: ${venues.length} venues (${highQuality} high-quality, ${lowQuality} low-quality)`);
    });
    
    console.log('\n🔍 DUPLICATE IMAGES FOUND:');
    console.log('='.repeat(30));
    results.duplicates.forEach((dup, index) => {
      console.log(`${index + 1}. Used by ${dup.count} restaurants: ${dup.restaurants.join(', ')}`);
    });
    
    console.log('\n❌ ISSUES TO FIX:');
    console.log('='.repeat(20));
    console.log(`• ${results.duplicates.length} duplicate images`);
    console.log(`• ${results.missing.length} missing images`);
    console.log(`• ${results.lowRes.length} low-resolution images`);
    console.log(`• ${results.unsplash.length} Unsplash placeholder images`);
    console.log(`• ${results.broken.length} broken/malformed images`);
    
    // Save detailed report
    const reportPath = path.join(__dirname, '../reports/image_audit_summary.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log(`\n💾 Reports saved:`);
    console.log(`• ${csvPath}`);
    console.log(`• ${reportPath}`);
    
    // Final confirmation prompt
    const totalIssues = results.duplicates.length + results.missing.length + results.lowRes.length + results.unsplash.length + results.broken.length;
    console.log(`\n🚨 FOUND ${totalIssues} ISSUES TO FIX`);
    console.log(`Found ${results.duplicates.length} duplicates, ${results.missing.length} missing, ${results.lowRes.length} low-res.`);
    console.log('\n❓ Proceed to fix? (yes/no)');
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
    return null;
  }
}

// Run the audit
performImageAudit();

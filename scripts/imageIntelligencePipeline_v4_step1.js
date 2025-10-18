const fs = require('fs');
const path = require('path');

// IMAGE INTELLIGENCE PIPELINE v4.0 - STEP 1: DUPLICATE + BROKEN IMAGE DETECTION
function detectDuplicatesAndBrokenImages() {
  console.log('🍽 STEP 1 — DUPLICATE + BROKEN IMAGE DETECTION');
  console.log('='.repeat(60));
  
  const results = {
    timestamp: new Date().toISOString(),
    duplicates: [],
    broken: [],
    stockImages: [],
    visualSimilarity: [],
    duplicateGroups: []
  };
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🔍 Analyzing ${venues.length} restaurants for duplicates and broken images...`);
    
    // Track image usage patterns
    const imageUsageMap = new Map();
    const filenamePatterns = new Map();
    const urlPatterns = new Map();
    
    // Analyze each restaurant's images
    venues.forEach((venue, index) => {
      const restaurantName = venue.name || `Restaurant_${index}`;
      const cuisines = venue.cuisines || [];
      const primaryCuisine = cuisines[0] || 'unknown';
      
      // Check primary image
      if (venue.image_url) {
        const imageUrl = venue.image_url;
        const cleanUrl = imageUrl.split('?')[0]; // Remove query params
        
        // Track by clean URL
        if (!imageUsageMap.has(cleanUrl)) {
          imageUsageMap.set(cleanUrl, []);
        }
        imageUsageMap.get(cleanUrl).push({
          name: restaurantName,
          cuisine: primaryCuisine,
          fullUrl: imageUrl
        });
        
        // Analyze filename patterns
        try {
          const urlParts = cleanUrl.split('/');
          const filename = urlParts[urlParts.length - 1];
          const filenameBase = filename.split('.')[0];
          
          if (!filenamePatterns.has(filenameBase)) {
            filenamePatterns.set(filenameBase, []);
          }
          filenamePatterns.get(filenameBase).push({
            name: restaurantName,
            cuisine: primaryCuisine,
            url: cleanUrl
          });
        } catch (e) {
          // Skip filename analysis if URL is malformed
        }
        
        // Detect stock/placeholder patterns
        if (imageUrl.includes('unsplash.com')) {
          results.stockImages.push({
            restaurant: restaurantName,
            cuisine: primaryCuisine,
            url: imageUrl,
            type: 'unsplash',
            reason: 'Generic stock photo'
          });
        }
        
        // Detect broken URLs
        if (!imageUrl || imageUrl === 'null' || imageUrl === '' || imageUrl.includes('undefined')) {
          results.broken.push({
            restaurant: restaurantName,
            cuisine: primaryCuisine,
            url: imageUrl,
            reason: 'Empty or malformed URL'
          });
        }
      }
      
      // Check photos array
      if (venue.photos && venue.photos.length > 0) {
        venue.photos.forEach((photo, photoIndex) => {
          if (photo.url) {
            const cleanUrl = photo.url.split('?')[0];
            
            if (!imageUsageMap.has(cleanUrl)) {
              imageUsageMap.set(cleanUrl, []);
            }
            imageUsageMap.get(cleanUrl).push({
              name: restaurantName,
              cuisine: primaryCuisine,
              fullUrl: photo.url,
              source: 'photos_array'
            });
          }
        });
      }
    });
    
    // Identify duplicates
    let duplicateGroupId = 1;
    imageUsageMap.forEach((restaurants, imageUrl) => {
      if (restaurants.length > 1) {
        const duplicateGroup = {
          id: duplicateGroupId++,
          image_url: imageUrl,
          count: restaurants.length,
          restaurants: restaurants,
          cuisines: [...new Set(restaurants.map(r => r.cuisine))],
          isCrossCuisine: new Set(restaurants.map(r => r.cuisine)).size > 1,
          severity: restaurants.length > 10 ? 'high' : restaurants.length > 5 ? 'medium' : 'low'
        };
        
        results.duplicates.push(duplicateGroup);
        results.duplicateGroups.push(duplicateGroup);
      }
    });
    
    // Identify filename-based duplicates
    filenamePatterns.forEach((restaurants, filenameBase) => {
      if (restaurants.length > 1) {
        const uniqueUrls = [...new Set(restaurants.map(r => r.url))];
        if (uniqueUrls.length === 1) {
          // Same filename, same URL - already caught above
          return;
        }
        
        // Same filename pattern, different URLs - potential visual similarity
        results.visualSimilarity.push({
          filename_pattern: filenameBase,
          count: restaurants.length,
          restaurants: restaurants,
          urls: uniqueUrls,
          reason: 'Same filename pattern across different URLs'
        });
      }
    });
    
    // Sort duplicates by severity
    results.duplicates.sort((a, b) => b.count - a.count);
    
    // Generate CSV report
    const csvHeader = 'Duplicate_Group_ID,Image_URL,Restaurant_Count,Severity,Is_Cross_Cuisine,Cuisines_Affected,Restaurant_Names';
    const csvRows = results.duplicates.map(dup => {
      const restaurantNames = dup.restaurants.map(r => r.name).join(';');
      const cuisines = dup.cuisines.join(';');
      return `${dup.id},"${dup.image_url}",${dup.count},"${dup.severity}","${dup.isCrossCuisine}","${cuisines}","${restaurantNames}"`;
    });
    
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const csvPath = path.join(__dirname, '../reports/image_duplicates.csv');
    fs.writeFileSync(csvPath, csvContent);
    
    // Generate stock images report
    const stockCsvHeader = 'Restaurant_Name,Cuisine,Image_URL,Type,Reason';
    const stockCsvRows = results.stockImages.map(stock => {
      return `"${stock.restaurant}","${stock.cuisine}","${stock.url}","${stock.type}","${stock.reason}"`;
    });
    
    const stockCsvContent = [stockCsvHeader, ...stockCsvRows].join('\n');
    const stockCsvPath = path.join(__dirname, '../reports/stock_images.csv');
    fs.writeFileSync(stockCsvPath, stockCsvContent);
    
    // Generate broken images report
    const brokenCsvHeader = 'Restaurant_Name,Cuisine,Image_URL,Reason';
    const brokenCsvRows = results.broken.map(broken => {
      return `"${broken.restaurant}","${broken.cuisine}","${broken.url}","${broken.reason}"`;
    });
    
    const brokenCsvContent = [brokenCsvHeader, ...brokenCsvRows].join('\n');
    const brokenCsvPath = path.join(__dirname, '../reports/broken_images.csv');
    fs.writeFileSync(brokenCsvPath, brokenCsvContent);
    
    // Display summary
    console.log('\n📊 DUPLICATE DETECTION RESULTS:');
    console.log('='.repeat(40));
    console.log(`Total Duplicate Groups: ${results.duplicates.length}`);
    console.log(`High Severity Duplicates: ${results.duplicates.filter(d => d.severity === 'high').length}`);
    console.log(`Medium Severity Duplicates: ${results.duplicates.filter(d => d.severity === 'medium').length}`);
    console.log(`Low Severity Duplicates: ${results.duplicates.filter(d => d.severity === 'low').length}`);
    console.log(`Cross-Cuisine Duplicates: ${results.duplicates.filter(d => d.isCrossCuisine).length}`);
    console.log(`Stock/Placeholder Images: ${results.stockImages.length}`);
    console.log(`Broken Images: ${results.broken.length}`);
    console.log(`Visual Similarity Cases: ${results.visualSimilarity.length}`);
    
    console.log('\n🔍 TOP 10 DUPLICATE GROUPS:');
    console.log('='.repeat(30));
    results.duplicates.slice(0, 10).forEach((dup, index) => {
      console.log(`${index + 1}. Group ${dup.id}: ${dup.count} restaurants (${dup.severity} severity)`);
      console.log(`   Cuisines: ${dup.cuisines.join(', ')}`);
      console.log(`   Sample restaurants: ${dup.restaurants.slice(0, 3).map(r => r.name).join(', ')}${dup.restaurants.length > 3 ? '...' : ''}`);
      console.log(`   URL: ${dup.image_url.substring(0, 80)}...`);
      console.log('');
    });
    
    console.log('\n📈 STOCK IMAGE ANALYSIS:');
    console.log('='.repeat(25));
    const stockByType = {};
    results.stockImages.forEach(stock => {
      stockByType[stock.type] = (stockByType[stock.type] || 0) + 1;
    });
    Object.entries(stockByType).forEach(([type, count]) => {
      console.log(`${type}: ${count} images`);
    });
    
    console.log('\n❌ BROKEN IMAGE ANALYSIS:');
    console.log('='.repeat(25));
    const brokenByReason = {};
    results.broken.forEach(broken => {
      brokenByReason[broken.reason] = (brokenByReason[broken.reason] || 0) + 1;
    });
    Object.entries(brokenByReason).forEach(([reason, count]) => {
      console.log(`${reason}: ${count} images`);
    });
    
    // Save detailed report
    const reportPath = path.join(__dirname, '../reports/duplicate_detection_summary.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log(`\n💾 Reports saved:`);
    console.log(`• ${csvPath}`);
    console.log(`• ${stockCsvPath}`);
    console.log(`• ${brokenCsvPath}`);
    console.log(`• ${reportPath}`);
    
    // Calculate total issues
    const totalIssues = results.duplicates.length + results.stockImages.length + results.broken.length;
    console.log(`\n🚨 TOTAL ISSUES IDENTIFIED: ${totalIssues}`);
    console.log(`• ${results.duplicates.length} duplicate groups`);
    console.log(`• ${results.stockImages.length} stock/placeholder images`);
    console.log(`• ${results.broken.length} broken images`);
    
    console.log('\n✅ Duplicate and broken image detection complete!');
    console.log('📋 Ready for Step 2: Smart Cuisine Matching & Image Retrieval');
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during duplicate detection:', error);
    return null;
  }
}

// Run the duplicate detection
detectDuplicatesAndBrokenImages();

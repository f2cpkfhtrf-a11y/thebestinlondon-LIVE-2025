const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// THE BEST IN LONDON — REAL IMAGE REPAIR v5 (NO STOCK, NO DUPES)
// Step 0: Read-Only Audit

function performV5ImageAudit() {
  console.log('🔍 THE BEST IN LONDON — REAL IMAGE REPAIR v5 (NO STOCK, NO DUPES)');
  console.log('='.repeat(80));
  console.log('📊 STEP 0: READ-ONLY AUDIT');
  console.log('='.repeat(40));
  
  const results = {
    timestamp: new Date().toISOString(),
    venues: [],
    summary: {
      totalVenues: 0,
      missingImages: 0,
      lowResImages: 0,
      duplicateImages: 0,
      unsplashImages: 0,
      irrelevantImages: 0,
      goodImages: 0
    },
    duplicates: [],
    sources: {
      local: 0,
      google_places: 0,
      official_site: 0,
      generated: 0,
      missing: 0,
      unsplash: 0,
      other: 0
    }
  };
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🔍 Scanning ${venues.length} venues for image audit...`);
    
    const imageHashes = new Map(); // For duplicate detection
    const cuisineKeywords = {
      'indian': ['curry', 'biryani', 'tandoori', 'naan', 'dal', 'masala', 'indian'],
      'italian': ['pasta', 'pizza', 'risotto', 'gnocchi', 'carbonara', 'italian'],
      'japanese': ['sushi', 'ramen', 'tempura', 'yakitori', 'sashimi', 'japanese'],
      'turkish': ['kebab', 'mezze', 'grill', 'doner', 'lahmacun', 'turkish'],
      'french': ['steak', 'pastry', 'fine-dining', 'coq au vin', 'ratatouille', 'french'],
      'british': ['roast', 'fish and chips', 'pie', 'sunday roast', 'british'],
      'mediterranean': ['grilled fish', 'salad', 'hummus', 'olive oil', 'mediterranean'],
      'caribbean': ['jerk chicken', 'plantain', 'rice and peas', 'caribbean'],
      'mexican': ['tacos', 'burrito', 'quesadilla', 'enchiladas', 'mexican'],
      'thai': ['pad thai', 'green curry', 'tom yum', 'mango sticky rice', 'thai'],
      'chinese': ['dim sum', 'wok', 'stir fry', 'dumplings', 'chinese'],
      'korean': ['kimchi', 'bulgogi', 'bibimbap', 'korean bbq', 'korean'],
      'spanish': ['paella', 'tapas', 'gazpacho', 'chorizo', 'spanish']
    };
    
    // Process each venue
    venues.forEach((venue, index) => {
      const venueData = {
        name: venue.name || `Restaurant_${index}`,
        place_id: venue.place_id || `unknown_${index}`,
        slug: venue.slug || venue.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') || `restaurant-${index}`,
        cuisines: venue.cuisines || [],
        area: venue.vicinity || venue.borough || venue.area || 'London',
        image_url: venue.image_url || null,
        width: null,
        height: null,
        source: 'missing',
        isDuplicate: false,
        isLowRes: false,
        isIrrelevant: false,
        isUnsplash: false,
        isGood: false,
        duplicateGroup: null,
        relevanceScore: 0
      };
      
      // Analyze image if present
      if (venueData.image_url) {
        // Determine source
        if (venueData.image_url.includes('unsplash.com')) {
          venueData.source = 'unsplash';
          venueData.isUnsplash = true;
        } else if (venueData.image_url.includes('googleusercontent.com') || venueData.image_url.includes('google.com/maps')) {
          venueData.source = 'google_places';
        } else if (venueData.image_url.includes('thebestinlondon.co.uk/images/venues') || venueData.image_url.includes('/public/images/')) {
          venueData.source = 'local';
        } else if (venueData.image_url.includes('restaurant-website.com') || venueData.image_url.includes('official')) {
          venueData.source = 'official_site';
        } else if (venueData.image_url.includes('generated') || venueData.image_url.includes('ai-generated')) {
          venueData.source = 'generated';
        } else {
          venueData.source = 'other';
        }
        
        // Extract dimensions from URL if available
        const widthMatch = venueData.image_url.match(/w=(\d+)/) || venueData.image_url.match(/width=(\d+)/);
        const heightMatch = venueData.image_url.match(/h=(\d+)/) || venueData.image_url.match(/height=(\d+)/);
        
        if (widthMatch) {
          venueData.width = parseInt(widthMatch[1], 10);
        }
        if (heightMatch) {
          venueData.height = parseInt(heightMatch[1], 10);
        }
        
        // Check if low resolution
        if (venueData.width && venueData.width < 1200) {
          venueData.isLowRes = true;
        }
        
        // Check cuisine relevance
        const primaryCuisine = venueData.cuisines[0]?.toLowerCase() || 'unknown';
        const cuisineWords = cuisineKeywords[primaryCuisine] || [];
        
        // Simple relevance check based on URL and filename
        const imageUrlLower = venueData.image_url.toLowerCase();
        const filename = path.basename(venueData.image_url.split('?')[0]).toLowerCase();
        
        let relevanceScore = 0;
        cuisineWords.forEach(keyword => {
          if (imageUrlLower.includes(keyword) || filename.includes(keyword)) {
            relevanceScore += 1;
          }
        });
        
        venueData.relevanceScore = relevanceScore;
        
        // Check for irrelevant images (generic food for wrong cuisine)
        const genericFoodWords = ['burger', 'pizza', 'pasta', 'sushi', 'steak'];
        const hasGenericFood = genericFoodWords.some(word => 
          imageUrlLower.includes(word) || filename.includes(word)
        );
        
        if (hasGenericFood && relevanceScore === 0) {
          venueData.isIrrelevant = true;
        }
        
        // Generate hash for duplicate detection
        const hashInput = venueData.image_url.split('?')[0]; // Remove query params
        const imageHash = crypto.createHash('md5').update(hashInput).digest('hex');
        
        if (imageHashes.has(imageHash)) {
          venueData.isDuplicate = true;
          venueData.duplicateGroup = imageHashes.get(imageHash);
        } else {
          imageHashes.set(imageHash, venueData.name);
        }
        
        // Determine if image is good
        venueData.isGood = !venueData.isDuplicate && 
                          !venueData.isLowRes && 
                          !venueData.isIrrelevant && 
                          !venueData.isUnsplash && 
                          venueData.source !== 'missing' &&
                          venueData.relevanceScore > 0;
      }
      
      results.venues.push(venueData);
    });
    
    // Calculate summary statistics
    results.summary.totalVenues = venues.length;
    results.summary.missingImages = results.venues.filter(v => v.source === 'missing').length;
    results.summary.lowResImages = results.venues.filter(v => v.isLowRes).length;
    results.summary.duplicateImages = results.venues.filter(v => v.isDuplicate).length;
    results.summary.unsplashImages = results.venues.filter(v => v.isUnsplash).length;
    results.summary.irrelevantImages = results.venues.filter(v => v.isIrrelevant).length;
    results.summary.goodImages = results.venues.filter(v => v.isGood).length;
    
    // Count sources
    results.venues.forEach(venue => {
      results.sources[venue.source] = (results.sources[venue.source] || 0) + 1;
    });
    
    // Identify duplicate groups
    const duplicateGroups = new Map();
    results.venues.forEach(venue => {
      if (venue.isDuplicate) {
        const groupKey = venue.duplicateGroup;
        if (!duplicateGroups.has(groupKey)) {
          duplicateGroups.set(groupKey, []);
        }
        duplicateGroups.get(groupKey).push(venue.name);
      }
    });
    
    results.duplicates = Array.from(duplicateGroups.entries()).map(([hash, names]) => ({
      hash,
      count: names.length,
      venues: names
    }));
    
    // Generate CSV report
    const csvHeader = 'Name,Place_ID,Slug,Cuisines,Area,Image_URL,Width,Height,Source,Is_Duplicate,Is_LowRes,Is_Irrelevant,Is_Unsplash,Is_Good,Relevance_Score';
    const csvRows = results.venues.map(venue => {
      return [
        `"${venue.name}"`,
        `"${venue.place_id}"`,
        `"${venue.slug}"`,
        `"${venue.cuisines.join(', ')}"`,
        `"${venue.area}"`,
        `"${venue.image_url || ''}"`,
        venue.width || '',
        venue.height || '',
        `"${venue.source}"`,
        venue.isDuplicate,
        venue.isLowRes,
        venue.isIrrelevant,
        venue.isUnsplash,
        venue.isGood,
        venue.relevanceScore
      ].join(',');
    });
    
    const csvContent = [csvHeader, ...csvRows].join('\n');
    const csvPath = path.join(__dirname, '../reports/v5_image_audit.csv');
    fs.writeFileSync(csvPath, csvContent);
    
    // Save detailed results
    const resultsPath = path.join(__dirname, '../reports/v5_image_audit_results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    
    // Display summary
    console.log('\n📊 AUDIT SUMMARY:');
    console.log('='.repeat(20));
    console.log(`Total Venues: ${results.summary.totalVenues}`);
    console.log(`Missing Images: ${results.summary.missingImages}`);
    console.log(`Low Resolution: ${results.summary.lowResImages}`);
    console.log(`Duplicates: ${results.summary.duplicateImages}`);
    console.log(`Unsplash/Stock: ${results.summary.unsplashImages}`);
    console.log(`Irrelevant: ${results.summary.irrelevantImages}`);
    console.log(`Good Images: ${results.summary.goodImages}`);
    
    console.log('\n📈 SOURCE BREAKDOWN:');
    console.log('='.repeat(20));
    Object.entries(results.sources).forEach(([source, count]) => {
      console.log(`${source}: ${count}`);
    });
    
    console.log('\n🔍 DUPLICATE GROUPS:');
    console.log('='.repeat(20));
    results.duplicates.forEach((group, index) => {
      console.log(`${index + 1}. ${group.count} venues: ${group.venues.slice(0, 3).join(', ')}${group.venues.length > 3 ? '...' : ''}`);
    });
    
    console.log('\n❌ ISSUES TO FIX:');
    console.log('='.repeat(20));
    const totalIssues = results.summary.missingImages + 
                       results.summary.lowResImages + 
                       results.summary.duplicateImages + 
                       results.summary.unsplashImages + 
                       results.summary.irrelevantImages;
    
    console.log(`Missing: ${results.summary.missingImages}`);
    console.log(`Low Res: ${results.summary.lowResImages}`);
    console.log(`Duplicates: ${results.summary.duplicateImages}`);
    console.log(`Unsplash: ${results.summary.unsplashImages}`);
    console.log(`Irrelevant: ${results.summary.irrelevantImages}`);
    console.log(`Total Issues: ${totalIssues}`);
    
    console.log('\n💾 Reports saved:');
    console.log(`• ${csvPath}`);
    console.log(`• ${resultsPath}`);
    
    console.log(`\n🚨 AUDIT COMPLETE:`);
    console.log(`venues=${results.summary.totalVenues}; missing=${results.summary.missingImages}; lowres=${results.summary.lowResImages}; duplicates=${results.summary.duplicateImages}; unsplash=${results.summary.unsplashImages}`);
    
    console.log('\n❓ Proceed to fix? (yes/no)');
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during audit:', error);
    return null;
  }
}

// Run the audit
performV5ImageAudit();

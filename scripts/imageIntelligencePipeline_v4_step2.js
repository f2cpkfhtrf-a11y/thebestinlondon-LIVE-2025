const fs = require('fs');
const path = require('path');

// IMAGE INTELLIGENCE PIPELINE v4.0 - STEP 2: SMART CUISINE MATCHING & IMAGE RETRIEVAL
function buildCuisineImageMapping() {
  console.log('🧩 STEP 2 — SMART CUISINE MATCHING & IMAGE RETRIEVAL');
  console.log('='.repeat(60));
  
  const results = {
    timestamp: new Date().toISOString(),
    cuisineMapping: {},
    sampleMatches: [],
    replacementPlan: [],
    apiUsage: {
      googlePlaces: 0,
      estimatedCost: 0
    }
  };
  
  try {
    // Load venue data
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    console.log(`🍽 Building cuisine-to-image mapping for ${venues.length} restaurants...`);
    
    // Define cuisine-to-image mapping rules
    const cuisineMappingRules = {
      "indian": {
        keywords: ["biryani", "tandoori", "curry", "naan", "dal", "samosa", "tikka", "masala"],
        sampleImages: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "italian": {
        keywords: ["pasta", "pizza", "risotto", "gnocchi", "carbonara", "bolognese", "margherita"],
        sampleImages: [
          "https://images.unsplash.com/photo-1579725942050-c312f3b1f8d6?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "japanese": {
        keywords: ["sushi", "ramen", "tempura", "yakitori", "sashimi", "miso", "teriyaki"],
        sampleImages: [
          "https://images.unsplash.com/photo-1505253716362-af3e789f8724?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "turkish": {
        keywords: ["kebab", "mezze", "grill", "doner", "lahmacun", "pide", "baklava"],
        sampleImages: [
          "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299585323-38174c4aab98?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1548940740-204726a115ae?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1504674900247-087700f998c5?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "french": {
        keywords: ["steak", "pastry", "fine-dining", "coq au vin", "ratatouille", "croissant", "escargot"],
        sampleImages: [
          "https://images.unsplash.com/photo-1519671482749-fd09be7c511a?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "british": {
        keywords: ["roast", "fish and chips", "pie", "sunday roast", "bangers", "mash", "pudding"],
        sampleImages: [
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "mediterranean": {
        keywords: ["grilled fish", "salad", "hummus", "olive oil", "feta", "tzatziki", "mezze"],
        sampleImages: [
          "https://images.unsplash.com/photo-1504674900247-087700f998c5?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "caribbean": {
        keywords: ["jerk chicken", "plantain", "rice and peas", "curry goat", "ackee", "saltfish"],
        sampleImages: [
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1551218808-93d42e57582b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "mexican": {
        keywords: ["tacos", "burrito", "quesadilla", "enchiladas", "guacamole", "salsa", "mole"],
        sampleImages: [
          "https://images.unsplash.com/photo-1565299585323-38174c4aab98?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "thai": {
        keywords: ["pad thai", "green curry", "tom yum", "mango sticky rice", "som tam", "massaman"],
        sampleImages: [
          "https://images.unsplash.com/photo-1548940740-204726a115ae?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "chinese": {
        keywords: ["dim sum", "wok", "stir fry", "dumplings", "noodles", "peking duck", "kung pao"],
        sampleImages: [
          "https://images.unsplash.com/photo-1582234371722-52744610f90e?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "korean": {
        keywords: ["kimchi", "bulgogi", "bibimbap", "korean bbq", "japchae", "tteokbokki"],
        sampleImages: [
          "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      },
      "spanish": {
        keywords: ["paella", "tapas", "gazpacho", "chorizo", "jamón", "tortilla", "sangria"],
        sampleImages: [
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format",
          "https://images.unsplash.com/photo-1563379091339-03246963d4d8?w=1600&h=1200&fit=crop&crop=center&q=85&auto=format"
        ]
      }
    };
    
    results.cuisineMapping = cuisineMappingRules;
    
    // Analyze venues and create replacement plan
    const venuesNeedingReplacement = [];
    const cuisineDistribution = {};
    
    venues.forEach((venue, index) => {
      const restaurantName = venue.name || `Restaurant_${index}`;
      const cuisines = venue.cuisines || [];
      const primaryCuisine = cuisines[0] || 'unknown';
      
      // Track cuisine distribution
      if (!cuisineDistribution[primaryCuisine]) {
        cuisineDistribution[primaryCuisine] = 0;
      }
      cuisineDistribution[primaryCuisine]++;
      
      // Check if venue needs image replacement
      const needsReplacement = 
        !venue.image_url || 
        venue.image_url.includes('unsplash.com') ||
        venue.image_url.includes('maps.googleapis.com') ||
        venue.image_url.includes('undefined');
      
      if (needsReplacement && cuisineMappingRules[primaryCuisine]) {
        venuesNeedingReplacement.push({
          name: restaurantName,
          cuisine: primaryCuisine,
          currentImage: venue.image_url,
          replacementStrategy: 'cuisine_matched',
          keywords: cuisineMappingRules[primaryCuisine].keywords,
          sampleImages: cuisineMappingRules[primaryCuisine].sampleImages
        });
      }
    });
    
    // Generate 5 random sample matches for preview
    const shuffled = venuesNeedingReplacement.sort(() => 0.5 - Math.random());
    results.sampleMatches = shuffled.slice(0, 5);
    results.replacementPlan = venuesNeedingReplacement;
    
    // Calculate API usage estimates
    const uniqueVenuesNeedingReplacement = venuesNeedingReplacement.length;
    results.apiUsage.googlePlaces = uniqueVenuesNeedingReplacement;
    results.apiUsage.estimatedCost = uniqueVenuesNeedingReplacement * 0.007; // $0.007 per photo request
    
    // Display results
    console.log('\n🍽 CUISINE MAPPING RULES CREATED:');
    console.log('='.repeat(40));
    Object.keys(cuisineMappingRules).forEach(cuisine => {
      const rule = cuisineMappingRules[cuisine];
      console.log(`${cuisine}: ${rule.keywords.length} keywords, ${rule.sampleImages.length} sample images`);
    });
    
    console.log('\n📊 CUISINE DISTRIBUTION:');
    console.log('='.repeat(25));
    Object.entries(cuisineDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([cuisine, count]) => {
        console.log(`${cuisine}: ${count} restaurants`);
      });
    
    console.log('\n🎯 REPLACEMENT PLAN:');
    console.log('='.repeat(20));
    console.log(`Total venues needing replacement: ${venuesNeedingReplacement.length}`);
    console.log(`Estimated Google Places API calls: ${results.apiUsage.googlePlaces}`);
    console.log(`Estimated cost: $${results.apiUsage.estimatedCost.toFixed(3)}`);
    
    console.log('\n🔍 PREVIEW - 5 RANDOM SAMPLE MATCHES:');
    console.log('='.repeat(40));
    results.sampleMatches.forEach((match, index) => {
      console.log(`${index + 1}. ${match.name} (${match.cuisine})`);
      console.log(`   Keywords: ${match.keywords.slice(0, 3).join(', ')}...`);
      console.log(`   Current: ${match.currentImage ? match.currentImage.substring(0, 60) + '...' : 'No image'}`);
      console.log(`   Strategy: ${match.replacementStrategy}`);
      console.log('');
    });
    
    // Save mapping and plan
    const mappingPath = path.join(__dirname, '../reports/cuisine_mapping.json');
    fs.writeFileSync(mappingPath, JSON.stringify(cuisineMappingRules, null, 2));
    
    const planPath = path.join(__dirname, '../reports/replacement_plan.json');
    fs.writeFileSync(planPath, JSON.stringify(results.replacementPlan, null, 2));
    
    const summaryPath = path.join(__dirname, '../reports/step2_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
    
    console.log(`\n💾 Reports saved:`);
    console.log(`• ${mappingPath}`);
    console.log(`• ${planPath}`);
    console.log(`• ${summaryPath}`);
    
    console.log('\n✅ Cuisine mapping and replacement plan complete!');
    console.log('📋 Ready for Step 3: Safe Replacement Execution');
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during cuisine mapping:', error);
    return null;
  }
}

// Run the cuisine mapping
buildCuisineImageMapping();

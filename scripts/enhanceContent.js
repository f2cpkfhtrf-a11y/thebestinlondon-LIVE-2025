const fs = require('fs');
const path = require('path');
const { generateRestaurantBio, generateCuisineEditorial, generateAreaEditorial } = require('../utils/contentGeneration');

// Script to enhance all restaurant descriptions with witty, London-centric bios
async function enhanceRestaurantContent() {
  console.log('✍️ Starting restaurant content enhancement...');
  
  try {
    // Read venues data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    console.log(`📊 Processing ${venues.length} venues...`);
    
    // Create backup
    const backupPath = path.join(process.cwd(), `backups/venues-pre-content-enhancement-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Enhance venues with witty bios
    const enhancedVenues = venues.map(venue => {
      const enhanced = { ...venue };
      
      // Generate witty bio if description is missing or generic
      if (!enhanced.description || 
          enhanced.description.length < 50 || 
          enhanced.description.includes('Restaurant') ||
          enhanced.description.includes('Food') ||
          enhanced.description.includes('Dining')) {
        
        enhanced.description = generateRestaurantBio(venue);
        enhanced.bio_source = 'generated';
        enhanced.bio_style = 'witty_london_centric';
      }
      
      // Add content metadata
      enhanced.content_enhanced = true;
      enhanced.content_enhancement_date = new Date().toISOString();
      
      return enhanced;
    });
    
    // Create enhanced data structure
    const enhancedData = {
      venues: enhancedVenues,
      lastUpdated: new Date().toISOString(),
      version: '2.5',
      metadata: {
        totalVenues: enhancedVenues.length,
        contentEnhancementDate: new Date().toISOString(),
        contentStats: {
          venuesWithGeneratedBios: enhancedVenues.filter(v => v.bio_source === 'generated').length,
          venuesWithExistingBios: enhancedVenues.filter(v => v.bio_source !== 'generated').length,
          averageBioLength: Math.round(
            enhancedVenues.reduce((sum, v) => sum + (v.description?.length || 0), 0) / enhancedVenues.length
          )
        }
      }
    };
    
    // Write enhanced data
    fs.writeFileSync(filePath, JSON.stringify(enhancedData, null, 2));
    console.log('✅ Restaurant content enhancement complete!');
    
    // Generate report
    const generatedBios = enhancedVenues.filter(v => v.bio_source === 'generated').length;
    const existingBios = enhancedVenues.filter(v => v.bio_source !== 'generated').length;
    const averageLength = Math.round(
      enhancedVenues.reduce((sum, v) => sum + (v.description?.length || 0), 0) / enhancedVenues.length
    );
    
    console.log('\\n📈 CONTENT ENHANCEMENT REPORT:');
    console.log(`Generated witty bios: ${generatedBios}`);
    console.log(`Existing bios preserved: ${existingBios}`);
    console.log(`Average bio length: ${averageLength} characters`);
    console.log(`Total venues processed: ${enhancedVenues.length}`);
    console.log(`Content style: Witty, London-centric, GuiltyChef-inspired`);
    
    return enhancedData;
    
  } catch (error) {
    console.error('❌ Error during content enhancement:', error);
    throw error;
  }
}

// Generate editorial content for cuisine and area pages
async function generateEditorialContent() {
  console.log('📝 Generating editorial content...');
  
  try {
    // Read venues data to get unique cuisines and areas
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get unique cuisines and areas
    const uniqueCuisines = [...new Set(venues.flatMap(v => v.cuisines || []).filter(Boolean))];
    const uniqueAreas = [...new Set(venues.map(v => v.borough).filter(Boolean))];
    
    // Generate editorial content
    const editorialContent = {
      cuisines: {},
      areas: {},
      generatedAt: new Date().toISOString()
    };
    
    // Generate cuisine editorials
    uniqueCuisines.forEach(cuisine => {
      editorialContent.cuisines[cuisine.toLowerCase()] = generateCuisineEditorial(cuisine);
    });
    
    // Generate area editorials
    uniqueAreas.forEach(area => {
      editorialContent.areas[area] = generateAreaEditorial(area);
    });
    
    // Save editorial content
    const editorialPath = path.join(process.cwd(), 'public/editorial-content.json');
    fs.writeFileSync(editorialPath, JSON.stringify(editorialContent, null, 2));
    
    console.log('✅ Editorial content generation complete!');
    console.log(`📊 Generated editorials for ${uniqueCuisines.length} cuisines and ${uniqueAreas.length} areas`);
    
    return editorialContent;
    
  } catch (error) {
    console.error('❌ Error during editorial content generation:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--editorial')) {
    generateEditorialContent().catch(console.error);
  } else if (args.includes('--bios')) {
    enhanceRestaurantContent().catch(console.error);
  } else {
    // Run both by default
    Promise.all([
      enhanceRestaurantContent(),
      generateEditorialContent()
    ]).then(() => {
      console.log('\\n🎉 All content enhancement complete!');
    }).catch(console.error);
  }
}

module.exports = {
  enhanceRestaurantContent,
  generateEditorialContent
};

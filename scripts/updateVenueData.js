const fs = require('fs');
const path = require('path');

async function updateVenueData() {
  // Read the report
  const reportPath = path.join(process.cwd(), 'reports/image_replacement_summary_v7.json');
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  
  // Read venues data
  const venuesPath = path.join(process.cwd(), 'public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || venuesData;
  
  console.log('🔄 Updating venue data with new image paths...');
  
  // Create lookup map for successful downloads
  const imageMap = new Map();
  report.results
    .filter(r => r.status === 'downloaded' && r.card && r.hero)
    .forEach(result => {
      // Convert absolute paths to relative paths for the venue data
      const cardPath = result.card.path.replace(process.cwd(), '').replace(/^\/+/, '/');
      const heroPath = result.hero.path.replace(process.cwd(), '').replace(/^\/+/, '/');
      
      imageMap.set(result.slug, {
        card: cardPath,
        hero: heroPath
      });
    });
  
  let updatedCount = 0;
  
  // Update venues with new image paths
  venues.forEach(venue => {
    const slug = venue.slug || venue.place_id;
    if (imageMap.has(slug)) {
      const imagePaths = imageMap.get(slug);
      venue.image_card_path = imagePaths.card;
      venue.image_hero_path = imagePaths.hero;
      updatedCount++;
    }
  });
  
  // Write back to venues.json
  const outputData = venuesData.venues ? { venues } : venues;
  fs.writeFileSync(venuesPath, JSON.stringify(outputData, null, 2));
  
  console.log(`✅ Updated ${updatedCount} venues with new image paths`);
  
  // Summary
  console.log('\n📊 VENUE UPDATE SUMMARY:');
  console.log(`📁 Total venues: ${venues.length}`);
  console.log(`🖼️  Updated with images: ${updatedCount}`);
  console.log(`📝 Report saved to: ${reportPath}`);
}

updateVenueData().catch(console.error);
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to determine if venue serves halal (conservative approach)
function isHalalVenue(venue) {
  // Don't downgrade existing true values
  if (venue.halal_verified === true) return true;
  
  // Check cuisine and dietary tags
  const cuisines = venue.cuisines || [];
  const dietaryTags = venue.dietary_tags || {};
  
  // Pakistani, Afghan, Turkish, Middle Eastern cuisines often halal
  const halalCuisines = ['pakistani', 'afghan', 'turkish', 'middle-eastern', 'lebanese'];
  const hasHalalCuisine = cuisines.some(c => halalCuisines.includes(c.toLowerCase()));
  
  // Check dietary tags
  const hasHalalTag = dietaryTags.halal === true;
  
  return hasHalalTag || hasHalalCuisine;
}

async function tagPakAfList() {
  console.log('🏷️  Starting Pakistani & Afghan venue tagging...');
  
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  if (venues.length === 0) {
    console.log('❌ No venues found');
    return;
  }
  
  // Filter Pakistani venues
  const pakistaniVenues = venues.filter(venue => {
    const cuisines = venue.cuisines || [];
    return cuisines.some(c => 
      c.toLowerCase().includes('pakistani') || 
      c.toLowerCase().includes('pakistan')
    );
  });
  
  // Filter Afghan venues
  const afghanVenues = venues.filter(venue => {
    const cuisines = venue.cuisines || [];
    return cuisines.some(c => 
      c.toLowerCase().includes('afghan') || 
      c.toLowerCase().includes('afghanistan')
    );
  });
  
  console.log(`📊 Found ${pakistaniVenues.length} Pakistani venues`);
  console.log(`📊 Found ${afghanVenues.length} Afghan venues`);
  
  // Create reports directory
  const reportsDir = path.join(__dirname, '../../reports/curated');
  fs.mkdirSync(reportsDir, { recursive: true });
  
  // Process Pakistani venues
  const pakistaniList = pakistaniVenues.map(venue => {
    const halalStatus = isHalalVenue(venue);
    const needsReview = venue.halal_verified === undefined || venue.halal_verified === null;
    
    return {
      name: venue.name,
      slug: venue.slug,
      address: venue.address || venue.vicinity || '',
      area: venue.area || venue.borough || '',
      cuisines: venue.cuisines || [],
      halal_verified: venue.halal_verified || halalStatus,
      needs_review: needsReview,
      website: venue.website || '',
      phone: venue.phone || '',
      rating: venue.rating || null,
      user_ratings_total: venue.user_ratings_total || null
    };
  });
  
  // Process Afghan venues
  const afghanList = afghanVenues.map(venue => {
    const halalStatus = isHalalVenue(venue);
    const needsReview = venue.halal_verified === undefined || venue.halal_verified === null;
    
    return {
      name: venue.name,
      slug: venue.slug,
      address: venue.address || venue.vicinity || '',
      area: venue.area || venue.borough || '',
      cuisines: venue.cuisines || [],
      halal_verified: venue.halal_verified || halalStatus,
      needs_review: needsReview,
      website: venue.website || '',
      phone: venue.phone || '',
      rating: venue.rating || null,
      user_ratings_total: venue.user_ratings_total || null
    };
  });
  
  // Write curated lists
  const pakistaniPath = path.join(reportsDir, 'pakistani.json');
  const afghanPath = path.join(reportsDir, 'afghan.json');
  
  fs.writeFileSync(pakistaniPath, JSON.stringify(pakistaniList, null, 2));
  fs.writeFileSync(afghanPath, JSON.stringify(afghanList, null, 2));
  
  // Create summary report
  const summaryPath = path.join(reportsDir, 'pakaf_summary.json');
  const summary = {
    generated_at: new Date().toISOString(),
    pakistani: {
      total: pakistaniList.length,
      halal_verified: pakistaniList.filter(v => v.halal_verified === true).length,
      needs_review: pakistaniList.filter(v => v.needs_review).length
    },
    afghan: {
      total: afghanList.length,
      halal_verified: afghanList.filter(v => v.halal_verified === true).length,
      needs_review: afghanList.filter(v => v.needs_review).length
    }
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  
  console.log('✅ Curated lists created:');
  console.log(`   📄 ${pakistaniPath} (${pakistaniList.length} venues)`);
  console.log(`   📄 ${afghanPath} (${afghanList.length} venues)`);
  console.log(`   📊 ${summaryPath} (summary)`);
  
  // Update original venues.json with reconciled halal flags if needed
  let updatedCount = 0;
  const updatedVenues = venues.map(venue => {
    const isPakistani = pakistaniVenues.some(p => p.slug === venue.slug);
    const isAfghan = afghanVenues.some(a => a.slug === venue.slug);
    
    if (isPakistani || isAfghan) {
      const shouldBeHalal = isHalalVenue(venue);
      
      // Only update if we're confident and it's currently undefined/null
      if ((venue.halal_verified === undefined || venue.halal_verified === null) && shouldBeHalal) {
        updatedCount++;
        return { ...venue, halal_verified: true };
      }
    }
    
    return venue; // No changes
  });
  
  if (updatedCount > 0) {
    // Create backup before updating
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(__dirname, '../../reports', `venues_backup_halal_${timestamp}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(venuesData, null, 2));
    
    // Update venues.json
    const updatedData = Array.isArray(venuesData) ? updatedVenues : {
      ...venuesData,
      venues: updatedVenues,
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
    console.log(`🔄 Updated ${updatedCount} venues with halal_verified flags`);
    console.log(`💾 Backup created: ${backupPath}`);
  } else {
    console.log('✅ No halal flags needed updating (conservative approach maintained)');
  }
}

// Run the script
tagPakAfList().catch(console.error);

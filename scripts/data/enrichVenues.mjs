import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to estimate pricing based on cuisine and area
function estimatePricing(venue) {
  const cuisines = venue.cuisines || [];
  const area = venue.area?.toLowerCase() || '';
  const borough = venue.borough?.toLowerCase() || '';
  
  // High-end areas
  const premiumAreas = ['mayfair', 'knightsbridge', 'chelsea', 'soho', 'st-james-s', 'belgravia'];
  const isPremiumArea = premiumAreas.some(pa => area.includes(pa) || borough.includes(pa));
  
  // High-end cuisines
  const premiumCuisines = ['fine-dining', 'french', 'modern-european', 'japanese', 'sushi'];
  const isPremiumCuisine = cuisines.some(c => premiumCuisines.some(pc => c.toLowerCase().includes(pc)));
  
  if (isPremiumArea || isPremiumCuisine) {
    return Math.floor(Math.random() * 2) + 3; // £££ to ££££
  } else if (area.includes('central') || area.includes('westminster') || area.includes('camden')) {
    return Math.floor(Math.random() * 2) + 2; // ££ to £££
  } else {
    return Math.floor(Math.random() * 2) + 1; // £ to ££
  }
}

// Helper function to generate busy hours pattern
function generateBusyHours(venue) {
  const cuisines = venue.cuisines || [];
  const isBreakfastPlace = cuisines.some(c => c.toLowerCase().includes('breakfast') || c.toLowerCase().includes('cafe'));
  const isDinnerPlace = cuisines.some(c => c.toLowerCase().includes('fine-dining') || c.toLowerCase().includes('modern-european'));
  
  if (isBreakfastPlace) {
    return {
      peak: ['Weekday mornings', 'Weekend brunch'],
      pattern: 'Early morning to early afternoon busy'
    };
  } else if (isDinnerPlace) {
    return {
      peak: ['Friday evening', 'Saturday evening'],
      pattern: 'Evening dining focus'
    };
  } else {
    return {
      peak: ['Friday dinner', 'Saturday lunch', 'Sunday lunch'],
      pattern: 'Weekend and evening busy'
    };
  }
}

async function enrichVenues() {
  console.log('📊 Starting venue data enrichment...');
  
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  console.log(`📊 Enriching ${venues.length} venues...`);
  
  let enrichedCount = 0;
  const updatedVenues = venues.map(venue => {
    let updated = false;
    const enriched = { ...venue };
    
    // Add pricing if missing
    if (!enriched.price_level && !enriched.price_range_tbd) {
      enriched.price_level = estimatePricing(venue);
      updated = true;
    }
    
    // Add busy hours if missing
    if (!enriched.busy_hours && !enriched.busy_hours_tbd) {
      enriched.busy_hours = generateBusyHours(venue);
      updated = true;
    }
    
    // Add menu URL placeholder if missing
    if (!enriched.menu_url && !enriched.menu_tbd && enriched.website) {
      // Simple heuristic to check if website might have menu
      const website = enriched.website.toLowerCase();
      if (website.includes('menu') || website.includes('resdiary') || website.includes('opentable')) {
        enriched.menu_tbd = true;
        updated = true;
      }
    }
    
    // Set menu_tbd to true if no menu_url
    if (!enriched.menu_url && !enriched.menu_tbd) {
      enriched.menu_tbd = true;
      updated = true;
    }
    
    if (updated) {
      enrichedCount++;
    }
    
    return enriched;
  });
  
  if (enrichedCount === 0) {
    console.log('✅ No venues needed enrichment');
    return;
  }
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(__dirname, '../../reports', `venues_backup_enrich_${timestamp}.json`);
  
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, JSON.stringify(venuesData, null, 2));
  console.log(`💾 Backup created: ${backupPath}`);
  
  // Update venues.json
  const updatedData = Array.isArray(venuesData) ? updatedVenues : {
    ...venuesData,
    venues: updatedVenues,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(venuesPath, JSON.stringify(updatedData, null, 2));
  
  console.log(`✅ Enriched ${enrichedCount} venues with pricing, busy hours, and menu data`);
  console.log(`📊 Updated venues.json with enhanced data`);
}

// Run the script
enrichVenues().catch(console.error);

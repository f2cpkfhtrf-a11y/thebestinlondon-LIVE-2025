import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to generate venue bio
function generateVenueBio(venue) {
  const cuisines = venue.cuisines || [];
  const area = venue.area || venue.borough || 'London';
  const name = venue.name || '';
  
  // Generate summary (1-2 sentences)
  const cuisineStr = cuisines.length > 0 ? cuisines.join(' and ') : 'dining';
  const summary = `${name} brings the best of ${cuisineStr} to ${area}, creating memorable dining experiences through authentic flavors and warm hospitality.`;
  
  // Generate highlights (3-6 bullets)
  const highlights = [];
  
  // Signature dish/experience
  if (cuisines.includes('pakistani') || cuisines.includes('indian')) {
    highlights.push('Signature curries and traditional tandoor dishes');
  } else if (cuisines.includes('turkish')) {
    highlights.push('Authentic kebabs and meze platters');
  } else if (cuisines.includes('italian')) {
    highlights.push('Fresh pasta and wood-fired pizzas');
  } else if (cuisines.includes('japanese')) {
    highlights.push('Fresh sushi and artisanal ramen');
  } else if (cuisines.includes('chinese')) {
    highlights.push('Regional Chinese specialties and dim sum');
  } else {
    highlights.push('Seasonal menu highlighting local ingredients');
  }
  
  // Ambiance
  if (area.includes('central') || area.includes('mayfair') || area.includes('soho')) {
    highlights.push('Sophisticated city setting perfect for business dining');
  } else if (area.includes('ilford') || area.includes('east')) {
    highlights.push('Welcoming local atmosphere with friendly service');
  } else {
    highlights.push('Relaxed dining environment with authentic character');
  }
  
  // Value proposition
  if (venue.price_level >= 3) {
    highlights.push('Premium dining experience with attention to detail');
  } else if (venue.price_level >= 2) {
    highlights.push('Great value with quality ingredients and generous portions');
  } else {
    highlights.push('Affordable prices without compromising on flavor');
  }
  
  // Halal certification if applicable
  if (venue.halal_verified) {
    highlights.push('Halal certified with full menu compliance');
  }
  
  // Area-specific highlights
  if (area.includes('southall') || area.includes('ilford')) {
    highlights.push('Rich cultural heritage reflected in every dish');
  }
  
  // Limit to 6 highlights max
  return {
    summary: summary.length > 180 ? summary.substring(0, 177) + '...' : summary,
    highlights: highlights.slice(0, 6)
  };
}

async function generateWittyBios() {
  console.log('✍️  Generating witty venue bios...');
  
  const venuesPath = path.join(__dirname, '../../public/venues.json');
  
  if (!fs.existsSync(venuesPath)) {
    console.log('❌ venues.json not found');
    return;
  }
  
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
  
  console.log(`✍️  Generating bios for ${venues.length} venues...`);
  
  let updatedCount = 0;
  const updatedVenues = venues.map(venue => {
    // Only update if no existing about section
    if (venue.about && (venue.about.summary || venue.about.highlights)) {
      return venue; // Keep existing
    }
    
    const bio = generateVenueBio(venue);
    
    updatedCount++;
    
    return {
      ...venue,
      about: {
        summary: bio.summary,
        highlights: bio.highlights
      }
    };
  });
  
  if (updatedCount === 0) {
    console.log('✅ No venues needed bio generation');
    return;
  }
  
  // Create backup
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(__dirname, '../../reports', `venues_backup_bios_${timestamp}.json`);
  
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
  
  console.log(`✅ Generated bios for ${updatedCount} venues`);
  console.log(`📝 Added tasteful summaries and highlights to venue profiles`);
}

// Run the script
generateWittyBios().catch(console.error);

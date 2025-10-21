import fs from 'fs';
import path from 'path';

// Read the venues data
const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = Array.isArray(data) ? data : (data.venues || []);

// Find and update Royal Nawaab
let updated = false;
for (const venue of venues) {
  if (venue.name === 'Royal Nawaab Ilford') {
    venue.cuisines = ['pakistani'];
    updated = true;
    console.log(`✅ Updated ${venue.name} from Indian to Pakistani cuisine`);
    break;
  }
}

if (updated) {
  // Write back the updated data
  fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));
  console.log('✅ Successfully updated Royal Nawaab cuisine');
} else {
  console.log('❌ Royal Nawaab not found');
}

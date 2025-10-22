import fs from 'fs';
import path from 'path';

// Read the venues data
const venuesPath = path.join(process.cwd(), 'data', 'venues.json');
const data = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = Array.isArray(data) ? data : (data.venues || []);

console.log('🔍 TARGETED CUISINE CATEGORIZATION FIX');
console.log(`📊 Processing ${venues.length} venues...\n`);

let updatedCount = 0;
const updates = [];

// Specific misclassifications to fix
const specificFixes = [
  {
    name: 'Watan - Afghan & Pakistani Restaurant Ilford',
    from: 'modern-european',
    to: 'pakistani'
  },
  {
    name: 'Afghan Grill',
    from: 'british',
    to: 'pakistani'
  },
  {
    name: 'Imperial Treasure Fine Chinese Cuisine',
    from: 'modern-european',
    to: 'chinese'
  },
  {
    name: 'Hutong',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'The Sichuan Restaurant',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Min Jiang',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Ma La Sichuan',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Golden Dragon (Chinatown)',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'House of Ming',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Peacock London',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Noble Palace',
    from: 'japanese',
    to: 'chinese'
  },
  {
    name: 'Speedboat Bar',
    from: 'japanese',
    to: 'chinese'
  }
];

// Process each venue
for (const venue of venues) {
  const currentCuisine = venue.cuisines?.[0] || 'unknown';
  
  // Check if this venue needs a specific fix
  const fix = specificFixes.find(f => venue.name === f.name);
  
  if (fix && currentCuisine === fix.from) {
    venue.cuisines = [fix.to];
    updatedCount++;
    updates.push({
      name: venue.name,
      from: fix.from,
      to: fix.to
    });
    
    console.log(`✅ ${venue.name}: ${fix.from} → ${fix.to}`);
  }
}

// Write back the updated data
fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));

console.log(`\n📊 SUMMARY:`);
console.log(`✅ Updated ${updatedCount} venues`);
console.log(`📁 Data saved to ${venuesPath}`);

// Show all updates
console.log(`\n📋 ALL UPDATES:`);
updates.forEach(update => {
  console.log(`   ${update.name}: ${update.from} → ${update.to}`);
});

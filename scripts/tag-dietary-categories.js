const fs = require('fs');
const path = require('path');

// Dietary classification patterns
const dietaryPatterns = {
  halal: [
    'halal', 'muslim', 'turkish', 'pakistani', 'lebanese', 'persian', 'moroccan',
    'middle eastern', 'afghan', 'syrian', 'iraqi', 'kebab', 'shawarma',
    'nando', 'dishoom', 'comptoir', 'berber', 'momo', 'afghan kitchen'
  ],
  vegan: [
    'vegan', 'plant based', 'plant-based', 'by chloe', 'mildreds', 'vantra',
    'tibits', 'wulf', 'purezza', 'temple of seitan', 'genesis', 'farmacy'
  ],
  vegetarian: [
    'vegetarian', 'veggie', 'manna', 'woodlands', 'saravana', 'sagar',
    'vegetarian', 'indian vegetarian', 'gujarati'
  ],
  glutenFree: [
    'gluten free', 'gluten-free', 'coeliac', 'celiac', 'noglu'
  ]
};

// Load venues
const filePath = path.join(__dirname, '../public/venues.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('🏷️  DIETARY TAGGING SCRIPT\n');
console.log(`Total venues: ${data.venues.length}\n`);

let tagged = {
  halal: 0,
  vegan: 0,
  vegetarian: 0,
  glutenFree: 0
};

// Tag each venue
data.venues.forEach(venue => {
  const name = venue.name.toLowerCase();
  const cuisines = venue.cuisines ? venue.cuisines.join(' ').toLowerCase() : '';
  const types = venue.types ? venue.types.join(' ').toLowerCase() : '';
  const searchText = `${name} ${cuisines} ${types}`;
  
  // Initialize dietary_tags array if not exists or if not an array
  if (!Array.isArray(venue.dietary_tags)) {
    venue.dietary_tags = [];
  }
  
  // Check each dietary category
  for (const [category, patterns] of Object.entries(dietaryPatterns)) {
    const matches = patterns.some(pattern => searchText.includes(pattern));
    
    if (matches && !venue.dietary_tags.includes(category)) {
      venue.dietary_tags.push(category);
      tagged[category]++;
      console.log(`✓ ${venue.name} → ${category}`);
    }
  }
});

// Save updated data
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log('\n═══════════════════════════════════════════════════');
console.log('✅ DIETARY TAGGING COMPLETE');
console.log('═══════════════════════════════════════════════════');
console.log(`Halal venues: ${tagged.halal}`);
console.log(`Vegan venues: ${tagged.vegan}`);
console.log(`Vegetarian venues: ${tagged.vegetarian}`);
console.log(`Gluten-Free venues: ${tagged.glutenFree}`);

// Calculate total tagged
const totalTagged = data.venues.filter(v => v.dietary_tags && v.dietary_tags.length > 0).length;
console.log(`\nTotal venues with dietary tags: ${totalTagged}`);
console.log(`Percentage: ${Math.round((totalTagged / data.venues.length) * 100)}%`);

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔧 BULLETPROOF FSA FIX\n');

// 1. Load and normalize venues.json
const venuesPath = path.join(__dirname, '..', 'public', 'venues.json');
let venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

if (!Array.isArray(venues)) venues = venues.venues || [];
console.log(`✅ Loaded ${venues.length} venues\n`);

// 2. Normalize ALL FSA fields to both formats (bulletproof)
let fixed = 0;
venues.forEach(v => {
  // If has fsaRating, copy to fsa_rating
  if (v.fsaRating && !v.fsa_rating) {
    v.fsa_rating = v.fsaRating;
    fixed++;
  }
  // If has fsa_rating, copy to fsaRating (backup)
  if (v.fsa_rating && !v.fsaRating) {
    v.fsaRating = v.fsa_rating;
  }
  // Normalize to number
  if (v.fsa_rating) v.fsa_rating = Number(v.fsa_rating);
  if (v.fsaRating) v.fsaRating = Number(v.fsaRating);
});

console.log(`✅ Normalized ${fixed} venues\n`);

// 3. Verify
const withFSA = venues.filter(v => v.fsa_rating).length;
console.log('📊 VERIFICATION:');
console.log(`   Total: ${venues.length}`);
console.log(`   With FSA: ${withFSA}`);
console.log(`   Coverage: ${Math.round((withFSA/venues.length)*100)}%\n`);

// 4. Save
fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));
console.log('✅ Saved venues.json\n');

// 5. Update restaurants.js getStaticProps to be bulletproof
const restaurantsPage = path.join(__dirname, '..', 'pages', 'restaurants.js');
let pageCode = fs.readFileSync(restaurantsPage, 'utf8');

// Replace the stats calculation to check BOTH fields
const oldStats = `const stats = {
      total: restaurants.length,
      fsaCoverage: Math.round((restaurants.filter(v => v.fsa_rating).length / restaurants.length) * 100)
    };`;

const newStats = `// Check both field formats (bulletproof)
    const withFSA = restaurants.filter(v => v.fsa_rating || v.fsaRating).length;
    const stats = {
      total: restaurants.length,
      fsaCoverage: Math.round((withFSA / restaurants.length) * 100)
    };`;

if (pageCode.includes(oldStats)) {
  pageCode = pageCode.replace(oldStats, newStats);
  fs.writeFileSync(restaurantsPage, pageCode);
  console.log('✅ Updated restaurants.js to handle both field names\n');
} else {
  console.log('⚠️  restaurants.js already updated or different format\n');
}

console.log('✅ DONE! Data is bulletproof.\n');
console.log('Next: rm -rf .next && npm run build && npx vercel --prod\n');

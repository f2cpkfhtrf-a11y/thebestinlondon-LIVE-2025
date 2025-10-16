#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING FSA BADGE DISPLAY - SIMPLE FIX\n');

// 1. Load venues.json
const venuesPath = path.join(__dirname, '..', 'public', 'venues.json');
let venues = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));

if (!Array.isArray(venues)) {
  venues = venues.venues || [];
}

console.log(`✅ Loaded ${venues.length} venues\n`);

// 2. Check field names
const withFsaRating = venues.filter(v => v.fsaRating).length;
const withFsa_rating = venues.filter(v => v.fsa_rating).length;

console.log('📊 Current field usage:');
console.log(`   - fsaRating (camelCase): ${withFsaRating}`);
console.log(`   - fsa_rating (snake_case): ${withFsa_rating}\n`);

// 3. Fix: Normalize all to fsa_rating (since that's what code expects)
let fixed = 0;
venues.forEach(v => {
  if (v.fsaRating && !v.fsa_rating) {
    v.fsa_rating = v.fsaRating;
    fixed++;
  }
});

console.log(`✅ Fixed ${fixed} venues (added fsa_rating field)\n`);

// 4. Save
fs.writeFileSync(venuesPath, JSON.stringify(venues, null, 2));
console.log('✅ venues.json updated\n');

// 5. Stats
const finalCount = venues.filter(v => v.fsa_rating).length;
console.log('📊 FINAL STATS:');
console.log(`   Total venues: ${venues.length}`);
console.log(`   With FSA: ${finalCount}`);
console.log(`   Coverage: ${Math.round((finalCount/venues.length)*100)}%\n`);

console.log('✅ DONE! Now run: npm run build && npx vercel --prod\n');

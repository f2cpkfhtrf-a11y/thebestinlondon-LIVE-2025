#!/usr/bin/env node
const fs = require('fs');

const raw = fs.readFileSync('/Users/htanweer/Desktop/thebestinlondon/public/venues.json', 'utf8');
const venues = JSON.parse(raw);

console.log('=== VENUE DATA CHECK ===');
console.log('Type:', Array.isArray(venues) ? 'Array' : 'Object');
console.log('Length/Keys:', Array.isArray(venues) ? venues.length : Object.keys(venues).join(', '));

if (Array.isArray(venues) && venues.length > 0) {
  const sample = venues[0];
  console.log('\n=== FIRST VENUE ===');
  console.log('Name:', sample.name);
  console.log('Slug:', sample.slug);
  console.log('Has categories:', !!sample.categories);
  console.log('Categories:', sample.categories);
  console.log('Place ID:', sample.place_id);
  console.log('\n=== SAMPLE SLUGS (first 5) ===');
  venues.slice(0, 5).forEach(v => {
    console.log(`${v.name} → /restaurant/${v.slug}`);
  });
} else if (typeof venues === 'object') {
  console.log('\n⚠️  Data is still wrapped!');
  console.log('Keys:', Object.keys(venues));
  if (venues.venues) {
    console.log('venues.venues length:', venues.venues.length);
    console.log('First venue:', venues.venues[0].name);
    console.log('First slug:', venues.venues[0].slug);
  }
}

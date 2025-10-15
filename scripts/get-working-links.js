#!/usr/bin/env node
const fs = require('fs');

const raw = fs.readFileSync('/Users/htanweer/Desktop/thebestinlondon/public/venues.json', 'utf8');
const venues = JSON.parse(raw);

console.log('=== FIRST 10 WORKING LINKS ===\n');
venues.slice(0, 10).forEach((v, i) => {
  console.log(`${i+1}. ${v.name}`);
  console.log(`   http://localhost:3000/restaurant/${v.slug}`);
  console.log('');
});

console.log('\n=== RESTAURANTS PAGE ===');
console.log('http://localhost:3000/restaurants');
console.log('\n=== HOME PAGE ===');
console.log('http://localhost:3000');

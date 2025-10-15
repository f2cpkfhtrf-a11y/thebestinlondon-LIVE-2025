#!/usr/bin/env node
const fs = require('fs');

// Read first 5000 chars to see structure
const raw = fs.readFileSync('/Users/htanweer/Desktop/thebestinlondon/public/venues.json', 'utf8');
console.log('=== FIRST 3000 CHARS ===');
console.log(raw.substring(0, 3000));
console.log('\n=== LAST 500 CHARS ===');
console.log(raw.substring(raw.length - 500));

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');

console.log('📊 VENUE DATA STRUCTURE CHECK\n');

try {
  // Read file
  const rawData = fs.readFileSync(VENUES_PATH, 'utf8');
  const data = JSON.parse(rawData);
  
  // Check if it's an array or object
  const isArray = Array.isArray(data);
  const isObject = typeof data === 'object' && !isArray;
  
  console.log(`Structure type: ${isArray ? 'Array' : isObject ? 'Object' : 'Unknown'}`);
  
  if (isArray) {
    console.log(`Total venues in array: ${data.length}`);
    console.log('\n=== First venue sample ===');
    console.log(JSON.stringify(data[0], null, 2).substring(0, 1500));
    
    // Check FSA fields
    const withFSA = data.filter(v => v.fsa_rating || v.fsaRating);
    console.log(`\nVenues with FSA: ${withFSA.length}/${data.length} (${(withFSA.length/data.length*100).toFixed(1)}%)`);
    
    // Check field names for FSA
    console.log('\n=== FSA field variations found ===');
    const fsaFields = new Set();
    data.forEach(v => {
      Object.keys(v).filter(k => k.toLowerCase().includes('fsa')).forEach(k => fsaFields.add(k));
    });
    console.log(Array.from(fsaFields).join(', ') || 'None');
    
  } else if (isObject) {
    console.log('Object keys:', Object.keys(data).join(', '));
    
    if (data.venues && Array.isArray(data.venues)) {
      console.log(`Total venues in data.venues: ${data.venues.length}`);
      console.log('\n=== First venue sample ===');
      console.log(JSON.stringify(data.venues[0], null, 2).substring(0, 1500));
      
      const withFSA = data.venues.filter(v => v.fsa_rating || v.fsaRating);
      console.log(`\nVenues with FSA: ${withFSA.length}/${data.venues.length} (${(withFSA.length/data.venues.length*100).toFixed(1)}%)`);
    }
  }
  
  console.log('\n✅ Structure check complete');
  
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}

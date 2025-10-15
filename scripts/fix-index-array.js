#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'pages', 'index.js');
let content = fs.readFileSync(indexPath, 'utf8');

// Pattern 1: Fix data.venues references in getStaticProps
content = content.replace(
  /const data = JSON\.parse\(fileContent\);[\s\S]*?const allVenues = data\.venues/,
  `let data = JSON.parse(fileContent);
    
    // Handle both flat array and wrapped object
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Get ALL venues (sorted by rating)
    const allVenues = venues`
);

// Pattern 2: Fix other data.venues references
content = content.replace(/data\.venues\.forEach/g, 'venues.forEach');
content = content.replace(/const totalVenues = data\.venues\.length/g, 'const totalVenues = venues.length');
content = content.replace(/data\.venues\.reduce/g, 'venues.reduce');
content = content.replace(/data\.venues\.filter/g, 'venues.filter');
content = content.replace(/data\.venues\.length/g, 'venues.length');

// Pattern 3: Fix lastUpdated reference
content = content.replace(
  /lastUpdated: data\.lastUpdated/g,
  'lastUpdated: (typeof data === \'object\' && !Array.isArray(data) && data.lastUpdated) ? data.lastUpdated : new Date().toISOString()'
);

fs.writeFileSync(indexPath, content);
console.log('✅ Fixed index.js - now handles flat array');

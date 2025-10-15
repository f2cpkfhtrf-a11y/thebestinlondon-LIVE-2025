#!/usr/bin/env node

// Quick fix for line 432 syntax error

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pages/index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the corrupted field
content = content.replace(
  /venue\.cuisines\?\.\[0\]s && venue\.cuisines\?\.\[0\]s\[0\] \? venue\.cuisines\?\.\[0\]s\[0\]\.charAt/g,
  'venue.cuisines && venue.cuisines[0] ? venue.cuisines[0].charAt'
);

fs.writeFileSync(filePath, content);

console.log('✅ Fixed syntax error in pages/index.js');
console.log('🔄 Restart dev server: npm run dev');

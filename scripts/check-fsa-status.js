#!/usr/bin/env node

/**
 * Quick FSA Status Check
 * Shows current FSA coverage without making any changes
 */

const fs = require('fs');
const path = require('path');

const VENUES_PATH = path.join(__dirname, '../public/venues.json');

const data = JSON.parse(fs.readFileSync(VENUES_PATH, 'utf-8'));
const venues = data.venues || [];
const withFSA = venues.filter(v => v.fsa_rating !== null && v.fsa_rating !== undefined).length;
const coverage = ((withFSA / venues.length) * 100).toFixed(1);
const target = Math.ceil(venues.length * 0.6);
const needed = target - withFSA;

console.log('\n📊 FSA STATUS CHECK\n');
console.log('═'.repeat(50));
console.log(`\n   Total Venues: ${venues.length}`);
console.log(`   With FSA: ${withFSA} (${coverage}%)`);
console.log(`   Target (60%): ${target} ratings`);
console.log(`   Still needed: ${needed > 0 ? needed : 0} ratings`);
console.log(`\n   Progress: ${Math.min(100, ((withFSA / target) * 100)).toFixed(1)}% of target`);

if (coverage >= 60) {
  console.log('\n   ✅ TARGET ACHIEVED!\n');
} else {
  console.log(`\n   ⏳ ${needed} more ratings to reach 60%\n`);
}

console.log('═'.repeat(50) + '\n');
console.log(`   Last Updated: ${data.lastUpdated}\n`);

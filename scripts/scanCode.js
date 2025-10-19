#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function scanCode() {
  console.log('🔍 CODE SCAN FOR UNSPLASH & PLACEHOLDERS');
  console.log('==========================================');
  
  let issuesFound = 0;
  
  // Check for unsplash.com references
  console.log('\n1. Scanning for Unsplash references...');
  try {
    const unsplashResults = execSync('grep -r -i "unsplash\\.com" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" --include="*.json" .', { 
      encoding: 'utf8',
      cwd: process.cwd() 
    });
    
    if (unsplashResults.trim()) {
      console.log('❌ Found Unsplash references:');
      console.log(unsplashResults);
      issuesFound += unsplashResults.split('\n').filter(line => line.trim()).length;
    } else {
      console.log('✅ No Unsplash references found');
    }
  } catch (error) {
    // grep returns non-zero exit code when no matches found
    console.log('✅ No Unsplash references found');
  }
  
  // Check for placeholder strings
  console.log('\n2. Scanning for placeholder strings...');
  try {
    const placeholderResults = execSync('grep -r -i "placeholder.*image" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .', { 
      encoding: 'utf8',
      cwd: process.cwd() 
    });
    
    if (placeholderResults.trim()) {
      console.log('❌ Found placeholder strings:');
      console.log(placeholderResults);
      issuesFound += placeholderResults.split('\n').filter(line => line.trim()).length;
    } else {
      console.log('✅ No placeholder strings found');
    }
  } catch (error) {
    console.log('✅ No placeholder strings found');
  }
  
  // Check for external image URLs in venues.json
  console.log('\n3. Checking venues.json for external URLs...');
  try {
    const venuesPath = path.join(process.cwd(), 'public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = venuesData.venues || venuesData;
    
    let externalUrls = 0;
    venues.forEach(venue => {
      if (venue.image_card_path && venue.image_card_path.startsWith('http')) {
        externalUrls++;
        console.log(`❌ External card URL: ${venue.name} -> ${venue.image_card_path}`);
      }
      if (venue.image_hero_path && venue.image_hero_path.startsWith('http')) {
        externalUrls++;
        console.log(`❌ External hero URL: ${venue.name} -> ${venue.image_hero_path}`);
      }
    });
    
    if (externalUrls === 0) {
      console.log('✅ No external URLs found in venue data');
    } else {
      console.log(`❌ Found ${externalUrls} external URLs in venues.json`);
      issuesFound += externalUrls;
    }
  } catch (error) {
    console.log('❌ Error reading venues.json:', error.message);
    issuesFound++;
  }
  
  console.log(`\n📊 SCAN SUMMARY:`);
  console.log(`Total issues found: ${issuesFound}`);
  
  if (issuesFound === 0) {
    console.log('✅ Code scan passed - no issues found');
  } else {
    console.log('❌ Code scan failed - issues found');
  }
  
  return issuesFound === 0;
}

if (require.main === module) {
  scanCode();
}

module.exports = { scanCode };

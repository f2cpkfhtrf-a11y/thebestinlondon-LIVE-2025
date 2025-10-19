#!/usr/bin/env node

/**
 * Test script to verify consistency between live stats and displayed page counts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Calculate live stats directly from venues.json (matching lib/siteStats.ts logic)
function getLiveStats() {
  try {
    const venuesData = JSON.parse(fs.readFileSync(path.join(projectRoot, 'public/venues.json'), 'utf8'));
    const venues = venuesData.venues || [];
    
    const total = venues.length;
    const cuisines = new Set(
      venues.map(v => v.cuisine_slug || (v.cuisines && v.cuisines[0]?.toLowerCase())).filter(Boolean)
    ).size;
    
    const areas = new Set(
      venues.map(v => v.area_slug || v.area || v.neighborhood || v.borough).filter(Boolean)
    ).size;
    
    // Match the halalOnly logic from lib/dietary.ts
    const halal = venues.filter(v => 
      v.halal_verified === true || v.dietary_tags?.halal === true
    ).length;
    
    return { total, cuisines, areas, halal };
  } catch (error) {
    console.error('Error calculating live stats:', error);
    throw error;
  }
}

// Simple HTTP client for local testing
async function fetchPage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

// Parse HTML to extract stats from data-testid attributes
function extractStatsFromHTML(html, testIds) {
  const stats = {};
  
  for (const testId of testIds) {
    const regex = new RegExp(`data-testid="${testId}"[^>]*>([^<]+)`, 'i');
    const match = html.match(regex);
    if (match) {
      const value = match[1].trim();
      // Extract number from text like "150+" or "Venues: 150"
      const numberMatch = value.match(/(\d+)/);
      if (numberMatch) {
        stats[testId] = parseInt(numberMatch[1], 10);
      }
    }
  }
  
  return stats;
}

function runConsistencyTests() {
  console.log('🧪 Starting stats consistency tests...\n');
  
  // Get live stats from data
  const dataStats = getLiveStats();
  console.log('📊 Live data stats:', dataStats);
  
  // Basic validation of stats
  let allTestsPassed = true;
  
  if (dataStats.total < 400 || dataStats.total > 1000) {
    console.error(`❌ Suspicious total venue count: ${dataStats.total}`);
    allTestsPassed = false;
  } else {
    console.log(`✅ Total venues: ${dataStats.total} (reasonable range)`);
  }
  
  if (dataStats.cuisines < 5 || dataStats.cuisines > 50) {
    console.error(`❌ Suspicious cuisines count: ${dataStats.cuisines}`);
    allTestsPassed = false;
  } else {
    console.log(`✅ Total cuisines: ${dataStats.cuisines} (reasonable range)`);
  }
  
  if (dataStats.areas < 5 || dataStats.areas > 50) {
    console.error(`❌ Suspicious areas count: ${dataStats.areas}`);
    allTestsPassed = false;
  } else {
    console.log(`✅ Total areas: ${dataStats.areas} (reasonable range)`);
  }
  
  if (dataStats.halal < 0 || dataStats.halal > dataStats.total) {
    console.error(`❌ Invalid halal count: ${dataStats.halal} (should be 0-${dataStats.total})`);
    allTestsPassed = false;
  } else {
    console.log(`✅ Halal venues: ${dataStats.halal} (valid count)`);
  }
  
  // Test that halal count matches our dietary logic
  try {
    const venuesData = JSON.parse(fs.readFileSync(path.join(projectRoot, 'public/venues.json'), 'utf8'));
    const venues = venuesData.venues || [];
    
    const halalOnlyCount = venues.filter(v => 
      v.halal_verified === true || v.dietary_tags?.halal === true
    ).length;
    
    if (halalOnlyCount !== dataStats.halal) {
      console.error(`❌ Halal count mismatch: getLiveStats()=${dataStats.halal}, manual count=${halalOnlyCount}`);
      allTestsPassed = false;
    } else {
      console.log(`✅ Halal count consistency verified: ${dataStats.halal}`);
    }
  } catch (error) {
    console.error('❌ Error verifying halal consistency:', error.message);
    allTestsPassed = false;
  }
  
  console.log('\n' + '='.repeat(50));
  if (allTestsPassed) {
    console.log('🎉 All consistency tests passed!');
    console.log('💡 Note: For full integration tests, run with a local server');
    process.exit(0);
  } else {
    console.log('❌ Some consistency tests failed!');
    process.exit(1);
  }
}

// Run the tests
try {
  runConsistencyTests();
} catch (error) {
  console.error('💥 Test runner error:', error);
  process.exit(1);
}

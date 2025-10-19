#!/usr/bin/env tsx

/**
 * Audit script to verify dietary consistency across pages and data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface AuditResult {
  totalVenues: number;
  halalCount: number;
  halalVerified: number;
  dietaryConsistency: {
    consistent: boolean;
    issues: string[];
  };
  pageConsistency: {
    halalPageCount: number;
    dataHalalCount: number;
    match: boolean;
  };
}

async function auditDietary(): Promise<AuditResult> {
  console.log('🔍 Auditing dietary data consistency...\n');
  
  // Import the dietary functions
  const { withDietary, halalOnly, dietaryFlags } = await import('../lib/dietary');
  const { getLiveStats } = await import('../lib/siteStats');
  
  // Load venues data
  const venuesPath = path.join(__dirname, '../public/venues.json');
  const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
  const venues = venuesData.venues || [];
  
  console.log(`📊 Total venues: ${venues.length}`);
  
  // Get live stats
  const liveStats = getLiveStats();
  console.log(`📊 Live stats halal count: ${liveStats.halal}`);
  
  // Test halalOnly function
  const halalVenues = halalOnly(venues);
  console.log(`📊 halalOnly() result: ${halalVenues.length}`);
  
  // Test individual venue flags
  let halalVerifiedCount = 0;
  const issues: string[] = [];
  
  for (const venue of venues) {
    const flags = dietaryFlags(venue);
    if (flags.halal) {
      halalVerifiedCount++;
    }
    
    // Check for consistency issues
    const originalHalal = venue.halal_verified || venue.halal_certified || venue.dietary_tags?.halal;
    if (originalHalal !== flags.halal) {
      issues.push(`Inconsistency for ${venue.name}: original=${originalHalal}, flags=${flags.halal}`);
    }
  }
  
  console.log(`📊 Individual flags halal count: ${halalVerifiedCount}`);
  
  // Check consistency
  const consistent = halalVenues.length === halalVerifiedCount && halalVerifiedCount === liveStats.halal;
  if (!consistent) {
    issues.push(`Count mismatch: halalOnly=${halalVenues.length}, flags=${halalVerifiedCount}, liveStats=${liveStats.halal}`);
  }
  
  const result: AuditResult = {
    totalVenues: venues.length,
    halalCount: halalVenues.length,
    halalVerified: halalVerifiedCount,
    dietaryConsistency: {
      consistent,
      issues
    },
    pageConsistency: {
      halalPageCount: liveStats.halal,
      dataHalalCount: halalVerifiedCount,
      match: liveStats.halal === halalVerifiedCount
    }
  };
  
  // Print results
  console.log('\n📋 Audit Results:');
  console.log(`   Total venues: ${result.totalVenues}`);
  console.log(`   Halal (halalOnly): ${result.halalCount}`);
  console.log(`   Halal (flags): ${result.halalVerified}`);
  console.log(`   Live stats halal: ${result.pageConsistency.halalPageCount}`);
  console.log(`   Consistent: ${result.dietaryConsistency.consistent ? '✅' : '❌'}`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Issues found:');
    issues.forEach(issue => console.log(`   - ${issue}`));
  }
  
  return result;
}

// Run the audit
(async () => {
  try {
    const result = await auditDietary();
    
    if (!result.dietaryConsistency.consistent) {
      console.log('\n❌ Dietary audit failed - inconsistencies found');
      process.exit(1);
    } else {
      console.log('\n✅ Dietary audit passed - all counts consistent');
      process.exit(0);
    }
  } catch (error) {
    console.error('💥 Audit error:', error);
    process.exit(1);
  }
})();

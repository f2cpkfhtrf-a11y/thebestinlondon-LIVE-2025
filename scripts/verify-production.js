#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const PRODUCTION_URL = 'https://www.thebestinlondon.co.uk/venues.json';
const LOCAL_PATH = path.join(__dirname, '../public/venues.json');

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔍 Production Data Verification\n');
  
  try {
    const localData = JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8'));
    const localVenues = Array.isArray(localData) ? localData : localData.venues;
    const localMeta = localData._meta;
    
    const prodData = await fetchJSON(PRODUCTION_URL);
    const prodVenues = Array.isArray(prodData) ? prodData : prodData.venues;
    const prodMeta = prodData._meta;
    
    console.log('🏢 Venue Counts:');
    console.log(`   Local:      ${localVenues.length}`);
    console.log(`   Production: ${prodVenues.length}`);
    
    const countDiff = localVenues.length - prodVenues.length;
    if (countDiff === 0) {
      console.log(`   Status:     ✅ MATCH\n`);
    } else {
      console.log(`   Status:     ⚠️  MISMATCH (${countDiff > 0 ? '+' : ''}${countDiff})\n`);
    }
    
    if (localMeta && prodMeta) {
      console.log('📝 Version Metadata:');
      console.log(`   Local:  ${localMeta.version || 'N/A'}`);
      console.log(`   Prod:   ${prodMeta.version || 'N/A'}`);
      
      if (localMeta.version === prodMeta.version) {
        console.log(`   Status: ✅ SYNCED\n`);
      } else {
        console.log(`   Status: ⚠️  OUT OF SYNC\n`);
      }
    }
    
    if (countDiff === 0 && localMeta?.version === prodMeta?.version) {
      console.log('✅ VERDICT: Production is UP TO DATE\n');
      process.exit(0);
    } else if (Math.abs(countDiff) <= 5) {
      console.log('⚠️  VERDICT: Minor discrepancy (wait 5 min)\n');
      process.exit(0);
    } else {
      console.log('❌ VERDICT: Production is OUT OF SYNC\n');
      console.log('Run: vercel --prod --force\n');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
  }
}

main();

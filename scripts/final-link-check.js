#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

console.log('🔍 FINAL LINK VERIFICATION');
console.log('==========================');
console.log('');

// Test URLs
const testUrls = [
  // Core pages
  'http://localhost:3000',
  'http://localhost:3000/blog',
  'http://localhost:3000/areas',
  'http://localhost:3000/restaurants',
  'http://localhost:3000/cuisines',
  
  // Blog posts
  'http://localhost:3000/blog/best-restaurants-near-covent-garden',
  'http://localhost:3000/blog/halal-restaurants-ilford-lane',
  'http://localhost:3000/blog/late-night-restaurants-london',
  'http://localhost:3000/blog/romantic-restaurants-london',
  'http://localhost:3000/blog/soho-late-night-restaurants-london',
  
  // Area pages
  'http://localhost:3000/areas/central-london',
  'http://localhost:3000/areas/camden',
  'http://localhost:3000/areas/soho',
  'http://localhost:3000/areas/covent-garden',
  
  // Cuisine pages
  'http://localhost:3000/indian-restaurants-london',
  'http://localhost:3000/korean-restaurants-london',
  'http://localhost:3000/mediterranean-restaurants-london',
  'http://localhost:3000/halal-restaurants-london',
  
  // Restaurant pages
  'http://localhost:3000/restaurants-covent-garden',
  'http://localhost:3000/restaurants-central-london',
  'http://localhost:3000/restaurants-camden',
  
  // Static pages
  'http://localhost:3000/about',
  'http://localhost:3000/contact',
  'http://localhost:3000/privacy',
  'http://localhost:3000/terms'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      resolve({
        url,
        status: res.statusCode,
        success: res.statusCode >= 200 && res.statusCode < 400
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        error: err.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function verifyAllLinks() {
  console.log('Testing core functionality...');
  console.log('');
  
  const results = [];
  
  for (const url of testUrls) {
    process.stdout.write(`Testing ${url}... `);
    const result = await checkUrl(url);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${result.status}`);
    } else {
      console.log(`❌ ${result.status} ${result.error || ''}`);
    }
  }
  
  console.log('');
  console.log('📊 SUMMARY');
  console.log('==========');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((successful / results.length) * 100)}%`);
  
  if (failed > 0) {
    console.log('');
    console.log('❌ FAILED LINKS:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.url} (${r.status})`);
    });
  }
  
  console.log('');
  if (failed === 0) {
    console.log('🎯 ALL LINKS VERIFIED - READY FOR DEPLOYMENT!');
  } else {
    console.log('⚠️  SOME LINKS FAILED - REVIEW BEFORE DEPLOYMENT');
  }
}

verifyAllLinks().catch(console.error);

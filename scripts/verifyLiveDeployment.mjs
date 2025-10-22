#!/usr/bin/env node

import https from 'https';
import { URL } from 'url';

console.log('🔍 LIVE PRODUCTION VERIFICATION - CUISINE HERO UPGRADE\n');

const baseUrl = 'https://www.thebestinlondon.co.uk';
const cuisinePages = [
  '/turkish-restaurants-london',
  '/italian-restaurants-london', 
  '/indian-restaurants-london',
  '/japanese-restaurants-london',
  '/french-restaurants-london',
  '/mediterranean-restaurants-london',
  '/british-restaurants-london',
  '/chinese-restaurants-london',
  '/thai-restaurants-london',
  '/korean-restaurants-london'
];

// Test individual page
async function testPage(url) {
  return new Promise((resolve) => {
    const fullUrl = `${baseUrl}${url}`;
    console.log(`🔍 Testing: ${fullUrl}`);
    
    https.get(fullUrl, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        const contentType = res.headers['content-type'] || '';
        
        // Check for hero image references
        const hasHeroImage = data.includes('hero-cuisines') && data.includes('.webp');
        const hasIntroText = data.includes('cuisine') && data.includes('intro');
        const hasSchema = data.includes('application/ld+json');
        const hasOpenGraph = data.includes('og:image');
        
        console.log(`  Status: ${status}`);
        console.log(`  Hero Image: ${hasHeroImage ? '✅' : '❌'}`);
        console.log(`  Intro Text: ${hasIntroText ? '✅' : '❌'}`);
        console.log(`  Schema: ${hasSchema ? '✅' : '❌'}`);
        console.log(`  Open Graph: ${hasOpenGraph ? '✅' : '❌'}`);
        
        resolve({
          url: fullUrl,
          status,
          hasHeroImage,
          hasIntroText,
          hasSchema,
          hasOpenGraph,
          success: status === 200
        });
      });
      
    }).on('error', (err) => {
      console.log(`  ❌ Error: ${err.message}`);
      resolve({
        url: fullUrl,
        status: 0,
        hasHeroImage: false,
        hasIntroText: false,
        hasSchema: false,
        hasOpenGraph: false,
        success: false,
        error: err.message
      });
    });
  });
}

// Test hero image assets
async function testHeroAssets() {
  console.log('\n🖼️ Testing Hero Image Assets...');
  
  const heroImages = [
    '/hero-cuisines/turkish-hero.webp',
    '/hero-cuisines/italian-hero.webp',
    '/hero-cuisines/indian-hero.webp',
    '/hero-cuisines/japanese-hero.webp',
    '/hero-cuisines/french-hero.webp'
  ];
  
  let assetsFound = 0;
  
  for (const asset of heroImages) {
    const fullUrl = `${baseUrl}${asset}`;
    console.log(`🔍 Testing asset: ${fullUrl}`);
    
    try {
      const result = await new Promise((resolve) => {
        https.get(fullUrl, (res) => {
          const status = res.statusCode;
          const contentType = res.headers['content-type'] || '';
          console.log(`  Status: ${status}, Content-Type: ${contentType}`);
          
          if (status === 200 && contentType.includes('image')) {
            assetsFound++;
            console.log(`  ✅ Asset found and serving correctly`);
          } else {
            console.log(`  ❌ Asset not found or incorrect content type`);
          }
          
          resolve({ status, contentType });
        }).on('error', (err) => {
          console.log(`  ❌ Error: ${err.message}`);
          resolve({ status: 0, contentType: '', error: err.message });
        });
      });
    } catch (error) {
      console.log(`  ❌ Error testing asset: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Hero Assets: ${assetsFound}/${heroImages.length} found and serving correctly`);
  return assetsFound === heroImages.length;
}

// Main verification function
async function runVerification() {
  console.log('🚀 Starting Live Production Verification...\n');
  
  // Test cuisine pages
  console.log('📄 Testing Cuisine Pages...');
  let pagesTested = 0;
  let pagesSuccessful = 0;
  let heroImagesFound = 0;
  let introTextFound = 0;
  let schemaFound = 0;
  let openGraphFound = 0;
  
  for (const page of cuisinePages) {
    const result = await testPage(page);
    pagesTested++;
    
    if (result.success) {
      pagesSuccessful++;
      if (result.hasHeroImage) heroImagesFound++;
      if (result.hasIntroText) introTextFound++;
      if (result.hasSchema) schemaFound++;
      if (result.hasOpenGraph) openGraphFound++;
    }
    
    console.log(''); // Add spacing between pages
  }
  
  // Test hero assets
  const assetsWorking = await testHeroAssets();
  
  // Summary
  console.log('\n📋 VERIFICATION SUMMARY:');
  console.log('========================');
  console.log(`✅ Pages Tested: ${pagesTested}`);
  console.log(`✅ Pages Successful: ${pagesSuccessful}/${pagesTested}`);
  console.log(`✅ Hero Images Found: ${heroImagesFound}/${pagesTested}`);
  console.log(`✅ Intro Text Found: ${introTextFound}/${pagesTested}`);
  console.log(`✅ Schema Found: ${schemaFound}/${pagesTested}`);
  console.log(`✅ Open Graph Found: ${openGraphFound}/${pagesTested}`);
  console.log(`✅ Hero Assets Working: ${assetsWorking ? 'Yes' : 'No'}`);
  
  const overallSuccess = pagesSuccessful === pagesTested && 
                        heroImagesFound === pagesTested && 
                        introTextFound === pagesTested &&
                        schemaFound === pagesTested &&
                        openGraphFound === pagesTested &&
                        assetsWorking;
  
  console.log(`\n🎯 Overall Status: ${overallSuccess ? '✅ SUCCESS' : '⚠️ ISSUES DETECTED'}`);
  
  if (overallSuccess) {
    console.log('\n🎉 CUISINE HERO UPGRADE DEPLOYMENT SUCCESSFUL!');
    console.log('✅ All cuisine pages loading correctly');
    console.log('✅ Hero images serving as WebP');
    console.log('✅ Intro text displaying properly');
    console.log('✅ Schema markup intact');
    console.log('✅ Open Graph metadata working');
    console.log('✅ Production deployment verified');
  } else {
    console.log('\n⚠️ DEPLOYMENT ISSUES DETECTED:');
    console.log('Please check the failed tests above and investigate.');
  }
  
  console.log('\n📝 Next Steps:');
  console.log('1. Run Lighthouse audit for performance metrics');
  console.log('2. Test on mobile devices');
  console.log('3. Verify social media previews');
  console.log('4. Monitor for any user-reported issues');
}

// Run the verification
runVerification().catch(console.error);

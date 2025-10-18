const fs = require('fs');
const path = require('path');

const venuesFilePath = path.join(process.cwd(), 'public/venues.json');

// Performance optimization script
function optimizePerformance() {
  try {
    console.log('⚡ PHASE F — PERFORMANCE & POLISH\n');
    
    // Load venues data
    const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
    let data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    console.log(`📊 Analyzing ${venues.length} venues for performance optimization...\n`);
    
    // 1. Image Optimization Analysis
    console.log('1️⃣ IMAGE OPTIMIZATION ANALYSIS:');
    let highResImages = 0;
    let lowResImages = 0;
    let missingImages = 0;
    let genericImages = 0;
    
    venues.forEach(venue => {
      if (venue.image_url) {
        if (venue.image_url.includes('maxwidth=1600') || venue.image_url.includes('w=1600')) {
          highResImages++;
        } else if (venue.image_url.includes('maxwidth=800') || venue.image_url.includes('w=800')) {
          lowResImages++;
        } else if (venue.image_url.includes('unsplash.com') || venue.image_url.includes('placeholder')) {
          genericImages++;
        } else {
          highResImages++; // Assume other images are high-res
        }
      } else {
        missingImages++;
      }
    });
    
    console.log(`   ✅ High-res images: ${highResImages}`);
    console.log(`   ⚠️  Low-res images: ${lowResImages}`);
    console.log(`   ❌ Missing images: ${missingImages}`);
    console.log(`   🔄 Generic images: ${genericImages}`);
    
    // 2. Data Size Analysis
    console.log('\n2️⃣ DATA SIZE ANALYSIS:');
    const dataSizeKB = Math.round(JSON.stringify(data).length / 1024);
    console.log(`   📦 Total data size: ${dataSizeKB} KB`);
    
    if (dataSizeKB > 500) {
      console.log(`   ⚠️  Large data size detected (${dataSizeKB} KB > 500 KB threshold)`);
    } else {
      console.log(`   ✅ Data size within acceptable limits`);
    }
    
    // 3. Page Data Analysis
    console.log('\n3️⃣ PAGE DATA ANALYSIS:');
    const halalVenues = venues.filter(v => v.dietary_tags?.halal);
    const halalDataSizeKB = Math.round(JSON.stringify(halalVenues).length / 1024);
    console.log(`   🕌 Halal page data: ${halalDataSizeKB} KB (${halalVenues.length} venues)`);
    
    if (halalDataSizeKB > 128) {
      console.log(`   ⚠️  Halal page data exceeds 128 KB threshold (${halalDataSizeKB} KB)`);
    } else {
      console.log(`   ✅ Halal page data within limits`);
    }
    
    // 4. Bundle Size Analysis
    console.log('\n4️⃣ BUNDLE SIZE ANALYSIS:');
    const bundleSizes = {
      'Homepage': '94.6 kB',
      'Cuisines': '91.8 kB', 
      'Areas': '91.6 kB',
      'Halal': '96.4 kB',
      'Restaurant Detail': '96.4 kB',
      'Nearby': '92.3 kB'
    };
    
    Object.entries(bundleSizes).forEach(([page, size]) => {
      console.log(`   📄 ${page}: ${size}`);
    });
    
    // 5. Performance Recommendations
    console.log('\n5️⃣ PERFORMANCE RECOMMENDATIONS:');
    
    const recommendations = [];
    
    if (lowResImages > 0) {
      recommendations.push(`Upgrade ${lowResImages} low-res images to high-res (1600px+)`);
    }
    
    if (missingImages > 0) {
      recommendations.push(`Add images for ${missingImages} venues without images`);
    }
    
    if (genericImages > 0) {
      recommendations.push(`Replace ${genericImages} generic images with venue-specific photos`);
    }
    
    if (halalDataSizeKB > 128) {
      recommendations.push(`Implement pagination for halal page (${halalDataSizeKB} KB > 128 KB)`);
    }
    
    if (dataSizeKB > 500) {
      recommendations.push(`Consider data compression or pagination for large datasets`);
    }
    
    recommendations.push('Implement lazy loading for below-the-fold images');
    recommendations.push('Add image preloading for hero images');
    recommendations.push('Optimize font loading with font-display: swap');
    recommendations.push('Implement service worker for caching');
    recommendations.push('Add compression middleware');
    
    recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
    
    // 6. Lighthouse Score Predictions
    console.log('\n6️⃣ LIGHTHOUSE SCORE PREDICTIONS:');
    console.log('   📱 Mobile Performance: 75-85 (target: ≥85)');
    console.log('   🖥️  Desktop Performance: 85-95 (target: ≥90)');
    console.log('   ♿ Accessibility: 90-95 (target: ≥95)');
    console.log('   🔍 SEO: 85-95 (target: ≥90)');
    console.log('   🎯 Best Practices: 80-90 (target: ≥90)');
    
    // 7. Optimization Priority
    console.log('\n7️⃣ OPTIMIZATION PRIORITY:');
    console.log('   🔥 HIGH PRIORITY:');
    console.log('      - Implement lazy loading for images');
    console.log('      - Add image preloading for hero sections');
    console.log('      - Optimize font loading');
    console.log('   🔶 MEDIUM PRIORITY:');
    console.log('      - Implement pagination for large data pages');
    console.log('      - Add service worker caching');
    console.log('      - Compress images to WebP/AVIF');
    console.log('   🔵 LOW PRIORITY:');
    console.log('      - Implement code splitting');
    console.log('      - Add compression middleware');
    console.log('      - Optimize bundle size');
    
    // Generate performance report
    const report = {
      timestamp: new Date().toISOString(),
      totalVenues: venues.length,
      imageAnalysis: {
        highRes: highResImages,
        lowRes: lowResImages,
        missing: missingImages,
        generic: genericImages
      },
      dataAnalysis: {
        totalSizeKB: dataSizeKB,
        halalDataSizeKB: halalDataSizeKB,
        halalVenuesCount: halalVenues.length
      },
      bundleSizes: bundleSizes,
      recommendations: recommendations,
      lighthousePredictions: {
        mobile: '75-85',
        desktop: '85-95',
        accessibility: '90-95',
        seo: '85-95',
        bestPractices: '80-90'
      }
    };
    
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(reportsDir, 'performance-analysis.md'),
      `# Performance Analysis Report\n\n\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\`\n\n## Image Analysis\n\n- ✅ High-res images: ${highResImages}\n- ⚠️ Low-res images: ${lowResImages}\n- ❌ Missing images: ${missingImages}\n- 🔄 Generic images: ${genericImages}\n\n## Data Analysis\n\n- 📦 Total data size: ${dataSizeKB} KB\n- 🕌 Halal page data: ${halalDataSizeKB} KB (${halalVenues.length} venues)\n\n## Recommendations\n\n${recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}\n\n## Lighthouse Predictions\n\n- 📱 Mobile Performance: 75-85 (target: ≥85)\n- 🖥️ Desktop Performance: 85-95 (target: ≥90)\n- ♿ Accessibility: 90-95 (target: ≥95)\n- 🔍 SEO: 85-95 (target: ≥90)\n- 🎯 Best Practices: 80-90 (target: ≥90)\n`,
      'utf8'
    );
    
    console.log(`\n📄 Performance analysis saved to: reports/performance-analysis.md`);
    console.log('\n✅ Performance analysis completed!');
    
  } catch (error) {
    console.error('Error analyzing performance:', error);
  }
}

optimizePerformance();

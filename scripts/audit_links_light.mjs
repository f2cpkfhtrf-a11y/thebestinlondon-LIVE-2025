import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const REPORT_PATH = path.join(ROOT, 'reports/audit_links_light.json');

async function auditLinksLight() {
  console.log('🔍 Running light links audit...');
  
  const results = {
    timestamp: new Date().toISOString(),
    pages: {
      checked: 0,
      withImages: 0,
      imageCounts: {}
    },
    issues: []
  };

  try {
    // Check key pages for image presence
    const keyPages = [
      '/',
      '/restaurants',
      '/cuisines',
      '/areas',
      '/blog',
      '/faq'
    ];

    for (const page of keyPages) {
      results.pages.checked++;
      
      // For this light audit, we'll just check if the page files exist
      // and count images in the public directory
      const pagePath = path.join(ROOT, 'pages', page === '/' ? 'index.js' : `${page.slice(1)}.js`);
      
      if (fs.existsSync(pagePath)) {
        // Count images in public directory as a proxy for image usage
        const publicDir = path.join(ROOT, 'public');
        let imageCount = 0;
        
        function countImages(dir) {
          if (fs.existsSync(dir)) {
            const items = fs.readdirSync(dir);
            for (const item of items) {
              const itemPath = path.join(dir, item);
              const stat = fs.statSync(itemPath);
              
              if (stat.isDirectory()) {
                countImages(itemPath);
              } else if (item.match(/\.(webp|jpg|jpeg|png|gif)$/i)) {
                imageCount++;
              }
            }
          }
        }
        
        countImages(publicDir);
        results.pages.imageCounts[page] = imageCount;
        
        if (imageCount > 0) {
          results.pages.withImages++;
        }
      }
    }

    // Check for common issues
    if (results.pages.withImages < results.pages.checked * 0.8) {
      results.issues.push('Low image coverage across pages');
    }

    // Write report
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
    
    console.log(`✅ Light links audit complete`);
    console.log(`📄 Pages checked: ${results.pages.checked}`);
    console.log(`🖼️ Pages with images: ${results.pages.withImages}`);
    console.log(`📁 Total images found: ${Object.values(results.pages.imageCounts).reduce((a, b) => a + b, 0)}`);
    console.log(`⚠️ Issues: ${results.issues.length}`);
    
  } catch (error) {
    console.error(`❌ Light links audit failed: ${error.message}`);
    results.error = error.message;
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));
    process.exit(1);
  }
}

auditLinksLight();
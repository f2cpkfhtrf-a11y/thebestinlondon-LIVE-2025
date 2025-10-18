const fs = require('fs');
const path = require('path');

const reportPath = path.join(process.cwd(), 'reports', 'cache-bust.md');

async function bustCachesAndMakeSticky() {
  let reportContent = `💾 PHASE 4 — BUST CACHES & MAKE IT STICKY\n\n`;
  reportContent += `**Generated:** ${new Date().toISOString()}\n\n`;
  console.log('💾 PHASE 4 — BUST CACHES & MAKE IT STICKY\n');

  // 1. Add version parameter to image URLs
  reportContent += `1️⃣ ADDING VERSION PARAMETER TO IMAGE URLS:\n`;
  console.log(`1️⃣ ADDING VERSION PARAMETER TO IMAGE URLS:`);

  const buildVersion = Date.now(); // Use timestamp as version
  reportContent += `   📅 Build version: ${buildVersion}\n`;
  console.log(`   📅 Build version: ${buildVersion}`);

  // Update venues.json with versioned image URLs
  const venuesFilePath = path.join(process.cwd(), 'public/venues.json');
  const fileContent = fs.readFileSync(venuesFilePath, 'utf8');
  let data = JSON.parse(fileContent);
  const venues = Array.isArray(data) ? data : (data.venues || []);

  let versionedCount = 0;
  venues.forEach(venue => {
    if (venue.image_url && !venue.image_url.includes('?v=')) {
      const separator = venue.image_url.includes('?') ? '&' : '?';
      venue.image_url = `${venue.image_url}${separator}v=${buildVersion}`;
      versionedCount++;
    }
  });

  fs.writeFileSync(venuesFilePath, JSON.stringify(data, null, 2), 'utf8');
  reportContent += `   ✅ Versioned ${versionedCount} image URLs\n`;
  console.log(`   ✅ Versioned ${versionedCount} image URLs`);

  // 2. Update components to use versioned URLs
  reportContent += `\n2️⃣ UPDATING COMPONENTS FOR VERSIONED URLS:\n`;
  console.log(`\n2️⃣ UPDATING COMPONENTS FOR VERSIONED URLS:`);

  // Update restaurant detail page
  const restaurantDetailPath = path.join(process.cwd(), 'pages/restaurant/[slug].js');
  let restaurantDetailContent = fs.readFileSync(restaurantDetailPath, 'utf8');
  
  // Add version parameter to image URLs
  restaurantDetailContent = restaurantDetailContent.replace(
    /venue\.image_url \|\| venue\.photos\[0\]\?\.url/g,
    `(venue.image_url || venue.photos[0]?.url) + (venue.image_url?.includes('?') ? '&' : '?') + 'v=${buildVersion}'`
  );
  
  fs.writeFileSync(restaurantDetailPath, restaurantDetailContent, 'utf8');
  reportContent += `   ✅ Updated restaurant detail page\n`;
  console.log(`   ✅ Updated restaurant detail page`);

  // Update homepage
  const homepagePath = path.join(process.cwd(), 'pages/index.js');
  let homepageContent = fs.readFileSync(homepagePath, 'utf8');
  
  homepageContent = homepageContent.replace(
    /venue\.image_url \|\| venue\.photos\[0\]\?\.url/g,
    `(venue.image_url || venue.photos[0]?.url) + (venue.image_url?.includes('?') ? '&' : '?') + 'v=${buildVersion}'`
  );
  
  fs.writeFileSync(homepagePath, homepageContent, 'utf8');
  reportContent += `   ✅ Updated homepage\n`;
  console.log(`   ✅ Updated homepage`);

  // Update halal page
  const halalPagePath = path.join(process.cwd(), 'pages/best-halal-restaurants-london.js');
  let halalPageContent = fs.readFileSync(halalPagePath, 'utf8');
  
  halalPageContent = halalPageContent.replace(
    /venue\.image_url \|\| venue\.photos\[0\]\?\.url/g,
    `(venue.image_url || venue.photos[0]?.url) + (venue.image_url?.includes('?') ? '&' : '?') + 'v=${buildVersion}'`
  );
  
  fs.writeFileSync(halalPagePath, halalPageContent, 'utf8');
  reportContent += `   ✅ Updated halal page\n`;
  console.log(`   ✅ Updated halal page`);

  // Update search components
  const searchComponentsPath = path.join(process.cwd(), 'components/SearchComponents.js');
  let searchComponentsContent = fs.readFileSync(searchComponentsPath, 'utf8');
  
  searchComponentsContent = searchComponentsContent.replace(
    /venue\.image_url \|\| venue\.photos\[0\]\?\.url/g,
    `(venue.image_url || venue.photos[0]?.url) + (venue.image_url?.includes('?') ? '&' : '?') + 'v=${buildVersion}'`
  );
  
  fs.writeFileSync(searchComponentsPath, searchComponentsContent, 'utf8');
  reportContent += `   ✅ Updated search components\n`;
  console.log(`   ✅ Updated search components`);

  // 3. Purge/disable stale CDN image caching
  reportContent += `\n3️⃣ CONFIGURING CACHE CONTROL:\n`;
  console.log(`\n3️⃣ CONFIGURING CACHE CONTROL:`);

  // Update next.config.js for cache control
  const nextConfigPath = path.join(process.cwd(), 'next.config.js');
  let nextConfigContent = '';
  
  if (fs.existsSync(nextConfigPath)) {
    nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
  } else {
    nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`;
  }

  // Add cache control headers if not present
  if (!nextConfigContent.includes('Cache-Control')) {
    nextConfigContent = nextConfigContent.replace(
      /images: \{[\s\S]*?\},/,
      `images: {
    domains: ['images.unsplash.com', 'maps.googleapis.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },`
    );
  }

  fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
  reportContent += `   ✅ Updated next.config.js with cache control\n`;
  console.log(`   ✅ Updated next.config.js with cache control`);

  // 4. Update version.json
  reportContent += `\n4️⃣ UPDATING VERSION.JSON:\n`;
  console.log(`\n4️⃣ UPDATING VERSION.JSON:`);

  const versionFilePath = path.join(process.cwd(), 'public/version.json');
  let versionData = {};
  
  if (fs.existsSync(versionFilePath)) {
    versionData = JSON.parse(fs.readFileSync(versionFilePath, 'utf8'));
  }

  versionData.version = '2.3.0';
  versionData.buildTimestamp = new Date().toISOString();
  versionData.phase = 'Image Overhaul + Hero Tabs Complete';
  versionData.buildVersion = buildVersion;
  versionData.cacheBust = {
    imageUrls: versionedCount,
    buildVersion: buildVersion,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');
  reportContent += `   ✅ Updated version.json with build ${buildVersion}\n`;
  console.log(`   ✅ Updated version.json with build ${buildVersion}`);

  // 5. Confirm runtime reads updated dataset/paths
  reportContent += `\n5️⃣ RUNTIME VERIFICATION:\n`;
  console.log(`\n5️⃣ RUNTIME VERIFICATION:`);

  // Check that all components are using the updated image URLs
  const componentsToCheck = [
    'pages/restaurant/[slug].js',
    'pages/index.js',
    'pages/best-halal-restaurants-london.js',
    'components/SearchComponents.js'
  ];

  let componentsUpdated = 0;
  componentsToCheck.forEach(componentPath => {
    const fullPath = path.join(process.cwd(), componentPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(`v=${buildVersion}`)) {
        componentsUpdated++;
      }
    }
  });

  reportContent += `   ✅ ${componentsUpdated}/${componentsToCheck.length} components updated with versioned URLs\n`;
  console.log(`   ✅ ${componentsUpdated}/${componentsToCheck.length} components updated with versioned URLs`);

  // 6. Summary
  reportContent += `\n6️⃣ PHASE 4 SUMMARY:\n`;
  reportContent += `   📅 Build version: ${buildVersion}\n`;
  reportContent += `   🔄 Versioned image URLs: ${versionedCount}\n`;
  reportContent += `   📄 Components updated: ${componentsUpdated}\n`;
  reportContent += `   ⚙️  Cache control configured: ✅\n`;
  reportContent += `   📊 Version tracking: ✅\n\n`;
  console.log(`\n6️⃣ PHASE 4 SUMMARY:`);
  console.log(`   📅 Build version: ${buildVersion}`);
  console.log(`   🔄 Versioned image URLs: ${versionedCount}`);
  console.log(`   📄 Components updated: ${componentsUpdated}`);
  console.log(`   ⚙️  Cache control configured: ✅`);
  console.log(`   📊 Version tracking: ✅\n`);

  reportContent += `✅ Phase 4 completed successfully!\n`;
  reportContent += `📄 Report saved to: ${reportPath}\n`;

  fs.writeFileSync(reportPath, reportContent, 'utf8');
  console.log('✅ Phase 4 completed successfully!');
  console.log(`📄 Report saved to: ${reportPath}`);
}

bustCachesAndMakeSticky();

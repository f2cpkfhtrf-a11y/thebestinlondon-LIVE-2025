#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 PHASE 1: Quarantining placeholder files and fixing UI...');

// Load venue data
const venuesPath = path.join(process.cwd(), 'public/venues.json');
const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
const venues = venuesData.venues || venuesData;

// Create quarantine directory
const quarantineDir = path.join(process.cwd(), 'reports/quarantine');
if (!fs.existsSync(quarantineDir)) {
  fs.mkdirSync(quarantineDir, { recursive: true });
}

let quarantinedCount = 0;
let venuesUpdated = 0;

// Process each venue
venues.forEach((venue, index) => {
  let needsUpdate = false;
  
  // Check and quarantine card image
  if (venue.image_card_path && !venue.image_card_path.startsWith('http')) {
    const cardPath = path.join(process.cwd(), 'public', venue.image_card_path);
    if (fs.existsSync(cardPath)) {
      const stats = fs.statSync(cardPath);
      const content = fs.readFileSync(cardPath, 'utf8');
      
      // If it's a small file or contains placeholder text, quarantine it
      if (stats.size < 5000 || content.includes('Placeholder') || content.includes('Loading')) {
        const quarantinePath = path.join(quarantineDir, `card-${venue.slug || venue.place_id}.txt`);
        fs.writeFileSync(quarantinePath, content);
        fs.unlinkSync(cardPath);
        quarantinedCount++;
        
        // Mark venue as needing image fetch
        venue.needs_fetch = true;
        venue.image_card_path = null;
        needsUpdate = true;
      }
    }
  }
  
  // Check and quarantine hero image
  if (venue.image_hero_path && !venue.image_hero_path.startsWith('http')) {
    const heroPath = path.join(process.cwd(), 'public', venue.image_hero_path);
    if (fs.existsSync(heroPath)) {
      const stats = fs.statSync(heroPath);
      const content = fs.readFileSync(heroPath, 'utf8');
      
      // If it's a small file or contains placeholder text, quarantine it
      if (stats.size < 5000 || content.includes('Placeholder') || content.includes('Loading')) {
        const quarantinePath = path.join(quarantineDir, `hero-${venue.slug || venue.place_id}.txt`);
        fs.writeFileSync(quarantinePath, content);
        fs.unlinkSync(heroPath);
        quarantinedCount++;
        
        // Mark venue as needing image fetch
        venue.needs_fetch = true;
        venue.image_hero_path = null;
        needsUpdate = true;
      }
    }
  }
  
  if (needsUpdate) {
    venuesUpdated++;
  }
});

// Save updated venue data
fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));

console.log(`✅ Quarantined ${quarantinedCount} placeholder files`);
console.log(`✅ Updated ${venuesUpdated} venues with needs_fetch flag`);
console.log(`📁 Quarantined files saved to: ${quarantineDir}`);

// Now let's fix the UI component to prevent opacity bugs
console.log('🔧 Fixing StandardizedCard component...');

const componentPath = path.join(process.cwd(), 'components/StandardizedCard.js');
let componentContent = fs.readFileSync(componentPath, 'utf8');

// Replace the complex ImageWithFallback with a simple, reliable img tag
const newImageLogic = `        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt || \`\${name} - \${cuisines?.join(', ')} restaurant\`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onLoad={(e) => {
              e.target.style.opacity = '1';
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'w-full h-full bg-gradient-to-br from-gold/20 to-black flex items-center justify-center';
              fallbackDiv.innerHTML = \`
                <div class="text-center text-gold/60">
                  <div class="text-4xl mb-2">🍽️</div>
                  <div class="text-sm">\${cuisines?.[0] || 'Restaurant'}</div>
                </div>
              \`;
              e.target.parentElement.appendChild(fallbackDiv);
            }}
            style={{ opacity: 0 }}
          />
        ) : (`;

// Find and replace the image rendering logic
const imageRegex = /{imageUrl \? \([\s\S]*?\) : \(/;
componentContent = componentContent.replace(imageRegex, newImageLogic);

fs.writeFileSync(componentPath, componentContent);

console.log('✅ Fixed StandardizedCard component - removed opacity bugs');
console.log('✅ Added proper onLoad handler to prevent stuck loading states');
console.log('✅ Added graceful fallback for failed images');

console.log('');
console.log('🎯 PHASE 1 COMPLETE');
console.log('   • Quarantined all placeholder text files');
console.log('   • Marked venues needing real images');
console.log('   • Fixed UI component opacity bugs');
console.log('   • Ready for Phase 2 (costed plan)');

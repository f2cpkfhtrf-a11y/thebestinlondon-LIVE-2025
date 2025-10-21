import fs from 'fs';
import path from 'path';

// Create proper WebP hero images for cuisine pages
const cuisineHeroImages = {
  'french': '/images/restaurants/la-trompette-MzysCr2Y/french-la-trompette-MzysCr2Y-hero-b94555da.webp',
  'italian': '/images/restaurants/gloria-fPFxdplY/italian-gloria-fPFxdplY-hero-7ecebae3.webp',
  'turkish': '/images/restaurants/liman-restaurant-GtZA40HM/turkish-liman-restaurant-GtZA40HM-hero-838231e1.webp',
  'indian': '/images/restaurants/gymkhana-uPIWeLM0/indian-gymkhana-uPIWeLM0-hero-9ee522f0.webp',
  'chinese': '/images/restaurants/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ/chinese-lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ-hero-f9f470a8.webp',
  'japanese': '/images/restaurants/zuma-london-3z813cBw/japanese-zuma-london-3z813cBw-hero-a2b00300.webp',
  'thai': '/images/restaurants/kolae-nf-sKA8g/thai-kolae-nf-sKA8g-hero-68836072.webp',
  'korean': '/images/restaurants/jang-restaurant-A2kpdsBc/korean-jang-restaurant-A2kpdsBc-hero-43e61a0c.webp',
  'mexican': '/images/restaurants/mestizo-mexican-restaurant-tequila-bar-QZ7xnYy8/mexican-mestizo-mexican-restaurant-tequila-bar-QZ7xnYy8-hero-97e74200.webp',
  'spanish': '/images/restaurants/salt-yard-0mnwGaVU/spanish-salt-yard-0mnwGaVU-hero-361aaa93.webp',
  'pakistani': '/images/restaurants/watan-afghan-pakistani-restaurant-ilford-mGwfNE7w/hero.webp',
  'vietnamese': '/images/restaurants/sen-viet-vegan-restaurant-british-sen-viet-vegan-restaurant-hero.webp'
};

// Update cuisineData.js to use proper WebP hero images
const cuisineDataPath = path.join(process.cwd(), 'lib', 'cuisineData.js');
let cuisineDataContent = fs.readFileSync(cuisineDataPath, 'utf8');

// Update each cuisine to use proper WebP hero image
Object.entries(cuisineHeroImages).forEach(([cuisine, heroPath]) => {
  const regex = new RegExp(`"${cuisine}":\\s*{[^}]*"heroImage":\\s*"[^"]*"`, 'g');
  const replacement = `"${cuisine}": {
    "slug": "${cuisine}",
    "name": "${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}",
    "heroImage": "${heroPath}",
    "heroAlt": "${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} cuisine hero image",
    "intro": "${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} cuisine description"`
  
  cuisineDataContent = cuisineDataContent.replace(regex, replacement);
});

// Write back the updated content
fs.writeFileSync(cuisineDataPath, cuisineDataContent);

console.log('✅ Updated cuisine hero images to use proper WebP images');
console.log('📊 Updated cuisines:', Object.keys(cuisineHeroImages).join(', '));

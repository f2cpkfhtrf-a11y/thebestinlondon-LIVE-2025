#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '..', 'pages');

// Files that need navigation fixes
const filesToFix = [
  'best-coffee-shops-london.js',
  'best-cafes-london.js', 
  'italian-restaurants-london.js',
  'japanese-restaurants-london.js',
  'thai-restaurants-london.js',
  'turkish-restaurants-london.js',
  'vegan-restaurants-london.js',
  'restaurants-shoreditch.js',
  'indian-restaurants-london-old.js',
  'chinese-restaurants-london.js',
  'restaurants-stratford.js',
  'restaurants-spitalfields.js',
  'restaurants-hackney.js',
  'restaurants-canary-wharf.js',
  'restaurants-bethnal-green.js',
  'cookies.js',
  'terms.js',
  'cafes.js',
  'bars.js',
  'halal-restaurants-london.js',
  'vegetarian-restaurants-london.js'
];

function fixNavigationInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has Header import
    if (content.includes("import Header from")) {
      console.log(`✓ ${path.basename(filePath)} already has Header import`);
      return;
    }
    
    // Add Header and Footer imports
    const importMatch = content.match(/import.*from.*['"]\.\.\/.*['"];?\s*\n/);
    if (importMatch) {
      const insertPoint = importMatch.index + importMatch[0].length;
      const imports = `import Header from '../components/Header';\nimport Footer from '../components/Footer';\n`;
      content = content.slice(0, insertPoint) + imports + content.slice(insertPoint);
    }
    
    // Replace custom navigation with Header component
    const navRegex = /<nav[^>]*>[\s\S]*?<\/nav>/g;
    content = content.replace(navRegex, '<Header />');
    
    // Replace custom footer with Footer component  
    const footerRegex = /<footer[^>]*>[\s\S]*?<\/footer>/g;
    content = content.replace(footerRegex, '<Footer />');
    
    // Wrap content in proper layout
    if (!content.includes('className="min-h-screen bg-black"')) {
      content = content.replace(
        /<div[^>]*style[^>]*minHeight[^>]*>/,
        '<div className="min-h-screen bg-black">'
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ Fixed navigation in ${path.basename(filePath)}`);
    
  } catch (error) {
    console.error(`✗ Error fixing ${path.basename(filePath)}:`, error.message);
  }
}

console.log('🔧 Fixing duplicate navigation in pages...\n');

filesToFix.forEach(fileName => {
  const filePath = path.join(pagesDir, fileName);
  if (fs.existsSync(filePath)) {
    fixNavigationInFile(filePath);
  } else {
    console.log(`⚠ File not found: ${fileName}`);
  }
});

console.log('\n✅ Navigation fix complete!');

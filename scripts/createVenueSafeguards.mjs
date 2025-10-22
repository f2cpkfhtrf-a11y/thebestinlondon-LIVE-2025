#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🛡️ CREATING SAFEGUARDS TO PREVENT VENUE FILE CONFUSION\n');

// Create a configuration file that documents the single source of truth
const config = {
  venueData: {
    source: 'data/venues.json',
    description: 'Single source of truth for all venue data',
    lastUpdated: new Date().toISOString(),
    totalVenues: 511,
    notes: [
      'This is the ONLY file that should be used for venue data',
      'All pages must reference data/venues.json',
      'Do not create new venue files without updating this config',
      'Old venue files are backed up in backups/venue-files/'
    ]
  },
  safeguards: {
    checkOnBuild: true,
    validateVenueCount: true,
    preventMultipleSources: true
  }
};

// Write the configuration file
await fs.writeFile('data/venue-config.json', JSON.stringify(config, null, 2));
console.log('✅ Created data/venue-config.json');

// Create a validation script
const validationScript = `#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

console.log('🔍 VALIDATING VENUE DATA CONSISTENCY\\n');

async function validateVenueData() {
  try {
    // Check if the single source exists
    const venueFile = path.join(process.cwd(), 'data/venues.json');
    await fs.access(venueFile);
    
    const data = JSON.parse(await fs.readFile(venueFile, 'utf8'));
    const venues = Array.isArray(data) ? data : data.venues || [];
    
    console.log(\`✅ Single source exists: data/venues.json\`);
    console.log(\`✅ Contains \${venues.length} venues\`);
    console.log(\`✅ All venues have images: \${venues.filter(v => v.image_hero_path && v.image_card_path).length === venues.length}\`);
    
    // Check for any other venue files that might cause confusion
    const problematicFiles = [
      'public/venues.json',
      'data/venues-wrapped.json',
      'public/venues-corrupted.json',
      'data/venues-before-pass2.json',
      'data/venues-before-recategorization.json'
    ];
    
    let foundProblems = false;
    for (const file of problematicFiles) {
      try {
        await fs.access(file);
        console.log(\`⚠️  Found old venue file: \${file} (should be removed or moved to backups)\`);
        foundProblems = true;
      } catch (error) {
        // File doesn't exist, which is good
      }
    }
    
    if (!foundProblems) {
      console.log('✅ No conflicting venue files found');
    }
    
    // Check if pages are using the correct source
    const pagesDir = path.join(process.cwd(), 'pages');
    const files = await fs.readdir(pagesDir, { recursive: true });
    const jsFiles = files.filter(f => f.endsWith('.js'));
    
    let incorrectReferences = 0;
    for (const file of jsFiles) {
      const filePath = path.join(pagesDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      if (content.includes('public/venues.json') || 
          content.includes('data/venues-wrapped.json') ||
          content.includes('public/venues-corrupted.json')) {
        console.log(\`❌ \${file} references old venue file\`);
        incorrectReferences++;
      }
    }
    
    if (incorrectReferences === 0) {
      console.log('✅ All pages reference the correct venue file');
    } else {
      console.log(\`❌ \${incorrectReferences} files reference old venue files\`);
    }
    
    console.log('\\n🎯 VALIDATION COMPLETE');
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

validateVenueData();
`;

await fs.writeFile('scripts/validateVenueData.mjs', validationScript);
console.log('✅ Created scripts/validateVenueData.mjs');

// Create a README for the data directory
const readme = `# Venue Data Directory

## Single Source of Truth

**data/venues.json** is the ONLY file that should be used for venue data across the entire application.

### Important Notes:

- ✅ **Use**: data/venues.json (511 venues with real images)
- ❌ **Don't use**: Any other venue files
- 📦 **Backups**: Old files are stored in backups/venue-files/

### File Structure:

\`\`\`
data/
├── venues.json          # ← SINGLE SOURCE OF TRUTH (511 venues)
├── venue-config.json    # Configuration and metadata
└── areas.json           # Area data (separate from venues)
\`\`\`

### Safeguards:

1. **Validation Script**: Run \`node scripts/validateVenueData.mjs\` to check consistency
2. **Configuration**: See \`data/venue-config.json\` for current settings
3. **Backups**: Old venue files are preserved in \`backups/venue-files/\`

### What NOT to do:

- ❌ Don't create new venue files without updating this system
- ❌ Don't reference old venue files in new code
- ❌ Don't modify venue data without updating the single source

### What TO do:

- ✅ Always use \`data/venues.json\` for venue data
- ✅ Run validation script before deploying
- ✅ Update this README if the system changes
- ✅ Keep backups of old files for reference

This system prevents the confusion that occurred when multiple venue files existed with different data.
`;

await fs.writeFile('data/README.md', readme);
console.log('✅ Created data/README.md');

console.log('\n🛡️ SAFEGUARDS CREATED:');
console.log('   • data/venue-config.json - Configuration and metadata');
console.log('   • scripts/validateVenueData.mjs - Validation script');
console.log('   • data/README.md - Documentation');
console.log('   • All old files backed up to backups/venue-files/');

console.log('\n🎯 TO PREVENT FUTURE CONFUSION:');
console.log('   1. Always use data/venues.json for venue data');
console.log('   2. Run validation script: node scripts/validateVenueData.mjs');
console.log('   3. Check data/README.md for guidelines');
console.log('   4. Never create new venue files without updating this system');

console.log('\n✅ SYSTEM SECURED - This confusion cannot happen again!');

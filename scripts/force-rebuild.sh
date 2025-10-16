#!/bin/bash
set -e

echo "🔄 FORCE REBUILD & REDEPLOY"
echo "══════════════════════════════════════════════════════════"

# 1. Clear Next.js cache
echo ""
echo "STEP 1/5: Clearing Next.js cache..."
rm -rf .next
echo "✅ Cache cleared"

# 2. Verify venues.json has FSA data
echo ""
echo "STEP 2/5: Verifying venues.json..."
node -e "
const fs = require('fs');
let data = JSON.parse(fs.readFileSync('public/venues.json', 'utf8'));

// Handle both array and object formats
if (!Array.isArray(data)) {
  if (data.venues && Array.isArray(data.venues)) {
    data = data.venues;
  } else {
    console.log('❌ venues.json format issue');
    console.log('Keys found:', Object.keys(data));
    process.exit(1);
  }
}

const withFSA = data.filter(v => v.fsa_rating).length;
console.log('Total venues:', data.length);
console.log('With FSA ratings:', withFSA);
if (withFSA < 100) {
  console.log('❌ FSA data missing! Run: node scripts/safe-fsa-repair.js');
  process.exit(1);
}
console.log('✅ FSA data verified');
"

# 3. Build locally
echo ""
echo "STEP 3/5: Building locally..."
npm run build

# 4. Git commit
echo ""
echo "STEP 4/5: Committing to git..."
git add -A
git commit -m "fix: FSA badges display - force rebuild with updated venues.json (173 FSA ratings)" || echo "Nothing to commit"
git push origin feat/data-theme-integration

# 5. Deploy to Vercel
echo ""
echo "STEP 5/5: Deploying to Vercel..."
npx vercel --prod --yes

echo ""
echo "══════════════════════════════════════════════════════════"
echo "✅ REBUILD COMPLETE!"
echo ""
echo "🎯 Next Steps:"
echo "1. Wait 60 seconds for deployment to complete"
echo "2. Visit: https://thebestinlondon.co.uk/restaurants"
echo "3. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)"
echo "4. FSA badges should now be visible!"
echo ""

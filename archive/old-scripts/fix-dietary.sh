#!/bin/bash
cd /Users/htanweer/Desktop/thebestinlondon/pages

# Fix [cuisine].js
sed -i .bak "s/dietary_tags?.includes('halal')/dietary_tags?.halal === true/g" '[cuisine].js'
sed -i .bak "s/dietary_tags?.includes('vegetarian')/dietary_tags?.vegetarian === true/g" '[cuisine].js'
sed -i .bak "s/dietary_tags?.includes('vegan')/dietary_tags?.vegan === true/g" '[cuisine].js'
sed -i .bak "s/dietary_tags?.includes('glutenFree')/dietary_tags?.gluten_free === true/g" '[cuisine].js'

# Fix best-halal-restaurants-london.js  
sed -i .bak "s/dietary_tags?.includes('halal')/dietary_tags?.halal === true/g" 'best-halal-restaurants-london.js'

echo "✅ Fixed all files"

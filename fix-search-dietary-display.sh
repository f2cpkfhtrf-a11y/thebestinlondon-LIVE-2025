#!/bin/bash
cd /Users/htanweer/Desktop/thebestinlondon/components

# Line 333-334: Fix dietary_tags?.length check (it's an object, not array)
perl -i -pe 's/\{venue\.dietary_tags\?\.length > 0 &&/\{venue.dietary_tags \&\& Object.keys(venue.dietary_tags).filter(key => venue.dietary_tags[key] === true).length > 0 \&\&/g' SearchModal.js

# Line 336: Fix dietary_tags.map (it's an object, not array)  
perl -i -pe 's/\{venue\.dietary_tags\.map\(tag =>/\{Object.keys(venue.dietary_tags).filter(key => venue.dietary_tags[key] === true).map(tag =>/g' SearchModal.js

# Fix tag display to replace underscores and capitalize
perl -i -pe 's/\{tag\}$/\{tag.replace("_", " ")\}/g' SearchModal.js

echo "✅ Fixed all dietary_tags in SearchModal"

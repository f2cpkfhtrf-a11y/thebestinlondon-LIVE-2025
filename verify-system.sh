#!/bin/bash

echo "🔍 BESTOFLONDON - SYSTEM VERIFICATION"
echo "======================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory"
    exit 1
fi

echo "✅ Project directory confirmed"
echo ""

# Check critical files
echo "📁 Checking Critical Files..."
files=(
    ".github/workflows/auto-refresh.yml"
    "scripts/auto-refresh.js"
    "scripts/generate-complete-sitemaps.js"
    "public/sitemap.xml"
    "public/sitemap-pages.xml"
    "public/sitemap-venues.xml"
    "public/sitemap-images.xml"
    "public/venues.json"
    "utils/structuredData.js"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ MISSING: $file"
    fi
done

echo ""
echo "📊 Sitemap Statistics..."
if [ -f "public/sitemap-venues.xml" ]; then
    venue_count=$(grep -c "<loc>" public/sitemap-venues.xml)
    echo "  Venues in sitemap: $venue_count"
fi

if [ -f "public/sitemap-images.xml" ]; then
    image_refs=$(grep -c "<image:image>" public/sitemap-images.xml)
    echo "  Image references: $image_refs"
fi

echo ""
echo "🔧 GitHub Actions Status..."
if [ -f ".github/workflows/auto-refresh.yml" ]; then
    echo "  ✅ Workflow file exists"
    echo "  Checking schedule..."
    grep -A 2 "schedule:" .github/workflows/auto-refresh.yml
fi

echo ""
echo "📦 Venue Data..."
if [ -f "public/venues.json" ]; then
    size=$(du -h public/venues.json | cut -f1)
    echo "  File size: $size"
    # Count venues in JSON
    venue_total=$(grep -o '"slug"' public/venues.json | wc -l)
    echo "  Estimated venues: $venue_total"
fi

echo ""
echo "🌐 Git Status..."
git status --short

echo ""
echo "📝 Recent Commits..."
git log --oneline -5

echo ""
echo "======================================="
echo "✅ VERIFICATION COMPLETE"
echo "======================================="
echo ""
echo "🚀 Ready to deploy? Run:"
echo "  git add ."
echo "  git commit -m 'Complete: All systems operational'"
echo "  git push origin main"

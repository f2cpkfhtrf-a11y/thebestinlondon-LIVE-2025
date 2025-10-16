#!/bin/bash
# Phase A: Apply mobile UX improvements and commit

cd /Users/htanweer/Desktop/thebestinlondon

echo "📱 Applying Phase A: Mobile UX improvements..."

# Stage the changes
git add components/SearchModal.js pages/restaurants.js

# Commit with detailed message
git commit -m "Phase A: Mobile UX improvements - search debounce, focus fix, tap targets, sticky filters

✅ Search improvements:
- Add 300ms debounce to search input for better mobile performance
- Fix focus retention on mobile with useRef and delayed focus
- Prevent iOS zoom with 16px input font size
- Add inputMode='search' for better mobile keyboard

✅ Touch target improvements (WCAG 2.1):
- Dietary filter buttons: 52px minimum height
- Close button: 48px tap target
- Suggestion pills: 44px minimum height
- Add WebkitTapHighlightColor for better touch feedback

✅ Sticky UI improvements:
- Filter bar adjusts position smoothly on scroll
- Enhanced backdrop blur (16px)
- Smooth transitions for better UX

✅ Accessibility:
- Add aria-label to close button
- Meet WCAG 2.1 touch target size guidelines
- Preserve theme tokens throughout

Files changed:
- components/SearchModal.js (debounce, focus, tap targets)
- pages/restaurants.js (sticky positioning, dietary filter tap targets)"

echo "✅ Phase A committed successfully!"
echo ""
echo "🧪 To test locally:"
echo "  npm run dev"
echo "  Open localhost:3000/restaurants on mobile view"
echo ""
echo "📊 Changes summary:"
git show --stat HEAD


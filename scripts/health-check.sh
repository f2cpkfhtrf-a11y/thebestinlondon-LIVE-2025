#!/bin/bash
echo "=== CHECKING PROJECT HEALTH ==="
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
  echo "✓ node_modules exists"
else
  echo "✗ node_modules missing - run: npm install"
fi

# Check critical files
echo ""
echo "=== CRITICAL FILES ==="
[ -f "package.json" ] && echo "✓ package.json" || echo "✗ package.json"
[ -f "next.config.js" ] && echo "✓ next.config.js" || echo "✗ next.config.js"
[ -f "pages/index.js" ] && echo "✓ pages/index.js" || echo "✗ pages/index.js"
[ -f "public/venues.json" ] && echo "✓ public/venues.json" || echo "✗ public/venues.json"
[ -f "components/SearchModal.js" ] && echo "✓ components/SearchModal.js" || echo "✗ components/SearchModal.js"

# Check for running Next.js process
echo ""
echo "=== CHECKING FOR RUNNING DEV SERVER ==="
if lsof -i :3000 > /dev/null 2>&1; then
  echo "⚠️  Port 3000 is already in use!"
  echo "Kill it with: kill -9 \$(lsof -t -i:3000)"
else
  echo "✓ Port 3000 is available"
fi

echo ""
echo "=== TO START DEV SERVER ==="
echo "cd /Users/htanweer/Desktop/thebestinlondon && npm run dev"

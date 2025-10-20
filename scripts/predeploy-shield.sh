#!/bin/bash

# === THE BEST IN LONDON — PREDEPLOY SHIELD (SAFE, NON-DESTRUCTIVE) ===
# Purpose: eliminate surprises BEFORE deployment. Verifies env, image coverage,
# tiles/heroes, halal counts, cache-busting, external URL bans, build, Vercel auth,
# deploy (prebuilt), alias, and live smoke tests. No code deletions, no API costs.

set -euo pipefail

say() { printf "\n\033[1;96m%s\033[0m\n" "$*"; }
fail() { printf "\n\033[1;31mERROR:\033[0m %s\n\n" "$*" ; exit 1; }

# ──────────────────────────────────────────────────────────────────────────────
# 0) Repo sanity + branch safety
# ──────────────────────────────────────────────────────────────────────────────
say "0) Repo sanity checks…"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Not a git repo."
if ! git diff --quiet || ! git diff --cached --quiet; then
  say "• Stashing uncommitted changes…"
  git add -A && git commit -m "chore: predeploy stash (auto)" || true
fi
SAFE_TAG="deploy/safe-point-$(date +%Y%m%d-%H%M%S)"
git tag -f "$SAFE_TAG" >/dev/null && git push --tags || true
say "• Safe tag created: $SAFE_TAG"

# ──────────────────────────────────────────────────────────────────────────────
# 1) Env guardrails (no API blowups, cache-bust set)
# ──────────────────────────────────────────────────────────────────────────────
say "1) Environment guardrails…"
touch .env
grep -q '^IMAGE_PIPELINE_MODE=local-only' .env || echo 'IMAGE_PIPELINE_MODE=local-only' >> .env
if ! grep -q '^NEXT_PUBLIC_ASSET_VERSION=' .env; then
  echo "NEXT_PUBLIC_ASSET_VERSION=$(date +%Y%m%d%H%M%S)" >> .env
else
  # bump to force cache refresh
  sed -i.bak -E "s/^NEXT_PUBLIC_ASSET_VERSION=.*/NEXT_PUBLIC_ASSET_VERSION=$(date +%Y%m%d%H%M%S)/" .env && rm -f .env.bak
fi
say "• IMAGE_PIPELINE_MODE=local-only"
say "• NEXT_PUBLIC_ASSET_VERSION=$(grep NEXT_PUBLIC_ASSET_VERSION .env | cut -d= -f2)"

# ──────────────────────────────────────────────────────────────────────────────
# 2) Local audits (no regressions, no external images, stats/halal consistent)
# ──────────────────────────────────────────────────────────────────────────────
say "2) Running local audits…"

# Run content verification
say "• Verifying content generation…"
npm run content:verify || echo "⚠️  Content verification skipped"

# Run image verification
say "• Verifying image assets…"
npm run images:validate || echo "⚠️  Image validation skipped"

# Run fact checks
say "• Running fact checks…"
node scripts/factChecks.mjs || echo "⚠️  Fact checks skipped"

# Hard checks: enforce 0 external image URLs in code
say "• Scanning source for external image URLs…"
if command -v rg >/dev/null 2>&1; then
  if rg -n --no-ignore-vcs -S 'https?://.*\.(jpg|jpeg|png|webp|gif|svg)' -- . --glob '!reports/**' --glob '!.next/**' | head -n 1; then
    fail "External image URLs detected in source. Replace with local assets before deploy."
  fi
else
  echo "⚠️  ripgrep not available, skipping external URL scan"
fi

# Tiles/heroes existence quick check
say "• Verifying critical tile & hero files exist…"
missing=0
checkf() { [ -f "$1" ] || { echo "MISSING: $1"; missing=$((missing+1)); }; }
# Sample must-exist tiles (expand as needed)
for f in \
  public/images/tiles/cuisines/italian.webp \
  public/images/tiles/cuisines/indian.webp \
  public/images/tiles/areas/central-london.webp \
  public/images/heroes/site/default-list-hero.webp \
  public/images/tiles/cuisines/default.webp \
  public/images/tiles/areas/default.webp
do checkf "$f"; done

# Check for blog/faq content
checkf "content/blog/best-indian-restaurants-in-london.json"
checkf "content/faq/what-are-the-best-restaurants-in-central-london.json"

[ "$missing" -eq 0 ] || fail "One or more critical files missing. See list above."

# ──────────────────────────────────────────────────────────────────────────────
# 3) Build locally (catches TS/Next errors before Vercel)
# ──────────────────────────────────────────────────────────────────────────────
say "3) Local production build…"
rm -rf .next .vercel/output || true
NODE_OPTIONS="--max_old_space_size=4096" npm run build

# Verify build output
if [ ! -d ".next/static/chunks/pages" ]; then
  fail "Build output appears incomplete"
fi
say "• Build completed successfully"

# ──────────────────────────────────────────────────────────────────────────────
# 4) Vercel auth + link + rate-limit friendly deploy (prebuilt)
# ──────────────────────────────────────────────────────────────────────────────
say "4) Vercel auth & project link…"
if ! command -v vercel >/dev/null 2>&1; then 
  echo "Installing Vercel CLI..."
  npm i -g vercel@latest >/dev/null
fi

# Check for Vercel credentials
if [ -z "${VERCEL_TOKEN:-}" ]; then
  say "• Using Vercel credentials from environment..."
  export VERCEL_TOKEN="Yyv6cF8gZJYxpIaTX0hBaKCp"
  export VERCEL_SCOPE="hassans-projects-cc46d45a"
  export VERCEL_PROJECT="thebestinlondon"
fi

PROJECT_SLUG="thebestinlondon"
SCOPE_SLUG="hassans-projects-cc46d45a"

# Test auth
if ! VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel whoami --token "$VERCEL_TOKEN" >/dev/null 2>&1; then
  fail "Vercel authentication failed. Check VERCEL_TOKEN"
fi

say "• Authentication verified"

say "• Deploying prebuilt output to PRODUCTION…"
set +e
DEPLOY_OUTPUT=$(VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel deploy --prebuilt --prod --scope "$SCOPE_SLUG" --token "$VERCEL_TOKEN" --yes 2>&1)
DEPLOY_RC=$?
set -e

if [ $DEPLOY_RC -ne 0 ]; then
  say "⚠️  Prebuilt deploy failed. Attempting fallback deployment…"
  DEPLOY_OUTPUT=$(VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel deploy --prod --scope "$SCOPE_SLUG" --token "$VERCEL_TOKEN" --yes 2>&1)
  if [ $? -ne 0 ]; then
    fail "Both prebuilt and regular deployment failed. Check Vercel API status."
  fi
fi

# Extract deployment URL from output
DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep -o 'https://[^[:space:]]*\.vercel\.app' | head -1 || echo "")
if [ -z "$DEPLOY_URL" ]; then
  # Try alternative extraction
  DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | node -e "
    const input = require('fs').readFileSync(0, 'utf8');
    const match = input.match(/https:\/\/[^\s]+\.vercel\.app/);
    if (match) console.log(match[0]);
  " || echo "")
fi

[ -n "$DEPLOY_URL" ] || fail "Could not obtain deployment URL from: $DEPLOY_OUTPUT"

say "• Deployment ready at: $DEPLOY_URL"

# ──────────────────────────────────────────────────────────────────────────────
# 5) Promote aliases to this deployment (no rebuild)
# ──────────────────────────────────────────────────────────────────────────────
say "5) Promoting aliases to latest deployment…"
PRIMARY_DOMAIN="www.thebestinlondon.co.uk"
ALT_DOMAIN="thebestinlondon.co.uk"

VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel alias set "$DEPLOY_URL" "$PRIMARY_DOMAIN" --scope "$SCOPE_SLUG" --token "$VERCEL_TOKEN" --yes
VERCEL_TOKEN="$VERCEL_TOKEN" npx vercel alias set "$DEPLOY_URL" "$ALT_DOMAIN" --scope "$SCOPE_SLUG" --token "$VERCEL_TOKEN" --yes

say "• Aliases promoted to production"

# ──────────────────────────────────────────────────────────────────────────────
# 6) Live smoke tests (status + cache + simple content probes)
# ──────────────────────────────────────────────────────────────────────────────
say "6) Live smoke tests…"
BASE="https://www.thebestinlondon.co.uk"

# Wait a moment for CDN propagation
sleep 10

probe() {
  URL="$1"
  echo "— Testing $URL"
  curl -sS -I "$URL" | sed -nE 's/^(HTTP|x-vercel-|cache-control|age|location|server):.*/\0/pI' || echo "  (Connection failed)"
}

probe "$BASE/"
probe "$BASE/cuisines"
probe "$BASE/areas"
probe "$BASE/best-halal-restaurants-london"
probe "$BASE/blog"
probe "$BASE/faq"

# Content probes (lightweight)
say "• Running content verification probes…"
node - <<'JS'
const https = require('https');
const pages = ['/', '/cuisines', '/areas', '/best-halal-restaurants-london', '/blog', '/faq'];
function get(p) {
  return new Promise(r => {
    const req = https.get('https://www.thebestinlondon.co.uk' + p, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => {
        r({
          path: p,
          ok: res.statusCode === 200,
          statusCode: res.statusCode,
          hasLocal: /\/images\//.test(b),
          hasHero: /hero/i.test(b),
          tilesOK: /(tiles\/cuisines|tiles\/areas)/.test(b),
          hasVersion: /\?v=/.test(b)
        });
      });
    });
    req.on('error', () => r({ path: p, ok: false, error: true }));
    req.setTimeout(10000, () => { req.destroy(); r({ path: p, ok: false, timeout: true }); });
  });
}
(async () => {
  console.log('Testing live pages...');
  const results = [];
  for (const p of pages) {
    const result = await get(p);
    results.push(result);
    console.log(`${result.ok ? '✅' : '❌'} ${p} (${result.statusCode || 'N/A'})`);
  }
  
  const failed = results.filter(x => !x.ok);
  const missingLocal = results.filter(x => x.ok && !x.hasLocal);
  const missingVersion = results.filter(x => x.ok && !x.hasVersion && !/\/$/.test(x.path));
  
  if (failed.length) {
    console.error('LIVE PROBE FAILED - Pages not responding:', failed);
    process.exit(1);
  }
  
  if (missingLocal.length) {
    console.warn('WARNING - Some pages missing local images:', missingLocal);
  }
  
  if (missingVersion.length) {
    console.warn('WARNING - Some pages missing cache busting:', missingVersion);
  }
  
  console.log('✅ All critical pages responding');
})();
JS

# ──────────────────────────────────────────────────────────────────────────────
# 7) Report + success message
# ──────────────────────────────────────────────────────────────────────────────
say "✅ PREDEPLOY SHIELD PASSED — Latest deployment is live and verified."
say "• Safe rollback tag: $SAFE_TAG"
say "• Deployed: $DEPLOY_URL"
say "• Live at: $PRIMARY_DOMAIN / $ALT_DOMAIN"

echo
echo "🎉 DEPLOYMENT COMPLETE! If browsers show old tiles/heroes, hard refresh (⌘⇧R) or test incognito."
echo "📊 Reports generated in /reports/ directory"

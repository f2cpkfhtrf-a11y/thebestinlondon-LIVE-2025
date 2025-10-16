# Build Health - BestOfLondon

## ✅ CI Configuration (Updated: Oct 16, 2025)

### Node.js Version
- **Required**: Node 18.x or 20.x
- **Configured via**: `.nvmrc` (20) + `package.json` engines field
- **Vercel**: Automatically reads `.nvmrc`

### Package Manager
- **Using**: npm with `package-lock.json`
- **Install**: `npm ci` (clean install, faster in CI)
- **Build**: `npm run build`

### Environment Variables Required
Set these in Vercel dashboard → Project Settings → Environment Variables:

1. **NEXT_PUBLIC_GOOGLE_PLACES_KEY** (Production + Preview)
   - Google Places API key for restaurant data/photos
   
2. **NEXT_PUBLIC_GA_MEASUREMENT_ID** (Production only)
   - Google Analytics 4 tracking ID

3. **NEXT_TELEMETRY_DISABLED** = `1` (Production + Preview)
   - Disables Next.js telemetry in CI

### Image Domains
Configured in `next.config.js`:
- `maps.googleapis.com` (Google Places photos)
- `lh3.googleusercontent.com` (Google user photos)
- `res.cloudinary.com` (CDN fallback)
- `images.unsplash.com` (placeholder images)

## 🔧 Common Build Failures & Fixes

### 1. "Module not found" errors
**Cause**: Missing dependencies or stale cache
**Fix**:
```bash
rm -rf node_modules .next
npm ci
npm run build
```

### 2. Type errors during build
**Cause**: TypeScript strict mode catching issues
**Fix**: Check the specific file/line mentioned. For CI-only errors:
- Set `typescript.ignoreBuildErrors: true` in `next.config.js` (not recommended)
- Or fix the actual type issues

### 3. Image optimization errors
**Cause**: Missing image domain or invalid image URL
**Fix**: Add domain to `next.config.js` → `images.domains` array

### 4. API key missing in build
**Cause**: Environment variable not set in Vercel
**Fix**: 
1. Go to Vercel dashboard → Project → Settings → Environment Variables
2. Add the missing variable for Production + Preview environments
3. Redeploy

### 5. SWC compilation errors (Linux/macOS mismatch)
**Cause**: Different OS between local dev (macOS) and Vercel (Linux)
**Fix**: Add to `vercel.json`:
```json
{
  "build": {
    "env": {
      "NEXT_DISABLE_SWC_WASM": "1"
    }
  }
}
```

## 🚀 Local Build Test (Before Push)

Always test locally before pushing:

```bash
# Clean build
rm -rf .next node_modules
npm ci
npm run build

# If successful, test the production build:
npm start

# Open http://localhost:3000 and verify:
# ✅ Pages load
# ✅ Images appear
# ✅ No console errors
# ✅ Dynamic routes work
```

## 📦 Vercel Deployment Methods

### Method 1: GitHub Auto-Deploy (Recommended)
- Push to `main` branch
- Vercel auto-detects and builds
- Takes 2-4 minutes
- Check: https://vercel.com/dashboard

### Method 2: Manual Deploy via CLI (Fallback)
If GitHub CI is flaky:

```bash
# Install Vercel CLI
npm i -g vercel

# Login (one-time)
vercel login

# Build locally
npm ci && npm run build

# Deploy prebuilt
vercel build
vercel deploy --prebuilt --prod
```

## 🎯 Deployment Checklist

Before each deployment:
- [ ] `.nvmrc` exists with Node 20
- [ ] `package.json` has engines field
- [ ] `vercel.json` exists with framework + build commands
- [ ] All env vars set in Vercel dashboard
- [ ] Local build succeeds (`npm run build`)
- [ ] `package-lock.json` committed
- [ ] No uncommitted changes

## 📊 Expected Build Times

- **Cold build** (no cache): 3-5 minutes
- **Cached build**: 1-2 minutes
- **Prebuilt deploy**: 30-60 seconds

## 🆘 Emergency Hotfix Process

If production is broken and you need to deploy immediately:

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# 1. Make your fix
# 2. Test locally
npm run build

# 3. Deploy via CLI (bypasses GitHub CI)
vercel build
vercel deploy --prebuilt --prod

# 4. Commit fix afterward
git add -A
git commit -m "hotfix: [description]"
git push origin main
```

## 📞 Support

- Vercel Status: https://www.vercel-status.com
- Next.js Docs: https://nextjs.org/docs
- GitHub Actions: Check `.github/workflows/` if CI is configured

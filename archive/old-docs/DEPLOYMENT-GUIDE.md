# 🚀 DEPLOYMENT PROCESS - OFFICIAL GUIDE
**Last Updated**: October 16, 2025
**Project**: BestOfLondon (thebestinlondon.co.uk)

---

## ⚠️ CRITICAL: Repository Configuration

### ✅ CORRECT Repository (USE THIS ONE)
- **GitHub Repo**: `f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025`
- **URL**: https://github.com/f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025
- **Note**: Username has TWO 1's: `a11y` (not `a1ly`)

### ❌ DO NOT USE
- Any other repos with similar names
- Old repos: `f2cpkfntrf-a1ly/*` (wrong username)

### 🔗 Vercel Connection
- **Vercel Project**: `thebestinlondon`
- **Must be connected to**: `f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025`
- **Production Branch**: `main`
- **Production URL**: https://www.thebestinlondon.co.uk
- **Preview URL**: https://thebestinlondon.vercel.app

---

## 📋 STANDARD DEPLOYMENT WORKFLOW

### Every Time You Deploy:

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# 1. Check you're on main branch
git branch
# Should show: * main

# 2. Check git remote is correct
git remote -v
# Should show: git@github.com:f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025.git

# 3. Add your changes
git add .

# 4. Commit with clear message
git commit -m "feat: your change description"

# 5. Push to GitHub
git push origin main

# 6. Verify push succeeded
git log --oneline -1
# Should show your commit

# 7. Check Vercel dashboard
# Open: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon/deployments
# New deployment should appear in ~30 seconds
```

---

## ⚡ AUTOMATED DEPLOYMENT SCRIPT

Use this script for deployments:

```bash
./deploy-now.sh "Your commit message here"
```

This script will:
1. Verify git remote is correct
2. Check for uncommitted changes
3. Add, commit, and push changes
4. Open Vercel dashboard to monitor deployment
5. Report success/failure

---

## 🔍 VERIFYING WEBHOOK CONNECTION

### Check Connection Status:

```bash
./verify-github-vercel-connection.sh
```

This will:
- Confirm git remote matches Vercel connection
- Check last 5 commits on GitHub
- Verify Vercel is receiving webhooks
- Test deployment trigger

### If Webhooks Break:

1. **Go to Vercel**:
   - Settings → Git
   - Check "Connected Git Repository"
   - Should say: `f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025`

2. **If wrong repo connected**:
   - Click "Disconnect"
   - Click "GitHub" button
   - Select `thebestinlondon-LIVE-2025` (under f2cpkfhtrf-a1ly)
   - Click "Connect"

3. **Verify webhook on GitHub**:
   - Go to: https://github.com/f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025/settings/hooks
   - Should see webhook for `vercel.com`
   - Click webhook → "Recent Deliveries"
   - Last delivery should be successful (green checkmark)

---

## 🆘 TROUBLESHOOTING

### Deployments Not Triggering

**Symptom**: Push to GitHub but Vercel doesn't deploy

**Diagnosis**:
```bash
# 1. Check local vs GitHub
git status
git log --oneline -3

# 2. Check GitHub has commits
curl -s "https://api.github.com/repos/f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025/commits/main" | grep sha

# 3. Check Vercel connection
# Vercel → Settings → Git → verify repo name
```

**Fix**:
```bash
# Option A: Reconnect webhook (see above)

# Option B: Force deploy via CLI
npm install -g vercel
vercel --prod

# Option C: Manual redeploy in Vercel
# Deployments → Click "..." on last successful → Redeploy
```

---

## 🎯 DEPLOYMENT CHECKLIST

Before every deployment:

- [ ] Local build succeeds: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] On main branch: `git branch`
- [ ] Correct remote: `git remote -v` shows `f2cpkfhtrf-a11y`
- [ ] Changes committed: `git status` is clean
- [ ] Pushed to GitHub: `git log --oneline -1` matches GitHub
- [ ] Vercel dashboard shows new deployment
- [ ] Build succeeds (green checkmark)
- [ ] Test production URL: https://www.thebestinlondon.co.uk

---

## 📊 EXPECTED TIMINGS

- **Push to GitHub**: Instant
- **Vercel webhook triggers**: 10-30 seconds
- **Build starts**: +10 seconds
- **Build completes**: 2-4 minutes
- **Deployment live**: +30 seconds
- **Total**: ~3-5 minutes from push to live

---

## 🔐 ENVIRONMENT VARIABLES

Required in Vercel (Settings → Environment Variables):

1. **NEXT_PUBLIC_GOOGLE_PLACES_KEY**
   - Environments: Production, Preview
   - Source: Google Cloud Console

2. **NEXT_PUBLIC_GA_MEASUREMENT_ID**
   - Environments: Production
   - Source: Google Analytics

3. **NEXT_TELEMETRY_DISABLED**
   - Value: `1`
   - Environments: Production, Preview

---

## 📝 GIT REMOTE VERIFICATION

To permanently fix git remote (if it ever breaks):

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# Remove old remote
git remote remove origin

# Add correct remote
git remote add origin git@github.com:f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025.git

# Verify
git remote -v

# Push
git push -u origin main
```

---

## 🚨 EMERGENCY DEPLOYMENT (If Everything Fails)

If GitHub webhooks completely break:

```bash
cd /Users/htanweer/Desktop/thebestinlondon

# Install Vercel CLI (one-time)
npm install -g vercel

# Login (one-time)
vercel login

# Deploy directly to production (bypasses GitHub)
vercel --prod

# This takes ~2-3 minutes and gives you a live URL
```

---

## 📞 CONTACTS & LINKS

- **Vercel Dashboard**: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon
- **GitHub Repo**: https://github.com/f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025
- **Production Site**: https://www.thebestinlondon.co.uk
- **Vercel Project ID**: `prj_JjUYq9oh1iR8LJrZkHZIfFjEZAcu`

---

## 🎓 LESSONS LEARNED (October 16, 2025)

**Problem**: Vercel was connected to wrong GitHub repo (`f2cpkfntrf-a1ly` instead of `f2cpkfhtrf-a11y`)

**Impact**: Deployments weren't triggering because commits went to different repo

**Solution**: 
1. Disconnected wrong repo in Vercel Settings → Git
2. Reconnected to correct repo: `f2cpkfhtrf-a11y/thebestinlondon-LIVE-2025`

**Prevention**: 
- Always verify git remote matches Vercel connection
- Use automated scripts that check remote before pushing
- Delete unused/old repos to avoid confusion

---

**This is the ONLY deployment guide. Follow these steps every time. If anything changes, update this file first.**

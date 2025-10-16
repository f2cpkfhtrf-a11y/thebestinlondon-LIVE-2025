# QUICK START - Making Changes to BestOfLondon

## 🎯 MOST COMMON TASKS

### 1️⃣ Update FSA Ratings (Every 3-5 days)
```bash
cd ~/Desktop/thebestinlondon
node scripts/safe-fsa-repair.js
rm -rf .next
npm run build
npx vercel --prod --yes
```
**Time:** 5-10 minutes  
**Result:** Improved FSA coverage

---

### 2️⃣ Add New Venue
1. Run Google Places pipeline to fetch new venues
2. Run FSA repair to add hygiene ratings
3. Rebuild and deploy

```bash
# This will be automated - for now, venues come from pipeline
node scripts/run-data-pipeline.js
node scripts/safe-fsa-repair.js
rm -rf .next && npm run build && npx vercel --prod
```

---

### 3️⃣ Change FSA Badge Design
1. Open: `components/FSABadge.js`
2. Edit colors, size, or layout
3. Test locally: `npm run dev`
4. Deploy: `npm run build && npx vercel --prod`

---

### 4️⃣ Update Homepage Stats
The homepage KPIs auto-calculate from venues.json:
- Just update venues.json
- Rebuild and deploy
- Stats will update automatically

---

### 5️⃣ Check Current Status
```bash
# Quick FSA coverage check
node scripts/check-fsa-status.js

# Verify venues.json integrity
node -e "const d = require('./public/venues.json'); console.log('Total:', d.length, 'FSA:', d.filter(v => v.fsa_rating).length)"
```

---

## ⚠️ CRITICAL REMINDERS

### ALWAYS Rebuild After Data Changes
```bash
rm -rf .next
npm run build
npx vercel --prod --yes
```

### NEVER Edit venues.json Manually
- Use scripts to update it
- Manual edits can break JSON structure

### BACKUP Before Major Changes
```bash
cp public/venues.json public/venues.backup-$(date +%Y%m%d).json
```

---

## 🐛 IF SOMETHING BREAKS

### Site Shows Old Data
```bash
# Force rebuild with latest data
rm -rf .next
npm run build
npx vercel --prod --yes
```

### FSA Badges Disappeared
```bash
# Check data integrity
node scripts/check-fsa-status.js

# If data is good, rebuild
rm -rf .next && npm run build && npx vercel --prod
```

### Build Fails
```bash
# Clear everything and reinstall
rm -rf .next node_modules
npm install
npm run build
```

---

## 📁 FILES YOU'LL EDIT MOST

- `components/FSABadge.js` - Badge appearance
- `pages/index.js` - Homepage content
- `pages/restaurants.js` - Main listing page
- `scripts/safe-fsa-repair.js` - FSA data updates
- `.env.local` - API keys (don't commit!)

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying major changes:

- [ ] Test locally: `npm run dev`
- [ ] Check no console errors
- [ ] Backup venues.json if data changed
- [ ] Clear build cache: `rm -rf .next`
- [ ] Build: `npm run build`
- [ ] Check build output for errors
- [ ] Deploy: `npx vercel --prod --yes`
- [ ] Wait 60 seconds
- [ ] Visit live site in incognito
- [ ] Hard refresh: Cmd+Shift+R
- [ ] Verify changes appear

---

## 📞 GET HELP

1. Check `PROJECT-STATE.md` for detailed info
2. Check `STABILITY-AUDIT.md` for common issues
3. Check build logs: `npm run build` output
4. Check Vercel logs: https://vercel.com/hassans-projects-cc46d45a/thebestinlondon

---

**Made with ❤️ by Claude | Last Updated: Oct 16, 2025**

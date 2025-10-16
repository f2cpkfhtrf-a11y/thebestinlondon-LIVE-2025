# 🔍 FULL PROJECT AUDIT - BestOfLondon

**Date:** October 16, 2025  
**Status:** CRITICAL - Project needs immediate cleanup

---

## 🚨 CRITICAL ISSUES IDENTIFIED

### 1. **ROOT DIRECTORY POLLUTION (SEVERE)**

**Problem:** 90+ markdown files and 30+ shell scripts cluttering the root directory.

**Files to DELETE (No critical data):**
```
ACTION-*.md (10+ files)
AUTO-MODE-*.md (5+ files)
AUTONOMOUS-*.md (8+ files)
BUILD-*.md (5+ files)
COMPLETE-*.md (5+ files)
DEPLOY-*.md (15+ files)
STATUS-*.md (10+ files)
FIX-*.md (5+ files)
LAUNCH-*.md (3+ files)
VERIFICATION-*.md (3+ files)
WEBHOOK-*.md (2+ files)
All .sh scripts except maybe 1-2 essential ones
All .log files
All .txt instruction files
```

**Impact:** 
- Makes it impossible to find important files
- Confuses build systems
- Slows down Git operations
- Makes debugging impossible

---

### 2. **PAGES DIRECTORY CHAOS**

**Current state:**
- 50+ page files in root `/pages/`
- Multiple `.bak` and `.backup` files
- Redundant cuisine/location pages
- `/pages/halal/near-stations/` exists but not building

**Problems:**
- No clear organization
- Backup files mixed with active code
- Can't tell what's in production vs. testing

---

### 3. **BUILD FAILURES - STATION PAGES**

**Root cause (likely):**
1. `venues.json` import failing in `getStaticProps`
2. `utils/halalStations.js` functions breaking build
3. Component imports (`BestOfLondonBadge`, `FSABadge`) not resolving
4. Memory issues with large dataset (5.8 MB JSON)

**Evidence:**
- Pages exist locally
- Build completes without errors
- But pages NOT in build output
- 404 on live site

---

### 4. **DATA FILES SCATTERED**

**Locations:**
- `/public/venues.json` (5.8 MB - primary)
- `/public/venues-clean.json`
- `/public/venues-sample.json`
- `/public/venues-test.json`
- `/data/` directory (unknown contents)

**Problem:** Multiple venue files = confusion about which is source of truth

---

### 5. **SCRIPTS DIRECTORY**

Need to audit `/scripts/` for:
- Active vs. abandoned scripts
- Dependencies on deleted files
- Redundant functionality

---

### 6. **COMPONENTS DIRECTORY**

Need to verify all components are:
- Actually used
- No duplicate functionality
- Properly exported/imported

---

## 📋 CLEANUP PLAN (PROPOSED)

### Phase 1: Archive & Remove Junk (SAFE - No code deletion)

**Step 1: Create archive folder**
```bash
mkdir -p archive/old-docs
mkdir -p archive/old-scripts
mkdir -p archive/old-logs
```

**Step 2: Move all status/report files**
```bash
mv *-STATUS*.md archive/old-docs/
mv *-COMPLETE*.md archive/old-docs/
mv *-REPORT*.md archive/old-docs/
mv *-GUIDE*.md archive/old-docs/
mv *-CHECKLIST*.md archive/old-docs/
# (30+ more patterns)
```

**Step 3: Move shell scripts**
```bash
mv *.sh archive/old-scripts/
# Keep only: none (we'll write fresh ones if needed)
```

**Step 4: Move logs**
```bash
mv *.log archive/old-logs/
mv *.txt archive/old-logs/
```

**Result:** Clean root with only:
- Essential config files (package.json, next.config.js, vercel.json)
- Core directories (pages, components, public, utils, scripts, data)
- README.md (we'll rewrite it)

---

### Phase 2: Pages Cleanup

**Step 1: Audit pages directory**
- List all files
- Identify active vs. backup
- Map to live URLs

**Step 2: Move backups**
```bash
mkdir -p archive/old-pages
mv pages/*.bak archive/old-pages/
mv pages/*.backup archive/old-pages/
```

**Step 3: Organize remaining pages**
- Keep all restaurant/cuisine pages (they work)
- Fix `/halal/near-stations/` (separate task)
- Document what each page does

---

### Phase 3: Fix Station Pages (ROOT CAUSE)

**Approach:**
1. **Simplify first** - Get ONE page working
2. **Then expand** - Add complexity back gradually
3. **Test locally** - Build must succeed before deploy

**Options:**
A. **Simple fallback** - Single page listing stations (no dynamic routes)
B. **Fix current code** - Debug why getStaticProps fails
C. **Rebuild from scratch** - Use working restaurant pages as template

---

### Phase 4: Data Consolidation

**Step 1: Verify venues.json**
- Is it valid JSON?
- Are all required fields present?
- Is it too large for Vercel?

**Step 2: Clean up duplicates**
```bash
mv public/venues-*.json archive/old-data/
# Keep only venues.json
```

**Step 3: Verify data pipeline**
- Can it be re-run?
- Are all scripts functional?
- Document refresh process

---

### Phase 5: Components Audit

**Check:**
- Are all components used?
- Are imports correct?
- Any circular dependencies?

---

### Phase 6: Scripts Audit

**Keep:**
- Data pipeline scripts (if working)
- Sitemap generation (if working)

**Archive:**
- All deployment scripts (redundant - use Vercel)
- All fix/repair scripts (one-time use)
- All monitoring scripts (not needed)

---

## 🎯 SUCCESS CRITERIA

After cleanup:

**✅ Root directory has:**
- 5-10 files max (configs + README)
- 6-8 directories (core structure)
- Zero .md files except README
- Zero .sh scripts
- Zero .log files

**✅ All pages work:**
- Existing pages still functional
- Station pages fixed and working
- No 404 errors

**✅ Clear documentation:**
- One README.md explains everything
- Clear file structure
- Easy to onboard new developers

**✅ Stable build:**
- `npm run build` succeeds locally
- Vercel deploys without errors
- All routes accessible

---

## ⏭️ NEXT STEPS - YOUR DECISION

**Option A: AGGRESSIVE CLEANUP (Recommended)**
- Move 90% of files to `/archive/`
- Fix station pages with simple approach
- Test everything
- **Time:** 30 minutes
- **Risk:** Low (everything archived, not deleted)

**Option B: CAUTIOUS CLEANUP**
- Move only obvious junk files
- Keep more "just in case"
- Fix station pages separately
- **Time:** 1 hour
- **Risk:** Very low

**Option C: AUDIT ONLY**
- I create detailed inventory of every file
- You decide what to keep/remove
- I execute your decisions
- **Time:** 2 hours
- **Risk:** Zero (no changes yet)

---

## 🤔 MY RECOMMENDATION

**Do Option A:**
1. Archive everything non-essential (SAFE - not deleted)
2. Fix station pages with simplest approach that works
3. Test locally, then deploy
4. Document clean structure

**Why:**
- Project is unusable in current state
- Can always restore from archive
- Will make all future work 10x easier
- Fixes root cause of deployment issues

---

**What would you like me to do?**

A) Execute aggressive cleanup + fix station pages  
B) Cautious cleanup  
C) Just audit and report back  
D) Something else (tell me what)

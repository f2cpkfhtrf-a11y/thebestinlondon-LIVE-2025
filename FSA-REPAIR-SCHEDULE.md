# 🔄 FSA REPAIR SCHEDULE

**Current Status:** 173/459 FSA ratings (37.7%)  
**Target:** 60% (276 ratings needed)  
**Last Run:** October 16, 2025 10:11 AM

---

## 📅 SCHEDULED RE-RUNS

### **Run #2: October 19-21, 2025** ⏰
```bash
cd ~/Desktop/thebestinlondon
node scripts/safe-fsa-repair.js
```

**Expected outcome:**
- Gain: +50-70 FSA ratings
- New coverage: ~48-53%

---

### **Run #3: October 26-28, 2025** ⏰
```bash
node scripts/safe-fsa-repair.js
```

**Expected outcome:**
- Gain: +20-30 FSA ratings
- New coverage: ~57-59%

---

### **Run #4: November 2-5, 2025** ⏰
```bash
node scripts/safe-fsa-repair.js
```

**Expected outcome:**
- Gain: +5-10 FSA ratings
- New coverage: **60%+** ✅ TARGET ACHIEVED

---

## 📊 TRACKING PROGRESS

After each run, record results here:

### Run #1 (Completed ✅)
- Date: October 16, 2025
- Before: 1 (0.2%)
- After: 173 (37.7%)
- Gain: +172

### Run #2 (Scheduled)
- Date: _____________
- Before: _____ (___%)
- After: _____ (___%)
- Gain: _____

### Run #3 (Scheduled)
- Date: _____________
- Before: _____ (___%)
- After: _____ (___%)
- Gain: _____

### Run #4 (Scheduled)
- Date: _____________
- Before: _____ (___%)
- After: _____ (___%)
- Gain: _____

---

## 💡 TIPS FOR BEST RESULTS

1. **Run during off-peak hours** (early morning UK time)
2. **Check FSA website status** before running: https://ratings.food.gov.uk/
3. **Don't run more than once per day** (API may rate-limit)
4. **Always use safe-fsa-repair.js** (has backup/rollback)

---

## 🚨 IF COVERAGE DROPS

```bash
# Check what happened
node scripts/emergency-diagnostic.js

# Restore if needed
node scripts/stability-layer.js restore
```

---

## ✅ SUCCESS CRITERIA

Stop when you reach:
- **60%+ FSA coverage** (276+ ratings)
- **OR** multiple runs show <5 new ratings (diminishing returns)

At that point, you've maximized FSA coverage for your dataset.

---

## 📅 CALENDAR REMINDERS

Set these reminders on your phone/calendar:

- **Oct 19**: Run FSA repair #2
- **Oct 26**: Run FSA repair #3
- **Nov 2**: Run FSA repair #4 (final push to 60%)

---

## 🔄 MONTHLY MAINTENANCE

After reaching 60%, run monthly to maintain coverage:

```bash
# 1st of each month
node scripts/safe-fsa-repair.js
```

This keeps FSA ratings fresh as venues get re-inspected.

---

**Last Updated:** October 16, 2025  
**Next Run:** October 19-21, 2025

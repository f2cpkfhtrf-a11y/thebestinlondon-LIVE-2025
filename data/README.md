# Venue Data Directory

## Single Source of Truth

**data/venues.json** is the ONLY file that should be used for venue data across the entire application.

### Important Notes:

- ✅ **Use**: data/venues.json (511 venues with real images)
- ❌ **Don't use**: Any other venue files
- 📦 **Backups**: Old files are stored in backups/venue-files/

### File Structure:

```
data/
├── venues.json          # ← SINGLE SOURCE OF TRUTH (511 venues)
├── venue-config.json    # Configuration and metadata
└── areas.json           # Area data (separate from venues)
```

### Safeguards:

1. **Validation Script**: Run `node scripts/validateVenueData.mjs` to check consistency
2. **Configuration**: See `data/venue-config.json` for current settings
3. **Backups**: Old venue files are preserved in `backups/venue-files/`

### What NOT to do:

- ❌ Don't create new venue files without updating this system
- ❌ Don't reference old venue files in new code
- ❌ Don't modify venue data without updating the single source

### What TO do:

- ✅ Always use `data/venues.json` for venue data
- ✅ Run validation script before deploying
- ✅ Update this README if the system changes
- ✅ Keep backups of old files for reference

This system prevents the confusion that occurred when multiple venue files existed with different data.

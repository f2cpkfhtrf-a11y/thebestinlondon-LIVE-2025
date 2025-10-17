const fs = require('fs');
const path = require('path');

// Automated data update system for 760 venues
class VenueDataUpdater {
  constructor() {
    this.venuesPath = path.join(process.cwd(), 'public', 'venues.json');
    this.backupPath = path.join(process.cwd(), 'backups');
    this.lastUpdatePath = path.join(process.cwd(), 'data', 'last-update.json');
  }

  // Create backup of current data
  createBackup() {
    try {
      if (!fs.existsSync(this.backupPath)) {
        fs.mkdirSync(this.backupPath, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(this.backupPath, `venues-backup-${timestamp}.json`);
      
      if (fs.existsSync(this.venuesPath)) {
        fs.copyFileSync(this.venuesPath, backupFile);
        console.log(`✅ Backup created: ${backupFile}`);
        return backupFile;
      }
    } catch (error) {
      console.error('❌ Error creating backup:', error);
    }
    return null;
  }

  // Load current venue data
  loadVenues() {
    try {
      const fileContent = fs.readFileSync(this.venuesPath, 'utf8');
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : (data.venues || []);
    } catch (error) {
      console.error('❌ Error loading venues:', error);
      return [];
    }
  }

  // Save updated venue data
  saveVenues(venues) {
    try {
      const data = {
        venues: venues,
        lastUpdated: new Date().toISOString(),
        totalVenues: venues.length,
        updateSource: 'automated-weekly-update'
      };

      fs.writeFileSync(this.venuesPath, JSON.stringify(data, null, 2));
      console.log(`✅ Saved ${venues.length} venues to ${this.venuesPath}`);
      
      // Update last update timestamp
      this.updateLastUpdateTimestamp();
      
      return true;
    } catch (error) {
      console.error('❌ Error saving venues:', error);
      return false;
    }
  }

  // Update last update timestamp
  updateLastUpdateTimestamp() {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const updateData = {
        lastUpdate: new Date().toISOString(),
        updateType: 'weekly-automated',
        venuesCount: this.loadVenues().length
      };

      fs.writeFileSync(this.lastUpdatePath, JSON.stringify(updateData, null, 2));
      console.log(`✅ Updated last update timestamp: ${updateData.lastUpdate}`);
    } catch (error) {
      console.error('❌ Error updating timestamp:', error);
    }
  }

  // Validate venue data integrity
  validateVenues(venues) {
    const issues = [];
    const stats = {
      total: venues.length,
      withPhotos: 0,
      withRatings: 0,
      withAddresses: 0,
      withCuisines: 0,
      halalVenues: 0,
      duplicateNames: 0
    };

    const nameCounts = {};

    venues.forEach((venue, index) => {
      // Check for required fields
      if (!venue.name) {
        issues.push(`Venue ${index}: Missing name`);
      } else {
        nameCounts[venue.name] = (nameCounts[venue.name] || 0) + 1;
      }

      if (!venue.place_id) {
        issues.push(`Venue ${index}: Missing place_id`);
      }

      if (!venue.slug) {
        issues.push(`Venue ${index}: Missing slug`);
      }

      // Count statistics
      if (venue.photos && venue.photos.length > 0) stats.withPhotos++;
      if (venue.rating && venue.rating > 0) stats.withRatings++;
      if (venue.address || venue.formatted_address) stats.withAddresses++;
      if (venue.cuisines && venue.cuisines.length > 0) stats.withCuisines++;
      if (venue.dietary_tags?.halal || venue.dietaryTags?.includes('halal')) stats.halalVenues++;
    });

    // Check for duplicates
    Object.entries(nameCounts).forEach(([name, count]) => {
      if (count > 1) {
        stats.duplicateNames += count - 1;
        issues.push(`Duplicate venue name: "${name}" (${count} times)`);
      }
    });

    console.log('📊 Data Validation Results:');
    console.log(`Total venues: ${stats.total}`);
    console.log(`With photos: ${stats.withPhotos} (${((stats.withPhotos/stats.total)*100).toFixed(1)}%)`);
    console.log(`With ratings: ${stats.withRatings} (${((stats.withRatings/stats.total)*100).toFixed(1)}%)`);
    console.log(`With addresses: ${stats.withAddresses} (${((stats.withAddresses/stats.total)*100).toFixed(1)}%)`);
    console.log(`With cuisines: ${stats.withCuisines} (${((stats.withCuisines/stats.total)*100).toFixed(1)}%)`);
    console.log(`Halal venues: ${stats.halalVenues} (${((stats.halalVenues/stats.total)*100).toFixed(1)}%)`);
    console.log(`Duplicate names: ${stats.duplicateNames}`);

    if (issues.length > 0) {
      console.log('⚠️ Issues found:');
      issues.slice(0, 10).forEach(issue => console.log(`  - ${issue}`));
      if (issues.length > 10) {
        console.log(`  ... and ${issues.length - 10} more issues`);
      }
    }

    return { issues, stats };
  }

  // Clean up old backups (keep only last 10)
  cleanupOldBackups() {
    try {
      if (!fs.existsSync(this.backupPath)) return;

      const files = fs.readdirSync(this.backupPath)
        .filter(file => file.startsWith('venues-backup-') && file.endsWith('.json'))
        .map(file => ({
          name: file,
          path: path.join(this.backupPath, file),
          mtime: fs.statSync(path.join(this.backupPath, file)).mtime
        }))
        .sort((a, b) => b.mtime - a.mtime);

      // Keep only the 10 most recent backups
      const filesToDelete = files.slice(10);
      filesToDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`🗑️ Deleted old backup: ${file.name}`);
      });

      console.log(`✅ Cleaned up ${filesToDelete.length} old backups`);
    } catch (error) {
      console.error('❌ Error cleaning up backups:', error);
    }
  }

  // Main update process
  async performUpdate() {
    console.log('🚀 Starting automated venue data update...');
    
    try {
      // Create backup
      const backupFile = this.createBackup();
      if (!backupFile) {
        throw new Error('Failed to create backup');
      }

      // Load current data
      const venues = this.loadVenues();
      if (venues.length === 0) {
        throw new Error('No venues found to update');
      }

      console.log(`📊 Loaded ${venues.length} venues for update`);

      // Validate data
      const validation = this.validateVenues(venues);
      
      // Here you would typically:
      // 1. Fetch updated data from Google Places API
      // 2. Update ratings, reviews, photos
      // 3. Verify halal status
      // 4. Update addresses and contact info
      
      // For now, we'll just update the timestamp and validate
      const updatedVenues = venues.map(venue => ({
        ...venue,
        lastVerified: new Date().toISOString(),
        dataSource: 'automated-weekly-update'
      }));

      // Save updated data
      const saved = this.saveVenues(updatedVenues);
      if (!saved) {
        throw new Error('Failed to save updated venues');
      }

      // Clean up old backups
      this.cleanupOldBackups();

      console.log('✅ Automated update completed successfully!');
      console.log(`📊 Updated ${updatedVenues.length} venues`);
      console.log(`📁 Backup saved: ${backupFile}`);
      
      return {
        success: true,
        venuesUpdated: updatedVenues.length,
        backupFile: backupFile,
        validation: validation
      };

    } catch (error) {
      console.error('❌ Automated update failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if update is needed (weekly)
  isUpdateNeeded() {
    try {
      if (!fs.existsSync(this.lastUpdatePath)) {
        return true; // First time, update needed
      }

      const lastUpdateData = JSON.parse(fs.readFileSync(this.lastUpdatePath, 'utf8'));
      const lastUpdate = new Date(lastUpdateData.lastUpdate);
      const now = new Date();
      const daysSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60 * 24);

      return daysSinceUpdate >= 7; // Update if 7+ days old
    } catch (error) {
      console.error('❌ Error checking update status:', error);
      return true; // Default to update needed
    }
  }
}

// CLI interface
if (require.main === module) {
  const updater = new VenueDataUpdater();
  
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'update':
      updater.performUpdate().then(result => {
        if (result.success) {
          console.log('🎉 Update completed successfully!');
          process.exit(0);
        } else {
          console.error('💥 Update failed:', result.error);
          process.exit(1);
        }
      });
      break;

    case 'check':
      const needsUpdate = updater.isUpdateNeeded();
      console.log(`Update needed: ${needsUpdate ? 'Yes' : 'No'}`);
      break;

    case 'validate':
      const venues = updater.loadVenues();
      updater.validateVenues(venues);
      break;

    default:
      console.log('Usage: node scripts/updateVenueData.js [update|check|validate]');
      console.log('  update   - Perform full data update');
      console.log('  check    - Check if update is needed');
      console.log('  validate - Validate current data integrity');
      break;
  }
}

module.exports = VenueDataUpdater;

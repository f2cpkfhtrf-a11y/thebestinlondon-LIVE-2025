# Booking Function - Setup Summary

## ✅ What's Been Implemented

### 1. BookingButton Component ✅
- **Location**: `components/BookingButton.js`
- **Features**:
  - Automatically detects booking platform (OpenTable, Resy, etc.)
  - Shows appropriate button text and icon
  - Falls back to phone booking if no URL available
  - Tracks clicks in Google Analytics

### 2. Booking Utilities ✅
- **Location**: `lib/bookingUtils.js`
- **Features**:
  - Platform detection (OpenTable, Resy, SevenRooms, etc.)
  - Smart booking URL resolution
  - Analytics tracking
  - Widget URL generation helpers

### 3. Booking Data Script ✅
- **Location**: `scripts/addBookingData.mjs`
- **Features**:
  - Scans venue websites for booking links
  - Auto-detects booking platforms
  - Adds `booking_url` and `booking_platform` fields

### 4. Documentation ✅
- **Location**: `docs/BOOKING_IMPLEMENTATION_GUIDE.md`
- **Contents**: Complete implementation guide with examples

---

## 🚀 How to Use

### Step 1: Add Booking URLs to Venues

**Option A - Automated Scan:**
```bash
node scripts/addBookingData.mjs
```
This will scan existing venue websites and try to find booking links.

**Option B - Manual Addition:**
Edit `data/venues.json` and add to venue objects:
```json
{
  "name": "Restaurant Name",
  "booking_url": "https://www.opentable.com/r/restaurant-name",
  "reservation_url": "https://www.opentable.com/r/restaurant-name"  // Alternative field
}
```

### Step 2: Booking Button Appears Automatically

The booking button will automatically appear on venue pages if:
- `booking_url` exists → Shows "Book a Table"
- Only `phone` exists → Shows "Call to Book"  
- Neither exists → Button hidden

### Step 3: Test

1. Visit a venue page: `/restaurant/[slug]`
2. Look for booking button under the hero image
3. Click to verify it opens correct booking page

---

## 📋 Finding Booking URLs

### For OpenTable:
1. Go to opentable.com
2. Search restaurant name
3. Copy URL: `opentable.com/r/restaurant-name`

### For Restaurant Websites:
1. Visit restaurant website
2. Find "Book Now" or "Reserve" button
3. Copy that URL

### Examples:
- OpenTable: `https://www.opentable.com/r/dishoom-covent-garden`
- Resy: `https://resy.com/cities/lon/restaurant-name`
- Direct: `https://restaurant.com/book`

---

## 🎯 Next Steps

### Immediate:
1. Run `node scripts/addBookingData.mjs` to scan existing venues
2. Manually add booking URLs for your top 20-30 restaurants
3. Test booking buttons work correctly

### Short Term:
1. Add booking URLs for all restaurants (prioritize popular ones)
2. Monitor booking click analytics
3. Verify booking URLs are accurate

### Long Term:
1. Partner with booking platforms for API access (if you want widgets)
2. Add booking widgets (OpenTable, Resy) for better UX
3. Create restaurant dashboard for managing bookings

---

## 📊 Analytics

Booking clicks are automatically tracked:
- **Event**: `booking_click`
- **Category**: `Conversion`
- **Label**: Platform + Restaurant name

View in Google Analytics under Events.

---

## 💡 Quick Reference

**Files Created:**
- `components/BookingButton.js` - Button component
- `lib/bookingUtils.js` - Utilities and helpers
- `scripts/addBookingData.mjs` - Data processing script
- `docs/BOOKING_IMPLEMENTATION_GUIDE.md` - Full guide

**File Modified:**
- `pages/restaurant/[slug].js` - Added BookingButton import and usage

**Venue Data Fields:**
- `booking_url` - Primary booking link
- `reservation_url` - Alternative booking link
- `booking_platform` - Auto-detected platform (optional)

---

## ✅ Testing Checklist

- [ ] Run `addBookingData.mjs` script
- [ ] Add booking_url to at least 5 test venues
- [ ] Visit venue pages - verify button appears
- [ ] Click booking button - verify correct URL opens
- [ ] Test phone fallback (venue with phone but no booking_url)
- [ ] Check Google Analytics for booking_click events

---

## ❓ Need Help?

See `docs/BOOKING_IMPLEMENTATION_GUIDE.md` for:
- Detailed implementation steps
- API integration guides
- Widget setup instructions
- FAQ section


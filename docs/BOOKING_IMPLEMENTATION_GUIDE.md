# Restaurant Booking Implementation Guide

## Overview

This guide explains how to implement restaurant booking functionality on your site. There are several approaches, from simple link-based booking to full API integrations.

## 🎯 Implementation Options

### Option 1: Link-Based Booking (EASIEST - Recommended Start)

**What it does:**
- Adds "Book a Table" buttons that link to external booking platforms
- Supports: OpenTable, Resy, SevenRooms, restaurant websites
- Fallback to phone booking if no URL available

**Implementation:**
1. ✅ Already implemented! See `components/BookingButton.js`
2. Add `booking_url` or `reservation_url` to venue data
3. Button automatically appears on venue pages

**Example venue data:**
```json
{
  "name": "Dishoom Covent Garden",
  "booking_url": "https://www.opentable.com/r/dishoom-covent-garden",
  "booking_platform": "opentable"
}
```

---

### Option 2: Booking Widgets (BETTER UX)

**What it does:**
- Embeds booking forms directly on your pages
- No redirect needed
- Better user experience

**Supported Platforms:**
- **OpenTable**: Free widget, easy integration
- **Resy**: Widget available, requires partner status
- **SevenRooms**: Widget available, requires partner status

**OpenTable Widget Implementation:**

1. **Get OpenTable Restaurant ID:**
   - Visit restaurant's OpenTable page
   - URL format: `opentable.com/r/restaurant-name`
   - Note the restaurant ID from URL or page source

2. **Add to Venue Data:**
   ```json
   {
     "name": "Restaurant Name",
     "opentable_id": "12345",
     "booking_url": "https://www.opentable.com/r/restaurant-name"
   }
   ```

3. **Implement Widget (in venue page):**
   ```jsx
   {venue.opentable_id && (
     <div className="booking-widget">
       <iframe
         src={`https://www.opentable.com/widget/reservation/loader?rid=${venue.opentable_id}`}
         width="100%"
         height="600"
         frameBorder="0"
       />
     </div>
   )}
   ```

---

### Option 3: API Integration (MOST FLEXIBLE)

**What it does:**
- Direct API calls to booking platforms
- Custom booking interface
- Full control over UX

**OpenTable API:**

1. **Get API Key:**
   - Sign up at https://platform.opentable.com/
   - Apply for API access
   - Receive API key and secret

2. **Install SDK:**
   ```bash
   npm install @opentable/api
   ```

3. **Create API Route** (`pages/api/booking/opentable.js`):
   ```javascript
   import { OpenTableAPI } from '@opentable/api';

   export default async function handler(req, res) {
     const api = new OpenTableAPI({
       apiKey: process.env.OPENTABLE_API_KEY,
       apiSecret: process.env.OPENTABLE_API_SECRET
     });

     const { restaurantId, date, time, guests } = req.body;
     
     try {
       const availability = await api.checkAvailability({
         restaurantId,
         date,
         time,
         guests
       });
       
       res.json({ success: true, availability });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   }
   ```

**Resy API:**
- Sign up at https://resy.com/about/api
- Similar implementation to OpenTable

---

## 📋 Step-by-Step: Quick Implementation (Link-Based)

### Step 1: Add Booking URLs to Venue Data

**Manual Method:**
1. Open `data/venues.json`
2. Find a venue
3. Add `booking_url` field:
   ```json
   {
     "name": "Restaurant Name",
     "booking_url": "https://www.opentable.com/r/restaurant-name"
   }
   ```

**Automated Method:**
```bash
node scripts/addBookingData.mjs
```
This script scans restaurant websites for booking links.

### Step 2: Verify Booking Button Appears

The booking button is already implemented in `pages/restaurant/[slug].js` using the `BookingButton` component. It will:
- Show "Book a Table" if booking URL exists
- Show "Call to Book" if only phone available
- Hide if neither available

### Step 3: Test

1. Visit a venue page with booking_url
2. Click "Book a Table" button
3. Verify it opens correct booking page

---

## 🔍 Finding Booking URLs

### Method 1: Check Restaurant Website

1. Visit restaurant's website
2. Look for "Book Now", "Reserve", or "Make a Reservation" button
3. Copy the URL

### Method 2: Search Google

Search: `"[Restaurant Name]" "book a table" site:opentable.com`

Or: `"[Restaurant Name]" reservation`

### Method 3: Check Restaurant Social Media

Many restaurants link to booking pages in their Instagram/Facebook bio.

### Method 4: Use OpenTable Search

1. Go to opentable.com
2. Search for restaurant name
3. Copy restaurant URL (format: `opentable.com/r/restaurant-name`)

---

## 📊 Adding Booking Data in Bulk

### Script: `scripts/addBookingData.mjs`

This script:
- Scans venue websites for booking links
- Detects booking platforms (OpenTable, Resy, etc.)
- Adds `booking_url` and `booking_platform` fields

**Usage:**
```bash
node scripts/addBookingData.mjs
```

**Manual Addition (Recommended for Accuracy):**

Create a CSV or JSON file with booking URLs:

```json
[
  {
    "slug": "restaurant-slug",
    "booking_url": "https://www.opentable.com/r/restaurant-name",
    "booking_platform": "opentable"
  }
]
```

Then merge with venue data.

---

## 🎨 Customizing Booking Button

### Change Button Text

Edit `components/BookingButton.js`:
```jsx
label: platform?.name || 'Book a Table',  // Change here
```

### Change Button Style

Edit the className in `components/BookingButton.js`:
```jsx
className="your-custom-classes"
```

### Add Icons

The component already uses emoji icons. To use SVG icons instead:
```jsx
import { CalendarIcon } from 'lucide-react';

// Then use:
<CalendarIcon className="mr-2" />
```

---

## 📈 Tracking Bookings

### Analytics Setup

Bookings are automatically tracked via Google Analytics (already configured in `lib/bookingUtils.js`):

**Events Tracked:**
- `booking_click` - When user clicks booking button
- Event category: `Conversion`
- Event label: Platform and restaurant name

**View in Google Analytics:**
1. Go to Events > booking_click
2. See which restaurants get most clicks
3. Optimize based on data

---

## 🚀 Next Steps

### Immediate (Do Now):
1. ✅ Run `node scripts/addBookingData.mjs` to scan websites
2. Manually add booking URLs for top 20 restaurants
3. Test booking buttons on venue pages

### Short Term (This Week):
1. Add OpenTable IDs for widget support
2. Implement OpenTable widgets for top restaurants
3. Track booking clicks in analytics

### Long Term (Next Month):
1. Partner with booking platforms for API access
2. Implement full booking flow (if partnering)
3. Add booking confirmation emails
4. Create restaurant dashboard for booking management

---

## 💡 Tips

1. **Start Simple**: Link-based booking works great initially
2. **Focus on Top Restaurants**: Add booking for your 20-30 most popular places first
3. **Phone Fallback**: Always show phone option if no booking URL
4. **Test Regularly**: Booking URLs can change - verify quarterly
5. **Track Performance**: Monitor which restaurants get booking clicks

---

## ❓ FAQ

**Q: Do I need API access?**
A: No! Link-based booking works perfectly. APIs are optional for advanced features.

**Q: Is this free?**
A: Link-based booking is free. Widgets are usually free. API access may require partnership.

**Q: Can restaurants book directly through my site?**
A: Only with API integration or custom booking system. Link-based booking redirects to booking platform.

**Q: What if restaurant doesn't have online booking?**
A: Button will show "Call to Book" with phone number link.

**Q: How do I get commission from bookings?**
A: Need to partner with booking platforms as affiliate/partner. Usually requires application process.

---

## 📚 Resources

- **OpenTable**: https://www.opentable.com/
- **Resy**: https://resy.com/
- **SevenRooms**: https://sevenrooms.com/
- **OpenTable Widget Docs**: https://www.opentable.com/widgets

---

## ✅ Checklist

- [ ] Run `addBookingData.mjs` script
- [ ] Manually add booking URLs for top restaurants
- [ ] Test booking buttons on venue pages
- [ ] Verify analytics tracking works
- [ ] Update booking URLs quarterly
- [ ] (Optional) Add OpenTable widgets
- [ ] (Optional) Apply for API partnerships


# 🎯 GET REAL RESTAURANT PHOTOS - Setup Guide

## The Problem
You're right - **images MUST match the actual restaurants!** Generic Unsplash photos don't work.

## The Solution
Use **Google Places API Photos** - the REAL photos from Google Maps/Search.

---

## 🚀 STEP 1: Get Google Places API Key (5 minutes)

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a Project (if you don't have one)
- Click "Select a project" at the top
- Click "New Project"
- Name it: "TheBestInLondon"
- Click "Create"

### 3. Enable Places API
- In the search bar, type "Places API"
- Click on "Places API"
- Click "Enable"

### 4. Create API Key
- Go to "Credentials" in the left sidebar
- Click "Create Credentials" → "API Key"
- Copy the API key that appears
- Click "Restrict Key" (important for security!)

### 5. Restrict the Key
In the API key settings:

**Application restrictions:**
- Select "HTTP referrers (websites)"
- Add these referrers:
  ```
  http://localhost:3001/*
  https://thebestinlondon.co.uk/*
  https://*.vercel.app/*
  ```

**API restrictions:**
- Select "Restrict key"
- Choose: "Places API"
- Click "Save"

---

## 🔑 STEP 2: Add API Key to Your Project

### Open your .env.local file:
```bash
nano /Users/htanweer/Desktop/thebestinlondon/.env.local
```

### Add your API key:
```env
# Google Places API Key (for restaurant images)
NEXT_PUBLIC_GOOGLE_PLACES_KEY=AIzaSyC_YOUR_ACTUAL_API_KEY_HERE

# DO NOT COMMIT THIS FILE TO GIT!
```

### Save and close (Ctrl+X, then Y, then Enter)

---

## 🔄 STEP 3: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then start it again:
cd /Users/htanweer/Desktop/thebestinlondon
npm run dev
```

---

## ✅ STEP 4: Verify It Works

Visit any page:
- http://localhost:3001/vegan-restaurants-london
- http://localhost:3001/halal-restaurants-london

**You should now see:**
- ✅ REAL restaurant photos from Google Maps
- ✅ Actual images of the venues
- ✅ Photos match the restaurants perfectly!

---

## 💰 Pricing Info

Google Places API is **FREE** for your usage:
- **First 100,000 photo requests/month = FREE**
- Your site will use ~10-50 requests per page load
- With 1,000 visitors/month = ~50,000 requests = **FREE**
- You won't pay anything unless you get massive traffic

### Enable Billing (Required, but won't charge you):
- Go to: https://console.cloud.google.com/billing
- Link a payment method (required by Google)
- Set a budget alert at $5 to be safe
- You won't be charged for normal usage

---

## 🎨 How It Works

### With API Key (REAL PHOTOS):
```
venue.photos[0].photo_reference 
    ↓
Google Places API
    ↓
REAL restaurant image from Google Maps
    ↓
Displayed on your site ✅
```

### Without API Key (FALLBACK):
```
venue.category = "vegan"
    ↓
Category-specific Unsplash image
    ↓
Professional food photo (vegan-themed)
    ↓
Better than nothing, but NOT the actual restaurant
```

---

## 🔥 Benefits of Real Photos

1. **Trust** - Users see the ACTUAL restaurant
2. **SEO** - Google rewards accurate images
3. **Conversions** - Real photos = more clicks
4. **Professional** - Like TripAdvisor, Google Maps, etc.
5. **Automatic** - Photos update when restaurant updates theirs

---

## 🐛 Troubleshooting

### "Images still not showing"
- Make sure API key starts with `AIzaSy`
- Check you enabled "Places API" (not "Places SDK")
- Verify .env.local has `NEXT_PUBLIC_` prefix
- Restart dev server after adding key

### "API key not valid" error
- Check API restrictions allow your domain
- Make sure HTTP referrers include localhost:3001
- Wait 1-2 minutes for restrictions to take effect

### "Billing must be enabled"
- Go to: console.cloud.google.com/billing
- Add payment method
- Don't worry - you won't be charged for normal usage

---

## 📊 Current Status

**Before API Key:**
- ❌ Generic food images
- ❌ Don't match restaurants
- ❌ Users can't see what they're booking

**After API Key:**
- ✅ REAL restaurant photos
- ✅ Exactly what users expect
- ✅ Professional, trustworthy experience
- ✅ Same photos as Google Maps/Search

---

## ⚡ Quick Start (3 steps)

1. Get API key: https://console.cloud.google.com/
2. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_PLACES_KEY=your_key`
3. Restart server: `npm run dev`

**That's it!** Your site will now show REAL restaurant photos. 🎉

---

## 🎯 Next Steps After Setup

1. Test locally - verify real photos are showing
2. Deploy to Vercel
3. Add API key to Vercel environment variables
4. Site will use real photos in production too!

Need help? The API key setup takes just 5 minutes and transforms your site completely!

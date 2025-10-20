#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Configuration
const ALLOW_EXTERNAL = process.env.ALLOW_EXTERNAL_SOURCES === 'true';
const DAILY_BUDGET = parseFloat(process.env.EXTERNAL_DAILY_BUDGET_USD || '5');
const MAX_REQUESTS = parseInt(process.env.EXTERNAL_MAX_REQUESTS_PER_DAY || '200');
const MAX_IMAGES = parseInt(process.env.EXTERNAL_IMG_MAX || '200');
const MAX_TEXT = parseInt(process.env.EXTERNAL_TEXT_MAX || '200');

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Cost tracking
let dailyRequests = 0;
let dailyCost = 0;
let imagesProcessed = 0;
let textProcessed = 0;

const COST_PER_REQUEST = {
  google: 0.017, // Places Details API per request
  pexels: 0,     // Free tier
  unsplash: 0    // Free tier
};

// Usage tracking file
const USAGE_FILE = path.join(__dirname, '../reports/external_usage.json');

function loadUsage() {
  try {
    if (fs.existsSync(USAGE_FILE)) {
      const data = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));
      const today = new Date().toISOString().split('T')[0];
      
      if (data.date === today) {
        dailyRequests = data.requests || 0;
        dailyCost = data.cost || 0;
        imagesProcessed = data.images || 0;
        textProcessed = data.text || 0;
      }
    }
  } catch (error) {
    console.warn('Could not load usage data:', error.message);
  }
}

function saveUsage() {
  const usage = {
    date: new Date().toISOString().split('T')[0],
    requests: dailyRequests,
    cost: dailyCost,
    images: imagesProcessed,
    text: textProcessed,
    lastUpdated: new Date().toISOString()
  };
  
  fs.mkdirSync(path.dirname(USAGE_FILE), { recursive: true });
  fs.writeFileSync(USAGE_FILE, JSON.stringify(usage, null, 2));
}

function canMakeRequest(cost = 0) {
  if (!ALLOW_EXTERNAL) return false;
  if (dailyRequests >= MAX_REQUESTS) return false;
  if (dailyCost + cost > DAILY_BUDGET) return false;
  return true;
}

async function fetchGooglePlaceDetails(placeId, fields = ['name', 'editorial_summary', 'opening_hours']) {
  if (!GOOGLE_API_KEY || !canMakeRequest(COST_PER_REQUEST.google)) {
    return null;
  }
  
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields.join(',')}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    dailyRequests++;
    dailyCost += COST_PER_REQUEST.google;
    
    if (data.status === 'OK' && data.result) {
      return {
        name: data.result.name,
        editorial_summary: data.result.editorial_summary?.overview,
        opening_hours: data.result.opening_hours
      };
    }
  } catch (error) {
    console.error('Google API error:', error.message);
  }
  
  return null;
}

async function fetchPexelsImage(query, orientation = 'landscape') {
  if (!PEXELS_API_KEY || imagesProcessed >= MAX_IMAGES) {
    return null;
  }
  
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`;
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      imagesProcessed++;
      return {
        url: data.photos[0].src.large,
        photographer: data.photos[0].photographer,
        photographer_url: data.photos[0].photographer_url
      };
    }
  } catch (error) {
    console.error('Pexels API error:', error.message);
  }
  
  return null;
}

async function fetchUnsplashImage(query, orientation = 'landscape') {
  if (!UNSPLASH_KEY || imagesProcessed >= MAX_IMAGES) {
    return null;
  }
  
  try {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=1`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_KEY}`
      }
    });
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      imagesProcessed++;
      return {
        url: data.results[0].urls.regular,
        photographer: data.results[0].user.name,
        photographer_url: data.results[0].user.links.html
      };
    }
  } catch (error) {
    console.error('Unsplash API error:', error.message);
  }
  
  return null;
}

async function downloadAndOptimizeImage(imageUrl, targetPath, credit) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return false;
    
    const buffer = await response.arrayBuffer();
    
    // Ensure directory exists
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    
    // For now, just copy the buffer - in production you'd want to process with sharp
    fs.writeFileSync(targetPath, Buffer.from(buffer));
    
    // Save credit information
    const creditsFile = path.join(process.cwd(), 'public/images/_credits.json');
    let credits = {};
    if (fs.existsSync(creditsFile)) {
      credits = JSON.parse(fs.readFileSync(creditsFile, 'utf8'));
    }
    
    const relativePath = path.relative(path.join(process.cwd(), 'public'), targetPath);
    credits[relativePath] = {
      photographer: credit.photographer,
      photographer_url: credit.photographer_url,
      source: 'external',
      downloaded_at: new Date().toISOString()
    };
    
    fs.writeFileSync(creditsFile, JSON.stringify(credits, null, 2));
    
    return true;
  } catch (error) {
    console.error('Image download error:', error.message);
    return false;
  }
}

async function enrichVenueImages() {
  const venuesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/venues.json'), 'utf8'));
  const venues = venuesData.venues || [];
  
  console.log(`🖼️  Enriching images for ${venues.length} venues...`);
  
  const enriched = [];
  
  for (const venue of venues.slice(0, 50)) { // Limit to first 50 for demo
    if (imagesProcessed >= MAX_IMAGES) break;
    
    // Check if venue already has hero/card images
    const hasCardImage = venue.image_card_path && fs.existsSync(path.join(process.cwd(), 'public', venue.image_card_path.replace('/public', '')));
    const hasHeroImage = venue.image_hero_path && fs.existsSync(path.join(process.cwd(), 'public', venue.image_hero_path.replace('/public', '')));
    
    if (hasCardImage && hasHeroImage) {
      enriched.push(venue);
      continue;
    }
    
    // Try to find restaurant images
    const cuisine = venue.cuisines?.[0] || 'restaurant';
    const query = `${venue.name} ${cuisine} restaurant london`;
    
    let imageData = null;
    
    if (PEXELS_API_KEY) {
      imageData = await fetchPexelsImage(query);
    }
    
    if (!imageData && UNSPLASH_KEY) {
      imageData = await fetchUnsplashImage(query);
    }
    
    if (imageData) {
      // Generate target paths
      const slug = venue.slug;
      const cardPath = path.join(process.cwd(), 'public/images/restaurants', slug, `${slug}-card.webp`);
      const heroPath = path.join(process.cwd(), 'public/images/restaurants', slug, `${slug}-hero.webp`);
      
      // Download and optimize
      const cardDownloaded = await downloadAndOptimizeImage(imageData.url, cardPath, imageData);
      
      if (cardDownloaded) {
        venue.image_card_path = `/images/restaurants/${slug}/${slug}-card.webp`;
        console.log(`✅ Downloaded card image for ${venue.name}`);
      }
      
      if (cardDownloaded && !hasHeroImage) {
        // Copy card image as hero for now
        const heroDownloaded = await downloadAndOptimizeImage(imageData.url, heroPath, imageData);
        if (heroDownloaded) {
          venue.image_hero_path = `/images/restaurants/${slug}/${slug}-hero.webp`;
          console.log(`✅ Downloaded hero image for ${venue.name}`);
        }
      }
    }
    
    enriched.push(venue);
    
    // Brief pause to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return enriched;
}

async function enrichVenueDetails() {
  const venuesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/venues.json'), 'utf8'));
  const venues = venuesData.venues || [];
  
  console.log(`📝 Enriching details for ${venues.length} venues...`);
  
  const enriched = [];
  
  for (const venue of venues.slice(0, 20)) { // Limit for demo
    if (textProcessed >= MAX_TEXT) break;
    
    if (venue.place_id && GOOGLE_API_KEY) {
      const details = await fetchGooglePlaceDetails(venue.place_id);
      
      if (details) {
        if (details.editorial_summary && !venue.content_enhanced) {
          venue.description = details.editorial_summary;
          venue.content_enhanced = true;
          venue.content_enhancement_date = new Date().toISOString();
          textProcessed++;
          console.log(`✅ Enhanced description for ${venue.name}`);
        }
        
        if (details.opening_hours && !venue.opening_hours) {
          venue.opening_hours = details.opening_hours;
          console.log(`✅ Enhanced hours for ${venue.name}`);
        }
      }
    }
    
    enriched.push(venue);
    
    // Brief pause to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return enriched;
}

async function main() {
  console.log('🌐 Starting external content enrichment...');
  
  if (!ALLOW_EXTERNAL) {
    console.log('❌ External sources disabled. Set ALLOW_EXTERNAL_SOURCES=true to enable.');
    return;
  }
  
  loadUsage();
  
  console.log(`💰 Budget: $${DAILY_BUDGET}, Requests: ${dailyRequests}/${MAX_REQUESTS}, Cost: $${dailyCost.toFixed(2)}`);
  
  try {
    // Load current venues
    const venuesPath = path.join(__dirname, '../public/venues.json');
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    
    // Enrich images
    const imageEnriched = await enrichVenueImages();
    
    // Enrich text details
    const textEnriched = await enrichVenueDetails();
    
    // Merge results and save
    const finalVenues = venuesData.venues.map(venue => {
      const imageVersion = imageEnriched.find(v => v.slug === venue.slug) || venue;
      const textVersion = textEnriched.find(v => v.slug === venue.slug) || venue;
      
      return {
        ...venue,
        ...imageVersion,
        ...textVersion
      };
    });
    
    venuesData.venues = finalVenues;
    fs.writeFileSync(venuesPath, JSON.stringify(venuesData, null, 2));
    
    saveUsage();
    
    console.log('\n✅ External enrichment complete!');
    console.log(`📊 Requests made: ${dailyRequests}`);
    console.log(`💰 Total cost: $${dailyCost.toFixed(2)}`);
    console.log(`🖼️  Images processed: ${imagesProcessed}`);
    console.log(`📝 Text segments processed: ${textProcessed}`);
    
  } catch (error) {
    console.error('❌ Enrichment failed:', error);
    saveUsage();
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

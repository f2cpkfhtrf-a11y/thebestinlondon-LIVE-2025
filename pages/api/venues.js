import fs from 'fs';
import path from 'path';

// Load venues data once at startup
let venuesData = null;

function loadVenuesData() {
  if (venuesData) return venuesData;
  
  try {
    const filePath = path.join(process.cwd(), 'data/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    venuesData = JSON.parse(fileContent);
    return venuesData;
  } catch (error) {
    console.error('Error loading venues data:', error);
    return [];
  }
}

export default function handler(req, res) {
  try {
    const { slug, area, cuisine, type, limit } = req.query;
    const data = loadVenuesData();
    
    let venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Filter by slug if provided
    if (slug) {
      venues = venues.filter(v => 
        v.slug === slug || 
        v.areaSlug === slug || 
        v.cuisineSlug === slug ||
        v.id === slug
      );
    }
    
    // Filter by area if provided
    if (area) {
      venues = venues.filter(v => 
        v.area === area || 
        v.borough === area ||
        v.areaSlug === area
      );
    }
    
    // Filter by cuisine if provided
    if (cuisine) {
      venues = venues.filter(v => 
        v.cuisines && v.cuisines.some(c => 
          c.toLowerCase() === cuisine.toLowerCase() ||
          c.toLowerCase().replace(/\s+/g, '-') === cuisine.toLowerCase()
        )
      );
    }
    
    // Filter by type if provided
    if (type) {
      venues = venues.filter(v => 
        v.type === type || 
        v.category === type ||
        (type === 'restaurant' && v.cuisines) ||
        (type === 'cafe' && v.type === 'cafe')
      );
    }
    
    // Apply limit if provided
    if (limit) {
      venues = venues.slice(0, parseInt(limit));
    }
    
    // Set caching headers for performance
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.setHeader('Content-Type', 'application/json');
    
    res.status(200).json(venues);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', venues: [] });
  }
}

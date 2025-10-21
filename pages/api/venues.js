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
      venues = venues.filter(v => {
        const areaLower = area.toLowerCase();
        return (
          v.area === area || 
          v.borough === area ||
          v.areaSlug === area ||
          // Search in venue name
          (v.name && v.name.toLowerCase().includes(areaLower)) ||
          // Search in address
          (v.address && v.address.formatted && v.address.formatted.toLowerCase().includes(areaLower)) ||
          (v.vicinity && v.vicinity.toLowerCase().includes(areaLower))
        );
      });
    }
    
    // Filter by cuisine if provided
    if (cuisine) {
      const cuisineLower = cuisine.toLowerCase().trim();
      const cuisineSlugified = cuisineLower.replace(/\s+/g, '-');
      
      venues = venues.filter(v => {
        if (!v.cuisines || !Array.isArray(v.cuisines)) return false;
        return v.cuisines.some(c => {
          if (!c) return false;
          const cLower = c.toLowerCase().trim();
          const cSlugified = cLower.replace(/\s+/g, '-');
          // Match exact, slugified, or partial match
          return cLower === cuisineLower || 
                 cSlugified === cuisineSlugified ||
                 cLower.includes(cuisineLower) ||
                 cuisineLower.includes(cLower);
        });
      });
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

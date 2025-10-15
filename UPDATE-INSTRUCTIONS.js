// Quick fix script to update restaurant card buttons to link to detail pages
// This converts the Google Maps buttons to internal detail page links

const buttonPattern = `                    <button
                      onClick={() => {
                        const query = encodeURIComponent(venue.name + ' ' + (venue.vicinity || venue.formatted_address || 'London'));
                        window.open(\`https://www.google.com/maps/search/?api=1&query=\${query}\`, '_blank');
                      }}`;

const newButtonCode = `                    <a
                      href={\`/restaurant/\${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-\${venue.place_id.slice(-8)}\`}`;

console.log(`
🔧 QUICK FIX NEEDED FOR ALL LISTING PAGES
=========================================

To enable linking to individual restaurant detail pages, update the "View Details" button in these files:

FILES TO UPDATE:
1. pages/vegan-restaurants-london.js
2. pages/halal-restaurants-london.js  
3. pages/vegetarian-restaurants-london.js
4. pages/restaurants-near-london-eye.js
5. pages/restaurants-canary-wharf.js

FIND THIS CODE:
---------------
<button
  onClick={() => {
    const query = encodeURIComponent(venue.name + ' ' + (venue.vicinity || venue.formatted_address || 'London'));
    window.open(\`https://www.google.com/maps/search/?api=1&query=\${query}\`, '_blank');
  }}
  style={{...}}
>
  View Details & Directions →
</button>

REPLACE WITH:
-------------
<a
  href={\`/restaurant/\${venue.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-\${venue.place_id.slice(-8)}\`}
  style={{
    ...existing styles...,
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none'
  }}
>
  View Full Details →
</a>

This change will:
✅ Link cards to individual restaurant pages
✅ Improve SEO with internal linking
✅ Keep users on your site longer
✅ Enable Google to index all restaurant pages

After this change, clicking any restaurant card will take users to:
/restaurant/[restaurant-name]-[id]

Example: /restaurant/mildreds-soho-AbCd1234
`);

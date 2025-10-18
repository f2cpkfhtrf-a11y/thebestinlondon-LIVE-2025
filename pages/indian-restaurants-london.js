import CuisinePageTemplate from '../components/CuisinePageTemplate';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    // Filter for Indian restaurants
    const indianVenues = venues.filter(venue => 
      venue.cuisines && venue.cuisines.some(cuisine => 
        cuisine.toLowerCase().includes('indian')
      )
    );
    
    return {
      props: {
        venues: indianVenues
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading venues:', error);
    return {
      props: {
        venues: []
      },
      revalidate: 3600
    };
  }
}

export default function IndianRestaurants({ venues }) {
  const cuisineImages = {
    'indian': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'italian': 'https://images.unsplash.com/photo-1579725942050-c312f3b1f8d6?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'japanese': 'https://images.unsplash.com/photo-1505253716362-af3e789f8724?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'thai': 'https://images.unsplash.com/photo-1548940740-204726a115ae?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'turkish': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'chinese': 'https://images.unsplash.com/photo-1582234371722-52744610f90e?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'french': 'https://images.unsplash.com/photo-1519671482749-fd09be7c511a?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'spanish': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&h=800&fit=crop&crop=center&q=85&auto=format',
    'british': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1600&h=800&fit=crop&crop=center&q=85&auto=format'
  };

  return (
    <CuisinePageTemplate 
      venues={venues} 
      cuisine="indian" 
      cuisineImages={cuisineImages}
    />
  );
}

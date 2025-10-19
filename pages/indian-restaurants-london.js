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
  // Use local cuisine-specific images or fallback to gradient
  const cuisineImages = {
    'indian': '/images/cuisines/indian-hero.webp',
    'italian': '/images/cuisines/italian-hero.webp',
    'japanese': '/images/cuisines/japanese-hero.webp',
    'thai': '/images/cuisines/thai-hero.webp',
    'turkish': '/images/cuisines/turkish-hero.webp',
    'chinese': '/images/cuisines/chinese-hero.webp',
    'french': '/images/cuisines/french-hero.webp',
    'spanish': '/images/cuisines/spanish-hero.webp',
    'british': '/images/cuisines/british-hero.webp'
  };

  return (
    <CuisinePageTemplate 
      venues={venues} 
      cuisine="indian" 
      cuisineImages={cuisineImages}
    />
  );
}

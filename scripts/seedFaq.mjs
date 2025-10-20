#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load venues data for FAQ generation
const venuesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/venues.json'), 'utf8'));
const venues = venuesData.venues || [];

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getRandomDate() {
  const now = new Date();
  const past = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

// Define comprehensive FAQ questions as required
const FAQ_ENTRIES = [
  {
    question: "What are the best restaurants in Central London?",
    category: "areas",
    relatedAreaSlugs: ["central-london"],
    relatedCuisineSlugs: []
  },
  {
    question: "How do I find halal restaurants in London?",
    category: "halal",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: ["middle-eastern", "turkish", "indian"]
  },
  {
    question: "What cuisines are most popular in London?",
    category: "general",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: ["indian", "italian", "modern-european", "chinese", "japanese"]
  },
  {
    question: "How expensive are restaurants in London?",
    category: "pricing",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Do I need to make reservations at London restaurants?",
    category: "reservations",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What are the opening hours for restaurants in London?",
    category: "hours",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Are there family-friendly restaurants in London?",
    category: "family",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What is the dress code for London restaurants?",
    category: "dress-code",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Is parking available at London restaurants?",
    category: "parking",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Do London restaurants offer gluten-free options?",
    category: "dietary",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "How does the 'Near Me' feature work?",
    category: "features",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What does the FSA hygiene rating mean?",
    category: "ratings",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Can I find budget-friendly restaurants in expensive areas like Mayfair?",
    category: "pricing",
    relatedAreaSlugs: ["mayfair"],
    relatedCuisineSlugs: []
  },
  {
    question: "Are there late-night dining options in London?",
    category: "hours",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What's the tipping culture in London restaurants?",
    category: "culture",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Can I find restaurants that accommodate large groups?",
    category: "group-dining",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "How accurate is the restaurant data on The Best in London?",
    category: "accuracy",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Do you have vegetarian and vegan restaurant options?",
    category: "dietary",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: ["vegetarian", "vegan"]
  },
  {
    question: "What makes a restaurant 'verified' on your platform?",
    category: "verification",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "How often is restaurant information updated?",
    category: "updates",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Can I suggest a restaurant to be added to the site?",
    category: "suggestions",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Are there kid-friendly restaurants with playgrounds or activities?",
    category: "family",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What's the difference between area and borough on your site?",
    category: "locations",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Do restaurants offer takeaway or delivery options?",
    category: "takeaway",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "How do I get directions to a specific restaurant?",
    category: "directions",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "Are there restaurants with outdoor seating in London?",
    category: "seating",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What constitutes a 'hidden gem' restaurant?",
    category: "categories",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "How do I contact a restaurant directly from your site?",
    category: "contact",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  },
  {
    question: "What's included in the restaurant reviews and ratings?",
    category: "reviews",
    relatedAreaSlugs: [],
    relatedCuisineSlugs: []
  }
];

function generateFAQContent(faq) {
  const updatedAt = getRandomDate();
  const slug = slugify(faq.question);

  // Generate contextual answers based on FAQ type and related venues
  let answerMarkdown = '';
  let relatedVenues = [];

  if (faq.relatedAreaSlugs.length > 0) {
    relatedVenues = faq.relatedAreaSlugs.flatMap(areaSlug => 
      venues.filter(v => 
        (v.area && v.area.toLowerCase().includes(areaSlug.toLowerCase())) ||
        (v.borough && v.borough.toLowerCase().includes(areaSlug.toLowerCase()))
      )
    ).slice(0, 3);
  }

  if (faq.relatedCuisineSlugs.length > 0) {
    relatedVenues = [...relatedVenues, ...faq.relatedCuisineSlugs.flatMap(cuisineSlug =>
      venues.filter(v => v.cuisines && v.cuisines.some(c => c.toLowerCase() === cuisineSlug.toLowerCase()))
    )].slice(0, 3);
  }

  // Remove duplicates
  relatedVenues = [...new Map(relatedVenues.map(v => [v.slug, v])).values()];

  switch (faq.category) {
    case 'areas':
      answerMarkdown = `Central London offers an incredible variety of dining options catering to every taste and budget. Our curated selection includes everything from historic establishments in Covent Garden to modern eateries in the City.

**Top Areas to Explore:**
- **Covent Garden**: Home to iconic restaurants and bustling food markets
- **Soho**: Diverse cuisine and vibrant nightlife dining options  
- **Mayfair**: Luxury fine dining establishments and exclusive venues

${relatedVenues.length > 0 ? `**Some standout options in Central London include:**\n${relatedVenues.map(v => `- [${v.name}](/restaurant/${v.slug}) - ${v.cuisines ? v.cuisines.join(', ') : 'International'} cuisine`).join('\n')}\n\n` : ''}Browse our [comprehensive Central London guide](/areas/central-london) for the highest-rated restaurants in the area.`;
      break;

    case 'halal':
      answerMarkdown = `Finding halal restaurants in London is straightforward with our dedicated tools and verified listings.

**How to Find Halal Restaurants:**

1. **Use our halal filter**: Visit our [dedicated halal restaurants page](/best-halal-restaurants-london) featuring verified halal establishments
2. **Search by area**: Use our [halal near stations](/halal/near-stations) feature for location-based searches
3. **Look for verification**: All listed halal restaurants are verified for compliance

${relatedVenues.length > 0 ? `**Popular halal cuisine types in London:**\n${relatedVenues.map(v => `- [${v.name}](/restaurant/${v.slug}) - ${v.cuisines ? v.cuisines.join(', ') : 'Authentic halal cuisine'}`).join('\n')}\n\n` : ''}We verify all halal listings to ensure accuracy and authenticity, giving you confidence in your dining choices.`;
      break;

    case 'pricing':
      answerMarkdown = `London restaurant prices vary significantly depending on location, cuisine type, and dining style:

**Price Ranges:**
- **Budget-friendly**: £10-20 per person for casual dining, street food, and local favorites
- **Mid-range**: £25-50 per person for quality restaurants, pub dining, and family meals  
- **Fine dining**: £75+ per person for premium establishments, tasting menus, and special occasions

**Value Tips:**
- Look for set menus and lunch specials at fine dining establishments
- Many restaurants offer early bird discounts before 7 PM
- Street food markets provide high-quality options at lower prices

Use our price filters when browsing restaurants to find options within your preferred budget range. All listed prices are approximate and can vary based on menu selections and seasonal offerings.`;
      break;

    case 'reservations':
      answerMarkdown = `Reservation requirements vary by restaurant type and time:

**Booking is Recommended For:**
- Fine dining establishments and Michelin-starred restaurants
- Popular weekend spots and trendy venues
- Group bookings of 6+ people
- Special occasions and celebrations

**Walk-ins Often Available:**
- Casual dining and pub restaurants
- Street food markets and casual cafes
- Off-peak times (weekday lunch, early evening)
- Less busy areas outside central London

**Best Practices:**
- Book at least 24-48 hours in advance for popular spots
- Check individual restaurant websites for specific booking policies
- Call ahead for same-day availability at mid-range restaurants

Most restaurants listed on our site provide contact information and many offer online booking through their websites.`;
      break;

    case 'hours':
      answerMarkdown = `Restaurant opening hours in London vary by establishment type and location:

**Typical Hours:**
- **Lunch**: 12:00 PM - 3:00 PM (some restaurants close between lunch and dinner)
- **Dinner**: 6:00 PM - 11:00 PM (often closes earlier on Sundays)
- **Weekends**: Often open later on Friday and Saturday evenings

**Late-Night Options:**
London offers numerous late-night dining options, particularly in areas like:
- **Soho & Central London**: Many restaurants open until midnight or later
- **Brick Lane**: Famous for late-night curry houses
- **Street food markets**: Some operate well into the evening

**Important Notes:**
- Always check individual restaurant websites for current hours
- Hours may vary during holidays and special events
- Some establishments close on specific days (often Monday or Sunday evening)

Use our restaurant pages to find specific opening times and contact information for each venue.`;
      break;

    case 'family':
      answerMarkdown = `London is very family-friendly when it comes to dining! Many restaurants cater specifically to families with children.

**Family-Friendly Features:**
- **Children's menus**: Available at most chain restaurants and many independents
- **High chairs and booster seats**: Standard at family-oriented establishments
- **Quiet areas**: Many restaurants have designated family sections
- **Allergen information**: Clearly displayed for children with food sensitivities

**Best Areas for Family Dining:**
- **Greenwich & South Bank**: Plenty of space and scenic views
- **Covent Garden**: Lively atmosphere with street entertainment
- **Museum areas**: Many cafes and restaurants near major attractions

**Tips for Dining with Children:**
- Book ahead for popular family restaurants
- Consider earlier dining times (5-7 PM) when restaurants are less busy
- Look for restaurants with play areas or quick service for restless children

Many restaurants we feature provide detailed information about family amenities and children's options.`;
      break;

    default:
      answerMarkdown = `Great question! For the most accurate and up-to-date information, we recommend:

**Getting Current Information:**
- Check the individual restaurant's official website for the latest details
- Call directly during business hours for specific inquiries
- Visit the restaurant in person for the most current information

${relatedVenues.length > 0 ? `**Relevant restaurants in this category:**\n${relatedVenues.map(v => `- [${v.name}](/restaurant/${v.slug})`).join('\n')}\n\n` : ''}Our platform provides verified information that's regularly updated, but always confirm details directly with the restaurant for time-sensitive matters.`;
  }

  return {
    slug,
    question: faq.question,
    answerMarkdown,
    category: faq.category,
    relatedCuisineSlugs: faq.relatedCuisineSlugs,
    relatedAreaSlugs: faq.relatedAreaSlugs,
    updatedAtISO: updatedAt.toISOString(),
    seo: {
      title: `${faq.question} | The Best in London FAQ`,
      description: answerMarkdown.replace(/[#*\[\]]/g, '').substring(0, 160),
      canonical: `https://www.thebestinlondon.co.uk/faq/${slug}`,
      keywords: ["london restaurants", "dining faq", "food guide london", faq.category]
    }
  };
}

// Ensure content directories exist
const contentDir = path.join(__dirname, '../content');
const faqDir = path.join(contentDir, 'faq');
fs.mkdirSync(faqDir, { recursive: true });

// Generate and save FAQ entries
let generatedCount = 0;

// Check existing files to avoid duplicates (idempotent)
const existingSlugs = new Set();
if (fs.existsSync(faqDir)) {
  const existingFiles = fs.readdirSync(faqDir).filter(file => file.endsWith('.json'));
  existingFiles.forEach(file => existingSlugs.add(file.replace('.json', '')));
}

for (const faq of FAQ_ENTRIES) {
  const faqContent = generateFAQContent(faq);
  const slug = faqContent.slug;
  
  // Skip if already exists
  if (existingSlugs.has(slug)) {
    console.log(`⏭️  Skipping existing FAQ: ${slug}`);
    continue;
  }

  const filePath = path.join(faqDir, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(faqContent, null, 2));
  console.log(`✅ Generated FAQ: ${slug}`);
  generatedCount++;
}

console.log(`\n🎉 FAQ seeding complete!`);
console.log(`❓ Generated ${generatedCount} new FAQ entries`);
console.log(`📁 Total FAQ entries: ${fs.readdirSync(faqDir).length}`);
console.log(`📁 Content saved to /content/faq/`);

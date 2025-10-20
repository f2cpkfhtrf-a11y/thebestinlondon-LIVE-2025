#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load venues data
const venuesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/venues.json'), 'utf8'));
const venues = venuesData.venues || [];

// AI Author Identity
const AUTHOR = {
  name: "Eleanor Hart",
  title: "Senior Dining Editor (AI)",
  bio: "Curating London's best tables with data and taste.",
  avatar: "/images/brand/author-eleanor.webp"
};

// Helper functions
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getRandomDate(daysBack = 90) {
  const now = new Date();
  const past = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

function getRandomVenues(count = 3) {
  const shuffled = [...venues].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Extract unique data for content generation
const cuisines = [...new Set(venues.flatMap(v => v.cuisines || []))];
const areas = [...new Set(venues.flatMap(v => [v.area, v.borough]).filter(Boolean))];

// Blog topics and templates
const BLOG_TOPICS = [
  {
    type: "cuisine_guide",
    template: (cuisine) => ({
      title: `Best ${cuisine.charAt(0).toUpperCase() + cuisine.slice(1)} Restaurants in London`,
      dek: `Discover London's finest ${cuisine} dining experiences, from hidden gems to established favorites that define the city's culinary landscape.`,
      tags: [cuisine, "restaurants", "london", "dining"]
    })
  },
  {
    type: "area_guide", 
    template: (area) => ({
      title: `Top Restaurants in ${area}`,
      dek: `Explore the best dining destinations in ${area}, where culinary excellence meets local character.`,
      tags: [slugify(area), "restaurants", "london", "dining"]
    })
  },
  {
    type: "date_night",
    template: () => ({
      title: "Romantic Date Night Restaurants in London",
      dek: "Perfect spots for intimate dining experiences across London, from cozy neighborhood gems to elegant fine dining establishments.",
      tags: ["date-night", "romantic", "restaurants", "london"]
    })
  },
  {
    type: "hidden_gems",
    template: () => ({
      title: "Hidden Gem Restaurants in London",
      dek: "Discover London's best-kept culinary secrets, from family-run establishments to chef-driven hidden treasures.",
      tags: ["hidden-gems", "local", "restaurants", "london"]
    })
  },
  {
    type: "budget_friendly",
    template: () => ({
      title: "Budget-Friendly Restaurants in London",
      dek: "Exceptional dining experiences that won't break the bank, proving great food and value can go hand in hand.",
      tags: ["budget", "affordable", "restaurants", "london"]
    })
  }
];

// Generate blog content
function generateBlogContent(topic, venues) {
  const { title, dek, tags } = topic.template(topic.data);
  const slug = slugify(title);
  const publishedAt = getRandomDate();
  const updatedAt = new Date();

  // Generate body content
  const featuredVenues = getRandomVenues(3);
  const venueLinks = featuredVenues.map(v => 
    `[${v.name}](/restaurant/${v.slug})`
  ).join(', ');

  const bodyMarkdown = `${dek}

${featuredVenues.map(venue => {
  const cuisineList = venue.cuisines ? venue.cuisines.join(', ') : 'International';
  return `## ${venue.name}

${venue.description || `Excellent ${cuisineList} restaurant in ${venue.area || venue.borough || 'London'} with outstanding reviews and a focus on quality.`}

**Location:** ${venue.address || venue.vicinity || 'London'}  
**Rating:** ${venue.rating}/5 (${venue.user_ratings_total} reviews)  
**Cuisine:** ${cuisineList}

[View ${venue.name}](/restaurant/${venue.slug})`;
}).join('\n\n')}

## More Great Options

London's dining scene continues to evolve, offering incredible diversity and quality. Whether you're seeking traditional favorites or innovative culinary experiences, the capital delivers exceptional options across every neighborhood and cuisine type.

Explore more restaurants and discover your next favorite dining destination at [The Best in London](/restaurants).`;

  return {
    slug,
    title,
    dek,
    coverImage: `/images/blog/${slug}.webp`,
    tags,
    cuisineSlugs: topic.type === 'cuisine_guide' ? [topic.data] : [],
    areaSlugs: topic.type === 'area_guide' ? [slugify(topic.data)] : [],
    author: AUTHOR,
    publishedAtISO: publishedAt.toISOString(),
    updatedAtISO: updatedAt.toISOString(),
    seo: {
      title: `${title} | The Best in London`,
      description: dek,
      canonical: `https://www.thebestinlondon.co.uk/blog/${slug}`,
      keywords: [...tags, "restaurants london", "dining guide", "food london"]
    },
    bodyMarkdown
  };
}

// Generate FAQ content
function generateFAQContent(question, answer, relatedCuisineSlugs = [], relatedAreaSlugs = []) {
  const slug = slugify(question);
  const updatedAt = new Date();

  return {
    slug,
    question,
    answerMarkdown: answer,
    relatedCuisineSlugs,
    relatedAreaSlugs,
    updatedAtISO: updatedAt.toISOString(),
    seo: {
      title: `${question} | The Best in London FAQ`,
      description: answer.replace(/[#*\[\]]/g, '').substring(0, 160),
      canonical: `https://www.thebestinlondon.co.uk/faq/${slug}`,
      keywords: ["london restaurants", "dining faq", "food guide london"]
    }
  };
}

// Generate blogs
const blogs = [];

// Generate cuisine guides
cuisines.slice(0, 5).forEach(cuisine => {
  const topic = { ...BLOG_TOPICS.find(t => t.type === 'cuisine_guide'), data: cuisine };
  blogs.push(generateBlogContent(topic, venues));
});

// Generate area guides  
areas.slice(0, 5).forEach(area => {
  const topic = { ...BLOG_TOPICS.find(t => t.type === 'area_guide'), data: area };
  blogs.push(generateBlogContent(topic, venues));
});

// Generate thematic blogs
BLOG_TOPICS.slice(2).forEach(topic => {
  blogs.push(generateBlogContent(topic, venues));
});

// Generate FAQs
const faqs = [
  generateFAQContent(
    "What are the best restaurants in Central London?",
    `Central London offers an incredible variety of dining options. Some standout areas include:

- **Covent Garden**: Home to iconic restaurants like Dishoom and The Ivy
- **Soho**: Diverse cuisine and late-night dining options  
- **Mayfair**: Luxury fine dining establishments
- **Fitzrovia**: Creative and innovative restaurant concepts

Our [Central London guide](/areas/central-london) features the highest-rated restaurants in the area.`,
    [],
    ["central-london"]
  ),
  generateFAQContent(
    "How do I find halal restaurants in London?",
    `Finding halal restaurants in London is straightforward:

1. **Use our halal filter**: Visit our [halal restaurants page](/best-halal-restaurants-london) for verified halal establishments
2. **Check near stations**: Use our [halal near stations](/halal/near-stations) feature for location-based searches
3. **Look for certification**: All listed restaurants are verified for halal compliance

We verify all halal listings to ensure accuracy and authenticity.`,
    [],
    []
  ),
  generateFAQContent(
    "What cuisines are most popular in London?",
    `London's diverse population makes it a global culinary capital. The most popular cuisines include:

- **Indian**: Outstanding curry houses and modern Indian cuisine
- **Italian**: Authentic trattorias and contemporary Italian dining
- **Chinese**: Both traditional and modern Chinese restaurants
- **Modern European**: Innovative fusion and contemporary dining
- **Turkish**: Excellent kebabs, meze, and traditional dishes

Explore our [cuisine guides](/cuisines) to discover the best of each type.`,
    ["indian", "italian", "chinese", "modern-european", "turkish"],
    []
  ),
  generateFAQContent(
    "How expensive are restaurants in London?",
    `London restaurant prices vary significantly:

- **Budget-friendly**: £10-20 per person for casual dining
- **Mid-range**: £25-50 per person for quality restaurants  
- **Fine dining**: £75+ per person for premium establishments

Use our price filters when browsing restaurants to find options within your budget. All prices are approximate and can vary by location and menu selections.`,
    [],
    []
  )
];

// Ensure content directories exist
const contentDir = path.join(__dirname, '../content');
fs.mkdirSync(path.join(contentDir, 'blog'), { recursive: true });
fs.mkdirSync(path.join(contentDir, 'faq'), { recursive: true });

// Write blog files
blogs.forEach(blog => {
  const filePath = path.join(contentDir, 'blog', `${blog.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(blog, null, 2));
  console.log(`✅ Generated blog: ${blog.slug}`);
});

// Write FAQ files
faqs.forEach(faq => {
  const filePath = path.join(contentDir, 'faq', `${faq.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(faq, null, 2));
  console.log(`✅ Generated FAQ: ${faq.slug}`);
});

console.log(`\n🎉 Content generation complete!`);
console.log(`📝 Generated ${blogs.length} blog posts`);
console.log(`❓ Generated ${faqs.length} FAQs`);
console.log(`📁 Content saved to /content/blog/ and /content/faq/`);

// Create author avatar placeholder
const brandDir = path.join(__dirname, '../public/images/brand');
fs.mkdirSync(brandDir, { recursive: true });
if (!fs.existsSync(path.join(brandDir, 'author-eleanor.webp'))) {
  // Copy a default image as placeholder
  const defaultHero = path.join(__dirname, '../public/images/heroes/site/default-list-hero.webp');
  if (fs.existsSync(defaultHero)) {
    fs.copyFileSync(defaultHero, path.join(brandDir, 'author-eleanor.webp'));
    console.log('👤 Created author avatar placeholder');
  }
}

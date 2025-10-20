#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load venues data for content generation
const venuesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/venues.json'), 'utf8'));
const venues = venuesData.venues || [];

// AI Author Identity for Phase 2
const AUTHOR = {
  name: "Ava Beckett",
  title: "Food & City Editor",
  bio: "Exploring London's culinary landscape with an editor's eye for detail and a diner's passion for discovery.",
  avatar: "/images/brand/author-ava.webp"
};

// Helper functions
function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getRandomDate(daysBack = 45) {
  const now = new Date();
  const past = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}

function getVenuesByArea(areaName) {
  return venues.filter(v => 
    (v.area && v.area.toLowerCase().includes(areaName.toLowerCase())) ||
    (v.borough && v.borough.toLowerCase().includes(areaName.toLowerCase()))
  );
}

function getVenuesByCuisine(cuisineSlug) {
  return venues.filter(v => 
    v.cuisines && v.cuisines.some(c => c.toLowerCase() === cuisineSlug.toLowerCase())
  );
}

function formatReadingTime(wordCount) {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Define specific blog posts as required
const BLOG_POSTS = [
  {
    slug: "kebab-shoreditch-guide",
    title: "The Ultimate Kebab Guide to Shoreditch: From Late-Night Classics to Gourmet Takes",
    dek: "Discover the best kebabs in Shoreditch, from traditional doner to modern fusion creations that define London's most creative dining scene.",
    tags: ["kebab", "shoreditch", "street-food", "london"],
    areaSlugs: ["shoreditch"],
    cuisineSlugs: ["turkish", "middle-eastern"]
  },
  {
    slug: "best-indian-in-redbridge",
    title: "Best Indian Restaurants in Redbridge: Curries, Karahis & Community Favorites",
    dek: "From family-run curry houses to contemporary Indian cuisine, discover Redbridge's most beloved Indian restaurants serving authentic flavors and warm hospitality.",
    tags: ["indian", "redbridge", "curry", "family-dining"],
    areaSlugs: ["redbridge"],
    cuisineSlugs: ["indian"]
  },
  {
    slug: "brunch-soho-2025",
    title: "Soho Brunch Guide 2025: The Hottest Spots for Weekend Mornings",
    dek: "Your definitive guide to the best brunch spots in Soho, from bottomless prosecco to artisanal coffee and Instagram-worthy pancakes.",
    tags: ["brunch", "soho", "weekend", "coffee"],
    areaSlugs: ["soho"],
    cuisineSlugs: ["modern-european", "british"]
  },
  {
    slug: "family-friendly-central-london",
    title: "Family-Friendly Restaurants in Central London: Where Kids and Adults Both Win",
    dek: "Discover Central London's best family dining spots where children's menus meet gourmet cuisine, ensuring memorable meals for all ages.",
    tags: ["family-friendly", "central-london", "kids-menu", "dining"],
    areaSlugs: ["central-london"],
    cuisineSlugs: []
  },
  {
    slug: "halal-street-food-london",
    title: "London's Best Halal Street Food: From Borough Market to Canary Wharf",
    dek: "Explore London's thriving halal street food scene, featuring authentic flavors, innovative fusion, and convenient locations across the capital.",
    tags: ["halal", "street-food", "london", "authentic"],
    areaSlugs: [],
    cuisineSlugs: ["middle-eastern", "turkish", "indian"]
  },
  {
    slug: "michelin-london-shortlist",
    title: "London's Michelin-Starred Restaurants: The Complete Guide for 2025",
    dek: "Discover London's culinary crown jewels with our comprehensive guide to Michelin-starred dining, from fresh additions to established legends.",
    tags: ["michelin", "fine-dining", "london", "restaurants"],
    areaSlugs: [],
    cuisineSlugs: ["modern-european", "french", "british"]
  },
  {
    slug: "pizza-east-london",
    title: "Best Pizza in East London: From Traditional Neapolitan to Creative Toppings",
    dek: "East London's pizza scene has never been stronger. Discover the best pizzerias from Dalston to Canary Wharf, serving everything from classic Margherita to innovative local flavors.",
    tags: ["pizza", "east-london", "italian", "wood-fired"],
    areaSlugs: ["hackney", "tower-hamlets"],
    cuisineSlugs: ["italian"]
  },
  {
    slug: "ramen-hunt-london",
    title: "The London Ramen Hunt: Finding the Perfect Bowl in the Capital",
    dek: "From traditional tonkotsu to modern fusion bowls, discover London's best ramen spots that rival anything found in Tokyo's noodle alleys.",
    tags: ["ramen", "japanese", "noodles", "london"],
    areaSlugs: [],
    cuisineSlugs: ["japanese"]
  },
  {
    slug: "vegan-date-night",
    title: "Vegan Date Night Restaurants in London: Romantic Plant-Based Dining",
    dek: "Elevate your date night with London's finest vegan restaurants, where plant-based cuisine meets intimate atmospheres and exceptional service.",
    tags: ["vegan", "date-night", "romantic", "plant-based"],
    areaSlugs: [],
    cuisineSlugs: ["vegan", "modern-european"]
  },
  {
    slug: "seafood-by-the-river",
    title: "Best Seafood Restaurants by the River: Thames Views & Fresh Catches",
    dek: "Dine with a view at London's finest seafood restaurants along the Thames, where fresh catches meet spectacular riverside locations.",
    tags: ["seafood", "river", "thames", "views"],
    areaSlugs: ["southwark", "tower-hamlets"],
    cuisineSlugs: ["seafood"]
  },
  {
    slug: "steak-london-under-30",
    title: "Best Steaks in London Under £30: Quality Cuts Without Breaking the Bank",
    dek: "Discover London's best value steakhouses where quality meets affordability, proving that exceptional steak doesn't always come with premium prices.",
    tags: ["steak", "affordable", "value", "beef"],
    areaSlugs: [],
    cuisineSlugs: ["steakhouse", "british"]
  },
  {
    slug: "borough-market-eats",
    title: "Borough Market Eats: The Ultimate Guide to London's Iconic Food Market",
    dek: "Navigate Borough Market like a local with our guide to the best stalls, restaurants, and hidden gems within London's most famous food destination.",
    tags: ["borough-market", "street-food", "market", "southwark"],
    areaSlugs: ["southwark"],
    cuisineSlugs: []
  },
  {
    slug: "coffee-near-liverpool-street",
    title: "Best Coffee Near Liverpool Street: Artisanal Roasts in the City",
    dek: "Fuel your City break with the best coffee shops around Liverpool Street, from third-wave roasters to traditional Italian espresso bars.",
    tags: ["coffee", "liverpool-street", "city", "specialty"],
    areaSlugs: ["central-london"],
    cuisineSlugs: []
  },
  {
    slug: "late-night-meals-london",
    title: "Late Night Eats in London: Where to Dine After Dark",
    dek: "Discover London's best late-night dining spots, from 24-hour curry houses to midnight ramen bars keeping the city fed around the clock.",
    tags: ["late-night", "dining", "london", "24-hour"],
    areaSlugs: [],
    cuisineSlugs: []
  },
  {
    slug: "winter-warmers-curry-edit",
    title: "Winter Warmers: London's Best Curry Houses for Cold Weather Comfort",
    dek: "Warm up this winter with London's most comforting curry houses, featuring rich spices, hearty portions, and cozy atmospheres perfect for cold nights.",
    tags: ["winter", "curry", "comfort-food", "spicy"],
    areaSlugs: [],
    cuisineSlugs: ["indian", "bangladeshi", "pakistani"]
  }
];

function generateBlogContent(post) {
  const publishedAt = getRandomDate();
  const updatedAt = new Date();
  const readingTime = formatReadingTime(800 + Math.random() * 400); // 800-1200 words

  // Get relevant venues for content
  let relevantVenues = [];
  if (post.areaSlugs.length > 0) {
    relevantVenues = post.areaSlugs.flatMap(areaSlug => getVenuesByArea(areaSlug));
  }
  if (post.cuisineSlugs.length > 0) {
    relevantVenues = [...relevantVenues, ...post.cuisineSlugs.flatMap(cuisineSlug => getVenuesByCuisine(cuisineSlug))];
  }
  
  // Remove duplicates and pick top 3-4
  relevantVenues = [...new Map(relevantVenues.map(v => [v.slug, v])).values()].slice(0, 4);

  // Generate content sections
  const introSection = `${post.dek}

London's dining scene continues to evolve, and ${post.title.toLowerCase().includes('best') ? 'these standout venues' : 'this guide covers the essential spots'} showcase exactly why the capital remains one of the world's premier culinary destinations.`;

  const venueSections = relevantVenues.map(venue => {
    const cuisineList = venue.cuisines ? venue.cuisines.join(', ') : 'International';
    return `## ${venue.name}

${venue.description || `Outstanding ${cuisineList} restaurant${venue.rating ? ` with a ${venue.rating}-star rating` : ''} that has become a local favorite.`} Located in ${venue.area || venue.borough || 'London'}, this ${venue.price_level ? `£${'£'.repeat(venue.price_level)} price point` : 'affordable'} establishment offers ${cuisineList.toLowerCase()} cuisine in a ${venue.user_ratings_total > 100 ? 'popular,' : ''} welcoming setting.

**Why It Stands Out:** ${venue.description ? venue.description.substring(0, 100) + '...' : `Excellent ${cuisineList} cuisine with${venue.rating > 4 ? ' outstanding' : ' solid'} ratings and authentic flavors.`}

[Discover ${venue.name}](/restaurant/${venue.slug})`;
  }).join('\n\n');

  const conclusionSection = `## Final Thoughts

Whether you're a local looking for new favorites or a visitor eager to experience London's diverse culinary landscape, ${post.title.toLowerCase().includes('best') ? 'these recommendations' : 'this guide'} provide a solid foundation for memorable dining experiences. Each venue has been selected for its combination of quality, authenticity, and that special something that makes London's restaurant scene truly world-class.

## Explore More

Ready to discover more great restaurants? Check out our [complete restaurant guide](/restaurants) or explore specific cuisines and areas. For the latest restaurant recommendations and dining insights, browse our [full blog archive](/blog).`;

  const bodyMarkdown = `${introSection}

${venueSections}

${conclusionSection}`;

  return {
    slug: post.slug,
    title: post.title,
    dek: post.dek,
    coverImage: `/images/blog/${post.slug}.webp`,
    tags: post.tags,
    cuisineSlugs: post.cuisineSlugs,
    areaSlugs: post.areaSlugs,
    author: AUTHOR,
    publishedAtISO: publishedAt.toISOString(),
    updatedAtISO: updatedAt.toISOString(),
    readingTime,
    seo: {
      title: `${post.title} | The Best in London Blog`,
      description: post.dek,
      canonical: `https://www.thebestinlondon.co.uk/blog/${post.slug}`,
      keywords: [...post.tags, "london restaurants", "dining guide", "food blog london"]
    },
    bodyMarkdown
  };
}

// Ensure content directories exist
const contentDir = path.join(__dirname, '../content');
const blogDir = path.join(contentDir, 'blog');
fs.mkdirSync(blogDir, { recursive: true });

// Generate and save blog posts
let generatedCount = 0;
const existingSlugs = new Set();

// Check existing files to avoid duplicates (idempotent)
if (fs.existsSync(blogDir)) {
  const existingFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
  existingFiles.forEach(file => existingSlugs.add(file.replace('.json', '')));
}

for (const post of BLOG_POSTS) {
  // Skip if already exists (idempotent)
  if (existingSlugs.has(post.slug)) {
    console.log(`⏭️  Skipping existing blog: ${post.slug}`);
    continue;
  }

  const filePath = path.join(blogDir, `${post.slug}.json`);
  const blogContent = generateBlogContent(post);
  fs.writeFileSync(filePath, JSON.stringify(blogContent, null, 2));
  console.log(`✅ Generated blog: ${post.slug}`);
  generatedCount++;
}

console.log(`\n🎉 Blog seeding complete!`);
console.log(`📝 Generated ${generatedCount} new blog posts`);
console.log(`📁 Total blog posts: ${fs.readdirSync(blogDir).length}`);
console.log(`📁 Content saved to /content/blog/`);

// Create author avatar placeholder if needed
const brandDir = path.join(__dirname, '../public/images/brand');
fs.mkdirSync(brandDir, { recursive: true });
const authorAvatarPath = path.join(brandDir, 'author-ava.webp');
if (!fs.existsSync(authorAvatarPath)) {
  const defaultHero = path.join(__dirname, '../public/images/heroes/site/default-list-hero.webp');
  if (fs.existsSync(defaultHero)) {
    fs.copyFileSync(defaultHero, authorAvatarPath);
    console.log('👤 Created author avatar placeholder');
  }
}

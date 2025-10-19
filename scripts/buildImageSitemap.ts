import fs from 'fs';
import path from 'path';

interface ImageEntry {
  loc: string;
  imageLoc: string;
  imageCaption?: string;
  imageTitle?: string;
}

interface Venue {
  slug: string;
  name: string;
  image_hero_path?: string;
  image_card_path?: string;
  photos?: string[];
}

async function getVenueData(): Promise<{ venues: Venue[] }> {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load venues.json:', error);
    return { venues: [] };
  }
}

function isLocalImage(url: string): boolean {
  return !url || (!url.startsWith('http') && !url.startsWith('//'));
}

function normalizeImagePath(imgPath: string): string {
  if (!imgPath) return '';
  
  // Remove leading /public if present
  let cleanPath = imgPath.replace(/^\/public/, '');
  
  // Ensure it starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Convert to absolute URL
  return `https://www.thebestinlondon.co.uk${cleanPath}`;
}

function collectVenueImages(venue: Venue): string[] {
  const images: string[] = [];
  
  // Add hero image
  if (venue.image_hero_path && isLocalImage(venue.image_hero_path)) {
    images.push(venue.image_hero_path);
  }
  
  // Add card image
  if (venue.image_card_path && isLocalImage(venue.image_card_path)) {
    images.push(venue.image_card_path);
  }
  
  // Add up to 2 additional photos if they exist and are local
  if (venue.photos && Array.isArray(venue.photos)) {
    const localPhotos = venue.photos
      .filter(isLocalImage)
      .slice(0, 2);
    images.push(...localPhotos);
  }
  
  return Array.from(new Set(images)); // Remove duplicates
}

function generateImageUrlset(): ImageEntry[] {
  const entries: ImageEntry[] = [];
  
  // Add static page images
  const staticPages = [
    { url: '/', images: ['/images/heroes/site/home-hero.webp'] },
    { url: '/restaurants', images: ['/images/heroes/site/default-list-hero.webp'] },
    { url: '/areas', images: ['/images/heroes/site/default-area.webp'] },
    { url: '/cuisines', images: ['/images/heroes/site/default-cuisine.webp'] },
    { url: '/best-halal-restaurants-london', images: ['/images/halal/halal-default-hero.webp'] }
  ];
  
  for (const page of staticPages) {
    for (const imagePath of page.images) {
      entries.push({
        loc: `https://www.thebestinlondon.co.uk${page.url}`,
        imageLoc: normalizeImagePath(imagePath)
      });
    }
  }
  
  return entries;
}

async function generateVenueImageEntries(): Promise<ImageEntry[]> {
  const { venues } = await getVenueData();
  const entries: ImageEntry[] = [];
  
  for (const venue of venues) {
    const images = collectVenueImages(venue);
    const pageUrl = `https://www.thebestinlondon.co.uk/restaurant/${venue.slug}`;
    
    for (const imagePath of images.slice(0, 3)) { // Limit to top 3 images
      entries.push({
        loc: pageUrl,
        imageLoc: normalizeImagePath(imagePath),
        imageCaption: `${venue.name} - Restaurant in London`,
        imageTitle: venue.name
      });
    }
  }
  
  return entries;
}

function generateSitemapXml(entries: ImageEntry[]): string {
  const urlsetStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;
  
  const urlsetEnd = `</urlset>`;
  
  // Group entries by URL
  const grouped = entries.reduce((acc, entry) => {
    if (!acc[entry.loc]) {
      acc[entry.loc] = [];
    }
    acc[entry.loc].push(entry);
    return acc;
  }, {} as Record<string, ImageEntry[]>);
  
  const urlEntries = Object.entries(grouped).map(([url, imageEntries]) => {
    const imageElements = imageEntries.map(img => {
      let xml = `    <image:image>
      <image:loc>${img.imageLoc}</image:loc>`;
      
      if (img.imageTitle) {
        xml += `
      <image:title><![CDATA[${img.imageTitle}]]></image:title>`;
      }
      
      if (img.imageCaption) {
        xml += `
      <image:caption><![CDATA[${img.imageCaption}]]></image:caption>`;
      }
      
      xml += `
    </image:image>`;
      return xml;
    }).join('\n');
    
    return `  <url>
    <loc>${url}</loc>
${imageElements}
  </url>`;
  }).join('\n');
  
  return urlsetStart + urlEntries + '\n' + urlsetEnd;
}

async function buildImageSitemap(): Promise<void> {
  console.log('🗺️  Building image sitemap...');
  
  try {
    // Generate static page entries
    const staticEntries = generateImageUrlset();
    console.log(`✅ Generated ${staticEntries.length} static page image entries`);
    
    // Generate venue entries
    const venueEntries = await generateVenueImageEntries();
    console.log(`✅ Generated ${venueEntries.length} venue image entries`);
    
    // Combine and generate XML
    const allEntries = [...staticEntries, ...venueEntries];
    const sitemapXml = generateSitemapXml(allEntries);
    
    // Write to public directory
    const outputPath = path.join(process.cwd(), 'public/image-sitemap.xml');
    fs.writeFileSync(outputPath, sitemapXml, 'utf8');
    
    console.log(`✅ Image sitemap written: ${outputPath}`);
    console.log(`📊 Total entries: ${allEntries.length}`);
    
  } catch (error) {
    console.error('❌ Failed to build image sitemap:', error);
    process.exit(1);
  }
}

// Run the sitemap generation
buildImageSitemap().catch(console.error);

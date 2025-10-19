import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

interface ColorMap {
  [relativePath: string]: string;
}

const COLOR_META_DIR = path.join(process.cwd(), 'public/images/_meta');
const COLOR_META_FILE = path.join(COLOR_META_DIR, 'colors.json');

function ensureMetaDir(): void {
  if (!fs.existsSync(COLOR_META_DIR)) {
    fs.mkdirSync(COLOR_META_DIR, { recursive: true });
  }
}

function loadColorMap(): ColorMap {
  try {
    if (!fs.existsSync(COLOR_META_FILE)) {
      return {};
    }
    const content = fs.readFileSync(COLOR_META_FILE, 'utf8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function saveColorMap(colorMap: ColorMap): void {
  ensureMetaDir();
  fs.writeFileSync(COLOR_META_FILE, JSON.stringify(colorMap, null, 2));
}

function extractDominantColor(imageBuffer: Buffer): Promise<string> {
  return new Promise((resolve) => {
    sharp(imageBuffer)
      .resize(1, 1)
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data }) => {
        // Convert RGB to hex
        const r = data[0];
        const g = data[1];
        const b = data[2];
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
        resolve(hex);
      })
      .catch(() => resolve('#1E1B18')); // Fallback dark color
  });
}

function generateBlurImage(inputPath: string, outputPath: string): Promise<boolean> {
  return new Promise((resolve) => {
    sharp(inputPath)
      .resize(32, 32, { fit: 'cover' })
      .webp({ quality: 85 }) // Adjust quality to keep under 6KB
      .toBuffer()
      .then((buffer) => {
        // Check if file would be under 6KB
        if (buffer.length <= 6 * 1024) {
          fs.writeFileSync(outputPath, buffer);
          resolve(true);
        } else {
          // Reduce quality further
          sharp(inputPath)
            .resize(32, 32, { fit: 'cover' })
            .webp({ quality: 70 })
            .toBuffer()
            .then((reducedBuffer) => {
              fs.writeFileSync(outputPath, reducedBuffer);
              resolve(true);
            })
            .catch(() => resolve(false));
        }
      })
      .catch(() => resolve(false));
  });
}

async function processImageFile(filePath: string, relativePath: string, colorMap: ColorMap): Promise<void> {
  const fileStats = fs.statSync(filePath);
  if (fileStats.size < 50 * 1024) {
    return; // Skip files under 50KB
  }

  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, '.webp');
  const blurPath = path.join(dir, `${basename}.blur.webp`);

  // Skip if blur file already exists
  if (fs.existsSync(blurPath)) {
    const blurStats = fs.statSync(blurPath);
    if (blurStats.size <= 6 * 1024) {
      console.log(`✅ Blur exists: ${relativePath}`);
    }
  } else {
    // Generate blur image
    console.log(`🔧 Generating blur: ${relativePath}`);
    const success = await generateBlurImage(filePath, blurPath);
    if (success) {
      console.log(`✅ Created: ${basename}.blur.webp`);
    }
  }

  // Extract dominant color if not already in map
  if (!colorMap[relativePath]) {
    try {
      const imageBuffer = fs.readFileSync(filePath);
      const dominantColor = await extractDominantColor(imageBuffer);
      colorMap[relativePath] = dominantColor;
      console.log(`🎨 Color: ${relativePath} → ${dominantColor}`);
    } catch (error) {
      colorMap[relativePath] = '#1E1B18'; // Fallback
    }
  }
}

async function scanDirectory(dir: string, baseDir: string, colorMap: ColorMap): Promise<void> {
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        await scanDirectory(fullPath, baseDir, colorMap);
      } else if (item.endsWith('.webp') && !item.includes('.blur.')) {
        const relativePath = path.relative(baseDir, fullPath);
        await processImageFile(fullPath, relativePath, colorMap);
      }
    }
  } catch (error) {
    console.warn(`Skipping directory ${dir}:`, error);
  }
}

async function generateLqip(): Promise<void> {
  console.log('🎨 Starting LQIP and dominant color generation...\n');
  
  const imageDirs = [
    path.join(process.cwd(), 'public/images/restaurants'),
    path.join(process.cwd(), 'public/images/areas'),
    path.join(process.cwd(), 'public/images/cuisines'),
    path.join(process.cwd(), 'public/images/halal'),
    path.join(process.cwd(), 'public/images/heroes'),
    path.join(process.cwd(), 'public/images/site')
  ];
  
  const colorMap = loadColorMap();
  let processedCount = 0;
  
  for (const imageDir of imageDirs) {
    if (fs.existsSync(imageDir)) {
      console.log(`📁 Processing: ${path.relative(process.cwd(), imageDir)}`);
      await scanDirectory(imageDir, path.join(process.cwd(), 'public'), colorMap);
      processedCount++;
    }
  }
  
  // Save updated color map
  saveColorMap(colorMap);
  
  console.log(`\n✅ LQIP generation complete!`);
  console.log(`📊 Processed ${Object.keys(colorMap).length} images`);
  console.log(`🎨 Color map saved to: ${COLOR_META_FILE}`);
  
  if (processedCount === 0) {
    console.log('ℹ️  No image directories found to process');
  }
}

// Run the generation
generateLqip().catch((error) => {
  console.error('❌ LQIP generation failed:', error);
  process.exit(1);
});

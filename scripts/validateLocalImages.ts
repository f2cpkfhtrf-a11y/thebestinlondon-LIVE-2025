import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "public/images");
let invalid: string[] = [];

function scan(dir: string): void {
  try {
    for (const file of fs.readdirSync(dir)) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      
      if (stat.isDirectory()) {
        scan(full);
      } else if (full.endsWith('.webp') || full.endsWith('.jpg') || full.endsWith('.jpeg') || full.endsWith('.png')) {
        // Check file size - must be at least 50KB for quality validation
        if (stat.size < 50 * 1024) {
          invalid.push(full.replace(process.cwd(), ''));
        }
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not scan directory ${dir}: ${error}`);
  }
}

// Ensure the images directory exists
if (!fs.existsSync(root)) {
  console.error("❌ Images directory not found:", root);
  process.exit(1);
}

console.log("🔍 Scanning for image quality validation...");
scan(root);

if (invalid.length > 0) {
  console.warn("⚠️ Found low-quality or placeholder images (<50KB):");
  invalid.forEach(file => console.warn(`  - ${file}`));
  console.warn(`\nTotal invalid images: ${invalid.length}`);
  process.exitCode = 1;
} else {
  console.log("✅ All local images validated (>50KB).");
}

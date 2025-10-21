import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENUES = path.join(__dirname, "../public/venues.json");
const REPORT = path.join(__dirname, "../reports/about_verify.json");

try {
  const raw = JSON.parse(fs.readFileSync(VENUES, "utf8"));
  const venues = Array.isArray(raw) ? raw : (raw.venues || []);
  const misses = [];
  
  for (const v of venues) {
    if (!v?.about?.text || v.about.text.length < 60) {
      misses.push({ slug: v.slug, name: v.name });
    }
  }
  
  const out = { 
    total: venues.length, 
    missing: misses.length, 
    examples: misses.slice(0, 20),
    generatedAt: new Date().toISOString()
  };
  
  if (!fs.existsSync(path.dirname(REPORT))) {
    fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  }
  fs.writeFileSync(REPORT, JSON.stringify(out, null, 2));
  console.log("About verify:", out);
} catch (error) {
  console.error("About verification failed:", error.message);
  process.exit(1);
}

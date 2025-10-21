/**
 * scripts/enrichAbout.mjs
 * Build tasteful, accurate "about" blurbs for venues.
 * Sources (free-first): existing fields in venues.json (name, cuisines, price_range, area/borough, highlights, signature_dishes, halal flags, rating, review_count, fsa_rating),
 * then OPTIONAL Browse.AI enrichment if BROWSEAI_ENABLE=1 and key present (never hard-fail).
 * Non-destructive: backs up venues.json and only writes 'about' fields + metadata.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VENUES = path.join(__dirname, "../public/venues.json");
const OUT_BACKUP = path.join(__dirname, "../reports/venues_backup_before_about.json");
const REPORT = path.join(__dirname, "../reports/about_enrichment_report.json");

const BROWSEAI_ENABLE = process.env.BROWSEAI_ENABLE === "1";
const BROWSEAI_API_KEY = process.env.BROWSEAI_API_KEY || "";

// Lightweight, on-device "style engine" (no AI call by default)
function tonePack(venue) {
  const isHalal = (Array.isArray(venue?.dietary_tags) && venue.dietary_tags.includes('halal')) || 
                 (typeof venue?.dietary_tags === 'object' && venue.dietary_tags?.halal) || 
                 venue?.halal_verified;
  const cuisine = (venue?.cuisines?.[0] || "").toLowerCase();
  const area = venue?.area || venue?.borough || "London";
  const price = venue?.price_range ? venue.price_range.replace(/GBP|\£/gi,"").trim() : "";
  const rating = venue?.rating ? Number(venue.rating).toFixed(1) : null;
  const reviews = venue?.review_count || venue?.reviews_count || venue?.user_ratings_total || null;
  const fsa = venue?.fsa_rating || venue?.fsa?.rating || null;
  const sig = Array.isArray(venue?.signature_dishes) ? venue.signature_dishes.slice(0,2).join(", ") : null;
  const highlights = Array.isArray(venue?.highlights) ? venue.highlights.slice(0,3).join(" · ") : null;

  // Short hook (≤ 28 words), focused on vibe + cuisine
  const hookParts = [];
  if (cuisine) hookParts.push(cuisine.replace(/\b\w/g,m=>m.toUpperCase()));
  if (area) hookParts.push(`in ${area}`);
  if (isHalal) hookParts.push("halal-friendly");
  const hook = `${hookParts.filter(Boolean).join(" · ")} — ${venue?.name || "A local favorite"}`.trim();

  // What to order
  let order = "";
  if (sig) order = `Order: ${sig}.`;
  else if (cuisine.includes("ital")) order = "Order: saffron risotto or a classic cacio e pepe.";
  else if (cuisine.includes("indian")) order = "Order: butter chicken, dal makhani, and fresh naan.";
  else if (cuisine.includes("turk")) order = "Order: adana kebab, mixed grill, and baklava.";
  else if (cuisine.includes("japan")) order = "Order: omakase, fresh nigiri, or signature rolls.";
  else if (cuisine.includes("chinese")) order = "Order: dim sum, Peking duck, or wok-fired classics.";
  else if (cuisine.includes("thai")) order = "Order: pad thai, green curry, and tom yum soup.";
  else order = "Order: house specials and chef's recommended plates.";

  // Good for / vibe
  let vibe = "Great for date night, small groups, or a relaxed catch-up.";
  if (cuisine.includes("japan")) vibe = "Great for omakase lovers, sushi dates, or a polished midweek treat.";
  if (cuisine.includes("burg")) vibe = "Great for casual hangs, quick bites, or pre-theatre fuel.";
  if (cuisine.includes("indian")) vibe = "Great for family gatherings, spice lovers, or a comforting curry night.";
  if (cuisine.includes("chinese")) vibe = "Great for dim sum dates, group dining, or authentic Chinese flavors.";

  // Price cue
  const priceNote = price ? `£${price} pp approx.` : "Fair pricing for the quality.";

  // Trust signals (short)
  const trust = [];
  if (rating) trust.push(`Rated ${rating}★`);
  if (reviews && reviews > 0) trust.push(`${reviews.toLocaleString()}+ reviews`);
  if (fsa) trust.push(`FSA ${fsa}/5`);
  const trustStr = trust.length ? `(${trust.join(" · ")})` : "";

  // Halal line
  const halalLine = isHalal ? "Halal note: clearly marked; always confirm with staff for best assurance." : "";

  // Compose 120–170 words
  const bodyParts = [
    `${hook} ${trustStr}`.trim(),
    `${venue?.name} delivers confident ${cuisine || "modern"} plates with a London edge. ${highlights ? `Highlights: ${highlights}.` : ""}`.trim(),
    `${order} ${vibe} ${priceNote}`.trim(),
    halalLine
  ].filter(Boolean);

  let text = bodyParts.join(" ");
  // Word trim
  const words = text.split(/\s+/);
  if (words.length > 170) text = words.slice(0,170).join(" ") + "…";

  return {
    about: {
      text,
      source: "local-composed",
      updated_at: new Date().toISOString()
    }
  };
}

// Optional: Browse.AI enrichment adapter — NEVER hard-fail
async function maybeEnrichWithBrowseAI(venue, base) {
  if (!BROWSEAI_ENABLE || !BROWSEAI_API_KEY) return base;
  try {
    // Placeholder: wire your Browse.AI robot call here if you've stored robot/site IDs per venue.
    // We merge a short one-liner if it looks higher quality.
    // In this safe version, we simply return base to avoid crashes.
    return base;
  } catch {
    return base;
  }
}

function loadVenues() {
  const raw = fs.readFileSync(VENUES, "utf8");
  try {
    const obj = JSON.parse(raw);
    return Array.isArray(obj) ? obj : (obj.venues || []);
  } catch (e) {
    throw new Error("Invalid venues.json");
  }
}

function saveVenues(newVenues, original) {
  if (!fs.existsSync(path.dirname(OUT_BACKUP))) fs.mkdirSync(path.dirname(OUT_BACKUP),{recursive:true});
  if (!fs.existsSync(path.dirname(REPORT))) fs.mkdirSync(path.dirname(REPORT),{recursive:true});
  fs.writeFileSync(OUT_BACKUP, JSON.stringify(original, null, 2));
  // Preserve original structure
  const payload = Array.isArray(original) ? newVenues : { venues: newVenues };
  fs.writeFileSync(VENUES, JSON.stringify(payload, null, 2));
}

(async () => {
  try {
    const originalRaw = fs.readFileSync(VENUES, "utf8");
    const originalParsed = JSON.parse(originalRaw);
    const venues = loadVenues();

    const report = { total: venues.length, updated: 0, skipped: 0, examples: [] };

    for (let i=0;i<venues.length;i++){
      const v = venues[i];
      // Skip if already has good about within last 30 days
      const recent = v?.about?.updated_at && Date.now() - new Date(v.about.updated_at).getTime() < 1000*60*60*24*30;
      if (recent && v?.about?.text && v.about.text.length > 60) { report.skipped++; continue; }

      const base = tonePack(v);
      const enriched = await maybeEnrichWithBrowseAI(v, base);

      venues[i] = { ...v, ...enriched };
      report.updated++;
      if (report.examples.length<5) report.examples.push({slug:v.slug, name:v.name, about: enriched.about?.text?.slice(0,180)});
    }

    saveVenues(venues, originalParsed);
    fs.writeFileSync(REPORT, JSON.stringify(report,null,2));
    console.log("✅ About enrichment complete:", report);
  } catch (error) {
    console.error("❌ About enrichment failed:", error.message);
    process.exit(1);
  }
})();

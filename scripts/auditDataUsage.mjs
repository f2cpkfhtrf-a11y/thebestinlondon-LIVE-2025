import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports");
const VENUES_FILE = path.join(ROOT, "public/venues.json");

function loadVenues() {
  if (!fs.existsSync(VENUES_FILE)) {
    throw new Error("venues.json not found");
  }
  
  const raw = fs.readFileSync(VENUES_FILE, "utf8");
  const data = JSON.parse(raw);
  return Array.isArray(data) ? data : (data.venues || []);
}

function isValidFsaScore(s) {
  return Number.isFinite(s) && s > 0 && s <= 5;
}

function analyzeDataUsage() {
  const report = {
    timestamp: new Date().toISOString(),
    coverage: {},
    issues: [],
    gaps: {},
    summary: {}
  };

  console.log("🔍 Loading venues data...");
  const venues = loadVenues();
  
  // Coverage analysis
  const coverage = {
    name: 0,
    slug: 0,
    cuisines: 0,
    area: 0,
    borough: 0,
    halal: 0,
    fsa: 0,
    rating: 0,
    reviewCount: 0,
    price: 0,
    busyHours: 0,
    menu: 0,
    about: 0,
    hero: 0,
    card: 0
  };

  const gaps = {
    missingRating: [],
    missingFsa: [],
    missingMenu: [],
    invalidFsa: [],
    shortAbout: [],
    missingHero: [],
    missingCard: []
  };

  for (const venue of venues) {
    // Basic coverage
    if (venue.name) coverage.name++;
    if (venue.slug) coverage.slug++;
    if (venue.cuisines && venue.cuisines.length > 0) coverage.cuisines++;
    if (venue.area) coverage.area++;
    if (venue.borough) coverage.borough++;
    
    // Halal flags
    if (venue.dietary_tags?.halal || venue.halal_verified || venue.halal_certified) {
      coverage.halal++;
    }
    
    // FSA
    if (venue.fsa_rating && isValidFsaScore(venue.fsa_rating)) {
      coverage.fsa++;
    } else if (venue.fsa_rating === 0 || venue.fsa_rating === "0") {
      gaps.invalidFsa.push(venue.slug);
    } else {
      gaps.missingFsa.push(venue.slug);
    }
    
    // Rating
    if (venue.rating && venue.rating > 0) {
      coverage.rating++;
    } else {
      gaps.missingRating.push(venue.slug);
    }
    
    // Review count
    if (venue.review_count || venue.user_ratings_total) {
      coverage.reviewCount++;
    }
    
    // Price
    if (venue.price_range || venue.price_level) {
      coverage.price++;
    }
    
    // Busy hours
    if (venue.opening_hours || venue.busy_hours) {
      coverage.busyHours++;
    }
    
    // Menu
    if (venue.menu_url || venue.menu_items) {
      coverage.menu++;
    } else {
      gaps.missingMenu.push(venue.slug);
    }
    
    // About text
    if (venue.about?.text && venue.about.text.split(/\s+/).length >= 40) {
      coverage.about++;
    } else if (venue.about?.text) {
      gaps.shortAbout.push(venue.slug);
    }
    
    // Images
    if (venue.image_hero_path || venue.image_card_path) {
      coverage.hero++;
    } else {
      gaps.missingHero.push(venue.slug);
    }
    
    if (venue.image_card_path) {
      coverage.card++;
    } else {
      gaps.missingCard.push(venue.slug);
    }
  }

  report.coverage = coverage;
  report.gaps = gaps;

  // Calculate percentages
  const total = venues.length;
  const percentages = {};
  for (const [key, count] of Object.entries(coverage)) {
    percentages[key] = Math.round((count / total) * 100);
  }

  report.summary = {
    totalVenues: total,
    coveragePercentages: percentages,
    gapsFound: Object.values(gaps).reduce((sum, arr) => sum + arr.length, 0),
    criticalGaps: {
      missingHero: gaps.missingHero.length,
      invalidFsa: gaps.invalidFsa.length,
      shortAbout: gaps.shortAbout.length
    }
  };

  return report;
}

function saveReports(report) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  
  // JSON report
  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_data_usage.json"),
    JSON.stringify(report, null, 2)
  );

  // Markdown report
  const markdown = `# Data Usage Audit Report

**Timestamp:** ${report.timestamp}

## Summary
- **Total Venues:** ${report.summary.totalVenues}
- **Gaps Found:** ${report.summary.gapsFound}
- **Critical Issues:** ${report.summary.criticalGaps.missingHero} missing heroes, ${report.summary.criticalGaps.invalidFsa} invalid FSA, ${report.summary.criticalGaps.shortAbout} short about

## Coverage Analysis
${Object.entries(report.summary.coveragePercentages).map(([field, percent]) => 
  `- **${field}:** ${percent}% (${report.coverage[field]}/${report.summary.totalVenues})`
).join('\n')}

## Critical Gaps
### Missing Heroes (${report.gaps.missingHero.length})
${report.gaps.missingHero.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.missingHero.length > 10 ? `- ... and ${report.gaps.missingHero.length - 10} more` : ''}

### Invalid FSA Scores (${report.gaps.invalidFsa.length})
${report.gaps.invalidFsa.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.invalidFsa.length > 10 ? `- ... and ${report.gaps.invalidFsa.length - 10} more` : ''}

### Short About Text (${report.gaps.shortAbout.length})
${report.gaps.shortAbout.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.shortAbout.length > 10 ? `- ... and ${report.gaps.shortAbout.length - 10} more` : ''}

### Missing Ratings (${report.gaps.missingRating.length})
${report.gaps.missingRating.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.missingRating.length > 10 ? `- ... and ${report.gaps.missingRating.length - 10} more` : ''}

### Missing Menus (${report.gaps.missingMenu.length})
${report.gaps.missingMenu.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.missingMenu.length > 10 ? `- ... and ${report.gaps.missingMenu.length - 10} more` : ''}

### Missing Cards (${report.gaps.missingCard.length})
${report.gaps.missingCard.slice(0, 10).map(slug => `- ${slug}`).join('\n')}
${report.gaps.missingCard.length > 10 ? `- ... and ${report.gaps.missingCard.length - 10} more` : ''}
`;

  fs.writeFileSync(
    path.join(REPORT_DIR, "audit_data_usage.md"),
    markdown
  );
}

(async () => {
  try {
    const report = analyzeDataUsage();
    saveReports(report);
    console.log("✅ Data usage audit complete:", report.summary);
  } catch (error) {
    console.error("❌ Data usage audit failed:", error);
    process.exit(1);
  }
})();

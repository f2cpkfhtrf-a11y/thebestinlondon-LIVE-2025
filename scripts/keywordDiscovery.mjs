#!/usr/bin/env node

/**
 * Omar-Style Keyword Discovery Engine
 * Simulates Ahrefs/Google Trends/Bing API queries for high-intent local searches
 * Focuses on London restaurant keywords with commercial intent
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulated keyword data based on real search patterns
const KEYWORD_DATABASE = {
  // Cuisine-based keywords
  cuisineKeywords: [
    { keyword: "best italian restaurants london", search_volume: 8900, difficulty: 35, local_intent: true, commercial_intent: "high" },
    { keyword: "best indian restaurants london", search_volume: 7600, difficulty: 32, local_intent: true, commercial_intent: "high" },
    { keyword: "best chinese restaurants london", search_volume: 5400, difficulty: 28, local_intent: true, commercial_intent: "high" },
    { keyword: "best japanese restaurants london", search_volume: 4200, difficulty: 25, local_intent: true, commercial_intent: "high" },
    { keyword: "best turkish restaurants london", search_volume: 3800, difficulty: 22, local_intent: true, commercial_intent: "high" },
    { keyword: "best french restaurants london", search_volume: 3600, difficulty: 30, local_intent: true, commercial_intent: "high" },
    { keyword: "best thai restaurants london", search_volume: 3200, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "best korean restaurants london", search_volume: 2800, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "best pakistani restaurants london", search_volume: 2400, difficulty: 15, local_intent: true, commercial_intent: "high" },
    { keyword: "best vietnamese restaurants london", search_volume: 2100, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "best mediterranean restaurants london", search_volume: 1900, difficulty: 19, local_intent: true, commercial_intent: "high" },
    { keyword: "best mexican restaurants london", search_volume: 1800, difficulty: 17, local_intent: true, commercial_intent: "high" },
    { keyword: "best spanish restaurants london", search_volume: 1600, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "best american restaurants london", search_volume: 1500, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "best british restaurants london", search_volume: 1400, difficulty: 16, local_intent: true, commercial_intent: "high" }
  ],
  
  // Area-based keywords
  areaKeywords: [
    { keyword: "restaurants near covent garden", search_volume: 3200, difficulty: 25, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near soho", search_volume: 2800, difficulty: 22, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near shoreditch", search_volume: 2400, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near canary wharf", search_volume: 2200, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near camden", search_volume: 2000, difficulty: 19, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near king's cross", search_volume: 1800, difficulty: 17, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near liverpool street", search_volume: 1600, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near london bridge", search_volume: 1500, difficulty: 15, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near oxford circus", search_volume: 1400, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants near leicester square", search_volume: 1300, difficulty: 17, local_intent: true, commercial_intent: "high" }
  ],
  
  // Halal-specific keywords
  halalKeywords: [
    { keyword: "halal restaurants london", search_volume: 4500, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "halal indian restaurants london", search_volume: 2800, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "halal turkish restaurants london", search_volume: 2200, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "halal pakistani restaurants london", search_volume: 1900, difficulty: 14, local_intent: true, commercial_intent: "high" },
    { keyword: "halal middle eastern restaurants london", search_volume: 1600, difficulty: 15, local_intent: true, commercial_intent: "high" },
    { keyword: "halal kebabs london", search_volume: 1400, difficulty: 12, local_intent: true, commercial_intent: "high" },
    { keyword: "halal curry london", search_volume: 1200, difficulty: 13, local_intent: true, commercial_intent: "high" },
    { keyword: "halal fine dining london", search_volume: 1000, difficulty: 16, local_intent: true, commercial_intent: "high" }
  ],
  
  // Time-based keywords
  timeKeywords: [
    { keyword: "late night restaurants london", search_volume: 3200, difficulty: 22, local_intent: true, commercial_intent: "high" },
    { keyword: "24 hour restaurants london", search_volume: 1800, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "restaurants open late london", search_volume: 1500, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "early morning restaurants london", search_volume: 1200, difficulty: 14, local_intent: true, commercial_intent: "high" },
    { keyword: "breakfast restaurants london", search_volume: 2800, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "brunch restaurants london", search_volume: 2400, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "lunch restaurants london", search_volume: 3600, difficulty: 25, local_intent: true, commercial_intent: "high" },
    { keyword: "dinner restaurants london", search_volume: 4200, difficulty: 28, local_intent: true, commercial_intent: "high" }
  ],
  
  // Dietary-specific keywords
  dietaryKeywords: [
    { keyword: "vegan restaurants london", search_volume: 3800, difficulty: 24, local_intent: true, commercial_intent: "high" },
    { keyword: "vegetarian restaurants london", search_volume: 3200, difficulty: 22, local_intent: true, commercial_intent: "high" },
    { keyword: "gluten free restaurants london", search_volume: 2400, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "keto restaurants london", search_volume: 1800, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "healthy restaurants london", search_volume: 2800, difficulty: 21, local_intent: true, commercial_intent: "high" },
    { keyword: "organic restaurants london", search_volume: 1600, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "raw food restaurants london", search_volume: 1200, difficulty: 14, local_intent: true, commercial_intent: "high" }
  ],
  
  // Occasion-based keywords
  occasionKeywords: [
    { keyword: "romantic restaurants london", search_volume: 4200, difficulty: 26, local_intent: true, commercial_intent: "high" },
    { keyword: "business lunch restaurants london", search_volume: 2800, difficulty: 22, local_intent: true, commercial_intent: "high" },
    { keyword: "family restaurants london", search_volume: 3200, difficulty: 24, local_intent: true, commercial_intent: "high" },
    { keyword: "date night restaurants london", search_volume: 2400, difficulty: 20, local_intent: true, commercial_intent: "high" },
    { keyword: "birthday restaurants london", search_volume: 2000, difficulty: 18, local_intent: true, commercial_intent: "high" },
    { keyword: "anniversary restaurants london", search_volume: 1600, difficulty: 16, local_intent: true, commercial_intent: "high" },
    { keyword: "group dining restaurants london", search_volume: 1800, difficulty: 17, local_intent: true, commercial_intent: "high" }
  ]
};

function filterKeywords() {
  const allKeywords = [
    ...KEYWORD_DATABASE.cuisineKeywords,
    ...KEYWORD_DATABASE.areaKeywords,
    ...KEYWORD_DATABASE.halalKeywords,
    ...KEYWORD_DATABASE.timeKeywords,
    ...KEYWORD_DATABASE.dietaryKeywords,
    ...KEYWORD_DATABASE.occasionKeywords
  ];
  
  // Apply Omar's filtering criteria
  return allKeywords
    .filter(keyword => keyword.search_volume >= 300)
    .filter(keyword => keyword.difficulty <= 40)
    .filter(keyword => keyword.local_intent === true)
    .map(keyword => ({
      ...keyword,
      match_status: determineMatchStatus(keyword),
      recommended_action: determineRecommendedAction(keyword)
    }))
    .sort((a, b) => b.search_volume - a.search_volume);
}

function determineMatchStatus(keyword) {
  const keywordLower = keyword.keyword.toLowerCase();
  
  // Check if we have existing pages for this keyword
  if (keywordLower.includes('italian') || keywordLower.includes('indian') || 
      keywordLower.includes('turkish') || keywordLower.includes('japanese') || 
      keywordLower.includes('french')) {
    return 'existing_page_optimized';
  }
  
  if (keywordLower.includes('chinese') || keywordLower.includes('thai') || 
      keywordLower.includes('korean') || keywordLower.includes('pakistani')) {
    return 'existing_page_needs_optimization';
  }
  
  if (keywordLower.includes('halal') || keywordLower.includes('vegan') || 
      keywordLower.includes('vegetarian')) {
    return 'partial_coverage';
  }
  
  if (keywordLower.includes('near') || keywordLower.includes('covent garden') || 
      keywordLower.includes('soho') || keywordLower.includes('shoreditch')) {
    return 'area_page_exists';
  }
  
  return 'no_coverage';
}

function determineRecommendedAction(keyword) {
  const matchStatus = keyword.match_status;
  
  switch (matchStatus) {
    case 'existing_page_optimized':
      return 'monitor_performance';
    case 'existing_page_needs_optimization':
      return 'optimize_existing_page';
    case 'partial_coverage':
      return 'create_dedicated_page';
    case 'area_page_exists':
      return 'enhance_area_content';
    case 'no_coverage':
      return 'create_new_page';
    default:
      return 'analyze_opportunity';
  }
}

async function generateKeywordOpportunities() {
  console.log('🔍 Starting Omar-style keyword discovery...');
  
  const filteredKeywords = filterKeywords();
  
  // Categorize opportunities
  const opportunities = {
    high_priority: filteredKeywords.filter(k => k.search_volume >= 2000 && k.difficulty <= 25),
    medium_priority: filteredKeywords.filter(k => k.search_volume >= 1000 && k.search_volume < 2000 && k.difficulty <= 35),
    low_priority: filteredKeywords.filter(k => k.search_volume >= 300 && k.search_volume < 1000 && k.difficulty <= 40),
    quick_wins: filteredKeywords.filter(k => k.difficulty <= 20 && k.search_volume >= 500),
    content_gaps: filteredKeywords.filter(k => k.match_status === 'no_coverage' || k.match_status === 'partial_coverage')
  };
  
  const reportPath = path.join(__dirname, '..', 'seo', 'keyword-data', `keyword-opportunities-${new Date().toISOString().split('T')[0]}.json`);
  
  const report = {
    analysis_date: new Date().toISOString().split('T')[0],
    total_keywords_analyzed: filteredKeywords.length,
    filtering_criteria: {
      min_search_volume: 300,
      max_difficulty: 40,
      local_intent_required: true
    },
    opportunities: opportunities,
    all_keywords: filteredKeywords,
    summary: {
      high_priority_count: opportunities.high_priority.length,
      medium_priority_count: opportunities.medium_priority.length,
      low_priority_count: opportunities.low_priority.length,
      quick_wins_count: opportunities.quick_wins.length,
      content_gaps_count: opportunities.content_gaps.length
    }
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`📊 Keyword opportunities saved to: ${reportPath}`);
  
  return report;
}

// Run the keyword discovery
generateKeywordOpportunities()
  .then(report => {
    console.log('✅ Keyword discovery completed!');
    console.log(`🔍 Total keywords analyzed: ${report.total_keywords_analyzed}`);
    console.log(`🎯 High priority opportunities: ${report.summary.high_priority_count}`);
    console.log(`⚡ Quick wins identified: ${report.summary.quick_wins_count}`);
    console.log(`📝 Content gaps found: ${report.summary.content_gaps_count}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Keyword discovery failed:', error);
    process.exit(1);
  });

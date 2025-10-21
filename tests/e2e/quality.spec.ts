import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ARTIFACTS_DIR = path.join(process.cwd(), 'artifacts/e2e');

// Ensure artifacts directory exists
if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
}

const ROUTES = [
  "/", "/restaurants", "/cuisines", "/areas", 
  "/best-halal-restaurants-london", "/blog", "/faq"
];

test.describe('Quality E2E Tests', () => {
  for (const route of ROUTES) {
    test(`Quality check for ${route}`, async ({ page }) => {
      const url = `${BASE_URL}${route}`;
      
      // Listen for console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Navigate to page
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Check for console errors
      expect(consoleErrors).toHaveLength(0);
      
      // Check for H1 presence
      const h1 = await page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      // Check for PageHero presence
      const pageHero = await page.locator('[class*="PageHero"], [class*="Hero"]').first();
      await expect(pageHero).toBeVisible();
      
      // Check for at least one image
      const images = await page.locator('img').count();
      expect(images).toBeGreaterThan(0);
      
      // Check for local images
      const localImages = await page.locator('img[src*="/images/"]').count();
      expect(localImages).toBeGreaterThan(0);
      
      // Venue-specific checks
      if (route.includes('/restaurant/')) {
        // Check tab anchors
        const anchors = ['overview', 'menu', 'reviews', 'location', 'similar'];
        for (const anchor of anchors) {
          const element = await page.locator(`#${anchor}`);
          await expect(element).toBeVisible();
        }
        
        // Test tab navigation
        const tabButtons = await page.locator('button[onclick*="handleTabClick"], a[href*="#"]').all();
        if (tabButtons.length > 0) {
          for (const tab of tabButtons.slice(0, 3)) { // Test first 3 tabs
            await tab.click();
            await page.waitForTimeout(500); // Wait for scroll
            
            // Check if we're in viewport
            const activeSection = await page.locator('[id*="overview"], [id*="menu"], [id*="reviews"], [id*="location"], [id*="similar"]').first();
            await expect(activeSection).toBeInViewport();
          }
        }
      }
      
      // Save HTML excerpt on failure (for debugging)
      if (consoleErrors.length > 0) {
        const html = await page.content();
        const artifactPath = path.join(ARTIFACTS_DIR, `${route.replace(/\//g, '_')}.html`);
        fs.writeFileSync(artifactPath, html);
        console.log(`Saved HTML excerpt to ${artifactPath}`);
      }
    });
  }
  
  test('Tab navigation functionality', async ({ page }) => {
    // Get a random venue
    const venuesPath = path.join(process.cwd(), 'public/venues.json');
    if (!fs.existsSync(venuesPath)) {
      test.skip('No venues.json found');
      return;
    }
    
    const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
    const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
    
    if (venues.length === 0) {
      test.skip('No venues found');
      return;
    }
    
    const randomVenue = venues[Math.floor(Math.random() * venues.length)];
    const url = `${BASE_URL}/restaurant/${randomVenue.slug}`;
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Test tab clicking
    const tabSelectors = [
      'button:has-text("Overview")',
      'button:has-text("Menu")',
      'button:has-text("Reviews")',
      'button:has-text("Location")',
      'button:has-text("Similar")'
    ];
    
    for (const selector of tabSelectors) {
      const tab = await page.locator(selector).first();
      if (await tab.isVisible()) {
        await tab.click();
        await page.waitForTimeout(500);
        
        // Check if corresponding section is visible
        const sectionId = selector.toLowerCase().replace(/[^a-z]/g, '');
        const section = await page.locator(`#${sectionId}`).first();
        if (await section.isVisible()) {
          await expect(section).toBeInViewport();
        }
      }
    }
  });
});

# Test Suite Documentation

## Overview
This directory contains test specifications for The Best in London website. Tests are written as placeholders that document expected behavior and can be implemented with your preferred test framework.

## Test Files

### 1. `navigation.test.js`
**Coverage:**
- Header navigation links (10 items)
- No duplicate navigation bars
- Mobile responsiveness
- Link integrity (no 404s)
- Redirect handling
- Search functionality
- Accessibility (skip links, ARIA, keyboard)

### 2. `pagination.test.js`
**Coverage:**
- 50 items per page limit
- Pagination controls (Previous/Next, page numbers)
- URL updates with page parameters
- Scroll to top on page change
- Disabled states on first/last page
- Filter + pagination interaction
- SEO (canonical tags, prev/next links, unique titles)
- Accessibility (ARIA labels, keyboard navigation)

### 3. `filtering.test.js`
**Coverage:**
- Cuisine filtering (Italian, Indian, Japanese, etc.)
- Sort options (Rating, Reviews, Name)
- Dietary filters (Halal, Vegan, Vegetarian)
- Area filters (Halal by area page)
- URL parameter updates
- No page reloads (client-side filtering)
- Filter counts
- Combined filters + sort + pagination
- Empty states
- Accessibility

### 4. `near-me.test.js`
**Coverage:**
- Geolocation API integration
- Loading states
- Distance calculations (Haversine formula)
- Walking time calculations
- Distance filters (1km, 2km, 5km, 10km, 20km)
- UK Postcode search fallback
- Postcode API integration (api.postcodes.io)
- Error handling (permission denied, timeout, invalid postcode)
- Success messages
- Accessibility
- Performance (caching, timeouts)

## Test Framework Options

### Option 1: Jest + React Testing Library
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
```

**Configuration:** `jest.config.js`
```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
};
```

### Option 2: Playwright (E2E)
```bash
npm install --save-dev @playwright/test
```

**Configuration:** `playwright.config.js`
```javascript
module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:3000',
  },
};
```

### Option 3: Cypress (E2E)
```bash
npm install --save-dev cypress
```

## Running Tests

### Setup
1. Choose a test framework (Jest, Playwright, or Cypress)
2. Install dependencies
3. Configure test framework
4. Replace placeholders with actual test implementations

### Jest Example
```bash
# Run all tests
npm test

# Run specific test file
npm test navigation.test.js

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Playwright Example
```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test tests/navigation.test.js

# Debug mode
npx playwright test --debug

# UI mode
npx playwright test --ui
```

### Cypress Example
```bash
# Open Cypress UI
npx cypress open

# Run headless
npx cypress run
```

## Implementation Guide

### Convert Placeholder to Real Test

**Before (Placeholder):**
```javascript
test('should have all main navigation links', async () => {
  expect(true).toBe(true); // Placeholder
});
```

**After (Jest + React Testing Library):**
```javascript
test('should have all main navigation links', async () => {
  render(<Header />);
  
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Restaurants')).toBeInTheDocument();
  expect(screen.getByText('Halal')).toBeInTheDocument();
  // ... etc
});
```

**After (Playwright):**
```javascript
test('should have all main navigation links', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Restaurants' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Halal' })).toBeVisible();
  // ... etc
});
```

## Test Coverage Goals

### Current Status: 📝 Specifications Only
- ✅ Test specifications documented
- ⏳ Test framework to be selected
- ⏳ Tests to be implemented

### Target Coverage: 
- **Navigation:** 90%+
- **Pagination:** 85%+
- **Filtering:** 85%+
- **Near Me:** 80%+
- **Overall:** 80%+

## Priority Tests

### P0 (Critical - Implement First)
1. All navigation links return 200
2. No duplicate navigation bars
3. Pagination shows max 50 items
4. Filters don't reload page
5. Near Me handles location errors

### P1 (High Priority)
1. URL updates with filters/pagination
2. Postcode search fallback works
3. Distance calculations accurate
4. Accessibility (ARIA, keyboard)
5. Mobile navigation works

### P2 (Medium Priority)
1. SEO tags (canonical, prev/next)
2. Empty states
3. Loading states
4. Error messages
5. Success messages

## Continuous Integration

### GitHub Actions Example
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

## Manual Testing Checklist

Before deployment, manually verify:

- [ ] All nav links work (no 404s)
- [ ] Pagination on /restaurants
- [ ] Pagination on /best-halal-restaurants-london/by-area
- [ ] Cuisine filters work
- [ ] Sort options work
- [ ] Near Me button triggers geolocation
- [ ] Postcode search fallback works
- [ ] Mobile navigation works
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Web.dev Testing Guide](https://web.dev/testing/)

## Contributing

When adding new features:
1. Add test specifications to appropriate file
2. Document expected behavior
3. Implement tests when framework is set up
4. Ensure tests pass before merging

---

*Last Updated: November 3, 2025*  
*Status: Specifications Complete, Implementation Pending*


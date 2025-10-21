# Deployment Testing Guide
**Version:** 1.0  
**Date:** November 3, 2025  
**Purpose:** Step-by-step testing checklist before production deployment

---

## 🧪 PRE-DEPLOYMENT TESTING

### Environment Setup
```bash
# Navigate to project
cd "/Users/admin/Library/Mobile Documents/com~apple~CloudDocs/thebestinlondon"

# Ensure dependencies installed
npm install

# Build for production
npm run build

# Start local server
npm start

# Open in browser
# http://localhost:3000
```

---

## ✅ TEST CHECKLIST

### 1. Navigation Testing (Critical)

#### Desktop Navigation
- [ ] **Header appears on all pages**
  - Visit: /, /restaurants, /blog, /faq
  - Confirm: Single header, no duplicates
  
- [ ] **All navigation links work**
  - [ ] Home → /
  - [ ] Restaurants → /restaurants
  - [ ] Areas → /areas
  - [ ] Cuisines → /cuisines
  - [ ] Halal → /best-halal-restaurants-london
  - [ ] Near Me → /near-me
  - [ ] Blog → /blog
  - [ ] FAQ → /faq
  - [ ] About → /about
  - [ ] Contact → /contact

- [ ] **Active page highlighted**
  - Click each link
  - Active link should have gold underline

- [ ] **Search bar functional**
  - Type "Dishoom"
  - Suggestions should appear
  - Click suggestion or press Enter
  - Should navigate correctly

#### Mobile Navigation
- [ ] **Hamburger menu appears on mobile**
  - Resize browser to < 768px
  - Menu icon visible in top right
  
- [ ] **Mobile menu opens/closes**
  - Click hamburger icon
  - Menu slides out
  - Click again to close
  
- [ ] **All mobile links work**
  - Test all 10 navigation items
  - Menu should close after clicking link
  
- [ ] **Mobile search works**
  - Search input in mobile menu
  - Type and submit
  - Should navigate to results

#### Skip Link (Accessibility)
- [ ] **Skip link appears on Tab**
  - Press Tab key on homepage
  - "Skip to main content" link should appear
  - Press Enter
  - Should jump to main content

---

### 2. Broken Links Testing (Critical)

#### Previously Broken URLs
- [ ] **/best-halal-restaurants-london/by-area**
  - Visit URL
  - Should load successfully (not 404)
  - Should show area filter buttons
  - Should show halal restaurants

- [ ] **/collections/halal**
  - Visit URL
  - Should redirect to /best-halal-restaurants-london
  - OR show redirect page with quick links
  - Should NOT be 404

#### All Navigation Links
- [ ] **Click every header link**
  - None should return 404
  - All should load within 3 seconds

#### Footer Links
- [ ] **Test footer links**
  - All social links (can be placeholder #)
  - All quick links
  - All legal links

---

### 3. Pagination Testing (High Priority)

#### Restaurant List Page (/restaurants)
- [ ] **Initial load shows max 50 items**
  - Count restaurant cards
  - Should be ≤ 50
  
- [ ] **Pagination controls appear**
  - If > 50 restaurants total
  - Should see: Previous | 1 2 3 4 5 | Next
  
- [ ] **Page numbers clickable**
  - Click "2"
  - URL updates to ?page=2
  - Shows next 50 restaurants
  - Scrolls to top smoothly
  
- [ ] **Previous/Next buttons work**
  - Previous disabled on page 1
  - Next disabled on last page
  - Buttons have hover effects
  
- [ ] **URL parameters work**
  - Manually visit /restaurants?page=2
  - Should show page 2
  - Pagination state should match

- [ ] **Results count accurate**
  - "Showing 1-50 of 234 restaurants"
  - "Showing 51-100 of 234 restaurants" on page 2
  - Math should be correct

#### Halal By Area Page
- [ ] **Area filters shown**
  - "All Areas", "Tower Hamlets", "Westminster", etc.
  
- [ ] **Clicking area updates results**
  - Click "Tower Hamlets"
  - URL updates to ?area=Tower%20Hamlets
  - Shows only Tower Hamlets restaurants
  
- [ ] **Pagination with area filter**
  - Select area with > 50 restaurants
  - Pagination should appear
  - URL: ?area=X&page=2

---

### 4. Filtering Testing (High Priority)

#### Cuisine Filters
- [ ] **Filter buttons displayed**
  - "All", "Italian", "Indian", "Japanese", etc.
  - Shows count: "Italian (45)"
  
- [ ] **Clicking filter works**
  - Click "Italian"
  - Page does NOT reload
  - Shows only Italian restaurants
  - Filter button highlighted in gold
  - URL updates to ?filter=italian
  
- [ ] **Filter count accurate**
  - Number in parentheses matches filtered results
  
- [ ] **Filter resets pagination**
  - Go to page 3
  - Change filter to Italian
  - Should reset to page 1
  - URL: ?filter=italian&page=1

#### Sort Options
- [ ] **Sort dropdown works**
  - Select "Rating"
  - Restaurants sorted by highest rating first
  
- [ ] **Other sort options**
  - "Reviews" - sorted by review count
  - "Name" - sorted alphabetically
  
- [ ] **Sort updates URL**
  - Select "Reviews"
  - URL updates to ?sort=reviews

#### Combined Filters
- [ ] **Filter + Sort + Pagination**
  - Filter: Italian
  - Sort: Reviews
  - Page: 2
  - URL: ?filter=italian&sort=reviews&page=2
  - All should work together

#### Empty State
- [ ] **No results message**
  - Select rare filter
  - Should show "No restaurants found"
  - "View All Restaurants" button shown
  - Clicking button clears filter

---

### 5. Near Me Testing (High Priority)

#### Geolocation
- [ ] **"Use My Location" button visible**
  - On /near-me page
  - Gold button with location icon
  
- [ ] **Click triggers permission request**
  - Click button
  - Browser asks for location permission
  
- [ ] **Allow location**
  - Grant permission
  - Should show loading spinner
  - Should find nearby restaurants
  - Should show distances (e.g., "1.2km • 15 min walk")
  - Green success message appears
  
- [ ] **Distance filter works**
  - Select "5 km" from dropdown
  - Results update instantly
  - Only restaurants within 5km shown
  
- [ ] **Clear Location button**
  - Click "Clear Location"
  - Resets to all restaurants
  - "Use My Location" button reappears

#### Postcode Search (NEW!)
- [ ] **Postcode input visible**
  - Input field with placeholder
  - "Or search by postcode (e.g., SW1A 1AA)"
  
- [ ] **Enter valid postcode**
  - Type "SW1A 1AA" (Westminster)
  - Click "Search" button
  - Should find location
  - Should show nearby restaurants
  - Input clears after success
  
- [ ] **Enter invalid postcode**
  - Type "INVALID123"
  - Click "Search"
  - Should show error: "Postcode not found"
  - Red error box appears
  
- [ ] **Empty postcode**
  - Leave input empty
  - Click "Search"
  - Should show: "Please enter a postcode"
  
- [ ] **Enter key works**
  - Type postcode
  - Press Enter
  - Should trigger search

#### Error Handling
- [ ] **Deny location permission**
  - Click "Use My Location"
  - Deny permission
  - Should show error message
  - Postcode input still available
  
- [ ] **Timeout simulation**
  - If geolocation times out
  - Should show timeout message
  - Should suggest postcode search
  
- [ ] **No GPS signal**
  - If position unavailable
  - Should show appropriate error
  - Fallback to postcode option

---

### 6. Blog & FAQ Testing (Medium Priority)

#### Blog List Page (/blog)
- [ ] **Blog list loads**
  - Shows grid of blog posts
  - Images display correctly
  - No duplicate navigation
  
- [ ] **Blog cards clickable**
  - Click any blog card
  - Should navigate to /blog/[slug]
  - Should load blog post

#### Individual Blog Post
- [ ] **Blog post loads**
  - Hero image displays
  - Title renders
  - Content readable
  - Header/Footer visible (no Layout)
  - No duplicate navigation

#### FAQ List Page (/faq)
- [ ] **FAQ list loads**
  - Shows all FAQ items
  - Search input visible
  - No duplicate navigation
  
- [ ] **Search FAQ works**
  - Type search term
  - Results filter instantly
  - Shows match count

#### Individual FAQ Page
- [ ] **FAQ page loads**
  - Question as heading
  - Answer content readable
  - Related links work
  - No duplicate navigation

---

### 7. SEO Meta Tags Testing

#### View Page Source
Test on each page: /, /restaurants, /blog, /faq, /near-me

- [ ] **Robots meta tag**
  ```html
  <meta name="robots" content="index, follow, max-image-preview:large" />
  ```

- [ ] **Googlebot tag**
  ```html
  <meta name="googlebot" content="index, follow" />
  ```

- [ ] **hrefLang tags**
  ```html
  <link rel="alternate" hrefLang="en-GB" href="..." />
  <link rel="alternate" hrefLang="en" href="..." />
  ```

- [ ] **Canonical tag**
  ```html
  <link rel="canonical" href="..." />
  ```

- [ ] **On Near Me: Geo tags**
  ```html
  <meta name="geo.region" content="GB-ENG" />
  <meta name="geo.placename" content="London" />
  ```

#### Pagination SEO
- [ ] **On paginated pages (page 2+)**
  - Should have prev/next links
  ```html
  <link rel="prev" href="/restaurants" />
  <link rel="next" href="/restaurants?page=3" />
  ```
  - Title includes page number
  - Meta description mentions page number

---

### 8. Accessibility Testing (Medium Priority)

#### Keyboard Navigation
- [ ] **Tab through entire page**
  - All interactive elements reachable
  - Visible focus indicators
  - Logical tab order
  
- [ ] **Skip to main content**
  - Press Tab on page load
  - Skip link appears
  - Press Enter
  - Jumps past navigation
  
- [ ] **Filter buttons**
  - Tab to filter buttons
  - Press Space or Enter to activate
  - Visual feedback works

#### Screen Reader Testing (Optional)
- [ ] **Enable screen reader**
  - macOS: VoiceOver (Cmd+F5)
  - Windows: NVDA or JAWS
  
- [ ] **Navigate site**
  - Headings announced properly
  - Links have descriptive text
  - Buttons have labels
  - Images have alt text
  
- [ ] **ARIA attributes work**
  - Filter buttons announce pressed state
  - Pagination announces current page
  - Form inputs have labels

---

### 9. Mobile Responsive Testing

#### Viewport Testing
- [ ] **iPhone SE (375px)**
  - Hamburger menu visible
  - Content fits without horizontal scroll
  - Buttons touchable (min 44×44px)
  
- [ ] **iPad (768px)**
  - Layout adjusts properly
  - Grid shows 2 columns
  
- [ ] **Desktop (1920px)**
  - Full desktop navigation
  - Grid shows 3-4 columns
  - Max-width container centers content

#### Touch Interactions
- [ ] **Mobile menu**
  - Tap hamburger icon
  - Menu slides out smoothly
  - Tap link closes menu
  
- [ ] **Filters on mobile**
  - Horizontal scroll if needed
  - Buttons easy to tap
  - No accidental taps
  
- [ ] **Pagination on mobile**
  - Previous/Next buttons large enough
  - Page numbers tappable
  - Spacing adequate

---

### 10. Performance Testing

#### Page Load Speed
- [ ] **Homepage**
  - Open in Incognito
  - Time to visible content < 2 seconds
  - No layout shift
  
- [ ] **Restaurant list**
  - First 50 items load quickly
  - Pagination renders immediately
  - Filtering is instant (< 100ms)
  
- [ ] **Near Me**
  - Page loads before geolocation
  - Doesn't block rendering

#### Network Throttling Test
- [ ] **Simulate 3G connection**
  - Chrome DevTools → Network → Slow 3G
  - Test key pages still usable
  - Loading states appear
  - Images lazy load

#### Lighthouse Audit (Optional but Recommended)
```bash
# Run Lighthouse
npm run lighthouse

# OR manually:
# 1. Open Chrome DevTools
# 2. Go to Lighthouse tab
# 3. Run audit
# 4. Target scores:
#    - Performance: > 90
#    - Accessibility: > 95
#    - Best Practices: > 90
#    - SEO: > 95
```

---

### 11. Sitemap Testing

#### Generate Sitemaps
```bash
# Run sitemap generator
npm run sitemap:generate

# Check output
ls -la public/sitemap*.xml
```

#### Validate Sitemaps
- [ ] **Check sitemap index**
  ```bash
  cat public/sitemap.xml
  ```
  - Should list all sub-sitemaps
  - Should have correct domain
  
- [ ] **Validate XML format**
  - Open public/sitemap.xml in browser
  - Should render as XML (no errors)
  - Use: https://www.xml-sitemaps.com/validate-xml-sitemap.html
  
- [ ] **Check coverage**
  ```bash
  # Count URLs in each sitemap
  grep -c "<loc>" public/sitemap-pages.xml
  grep -c "<loc>" public/sitemap-venues.xml
  grep -c "<loc>" public/sitemap-blog.xml
  ```
  - Pages: ~15 URLs
  - Venues: ~760 URLs
  - Blog: ~28 URLs
  - FAQ: ~29 URLs

---

### 12. Browser Compatibility Testing

#### Chrome (Latest)
- [ ] All features work
- [ ] No console errors
- [ ] Images load correctly

#### Safari (Latest)
- [ ] Navigation works
- [ ] Filtering works
- [ ] Near Me geolocation works
- [ ] No webkit-specific issues

#### Firefox (Latest)
- [ ] All features functional
- [ ] No Firefox-specific errors

#### Mobile Safari (iOS)
- [ ] Touch interactions work
- [ ] Geolocation works on iOS
- [ ] No iOS-specific issues

#### Chrome Mobile (Android)
- [ ] Mobile menu works
- [ ] Touch targets adequate
- [ ] Performance acceptable

---

### 13. SEO Validation

#### Meta Tags Checker
Visit: https://metatags.io/

- [ ] **Test homepage**
  - Enter: https://www.thebestinlondon.co.uk
  - Verify: Title, description, OG tags, Twitter cards
  
- [ ] **Test restaurants page**
  - Enter: https://www.thebestinlondon.co.uk/restaurants
  - Check pagination meta tags
  
- [ ] **Test blog page**
  - Enter: https://www.thebestinlondon.co.uk/blog
  - Check article:publisher tag

#### Rich Results Test
Visit: https://search.google.com/test/rich-results

- [ ] **Test restaurant page**
  - Enter restaurant URL
  - Should detect Restaurant schema
  - Should detect AggregateRating
  
- [ ] **Test FAQ page**
  - Enter FAQ URL
  - Should detect FAQPage schema
  - Should detect Question/Answer schema

#### Mobile-Friendly Test
Visit: https://search.google.com/test/mobile-friendly

- [ ] **Test key pages**
  - Homepage
  - Restaurant list
  - Individual restaurant
  - All should pass

---

### 14. Regression Testing (Critical)

#### Existing Features Must Still Work
- [ ] **Search page**
  - Visit /search?q=italian
  - Should show search results
  
- [ ] **Individual restaurant pages**
  - Visit /restaurant/[any-slug]
  - Should load restaurant details
  - Images should display
  - Reviews should show
  
- [ ] **Cuisine pages**
  - Visit /italian-restaurants-london
  - Should load Italian restaurants
  
- [ ] **Area pages**
  - Visit /areas/soho
  - Should load Soho restaurants
  
- [ ] **Contact form**
  - Visit /contact
  - Form should be visible
  - Submit should work (or show validation)
  
- [ ] **About page**
  - Visit /about
  - Content should load
  - No duplicate navigation

---

### 15. Error Handling Testing

#### 404 Page
- [ ] **Visit non-existent page**
  - /this-page-does-not-exist
  - Should show custom 404 page
  - Should have link back to homepage
  
#### Network Errors
- [ ] **Disable network**
  - DevTools → Network → Offline
  - Try navigating
  - Should show appropriate error
  
#### JavaScript Disabled
- [ ] **Disable JavaScript**
  - Site should still be navigable
  - Basic content should display
  - Forms should work (with page reload)

---

## 🚦 STAGING DEPLOYMENT TEST

After deploying to staging:

### URL Testing
```bash
# Replace with your staging URL
STAGING_URL="https://thebestinlondon-staging.vercel.app"

# Test all critical pages
curl -I $STAGING_URL/
curl -I $STAGING_URL/restaurants
curl -I $STAGING_URL/best-halal-restaurants-london
curl -I $STAGING_URL/best-halal-restaurants-london/by-area
curl -I $STAGING_URL/collections/halal
curl -I $STAGING_URL/near-me
curl -I $STAGING_URL/blog
curl -I $STAGING_URL/faq

# All should return 200 OK or 301/302 redirect
```

### Manual Smoke Test
- [ ] Visit staging URL
- [ ] Click through all pages
- [ ] Test pagination
- [ ] Test filtering
- [ ] Test Near Me
- [ ] Check mobile view
- [ ] Verify no broken images
- [ ] Check browser console (no errors)

---

## 📊 PASS/FAIL CRITERIA

### Must Pass (Critical)
- ✅ All navigation links return 200 or redirect
- ✅ No duplicate navigation bars visible
- ✅ Pagination shows max 50 items per page
- ✅ Near Me doesn't timeout (has postcode fallback)
- ✅ Filtering works without page reload
- ✅ No broken images
- ✅ Mobile navigation works
- ✅ Zero linter errors
- ✅ Zero console errors

### Should Pass (High Priority)
- ✅ Skip link works (accessibility)
- ✅ ARIA labels present
- ✅ Keyboard navigation works
- ✅ SEO meta tags present
- ✅ Sitemaps validate
- ✅ Page load < 3 seconds
- ✅ Mobile responsive

### Nice to Pass (Medium Priority)
- ⭕ Lighthouse score > 90
- ⭕ All browsers tested
- ⭕ Rich results validate
- ⭕ No accessibility warnings

---

## 🐛 ISSUE TRACKING

### If You Find Issues

**Document:**
1. What page/feature
2. What action you took
3. Expected result
4. Actual result
5. Browser/device
6. Screenshots if applicable

**Report:**
- Create GitHub issue
- OR note in deployment doc
- Mark severity (Critical/High/Medium/Low)

**Fix:**
- Critical: Fix before production
- High: Fix within 24 hours of production
- Medium: Fix within 1 week
- Low: Add to backlog

---

## ✅ SIGN-OFF CHECKLIST

Before deploying to production:

- [ ] All critical tests passed
- [ ] Most high-priority tests passed
- [ ] No critical bugs found
- [ ] Staging environment tested
- [ ] Mobile tested
- [ ] SEO validated
- [ ] Performance acceptable
- [ ] Accessibility checked
- [ ] Documentation reviewed
- [ ] Rollback plan ready

**Signed off by:** _____________  
**Date:** _____________  
**Approved for production:** [ ] YES [ ] NO

---

## 📞 SUPPORT CONTACTS

**If Issues During Testing:**
- Check documentation first
- Review error messages
- Test in Incognito mode
- Clear cache and retry
- Check browser console

**If Issues Persist:**
- Document the issue
- Check if it existed before changes
- Use rollback plan if critical
- Contact development team

---

## 🎯 SUCCESS METRICS

### Deployment Success Criteria

**Technical:**
- ✅ 0 build errors
- ✅ 0 linter errors
- ✅ 0 console errors in production
- ✅ 0 broken links (404s)

**Functional:**
- ✅ All navigation works
- ✅ Pagination functional
- ✅ Filtering works
- ✅ Near Me operational
- ✅ Blog/FAQ accessible

**Performance:**
- ✅ Page load < 3s
- ✅ Filtering instant (< 100ms)
- ✅ No layout shift
- ✅ Images load properly

**User Experience:**
- ✅ Mobile responsive
- ✅ Accessible (WCAG AA)
- ✅ Error messages helpful
- ✅ Clear user feedback

---

*Document Version: 1.0*  
*Last Updated: November 3, 2025*  
*Status: ✅ Ready for Testing*


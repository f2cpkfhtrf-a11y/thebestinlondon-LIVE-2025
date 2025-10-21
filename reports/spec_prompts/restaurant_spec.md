# Restaurant Detail Page - Claude-Code Prompt

## Keywords Analysis
- **Primary Keywords**: restaurant name, cuisine type, location, reviews, menu
- **Secondary Keywords**: halal, FSA rating, price range, opening hours, contact
- **Search Volume**: high
- **Keyword Difficulty**: low

## Content Blocks Required
1. Hero section with image and key stats
2. About section with description
3. Menu section with links
4. Reviews section with ratings
5. Location section with map and contact
6. Similar restaurants recommendations

## Schema.org Fields
1. Restaurant schema with name, image, address, phone, cuisine, priceRange
2. AggregateRating schema with ratingValue and reviewCount
3. GeoCoordinates schema with latitude/longitude
4. BreadcrumbList schema for navigation

## Internal Link Strategy
1. Link to cuisine page
2. Link to area page
3. Link to similar restaurants
4. Link to menu if available

## UI Components (shadcn/ui)
1. shadcn/ui Card for restaurant info
2. shadcn/ui Badge for ratings and badges
3. shadcn/ui Button for actions
4. shadcn/ui Separator for sections

## Implementation Notes
- Use programmatic SEO with dynamic content generation
- Ensure all images are venue-first (no generic tiles as primary)
- Implement proper schema.org markup for search engines
- Use shadcn/ui components for consistent design
- Ensure mobile-responsive design
- Include proper meta tags and Open Graph data

## Technical Requirements
- Next.js static generation with getStaticProps
- Image optimization with next/image
- Proper error handling and fallbacks
- Performance optimization (Core Web Vitals)
- Accessibility compliance (WCAG 2.1 AA)

## Content Guidelines
- Write compelling, keyword-rich content
- Include local business information
- Add user-generated content (reviews, ratings)
- Ensure content is fresh and regularly updated
- Include call-to-action elements

## SEO Checklist
- [ ] Title tag optimized for primary keywords
- [ ] Meta description under 155 characters
- [ ] Header tags (H1, H2, H3) properly structured
- [ ] Schema.org markup implemented
- [ ] Internal linking strategy executed
- [ ] Image alt tags optimized
- [ ] URL structure clean and descriptive
- [ ] Page load speed optimized
- [ ] Mobile-friendly design
- [ ] Social media meta tags included

# Brand Guidelines
## The Best in London

### Brand Identity
**The Best in London** is a premium, curated directory of London's finest dining establishments. Our brand embodies sophistication, trust, and local expertise.

---

## Logo Usage

### Primary Logo
- File: `/public/brand/logo.svg`
- Minimum size: 40px × 40px
- Clear space: 10px on all sides
- Use on dark backgrounds

### Wordmark
- File: `/public/brand/wordmark.svg`
- Minimum width: 150px
- Use in headers, footers, and promotional materials

### Logo Don'ts
- ❌ Don't stretch or distort
- ❌ Don't change colors
- ❌ Don't add effects (shadows, gradients)
- ❌ Don't rotate
- ❌ Don't place on busy backgrounds

---

## Color Palette

### Primary Colors
```
Deep Black:    #0B0B0B  (Backgrounds)
Charcoal:      #111111  (Elevated surfaces)
Ivory White:   #FAFAFA  (Primary text)
Muted Gray:    #9AA0A6  (Secondary text)
```

### Accent Colors
```
Gold:          #D4AF37  (Premium highlights, ratings)
Emerald:       #10B981  (FSA badges, success states)
Border Gray:   #1F1F1F  (Subtle dividers)
Border Strong: #2A2A2A  (Prominent dividers)
```

### Semantic Colors
```
Error:         #EF4444
Warning:       #F59E0B
Info:          #3B82F6
```

---

## Typography

### Primary Fonts

**Playfair Display** (Serif)
- Usage: Headlines, hero sections, page titles
- Weights: 700 (Bold)
- Letter-spacing: -0.03em to -0.02em

**Inter** (Sans-serif)
- Usage: Body text, UI elements, descriptions
- Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Letter-spacing: Default to -0.01em for headings

### Type Scale
```
Hero:    64px / 700 / -0.04em  (Main headlines)
H1:      48px / 700 / -0.03em  (Page titles)
H2:      32px / 600 / -0.02em  (Section headers)
H3:      24px / 600 / -0.01em  (Subsections)
H4:      20px / 600 / 0         (Card titles)
Body:    16px / 400 / 0         (Main text)
Small:   14px / 400 / 0         (Metadata)
Micro:   12px / 500 / 0         (Badges, tags)
```

---

## Spacing System

```
xs:    4px
sm:    8px
md:    12px
base:  16px
lg:    20px
xl:    24px
2xl:   32px
3xl:   40px
4xl:   48px
5xl:   64px
```

Use multiples of 4px for consistent spacing throughout.

---

## Border Radius

```
sm:  8px   (Buttons, inputs)
md:  12px  (Cards)
lg:  16px  (Panels)
xl:  24px  (Hero sections)
```

---

## Shadows

```
Small:   0 2px 8px rgba(0,0,0,0.4)
Medium:  0 4px 16px rgba(0,0,0,0.5)
Large:   0 8px 32px rgba(0,0,0,0.6)
```

Use sparingly on dark theme. Shadows for elevation, not decoration.

---

## Component Styles

### Buttons

**Primary (CTA)**
- Background: #FAFAFA
- Text: #0B0B0B
- Hover: #E5E5E5
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600

**Secondary**
- Background: transparent
- Text: #FAFAFA
- Border: 1px solid #2A2A2A
- Hover: Border #3A3A3A
- Padding: 12px 24px
- Border-radius: 8px
- Font-weight: 600

### Cards

**Standard Card**
- Background: #111111
- Border: 1px solid #1F1F1F
- Border-radius: 12px
- Padding: 24px
- Hover: Transform translateY(-8px) + Shadow lg

**Image Card**
- Image height: 240px
- Object-fit: cover
- Border-radius: 12px 12px 0 0

### Badges

**FSA Badge**
- 5: Background #10B981, Text white
- 4: Background #10B981, Text white
- 3: Background #F59E0B, Text white
- 2: Background #EF4444, Text white
- 1: Background #EF4444, Text white

**Dietary Tags**
- Background: rgba(212, 175, 55, 0.1)
- Border: 1px solid rgba(212, 175, 55, 0.3)
- Text: #D4AF37
- Padding: 4px 12px
- Border-radius: 12px
- Font-size: 12px
- Font-weight: 500

---

## Voice & Tone

### Brand Voice
- **Sophisticated** but not pretentious
- **Knowledgeable** but approachable
- **Curated** with expert taste
- **Local** and authentic
- **Premium** without being exclusive

### Writing Guidelines
- Use British English (favour, centre, organised)
- Write in second person ("you'll love", "discover")
- Be specific and factual (numbers, ratings, credentials)
- Avoid clichés and superlatives unless earned
- Keep descriptions concise (2-3 sentences)
- Use active voice

### Example Headlines
✅ "60+ Halal Restaurants, FSA Verified"
✅ "Discover London's Hidden Gems"
✅ "Authentic Indian Cuisine in Shoreditch"

❌ "The Ultimate Guide to Food"
❌ "Amazing Restaurants You Must Try"
❌ "Best of the Best Dining Experiences"

---

## Imagery

### Photography Style
- Professional, high-quality food photography
- Natural lighting preferred
- Show actual venue interiors
- Avoid overly styled/unrealistic shots
- Include people where authentic

### Image Specifications
- Format: JPG (photos), PNG (graphics), WebP (web-optimized)
- Quality: 85% compression
- Dimensions: 800px × 600px minimum
- Aspect ratio: 4:3 or 16:9

---

## Iconography

### Style
- Line icons, not filled
- 24px × 24px standard size
- 2px stroke width
- Rounded corners (stroke-linecap: round)
- Match brand colors

### Common Icons
- Star (ratings)
- Location pin (address)
- Clock (opening hours)
- Phone (contact)
- Globe (website)
- Check (verified, FSA)
- Tag (dietary)

---

## Digital Assets

### Favicon
- Size: 32×32px, 16×16px
- Format: ICO, PNG
- Location: `/public/favicon.ico`

### Open Graph Image
- Size: 1200×630px
- Format: PNG or JPG
- Location: `/public/og-image.png`
- Include: Logo + tagline + key visual

### Apple Touch Icon
- Size: 180×180px
- Format: PNG
- Location: `/public/apple-touch-icon.png`

---

## Accessibility

### Contrast Ratios
- Text on Dark BG: Minimum 7:1 (AAA)
- Secondary Text: Minimum 4.5:1 (AA)
- Interactive Elements: Minimum 3:1

### Focus States
- Visible focus outline: 2px solid #D4AF37
- Offset: 2px
- Border-radius: match element

### Alt Text
- Descriptive for images
- Include venue name + location
- Example: "Dishoom King's Cross - Interior dining room"

---

## Animation & Motion

### Timing Functions
```
Fast:  150ms cubic-bezier(0.4, 0, 0.2, 1)
Base:  250ms cubic-bezier(0.4, 0, 0.2, 1)
Slow:  350ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Animations
- Hover: translateY(-8px) + shadow transition
- Fade in: opacity 0 → 1
- Slide up: translateY(20px) → 0
- Scale: scale(0.95) → 1

### Performance
- Use `transform` and `opacity` only
- Avoid animating `width`, `height`, `margin`
- Enable `will-change` sparingly
- Respect `prefers-reduced-motion`

---

## File Naming Conventions

### General Rules
- Use lowercase
- Use hyphens (kebab-case)
- Be descriptive
- Include dimensions for images

### Examples
```
✅ logo-primary.svg
✅ hero-image-1200x600.jpg
✅ icon-star-24.svg
✅ brand-guidelines-2025.pdf

❌ Logo.svg
❌ IMG_1234.jpg
❌ icon.svg
❌ BrandGuidelines.pdf
```

---

## Brand Applications

### Website
- Dark theme primary
- Gold accents for CTAs and highlights
- Playfair Display for headlines
- Inter for body text

### Social Media
- Use wordmark for profile images
- Maintain premium aesthetic
- Share venue photography with credits
- Tag venues when featured

### Print (if needed)
- Use high-res logo (300 DPI)
- Maintain color consistency
- Include website URL
- Keep design minimal and elegant

---

## Contact & Usage

For brand asset requests or usage questions:
- Email: brand@thebestinlondon.co.uk
- Website: thebestinlondon.co.uk

© 2025 The Best in London. All rights reserved.

---

**Version:** 1.0  
**Last Updated:** 15 October 2025

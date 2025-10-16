# The Best in London

A curated directory of London's finest restaurants, cafés, and bars.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Homepage**: Hero section with category cards for Restaurants, Cafés, and Bars
- **Restaurants Page**: Curated list of 10 London restaurants with ratings and reviews
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: JSON-LD schema markup for better search visibility
- **Premium Styling**: Gold accents (#D4AF37) and clean white background

## Tech Stack

- Next.js 13
- React 18
- Tailwind CSS
- Custom components and layouts

## Project Structure

```
├── components/
│   └── Layout.js          # Main layout component
├── pages/
│   ├── index.js          # Homepage
│   ├── restaurants.js    # Restaurants listing
│   └── _app.js          # App wrapper
├── public/
│   └── venues.json      # Restaurant data
├── styles/
│   └── globals.css      # Global styles and Tailwind
└── package.json
```

## Data

The restaurant data is stored in `public/venues.json` and includes:
- Restaurant name and area
- Rating and review count
- Address and cuisine type
- Price range and description

## Styling

The site uses a premium design inspired by BestDubai.com with:
- Gold accent color (#D4AF37)
- Clean white backgrounds
- Elegant typography with Inter font
- Smooth hover animations
- Mobile-responsive grid layouts





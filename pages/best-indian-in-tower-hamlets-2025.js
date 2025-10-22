import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestIndianInTowerHamlets2025() {
  const venues = [
  {
    "place_id": "ChIJI15BTT4ddkgRKuOlU11pmVo",
    "slug": "sultan-sofrasi-lU11pmVo",
    "name": "Sultan Sofrasi",
    "description": "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.4,
    "user_ratings_total": 1159,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "London, UK",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "postcode": "E3 2RU",
    "borough": "Tower Hamlets",
    "lat": 51.5340949,
    "lng": -0.0266244,
    "phone": "020 8983 9784",
    "phone_international": "+44 20 8983 9784",
    "website": "https://sultansofrasi.co.uk/bow-church/",
    "url": "https://maps.google.com/?cid=6528364984406500138",
    "opening_hours": {
      "open_now": false,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0000"
          },
          "open": {
            "day": 6,
            "time": "1100"
          }
        }
      ],
      "weekday_text": [
        "Monday: 11:00 AM – 11:00 PM",
        "Tuesday: 11:00 AM – 11:00 PM",
        "Wednesday: 11:00 AM – 11:00 PM",
        "Thursday: 11:00 AM – 11:00 PM",
        "Friday: 11:00 AM – 12:00 AM",
        "Saturday: 11:00 AM – 12:00 AM",
        "Sunday: 11:00 AM – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "indian",
        "area": "Tower Hamlets",
        "provenance": "curated_food_image",
        "venueName": "Sultan Sofrasi",
        "venueId": 676
      }
    ],
    "reviews": [
      {
        "author_name": "Noncel Herbert",
        "author_url": "https://www.google.com/maps/contrib/103071224223643312732/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJbR6SCweFQc5Xsvt_EoClLjW3B3RKmzZDmGp_BywjWhBOeY4AW=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 4,
        "relative_time_description": "a week ago",
        "text": "Food is always delicious here. Quick service and waiter Irina was amazing and helpful, would highly recommend this place. Everything is worth a try :))",
        "time": 1759522541,
        "translated": false
      },
      {
        "author_name": "Selina Khan",
        "author_url": "https://www.google.com/maps/contrib/112687883446707554670/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJEAI5RSZpjFvjed0QvQxCUOIhvRGK992Xf5TrEatr7yGb-xA=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "a week ago",
        "text": "Elina was an excellent waitress – warm, attentive, and welcoming. The food was fresh, delicious, and full of flavour. The atmosphere was relaxing, making it a very enjoyable dining experience. To top it all off, we were even treated to a complimentary dessert, which was a lovely surprise.",
        "time": 1759520632,
        "translated": false
      },
      {
        "author_name": "Irida Anna Trika",
        "author_url": "https://www.google.com/maps/contrib/112336911140451157516/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVI9TDFIPBz37yzyeuDjejfpLJIWnURg8S4CVZqBlLl1MqFdNcI=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "3 months ago",
        "text": "Really nice food. Really tasty and fresh. Definitely recommend and will definitely go back.\n\nOn the other hand, the atmosphere was a bit of a kill. The lights were too bright and the space smelled a bit due to the kitchen being in the open. Chairs were a tad uncomfortable. We went dressed up before we go out and the vibe felt a bit off.\n\nTips:\ndim the lighting/ change the light bulbs at the eating area.\nAdd candles\nCreate atmosphere with 2/3 tones in the space as the walls were flat and monotonous.\nMenu seemed a bit too colourful and tightly made and the colours didn't match the room or the tables or the fancy plates.\n\nEating good food for a good price while also feeling comfortable to dress up will definitely triple the customers.",
        "time": 1752444638,
        "translated": false
      },
      {
        "author_name": "Claudia S",
        "author_url": "https://www.google.com/maps/contrib/110595149982393955169/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKVOwcmoCL02B_j4YZc05AMv0Oac9QgXzeyv1Vb0uPvU0zP=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "2 weeks ago",
        "text": "Food is really good & portions are also on point. Stefanie the serving lady greeted me with a smile on her face & was very nice & helpful 🙌🏽  They make the best tasting pinacolada everrrrr 🍹🫶🏽",
        "time": 1759325780,
        "translated": false
      },
      {
        "author_name": "abida tasnim",
        "author_url": "https://www.google.com/maps/contrib/117628124772279275735/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWIufKl2r5PGbZImf6DjBkdqfQvN8y437FQsTWERzugUUInBHBxKQ=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 4,
        "relative_time_description": "2 months ago",
        "text": "Fresh , tasty food . If you love Turkish food, this is the perfect place for you. We ordered lamb shish kabab, chicken doner kabab and chicken soup. We didn’t like the chicken soup . Kababs were top notch though. Loved the ambience and their service . The restaurant was clean and spacious.",
        "time": 1754949137,
        "translated": false
      }
    ],
    "types": [
      "bar",
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "discoveredBy": {
      "query": "halal restaurant near Stratford station",
      "area": "Stratford",
      "type": "halal-station"
    },
    "fsa_rating": 5,
    "fsa_rating_text": "5",
    "fsa_authority": "Tower Hamlets",
    "fsa_url": "https://ratings.food.gov.uk/business/458893",
    "lastVerifiedGoogle": "2025-10-16T23:14:08.489Z",
    "lastVerifiedFSA": "2025-10-16T23:33:05.522Z",
    "createdAt": "2025-10-16T23:14:08.489Z",
    "updatedAt": "2025-10-16T23:14:36.063Z",
    "fsa_last_inspection": "2024-11-04T00:00:00",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Sultan Sofrasi — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_sultan-sofrasi_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.564Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Sultan Sofrasi",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 1159
      },
      "url": "https://thebestinlondon.co.uk/restaurant/sultan-sofrasi-lU11pmVo",
      "openingHours": [
        "Monday: 11:00 AM – 11:00 PM",
        "Tuesday: 11:00 AM – 11:00 PM",
        "Wednesday: 11:00 AM – 11:00 PM",
        "Thursday: 11:00 AM – 11:00 PM",
        "Friday: 11:00 AM – 12:00 AM",
        "Saturday: 11:00 AM – 12:00 AM",
        "Sunday: 11:00 AM – 11:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.660Z",
    "image_card_path": "/images/restaurants/sultan-sofrasi-lU11pmVo/indian-sultan-sofrasi-lU11pmVo-card-93ac8c7a.webp",
    "image_hero_path": "/images/restaurants/sultan-sofrasi-lU11pmVo/indian-sultan-sofrasi-lU11pmVo-hero-2a0b2592.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJsxaTbWAddkgR-b_-qOdDlq0",
    "slug": "hichki-indian-restaurant--qOdDlq0",
    "name": "Hichki Indian Restaurant",
    "description": "From royal kitchens to London tables - Indian cuisine elevated to an art form. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.3,
    "user_ratings_total": 1372,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "London, UK",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "postcode": "E1 1EW",
    "borough": "Tower Hamlets",
    "lat": 51.5168179,
    "lng": -0.0676066,
    "phone": "020 7377 5555",
    "phone_international": "+44 20 7377 5555",
    "website": "https://hichkilondon.com/",
    "url": "https://maps.google.com/?cid=12508259677319905273",
    "opening_hours": {
      "open_now": false,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2245"
          },
          "open": {
            "day": 0,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2245"
          },
          "open": {
            "day": 1,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2245"
          },
          "open": {
            "day": 2,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2245"
          },
          "open": {
            "day": 3,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2245"
          },
          "open": {
            "day": 4,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0045"
          },
          "open": {
            "day": 5,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0045"
          },
          "open": {
            "day": 6,
            "time": "1130"
          }
        }
      ],
      "weekday_text": [
        "Monday: 11:30 AM – 10:45 PM",
        "Tuesday: 11:30 AM – 10:45 PM",
        "Wednesday: 11:30 AM – 10:45 PM",
        "Thursday: 11:30 AM – 10:45 PM",
        "Friday: 11:30 AM – 12:45 AM",
        "Saturday: 11:30 AM – 12:45 AM",
        "Sunday: 11:30 AM – 10:45 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "indian",
        "area": "Tower Hamlets",
        "provenance": "curated_food_image",
        "venueName": "Hichki Indian Restaurant",
        "venueId": 473
      }
    ],
    "reviews": [
      {
        "author_name": "Hitesh Sharma",
        "author_url": "https://www.google.com/maps/contrib/115860393929479525337/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXiWv7Dp1d25Fzo-KYNNSSPY5CX--5WBtI-GjbS0dE9ANGiVjby2g=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Great find in Whitechapel for a quick, tasty meal at good prices and good portions.  I was dining alone 7 opted for the mixed grill, chips and naan.  All were nice, hot and tasty.  Service was quick and the staff were friendly.  Some of the decor like the wallpaper is worn, peeling or been stuck back on with tape so the place could do with some investment on it's maintenance, as it did seem to be busy, so getting it spruced up can only attract more people.",
        "time": 1753788387,
        "translated": false
      },
      {
        "author_name": "Abhishek Singh",
        "author_url": "https://www.google.com/maps/contrib/112830902449685404394/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUIRqIW67eQKMGdf4ltrcriFetCEj7ZGVgC4yvB54C5b053gljocw=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "a month ago",
        "text": "The restaurant looks new, with excellent ambiance. I have been to all the Indian Restaurants around Budapest but the staff and food here is one of the best. Excellent location, close to the Chain Bridge. I suggest trying their South Indian food.",
        "time": 1755759566,
        "translated": false
      },
      {
        "author_name": "Patrick C",
        "author_url": "https://www.google.com/maps/contrib/106249309631738449233/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjX37pKQnyn-gYD9XXcjnsyAyJGqCeZRWdKAchdFzo-dFxKm2_xX=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "6 months ago",
        "text": "Wow, what a fabulous feast!! We were greeted by a very warm welcome from Sristi and presented with a tasty and compact menus with great prices and very generous dishes full of authentic Indian flavour. The signature grill was an exceptional choice. Highly recommended restaurant and will come back again for sure.",
        "time": 1743196700,
        "translated": false
      },
      {
        "author_name": "Arian Ahmed",
        "author_url": "https://www.google.com/maps/contrib/112647055590511896855/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKWOq9DiocHoOtuAtR0H6MAyAASWBNT2A5CzVCZidmBcQE-dA=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "We visited at the beginning of July and were warmly welcomed by the friendly staff offering gelato samples outside the shop. They were incredibly kind and helpful, guiding us through the flavors and letting us taste a few.\n\nBefore leaving, we asked for a takeaway bag — and to our surprise, the guy handed us an extra cup with the two best flavors to try. Such a thoughtful and generous gesture!\n\nAmazing service and truly delicious gelato. We'll definitely come back!",
        "time": 1753126608,
        "translated": false
      },
      {
        "author_name": "Madeline Smith",
        "author_url": "https://www.google.com/maps/contrib/100364943768897650400/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKXNtgcV48OLg6vCfUwvDbJvvcFOwOA3RvbbLqL6Smv2lnfsw=s128-c0x00000000-cc-rp-mo",
        "rating": 1,
        "relative_time_description": "3 months ago",
        "text": "Last night, I ordered food through Uber Eats. I’m not usually someone who leaves negative reviews, but I felt this needed to be said.\n\nUnfortunately, the food was quite disappointing. Despite the positive reviews that got me excited to order, the experience didn’t match the expectations. The lamb chops were burnt, the Peshwari naan was very dry, the garlic naan lacked any garlic flavor, and the butter chicken tasted overwhelmingly of tomato.",
        "time": 1752305410,
        "translated": false
      }
    ],
    "types": [
      "bar",
      "establishment",
      "food",
      "night_club",
      "point_of_interest",
      "restaurant",
      "store"
    ],
    "discoveredBy": {
      "query": "restaurant Whitechapel London",
      "area": "Whitechapel",
      "type": "area"
    },
    "fsa_rating": 4,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:01.918Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:01.918Z",
    "updatedAt": "2025-10-16T23:14:36.056Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Hichki Indian Restaurant — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_hichki-indian-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.498Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Hichki Indian Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.3,
        "reviewCount": 1372
      },
      "url": "https://thebestinlondon.co.uk/restaurant/hichki-indian-restaurant--qOdDlq0",
      "openingHours": [
        "Monday: 11:30 AM – 10:45 PM",
        "Tuesday: 11:30 AM – 10:45 PM",
        "Wednesday: 11:30 AM – 10:45 PM",
        "Thursday: 11:30 AM – 10:45 PM",
        "Friday: 11:30 AM – 12:45 AM",
        "Saturday: 11:30 AM – 12:45 AM",
        "Sunday: 11:30 AM – 10:45 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/hichki-indian-restaurant--qOdDlq0/indian-hichki-indian-restaurant--qOdDlq0-card-ed9567e3.webp",
    "image_hero_path": "/images/restaurants/hichki-indian-restaurant--qOdDlq0/indian-hichki-indian-restaurant--qOdDlq0-hero-cafd495f.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Indian Restaurants in Tower Hamlets (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest indian restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Tower Hamlets." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-indian-in-tower-hamlets-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Indian Restaurants in Tower Hamlets (2025)" />
        <meta property="og:description" content="Discover the finest indian restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Tower Hamlets." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-indian-in-tower-hamlets-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Indian Restaurants in Tower Hamlets (2025)" />
        <meta name="twitter:description" content="Discover the finest indian restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Tower Hamlets." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Indian Restaurants in Tower Hamlets (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-indian-in-tower-hamlets-2025',
          itemCount: venues.length,
          items: venues.map(venue => ({ name: venue.name, slug: venue.slug }))
        })) }} />
      </Head>

      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link href="/cuisines" className="hover:text-white transition-colors">Cuisines</Link>
              <span>›</span>
              <Link href="/indian-restaurants-london" className="hover:text-white transition-colors">Indian</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-tower-hamlets" className="hover:text-white transition-colors">Tower Hamlets</Link>
              <span>›</span>
              <span className="text-white">Best Indian in Tower Hamlets (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Indian Restaurants in Tower Hamlets (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest indian restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Tower Hamlets.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/sultan-sofrasi-lU11pmVo" className="hover:text-yellow-600 transition-colors">
                Sultan Sofrasi
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.4</span>
              <span>📝 1,159 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Sultan Sofrasi offers exceptional indian cuisine in Tower Hamlets. With a 4.4-star rating from 1,159 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/sultan-sofrasi-lU11pmVo" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/hichki-indian-restaurant--qOdDlq0" className="hover:text-yellow-600 transition-colors">
                Hichki Indian Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.3</span>
              <span>📝 1,372 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Hichki Indian Restaurant offers exceptional indian cuisine in Tower Hamlets. With a 4.3-star rating from 1,372 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/hichki-indian-restaurant--qOdDlq0" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    
          </div>

          {/* Internal Links */}
          
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/restaurants-tower-hamlets" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          More Tower Hamlets Restaurants
        </a>
        <a href="/indian-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Indian Restaurants
        </a>
        <a href="/areas" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Areas
        </a>
        <a href="/cuisines" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Cuisines
        </a>
      </div>
    </div>
  

          {/* More to Explore */}
          
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">More to Explore</h3>
              <p className="text-gray-300 mb-4">
                Discover more indian restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/indian-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Indian Restaurants
                </a>
                <a href="/restaurants-tower-hamlets" className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors">
                  All Tower Hamlets Restaurants
                </a>
              </div>
            </div>
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
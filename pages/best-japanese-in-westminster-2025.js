import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { asCollectionPage } from '../../lib/factory/pageFactory';

export default function BestJapaneseInWestminster2025() {
  const venues = [
  {
    "place_id": "ChIJB-cY1hgFdkgRJ8lzg_TLvpA",
    "slug": "peacock-london-zg_TLvpA",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJB-cY1hgFdkgRJ8lzg_TLvpA",
    "name": "Peacock London",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 551,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "County Hall, Westminster Bridge Rd, The Queen's Walk, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "County Hall, Westminster Bridge Rd, The Queen's Walk, London",
    "postcode": "SE1 7PB",
    "borough": "Westminster",
    "lat": 51.50231059999999,
    "lng": -0.1194993,
    "phone": "020 7928 8728",
    "phone_international": "+44 20 7928 8728",
    "website": "https://www.peacocklondon.com/",
    "url": "https://maps.google.com/?cid=10429998038074509607",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 11:00 AM – 10:30 PM",
        "Tuesday: 11:00 AM – 10:30 PM",
        "Wednesday: 11:00 AM – 10:30 PM",
        "Thursday: 11:00 AM – 10:30 PM",
        "Friday: 11:00 AM – 11:30 PM",
        "Saturday: 11:00 AM – 11:30 PM",
        "Sunday: 11:00 AM – 10:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2200"
          },
          "open": {
            "day": 0,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2230"
          },
          "open": {
            "day": 1,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2330"
          },
          "open": {
            "day": 5,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2330"
          },
          "open": {
            "day": 6,
            "time": "1100"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2d-l4_QuDlsiAuEOHLytf1iZnAr-BioHq0X--SVWE0PBrqjthDKNLMsynZxmG7TBB2V71Pq1yV2Jp5520qH2u8BbTMbLYJtBrHaQdzfaS8gsqN13F3vS2hFswE50oMFtNmNFr9H6rV1rV_oJKsEPiaqY2r04xdah9TTfLYu7bkE1l2739VvmF8dU5aKPiIr8zxv5LeMjyQOrP631oW1RoXBSiVmA2QKBoOUK6QvrDvX9gdv81zdnL-01WFwUi1BpR8OhbFyAnH1Pdc1eOFhnn5k3O8A6PoQ5xR1rURJAILFYg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d-l4_QuDlsiAuEOHLytf1iZnAr-BioHq0X--SVWE0PBrqjthDKNLMsynZxmG7TBB2V71Pq1yV2Jp5520qH2u8BbTMbLYJtBrHaQdzfaS8gsqN13F3vS2hFswE50oMFtNmNFr9H6rV1rV_oJKsEPiaqY2r04xdah800TTfLYu7bkE1l2739VvmF8dU5aKPiIr8zxv5LeMjyQOrP631oW1RoXBSiVmA2QKBoOUK6QvrDvX9gdv81zdnL-01WFwUi1BpR8OhbFyAnH1Pdc1eOFhnn5k3O8A6PoQ5xR1rURJAILFYg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107473947875346965026\">Peacock London</a>"
        ]
      },
      {
        "reference": "AciIO2f303a9R42iSsYmCQEJ9jAMnDQ2K7PfWcfwmbYKWGMOu2pP7GW5VvjZ8NVVLEHVjpxnxlLQOAZDMC-owMnoreQ2HhkGZWDSDND0ub-WBVtl_e0FszFQywYtsmQM_FJ2wUD8M4gCSy-J-vPk85Vi_OMPxTDhZ_KtIvdmo_Xa1yNqGvq6HQnL8ZUmLHcbFtpeSivBQhp7kDxq5uKnqel3QtV2ksT0W0VZqeeEowrDD6SnZLxSBWxtY58Iac0fX156q4dINB_NtLSLPVWIbiZQKz0NJnyQnm9MXSglR7D6k0QmRA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f303a9R42iSsYmCQEJ9jAMnDQ2K7PfWcfwmbYKWGMOu2pP7GW5VvjZ8NVVLEHVjpxnxlLQOAZDMC-owMnoreQ2HhkGZWDSDND0ub-WBVtl_e0FszFQywYtsmQM_FJ2wUD8M4gCSy-J-vPk85Vi_OMPxTDhZ_KtIvdmo_Xa1yNqGvq6HQnL8ZUmLHcbFtpeSivBQhp7kDxq5uKnqel3QtV2ksT0W0VZqeeEowrDD6SnZLxSBWxtY58Iac0fX156q4dINB_NtLSLPVWIbiZQKz0NJnyQnm9MXSglR7D6k0QmRA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107473947875346965026\">Peacock London</a>"
        ]
      },
      {
        "reference": "AciIO2f-dZCwebKnaA_ljUZdfJZjV_n4r4_pPNTAQOIEjp5Hay-KuENe9suNH3ULJHl7GHjMopJk9musMj7VTOtG6muudGLyMANhDxQPcBtZeJkwblBL1-0vnE9nQk_0J6Q9nxuQ5xTeQUAJEiyTJ4NX44qSLfzSPrzP5a0BYI9wwnLFVwxDzFA0OkiCa74X6XmpYTfcAliRZ77UZsH3fMA37MCYanFjHwh0_3gcSpj46Aikdegqc0ZiBVN4fX4mwVvZ27cfw-zoEveMMsPJEmCy1hho-4rYgCrYkuR9EN8nZcWSO-qsIx5G2eC_yrAOBB3mLW1qwQRpy4LPXuoPT8ETUtuxDrd012pZRsDxc5QH4NIbPLAiGJy7OJHeyW5k7NO8xd1puzu1itzdOEu5Wk33-7qUByB5qJrnBtEfgHsRycEPMl2xNLPII8XQe6-zT329",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f-dZCwebKnaA_ljUZdfJZjV_n4r4_pPNTAQOIEjp5Hay-KuENe9suNH3ULJHl7GHjMopJk9musMj7VTOtG6muudGLyMANhDxQPcBtZeJkwblBL1-0vnE9nQk_0J6Q9nxuQ5xTeQUAJEiyTJ4NX44qSLfzSPrzP5a0BYI9wwnLFVwxDzFA0OkiCa74X6XmpYTfcAliRZ77UZsH3fMA37MCYanFjHwh800_3gcSpj46Aikdegqc0ZiBVN4fX4mwVvZ27cfw-zoEveMMsPJEmCy1hho-4rYgCrYkuR9EN8nZcWSO-qsIx5G2eC_yrAOBB3mLW1qwQRpy4LPXuoPT8ETUtuxDrd012pZRsDxc5QH4NIbPLAiGJy7OJHeyW5k7NO8xd1puzu1itzdOEu5Wk33-7qUByB5qJrnBtEfgHsRycEPMl2xNLPII8XQe6-zT329&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104992396017548222908\">Misha</a>"
        ]
      },
      {
        "reference": "AciIO2ejr7viF9HboKjbMomQJOVWTuc9W3IE_Dcup3D9L0ciWPKL6FIqxzTTf1QPM7_svdYPn46AwqUGP0LcR1iThLCm5J4tkf3K3luC96DcA0CVyvHmIZiOgffpl7LahV7MYnM1JK6feykieoV2eY4psSOhGkmg6UM_9iLa7B5ZXNX52dKbNBh7Y4IALZgR2EoduSBTMLXDsI6bEuEeVFqnWL1O6eJURRlKQjRBcy1UvTpTOJYFea2B4gGPbXOiMG089WK-1Yqkf7UFpJh_kgNny2iHHHt3cjFLCSL2oCEELyVwNA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ejr7viF9HboKjbMomQJOVWTuc9W3IE_Dcup3D9L0ciWPKL6FIqxzTTf1QPM7_svdYPn46AwqUGP0LcR1iThLCm5J4tkf3K3luC96DcA0CVyvHmIZiOgffpl7LahV7MYnM1JK6feykieoV2eY4psSOhGkmg6UM_9iLa7B5ZXNX52dKbNBh800Y4IALZgR2EoduSBTMLXDsI6bEuEeVFqnWL1O6eJURRlKQjRBcy1UvTpTOJYFea2B4gGPbXOiMG089WK-1Yqkf7UFpJh_kgNny2iHHHt3cjFLCSL2oCEELyVwNA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107473947875346965026\">Peacock London</a>"
        ]
      },
      {
        "reference": "AciIO2e6gbfmGmtpkvqG1ldoyGzylQ4WjgBxoEmQlXY56K5VrtDruswulYtP_CAM1E7aR3okH7uS7JDWGMg6VeV_MOkFUim2y2_djaY3rUJvd4lSL7rKNOen6HxmG8JSYbX7Gz-qdiJpjSwrgFfrR_1lgzC1sDJ7DcGb6WWv4OTABTj-DP9hKSvEjNLpS1daltqBXbMW5KnB_TSGtCebbaEGgQ7Yfb7GTsEy3DRR8AfyOG2v19CXPNf1TSXG7r3sAMAPIL7v5S-t-vMuaUbTKxXURqbShjDTmcy9Ilx9-BwK7lCUb0arT0H0bIsXZKO5xDw_8jqRvgUNC0qDp0axx7YkNJKwhRDs0C1kdbX3fnINrx_NdW7hBT9SIEaOMa3d7Q1KxIJEvh6NUgmwSnMg6CSL8neR0ZzwvFTXXVf3pjxp8fXoQxaiT1e84XerzpAzSJet",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e6gbfmGmtpkvqG1ldoyGzylQ4WjgBxoEmQlXY56K5VrtDruswulYtP_CAM1E7aR3okH7uS7JDWGMg6VeV_MOkFUim2y2_djaY3rUJvd4lSL7rKNOen6HxmG8JSYbX7Gz-qdiJpjSwrgFfrR_1lgzC1sDJ7DcGb6WWv4OTABTj-DP9hKSvEjNLpS1daltqBXbMW5KnB_TSGtCebbaEGgQ7Yfb7GTsEy3DRR8AfyOG2v19CXPNf1TSXG7r3sAMAPIL7v5S-t-vMuaUbTKxXURqbShjDTmcy9Ilx9-BwK7lCUb0arT0H0bIsXZKO5xDw_8jqRvgUNC0qDp0axx7YkNJKwhRDs0C1kdbX3fnINrx_NdW7hBT9SIEaOMa3d7Q1KxIJEvh800NUgmwSnMg6CSL8neR0ZzwvFTXXVf3pjxp8fXoQxaiT1e84XerzpAzSJet&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104990502301686634151\">Inna Khadka</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "PAUL G",
        "rating": 5,
        "text": "We booked this Chinese restaurant for lunch which was located at the very prime tourist location.  Initially we thought it was a place mainly for tourists.  Upon arrival, we were led to a window table that had a great view of the Bog Ben.  They were having a summer special that a whole Peking Duck was at a reduced price from £118 to £68.  With no second thought, we ordered the duck right the way.  Along with the duck, we also ordered a few dim sum which were very nicely presented.  It's a pity they didn't cut up the duck in front of us.  Price wise, it was higher than those in Chinatown by 20-30% but it was still reasonable for this location.  Their wait staff were very friendly and helpful.  The two hours of dining went by quickly.  I  would love to try their abalone on my next visit.",
        "time": 1754936002,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Vinh H Nguyen",
        "rating": 4,
        "text": "Tasty dishes in pleasant atmosphere. Some of the tables have great view to Big Ben. Friendly and polite staff.\nBut; we were a group of 25 guests. The staff should take time to present the set menus and how to eat the dishes because not all the guests were familiar with Cantonese food. With such big group, they should have a lead staff to coordinate the tables. Pity!",
        "time": 1756625050,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Cameron Maclean",
        "rating": 5,
        "text": "Excellent authentic Chinese food, beautifully presented.   The location on the river opposite Westminster is great, from our table we looked out the window across the tanes and Westminster Bridge  and Big Ben and Parliament House. Price wise very reasonable, I have paid more for Pub Meals no where the quality of the food we ate here.Our favourite dish was the lamb with cumin.",
        "time": 1759755846,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Jennifer M",
        "rating": 5,
        "text": "Delicious Chinese with a breathtaking view!\nPopped in while visiting London for the first time and I loved it. I would recommend booking to secure a spot with the view, I hadn’t but luckily there was a spot and the lovely staff let us sit in one.\nThe food was delicious, particularly loved the beef with black bean sauce.\nI will definitely be coming back and recommending this place to anyone popping over to London.",
        "time": 1755634066,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Katia “Katie” Edward",
        "rating": 5,
        "text": "Amazing views of the London Eye, Parliament, and the Thames made this dinner special from the start. The food was next-level — flavourful, beautifully presented, and far above your typical Chinese restaurant. Staff were friendly and professional throughout. A fantastic experience all around. Highly recommended!",
        "time": 1751399917,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
      "bar",
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:53:32.317Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:32.317Z",
    "updatedAt": "2025-10-16T20:24:27.932Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Peacock London — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_peacock-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.434Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Peacock London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "County Hall, Westminster Bridge Rd, The Queen's Walk, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 551
      },
      "url": "https://thebestinlondon.co.uk/restaurant/peacock-london-zg_TLvpA",
      "openingHours": [
        "Monday: 11:00 AM – 10:30 PM",
        "Tuesday: 11:00 AM – 10:30 PM",
        "Wednesday: 11:00 AM – 10:30 PM",
        "Thursday: 11:00 AM – 10:30 PM",
        "Friday: 11:00 AM – 11:30 PM",
        "Saturday: 11:00 AM – 11:30 PM",
        "Sunday: 11:00 AM – 10:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/peacock-london-zg_TLvpA/japanese-peacock-london-zg_TLvpA-card-88aacdd5.webp",
    "image_hero_path": "/images/restaurants/peacock-london-zg_TLvpA/japanese-peacock-london-zg_TLvpA-hero-4d042361.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Japanese Restaurants in Westminster (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest japanese restaurants in Westminster for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Westminster." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-japanese-in-westminster-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Japanese Restaurants in Westminster (2025)" />
        <meta property="og:description" content="Discover the finest japanese restaurants in Westminster for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Westminster." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-japanese-in-westminster-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japanese Restaurants in Westminster (2025)" />
        <meta name="twitter:description" content="Discover the finest japanese restaurants in Westminster for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Westminster." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Japanese Restaurants in Westminster (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-japanese-in-westminster-2025',
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
              <Link href="/japanese-restaurants-london" className="hover:text-white transition-colors">Japanese</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-westminster" className="hover:text-white transition-colors">Westminster</Link>
              <span>›</span>
              <span className="text-white">Best Japanese in Westminster (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Japanese Restaurants in Westminster (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest japanese restaurants in Westminster for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Westminster.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/peacock-london-zg_TLvpA" className="hover:text-yellow-600 transition-colors">
                Peacock London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 551 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Peacock London offers exceptional japanese cuisine in Westminster. With a 4.5-star rating from 551 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/peacock-london-zg_TLvpA" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJB-cY1hgFdkgRJ8lzg_TLvpA" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    
          </div>

          {/* Internal Links */}
          
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/restaurants-westminster" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          More Westminster Restaurants
        </a>
        <a href="/japanese-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Japanese Restaurants
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
                Discover more japanese restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/japanese-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Japanese Restaurants
                </a>
                <a href="/restaurants-westminster" className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors">
                  All Westminster Restaurants
                </a>
              </div>
            </div>
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestMediterraneanInTowerHamlets2025() {
  const venues = [
  {
    "place_id": "ChIJWzWzp8ocdkgR5RIcO94iwvs",
    "slug": "dulce-coffee-london-cO94iwvs",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJWzWzp8ocdkgR5RIcO94iwvs",
    "name": "Dulce Coffee London",
    "description": "A classic coffee shop drink menu alongside assorted sandwiches & baked goods with outdoor tables.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 1550,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "86 Whitechapel High St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "86 Whitechapel High St, London",
    "postcode": "E1 7QX",
    "borough": "Tower Hamlets",
    "lat": 51.5158958,
    "lng": -0.07057089999999999,
    "phone": "020 7375 1636",
    "phone_international": "+44 20 7375 1636",
    "website": "http://www.dulcecoffeeandkitchen.com/",
    "url": "https://maps.google.com/?cid=18141100586871558885",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 7:00 AM – 5:00 PM",
        "Tuesday: 7:00 AM – 5:00 PM",
        "Wednesday: 7:00 AM – 5:00 PM",
        "Thursday: 7:00 AM – 5:00 PM",
        "Friday: 7:00 AM – 5:00 PM",
        "Saturday: 7:00 AM – 5:00 PM",
        "Sunday: 7:00 AM – 5:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1700"
          },
          "open": {
            "day": 0,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1700"
          },
          "open": {
            "day": 1,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1700"
          },
          "open": {
            "day": 2,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1700"
          },
          "open": {
            "day": 3,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1700"
          },
          "open": {
            "day": 4,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1700"
          },
          "open": {
            "day": 5,
            "time": "0700"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1700"
          },
          "open": {
            "day": 6,
            "time": "0700"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2fgg5jm91SsATrxCzN1UYXhmqtWtNeS8El8t3ra81SGYzrm_2emMSjOnNW2vW5ka4fYxEi1pLUT4k7uRLH3mCK3BEEJ6xB_OEKbf_1RvEvAIDb7UjxSRh_39J7vfy6fliDq1NINKsTFrzrZP-9eMMpCRvssc4-fSltcxnwnQwihNtVyDhsqS7te4IKLoX_AHY8cAooYtD3ki3pOiOtTtF7g_Yl6Y-B1HMWFH7AaSqFFtgj9BvfF9fVx4GgLYCVu4OHYFAYx1-MbE_9QMpSVg_e7HMcrQTA8F3JeSNAIMsSFiw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fgg5jm91SsATrxCzN1UYXhmqtWtNeS8El8t3ra81SGYzrm_2emMSjOnNW2vW5ka4fYxEi1pLUT4k7uRLH3mCK3BEEJ6xB_OEKbf_1RvEvAIDb7UjxSRh_39J7vfy6fliDq1NINKsTFrzrZP-9eMMpCRvssc4-fSltcxnwnQwihNtVyDhsqS7te4IKLoX_AHY8cAooYtD3ki3pOiOtTtF7g_Yl6Y-B1HMWFH7AaSqFFtgj9BvfF9fVx4GgLYCVu4OHYFAYx1-MbE_9QMpSVg_e7HMcrQTA8F3JeSNAIMsSFiw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102810474304838603706\">Dulce Coffee London</a>"
        ]
      },
      {
        "reference": "AciIO2e96ZbZe-kXd_1lc7wwPEvRJU98OUy6dDNBTkcLWlha_7teWCKKYoaeiq5qWQ31BeGbTDRoPk6bpKJq0BBAxx4urJ7Et9clEenXX_FD264dRHpmob30qnYPDyVXETq38DOf2iJ3vzqVVzao_bVpyuNDcEGUm1W01co6K6driw8Py7BtOhjuz9kkXf-5uq55VD7vCLOdbuIaaM5uZSBhrVwptJxvjEl8-IkuWDd_JT9MtMn1qtWSmlHbj0ZZXiASk-I6KLQQ5eTOHFj2K7ckMHY96s4qSGduYm4mdgEDc0tT1exuOHmIRhCAFNmkR54VEMCHDb-DJwKd_twRjevWh6MKXalWNLC4Uj3mAQ66VU_5wa1NoxxhacLkdjZwdlrep2E9d42DeGZQV-x5ZDch9hFIkAajtIBB7rVpDcXvzSye0ki3mQztsEWKPDOBWfQ6",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e96ZbZe-kXd_1lc7wwPEvRJU98OUy6dDNBTkcLWlha_7teWCKKYoaeiq5qWQ31BeGbTDRoPk6bpKJq0BBAxx4urJ7Et9clEenXX_FD264dRHpmob30qnYPDyVXETq38DOf2iJ3vzqVVzao_bVpyuNDcEGUm1W01co6K6driw1200Py7BtOhjuz9kkXf-5uq55VD7vCLOdbuIaaM5uZSBhrVwptJxvjEl8-IkuWDd_JT9MtMn1qtWSmlHbj0ZZXiASk-I6KLQQ5eTOHFj2K7ckMHY96s4qSGduYm4mdgEDc0tT1exuOHmIRhCAFNmkR54VEMCHDb-DJwKd_twRjevWh800MKXalWNLC4Uj3mAQ66VU_5wa1NoxxhacLkdjZwdlrep2E9d42DeGZQV-x5ZDch9hFIkAajtIBB7rVpDcXvzSye0ki3mQztsEWKPDOBWfQ6&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107913397522030675071\">Time Less</a>"
        ]
      },
      {
        "reference": "AciIO2d-vSa13PpTd_0fgTY01fIsvxSwWfQAa5fQW-wQ5O-FEuMakg5sJpVU8wavCi5OtUpOwLgrPTEX3cVqEsIv92oGinSr38M-9H5WixNnFTDblahkqqya8NNpYJQqj_x7OhPxWmOZ36TXMV0uOJC7dsDzj8vXKIAojltY-DMTGA3N7iAic1pLqvyftukkPrReHhqj98sjJ57wgO4PsJ1CqmeyZK9MnKfNYSPQ5my3yerjWXvpKEOcDKmur_l69ZaoP5W1TOFD7XoGzUqdLAU238S4mtVQ71F9PSsFlx6wrIp8A9UQ3r1imw2ib9zHvmDBUFGoGxjtbROX7uu3mKHwM3hk0RdX0Trlk558vDr355iA4N0EeEplDCVgDl42xr3wu_iJBiBmWzLX4l-43m9lWC8_U-NjUOgesEztxDbw8rtgMdObmJYQmx_ZRfP_HQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d-vSa13PpTd_0fgTY01fIsvxSwWfQAa5fQW-wQ5O-FEuMakg5sJpVU8wavCi5OtUpOwLgrPTEX3cVqEsIv92oGinSr38M-9H5WixNnFTDblahkqqya8NNpYJQqj_x7OhPxWmOZ36TXMV0uOJC7dsDzj8vXKIAojltY-DMTGA3N7iAic1pLqvyftukkPrReHhqj98sjJ57wgO4PsJ1CqmeyZK9MnKfNYSPQ5my3yerjWXvpKEOcDKmur_l69ZaoP5W1TOFD7XoGzUqdLAU238S4mtVQ71F9PSsFlx6wrIp8A9UQ3r1imw1200ib9zHvmDBUFGoGxjtbROX7uu3mKHwM3hk0RdX0Trlk558vDr355iA4N0EeEplDCVgDl42xr3wu_iJBiBmWzLX4l-43m9lWC8_U-NjUOgesEztxDbw8rtgMdObmJYQmx_ZRfP_HQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115885512872681307045\">Max Backman</a>"
        ]
      },
      {
        "reference": "AciIO2drIQqAJLj4tBActaZKAppR6tUFvKP7PJx0HExBXsCQSC1pbbxT6KhfVPDJAnxlH8Uh6E7bH3qXWXAZhW8rtUSGIl8pY2SmJra9GHySwiLAkrwJ6iU9xSUgv79eg_xxRs7iFLFOz8z3UkL326kdQPAs0B-VWZo4wdcJPYmJYiCCRBm8zVHlLjWVw-OTf5HIKJj1UnDxGRfVn_gRIz9op-5E9FzA_2tRoSpM8bypSW4sy15ZMbHsmnx7N3od4FH6cvCJsW53u-in0cQb3l-Bkh-_Vw7GsiQO5iMe87abYytRdrikBkBYVMsaIgcsqHOZNI5XueHfWdf585_PwevTlwZ6w08sNk1H62uhaRLYaV5SQYclp4pGTMC69S2ZmoHB9gfnObGj2cyniupHgNTi4tqiwg3D5QJzqKsJacigbtuzag",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2drIQqAJLj4tBActaZKAppR6tUFvKP7PJx0HExBXsCQSC1pbbxT6KhfVPDJAnxlH8Uh800E7bH3qXWXAZhW8rtUSGIl8pY2SmJra9GHySwiLAkrwJ6iU9xSUgv79eg_xxRs7iFLFOz8z3UkL326kdQPAs0B-VWZo4wdcJPYmJYiCCRBm8zVHlLjWVw-OTf5HIKJj1UnDxGRfVn_gRIz9op-5E9FzA_2tRoSpM8bypSW4sy15ZMbHsmnx7N3od4FH6cvCJsW53u-in0cQb3l-Bkh-_Vw1200GsiQO5iMe87abYytRdrikBkBYVMsaIgcsqHOZNI5XueHfWdf585_PwevTlwZ6w08sNk1H62uhaRLYaV5SQYclp4pGTMC69S2ZmoHB9gfnObGj2cyniupHgNTi4tqiwg3D5QJzqKsJacigbtuzag&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103035052740851052826\">Francesco Mussapi</a>"
        ]
      },
      {
        "reference": "AciIO2dEQqyomqScOaY_UZSH9CNkXPvFDD1Je47ERA9VNhMILaIgDF-iA7W_ZyX3nhEuWCYe6rZr6irTB3C2FkUYqkiRRN_tmcYixgx_is9mJ8p-9QhKd8JqwuLx9PiqzB-corJhfizoKXWO_fOwaDhCfJ0X2VbeCp4zQe6mvse2hxju1XGhmnyi9UA24ZzHh7DmsdFpVM4z7iEYPUl-qEHSx6A60wqpkkqIwppfPmMAiMQXWXWYvE_YV3dai31NyQaSEUimzxS4quIEECGmPv1d6ZrZWKkoTywdVM56Lt-XT82rqcdcgrmF3vygwKn1C-fXEQeZiiNPuetPIJNtBSXjkPGYWdIEC7Ss7eVBG0zSyItdCHmSb_kRabycwoJnd7xgK3iWaKpOIH0YwnSVgd7c2mv0UhSWIqbO_f-yT82Gjo_o3VNjhdYaEpDPqKWt7hVX",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dEQqyomqScOaY_UZSH9CNkXPvFDD1Je47ERA9VNhMILaIgDF-iA7W_ZyX3nhEuWCYe6rZr6irTB3C2FkUYqkiRRN_tmcYixgx_is9mJ8p-9QhKd8JqwuLx9PiqzB-corJhfizoKXWO_fOwaDhCfJ0X2VbeCp4zQe6mvse2hxju1XGhmnyi9UA24ZzHh800DmsdFpVM4z7iEYPUl-qEHSx6A60wqpkkqIwppfPmMAiMQXWXWYvE_YV3dai31NyQaSEUimzxS4quIEECGmPv1d6ZrZWKkoTywdVM56Lt-XT82rqcdcgrmF3vygwKn1C-fXEQeZiiNPuetPIJNtBSXjkPGYWdIEC7Ss7eVBG0zSyItdCHmSb_kRabycwoJnd7xgK3iWaKpOIH0YwnSVgd7c2mv0UhSWIqbO_f-yT82Gjo_o3VNjhdYaEpDPqKWt7hVX&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110215835744187348774\">Maria</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Islamic Media",
        "rating": 5,
        "text": "Dulce Coffee Shop has quickly become one of my favourite spots in London! From the second you walk in, the vibe is warm and welcoming – you instantly feel at home. The staff are so friendly and always up for a chat, which makes the whole experience even better.\n\nThey’ve also got a great range of food, from fresh savoury dishes to amazing cakes and desserts. Everything I’ve tried has been delicious, and the portions are generous too. One of the things that really sets Dulce apart is that it’s HMC approved, so you know everything on the menu is halal and prepared to the highest standards. It’s such a relief to have that peace of mind when eating out.\n\nThe place itself is stylish but still cosy – perfect for catching up with friends, working on your laptop, or just enjoying a quiet coffee break. Prices are really reasonable for the quality you get, which makes it even better.\n\nAll in all, Dulce Coffee Shop is a real gem",
        "time": 1757403787,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Laura J Aitcheson",
        "rating": 5,
        "text": "Special place for breakfast brunch\nSo happy we found this place. Set us up for the day with really yummy food and amazing tea. We were seated downstairs and it was super busy but everything flowed like clockwork.  Good vibes. Great service too thank you",
        "time": 1753716018,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Olamide Ayanda",
        "rating": 5,
        "text": "We had the full (English) breakfast on the menu consisting of Toast, mushroom, baked beans and turkey rashers.\nMy wife and I don’t take eggs so we requested for more portions of turkey rashers instead and they were lovely to oblige us.\nWe had it with orange juice - and speaking of the orange juice, the best so far I’ve had in the uk. Real Orange juice which I believe was just blended and not Tesco orange juice.\n\nThe breakfast was tasty and filling.\nThe service was great too.",
        "time": 1756482031,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Magda Neagu",
        "rating": 4,
        "text": "12 pounds ish for what you see in each of the photos. Decent, considering our ibis hotel next door was also offering a 12 pounds breakfast. But expensive if you add coffee or juice.",
        "time": 1754485065,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "R Ismail (R)",
        "rating": 5,
        "text": "Dulce Whitechapel is a lovely spot for a vegan or vegetarian breakfast. The dishes are thoughtfully prepared with fresh, wholesome ingredients that deliver good flavour without being overwhelming. I usually buy their croissant and enjoy their smooth, well-made coffee. The service is friendly and welcoming. While the cafe is small, it offers a cozy environment that makes it a pleasant place to visit. I would recommend Dulce Whitechapel to anyone looking for a reliable vegan or vegetarian breakfast, fresh pastries, and a nice cup of coffee in a warm setting.",
        "time": 1751460811,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
      "cafe",
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
    "lastVerifiedGoogle": "2025-10-15T10:54:16.342Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:16.342Z",
    "updatedAt": "2025-10-16T20:25:23.494Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Dulce Coffee London — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_dulce-coffee-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.463Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Dulce Coffee London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "86 Whitechapel High St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 1550
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/dulce-coffee-london-cO94iwvs",
      "openingHours": [
        "Monday: 7:00 AM – 5:00 PM",
        "Tuesday: 7:00 AM – 5:00 PM",
        "Wednesday: 7:00 AM – 5:00 PM",
        "Thursday: 7:00 AM – 5:00 PM",
        "Friday: 7:00 AM – 5:00 PM",
        "Saturday: 7:00 AM – 5:00 PM",
        "Sunday: 7:00 AM – 5:00 PM"
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
    "image_card_path": "/images/restaurants/dulce-coffee-london-cO94iwvs/mediterranean-dulce-coffee-london-cO94iwvs-card-abaef407.webp",
    "image_hero_path": "/images/restaurants/dulce-coffee-london-cO94iwvs/mediterranean-dulce-coffee-london-cO94iwvs-hero-a09fa4bb.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Mediterranean Restaurants in Tower Hamlets (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest mediterranean restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Tower Hamlets." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-mediterranean-in-tower-hamlets-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Mediterranean Restaurants in Tower Hamlets (2025)" />
        <meta property="og:description" content="Discover the finest mediterranean restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Tower Hamlets." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-mediterranean-in-tower-hamlets-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Mediterranean Restaurants in Tower Hamlets (2025)" />
        <meta name="twitter:description" content="Discover the finest mediterranean restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Tower Hamlets." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Mediterranean Restaurants in Tower Hamlets (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-mediterranean-in-tower-hamlets-2025',
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
              <Link href="/mediterranean-restaurants-london" className="hover:text-white transition-colors">Mediterranean</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-tower-hamlets" className="hover:text-white transition-colors">Tower Hamlets</Link>
              <span>›</span>
              <span className="text-white">Best Mediterranean in Tower Hamlets (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Mediterranean Restaurants in Tower Hamlets (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest mediterranean restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Tower Hamlets.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/dulce-coffee-london-cO94iwvs" className="hover:text-yellow-600 transition-colors">
                Dulce Coffee London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 1,550 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Dulce Coffee London offers exceptional mediterranean cuisine in Tower Hamlets. With a 4.6-star rating from 1,550 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/dulce-coffee-london-cO94iwvs" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJWzWzp8ocdkgR5RIcO94iwvs" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
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
        <a href="/mediterranean-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Mediterranean Restaurants
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
                Discover more mediterranean restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/mediterranean-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Mediterranean Restaurants
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
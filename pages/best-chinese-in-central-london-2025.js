import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestChineseInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJ_0dDsFIDdkgRWrWzN4O2yCQ",
    "slug": "lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ",
    "name": "Lucky Cat by Gordon Ramsay - Bishopsgate",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "chinese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 1164,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "London, UK",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "postcode": "EC2N 4BQ",
    "borough": "Central London",
    "lat": 51.5144189,
    "lng": -0.0830479,
    "phone": "020 7592 1617",
    "phone_international": "+44 20 7592 1617",
    "website": "https://www.gordonramsayrestaurants.com/lucky-cat-bishopsgate/?utm_source=gmb&utm_medium=uberall&utm_campaign=business_profile",
    "url": "https://maps.google.com/?cid=2650569055399032154",
    "opening_hours": {
      "open_now": true,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2200"
          },
          "open": {
            "day": 0,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "0100"
          },
          "open": {
            "day": 1,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "0100"
          },
          "open": {
            "day": 2,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "0100"
          },
          "open": {
            "day": 3,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "0300"
          },
          "open": {
            "day": 4,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0300"
          },
          "open": {
            "day": 5,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0300"
          },
          "open": {
            "day": 6,
            "time": "1130"
          }
        }
      ],
      "weekday_text": [
        "Monday: 11:30 AM – 1:00 AM",
        "Tuesday: 11:30 AM – 1:00 AM",
        "Wednesday: 11:30 AM – 1:00 AM",
        "Thursday: 11:30 AM – 3:00 AM",
        "Friday: 11:30 AM – 3:00 AM",
        "Saturday: 11:30 AM – 3:00 AM",
        "Sunday: 11:30 AM – 10:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "chinese",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Lucky Cat by Gordon Ramsay - Bishopsgate",
        "venueId": 690
      }
    ],
    "reviews": [
      {
        "author_name": "S Thompson",
        "author_url": "https://www.google.com/maps/contrib/112933745269678369632/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLv6qnVnXsLsUxRRQMmT_2mNl7WUHpjcl-iOLxHXyWxbkExrQ=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "a week ago",
        "text": "The food was superb. We went with the £80 per person sharing menu. My personal favourites were the fish and chicken. There was plenty of food, we took some home. The service was rushed, and we had to tell the server not to remove dishes from the table on several occasions. The views are phenomenal!",
        "time": 1760036504,
        "translated": false
      },
      {
        "author_name": "Danika Cornellier",
        "author_url": "https://www.google.com/maps/contrib/111105232796575932169/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjX78MrNBdPCOWtW4_TNwpHW64UnIPqhEK00UdbaO5lt1dj9RlMc=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "in the last week",
        "text": "Had a great dinner to celebrate the last day of our trip. The food and views are impeccable. Our waiter Yasin was very attentive and provided great service. Would definitely recommend!",
        "time": 1760308256,
        "translated": false
      },
      {
        "author_name": "jonathan gunde",
        "author_url": "https://www.google.com/maps/contrib/103412617524689686987/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWrONwd6b-xRvaC20v_86QgbB5B4sWwhdPcPVKUoHXKrs2QngmB3A=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "a month ago",
        "text": "The views from the Building are breath taking. The service was fast and well served. The food quality was excellent and also the food presentation.\nWe went there for a Birthday party of my friend.\nWould definitely recommend specially for Dates and romantic vibes.\nA must go to for celebrating special occasions.",
        "time": 1756822381,
        "translated": false
      },
      {
        "author_name": "Peter Ståhlman",
        "author_url": "https://www.google.com/maps/contrib/113672782024669132591/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJG1q_OjbYDV5yReOB4eGJL3P8j57HGn4is_tyeLOOMAWbG1A=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "a month ago",
        "text": "My daughter and her boyfriend visited us in London, and of course Lucky Cat at Bishopsgate is the must go place. With perfect service as always from the staff, the best view and food in London, it’s a safe bet that it will be an unforgettable evening. We were lucky having Andres as our waiter who made it even more unforgettable, always willing to take photos and videos and sharing his knowledge about the food and the drinks.\nWe started with the must have Zanmai sushi platter, the Wagyu maki is out of this world. The next on the menu was the Tempura and dumplings where I want to make a shoutout for the mushroom tempura and especially the sauce that is a true sensation. For meat we had the Spiced Lamb, Ribeye and the Iberico Pork. Everything of course top notch, but the pork was the the one that positively surprised us the most.\nFor signature cocktails, don’t miss the Lemongrass Cha, it’s a masterpiece.\nCan’t wait to be back soon again!",
        "time": 1756672156,
        "translated": false
      },
      {
        "author_name": "Nelly",
        "author_url": "https://www.google.com/maps/contrib/104495093764402165975/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIcOrsHHmHvNHjXpDJeftBqy4wx_NmmeOtp7MFBm2dmMBm9jg=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "✨ Incredible views, delicious food & unforgettable hospitality\n\nDining with a view of Tower Bridge sparkling at night was magical. The food was flavorful, fun to share, and beautifully presented. Each dish brought something unique to the table – from tender meats to crispy bites and vibrant cocktails.\n\nA huge thank you to  Ali, who went above and beyond to make sure we had the perfect evening. His hospitality made everything even more special.\n\nHighly recommended for anyone looking to enjoy great food and drinks with one of the best views in London. 🌃🍽️🍸",
        "time": 1754351210,
        "translated": false
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "discoveredBy": {
      "query": "restaurant near Liverpool Street station",
      "area": "City",
      "type": "station"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:14:13.047Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:14:13.047Z",
    "updatedAt": "2025-10-16T23:14:36.064Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=chinese_dumplings_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Lucky Cat by Gordon Ramsay - Bishopsgate — Chinese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "chinese_lucky-cat-by-gordon-ramsay---b_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.568Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Lucky Cat by Gordon Ramsay - Bishopsgate",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "chinese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 1164
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ",
      "openingHours": [
        "Monday: 11:30 AM – 1:00 AM",
        "Tuesday: 11:30 AM – 1:00 AM",
        "Wednesday: 11:30 AM – 1:00 AM",
        "Thursday: 11:30 AM – 3:00 AM",
        "Friday: 11:30 AM – 3:00 AM",
        "Saturday: 11:30 AM – 3:00 AM",
        "Sunday: 11:30 AM – 10:00 PM"
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
    "image_card_path": "/images/restaurants/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ/chinese-lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ-card-439ae4b9.webp",
    "image_hero_path": "/images/restaurants/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ/chinese-lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ-hero-f9f470a8.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJhzC6UAAddkgRH2xLhsNVaH0",
    "slug": "gansu-bethnal-green-LhsNVaH0",
    "name": "Gansu Bethnal Green",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "chinese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 137,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "London, UK",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "postcode": "E2 0RN",
    "borough": "Central London",
    "lat": 51.5285305,
    "lng": -0.0481819,
    "phone": "020 3538 1296",
    "phone_international": "+44 20 3538 1296",
    "website": "https://www.thebestinlondon.co.uk",
    "url": "https://maps.google.com/?cid=9036566950578973727",
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
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        }
      ],
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "chinese",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Gansu Bethnal Green",
        "venueId": 609
      }
    ],
    "reviews": [
      {
        "author_name": "Sabina M",
        "author_url": "https://www.google.com/maps/contrib/111701720775106144737/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWTUQOMBn07cokQnX0XXEipTEeMbr0ewznw6ZvFT2VWruVgoGS_=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "in the last week",
        "text": "Thank you so much for making my food in 2 minutes! I appreciate you knew I was in a rush and the service was still fantastic. Thank you head chef! I bought the chicken and shrimp fried rice, the food is as good as it looks Alhamdulilah! Hope to come back soon!",
        "time": 1760293802,
        "translated": false
      },
      {
        "author_name": "Dhulal Miah",
        "author_url": "https://www.google.com/maps/contrib/103952578112167643412/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLgY1BX1CkDxop6Ux3K2bUMiHDfN84AH8kahAVnjjx57UYrtg=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "4 months ago",
        "text": "This would have got a 5 star but there was not enough sauce on the dynamite bites, bigger box needed so the sauce is evenly spread, couldn’t taste the dynamite taste (decent portion of chicken). Special chow mein was delicious, chips were okay but portion debatable. Shredded beef was delicious, flavour was on point BUT more batter than beef. This is good feedback so you can make it better next time, defo would return again ☺️",
        "time": 1748638751,
        "translated": false
      },
      {
        "author_name": "Ek ST",
        "author_url": "https://www.google.com/maps/contrib/102088771139322567692/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocI2FVIdpBnaGiuzO0xAfSPtbma8ao1HAqNQTB7zQf3UnuLVqA=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Gansu is a delightful little hidden gem.\n\nWe’ve visited a couple of times now\n& The service is always excellent.\n\nHowever, They had forgotten\nTo give King Prawns last time\n& So this time they were\nKind enough to give some\n\nSalt & Pepper King Prawns to try\nWith our Salt & Pepper chips\n& Curry Sauce.\n\nThey also gave Mum some\nPrawn crackers, That she loves.\n\nEverything was on point taste wise\n& The portions were generous.\n\nWe wish Gansu all the best\n& Look forward to visiting\nRegularly, As always.",
        "time": 1755145008,
        "translated": false
      },
      {
        "author_name": "Aaliyah Choudhury",
        "author_url": "https://www.google.com/maps/contrib/114002896099612177435/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIKnLbfQFGFyuFP1hyvIfFFeN6gMXkwLNQRXz0a0gjJDrYadw=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Absolutely Delicious! A Must-Try Spot for Chinese Food Lovers\n\nI had an amazing experience at Gansu! From start to finish, everything was spot on.\nThe prawn toast was perfectly crisp on the outside and packed with flavor inside — not greasy at all, which is a rarity! The chicken balls were light, golden, and came with a tangy sweet & sour sauce that was just right. The salt and pepper wings were the highlight — incredibly crispy, well-seasoned, and full of that irresistible savory kick with a bit of heat.\n\nPortions were generous, and everything tasted freshly made. You can tell they use quality ingredients and care about getting the flavors just right.\n\nHighly recommend this place — I’ll definitely be coming back!",
        "time": 1754465796,
        "translated": false
      },
      {
        "author_name": "Shammi Shahnaz Shifa",
        "author_url": "https://www.google.com/maps/contrib/104265953980668610735/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXHq3fcpqv7R3b9-0pYDlDBU5HiwEJ6Oisi3JtqtzlUAomvjnxj=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "Tried a Halal authentic Chinese restaurant and loved it! I ordered special fried rice, beef fried rice, and chicken chow mein. Everything was fresh and flavorful, but the beef fried rice was definitely my favorite it was very flavorful and perfectly cooked! Great taste and very reasonable prices. Will definitely come back!",
        "time": 1748299940,
        "translated": false
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "discoveredBy": {
      "query": "halal restaurant Bethnal Green",
      "area": "Bethnal Green",
      "type": "halal-area"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:46.516Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:46.516Z",
    "updatedAt": "2025-10-16T23:14:36.060Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=chinese_dumplings_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Gansu Bethnal Green — Chinese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "chinese_gansu-bethnal-green_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.542Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Gansu Bethnal Green",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "chinese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 137
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/gansu-bethnal-green-LhsNVaH0",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 11:00 PM"
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
    "image_card_path": "/images/restaurants/gansu-bethnal-green-LhsNVaH0/chinese-gansu-bethnal-green-LhsNVaH0-card-4668f401.webp",
    "image_hero_path": "/images/restaurants/gansu-bethnal-green-LhsNVaH0/chinese-gansu-bethnal-green-LhsNVaH0-hero-be91a50e.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJY6dB15sddkgRlvXsjUpIGyA",
    "slug": "dragons-den-oriental-kitchen-sjUpIGyA",
    "name": "Dragon's Den Oriental Kitchen",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "chinese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.4,
    "user_ratings_total": 328,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "London, UK",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "postcode": "E1 1HJ",
    "borough": "Central London",
    "lat": 51.5177321,
    "lng": -0.0628098,
    "phone": "020 3441 4550",
    "phone_international": "+44 20 3441 4550",
    "website": "https://www.dragonsdenkitchen.com/",
    "url": "https://maps.google.com/?cid=2313522318630778262",
    "opening_hours": {
      "open_now": false,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2230"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        }
      ],
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 10:30 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "chinese",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Dragon's Den Oriental Kitchen",
        "venueId": 475
      }
    ],
    "reviews": [
      {
        "author_name": "Jv Travel",
        "author_url": "https://www.google.com/maps/contrib/117755666747795041259/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjW_LpMIIQT7ucbsLt9PlLtZdFPsHtZaO-auFaWlf4WQhynWbdff=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "4 weeks ago",
        "text": "Dragon Den’s Oriental Kitchen – A Soup Lover’s Experience\n\nAs someone who adores a good bowl of soup, I’ve always had a soft spot for Dragon Den’s Oriental Kitchen. The first time I tried their Tom Yum soup, I was blown away—it was flavorful, comforting, and honestly one of the best versions I’ve had in a while. Naturally, I couldn’t wait to bring my friend and brother along so they could experience it too.\n\nThis time, however, things didn’t quite live up to my expectations. We ordered two Tom Yum soups, but the broth tasted a little different than I remembered, and the mushrooms weren’t cooked through. It wasn’t bad, but it didn’t have that same magic that made me fall in love with it before.\n\nOn the bright side, their fried dumplings and wontons were excellent—crispy, flavorful, and a definite must-try if you visit. These small bites really delivered and left us impressed.\n\nDespite the hiccup with the soup this visit, I still stand by my love for Dragon Den’s. I’ve had enough good experiences here to know that this might have just been an off day. When I’m craving a warm, comforting bowl of soup, this is still one of the first places that comes to mind.\n\nVerdict: Dumplings and wontons are a win, and the Tom Yum soup—when it’s on point—is something I’ll keep coming back for.",
        "time": 1758143773,
        "translated": false
      },
      {
        "author_name": "Travelling Valentines",
        "author_url": "https://www.google.com/maps/contrib/106847458491188330785/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjU5VQAnpp-4J8tj_lOFuGN3YTBo_KZ_80P5bBkpm0kzxr-zkH4=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "3 weeks ago",
        "text": "We have been here plenty of times and it is one of our go to places for date night!\nStaff are incredibly friendly and are always greeted warmly by staff member called Angel.\nFood is always spot and and always great value for money. Affordable meals and generous portions.\nWe love their chicken katsu curry and their egg fried rice.\nSee you guys soon!",
        "time": 1758752365,
        "translated": false
      },
      {
        "author_name": "Freedom F.",
        "author_url": "https://www.google.com/maps/contrib/113285837523011751161/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWTy7HJfJ3p7ocFp9gPq-VIM0ZNwgK_e6k6tRsKldJALQNv6EU=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "6 months ago",
        "text": "A lovely place to enjoy Chinese food. Everything was delicious and flavourful. The only reason I gave 4* and not 5 for the food is my personal preference is I prefer my rice with less soya sauce. There are no bells and whistles, just good food done simply. The atmosphere was nice and clean but perhaps a little dated. The toilet facility is clean, however, there is one toilet for both male and female (which is not a problem if not busy). Customer care was great! Angel greeted us and ensured we were ok from start to finish, thank you for being so kind to us. I would recommend and will definitely be returning.",
        "time": 1744792876,
        "translated": false
      },
      {
        "author_name": "Sadiya A",
        "author_url": "https://www.google.com/maps/contrib/104870187474251909074/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXUlxsLgd0aQWj1QZrhwbUd4tD0dNJfW0TovUDYGyTklPOsHCys=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 4,
        "relative_time_description": "5 months ago",
        "text": "Service was amazing! The lady was very helpful and friendly. She kindly explained the menu items and altered dish to my preference. The food tasted good and the portions were generous, big enough to feed 2-3 people. I would recommend the salt and pepper platter. Very reasonable pricing. Good selection of drinks. Very clean store.",
        "time": 1746223634,
        "translated": false
      },
      {
        "author_name": "Tania Yasmin",
        "author_url": "https://www.google.com/maps/contrib/113311070136618931820/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJHObH2gxIgeYmosozjrKM7ZR_INEGr9m5VMFI470tohM9B=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "3 months ago",
        "text": "Delicious food! I always come here with my friends, the customer service is the best. Ordering from home just the same! Very big portions and could easily be shared with 2-3 people. Highly recommend for families, friends or even going by yourself!",
        "time": 1751458896,
        "translated": false
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
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
    "lastVerifiedGoogle": "2025-10-16T23:13:02.570Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:02.570Z",
    "updatedAt": "2025-10-16T23:14:36.056Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=chinese_dumplings_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Dragon's Den Oriental Kitchen — Chinese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "chinese_dragons-den-oriental-kitchen_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.499Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Dragon's Den Oriental Kitchen",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "chinese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 328
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/dragons-den-oriental-kitchen-sjUpIGyA",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 10:30 PM"
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
    "image_card_path": "/images/restaurants/dragons-den-oriental-kitchen-sjUpIGyA/chinese-dragons-den-oriental-kitchen-sjUpIGyA-card-8d1f2033.webp",
    "image_hero_path": "/images/restaurants/dragons-den-oriental-kitchen-sjUpIGyA/chinese-dragons-den-oriental-kitchen-sjUpIGyA-hero-a93bbc2f.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Chinese Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest chinese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-chinese-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Chinese Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest chinese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-chinese-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Chinese Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest chinese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Chinese Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-chinese-in-central-london-2025',
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
              <Link href="/chinese-restaurants-london" className="hover:text-white transition-colors">Chinese</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Chinese in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Chinese Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest chinese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ" className="hover:text-yellow-600 transition-colors">
                Lucky Cat by Gordon Ramsay - Bishopsgate
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 1,164 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Lucky Cat by Gordon Ramsay - Bishopsgate offers exceptional chinese cuisine in Central London. With a 4.6-star rating from 1,164 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/lucky-cat-by-gordon-ramsay-bishopsgate-zN4O2yCQ" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/gansu-bethnal-green-LhsNVaH0" className="hover:text-yellow-600 transition-colors">
                Gansu Bethnal Green
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 137 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Gansu Bethnal Green offers exceptional chinese cuisine in Central London. With a 4.5-star rating from 137 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/gansu-bethnal-green-LhsNVaH0" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/dragons-den-oriental-kitchen-sjUpIGyA" className="hover:text-yellow-600 transition-colors">
                Dragon's Den Oriental Kitchen
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.4</span>
              <span>📝 328 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Dragon's Den Oriental Kitchen offers exceptional chinese cuisine in Central London. With a 4.4-star rating from 328 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/dragons-den-oriental-kitchen-sjUpIGyA" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    
          </div>

          {/* Internal Links */}
          
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/restaurants-central-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          More Central London Restaurants
        </a>
        <a href="/chinese-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Chinese Restaurants
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
                Discover more chinese restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/chinese-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Chinese Restaurants
                </a>
                <a href="/restaurants-central-london" className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors">
                  All Central London Restaurants
                </a>
              </div>
            </div>
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
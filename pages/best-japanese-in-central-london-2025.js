import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestJapaneseInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJy23uOwAFdkgRii6cDLJ0Z8k",
    "slug": "yiqi-cDLJ0Z8k",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJy23uOwAFdkgRii6cDLJ0Z8k",
    "name": "YiQi",
    "description": "A celebration of European culinary heritage with a modern twist. This Central London gem proves that modern european cuisine can be both traditional and innovative. With ratings this high, it's no wonder locals keep c...",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 2539,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "14 Lisle St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "14 Lisle St, London",
    "postcode": "WC2H 7BE",
    "borough": "Central London",
    "lat": 51.51150939999999,
    "lng": -0.1308137,
    "phone": "020 7287 2751",
    "phone_international": "+44 20 7287 2751",
    "website": "http://www.yiqipanasia.co.uk/",
    "url": "https://maps.google.com/?cid=14512696632289275530",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 10:30 PM"
      ],
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
      ]
    },
    "photos": [
      {
        "reference": "AciIO2cliNZ7uVStr5vzMNgPo0C2luVxJHrdE-eIz2fWpR5I7kvb8kFIaxNvEUkmtex_Dz5xbx5gwHEHQ6ERmZ2VCgwUlHBDlXulgn1_ybTwsF-BFku98XtNpcASBuoPSg9lVdC03mGkCo0Nx9zMbsmk_9V3AOr3LkzrXpJ0ymWqwlm9MAvQSRKVBIj3iHaGF-OZ-K1uxPnN85Q9rktZu5vwHkayeaTeARY4-mLut8_ROUq4Ch56AXoULkwaRHzQBpiLdKOGWjJhT1CI-yezcU68S_yYrUL-1f0gbz9GpbnjpZP5iw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cliNZ7uVStr5vzMNgPo0C2luVxJHrdE-eIz2fWpR5I7kvb8kFIaxNvEUkmtex_Dz5xbx5gwHEHQ6ERmZ2VCgwUlHBDlXulgn1_ybTwsF-BFku98XtNpcASBuoPSg9lVdC03mGkCo0Nx9zMbsmk_9V3AOr3LkzrXpJ0ymWqwlm9MAvQSRKVBIj3iHaGF-OZ-K1uxPnN85Q9rktZu5vwHkayeaTeARY4-mLut8_ROUq4Ch800AXoULkwaRHzQBpiLdKOGWjJhT1CI-yezcU68S_yYrUL-1f0gbz9GpbnjpZP5iw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117732218206405211402\">YiQi</a>"
        ]
      },
      {
        "reference": "AciIO2cHAMRnAldRkFmrbtqyizP5U6aI7J3PwA0DYF4Q1VlcCkhHN3_LJwdZg2s5Nu7l4nWGDN6Oys9xji2m_IR-W6p1PErRcLAHmXCUediHqJCfKQcsKGCKdD8ivEr1kWElndvpFuh5CEzljN3aWaZOkILwaCMjnuxrIa4gruyFIA7e4BZi9CESWiUnM0tZhUdqmheYTWAdYC17f88PHiPnP4DdYcQnyuSaAmf6VkMKChV5fsTfLaHeLXZ7tCCtzHy6bAORcyGbvjqIj5O3-a9AFtx0dsb_oh8OT1Emfqw-KZegQw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cHAMRnAldRkFmrbtqyizP5U6aI7J3PwA0DYF4Q1VlcCkhHN3_LJwdZg2s5Nu7l4nWGDN6Oys9xji2m_IR-W6p1PErRcLAHmXCUediHqJCfKQcsKGCKdD8ivEr1kWElndvpFuh800CEzljN3aWaZOkILwaCMjnuxrIa4gruyFIA7e4BZi9CESWiUnM0tZhUdqmheYTWAdYC17f88PHiPnP4DdYcQnyuSaAmf6VkMKChV5fsTfLaHeLXZ7tCCtzHy6bAORcyGbvjqIj5O3-a9AFtx0dsb_oh8OT1Emfqw-KZegQw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117732218206405211402\">YiQi</a>"
        ]
      },
      {
        "reference": "AciIO2fRhRxSfWbb75A9D0ZP6hmc6LBbXUdCO1U3UkBFt-ItUe-_2lMszafN9oOj5_Vpn7bGH6n_-jF-8SGjQp9Lv_j-UDZ8MRzP6D1UYlIBeMq64JwSxZnv0p0qGYF0WL_dWQ_8xdFKccv_3RG0CN0wJ3v-VxtU8t-KgknkChdhmEghgpkyIXmPrbnlJjaa5M4jtleGQAYAOmsulxdjd7PkomGFcSJPdaaiJ5kH97UBxp48pYoLrqfDqxZ71MM3_nGwlMvShHNV-Mv6Wf4yUomE8tXPtucVK0SOAW_XL2Akrv5K-jxaQBVFFUB_64Bk1H0so9YTzjzXNTASSN4W808oaniz1gLY-0S8yuI07Wn6W8o7PU6OgdLsQoTI-J_276ZFE-58NSqAqKvD_xA_UhCNnjSowHprLzfBVu8AIZhrTT_juOnsNOG1I0U74k1U6A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fRhRxSfWbb75A9D0ZP6hmc6LBbXUdCO1U3UkBFt-ItUe-_2lMszafN9oOj5_Vpn7bGH6n_-jF-8SGjQp9Lv_j-UDZ8MRzP6D1UYlIBeMq64JwSxZnv0p0qGYF0WL_dWQ_8xdFKccv_3RG0CN0wJ3v-VxtU8t-KgknkChdhmEghgpkyIXmPrbnlJjaa5M4jtleGQAYAOmsulxdjd7PkomGFcSJPdaaiJ5kH97UBxp48pYoLrqfDqxZ71MM3_nGwlMvShHNV-Mv6Wf4yUomE8tXPtucVK0SOAW_XL2Akrv5K-jxaQBVFFUB_64Bk1H0so9YTzjzXNTASSN4W808oaniz1gLY-0S8yuI07Wn6W8o7PU6OgdLsQoTI-J_276ZFE-58NSqAqKvD_xA_UhCNnjSowHprLzfBVu8AIZhrTT_juOnsNOG1I0U74k1U6A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112471416526191674147\">Luci Luci</a>"
        ]
      },
      {
        "reference": "AciIO2eePV9TmT3k7Z6z3fPnpMk_2GVUZQEEyIxrZrsE8OX2TtezVyx3VTaS9HZ4kA32VtExma4y6J4BC95y5iYfxixHbGvqmVyET4RVNWrCEKHR9_m2AdBePYtLO3GimBOOXR5ZjztQCI_xdw3HLzQ1hxsU4FBmdLwWuV4E09ixcmTc8rXVQfMrm9l3J8GGsyaolHnV9Zp7bsgebqFUxM3ZoWIPwU0xhevJzRUed3vozz-7BBYs2y4XZ0uZsLFGAOlxkr-O_cYRx2Fav3dySbX9ttL0NewcynWuW7vIlDL95tavhv4zsYspJyqGza8uO18OHrLPsQbQLITaDCgUHMmxIAoM3TOk-Oyn_fEJT5BOCYKPC_3-5aetvQVQubNP_kKHDHWGuD0ZFTppp4_HDkHLXL2bpcNEbJl0sKFQbGWekpqgy96W0LHHgI5h_Hndm2wz",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eePV9TmT3k7Z6z3fPnpMk_2GVUZQEEyIxrZrsE8OX2TtezVyx3VTaS9HZ4kA32VtExma4y6J4BC95y5iYfxixHbGvqmVyET4RVNWrCEKHR9_m2AdBePYtLO3GimBOOXR5ZjztQCI_xdw1200HLzQ1hxsU4FBmdLwWuV4E09ixcmTc8rXVQfMrm9l3J8GGsyaolHnV9Zp7bsgebqFUxM3ZoWIPwU0xhevJzRUed3vozz-7BBYs2y4XZ0uZsLFGAOlxkr-O_cYRx2Fav3dySbX9ttL0NewcynWuW7vIlDL95tavhv4zsYspJyqGza8uO18OHrLPsQbQLITaDCgUHMmxIAoM3TOk-Oyn_fEJT5BOCYKPC_3-5aetvQVQubNP_kKHDHWGuD0ZFTppp4_HDkHLXL2bpcNEbJl0sKFQbGWekpqgy96W0LHHgI5h_Hndm2wz&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117067688537958368601\">Jiwon Kokomong Kim</a>"
        ]
      },
      {
        "reference": "AciIO2ebU1usVocfea3YYsfnNG372HtNZZX-xuWf-MZu41O6iqG05c0we-CtoWh7sKcC_kTzm4wFdj2HRk-OV8VwHx2V1JWtpNRP__5jFlTbbnTif-ZRD-qPyXk9UkKx9icumiCv1d4uViz2E1-JU-35-UWeO98IGwyQAOZHfPQcCh90-O9xHDt5HkcuCRhviWmSgK3YjSOMrOpMINUywqtX6AZ_Nr-gecjY8vqp2NdAio7ukjgTryLFpsbSQmsj7Uw25t08WWgliRaz-5Inq8l1jceJWjN5vqmvkSsoivAwq2Q7zEhFo1GUFJzuKxEHnJwIgug1oi2M38RLF30yiXpYufBoK5FTqmbKCJvH9rYgK78l2stW5nUHwD7hgT_eQqAYOVGbreTNdULKJBA9r6WUVZza_5V_lbnCuB-DCCstT694SqY8--DYTGcdrvLTrw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ebU1usVocfea3YYsfnNG372HtNZZX-xuWf-MZu41O6iqG05c0we-CtoWh800sKcC_kTzm4wFdj2HRk-OV8VwHx2V1JWtpNRP__5jFlTbbnTif-ZRD-qPyXk9UkKx9icumiCv1d4uViz2E1-JU-35-UWeO98IGwyQAOZHfPQcCh90-O9xHDt5HkcuCRhviWmSgK3YjSOMrOpMINUywqtX6AZ_Nr-gecjY8vqp2NdAio7ukjgTryLFpsbSQmsj7Uw1200t08WWgliRaz-5Inq8l1jceJWjN5vqmvkSsoivAwq2Q7zEhFo1GUFJzuKxEHnJwIgug1oi2M38RLF30yiXpYufBoK5FTqmbKCJvH9rYgK78l2stW5nUHwD7hgT_eQqAYOVGbreTNdULKJBA9r6WUVZza_5V_lbnCuB-DCCstT694SqY8--DYTGcdrvLTrw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107115417232266617859\">Shaveena Anam</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "SHUGENDRAN KUNASEKARAN",
        "rating": 5,
        "text": "The food was amazing. The flavour and the portion are good and value for money. The signature wing taste amazing with honey glaze and charcoal on the wings. The crab curry with steam rice was top notch. Would always recommend this place to have a good and flavour Asian cuisine. BOBY service was attentive and caring. Keep up guys. Top class",
        "time": 1759539788,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "aber s",
        "rating": 5,
        "text": "Chill yuzi Crab: SO good! The sauce is this amazing tangy, micro-spicy, refreshing masterpiece. AND it came with little buns to mop it up (genius!)The crab was massive – my friend and I were huffing and puffing for ages!\nSambal Seafood Fried Rice: Huge portion with whole prawns and squid rings.\nNyonya Lemongrass Grilled Chicken: Every piece was crackling crispy outside and then – BAM – super juicy inside. The green chili sauce made it even fresher.\nKing Oyster Mushroom Salad: Grilled mushrooms, a zesty sweet-and-sour dressing, and pomelo bits.\nThai Iced Tea: It wasn't sickly sweet! Friends, for a Thai tea born in the UK, not being sweet means it was born to be a good milk tea! The Tamarind Plum drink is for all my sour-loving friends.\nService: Impeccable. It felt just like the thoughtful service back home – bibs for the crab, frequent plate changes, hot towels. The manager says they roll out new dishes almost every month. I need to come back weekly to keep up!",
        "time": 1759705743,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "T",
        "rating": 5,
        "text": "I can’t find one bad thing to say about the quality or taste of the food. We randomly walked into this place, and we’re so glad we did—everything was excellent. The only miss for us was the drinks (we tried the tamarind mojitos and the flavor just wasn’t great). Other than that, a solid 10/10. Highly recommend if you’re in Chinatown, London.",
        "time": 1758679436,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Pearl C.",
        "rating": 5,
        "text": "Alright, seeing this many high reviews made me suspicious but DAMN this food is outstanding and worth the wait. You must must try the Guinness crispy chicken. I think it was the best chinese chicken dish I have consumed. The green tea latte is delicious, and the pad Thai was awesome. But that chicken is to die for. And the staff are so nice and helpful. Highly suggest!!!",
        "time": 1755737032,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Mushy C",
        "rating": 5,
        "text": "Love food, in the heart of Chinatown!\n\nAmazing dishes my favourite was the Guinness fried chicken!\n\nA elegant pan asian restaurant with tasty dishes!\n\nLoved the ambience and service was great!",
        "time": 1759434123,
        "relative_time_description": "a week ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 2,
    "fsa_rating_text": "2",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1711409",
    "fsa_last_inspection": "2025-05-08T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:30.511Z",
    "lastVerifiedFSA": "2025-10-16T23:16:17.322Z",
    "createdAt": "2025-10-15T10:53:30.511Z",
    "updatedAt": "2025-10-16T20:24:24.981Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "YiQi — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_yiqi_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.433Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "YiQi",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14 Lisle St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 2539
      },
      "url": "https://thebestinlondon.co.uk/restaurant/yiqi-cDLJ0Z8k",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/yiqi-cDLJ0Z8k/japanese-yiqi-cDLJ0Z8k-card-7bcb07a0.webp",
    "image_hero_path": "/images/restaurants/yiqi-cDLJ0Z8k/japanese-yiqi-cDLJ0Z8k-hero-82c00e2c.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJgUkU7K0FdkgRfVvyQBXwWAI",
    "slug": "maru-london-yQBXwWAI",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJgUkU7K0FdkgRfVvyQBXwWAI",
    "name": "Maru London",
    "description": "A celebration of European culinary heritage with a modern twist. This Central London gem proves that modern european cuisine can be both traditional and innovative. With ratings this high, it's no wonder locals keep c...",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 201,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "18 Shepherd Market, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "18 Shepherd Market, London",
    "postcode": "W1J 7QH",
    "borough": "Central London",
    "lat": 51.5066938,
    "lng": -0.1462888,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "http://www.marulondon.com/",
    "url": "https://maps.google.com/?cid=169148960100998013",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 5:30 – 11:00 PM",
        "Wednesday: 5:30 – 11:00 PM",
        "Thursday: 5:30 – 11:00 PM",
        "Friday: 5:30 – 11:00 PM",
        "Saturday: 12:20 – 3:00 PM, 5:30 – 11:00 PM",
        "Sunday: Closed"
      ],
      "periods": [
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1500"
          },
          "open": {
            "day": 6,
            "time": "1220"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
          },
          "open": {
            "day": 6,
            "time": "1730"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2d5hhVPrF82P1_GmNCIjnCGEBHYRm9oWTktF4brZac3jo5c_iM5j-Yujm7t9Ce-BEL9PdbOwOLJ3xumCXUaaWeeLTIXbTIhkF93r1LLGDlmBYrb58qB8Nrrx6J4-FvDyeIWLX4malZLyS9slVP4Pz8aWwZVR_LMMnbrJRwsW8OkLCNM_qNVlwb4589ObFx1adsKBh4TN_PXDhVsmayD6rNroRNq6taS1RNZ9AMYZfyJn7T31ApJqn3VRoQV1iZGv4d_moLG0p1KtcmoU1SfCJUTTRLLh__WT_PfNmYZF2rmMg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d5hhVPrF82P1_GmNCIjnCGEBHYRm9oWTktF4brZac3jo5c_iM5j-Yujm7t9Ce-BEL9PdbOwOLJ3xumCXUaaWeeLTIXbTIhkF93r1LLGDlmBYrb58qB8Nrrx6J4-FvDyeIWLX4malZLyS9slVP4Pz8aWwZVR_LMMnbrJRwsW8OkLCNM_qNVlwb4589ObFx1adsKBh800TN_PXDhVsmayD6rNroRNq6taS1RNZ9AMYZfyJn7T31ApJqn3VRoQV1iZGv4d_moLG0p1KtcmoU1SfCJUTTRLLh__WT_PfNmYZF2rmMg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115717191225110334303\">Maru London</a>"
        ]
      },
      {
        "reference": "AciIO2eAkBbnyqNHXJn-oxYLop-M3bhHHBuLux5OpBL8JDvxfkAgFW0SXaFQUoMNWRN_6JkyyxxOsTFW9CZ0lcz4_-l6C7JS3KVtf7vJRIxEuNHlhia_FaaKtv7VzosQIF8pAlorvAJnCT3yCsYSn0AhOFapB7rn-r-wVaAtqyBnmK78jG5d3o_JGYbMgdFcUPPjYXUb7YcYdcKhiyxyvNAPlOxrmYLVUbW4cpCeHwwPVPWC2Ik3Xx_JERNCQ99QnPVYkwO26PfIyyY9viA45u45TCZQZ2kgHeZMXJG2UlSOcCOdZA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eAkBbnyqNHXJn-oxYLop-M3bhHHBuLux5OpBL8JDvxfkAgFW0SXaFQUoMNWRN_6JkyyxxOsTFW9CZ0lcz4_-l6C7JS3KVtf7vJRIxEuNHlhia_FaaKtv7VzosQIF8pAlorvAJnCT3yCsYSn0AhOFapB7rn-r-wVaAtqyBnmK78jG5d3o_JGYbMgdFcUPPjYXUb7YcYdcKhiyxyvNAPlOxrmYLVUbW4cpCeHwwPVPWC2Ik3Xx_JERNCQ99QnPVYkwO26PfIyyY9viA45u45TCZQZ2kgHeZMXJG2UlSOcCOdZA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115717191225110334303\">Maru London</a>"
        ]
      },
      {
        "reference": "AciIO2dLgnAYsdGZqd356SuAXkKQu4RVWvp7KQ2BMv9fSl4rH0fYA9n4xfqwUn8CsXSJZz-DbZjXNUrnkS2hEzqbzKnOqLhWrsou_GDt9dfPq64v8Hdpe6hM40gKOOekLLhstRpnMluHGEYtKAlvMDw3V_joKs3MYfRtbyDEg4YMahwnu6U7Zrd9OAcGbbgiJgUeQ4D1Pudv3DSdf3dCZMXS8EU_dkWb7unGRCCFBZNH-x1QU0JXfuspwzjFymhtGPcVByeC7s_oSmITkFzEhdprJuBdbEcAWxA_tZiSdTw1-NcDkf0PV9h_Tjo5fXIzoen8FibItjIJImIwD9Y3I7ys7V0qin5Dq9LtqRbKr14tX5VlnmL3D-f9FtEdcN4BAQyH1BM6fyhuvVjRyAqhTSRc7FSWuImAF8-I8dAgKa1IwzZqn5xscccF1nDppdt-hQBc",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dLgnAYsdGZqd356SuAXkKQu4RVWvp7KQ2BMv9fSl4rH0fYA9n4xfqwUn8CsXSJZz-DbZjXNUrnkS2hEzqbzKnOqLhWrsou_GDt9dfPq64v8Hdpe6hM40gKOOekLLhstRpnMluHGEYtKAlvMDw1200V_joKs3MYfRtbyDEg4YMahwnu6U7Zrd9OAcGbbgiJgUeQ4D1Pudv3DSdf3dCZMXS8EU_dkWb7unGRCCFBZNH-x1QU0JXfuspwzjFymhtGPcVByeC7s_oSmITkFzEhdprJuBdbEcAWxA_tZiSdTw1-NcDkf0PV9h_Tjo5fXIzoen8FibItjIJImIwD9Y3I7ys7V0qin5Dq9LtqRbKr14tX5VlnmL3D-f9FtEdcN4BAQyH1BM6fyhuvVjRyAqhTSRc7FSWuImAF8-I8dAgKa1IwzZqn5xscccF1nDppdt-hQBc&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101896230332949731254\">xyzpiggywigsxyz</a>"
        ]
      },
      {
        "reference": "AciIO2f5XUJQ7yeUdr5u9mNMUEkMAMf_Z08y-q7bwiq2C6fPEC_tPETpJnKuMBwbtd9Ts3XUKZVqAJ3ZTJBr3g8BaOHiROBJgbI-Ygm1oIT6hIZ4U-ffGrp930V1oLT8Bu6UQh7X_TQefcXxNlBHq64FnxdP14tJOeo1qH9Zl_Bj95B7eL1172TNfZsBnwajFQCeVQNkcjjGhEA58YTcudyOAC94Az9LBaAcRS9twd50gnCkl0c3KxFxX_TbKe23l-MK7a3l3dYfJo_ud035voZXW4Kzkp4uipH-fQl9LB8i-SG_SJd5IpUl-agt0kGFIjGemL3rHSoROGguhx4O3_w2cOEvYkoVInW9Mum88BrFFv7aMvF25XNFGf89fmR86B9ooVORpq5zk0s_m2doL6uWfcQYiE7N-9CaONpGr6T0ldFZslnC2DzDVD_SnhIuA7MV",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f5XUJQ7yeUdr5u9mNMUEkMAMf_Z08y-q7bwiq2C6fPEC_tPETpJnKuMBwbtd9Ts3XUKZVqAJ3ZTJBr3g8BaOHiROBJgbI-Ygm1oIT6hIZ4U-ffGrp930V1oLT8Bu6UQh800X_TQefcXxNlBHq64FnxdP14tJOeo1qH9Zl_Bj95B7eL1172TNfZsBnwajFQCeVQNkcjjGhEA58YTcudyOAC94Az9LBaAcRS9twd50gnCkl0c3KxFxX_TbKe23l-MK7a3l3dYfJo_ud035voZXW4Kzkp4uipH-fQl9LB8i-SG_SJd5IpUl-agt0kGFIjGemL3rHSoROGguhx4O3_w1200cOEvYkoVInW9Mum88BrFFv7aMvF25XNFGf89fmR86B9ooVORpq5zk0s_m2doL6uWfcQYiE7N-9CaONpGr6T0ldFZslnC2DzDVD_SnhIuA7MV&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114513304336987257821\">SW</a>"
        ]
      },
      {
        "reference": "AciIO2daI7TjCYX-jTc8RMSgpYqboi0sz8HwUo3hHpwTW3Hm1wSkK0kaYlEIBL1VB6BqJtvGmntJZ_ALyUYG9VyukOvdQDIUPI4SE0X9YU4Mi-6a4PCCt3GwTFJ-xiScV0kpB8SR2rg_avqYUHneV-x4dvBhFFwCjc-HYKKoE-6m1I0JwJq51Xppm6o-BiGHbvtb3x7zxIwTIIx0vEmVVblad_8Bq76DodIFWObqrsAsFE_x4enIhZmC_zXeH3iInbcvUJT5SHHURrVEsIrV1HqkkadYHvjLCnoValZbSsmW9WcwdNZdPk6AAdFe6BOuo5j1uKR7sHJbwC1VeuIXMmfcWcy88cFFpp74_9sTRAAksldjuZDvQL8-T2h-JUAjyDbuxRHYliGZ7qXDnqhSiPdoJ6RDZ0lhKuaqstjRxsqo_qQx-YQC",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2daI7TjCYX-jTc8RMSgpYqboi0sz8HwUo3hHpwTW3Hm1wSkK0kaYlEIBL1VB6BqJtvGmntJZ_ALyUYG9VyukOvdQDIUPI4SE0X9YU4Mi-6a4PCCt3GwTFJ-xiScV0kpB8SR2rg_avqYUHneV-x4dvBhFFwCjc-HYKKoE-6m1I0JwJq51Xppm6o-BiGHbvtb3x7zxIwTIIx0vEmVVblad_8Bq76DodIFWObqrsAsFE_x4enIhZmC_zXeH3iInbcvUJT5SHHURrVEsIrV1HqkkadYHvjLCnoValZbSsmW9WcwdNZdPk6AAdFe6BOuo5j1uKR7sHJbwC1VeuIXMmfcWcy88cFFpp74_9sTRAAksldjuZDvQL8-T2h-JUAjyDbuxRHYliGZ7qXDnqhSiPdoJ6RDZ0lhKuaqstjRxsqo_qQx-YQC&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108801042548621781875\">Yu Hsuen Yang</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "xyzpiggywigsxyz",
        "rating": 5,
        "text": "Wonderful dining experience with outstanding hospitality and delicious food. The staff are so friendly and personable whilst maintaining a professional level of service and the style of food really emphasises the qualities of each ingredient. Watching the preparation is also a fascinating and makes this a really fun evening. We also enjoyed having a tea pairing option (must be ordered in advance) which complemented the food really well.",
        "time": 1759989014,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Shuangcen Lyu",
        "rating": 5,
        "text": "We had an amazing Omakase experience here! The ingredients were super fresh and everything tasted delicious. There were 20 courses in total, so we were really full by the end. The chef was not only skilled but also very friendly (and good-looking!). Highly recommended!",
        "time": 1750517727,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Luiza Darie",
        "rating": 5,
        "text": "Incredible omakase experience! The best in London for us and it took us right back to some great places we experienced in Japan. The chefs were so amazing and so was the rest of the staff and the courses were fantastic. It felt very intimate and special.",
        "time": 1758884913,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "SW",
        "rating": 5,
        "text": "One of the best omakase experiences I’ve had in London.\n\nThe dry-aged fish like tuna and brill were incredibly flavorful, and the balance with the rice was perfect. The eel tempura handroll was a highlight - crispy, rich, and comforting.\n\nI also loved the refreshing touches throughout the meal, like the basil lemonade shaved ice and the pink prawn with sweetcorn.\n\nThe desserts (coffee panna cotta and warabi mochi) wrapped it all up beautifully. The chefs were warm, thoughtful, and made the experience feel very personal. Highly recommend for a special night out.",
        "time": 1755466506,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Emily",
        "rating": 5,
        "text": "The entire experience was a perfect 10 out of 10. From the exquisite food to the impeccable service—and the genuine smiles on the chefs’ faces—every detail was thoughtfully executed. The setting is wonderfully intimate, accommodating no more than 10 guests per evening, which makes the omakase experience feel truly personal. I thoroughly enjoyed every moment.",
        "time": 1751486834,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
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
    "lastVerifiedGoogle": "2025-10-15T10:53:27.077Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:27.077Z",
    "updatedAt": "2025-10-16T20:24:20.847Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Maru London — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_maru-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.432Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Maru London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "18 Shepherd Market, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 201
      },
      "url": "https://thebestinlondon.co.uk/restaurant/maru-london-yQBXwWAI",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 5:30 – 11:00 PM",
        "Wednesday: 5:30 – 11:00 PM",
        "Thursday: 5:30 – 11:00 PM",
        "Friday: 5:30 – 11:00 PM",
        "Saturday: 12:20 – 3:00 PM, 5:30 – 11:00 PM",
        "Sunday: Closed"
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
    "image_card_path": "/images/restaurants/maru-london-yQBXwWAI/japanese-maru-london-yQBXwWAI-card-3560fec2.webp",
    "image_hero_path": "/images/restaurants/maru-london-yQBXwWAI/japanese-maru-london-yQBXwWAI-hero-ac40e366.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJlyw-LBMFdkgR0Wc6iVOz8Kc",
    "slug": "noble-palace-6iVOz8Kc",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJlyw-LBMFdkgR0Wc6iVOz8Kc",
    "name": "Noble Palace",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 226,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "Brewer's Grn, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Brewer's Grn, London",
    "postcode": "SW1H 0PY",
    "borough": "Central London",
    "lat": 51.49832379999999,
    "lng": -0.1357522,
    "phone": "020 3588 6666",
    "phone_international": "+44 20 3588 6666",
    "website": "https://www.noblepalace.co.uk/",
    "url": "https://maps.google.com/?cid=12101369370110486481",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Sunday: Closed"
      ],
      "periods": [
        {
          "close": {
            "day": 1,
            "time": "1500"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2230"
          },
          "open": {
            "day": 1,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1500"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1500"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1500"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2230"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1500"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2230"
          },
          "open": {
            "day": 6,
            "time": "1700"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dd7tWzZyAvsBwiICRny37Fpe3uZ0ijCHvNSB4o9Uj6J1YfYXZWgLUIH7oLA5TSiO3tqquoBkDYKxzz_JCvYC_PL9XV1YVgKyYPI6zVkRj0reZWVZZF7NDpSI-KyIosPKqvDwoOVOt0UD7aOugDmkY427zl5mN7DAhQI-u8lLVOmwlO91caimRKPkZGDPCPf0NVkSF71fK-0In7uCsBqHH5bwUfRP1jUsBmrKpI81goJ-29Ab-5nmNrlQ5YIyJA2LrSnQBz00xgNW7FZUlDc-NNwnIcZ2VyGY0ZHeSSTx0",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dd7tWzZyAvsBwiICRny37Fpe3uZ0ijCHvNSB4o9Uj6J1YfYXZWgLUIH7oLA5TSiO3tqquoBkDYKxzz_JCvYC_PL9XV1YVgKyYPI6zVkRj0reZWVZZF7NDpSI-KyIosPKqvDwoOVOt0UD7aOugDmkY427zl5mN7DAhQI-u8lLVOmwlO91caimRKPkZGDPCPf0NVkSF71fK-0In7uCsBqHH5bwUfRP1jUsBmrKpI81goJ-29Ab-5nmNrlQ5YIyJA2LrSnQBz00xgNW7FZUlDc-NNwnIcZ2VyGY0ZHeSSTx0&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103717897953058103297\">Noble Palace</a>"
        ]
      },
      {
        "reference": "AciIO2eiNcygDcGttouAwatvBxMWsAKlMcEaUWkvw_5IGT22GP7VUKEeCC8tNTMEn0TqU-wLkNZ6ENDFVvl2Z2Ci1jnpezjNTCZ7qDsTfRutbxtImQR1X0Ox3CWenWe2EnBTxSKt7qP-uPPEZXy_4xA70qi4d_RHKbc7keJZX2Xa5AJyCfDZQTlxid4oHw5TaIpfTqFKhyABwUKou2BBMzzKfBXaKt6Up_eU2D4ju0nXaxbAZ_DWTXu9WyCnmzfvrJhoO9eON3y-6yk_-RQqxwMBcpGOSblTKupeEzqBn-B07JI",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eiNcygDcGttouAwatvBxMWsAKlMcEaUWkvw_5IGT22GP7VUKEeCC8tNTMEn0TqU-wLkNZ6ENDFVvl2Z2Ci1jnpezjNTCZ7qDsTfRutbxtImQR1X0Ox3CWenWe2EnBTxSKt7qP-uPPEZXy_4xA70qi4d_RHKbc7keJZX2Xa5AJyCfDZQTlxid4oHw1200TaIpfTqFKhyABwUKou2BBMzzKfBXaKt6Up_eU2D4ju0nXaxbAZ_DWTXu9WyCnmzfvrJhoO9eON3y-6yk_-RQqxwMBcpGOSblTKupeEzqBn-B07JI&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103717897953058103297\">Noble Palace</a>"
        ]
      },
      {
        "reference": "AciIO2dwogHgaVl3Fb8Kg2QciL9lSj-nBWttIYY0HLOeN-dqNKYy3ZoehN7mlcMWEIXfmxrIHiNRY9dbRwIliVZqtu-mwoEAt3UuOrnRprjBBBQHLQcY0CZ8RAMy3G1onK-_H0vxXnaiDmG7QV-VnFy5gLjy96B3F_SV4EdC0w26yT52kPe9o2LrM_GEndOxbw0AuulMrlKNNRAW-tP4ELJ2lHiSJsK02kGrPggIUwKq1LNF4HYo0xorPerP4PYn767KGD9I8LnSKzafl6hX_5N6on5n7jWjk79xKTojhvgcHAgIJQuzPTbSGUDhuqzdgVQFzN6_oZMF1RML4RrDLMA4vwFKpzilaTNqYyfZQoExeRXqsF4LLpnEwErkdE_mqAJuiGXVfP1b1Zp97LBWtclkL1haADzCSvPE8ElDUyWDTpHuQjMuIIggaaLJZqUCIDTT",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dwogHgaVl3Fb8Kg2QciL9lSj-nBWttIYY0HLOeN-dqNKYy3ZoehN7mlcMWEIXfmxrIHiNRY9dbRwIliVZqtu-mwoEAt3UuOrnRprjBBBQHLQcY0CZ8RAMy3G1onK-_H0vxXnaiDmG7QV-VnFy5gLjy96B3F_SV4EdC0w1200yT52kPe9o2LrM_GEndOxbw0AuulMrlKNNRAW-tP4ELJ2lHiSJsK02kGrPggIUwKq1LNF4HYo0xorPerP4PYn767KGD9I8LnSKzafl6hX_5N6on5n7jWjk79xKTojhvgcHAgIJQuzPTbSGUDhuqzdgVQFzN6_oZMF1RML4RrDLMA4vwFKpzilaTNqYyfZQoExeRXqsF4LLpnEwErkdE_mqAJuiGXVfP1b1Zp97LBWtclkL1haADzCSvPE8ElDUyWDTpHuQjMuIIggaaLJZqUCIDTT&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108427399698816213863\">Satish Shikhare</a>"
        ]
      },
      {
        "reference": "AciIO2fI9VhLDR7h5IgfcCTGDxoo0HmA_XiMs17KzySIo8C2UTu0_FGyDFRf2hfBFk34YJAXTN_CJ9XzBlcverWlkXEHqjRS-iKSnvBDUDSD6PVN2ZrAbm9YwmZ1IJrjqKXfzNfv6-ebpmW6Ka7YkMoMsGj0NzmL67as6Vv3CvbSEpSfLs1HDnEPHAjQk_L7FWyQOnX5O2XT5WBkrmKiB8pfu5KsohS9IIhzSkpI2TsENiO9uvw5ImtTPEqHpySQcR_rL3pF5dlC49IHkeG3onviQcI7nUOkFR41lWvsINf0B8I",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fI9VhLDR7h800IgfcCTGDxoo0HmA_XiMs17KzySIo8C2UTu0_FGyDFRf2hfBFk34YJAXTN_CJ9XzBlcverWlkXEHqjRS-iKSnvBDUDSD6PVN2ZrAbm9YwmZ1IJrjqKXfzNfv6-ebpmW6Ka7YkMoMsGj0NzmL67as6Vv3CvbSEpSfLs1HDnEPHAjQk_L7FWyQOnX5O2XT5WBkrmKiB8pfu5KsohS9IIhzSkpI2TsENiO9uvw1200ImtTPEqHpySQcR_rL3pF5dlC49IHkeG3onviQcI7nUOkFR41lWvsINf0B8I&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103717897953058103297\">Noble Palace</a>"
        ]
      },
      {
        "reference": "AciIO2doNAgNDdQ8G9WWRcSxGOIhGP8GIGqqoAPPu8BlcWM3dM_Xbm1PZGgsCDFqoA_KjgpIlOl0ABiaUIQiMXZz3AXTVIT0V3iz6ktb1OijjAaO8DyZE2UmVGEklGgYjyCUoa_e9CA7cZAHWXL-_PRugCOkDBKbLF7623noIgs_9gtKZ0siAfs6X9ypSMiL8ouXT9d_srFF9nCXARcoklX3VCe8m2qn2nHbnp0wy91PHiLzYtizoRepdgAWssPQn_bP0IK9Mj4yMIGp477catfFF8IGIGOoSMOJKA7rbrh6nFc",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2doNAgNDdQ8G9WWRcSxGOIhGP8GIGqqoAPPu8BlcWM3dM_Xbm1PZGgsCDFqoA_KjgpIlOl0ABiaUIQiMXZz3AXTVIT0V3iz6ktb1OijjAaO8DyZE2UmVGEklGgYjyCUoa_e9CA7cZAHWXL-_PRugCOkDBKbLF7623noIgs_9gtKZ0siAfs6X9ypSMiL8ouXT9d_srFF9nCXARcoklX3VCe8m2qn2nHbnp0wy91PHiLzYtizoRepdgAWssPQn_bP0IK9Mj4yMIGp477catfFF8IGIGOoSMOJKA7rbrh800nFc&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103717897953058103297\">Noble Palace</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Shyla",
        "rating": 5,
        "text": "Best dim sum we have had. We went for lunch and were well taken care of by the servers and host. We enjoyed the pumpkin dumplings, sea bass, taro croquettes, and steamed pork buns. The standout was their crispy prawns wrapped in noodles served with a light soy sauce. We even went back to order another, but with iberico pork.\n\nThe restaurant and vibe itself was a standout. Very comfortable and elegant. We came with our 2 year old and everyone was very welcoming and even brought him special shrimp chips which kept him occupied. Special thanks to the Hungarian manager who I didn’t catch his name. Us hungry parents were very much appreciative we could enjoy a fine dining meal with the kiddo.\n\nWe will be back again and highly recommend you make a visit!",
        "time": 1747497473,
        "relative_time_description": "5 months ago"
      },
      {
        "author_name": "Gloria Sarpong",
        "rating": 5,
        "text": "My husband booked Noble Palace for my birthday and what an experience. I was craving dim sum (baby wants dim sum) and wow what an amazing selection we had. The staff were really attentive and friendly and the ambiance of the restaurant was beautiful. Will definitely come back once baby it out!",
        "time": 1743701336,
        "relative_time_description": "6 months ago"
      },
      {
        "author_name": "Vincent Liu",
        "rating": 5,
        "text": "Last month I been in Noble Palace\nThese  two dish are new and good taste\n\nPan-Fried Wagyu Beef Dumplings\nTempura Soft Shell Crab with Hot & Sour Sichuan Sauce\n\nThe whole experience was great.",
        "time": 1754492452,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Irene Tsung",
        "rating": 5,
        "text": "I had a fantastic dining experience today. Yuri and Kara, our servers, were friendly and attentive, ensuring we had everything we needed. They even asked about allergies, which was thoughtful. The food was delicious, and the beautifully presented dessert was the perfect finishing touch. Highly recommend for great food and excellent service!\n\nP.S. The dessert is a special order, so I recommend ordering it in advance. Don’t miss out on their special dessert—highly recommended!",
        "time": 1726501729,
        "relative_time_description": "a year ago"
      },
      {
        "author_name": "Andrea Kiese Seiferheld",
        "rating": 5,
        "text": "Went here for a baby shower and everything from the customer service, food, and ambiance was great. Can’t say much about the price because we were a big group so I paid fairly for what I got. They adjust for dietary restrictions, were constantly refilling water/sparking water based on your preference, and kindly handed bags for leftovers. One of the nicest baby showers I’ve been to! Thank you!",
        "time": 1735245780,
        "relative_time_description": "9 months ago"
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
    "lastVerifiedGoogle": "2025-10-16T20:23:45.099Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:45.099Z",
    "updatedAt": "2025-10-16T20:24:28.523Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Noble Palace — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_noble-palace_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.434Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Noble Palace",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Brewer's Grn, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 226
      },
      "url": "https://thebestinlondon.co.uk/restaurant/noble-palace-6iVOz8Kc",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Sunday: Closed"
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
    "image_card_path": "/images/restaurants/noble-palace-6iVOz8Kc/japanese-noble-palace-6iVOz8Kc-card-3bc768a5.webp",
    "image_hero_path": "/images/restaurants/noble-palace-6iVOz8Kc/japanese-noble-palace-6iVOz8Kc-hero-3dc984ce.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJxSy5AXIFdkgRCSYxrSS0hZo",
    "slug": "oita-soho-xrSS0hZo",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJxSy5AXIFdkgRCSYxrSS0hZo",
    "name": "OITA Soho",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 2717,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "47 Gerrard St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "47 Gerrard St, London",
    "postcode": "W1D 5QJ",
    "borough": "Central London",
    "lat": 51.5120922,
    "lng": -0.1299599,
    "phone": "020 7439 8808",
    "phone_international": "+44 20 7439 8808",
    "website": "http://www.oitarestaurant.com/",
    "url": "https://maps.google.com/?cid=11134503723360921097",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 11:00 PM"
      ],
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
      ]
    },
    "photos": [
      {
        "reference": "AciIO2ebjYn24j5TzHUFfLZeA5ILxVXX285E7XNhnjqXugoyMVrz1GtY37ZTod1y5RWbtD-BNJ-NBdpgZX8y3PRpHtfIWx1N-WAsK5WGoc-rs2KBf4WcZ_oESwuvsU_76rQVH5H0-hweC-HaLOnisdBFgDtpCrkpbMcqonnzmzqxxMm_6gHrJP6GWG-xevNXMbgdO7GQU5okev9v1MQCwLqikewfB9Nk-AWEcCbsoi35N-gBhcEg7UitoSaDisT5aN26hRFU5KPHvwBIO9CG2DqMeoQnh473cGjn8HK8epyCaStClQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ebjYn24j5TzHUFfLZeA5ILxVXX285E7XNhnjqXugoyMVrz1GtY37ZTod1y5RWbtD-BNJ-NBdpgZX8y3PRpHtfIWx1N-WAsK5WGoc-rs2KBf4WcZ_oESwuvsU_76rQVH5H0-hweC-HaLOnisdBFgDtpCrkpbMcqonnzmzqxxMm_6gHrJP6GWG-xevNXMbgdO7GQU5okev9v1MQCwLqikewfB9Nk-AWEcCbsoi35N-gBhcEg7UitoSaDisT5aN26hRFU5KPHvwBIO9CG2DqMeoQnh800cGjn8HK8epyCaStClQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106228490901105804284\">OITA Soho</a>"
        ]
      },
      {
        "reference": "AciIO2fvvonXwl4FUBBwiJEypEO7S9gAIh7QELJE1LV3GUjMEtYcDx3fv_fJMnh9bkHgeoEzXmSeFmpbfA4329oPO3rCvjK3bIgYuSoYTLfjr5HsVlPHDMoSrucjrCUDsTWPdBsaFiaCmLAUD698XLWzZ4gWWaWHX1ghNWQDMBd0qVxWLecaCTBZcnG98dABaVRzJapQ3DVT5WANN4me4tBnGljHzXWBEew2e1PWK1FZTIz9_IFRv8udtZTqfeaX9YkKvV-9wjFD6GAa9i_wCxsUDDWNMqi8i7BvZgbW9-tBEPJJ0Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fvvonXwl4FUBBwiJEypEO7S9gAIh800QELJE1LV3GUjMEtYcDx3fv_fJMnh9bkHgeoEzXmSeFmpbfA4329oPO3rCvjK3bIgYuSoYTLfjr5HsVlPHDMoSrucjrCUDsTWPdBsaFiaCmLAUD698XLWzZ4gWWaWHX1ghNWQDMBd0qVxWLecaCTBZcnG98dABaVRzJapQ3DVT5WANN4me4tBnGljHzXWBEew1200e1PWK1FZTIz9_IFRv8udtZTqfeaX9YkKvV-9wjFD6GAa9i_wCxsUDDWNMqi8i7BvZgbW9-tBEPJJ0Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106228490901105804284\">OITA Soho</a>"
        ]
      },
      {
        "reference": "AciIO2fYdTldsC0c7mfNCFqhLMWuVGuvWipEtb3aHcOlfJCLYxdKUkXpQlQBf-U0bd8eJRdZASqZOVh5b5Ono0OX1JSccxyp7rMM5r8aTX2jvhZ21JTXmooGaVjaKVM7OFevIQKYM7OJq8WTMj6ezlYGNgxI0-x4NDIfunuI7hou57EsnoVa7HBc7ONTDUoPbOcASk1XufIVlXwTybA_W9iLa7rJg2GOSOrcvKXRmqXZxaX2L7eE1h4-OT3Ofah_-8TP80tftIqRP4DkVtoREaCm3h0VKkRF5kRrdCCUHA67b3nle4FUpxwQ3LfwFWmfc4EXvuLA6Oe1Jg4MS24vUPgVVa3nK6UXcTgEYRCo65Oz_9uXcg54UxaFAQZf8x1kuNzjnnybI3lnOq8PZEo5ypTMP2yFKoNfADi28JIHz0-7TaUdvrRQBy_b0usOFJtCqfdm",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fYdTldsC0c7mfNCFqhLMWuVGuvWipEtb3aHcOlfJCLYxdKUkXpQlQBf-U0bd8eJRdZASqZOVh800b5Ono0OX1JSccxyp7rMM5r8aTX2jvhZ21JTXmooGaVjaKVM7OFevIQKYM7OJq8WTMj6ezlYGNgxI0-x4NDIfunuI7hou57EsnoVa7HBc7ONTDUoPbOcASk1XufIVlXwTybA_W9iLa7rJg2GOSOrcvKXRmqXZxaX2L7eE1h4-OT3Ofah_-8TP80tftIqRP4DkVtoREaCm3h0VKkRF5kRrdCCUHA67b3nle4FUpxwQ3LfwFWmfc4EXvuLA6Oe1Jg4MS24vUPgVVa3nK6UXcTgEYRCo65Oz_9uXcg54UxaFAQZf8x1kuNzjnnybI3lnOq8PZEo5ypTMP2yFKoNfADi28JIHz0-7TaUdvrRQBy_b0usOFJtCqfdm&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100366378361093166031\">Saeed AlKhoori</a>"
        ]
      },
      {
        "reference": "AciIO2dvvSYNti7TmyLl8eSObjWZYNTdGTpO_3T-g5LQC-D7UO2kTEDucAuLi85klgISqS3OQZg8o24KgusMoGop_ew6Ei98cr2W7KKgPoVROPAydVjmbFteZayFSiInrJNv2pqPLbBeEHCkGj6zJO_Wt-bAAOaYMlNkDN0YVBYWq-Hvv5PBYW0X_8bA0YaLQnofA2cCjRIyhdm5G1lwLFP9UAI1v0liwPMV37idLRE_hB_4XZT8RhTyvFmTBc2YKpmGv3zChTBL-JMi-p8JniisM_ktKOPgaKsKmDhkblxIMhhEen63X_Nqx8WPNmf6qEGOAA0RmLpfq9n6ghVEaKP9HtHlUUhwF2f-x4F8g3ozZMMlZGOE1hSyRIq-2_XDe4ilhXopF9DQH6MdscglrwBYTFRs_Ini0LHRcndkLocUkH6q8g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dvvSYNti7TmyLl8eSObjWZYNTdGTpO_3T-g5LQC-D7UO2kTEDucAuLi85klgISqS3OQZg8o24KgusMoGop_ew1200Ei98cr2W7KKgPoVROPAydVjmbFteZayFSiInrJNv2pqPLbBeEHCkGj6zJO_Wt-bAAOaYMlNkDN0YVBYWq-Hvv5PBYW0X_8bA0YaLQnofA2cCjRIyhdm5G1lwLFP9UAI1v0liwPMV37idLRE_hB_4XZT8RhTyvFmTBc2YKpmGv3zChTBL-JMi-p8JniisM_ktKOPgaKsKmDhkblxIMhhEen63X_Nqx8WPNmf6qEGOAA0RmLpfq9n6ghVEaKP9HtHlUUhwF2f-x4F8g3ozZMMlZGOE1hSyRIq-2_XDe4ilhXopF9DQH6MdscglrwBYTFRs_Ini0LHRcndkLocUkH6q8g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114123996091312656048\">Таїсія Цвіткова</a>"
        ]
      },
      {
        "reference": "AciIO2fpP12vBB0mUgpFpRMz_MQmYVPad6NQdwCLmbpj4VOLFWHHLq0AN1rdqBONGl3sJTQDLR0g955YqQPIlS4W28Hxc9XNH7nUZI65xFTs92dCDHG3IFdiAnK7Qs9o7qz0VAchAtugl8GrFst6qf4GOv1m8A8VdyvrKXfs5dbr6fvuijHPGm_fiR1N1aq4Qr8Nj-uG7gXGKzgJKeJUxRu8KcnaH_TjsXJAHOWrAMq0V_DGG-wCFFU6owAN3LpL3MPr_v34CeboY2gQRoot0JYHvu__YafuUvT-FXFbYW8Ca78nZE6eh3TWmKL6ahaVh6e3HTC-H-6PsBSUtky0z7hkURbrnIamVCghzw23w2CYLCoROFjQ1zIkDgi0QcY18cjJGZG_CA-hq6RoFO_b-2uBbJWpNMZZNj0fMbp9mdUeqycvDtlbqVvPbvEAJaiHTcki",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fpP12vBB0mUgpFpRMz_MQmYVPad6NQdwCLmbpj4VOLFWHHLq0AN1rdqBONGl3sJTQDLR0g955YqQPIlS4W28Hxc9XNH7nUZI65xFTs92dCDHG3IFdiAnK7Qs9o7qz0VAchAtugl8GrFst6qf4GOv1m8A8VdyvrKXfs5dbr6fvuijHPGm_fiR1N1aq4Qr8Nj-uG7gXGKzgJKeJUxRu8KcnaH_TjsXJAHOWrAMq0V_DGG-wCFFU6owAN3LpL3MPr_v34CeboY2gQRoot0JYHvu__YafuUvT-FXFbYW8Ca78nZE6eh800TWmKL6ahaVh6e3HTC-H-6PsBSUtky0z7hkURbrnIamVCghzw1200w2CYLCoROFjQ1zIkDgi0QcY18cjJGZG_CA-hq6RoFO_b-2uBbJWpNMZZNj0fMbp9mdUeqycvDtlbqVvPbvEAJaiHTcki&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117596840324985048888\">Git</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Lionel Tan",
        "rating": 5,
        "text": "This is a popular place and best to make a booking. Came on a Friday evening and it is packed with several sittings. For starters, the Takoyaki was great. We shared the salmon lovers roll. Also had the Salmon Sashimi don and Ikura don. All the seafood was fresh and large portions. Service was prompt.",
        "time": 1759622398,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Arun James",
        "rating": 5,
        "text": "We popped into OITA for lunch and left seriously impressed. The food was fresh, bold, and full of flavour — and the service was super quick too\n\nThe takoyaki was a total standout — crispy on the outside, soft and gooey inside, topped with a rich umami sauce and dancing bonito flakes. Comforting, savoury, and genuinely some of the best we’ve had.\n\nThe Fire Dragon Roll was just as good — warm, spicy, and perfectly crisp with a great balance of texture and flavour. Definitely something we’d order again.\n\nWe also had the kakuni ramen — the broth was rich and satisfying, though the pork belly was a bit firmer than expected. Still a solid, hearty bowl.\n\nTo drink, we tried a piña colada and a raspberry mojito — both super refreshing and well-made, the perfect finishing touch to a really enjoyable lunch.\n\n@brownsugaaaa",
        "time": 1751295979,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Dagmara Jankowska",
        "rating": 5,
        "text": "This place is perfect. Very nice interior design and helpful staff (especially Mrs. Joanna, who has made our visit a wonderful experience, thank you!).\nWe ordered some sushi and fried chicken, it was really tasty. The waiting time was short and the quality of the dishes high.\nWe highly recommend and surely come back during next trip to London.",
        "time": 1757183669,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Lidor Bracha",
        "rating": 5,
        "text": "One of the easiest 5 stars I have. So good. Service was epic level! Wow.\nFood was excellent with such a good taste. All the ingredients were super fresh.",
        "time": 1759270562,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Daniel Whysall",
        "rating": 5,
        "text": "My partner and I loved it here. The food and cocktails were fantastic. We finished everything (which we don't usually do!). It was a little snug, the tables are a tad close together, but nothing too bad.",
        "time": 1757806182,
        "relative_time_description": "a month ago"
      }
    ],
    "types": [
      "bar",
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 4,
    "fsa_rating_text": "4",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1584358",
    "fsa_last_inspection": "2025-06-12T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:26.214Z",
    "lastVerifiedFSA": "2025-10-16T23:15:49.519Z",
    "createdAt": "2025-10-15T10:53:26.214Z",
    "updatedAt": "2025-10-16T20:24:19.964Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "OITA Soho — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_oita-soho_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.431Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "OITA Soho",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "47 Gerrard St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 2717
      },
      "url": "https://thebestinlondon.co.uk/restaurant/oita-soho-xrSS0hZo",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/oita-soho-xrSS0hZo/japanese-oita-soho-xrSS0hZo-card-ff0b5967.webp",
    "image_hero_path": "/images/restaurants/oita-soho-xrSS0hZo/japanese-oita-soho-xrSS0hZo-hero-e9487165.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ3Xz1VkQbdkgRUgW5PZAMF6Q",
    "slug": "rai-restaurant-london-5PZAMF6Q",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ3Xz1VkQbdkgRUgW5PZAMF6Q",
    "name": "RAI Restaurant London",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 1339,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "11, RAI, 13 Bayley St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "11, RAI, 13 Bayley St, London",
    "postcode": "WC1B 3HD",
    "borough": "Central London",
    "lat": 51.518761,
    "lng": -0.132082,
    "phone": "020 8149 6248",
    "phone_international": "+44 20 8149 6248",
    "website": "http://rairestaurant.com/",
    "url": "https://maps.google.com/?cid=11823933160334886226",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:30 PM, 5:30 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 10:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2200"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1530"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2230"
          },
          "open": {
            "day": 1,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1530"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1530"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1530"
          },
          "open": {
            "day": 5,
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
            "time": "1730"
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
      ]
    },
    "photos": [
      {
        "reference": "AciIO2cimfHA82DgXA1ougtrGKSOErBJOxbt6uhQa4lClvWXSdds2WqI0qrXxezAxgF-KEAH3zOJSOCiuK9skPTW3NsArQ1TpyQh7TknsJ_kfVcmGrjchzL1t3h_3jss2UuuTGyFnKI9QNgNhRPwu4B3sBEeP8-VRRlkuSSowuzg8fvntXcX3zuf8HaFB9A9sQr9RQRxep6dfwCgH0GKvLfdW97EZVV5Bk1rBax1YHfg_Im-Xnx-i1JtUM3ax42v4jyh6ajYhSsZqsT_TQ6pKY9-feI2QnPqO71x-sVtQRT0cfWIjQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cimfHA82DgXA1ougtrGKSOErBJOxbt6uhQa4lClvWXSdds2WqI0qrXxezAxgF-KEAH3zOJSOCiuK9skPTW3NsArQ1TpyQh800TknsJ_kfVcmGrjchzL1t3h_3jss2UuuTGyFnKI9QNgNhRPwu4B3sBEeP8-VRRlkuSSowuzg8fvntXcX3zuf8HaFB9A9sQr9RQRxep6dfwCgH0GKvLfdW97EZVV5Bk1rBax1YHfg_Im-Xnx-i1JtUM3ax42v4jyh6ajYhSsZqsT_TQ6pKY9-feI2QnPqO71x-sVtQRT0cfWIjQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105926374390623283660\">RAI Restaurant London</a>"
        ]
      },
      {
        "reference": "AciIO2fHNlB5oozRJliUIB0NFfQ06MPnm9bjgZZMb3xelfV_JvbtpUaZhwsr8V4M_NLwztNMGbl5ROo8Onr-UjMQvYmNzboJvUDwVkwbpiSn86WzlVcGE3cyyMSy9DCKlck6EyBwScalZTbeujX-TkxGtSArw50vV_wMTMRWEhikNPS3DHxTz2p9D6ZHdzYBQY1xC5ThYnaSJwabXL1Y7b9QcltgYqciek7r8hQxRDPPNEyid1ePBulYLBGHjy-2Px6Ek7tLA6OkzwyB3MSLnTP40-5ea8FuUYaXaQ6Y4NLZSCas6rPLejlUFafJRQ_bZ7ohqJ-YDr7uIFhwa-r866_YOR15otCCzp5sUXwfkL9BMPHxatcHXh4u-Ihnj4MJSu9PoMJh2BKFhbY6bPEtSIbaw5iLE4CO4cdVDIKgipDDLO2q4u00KDq0x-5OI_F-iQsR",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fHNlB5oozRJliUIB0NFfQ06MPnm9bjgZZMb3xelfV_JvbtpUaZhwsr8V4M_NLwztNMGbl5ROo8Onr-UjMQvYmNzboJvUDwVkwbpiSn86WzlVcGE3cyyMSy9DCKlck6EyBwScalZTbeujX-TkxGtSArw1200vV_wMTMRWEhikNPS3DHxTz2p9D6ZHdzYBQY1xC5ThYnaSJwabXL1Y7b9QcltgYqciek7r8hQxRDPPNEyid1ePBulYLBGHjy-2Px6Ek7tLA6OkzwyB3MSLnTP40-5ea8FuUYaXaQ6Y4NLZSCas6rPLejlUFafJRQ_bZ7ohqJ-YDr7uIFhwa-r866_YOR15otCCzp5sUXwfkL9BMPHxatcHXh800u-Ihnj4MJSu9PoMJh2BKFhbY6bPEtSIbaw5iLE4CO4cdVDIKgipDDLO2q4u00KDq0x-5OI_F-iQsR&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103291904495176641643\">Lisa Bourne</a>"
        ]
      },
      {
        "reference": "AciIO2enufFRiaF7vsjbeVTb6nGb3fpyK_fj9fxvYNhkkjp9wLeKYVk1cvoXiXYqWSGsNKG9qiPgSRqtq1E5fxDu6w42FupwtUbdpfQVryr5tN31AsjtP9e0IcEbuLOmjbo3pY4PwtIM57S-o2jFJmjHNN4AzYHe6pluVLvmU0q64aJR4TT3LgePWOjuNuBrVLZBJ1hwor2L2Yh6IbQGdBbvcuxNE294RncmE-HFoPlPl-zl08JZAHlRp9AENheDCUXQG8zQeiOqYV-g1cZXJHd-snDB_kcIpxXokxnzLki_WEZ3tw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2enufFRiaF7vsjbeVTb6nGb3fpyK_fj9fxvYNhkkjp9wLeKYVk1cvoXiXYqWSGsNKG9qiPgSRqtq1E5fxDu6w1200FupwtUbdpfQVryr5tN31AsjtP9e0IcEbuLOmjbo3pY4PwtIM57S-o2jFJmjHNN4AzYHe6pluVLvmU0q64aJR4TT3LgePWOjuNuBrVLZBJ1hwor2L2Yh800IbQGdBbvcuxNE294RncmE-HFoPlPl-zl08JZAHlRp9AENheDCUXQG8zQeiOqYV-g1cZXJHd-snDB_kcIpxXokxnzLki_WEZ3tw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105926374390623283660\">RAI Restaurant London</a>"
        ]
      },
      {
        "reference": "AciIO2dKNSoykjYDgHgBMABS1KSaAjLAvKZFNkI2ZGoUMrWhIjN8k890DjZVJ2CIBPMZa7ujkzK8NH4mlxsI8yv7SMadY0K9O77sE0VJYq3_x2KpgmV86mOYG1Je3tVzPPSgv5Thbvz_Y3H2t0ndV9BgX29nqOSfWtb4vlHWDEmzoglBYkaPZTELd1ZZuo2TmHwQ6dQok9OR665j0YNPR1SOK1EIm7rsKfa-mT9uBug6VbUpu2ncFFp3a_6tUEM7XiSZcUAqu9dqGTaFKwD0Fxbqe0H26TYqiqhjUK06RH5rQvT0d6fZrZdwLPuFc1rW8mmcLD1QNMiuoC8fo4lXWPzYD5YHtedXJS5bh3neNyfR8ihpuDZYOoGqQyEspsppqCF_tKwnpr3lw-Q3jjp_wEmmofLUN-qD7UXEos4Hhbz6fLThQEFHXicXd6dkOvNOyg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dKNSoykjYDgHgBMABS1KSaAjLAvKZFNkI2ZGoUMrWhIjN8k890DjZVJ2CIBPMZa7ujkzK8NH4mlxsI8yv7SMadY0K9O77sE0VJYq3_x2KpgmV86mOYG1Je3tVzPPSgv5Thbvz_Y3H2t0ndV9BgX29nqOSfWtb4vlHWDEmzoglBYkaPZTELd1ZZuo2TmHwQ6dQok9OR665j0YNPR1SOK1EIm7rsKfa-mT9uBug6VbUpu2ncFFp3a_6tUEM7XiSZcUAqu9dqGTaFKwD0Fxbqe0H26TYqiqhjUK06RH5rQvT0d6fZrZdwLPuFc1rW8mmcLD1QNMiuoC8fo4lXWPzYD5YHtedXJS5bh800neNyfR8ihpuDZYOoGqQyEspsppqCF_tKwnpr3lw-Q3jjp_wEmmofLUN-qD7UXEos4Hhbz6fLThQEFHXicXd6dkOvNOyg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103511195980454274430\">Eric Pang</a>"
        ]
      },
      {
        "reference": "AciIO2efSZHRmXVq4_Jki04P-tGQAitiGfBGb1cHA9FrbqxJU9LaBqlj-VwVxmtnKIPq4zjJKK-BZdRChPvFkYbu52qrfRNJphcsOPYmMLLFBsPUsjONuuoEqxQH1oIUCFns0a87DXWXj69mD4QV1O8ugKe3_ttXptj3djbqvMuF31u0P1ik6swgkkmWnk6zNBRm_G6I9x3DtdF43osBKIWburhtCwfc_uSE4H4RQ_y_XwZeHhwFzvp-ntvTUN_X1WBt0jNAXuDD1UQl-8o6JRfRsVA9FUQGntrM4qCCv4i_ZQaV7A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2efSZHRmXVq4_Jki04P-tGQAitiGfBGb1cHA9FrbqxJU9LaBqlj-VwVxmtnKIPq4zjJKK-BZdRChPvFkYbu52qrfRNJphcsOPYmMLLFBsPUsjONuuoEqxQH1oIUCFns0a87DXWXj69mD4QV1O8ugKe3_ttXptj3djbqvMuF31u0P1ik6swgkkmWnk6zNBRm_G6I9x3DtdF43osBKIWburhtCwfc_uSE4H4RQ_y_XwZeHhwFzvp-ntvTUN_X1WBt0jNAXuDD1UQl-8o6JRfRsVA9FUQGntrM4qCCv4i_ZQaV7A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105926374390623283660\">RAI Restaurant London</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Priya S",
        "rating": 5,
        "text": "I visited Rai for my birthday lunch as a solo diner and chose the 13-course Omakase. It was an incredible, intimate experience where the chef’s expertise really shone - each dish was beautifully crafted, and watching the skill and precision behind them made it even more special. The fish was unbelievably fresh and melted in my mouth; every course felt like a new favourite. Standouts for me were the butterfish, eel with grated black truffle, spicy scallop, and the black cod main.\n\nThe service was exceptional - attentive, friendly, and made me feel very welcome dining alone. A lovely surprise was a complimentary glass of champagne and a birthday dessert with a candle, which made the whole experience extra memorable.\n\nRai truly delivered a 5-star dining experience and made my birthday feel very special. Highly recommend for anyone wanting to enjoy a refined and beautifully thought-out omakase in London.",
        "time": 1759399720,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Katrina D",
        "rating": 5,
        "text": "Great omakase experience for our anniversary. Service was absolutely great, food was fresh and delicious! Would be great if seats were more comfortable but overall, it’s very cozy.\n\nWe had additional wagyu, but honestly wouldn’t recommend that one.",
        "time": 1759608621,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Rebecca Singh",
        "rating": 5,
        "text": "We came here to celebrate my fiance's birthday and it was the most amazing experience. The food was delicious, very fresh fish that literally melted in our mouths. The chefs were fantastic and put on an amazing show. We had the 13 course meal and it was the perfect amount of food. I'm not a big eater so I was stuffed by the end of it. You have to option to order more food if you like. They also gave us complimentary glasses of champagne for my fiance's birthday. Would definitely love to come back.",
        "time": 1756122207,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Brian Shek",
        "rating": 5,
        "text": "An absolutely exceptional experience at RAI! The atmosphere was elegant yet welcoming, and every dish was a true work of art. I had the privilege of meeting Chef Rai himself who not only entertained us with his warm personality, but also impressed with his incredible skill and precision in crafting sushi. Watching his mastery up close elevated the whole dining experience, each piece was both visually stunning and bursting with flavour. Truly one of the best dining experiences I’ve had in London. Highly recommended for anyone who values world-class Japanese cuisine with a personal touch!",
        "time": 1756488020,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Farah Ch.",
        "rating": 5,
        "text": "We had our anniversary dinner here and we absolutely loved it. Definitely one of the best omakase experiences I’ve had and the best I’ve had in London. The ingredients were fresh and the chef’s creative twists on the classic nigiris were simply delicious, a scrumptious balance of flavours in every bite, and even though they used premium ingredients (otoro, ikura and uni for example), they didn’t skimp- it’s probably the first time I’ve had omakase and felt happily full afterwards. The freshly grated fresh wasabi was one of my favourite things.\nChef Padam and his team are doing a great job. Only two minuses in our opinion: the seating is a bit too crowded and in one course the rice was too moist - those are our only two minor complaints.\n\nI’m already looking forward to our next visit.",
        "time": 1759079342,
        "relative_time_description": "2 weeks ago"
      }
    ],
    "types": [
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
    "lastVerifiedGoogle": "2025-10-16T20:23:44.116Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:44.116Z",
    "updatedAt": "2025-10-16T20:24:23.199Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "RAI Restaurant London — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_rai-restaurant-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.432Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "RAI Restaurant London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11, RAI, 13 Bayley St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 1339
      },
      "url": "https://thebestinlondon.co.uk/restaurant/rai-restaurant-london-5PZAMF6Q",
      "openingHours": [
        "Monday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:30 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:30 PM, 5:30 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 10:00 PM"
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
    "image_card_path": "/images/restaurants/rai-restaurant-london-5PZAMF6Q/japanese-rai-restaurant-london-5PZAMF6Q-card-c08d50d8.webp",
    "image_hero_path": "/images/restaurants/rai-restaurant-london-5PZAMF6Q/japanese-rai-restaurant-london-5PZAMF6Q-hero-6cfe097a.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJbX_Fhx8FdkgRbTfFDICmOhQ",
    "slug": "speedboat-bar-FDICmOhQ",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJbX_Fhx8FdkgRbTfFDICmOhQ",
    "name": "Speedboat Bar",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 4320,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "30 Rupert St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "30 Rupert St, London",
    "postcode": "W1D 6DL",
    "borough": "Central London",
    "lat": 51.5111755,
    "lng": -0.1326545,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://speedboatbar.co.uk/",
    "url": "https://maps.google.com/?cid=1457660498308052845",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 1:00 AM",
        "Saturday: 12:00 PM – 1:00 AM",
        "Sunday: 12:00 – 11:00 PM"
      ],
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
            "day": 2,
            "time": "0000"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "0000"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "0000"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "0000"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0100"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0100"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2cqJqmbY4ZvoOCsTFmziRA23UutrOJZZ7T-GbfFchWkH3-20cI1u5Pfum94IXcSpR21Do8ggaA6-BuSOC6nqyDbVl6VsclFwjkpPbZz13wEWJ2yDcEEyiOoT6ZVXhSPlSEsABTP-BsjxY70chMjAu8bMPp3_r2dLxHfOM675a9iuTSBoIMQud1V_uUeT4f19R7vO4M5FdtGltIIf_I9eF3MrbPbqLvgf324TYa5u5Hi4H_c1LxjICrl51n-Bszv81jQMI5nNyDNISqvAhy86JC57xUdjFodymDxPgubqfXNaD0-R44GR1Pd3RRifathWvmYo5GfwRkjzYRzL4WfewFi5kIMQd2qljiG59vMCzMhryHYo6gVNM2dHdnySD-Mp-JDAMq3fTI1GxpUhRiM9ukN49McDpUkv7iQ956fi-nTF84",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cqJqmbY4ZvoOCsTFmziRA23UutrOJZZ7T-GbfFchWkH3-20cI1u5Pfum94IXcSpR21Do8ggaA6-BuSOC6nqyDbVl6VsclFwjkpPbZz13wEWJ2yDcEEyiOoT6ZVXhSPlSEsABTP-BsjxY70chMjAu8bMPp3_r2dLxHfOM675a9iuTSBoIMQud1V_uUeT4f19R7vO4M5FdtGltIIf_I9eF3MrbPbqLvgf324TYa5u5Hi4H_c1LxjICrl51n-Bszv81jQMI5nNyDNISqvAhy86JC57xUdjFodymDxPgubqfXNaD0-R44GR1Pd3RRifathWvmYo5GfwRkjzYRzL4WfewFi5kIMQd2qljiG59vMCzMhryHYo6gVNM2dHdnySD-Mp-JDAMq3fTI1GxpUhRiM9ukN49McDpUkv7iQ956fi-nTF84&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103011271917047539699\">EagleTheQuaker</a>"
        ]
      },
      {
        "reference": "AciIO2fsbqcyAg6g9xVrHM05c8ttwAowJQ7T8NWZwm8bjlMIDsqtVPtjYzwAl063akG2ZR0OA_BXSfe9NFT9a2wdTmBem1Fd942_3KqDe_GozNYftzOb_P71MO7DHLv4JxBhEAEqpG5WMiK5WyBc6UMsi1H_X0xL8ibYUjEB_GcrMiq27tX1eq75x_ylQMhjKdbnPg9ox0iZgE02ys83naWq3F-AKegCSNXl3QxgvhVI--ZJj8Go7bz7trSfVFBX_fefEHQ-duAWPY83GUHHLPHS1girNc7QD9otkPsd8sG7f9fI1Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fsbqcyAg6g9xVrHM05c8ttwAowJQ7T8NWZwm8bjlMIDsqtVPtjYzwAl063akG2ZR0OA_BXSfe9NFT9a2wdTmBem1Fd942_3KqDe_GozNYftzOb_P71MO7DHLv4JxBhEAEqpG5WMiK5WyBc6UMsi1H_X0xL8ibYUjEB_GcrMiq27tX1eq75x_ylQMhjKdbnPg9ox0iZgE02ys83naWq3F-AKegCSNXl3QxgvhVI--ZJj8Go7bz7trSfVFBX_fefEHQ-duAWPY83GUHHLPHS1girNc7QD9otkPsd8sG7f9fI1Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103941612839341939947\">Speedboat Bar</a>"
        ]
      },
      {
        "reference": "AciIO2chC-5D5pkimyaIyx4PR1d1RJkDIMhYUB4U4vVZWhA9wWoTQcsiSqlR8bzxHBgUueRYl9pzDD6T1B7rYfwYvuPfiWBapTdWh0eMbeomdYlrfJQ9KejG-S5gPEouavThHXrtAAhVzRGUUt-EACU6thObyl0yGVRmlwD0kIOyRmFgjGV4R6INCsrp6nrd7cZI8tNUI3-QSZoyuoAAWhX-fF9My1OOroyppOCcabpdBPlzwdPbaZ6RaeS_lsOmR0F0UH6h5eKO2iZM8-IF1YyMcnW1Vl8mYJAzUxUUvoMX4qDLy21NqsOtDVOqtlL_uoeccIxVlUXPVQtkzCYQDx8CVcbWIyNNLyP8q_c6GunUacmzHgQmRUqLJXxj0iXvyndln1uWCsD20sZQrCqtqvky09f2Tyo_0IKW7ZMlCERrT0lkGS7jDCdPrtCzbgB-zCsM",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2chC-5D5pkimyaIyx4PR1d1RJkDIMhYUB4U4vVZWhA9wWoTQcsiSqlR8bzxHBgUueRYl9pzDD6T1B7rYfwYvuPfiWBapTdWh800eMbeomdYlrfJQ9KejG-S5gPEouavThHXrtAAhVzRGUUt-EACU6thObyl0yGVRmlwD0kIOyRmFgjGV4R6INCsrp6nrd7cZI8tNUI3-QSZoyuoAAWhX-fF9My1OOroyppOCcabpdBPlzwdPbaZ6RaeS_lsOmR0F0UH6h5eKO2iZM8-IF1YyMcnW1Vl8mYJAzUxUUvoMX4qDLy21NqsOtDVOqtlL_uoeccIxVlUXPVQtkzCYQDx8CVcbWIyNNLyP8q_c6GunUacmzHgQmRUqLJXxj0iXvyndln1uWCsD20sZQrCqtqvky09f2Tyo_0IKW7ZMlCERrT0lkGS7jDCdPrtCzbgB-zCsM&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109471113229833422523\">K L</a>"
        ]
      },
      {
        "reference": "AciIO2dS4aFfCX6QyZjpfPOOAdqWypWEBjUhUnlRopRKdzE5rt2mmKhwnHDTtsfvNsMQEvWld1MDGakswfvsKp2xXAV4V4aJJjegpjWP7t1GSeTAvyYvOhQ8myk13PCycg338gkxGte1zwQ6KLSgSFQCiKHlN178Tsi__HLhCGXTIOcTKtY1-fxdrsyo0wWVTVVDlEG4kShK8taqjS2ISXYDVfR3kBdlamTQblIvLV9Vdrqo10U2n_W7rDODC6dMdyteat9bQq_6gVNpIrTHXHNENPpVZSAn1fQpQRXZMVZh6DdeXe-KC1x0WAgNPTs4L1QxE4E8Ny67BEphbEWdYqf8hqrgsbsE2S5LTdKPNL-bnMTBLqcorUUQtsKqLPuL8omAxTbfJ3Y6UTBmTWH8W1ya_pXlKuE8mQCK7OsIIX-DSda4qw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dS4aFfCX6QyZjpfPOOAdqWypWEBjUhUnlRopRKdzE5rt2mmKhwnHDTtsfvNsMQEvWld1MDGakswfvsKp2xXAV4V4aJJjegpjWP7t1GSeTAvyYvOhQ8myk13PCycg338gkxGte1zwQ6KLSgSFQCiKHlN178Tsi__HLhCGXTIOcTKtY1-fxdrsyo0wWVTVVDlEG4kShK8taqjS2ISXYDVfR3kBdlamTQblIvLV9Vdrqo10U2n_W7rDODC6dMdyteat9bQq_6gVNpIrTHXHNENPpVZSAn1fQpQRXZMVZh800DdeXe-KC1x0WAgNPTs4L1QxE4E8Ny67BEphbEWdYqf8hqrgsbsE2S5LTdKPNL-bnMTBLqcorUUQtsKqLPuL8omAxTbfJ3Y6UTBmTWH8W1ya_pXlKuE8mQCK7OsIIX-DSda4qw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104947392562786440804\">David Gutiérrez</a>"
        ]
      },
      {
        "reference": "AciIO2dObXlOImV7K93h2QY8n92smMKxOk9_4m5mdLX44GBBVq_lG2YgOFAmLqtZVMDTUqM9JR6eWWQWEckmTRYNtetiRwwcnBVYAteDqaVTVdc1lA8BbGcOh0tgJHVhriWS5KUHRDZy5_nMn9rI9myffsaYxjPucMUb7UMMl7MXLv1IxbHw7qntMn0VKU_APrdGngiYwB2uxLkNZj6hs1jNFbVwudlGQi49ilkom_Or0nb3Yun-bVbKn1vH8OvB1d6uM20SlgRfT7l47iOWBSrIQmk0VGPvBD5xm-kwNm9OJu8CDGbPdyaWJ77HMoV4WhlaWMbtbdnrKXwlSoq_xakLugoNbe0PL0ihv7gsm_x-j8B3h02lOSnTvv1ad-xejJwMyHVxH64vjlNp5j7M39glvMsdc0w6140H32UclHyh6-Wy-wcgpTRiMOS-odMAFw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dObXlOImV7K93h800QY8n92smMKxOk9_4m5mdLX44GBBVq_lG2YgOFAmLqtZVMDTUqM9JR6eWWQWEckmTRYNtetiRwwcnBVYAteDqaVTVdc1lA8BbGcOh0tgJHVhriWS5KUHRDZy5_nMn9rI9myffsaYxjPucMUb7UMMl7MXLv1IxbHw1200qntMn0VKU_APrdGngiYwB2uxLkNZj6hs1jNFbVwudlGQi49ilkom_Or0nb3Yun-bVbKn1vH8OvB1d6uM20SlgRfT7l47iOWBSrIQmk0VGPvBD5xm-kwNm9OJu8CDGbPdyaWJ77HMoV4WhlaWMbtbdnrKXwlSoq_xakLugoNbe0PL0ihv7gsm_x-j8B3h02lOSnTvv1ad-xejJwMyHVxH64vjlNp5j7M39glvMsdc0w6140H32UclHyh6-Wy-wcgpTRiMOS-odMAFw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105381081251054193208\">William Dixon</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "K L",
        "rating": 5,
        "text": "Oh my word. My husband and I came here with high expectations for our anniversary. Firstly, a sincere shoutout to the friendly and highly attentive waitstaff. We reserved in advance (which I recommend doing as it gets busy!) and they had actually read my booking notes. In the notes I mentioned I was pregnant and so they double checked I was happy with the preparation and ingredients of certain dishes. The menu leans towards the spicy and salty side, but at the same time is very fragrant and aromatic. Quite addictive really! I’ve seen viral videos of that Tom Yam deluxe noodle dish so obviously we had to get it. It was delicious, but to my surprise, my favourite dish was their Naem fried rice. It’s been about a week since our visit and I’m still licking my lips thinking about it. To top everything off, we got a surprise scoop of taro ice cream. How adorable is that? Lots of love to Speedboat. We’ll be back, and definitely before our next anniversary!",
        "time": 1759324267,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "hannah feldman",
        "rating": 3,
        "text": "hyped up place for sure and while the interior lives up to the hype and certainly some of the dishes do they are unfortunately inconsistent and I don’t think pay attention to detail… possibly because it gets so busy. Don’t get me wrong it was nice and tasty but just a little inconsistent and not insane value. The rice was overcooked and actually clumped together which I wouldn’t expect from a Thai restaurant- especially when paying £4 extra.. the purple aubergines were really nice, tender and flavourful. However for £12.50 I got one long purple aubergine- eight pieces. Would’ve said id happily pay £9, as it wasn’t mind blowing but very very nice. Would’ve been nicer with better rice. Good spice level, even though we received warning it was actually perfect. Channah got crispy egg noodles with gravy pork and squid and was pleasantly surprised with two different types of squid and she said good value for the amount of squid, as she’d expect more pork and less squid but it was the other way round. The spice also could’ve been higher and she wanted more greens in the mix and garnish. She really enjoyed though and felt it was good value for central London £17. Staff are possibly a bit overworked and overwhelmed but they are all so lovely. Happy to have come but wouldn’t rush to come back.",
        "time": 1759087778,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Karen Tran",
        "rating": 5,
        "text": "Food and drinks were great!! I am obsessed with Tom yum mama noodles and regularly have the instant version at home so this boujee version was fantastic!! The fried rice was very flavoursome and even better with the sauces! Pour the beef tongue curry sauce on it and it’s even better! The pineapple pie was a nice way to end the meal",
        "time": 1753178875,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "wan Shang",
        "rating": 1,
        "text": "I have lived in London for 6 years and tried all kinds of good or bad restaurants. However, this is the first time I have written a review for a restaurant. First of all, I would like to thank the patient waiters and their drinks are good. However, what puzzles me is that the pricing of your restaurant's dishes is like a joke with customers. Your specialty dish \"yum pot\" is priced at 29 pounds. In fact, it is pitifully small and the contents are only some fried pork and convenience-based bargains, and a bowl of small rice costs 4 pounds. In addition, as for your taste, as an Asian, I can responsibly tell other consumers that the taste level of your food has only reached the middle and lower reaches. Then, your dining environment focusses on the style of \"market flavour” and \" street food\", so your dining environment is actually pitiful. Finally, in short, you don't have the dining environment and service experience of a high-class restaurant, and you don't make the food delicious. Overall, you have only achieved the level of 8 pounds per person. I don't understand why you have such a high Google rating.",
        "time": 1760051284,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Isar Krista-Leigh",
        "rating": 3,
        "text": "I was a little bit underwhelmed with this place - huge potential with such a unique and cool vibe to the place. The only thing is it gets so crowded even the staff seem stressed with the hot plates darting around people. I wouldnt come back on a Thursday-Saturday night. Because it was so crowded I think the staff felt overwhelmed.\n\nIf it wasnt crowded I wouldve had a better experience for sure as the food was pretty good and the vibe was cool! Definitely recommend the noodles but sizzling seafood was average!",
        "time": 1760090407,
        "relative_time_description": "in the last week"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": "5",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1540582",
    "fsa_last_inspection": "2024-06-10T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:35.729Z",
    "lastVerifiedFSA": "2025-10-16T23:16:50.087Z",
    "createdAt": "2025-10-15T10:53:35.729Z",
    "updatedAt": "2025-10-16T20:24:30.896Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Speedboat Bar — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_speedboat-bar_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.435Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Speedboat Bar",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "30 Rupert St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 4320
      },
      "url": "https://thebestinlondon.co.uk/restaurant/speedboat-bar-FDICmOhQ",
      "openingHours": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 1:00 AM",
        "Saturday: 12:00 PM – 1:00 AM",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/speedboat-bar-FDICmOhQ/japanese-speedboat-bar-FDICmOhQ-card-c09f273a.webp",
    "image_hero_path": "/images/restaurants/speedboat-bar-FDICmOhQ/japanese-speedboat-bar-FDICmOhQ-hero-6c893c0f.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJZRnZ4dwEdkgRy-CoHK7UfPw",
    "slug": "ma-la-sichuan-oHK7UfPw",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJZRnZ4dwEdkgRy-CoHK7UfPw",
    "name": "Ma La Sichuan",
    "description": "Sleek restaurant serving Chinese Sichuan cuisine, along with dim sum.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 1629,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "Pelham House, 37 Monck St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Pelham House, 37 Monck St, London",
    "postcode": "SW1P 2BL",
    "borough": "Central London",
    "lat": 51.4967139,
    "lng": -0.130643,
    "phone": "020 7222 2218",
    "phone_international": "+44 20 7222 2218",
    "website": "http://www.malasichuan.co.uk/",
    "url": "https://maps.google.com/?cid=18193650438940188875",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 4:00 – 10:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2200"
          },
          "open": {
            "day": 0,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1430"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1430"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1430"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1430"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2230"
          },
          "open": {
            "day": 5,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2230"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2c52nMcqchSyBsER-ggJfDkYJHqPRfqJSvmbdX9K3XRWucwx0UKUUKmS1RLyPM6ax7owKxkXyFIVCD0r0S34uqxqklW4u-jS1_VVCqvHFB1iIuasVUX_Vny3cd8t-0CLVx-E6EGWvUxKYZ10AYp8lm7hLtG4kiwR5FqMvOlbQSrV1GshTobKtNXVgrY2ji73f8GijM0CRCx1hRZYkrcKkiG-mKb9J3eA6aBV6hK6dSvIyGRIZUMIm-gvqhWLl4heCKOQL4wVPJyUFM0qca7vgQgALBXliCH9xdTsBKdggR2SQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c52nMcqchSyBsER-ggJfDkYJHqPRfqJSvmbdX9K3XRWucwx0UKUUKmS1RLyPM6ax7owKxkXyFIVCD0r0S34uqxqklW4u-jS1_VVCqvHFB1iIuasVUX_Vny3cd8t-0CLVx-E6EGWvUxKYZ10AYp8lm7hLtG4kiwR5FqMvOlbQSrV1GshTobKtNXVgrY2ji73f8GijM0CRCx1hRZYkrcKkiG-mKb9J3eA6aBV6hK6dSvIyGRIZUMIm-gvqhWLl4heCKOQL4wVPJyUFM0qca7vgQgALBXliCH9xdTsBKdggR2SQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116939807906271332387\">Ma La Sichuan</a>"
        ]
      },
      {
        "reference": "AciIO2dpU0X5eJ1t5wZ7vsHDdPoiBO_CbjVHeh_wHGqP27SOaTRiPjHeenV9iJ3hiH8lWPQWK_QriuATj0BpeiC8m-vj2BO6zDZsCG9vLLhVLZ-KaUMzPUWyBCmNZ3jR4g7knjlh9AMv75erYaxq41K6WyxyENwFKx4jlLFQWronB6_Xr-IyEnVxS837DqLdruHuulkuoU_dDFyyMsciRVJSeLlzcidLQY-BeASt3vMKwCtoJXkiTBM2vF308H4JJVHkQen_9z_l_p3ceyVs6C_KHi1gtYBXkiiDWDyd2dQLJdHaDpg1FoCOn-93OcZFYYQLq0hQ0r8Svs24NYIQUiQV2MmAv_o9JUjqURhrWNfiM6VmJr9zLQBeIzahCCLkAc9gS2UBr7JYQtnEzBlBLyPXw9-CHefFqKh-7yqzpaJ-1qysqWGCNfd1sS5UhE8gpw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dpU0X5eJ1t5wZ7vsHDdPoiBO_CbjVHeh_wHGqP27SOaTRiPjHeenV9iJ3hiH8lWPQWK_QriuATj0BpeiC8m-vj2BO6zDZsCG9vLLhVLZ-KaUMzPUWyBCmNZ3jR4g7knjlh800AMv75erYaxq41K6WyxyENwFKx4jlLFQWronB6_Xr-IyEnVxS837DqLdruHuulkuoU_dDFyyMsciRVJSeLlzcidLQY-BeASt3vMKwCtoJXkiTBM2vF308H4JJVHkQen_9z_l_p3ceyVs6C_KHi1gtYBXkiiDWDyd2dQLJdHaDpg1FoCOn-93OcZFYYQLq0hQ0r8Svs24NYIQUiQV2MmAv_o9JUjqURhrWNfiM6VmJr9zLQBeIzahCCLkAc9gS2UBr7JYQtnEzBlBLyPXw1200-CHefFqKh-7yqzpaJ-1qysqWGCNfd1sS5UhE8gpw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105480910633399588628\">joseph hinlayagan</a>"
        ]
      },
      {
        "reference": "AciIO2cj2jBXBcBwZB0m3eI0Tswjc0tCagJpJxs1rfHbvu-BYfURPWMmiDkSAgoMt-RN5xdMbrrBVXJ7UmbLahY5IOHjT66dQvxfD-vBELQRt3KP2uRUPapi7BlS_Mg4MOVPTXVqrmi0rIbU1PLeRlO_dZp2ofmLFLoWv8LQjlwRZ0BK70BqrhEUq7_gQU7TwAxEvB3rtS9LQhN09AQ8Xzt_TgjiV_L2FBUMFKOHz7N5qeaCL-s5Kmo0VfyWPWa4alnc0kI-EAMIoq7adYdURw5EX2jrfiyUqwBMJAcBg5NvT0SsUw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cj2jBXBcBwZB0m3eI0Tswjc0tCagJpJxs1rfHbvu-BYfURPWMmiDkSAgoMt-RN5xdMbrrBVXJ7UmbLahY5IOHjT66dQvxfD-vBELQRt3KP2uRUPapi7BlS_Mg4MOVPTXVqrmi0rIbU1PLeRlO_dZp2ofmLFLoWv8LQjlwRZ0BK70BqrhEUq7_gQU7TwAxEvB3rtS9LQhN09AQ8Xzt_TgjiV_L2FBUMFKOHz7N5qeaCL-s5Kmo0VfyWPWa4alnc0kI-EAMIoq7adYdURw1200EX2jrfiyUqwBMJAcBg5NvT0SsUw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116939807906271332387\">Ma La Sichuan</a>"
        ]
      },
      {
        "reference": "AciIO2dq5GElb3dqB6XfM6FQzZ3VWyE94srmXtI-yvLnD_V3rCymRGQxXUsPp57c4_E9P0FOGHSGAzvT04YYyfAV2JH_E6rFMs3DrJr0kLqTlPJMi4SqKRz_qnO8ZJbJ9z4LIAifdtVHJAf7n-bBYi7Son3Ffb2ExRf0yOSMSBE_iaWAFtTY59j7Rh1iq8UfgNQpSAqHUF0jxwqFfQq0ppt_pmhGaXt_tTnXKyfL2xsvKwV8qC5hewpjvGM5otjs121ZJsIeCUhCoBfiM-Tj3anj6TyDO9ZsjnT1SVYwPAYH6QJAYKWQVv06p5_tmSZKYup_W7qDQgBsK_1HMSomuQl0Bw2rCx-xzXC5BLLSYay0m-AMnNEfXuvuNCoo-W96T4aKED0_VQ5KPAZJo42zs1UwcSc8_FFaIwy9Yh77-1xiKD1yTWB1xOqst9R1McqdSA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dq5GElb3dqB6XfM6FQzZ3VWyE94srmXtI-yvLnD_V3rCymRGQxXUsPp57c4_E9P0FOGHSGAzvT04YYyfAV2JH_E6rFMs3DrJr0kLqTlPJMi4SqKRz_qnO8ZJbJ9z4LIAifdtVHJAf7n-bBYi7Son3Ffb2ExRf0yOSMSBE_iaWAFtTY59j7Rh800iq8UfgNQpSAqHUF0jxwqFfQq0ppt_pmhGaXt_tTnXKyfL2xsvKwV8qC5hewpjvGM5otjs121ZJsIeCUhCoBfiM-Tj3anj6TyDO9ZsjnT1SVYwPAYH6QJAYKWQVv06p5_tmSZKYup_W7qDQgBsK_1HMSomuQl0Bw1200rCx-xzXC5BLLSYay0m-AMnNEfXuvuNCoo-W96T4aKED0_VQ5KPAZJo42zs1UwcSc8_FFaIwy9Yh77-1xiKD1yTWB1xOqst9R1McqdSA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105908900810112131859\">Mehdi S</a>"
        ]
      },
      {
        "reference": "AciIO2cyrtC2IvWfubdeKd0pJES2aUCDCd2755FdXdLVAu8c-pPR-QrNCzt5NRbiGHrFIlow2oA-NaTD-GsXJxm5MhW4WHRqHtaVJ3n27bKKjjh0dVc3li8yorfGA5AT77ha2XwKLDvC1-SWiSSow2o6qeYV6CxyvZynvZojY1zm8gTIaq7cBrQNTSHRXzLM0jwYAbCOzBJMZpzW5Udbmv7mJ00NWfCj-Cyclz52emktkUBpY5PPMP_8jjv9KjhFL8_G-axz05qcG87G4TyAG3_iUj5OkOAWexF_sT7Alv0cuGPYAG1_3ErV2ghgLKOyazQW2lyx_vskVfOZkhS-sIA1wKhxKOMhmYGZRZm2s0POTxS5MVYf7Hy3Q2hffrAV35I_B_wWVzx9xXZHAw52jbxVxNPnUXcEHNMR4_TG5Tr3pssTB3LL9OFA4Sn6QVWk60qk",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cyrtC2IvWfubdeKd0pJES2aUCDCd2755FdXdLVAu8c-pPR-QrNCzt5NRbiGHrFIlow1200oA-NaTD-GsXJxm5MhW4WHRqHtaVJ3n27bKKjjh800dVc3li8yorfGA5AT77ha2XwKLDvC1-SWiSSow2o6qeYV6CxyvZynvZojY1zm8gTIaq7cBrQNTSHRXzLM0jwYAbCOzBJMZpzW5Udbmv7mJ00NWfCj-Cyclz52emktkUBpY5PPMP_8jjv9KjhFL8_G-axz05qcG87G4TyAG3_iUj5OkOAWexF_sT7Alv0cuGPYAG1_3ErV2ghgLKOyazQW2lyx_vskVfOZkhS-sIA1wKhxKOMhmYGZRZm2s0POTxS5MVYf7Hy3Q2hffrAV35I_B_wWVzx9xXZHAw52jbxVxNPnUXcEHNMR4_TG5Tr3pssTB3LL9OFA4Sn6QVWk60qk&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111211325870949136508\">Veronika Ortega</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "joseph hinlayagan",
        "rating": 5,
        "text": "What a lovely vibrant atmosphere, authentic Chinese food and really good portions of food! I did not expect to find a place like this at all behind the huzz and buzz of Big Ben and Westminster areas!  We were sight seeing with our friends from Canada and Belgium and we stumbled upon this restaurant, with 8 of us walk in and no reservations on a lunchtime and was quite busy but we’re still accomodated despite  the circumstances that we had. The location was only a few meters away from Westminster abbey which someone would thought this place did not exist . The food was served quick and fast and simply irresistible flavours . The service was simply handled by Judy , genuinely attentive, respectful and friendly. Food prices I thought was expensive which I thought it’s London price but I was proven wrong as the portions were actually for 2-3 people eating and I was gobsmocked to see the quality and quantity of it! It was indeed a very good value of our money !  Definitely will be back here if we are in London and it was truly an amazing experience! Highly recommended.",
        "time": 1759690060,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Edward Lambden",
        "rating": 5,
        "text": "The restaurant is lively and always decently full which is a great sign. The service is efficient and friendly, and the waiters are all very attentive with regards to drinks. I will say that the food is rather good, the fried noodles, squid, and soft shell crab all recommended. Will be back soon!",
        "time": 1755209699,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Veronika Ortega",
        "rating": 5,
        "text": "Loved this asian restaurant, we ate all sorts of plates (all to share, group of 7) and they were all quite yummy. We walked in without a reservation and they treated us very politely, sat us down immediately. The food was great, our favorite was the fried rice and the sweet and sour chicken.",
        "time": 1753652389,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Layla Stewart",
        "rating": 5,
        "text": "Definitely will be returning soon!\n\nExcellent service!! as somebody who has worked in the hospitality industry almost my whole working career, I can tell they take pride in their customer service and attentiveness at this restaurant.\n\nFood was delicious as well! My friend and I got the sim sung platter, prawn Singapore noodles, a bottle of wine, and duck spring rolls. We both agreed we’d definitely coming back soon, we loved everything.\n\nAnd again, I don’t think I’ve ever had such attentive staff! They didn’t let us lift a finger… Even on such a busy evening, they were completely full!\n\nThank you for a lovely evening🫶🏽",
        "time": 1753994726,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Fanny Cheng",
        "rating": 4,
        "text": "Really nice food. We love that we can adjust spicy level according to ability. Really friendly staff. The fish tasted fresh and sooo soft and fluffy. The chicken was very nice too.",
        "time": 1755373835,
        "relative_time_description": "2 months ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "meal_takeaway",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-16T20:23:45.802Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:45.802Z",
    "updatedAt": "2025-10-16T20:24:29.715Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Ma La Sichuan — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_ma-la-sichuan_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.434Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Ma La Sichuan",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pelham House, 37 Monck St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 1629
      },
      "url": "https://thebestinlondon.co.uk/restaurant/ma-la-sichuan-oHK7UfPw",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 2:30 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 4:00 – 10:00 PM"
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
    "image_card_path": "/images/restaurants/ma-la-sichuan-oHK7UfPw/japanese-ma-la-sichuan-oHK7UfPw-card-2971a409.webp",
    "image_hero_path": "/images/restaurants/ma-la-sichuan-oHK7UfPw/japanese-ma-la-sichuan-oHK7UfPw-hero-55000082.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJZdN_kTgFdkgR0NR3z813cBw",
    "slug": "zuma-london-3z813cBw",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJZdN_kTgFdkgR0NR3z813cBw",
    "name": "Zuma London",
    "description": "Where traditional European techniques meet contemporary innovation. This Central London spot serves up modern european cuisine that's sophisticated, creative, and absolutely memorable. With ratings this high, it's no ...",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant",
      "fine-dining"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 2748,
    "price_level": 4,
    "price_range": "££££",
    "address": {
      "formatted": "5 Raphael St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "5 Raphael St, London",
    "postcode": "SW7 1DL",
    "borough": "Central London",
    "lat": 51.5009309,
    "lng": -0.163136,
    "phone": "020 7584 1010",
    "phone_international": "+44 20 7584 1010",
    "website": "https://www.zumarestaurant.com/en/london?utm_source=InfoButtonClick&utm_medium=Home&utm_campaign=GoogleBusinessProfile",
    "url": "https://maps.google.com/?cid=2049269556286313680",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Thursday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Friday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Saturday: 12:00 – 3:30 PM, 6:00 – 11:00 PM",
        "Sunday: 12:00 – 3:30 PM, 6:00 – 10:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1530"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "2230"
          },
          "open": {
            "day": 0,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1500"
          },
          "open": {
            "day": 1,
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
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1500"
          },
          "open": {
            "day": 2,
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
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1500"
          },
          "open": {
            "day": 3,
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
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1500"
          },
          "open": {
            "day": 4,
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
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1500"
          },
          "open": {
            "day": 5,
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
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1530"
          },
          "open": {
            "day": 6,
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
            "time": "1800"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2eSfnr2qRBBjqwdkQqD3KQbpdjngO6XvK6x2s-8bUFsXIgaFdS9A2xvdIlhxbAZ3QGdWo402HqL2NzmboHctNyryjzCyitJFoKGH1CKNknocDDtwpXogYcdlvEqlmwnhRuEkza5AHHEf3eceX3Za0LNckiMjmRb0yavlL-qTy0GOU7WeFUCOhzBrR3GM_RRMsmXkBds1u7yqNLmxb8Tji6ythctiWo5xROvyReNYfdA7aL4iKnDiC4KgyItv6LHCr7qAWPu3Kxt1U1a_V1SMAVWBVBL148lg61p3Od9WhysS_jMyVFxkb3C5pCUZWrP5wowEzHs_Kon7PZui3e_xJG7AcNt_Z1HSFIKfr7CB8_qL6WYs6fnOWIBk796XwiSVT-wblHpCjy_UHBZ0R3Nyn2GHjJEn0ZVjyFvFB4CcddAR_Op",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eSfnr2qRBBjqwdkQqD3KQbpdjngO6XvK6x2s-8bUFsXIgaFdS9A2xvdIlhxbAZ3QGdWo402HqL2NzmboHctNyryjzCyitJFoKGH1CKNknocDDtwpXogYcdlvEqlmwnhRuEkza5AHHEf3eceX3Za0LNckiMjmRb0yavlL-qTy0GOU7WeFUCOhzBrR3GM_RRMsmXkBds1u7yqNLmxb8Tji6ythctiWo5xROvyReNYfdA7aL4iKnDiC4KgyItv6LHCr7qAWPu3Kxt1U1a_V1SMAVWBVBL148lg61p3Od9WhysS_jMyVFxkb3C5pCUZWrP5wowEzHs_Kon7PZui3e_xJG7AcNt_Z1HSFIKfr7CB8_qL6WYs6fnOWIBk796XwiSVT-wblHpCjy_UHBZ0R3Nyn2GHjJEn0ZVjyFvFB4CcddAR_Op&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114170030688589989241\">Bautista Martínez</a>"
        ]
      },
      {
        "reference": "AciIO2dtca-Ja3kPwpTbZQFwyZe_XcKIKPYMRNbO3NvLGwCF0WSn1OnTxHmeFJfR5fyXm5XnLB4EG-fcJvZdXuHvI9Z7M1xkXWllwCd4Vo-r-jCBbTLXt1UbYoK1AXxF6rRnF2NfxV_ytsEx5DG8ktoIKs-7yFOQtUHUQgFkXxH31HzJktZXNd-URwKqnavMzdnHNZarKETle2AsGL0-_vog_7JXgZWqhNfUzcujW-S675rC3YswwgUSZcYplfLcFdKMSQ5lFg3SfgazoFadv8RER45ZnU89KsJkNKv7VOgMsze7KQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dtca-Ja3kPwpTbZQFwyZe_XcKIKPYMRNbO3NvLGwCF0WSn1OnTxHmeFJfR5fyXm5XnLB4EG-fcJvZdXuHvI9Z7M1xkXWllwCd4Vo-r-jCBbTLXt1UbYoK1AXxF6rRnF2NfxV_ytsEx5DG8ktoIKs-7yFOQtUHUQgFkXxH31HzJktZXNd-URwKqnavMzdnHNZarKETle2AsGL0-_vog_7JXgZWqhNfUzcujW-S675rC3YswwgUSZcYplfLcFdKMSQ5lFg3SfgazoFadv8RER45ZnU89KsJkNKv7VOgMsze7KQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112457996682212355719\">Zuma London</a>"
        ]
      },
      {
        "reference": "AciIO2eyh_ehs4UW2D8Kbzww3m4qt8aA_jOsLNY8HU4irX4GvPG0m9B2rk_KTOKMKNvNKo0Pj_FO0MR0mCqJbPwpk7cM8uw9uL-dq5wVSGMLLTJenUfUMr2ATL_fOX-mBSlcCgDsyOLsyAQl8agg4To2M4kqgOSOiE2aXlXiDFx4PeRQD09xLdPIoOg-wL--0w7IJ5e99rLhrHrG10rHHBrZeNWJIsIMEK64AWHNdHXAdpaksX7BeEZRMHAn3vgHN0eMx9wiNjH-4lRS72w9sfoX_wWi5D7ut0SpxdubqE08bjOtCtUZ8JASnnMv47xmK8eOdCpI-bJ2yJlES1jIhwzZ721cdyLobmtArM91S2IY3MXYwvT3Yj9TBbtLQNGEMY6hmHwHV3XYTM4b2WVZT3nW2ZbQQjTYFjaXU3UXphXQ9yQkudzb971J4Be9-msEIpgU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eyh_ehs4UW2D8Kbzww1200m4qt8aA_jOsLNY8HU4irX4GvPG0m9B2rk_KTOKMKNvNKo0Pj_FO0MR0mCqJbPwpk7cM8uw9uL-dq5wVSGMLLTJenUfUMr2ATL_fOX-mBSlcCgDsyOLsyAQl8agg4To2M4kqgOSOiE2aXlXiDFx4PeRQD09xLdPIoOg-wL--0w7IJ5e99rLhrHrG10rHHBrZeNWJIsIMEK64AWHNdHXAdpaksX7BeEZRMHAn3vgHN0eMx9wiNjH-4lRS72w9sfoX_wWi5D7ut0SpxdubqE08bjOtCtUZ8JASnnMv47xmK8eOdCpI-bJ2yJlES1jIhwzZ721cdyLobmtArM91S2IY3MXYwvT3Yj9TBbtLQNGEMY6hmHwHV3XYTM4b2WVZT3nW2ZbQQjTYFjaXU3UXphXQ9yQkudzb971J4Be9-msEIpgU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117103048311685724628\">Vy Le</a>"
        ]
      },
      {
        "reference": "AciIO2c16V5-JjXRBrrztZcDFxAKxbWT9zY-54_mJIZFft3Ar4F0J2ksSmdPu35qp0Kouq9VXn_FQku58d3YcUcLAvKv1nVVJ3SDRZo83R7uKemij2qll9meFTtNQB6CSiAty041S8828RO2hejP-sTp7moLhK8haTSPZ6ugRMlcJMGNLPqYS30yYGpB-cf0jE9s5iPL83prhjTajtTel9x9YZ1Qw1L03YGse2e7WK-yQFLKVo4Xn82Q--Efg92Y92sRtamyeamTlbiDZWvGcPnwx9vTJYgKudv1PZvcoS6rpt8Yy_5KM9I8tLe7jnVJ09s6mzolCUqfAligUiNN0VipBNsCFcoNeNuiguFokgpAn96GkaJI6M1iavjR5gBbCHDzU8mv-coZt7xKYbyOG5kGc3NiCN05XcqL9mepEiGQHLTo1k6KwyJoQgS2QU5NZ9hv",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c16V5-JjXRBrrztZcDFxAKxbWT9zY-54_mJIZFft3Ar4F0J2ksSmdPu35qp0Kouq9VXn_FQku58d3YcUcLAvKv1nVVJ3SDRZo83R7uKemij2qll9meFTtNQB6CSiAty041S8828RO2hejP-sTp7moLhK8haTSPZ6ugRMlcJMGNLPqYS30yYGpB-cf0jE9s5iPL83prhjTajtTel9x9YZ1Qw1200L03YGse2e7WK-yQFLKVo4Xn82Q--Efg92Y92sRtamyeamTlbiDZWvGcPnwx9vTJYgKudv1PZvcoS6rpt8Yy_5KM9I8tLe7jnVJ09s6mzolCUqfAligUiNN0VipBNsCFcoNeNuiguFokgpAn96GkaJI6M1iavjR5gBbCHDzU8mv-coZt7xKYbyOG5kGc3NiCN05XcqL9mepEiGQHLTo1k6KwyJoQgS2QU5NZ9hv&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102280379204680886493\">Nicolas Guajardo Sepulveda</a>"
        ]
      },
      {
        "reference": "AciIO2dN973gaoU4enSPxdxU0fbuu5yo1mU9XnpQPgpiw4ceoRxPttguJZm0nB6KPmweDKX_UkGqNMdsK-ztFaRBmeIyRWVBVfPiukeoHFhzHy15BkYWjsPIyLTt7ySn5yQK_YbNhtipuMSQFnx7AhRWTeQBoTqnfHsgYw8ZLvPNQEu_XOBZC3dvwPf2cXIxqPKlRzTDd4ysrXstjj2RDi7ybdTaS6BX8zrkn1Xco7bWpkUKCyeSyy1ZuDX_p6SnqHrX_xo216vl6nrNpzzLlgKKZMH2xeu25FJCDL3Dkk5zk6FPhN_c9Pt6MyrAJgjezy1Yl3PHJJDgaVMvJMZvM2zVq5Q8dhE1m0vG2ycNvENEEnxjF_5vgI94pJuYOTj_Qpb0vgWeRt8KU1hU7d7zUziQYYgZzjxL1s55SVM6qNwJFSpcbTWE",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dN973gaoU4enSPxdxU0fbuu5yo1mU9XnpQPgpiw1200ceoRxPttguJZm0nB6KPmweDKX_UkGqNMdsK-ztFaRBmeIyRWVBVfPiukeoHFhzHy15BkYWjsPIyLTt7ySn5yQK_YbNhtipuMSQFnx7AhRWTeQBoTqnfHsgYw8ZLvPNQEu_XOBZC3dvwPf2cXIxqPKlRzTDd4ysrXstjj2RDi7ybdTaS6BX8zrkn1Xco7bWpkUKCyeSyy1ZuDX_p6SnqHrX_xo216vl6nrNpzzLlgKKZMH2xeu25FJCDL3Dkk5zk6FPhN_c9Pt6MyrAJgjezy1Yl3PHJJDgaVMvJMZvM2zVq5Q8dhE1m0vG2ycNvENEEnxjF_5vgI94pJuYOTj_Qpb0vgWeRt8KU1hU7d7zUziQYYgZzjxL1s55SVM6qNwJFSpcbTWE&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112974214953779185687\">Taste Observer</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Mrs. M.",
        "rating": 5,
        "text": "I have such wonderful memories of this restaurant. Even though I didn’t have a reservation, they seated me at the chef’s table, which turned out to be a really fun and fascinating experience. I was dining alone, but the food portions were so generous that I left absolutely full and happy.\n\nThe first dish was sliced yellowtail sea bass — beautifully fresh, with a delicate pink color. A solid 10/10.\n\nNext came the fried soft-shell crab with wasabi mayonnaise. The flavor was so unique and delicious that I’d definitely come back just for this. Another 10/10.\n\nThe jumbo tiger prawn followed — juicy, perfectly cooked, and simply amazing. 10/10 again.\n\nFor dessert, I had ice cream with pecan pie and sliced banana — the perfect sweet ending. 10/10.\n\nOverall, I’ll absolutely be returning here on my next trip to London, and I’ll be recommending this place to all my friends.\n\nService was very good (8/10). The waiter brought out the crab but forgot the cutlery — apart from that, everything was excellent.",
        "time": 1758223064,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Malikha Mcdonald",
        "rating": 5,
        "text": "This has to be one of my favourite restaurants. From when you enter the restaurant you are made to feel special and welcomed. Our food was delicious and drinks…. Wow. Our waiter was very attentive, helpful and polite.\n\nThere is a great chilled vibe and you don’t feel rushed or as if you’re being hounded.\n\nDid I mention the food is amazing.\n\nYou have to try the soft shell crab!!!! 10/10",
        "time": 1759690691,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Nicolas Guajardo Sepulveda",
        "rating": 5,
        "text": "Despite we came early for dinner and had no reservation, the staff gratefully offered\na table and accommodated us. (However make a reservation because there was a large queue by the time we left)\nAll the drinks we ordered were quite impeccable, really balanced flavors and  mixing top notch ingredients.\nZuma is renowned for its excellent modern Japanese cuisine and did not disappoint at all. Well umami on the dishes, fresh seafood and detailed cooking (also plenty of vegetarian options)",
        "time": 1751917802,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Dominic Seale",
        "rating": 4,
        "text": "Service initially was horrible.\n\nRe-ordering new drinks was a hassle, Sushi came without soy sauce and when I requested it I waited 15 minutes before losing patience and getting up to ask for it.\n\nMy waiter was definitely not on top of things- perhaps a bit green or overwhelmed as it was a busy night.\n\nI was close to giving the restaurant a very low star rating but Natalia ended up saving the day and was truly superb and I don’t think it was her section- she deserves applause for her efforts checking numerous times with me after and being quite humble when I aired my anger.\n\nThen Nikola (a manager) also checked on us throughout the night numerous times and was really great. He was gracious , kind and understanding and is truly a gem as well.",
        "time": 1751233239,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Amelia",
        "rating": 5,
        "text": "Had such a great experience at Zuma London! I went for the tasting menu and everything was really good, full of flavor. The cocktail I tried was also amazing.",
        "time": 1758745387,
        "relative_time_description": "2 weeks ago"
      }
    ],
    "types": [
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
    "lastVerifiedGoogle": "2025-10-15T10:53:25.098Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:25.098Z",
    "updatedAt": "2025-10-16T20:24:19.050Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Zuma London — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_zuma-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.431Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Zuma London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£4",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "5 Raphael St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 2748
      },
      "url": "https://thebestinlondon.co.uk/restaurant/zuma-london-3z813cBw",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Thursday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Friday: 12:00 – 3:00 PM, 6:00 – 11:00 PM",
        "Saturday: 12:00 – 3:30 PM, 6:00 – 11:00 PM",
        "Sunday: 12:00 – 3:30 PM, 6:00 – 10:30 PM"
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
    "image_card_path": "/images/restaurants/zuma-london-3z813cBw/japanese-zuma-london-3z813cBw-card-cfa9855a.webp",
    "image_hero_path": "/images/restaurants/zuma-london-3z813cBw/japanese-zuma-london-3z813cBw-hero-a2b00300.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJZzYAdkkFdkgRrt9bmTrCQPc",
    "slug": "house-of-ming-bmTrCQPc",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJZzYAdkkFdkgRrt9bmTrCQPc",
    "name": "House of Ming",
    "description": "Where contemporary London meets European flair - think Michelin-starred techniques with a side of British charm. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 255,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "54 Buckingham Gate, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "54 Buckingham Gate, London",
    "postcode": "SW1E 6AF",
    "borough": "Central London",
    "lat": 51.4985583,
    "lng": -0.1371067,
    "phone": "020 7963 8330",
    "phone_international": "+44 20 7963 8330",
    "website": "http://www.houseofming.co.uk/?utm_source=google&utm_medium=organic&utm_campaign=Knowledge_Graph",
    "url": "https://maps.google.com/?cid=17816453682814508974",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Tuesday: Closed",
        "Wednesday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Thursday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Friday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Saturday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Sunday: 12:00 – 2:45 PM, 6:30 – 10:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1445"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "2230"
          },
          "open": {
            "day": 0,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1445"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2230"
          },
          "open": {
            "day": 1,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1445"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1445"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1445"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2230"
          },
          "open": {
            "day": 5,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1445"
          },
          "open": {
            "day": 6,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2230"
          },
          "open": {
            "day": 6,
            "time": "1830"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2c9Ecm_-5WC4aD-Bb_ku0pFqfHZqeS9KtCSiW2Jf-eEwWF7_33AJHVprO_HOYUB72kE5Y6ZBKMHAGZ1DWQzm9OoOmwJODTE0sUhL8V1z7K6KI0Iyz42gm0KXj_b6YkC0dZeL1baUataS-0xOUviIO63qX8ZShLoZBpvZo77TGW3zgkEAjk-4PMDHZMkxVaIXB0m5FB8PlcrFfoPM02hZiC5GfnR41RQ0A1-Gh1ImEnQJwzJZAUIZleaBmp198Eqil-N--01TcheX2zVQLYKn2hxCPI-wfsUssn5l6tCVBpOww",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c9Ecm_-5WC4aD-Bb_ku0pFqfHZqeS9KtCSiW2Jf-eEwWF7_33AJHVprO_HOYUB72kE5Y6ZBKMHAGZ1DWQzm9OoOmwJODTE0sUhL8V1z7K6KI0Iyz42gm0KXj_b6YkC0dZeL1baUataS-0xOUviIO63qX8ZShLoZBpvZo77TGW3zgkEAjk-4PMDHZMkxVaIXB0m5FB8PlcrFfoPM02hZiC5GfnR41RQ0A1-Gh800ImEnQJwzJZAUIZleaBmp198Eqil-N--01TcheX2zVQLYKn2hxCPI-wfsUssn5l6tCVBpOww&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110663793560461821664\">House of Ming</a>"
        ]
      },
      {
        "reference": "AciIO2fWyc1rIEkdsyRmjPH68-0H0d1o_hms5w1KiiAS-yAhTaxBjaht2i4XQ5_TWDhrytyLwaZYjVW-coxDT_apqLbtdGp_ylqMHaAnrxG8yUuRNluTg__gpYhgCg4SZ_YMKvnX7gKUSmJsEf15faIm3gUfFJx2GWiUBWi-0nerTVDTNXDZPEVQLgVgQkA2xik2-qbuKXi3rKFTsFTob5GBW-KLwXf5I_oVt7rkZ5ZEe50J_29j2crJXg3zEH9YdLT6wEFAQk92i18y3h5QaqD-lSae0z_9n_BCFuRcP2tlr6iKvA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fWyc1rIEkdsyRmjPH68-0H0d1o_hms5w1200KiiAS-yAhTaxBjaht2i4XQ5_TWDhrytyLwaZYjVW-coxDT_apqLbtdGp_ylqMHaAnrxG8yUuRNluTg__gpYhgCg4SZ_YMKvnX7gKUSmJsEf15faIm3gUfFJx2GWiUBWi-0nerTVDTNXDZPEVQLgVgQkA2xik2-qbuKXi3rKFTsFTob5GBW-KLwXf5I_oVt7rkZ5ZEe50J_29j2crJXg3zEH9YdLT6wEFAQk92i18y3h800QaqD-lSae0z_9n_BCFuRcP2tlr6iKvA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110663793560461821664\">House of Ming</a>"
        ]
      },
      {
        "reference": "AciIO2d0xi2BDFAI3HUUIpAh9GKGQBz8flvzhKW58Sushil_yAcQ1A-hYo5xQCV9-WIzwRPjj3Hbz15-Y_mZH9ReqkO43HzHXiGpM32JSe6rQMAUKQLop0hU4nXIlfKQXzSiJIaiMH4QABviJP6wkPtXi8Ng9_XdNyoKr-Xu0kL6eb7gFXdvSm24BOMcRJIcgFwsSBc0kWIPvItemgKuydkC2E-nbqcrUnFQWIl_Kd_NmsK3oPvf_OGrSllOFj0N55mkQ2uR8v1j9C7ExXteOcnYQcyS6-6E2mWK8vivOR3UuCm7U5ea3l47PrmFh4OQzjUPjMTvFZ9DiOXzGQ9vA9s6vZ4RBNnjmzuj0oAgequ2RRcmbadnCHgjwUhJWLIFsvQ4O9ufYS0fHoptoESt734REr-ShStWmq749Cyz9qXKAY3TIMEIpUgncLKJ9wG9OTkg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d0xi2BDFAI3HUUIpAh800GKGQBz8flvzhKW58Sushil_yAcQ1A-hYo5xQCV9-WIzwRPjj3Hbz15-Y_mZH9ReqkO43HzHXiGpM32JSe6rQMAUKQLop0hU4nXIlfKQXzSiJIaiMH4QABviJP6wkPtXi8Ng9_XdNyoKr-Xu0kL6eb7gFXdvSm24BOMcRJIcgFwsSBc0kWIPvItemgKuydkC2E-nbqcrUnFQWIl_Kd_NmsK3oPvf_OGrSllOFj0N55mkQ2uR8v1j9C7ExXteOcnYQcyS6-6E2mWK8vivOR3UuCm7U5ea3l47PrmFh4OQzjUPjMTvFZ9DiOXzGQ9vA9s6vZ4RBNnjmzuj0oAgequ2RRcmbadnCHgjwUhJWLIFsvQ4O9ufYS0fHoptoESt734REr-ShStWmq749Cyz9qXKAY3TIMEIpUgncLKJ9wG9OTkg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114727102685956795502\">Sana C</a>"
        ]
      },
      {
        "reference": "AciIO2dKJFOpvXNr7kZ7NpMb7-4u_x-t3dIWljSlGO3blaLr6eHlFdE02cHGcI71qwbCVeDMcv76pvFU8VK22ZEOU69Iy8sajHPa_sv3wPwea5SHG36Yzs600C1Y6eWi85I3Psu9RzMteVd0fglwHR5E29uGPLxOpciLRSlOriZshIUwzm58kjhx97Om73i3iHrXf_jyX-rVs0BLS-ymbiuph2ORATphbnOWC6EIswQE9qez21XjLuAM9YPvHkqYDs1KreGhUttGaRTAQO6WmPTixZDud2dIAq3XKyrk9-9AYHpRUahsAglQvMGsNtKSQpW-ZOXWr3Tjl1ZAhuURgzVzchtXmVuzzVUhh5sv5dBy5i4lVn9xfwe8x4WwpvQIRJqb2KoHw2ZOToK6id7mJSCqlxPhlzAwQ-744hGx-33ruoVOuX5EaVnxmvmih9uCyivi",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dKJFOpvXNr7kZ7NpMb7-4u_x-t3dIWljSlGO3blaLr6eHlFdE02cHGcI71qwbCVeDMcv76pvFU8VK22ZEOU69Iy8sajHPa_sv3wPwea5SHG36Yzs600C1Y6eWi85I3Psu9RzMteVd0fglwHR5E29uGPLxOpciLRSlOriZshIUwzm58kjhx97Om73i3iHrXf_jyX-rVs0BLS-ymbiuph800ORATphbnOWC6EIswQE9qez21XjLuAM9YPvHkqYDs1KreGhUttGaRTAQO6WmPTixZDud2dIAq3XKyrk9-9AYHpRUahsAglQvMGsNtKSQpW-ZOXWr3Tjl1ZAhuURgzVzchtXmVuzzVUhh5sv5dBy5i4lVn9xfwe8x4WwpvQIRJqb2KoHw1200ZOToK6id7mJSCqlxPhlzAwQ-744hGx-33ruoVOuX5EaVnxmvmih9uCyivi&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114727102685956795502\">Sana C</a>"
        ]
      },
      {
        "reference": "AciIO2eeqczMrCHXTMPlOd4cRoCXI8XD_kRFR_mhNSK0SpXgHD8zfHemrZ8PGfSZTjS9zPNoOtwEac2L3K5xNOQp1l6PwuNpngjV_Kkf_tX3Tk2exFSyUqxxasHbihVOFbHq82N6YJvn6NUZ31mjS928ziGzY17Y-F6sGLbn6R36MU71BhyEZ9BZ7PlJZFSKAQg2pDVcQZ0DPvan3PYFHACNUMXIV0eJI2ClDkCwJaM5J80BtMMVzthJjBlMulSz5YovjF7Yw0RJfIZ4w6pT5Vb2k9kDlEI9ldYvbZ1kbuteR60m9yKBQFdrCQqofO8PQHdkSjVluAJBmpakbzu8WS5K4ipR0JpLc4Nwn01eh8TEY1EYTQJ0kWw8_aAoOHPi7UOifiG9dO10IPxyMsUUN2GJ_JCeJ3rWTTNtK_LkyDpKb6jPBZsp",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eeqczMrCHXTMPlOd4cRoCXI8XD_kRFR_mhNSK0SpXgHD8zfHemrZ8PGfSZTjS9zPNoOtwEac2L3K5xNOQp1l6PwuNpngjV_Kkf_tX3Tk2exFSyUqxxasHbihVOFbHq82N6YJvn6NUZ31mjS928ziGzY17Y-F6sGLbn6R36MU71BhyEZ9BZ7PlJZFSKAQg2pDVcQZ0DPvan3PYFHACNUMXIV0eJI2ClDkCwJaM5J80BtMMVzthJjBlMulSz5YovjF7Yw1200RJfIZ4w6pT5Vb2k9kDlEI9ldYvbZ1kbuteR60m9yKBQFdrCQqofO8PQHdkSjVluAJBmpakbzu8WS5K4ipR0JpLc4Nwn01eh800TEY1EYTQJ0kWw8_aAoOHPi7UOifiG9dO10IPxyMsUUN2GJ_JCeJ3rWTTNtK_LkyDpKb6jPBZsp&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111366244948154182233\">Swati Patel</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Just YF",
        "rating": 1,
        "text": "Serving 2 difference halve and refried pecking duck, it was dry and no favouring even the duck skin isn’t crispy. The waiter said they make their own pecking duck pancake, we received factory made pancake .\n\nI can taste the Honey roast pork char siu was frozen and reheat by microwave, It was dry and chewy.\n\n£75 for a Lobster tails laid in giant lobster shell with the almost 70% butter I could not taste any lobster meat at all.\n\nFor Dim sum we have scallop and prawn har gao, it might be handmade but it usually comes with big pieces of scallop i guess I got a newborn. Har gao should be at least few pieces, we got some in finely chop.\n\nIt was a treat from my friend so I have to be polite and not to complaint . For the same price we paying in central london you can get much better quality and services.\n\nFried rice with xo sauce was nice not greasy but xo sauce should have dry scallop and spiciness.\n\nNoodles with mushroom is slightly salty but it is the most decent food of that meal.\n\nThe waiters aren’t seem to know what are they serving and the ingredients. Foods aren’t serve as what we being told.\n\nI was with a group of friends for a special event so I have to be polite and nice on that day.",
        "time": 1760039464,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Bhavini Shah",
        "rating": 5,
        "text": "My husband and I were staying at the Taj and as it was or 45th wedding anniversary thought we would have a nice meal. We chose House of Ming as we had heard good things about it, on arrival we were greeted warmly and showed to a lovely booth with curtains. Staff were attentive and the food was really nice, especially as we were vegetarian for that period, it was Navratri and we don't go vegetarian for the nine days. My husband (who isn't vegetarian normally) was also very impressed and as he's also a very good chef it's a huge relief when he finds the food excellent. We were given complimentary cocktails and a beautiful dessert in honour of our anniversary. Thank you to B. Prasad and everyone who works for House of Ming for making our evening extra special.",
        "time": 1760014208,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "R A",
        "rating": 5,
        "text": "The service was lovely, the manager and all staff members were really kind. Celebrated a birthday and they bought out a mini cake and sang which was incredibly sweet. The staff went above and beyond to ensure we were taken care of and the food was delicious. Would recommend others try.",
        "time": 1756596387,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Puja Raikundalia",
        "rating": 5,
        "text": "We had a wonderful evening at The House of Ming! The food was absolutely delicious, and the customer service was truly exceptional—definitely a 10/10 experience!\n\nA special thank you to Shah, who made our dinner even more memorable. You looked after us throughout the entire evening, and your attentive, professional, and warm service really stood out. Your hospitality was truly commendable!\n\nWe’ll definitely be coming back soon!",
        "time": 1759525887,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Joydeep Pal",
        "rating": 5,
        "text": "House of Ming at the Taj St James Court London delivered an absolutely exceptional lunch experience!\nFrom the moment we stepped in, the ambiance was perfectly serene and elegant, creating a truly special atmosphere.\nWe started with the Golden Fried Prawn, which was crispy and bursting with flavour, followed by the perfectly seasoned Chicken Salt and Pepper, and the delicate Prawn Har Gao Dimsum. Each appetizer was a testament to the kitchen's mastery of Chinese cuisine.\nFor our mains, the Hakka Noodles were cooked to perfection, the Chilli Oyster Fish was rich and satisfying, and the Veg Fried Rice was a delightful accompaniment. The delectable flavours of each dish were truly memorable.\nA special mention must go to Dexter, whose warm welcome and attentive service made our lunch even more enjoyable. His care and professionalism ensured we had a truly wonderful time. We can't wait to return to House of Ming for another incredible meal!",
        "time": 1743347457,
        "relative_time_description": "6 months ago"
      }
    ],
    "types": [
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
    "lastVerifiedGoogle": "2025-10-15T10:53:34.457Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:34.457Z",
    "updatedAt": "2025-10-16T20:24:27.636Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "House of Ming — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_house-of-ming_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.433Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "House of Ming",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "54 Buckingham Gate, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 255
      },
      "url": "https://thebestinlondon.co.uk/restaurant/house-of-ming-bmTrCQPc",
      "openingHours": [
        "Monday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Tuesday: Closed",
        "Wednesday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Thursday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Friday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Saturday: 12:00 – 2:45 PM, 6:30 – 10:30 PM",
        "Sunday: 12:00 – 2:45 PM, 6:30 – 10:30 PM"
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
    "image_card_path": "/images/restaurants/house-of-ming-bmTrCQPc/japanese-house-of-ming-bmTrCQPc-card-a394d65f.webp",
    "image_hero_path": "/images/restaurants/house-of-ming-bmTrCQPc/japanese-house-of-ming-bmTrCQPc-hero-dbcb7be7.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJT9FOxa4cdkgRc54939Y8L8U",
    "slug": "the-sichuan-restaurant-939Y8L8U",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJT9FOxa4cdkgRc54939Y8L8U",
    "name": "The Sichuan Restaurant",
    "description": "Standard destination offering Chinese set lunches and a la carte dining.",
    "cuisines": [
      "japanese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 1399,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "14 City Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "14 City Rd, London",
    "postcode": "EC1Y 2AA",
    "borough": "Central London",
    "lat": 51.52215899999999,
    "lng": -0.0872685,
    "phone": "020 7588 5489",
    "phone_international": "+44 20 7588 5489",
    "website": "http://www.thesichuan.co.uk/",
    "url": "https://maps.google.com/?cid=14208642242943229555",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 11:00 PM"
      ],
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
      ]
    },
    "photos": [
      {
        "reference": "AciIO2e66fQRbZ_zUK-a72TPXqREBjDZAAUgxSzM66zP5LOSSIpBsk2R6Q9ULkHFrCZZq7OOanQUi8O2tLth0oxj3I9LEDAWntT3XsN95lXJBIV6U3s9lD_NQ_e-6nvjujqVZaUiabo4gZikW_xCPYVUx7eKPVln1cTYTmkyrmu5oRCJxpuWmKej8ilcN7hDzatqBwuF27nBPoDRUgzkdf4uxNeR5C7TaCZRJqWEXDCLDhwCTJTnVGeDglr9VzQ5Ng6E3R-tGnOeTh5rRr028uoBVSh7GDWJ8UvKCiNnjPVzN54Xhw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e66fQRbZ_zUK-a72TPXqREBjDZAAUgxSzM66zP5LOSSIpBsk2R6Q9ULkHFrCZZq7OOanQUi8O2tLth800oxj3I9LEDAWntT3XsN95lXJBIV6U3s9lD_NQ_e-6nvjujqVZaUiabo4gZikW_xCPYVUx7eKPVln1cTYTmkyrmu5oRCJxpuWmKej8ilcN7hDzatqBwuF27nBPoDRUgzkdf4uxNeR5C7TaCZRJqWEXDCLDhwCTJTnVGeDglr9VzQ5Ng6E3R-tGnOeTh5rRr028uoBVSh7GDWJ8UvKCiNnjPVzN54Xhw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105384616026314160909\">The Sichuan Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dMuikuhzwwhKcPURTYKshWsKjnrax0rHGwDSWSDT5ma66A7U51vMeaPimPXZTk3Uscvt9mCnNSUIlLqtMU3K37fis0HpL-o7H8lx-eDnDl1Fc65NEMc7dDqmzJsKSnXVwiOmDh2CQqmaYGokpiNwaoQqIeoH69qbk83fbKr0ChMe7NfpmGtLu7i36v4tS7hnrxoAlXTxFrRnZivPk-Ku_QUBiaKr43Mjqw3y7u5AO1gbSg8JM4DSyJ4rw-Emd-6JzvAiRxfovv-UDEYU8nFSfnvVQQjZcVjRHgJgaMI6nrrw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dMuikuhzwwhKcPURTYKshWsKjnrax0rHGwDSWSDT5ma66A7U51vMeaPimPXZTk3Uscvt9mCnNSUIlLqtMU3K37fis0HpL-o7H8lx-eDnDl1Fc65NEMc7dDqmzJsKSnXVwiOmDh800CQqmaYGokpiNwaoQqIeoH69qbk83fbKr0ChMe7NfpmGtLu7i36v4tS7hnrxoAlXTxFrRnZivPk-Ku_QUBiaKr43Mjqw1200y7u5AO1gbSg8JM4DSyJ4rw-Emd-6JzvAiRxfovv-UDEYU8nFSfnvVQQjZcVjRHgJgaMI6nrrw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105384616026314160909\">The Sichuan Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2c5_e91lvxycwcKma25hLIa8UguD6jRy4LAyiQtcb7KvLLOiYHDUgGqCC0M7RwHq-hq2UHIri0oFlgu5h3Qtr9XI_P-eVXCaFzg0Gihzx9PSXPZ0T7ndIlLamAo0L3wv6AwXx-_86jIDF4axyXG2RBj9GuaKrEtoGY8qImr-v46aCInVz_ome87Xvlk5pDqsRzM1Wi01gxMI3yLnxbv_mNNOQ4UQkC0V13Pf3OZZKzs4wnNELZzVTNLeDJ0tWKO6UHV3ZK8q_BX9XFnJZehXjtYd6JGp5WlWniD_d1UkgfE53-ow9V-73Z-rKWojY-ujm4xJh-PG8pBFTXTRdSxJKOGWbkD06di3ghvSL0nKsTPf4n8Hk2cAnvSDQpje_auvfJKnbBCzlGyl4TqxEWYC_P_FmnyKaSpTqejl0lgdkE-hxqeOXKyYY9TZ9_8OZGl",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c5_e91lvxycwcKma25hLIa8UguD6jRy4LAyiQtcb7KvLLOiYHDUgGqCC0M7RwHq-hq2UHIri0oFlgu5h800Qtr9XI_P-eVXCaFzg0Gihzx9PSXPZ0T7ndIlLamAo0L3wv6AwXx-_86jIDF4axyXG2RBj9GuaKrEtoGY8qImr-v46aCInVz_ome87Xvlk5pDqsRzM1Wi01gxMI3yLnxbv_mNNOQ4UQkC0V13Pf3OZZKzs4wnNELZzVTNLeDJ0tWKO6UHV3ZK8q_BX9XFnJZehXjtYd6JGp5WlWniD_d1UkgfE53-ow1200V-73Z-rKWojY-ujm4xJh-PG8pBFTXTRdSxJKOGWbkD06di3ghvSL0nKsTPf4n8Hk2cAnvSDQpje_auvfJKnbBCzlGyl4TqxEWYC_P_FmnyKaSpTqejl0lgdkE-hxqeOXKyYY9TZ9_8OZGl&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103923661111356190956\">Jiamin</a>"
        ]
      },
      {
        "reference": "AciIO2fcrD1Jdh6eNk17b95qBj-KjHIF3Vh8EnTRG4XHT51f1C7mE0OpFa7ltGfRizdiq8EqNpNk0caSFuP5Apt8WsIiCdddEegI8YHS1YhA_WnYDvaIqcLMogWl7Aj2hmS3PE2nVHGlMQSmxdZsQ5gJccz0pcvT8exrCxhNcCdHqw94rOF5qM_aa5pJrgt7aojIZSN8OmqFVK6lPmL5X-_wUL-z5e15A0xfhox1TJRPH4wXrBPf6-k6qBuDo4QckJgn7nIWz02HF236C8wDOtnPVaQPbsSyZWEJ33Xp6spiTd6Z5nFeo3oRpnEUjmeYXOZttpxFgPbl6pdIcqKLW9Cxj_Um-U8iyzuzMDIc6hxKrEROirQqfgs0eWQzEGTBRgETrmdqrB1IRcd2YNYCM0KWa4ih0bVmmrAltz0pWCcKj_PFIMwA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fcrD1Jdh800eNk17b95qBj-KjHIF3Vh8EnTRG4XHT51f1C7mE0OpFa7ltGfRizdiq8EqNpNk0caSFuP5Apt8WsIiCdddEegI8YHS1YhA_WnYDvaIqcLMogWl7Aj2hmS3PE2nVHGlMQSmxdZsQ5gJccz0pcvT8exrCxhNcCdHqw1200rOF5qM_aa5pJrgt7aojIZSN8OmqFVK6lPmL5X-_wUL-z5e15A0xfhox1TJRPH4wXrBPf6-k6qBuDo4QckJgn7nIWz02HF236C8wDOtnPVaQPbsSyZWEJ33Xp6spiTd6Z5nFeo3oRpnEUjmeYXOZttpxFgPbl6pdIcqKLW9Cxj_Um-U8iyzuzMDIc6hxKrEROirQqfgs0eWQzEGTBRgETrmdqrB1IRcd2YNYCM0KWa4ih0bVmmrAltz0pWCcKj_PFIMwA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108735184247405755029\">Daniele Marchetti</a>"
        ]
      },
      {
        "reference": "AciIO2e8ToEMqy69PZp2ikIQU6XFvb4QzOdDzcHdJkk1IeEINUjgIQSG35N2uqVH7RI5eEdhu4xrqyhgZMPks3QCaDFjedw4Hco4fYDeudAL8km-UAl3Omf2L0hN_78Yw2Pcp7cNqmj8Cj3XlCk4Udjd7TAJafeGQIVaniEqfwFIWbwoiKN8QzQGIm_ubfKBFla5GYaSuZn-K48SaC5JJhnWI-MAGUzA21ey4BOzpC3KjbGx6CsJjKkXR8s9V_MN5_sPPsyMFsRUxljBWTAH5PomBTmmRGWrQacnzR-DDuMVG9Wo6V6mDD6IZZUHiMODoPsFI-I60p1LI8POdcJucbJKwdadnIe-qsZdqB4eWuwdxWXfTjV0Vcd5EXBnALGXqZjvimbH6pI51SfPcGpfbVGUp_eKrvQd1TsVoswkSn9VmgEXTGp5MyxOAQjEU9VzytsR",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e8ToEMqy69PZp2ikIQU6XFvb4QzOdDzcHdJkk1IeEINUjgIQSG35N2uqVH7RI5eEdhu4xrqyhgZMPks3QCaDFjedw1200Hco4fYDeudAL8km-UAl3Omf2L0hN_78Yw2Pcp7cNqmj8Cj3XlCk4Udjd7TAJafeGQIVaniEqfwFIWbwoiKN8QzQGIm_ubfKBFla5GYaSuZn-K48SaC5JJhnWI-MAGUzA21ey4BOzpC3KjbGx6CsJjKkXR8s9V_MN5_sPPsyMFsRUxljBWTAH5PomBTmmRGWrQacnzR-DDuMVG9Wo6V6mDD6IZZUHiMODoPsFI-I60p1LI8POdcJucbJKwdadnIe-qsZdqB4eWuwdxWXfTjV0Vcd5EXBnALGXqZjvimbH6pI51SfPcGpfbVGUp_eKrvQd1TsVoswkSn9VmgEXTGp5MyxOAQjEU9VzytsR&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104209803691023631442\">XINGYU LU</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Larraine “Santos” Criss",
        "rating": 4,
        "text": "Nice Sichuan Restaurant in the city. They have good selection of regional Chinese dishes and they served the orders quite promptly.  I just wished that if the menu indicated 3  hot or spicy levels, the dish should be really in hot and spicy level the way Sichuan dishes have in China. Staff are all attentive and accommodating.  They have clean washrooms as well.",
        "time": 1756384917,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Jason",
        "rating": 5,
        "text": "Overall the food is really good, using straight away and said down a straight away. Food came in good pace and it genuinely felt like you're in China. We ordered a range of food for two with sparkling water. My favourite was the roasted duck and the noodles.  We also ordered the cucumber salad which was a bit of disappointment. Authentic, good price and service.  Would go again",
        "time": 1746041679,
        "relative_time_description": "5 months ago"
      },
      {
        "author_name": "Andy Coulbeck",
        "rating": 5,
        "text": "Decent spot for Sichuan between Old Street and Moorgate stations. We had crispy duck and soft shell crab starters, followed by dan dan noodles (nice and spicy) and crispy shredded beef.",
        "time": 1760107070,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Marco Lai",
        "rating": 4,
        "text": "We had a great experience at this Chinese restaurant! The food was fresh, flavorful, and well-prepared. Highlights of the meal included the dry-fried green beans, which were crispy and savory, and the stir-fried onions with pork, which had a delicious balance of sweetness and spice. The eggplant dish was rich and tender, soaking up the sauce beautifully. The fried rice was light yet satisfying, with a nice mix of chicken, ham, and vegetables. Portions were generous and the service was friendly. A solid spot for authentic Chinese food—we’ll definitely be back!",
        "time": 1753814324,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Jiamin",
        "rating": 5,
        "text": "The food was super nice. Everyone service was very nice and friendly ( Ellie Cindy Backy Ruby and Head ) very nice team. Will come back for sure",
        "time": 1759866828,
        "relative_time_description": "a week ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 2,
    "fsa_rating_text": "2",
    "fsa_authority": "Islington",
    "fsa_url": "https://ratings.food.gov.uk/business/905191",
    "fsa_last_inspection": "2025-04-30T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:45.331Z",
    "lastVerifiedFSA": "2025-10-16T23:16:38.582Z",
    "createdAt": "2025-10-16T20:23:45.331Z",
    "updatedAt": "2025-10-16T20:24:28.825Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=japanese_sushi_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "The Sichuan Restaurant — Japanese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "japanese_the-sichuan-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.434Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "The Sichuan Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "japanese"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14 City Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 1399
      },
      "url": "https://thebestinlondon.co.uk/restaurant/the-sichuan-restaurant-939Y8L8U",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/the-sichuan-restaurant-939Y8L8U/japanese-the-sichuan-restaurant-939Y8L8U-card-741ea977.webp",
    "image_hero_path": "/images/restaurants/the-sichuan-restaurant-939Y8L8U/japanese-the-sichuan-restaurant-939Y8L8U-hero-00629669.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Japanese Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest japanese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-japanese-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Japanese Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest japanese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-japanese-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Japanese Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest japanese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Japanese Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-japanese-in-central-london-2025',
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
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Japanese in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Japanese Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest japanese restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of japanese cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/yiqi-cDLJ0Z8k" className="hover:text-yellow-600 transition-colors">
                YiQi
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 2,539 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 2/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          YiQi offers exceptional japanese cuisine in Central London. With a 4.9-star rating from 2,539 reviews and a 2/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/yiqi-cDLJ0Z8k" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJy23uOwAFdkgRii6cDLJ0Z8k" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/maru-london-yQBXwWAI" className="hover:text-yellow-600 transition-colors">
                Maru London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 201 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Maru London offers exceptional japanese cuisine in Central London. With a 4.8-star rating from 201 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/maru-london-yQBXwWAI" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJgUkU7K0FdkgRfVvyQBXwWAI" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/noble-palace-6iVOz8Kc" className="hover:text-yellow-600 transition-colors">
                Noble Palace
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 226 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Noble Palace offers exceptional japanese cuisine in Central London. With a 4.8-star rating from 226 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/noble-palace-6iVOz8Kc" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJlyw-LBMFdkgR0Wc6iVOz8Kc" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/oita-soho-xrSS0hZo" className="hover:text-yellow-600 transition-colors">
                OITA Soho
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 2,717 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          OITA Soho offers exceptional japanese cuisine in Central London. With a 4.7-star rating from 2,717 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/oita-soho-xrSS0hZo" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJxSy5AXIFdkgRCSYxrSS0hZo" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/rai-restaurant-london-5PZAMF6Q" className="hover:text-yellow-600 transition-colors">
                RAI Restaurant London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 1,339 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          RAI Restaurant London offers exceptional japanese cuisine in Central London. With a 4.7-star rating from 1,339 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/rai-restaurant-london-5PZAMF6Q" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ3Xz1VkQbdkgRUgW5PZAMF6Q" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/speedboat-bar-FDICmOhQ" className="hover:text-yellow-600 transition-colors">
                Speedboat Bar
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 4,320 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Speedboat Bar offers exceptional japanese cuisine in Central London. With a 4.7-star rating from 4,320 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/speedboat-bar-FDICmOhQ" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJbX_Fhx8FdkgRbTfFDICmOhQ" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/ma-la-sichuan-oHK7UfPw" className="hover:text-yellow-600 transition-colors">
                Ma La Sichuan
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 1,629 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Ma La Sichuan offers exceptional japanese cuisine in Central London. With a 4.6-star rating from 1,629 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/ma-la-sichuan-oHK7UfPw" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJZRnZ4dwEdkgRy-CoHK7UfPw" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/zuma-london-3z813cBw" className="hover:text-yellow-600 transition-colors">
                Zuma London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 2,748 reviews</span>
              <span>💰 ££££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Zuma London offers exceptional japanese cuisine in Central London. With a 4.5-star rating from 2,748 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/zuma-london-3z813cBw" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJZdN_kTgFdkgR0NR3z813cBw" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/house-of-ming-bmTrCQPc" className="hover:text-yellow-600 transition-colors">
                House of Ming
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 255 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          House of Ming offers exceptional japanese cuisine in Central London. With a 4.5-star rating from 255 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/house-of-ming-bmTrCQPc" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJZzYAdkkFdkgRrt9bmTrCQPc" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/the-sichuan-restaurant-939Y8L8U" className="hover:text-yellow-600 transition-colors">
                The Sichuan Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 1,399 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 2/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          The Sichuan Restaurant offers exceptional japanese cuisine in Central London. With a 4.5-star rating from 1,399 reviews and a 2/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/the-sichuan-restaurant-939Y8L8U" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJT9FOxa4cdkgRc54939Y8L8U" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
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
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
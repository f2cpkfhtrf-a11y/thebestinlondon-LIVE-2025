import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestItalianInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJU9GMeq0PdkgRD7sEkK4r0z4",
    "slug": "giulia-restaurant-EkK4r0z4",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJU9GMeq0PdkgRD7sEkK4r0z4",
    "name": "Giulia Restaurant",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 298,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "77 Askew Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "77 Askew Rd, London",
    "postcode": "W12 9AH",
    "borough": "Central London",
    "lat": 51.5041143,
    "lng": -0.2434161,
    "phone": "020 8743 0572",
    "phone_international": "+44 20 8743 0572",
    "website": "http://www.giuliarestaurant.co.uk/",
    "url": "https://maps.google.com/?cid=4527010079178013455",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Sunday: 12:00 – 4:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1630"
          },
          "open": {
            "day": 0,
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
            "time": "1730"
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
            "time": "1730"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2f9bjQY2Om0EO04c6UKYPnI5jUcFj4WU8y4QxF8oCRXtPWpbPwShYlOK6R1ljRP-WQnFp1qwAVyzaWFkwZioKL0lzC0l8ncCRFDjYZWXlR29-vSB2r9IFe78OSKK-hVJvfvVuhn1Zv76Pl2RxsKh_BBAZv1JvKU7NZFDkKKRlccxaVlC-8AeitwPE_choTuBKTzHg5RLJGh1BBiZyd0Ntv5wpxVBiAnLO6KHPFF1nx_2yxAkQu05CCkAVa7-1tDauaCD9dDUIin1MO5K-NpAxJI0oT3C0y2QUay9kVXl0iL8w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f9bjQY2Om0EO04c6UKYPnI5jUcFj4WU8y4QxF8oCRXtPWpbPwShYlOK6R1ljRP-WQnFp1qwAVyzaWFkwZioKL0lzC0l8ncCRFDjYZWXlR29-vSB2r9IFe78OSKK-hVJvfvVuhn1Zv76Pl2RxsKh_BBAZv1JvKU7NZFDkKKRlccxaVlC-8AeitwPE_choTuBKTzHg5RLJGh800BBiZyd0Ntv5wpxVBiAnLO6KHPFF1nx_2yxAkQu05CCkAVa7-1tDauaCD9dDUIin1MO5K-NpAxJI0oT3C0y2QUay9kVXl0iL8w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109184008530782802269\">Giulia Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2cvmCy1bdL721uRbTC6XypchO0fjwlFmhLFfi9B7DGjMfrO25tz2lJW8oUIIhnCAXWBG3QzLFu2NCOOq7aGKqlJabOcP2kYw65Oae6ACidMfTdB5Zh36witTFSOrVMg72buh_P_7zIFowRlSIbPfdZ2isoMtUqVcBM7uRANuzprJANP0dT4JIDldMLHVFOCzH5HHU8MqG8zuoIb0IqzMCaNk0JV17I3baGThA_EIJXwoxkR8bI0cwuuf15Bf5FxDseLVZFQ5KTUQT2u27ck2yA9RO3qi_uP6OBruV1hbLJigQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cvmCy1bdL721uRbTC6XypchO0fjwlFmhLFfi9B7DGjMfrO25tz2lJW8oUIIhnCAXWBG3QzLFu2NCOOq7aGKqlJabOcP2kYw1200Oae6ACidMfTdB5Zh800witTFSOrVMg72buh_P_7zIFowRlSIbPfdZ2isoMtUqVcBM7uRANuzprJANP0dT4JIDldMLHVFOCzH5HHU8MqG8zuoIb0IqzMCaNk0JV17I3baGThA_EIJXwoxkR8bI0cwuuf15Bf5FxDseLVZFQ5KTUQT2u27ck2yA9RO3qi_uP6OBruV1hbLJigQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109184008530782802269\">Giulia Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2eHPjK7kE4Gt-bmAmksmm8DmLmxBe0B908_h0dGCdR9wiHKuC4X1higSO_eh5foA713Q_pEhQCZfRrH5kEO-96Y-gFc5rd2tjY4kSjFPUVksdWfbaDs1GWT973928gtiDrHSGtV50L3yJPKDrV5V7E4iKdWouzd0nyG2tPTEmT-v4UYKFlhC3MoCYlYtbH1XZG8aMUvpLz4Rr-j_mkNJrr_gU72nJOc7rV1NzFGw7ry_AcYjHWsBuxfIIVYkF94_End31DvndP-phbVf0kGJrVHkTklZ8M6GEjiFsJvo4sHKhZFP_08l-Xs6IGK-TH_LGIeLrWJNCHDEJCoisrNRjNc8vNvjuP3onUw3BeMavEpR5EyyuBmCg7nQ6gkoHKli7u1VMLxu7h3Og8wSWllWTYtJ-SOIhd3RD-mD71J9Xh3fbU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eHPjK7kE4Gt-bmAmksmm8DmLmxBe0B908_h800dGCdR9wiHKuC4X1higSO_eh5foA713Q_pEhQCZfRrH5kEO-96Y-gFc5rd2tjY4kSjFPUVksdWfbaDs1GWT973928gtiDrHSGtV50L3yJPKDrV5V7E4iKdWouzd0nyG2tPTEmT-v4UYKFlhC3MoCYlYtbH1XZG8aMUvpLz4Rr-j_mkNJrr_gU72nJOc7rV1NzFGw1200ry_AcYjHWsBuxfIIVYkF94_End31DvndP-phbVf0kGJrVHkTklZ8M6GEjiFsJvo4sHKhZFP_08l-Xs6IGK-TH_LGIeLrWJNCHDEJCoisrNRjNc8vNvjuP3onUw3BeMavEpR5EyyuBmCg7nQ6gkoHKli7u1VMLxu7h3Og8wSWllWTYtJ-SOIhd3RD-mD71J9Xh3fbU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117998269497695521317\">Luísa Santos Carraro</a>"
        ]
      },
      {
        "reference": "AciIO2eWQbYXGwle38QTYSf6XTdl6lAIvpGlt23WgnPtKkC8X44YtFnFUWiMvqYzG5l1oMQ7GhtAQv0Bg9sTO5LDW1qN6vYnitKkCnwU58SlQMkKm6_HUJs88nV8UjvKiLkKV1YXpNSHBy-5c86Qm-Zt2kftrp4JJYpy-JyAaF40Pe9CGO-eBJQVYTb_tw-UPVaQG8m4hVtXp83b3iTE4kSlVL2h-Cl_fgKIVx7pd2guoEA8phJv5JlgzPgWzjjldlfm9quTwC6cBUakM3-3_Ugaz6bFdCBOmjOIueQ4S1asqNnkxbe1K8HayyWfO-SDB6T9mF0UQ8f4XRFQW0hrW1JLTwDdcOdCIDWUE_k4R73mwLc1gD_TjNTtmRwBz1lL0UKc2CkegHAqVqznws0t4nBRc7bTNwBhbhR7tfNYGC-jsV07Cny1",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eWQbYXGwle38QTYSf6XTdl6lAIvpGlt23WgnPtKkC8X44YtFnFUWiMvqYzG5l1oMQ7GhtAQv0Bg9sTO5LDW1qN6vYnitKkCnwU58SlQMkKm6_HUJs88nV8UjvKiLkKV1YXpNSHBy-5c86Qm-Zt2kftrp4JJYpy-JyAaF40Pe9CGO-eBJQVYTb_tw-UPVaQG8m4hVtXp83b3iTE4kSlVL2h-Cl_fgKIVx7pd2guoEA8phJv5JlgzPgWzjjldlfm9quTwC6cBUakM3-3_Ugaz6bFdCBOmjOIueQ4S1asqNnkxbe1K8HayyWfO-SDB6T9mF0UQ8f4XRFQW0hrW1JLTwDdcOdCIDWUE_k4R73mwLc1gD_TjNTtmRwBz1lL0UKc2CkegHAqVqznws0t4nBRc7bTNwBhbhR7tfNYGC-jsV07Cny1&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113912032903085153729\">Dominika p</a>"
        ]
      },
      {
        "reference": "AciIO2dhby1JSvm_HUkhPd3CEAa83EbiecfG3Yt59_WUHHwInutDKYozRIZQUI_UFG9JEOrSxYsxJlU-cn_j6Hy7rXB_o4IfpNScvnvwq8DrC35OJ322RkMYWzrfnjqtiJDSbTcVhrffIF4-xDAhErB1Es0t-6ub7fLBq5b7JWmWQZ11l3x8C8cxZrZoOfj_iN0YDtfCma2kKGWDDf4ffQToMyZ-y_E83O0jEuy1zigmRS2r637miQAsbwITLiqwOKwKqxs3SJNgiNSZZcOs2NSWgbM7OrE2MhHNXv25BYV4qbtJTA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dhby1JSvm_HUkhPd3CEAa83EbiecfG3Yt59_WUHHwInutDKYozRIZQUI_UFG9JEOrSxYsxJlU-cn_j6Hy7rXB_o4IfpNScvnvwq8DrC35OJ322RkMYWzrfnjqtiJDSbTcVhrffIF4-xDAhErB1Es0t-6ub7fLBq5b7JWmWQZ11l3x8C8cxZrZoOfj_iN0YDtfCma2kKGWDDf4ffQToMyZ-y_E83O0jEuy1zigmRS2r637miQAsbwITLiqwOKwKqxs3SJNgiNSZZcOs2NSWgbM7OrE2MhHNXv25BYV4qbtJTA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109184008530782802269\">Giulia Restaurant</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Anastasia Stutz",
        "rating": 5,
        "text": "My new favourite place, a true gourmet experience with such special dishes and good size portions. Menu is small but delicious and changes every month. Service is awesome, friendly, professional and very attentive. Came back after one week and planing to go back often.",
        "time": 1755115194,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Luísa Santos Carraro",
        "rating": 5,
        "text": "Giulia is a lovely neighbourhood restaurant with amazing food. The menu changes monthly with focus on seasonal produce, so it is always a fantastic experience (needless to say I go literally every month to try the new menu). Can’t recommend it enough. One of my absolute favourites.",
        "time": 1753048659,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Aman Brar",
        "rating": 5,
        "text": "So happy to have booked dinner at this little gem of a restaurant for my girlfriend’s 30th birthday.\n\nWe loved all the dishes we ordered - the quality of the ingredients and the combination of flavours really shone through & the service was fantastic.\n\nA place that will no doubt leave you wanting to come back. Highly recommend! :)",
        "time": 1733231602,
        "relative_time_description": "10 months ago"
      },
      {
        "author_name": "Hoa",
        "rating": 5,
        "text": "I've been meaning to leave a review since our last visit in July. Giulia's is a special place. We've been coming here since it first opened and the food has been consistently amazing. We were so lucky to have this authentic Italian restaurant five minutes away from where we lived, and Giulia and her fiancé are a fantastic team. They've created something that is truly rare, with dishes you wouldn't find in hundreds of other Italian restaurants. All delicious because you can see the passion that goes into the flavours. We've moved to Manchester now, but when we're in London next we'll make sure to treat ourselves to a meal at our favourite place, Giulia's. Thank you for always welcoming us and treating us so warmly!",
        "time": 1755594885,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "ali s",
        "rating": 5,
        "text": "Came here in early July and had a fantastic experience. Both the food and service were sublime. Gulia was warm, attentive, and made us, and other diners,  feel genuinely welcomed. The young man also working the floor was excellent. Every course impressed: the starters, pasta, and mains were beautifully prepared. The pork cheeks,  a recent addition to the menu, I believe, were especially tender and succulent. We’ll definitely be back.",
        "time": 1753045762,
        "relative_time_description": "2 months ago"
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
    "fsa_authority": "Hammersmith and Fulham",
    "fsa_url": "https://ratings.food.gov.uk/business/1416696",
    "fsa_last_inspection": "2024-01-25T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:43.380Z",
    "lastVerifiedFSA": "2025-10-16T23:15:38.076Z",
    "createdAt": "2025-10-16T20:23:43.380Z",
    "updatedAt": "2025-10-16T20:24:17.868Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Giulia Restaurant — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_giulia-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.431Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Giulia Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "77 Askew Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 298
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/giulia-restaurant-EkK4r0z4",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Sunday: 12:00 – 4:30 PM"
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
    "image_card_path": "/images/restaurants/giulia-restaurant-EkK4r0z4/italian-giulia-restaurant-EkK4r0z4-card-d0f6c62f.webp",
    "image_hero_path": "/images/restaurants/giulia-restaurant-EkK4r0z4/italian-giulia-restaurant-EkK4r0z4-hero-98519b00.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJFcdH1QobdkgRDhK9fVApnuo",
    "slug": "amor-gastronomia-9fVApnuo",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJFcdH1QobdkgRDhK9fVApnuo",
    "name": "Amor Gastronomia",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 1356,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "Victoria Mansions, 139 Holloway Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Victoria Mansions, 139 Holloway Rd, London",
    "postcode": "N7 8LX",
    "borough": "Central London",
    "lat": 51.5492206,
    "lng": -0.1080536,
    "phone": "020 3730 7443",
    "phone_international": "+44 20 3730 7443",
    "website": "https://www.amorgastronomia.com/",
    "url": "https://maps.google.com/?cid=16905995476879086094",
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
        "reference": "AciIO2ecJa-aKLkK27PkvrHtdTQ2mdCcPnntx4XLMBwJMIhMNkKMAyDUKsBoqjO5AgCZd1uE16d2IKLwFWxZ-Hu3hmnOlsO0pDfHgrwSOLhHnovsRlkqr5zIoiuheafjkUMNPI3O-HmjursRQ3APDjN2CXaxPcfJg2P9N1jL5o-wLrvsvJg5XBEE5QcoDcX4V66f6mzPWpYFOaWFL91ufbW6_Hjj1u5U-z6sNEg0Gzq06hAEN6fqqMgwmN5XrCsC5OCogkgovAgSRn42rF8mP0fAIGFjSL3Uj0r4-kt4Zg4qciYlxg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ecJa-aKLkK27PkvrHtdTQ2mdCcPnntx4XLMBwJMIhMNkKMAyDUKsBoqjO5AgCZd1uE16d2IKLwFWxZ-Hu3hmnOlsO0pDfHgrwSOLhHnovsRlkqr5zIoiuheafjkUMNPI3O-HmjursRQ3APDjN2CXaxPcfJg2P9N1jL5o-wLrvsvJg5XBEE5QcoDcX4V66f6mzPWpYFOaWFL91ufbW6_Hjj1u5U-z6sNEg0Gzq06hAEN6fqqMgwmN5XrCsC5OCogkgovAgSRn42rF8mP0fAIGFjSL3Uj0r4-kt4Zg4qciYlxg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107460987636513141130\">Amor Gastronomia</a>"
        ]
      },
      {
        "reference": "AciIO2crpcqBAFTPYEtUl08k-WYdYyGK3DynpBRVL8IGUDCSdHeD-6tmlB3yH-URppCVtVw4j9xOIDPdMuUVoSirLGabWDhSbHTKUy4s0tsR1wU1bzWQMQt1GB4PzQXPrJRBX1kPvb0dFWHMmI20Zfiv9xriuvrAtN_f7o9pLO7eLhhCErKwiN4sfvntv3fgmCth_eVKLXLU4GMZ_f8_5snToAMdnJplpzTomdsF5BFeZ8IjctJhIHGQPelZpOwS3jtbWVnUlLZd87BoUx8fynVeTW1om-gsFokVhL45YjlRrwYFqw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2crpcqBAFTPYEtUl08k-WYdYyGK3DynpBRVL8IGUDCSdHeD-6tmlB3yH-URppCVtVw1200j9xOIDPdMuUVoSirLGabWDhSbHTKUy4s0tsR1wU1bzWQMQt1GB4PzQXPrJRBX1kPvb0dFWHMmI20Zfiv9xriuvrAtN_f7o9pLO7eLhhCErKwiN4sfvntv3fgmCth_eVKLXLU4GMZ_f8_5snToAMdnJplpzTomdsF5BFeZ8IjctJhIHGQPelZpOwS3jtbWVnUlLZd87BoUx8fynVeTW1om-gsFokVhL45YjlRrwYFqw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107460987636513141130\">Amor Gastronomia</a>"
        ]
      },
      {
        "reference": "AciIO2dASAKzqMM3GsFxIKnUbEGCk9wbdo4-eXlS_M4_utsZt34M4JAKlSzCMw_NumCf5jcSaRRrSdSkmKJ73hIQ-mfZzGmS4uK5Zz6P8ij0uDX5LAJEklDgV1j5A68vKsttl95r_60M2G-YYazAmqmZ3OVfuVKKdFTGx3jOu4tr_QNYlwOMtAsLPu532Tv-V_MN0G4i78usrT6CaEPYeVV95CGAjLTRsyFvPdy4lSD_oMu_ZGBnFEZjb1f_b2mSxTMUFHiNlCXYifC53ZsY5m_ub0rdPplfK5xSDsx-Esgf2S-YDUq8YjzGO35Z9AinD-G0zTtoueEpNH3q55JZ55s3Y7fkfscoDg2ds5gffGiivTwc_0kywvkPnlDo1NVg9bGhyqskZSVf8f30ssAssMDvF4_6VHG60jYTlo7pFt-JBwU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dASAKzqMM3GsFxIKnUbEGCk9wbdo4-eXlS_M4_utsZt34M4JAKlSzCMw_NumCf5jcSaRRrSdSkmKJ73hIQ-mfZzGmS4uK5Zz6P8ij0uDX5LAJEklDgV1j5A68vKsttl95r_60M2G-YYazAmqmZ3OVfuVKKdFTGx3jOu4tr_QNYlwOMtAsLPu532Tv-V_MN0G4i78usrT6CaEPYeVV95CGAjLTRsyFvPdy4lSD_oMu_ZGBnFEZjb1f_b2mSxTMUFHiNlCXYifC53ZsY5m_ub0rdPplfK5xSDsx-Esgf2S-YDUq8YjzGO35Z9AinD-G0zTtoueEpNH3q55JZ55s3Y7fkfscoDg2ds5gffGiivTwc_0kywvkPnlDo1NVg9bGhyqskZSVf8f30ssAssMDvF4_6VHG60jYTlo7pFt-JBwU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106646457665490800878\">B Kin</a>"
        ]
      },
      {
        "reference": "AciIO2cFaw_G2faHyVPEviJB3GCq8B6GYPzRWz0khQMdbS2nwVNs8Tp_Ria7qghFGXmY9TR6KuFsNz19_NDwXQymH7-1jSa87EDSk_oKAyL2dAgqmWKscmwIpPV_yxET3zNPbsPP6b6uGVgrMtVPZki2umqyo5zVwrK8wXPtToPXrVqLcBPQ7M6E8yZB_Qcls8oqme27spj3bjuA9LV8LRUc5iO7yRdAMl6J5HOe_UPFckeUs4aG3nnSNaPfVqu509dTsHRR9J_lv-YHr4BlkFg2rCvPIUhKkNiXqp0HmVigrzBFTWWlT3ywj7PmNNdsOxB3bwe4Czu2oeihYgFw5_3-4VfbfH13gPvML3B_EEDHmwqX-8AYCuc2PaUYD63XoB7c-5WIyiWWI_8RiJsdiau5obLGeXMUJ0gHp792xzycCa8WK1Z6",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cFaw_G2faHyVPEviJB3GCq8B6GYPzRWz0khQMdbS2nwVNs8Tp_Ria7qghFGXmY9TR6KuFsNz19_NDwXQymH7-1jSa87EDSk_oKAyL2dAgqmWKscmwIpPV_yxET3zNPbsPP6b6uGVgrMtVPZki2umqyo5zVwrK8wXPtToPXrVqLcBPQ7M6E8yZB_Qcls8oqme27spj3bjuA9LV8LRUc5iO7yRdAMl6J5HOe_UPFckeUs4aG3nnSNaPfVqu509dTsHRR9J_lv-YHr4BlkFg2rCvPIUhKkNiXqp0HmVigrzBFTWWlT3ywj7PmNNdsOxB3bwe4Czu2oeihYgFw1200_3-4VfbfH13gPvML3B_EEDHmwqX-8AYCuc2PaUYD63XoB7c-5WIyiWWI_8RiJsdiau5obLGeXMUJ0gHp792xzycCa8WK1Z6&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110947938453450897704\">paula paula</a>"
        ]
      },
      {
        "reference": "AciIO2cIxGOW2qiG4-5Z6Eq1FcDNrtwH6FkvDefGEcMopbKEhnKqRq6eBeRzk6fTjnkghbkrJRMbFgBEMxkOHW1d1k1xkdTyV08rkeVOicJ6Os9Jiq9SFKWIN22rfXZlV0Q_2wXZGq4GOTLL0_L0o6UFvF6Vt3U7YOqIgDNvwxqgFHMkNaqo69Ctc7SGsFJwY7gc6G9LC7WQY3x_tz67LRk-ez_5uQp82dDsn33bKz1vQb88sX6pZmyD3Wv3fJ9mEA4aZ8DyxttO6aAIS2EKIuLtQAu_AbX8bNzAGh1yBCXmZfd3xU3D6lzyC1s7cqFmhdqjHKkDXc7T-sKLmB74V9ndVtGthwDfLLkxpp063TL7JCP1I4DYAo-rwLPm8gk61TuW43xlKJJ-P8zr6oBGV1JnfUIqGFhnndS8_p6GT6SaaytogJeqWPRZFwh7cATYRuV8",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cIxGOW2qiG4-5Z6Eq1FcDNrtwH6FkvDefGEcMopbKEhnKqRq6eBeRzk6fTjnkghbkrJRMbFgBEMxkOHW1d1k1xkdTyV08rkeVOicJ6Os9Jiq9SFKWIN22rfXZlV0Q_2wXZGq4GOTLL0_L0o6UFvF6Vt3U7YOqIgDNvwxqgFHMkNaqo69Ctc7SGsFJwY7gc6G9LC7WQY3x_tz67LRk-ez_5uQp82dDsn33bKz1vQb88sX6pZmyD3Wv3fJ9mEA4aZ8DyxttO6aAIS2EKIuLtQAu_AbX8bNzAGh800yBCXmZfd3xU3D6lzyC1s7cqFmhdqjHKkDXc7T-sKLmB74V9ndVtGthwDfLLkxpp063TL7JCP1I4DYAo-rwLPm8gk61TuW43xlKJJ-P8zr6oBGV1JnfUIqGFhnndS8_p6GT6SaaytogJeqWPRZFwh7cATYRuV8&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106743766710616360343\">Agata Wilam</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Agata Wilam",
        "rating": 5,
        "text": "You pop in for a bite to eat on Holow Rd and then you're whisked away to a local \"osteria\" in an Italian town. You can practice a few Italian words and get rewarded for trying. The food is good, the atmosphere is friendly. A good option for an evening in the area.",
        "time": 1759091341,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "shato sharmin islam",
        "rating": 5,
        "text": "We celebrated my wife’s birthday at Amor Gastronomia and it was absolutely unforgettable. The food was exceptional — full of authentic Italian flavor and beautifully presented.\nA special shoutout to Michele, who made the evening truly magical. His warmth, attention to detail, and personal touches elevated the entire experience. He made us feel like family and went above and beyond to make my wife’s night special.\nWe can’t wait to come back. Highly recommended!",
        "time": 1752868968,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "floris cheung",
        "rating": 5,
        "text": "I have been here twice. I met different staff's and they all are friendly. Food quality is good. Lots of options and very tasty. A cosy place with good Italian music. I will cone again for sure.",
        "time": 1754926299,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Angela Malan",
        "rating": 5,
        "text": "I went to this place with some friends and tried an excellent pinsa romana as well as some incredible fried gnocchi with gorgonzola. My friends, on the other hand, had a trio of delicious gnocchi and some outstanding paccheri with sausage and mushrooms. We finished off with two very good tiramisù.\n\nI highly recommend this cosy and uniquely decorated restaurant. I’ll definitely be coming back soon to try more dishes and for the vibrant, family-like atmosphere created by the staff.",
        "time": 1759439789,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Vanessa Lo",
        "rating": 5,
        "text": "Fantastic service and delicious food! Pamela was absolutely lovely—so kind and understanding. Even when we ordered the wrong dish, she was super nice about it and got us a new one without any fuss :)",
        "time": 1747851064,
        "relative_time_description": "4 months ago"
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
    "lastVerifiedGoogle": "2025-10-16T20:23:43.862Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:43.862Z",
    "updatedAt": "2025-10-16T20:24:18.754Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Amor Gastronomia — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_amor-gastronomia_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.431Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Amor Gastronomia",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Victoria Mansions, 139 Holloway Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 1356
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/amor-gastronomia-9fVApnuo",
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
    "image_card_path": "/images/restaurants/amor-gastronomia-9fVApnuo/italian-amor-gastronomia-9fVApnuo-card-941f504e.webp",
    "image_hero_path": "/images/restaurants/amor-gastronomia-9fVApnuo/italian-amor-gastronomia-9fVApnuo-hero-a605762b.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJK4j9CagbdkgRluwkqYLufoE",
    "slug": "circolo-popolare-kqYLufoE",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJK4j9CagbdkgRluwkqYLufoE",
    "name": "Circolo Popolare",
    "description": "Where traditional European techniques meet contemporary innovation. This Central London spot serves up modern european cuisine that's sophisticated, creative, and absolutely memorable. With ratings this high, it's no ...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant",
      "fine-dining"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 32974,
    "price_level": 3,
    "price_range": "£££",
    "address": {
      "formatted": "40-41 Rathbone Pl, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "40-41 Rathbone Pl, London",
    "postcode": "W1T 1HX",
    "borough": "Central London",
    "lat": 51.5171895,
    "lng": -0.1338679,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.circolopopolare.com/restaurants/circolopopolare-london?utm_source=google&utm_medium=organic&utm_campaign=mybusiness-website",
    "url": "https://maps.google.com/?cid=9331157722909174934",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 10:30 PM",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 11:00 AM – 10:30 PM",
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
            "time": "1100"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dkg9vknjeLbxC5LT18TfTg42CtIrOyvZD14V5vWoPXM4NMza9xt6DPAdW3KrClGnfJ-ekdfim7VBQOb8xV5q-aCgP8STsNVmDtEUbgxRvkf9uub9G_SzinPP2fiFCld31FntFis629S0JeUxQt22y8c_RMn4pDnIUvfL0gDIMWMbb-4g4ncYUeCcxG9l4BD3PDthM5aEUgtpcDQ-O46lqmSdRrGJZm-lvPfcOccKKY70HIl6kLNQxzwpv5TM6ABPvU5esRNJ7GFWo_HUSO54Pfurb94_yK8GEPX3NCzP-rOw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dkg9vknjeLbxC5LT18TfTg42CtIrOyvZD14V5vWoPXM4NMza9xt6DPAdW3KrClGnfJ-ekdfim7VBQOb8xV5q-aCgP8STsNVmDtEUbgxRvkf9uub9G_SzinPP2fiFCld31FntFis629S0JeUxQt22y8c_RMn4pDnIUvfL0gDIMWMbb-4g4ncYUeCcxG9l4BD3PDthM5aEUgtpcDQ-O46lqmSdRrGJZm-lvPfcOccKKY70HIl6kLNQxzwpv5TM6ABPvU5esRNJ7GFWo_HUSO54Pfurb94_yK8GEPX3NCzP-rOw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108319630165586043426\">Circolo Popolare</a>"
        ]
      },
      {
        "reference": "AciIO2epfC8NE9RaqfraBpIv-JvymODY708D-09VAjKVcGe7O8L0bjZWtVA9XNsejPe-o_tMTrN83TSXcxhPFwZQh_j4ch5_LDeSCrrOT0DmW1rWj-_raSKaMLXFONx9JXXgGCbgMSD0Kf1bJn4mdK3NOU3vGWyIDK6aMJpGT5alpudjp30dLeM0f004i9zzPq0htke9BuKr1oDXroe5cp8k61DktWDHzU24Sn5QLOJ3tIlpq0FT1TJH6ZeB_zWF78UqVXS1aKGUKm5SRSHI2hLWMMi253iEQ236Sn4MSI0-34kfQfMgmVzrlyKXA4SKCcrYh0Flyqr9sVPsV57ai-G1kbk1VIBcRxWv7tneyxmB6s64-5bRa0SGltTsbr1i7Yuncy8fEMbjPPssXx3xFhGpzkNRqqKXTkSCdsTTNUQgPHWE-XWrM0rg0ccSPPkiZs14",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2epfC8NE9RaqfraBpIv-JvymODY708D-09VAjKVcGe7O8L0bjZWtVA9XNsejPe-o_tMTrN83TSXcxhPFwZQh_j4ch800_LDeSCrrOT0DmW1rWj-_raSKaMLXFONx9JXXgGCbgMSD0Kf1bJn4mdK3NOU3vGWyIDK6aMJpGT5alpudjp30dLeM0f004i9zzPq0htke9BuKr1oDXroe5cp8k61DktWDHzU24Sn5QLOJ3tIlpq0FT1TJH6ZeB_zWF78UqVXS1aKGUKm5SRSHI2hLWMMi253iEQ236Sn4MSI0-34kfQfMgmVzrlyKXA4SKCcrYh0Flyqr9sVPsV57ai-G1kbk1VIBcRxWv7tneyxmB6s64-5bRa0SGltTsbr1i7Yuncy8fEMbjPPssXx3xFhGpzkNRqqKXTkSCdsTTNUQgPHWE-XWrM0rg0ccSPPkiZs14&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100772680112024135562\">Ella Mao</a>"
        ]
      },
      {
        "reference": "AciIO2f5dy8GKhza6LpTFeJgj-2EtSIzP_ZadJrbKnym_Pm_UTng4EKlwwWgnzcP9XRXfROwvKcSGn9PWCNo-dlCMsy1xfc2lIAMfYyXCdVlnx9rH7M17_FX_mePc7S7E6RCCanQa53jdHxn-8mzxSTZ4z_5UKCEZQ_dvYeYW8H8u2kScZ8UTDtT4lt0WE6i-nAPGaZJs9omrl4kjYeuGtXa39wSTOqeUlX6vjE4ADX2s-azFBXowulD2t7l3SYW6K32T8L6z4ud_NDmG4uDbRUnCz1fY3SJbbR3D52d1FOshsOHKA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f5dy8GKhza6LpTFeJgj-2EtSIzP_ZadJrbKnym_Pm_UTng4EKlwwWgnzcP9XRXfROwvKcSGn9PWCNo-dlCMsy1xfc2lIAMfYyXCdVlnx9rH7M17_FX_mePc7S7E6RCCanQa53jdHxn-8mzxSTZ4z_5UKCEZQ_dvYeYW8H8u2kScZ8UTDtT4lt0WE6i-nAPGaZJs9omrl4kjYeuGtXa39wSTOqeUlX6vjE4ADX2s-azFBXowulD2t7l3SYW6K32T8L6z4ud_NDmG4uDbRUnCz1fY3SJbbR3D52d1FOshsOHKA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108319630165586043426\">Circolo Popolare</a>"
        ]
      },
      {
        "reference": "AciIO2cn5aBJaNmqsfZP_ZXaYZwak83vXf3GZ-cf3B5Zw1RDrNchUDe6k5Y0E0zf4b0uXjX8YR1j9UNLMitcLmhD1Q6hjqLSrSFOUDuVGZbfYsbQP7Ak9VmQS4Dv7BZypLbB_8wiyJelZVR7JV_4ZSpR32L4RqL4pLxE6Yrt_vyKvbcwg5Q0Lr0_kkrC4rGFTaJ4_twc6D6uohPVERHkgiMVEmYVancCU5a-SCs0xq23xjCZRmx6FIL6njDKjYvY6rrcGyM0Lc0v3hrXv2A8x6scrtzkDbYtcebymMT2d0YdOsXNK4y2K_25TWWmqNGcRtrlB_zSKV9drhV0WpNKfTPMKfkqlqU5NEr79ZtABP8FF-kEKIyUu1Nu1u_Gyp6HyGXjO10yF81GfgAkjG_7YH5wGjqbk9tziD1sNNEQzmlMmlgQy_Mgvu2VnB6MxWVImykq",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cn5aBJaNmqsfZP_ZXaYZwak83vXf3GZ-cf3B5Zw1200RDrNchUDe6k5Y0E0zf4b0uXjX8YR1j9UNLMitcLmhD1Q6hjqLSrSFOUDuVGZbfYsbQP7Ak9VmQS4Dv7BZypLbB_8wiyJelZVR7JV_4ZSpR32L4RqL4pLxE6Yrt_vyKvbcwg5Q0Lr0_kkrC4rGFTaJ4_twc6D6uohPVERHkgiMVEmYVancCU5a-SCs0xq23xjCZRmx6FIL6njDKjYvY6rrcGyM0Lc0v3hrXv2A8x6scrtzkDbYtcebymMT2d0YdOsXNK4y2K_25TWWmqNGcRtrlB_zSKV9drhV0WpNKfTPMKfkqlqU5NEr79ZtABP8FF-kEKIyUu1Nu1u_Gyp6HyGXjO10yF81GfgAkjG_7YH5wGjqbk9tziD1sNNEQzmlMmlgQy_Mgvu2VnB6MxWVImykq&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103436877760357162189\">sherife hussein</a>"
        ]
      },
      {
        "reference": "AciIO2fqE9QsOGtHJt8soosDumDSGPuhdbLCeC-VgXfIILynaSix8myQoCg6cPSZhBe7AhDNstXdklG3VWeT6Co4MGnLlsxoJFIwBpSdehZ1CZ1lM3tuW3m9vTZ9RcZ_x2PvwWKzBJBtS2GzWX0HB_N2Pcc6-lQaRRgSOnKM_EFSq4Gp0_2Ch7zL6qTwOxMflE3nxf-XgqONhbXiStbm1zwX0hgeCgvYgtX7gWZ6_M5d_2_xZNxqv7bDqHM3GCs7H7qWlPHFojdAK0rjcnIP0lFdewuKheJyczc2la00GiNAOBB1QP0eMGukf0YXI3dtNW3sd1ueo7I7KdxoiCNRrW-s0gY4lHsnbVFp7ExKdKtz0uGBh0FBr_xe2yigjckz-RsS7ojGaDaTiRC--B4b7Mcm3Nww4pXmYKjenxkHAeX-gNnY39wAFmwbXIX0o-b5Bvwp",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fqE9QsOGtHJt8soosDumDSGPuhdbLCeC-VgXfIILynaSix8myQoCg6cPSZhBe7AhDNstXdklG3VWeT6Co4MGnLlsxoJFIwBpSdehZ1CZ1lM3tuW3m9vTZ9RcZ_x2PvwWKzBJBtS2GzWX0HB_N2Pcc6-lQaRRgSOnKM_EFSq4Gp0_2Ch800zL6qTwOxMflE3nxf-XgqONhbXiStbm1zwX0hgeCgvYgtX7gWZ6_M5d_2_xZNxqv7bDqHM3GCs7H7qWlPHFojdAK0rjcnIP0lFdewuKheJyczc2la00GiNAOBB1QP0eMGukf0YXI3dtNW3sd1ueo7I7KdxoiCNRrW-s0gY4lHsnbVFp7ExKdKtz0uGBh0FBr_xe2yigjckz-RsS7ojGaDaTiRC--B4b7Mcm3Nww1200pXmYKjenxkHAeX-gNnY39wAFmwbXIX0o-b5Bvwp&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100772680112024135562\">Ella Mao</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Adam",
        "rating": 3,
        "text": "A detailed mixed review for a Monday night visit. The setting of the restaurant is quite impressive, it’s lovely inside. However it is very popular so is very busy. The tables are extremely close together so it feels like you’re sat on top of your neighbours. The service is very mediocre.\n\nThe waitress took the order for your the meal and the first round of drinks that’s about it. I was extremely disappointed to witness a member of staff using the toilet without washing their hands. Quite off putting knowing this when you’ve just eaten your meal.\n\nFood was very tasty and this would be the reason we would visit again. Reasonably priced and good portion sizes.\n\nThe dessert however was very disappointing and we felt ripped off when it arrived. £14 for a slice of what tasted like dry shop bought cold chocolate cake. A tiny amount of chocolate sauce on the top didn’t help with the dryness would defo avoid!\n\nOverall a decent experience for the food alone but it sadly lets itself down in many other aspects.\n\nRecommendations are required",
        "time": 1759783349,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Heer",
        "rating": 5,
        "text": "My husband and I went to Circolo Popolare for our anniversary dinner, and it was such a wonderful experience.\n\nAmbience: ★★★★★\nThe restaurant is absolutely stunning—perfect for a romantic date night. The interiors are beautifully decorated, featuring elegant Italian ceramic plates and a warm, inviting atmosphere. The place is spotless and well-kept, making it a delight to dine in.\n\nService:\nThe service was excellent—friendly, attentive, and quick, which made the evening even more enjoyable.\n\nFood:\nThe quality of ingredients truly matches what you’d expect in Italy. We started with the Trio d’Olive, which was fresh and flavourful, and the Mozzarella in Carrozza—crispy on the outside, perfectly cheesy inside, and served with a delicious tomato sauce.\n\nFor my main, I had the Mafaldine al Tartufo, which was incredibly delicious—rich, aromatic, and bursting with truffle flavour. I highly recommend trying this dish.\n\nMy husband ordered the Tagliolini Granchio e Limone. It was decent, but didn’t quite match the wow factor of the truffle pasta.\n\nNote: The only downside was that the toilets were a little dirty and had an unpleasant smell. However, this did not take away from the fact that the restaurant itself is really nice, clean, and beautifully maintained.\n\nOverall, we had a memorable anniversary dinner, and I would definitely return—especially for that Mafaldine al Tartufo!",
        "time": 1755195460,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Holly Noseworthy",
        "rating": 5,
        "text": "What a beautiful experience!\nMy husband and I spent our “thanksgiving” here, and we’re not disappointed! We started with the burrata- absolute perfection floating on a delicious tomato reduction. For our main course we paired the ragu with a Sicily wine, it was fresh and delicious. To end our beautiful experience, we had the tiramisu! Both the food, service, and atmosphere were outstanding- we will be back!",
        "time": 1760297883,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Tony Oates",
        "rating": 4,
        "text": "From the outside this looks like a quiet unassuming restaurant. Once you get inside it turns into a huge barn-sized place. Interesting decor as all the photos in reviews show. Bottle display is impressive. Because it’s all open inside it can be quite loud with conversation, which combined with the semi-disco feel of the music makes for a high energy vibe. The food choice is varied enough to satisfy most tastes in my opinion. Quality is decent. I had pizza, smashed potatoes and stracciatella. The latter was novel for me and very nice as an appetizer. Service is reasonably efficient although they did forget the pizza order; they recovered quickly and all was well for us. Draft beer is from a local craft brewery. It appears to be an extremely busy place even for lunch, so reservations are a must; you can’t call and bookings are done online. That turned out to be easy and we got a reminder email well in advance. If you want a little bit of a quieter meal ask to be seated at the back behind the kitchen. It’s popular for birthdays and celebrations. Worth a visit if you plan on being in Oxford street.",
        "time": 1760266516,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Alex Crisp",
        "rating": 5,
        "text": "Went here with my partner for our anniversary and had such a lovely evening. The restaurant is absolutely beautiful – warm lighting, bottles and postcards everywhere, and flowers hanging from the ceiling. Even the toilets are gorgeous with their unique Italian style!\n\nThe food was incredible – especially the carbonara, which they make right in front of you in a cheese wheel. The cocktails were great too, and I loved the quirky glasses they came in. The staff were so kind and attentive, and even gave us an anniversary card, which was such a sweet surprise. Paying was super easy through a QR code and Apple Pay.\n\nThe only downsides were that it was quite warm inside, and there’s an extra platform charge when paying, which feels a bit unfair.\n\nOverall, it’s a stunning restaurant with amazing food, lovely staff, and a great atmosphere – perfect for a date night or special occasion!",
        "time": 1759873466,
        "relative_time_description": "a week ago"
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
    "fsa_url": "https://ratings.food.gov.uk/business/1247016",
    "fsa_last_inspection": "2025-09-10T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:19.711Z",
    "lastVerifiedFSA": "2025-10-16T23:15:11.134Z",
    "createdAt": "2025-10-15T10:53:19.711Z",
    "updatedAt": "2025-10-16T20:24:13.146Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Circolo Popolare — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_circolo-popolare_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.429Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Circolo Popolare",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£3",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "40-41 Rathbone Pl, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 32974
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/circolo-popolare-kqYLufoE",
      "openingHours": [
        "Monday: 12:00 – 10:30 PM",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 11:00 AM – 10:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/circolo-popolare-kqYLufoE/italian-circolo-popolare-kqYLufoE-card-0e38a225.webp",
    "image_hero_path": "/images/restaurants/circolo-popolare-kqYLufoE/italian-circolo-popolare-kqYLufoE-hero-49ddff10.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJRcG-rBEbdkgR9SUVxepVY0I",
    "slug": "grasso-VxepVY0I",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJRcG-rBEbdkgR9SUVxepVY0I",
    "name": "Grasso",
    "description": "A celebration of European culinary heritage with a modern twist. This Central London gem proves that modern european cuisine can be both traditional and innovative. With ratings this high, it's no wonder locals keep c...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 3330,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "81 Dean St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "81 Dean St, London",
    "postcode": "W1D 3SW",
    "borough": "Central London",
    "lat": 51.5143233,
    "lng": -0.1330642,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://grassosoho.com/",
    "url": "https://maps.google.com/?cid=4783761696014804469",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: Closed"
      ],
      "periods": [
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
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
        "reference": "AciIO2fxuNM1XcZUHXbejIe9DWxq2qjJTNvbwPaEb1spRsOGEK1VHGS040M2jrYcqk9gWv7NNF6M1xwB_0onvInsWNS4BQD0BSesn6bibG-WHboDGIxZ1CxAxWMu_xyOCnyMHde8QFlMzqVQJM37eNQ-NdHVIpbzHLN_Rl8lXPOCX3hsEsVkTO7GPe7SBRk1pkjJ779YbZ-csb64uHiyJkBTnt16KE7g29HMmG57ZbMK2dAeg_mK38V6b5VZ5xWDx8pWHmqJZ7YSBJz_1eaUoL2uEe7rP7SeVhQBqqXbqN0GQZuTHw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fxuNM1XcZUHXbejIe9DWxq2qjJTNvbwPaEb1spRsOGEK1VHGS040M2jrYcqk9gWv7NNF6M1xwB_0onvInsWNS4BQD0BSesn6bibG-WHboDGIxZ1CxAxWMu_xyOCnyMHde8QFlMzqVQJM37eNQ-NdHVIpbzHLN_Rl8lXPOCX3hsEsVkTO7GPe7SBRk1pkjJ779YbZ-csb64uHiyJkBTnt16KE7g29HMmG57ZbMK2dAeg_mK38V6b5VZ5xWDx8pWHmqJZ7YSBJz_1eaUoL2uEe7rP7SeVhQBqqXbqN0GQZuTHw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115215616274338248382\">Grasso</a>"
        ]
      },
      {
        "reference": "AciIO2c2VDISI7pkq95Qiij81HwdFhxKWx5AIdiVHFNE8CAhJSB8xKUiXHANPYtsc3tLcP3AMIstsUM4hgHDqudB1nD4-q3NlVaYq24AtWt3YByUDRbxEozBq2f0KlfC308W-jMnlHLJFu24b6KkjUoY-KKOorbpMJtqnZSTgdY-faXeyhnyYpyATkOpQyduqY2U9qMYcIVG3tx3vp7_2hPTI5MkVHUchNs0OhkC5yQpy4JRyD2st9aLGD3SeWDn-Ixy02agU_90eaOGMEp0LoNbkZcFuY97LgQYDxFiv2hIe2i7BA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c2VDISI7pkq95Qiij81HwdFhxKWx5AIdiVHFNE8CAhJSB8xKUiXHANPYtsc3tLcP3AMIstsUM4hgHDqudB1nD4-q3NlVaYq24AtWt3YByUDRbxEozBq2f0KlfC308W-jMnlHLJFu24b6KkjUoY-KKOorbpMJtqnZSTgdY-faXeyhnyYpyATkOpQyduqY2U9qMYcIVG3tx3vp7_2hPTI5MkVHUchNs0OhkC5yQpy4JRyD2st9aLGD3SeWDn-Ixy02agU_90eaOGMEp0LoNbkZcFuY97LgQYDxFiv2hIe2i7BA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115215616274338248382\">Grasso</a>"
        ]
      },
      {
        "reference": "AciIO2ego9Iv3eiFBD4x85HvH7gTclvE0GZDP0DzQRlTpDTvdbtq430QACY6ZuJGe-aob0cgJCNlshSWI53-CnMExKYQbHWEpLChidg552DedjK0HmTwmrltNko28LpCWp-Qi3krBqdxBFceJR3uaYTllaeej3hw_nGp4HKFUsc0his4jKMTnJRpn1Sp_6AAZxBwHjRlE53wOHFq0nYHT9rFTCCz7B_XD8cHiUuXAeJoje6bQphBJFqBqjBBhBnxz6FC6E4SDmZpA7AxZ9C4v-yV_QdSJ6ZNV2J-Q9Y1XNj9GBwmILThSOdBYiaR74iMGRb_mJcwPN_g9n9ovd_Njr0z85ge6ExQ_DjGbuuLAkIjRHxpdeN3_yw4leCL5LlB8jm-3aaFELb4vUG52QD7ulzZLmsKbl2DZXRUi8NWg2a2Y59gP-2RQKWCRbXOmXSiRiiH",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ego9Iv3eiFBD4x85HvH7gTclvE0GZDP0DzQRlTpDTvdbtq430QACY6ZuJGe-aob0cgJCNlshSWI53-CnMExKYQbHWEpLChidg552DedjK0HmTwmrltNko28LpCWp-Qi3krBqdxBFceJR3uaYTllaeej3hw_nGp4HKFUsc0his4jKMTnJRpn1Sp_6AAZxBwHjRlE53wOHFq0nYHT9rFTCCz7B_XD8cHiUuXAeJoje6bQphBJFqBqjBBhBnxz6FC6E4SDmZpA7AxZ9C4v-yV_QdSJ6ZNV2J-Q9Y1XNj9GBwmILThSOdBYiaR74iMGRb_mJcwPN_g9n9ovd_Njr0z85ge6ExQ_DjGbuuLAkIjRHxpdeN3_yw1200leCL5LlB8jm-3aaFELb4vUG52QD7ulzZLmsKbl2DZXRUi8NWg2a2Y59gP-2RQKWCRbXOmXSiRiiH&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105584535724353009512\">Freddie Skitini</a>"
        ]
      },
      {
        "reference": "AciIO2fGP5s0GkpQj92660EDF3bR0dhldmFSKVAk3Rn7D8gVjmjHNEjY0CiFAm5Wl5CBFOxVFn3HWKYq9q0IWD0TfxBkywmqgw2qzhfZNhxXSVmXy4EomMYrvgJz3kdn6zSeTtJ9g9H4n_5o29kTTdegj4xygu4bBB0bM9hZNJZfhx0PgHBaMJVUHjysw61SDD7ZSfoZsxkNSJjiIeDoMQgK8F0rmDczC8qrY6_CNeL3aRMi9OBfV2nJ2g8KkzM28aD81Xz__FBapWg3-7a5mga3qcV8-xD5DnAgT_wybklh0rgnUg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fGP5s0GkpQj92660EDF3bR0dhldmFSKVAk3Rn7D8gVjmjHNEjY0CiFAm5Wl5CBFOxVFn3HWKYq9q0IWD0TfxBkywmqgw1200qzhfZNhxXSVmXy4EomMYrvgJz3kdn6zSeTtJ9g9H4n_5o29kTTdegj4xygu4bBB0bM9hZNJZfhx0PgHBaMJVUHjysw61SDD7ZSfoZsxkNSJjiIeDoMQgK8F0rmDczC8qrY6_CNeL3aRMi9OBfV2nJ2g8KkzM28aD81Xz__FBapWg3-7a5mga3qcV8-xD5DnAgT_wybklh800rgnUg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/115215616274338248382\">Grasso</a>"
        ]
      },
      {
        "reference": "AciIO2cymRLuGJ70y-sGYfjaWgPHOHffV3p5YHsecYWGGZBrgNTc2hn9wfNRB1qQmmkiYVH_rieesdjJ6t9W6dKljm_qOatth3RbaJMjQTk5r0u7mWmJE9aU7cjKbQ2q0RYM7r9Ygyodv8IeOPjNlTczdeJV0X2KMTBWDi5cwn3ObU1rEZ0fbv--WfUuQBLOsdNl2U7lGEi63dIizIlmwjO_YLfNNQK5X7ypsl7109X9gXzZSA5Okrdw3xQhD6odJ4tr-ddT9f2vGYlY5Z_BrmIUFfWm3Nf7sVwOSl1A5YUw-I_M-TckiIggoth7y2Plc-LoFbQdI8qjOXw4-_5Ms3Cz0qDo2t565doWTnm14WijcPsKWQOZFVmOT6oamqTzdJZ31smDXuSdzGNyHiIJhQaXzegmEqH_Yr8WGHVrMcbj5iV7Fq8yK-KTnJHnbmvOPsfI",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cymRLuGJ70y-sGYfjaWgPHOHffV3p5YHsecYWGGZBrgNTc2hn9wfNRB1qQmmkiYVH_rieesdjJ6t9W6dKljm_qOatth800RbaJMjQTk5r0u7mWmJE9aU7cjKbQ2q0RYM7r9Ygyodv8IeOPjNlTczdeJV0X2KMTBWDi5cwn3ObU1rEZ0fbv--WfUuQBLOsdNl2U7lGEi63dIizIlmwjO_YLfNNQK5X7ypsl7109X9gXzZSA5Okrdw1200xQhD6odJ4tr-ddT9f2vGYlY5Z_BrmIUFfWm3Nf7sVwOSl1A5YUw-I_M-TckiIggoth7y2Plc-LoFbQdI8qjOXw4-_5Ms3Cz0qDo2t565doWTnm14WijcPsKWQOZFVmOT6oamqTzdJZ31smDXuSdzGNyHiIJhQaXzegmEqH_Yr8WGHVrMcbj5iV7Fq8yK-KTnJHnbmvOPsfI&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108406583294628813584\">Sameera</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Ifeoma Olisa Parkinson",
        "rating": 5,
        "text": "I never ever leave reviews but I had to after my experience at Grasso yesterday with my mum. We were running late due to traffic delays and they were super understanding about it. The food was incredible, with huge portion sizes and lovely atmosphere/music! The staff were really friendly too. I would honestly recommend this to everyone!",
        "time": 1759687881,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Hiren Karia",
        "rating": 5,
        "text": "Really lovely Italian-American restaurant. The Mozzarella Bites were the best I've ever had, as a vegetarian they were able to accommodate doing it not on top of the Nduja sauce and keeping it on the side. It had a good amount of Mozzarella and the hot honey twist was incredible. The pizza tasted New York style with a crispy base and a good amount of sauce on the pizza. We celebrated a birthday and the staff were incredible in assisting with candles, plates for a cake that was bought in from outside. I highly recommend and will be going back.",
        "time": 1759761129,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Larlaru",
        "rating": 5,
        "text": "Very nice restaurant with indoor and outdoor seating. We arrived at around 20:15 on a Friday night and only sat down at 21:00 so definitely book in advance. The vibe was chill so we didn’t mind waiting. The service was very quick and the food also arrived quite quickly. Everything was delicious - the sauce was a 10/10.",
        "time": 1755337565,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Jess Wickett",
        "rating": 5,
        "text": "Grasso is stunning. The staff were all so friendly, attentive, made us feel welcome, the atmosphere was lively yet not overpowering with loud noise or lights, and the food was so good! We had the mozzarella sticks (recommend to share this as the portion is very generous) and I regret not filming a cheese pull because these things kept going! I had the lamb ragu and it was incredibly tender, very well portioned and tasty! We finished by sharing a cheesecake (also recommended as the portion was generous!), tasted so fresh with a very subtle hint of lemon and not too sweet.\n\nWe came to celebrate my graduation and the staff made the effort to congratulate me and put little candles in the cheesecake which was a lovely touch.\n\nAbsolutely will be coming here again!",
        "time": 1758660713,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Nadine Jalanbo",
        "rating": 4,
        "text": "We absolutely loved our experience at Grasso! The staff was incredibly friendly and welcoming, creating such a warm and inviting atmosphere. The ambiance was charming, and the food… simply outstanding.\nWe started with the mozzarella sticks—crispy on the outside, perfectly cheesy on the inside—absolutely delicious. The chicken parm was phenomenal, with tender, juicy chicken and rich, flavorful sauce. And the pizza, A true standout—fresh, flavorful, and baked to perfection. We can’t wait to come back",
        "time": 1755012579,
        "relative_time_description": "2 months ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 4,
    "fsa_rating_text": "4",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1706383",
    "fsa_last_inspection": "2025-08-07T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:20.379Z",
    "lastVerifiedFSA": "2025-10-16T23:15:16.537Z",
    "createdAt": "2025-10-15T10:53:20.379Z",
    "updatedAt": "2025-10-16T20:24:14.027Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Grasso — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_grasso_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.429Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Grasso",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "81 Dean St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 3330
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/grasso-VxepVY0I",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/grasso-VxepVY0I/italian-grasso-VxepVY0I-card-60f3a8a6.webp",
    "image_hero_path": "/images/restaurants/grasso-VxepVY0I/italian-grasso-VxepVY0I-hero-14c7c12d.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJj99O4ScddkgRNnDfPFxdplY",
    "slug": "gloria-fPFxdplY",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJj99O4ScddkgRNnDfPFxdplY",
    "name": "Gloria",
    "description": "Where traditional European techniques meet contemporary innovation. This Central London spot serves up modern european cuisine that's sophisticated, creative, and absolutely memorable. With ratings this high, it's no ...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 20227,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "54-56 Great Eastern St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "54-56 Great Eastern St, London",
    "postcode": "EC2A 3QR",
    "borough": "Central London",
    "lat": 51.5251266,
    "lng": -0.0813541,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.bigmammagroup.com/italian-restaurants/gloria-london?utm_source=google&utm_medium=organic&utm_campaign=mybusiness-website",
    "url": "https://maps.google.com/?cid=6243780584135422006",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Tuesday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Wednesday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Thursday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Friday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Saturday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Sunday: 12:00 – 4:15 PM, 5:15 – 10:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1615"
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
            "time": "1715"
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
            "time": "1715"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1530"
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
            "time": "1715"
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
            "time": "1715"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1615"
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
            "time": "1715"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1615"
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
            "time": "1715"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1615"
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
            "time": "1715"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2eDP8liuPUc5i2_DVzNGWsZcuy5yPXvUi1rx47JktvzsU9GoV6KobZxb6e9ggWC71vng4LldybZaB883Xkiro6UcPT2sGtU0tm0IbuOuTHRtudsSDh5m0TcnSGJOdnBPaSa-cC9HOqjL35ZdBHOzrgq8mHjnG-k6NJyIBMyESYYSC7HW-c3nNNrZn9t8INXN5aWC-46YNeX6B8062xWwYSUC-XO3aowdP4tAirLTUwOW5uRlNloHNoOylv2lsZYLN3H9iqFBvqNByqqPKo-nWs0nRZ7RWpHMqQLwFLloBlz0mQFO0vR3Gu3yEbjHl9bTLPDQPLegF9rwkX7c2qJXwtQfkfrVeIJ-cDEzmbFX_fcvmG_N6PIY93YHt-NcRyYhUxujMiaBhxG2zvkBxfE3_fT217XcGu6QSAqIML_pJE",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eDP8liuPUc5i2_DVzNGWsZcuy5yPXvUi1rx47JktvzsU9GoV6KobZxb6e9ggWC71vng4LldybZaB883Xkiro6UcPT2sGtU0tm0IbuOuTHRtudsSDh800m0TcnSGJOdnBPaSa-cC9HOqjL35ZdBHOzrgq8mHjnG-k6NJyIBMyESYYSC7HW-c3nNNrZn9t8INXN5aWC-46YNeX6B8062xWwYSUC-XO3aowdP4tAirLTUwOW5uRlNloHNoOylv2lsZYLN3H9iqFBvqNByqqPKo-nWs0nRZ7RWpHMqQLwFLloBlz0mQFO0vR3Gu3yEbjHl9bTLPDQPLegF9rwkX7c2qJXwtQfkfrVeIJ-cDEzmbFX_fcvmG_N6PIY93YHt-NcRyYhUxujMiaBhxG2zvkBxfE3_fT217XcGu6QSAqIML_pJE&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100828409030526804408\">Jackie Hamilton-Smith</a>"
        ]
      },
      {
        "reference": "AciIO2eFGb0p65_hSrsbarHoYUVEd6R-ureZvk2qWgLPl2O8ZBtZzi1iPTB_ykVQ7kVbDm1Y9x7XrqzG6yD6TwIlpOGUO7suiV227a0fKgY81VParxBdrxUjKqsw_Dx8yyf0lfHMO3LKf1e_dnLspJOPf5vqCbt7B3mTjXDppeGBAA1RvSzV-oMKFneBUr1uMCtt4rzGEc1KvtfXq9NrxUNpgZ1yDM6j3gwTkWHPJf5p0hljHEgkj3FhR0Jvt_ueDWIzG8YQ1KXxiP6J-fojupRq5ZvwXPC1I10vQVAErlmqIswbOLdigp8zxflbUl-M6Z6Z5BskfeIETsPyk0E58avZV8i4m-Ud4iRfJ2XKO4Vpvt65gsXhTnHRC4bpIxlfJKksFbf1zEXZRjtiRNKtr3q4FDRZ-mvfXv0vUW9C2r96NsEw7tMqy59vFxaYj3eCOF4T",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eFGb0p65_hSrsbarHoYUVEd6R-ureZvk2qWgLPl2O8ZBtZzi1iPTB_ykVQ7kVbDm1Y9x7XrqzG6yD6TwIlpOGUO7suiV227a0fKgY81VParxBdrxUjKqsw_Dx8yyf0lfHMO3LKf1e_dnLspJOPf5vqCbt7B3mTjXDppeGBAA1RvSzV-oMKFneBUr1uMCtt4rzGEc1KvtfXq9NrxUNpgZ1yDM6j3gwTkWHPJf5p0hljHEgkj3FhR0Jvt_ueDWIzG8YQ1KXxiP6J-fojupRq5ZvwXPC1I10vQVAErlmqIswbOLdigp8zxflbUl-M6Z6Z5BskfeIETsPyk0E58avZV8i4m-Ud4iRfJ2XKO4Vpvt65gsXhTnHRC4bpIxlfJKksFbf1zEXZRjtiRNKtr3q4FDRZ-mvfXv0vUW9C2r96NsEw1200tMqy59vFxaYj3eCOF4T&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116807972864925170139\">Mitch Verlaan</a>"
        ]
      },
      {
        "reference": "AciIO2euvvVfFlSXRaRo0RY3bX-vtz4VjpUGjpEtgfB-bozaQiv9qqV3jVR_gcsd0R11XnajwYKxeL0Lc4mJ0ZOEzi-w9sdutAZ98DrqqPizsg6y97W0PI94WuH_gSS89z49LLc23oA95rmFMInRSXkwks3VLHNcxfd0q4aIl6NsxQTSkCz33d6N5Dk1o7uOA_P5EhkFk6rDBwUxM2rXvNuVgTmvLRPkYuhNfSY7RMBS7lJVTHr57ppj9B1Htt3KAq8QZ1hC_xIar1BtNNBW97T7wE184LpO6DTjGXq8XSek-PJgcdYZJKxL86_RNyif3xj9sr29Sj6AbGbSyS0lWzQ2ALb9MKotJyg7aN9TSO3Ry_hisCJ58xGzTjFhuBGgHtZtRPdmsMeYnmgZMLbFZbMNLJWIZMpVACuFgDAUdB0s9iID9w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2euvvVfFlSXRaRo0RY3bX-vtz4VjpUGjpEtgfB-bozaQiv9qqV3jVR_gcsd0R11XnajwYKxeL0Lc4mJ0ZOEzi-w1200sdutAZ98DrqqPizsg6y97W0PI94WuH_gSS89z49LLc23oA95rmFMInRSXkwks3VLHNcxfd0q4aIl6NsxQTSkCz33d6N5Dk1o7uOA_P5EhkFk6rDBwUxM2rXvNuVgTmvLRPkYuhNfSY7RMBS7lJVTHr57ppj9B1Htt3KAq8QZ1hC_xIar1BtNNBW97T7wE184LpO6DTjGXq8XSek-PJgcdYZJKxL86_RNyif3xj9sr29Sj6AbGbSyS0lWzQ2ALb9MKotJyg7aN9TSO3Ry_hisCJ58xGzTjFhuBGgHtZtRPdmsMeYnmgZMLbFZbMNLJWIZMpVACuFgDAUdB0s9iID9w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111550869559637314842\">Rang</a>"
        ]
      },
      {
        "reference": "AciIO2ehQrb7M2qs8G-oNr-EAS-ZayWRa5Rf8numz9nh8H6eSSeRTLX2Ft1sp88Zhjwvaina9_0PXCQoHwwnLyFhzkcXPFRr6QhTPn_zv7Rum1GJfr_BFRk9iKOTOyIvmO1giE3XEcTaK7Se4GrWBjLnJ7le4FVBKJg7Ymd8KfMivsGaNozBCDSSUIRHr56IWEDxtpPt-vVmIZemyiMgqQ5bsq4rjpaKbasf0k6vak4TZDAjWsjG4towfGuquSuXA0LswThuQXI_2bv_13VWQ0dthrUEtR_a___iAfmlLdvWBQg_oioA2a2YGM5suzW9l8ti8gVnaYi5SCSw_Qk3YF9CNNDuBAchRS3FrI0onuvqoht-ciAWg1gomZfVT-WXsQMOtdNJTGau0SHlgYDJXHNESknnSuAlwK4TDidEw3QGYai46YcQ-TBv-cw5pWvz-w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ehQrb7M2qs8G-oNr-EAS-ZayWRa5Rf8numz9nh800H6eSSeRTLX2Ft1sp88Zhjwvaina9_0PXCQoHwwnLyFhzkcXPFRr6QhTPn_zv7Rum1GJfr_BFRk9iKOTOyIvmO1giE3XEcTaK7Se4GrWBjLnJ7le4FVBKJg7Ymd8KfMivsGaNozBCDSSUIRHr56IWEDxtpPt-vVmIZemyiMgqQ5bsq4rjpaKbasf0k6vak4TZDAjWsjG4towfGuquSuXA0LswThuQXI_2bv_13VWQ0dthrUEtR_a___iAfmlLdvWBQg_oioA2a2YGM5suzW9l8ti8gVnaYi5SCSw_Qk3YF9CNNDuBAchRS3FrI0onuvqoht-ciAWg1gomZfVT-WXsQMOtdNJTGau0SHlgYDJXHNESknnSuAlwK4TDidEw1200QGYai46YcQ-TBv-cw5pWvz-w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101190363918328687405\">Starry Shi</a>"
        ]
      },
      {
        "reference": "AciIO2cdQ90Hvb_7egYPXGJkLcXILXz-GqdisKyJmuWvOLcFqF9EPeMsGkig89bhHbak7i09P45acr_Rgcypv_oRkSugqm7kcgdz4pt24yXLfPQXjTEAmIP8tXjdQrudyDFqKfBIpEdfBYFXbGGxJVJrKfxM0bZmawpYVeKmgr7m5alOJH4n_Cf-Y-2dD5ECh0PvtW3KZxJLWWdrEhBmJSi4A4kFxBlwjMb_G-TxBwWTaaHboNu_ETZRpAMSmqWGzbBcs6ZmfBcdYyuPxQd5LoHZLs95XxuLK_rHaoMgHmXxY4pj03rgZ6MnFXcWi2vMiw3SIEN-HRcuWNvqYWt-dDsSmMWAxXmPehiCWgijB1S258ylMQ2vhjBUOmnvzkR0W36TBM1GUGCuOZ9pLBHWI0tDFyLlufNzez0hAJ_ghbYfRTXRo2GQdFAY_CuKk--PiHiT",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cdQ90Hvb_7egYPXGJkLcXILXz-GqdisKyJmuWvOLcFqF9EPeMsGkig89bhHbak7i09P45acr_Rgcypv_oRkSugqm7kcgdz4pt24yXLfPQXjTEAmIP8tXjdQrudyDFqKfBIpEdfBYFXbGGxJVJrKfxM0bZmawpYVeKmgr7m5alOJH4n_Cf-Y-2dD5ECh800PvtW3KZxJLWWdrEhBmJSi4A4kFxBlwjMb_G-TxBwWTaaHboNu_ETZRpAMSmqWGzbBcs6ZmfBcdYyuPxQd5LoHZLs95XxuLK_rHaoMgHmXxY4pj03rgZ6MnFXcWi2vMiw1200SIEN-HRcuWNvqYWt-dDsSmMWAxXmPehiCWgijB1S258ylMQ2vhjBUOmnvzkR0W36TBM1GUGCuOZ9pLBHWI0tDFyLlufNzez0hAJ_ghbYfRTXRo2GQdFAY_CuKk--PiHiT&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113261603305952029037\">Scarlett Guo</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "O G",
        "rating": 4,
        "text": "We came here for my husband’s birthday and had such a lovely evening! The atmosphere was calm and romantic with low lighting, even though it was busy. The pasta and pizza were delicious, and the food overall was really tasty. Our server was super friendly and made the night feel extra special. Highly recommend!",
        "time": 1758999138,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Vix Brand",
        "rating": 5,
        "text": "My partner and I have been a handful of times and thd food is always amazing. Today we had wonderful service! We were well looked after by the server Gervasio for my partners birthday meal. Food was amazing and they were super attentive and caring towards a friend who has a few severe allergies. Our food did take a short while to come out but we deduced this might be due to the kitchen doing a full clean down for our friend with allergies before cooking their meal. Thank you so much we will absolutely be back again!",
        "time": 1759689776,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Methmamo",
        "rating": 5,
        "text": "The atmosphere was superb. A big wow!!!\nBased on our experience on fancy-decor restaurants that we have been, the foods did not strikingly impress us. But the foods here are exceptional. Perfectly cooked pastas. Intense flavors. Tiramisu and Cheesecake are  a must-try.   Probably placing this as my no.1 in category of Italian restaurants in London so far.",
        "time": 1756860014,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Magnus",
        "rating": 5,
        "text": "Amazing dinner at Gloria! The food was delicious, the atmosphere warm and lively, and the service very personal. Our waiter was friendly and attentive, making the whole evening even better. Highly recommend for anyone who enjoys great Italian food and a welcoming vibe.",
        "time": 1759741250,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Tania McMillan",
        "rating": 5,
        "text": "Visited Gloria for a friend's birthday dinner, and we had a lovely meal. Our server Rebecca really looked after us, making us feel very welcome and at home, and happy to make recommendations and explain different dishes and cocktails to us. The focaccia to mop up stracciatella was a delight as were the veal croquettes. Our main of truffle malfadine, served from a pecorino wheel, was tasty but very filling, meaning we could sadly not manage dessert, but we did have some great digestifs to compensate. The atmosphere was buzzing and leafy settings very pretty. My only gripe would be that the lighting was turned down low very early in the evening - I saw several diners switching on their phone lights to read the menu - but overall we had a great time and would be keen to dine in their other venues.",
        "time": 1759077825,
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
    "fsa_rating_text": "5",
    "fsa_authority": "Hackney",
    "fsa_url": "https://ratings.food.gov.uk/business/653655",
    "fsa_last_inspection": "2023-07-28T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:20.709Z",
    "lastVerifiedFSA": "2025-10-16T23:15:18.157Z",
    "createdAt": "2025-10-15T10:53:20.709Z",
    "updatedAt": "2025-10-16T20:24:14.321Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Gloria — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_gloria_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.429Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Gloria",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "54-56 Great Eastern St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 20227
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/gloria-fPFxdplY",
      "openingHours": [
        "Monday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Tuesday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Wednesday: 12:00 – 3:30 PM, 5:15 – 10:30 PM",
        "Thursday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Friday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Saturday: 12:00 – 4:15 PM, 5:15 – 11:00 PM",
        "Sunday: 12:00 – 4:15 PM, 5:15 – 10:30 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/gloria-fPFxdplY/italian-gloria-fPFxdplY-card-9d110a4a.webp",
    "image_hero_path": "/images/restaurants/gloria-fPFxdplY/italian-gloria-fPFxdplY-hero-7ecebae3.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJpatnEFEFdkgRAZyMCqb9oIE",
    "slug": "doppo-MCqb9oIE",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJpatnEFEFdkgRAZyMCqb9oIE",
    "name": "Doppo",
    "description": "A celebration of European culinary heritage with a modern twist. This Central London gem proves that modern european cuisine can be both traditional and innovative. With ratings this high, it's no wonder locals keep c...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 681,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "33 Dean St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "33 Dean St, London",
    "postcode": "W1D 4PW",
    "borough": "Central London",
    "lat": 51.51368069999999,
    "lng": -0.1323908,
    "phone": "020 7183 2100",
    "phone_international": "+44 20 7183 2100",
    "website": "https://www.instagram.com/dopposoho/",
    "url": "https://maps.google.com/?cid=9340744516749794305",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 12:00 – 11:30 PM",
        "Wednesday: 12:00 – 11:30 PM",
        "Thursday: 12:00 – 11:30 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
        "Sunday: 12:00 – 5:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1700"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2330"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2330"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2330"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2330"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2330"
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
        "reference": "AciIO2ekKj6Y9YLdtK5kYgZWQi2H1owlOlxBllC83z8H76ltV1Cn6DUacOV3GKfSgVAdA-ehYmyahfKu_055lpbYsBAhzfadaFOTMrOdrdX5BOV_nBh9k8rf5iFLxoR3PCjDVHAnfKgkfENUJIaKWzUKHgtozXaJAE6ujeZrpmtgbtXLIedPve6FijPeJSvVr3LEzdTJrOR2vwXufBUABSmyAqQVp1m4klXVIgYnbFon1OmLeD_825bI2pZC3Y9bH6AenZTGa9c65zNrfvGpcRdt-Hx0TyLQZhbk0NNaYy99iRo",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ekKj6Y9YLdtK5kYgZWQi2H1owlOlxBllC83z8H76ltV1Cn6DUacOV3GKfSgVAdA-ehYmyahfKu_055lpbYsBAhzfadaFOTMrOdrdX5BOV_nBh800k8rf5iFLxoR3PCjDVHAnfKgkfENUJIaKWzUKHgtozXaJAE6ujeZrpmtgbtXLIedPve6FijPeJSvVr3LEzdTJrOR2vwXufBUABSmyAqQVp1m4klXVIgYnbFon1OmLeD_825bI2pZC3Y9bH6AenZTGa9c65zNrfvGpcRdt-Hx0TyLQZhbk0NNaYy99iRo&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116740927479435838288\">Doppo</a>"
        ]
      },
      {
        "reference": "AciIO2ctGcNTJpGOXUssAA3qBdsLGpDAMvYlb1xW12RlOrS8EXFyVPblir_hsu2m5c_52YF7L9yhvIy4MKccAJbG5Z1DUBZjmNolBWnf_1qoCrhzXcG2Rr3RIKdUpwVLJXLCFyvZGwPBd9v0K2iBnbAjqLOwAUHNOtDe_ryESo83fjMiU8bPnE3LnFZDB6c61Ro-AeED6ZmDa57YFqRtO3d-p2RXQinW3iyVad9Sbj799uRkBT872PUataz4W9GH2aL805A36AWoyDV8kS0JOyf1W4fd9VIO5Z7V2YzIt0DILGI",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ctGcNTJpGOXUssAA3qBdsLGpDAMvYlb1xW12RlOrS8EXFyVPblir_hsu2m5c_52YF7L9yhvIy4MKccAJbG5Z1DUBZjmNolBWnf_1qoCrhzXcG2Rr3RIKdUpwVLJXLCFyvZGwPBd9v0K2iBnbAjqLOwAUHNOtDe_ryESo83fjMiU8bPnE3LnFZDB6c61Ro-AeED6ZmDa57YFqRtO3d-p2RXQinW3iyVad9Sbj799uRkBT872PUataz4W9GH2aL805A36AWoyDV8kS0JOyf1W4fd9VIO5Z7V2YzIt0DILGI&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116740927479435838288\">Doppo</a>"
        ]
      },
      {
        "reference": "AciIO2cj0ARQe2k91yrHBcV-pRpWsitL8TZFsIxnsGW4-iPqp7NXwhk4sKrBEzcC_0121HK8GkDXfbjyQrQmUsg5ncEoU-8isPxyk7bSdSj4p7tLVlws7oN6SyDN97UqFm6RN1ZIvB_OpKda963gM4JOt6Nh76IzGlmuq5xiVYvNRIt3JcA5HNkeT43b0qK041vS5j7kTzA9X_oBB5tnh23kqMfX7ZFHg2Qzuo2UVHTvQKkOLk12wED0KgL_Y2KmPGJnwH2p4oAUg7b0QixY97GpQX01WIr2iu_Akn-mwwXoI_w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cj0ARQe2k91yrHBcV-pRpWsitL8TZFsIxnsGW4-iPqp7NXwhk4sKrBEzcC_0121HK8GkDXfbjyQrQmUsg5ncEoU-8isPxyk7bSdSj4p7tLVlws7oN6SyDN97UqFm6RN1ZIvB_OpKda963gM4JOt6Nh800IzGlmuq5xiVYvNRIt3JcA5HNkeT43b0qK041vS5j7kTzA9X_oBB5tnh23kqMfX7ZFHg2Qzuo2UVHTvQKkOLk12wED0KgL_Y2KmPGJnwH2p4oAUg7b0QixY97GpQX01WIr2iu_Akn-mwwXoI_w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116740927479435838288\">Doppo</a>"
        ]
      },
      {
        "reference": "AciIO2cNrYLyZwGG0MzpTANXTVkOpKXGSgcIMfW0QrVF-DMRa53pX5YWlLkGoQnncV24UxAUfH6d1q75DJc2OIz8zA9XM4mKdhbccZ16KaOWjB2YMkhc2xOucZ-7ohqZ8OBOiKLtvDPdxyoZNhThWzh63Vj0daZCZC0Q7J3fXhpK47JECQoX8zps33jym7jsanPhSZf3bjQxTrPM0Hz6D_CncHQU6GyYyUlOdMnmD5YTQm0aPGsYiuktPGAp3J4gwS-d2oY6MlioT3720spOvKYVN1w_Cn_u4km2HLH70e2lNqY",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cNrYLyZwGG0MzpTANXTVkOpKXGSgcIMfW0QrVF-DMRa53pX5YWlLkGoQnncV24UxAUfH6d1q75DJc2OIz8zA9XM4mKdhbccZ16KaOWjB2YMkhc2xOucZ-7ohqZ8OBOiKLtvDPdxyoZNhThWzh800Vj0daZCZC0Q7J3fXhpK47JECQoX8zps33jym7jsanPhSZf3bjQxTrPM0Hz6D_CncHQU6GyYyUlOdMnmD5YTQm0aPGsYiuktPGAp3J4gwS-d2oY6MlioT3720spOvKYVN1w_Cn_u4km2HLH70e2lNqY&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116740927479435838288\">Doppo</a>"
        ]
      },
      {
        "reference": "AciIO2cM17D8pCJ8KaMKiMhW-h5PylChbaWMrTGsDcfXK1Jv-wmrBtuj6IymMdKCDukAHzdLEs7HhYFNezJsLVPTx0o0aDcKOie_S-tmjg8CQRedeZs9zqaAKF_-MPLXxSXAu8-8UwYiiZC7PQltFjN4QNuMTecUdb-e89ub3FL2SrhVCRVJebn3OT-w7Y3_bgBdcId21Uwlo7ZXpHHs6p4Yokss8gbhh9LiYjaG4WJnE7Q88iVZiEtMreDcqdRE1kjnewoWMAMIpRiZ3YALK777f_JyDtGEjKWw9f-aDJ5S-Gc",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cM17D8pCJ8KaMKiMhW-h800PylChbaWMrTGsDcfXK1Jv-wmrBtuj6IymMdKCDukAHzdLEs7HhYFNezJsLVPTx0o0aDcKOie_S-tmjg8CQRedeZs9zqaAKF_-MPLXxSXAu8-8UwYiiZC7PQltFjN4QNuMTecUdb-e89ub3FL2SrhVCRVJebn3OT-w1200Y3_bgBdcId21Uwlo7ZXpHHs6p4Yokss8gbhh9LiYjaG4WJnE7Q88iVZiEtMreDcqdRE1kjnewoWMAMIpRiZ3YALK777f_JyDtGEjKWw9f-aDJ5S-Gc&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116740927479435838288\">Doppo</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Katie Reid",
        "rating": 5,
        "text": "Had a lovely meal here this weekend for my birthday. Service was lovely, very friendly and made good recommendations for the food and wine. A few times we were waiting a little longer than we’d have liked to be asked/served a drink but this didn’t spoil our experience.\n\nThe special truffle pasta and lamb cutlets were lovely, and the complimentary drink on arrival was a nice touch.",
        "time": 1753640062,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "D W",
        "rating": 5,
        "text": "Had a fantastic Sunday lunch at Doppo. We came for the Sunday roast - it was genuinely one of the best I've had.\nRich, perfectly cooked, and full of flavour. The portions were very generous, we definitely left fuller than expected!\nWhat really made the experience stand out was the service. Our waitress and the sommelier were both incredibly friendly.",
        "time": 1754336796,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Nika Strelnikova",
        "rating": 5,
        "text": "A very small and cozy restaurant. Perfect for a date in the evening or for a family gathering on the weekend.\nOffers a set menu on Sunday, with a choice of 3 starters (we went for anchovies and burrata) and a roast which is served  with broccoli and potatoes.\n\nAmazing desserts and wine selection offering 700+ wines.\nStrongly recommend.",
        "time": 1756146255,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Sara Boesen",
        "rating": 5,
        "text": "I cannot say enough good things about Doppo! The hospitality and food are unmatched, rivaling that of a Michelin-starred experience (with a cozier atmosphere). Emilia, the owner, is beyond thoughtful, making sure each of her guests is taken care of, from welcome drinks to finishing the evening off with a sweet dessert wine - offering non-alcoholic options too. While I don't personally drink, Beppe, Doppo's in-house sommelier, provided endless knowledge for my wine drinking friends. And Doppo is no joke in the wine department; they've won several prestigious wine awards.\n\nOur dinner's standout tastes included the locally sourced burrata, arancini, pappardelle ragu, tiramisu, and the bread - St. JOHN sourdough no less. If you have allergy restrictions, give the restaurant a heads up and they'll do their best to accommodate. We will definitely be back again. I cannot recommend a better place to catch up with friends, celebrate a job promotion, have a date night, or even host an event (on their second floor overlooking Dean Street). Doppo is one to watch!",
        "time": 1741108079,
        "relative_time_description": "7 months ago"
      },
      {
        "author_name": "Darrell Tuttle",
        "rating": 5,
        "text": "The food was excellent.  Service got us to our show on time while never feeling rushed.  My favorite was the extensive wine list paired with a fantastic sommelier.",
        "time": 1758650256,
        "relative_time_description": "3 weeks ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 4,
    "fsa_rating_text": "4",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1537476",
    "fsa_last_inspection": "2025-04-29T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:42.805Z",
    "lastVerifiedFSA": "2025-10-16T23:15:32.868Z",
    "createdAt": "2025-10-16T20:23:42.805Z",
    "updatedAt": "2025-10-16T20:24:16.978Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Doppo — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_doppo_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.430Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Doppo",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "33 Dean St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 681
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/doppo-MCqb9oIE",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 12:00 – 11:30 PM",
        "Wednesday: 12:00 – 11:30 PM",
        "Thursday: 12:00 – 11:30 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
        "Sunday: 12:00 – 5:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/doppo-MCqb9oIE/italian-doppo-MCqb9oIE-card-3797d34f.webp",
    "image_hero_path": "/images/restaurants/doppo-MCqb9oIE/italian-doppo-MCqb9oIE-hero-a6077ffd.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJNWlwNBgRdkgRj-WJmjibnCw",
    "slug": "osteria-napoletana-JmjibnCw",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJNWlwNBgRdkgRj-WJmjibnCw",
    "name": "Osteria Napoletana",
    "description": "Area-sourced Neapolitan-style eats & an ample wine list in a cool eatery featuring outdoor seating.",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 3425,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "186 Kensington Park Rd, Notting Hill, ES",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "186 Kensington Park Rd, Notting Hill, ES",
    "postcode": "W11 2ES",
    "borough": "Central London",
    "lat": 51.515434,
    "lng": -0.2054763,
    "phone": "020 7221 0154",
    "phone_international": "+44 20 7221 0154",
    "website": "https://osterianapoletana.co.uk/",
    "url": "https://maps.google.com/?cid=3214614901448893839",
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
        "reference": "AciIO2fpy4PGeS5eJwt-dapces55XPghHTAqYs5yG-OjHewMp_39LFACxyV4pzfFusNGS6pwdWzKVx9EiWqxQGwigJfBwbqaxuV4jGWJhA8zLM3MmNiuWRtDuvz58Pg9r0olBaNSxf4h1j8UrUWZqV-X0WpzzYeV5TmzBtS4TcoH3N5rRc4GR-VXgz6eddwDopehxo70Glvc_pRQqBcpk6NEZWNlHWqtkFllN9RrsJ8pfe0fjm8ggg5UER-k_cIqlNENpOfPgXKvs2nxfHesL3AwuXNH29O4eo025FjwSoq-oDCd0gxJ_4crU-7qy72Xldl0oimjLSb8IVgf9OazDeiDtZ0sAHj8-J1uHPXowewb5AF5VkPHV9T5gyjJZFhVDrCmrpjUxNRfyIH5C36OL7IaUpWHiLBswdkbVp6YtAoI8F0Zh76L",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fpy4PGeS5eJwt-dapces55XPghHTAqYs5yG-OjHewMp_39LFACxyV4pzfFusNGS6pwdWzKVx9EiWqxQGwigJfBwbqaxuV4jGWJhA8zLM3MmNiuWRtDuvz58Pg9r0olBaNSxf4h800j8UrUWZqV-X0WpzzYeV5TmzBtS4TcoH3N5rRc4GR-VXgz6eddwDopehxo70Glvc_pRQqBcpk6NEZWNlHWqtkFllN9RrsJ8pfe0fjm8ggg5UER-k_cIqlNENpOfPgXKvs2nxfHesL3AwuXNH29O4eo025FjwSoq-oDCd0gxJ_4crU-7qy72Xldl0oimjLSb8IVgf9OazDeiDtZ0sAHj8-J1uHPXowewb5AF5VkPHV9T5gyjJZFhVDrCmrpjUxNRfyIH5C36OL7IaUpWHiLBswdkbVp6YtAoI8F0Zh76L&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104137573270893061064\">Lorena Salgado</a>"
        ]
      },
      {
        "reference": "AciIO2c7AEfbML9Sd_SWZOWi2e__Gl58VDedgkq5bChA8wI30zoRJiUH-hfatkTU9sYNlMkwi3CigCdgOpSMfZN0vLBVj03iC1r5WH-VuguYNYuWc0PFYuxf_oOvEYYyg4-Y1JzF6MuJCzQtYJTQpdMeDH7YFE6FDtssZS0pIIt0mFeIsIXEdJdJttthyExC-t9mXcdHxOyUO3llExDLy5s8d6tKK5Cin3bEBnFgKOARpvkBM6pRW2xkB1JkVEVnnb-YmegnVfmI5KH5THdZEX1nzfKf7oG518dvCuqZdFl1OvRseQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c7AEfbML9Sd_SWZOWi2e__Gl58VDedgkq5bChA8wI30zoRJiUH-hfatkTU9sYNlMkwi3CigCdgOpSMfZN0vLBVj03iC1r5WH-VuguYNYuWc0PFYuxf_oOvEYYyg4-Y1JzF6MuJCzQtYJTQpdMeDH7YFE6FDtssZS0pIIt0mFeIsIXEdJdJttthyExC-t9mXcdHxOyUO3llExDLy5s8d6tKK5Cin3bEBnFgKOARpvkBM6pRW2xkB1JkVEVnnb-YmegnVfmI5KH5THdZEX1nzfKf7oG518dvCuqZdFl1OvRseQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114509108354062702394\">Osteria Napoletana</a>"
        ]
      },
      {
        "reference": "AciIO2d1GQjSOkLyZ2hv0poOvUh54UyU85tEALjsPaSuPk1o-dmk6lc6kT9DmufGJmBcvVpaigXDM0zJiB0-cztTGo9LYdQMlNbnFeov8nzJHoa0tUphOjGQWG6oec38Kw-xdSadYZtbn_Wgs7fZ6qjD_tBhIUslF7CzGA9PYsUryrd3OI3g4uipgJrk0PIjbNvTbwmmqrr0t5P0gW-vEx_8J633lUspTzesac58NZIAMG7fSpXvq1BwU0gR6vpw3D9dlYS_rP-HTxx8R7JO0pIpJKHxZ9rmy-sSyZGG6aSt8zxZhpPUc_EXtduMJrb85KQS0jXgnJHXsV1USQQjtxZmdbKMHgbJnz0d0rnILimrS4jWHt1lTxETez8gl9eFr-yCvGlOwxcVIqoKLMceikLpDfdMETxOU5iJzwAD--J5HgQWsL92ymQrMzTgQOt3fsO4",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d1GQjSOkLyZ2hv0poOvUh800UyU85tEALjsPaSuPk1o-dmk6lc6kT9DmufGJmBcvVpaigXDM0zJiB0-cztTGo9LYdQMlNbnFeov8nzJHoa0tUphOjGQWG6oec38Kw-xdSadYZtbn_Wgs7fZ6qjD_tBhIUslF7CzGA9PYsUryrd3OI3g4uipgJrk0PIjbNvTbwmmqrr0t5P0gW-vEx_8J633lUspTzesac58NZIAMG7fSpXvq1BwU0gR6vpw1200D9dlYS_rP-HTxx8R7JO0pIpJKHxZ9rmy-sSyZGG6aSt8zxZhpPUc_EXtduMJrb85KQS0jXgnJHXsV1USQQjtxZmdbKMHgbJnz0d0rnILimrS4jWHt1lTxETez8gl9eFr-yCvGlOwxcVIqoKLMceikLpDfdMETxOU5iJzwAD--J5HgQWsL92ymQrMzTgQOt3fsO4&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113194383547542257135\">Jens Loeffler</a>"
        ]
      },
      {
        "reference": "AciIO2fRmhtG4XmeLeMysUhjWtDLOfKLJ-TXvFlXHj4jLNNrtUbkDn2nxnLhQZUsu2rjxOc7ZFjODgHhWws8XrIKhlkdGomMj4nQjtSCfRbEVDPugbcTZ_aXAoXAjWFyAKPJotH2wK2IAnD83ZwTYhGTt3VGKceiLgbjBrtqVf7tmxPf2dBMAVLQol_9gNnF6v_hEdbQxdr9LrYjaGaslaIq1Wti3s4PUmaXKX2dOA4Px5bPkkYvXdQEkliSFI1SeZMqCAUQ4OD6MMBW6C9PT7xZWy5-0_OQjyTvw_a6dQ0sj8uofzyTXM3fjMV7thyq_b5cM4glIVE6ZpuMAlOpIB0futlRM8N4bTogIpRhTrfJkvFLX0i2DXFupcl1MjeS6DBfZQAiehZtinvh5tvdsVnq4c5H-Wn8b7_BEbsllxBNtWN_gNOd",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fRmhtG4XmeLeMysUhjWtDLOfKLJ-TXvFlXHj4jLNNrtUbkDn2nxnLhQZUsu2rjxOc7ZFjODgHhWws8XrIKhlkdGomMj4nQjtSCfRbEVDPugbcTZ_aXAoXAjWFyAKPJotH2wK2IAnD83ZwTYhGTt3VGKceiLgbjBrtqVf7tmxPf2dBMAVLQol_9gNnF6v_hEdbQxdr9LrYjaGaslaIq1Wti3s4PUmaXKX2dOA4Px5bPkkYvXdQEkliSFI1SeZMqCAUQ4OD6MMBW6C9PT7xZWy5-0_OQjyTvw_a6dQ0sj8uofzyTXM3fjMV7thyq_b5cM4glIVE6ZpuMAlOpIB0futlRM8N4bTogIpRhTrfJkvFLX0i2DXFupcl1MjeS6DBfZQAiehZtinvh800tvdsVnq4c5H-Wn8b7_BEbsllxBNtWN_gNOd&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105308717692649727884\">우정은</a>"
        ]
      },
      {
        "reference": "AciIO2eQiQak3WDI-qhp38-_Rhkj99ELF1eTuy6P0bc2TLXUvYZ_ZNXwFsGXrNESXweZjtpTK8LBS6Ms3aqwq9FNaAcFgpboX-eNjqY8Dp_OnAKaHAmLxbJaoLomZsUgv3ylWGEUBJvVAGSiNqjsBJ7D3QKzCcwyo6zkxL1tX-OQbiKlZWUwj7PQnVci_-f5qANJTbelp6tUf2xxmmmnuyzdYYo42-bHCXMUWwC9KAabXMPbaPUOOCbrAAJCufG3miSScvSxfBY6KJkgv5V6TW89S6Eg51R8pUqGFnmn2nBFI1yqM6FdvofTXFbWLjnB5PzhKCfzfyycQuPy2aLUSC8z8TxhlHuKElkdXKsbV-u0pLRKTRt9IaqksyV7hwA-jJJftC4FDvTuwVAyoO4tT6lMAKIujUifzsPKrsu36M-yEdeAfw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eQiQak3WDI-qhp38-_Rhkj99ELF1eTuy6P0bc2TLXUvYZ_ZNXwFsGXrNESXweZjtpTK8LBS6Ms3aqwq9FNaAcFgpboX-eNjqY8Dp_OnAKaHAmLxbJaoLomZsUgv3ylWGEUBJvVAGSiNqjsBJ7D3QKzCcwyo6zkxL1tX-OQbiKlZWUwj7PQnVci_-f5qANJTbelp6tUf2xxmmmnuyzdYYo42-bHCXMUWwC9KAabXMPbaPUOOCbrAAJCufG3miSScvSxfBY6KJkgv5V6TW89S6Eg51R8pUqGFnmn2nBFI1yqM6FdvofTXFbWLjnB5PzhKCfzfyycQuPy2aLUSC8z8TxhlHuKElkdXKsbV-u0pLRKTRt9IaqksyV7hwA-jJJftC4FDvTuwVAyoO4tT6lMAKIujUifzsPKrsu36M-yEdeAfw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100729880920568971269\">Dayoung Kim</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Edward Yue Shung Wong",
        "rating": 5,
        "text": "Lovely restaurant with delicious food! Make sure you book online, it requires a credit card to secure the booking on OpenTable.\n\nMattia was our waiter and absolutely lovely. He was very efficient and humorous too! I appreciated his help with the menu and it was a pleasure watching him masterfully mixing drinks!\n\nThe food was all lovely. The seafood was all done beautifully and not at all overcooked. All of the pasta was fresh and very tasty. Highly recommend the calzone, I loved the contrasting textures and how the tastes blended together beautifully in each bite! I thought that perhaps the salad could have done with a touch more salt, however it was a nice contrast to the other dishes. Note the other dishes were all seasoned wonderfully.\n\nWe particularly enjoyed the complimentary basket of bread. Really delicious selection and it had the perfect amount of sea salt. The tomatoes there were absolutely great, far beyond the normal ones you can get. Adds to the authentic feeling of this Italian restaurant!\n\nThe toilets are located downstairs. They are very clean and pleasant. It’s in keeping with the rest of the restaurant, which is well decorated both inside and out.\n\nIf you require one, there is a baby seat, it is located downstairs. I don’t believe there is a kids menu. The ragu is very good though and a good size for two young children to share (YMMV).\n\nPrices are a little high here, however you definitely get what you pay for! Highly recommend for anyone looking to treat themselves!",
        "time": 1756662404,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "DiAnne G",
        "rating": 5,
        "text": "Absolutely delicious! The pomodoro was authentic and full of flavor, but what really made the experience stand out was the special touch of having fresh basil cut right into the olive oil for dipping bread—simple, but unforgettable. The atmosphere was warm and welcoming, and every bite felt like a little trip to Naples. A truly lovely experience and a meal I’ll be thinking about long after London.",
        "time": 1757512148,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Ghass N",
        "rating": 5,
        "text": "A lovely family gathering at this cozy Italian restaurant. All the dishes were perfectly prepared and well cooked. I recommend the Paccheri alla Scorfano and La Parmigiana di Melanzane. My daughter loved the Pasta Ammiscata Patate e Provola. The service was excellent as well.",
        "time": 1754471719,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Clo",
        "rating": 5,
        "text": "WOW! 🤩 What a wonderful Neapolitan restaurant! Highly recommended! We had a stunning dinner for 2.\nEverything we ate was gorgeous. The atmosphere is nice.\nThe waiters were lovely with lots of little attentions (though we were sat by the door and therefore were forgotten about on a few occasions for little details, but it doesn’t detract from my 5 ⭐).",
        "time": 1749892497,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Elizabeth Palomino",
        "rating": 4,
        "text": "Authentic italian taste\n\nSmall but very cozy place. Great attention, food delicious.\nI would point offer free water.\n\nTicket average $40eur, kind expensive.\n\nRecommended.",
        "time": 1757693265,
        "relative_time_description": "a month ago"
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
    "fsa_authority": "Kensington and Chelsea",
    "fsa_url": "https://ratings.food.gov.uk/business/1149043",
    "fsa_last_inspection": "2024-01-11T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:59.726Z",
    "lastVerifiedFSA": "2025-10-16T23:26:04.569Z",
    "createdAt": "2025-10-15T10:54:59.726Z",
    "updatedAt": "2025-10-16T20:26:13.032Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Osteria Napoletana — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_osteria-napoletana_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.483Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Osteria Napoletana",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "186 Kensington Park Rd, Notting Hill, ES",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 3425
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/osteria-napoletana-JmjibnCw",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/osteria-napoletana-JmjibnCw/italian-osteria-napoletana-JmjibnCw-card-f349617a.webp",
    "image_hero_path": "/images/restaurants/osteria-napoletana-JmjibnCw/italian-osteria-napoletana-JmjibnCw-hero-81b7bee1.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJIfr7lHYddkgRBpHiftn5UJA",
    "slug": "fatto-a-mano-bethnal-green-iftn5UJA",
    "name": "Fatto a Mano Bethnal Green",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 507,
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
    "postcode": "E2 9LE",
    "borough": "Central London",
    "lat": 51.52827019999999,
    "lng": -0.0561781,
    "phone": "020 3621 2029",
    "phone_international": "+44 20 3621 2029",
    "website": "https://www.fattoamanopizza.com/locations/bethnal-green-london/",
    "url": "https://maps.google.com/?cid=10399086252130472198",
    "opening_hours": {
      "open_now": false,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2130"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2200"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2200"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2200"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2200"
          },
          "open": {
            "day": 4,
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
            "time": "1200"
          }
        }
      ],
      "weekday_text": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 12:00 – 9:30 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "italian",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Fatto a Mano Bethnal Green",
        "venueId": 585
      }
    ],
    "reviews": [
      {
        "author_name": "Maria Jose Ferriols",
        "author_url": "https://www.google.com/maps/contrib/102667617351320362912/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLmizx9x8W2B09l4IqDyAv9fIPeTrpQi53oDCcj3RIAFK5KLQ=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "2 weeks ago",
        "text": "My boyfriend and I have been several times eating in Fatto a Mano in Bethnal Green and it was great every time we went! The food is amazing and the staff is wonderful, specially Amanda and Jess who were very kind and helpful all the time. We also have a treat from a promotion/prize!\n\nThank you and see you soon!",
        "time": 1759344921,
        "translated": false
      },
      {
        "author_name": "Cherie H",
        "author_url": "https://www.google.com/maps/contrib/111124142025734749126/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUL9f5-eZHWGJ54NuEnDfvBVrPc7h3LPry0a6TswDMdXQqOvnYy=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "A fabulous pizza restaurant with outdoor and indoor seating. It was lovely to enjoy the late afternoon light. The pizzas were amazing, the chewiness of the crust is stunning and the toppings were flavourful and juicy. I loved the ‘njuda pizza, it had the perfect amount of heat. I found the desserts less notable than the pizzas.",
        "time": 1747891839,
        "translated": false
      },
      {
        "author_name": "Marisa Rizzo",
        "author_url": "https://www.google.com/maps/contrib/113389227503706443179/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUyWb5fZqw3wsE5o3zTeQHFYnrNFMzDG_NUi3XnUyIKUJOcsQTC=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "6 months ago",
        "text": "I finally made it to Fatto a Mano in Bethnal Green, and wow, what an experience!\n\nNow, let’s talk about the Arrabbiata Pizza. As someone who loves a little spice, this was an absolute game-changer.\nEvery bite was a perfect balance of heat and freshness!\n\nBeyond the food, the service was fantastic. The staff were super friendly, passionate about their menu, and made sure everything was perfect.\n\nIf you’re a fan of authentic Neapolitan pizza with a bit of spice, this is THE place to go. I’ll definitely be coming back",
        "time": 1743704581,
        "translated": false
      },
      {
        "author_name": "Harry Atters",
        "author_url": "https://www.google.com/maps/contrib/113275833069408213927/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIH3huCsQI0p3rfy2_VE8c3BGPCXDT7s0WaKh8RgQWfqq1wEQ=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Brilliant new local place. Such amazing vegan pizzas (and garlic fries), great drinks and lovely pizzas and dips. Highly recommended and our servers (one was called Ayeesha and the other was a lovely and tall person) were amazing.",
        "time": 1753987603,
        "translated": false
      },
      {
        "author_name": "Yoseph Ismail",
        "author_url": "https://www.google.com/maps/contrib/117149282587731322172/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIi_yc10TsxykF3qBiFp94l65G2NfPoxt66fBZG_-h44CDucw=s128-c0x00000000-cc-rp-mo",
        "rating": 1,
        "relative_time_description": "3 weeks ago",
        "text": "The special Ti Amo Napoli is one of the most disgusting pizzas I’ve ever eaten. It has an extremely sharp taste most likely from the green sauce that makes it inedible. However what made this one of my worst culinary experiences was the two long brown hairs in two of the slices. See photos, absolutely disgusting, will never be ordering from here again.",
        "time": 1758484697,
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
      "query": "restaurant Bethnal Green London",
      "area": "Bethnal Green",
      "type": "area"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:38.380Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:38.380Z",
    "updatedAt": "2025-10-16T23:14:36.060Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Fatto a Mano Bethnal Green — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_fatto-a-mano-bethnal-green_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.534Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Fatto a Mano Bethnal Green",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 507
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/fatto-a-mano-bethnal-green-iftn5UJA",
      "openingHours": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 12:00 – 9:30 PM"
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
    "image_card_path": "/images/restaurants/fatto-a-mano-bethnal-green-iftn5UJA/italian-fatto-a-mano-bethnal-green-iftn5UJA-card-073644da.webp",
    "image_hero_path": "/images/restaurants/fatto-a-mano-bethnal-green-iftn5UJA/italian-fatto-a-mano-bethnal-green-iftn5UJA-hero-7036d98d.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJq_N9NKgddkgRPmF9XapQArk",
    "slug": "casa-fof-9XapQArk",
    "name": "Casa Fofó",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 618,
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
    "postcode": "E8 2HS",
    "borough": "Central London",
    "lat": 51.5499411,
    "lng": -0.0641369,
    "phone": "020 3021 0747",
    "phone_international": "+44 20 3021 0747",
    "website": "http://www.casafofolondon.co.uk/",
    "url": "https://maps.google.com/?cid=13331306539613249854",
    "opening_hours": {
      "open_now": false,
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1400"
          },
          "open": {
            "day": 0,
            "time": "1300"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "2130"
          },
          "open": {
            "day": 0,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2130"
          },
          "open": {
            "day": 3,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2130"
          },
          "open": {
            "day": 4,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2130"
          },
          "open": {
            "day": 5,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1400"
          },
          "open": {
            "day": 6,
            "time": "1300"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2130"
          },
          "open": {
            "day": 6,
            "time": "1800"
          }
        }
      ],
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: Closed",
        "Wednesday: 6:00 – 9:30 PM",
        "Thursday: 6:00 – 9:30 PM",
        "Friday: 6:00 – 9:30 PM",
        "Saturday: 1:00 – 2:00 PM, 6:00 – 9:30 PM",
        "Sunday: 1:00 – 2:00 PM, 6:00 – 9:30 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "italian",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Casa Fofó",
        "venueId": 621
      }
    ],
    "reviews": [
      {
        "author_name": "Grace Yeung",
        "author_url": "https://www.google.com/maps/contrib/116899214024286657106/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKuexuuGciA3NVQ-T4ZET8sSUFoP2fXORPlpCbRZAqGqqsmyg=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 4,
        "relative_time_description": "a month ago",
        "text": "Nice food. Some dishes were over salty. I ordered 3 non-alcoholic drinks to rinse my palette in addition to water. The lamb in the main dish was rather too small to properly taste and enjoy. In general, the design of the tasting menu was good though, but the saltiness was probably due to the prepared sauce and ingredients getting too condensed when re-heated. The chef should have easily resolved the problem by testing and tasting while cooking and before serving from time to time.",
        "time": 1757775479,
        "translated": false
      },
      {
        "author_name": "Kristjana Nikolls",
        "author_url": "https://www.google.com/maps/contrib/105959778565272748138/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWGVWSjU5s1ra3dUAPojwhNktqrdSDabXlpPNZE7bK1OV2S3I6tHg=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "We had a private experience for a friends 30th. We were looked after so well and the food was absolutely remarkable. I would also say it was playful and exciting with the flavours. It’s a seasonal menu so depending when you you might have totally different options. I’d recommend the orange wine and white wines. It was an unforgettable evening and the team and chefs are so professional. Would love to go back if my purse can handle it!",
        "time": 1746775827,
        "translated": false
      },
      {
        "author_name": "Ella Brown",
        "author_url": "https://www.google.com/maps/contrib/103653779705733372864/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKHEfGzENDqZjDj5lGi45EQAFKXTDEYJT49zQx_-VxWX0IMbA=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "Came for dinner with two friends and everything about our experience was perfect. The staff were incredible friendly and so knowledgeable about the menu. The restaurant its self is so beautiful and the open kitchen is such a lovely experience to watch the chef cook away! The food was absolutely incredible from start to finish I was blown away, It’s a set menu and each course was different and so interesting! The wine list is incredible and the homemade kombucha is something special, Highly recommend to everyone !",
        "time": 1746810554,
        "translated": false
      },
      {
        "author_name": "Cleo Amelia",
        "author_url": "https://www.google.com/maps/contrib/104918000829279304989/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJ0x6XOy0uHGyKrhqelZS3XyoyQF4wuRjfLtnOQi18kp_G01Q=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 3,
        "relative_time_description": "2 months ago",
        "text": "I wasn’t overly amazed by the food and felt that a few dishes were a little too salty and had clashing flavours.\nThe kitchen was kind enough to cater to a vegetarian diner that was part of our party, and made a different set menu for them (we informed/asked them in advance about this).\nThe atmosphere was quite nice. The open kitchen and fact that it’s tucked away on a random street in Hackney sets the scene for a relaxed setting.",
        "time": 1753604697,
        "translated": false
      },
      {
        "author_name": "V Kho",
        "author_url": "https://www.google.com/maps/contrib/102855220752501711551/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVo3lA9Gr_JUvNDiANsfO6fUOs8qjbM1GnGw_EQEiVdSV_-rsAw=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "Have been wanting to try this place for ages and keep putting it off because of where it is located. We were both really impressed about the tasting menu, very innovative cuisine with combination of flavors that we haven’t tried before. The sichuan peppercorn pasta gives a subtle kick while compliments the rest really well.\nGreat value tasting menu (even more shocked to find services already included). Decent wine list. The menu changes often so we can’t wait to be back.",
        "time": 1747206088,
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
      "query": "restaurant Hackney London",
      "area": "Hackney",
      "type": "area"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:50.447Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:50.447Z",
    "updatedAt": "2025-10-16T23:14:36.061Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Casa Fofó — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_casa-fof_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.546Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Casa Fofó",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "London, UK",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 618
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/casa-fof-9XapQArk",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: Closed",
        "Wednesday: 6:00 – 9:30 PM",
        "Thursday: 6:00 – 9:30 PM",
        "Friday: 6:00 – 9:30 PM",
        "Saturday: 1:00 – 2:00 PM, 6:00 – 9:30 PM",
        "Sunday: 1:00 – 2:00 PM, 6:00 – 9:30 PM"
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
    "image_card_path": "/images/restaurants/casa-fof-9XapQArk/italian-casa-fof-9XapQArk-card-436cedcf.webp",
    "image_hero_path": "/images/restaurants/casa-fof-9XapQArk/italian-casa-fof-9XapQArk-hero-30aa1a17.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJfcEFmtMEdkgR9pwP7Z6jOko",
    "slug": "bocca-di-lupo-P7Z6jOko",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJfcEFmtMEdkgR9pwP7Z6jOko",
    "name": "Bocca di Lupo",
    "description": "A celebration of European culinary heritage with a modern twist. This Central London gem proves that modern european cuisine can be both traditional and innovative. With ratings this high, it's no wonder locals keep c...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "bar",
      "restaurant",
      "fine-dining"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 3376,
    "price_level": 3,
    "price_range": "£££",
    "address": {
      "formatted": "12 Archer St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "12 Archer St, London",
    "postcode": "W1D 7BB",
    "borough": "Central London",
    "lat": 51.5116537,
    "lng": -0.13395,
    "phone": "020 7734 2223",
    "phone_international": "+44 20 7734 2223",
    "website": "http://www.boccadilupo.com/",
    "url": "https://maps.google.com/?cid=5348767410433268982",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Thursday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Friday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Saturday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Sunday: 12:00 – 3:15 PM, 5:00 PM – 12:00 AM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1515"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "0000"
          },
          "open": {
            "day": 0,
            "time": "1700"
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
            "day": 2,
            "time": "0000"
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
            "day": 3,
            "time": "0000"
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
            "day": 4,
            "time": "0000"
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
            "day": 5,
            "time": "0000"
          },
          "open": {
            "day": 4,
            "time": "1700"
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
            "day": 6,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "1700"
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
            "day": 0,
            "time": "0000"
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
        "reference": "AciIO2d40_af7ZtJXW_cLSkF5l1J2WRR013_gD7N7Lsa7yA00wYK8fvv9aIZRqMFnmElh0Wr1sddcVn4J9aiThRgmZrsRtXPEVq2UOVfyLWWsV8pppQCER9h3BNh8EUPGSB7LeFjQzcSrhCeRoIv408aOsJTU2iH0biHPh7BvTbX6F-lvoyBPNzI0yMu1DFTS6Spnmg5ils5NPTpMPvmUuIBu72PBYYnrOGOP533UQOZrh72FoqV0vzLCIah83dTP6yakWqDBUbHx2wcPy3vtNOh7pZBYm91ZiWJRIpDzHIc6Dkzyw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d40_af7ZtJXW_cLSkF5l1J2WRR013_gD7N7Lsa7yA00wYK8fvv9aIZRqMFnmElh800Wr1sddcVn4J9aiThRgmZrsRtXPEVq2UOVfyLWWsV8pppQCER9h3BNh8EUPGSB7LeFjQzcSrhCeRoIv408aOsJTU2iH0biHPh7BvTbX6F-lvoyBPNzI0yMu1DFTS6Spnmg5ils5NPTpMPvmUuIBu72PBYYnrOGOP533UQOZrh72FoqV0vzLCIah83dTP6yakWqDBUbHx2wcPy3vtNOh7pZBYm91ZiWJRIpDzHIc6Dkzyw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113215905448535675344\">Bocca di Lupo</a>"
        ]
      },
      {
        "reference": "AciIO2dub40voR7ZdEoHtXFRMG4HerJDny6wpdfW1o_sPNvDsTK_ipjO1t-uvYhqBxlH7juuG5JSUkFkRh6hWIX4hyPkZ5p7kCmPm2PlWN2B-RPvXEIf3Wg1K4sZGr6VzeqMf6tzpVa4_y34USbKRfvOs8_q0m4hlwJfCN-okPldUPHSj8RjTdw9TmeUuRaXeTEZwSpb3hlo_37MY1MlGgTx98H7x3HH3vlDoHOC0pZaayH2gX9xUhUfImTpKvfAQp_G5KPVIJiT60wrY3JNmiR6g9ndL7C6s0F_Bh601g_emFCTT68GKzk2sb2Rry94aXqIT3uDfWFuueqVE7ivd65WFIrLUctemR4qT33herm50rQ_ZkBs-dM9k33pMLIXzNxEw2j8BZ4FXrcaU97vA8sahDYyIfMUIWGmoue6A1SsrP5UdqFvUz_Z86KRtF024PyU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dub40voR7ZdEoHtXFRMG4HerJDny6wpdfW1o_sPNvDsTK_ipjO1t-uvYhqBxlH7juuG5JSUkFkRh800hWIX4hyPkZ5p7kCmPm2PlWN2B-RPvXEIf3Wg1K4sZGr6VzeqMf6tzpVa4_y34USbKRfvOs8_q0m4hlwJfCN-okPldUPHSj8RjTdw1200TmeUuRaXeTEZwSpb3hlo_37MY1MlGgTx98H7x3HH3vlDoHOC0pZaayH2gX9xUhUfImTpKvfAQp_G5KPVIJiT60wrY3JNmiR6g9ndL7C6s0F_Bh601g_emFCTT68GKzk2sb2Rry94aXqIT3uDfWFuueqVE7ivd65WFIrLUctemR4qT33herm50rQ_ZkBs-dM9k33pMLIXzNxEw2j8BZ4FXrcaU97vA8sahDYyIfMUIWGmoue6A1SsrP5UdqFvUz_Z86KRtF024PyU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104921727744240069260\">Barnaby Reekes</a>"
        ]
      },
      {
        "reference": "AciIO2cmjUJlDxY5EHlqoOalSq3D9To9FDJ61zNYk-8lEHEFb6fuMY7wd1Pn_vYkNRHHT8uYb91uUMCH8BDImqUE7YNmGz0CD0yLE42jT9GCVR-Y0iTo_ACub9sR8IQte-toApg-bhS0QoZrehqXEgLPaNW0Nl4J6VaC4j_gJ30Ie9eiWbN5RWAoooM7vTmQnK_NhuLxXaIwNZc_U48X9vvMI-GhfNkZon-gQkAoS25AuXYrsMPSDECrVn1okWazRfvsHf0So8sHWZaLQAzpqQl6yJijT6cKKsm6ET68EVTv0n7k5A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cmjUJlDxY5EHlqoOalSq3D9To9FDJ61zNYk-8lEHEFb6fuMY7wd1Pn_vYkNRHHT8uYb91uUMCH8BDImqUE7YNmGz0CD0yLE42jT9GCVR-Y0iTo_ACub9sR8IQte-toApg-bhS0QoZrehqXEgLPaNW0Nl4J6VaC4j_gJ30Ie9eiWbN5RWAoooM7vTmQnK_NhuLxXaIwNZc_U48X9vvMI-GhfNkZon-gQkAoS25AuXYrsMPSDECrVn1okWazRfvsHf0So8sHWZaLQAzpqQl6yJijT6cKKsm6ET68EVTv0n7k5A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113215905448535675344\">Bocca di Lupo</a>"
        ]
      },
      {
        "reference": "AciIO2cJNKsybRlP2uDY62ey36Ewcyt9xu0UQEIUXpjRgIWE5pjPoXDmrt2VYyxhDlo2Ml_WKHHUeVYz66BEJPwSnEiY8v84FTY0WZP8bu---LanggFjBv_nhNGGMomHYKeMKSPMranVRw6epP1PLy_NdI_4ZpY3Si9ZX3Fz92pn2oVZPxui_Vs1jwUh5_MLHM7rBN_j2YozjplCJrlRG1awTfwwlxZ4IAjSCbL3_FJrKSgv-q2n4J0oYWY2-R5Mzb_L8uMddFzgB9FPutjal6M3e-9aiev9CAjrkX5gxMSrn6jpJLhK3k2k0kzfBFT5KWdKxIlbuJxxhCsDeq4aYb5w6qqmMmb64C8wXog1QX0UvFBkdhFKSj18MKggEaatI2dQzxin6FDgzZQCUQ3_gnAxydOYWeG_8ZmSUq9vxrh0PPUj2vS1xJXVVVqTF4GA6A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cJNKsybRlP2uDY62ey36Ewcyt9xu0UQEIUXpjRgIWE5pjPoXDmrt2VYyxhDlo2Ml_WKHHUeVYz66BEJPwSnEiY8v84FTY0WZP8bu---LanggFjBv_nhNGGMomHYKeMKSPMranVRw1200epP1PLy_NdI_4ZpY3Si9ZX3Fz92pn2oVZPxui_Vs1jwUh800_MLHM7rBN_j2YozjplCJrlRG1awTfwwlxZ4IAjSCbL3_FJrKSgv-q2n4J0oYWY2-R5Mzb_L8uMddFzgB9FPutjal6M3e-9aiev9CAjrkX5gxMSrn6jpJLhK3k2k0kzfBFT5KWdKxIlbuJxxhCsDeq4aYb5w6qqmMmb64C8wXog1QX0UvFBkdhFKSj18MKggEaatI2dQzxin6FDgzZQCUQ3_gnAxydOYWeG_8ZmSUq9vxrh0PPUj2vS1xJXVVVqTF4GA6A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107742656936918502390\">官邸lowrence</a>"
        ]
      },
      {
        "reference": "AciIO2c2kYZA4EDbkL-gc1ckODEKksuf-2mR_vXCV-AdReUQoBy1wXnGFCzKpLSutsByHXfMIODXiHlyruAq6dxNCQB-nuFqqC_9AzaraxcEfQCn9ZsS9yLYhVF16IBxuq77agosJGiaW0PIeje_N2KPl3zRq2ncAMpeVHES7Wm2dsu4nO7WQFiyw20dpYmC76Xm8lSU7gc3oGxzrB3XgvT-4R9y9I5FLJqH9VqpCd2Mj6I_u9zqKcTaGRDgYFRD2WV5hVWa32qmQGDdPQxRocLUV4CnJaabcvuIfR66JXU1uV-yAKWhu_5sElXqrISumR985ozGXncZ-zK4MVkexz087jfBj37Sc4c8I2dlvhtnSadKQKC7o5PEoinP1_6kctBVMzd0iBCWhs1hMMNO4yNSgiwgkWwKH04QV8M_dYydikQ6IR_Q6z8s79wOPJW9HcMY",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c2kYZA4EDbkL-gc1ckODEKksuf-2mR_vXCV-AdReUQoBy1wXnGFCzKpLSutsByHXfMIODXiHlyruAq6dxNCQB-nuFqqC_9AzaraxcEfQCn9ZsS9yLYhVF16IBxuq77agosJGiaW0PIeje_N2KPl3zRq2ncAMpeVHES7Wm2dsu4nO7WQFiyw1200dpYmC76Xm8lSU7gc3oGxzrB3XgvT-4R9y9I5FLJqH9VqpCd2Mj6I_u9zqKcTaGRDgYFRD2WV5hVWa32qmQGDdPQxRocLUV4CnJaabcvuIfR66JXU1uV-yAKWhu_5sElXqrISumR985ozGXncZ-zK4MVkexz087jfBj37Sc4c8I2dlvhtnSadKQKC7o5PEoinP1_6kctBVMzd0iBCWhs1hMMNO4yNSgiwgkWwKH04QV8M_dYydikQ6IR_Q6z8s79wOPJW9HcMY&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117725621134913561488\">Utsav Tiwary</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Jack Gowlett",
        "rating": 5,
        "text": "This restaurant has been on my list for ages and I’m glad I finally came here! Service is so friendly and they make you feel very welcome. Every dish we ordered was beautifully served and tasted amazing! They even gave me a little birthday card and ice cream because it was my birthday! Love an Italian restaurant but this place is extra special! Will definitely be returning.",
        "time": 1759430652,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Simon Beale",
        "rating": 5,
        "text": "Popped in for lunch without a booking. Shown seats at the counter, which is by far the best! The menu is split between areas of Italy and you can go on a full culinary tour!\nThe service is excellent. you have the feeling of being treated like a beloved regular, even if it’s your first time.",
        "time": 1756621792,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "samuele bottega",
        "rating": 5,
        "text": "I finally made it to Bocca di Lupo — and as an Italian, I can honestly say the food was delicious. It was a fantastic lads’ night!\n\nWe started with Manhattans on arrival, then enjoyed at the table:\n•\tSage leaves with anchovy\n•\tOlives stuffed with minced pork & veal\n•\tSea bream carpaccio with orange & rosemary\n•\tRicotta & spinach ravioli with butter & sage\n•\tPappardelle with venison stracotto\n•\tRoast teal with schiacciata con l’uva & guanciale\n\nHighly recommended desserts:\n•\tChocolate & marzipan ball with rum & raisins\n•\tAffogato al caffè\n•\tUva fragola sorbet\n\nAll perfectly paired with a Teroldego Rotaliano Terrazze della Luna, 2023 — a smooth and elegant red.\n\nA special thanks to James for the impeccable service — well done, buddy!",
        "time": 1760175335,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Florijn Bekaert",
        "rating": 5,
        "text": "Amazing solo dinner at the counter. Loved the enthousiastic service and the food was delicious. Refined Italian kitchen with\ndelicious food, my favourite was the risotto.\nIf I’m in London again, I’ll revisit this place as their other food looked amazing as well.",
        "time": 1759089515,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "T S",
        "rating": 5,
        "text": "I recently dined at Bocca di Lupo under somewhat unusual circumstances, as I had lost my voice just before the visit. Despite this, the staff were incredibly kind, patient, and accommodating, making the experience feel seamless and comfortable.\n\nThe food was delicious. We especially enjoyed the risotto and the asparagus. Both were full of flavour and really well done. Everything we tried was delicious. I can't wait to visit again.",
        "time": 1753541521,
        "relative_time_description": "2 months ago"
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
    "fsa_rating_text": "5",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/682042",
    "fsa_last_inspection": "2024-12-04T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:21.311Z",
    "lastVerifiedFSA": "2025-10-16T23:15:19.774Z",
    "createdAt": "2025-10-15T10:53:21.311Z",
    "updatedAt": "2025-10-16T20:24:14.613Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Bocca di Lupo — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_bocca-di-lupo_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.430Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Bocca di Lupo",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£3",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 Archer St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 3376
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/bocca-di-lupo-P7Z6jOko",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Thursday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Friday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Saturday: 12:00 – 3:00 PM, 5:00 PM – 12:00 AM",
        "Sunday: 12:00 – 3:15 PM, 5:00 PM – 12:00 AM"
      ]
    },
    "meta_tags": {
      "og_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "twitter_image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/bocca-di-lupo-P7Z6jOko/italian-bocca-di-lupo-P7Z6jOko-card-270b5fd3.webp",
    "image_hero_path": "/images/restaurants/bocca-di-lupo-P7Z6jOko/italian-bocca-di-lupo-P7Z6jOko-hero-e9655d91.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Italian Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest italian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-italian-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Italian Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest italian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-italian-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Italian Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest italian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Italian Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-italian-in-central-london-2025',
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
              <Link href="/italian-restaurants-london" className="hover:text-white transition-colors">Italian</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Italian in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Italian Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest italian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/giulia-restaurant-EkK4r0z4" className="hover:text-yellow-600 transition-colors">
                Giulia Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 298 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Giulia Restaurant offers exceptional italian cuisine in Central London. With a 4.9-star rating from 298 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/giulia-restaurant-EkK4r0z4" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJU9GMeq0PdkgRD7sEkK4r0z4" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/amor-gastronomia-9fVApnuo" className="hover:text-yellow-600 transition-colors">
                Amor Gastronomia
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 1,356 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Amor Gastronomia offers exceptional italian cuisine in Central London. With a 4.9-star rating from 1,356 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/amor-gastronomia-9fVApnuo" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJFcdH1QobdkgRDhK9fVApnuo" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/circolo-popolare-kqYLufoE" className="hover:text-yellow-600 transition-colors">
                Circolo Popolare
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 32,974 reviews</span>
              <span>💰 £££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Circolo Popolare offers exceptional italian cuisine in Central London. With a 4.8-star rating from 32,974 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/circolo-popolare-kqYLufoE" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJK4j9CagbdkgRluwkqYLufoE" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/grasso-VxepVY0I" className="hover:text-yellow-600 transition-colors">
                Grasso
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 3,330 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Grasso offers exceptional italian cuisine in Central London. With a 4.8-star rating from 3,330 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/grasso-VxepVY0I" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJRcG-rBEbdkgR9SUVxepVY0I" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/gloria-fPFxdplY" className="hover:text-yellow-600 transition-colors">
                Gloria
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 20,227 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Gloria offers exceptional italian cuisine in Central London. With a 4.8-star rating from 20,227 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/gloria-fPFxdplY" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJj99O4ScddkgRNnDfPFxdplY" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/doppo-MCqb9oIE" className="hover:text-yellow-600 transition-colors">
                Doppo
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 681 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Doppo offers exceptional italian cuisine in Central London. With a 4.8-star rating from 681 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/doppo-MCqb9oIE" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJpatnEFEFdkgRAZyMCqb9oIE" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/osteria-napoletana-JmjibnCw" className="hover:text-yellow-600 transition-colors">
                Osteria Napoletana
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 3,425 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Osteria Napoletana offers exceptional italian cuisine in Central London. With a 4.8-star rating from 3,425 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/osteria-napoletana-JmjibnCw" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJNWlwNBgRdkgRj-WJmjibnCw" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/fatto-a-mano-bethnal-green-iftn5UJA" className="hover:text-yellow-600 transition-colors">
                Fatto a Mano Bethnal Green
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 507 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Fatto a Mano Bethnal Green offers exceptional italian cuisine in Central London. With a 4.8-star rating from 507 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/fatto-a-mano-bethnal-green-iftn5UJA" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/casa-fof-9XapQArk" className="hover:text-yellow-600 transition-colors">
                Casa Fofó
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 618 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Casa Fofó offers exceptional italian cuisine in Central London. With a 4.7-star rating from 618 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/casa-fof-9XapQArk" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/bocca-di-lupo-P7Z6jOko" className="hover:text-yellow-600 transition-colors">
                Bocca di Lupo
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 3,376 reviews</span>
              <span>💰 £££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Bocca di Lupo offers exceptional italian cuisine in Central London. With a 4.6-star rating from 3,376 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/bocca-di-lupo-P7Z6jOko" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJfcEFmtMEdkgR9pwP7Z6jOko" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
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
        <a href="/italian-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Italian Restaurants
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
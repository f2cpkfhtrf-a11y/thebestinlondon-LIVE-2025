import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { asCollectionPage } from '../../lib/factory/pageFactory';

export default function BestIndianInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJ__9DAWgFdkgRj0UKhMpiz4I",
    "slug": "pravaas-south-kensington-KhMpiz4I",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ__9DAWgFdkgRj0UKhMpiz4I",
    "name": "Pravaas - South Kensington",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 363,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "PRAVAAS, 3 Glendower Pl, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "PRAVAAS, 3 Glendower Pl, London",
    "postcode": "SW7 3DU",
    "borough": "Central London",
    "lat": 51.493587,
    "lng": -0.1758392,
    "phone": "020 3161 7641",
    "phone_international": "+44 20 3161 7641",
    "website": "http://www.pravaas.com/",
    "url": "https://maps.google.com/?cid=9425861167047918991",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
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
            "time": "1730"
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
            "time": "1730"
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
        "reference": "AciIO2eMpg0WB9q4TbLlO6aqMQTNkEJqrzyhRxdDDImegFt2LCcz-WEu9WDn72HHxfPlY-GSttrNNFELYH2DpjkmKX2BL0DbtCST_v80yfpFsz250U_noC3lk_k5gy3fYDE3jx_JT30s2nhKzvCeDZdnw-utbKkl33L0YywXsAwijuNTzWLY0vxzbZAY17-JYHRTApkTU1OC7EwnIuIEMdLl0bhqoc8uqBxZnb52XzRme2J67Zh1axSHvrIPXwkwB2vmgAQxEWq28SMh1zEV_Or98_TN8wtnhH7p0o_FM3N-vdZ-Sg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eMpg0WB9q4TbLlO6aqMQTNkEJqrzyhRxdDDImegFt2LCcz-WEu9WDn72HHxfPlY-GSttrNNFELYH2DpjkmKX2BL0DbtCST_v80yfpFsz250U_noC3lk_k5gy3fYDE3jx_JT30s2nhKzvCeDZdnw-utbKkl33L0YywXsAwijuNTzWLY0vxzbZAY17-JYHRTApkTU1OC7EwnIuIEMdLl0bhqoc8uqBxZnb52XzRme2J67Zh800axSHvrIPXwkwB2vmgAQxEWq28SMh1zEV_Or98_TN8wtnhH7p0o_FM3N-vdZ-Sg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109980664224687399302\">Pravaas - South Kensington</a>"
        ]
      },
      {
        "reference": "AciIO2dMbYzG4tCBDFJeOz83UraACDFCkI37x8EJ5wptMhYTYp_8uVomAAq3FYPnNiroDZozQUJ3ZFTxP1t0hSEl19Wbq2DTaa9NcaJe6khInbBt8vGtclhhmQRypx_kVZfvjKIibQf9pI5aEsGVeFx_7loB_b9ymy60V9S_rRNOAatghd_9ouEF5-Y5VpWHkeLDUPygPPLpQonlFdew4XfGXjCiNUFOSJE36F4mP9dJUXaJAweLTJzAua8Ncfy1j90mVxK7JrDJOp-8a_WrFV_YkSEp_cY2Fyfd1RTtPnEmYXZlgA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dMbYzG4tCBDFJeOz83UraACDFCkI37x8EJ5wptMhYTYp_8uVomAAq3FYPnNiroDZozQUJ3ZFTxP1t0hSEl19Wbq2DTaa9NcaJe6khInbBt8vGtclhhmQRypx_kVZfvjKIibQf9pI5aEsGVeFx_7loB_b9ymy60V9S_rRNOAatghd_9ouEF5-Y5VpWHkeLDUPygPPLpQonlFdew1200XfGXjCiNUFOSJE36F4mP9dJUXaJAweLTJzAua8Ncfy1j90mVxK7JrDJOp-8a_WrFV_YkSEp_cY2Fyfd1RTtPnEmYXZlgA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109980664224687399302\">Pravaas - South Kensington</a>"
        ]
      },
      {
        "reference": "AciIO2e7yjLcyL5VASg7vP0htppfCkaAe8AHI7mAO8iuIC7mYIFMUEBcWuLl1_5dStyuSKvPTaVupC7KvLjr7I7JZd4cSPX2AbzDx1CU_jGx0P3WngdomazB5ueA5QpE-niiBAmAO5VTm_s2I_6g3HUfinyUAnVeS8PIl3F2gq4cRcOQL9AMfGVpOoEtXJOCZxhncqDI0YgcyraTXVeoffJml6XzJ3-CLhD56J9M_ZHteIVo_ay3XJG14gAi3hKczUp-NmAfSwllcJ3Vi_3NmMvaojREZckMgrxkQK-dyl51ZybJUA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e7yjLcyL5VASg7vP0htppfCkaAe8AHI7mAO8iuIC7mYIFMUEBcWuLl1_5dStyuSKvPTaVupC7KvLjr7I7JZd4cSPX2AbzDx1CU_jGx0P3WngdomazB5ueA5QpE-niiBAmAO5VTm_s2I_6g3HUfinyUAnVeS8PIl3F2gq4cRcOQL9AMfGVpOoEtXJOCZxhncqDI0YgcyraTXVeoffJml6XzJ3-CLhD56J9M_ZHteIVo_ay3XJG14gAi3hKczUp-NmAfSwllcJ3Vi_3NmMvaojREZckMgrxkQK-dyl51ZybJUA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109980664224687399302\">Pravaas - South Kensington</a>"
        ]
      },
      {
        "reference": "AciIO2fsgejHWXjLzMozj-UqThm_fVVzhNoy61VZC8wQgeSsvbTLR_zs-Gls22NsOXkh1cQ53fqJT3PbnzQOTd82jyhSjYxgftGuas2i-DHN6Ul6CGJJHi39jrBO4qBEqxrIx7MrjNYXhov2SWD8L-7lFpbiiwOzGEns_QQPYxugs_umL_9wRQjJx5fY4F-VB5rWd0IBTTNQ6LVbGE7m4Gx5juIAHAQmyGhfJutia68yloN-1TDYUkyueBRwXaMSNe2TlblIv6JvF-mKEjs3cD-AxESJjiUllmXR7GW13apRLXvbV2WlTrksEaNCvlVTbhBvdfL13vG4LAB_ClhHwqiLd8nt6cl-b81uFkvKs_awTaFLASxuQpM1nSmmkafw1N8Z8NHjg-gpwDvD2svwVPEUsnoK2vMF7mvWYEr00KNAlOLDkg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fsgejHWXjLzMozj-UqThm_fVVzhNoy61VZC8wQgeSsvbTLR_zs-Gls22NsOXkh800cQ53fqJT3PbnzQOTd82jyhSjYxgftGuas2i-DHN6Ul6CGJJHi39jrBO4qBEqxrIx7MrjNYXhov2SWD8L-7lFpbiiwOzGEns_QQPYxugs_umL_9wRQjJx5fY4F-VB5rWd0IBTTNQ6LVbGE7m4Gx5juIAHAQmyGhfJutia68yloN-1TDYUkyueBRwXaMSNe2TlblIv6JvF-mKEjs3cD-AxESJjiUllmXR7GW13apRLXvbV2WlTrksEaNCvlVTbhBvdfL13vG4LAB_ClhHwqiLd8nt6cl-b81uFkvKs_awTaFLASxuQpM1nSmmkafw1200N8Z8NHjg-gpwDvD2svwVPEUsnoK2vMF7mvWYEr00KNAlOLDkg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101894372868859169738\">Claudia Rei</a>"
        ]
      },
      {
        "reference": "AciIO2dW-OFshaa6qNcNJzxCwr-yAcJNZJcjTKTwvcWC4a4lQVfL6tZ3XGITeCDxUt-TKVpJvoqxuw3P7pStVNJhMikpBp67PeHuCjTBRePTc2Gg0f3v8CUuqBA2-7TE1ygXes8pz2F6CCOP7RcCJwX7YJGU-pTPabaGCJJnide7M6DbXE0zZmIr4lxdRBYG_JniK28aowUs6LDyQEYksOyU2tf__bAoI8lEjoyrJ3-B0wJXYFl8jHYPz_Y8K3stSxrzCYIaqBKj93tA7WHSQgBOVA2UN7bDuHBkZ9zUGdPrdV1wrhjunAKjRI7EZCLCrB7fOfIvlhqYWGAmc3AtqzGy-wImRiK0tX2qG93jDq3TMHv9E5OAxOXxTynvQ_KKRxD1DBOb1cNYR3bZIKRqj7WLWgh1QcrLNr6-HiTRYPtNLWs4ourMvVFG5Gsh7xaZBmDA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dW-OFshaa6qNcNJzxCwr-yAcJNZJcjTKTwvcWC4a4lQVfL6tZ3XGITeCDxUt-TKVpJvoqxuw1200P7pStVNJhMikpBp67PeHuCjTBRePTc2Gg0f3v8CUuqBA2-7TE1ygXes8pz2F6CCOP7RcCJwX7YJGU-pTPabaGCJJnide7M6DbXE0zZmIr4lxdRBYG_JniK28aowUs6LDyQEYksOyU2tf__bAoI8lEjoyrJ3-B0wJXYFl8jHYPz_Y8K3stSxrzCYIaqBKj93tA7WHSQgBOVA2UN7bDuHBkZ9zUGdPrdV1wrhjunAKjRI7EZCLCrB7fOfIvlhqYWGAmc3AtqzGy-wImRiK0tX2qG93jDq3TMHv9E5OAxOXxTynvQ_KKRxD1DBOb1cNYR3bZIKRqj7WLWgh800QcrLNr6-HiTRYPtNLWs4ourMvVFG5Gsh7xaZBmDA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117100816018388115781\">Brad Hardman</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Brad Hardman",
        "rating": 5,
        "text": "Absolutely delish, more modern take on Indian cuisine. Every dish was delicious and elevated from the version I had before. My favourite would be the lamb fillet rogan josh with potato dauphinoise. The chicken mangalorean was really nice with a flavourful and creamy sauce. Staff very friendly and attentive and we enjoyed sitting downstairs with a glass window into the kitchen.",
        "time": 1759689893,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Rashi Bansal",
        "rating": 5,
        "text": "Absolutely mind-blowing food experience! The flavours were outstanding — truly some of the best Indian food I’ve ever had. Every dish was beautifully prepared, rich in taste, and perfectly balanced. The ambience added to the experience — warm, inviting, and elegant, set in a lovely spot in South Kensington. It was my first time visiting, and I went based on a special recommendation — so glad I did! I’ll definitely be coming back very soon. A must-visit for anyone who loves authentic Indian cuisine with a refined touch.",
        "time": 1753828752,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "G Cinna",
        "rating": 5,
        "text": "Starters were excellent and the selection of pappadum was nice but very small, chutneys were served in tiny ramekins. I don’t think is appropriate to charge £4.50 for additional chutney so we skipped that. Mains were good as it was the service, perhaps a bit too much, over attentive in an artificial way, sometimes people like to be left alone. Lighting was too bright and the toilets lacked the finesse of a fine dining restaurant. Overall, a very nice experience that I recommend but I won’t return. I will discover a new place next time I’m looking for a fancy Indian!",
        "time": 1758478616,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "kate-lynn lam",
        "rating": 5,
        "text": "grabbed dinner at this restaurant with a friend last week! was highly recommended by my aunt who went for dinner with a couple work friends previously in the summer. service was impeccable ✨ thank you for pouring my bubble tea into a restaurant glass (even though it was completely my fault for bringing in an outside drink). the entrees were so delicious. we got the duck and lamb for our mains. lamb was 10/10, duck 8/10. highly recommend in my books",
        "time": 1758641969,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Ammar Ali",
        "rating": 5,
        "text": "An absolute hidden gem in South Kensington. I visited Pravaas with 14 of my teammates and the entire experience was outstanding from start to finish. Pre-ordering was seamless, the service on the day was warm, attentive, and genuinely personal, and the food, just incredible. Beautifully presented, packed with flavour, and very reasonably priced for the quality. My whole team was thoroughly impressed. Thank you, Pravaas, for a fantastic meal. I don’t give out 5-star reviews often, but this one is well deserved. Highly recommended.",
        "time": 1753450302,
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
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-16T20:23:42.077Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:42.077Z",
    "updatedAt": "2025-10-16T20:24:11.961Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Pravaas - South Kensington — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_pravaas---south-kensington_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.428Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Pravaas - South Kensington",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "PRAVAAS, 3 Glendower Pl, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 363
      },
      "url": "https://thebestinlondon.co.uk/restaurant/pravaas-south-kensington-KhMpiz4I",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/pravaas-south-kensington-KhMpiz4I/indian-pravaas-south-kensington-KhMpiz4I-card-eadb1466.webp",
    "image_hero_path": "/images/restaurants/pravaas-south-kensington-KhMpiz4I/indian-pravaas-south-kensington-KhMpiz4I-hero-f4df2914.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJAQxeaAAddkgRkKAT-b-BK14",
    "slug": "kricket-shoreditch-kaf-restaurant-bar-T-b-BK14",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJAQxeaAAddkgRkKAT-b-BK14",
    "name": "Kricket Shoreditch - Kafé, Restaurant & Bar",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 1072,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "35-42 Charlotte Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "35-42 Charlotte Rd, London",
    "postcode": "EC2A 3PB",
    "borough": "Central London",
    "lat": 51.5252491,
    "lng": -0.0809457,
    "phone": "020 3835 8805",
    "phone_international": "+44 20 3835 8805",
    "website": "https://kricket.co.uk/shoreditch/",
    "url": "https://maps.google.com/?cid=6785659925081333904",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 10:30 PM",
        "Tuesday: 8:00 AM – 10:30 PM",
        "Wednesday: 8:00 AM – 10:30 PM",
        "Thursday: 8:00 AM – 10:30 PM",
        "Friday: 8:00 AM – 10:30 PM",
        "Saturday: 9:00 AM – 10:30 PM",
        "Sunday: 9:00 AM – 9:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2100"
          },
          "open": {
            "day": 0,
            "time": "0900"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2230"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2230"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2230"
          },
          "open": {
            "day": 6,
            "time": "0900"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2fc_DzIM1e2iDBSq8wamnzZg2wP9LSLEoQM2Lhy0qz_pEPGXUwIt88_h-HcOouviUS-M6bJRt9VwVKYtR-qEnBu4rGYeFYfTG4lMVl1gZRRQWs9hfxm72pKZJB5_odtDBC-sB0PpnLz5nRK5Y-CPj1cwWMQRnIBGwuW_Qe-tDR0nN4he6LBkDh0YYwwBqtVnHDXju9-IYixXrXRdaUz-8q0QHp0S1QwJdTL7sSSxHckzPcAIzgcHdmQiLJqRNU14d2Ef72Xiv-93LRZIdY2yharJ9fSrj0KTwna33qO_c_aNA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fc_DzIM1e2iDBSq8wamnzZg2wP9LSLEoQM2Lhy0qz_pEPGXUwIt88_h-HcOouviUS-M6bJRt9VwVKYtR-qEnBu4rGYeFYfTG4lMVl1gZRRQWs9hfxm72pKZJB5_odtDBC-sB0PpnLz5nRK5Y-CPj1cwWMQRnIBGwuW_Qe-tDR0nN4he6LBkDh800YYwwBqtVnHDXju9-IYixXrXRdaUz-8q0QHp0S1QwJdTL7sSSxHckzPcAIzgcHdmQiLJqRNU14d2Ef72Xiv-93LRZIdY2yharJ9fSrj0KTwna33qO_c_aNA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109538933480515315817\">Kricket Shoreditch - Kafé, Restaurant &amp; Bar</a>"
        ]
      },
      {
        "reference": "AciIO2fjEZ9IQnBnBEAoH1_nyUrkQGaI99TrgxG73xmgCiBIF4lRAVm-uRc9e8jtUvqcFEH2W4wA9RpcuGKNcyXxGTpL6ayLHRShhkg1JWxqe2T7IHbHlsd-85FZvYGnOk5S4vGykQTH8gxkavFPNzYwXIin_e5S1VXXjjHEQVsXCoNW5pLmfBvQFTlxchfmyrtoDj2yNDAL6txbHl45LFs91cWGHVpsnKHO2HaQEHogIqFH4T_v1nAhJ2rRPA-JEAVDqCKZpBDmkQASk9IVrZBaMkS8IyyWZclezgXkdXqL12C_SA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fjEZ9IQnBnBEAoH1_nyUrkQGaI99TrgxG73xmgCiBIF4lRAVm-uRc9e8jtUvqcFEH2W4wA9RpcuGKNcyXxGTpL6ayLHRShhkg1JWxqe2T7IHbHlsd-85FZvYGnOk5S4vGykQTH8gxkavFPNzYwXIin_e5S1VXXjjHEQVsXCoNW5pLmfBvQFTlxchfmyrtoDj2yNDAL6txbHl45LFs91cWGHVpsnKHO2HaQEHogIqFH4T_v1nAhJ2rRPA-JEAVDqCKZpBDmkQASk9IVrZBaMkS8IyyWZclezgXkdXqL12C_SA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109538933480515315817\">Kricket Shoreditch - Kafé, Restaurant &amp; Bar</a>"
        ]
      },
      {
        "reference": "AciIO2dnJxCI5iNyhSv7MW3g5K9b5aJhTNSec1b_7IdlLHu3NCboXHsCj_bY8YRmA1WUuaU172SthF2BRYF-VEaZmc1umFMWdoAHlGuiwCYVoDLKDLlfmwXtl0QLkn92tjG9p2ea7FtKhYMfO-MdJjDL1GOEjGtx7gMdT2udLina37bcRG2cpUZ2wxQdi12eDQ_sQaTyPV58lJ-kSTN_b0kjCR9bJMbB-ZMy8t2-lyWnjxZfclm82_HaOiAYRlfzJ_imVYxOUF1AzLfrhIu6w5xTgCHq5CdFm4YPrinm35S0gCYRihtavs6Ra46KrYkRemOaMtXHcFpCTPbb-0mvRBXEev94kxghERrgH2qqSaEPHC52_NXBAxxiN0FBibTD8nTIVRAr2Dz-e-uLL0um2nLlUI6CjGpY-cL-mpAmTIhGA0xeebiFA8JzHdwdpBKksGqa",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dnJxCI5iNyhSv7MW3g5K9b5aJhTNSec1b_7IdlLHu3NCboXHsCj_bY8YRmA1WUuaU172SthF2BRYF-VEaZmc1umFMWdoAHlGuiwCYVoDLKDLlfmwXtl0QLkn92tjG9p2ea7FtKhYMfO-MdJjDL1GOEjGtx7gMdT2udLina37bcRG2cpUZ2wxQdi12eDQ_sQaTyPV58lJ-kSTN_b0kjCR9bJMbB-ZMy8t2-lyWnjxZfclm82_HaOiAYRlfzJ_imVYxOUF1AzLfrhIu6w1200xTgCHq5CdFm4YPrinm35S0gCYRihtavs6Ra46KrYkRemOaMtXHcFpCTPbb-0mvRBXEev94kxghERrgH2qqSaEPHC52_NXBAxxiN0FBibTD8nTIVRAr2Dz-e-uLL0um2nLlUI6CjGpY-cL-mpAmTIhGA0xeebiFA8JzHdwdpBKksGqa&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116467682418944456931\">P B</a>"
        ]
      },
      {
        "reference": "AciIO2eAyspVnRCDOCzj1tgfpzZvrdXfpFyaiCXU3tCsqGuyHCtS_eiHCf9vWcjqHeTPVWw-srz2vqBOeBmQcBRkqbKdNACt9b40SYcmrSQ8BhO84cKZNJri5zk2UfQwAsfnbjpvU6BBb3kvPtnvPhZBuFchL_MRdrOkXZixmXLaUq-PvtopJ_bTBDsIz9cD6cs013_SzYFhvJeHr5ZG2SU6P10TuGPCSF6_IH3z9HQMMAky7WBz_zDWpIYWinWhf_F-4At6D7Ftt_kieyCkPc9nmGKmKoFWYrc1FLD-h5M1hi4BKZXWcQrhuJGlFsMK4qYGHYuVv9SWYsxaCUTk6KmYBmliyuOwDLa1k3bYj3khOGA7lq2yFIQyX69bo6PkcLb_6MfmH4qpPsBQrqJvjQIhU38gc5_9EoVu5koiEKUnzOJozAHo",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eAyspVnRCDOCzj1tgfpzZvrdXfpFyaiCXU3tCsqGuyHCtS_eiHCf9vWcjqHeTPVWw-srz2vqBOeBmQcBRkqbKdNACt9b40SYcmrSQ8BhO84cKZNJri5zk2UfQwAsfnbjpvU6BBb3kvPtnvPhZBuFchL_MRdrOkXZixmXLaUq-PvtopJ_bTBDsIz9cD6cs013_SzYFhvJeHr5ZG2SU6P10TuGPCSF6_IH3z9HQMMAky7WBz_zDWpIYWinWhf_F-4At6D7Ftt_kieyCkPc9nmGKmKoFWYrc1FLD-h800M1hi4BKZXWcQrhuJGlFsMK4qYGHYuVv9SWYsxaCUTk6KmYBmliyuOwDLa1k3bYj3khOGA7lq2yFIQyX69bo6PkcLb_6MfmH4qpPsBQrqJvjQIhU38gc5_9EoVu5koiEKUnzOJozAHo&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105561055506239991922\">Ivy Lin</a>"
        ]
      },
      {
        "reference": "AciIO2cS4jhWFBkSP89WjVHqt0dad4zDVdBd6xUjzzSnbZtFoIKtpPdrcPyud5aYQgLycWiPpRhVUGoM2YutXa_lRfB5ZUy37ZMxn5owWC_mjqovS8MVZBV_X4t70QtyhfXJ3_N5siRpzN5A7a6JHLvP3RgfHOFoQx6he0_w7sDJDkt-DFXPxJQOVjpT22POE9b_QLgQk8Hhs9SN2lIkKlWCiS8B-oWBwMaGW-npSConnFEAHSmUt0qhWA-Oyh-_HQTAhaIs4LLCcaa5LqMLNwEvYvWsYZm9EgmcnOViOYJVHNjsMW0ZVaVIvn0JEHl6RYN0u7mUtfwL3Db2cJmCH04grKzyatpYcoaRTStT-FWzAm4OfuKC18BzK5J3K_HFFf07nzbX0MVGi5L0xmqo26Rx-QwxXurgFYptRa81WXTk14tV2L_-yQOqwJtDTw_kB-qX",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cS4jhWFBkSP89WjVHqt0dad4zDVdBd6xUjzzSnbZtFoIKtpPdrcPyud5aYQgLycWiPpRhVUGoM2YutXa_lRfB5ZUy37ZMxn5owWC_mjqovS8MVZBV_X4t70QtyhfXJ3_N5siRpzN5A7a6JHLvP3RgfHOFoQx6he0_w1200sDJDkt-DFXPxJQOVjpT22POE9b_QLgQk8Hhs9SN2lIkKlWCiS8B-oWBwMaGW-npSConnFEAHSmUt0qhWA-Oyh-_HQTAhaIs4LLCcaa5LqMLNwEvYvWsYZm9EgmcnOViOYJVHNjsMW0ZVaVIvn0JEHl6RYN0u7mUtfwL3Db2cJmCH04grKzyatpYcoaRTStT-FWzAm4OfuKC18BzK5J3K_HFFf07nzbX0MVGi5L0xmqo26Rx-QwxXurgFYptRa81WXTk14tV2L_-yQOqwJtDTw_kB-qX&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109746706888455256986\">benjamin fang</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Helga Keessen",
        "rating": 5,
        "text": "Very friendly waiter and exquisite food. We asked the waiter to surprise us. That worked out very well! Indian with modern touch/feel to it. Fresh and comforty food, with subtle flavours as well as small explosion bombs, without being heavy or fatty. Loved the color scheme and the space. Hope to come back. In the meantime I hope the will consider a restaurant in Amsterdam.",
        "time": 1759173256,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Zaheer Ahmad",
        "rating": 4,
        "text": "Nice place and it did get very busy! The waiter telling us we only had 30 minutes to eat out mains was not good. Otherwise food is good, I recommend the venison. The coconut lassi was not for me and also if you order their chai tell them you want it hot otherwise they will serve it cold! Odd but true.",
        "time": 1759056581,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Megha",
        "rating": 5,
        "text": "Went to Kricket in Shoreditch for dinner and had a really good time. The vibe was cool and relaxed, and the staff were friendly. Food was packed with flavour – a great mix of traditional Indian with a modern twist. They even brought out a grilled squash dish on the house, which was a nice surprise (and actually really good!). Everything we ordered was tasty and well put together.",
        "time": 1756022608,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Andrey Khorlin",
        "rating": 5,
        "text": "Great Indian food. The best biryani I have had in a long time. The shrimp and chicken were delicious as well. We liked this place better than Dishoom.",
        "time": 1759604882,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Jennifer C",
        "rating": 5,
        "text": "Delicious and unique flavours of India with a twist. Beautiful pink decor. Friendly service. Recommend the pork neck curry, samosa and all the naan breads. The fried chicken could have been crispier and more flavourful. Overall a great experience",
        "time": 1752349846,
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
    "lastVerifiedGoogle": "2025-10-15T10:54:46.899Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:46.899Z",
    "updatedAt": "2025-10-16T20:25:57.731Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Kricket Shoreditch - Kafé, Restaurant & Bar — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_kricket-shoreditch---kaf-resta_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.478Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Kricket Shoreditch - Kafé, Restaurant & Bar",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "35-42 Charlotte Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 1072
      },
      "url": "https://thebestinlondon.co.uk/restaurant/kricket-shoreditch-kaf-restaurant-bar-T-b-BK14",
      "openingHours": [
        "Monday: 8:00 AM – 10:30 PM",
        "Tuesday: 8:00 AM – 10:30 PM",
        "Wednesday: 8:00 AM – 10:30 PM",
        "Thursday: 8:00 AM – 10:30 PM",
        "Friday: 8:00 AM – 10:30 PM",
        "Saturday: 9:00 AM – 10:30 PM",
        "Sunday: 9:00 AM – 9:00 PM"
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
    "image_card_path": "/images/restaurants/kricket-shoreditch-kaf-restaurant-bar-T-b-BK14/indian-kricket-shoreditch-kaf-restaurant-bar-T-b-BK14-card-7d779891.webp",
    "image_hero_path": "/images/restaurants/kricket-shoreditch-kaf-restaurant-bar-T-b-BK14/indian-kricket-shoreditch-kaf-restaurant-bar-T-b-BK14-hero-ca7bd587.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ-e9iBwCn2EcRLTE0LfhvXy8",
    "slug": "fat-chef-authentic-indian-kitchen-halal-0LfhvXy8",
    "name": "FAT CHEF (Authentic Indian Kitchen) Halal",
    "description": "Authentic Indian cuisine that's as vibrant as the streets of Delhi - bold, beautiful, and delicious. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {
      "halal": true
    },
    "rating": 4.9,
    "user_ratings_total": 41,
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
    "postcode": "E15 1LN",
    "borough": "Central London",
    "lat": 51.55143409999999,
    "lng": 0.0055986,
    "phone": "020 8519 2001",
    "phone_international": "+44 20 8519 2001",
    "website": "http://www.fatchef.uk/",
    "url": "https://maps.google.com/?cid=3413570154271093037",
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
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
          },
          "open": {
            "day": 6,
            "time": "1600"
          }
        }
      ],
      "weekday_text": [
        "Monday: 4:00 – 11:00 PM",
        "Tuesday: 4:00 – 11:00 PM",
        "Wednesday: 4:00 – 11:00 PM",
        "Thursday: 4:00 – 11:00 PM",
        "Friday: 4:00 – 11:00 PM",
        "Saturday: 4:00 – 11:00 PM",
        "Sunday: 4:00 – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "indian",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "FAT CHEF (Authentic Indian Kitchen) Halal",
        "venueId": 575
      }
    ],
    "reviews": [
      {
        "author_name": "Sumaya Rashid",
        "author_url": "https://www.google.com/maps/contrib/101067856793654551078/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocIpeEmJjVGtjMbFrDOMvwVLunA76PvgP8PFKTWkeFqaQdFRbA=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "a year ago",
        "text": "My husband went to collect food today from this Indian takeaway. We ordered a king prawn jalfrazi and chicken vindaloo, and it was absolutely delicious! The food was full of flavour and cooked to perfection. Definitely ordering from Fat Chef again!",
        "time": 1727565170,
        "translated": false
      },
      {
        "author_name": "Kenny Leung",
        "author_url": "https://www.google.com/maps/contrib/118252710743535631545/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocL3yYLdlKKQrN-0YyufMcDgH12CGQCPNcVxACZtNZp7MkGB_Q=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Was really yummy. One of the best Indian food’s I’ve had in London, at a really affordable price with big portions and fantastic value for price. Will definitely come again! Delivery was also very quick!",
        "time": 1755112813,
        "translated": false
      },
      {
        "author_name": "Hassan Zimmedar",
        "author_url": "https://www.google.com/maps/contrib/106227770419114955491/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKpBxmtmZxqwbsf5VrBKg7TUZr7OMm8F1soXll18pxpQFbFWg=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "a year ago",
        "text": "Ordered a few dishes from Fat Chef and Alhamdulillah the food was 10/10 Allahuma Barik and also the customer service was 10/10 would highly recommend",
        "time": 1727556368,
        "translated": false
      },
      {
        "author_name": "Starballersacademy",
        "author_url": "https://www.google.com/maps/contrib/106487733886955437514/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJlkX0YuLESV71osD5mFdnR9XsggCBYc9J4tRAyJaNmuEPj6Q=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "11 months ago",
        "text": "Starballers Academy approached the Fat Chef team to cater for us on two separate occasions. They provided us fantastic services in all aspects even though we requested the orders with short notice. The orders were for 45 people and food was great on both occasions. Their customer service, professionalism and communication was excellent. They exceeded the expectations and executed their services to a high quality. We would recommend Fat Chef to all those requiring catering that is inclusive of tasty food and exceptional customer service.",
        "time": 1731200807,
        "translated": false
      },
      {
        "author_name": "The Connoisseur",
        "author_url": "https://www.google.com/maps/contrib/101439753020994244760/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWQq5IhiXv2cjtrBx7PDIJnf5IUtKb3fBUGCc_f-eo4d8m4vXwDJA=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "a year ago",
        "text": "I recently ordered from Fat Chef and it was a delightful experience. The flavors were authentic, bold, and vibrant, capturing the essence of traditional Indian/bangladeshi cuisine.\n\nIf you're craving delicious, authentic Indian food, I highly recommend this place. The dishes were flavorful, portions were generous, and everything was cooked with care. Perfect for a cozy night in or a quick meal on the go. Will definitely be ordering again!",
        "time": 1727639681,
        "translated": false
      }
    ],
    "types": [
      "establishment",
      "food",
      "meal_takeaway",
      "point_of_interest",
      "restaurant"
    ],
    "discoveredBy": {
      "query": "halal restaurant Stratford London",
      "area": "Stratford",
      "type": "halal-area"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:35.161Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:35.161Z",
    "updatedAt": "2025-10-16T23:14:36.059Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "FAT CHEF (Authentic Indian Kitchen) Halal — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_fat-chef-authentic-indian-kitc_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.531Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "FAT CHEF (Authentic Indian Kitchen) Halal",
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
        "ratingValue": 4.9,
        "reviewCount": 41
      },
      "url": "https://thebestinlondon.co.uk/restaurant/fat-chef-authentic-indian-kitchen-halal-0LfhvXy8",
      "openingHours": [
        "Monday: 4:00 – 11:00 PM",
        "Tuesday: 4:00 – 11:00 PM",
        "Wednesday: 4:00 – 11:00 PM",
        "Thursday: 4:00 – 11:00 PM",
        "Friday: 4:00 – 11:00 PM",
        "Saturday: 4:00 – 11:00 PM",
        "Sunday: 4:00 – 11:00 PM"
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
    "image_card_path": "/images/restaurants/fat-chef-authentic-indian-kitchen-halal-0LfhvXy8/indian-fat-chef-authentic-indian-kitchen-halal-0LfhvXy8-card-67bc130b.webp",
    "image_hero_path": "/images/restaurants/fat-chef-authentic-indian-kitchen-halal-0LfhvXy8/indian-fat-chef-authentic-indian-kitchen-halal-0LfhvXy8-hero-d53cdea0.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ_YxXC7YcdkgR7WdFQXF-uoc",
    "slug": "aladin-brick-lane-FQXF-uoc",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ_YxXC7YcdkgR7WdFQXF-uoc",
    "name": "Aladin Brick Lane",
    "description": "Where traditional recipes meet London's modern palate. Expect bold flavors, aromatic spices, and portions that'll have you planning your next visit before you've finished. With ratings this high, it's no wonder locals...",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 9944,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "132 Brick Ln, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "132 Brick Ln, London",
    "postcode": "E1 6RU",
    "borough": "Central London",
    "lat": 51.5205415,
    "lng": -0.0717058,
    "phone": "020 7247 8210",
    "phone_international": "+44 20 7247 8210",
    "website": "https://www.aladinbricklane.co.uk/",
    "url": "https://maps.google.com/?cid=9780268565679925229",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
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
        "reference": "AciIO2eJRLo3EdxzR1lQ7KRrVQPCa9gFwIhydYc4-Q_VehnKGmSn4LORVvpUIhmkhy51G2i1RQyBDVSvfnzMYZFiwj6jxQhjrGuWIGBk6Wn8-ufRF4Xlm0o2NMXLmrEN3_4yRTGJpWgT79NpUAZofeYVOjD1lrHeveAd0ggsj5kmvtCVEI6q9rkO5EUCfzWewiXZcTRpx_eCQ3HJfbWtmK_lbtVz5oz2pY-owiMqAsKRGp0fWp6RwtqlaCE-VzkdcgXH4SSdXyDzFhoQlBaR5i2Z0Lm1k8eQ8i02wqKP0Ch0y4-6ig",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eJRLo3EdxzR1lQ7KRrVQPCa9gFwIhydYc4-Q_VehnKGmSn4LORVvpUIhmkhy51G2i1RQyBDVSvfnzMYZFiwj6jxQhjrGuWIGBk6Wn8-ufRF4Xlm0o2NMXLmrEN3_4yRTGJpWgT79NpUAZofeYVOjD1lrHeveAd0ggsj5kmvtCVEI6q9rkO5EUCfzWewiXZcTRpx_eCQ3HJfbWtmK_lbtVz5oz2pY-owiMqAsKRGp0fWp6RwtqlaCE-VzkdcgXH4SSdXyDzFhoQlBaR5i2Z0Lm1k8eQ8i02wqKP0Ch800y4-6ig&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110432551628855256972\">Aladin Brick Lane</a>"
        ]
      },
      {
        "reference": "AciIO2dFvbbdoHNhEXSBQ7KMcV9I554qmSVkfdVjw7Gv5MOHckJGWnqZJhOy2c4n5GNOH5FEvajMcSS9mscDX4pVbxEsF8Htw6nUACQ15uRBuaGdqGhBvnnU7SeaZ2OJ9t0Efv2Ng7nGcqKJ1f1sHZ2TXm_fYTCLJ8IOU5ilEKXhS5EtguPoe5_vLegjaCeS7aFHO7eWlqO8pSB20rMmhfakDaED_SkR4-GDLgfJUuQdPSA3-qxRnY1wkzQROXnGGLWnVFlpyGTxVrYB1yIHTtNrq4Hqwyf8AyJWXDkTMqF3w87xnA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dFvbbdoHNhEXSBQ7KMcV9I554qmSVkfdVjw1200Gv5MOHckJGWnqZJhOy2c4n5GNOH5FEvajMcSS9mscDX4pVbxEsF8Htw6nUACQ15uRBuaGdqGhBvnnU7SeaZ2OJ9t0Efv2Ng7nGcqKJ1f1sHZ2TXm_fYTCLJ8IOU5ilEKXhS5EtguPoe5_vLegjaCeS7aFHO7eWlqO8pSB20rMmhfakDaED_SkR4-GDLgfJUuQdPSA3-qxRnY1wkzQROXnGGLWnVFlpyGTxVrYB1yIHTtNrq4Hqwyf8AyJWXDkTMqF3w87xnA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110432551628855256972\">Aladin Brick Lane</a>"
        ]
      },
      {
        "reference": "AciIO2f92mYKeFrtTKm59j9YKcggyT5cDOtkh5zX6OtAkQumsZ1rUXAA1MFAWeuhwqjUBLWbiLHJGALaNxP5yKppFgPCIzcuDYHMC5T0XzalUEF9mtzOp14iJDwFsAJYTB9f6YVkAGr8vXAQuuhUuvo5cS7kVjeLuz6dQpMheeJpA-G87JNJhIf2rNUK2ohs8pdynBUi7w9qONbjHtfvvovuI-M1tsmse2dduGU-qDHucp85gueRcAqi6xRrxp9ImiHw8Uq4Lj3GcdcBD_mHgAbJOe4252q2PvgLHQ4-fxH28sjpLYsejc00f1sZjN0qa_KkBZW-sBlkd7j2nc1A8uxOf-9NA4WaooPLW2-UpE8EsyF6GVPOL4PDuKpaDOXjqv0iIrhsZmu0FtJPU8Cm95d15--GB4Ndl8XSylmiJdNqtfvLbw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f92mYKeFrtTKm59j9YKcggyT5cDOtkh800zX6OtAkQumsZ1rUXAA1MFAWeuhwqjUBLWbiLHJGALaNxP5yKppFgPCIzcuDYHMC5T0XzalUEF9mtzOp14iJDwFsAJYTB9f6YVkAGr8vXAQuuhUuvo5cS7kVjeLuz6dQpMheeJpA-G87JNJhIf2rNUK2ohs8pdynBUi7w1200qONbjHtfvvovuI-M1tsmse2dduGU-qDHucp85gueRcAqi6xRrxp9ImiHw8Uq4Lj3GcdcBD_mHgAbJOe4252q2PvgLHQ4-fxH28sjpLYsejc00f1sZjN0qa_KkBZW-sBlkd7j2nc1A8uxOf-9NA4WaooPLW2-UpE8EsyF6GVPOL4PDuKpaDOXjqv0iIrhsZmu0FtJPU8Cm95d15--GB4Ndl8XSylmiJdNqtfvLbw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112776507926420567094\">S M</a>"
        ]
      },
      {
        "reference": "AciIO2fgXo1IzzKd3Gfysaxyb65ndFbnwq9TC2WTt2FE9mDfXY4WhDvwYBQj1uhN7tsrPH8oLWsEO8ahiVGtzIH0D-ajQ1eTW3yeZuXDa3L9HbELqKDWYoxj-E9hXQtVWzvK70jeJgu_0ZItHib6p7pdc30-EokWLuQUX1porNx51wrh7NGzmS1uVz_3jqkkz2EYasHzIEwtu-zdtaIs-3ysmf37frfSi5J9z4PDnQjURvVE6-XZSgRGCjnPEnKb-3Pend-h4bfRexDUMvY1cRUxmIGWOlf9EM57_Rl--WBzJ4zf7dwZWwUHS3qBMCHEKUa8HndgSGqZVuzeGOv1UboJKUqA8UchpNt-84EZfY2vCzIhSKnpjmfJ1FLQA3RJzqU8e-WNnky2OefxFCChMvomxVRIXeviE0purEkF-DjFbJBy4I4",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fgXo1IzzKd3Gfysaxyb65ndFbnwq9TC2WTt2FE9mDfXY4WhDvwYBQj1uhN7tsrPH8oLWsEO8ahiVGtzIH0D-ajQ1eTW3yeZuXDa3L9HbELqKDWYoxj-E9hXQtVWzvK70jeJgu_0ZItHib6p7pdc30-EokWLuQUX1porNx51wrh800NGzmS1uVz_3jqkkz2EYasHzIEwtu-zdtaIs-3ysmf37frfSi5J9z4PDnQjURvVE6-XZSgRGCjnPEnKb-3Pend-h4bfRexDUMvY1cRUxmIGWOlf9EM57_Rl--WBzJ4zf7dwZWwUHS3qBMCHEKUa8HndgSGqZVuzeGOv1UboJKUqA8UchpNt-84EZfY2vCzIhSKnpjmfJ1FLQA3RJzqU8e-WNnky2OefxFCChMvomxVRIXeviE0purEkF-DjFbJBy4I4&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114398068502280067884\">Lander Domínguez</a>"
        ]
      },
      {
        "reference": "AciIO2cZYAIiTnSg_s9mdZjV6p8PK63RybdCGIDCRufgwvR-lVdPVSCNm0no6px8JUPSvntH74fTafFCsn9a4PaIGbJ-NGC1vKcesq6gW4AHfIU9f-cimNEmW-gntYysZ74zRzHusvdIcBsgtYlRTpehvFdiAvnnB87mvY6PqS58Fn-HetgRpngmybew21YLwos3hwPJr7GjzOqhvX7gaWucEhjKyyGa4NwxYO-QivA4j-JA8lgViomVXyxgVrMcNPm0kxdNcgbbaTFvPprFFIR66nvAroiwuvODMYFhi-kMr8nvDZqh6hVTsLOFPDV7HtAr00GsQlOCah5MMyM42Jx5ijIq3UzJYWxPNnxoKpjXv5E7-FIykMSHP11habLs4yR25cQhWJMJtqq6EnhUEcOXbvSkDoCfodtB_V0nc1wptv45HcT0",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cZYAIiTnSg_s9mdZjV6p8PK63RybdCGIDCRufgwvR-lVdPVSCNm0no6px8JUPSvntH74fTafFCsn9a4PaIGbJ-NGC1vKcesq6gW4AHfIU9f-cimNEmW-gntYysZ74zRzHusvdIcBsgtYlRTpehvFdiAvnnB87mvY6PqS58Fn-HetgRpngmybew1200YLwos3hwPJr7GjzOqhvX7gaWucEhjKyyGa4NwxYO-QivA4j-JA8lgViomVXyxgVrMcNPm0kxdNcgbbaTFvPprFFIR66nvAroiwuvODMYFhi-kMr8nvDZqh800hVTsLOFPDV7HtAr00GsQlOCah5MMyM42Jx5ijIq3UzJYWxPNnxoKpjXv5E7-FIykMSHP11habLs4yR25cQhWJMJtqq6EnhUEcOXbvSkDoCfodtB_V0nc1wptv45HcT0&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106031348475784982187\">Maarten de Jong</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "M.M. R.",
        "rating": 2,
        "text": "Mediocre at best, and as others have said a lot of the reviews are not real. Lacking flavor and spice, and everything served warm.\n\nLamb samosa were dry and lacked flavor. Shrimp \"Blast\" was not fresh, and had a strong smell and was mealy - this was supposed to be thier award winning dish. Lamb kurma was gritty and way too sweet. The naan was quite good, but the paratha was gummy. Veggie biryani was decent.  Best part of the meal was the pappadums - although menu says thet are .75p/ea, but somehow got charged £6 for 5 (we made sure to count).\n\nI am sure that they were well reviewed in the past, but thier best days are long behind them. Service was really lacking, and they constantly seem put out just to get us water. Too bad we didn't have Jack serve us, who seems to be mentioned the exact same way in soooo many reviews.\n\nFinally, make sure to check your bill, they seem to just tack on charges. Our bill came to £88.65, but adding it I can't understand how.\n\nI do not recommend at all.",
        "time": 1755260296,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Jennifer Pine",
        "rating": 5,
        "text": "Best  meal ever, lamb bouzjon was fabulous as was everything.  Dudu, Manna and Kawsar  and Abdul were wonderful. Great service, great food, everyone should try this place. Jen and John from Australia 🇦🇺  5 stars 🌟 🌟🌟🌟🌟",
        "time": 1759082562,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "ian milne",
        "rating": 5,
        "text": "Went here yesterday as a birthday treat given to me by my wife.\nFood was excellent , service was very good and attentive decor a little dated but not an issue, would come here again.\nAtmosphere i marked down simply because we were the only ones in there as it was early.",
        "time": 1754569918,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Rachel Tari",
        "rating": 5,
        "text": "My sister and I had a lovely time at Aladin tonight for dinner. Jack was our server and he was polite and very friendly. The food was incredible- I have come here a few times before and I am always happy. Will definitely be back!",
        "time": 1751221166,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Yannick Rohrbasser",
        "rating": 3,
        "text": "Maybe there are hidden gems on brick lane but in 2025 it seems that, like this place, they have all become tourist traps. The food was average at best. Also be weary you can be seated in the windowless basement which is not appealing.",
        "time": 1750833603,
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
    "fsa_rating_text": "5",
    "fsa_authority": "Tower Hamlets",
    "fsa_url": "https://ratings.food.gov.uk/business/148512",
    "fsa_last_inspection": "2024-07-22T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:17.658Z",
    "lastVerifiedFSA": "2025-10-16T23:14:51.062Z",
    "createdAt": "2025-10-15T10:53:17.658Z",
    "updatedAt": "2025-10-16T20:24:09.593Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Aladin Brick Lane — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_aladin-brick-lane_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.427Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Aladin Brick Lane",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "132 Brick Ln, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 9944
      },
      "url": "https://thebestinlondon.co.uk/restaurant/aladin-brick-lane-FQXF-uoc",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/aladin-brick-lane-FQXF-uoc/indian-aladin-brick-lane-FQXF-uoc-card-9c4bc379.webp",
    "image_hero_path": "/images/restaurants/aladin-brick-lane-FQXF-uoc/indian-aladin-brick-lane-FQXF-uoc-hero-5fe438e0.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJv_uo9_YPdkgRq2K1F6d_5-g",
    "slug": "dishoom-kensington-1F6d_5-g",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJv_uo9_YPdkgRq2K1F6d_5-g",
    "name": "Dishoom Kensington",
    "description": "Not your average curry house. This Central London institution elevates indian cuisine with techniques that would make grandmothers proud and food critics weep. With ratings this high, it's no wonder locals keep coming...",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "cafe",
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 16167,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "Barkers Shopping Arcade, 4 Derry St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Barkers Shopping Arcade, 4 Derry St, London",
    "postcode": "W8 5SE",
    "borough": "Central London",
    "lat": 51.5012647,
    "lng": -0.191139,
    "phone": "020 7420 9325",
    "phone_international": "+44 20 7420 9325",
    "website": "https://www.dishoom.com/kensington/?utm_source=google&utm_medium=organic&utm_campaign=Yext&utm_content=D6-Kensington&y_source=1_MjMwNDkyMDctNzE1LWxvY2F0aW9uLndlYnNpdGU=",
    "url": "https://maps.google.com/?cid=16782522892053471915",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 11:00 PM",
        "Saturday: 9:00 AM – 11:00 PM",
        "Sunday: 9:00 AM – 11:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "0900"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
          },
          "open": {
            "day": 6,
            "time": "0900"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dMuWd2BVi2BUjl25axWLhT2ZLDemLnk3sQ-iD_lTp0uyN8an7BDhUa7rV1PGlkQ2XS6etEd8Eyk6mYTY6ZbEM97GzOtid77z4KKwDeRilDX8D6TEIUGYJUqrtY68eSEyTsTOlhKPLO4LdJBlzFJAqNPN36QzVJimkb5scknxVITewEXm06fSbGr4eC6znHLx1_CuxifRR01WvCMqW8kvKCdc7RYq1W6fPvODmTrAqwphOKPFVz_r5RzasjkiT4T2mjpAaBcHZ3gpQkVr-wrM9RtM-oqSuYt8Uth53JHPz3zA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dMuWd2BVi2BUjl25axWLhT2ZLDemLnk3sQ-iD_lTp0uyN8an7BDhUa7rV1PGlkQ2XS6etEd8Eyk6mYTY6ZbEM97GzOtid77z4KKwDeRilDX8D6TEIUGYJUqrtY68eSEyTsTOlhKPLO4LdJBlzFJAqNPN36QzVJimkb5scknxVITewEXm06fSbGr4eC6znHLx1_CuxifRR01WvCMqW8kvKCdc7RYq1W6fPvODmTrAqwphOKPFVz_r5RzasjkiT4T2mjpAaBcHZ3gpQkVr-wrM9RtM-oqSuYt8Uth800JHPz3zA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116811401093968325873\">Dishoom Kensington</a>"
        ]
      },
      {
        "reference": "AciIO2d9rZ6ndCEgi0oz66HzK_qYaNoKntfUqfd7srKFfe6z18n3tlIZvK1vSdETx0MG27715rhQHjFPA1VPRTTZAD5QnPVXZwAkP9TkE5NyQGmpaWRbH7_cKm3YQ8kfsbX09bO3wnYI2EWfj0Q6rAQCGzPu_8wpKmXzOD-HkOoG12iq1SUuK-jDPs_b67lmvQDoiyFmqLtzW6yt-NJRuFOMMrFkr1uu7gTU1ruPsfxS5gYNVpOLzZ8gOmnrfMIUf5qg8PAKpI4f7HhZGSOijnJO_yeClm2a6Nh_l86K94h8Hkk_MQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d9rZ6ndCEgi0oz66HzK_qYaNoKntfUqfd7srKFfe6z18n3tlIZvK1vSdETx0MG27715rhQHjFPA1VPRTTZAD5QnPVXZwAkP9TkE5NyQGmpaWRbH7_cKm3YQ8kfsbX09bO3wnYI2EWfj0Q6rAQCGzPu_8wpKmXzOD-HkOoG12iq1SUuK-jDPs_b67lmvQDoiyFmqLtzW6yt-NJRuFOMMrFkr1uu7gTU1ruPsfxS5gYNVpOLzZ8gOmnrfMIUf5qg8PAKpI4f7HhZGSOijnJO_yeClm2a6Nh_l86K94h800Hkk_MQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116811401093968325873\">Dishoom Kensington</a>"
        ]
      },
      {
        "reference": "AciIO2cATGmOpq3QZN1BEYw-qfm_HZfyxvUHn1nFkte54V0pIjSoq-EyEuqQOD7Wo4sK1EsblL82eM5NF82NAMO4fuCtVpv7SJL1R619XQuI2dOLj3GME62KB55FWZr1h-P7_c8duJ7TIIWb3Qeq0VgFhtIEuEnstv4hUic51-1izgxqQk5mK6J1VgO3imFdY8naAo5ri5kSJKnuV5LUjVFZV14Oa2lz0xVV1rB7EWZ_KLZZ84MYyHUndpQoRyDHH5LdvWDy32xY0cuB9qNQsC0bDSE3tT6N3rb7ZDmlWh3fjjscfPPCBBlQch4kGtl0xwNR55Bd_A5VWQo4RIxCiAYjqSUMbZlOySOy9j_xUusv8clvL8BEV--dIhkmUY0mHft3VkPBRsAb3vqlUZZ7LBDYZKBcF1Wq5Hh5xmNtvq4-yYT7OQowK-Jps7rxMFX_OcFy",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cATGmOpq3QZN1BEYw-qfm_HZfyxvUHn1nFkte54V0pIjSoq-EyEuqQOD7Wo4sK1EsblL82eM5NF82NAMO4fuCtVpv7SJL1R619XQuI2dOLj3GME62KB55FWZr1h-P7_c8duJ7TIIWb3Qeq0VgFhtIEuEnstv4hUic51-1izgxqQk5mK6J1VgO3imFdY8naAo5ri5kSJKnuV5LUjVFZV14Oa2lz0xVV1rB7EWZ_KLZZ84MYyHUndpQoRyDHH5LdvWDy32xY0cuB9qNQsC0bDSE3tT6N3rb7ZDmlWh800fjjscfPPCBBlQch4kGtl0xwNR55Bd_A5VWQo4RIxCiAYjqSUMbZlOySOy9j_xUusv8clvL8BEV--dIhkmUY0mHft3VkPBRsAb3vqlUZZ7LBDYZKBcF1Wq5Hh5xmNtvq4-yYT7OQowK-Jps7rxMFX_OcFy&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102152710221156635486\">Tiff Ting</a>"
        ]
      },
      {
        "reference": "AciIO2eb30wj2qTMymARJFZBwUXLiYu3csG_KqUCGe5PKEKL916PRrieE7iUNwFYa9BW5vwvqR3tLT_g2gpq3FsBesDVpq-8q-ii7h6k539yDDsq114qCE8S2uDFlPAfVmRwgmhMokHZYJJCOVEPByTEv8lZfVyncRFtY4rChvely6aIXsEQkm0c8-DAj0w0bCEQ2VEb-hGMK7CXuolq4vbzV9VWiHyZ2Dp-SW7ebYb1gN1shunpw06wP6Pa1v7sLdxxMt6-AT4DW7wJ-qbrdF0rxUPHyqvwXyTuysJJnJheT8mWUaa3CazqLwX_X9YS20UEPE1HaVo9GY9ZvllqbBo2qQceBw-vgg3_B--At2o_5kH8zKhX-uwL4vmzNWCpd_ak-GL8ID8oQskWrl3t4NhEy3sgLKAcJHVPchEO4q_EJxrrlu0m5YXoJ38NhtiXJoau",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eb30wj2qTMymARJFZBwUXLiYu3csG_KqUCGe5PKEKL916PRrieE7iUNwFYa9BW5vwvqR3tLT_g2gpq3FsBesDVpq-8q-ii7h800k539yDDsq114qCE8S2uDFlPAfVmRwgmhMokHZYJJCOVEPByTEv8lZfVyncRFtY4rChvely6aIXsEQkm0c8-DAj0w1200bCEQ2VEb-hGMK7CXuolq4vbzV9VWiHyZ2Dp-SW7ebYb1gN1shunpw06wP6Pa1v7sLdxxMt6-AT4DW7wJ-qbrdF0rxUPHyqvwXyTuysJJnJheT8mWUaa3CazqLwX_X9YS20UEPE1HaVo9GY9ZvllqbBo2qQceBw-vgg3_B--At2o_5kH8zKhX-uwL4vmzNWCpd_ak-GL8ID8oQskWrl3t4NhEy3sgLKAcJHVPchEO4q_EJxrrlu0m5YXoJ38NhtiXJoau&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100195276502657732354\">iara hennemann machado</a>"
        ]
      },
      {
        "reference": "AciIO2fIIoFNKMxbMaaVy5sHAMCwx4gr5e6xPdMr2_D-0G9BDqwePzlKWWCF3whxdiH2R4MOzm-OhHJzdnIpnN1RtnBM0SljLj37MiwNSZmbGNHQOE59yAfNfzC7Ic-OnHY8psASAcHNhuYKPQn-wbeS8CJdZvRj9JPp4-816JTqGDBkJJ99VZI0miMe4KJzI5oaPFcPjYBiNs0LgQ1ZVqPLjPE3XC-C7J-DcJ5bUfCgyLc4hIpMervvX6BERpcyTDRdZIytOJ02-y-YerZDliiVNtF5cIX2MA4NIsJh4zttcEBDBu1cfLfqGObni55KaUKeRG6Nc99X8ocqfdlE8xGEMgbji7gRruXsYoZPDmep0UvhBYthoRBGFRIwqOnCSFWf5WyOdv8Gn6Zw7_1V4QXHuR8BKAGiqCO2okSTwiMOzd5M_mkX1gbCP6nxNge4qQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fIIoFNKMxbMaaVy5sHAMCwx4gr5e6xPdMr2_D-0G9BDqwePzlKWWCF3whxdiH2R4MOzm-OhHJzdnIpnN1RtnBM0SljLj37MiwNSZmbGNHQOE59yAfNfzC7Ic-OnHY8psASAcHNhuYKPQn-wbeS8CJdZvRj9JPp4-816JTqGDBkJJ99VZI0miMe4KJzI5oaPFcPjYBiNs0LgQ1ZVqPLjPE3XC-C7J-DcJ5bUfCgyLc4hIpMervvX6BERpcyTDRdZIytOJ02-y-YerZDliiVNtF5cIX2MA4NIsJh800zttcEBDBu1cfLfqGObni55KaUKeRG6Nc99X8ocqfdlE8xGEMgbji7gRruXsYoZPDmep0UvhBYthoRBGFRIwqOnCSFWf5WyOdv8Gn6Zw1200_1V4QXHuR8BKAGiqCO2okSTwiMOzd5M_mkX1gbCP6nxNge4qQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102152710221156635486\">Tiff Ting</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Lili Szórád",
        "rating": 5,
        "text": "This place offers a unique dining experience with its retro-inspired interior and welcoming atmosphere. The service was excellent—friendly waiters. 🍳\nThe filled breakfast naan was a perfect start, and the chocolate lava dessert with vanilla chili ice cream was simply divine. A must-try spot for great food and warm service!",
        "time": 1758465638,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Tricia Avenido",
        "rating": 4,
        "text": "Went here based on YouTube travel videos.\n\nAlso, made a reservation ahead of time because of its popularity.\n\nIf you like spicy food, this is the place for you.\n\nWe've had spicy food in Southern California, but in comparison to how it was here, what we had before was toned down. There's no holding back at this restaurant.\n\nI wondered why the portions seemed small and just contributed it to European culture until I realized the food is so spicy that we could only eat so much in one sitting.\n\nThe servers were friendly enough, although I wish they had left the pitcher of water on our table instead of us waiting for them to refill our cups. Better yet, milk might have been better.\n\nAs for the restaurant itself, it's a mix of retro and modern.\n\nThe bathrooms were really retro, like the toilets had the pull chain and the sink had the 2 different faucets for hot and cold.\n\nIt's a nice restaurant, just know that eating the food here is like being on an episode of \"Hot Ones\".",
        "time": 1756919918,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Jiao Zhang",
        "rating": 5,
        "text": "Just love Dishroom. A chain overall the London, but consistent good quality food, great service, and beautiful ambiance. We tried what the waiter recommended. The are all good. Even the dessert - rice pudding is good not so sweet. This place is definitely one of the best restaurants in London.",
        "time": 1757956831,
        "relative_time_description": "4 weeks ago"
      },
      {
        "author_name": "Private Name",
        "rating": 4,
        "text": "Such an amazing atmosphere! The wait for a walk-in for 2 Monday at 6PM was an hour. We had the option of waiting at the bar so we ordered a drink and were able to sit and wait.\n\nOnce seated, we were there for about an hour. The food came out fast, but we ended up waiting for our check for about 15 minutes.\n\nThe food was great, but honeslty the Chicken Ruby was too sweet for my liking.\n\nThey also charged us for our anniversary cake/ice cream that we didn't order and assuming was a gift. Im sure it was a mistake they would have corrected if we mentioned it, but we were both so jet lagged we just wanted to go back to our hotel after waiting for the check.",
        "time": 1759839144,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Violet Violence",
        "rating": 5,
        "text": "Ruth and Beth are such lovely people and made the place very welcoming. The food is phenomenal. The atmosphere is amazing. They allowed my dog (outside seating) and everyone was so sweet towards him! I really like that the restaurant is sustainable and generous.",
        "time": 1756934043,
        "relative_time_description": "a month ago"
      }
    ],
    "types": [
      "bar",
      "cafe",
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
    "lastVerifiedGoogle": "2025-10-15T10:53:15.572Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:15.572Z",
    "updatedAt": "2025-10-16T20:24:09.887Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Dishoom Kensington — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Dishoom Kensington",
      "image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Barkers Shopping Arcade, 4 Derry St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 16167
      },
      "url": "https://thebestinlondon.co.uk/restaurant/dishoom-kensington-1F6d_5-g",
      "openingHours": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 11:00 PM",
        "Saturday: 9:00 AM – 11:00 PM",
        "Sunday: 9:00 AM – 11:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "twitter_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/dishoom-kensington-1F6d_5-g/indian-dishoom-kensington-1F6d_5-g-card-3fc1a7b1.webp",
    "image_hero_path": "/images/restaurants/dishoom-kensington-1F6d_5-g/indian-dishoom-kensington-1F6d_5-g-hero-7c2a2fc3.webp",
    "cuisine_match": true,
    "last_updated": "2025-10-18T14:56:05.428Z"
  },
  {
    "place_id": "ChIJnVf83AIbdkgR054D55weEBY",
    "slug": "colonel-saab-D55weEBY",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJnVf83AIbdkgR054D55weEBY",
    "name": "Colonel Saab",
    "description": "Fancy restaurant with an old-world vibe offering creative Indian cooking, plus cocktails.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 5448,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "193-197 High Holborn, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "193-197 High Holborn, London",
    "postcode": "WC1V 7BD",
    "borough": "Central London",
    "lat": 51.5169661,
    "lng": -0.1226498,
    "phone": "020 8016 6800",
    "phone_international": "+44 20 8016 6800",
    "website": "https://colonelsaab.co.uk/",
    "url": "https://maps.google.com/?cid=1589804327701290707",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Saturday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Sunday: 5:00 – 9:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2100"
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
            "day": 1,
            "time": "2200"
          },
          "open": {
            "day": 1,
            "time": "1730"
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
            "time": "2200"
          },
          "open": {
            "day": 2,
            "time": "1730"
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
            "time": "2200"
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
            "time": "2200"
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
            "time": "2200"
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
            "time": "2200"
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
        "reference": "AciIO2dNTVvAkzcoUePTd2VEfQD5GWG0oI5Xphy_ubIXs0rWOnysL-zEWRH9yCDWsJEXtYi8sCsqhKT2SzCMWUxMUBX087PrdYLTgFPFxNoC1mSp0PczJik8mIl3a5A9SB9Go-tfpl6FmC8BfI-1vx8za8WSXOCRqovrEYntnI2ml8LsHjAo4BdVr6BD4T2svKu9YBg68VaH54ycZmg1nEfcXZWLeCBca1YQNH7_LJ_fqBvin-Ml0Y65Olffc9TeRR6WZxNwaxmT_KZDHKn8QmZHgN3b9nL9Fb2pbkoWbUlFXGLUew",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dNTVvAkzcoUePTd2VEfQD5GWG0oI5Xphy_ubIXs0rWOnysL-zEWRH9yCDWsJEXtYi8sCsqhKT2SzCMWUxMUBX087PrdYLTgFPFxNoC1mSp0PczJik8mIl3a5A9SB9Go-tfpl6FmC8BfI-1vx8za8WSXOCRqovrEYntnI2ml8LsHjAo4BdVr6BD4T2svKu9YBg68VaH54ycZmg1nEfcXZWLeCBca1YQNH7_LJ_fqBvin-Ml0Y65Olffc9TeRR6WZxNwaxmT_KZDHKn8QmZHgN3b9nL9Fb2pbkoWbUlFXGLUew&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108163998745124394257\">Colonel Saab</a>"
        ]
      },
      {
        "reference": "AciIO2fWOow-tjM4vmqFOmJc5ew0nsoEoP0vOf_EYcEyrDLV5-nGLmqN8tkIZa6Sv_Km6LcWiVOrOPdckxbMPFcVZgsSSjC7Dx33aZInxd3LGWyPduRapDAi1-eOFGDEzSWecY1y7hmoT5ZNLHujTcBIVI8ZAlMmBV4RLxLftChL0oKw95b6mxlxApYlrZi5VZBXDdTVQZ8JXwDx8Ox0y3W5HHcJCKSbbzuh9yOBGyJUaerE3LFMTA0zs0F4PLcePlmEWHuqSD4thrm46gBgv6JLcmnAzfEUgLkKrmm8ElJQZvxHDw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fWOow-tjM4vmqFOmJc5ew1200nsoEoP0vOf_EYcEyrDLV5-nGLmqN8tkIZa6Sv_Km6LcWiVOrOPdckxbMPFcVZgsSSjC7Dx33aZInxd3LGWyPduRapDAi1-eOFGDEzSWecY1y7hmoT5ZNLHujTcBIVI8ZAlMmBV4RLxLftChL0oKw95b6mxlxApYlrZi5VZBXDdTVQZ8JXwDx8Ox0y3W5HHcJCKSbbzuh800yOBGyJUaerE3LFMTA0zs0F4PLcePlmEWHuqSD4thrm46gBgv6JLcmnAzfEUgLkKrmm8ElJQZvxHDw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108163998745124394257\">Colonel Saab</a>"
        ]
      },
      {
        "reference": "AciIO2fIRuyZhUUvVdKqwawgcEqLaOtnw_CAr561nyFqwHVxSlp0XKZOGlZ0kdKrULZnJl5W4BOXshoThjwKvCxeooK85KfP2Os_VWVjAM_bWdLyqjOueKDU_c3eLcg4sX1AqodlUZHgJsoLmqR5tPY8sd-Ei7joPB8szsOzifMqxv0AiqH7u_d2S9cnyUa0g_M1Ufen9ww6lf4JAexv1pKW1opJG2da6BDO6gfLgmYgyrWH-_iA23bHTR5E7lhDyEzdNgbvARfV9gFMSAWtB0NgJtCK1qqBEEY0vPIAU0iVXAhFFp4aXvlwe39AWn6RbQc1TBg03RhV4YUn7cf0PKBkcTzeVL5fukFZyLvD0vkjqQ1fAo9AWK3ovvwuRZXhD8oSjjhcI0rBSkDoro1-_6NFI1UHy1lcNJ7X_2qCOk69RAOu7ojl24PwldfHkIROXBei",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fIRuyZhUUvVdKqwawgcEqLaOtnw_CAr561nyFqwHVxSlp0XKZOGlZ0kdKrULZnJl5W4BOXshoThjwKvCxeooK85KfP2Os_VWVjAM_bWdLyqjOueKDU_c3eLcg4sX1AqodlUZHgJsoLmqR5tPY8sd-Ei7joPB8szsOzifMqxv0AiqH7u_d2S9cnyUa0g_M1Ufen9ww1200lf4JAexv1pKW1opJG2da6BDO6gfLgmYgyrWH-_iA23bHTR5E7lhDyEzdNgbvARfV9gFMSAWtB0NgJtCK1qqBEEY0vPIAU0iVXAhFFp4aXvlwe39AWn6RbQc1TBg03RhV4YUn7cf0PKBkcTzeVL5fukFZyLvD0vkjqQ1fAo9AWK3ovvwuRZXhD8oSjjhcI0rBSkDoro1-_6NFI1UHy1lcNJ7X_2qCOk69RAOu7ojl24PwldfHkIROXBei&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113351272054825446328\">Manex</a>"
        ]
      },
      {
        "reference": "AciIO2e6NFD-MLYVIyY2TBz5I8j2h7S3OUd8nvPYLQcCn9S2rpteUrSxZcV05sjx4Uu1tl2zKEmHMy1TiVgdKJ_OOi3Bno7jVSZle3TVSgy4zPxYNQBItQdpyjDQZ1XaIPapJiXiDYM0hkCEVmHedKQ4n8tiJdkOpo4MRIvenrESg12rFnsk5w7M9RIptXFmJpxR5umzNy-5LGhoD9oWNBkj-XJxUIla0OcuzSi7w9NLPSumCp24Ws9AXj2AzvyWIY5nyy_LAYU1ibmxm0rWFfj5FuX91euv9RFCeFV9343w0GzCnt1D7AzFU1aTyW9ll4CiQ9ydgzChEtFnY1h_Fl5GnkwusRluToD6y77kwEiF-CoHuJlI52cqPzkhs_0xZcVSvSiz0vuntHSqYqTYJRjJimKdpZOyGRXomxUkPEHOvwa4aHOl",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e6NFD-MLYVIyY2TBz5I8j2h800S3OUd8nvPYLQcCn9S2rpteUrSxZcV05sjx4Uu1tl2zKEmHMy1TiVgdKJ_OOi3Bno7jVSZle3TVSgy4zPxYNQBItQdpyjDQZ1XaIPapJiXiDYM0hkCEVmHedKQ4n8tiJdkOpo4MRIvenrESg12rFnsk5w1200M9RIptXFmJpxR5umzNy-5LGhoD9oWNBkj-XJxUIla0OcuzSi7w9NLPSumCp24Ws9AXj2AzvyWIY5nyy_LAYU1ibmxm0rWFfj5FuX91euv9RFCeFV9343w0GzCnt1D7AzFU1aTyW9ll4CiQ9ydgzChEtFnY1h_Fl5GnkwusRluToD6y77kwEiF-CoHuJlI52cqPzkhs_0xZcVSvSiz0vuntHSqYqTYJRjJimKdpZOyGRXomxUkPEHOvwa4aHOl&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109654123170550531434\">Manuel Pedroso</a>"
        ]
      },
      {
        "reference": "AciIO2dzQ1-KVclwz5MWom0EkNACnXnIp8JhnO-J12Z76DjUjtaZZZYNBf3VTx3DLr8gS0TYss37MxRBYaMgywLPIeAWhI2uX4wJ4RMGyTjSb0adX72qdf9ItyCNzImWbqtZO5dpghd6e6PJhrn6G3f0FHysPQhViJbVR6uVjDvjCX5aKrVHiX6k79xMMiZ7pKoSGbR9IhCL5YIgaJzkhWvlYmgADYfj6MqBM1X0P8BigTCZcNdQGefMYs1GCQT1-LCb0TvqtfjT_6MvfeTkTvlwWlKVH89jiolNPGx5fMNBdsKF8Q29ZB4d2qlRXTzB0keHLno7hKSQCcvVL23td1W5zyOx74ebkkpjYhPDPvKKZ9c4jWgH1_7zV8_k_DsjjeV8V4GfMSNbdS1df3luoAAvLWzDleNn-3gQPaLja09qEBczte7rvvFOq3FVZCIJyg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dzQ1-KVclwz5MWom0EkNACnXnIp8JhnO-J12Z76DjUjtaZZZYNBf3VTx3DLr8gS0TYss37MxRBYaMgywLPIeAWhI2uX4wJ4RMGyTjSb0adX72qdf9ItyCNzImWbqtZO5dpghd6e6PJhrn6G3f0FHysPQhViJbVR6uVjDvjCX5aKrVHiX6k79xMMiZ7pKoSGbR9IhCL5YIgaJzkhWvlYmgADYfj6MqBM1X0P8BigTCZcNdQGefMYs1GCQT1-LCb0TvqtfjT_6MvfeTkTvlwWlKVH89jiolNPGx5fMNBdsKF8Q29ZB4d2qlRXTzB0keHLno7hKSQCcvVL23td1W5zyOx74ebkkpjYhPDPvKKZ9c4jWgH1_7zV8_k_DsjjeV8V4GfMSNbdS1df3luoAAvLWzDleNn-3gQPaLja09qEBczte7rvvFOq3FVZCIJyg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103581141414189201330\">Jackson N</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Manex",
        "rating": 5,
        "text": "The food and setting was spectacular.. a very different menu to any other with everything absolutely delicious. We tried dishes that were completely unknown to us, which makes for an exciting change. The Banarasi cocktail was excellent. The service was polite and courteous, though we caught them just as the kitchen was closing and they were setting up for the evening, so we may have not got the best of their attentions. Already looking forward to going back and trying the full tasting menu.",
        "time": 1760175207,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Shipra Joshi",
        "rating": 5,
        "text": "I recently went for afternoon tea at Colonel Sahab, and it turned out to be a truly delightful experience. The ambiance had a charming mix of elegance and warmth, making it perfect for a relaxed afternoon. The service was attentive without being overbearing, which added to the comfort.\n\nThe food was beautifully presented—fancy yet rooted in Indian flavors, giving the whole spread a unique twist. Every bite felt fresh and thoughtfully crafted.\n\nNow, here’s an unpopular opinion—I’m not really a chai person. Instead, I opted for a citrus chamomile tea, which was refreshing, light, and soothing. My friend went with the classic chai, and I have to admit—it smelled heavenly and tasted amazing too.\n\nIt is on the pricier side, but the overall experience makes it worth it—great food, lovely drinks, and a calm, welcoming atmosphere. I’d definitely recommend it if you’re looking to indulge in a refined afternoon tea with an Indian touch.",
        "time": 1759267091,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Phil My Glass",
        "rating": 5,
        "text": "Amazing place. The staff are super friendly, the menu is well structured with lots of options for everyone and a great mix of different flavours and textures. The wine list is built to match the food. I had the prawn chimichi started and the fish curry as a main. The food was cooked to perfection and full of flavour. My waiter, Rony, was attentive, smiley and seemed genuinely pleased to be serving my table. I used to manage restaurants and he is sort of person I would have employed in a heartbeat, a true example of what hospitality should be.\n\nThe restaurant was busy as well, on a Monday! Which made for a great atmosphere.  Lots of happy diners and a really nice dining room with perfect lighting and lovely decor.\n\nI don’t live in London, but the next time I’m back here I will be making a beeline for Colobel Saab!",
        "time": 1759177785,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Eduardo Magalhaes",
        "rating": 5,
        "text": "From the very first moment you step inside Colonel Saab, you’re welcomed into a warm and inviting atmosphere. The décor tells a story — rooted in Indian heritage yet stylishly curated — and it instantly sets the tone for what’s to come.\n\nThe food ranges between flawless and truly mind-blowing. Classics like the butter chicken are executed to perfection, while surprising dishes such as the broccoli with cheese starter stand out as memorable highlights. Every plate feels carefully thought through.\n\nService is impeccable: attentive without ever being intrusive. The staff gave just the right amount of time to make decisions, and service flowed seamlessly, with plates arriving and leaving exactly when they should.\n\nThe cocktails deserve their own spotlight. Signature drinks are not only beautifully presented but also pair remarkably well with the dishes — a rare balance of taste and detail. Even the non-alcoholic options were crafted with the same level of care.\n\nOverall, Colonel Saab is a restaurant I would recommend to anyone. It’s a place I’ll gladly return to every time I’m in London. Add to that the fact that the prices feel fair for the quality delivered, and you have a true gem worth experiencing.",
        "time": 1755300883,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Daniel Wheeler",
        "rating": 5,
        "text": "Visited with my lady as part of a date day to London for Sunday dinner. This restaurant came highly recommended by one of her colleagues.\n\nEntry to be greeted by many awards & trophies is a promising sight. Interior is nice with lots of characterful Indian touches & memorabilia on the walls.\n\nWe both sampled the tasting menu at £80 _each_. Wherever there was an option of choice we had both between us and shared.\n\nThroughout the meal, our waiters would give us a geographical & culinary history of the dishes as they arrive. A fantastic meal, every plate, bowl & morsel was ravenously consumed.",
        "time": 1748871707,
        "relative_time_description": "4 months ago"
      }
    ],
    "types": [
      "bar",
      "establishment",
      "food",
      "meal_takeaway",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 1,
    "fsa_rating_text": "1",
    "fsa_authority": "Camden",
    "fsa_url": "https://ratings.food.gov.uk/business/1334977",
    "fsa_last_inspection": "2025-04-03T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:17.329Z",
    "lastVerifiedFSA": "2025-10-16T23:19:45.823Z",
    "createdAt": "2025-10-15T10:53:17.329Z",
    "updatedAt": "2025-10-16T20:25:02.742Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Colonel Saab — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_colonel-saab_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.454Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Colonel Saab",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "193-197 High Holborn, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 5448
      },
      "url": "https://thebestinlondon.co.uk/restaurant/colonel-saab-D55weEBY",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Thursday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Friday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Saturday: 12:00 – 3:00 PM, 5:30 – 10:00 PM",
        "Sunday: 5:00 – 9:00 PM"
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
    "image_card_path": "/images/restaurants/colonel-saab-D55weEBY/indian-colonel-saab-D55weEBY-card-10635576.webp",
    "image_hero_path": "/images/restaurants/colonel-saab-D55weEBY/indian-colonel-saab-D55weEBY-hero-f263648f.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJe0JmmEUDdkgRhyBBKRQW0f0",
    "slug": "dishoom-canary-wharf-BKRQW0f0",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJe0JmmEUDdkgRhyBBKRQW0f0",
    "name": "Dishoom Canary Wharf",
    "description": "Modern European dining that doesn't take itself too seriously, but takes your taste buds very seriously indeed. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "cafe",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 8349,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "13 Water St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "13 Water St, London",
    "postcode": "E14 5GX",
    "borough": "Central London",
    "lat": 51.50312419999999,
    "lng": -0.0135691,
    "phone": "020 7420 9326",
    "phone_international": "+44 20 7420 9326",
    "website": "https://www.dishoom.com/canary-wharf/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile",
    "url": "https://maps.google.com/?cid=18289423837575585927",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 12:00 AM",
        "Saturday: 9:00 AM – 12:00 AM",
        "Sunday: 9:00 AM – 11:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "0900"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0000"
          },
          "open": {
            "day": 6,
            "time": "0900"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2eH8mtvNMb11e_oZTFpTb3es-wzlnoTBJ-DC7sf0fvsHVFOxMhOb26XsPTz6KteljlE71J8NveDQkFSi6aa31YpGJKhYOaBzZomeH2vdMCCBYKYLV_dfhpZPutp1Y6cFiibzTjQJpiR6JL9vZ73FspjUwIDIOxoLvuFQnjEsEiF7nbfXP_FK6v-4t7Qcv1LdI67oQBJ_YXT-eCPVHBRN0Vz4zYNpbklLDBEx7dob9cXL04bK-4rZlxQDo7qirvpnQDpkNiV4kzLZIfc9vRaMWLu5kqBBQXmwlB9uaU0LxMNWA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eH8mtvNMb11e_oZTFpTb3es-wzlnoTBJ-DC7sf0fvsHVFOxMhOb26XsPTz6KteljlE71J8NveDQkFSi6aa31YpGJKhYOaBzZomeH2vdMCCBYKYLV_dfhpZPutp1Y6cFiibzTjQJpiR6JL9vZ73FspjUwIDIOxoLvuFQnjEsEiF7nbfXP_FK6v-4t7Qcv1LdI67oQBJ_YXT-eCPVHBRN0Vz4zYNpbklLDBEx7dob9cXL04bK-4rZlxQDo7qirvpnQDpkNiV4kzLZIfc9vRaMWLu5kqBBQXmwlB9uaU0LxMNWA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111166407533249925512\">Dishoom Canary Wharf</a>"
        ]
      },
      {
        "reference": "AciIO2fjCkA0349_xQHtrNOgatH-K90BkD3Zmv5Q6tfU4AdskHHtw6i_e3dRV2lOhUYKamMb-TBDjtgAb9vjvxhRL-wzZa2IDeiJC_wIvhv3zLFHNh--T-wgFz-JowzfoaOlOpoKPQgnwWsiIvO97ilZUDbof9qg1iFC_kIH2IaspfB2POzHUwaTHyWSnw1a_J7ctPcoiU3TZjMi0lLFI287FdeKieMDkzP4GyWsqryLX17Bx-lODHcpc-jLgFqU5abHUxDdl-5V6fAm1GiwaOkKka0yNZFVolW9rgrkTVgXRv7L5-tLf7MtWfEszyVPgOTFoAyKwtSKoiUZL0otOueV8-aAiVmfOHF9yDmKof-gTEqAFRfaARUA2wYj5I1oHrnWxOftPcbNayuLuxPXRjzDI-0eCYxmUyclkGLOmvUew4xCv_q0lQuhhaSk-swqbQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fjCkA0349_xQHtrNOgatH-K90BkD3Zmv5Q6tfU4AdskHHtw1200i_e3dRV2lOhUYKamMb-TBDjtgAb9vjvxhRL-wzZa2IDeiJC_wIvhv3zLFHNh--T-wgFz-JowzfoaOlOpoKPQgnwWsiIvO97ilZUDbof9qg1iFC_kIH2IaspfB2POzHUwaTHyWSnw1a_J7ctPcoiU3TZjMi0lLFI287FdeKieMDkzP4GyWsqryLX17Bx-lODHcpc-jLgFqU5abHUxDdl-5V6fAm1GiwaOkKka0yNZFVolW9rgrkTVgXRv7L5-tLf7MtWfEszyVPgOTFoAyKwtSKoiUZL0otOueV8-aAiVmfOHF9yDmKof-gTEqAFRfaARUA2wYj5I1oHrnWxOftPcbNayuLuxPXRjzDI-0eCYxmUyclkGLOmvUew4xCv_q0lQuhhaSk-swqbQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105933532440320664419\">Ankitha Chapte</a>"
        ]
      },
      {
        "reference": "AciIO2cYuh2ctHKsACjBVp7MDdV0Vwg4vJFHztoiJkzPsFLMpnsfVTzlZdxUS6yj1AydxAPisIuFrLds-JxJYsOOjMTwxhSWWYpFSl4KRf0tsPdB_hGBcYzCMGDGZ6-znAKEwt3fncyBy60rhdVtUWmmnVcyGTpre2upgRSOfAqYQ_TzHR1fC8_HFwKX7XLa_rtDIOh1vGnSE-uunXCC7huYMWg9bfXUmqF9OrTbmg6jVVOJPe6myhB5C75OT98WeAwDzNIAu0t_KYImHVSKIgZNXDYHkZX3vfGPmB5D72bjTsLRxg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cYuh800ctHKsACjBVp7MDdV0Vwg4vJFHztoiJkzPsFLMpnsfVTzlZdxUS6yj1AydxAPisIuFrLds-JxJYsOOjMTwxhSWWYpFSl4KRf0tsPdB_hGBcYzCMGDGZ6-znAKEwt3fncyBy60rhdVtUWmmnVcyGTpre2upgRSOfAqYQ_TzHR1fC8_HFwKX7XLa_rtDIOh1vGnSE-uunXCC7huYMWg9bfXUmqF9OrTbmg6jVVOJPe6myhB5C75OT98WeAwDzNIAu0t_KYImHVSKIgZNXDYHkZX3vfGPmB5D72bjTsLRxg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111166407533249925512\">Dishoom Canary Wharf</a>"
        ]
      },
      {
        "reference": "AciIO2fYTomflmYcOr6kSoKU_uxArg-mB6j-wgbsMKjoZDWY15VDtnloUAc7yueL65as0N7t8SEYoGJ1-WILf3gUq-zoXVGtRarZvqXCj4PYMo4NeTkGWwAxRSpOn-kSUJ5baqnwGj8zF_PvKBGih2V3ixh9fPnnrYymY5ub8jED7cOjQzgR_icdcoPqrAzJoBmMvE8O5XrQ-wnrw5so3-zsulbX0ZrM7Iy7bG9ESrjvpk7AM1eXnsjiKqFQ8stpH8YZigzkpN4VrU-dDOx3QX-41FwcQRXtsIf8M04itsMbkYOrqrlPpdgHKPSdS3FFAewm6ShvHWA8d9K188KUeQgk9qBU_LVnOZFHTj3Qkc-159sRswPWuOYZyRR8Ym1yUH_G-XvmbqIWG-BvMjjGCsyYX-RQHZA7-nncCyjeFM-SH3zg4u5qje36K5zWiPH0z4vW",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fYTomflmYcOr6kSoKU_uxArg-mB6j-wgbsMKjoZDWY15VDtnloUAc7yueL65as0N7t8SEYoGJ1-WILf3gUq-zoXVGtRarZvqXCj4PYMo4NeTkGWwAxRSpOn-kSUJ5baqnwGj8zF_PvKBGih800V3ixh9fPnnrYymY5ub8jED7cOjQzgR_icdcoPqrAzJoBmMvE8O5XrQ-wnrw1200so3-zsulbX0ZrM7Iy7bG9ESrjvpk7AM1eXnsjiKqFQ8stpH8YZigzkpN4VrU-dDOx3QX-41FwcQRXtsIf8M04itsMbkYOrqrlPpdgHKPSdS3FFAewm6ShvHWA8d9K188KUeQgk9qBU_LVnOZFHTj3Qkc-159sRswPWuOYZyRR8Ym1yUH_G-XvmbqIWG-BvMjjGCsyYX-RQHZA7-nncCyjeFM-SH3zg4u5qje36K5zWiPH0z4vW&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116343798519192453043\">Faye</a>"
        ]
      },
      {
        "reference": "AciIO2dQMgvmZQybbqvVfpoq2ecqtIUwn4CHk6VSMRH3WCCmIfIcMQjBNjPyVqB8h1zAswz6GW2oEtKsfObTjfzts2qZ2JGHKwYleHoWJ_dXYx8HvF1JmdoD3AW9sKvnrf0GijC23FeFJy6VBYtc_R_YPxhhn1ugCtef8ERX2Y0iMoXpRCJDOkeyhWyHMTf-WulQwhmbWvE2n3o3742e_UQKYwXkMTqISsxWiLxfyhsLeB7gBsyDHvqu3QbrX7UqiVAy4Tfr4vmPUCrD1WqePBFZHdR47GsMy59JvvNXeaZVmw_W3zmruEmEyVO6A_ifgYM6YzQ52P9Q_QugPRppHZmhQZY2x-lys5iwGZh9xUpB_wy3-zwyw20oQHMR3Y2Kj1ZSi-7W4sNYZBfgwPYxqfIlcMB3KJPA8j9Puz_Y05dEA2vNHcxTocKPee1aCFPGQQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dQMgvmZQybbqvVfpoq2ecqtIUwn4CHk6VSMRH3WCCmIfIcMQjBNjPyVqB8h800zAswz6GW2oEtKsfObTjfzts2qZ2JGHKwYleHoWJ_dXYx8HvF1JmdoD3AW9sKvnrf0GijC23FeFJy6VBYtc_R_YPxhhn1ugCtef8ERX2Y0iMoXpRCJDOkeyhWyHMTf-WulQwhmbWvE2n3o3742e_UQKYwXkMTqISsxWiLxfyhsLeB7gBsyDHvqu3QbrX7UqiVAy4Tfr4vmPUCrD1WqePBFZHdR47GsMy59JvvNXeaZVmw_W3zmruEmEyVO6A_ifgYM6YzQ52P9Q_QugPRppHZmhQZY2x-lys5iwGZh9xUpB_wy3-zwyw1200oQHMR3Y2Kj1ZSi-7W4sNYZBfgwPYxqfIlcMB3KJPA8j9Puz_Y05dEA2vNHcxTocKPee1aCFPGQQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100710060816954395618\">Sarita Ghotikar</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Robert Mapara",
        "rating": 5,
        "text": "We were looking forward to this place for a while and heard/read all the reviews about this restaurant. It did not disappoint. The moment we walked through the doors, we knew this would be an authentic Indian experience. Hussain (manager) and Monica (waitress) went above and beyond to deliver an exceptional service. They were attentive, very knowledgeable about the food and helpful. The dishes served were 10/10 and the portion sizes were perfect. I would highly x 2 recommend this restaurant for a date night, meet-up,  a group gathering or any occasion. This place delivered and the chefs done good!",
        "time": 1759083301,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Jaharah Ansar",
        "rating": 5,
        "text": "Overall amazing! Truly cannot fault a single thing we were served. The service was just so lovely and inviting, the food was some of the best south Asian I’ve had that Is not authentically home made!\nI’m so gutted I didn’t take pictures of the ruby biryani and the mutton curry, because they were faultless We just couldn’t wait to dig in!\nThose prawns were honestly spectacular! Spicy and just the perfect grill. Think it was by far the best on the menu.",
        "time": 1759269898,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Neeta P",
        "rating": 5,
        "text": "There’s nothing that I didn’t like about this place. The food was amazing. The lamb chops were out of the world. Okra fries (5)are a must. Chicken ruby(5) was amazing. Daal (4.5)was great too. Naans were thin and yum. The paneer roomali roll was great roo (4.5/5)\nOur server Massimo was amazing too",
        "time": 1759526552,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Kristin",
        "rating": 5,
        "text": "Best restaurant for modernized Indian food. Service is amazing, staff is very friendly and helpful. The food also is very good, and not your standard Indian food, but thoughtfully put together modernized versions of it. They have a separate vegan menu for breakfast, lunch and dinner. It's well worth a visit.",
        "time": 1759066413,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Ek ST",
        "rating": 5,
        "text": "We wanted to visit the Canary Wharf\nBranch as we have enjoyed other branches\nEspecially Shoreditch.\n\nWe got lost on our way to the area\nBut once we got to Canary Wharf Station\nIt was fairly easy to find.\n\nWe liked the ambiance & Decor\nEveryone we met was very welcoming\nEven though it was near to closing time\n\nWe were offered water to drink\n& Were served very quickly\n\nThe Up-To-Date Pau Bhaji was delicious\nBut we struggled to finish the portion\nSo requested to box the leftovers\n\nThe server was polite & Said\nThat He will have to check with\nThe manager\n\nThen He gave us the packaging\nTo fill up the containers ourselves.\n\nWe were happy not to waste\nSuch delicious food.\n\nWe definitely enjoyed ourselves\n& Will try to come visit soon\n\nAlthough we liked where we sat\nWe would prefer to sit maybe\nOutside next time, As it was very dark.\n\nHappy 15th to the Dishoom family\nCompliments to the Manager\n\nThank you to Alex for serving us\n& The delightful lady for giving us\nWater to drink.\n\nBest wishes to everyone\nAt Dishoom Canary Wharf.",
        "time": 1759103916,
        "relative_time_description": "2 weeks ago"
      }
    ],
    "types": [
      "cafe",
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
    "lastVerifiedGoogle": "2025-10-15T10:55:09.104Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:55:09.104Z",
    "updatedAt": "2025-10-16T20:26:23.485Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Dishoom Canary Wharf — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Dishoom Canary Wharf",
      "image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13 Water St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 8349
      },
      "url": "https://thebestinlondon.co.uk/restaurant/dishoom-canary-wharf-BKRQW0f0",
      "openingHours": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 12:00 AM",
        "Saturday: 9:00 AM – 12:00 AM",
        "Sunday: 9:00 AM – 11:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "twitter_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/dishoom-canary-wharf-BKRQW0f0/indian-dishoom-canary-wharf-BKRQW0f0-card-01574b77.webp",
    "image_hero_path": "/images/restaurants/dishoom-canary-wharf-BKRQW0f0/indian-dishoom-canary-wharf-BKRQW0f0-hero-11cade1f.webp",
    "cuisine_match": true,
    "last_updated": "2025-10-18T14:56:05.491Z"
  },
  {
    "place_id": "ChIJxZXYx7cEdkgRdgAOZ6OHOJw",
    "slug": "dishoom-covent-garden-OZ6OHOJw",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJxZXYx7cEdkgRdgAOZ6OHOJw",
    "name": "Dishoom Covent Garden",
    "description": "Not your average curry house. This Central London institution elevates indian cuisine with techniques that would make grandmothers proud and food critics weep. With ratings this high, it's no wonder locals keep coming...",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "cafe",
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 27585,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "12 Upper St Martin's Ln, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "12 Upper St Martin's Ln, London",
    "postcode": "WC2H 9FB",
    "borough": "Central London",
    "lat": 51.5125176,
    "lng": -0.1268291,
    "phone": "020 7420 9320",
    "phone_international": "+44 20 7420 9320",
    "website": "https://www.dishoom.com/covent-garden/?utm_source=google&utm_medium=organic&utm_campaign=Yext&utm_content=D1-CoventGarden&y_source=1_MjMwNDkyMDMtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D",
    "url": "https://maps.google.com/?cid=11256896404490944630",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 12:00 AM",
        "Saturday: 8:00 AM – 12:00 AM",
        "Sunday: 8:00 AM – 11:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2300"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0000"
          },
          "open": {
            "day": 6,
            "time": "0800"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2eCgVG8ZsuiyhZ1ogfF4ZxtuJ9tn-gSfoQmsb_l83vBO8UiQq9k0WEaCGNPnv0NcXTx2wkt4r89V0xrdz3IGDT1NchkDovH0SNYsCnPrX4AtoHt3yAGrsYOm7J2Ugo3N1z14XA330jCdaTPc6lyxSDB8GXxLyjt6n49KiarNjZQvsL3NhezGki8prSSEtuRfM70YbcnyAMZ9Emo1b_50uStanGPFrKJBVfj-A3AMnt3BX9CsG5xAq5k1Y3kkbX0Y_n1yiH0sMVQWpPguVK6O72ZPRjAjDss0kFuYPfU_BM4tw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eCgVG8ZsuiyhZ1ogfF4ZxtuJ9tn-gSfoQmsb_l83vBO8UiQq9k0WEaCGNPnv0NcXTx2wkt4r89V0xrdz3IGDT1NchkDovH0SNYsCnPrX4AtoHt3yAGrsYOm7J2Ugo3N1z14XA330jCdaTPc6lyxSDB8GXxLyjt6n49KiarNjZQvsL3NhezGki8prSSEtuRfM70YbcnyAMZ9Emo1b_50uStanGPFrKJBVfj-A3AMnt3BX9CsG5xAq5k1Y3kkbX0Y_n1yiH0sMVQWpPguVK6O72ZPRjAjDss0kFuYPfU_BM4tw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113947709142053340285\">Dishoom Covent Garden</a>"
        ]
      },
      {
        "reference": "AciIO2e5s_Si7DwAS5vH4lNkMWWsLBVSwDGF3pt7FYqAJav_SHorYJLHx4EvxQoNaMdtnEUFC5iViWjFD3ciXd-UIZ63dAoqaOLzQdryXyVRjJRJeHGOjyCYFlQFPKva3Y0tt8Hj2HDSEPG0zXBbqJ0LaN1XFV32kOb1PcBUNJj4h4FBrG3ecDAB6MpWu0sr3bvCKbcMiuvOfzpBEDxDpsEFGmjj4jZikQi_QHGP2vdMYDV2WNQTlg063ndbtKeW5A3dMOJ96MTyHdTB-kLBmpcqcmHEglqgcYJfcagjBx-ggkRvJA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e5s_Si7DwAS5vH4lNkMWWsLBVSwDGF3pt7FYqAJav_SHorYJLHx4EvxQoNaMdtnEUFC5iViWjFD3ciXd-UIZ63dAoqaOLzQdryXyVRjJRJeHGOjyCYFlQFPKva3Y0tt8Hj2HDSEPG0zXBbqJ0LaN1XFV32kOb1PcBUNJj4h800FBrG3ecDAB6MpWu0sr3bvCKbcMiuvOfzpBEDxDpsEFGmjj4jZikQi_QHGP2vdMYDV2WNQTlg063ndbtKeW5A3dMOJ96MTyHdTB-kLBmpcqcmHEglqgcYJfcagjBx-ggkRvJA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113947709142053340285\">Dishoom Covent Garden</a>"
        ]
      },
      {
        "reference": "AciIO2f15Ra2bWZ1_lW9l2dtZnPRHwpltcowCY-TRtjFZD4aye5Mhja-KaAweWIVnp5qAJYqdkM2zbt6ri312E35w5CetW6pVMZTl8r-0L06ix6tmBfJ5zw4ysB3t0_Qu1pZl-pnwMYem8I1_UqPyV42OxciuwRp5YwbQVt7LxC1Nmws8_972RsZD7t-0FGbtDsFi58fzMQ24SiXoGFmt4z1srTFKslvKwiMC2ajNK3rHhlGgqUsydJSNJAxpTViVdUN_6s9GWiQ2QYl4SWkxR3rmiA8_eS54VKALnemQW3d2a5y8dN7ueDIyowiKYc-u1j_EEkW4s3z9d-BE9hLFYxTdGnC1YxgCIuvO6RIvfReEB80R5gqWz0KoQvPE1_jpx26AjxgqDLGblfTs-GEH8CiYmCjqNYPt1c_qh-EwAR0RnctKxD_rABKxjV5rxUi7WvT",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f15Ra2bWZ1_lW9l2dtZnPRHwpltcowCY-TRtjFZD4aye5Mhja-KaAweWIVnp5qAJYqdkM2zbt6ri312E35w1200CetW6pVMZTl8r-0L06ix6tmBfJ5zw4ysB3t0_Qu1pZl-pnwMYem8I1_UqPyV42OxciuwRp5YwbQVt7LxC1Nmws8_972RsZD7t-0FGbtDsFi58fzMQ24SiXoGFmt4z1srTFKslvKwiMC2ajNK3rHhlGgqUsydJSNJAxpTViVdUN_6s9GWiQ2QYl4SWkxR3rmiA8_eS54VKALnemQW3d2a5y8dN7ueDIyowiKYc-u1j_EEkW4s3z9d-BE9hLFYxTdGnC1YxgCIuvO6RIvfReEB80R5gqWz0KoQvPE1_jpx26AjxgqDLGblfTs-GEH8CiYmCjqNYPt1c_qh-EwAR0RnctKxD_rABKxjV5rxUi7WvT&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113461457548959990806\">Dave Kearney</a>"
        ]
      },
      {
        "reference": "AciIO2eOEzulAuwa54umUHT6Cos4g3QF10jG8v7XO-rM4EuYLOMPAVoRFVYOqs8FYedURuPTGlDqwQuglEAgCO-1pC6DOWnafeab-ed95oVdNF7GWx5I-Can-ZRBv90XNv_AmdTKc-gDWa-MX_wVhkkJSu-S_wTsth6wXkR3uwU1a4lkfcbpVFVyL6nOvP5l_GnFESkR_QfPx4-GgDAdmfCLd3PH9-Hgh1cSZtDmmKG7LsOWWrMhXCk1F3cRDq8hW-x5U5UNyDtKdATxF_5s8eAHie6WuJfL1H1xtUuvSmrInG5bff-OufZ67KmNvbNSlRQuonmoeJoF8COki-i32hTi9hvSMEqXM7qVs3jQWqo2Mwj7oORLZtX4AjQ3zuzYM26kaM3bW_5HMeF4x1cWGeQJJIuxJqXba6krmQb9xl7NIek",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eOEzulAuwa54umUHT6Cos4g3QF10jG8v7XO-rM4EuYLOMPAVoRFVYOqs8FYedURuPTGlDqwQuglEAgCO-1pC6DOWnafeab-ed95oVdNF7GWx5I-Can-ZRBv90XNv_AmdTKc-gDWa-MX_wVhkkJSu-S_wTsth800wXkR3uwU1a4lkfcbpVFVyL6nOvP5l_GnFESkR_QfPx4-GgDAdmfCLd3PH9-Hgh1cSZtDmmKG7LsOWWrMhXCk1F3cRDq8hW-x5U5UNyDtKdATxF_5s8eAHie6WuJfL1H1xtUuvSmrInG5bff-OufZ67KmNvbNSlRQuonmoeJoF8COki-i32hTi9hvSMEqXM7qVs3jQWqo2Mwj7oORLZtX4AjQ3zuzYM26kaM3bW_5HMeF4x1cWGeQJJIuxJqXba6krmQb9xl7NIek&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107960091608062906702\">Holly Bina</a>"
        ]
      },
      {
        "reference": "AciIO2fzzGWoODuSrp019Agoi2sDIlHrdkVpES4LNjoYfa1cANi5O9c87W-7H2e-WLs2GKRd_Vc1GH0F7FCfIgJGn_XWvhb7MK6yshCJp2AD9FmJQJXSL4v0CMH1iAz69S-Ap7Hn-_O7t2JQt8JlUDMoRlKDiwOc5L5J0dePU96RmnokUS2wY3vHpEmmFqUe5JV711OTIC5fIFGNjjsP03B-dokyzLW86oisANMjb0BbOztIsWx6u8PZbxYvvq1i1BKnJi1IU5yfE2ZluJs_lIMNr3utRLm6vFn1kR-T5NOAGYgQ4b5N7PQQ9022kZHqbQGTRCxtCSH5ClvczAcfjmLp7TkQlHegE-laTKz3n1QCopCrA2tY8WIdK5uZE82iEsjhCk5SHLFHHQ8JZB8VX_jrkRtvnbPFHAvS2yx8GCfe-amF9Ycm8L4wX2szMNPHVBpf",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fzzGWoODuSrp019Agoi2sDIlHrdkVpES4LNjoYfa1cANi5O9c87W-7H2e-WLs2GKRd_Vc1GH0F7FCfIgJGn_XWvhb7MK6yshCJp2AD9FmJQJXSL4v0CMH1iAz69S-Ap7Hn-_O7t2JQt8JlUDMoRlKDiwOc5L5J0dePU96RmnokUS2wY3vHpEmmFqUe5JV711OTIC5fIFGNjjsP03B-dokyzLW86oisANMjb0BbOztIsWx6u8PZbxYvvq1i1BKnJi1IU5yfE2ZluJs_lIMNr3utRLm6vFn1kR-T5NOAGYgQ4b5N7PQQ9022kZHqbQGTRCxtCSH5ClvczAcfjmLp7TkQlHegE-laTKz3n1QCopCrA2tY8WIdK5uZE82iEsjhCk5SHLFHHQ8JZB8VX_jrkRtvnbPFHAvS2yx8GCfe-amF9Ycm8L4wX2szMNPHVBpf&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100198430227345346754\">Neha Patel</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Christopher Dias",
        "rating": 5,
        "text": "A modern restaurant in a great central location serving excellent quality Indian dishes. Pretty huge menu can be quite overwhelming but does offer plenty of choice. Fantastic curries including mutton which was excellent and monkfish as well as the classic Chicken Ruby. The Biryani was great with a jackfruit option for the non meat eaters and the black daal was amazing! Some excellent drink options too with refreshing lassis, trendy cocktails and the classic Kingfisher beer and Thums Up Asian cola. Would recommend booking in advance as gets very busy with queues often spanning round the block. Service can be touch and go particularly during busy periods where you’re often fighting to get someone’s attention but overall a great experience with delicious food.",
        "time": 1759954759,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Binoy Vasavada",
        "rating": 4,
        "text": "Dishoom doesn’t need a critical review. It’s buzzing like the AI boom. Always has a line out the door, especially this original location. They dine you fast so don’t be discouraged by the long lines. We walked in on a busy Saturday evening & managed to snag a table in 30 mins. The vibe of the restaurant is electric, two floors packed with customers & waiters running around harmoniously. It’s really a well run restaurant with top customer service. The menu is intriguing & drool worthy. We tried a bunch of the things - pav bhaji, house chaat, chicken ruby, garlic naan & Kashmiri Chili ice cream. All taste good, but not out of this world good. They do the nail that Bombay Irani cafe vibe & overall it’s a crowd pleaser of a place. Dishoom is an impressive place to visit but isn’t necessarily a memorable one. Again, it doesn’t need this critique as it does a commendable job and it’s gonna thrive for years to come.",
        "time": 1760287522,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Alyssa Burnett",
        "rating": 5,
        "text": "WORTH. THE. HYPE.  This was the best Indian food we've had since...being in India and it's not even close.  We waited maybe 20 minutes for a table for 6 (5 humans and a toddler) which wasn't bad in my opinion.  Our waiter insanely attentive.  We ordered drinks and I wanted to try their chai, but he said I should have something fun so he made it a ~naughty chai~ but then also brought me a regular chai just to try it too.  He brought out a milk for our toddler and it was just slightly warmed (nice touch).  We talked about how we went to Dehli a few years ago and that's where our waiter was from originally, so he brought us out a local dish that we didn't try while we were there.. very thoughtful!  You name it, we got it to try.. vegetable samosas, chili chicken, butter chicken, chicken biryani (the cranberries were actually a surprisingly great touch), the House Black Daal, the broccoli salad, cheese naan, garlic naan, raita.. nothing missed.  We stuffed ourselves silly.  We also came here to celebrate my mother-in-law's birthday and at the end he brought out THREE desserts for her which was insanely nice.  I swear it was the most welcoming restaurant and atmosphere.  I wish I could come back every month.",
        "time": 1759845584,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Al. M",
        "rating": 5,
        "text": "From the moment we walked in we were welcomed and sat. A lovely dining experience with a great server.\nChicken ruby, lamb chops and jackfruit Biryani were all 10/10\nHiding in that menu is Chilli Chicken which was 12/10. I could eat it everyday.\nExcellent dining experience with superior flavors",
        "time": 1759541399,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "David and Frances van Gestel",
        "rating": 5,
        "text": "Dishoom Covent Garden was lively and packed, but our reservation made things seamless. The staff were welcoming and explained the menu clearly, which made ordering easy. Every dish we had was bursting with flavour and beautifully cooked.\n\nWe enjoyed the prawn pathia, black daal, cheese naan, mango & fennel lassi, and watermelon sharbat. On our second visit, we tried the chicken berry Britannia, okra fries, raita, and fish - all delicious. The berry crumble with coconut was a standout for me.\n\nDespite the queues, the service was smooth and well-organised. The warm atmosphere, great food, and thoughtful touches made it a fantastic experience. We’ll definitely be back!",
        "time": 1752525789,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
      "bar",
      "cafe",
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
    "lastVerifiedGoogle": "2025-10-15T10:53:13.910Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:13.910Z",
    "updatedAt": "2025-10-16T20:24:07.158Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.290Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Dishoom Covent Garden — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Dishoom Covent Garden",
      "image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "12 Upper St Martin's Ln, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 27585
      },
      "url": "https://thebestinlondon.co.uk/restaurant/dishoom-covent-garden-OZ6OHOJw",
      "openingHours": [
        "Monday: 8:00 AM – 11:00 PM",
        "Tuesday: 8:00 AM – 11:00 PM",
        "Wednesday: 8:00 AM – 11:00 PM",
        "Thursday: 8:00 AM – 11:00 PM",
        "Friday: 8:00 AM – 12:00 AM",
        "Saturday: 8:00 AM – 12:00 AM",
        "Sunday: 8:00 AM – 11:00 PM"
      ]
    },
    "meta_tags": {
      "og_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "twitter_image": "https://www.dishoom.com/wp-content/uploads/2021/03/dishoom-covent-garden-interior-1.jpg",
      "image_width": 1600,
      "image_height": 900,
      "image_format": "webp"
    },
    "last_metadata_update": "2025-10-18T14:23:43.656Z",
    "image_card_path": "/images/restaurants/dishoom-covent-garden-OZ6OHOJw/indian-dishoom-covent-garden-OZ6OHOJw-card-81e9d334.webp",
    "image_hero_path": "/images/restaurants/dishoom-covent-garden-OZ6OHOJw/indian-dishoom-covent-garden-OZ6OHOJw-hero-1c686259.webp",
    "last_updated": "2025-10-18T14:56:05.426Z"
  },
  {
    "place_id": "ChIJS_aY-s0EdkgRbxbEVrlil9k",
    "slug": "maharaja-of-india-EVrlil9k",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJS_aY-s0EdkgRbxbEVrlil9k",
    "name": "Maharaja of India",
    "description": "Spice levels that'll make your taste buds dance and your nose run. This Central London gem serves up indian that's been perfected over generations. With ratings this high, it's no wonder locals keep coming back for mo...",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 13404,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "19A Charing Cross Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "19A Charing Cross Rd, London",
    "postcode": "WC2H 0ET",
    "borough": "Central London",
    "lat": 51.51031039999999,
    "lng": -0.1287427,
    "phone": "020 3091 3500",
    "phone_international": "+44 20 3091 3500",
    "website": "https://www.maharajaindian.co.uk/",
    "url": "https://maps.google.com/?cid=15679109175877834351",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
        "Sunday: 12:00 PM – 12:00 AM"
      ],
      "periods": [
        {
          "close": {
            "day": 1,
            "time": "0000"
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
            "time": "0000"
          },
          "open": {
            "day": 5,
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
            "time": "1200"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2ejSSIdKZhnGDHG0uFvTLeqapoTHrsj10ZEPTTlkvM-cUzHxZsMuyJjthtlQdhUFy3MNKkD6mF9i1T4R8LCKihj_Gje_-9X9de7NVatSzCpz1i_LHG-Mq31bMJXkuYpXCdbGN9aN5xvlhcxEOiIrx-SKzwg0-q3vGko2Nc-LloStFXXXpv4LzjD774q7NNvjIskr8akjBACgJurkAi3EDE9hcV5wW6UE51TY8DmqgMM5rEx4wRdP_nEguhE4fjFp9l-bLfPCZG3yS8TTUHG_lW6UjhCoDN6WVV2KiYhP7z3pQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ejSSIdKZhnGDHG0uFvTLeqapoTHrsj10ZEPTTlkvM-cUzHxZsMuyJjthtlQdhUFy3MNKkD6mF9i1T4R8LCKihj_Gje_-9X9de7NVatSzCpz1i_LHG-Mq31bMJXkuYpXCdbGN9aN5xvlhcxEOiIrx-SKzwg0-q3vGko2Nc-LloStFXXXpv4LzjD774q7NNvjIskr8akjBACgJurkAi3EDE9hcV5wW6UE51TY8DmqgMM5rEx4wRdP_nEguhE4fjFp9l-bLfPCZG3yS8TTUHG_lW6UjhCoDN6WVV2KiYhP7z3pQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100610792988996966529\">Maharaja of India</a>"
        ]
      },
      {
        "reference": "AciIO2c0r1YT_6HFERuJvxD_enD6vXojJkmghF2b9CeameUlFpVPlfdT1vXZT35nMKqQjARjqTmUYy4zvSS7ExZza7km6mqCmw2o-rzlVloAsBqYyICRoOb9o4GgLuOr66VdewZApV4Lb4bKufRAhpCiSSSQhNTj5Xj7-aN1VEGVUVE6v_9xBd662yE5_ZegeRumL8RicD8QKBCSiJ52zhDFr_p6Eup-w9b3hPWZj5EGqheTe7skyWF-l_GjLQN3xQMEg181mpOhfB6KmL5oTsIMMfl4eHDPVLQc85720Bdxh8ur7Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c0r1YT_6HFERuJvxD_enD6vXojJkmghF2b9CeameUlFpVPlfdT1vXZT35nMKqQjARjqTmUYy4zvSS7ExZza7km6mqCmw1200o-rzlVloAsBqYyICRoOb9o4GgLuOr66VdewZApV4Lb4bKufRAhpCiSSSQhNTj5Xj7-aN1VEGVUVE6v_9xBd662yE5_ZegeRumL8RicD8QKBCSiJ52zhDFr_p6Eup-w9b3hPWZj5EGqheTe7skyWF-l_GjLQN3xQMEg181mpOhfB6KmL5oTsIMMfl4eHDPVLQc85720Bdxh800ur7Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100610792988996966529\">Maharaja of India</a>"
        ]
      },
      {
        "reference": "AciIO2e2LAxILU6puRoAuZpyMR8dGGoxhwpJ-y4mntREO250B_1vTdzTGqpeJQa2P8UoQoxzxu4nchDieQfMmlrjFDFZm1W6Ska7TsXZI3WOI7QdqqkX3C0KXMHsDB0Ni-yyiWjvzWhUX4cXH2Hww6Te95Lj7Aw2DbpKtG-GabG_kJPWASGLZiGp8kDvnGtm-yQL9bHPrn4TSAEhKq_5gQFsq_BP3pG42z1Tyvtg8QKJ46A0nLe4NDATW2M9E9zPWI1likYm4sbBguI_PTLtkMuE22Iz93O7FyWzxeneguD1YIzTpA44i6c28cEMSWyzeP2b90U_8adTPDShZhgndEaVsLZBojWQ7c8rJ0B6vzNxFVp8U1uPZYDjWra3YSmNdkqT-iR_QNLfTUSp9FPJ5UiF6CefyJiAS5U_HWA08N0XxUFNYg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e2LAxILU6puRoAuZpyMR8dGGoxhwpJ-y4mntREO250B_1vTdzTGqpeJQa2P8UoQoxzxu4nchDieQfMmlrjFDFZm1W6Ska7TsXZI3WOI7QdqqkX3C0KXMHsDB0Ni-yyiWjvzWhUX4cXH2Hww1200Te95Lj7Aw2DbpKtG-GabG_kJPWASGLZiGp8kDvnGtm-yQL9bHPrn4TSAEhKq_5gQFsq_BP3pG42z1Tyvtg8QKJ46A0nLe4NDATW2M9E9zPWI1likYm4sbBguI_PTLtkMuE22Iz93O7FyWzxeneguD1YIzTpA44i6c28cEMSWyzeP2b90U_8adTPDShZhgndEaVsLZBojWQ7c8rJ0B6vzNxFVp8U1uPZYDjWra3YSmNdkqT-iR_QNLfTUSp9FPJ5UiF6CefyJiAS5U_HWA08N0XxUFNYg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112331374225508833795\">Khira Ives</a>"
        ]
      },
      {
        "reference": "AciIO2eZQEwG9mMGaGTRRlJddXfWNMs3i7kkrRbNuR__I1C54tjtHpOKHgrW_VfUauRQikEOZiE5vCtjeh1g-rb1rfuSg9cVr6DTIbwvEzm_EHFocULfYszgRvMATz8jJw_y8yzj_sGMpPXdKWGlOBDuWbXL-73tmsw3oDIBzcmf2hFLOE1LgUXwq_oLeyQMWSy8n_JiUeMSfr4KEAuPXdrnDbHE5IT9CxA-9d-EaLL-rF5DibUI5nXTKN0y4u_ypDMDcuqNSlwUK13m7jSDWCOSGk0pIrXtM5ZDi5w0-EG_UuIn_kFnHOdbnnl4TfZr6Ve-i-Nlr8fQ9BII4rrsH3leTE1g0MyoSc-W9u_3X0pcaDzh6nh31YNXNOdy4VhYrH89WPlgANxTsxZ4deHAvO22tL0qLcEgpXN8T0tkuvj5-JbPJAwpStKUqg1CDABEcg4B",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eZQEwG9mMGaGTRRlJddXfWNMs3i7kkrRbNuR__I1C54tjtHpOKHgrW_VfUauRQikEOZiE5vCtjeh800g-rb1rfuSg9cVr6DTIbwvEzm_EHFocULfYszgRvMATz8jJw_y8yzj_sGMpPXdKWGlOBDuWbXL-73tmsw1200oDIBzcmf2hFLOE1LgUXwq_oLeyQMWSy8n_JiUeMSfr4KEAuPXdrnDbHE5IT9CxA-9d-EaLL-rF5DibUI5nXTKN0y4u_ypDMDcuqNSlwUK13m7jSDWCOSGk0pIrXtM5ZDi5w0-EG_UuIn_kFnHOdbnnl4TfZr6Ve-i-Nlr8fQ9BII4rrsH3leTE1g0MyoSc-W9u_3X0pcaDzh6nh31YNXNOdy4VhYrH89WPlgANxTsxZ4deHAvO22tL0qLcEgpXN8T0tkuvj5-JbPJAwpStKUqg1CDABEcg4B&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/118407346068744035312\">sun:day</a>"
        ]
      },
      {
        "reference": "AciIO2eJ-kCa4IUBQu7cLzRuug0CregcykfAs7c7a1x9W84u1f_i-PJN9aUvFXkbzionjPPS60On25TONKAXYZsAGPqgg7fq52tPCd4QlYqXQjce8sgKOuj4nVOZl2p3c0_UXIIUMY-qNqxO3DqYbUoGPm35PFfrvwHuT6VaYqQStRXFbRzRceFDpiqftpkoJGWvrVdeWrZwfP6v4FPdqXS2t0rxWas98uFyHCxqacRuT8Y-OUOVqDyTE_wrGaM-4vDPO6IKUl0uG522-76T1CSrjHJT1Z205YB_RmoHec5xbmrRskK1UZF2RoQVlbfLCT6Ih1yxG05ioeTahRrLL4H9uZOVgRXdqiO8tvPhCRe6YvHvn7BkNRCGDcauParR8_RLTgLH06vMXAPwLHRGCOF06Lb-vXY8mx8_c2xSPCGrjHxcWa9ZhxZFflVgIfhLSQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eJ-kCa4IUBQu7cLzRuug0CregcykfAs7c7a1x9W84u1f_i-PJN9aUvFXkbzionjPPS60On25TONKAXYZsAGPqgg7fq52tPCd4QlYqXQjce8sgKOuj4nVOZl2p3c0_UXIIUMY-qNqxO3DqYbUoGPm35PFfrvwHuT6VaYqQStRXFbRzRceFDpiqftpkoJGWvrVdeWrZwfP6v4FPdqXS2t0rxWas98uFyHCxqacRuT8Y-OUOVqDyTE_wrGaM-4vDPO6IKUl0uG522-76T1CSrjHJT1Z205YB_RmoHec5xbmrRskK1UZF2RoQVlbfLCT6Ih800yxG05ioeTahRrLL4H9uZOVgRXdqiO8tvPhCRe6YvHvn7BkNRCGDcauParR8_RLTgLH06vMXAPwLHRGCOF06Lb-vXY8mx8_c2xSPCGrjHxcWa9ZhxZFflVgIfhLSQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112200398203057555420\">Viktoriia</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Shuhan Nayem",
        "rating": 5,
        "text": "⭐ 5\n\nAbsolutely incredible experience! This Indian restaurant exceeded all my expectations. The butter chicken,Shashlik Roshila,Garlic Chilly Chicken was rich and flavorful, and the garlic naan was perfectly crisp and soft at the same time.Tandoori Chicken was nicely cooked and juicy.Everything tasted fresh and was beautifully presented.\n\nThe staff were warm, welcoming, and happy to make recommendations (which were spot-on). The service was quick but never rushed. The ambiance is cozy and inviting, with traditional decor that adds to the overall experience.\n\nThere are tons of vegetarian options too, which is a big plus. Pricing is very reasonable for the quality you get.\n\nDefinitely one of the best Indian meals I’ve had—will be back soon and recommending it to everyone.",
        "time": 1759702411,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Jimin Hyeon",
        "rating": 3,
        "text": "I visited this restaurant after seeing many great reviews, but my experience didn’t really match the expectations. I arrived at 1:30 PM and the place was nearly empty, yet it took around 35 minutes for our food to arrive, even though we only ordered two curries.\n\nMany reviews mentioned friendly service, but we were served by a different staff member who was just average, not particularly warm or attentive. The butter chicken was a little bland and average, and the other curry tasted just average or even a lil below. Quite overpriced as well considering the portion.",
        "time": 1759687353,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Carlos Albarran",
        "rating": 5,
        "text": "Nayem was an excellent host!! (More than a waiter) he was a teacher of indian cuisine!! Im traveling from Mexico and people told me i MUST try indian food in london, specifically CHICKEN BIRYANI. Nayem even gave me a special yoghurt sauce for my biryani! Gave me a great indian beer!! MAHA RAJA is your best option! A few steps from Trafalgar Square!!",
        "time": 1759237713,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Julie Austestad",
        "rating": 5,
        "text": "Excellent food! We got served right away, and received our food incredibly fast. Most of us ordered butter chicken with garlic naan, and it was delicious as is visible with the picture below☺️. We had Nayem as our waiter, and were extremely pleased with the serviced we received. His professionalism along with his humour made our visit extra special and memorable!!! Would definitely visit again😊😊",
        "time": 1759263133,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Hillary Smith",
        "rating": 5,
        "text": "Nayem (our server) was amazing from start to finish and really made our overall experience that much better! He was so polite and helpful with our questions and really made us feel welcome! The food was phenomenal - I totally recommend the chicken 95 and the butter chicken and chicken dansak were out of this world! This is a must when you visit London!",
        "time": 1756498243,
        "relative_time_description": "a month ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "fsa_rating": 3,
    "fsa_rating_text": "3",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/412010",
    "fsa_last_inspection": "2024-06-10T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:15.021Z",
    "lastVerifiedFSA": "2025-10-16T23:14:44.503Z",
    "createdAt": "2025-10-15T10:53:15.021Z",
    "updatedAt": "2025-10-16T20:24:08.412Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Maharaja of India — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_maharaja-of-india_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.427Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Maharaja of India",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "19A Charing Cross Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 13404
      },
      "url": "https://thebestinlondon.co.uk/restaurant/maharaja-of-india-EVrlil9k",
      "openingHours": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
        "Sunday: 12:00 PM – 12:00 AM"
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
    "image_card_path": "/images/restaurants/maharaja-of-india-EVrlil9k/indian-maharaja-of-india-EVrlil9k-card-67fdc92c.webp",
    "image_hero_path": "/images/restaurants/maharaja-of-india-EVrlil9k/indian-maharaja-of-india-EVrlil9k-hero-33a2bcc5.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJvV1d8TIbdkgRfvsJVquuZ94",
    "slug": "taste-of-lahore-JVquuZ94",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJvV1d8TIbdkgRfvsJVquuZ94",
    "name": "Taste of Lahore",
    "description": "Modern European dining that doesn't take itself too seriously, but takes your taste buds very seriously indeed. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "indian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 4317,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "Tigress House, 256 Edgware Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Tigress House, 256 Edgware Rd, London",
    "postcode": "W2 1DS",
    "borough": "Central London",
    "lat": 51.5193149,
    "lng": -0.1683935,
    "phone": "020 7724 0300",
    "phone_international": "+44 20 7724 0300",
    "website": "http://www.toledgwareroad.co.uk/",
    "url": "https://maps.google.com/?cid=16025969849927334782",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 12:00 AM",
        "Tuesday: 8:00 AM – 12:00 AM",
        "Wednesday: 8:00 AM – 12:00 AM",
        "Thursday: 8:00 AM – 12:00 AM",
        "Friday: 2:00 PM – 12:00 AM",
        "Saturday: Open 24 hours",
        "Sunday: 8:00 AM – 12:00 AM"
      ],
      "periods": [
        {
          "close": {
            "day": 1,
            "time": "0000"
          },
          "open": {
            "day": 0,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "0000"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "0000"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "0000"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "0000"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "1400"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2eqUjFa8x4xis3SlhK_nMwfydFr6R2YML3UQdqpwEQen9QTIYSpJeIAUOQiWZbB1BV_syuO0N6luf8tpEWDs_Fuu9KL-SqBWCh-YLjiffzto_S6a7lBJoJzoYnULbwnqru0_bStCELOEZ2kKVCwQomvOuQ7TArASsYC74j3mIV1LRqV1A4b7ABRZ2TK383Zic6BAmY9ZY7MhTRS7DtuMkT1Vg2Y_AkFa-wrMcHI0HzcHSafY_GjdzATlSZX8p70GJO1HIfX8Tkcq1O4XBugDs1K2MHyoTyb95FbQ6eFNyidkQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eqUjFa8x4xis3SlhK_nMwfydFr6R2YML3UQdqpwEQen9QTIYSpJeIAUOQiWZbB1BV_syuO0N6luf8tpEWDs_Fuu9KL-SqBWCh-YLjiffzto_S6a7lBJoJzoYnULbwnqru0_bStCELOEZ2kKVCwQomvOuQ7TArASsYC74j3mIV1LRqV1A4b7ABRZ2TK383Zic6BAmY9ZY7MhTRS7DtuMkT1Vg2Y_AkFa-wrMcHI0HzcHSafY_GjdzATlSZX8p70GJO1HIfX8Tkcq1O4XBugDs1K2MHyoTyb95FbQ6eFNyidkQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117760560606101182304\">Taste of Lahore</a>"
        ]
      },
      {
        "reference": "AciIO2dg9qISAok-vgqNmFgD98SAyiuAELGw5xLwX2W8ptnVPOFn5PFciZS27tt2_jsUzy_EzknbuzMsbhrqoBKAXu3KTYhMZb2gkq5nY1uFPzaNnfr29lW0d7DoaXXwnDbmHtruyl9_yyKHO1lEDB90Gm41nUOxHQBy_JyBnUw1N3H2aaVuhpz6JvuumlXxLDK8tWh1JByJhf0MRy-qso-GECq_NdrENki8pkcfhyteyiTdgje27qNvC--2XovF1jeT59vxbk3HXvKzvTqqeKZGiXehLnVtyPbTAOpCY21COFYG8Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dg9qISAok-vgqNmFgD98SAyiuAELGw1200xLwX2W8ptnVPOFn5PFciZS27tt2_jsUzy_EzknbuzMsbhrqoBKAXu3KTYhMZb2gkq5nY1uFPzaNnfr29lW0d7DoaXXwnDbmHtruyl9_yyKHO1lEDB90Gm41nUOxHQBy_JyBnUw1N3H2aaVuhpz6JvuumlXxLDK8tWh800JByJhf0MRy-qso-GECq_NdrENki8pkcfhyteyiTdgje27qNvC--2XovF1jeT59vxbk3HXvKzvTqqeKZGiXehLnVtyPbTAOpCY21COFYG8Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117760560606101182304\">Taste of Lahore</a>"
        ]
      },
      {
        "reference": "AciIO2fTIjZVuDojkouJZcNrFlPXVhpYVS70k-41ZkDqqF6XvW1LOPrNlLT6JFvPWG7g7AcNQEUu7UBFDWVazWns9jAZ2PSxT80wK7Sz8zLebraBlKYHavaS1zCXwRWgCAszDbDkPdXDbsk715TP2LtJDB2AEhAP7IShvKJORkvPcebRexS7ysKsqK6RAJkjE3Zyp0rM4F_flco_3Pmrtcr0oA1yzYIA6B82gcOi_O1cFfexO97Dgxd_mcghBr1Dqket3Tp_IWKXRNFQj5-CW92RdCvhBVw1Rv2WuyrCjlt2-R3U8uQD9QJbHV_WLfP52VWF1ovfhygF3KSoLtd7CxGzXFcYGdQ99fwzDdgxSmKNKFOB-p0VeKI7CzVdAhVozIEBkWxviD1g2bIQOVC2kjEugI6nhTV_7aPL40nNwrrjps1jyTRPYNg3a2ZwCu0uZx9N",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fTIjZVuDojkouJZcNrFlPXVhpYVS70k-41ZkDqqF6XvW1LOPrNlLT6JFvPWG7g7AcNQEUu7UBFDWVazWns9jAZ2PSxT80wK7Sz8zLebraBlKYHavaS1zCXwRWgCAszDbDkPdXDbsk715TP2LtJDB2AEhAP7IShvKJORkvPcebRexS7ysKsqK6RAJkjE3Zyp0rM4F_flco_3Pmrtcr0oA1yzYIA6B82gcOi_O1cFfexO97Dgxd_mcghBr1Dqket3Tp_IWKXRNFQj5-CW92RdCvhBVw1200Rv2WuyrCjlt2-R3U8uQD9QJbHV_WLfP52VWF1ovfhygF3KSoLtd7CxGzXFcYGdQ99fwzDdgxSmKNKFOB-p0VeKI7CzVdAhVozIEBkWxviD1g2bIQOVC2kjEugI6nhTV_7aPL40nNwrrjps1jyTRPYNg3a2ZwCu0uZx9N&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114519699821533803761\">leonardo chavez</a>"
        ]
      },
      {
        "reference": "AciIO2fekmxm1iRhfwEtXWWjWwJwODyD6IewZkPUmbZcRsXWYLYJf2_12UfFp6B9M117F4H3PKRigjYgg75DKSGQOm4VEaPkJCfsrnS_QDfcZc0IKZcGL-YWR1pKx5UIIGuL50Ndwdr_PltMGNOLItagrh3DAlK3xqbXwZxVlzdJE84-SNehRvutnaDmByLG_rzS5bnyDYx1_OwKg7iFJa-Ds6U-erMNG0Xk6g0uRMW9_RKVRDPrDavrumZYk1EeTOjNcFliOKC6-tgdKsUXqsfv5BlJEjasXrKBm8vpDMM2NhAPejqXpnj-Cw02ENXWdk_3HRKUnilnHDqUjTI_DzQzAzWIdg3ZfF1ho963hRTyQVUl56PB7lJGAPVVQt_wSA9L1qxHTbx8AjAZ8ROFPduUz418WTlYHYAE9JzRrt31NSAzvL2-",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fekmxm1iRhfwEtXWWjWwJwODyD6IewZkPUmbZcRsXWYLYJf2_12UfFp6B9M117F4H3PKRigjYgg75DKSGQOm4VEaPkJCfsrnS_QDfcZc0IKZcGL-YWR1pKx5UIIGuL50Ndwdr_PltMGNOLItagrh800DAlK3xqbXwZxVlzdJE84-SNehRvutnaDmByLG_rzS5bnyDYx1_OwKg7iFJa-Ds6U-erMNG0Xk6g0uRMW9_RKVRDPrDavrumZYk1EeTOjNcFliOKC6-tgdKsUXqsfv5BlJEjasXrKBm8vpDMM2NhAPejqXpnj-Cw1200ENXWdk_3HRKUnilnHDqUjTI_DzQzAzWIdg3ZfF1ho963hRTyQVUl56PB7lJGAPVVQt_wSA9L1qxHTbx8AjAZ8ROFPduUz418WTlYHYAE9JzRrt31NSAzvL2-&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110989462757601960493\">Amin</a>"
        ]
      },
      {
        "reference": "AciIO2e4u6EgUuzr44jhwK2VofTEBuBgU2IRsDILO1I9NTtYp_YJ6haQMpg1MEVLMgkkVhHDsgXeJXWNdDMIBX0n_h8WQH6gS9r89M7w_61q-mgRsMScPGkc9XFUNFVIOwPbF-F4k7fsvQhhmhb_xoZ1PB_6vjG-ZL-7bU75tI6zYDrxbrdKwSXIucINqbKMryAowYpGxHn04v3_FQicHw89UZ9mdsYEIMigK0xgi35MFVOyM9VPZE1uav8vbD1ZW5hTXOcBog1asvszWvtFCjjIx87JyskrjsuPTUjqr4r3RRohjm5HVKgx7ESLmbrJARcGcUbtN5EZv0qkNXO_pe9jvgBAKCad3J4uTwGYtHORBdLEEc1d_lUsIx3w5EVEnfT41CMsZmtN9DdVwCb0oAhX1j2CAl7QJvza_y5XHJz-pnFrzqrvRA1qebGv3B-aNqMY",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e4u6EgUuzr44jhwK2VofTEBuBgU2IRsDILO1I9NTtYp_YJ6haQMpg1MEVLMgkkVhHDsgXeJXWNdDMIBX0n_h800WQH6gS9r89M7w_61q-mgRsMScPGkc9XFUNFVIOwPbF-F4k7fsvQhhmhb_xoZ1PB_6vjG-ZL-7bU75tI6zYDrxbrdKwSXIucINqbKMryAowYpGxHn04v3_FQicHw1200UZ9mdsYEIMigK0xgi35MFVOyM9VPZE1uav8vbD1ZW5hTXOcBog1asvszWvtFCjjIx87JyskrjsuPTUjqr4r3RRohjm5HVKgx7ESLmbrJARcGcUbtN5EZv0qkNXO_pe9jvgBAKCad3J4uTwGYtHORBdLEEc1d_lUsIx3w5EVEnfT41CMsZmtN9DdVwCb0oAhX1j2CAl7QJvza_y5XHJz-pnFrzqrvRA1qebGv3B-aNqMY&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106644702078116546723\">Anwar</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Raza Khan",
        "rating": 5,
        "text": "The Taste of Lahore reminded of restaurants in Pakistan with the over abundance of bright track lighting and chandeliers. The food and service were fantastic, we thoroughly enjoyed every dish. We ordered the Chapli kebab, masala fish, tandoori chicken wings, and Seekh kebabs. Each dish was executed perfectly and full of flavor. Two of my friends never had Chapli kebabs before and they thoroughly enjoyed it. Highly recommend for traditional Pakistani food and great service.",
        "time": 1760107621,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Noman Sikandar",
        "rating": 2,
        "text": "I visited Test of Lahore in Edgware and while the ambiance was nice, the experience overall was disappointing. Coming from Canada, I expected authentic Pakistani food to really stand out, but honestly I’ve had better taste back home in Calgary.\n\nThe service was quite slow — our BBQ dishes arrived about 20 minutes before the naan and other mains, which meant the BBQ got cold by the time we could actually eat it. The food itself was just average, nothing memorable.\n\nWith so many good reviews, I was hoping for more. Unfortunately, the slow service and average flavors didn’t make it worth the wait.",
        "time": 1757845107,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "NASSER",
        "rating": 5,
        "text": "We had a wonderful experience in this restaurant.\nThe food was sooo good. Specially the rice & the chicken korma.\nExcellent service by the staff. Thank you Emmy for your excellent service",
        "time": 1759356961,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "rkzetan",
        "rating": 4,
        "text": "having read the reviews, finally managed to visit for the first time.\n\nwe went for the tawa which had a good range of options on there to share between 4 people. it tasted amazing! absolutely loved it.\n\nprices are very high but I guess it’s bc of the area. we had to ask for sauces and there were no complimentary salads etc, service was okay. they do add service charge so check before you pay as the bill will be extortionate. but great tasting food!",
        "time": 1755341932,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Hitesh Sharma",
        "rating": 5,
        "text": "Great busy restaurant with friendly staff and efficient service.  I had only mixed kebab, fries and soft drink and it was very tasty and hot.   I could see the curries and other options on other tables and it also looked delicious and good portions. Will definately make a return trip when in the area for lovely Pakistani food.",
        "time": 1751547485,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
      "establishment",
      "food",
      "point_of_interest",
      "restaurant",
      "store"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": "5",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1737193",
    "fsa_last_inspection": "2025-08-11T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:01.338Z",
    "lastVerifiedFSA": "2025-10-16T23:19:37.588Z",
    "createdAt": "2025-10-15T10:54:01.338Z",
    "updatedAt": "2025-10-16T20:25:01.284Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=indian_curry_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Taste of Lahore — Indian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "indian_taste-of-lahore_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.452Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Taste of Lahore",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "indian"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Tigress House, 256 Edgware Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 4317
      },
      "url": "https://thebestinlondon.co.uk/restaurant/taste-of-lahore-JVquuZ94",
      "openingHours": [
        "Monday: 8:00 AM – 12:00 AM",
        "Tuesday: 8:00 AM – 12:00 AM",
        "Wednesday: 8:00 AM – 12:00 AM",
        "Thursday: 8:00 AM – 12:00 AM",
        "Friday: 2:00 PM – 12:00 AM",
        "Saturday: Open 24 hours",
        "Sunday: 8:00 AM – 12:00 AM"
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
    "image_card_path": "/images/restaurants/taste-of-lahore-JVquuZ94/indian-taste-of-lahore-JVquuZ94-card-202396a0.webp",
    "image_hero_path": "/images/restaurants/taste-of-lahore-JVquuZ94/indian-taste-of-lahore-JVquuZ94-hero-ed3dfa4e.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Indian Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest indian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-indian-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Indian Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest indian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-indian-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Indian Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest indian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Indian Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-indian-in-central-london-2025',
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
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Indian in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Indian Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest indian restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of indian cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/pravaas-south-kensington-KhMpiz4I" className="hover:text-yellow-600 transition-colors">
                Pravaas - South Kensington
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 363 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Pravaas - South Kensington offers exceptional indian cuisine in Central London. With a 4.9-star rating from 363 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/pravaas-south-kensington-KhMpiz4I" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ__9DAWgFdkgRj0UKhMpiz4I" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/kricket-shoreditch-kaf-restaurant-bar-T-b-BK14" className="hover:text-yellow-600 transition-colors">
                Kricket Shoreditch - Kafé, Restaurant & Bar
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 1,072 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Kricket Shoreditch - Kafé, Restaurant & Bar offers exceptional indian cuisine in Central London. With a 4.9-star rating from 1,072 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/kricket-shoreditch-kaf-restaurant-bar-T-b-BK14" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJAQxeaAAddkgRkKAT-b-BK14" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/fat-chef-authentic-indian-kitchen-halal-0LfhvXy8" className="hover:text-yellow-600 transition-colors">
                FAT CHEF (Authentic Indian Kitchen) Halal
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 41 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          FAT CHEF (Authentic Indian Kitchen) Halal offers exceptional indian cuisine in Central London. With a 4.9-star rating from 41 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/fat-chef-authentic-indian-kitchen-halal-0LfhvXy8" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/aladin-brick-lane-FQXF-uoc" className="hover:text-yellow-600 transition-colors">
                Aladin Brick Lane
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 9,944 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Aladin Brick Lane offers exceptional indian cuisine in Central London. With a 4.8-star rating from 9,944 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/aladin-brick-lane-FQXF-uoc" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ_YxXC7YcdkgR7WdFQXF-uoc" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/dishoom-kensington-1F6d_5-g" className="hover:text-yellow-600 transition-colors">
                Dishoom Kensington
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 16,167 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Dishoom Kensington offers exceptional indian cuisine in Central London. With a 4.8-star rating from 16,167 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/dishoom-kensington-1F6d_5-g" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJv_uo9_YPdkgRq2K1F6d_5-g" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/colonel-saab-D55weEBY" className="hover:text-yellow-600 transition-colors">
                Colonel Saab
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 5,448 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 1/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Colonel Saab offers exceptional indian cuisine in Central London. With a 4.8-star rating from 5,448 reviews and a 1/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/colonel-saab-D55weEBY" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJnVf83AIbdkgR054D55weEBY" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/dishoom-canary-wharf-BKRQW0f0" className="hover:text-yellow-600 transition-colors">
                Dishoom Canary Wharf
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 8,349 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Dishoom Canary Wharf offers exceptional indian cuisine in Central London. With a 4.8-star rating from 8,349 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/dishoom-canary-wharf-BKRQW0f0" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJe0JmmEUDdkgRhyBBKRQW0f0" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/dishoom-covent-garden-OZ6OHOJw" className="hover:text-yellow-600 transition-colors">
                Dishoom Covent Garden
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 27,585 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Dishoom Covent Garden offers exceptional indian cuisine in Central London. With a 4.7-star rating from 27,585 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/dishoom-covent-garden-OZ6OHOJw" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJxZXYx7cEdkgRdgAOZ6OHOJw" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/maharaja-of-india-EVrlil9k" className="hover:text-yellow-600 transition-colors">
                Maharaja of India
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 13,404 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 3/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Maharaja of India offers exceptional indian cuisine in Central London. With a 4.7-star rating from 13,404 reviews and a 3/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/maharaja-of-india-EVrlil9k" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJS_aY-s0EdkgRbxbEVrlil9k" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/taste-of-lahore-JVquuZ94" className="hover:text-yellow-600 transition-colors">
                Taste of Lahore
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 4,317 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Taste of Lahore offers exceptional indian cuisine in Central London. With a 4.7-star rating from 4,317 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/taste-of-lahore-JVquuZ94" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJvV1d8TIbdkgRfvsJVquuZ94" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
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
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
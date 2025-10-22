import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestKoreanInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJdUnNJjgddkgRWd94eZHjn3Q",
    "slug": "soju-korean-restaurant-4eZHjn3Q",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJdUnNJjgddkgRWd94eZHjn3Q",
    "name": "Soju Korean Restaurant",
    "description": "Korean cuisine that's as vibrant as Seoul itself - expect fireworks in every bite. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 18,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "282 Cambridge Heath Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "282 Cambridge Heath Rd, London",
    "postcode": "E2 9DA",
    "borough": "Central London",
    "lat": 51.5339896,
    "lng": -0.0570963,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.thebestinlondon.co.uk",
    "url": "https://maps.google.com/?cid=8403685643644362585",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 5:00 – 11:00 PM",
        "Tuesday: Closed",
        "Wednesday: 5:00 – 11:00 PM",
        "Thursday: 5:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
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
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2300"
          },
          "open": {
            "day": 3,
            "time": "1700"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2300"
          },
          "open": {
            "day": 4,
            "time": "1700"
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
        "reference": "AciIO2fC6MbTCbIaIIr2dEQtmZDsy0nN4WzRcEqSKuUSzjodU0-zG0aEiCgA0IttuMktitNH6bBGFRzGzNkxhB-ZxUJ8XcKgGaNOm_x3CZ_tOA7nqLg16uZD6hdsPvPdkKUble2Qzq7ahjeLpX3jOewCsBijz62Pu3r3GZMIu7mOUCXUG3_EJhjHwcyQA0cF-TnZ-pRcG2QKnXe2a44SgBBFLNqvws_3sMASzowoqXrOMxZZgLYkKrBACcbXvxlMTiHs1TKF8EagWE3QZVqH4KZPTC2JQnSZThGnpCyXTjSi5VI9sA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fC6MbTCbIaIIr2dEQtmZDsy0nN4WzRcEqSKuUSzjodU0-zG0aEiCgA0IttuMktitNH6bBGFRzGzNkxhB-ZxUJ8XcKgGaNOm_x3CZ_tOA7nqLg16uZD6hdsPvPdkKUble2Qzq7ahjeLpX3jOewCsBijz62Pu3r3GZMIu7mOUCXUG3_EJhjHwcyQA0cF-TnZ-pRcG2QKnXe2a44SgBBFLNqvws_3sMASzowoqXrOMxZZgLYkKrBACcbXvxlMTiHs1TKF8EagWE3QZVqH4KZPTC2JQnSZThGnpCyXTjSi5VI9sA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101476489683661287270\">Soju Korean Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2edKgWrpGsUILyEAG1wzCs5L7_2XRSMDB_O9LIRnHYEemC0SGb4XtR_r26EAkh19SdFJJ7xYkuW3I6Y8XNhx64BhFBbWf-wJRYqHc-si1_mUYMPN3GgWB4uSLg5mWfUeXzfkLVbXbpp3IFTDKnXQRHagbR4ODnj1-L-6jqI_DvH7sDHI3DfuzQo8k33p6uoSa0G1Bct3UerxM-oMh6AfMLT09y_lB2rCidnf_KuiKRN5znqN-RP-9wZuBC4BA3DHqlkNJ4W5IC5zldjUslGV6LHC2A5aHNKqlp6WT78CjJWZw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2edKgWrpGsUILyEAG1wzCs5L7_2XRSMDB_O9LIRnHYEemC0SGb4XtR_r26EAkh800SdFJJ7xYkuW3I6Y8XNhx64BhFBbWf-wJRYqHc-si1_mUYMPN3GgWB4uSLg5mWfUeXzfkLVbXbpp3IFTDKnXQRHagbR4ODnj1-L-6jqI_DvH7sDHI3DfuzQo8k33p6uoSa0G1Bct3UerxM-oMh6AfMLT09y_lB2rCidnf_KuiKRN5znqN-RP-9wZuBC4BA3DHqlkNJ4W5IC5zldjUslGV6LHC2A5aHNKqlp6WT78CjJWZw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101476489683661287270\">Soju Korean Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dM662hbnSIOJukdrPDRJ1Ypq_d9WEDJwnheDDicsiBKOut1SsYt4lOFgbX3y8IQBdS7qYEoIWiO9JYjDGTyeJpXhZKcKUrYZAMuBQlNfQ7_sLBxM6mshPT5I6yp_FN7ElcEaCHxtsZrX3rWnWtDTO4h_N20gHb58TbZueZtYbkbXywhsgkTl-TDYWg7Rb0uB37Lc_Y78gap_NjGyILqHomS6yeLi5cMAL9adS1TAJ3oM0CkhmCu9TLIhe1Quo8Dux7boWeDQLcso_jFKl9MQCINAzexSgn5vrcvvq9lcZG5A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dM662hbnSIOJukdrPDRJ1Ypq_d9WEDJwnheDDicsiBKOut1SsYt4lOFgbX3y8IQBdS7qYEoIWiO9JYjDGTyeJpXhZKcKUrYZAMuBQlNfQ7_sLBxM6mshPT5I6yp_FN7ElcEaCHxtsZrX3rWnWtDTO4h_N20gHb58TbZueZtYbkbXywhsgkTl-TDYWg7Rb0uB37Lc_Y78gap_NjGyILqHomS6yeLi5cMAL9adS1TAJ3oM0CkhmCu9TLIhe1Quo8Dux7boWeDQLcso_jFKl9MQCINAzexSgn5vrcvvq9lcZG5A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101476489683661287270\">Soju Korean Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dmXMp9dVN5uAlAXEX66avBLZAmC5obXurfFALhHlidckL3O5gudKxa2oR5XTEm7gjedi3-v2n5TaqaBgANjaoGvKPiJfL_zbyF-uH7VpbJX5njsAomXae-fU16_Jz4hcphp1V-ickH8LjdrTWhmjimSaKUwx4vSArnTNMpBo9Ea5WR2k3Ocah8zkEwS2uHtI08HJsGng-3qas4N00TolQJMv94M-wxhY8vmkZ2KStduET4LQ6Gfi9mLaYf4lQFmzusZnFC9ntdKpdqh445BVdmDJBbH03P45hVNSgLeNVsfw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dmXMp9dVN5uAlAXEX66avBLZAmC5obXurfFALhHlidckL3O5gudKxa2oR5XTEm7gjedi3-v2n5TaqaBgANjaoGvKPiJfL_zbyF-uH7VpbJX5njsAomXae-fU16_Jz4hcphp1V-ickH8LjdrTWhmjimSaKUwx4vSArnTNMpBo9Ea5WR2k3Ocah800zkEwS2uHtI08HJsGng-3qas4N00TolQJMv94M-wxhY8vmkZ2KStduET4LQ6Gfi9mLaYf4lQFmzusZnFC9ntdKpdqh445BVdmDJBbH03P45hVNSgLeNVsfw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101476489683661287270\">Soju Korean Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2egpTzQOImFBOQhTXZv9HeIi0qBc8VZW4re3zB502_O9gRzuaUItGdJzGAOQN6PjhZaSWYWDlEdsja5jO26_xFdzfT1JwHqsszTsVs40lhpz9th5g7xRkhZ1STv5XZunrt0zIf4HaQiWx_5zNkmQU1muud4C8U5nC8iFq0_v0smPi2gtv5vEA7Yr0jc6Na-gBqy9V6SgPfKyPWNOqJBffBq0hNFd9eZE8RHU23OjH8ano8Mz0qLp0OFRWZKfmDeI19nqBw0jVfYUrlBQIt3PYnUeFhwNwj1Qpt8pBhnnusg4Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2egpTzQOImFBOQhTXZv9HeIi0qBc8VZW4re3zB502_O9gRzuaUItGdJzGAOQN6PjhZaSWYWDlEdsja5jO26_xFdzfT1JwHqsszTsVs40lhpz9th800g7xRkhZ1STv5XZunrt0zIf4HaQiWx_5zNkmQU1muud4C8U5nC8iFq0_v0smPi2gtv5vEA7Yr0jc6Na-gBqy9V6SgPfKyPWNOqJBffBq0hNFd9eZE8RHU23OjH8ano8Mz0qLp0OFRWZKfmDeI19nqBw1200jVfYUrlBQIt3PYnUeFhwNwj1Qpt8pBhnnusg4Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101476489683661287270\">Soju Korean Restaurant</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Esther Sonneveld Alamgir",
        "rating": 5,
        "text": "Awesome food, lovely staff, fast service and terrific atmosphere. Place is clean, service is top class. Highly recommended.",
        "time": 1754251804,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Marie Archambie",
        "rating": 5,
        "text": "Stumbled across this place whilst searching for Korean restaurants for my daughters birthday. We came here lovely small restaurant everyone of the staff were very friendly and this made us feel very welcome. The food portion sizes were very good. My favourite thing that we had were the amazing honey garlic sticky wings. The crunch, size, taste amazing. This was my first time and not my last thank you team for amazing service.",
        "time": 1754338912,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Sk Kibria",
        "rating": 5,
        "text": "The restaurant's food is just nice and testy. Service is also awesome.\nWish to be there often .",
        "time": 1753552458,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Rori Maine",
        "rating": 4,
        "text": "Really lovely, kind and friendly staff and super tasty food! Would recommend!",
        "time": 1753475211,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Zahid Jaman",
        "rating": 5,
        "text": "\"Had a lovely Korean meal with my daughter today in Bethnal Green. Tasty food, kind staff, and cosy vibe. Highly recommend!\"",
        "time": 1754337357,
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
    "lastVerifiedGoogle": "2025-10-15T10:53:56.304Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:56.304Z",
    "updatedAt": "2025-10-16T20:24:53.309Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Soju Korean Restaurant — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_soju-korean-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.445Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Soju Korean Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "282 Cambridge Heath Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 18
      },
      "url": "https://thebestinlondon.co.uk/restaurant/soju-korean-restaurant-4eZHjn3Q",
      "openingHours": [
        "Monday: 5:00 – 11:00 PM",
        "Tuesday: Closed",
        "Wednesday: 5:00 – 11:00 PM",
        "Thursday: 5:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
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
    "image_card_path": "/images/restaurants/soju-korean-restaurant-4eZHjn3Q/korean-soju-korean-restaurant-4eZHjn3Q-card-b6077934.webp",
    "image_hero_path": "/images/restaurants/soju-korean-restaurant-4eZHjn3Q/korean-soju-korean-restaurant-4eZHjn3Q-hero-510d2b75.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJaxWqk7UcdkgRjr3dwrPTj8I",
    "slug": "vegan-yes-dwrPTj8I",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJaxWqk7UcdkgRjr3dwrPTj8I",
    "name": "Vegan Yes",
    "description": "Relaxed, eclectic cafe serving Italian & Korean fusion vegan fare such as pasta & kimchi.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {
      "vegan": true
    },
    "rating": 4.8,
    "user_ratings_total": 2221,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "64 Brick Ln, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "64 Brick Ln, London",
    "postcode": "E1 6RF",
    "borough": "Central London",
    "lat": 51.51876009999999,
    "lng": -0.0714397,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "http://www.veganyes.co.uk/",
    "url": "https://maps.google.com/?cid=14019656934049561998",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 4:00 – 9:00 PM",
        "Tuesday: 4:00 – 9:00 PM",
        "Wednesday: 4:00 – 9:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:00 PM",
        "Saturday: 12:00 – 10:00 PM",
        "Sunday: 12:00 – 9:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2100"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2100"
          },
          "open": {
            "day": 1,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2100"
          },
          "open": {
            "day": 2,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2100"
          },
          "open": {
            "day": 3,
            "time": "1600"
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
            "time": "2200"
          },
          "open": {
            "day": 5,
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
            "time": "1200"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dbAb5n2acvi68UxYmiHBO_XDxS5sxwWS-SMZt_Xx6StwgNeVnmVHGZjMh3PBlMj51fHt679ZtSRlz6KIOITkTTRbRkN9uUdorl8vnE0zV_FemG1xMLAc4A4HOhb-GwGrO8leStDplyR8mySuEP4EwM42dw-DsTqIVQ51ObLqAn4Ah1rjGxXYlBur34Nk660jdJMHc03tJfeQ2ivbnSWbsZMgaDYVLesd-xxipJRDN0qkDgbwzmEYTXWFFuWWclToEwpRj8lZGQ373meA-Nt9uc2m9ux-JBkCcNl0bISVwDEg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dbAb5n2acvi68UxYmiHBO_XDxS5sxwWS-SMZt_Xx6StwgNeVnmVHGZjMh800PBlMj51fHt679ZtSRlz6KIOITkTTRbRkN9uUdorl8vnE0zV_FemG1xMLAc4A4HOhb-GwGrO8leStDplyR8mySuEP4EwM42dw-DsTqIVQ51ObLqAn4Ah1rjGxXYlBur34Nk660jdJMHc03tJfeQ2ivbnSWbsZMgaDYVLesd-xxipJRDN0qkDgbwzmEYTXWFFuWWclToEwpRj8lZGQ373meA-Nt9uc2m9ux-JBkCcNl0bISVwDEg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116970616811254598380\">Vegan Yes Shoreditch</a>"
        ]
      },
      {
        "reference": "AciIO2flgmCZSpXQbH5JPfl9kppo3guQ4bl1l_SgluO_by1xe6VuIbyyhmmUHo1codJ16i3ot7-GLDXSa-ztGHxt5-jJHO-vXnEOY05jG1KYfK9KebaBqXB_AoHZNWHOjdMVG3Mzv491YkPfIWnCpQcpL8gEkKjCFsHSQNS8rIqsn07lnu5FvmMKWGf4lB5g7CklZe1vwIOWOR3nP0MSIm3O21USNtf9ziRJ_fBNTZYXPGTgobac9wtACV1-H-ualRjxWWtsuvKV_TYWeIpL-EqS591mAheOJV02rJY9TW2ZAEkLww",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2flgmCZSpXQbH5JPfl9kppo3guQ4bl1l_SgluO_by1xe6VuIbyyhmmUHo1codJ16i3ot7-GLDXSa-ztGHxt5-jJHO-vXnEOY05jG1KYfK9KebaBqXB_AoHZNWHOjdMVG3Mzv491YkPfIWnCpQcpL8gEkKjCFsHSQNS8rIqsn07lnu5FvmMKWGf4lB5g7CklZe1vwIOWOR3nP0MSIm3O21USNtf9ziRJ_fBNTZYXPGTgobac9wtACV1-H-ualRjxWWtsuvKV_TYWeIpL-EqS591mAheOJV02rJY9TW2ZAEkLww&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116970616811254598380\">Vegan Yes Shoreditch</a>"
        ]
      },
      {
        "reference": "AciIO2cFyKRvAfq_cZuwroOEdMpbgC8xS4FQZXuEsPwFBWMZhGINBvtveIszw8hU8y91E_XpgmgcJlJgFC-ca1YJ10F8ST3NUzSV1b7kdltZDx3dafLyxRQOuCg8DtcoHEC-_T6QU_vLwj_fpy67q6jAHVAdK6ob75YQV8n2aGSfhnG27shL1b1ewK9ZKp8r1sqMgiNnVtNYxx-CMlGTqFHl_oPnzdx-jCJFD7nl1F65D0SiZYvluUQIVBPnB_prEJy9E9mAGKQ6QLuJJ7YSmvFFKh53inJfGtCFGEroxcyRGgOKbpf_tCZq-IdDKdQiffSQv6fKFZpKRa-2UgcPKr_uZJaWL1qQHsAT_gjw04R0uRzbkIvwQoodGb6TAthov4RDoERDm3h_yu7iTCBYiL8XoBhC89OS2e3wQr9QSYwMHmpURlsyZ_Q2kjpkp_-RPXIz",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cFyKRvAfq_cZuwroOEdMpbgC8xS4FQZXuEsPwFBWMZhGINBvtveIszw1200hU8y91E_XpgmgcJlJgFC-ca1YJ10F8ST3NUzSV1b7kdltZDx3dafLyxRQOuCg8DtcoHEC-_T6QU_vLwj_fpy67q6jAHVAdK6ob75YQV8n2aGSfhnG27shL1b1ewK9ZKp8r1sqMgiNnVtNYxx-CMlGTqFHl_oPnzdx-jCJFD7nl1F65D0SiZYvluUQIVBPnB_prEJy9E9mAGKQ6QLuJJ7YSmvFFKh800inJfGtCFGEroxcyRGgOKbpf_tCZq-IdDKdQiffSQv6fKFZpKRa-2UgcPKr_uZJaWL1qQHsAT_gjw04R0uRzbkIvwQoodGb6TAthov4RDoERDm3h_yu7iTCBYiL8XoBhC89OS2e3wQr9QSYwMHmpURlsyZ_Q2kjpkp_-RPXIz&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100429831066442078563\">Rob Sheppard</a>"
        ]
      },
      {
        "reference": "AciIO2cM3AtsAI3SV9uMPWkmSMbsiBYCkWlZ6lRswIq0Vm78mPhOLVIR4eEiI93u9mu1ixOO14BgH4m9vaDcwYOKsll_MxSYyhl0brhiEd0mfdUnqH7sNfEKj6oJsKDwTq-5XBOBuUU_HUwCP7AVL4epGEA2-DOQhPmrSeiMGBYmljzG_eNPykza4jmML0eWbH57-706G909MQwaFG06d_tdDTMIE2mXQRbSHRKyWtQyAN-VLrhXCY-fBB0Vt4kmZSDv8mYoJVNzCp0ZFxQXzu7bZVITN5tIomXp_thXbNqfez1EBnHSo_WIpD_j27PWJp1hWUX6aCv0dnc6li8xFhFgd3lzygooy6a-AYLz7lhiRFKd-By_hlOUaLl5OAGyDj_FC_au6enKAUfbyAyi4o4esqTs87j_NrnyjI91ViM0IXY4wgH-",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cM3AtsAI3SV9uMPWkmSMbsiBYCkWlZ6lRswIq0Vm78mPhOLVIR4eEiI93u9mu1ixOO14BgH4m9vaDcwYOKsll_MxSYyhl0brhiEd0mfdUnqH7sNfEKj6oJsKDwTq-5XBOBuUU_HUwCP7AVL4epGEA2-DOQhPmrSeiMGBYmljzG_eNPykza4jmML0eWbH57-706G909MQwaFG06d_tdDTMIE2mXQRbSHRKyWtQyAN-VLrhXCY-fBB0Vt4kmZSDv8mYoJVNzCp0ZFxQXzu7bZVITN5tIomXp_thXbNqfez1EBnHSo_WIpD_j27PWJp1hWUX6aCv0dnc6li8xFhFgd3lzygooy6a-AYLz7lhiRFKd-By_hlOUaLl5OAGyDj_FC_au6enKAUfbyAyi4o4esqTs87j_NrnyjI91ViM0IXY4wgH-&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112298938605984245050\">Davide Pettenuzzo</a>"
        ]
      },
      {
        "reference": "AciIO2cLNaj-xgGunLCyR4feQgJqF1ztgQDHaNi4ud46qWhCGY7emD7dBM59QH_SLVtqHn2cgJNURxp3trJw_T-ogNKMiqdtdGFlQsv05jUdpphnp-mhWbS6OBORxpmbYPjsQDKZZuy4_0W5yw2iQFdqojQ90-E2KUn6C7r4zOW3EN5oC1ZhthT6i7_3j1mCq5VFq4l262BrSDNq8MJX8ygDGyQgj98Kr1sd6Xl8-3RBqeKRASReb88K2U-NNLYc1ai-wuRdKCkvVZ5K2SX4G80YIUeYSvTwBJkaSMk900jh5Uy7XZnVdhCiRZb5FA9IArIhohe-pLhrvhE6ThDJy78I88g6MxlgUFyRNIIyjRWx3aYx5aacPMp5ltI5HubXpnKaghAfTs5zO_bYD6DcHCDgSZQOVcnIHOqevMWDPQaoObFV8Th28rLfP-TIj5cfDbq9",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cLNaj-xgGunLCyR4feQgJqF1ztgQDHaNi4ud46qWhCGY7emD7dBM59QH_SLVtqHn2cgJNURxp3trJw_T-ogNKMiqdtdGFlQsv05jUdpphnp-mhWbS6OBORxpmbYPjsQDKZZuy4_0W5yw1200iQFdqojQ90-E2KUn6C7r4zOW3EN5oC1ZhthT6i7_3j1mCq5VFq4l262BrSDNq8MJX8ygDGyQgj98Kr1sd6Xl8-3RBqeKRASReb88K2U-NNLYc1ai-wuRdKCkvVZ5K2SX4G80YIUeYSvTwBJkaSMk900jh800Uy7XZnVdhCiRZb5FA9IArIhohe-pLhrvhE6ThDJy78I88g6MxlgUFyRNIIyjRWx3aYx5aacPMp5ltI5HubXpnKaghAfTs5zO_bYD6DcHCDgSZQOVcnIHOqevMWDPQaoObFV8Th28rLfP-TIj5cfDbq9&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117682452990108133678\">Vegan London</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Ray Pak",
        "rating": 5,
        "text": "Very interesting Korean Italian fusion, due to the actual marriage of a Korean woman and Italian man. Some of the fusion dishes are not particularly pushing the edge but others are a bit more adventurous. They also give samples of their kimchis and have kombucha as well. The owners are interesting and have specific philosophies on life which they are eager to share if asked. None of the food is fried which is great for those who avoid fried foods. The location is also great for those who want to spend a day exploring Brick Lane and the many things it has to offer.",
        "time": 1758728449,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Elvis Azisova",
        "rating": 5,
        "text": "This place had been on my radar for too long, and I finally made it! Tried 4 dishes and 2 desserts — the highlights for me were the Korean Inari, Toppognocci, and chocolate mochi. Everything was top-quality, delicious, and made me feel good knowing it’s tasty but healthy. A Korean-Italian fusion run by a Korean-Italian couple, located on Brick Lane. If you love kimchi, this is your spot",
        "time": 1756468004,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "NATTHA PODOK",
        "rating": 5,
        "text": "The food here is absolutely delicious! I love how the chef masterfully combines Italian and Korean flavors—it works so well. As soon as we arrived, the staff invited us to taste five different types of kimchi so we could choose our favorite to pair with our dish. It was such an interesting and thoughtful touch to the service. But anyhow service is a bit slow because they don’t have much staff to attend. We ordered many items and enjoyed almost all of them. The kimchi was well-fermented, the kombucha was tasty, and the chocolate onigiri was a real standout—so good! Definitely planning to go back again.",
        "time": 1752465327,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Flora Zambakari",
        "rating": 3,
        "text": "Fully vegan place. It was okay, service was very, very, slow so if you are in a hurry, don’t go here.\n\nGot the sushi burger which was good and the kimchi pasta which tasted like they mashed up some gnocchi and mixed it was well seasoned though. The only thing is, the pasta was too cooked through so it was mushy.  Also got the seaweed which was okay. I wish it was a bit more salted and seasoned.\n\nOverall, okay. I didn’t get any drinks, just tap water.\n\nFYI, cash is preferred at this place and I don’t believe they have a restroom. I asked if there is a bathroom to go wash my hands and the server said no and brought me hand sanitizer.",
        "time": 1754504530,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Thomas Kunz",
        "rating": 5,
        "text": "I had been looking for a good vegan restaurant for quite a while, and finally discovered Vegan Yes – definitely worth the wait! The concept and overall vibe immediately won me over.\n\nThe service was extremely friendly, attentive, and full of great recommendations. I especially enjoyed the little kimchi tasting at the beginning. I ordered the Kimchi Burger, but also got to try the Kimchi Bruschetta – both were absolutely delicious, packed with flavor, and really creative.\n\nTo finish, I had the dark chocolate mochi, which was the perfect ending to a wonderful meal.\n\nOverall, Vegan Yes is not only a must-visit for vegans but for anyone who appreciates thoughtful, flavorful food. Highly recommended!",
        "time": 1757367908,
        "relative_time_description": "a month ago"
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
    "fsa_authority": "Tower Hamlets",
    "fsa_url": "https://ratings.food.gov.uk/business/1002241",
    "fsa_last_inspection": "2025-03-20T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:05.134Z",
    "lastVerifiedFSA": "2025-10-16T23:20:05.466Z",
    "createdAt": "2025-10-15T10:54:05.134Z",
    "updatedAt": "2025-10-16T20:25:06.261Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Vegan Yes — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_vegan-yes_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.455Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Vegan Yes",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "64 Brick Ln, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 2221
      },
      "url": "https://thebestinlondon.co.uk/restaurant/vegan-yes-dwrPTj8I",
      "openingHours": [
        "Monday: 4:00 – 9:00 PM",
        "Tuesday: 4:00 – 9:00 PM",
        "Wednesday: 4:00 – 9:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:00 PM",
        "Saturday: 12:00 – 10:00 PM",
        "Sunday: 12:00 – 9:00 PM"
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
    "image_card_path": "/images/restaurants/vegan-yes-dwrPTj8I/korean-vegan-yes-dwrPTj8I-card-1322dcf6.webp",
    "image_hero_path": "/images/restaurants/vegan-yes-dwrPTj8I/korean-vegan-yes-dwrPTj8I-hero-834aabfe.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJk-I180QDdkgR53ATiSvAj5c",
    "slug": "koko-grill-korean-bbq-restaurant-TiSvAj5c",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJk-I180QDdkgR53ATiSvAj5c",
    "name": "Koko Grill Korean BBQ Restaurant",
    "description": "Where Korean tradition meets London sophistication - bold, beautiful, and delicious. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 148,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "173 Tower Bridge Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "173 Tower Bridge Rd, London",
    "postcode": "SE1 2AW",
    "borough": "Central London",
    "lat": 51.5015545,
    "lng": -0.0782416,
    "phone": "07557 929039",
    "phone_international": "+44 7557 929039",
    "website": "https://kokogrill.co.uk/",
    "url": "https://maps.google.com/?cid=10921158914612621543",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 10:30 PM",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
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
            "time": "1200"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2d2_NQK1Gd_vc2xxyz8m5yHa9wLqzx3Wt5UnM5a5Chplkg94LpOOqMXPwNrJx_gDlvAEzQnfx1sjoE1-B7IUInsvAWt7oeBPWfd33ZKuNgHtwUjTdvaCmlq-p2EngonM9iFaIDrr_Bl7OhWWGcjgBSBvMjITo9ZX2LiD06b8kAAMoQdwNxhfT51k6GDkHEVuhqTJ6_IG6DbuQG4aVZFCUa6d3xzo0zUACA3MHuOj42HZWYrh97Bm_qwUZ6yt9ehHDCCHP_BHuoozHnacCutWqewpSRhSuaVx7S0NbxvDQITCA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d2_NQK1Gd_vc2xxyz8m5yHa9wLqzx3Wt5UnM5a5Chplkg94LpOOqMXPwNrJx_gDlvAEzQnfx1sjoE1-B7IUInsvAWt7oeBPWfd33ZKuNgHtwUjTdvaCmlq-p2EngonM9iFaIDrr_Bl7OhWWGcjgBSBvMjITo9ZX2LiD06b8kAAMoQdwNxhfT51k6GDkHEVuhqTJ6_IG6DbuQG4aVZFCUa6d3xzo0zUACA3MHuOj42HZWYrh800Bm_qwUZ6yt9ehHDCCHP_BHuoozHnacCutWqewpSRhSuaVx7S0NbxvDQITCA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104944178775307784999\">Koko Grill Korean BBQ Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2cQwRpJluxOOFf0cEHtm0ktA8SNLKFxfEzls8C0Tl3MXxDK6yaXGTkFVHSSIZa6UNqyQyxy29-WH4MygHWKMnp8i7Sj1rAB1i9TAVHrPXpLggONxTzjjPMvg0Fd3Y1rdEpyv-RZqgNjezGDPNRUNXqcgpqfqDfVyBziequP8xUmANn9xpO2RzR7FgdkrkKyU7XUpa5gMvZiGgVTCBLqnylDdLSIzFfmmpK2fmfag7ef0pxePZYUEhyuCT2kxz3C9iw1Snuz2KmwnIcgjfC9DDpYFLjyMgHAXdF5Zc_EpQZfHw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cQwRpJluxOOFf0cEHtm0ktA8SNLKFxfEzls8C0Tl3MXxDK6yaXGTkFVHSSIZa6UNqyQyxy29-WH4MygHWKMnp8i7Sj1rAB1i9TAVHrPXpLggONxTzjjPMvg0Fd3Y1rdEpyv-RZqgNjezGDPNRUNXqcgpqfqDfVyBziequP8xUmANn9xpO2RzR7FgdkrkKyU7XUpa5gMvZiGgVTCBLqnylDdLSIzFfmmpK2fmfag7ef0pxePZYUEhyuCT2kxz3C9iw1200Snuz2KmwnIcgjfC9DDpYFLjyMgHAXdF5Zc_EpQZfHw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104944178775307784999\">Koko Grill Korean BBQ Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2envsGtCI0lQh9_RJMRHJZul1pwjheyr5UE5nkYiXrfBb7vdIVMPpCMjU8lMB0KkptfLjis2fI48fb-gXtj0eYzFlflP8xSN93qrM-af_9U3iD3bb0W8SLXnAfCC54VogoupZRQ0Hg9qPjbutct9S7lIRz6Lx1wlA2HgCUPXhkCY-y4q3PSygozTTY7Vdg2JKatC1bNyf1TrDu9pT3LPUxRCFmXFJ0lDMH5dj460u6tpwM0pLWtnMztA78Gpgezjajcby6DSlmCCBJfvTeCw4Dz69SE2EIloXo-QTYFzm89HugsTdTOLK05-MY56xXK6XVapJU-5fwc-BoWD2liv591OiO-8ybnI_gYe4ZZpC7tC1sFeAQ3Cu_fh1exUffJ7IxWEwXG926wkJo6k_mFUfo1vWRBm7Vi3mVwGy10OcuTbcTli2mmjBkSJkdLFqIF",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2envsGtCI0lQh800_RJMRHJZul1pwjheyr5UE5nkYiXrfBb7vdIVMPpCMjU8lMB0KkptfLjis2fI48fb-gXtj0eYzFlflP8xSN93qrM-af_9U3iD3bb0W8SLXnAfCC54VogoupZRQ0Hg9qPjbutct9S7lIRz6Lx1wlA2HgCUPXhkCY-y4q3PSygozTTY7Vdg2JKatC1bNyf1TrDu9pT3LPUxRCFmXFJ0lDMH5dj460u6tpwM0pLWtnMztA78Gpgezjajcby6DSlmCCBJfvTeCw1200Dz69SE2EIloXo-QTYFzm89HugsTdTOLK05-MY56xXK6XVapJU-5fwc-BoWD2liv591OiO-8ybnI_gYe4ZZpC7tC1sFeAQ3Cu_fh1exUffJ7IxWEwXG926wkJo6k_mFUfo1vWRBm7Vi3mVwGy10OcuTbcTli2mmjBkSJkdLFqIF&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109188658363650541644\">Gracia Daniel</a>"
        ]
      },
      {
        "reference": "AciIO2dVKhY4dmCIbdbeFR2wtD5sDtGLV2ZDq0EKw8keJc7If9pjuhULbqfovrxI_D-K5yn4QE0keF384_S5wcT9nMgBfhlEeJ92seZLkwU3mng3zL9oDb0gofMQ9d23w05BodtGsyWiGCOMkjFtxVso322PYJV5CrUDXegwEXou9eN4ybNauTSfQ7aP52DrE1aWRAn6Kzy5R4o6TrqSHf_ruSrXr6WnnelijicfQH1XbwPXJtf9ZVaCssuQgMOS6AR-bWqO4vrSkmqzZNY7tui63whDvkrfzDDlDq6UBB2eZyD8ZJg0oWMQLcRnI8M09iX1GaPZMKCF22qsV84GQCjmGPpOhSSs7oqS-9Yasw6RI1rchtbOQ8kpTdGP_i7817CAl4GteJTexO-M36i3Lt8dmhX5eylAMvVzY6mVr5Xvi31N_WfxnM4biqi0pcSSXig9",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dVKhY4dmCIbdbeFR2wtD5sDtGLV2ZDq0EKw1200keJc7If9pjuhULbqfovrxI_D-K5yn4QE0keF384_S5wcT9nMgBfhlEeJ92seZLkwU3mng3zL9oDb0gofMQ9d23w05BodtGsyWiGCOMkjFtxVso322PYJV5CrUDXegwEXou9eN4ybNauTSfQ7aP52DrE1aWRAn6Kzy5R4o6TrqSHf_ruSrXr6WnnelijicfQH1XbwPXJtf9ZVaCssuQgMOS6AR-bWqO4vrSkmqzZNY7tui63whDvkrfzDDlDq6UBB2eZyD8ZJg0oWMQLcRnI8M09iX1GaPZMKCF22qsV84GQCjmGPpOhSSs7oqS-9Yasw6RI1rchtbOQ8kpTdGP_i7817CAl4GteJTexO-M36i3Lt8dmhX5eylAMvVzY6mVr5Xvi31N_WfxnM4biqi0pcSSXig9&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101234583859636293045\">Howard Wu</a>"
        ]
      },
      {
        "reference": "AciIO2esBnBJ7QfYNDOzDTZsZN6Jc5idYw_2Ad5qFreXAv7FPtz2wEmq2g_NEJ5TqQfB8S6m9-3cgjpY9LdKqqf7SKch0-hjAOc8ZDkduONZNl3ta_kN1YyFN0pZ5JyseMU8hFkUYGjG_TNSU3ue-21jCCiYXsfUvCZSXGAyVgdyaMGeJJXCEcdnlZzOcOvujfOKkoWQyehX5pDD37h50928eGr1FyaQr7HsMG17UjYwheHvKAecjeSE1AcIGewvgrTVtoVGp2Ng_oBh8X-EzcEafe0aGcbgTE7ztvMtiG9wMQPFpKB7zJ6-C7ZR5FUoDCxGz3y32qTbQSwekliTjuQGYTkESEV6gMgHUhAfEgBWyVdItL9mn3uYjT4lCnKsO4HZ3LAgFNl66yKmchuoO2i_a6qBRNzHmm-zRq5pbYw_NcZjFA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2esBnBJ7QfYNDOzDTZsZN6Jc5idYw_2Ad5qFreXAv7FPtz2wEmq2g_NEJ5TqQfB8S6m9-3cgjpY9LdKqqf7SKch800-hjAOc8ZDkduONZNl3ta_kN1YyFN0pZ5JyseMU8hFkUYGjG_TNSU3ue-21jCCiYXsfUvCZSXGAyVgdyaMGeJJXCEcdnlZzOcOvujfOKkoWQyehX5pDD37h50928eGr1FyaQr7HsMG17UjYwheHvKAecjeSE1AcIGewvgrTVtoVGp2Ng_oBh8X-EzcEafe0aGcbgTE7ztvMtiG9wMQPFpKB7zJ6-C7ZR5FUoDCxGz3y32qTbQSwekliTjuQGYTkESEV6gMgHUhAfEgBWyVdItL9mn3uYjT4lCnKsO4HZ3LAgFNl66yKmchuoO2i_a6qBRNzHmm-zRq5pbYw_NcZjFA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114407763662633819217\">Cheryl C</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Howard Wu",
        "rating": 5,
        "text": "Great food! We walked past this restaurant and decided to give it a try — surprisingly, it turned out to be very good!",
        "time": 1756482475,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Teresa R",
        "rating": 5,
        "text": "As my first time having Korean bbq I cannot complain. I really enjoyed the food especially the pancakes and the seaweed rice dumplings but also the bbq was tasty maybe too hot for me but that’s just my personal taste. All the staff were so polite and nice I will definitely go back.",
        "time": 1755033834,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Gracia Daniel",
        "rating": 4,
        "text": "Great Korean BBQ experience... The service was exemplary... Food was great and filling... A bit expensive, but then the portions were big",
        "time": 1758617867,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Jialei Qian",
        "rating": 5,
        "text": "Really delicious food, great value for money and excellent service. The place itself is very clean and spacious. It does get busy at night so do make reservations especially for BBQ - the staff are really really fast and food comes really fast too so you should be ok walking up for non-BBQ but book for BBQ.\n\nFood is really tasty and good portion size. I would say one of the best around SE1. We ordered 2 mains, 2 rice and kimchi assortment; and we were so full!\n\nWe are so happy we have a local Korean restaurant now! Will be back more!",
        "time": 1758313324,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "wong eve",
        "rating": 5,
        "text": "Amazing food! Amazing service even help grill the meet! People are nice the vibe is amazing ! Meat is fresh",
        "time": 1755380196,
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
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:53:53.605Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:53.605Z",
    "updatedAt": "2025-10-16T20:24:51.816Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Koko Grill Korean BBQ Restaurant — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_koko-grill-korean-bbq-restaura_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.444Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Koko Grill Korean BBQ Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "173 Tower Bridge Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 148
      },
      "url": "https://thebestinlondon.co.uk/restaurant/koko-grill-korean-bbq-restaurant-TiSvAj5c",
      "openingHours": [
        "Monday: 12:00 – 10:30 PM",
        "Tuesday: 12:00 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 10:30 PM",
        "Friday: 12:00 – 10:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/koko-grill-korean-bbq-restaurant-TiSvAj5c/korean-koko-grill-korean-bbq-restaurant-TiSvAj5c-card-d3360a61.webp",
    "image_hero_path": "/images/restaurants/koko-grill-korean-bbq-restaurant-TiSvAj5c/korean-koko-grill-korean-bbq-restaurant-TiSvAj5c-hero-4435d447.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ1wxyhyQDdkgRt_HA2kpdsBc",
    "slug": "jang-restaurant-A2kpdsBc",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ1wxyhyQDdkgRt_HA2kpdsBc",
    "name": "Jang Restaurant",
    "description": "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 203,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "The Mezzanine, First Floor, Royal Exchange, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "The Mezzanine, First Floor, Royal Exchange, London",
    "postcode": "EC3V 3LQ",
    "borough": "Central London",
    "lat": 51.5135331,
    "lng": -0.08690089999999999,
    "phone": "020 8187 2209",
    "phone_international": "+44 20 8187 2209",
    "website": "https://jangrestaurant.co.uk/",
    "url": "https://maps.google.com/?cid=1706966834852458935",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 5:00 PM – 12:00 AM",
        "Sunday: Closed"
      ],
      "periods": [
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
            "time": "1700"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dMO1tZIptniSGlMXjPOvGXmZk3jnyKHokLBakhKJFxxHXZUx05Fqa-T63R8_9xPhnwxEddv6H0BTZ8yRuSfI4ydbon9POB2LBLbj565PLLxQvYKmKlEItX8jawcYFVi1bR0X1Us4ioNRNkCM0u4SLukwWrJiGFb0JLWi9z3bLW9Hwp9AnfqBbgcFKoAa7lyHBTUa2EiqZHq6M78HVNQCkcP5P4wamrk1kYRV5x-sezKwgJn9JUHiiyYPJH-NiDeKqHbC9eB40eD52nCPWhptknYtoUPf43gtHf9OcFk9O6NQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dMO1tZIptniSGlMXjPOvGXmZk3jnyKHokLBakhKJFxxHXZUx05Fqa-T63R8_9xPhnwxEddv6H0BTZ8yRuSfI4ydbon9POB2LBLbj565PLLxQvYKmKlEItX8jawcYFVi1bR0X1Us4ioNRNkCM0u4SLukwWrJiGFb0JLWi9z3bLW9Hwp9AnfqBbgcFKoAa7lyHBTUa2EiqZHq6M78HVNQCkcP5P4wamrk1kYRV5x-sezKwgJn9JUHiiyYPJH-NiDeKqHbC9eB40eD52nCPWhptknYtoUPf43gtHf9OcFk9O6NQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108402620368719383985\">Jang Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2fLPIAEFKCSl1ndlO5MfFCAwc-bHUQI4dKREx5YRAOlwcwwwBwzUNsjBCd19lJXvzqZAKwgWITOTCMSpyM8waGbS8-XBMMQPbaLwzTb09tBV8kaW8mMGZQrfvTg4qnR27x9jpX61zaQIqo3PHrBvXva82oN_pQZsQrnK5OFPjrMOqs0LmxFptL098voAF0hUZ0mdXvBd1Vx0bj7q2LcOe2DGucKkgOnfrxb4_KK743y7tuUsa00FZoGlM5xcmUbsWWoFF0fd5f_9-ksEx1eKx7iNXisHqTyqXYTrGxu8uc18JSY63-naReH9JkUCCT2j8c1U0C_MA8XdTzfdzKD-HY-c9kVqt6VNVMLFfOFesqAm7gkJCeKCuyZEiVo3z4N57O2NRNarDTk8LiDlz0UpAKLjSn_j2Uwve2lEOzMX6Q962dihf1N4aFUvMZsQ5IR",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fLPIAEFKCSl1ndlO5MfFCAwc-bHUQI4dKREx5YRAOlwcwwwBwzUNsjBCd19lJXvzqZAKwgWITOTCMSpyM8waGbS8-XBMMQPbaLwzTb09tBV8kaW8mMGZQrfvTg4qnR27x9jpX61zaQIqo3PHrBvXva82oN_pQZsQrnK5OFPjrMOqs0LmxFptL098voAF0hUZ0mdXvBd1Vx0bj7q2LcOe2DGucKkgOnfrxb4_KK743y7tuUsa00FZoGlM5xcmUbsWWoFF0fd5f_9-ksEx1eKx7iNXisHqTyqXYTrGxu8uc18JSY63-naReH9JkUCCT2j8c1U0C_MA8XdTzfdzKD-HY-c9kVqt6VNVMLFfOFesqAm7gkJCeKCuyZEiVo3z4N57O2NRNarDTk8LiDlz0UpAKLjSn_j2Uwve2lEOzMX6Q962dihf1N4aFUvMZsQ5IR&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109058191144356693509\">Catalin Gaman</a>"
        ]
      },
      {
        "reference": "AciIO2cb1FE5xV7bZWEysicoAN4zkVeUYAMDmfTKcFXzVO8enL8WVCbF_0lI__S_IUwKA6nCD8w2-WJ20etQo0039NLTpEX5zi51OHlo5nVJCMCgSAIbpR7FcqBsSb5k6LTYhmc8qLaWyYHtuzLC1bg0lCdNtOHQBhE4LmCtc05Sl8RoHb6nYKKYqy8yaAWBm9MjrTmKfSjb-ZYT8e4dkL1FDWNTIQ5FAnnopmmvkl9S5yrG0UpeLuAxrcCmvmTyEc7lXFQiODB6WY0eK8lvNpxCEvxFfe6I1zuN7O_De8-lyLrR7g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cb1FE5xV7bZWEysicoAN4zkVeUYAMDmfTKcFXzVO8enL8WVCbF_0lI__S_IUwKA6nCD8w1200-WJ20etQo0039NLTpEX5zi51OHlo5nVJCMCgSAIbpR7FcqBsSb5k6LTYhmc8qLaWyYHtuzLC1bg0lCdNtOHQBhE4LmCtc05Sl8RoHb6nYKKYqy8yaAWBm9MjrTmKfSjb-ZYT8e4dkL1FDWNTIQ5FAnnopmmvkl9S5yrG0UpeLuAxrcCmvmTyEc7lXFQiODB6WY0eK8lvNpxCEvxFfe6I1zuN7O_De8-lyLrR7g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108402620368719383985\">Jang Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2eKfP5jl2PraN-YdxFHCaCPWVIjiHHruAk-CejgRm_cwh-VCwpGfEb3CtOojtXRL-tf7FqYo03KSCvuR8ZrCmT5P_kGHDVIqKNR42RUO0MIKHtbfgtTYWy1O-WEqIU-0MANJblAzuHQeLjPQaB4AawYQMtkQwZ50pOEtsee3urbDUpafSyu9Qj95IIagHg9GK__DdyRHwiupt2qnJ_abwL9Iz1b0SAlLI6yyeHtE3kVbS-zz4wrTmpXgtc1GiTPylOYV_V5ZW10hizA8tLG96fZtiX7ixR94voDjldsRAY4IQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eKfP5jl2PraN-YdxFHCaCPWVIjiHHruAk-CejgRm_cwh-VCwpGfEb3CtOojtXRL-tf7FqYo03KSCvuR8ZrCmT5P_kGHDVIqKNR42RUO0MIKHtbfgtTYWy1O-WEqIU-0MANJblAzuHQeLjPQaB4AawYQMtkQwZ50pOEtsee3urbDUpafSyu9Qj95IIagHg9GK__DdyRHwiupt2qnJ_abwL9Iz1b0SAlLI6yyeHtE3kVbS-zz4wrTmpXgtc1GiTPylOYV_V5ZW10hizA8tLG96fZtiX7ixR94voDjldsRAY4IQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108402620368719383985\">Jang Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dnKP3LINMyc0qPZmZqVRbwl49xgMz1LGx7VtJ10SYVqvs0AJq9jouOo0oDjasSsg1PGfuKXlOMDsFYP8Qs1z2WYiQfpAA52R-3ucyv6PgqJq0XG9Mwo1i0-EAkzNYSVEubuqw0Xi7d_6B6BxgtuRSaqSmB59HE_mO6wepzY2ktNETrLK4u8jecOm63Ya58vYZJuQs6GHpb7jl_tl3wMZJqMUkhVpM3GnAbyf4q47XNcuNK6_CG_qk-VY9DrDPoKMdDryedzRu7b4jLeikpMHBoajfqzjVGehhwiVzL7r3xgw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dnKP3LINMyc0qPZmZqVRbwl49xgMz1LGx7VtJ10SYVqvs0AJq9jouOo0oDjasSsg1PGfuKXlOMDsFYP8Qs1z2WYiQfpAA52R-3ucyv6PgqJq0XG9Mwo1i0-EAkzNYSVEubuqw1200Xi7d_6B6BxgtuRSaqSmB59HE_mO6wepzY2ktNETrLK4u8jecOm63Ya58vYZJuQs6GHpb7jl_tl3wMZJqMUkhVpM3GnAbyf4q47XNcuNK6_CG_qk-VY9DrDPoKMdDryedzRu7b4jLeikpMHBoajfqzjVGehhwiVzL7r3xgw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108402620368719383985\">Jang Restaurant</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Elodie Lawrence",
        "rating": 5,
        "text": "This was an amazing experience with top quality food.\nWe were served by Rebecca, Neda and Jose who where all very welcoming and helpful.\nThe restaurant is beautiful and nice and relaxing atmosphere. They even kindly changed the chair for me to fit my preference.\nWe had the sushi to start which was the best sushi I've ever had. I then had the lobster which was tender and flavorful in a delicious creamy broth with noodles and a side of kimchi which tasted really authentic. One of us had the duck which was cooked medium rare as requested and the broccoli which was seasoned really nicely. And lastly 2 of us had the sharing platter and added wagyu. All the meats where cooked to our preference and seasoned well and it came with lots of sides my favourite was the seaweed salad and loads of sauces to try with the meats as well as some rise.\nWe also had some lovely cocktails presented very nicely as well as a lovely birthday suprise.\nDefinitely worth a visit couldn't recommend enough hopefully we'll get to go back soon.",
        "time": 1758579660,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Abdulrahman Babgi",
        "rating": 5,
        "text": "A very wonderful place to take an afternoon tea. This place is preferred to book in advance due to a lot of people. I can describe this place as a romantic quiet place where you can have some of quiescence. The view from up is also another interesting point. The atmosphere with the red colors is giving the impression of an awesome view. Honestly I have enjoyed the experience and I strongly recommend everyone to try and to get some of quiescence. One more thing that staff are so friendly really big thanks to the whole entire involved people for making such great experiences.",
        "time": 1758720816,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Gionatan Didonna",
        "rating": 5,
        "text": "We had a truly wonderful afternoon tea experience, thanks to Jaqueline and Rebecca.\n\nJaqueline warmly welcomed us, personally escorted us to our table, and made sure we were seated by the balcony as requested. Rebecca was absolutely charming and explained the menu with ease. She also kindly accommodated my partner’s dietary preference by adjusting the selection and offering extra salmon sandwiches without mayonnaise.\n\nThe presentation was beautiful, and we especially appreciated Rebecca’s attention to detail—she even changed our plates just before we enjoyed the desserts.\n\nThank you both for making our visit so special. It was a delightful experience, and we would highly recommend it.",
        "time": 1758647282,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "EL O",
        "rating": 5,
        "text": "I had lunch at Jang today, and it was such a great experience. The food was delicious, well-prepared, and full of flavor. The atmosphere was welcoming, and the service made the meal even more enjoyable. I’ll definitely come back again!",
        "time": 1755541786,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Kelly Bocarro",
        "rating": 5,
        "text": "I absolutely loved my experience at Jang! Our server Neda was so friendly and her recommendations all hit the spot!\n\nThe Wagyu Korean BBQ was stunning and we loved that it was smoked at the table and had 3 condiments we could pair it with! The sushi was presented beautifully and the Korean fried chicken bites were gorgeous!\n\nBeautiful interior, perfect for an occasion!",
        "time": 1756638575,
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
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-16T20:23:51.319Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:51.319Z",
    "updatedAt": "2025-10-16T20:24:53.603Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Jang Restaurant — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_jang-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.446Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Jang Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Mezzanine, First Floor, Royal Exchange, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 203
      },
      "url": "https://thebestinlondon.co.uk/restaurant/jang-restaurant-A2kpdsBc",
      "openingHours": [
        "Monday: 12:00 PM – 12:00 AM",
        "Tuesday: 12:00 PM – 12:00 AM",
        "Wednesday: 12:00 PM – 12:00 AM",
        "Thursday: 12:00 PM – 12:00 AM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 5:00 PM – 12:00 AM",
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
    "image_card_path": "/images/restaurants/jang-restaurant-A2kpdsBc/korean-jang-restaurant-A2kpdsBc-card-ca179657.webp",
    "image_hero_path": "/images/restaurants/jang-restaurant-A2kpdsBc/korean-jang-restaurant-A2kpdsBc-hero-43e61a0c.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJr-ua5-wEdkgR45FdtHO4Ztg",
    "slug": "daebak-dtHO4Ztg",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJr-ua5-wEdkgR45FdtHO4Ztg",
    "name": "Daebak",
    "description": "Korean staples, such as fried chicken, rice dishes and noodles, served in a chill, wood-clad space.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 1205,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "316-318 Kennington Ln, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "316-318 Kennington Ln, London",
    "postcode": "SE11 5HY",
    "borough": "Central London",
    "lat": 51.4865956,
    "lng": -0.1190241,
    "phone": "020 7642 1522",
    "phone_international": "+44 20 7642 1522",
    "website": "https://www.thebestinlondon.co.uk",
    "url": "https://maps.google.com/?cid=15593353566903701987",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 12:00 – 9:30 PM"
      ],
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
            "time": "1700"
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
        "reference": "AciIO2dPF9mrPnDPQdff35dWCZk_4qR4ih7gANKG6EwuiIyJRVHzK35Nr-7ZQSbMkLlJI0gBJ9cFrPPrYhSpIyRMgoOq4Ee0edq7FqDpBQoj4hIdk_G4N8StEHuW5qtfiB1UzPen0N52OdYjibpiSEt9FWyOmP11uEVcllICP67o9DlNgqLkuTxxouB5fOpHfNVPlIsfKsVnNgz_8jkZfjKQaR8tJwZYmEG8OtDqMvkTiwKHdpbaFgF7TFvA2ObSjnDxsAfGmm1mrc5TBtWynTjQP05PwlexlSpa_KLpxOM6YzwPueZpPywHbTnrcvpcCp3g4sCmz2IXJvf5E1e4lV5x5JI3vbDntCzDr84E9uOSOtNrThDYn8Qoh3ME7wSPAAz3sXk8638bOxXGdGs8-E89s61nxdS-TS4m0syZsncllNRXdvkU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dPF9mrPnDPQdff35dWCZk_4qR4ih800gANKG6EwuiIyJRVHzK35Nr-7ZQSbMkLlJI0gBJ9cFrPPrYhSpIyRMgoOq4Ee0edq7FqDpBQoj4hIdk_G4N8StEHuW5qtfiB1UzPen0N52OdYjibpiSEt9FWyOmP11uEVcllICP67o9DlNgqLkuTxxouB5fOpHfNVPlIsfKsVnNgz_8jkZfjKQaR8tJwZYmEG8OtDqMvkTiwKHdpbaFgF7TFvA2ObSjnDxsAfGmm1mrc5TBtWynTjQP05PwlexlSpa_KLpxOM6YzwPueZpPywHbTnrcvpcCp3g4sCmz2IXJvf5E1e4lV5x5JI3vbDntCzDr84E9uOSOtNrThDYn8Qoh3ME7wSPAAz3sXk8638bOxXGdGs8-E89s61nxdS-TS4m0syZsncllNRXdvkU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/118383098816377051977\">Andrew G. T</a>"
        ]
      },
      {
        "reference": "AciIO2dsQCDDQVGo5zoxXL2H_F7THd97SdohwVNtbPVyvdhWbXdcz3h0-JGggn-p7o5_LV2Viezg07hygjBKqPyBfDDPpf0WY7zCs7M7TObDg01UshLUHJN9O9PunodbQxN1HokGRQAIR5FRIKEIsSHiPbYEHS-151FK0Rm8b--fhoGUOLEp6LMqF9ilHr1NwUczAcKGyhhRfhVJMTEBM1fgghxAEAMSO97SAyi8rPQ3gOZuEuGTe72kJjAPuRtSH6_nKbigzqz_9jmTbVtpF6vfxDXpIu6olVqod0RSXgKuSG8izg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dsQCDDQVGo5zoxXL2H_F7THd97SdohwVNtbPVyvdhWbXdcz3h800-JGggn-p7o5_LV2Viezg07hygjBKqPyBfDDPpf0WY7zCs7M7TObDg01UshLUHJN9O9PunodbQxN1HokGRQAIR5FRIKEIsSHiPbYEHS-151FK0Rm8b--fhoGUOLEp6LMqF9ilHr1NwUczAcKGyhhRfhVJMTEBM1fgghxAEAMSO97SAyi8rPQ3gOZuEuGTe72kJjAPuRtSH6_nKbigzqz_9jmTbVtpF6vfxDXpIu6olVqod0RSXgKuSG8izg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103553256414370959627\">Daebak</a>"
        ]
      },
      {
        "reference": "AciIO2dk5cKzonYT77zlbeih20ZftNcUsNNMN8-xbdk19CUdL00bj0un0aHeEOCIo-HZBCNgZuqbM0RqXXAQEv-4qnEDlRjZA-u76cb6Kz-pzWIJ1QFNkBph5WXRb-ZM0kAJq-UE_S22dsogJ-w51NSAQLzf09QIG8jKR722gl-YVd5DDLlymZHy4aVcvdaRHshaTj1RsamVCQ-5QWSs1wTw-gUKyvemX5HrrJ9fQ8Le8xzOzxKky1euA5-m1DvnwpPu52-LWExdX88GVUg1aKyJu-eNoPgM8Q78opRtcvb4IR4pMEkta9mrgsb7ZF0MnqUCuhXWJs-WkrXmAqBnQfMg81dvD09TXh0bDYWnME9e3AhOxuyLCFvI51WbhFm8lic4Et7KKraKc_eZytFYjHuRk0s-ZK9dxpzkdGH1NCqpR5_efY4kg6Ztizhk937gp19r",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dk5cKzonYT77zlbeih800ZftNcUsNNMN8-xbdk19CUdL00bj0un0aHeEOCIo-HZBCNgZuqbM0RqXXAQEv-4qnEDlRjZA-u76cb6Kz-pzWIJ1QFNkBph5WXRb-ZM0kAJq-UE_S22dsogJ-w1200NSAQLzf09QIG8jKR722gl-YVd5DDLlymZHy4aVcvdaRHshaTj1RsamVCQ-5QWSs1wTw-gUKyvemX5HrrJ9fQ8Le8xzOzxKky1euA5-m1DvnwpPu52-LWExdX88GVUg1aKyJu-eNoPgM8Q78opRtcvb4IR4pMEkta9mrgsb7ZF0MnqUCuhXWJs-WkrXmAqBnQfMg81dvD09TXh0bDYWnME9e3AhOxuyLCFvI51WbhFm8lic4Et7KKraKc_eZytFYjHuRk0s-ZK9dxpzkdGH1NCqpR5_efY4kg6Ztizhk937gp19r&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109334044398940057939\">Caleb</a>"
        ]
      },
      {
        "reference": "AciIO2eVQx01vjUtrkI1MjfyXMLG5i-wJwLRFmq4Gl5idgYQKJzzaiO-H085M_JGwzCp4vvMZ8E3snWR71gRhUB3aBuaH6n3y1I7rlZRFFjBfxRmrumVIF36QWG8ShOGuAY1DLeiS0VBxxnXfIiiroFpiMaHxG0avgHGAAd5NZRfJXOb2Qyyd-clObKLGgK3dcNLg1SI6BjJORP4hRR47vrk4I8mLDkbZKtZYImg6_dWayoi7XeoAHykZxFQzmkMl-LxizfgZLHG6HJ4IjWY-g5D-s5w0kEYokHHVHwGnQAh4GHR5OwHPr5fppjl47OQ8or_MSSBUwybG_urWhNiekms5TjSEHvAMKy9_SMzTMLn1hwNc9uajjmjkTZz8qxm5w1Sg1pOZb6DutOPcqg6CF2QU8GZW6i4Y46sqGMGJFRhA6-SpouP",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eVQx01vjUtrkI1MjfyXMLG5i-wJwLRFmq4Gl5idgYQKJzzaiO-H085M_JGwzCp4vvMZ8E3snWR71gRhUB3aBuaH6n3y1I7rlZRFFjBfxRmrumVIF36QWG8ShOGuAY1DLeiS0VBxxnXfIiiroFpiMaHxG0avgHGAAd5NZRfJXOb2Qyyd-clObKLGgK3dcNLg1SI6BjJORP4hRR47vrk4I8mLDkbZKtZYImg6_dWayoi7XeoAHykZxFQzmkMl-LxizfgZLHG6HJ4IjWY-g5D-s5w1200kEYokHHVHwGnQAh800GHR5OwHPr5fppjl47OQ8or_MSSBUwybG_urWhNiekms5TjSEHvAMKy9_SMzTMLn1hwNc9uajjmjkTZz8qxm5w1Sg1pOZb6DutOPcqg6CF2QU8GZW6i4Y46sqGMGJFRhA6-SpouP&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/118142382748768872767\">kanoknop</a>"
        ]
      },
      {
        "reference": "AciIO2f4h0M5LGIfPOKHI8kczLUviXfVyiBWVnvC1y1w5urrmH4ft0oqeq8g70cxuEmcAAa0HDd7omF6AACRYvM4ODcIX969m_lrbxgkDJxSo-uRxArEpRfiKOEgsOk_WrZmGZBicveumQPVAc7iAnbiP97ChFCm72PPhDPo4LPko1tfRott6i_kg07Qecii1pPbCo2pjMDrA37L2AblcW8S9OMFcoF_2GMRrN4S0368epBAhLSGLTqKE9KCbNJKDLzhw88EyD4URBLPc_ilhqO-23ZLi5UVw0vwuM00Rf2R37dOBklFN5NnAXfunlXztpWE5I0Wse3pO3v5tfeGxXA41oB924b8mQH_hmjaSuThoTGOnuD53A10OKhP1o0tpSVaM_PAGUk-xldkCJiLpf_06Ovt8dASNUuk--dSD1ka1ypWwg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f4h800M5LGIfPOKHI8kczLUviXfVyiBWVnvC1y1w1200urrmH4ft0oqeq8g70cxuEmcAAa0HDd7omF6AACRYvM4ODcIX969m_lrbxgkDJxSo-uRxArEpRfiKOEgsOk_WrZmGZBicveumQPVAc7iAnbiP97ChFCm72PPhDPo4LPko1tfRott6i_kg07Qecii1pPbCo2pjMDrA37L2AblcW8S9OMFcoF_2GMRrN4S0368epBAhLSGLTqKE9KCbNJKDLzhw88EyD4URBLPc_ilhqO-23ZLi5UVw0vwuM00Rf2R37dOBklFN5NnAXfunlXztpWE5I0Wse3pO3v5tfeGxXA41oB924b8mQH_hmjaSuThoTGOnuD53A10OKhP1o0tpSVaM_PAGUk-xldkCJiLpf_06Ovt8dASNUuk--dSD1ka1ypWwg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102410759370996347025\">Tianze Zhang</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Herman Mak",
        "rating": 5,
        "text": "Really good Korean fried chicken. They're deboned, so the portions are huge. Ordering the half-and-half on my own (especially on top of the seafood pancake) was a mistake. I bagged half of it for take out, ordering that much was definitely enough for 2.5 people. I went for the Yang Nyeum and sweet cheese powder. The former is better, but the latter isn't bad.\n\nCame at an 4pm on a Saturday so there was no queue. They also don't take reservations past 6pm. Really kind service.",
        "time": 1750056822,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Sabrina Lupsan",
        "rating": 4,
        "text": "Food is pretty good here! My partner liked it a lot, me not that much, hence why I took off 1 star, but I think it's a matter of taste. What I do want to point out is that the pieces of fried chicken are pretty good and satiating so even if you feel tempted to get the big portion, if you're also getting a side dish my advice would be to get the medium one for 2 people. At the end the food felt a bit too greasy for me but again I think it's just my opinion.",
        "time": 1752438384,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "R V",
        "rating": 3,
        "text": "Daebak – A Fun Spot for Soju and Korean Bites Near Vauxhall\nDaebak is a great little restaurant if you’re near Vauxhall and in the mood for Korean food and soju. The vibe is casual and lively—perfect for sharing dishes and drinks with friends.\n\nStarters\nWe tried the Spinach Namul and Beansprouts Namul. Both were flavourful and nicely seasoned, though a touch too salty for my taste.\n\nMains\nPa Dak (Spring Onion Fried Chicken)\nThe fried chicken was perfectly crispy without feeling too greasy, and the spring onion topping added a refreshing bite. Great texture and balance—especially with a shot of soju on the side!\n\nBibimbap with Soy Chicken & Egg\nThis came with a generous portion—definitely enough to share. The soy chicken was well-marinated, and the bibimbap arrived with a side of miso soup. Overall tasty, but again, a bit on the salty side.\n\nFinal Thoughts\nDaebak is a solid choice if you're looking to drink soju and enjoy some Korean comfort food to go with it. If you're visiting just for the food and not drinking, some dishes might come across a bit salty. But if you’re pairing it with drinks and good company—it hits the spot.",
        "time": 1754047273,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Julian Van Marle",
        "rating": 5,
        "text": "Excellent. Food is tasty & waitress was great, now I know where to feed my KFC addiction.",
        "time": 1759148644,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Joe",
        "rating": 5,
        "text": "Loving little place in Vauxhall… went there before night out and had the set menu for £22. Was so much food and great to try a few different things. Will definitely go back and do this again when I have plans in Vauxhall.",
        "time": 1742291276,
        "relative_time_description": "7 months ago"
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
    "fsa_authority": "Lambeth",
    "fsa_url": "https://ratings.food.gov.uk/business/1092103",
    "fsa_last_inspection": "2025-02-13T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:51.787Z",
    "lastVerifiedFSA": "2025-10-16T23:19:03.135Z",
    "createdAt": "2025-10-16T20:23:51.787Z",
    "updatedAt": "2025-10-16T20:24:55.099Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Daebak — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_daebak_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.447Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Daebak",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "316-318 Kennington Ln, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 1205
      },
      "url": "https://thebestinlondon.co.uk/restaurant/daebak-dtHO4Ztg",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
        "Friday: 12:00 – 3:00 PM, 5:00 – 10:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/daebak-dtHO4Ztg/korean-daebak-dtHO4Ztg-card-53d079c3.webp",
    "image_hero_path": "/images/restaurants/daebak-dtHO4Ztg/korean-daebak-dtHO4Ztg-hero-66866a81.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJo5eYZ9QEdkgR7vezi1Jg4Ec",
    "slug": "arang-restaurant-zi1Jg4Ec",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJo5eYZ9QEdkgR7vezi1Jg4Ec",
    "name": "Arang Restaurant",
    "description": "Smart modern Korean restaurant with large menu of classic kimchi cabbage and banchan side dishes.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 2354,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "9 Golden Square, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "9 Golden Square, London",
    "postcode": "W1F 9HZ",
    "borough": "Central London",
    "lat": 51.5117112,
    "lng": -0.1365999,
    "phone": "020 7434 2073",
    "phone_international": "+44 20 7434 2073",
    "website": "https://instagram.com/aranglondon?igshid=YmMyMTA2M2Y=",
    "url": "https://maps.google.com/?cid=5179245479123482606",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
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
        "reference": "AciIO2fvSu2GKKBedYh0jjRp1WP0Hmz1ufZ2t8DbUzBYVMawjTihxSJqBARskvaKHxbi7kWs5OmfzLINGtrT8eJD89CHoNPcQhnbHUOUfB33tyK2FcpjgxoKQmtCQdy3EiyFaAZBO3rhE3RHHwXxc8OSqrEN_TTXGwyJNU3PsYbe0RYu2of8d7IcH7eEqLmQc2BfzuCzJfc1LyM-bYvwhFKAX_h4rPn1l91He2AB8E1maUh-qObiB1NokVyer860UJMHgyfPsQAOAhBz49kUPWosgUC8_5u5iEHPdgdtDFqsTo_ruw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fvSu2GKKBedYh800jjRp1WP0Hmz1ufZ2t8DbUzBYVMawjTihxSJqBARskvaKHxbi7kWs5OmfzLINGtrT8eJD89CHoNPcQhnbHUOUfB33tyK2FcpjgxoKQmtCQdy3EiyFaAZBO3rhE3RHHwXxc8OSqrEN_TTXGwyJNU3PsYbe0RYu2of8d7IcH7eEqLmQc2BfzuCzJfc1LyM-bYvwhFKAX_h4rPn1l91He2AB8E1maUh-qObiB1NokVyer860UJMHgyfPsQAOAhBz49kUPWosgUC8_5u5iEHPdgdtDFqsTo_ruw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111706413349818056162\">Arang Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2f2s8vGlH3ZWboGH-bmgFg1nfYPxzYtEaIZbY2jCChZWCx8JoNsfrI1sB--ySY1B7kQ4mkDjOg7Bd-iLhzYFChoZAiL_YrwdYr3sRS02lsaRZLVKs0PqK8zfvGasnZeT8mZpYPonU6uK5vjOJWJe4YkYBxqVEGVO01jO7fFwxHJSUMb4jn-Vz42nZrpv6qgGyuJD26r9pgq9zqIwGIoRGa74hYMb0MycqUCItgQF3LBgYhIZX-d7Wd-JSM6dwfqSeWJoL4gl0ViGSp1v8eCU9XBRmhATRaPn0N6zqy7DthA0w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f2s8vGlH3ZWboGH-bmgFg1nfYPxzYtEaIZbY2jCChZWCx8JoNsfrI1sB--ySY1B7kQ4mkDjOg7Bd-iLhzYFChoZAiL_YrwdYr3sRS02lsaRZLVKs0PqK8zfvGasnZeT8mZpYPonU6uK5vjOJWJe4YkYBxqVEGVO01jO7fFwxHJSUMb4jn-Vz42nZrpv6qgGyuJD26r9pgq9zqIwGIoRGa74hYMb0MycqUCItgQF3LBgYhIZX-d7Wd-JSM6dwfqSeWJoL4gl0ViGSp1v8eCU9XBRmhATRaPn0N6zqy7DthA0w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111706413349818056162\">Arang Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2f-ol1mChrVTfXOFSGv1R8dZiU3WnQVt30UDT7VbR3SSRG3u3zqsnoAtwqZCq9M2Fkv1fGwfwE4VZtrMgF5FGuNoZj0AeOTwVokEUD5wPtC6go0sC92Rl7856xAcI1yC03HgCMQod2WMC3Osiw4RRGsZ_uqQwfOnlqwzKvDJYyjG_y3nlyL3ZJ_yox5zZA2IctqbzoiNoeO2hFDR7y7okPUOBKaqXdbVhxSq4Ufqk48mkx5zR6bUnwneZu_OQUQnDhcFQQtHtSMAZaGkUpHJ70SWg1mUufmc6cw2UWXrhQ1SxeFmfo10OC_W1rsh8nyT3r3NmaYQxfanXYIzdEE93YCNIBsIA8zu-Dqzt17ORGaw-f7bZF8_E0iXiNPBctnMwDJlAJEfPjENTNBbFwJIYHSv5OwAjjypRR-XqfTOV77K0cY5-Sb0dMCLMGbEX4p",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f-ol1mChrVTfXOFSGv1R8dZiU3WnQVt30UDT7VbR3SSRG3u3zqsnoAtwqZCq9M2Fkv1fGwfwE4VZtrMgF5FGuNoZj0AeOTwVokEUD5wPtC6go0sC92Rl7856xAcI1yC03HgCMQod2WMC3Osiw1200RRGsZ_uqQwfOnlqwzKvDJYyjG_y3nlyL3ZJ_yox5zZA2IctqbzoiNoeO2hFDR7y7okPUOBKaqXdbVhxSq4Ufqk48mkx5zR6bUnwneZu_OQUQnDhcFQQtHtSMAZaGkUpHJ70SWg1mUufmc6cw2UWXrhQ1SxeFmfo10OC_W1rsh800nyT3r3NmaYQxfanXYIzdEE93YCNIBsIA8zu-Dqzt17ORGaw-f7bZF8_E0iXiNPBctnMwDJlAJEfPjENTNBbFwJIYHSv5OwAjjypRR-XqfTOV77K0cY5-Sb0dMCLMGbEX4p&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109005427056700291093\">Gastronomic Nomad</a>"
        ]
      },
      {
        "reference": "AciIO2dSNurFtG6sObJNbPLxo41e4FxDjJG3YILUFTthi6xk4RlbuEfzWYtnR72um75p_2abgzGPIv0tqXGzPPqZypcgmzekvscAeh9hbLE-alSxuNhgEurNa4PXXtBeLFDTMDn36B_uo1rkjW3UhYGcroiDa8rt_AyI3ytaAU1SSak9W05hDsbYKGizR7dyb0fDXbOv7hYrrJRBSW-A-pKrvqWD79qMZPGkSDi15f3CTHSYj4BZp89760OxdSygtRFNBC2CL6RyJ-KdSZsmKBBIhfk0AxxrzD20kjX550pidV8oYu_ilS72Gn6NLoXvHhgLisECoH67wjBW5SCm0vvQsnRWtWv3bKMmtK_bnejk9Uy15zlDAji-SyzlRrAucv-MNXfms50wYhbIwhO7yi_UpN5u50OlaigIse0c8VNBdBkvxNRI",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dSNurFtG6sObJNbPLxo41e4FxDjJG3YILUFTthi6xk4RlbuEfzWYtnR72um75p_2abgzGPIv0tqXGzPPqZypcgmzekvscAeh800hbLE-alSxuNhgEurNa4PXXtBeLFDTMDn36B_uo1rkjW3UhYGcroiDa8rt_AyI3ytaAU1SSak9W05hDsbYKGizR7dyb0fDXbOv7hYrrJRBSW-A-pKrvqWD79qMZPGkSDi15f3CTHSYj4BZp89760OxdSygtRFNBC2CL6RyJ-KdSZsmKBBIhfk0AxxrzD20kjX550pidV8oYu_ilS72Gn6NLoXvHhgLisECoH67wjBW5SCm0vvQsnRWtWv3bKMmtK_bnejk9Uy15zlDAji-SyzlRrAucv-MNXfms50wYhbIwhO7yi_UpN5u50OlaigIse0c8VNBdBkvxNRI&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114092868954710613429\">Baron Gracias</a>"
        ]
      },
      {
        "reference": "AciIO2cZYSXJBgFcA_hw80zRdhfNDMRXFIAV7D40lKfAdoRVpLMwgiukvvpD6uGB5zyU91waTKsu187ENnQxmJHDpl0t8PyHwKXq7s5BNz9NkwTbyRb9Xm1tNvhhlxBNHw5J8w2OHdPEVqN2EvaGc8LUZrMOq51UPzjyeyAX2RUb3emwUqSQBB2NRfDY3iBWYt0welSXIniyIaVlbHLCysfL2GF4y0Tr7qATXnIrA3lCwTAADAo9o8UB3stA639rN1xRNGCMuXZpAe4Pm8lO78ZvgbT41BEoPnbbIwZuonHlCObEo9YfX7HNtAxPFYzhP_AQ8WyeAV3w0AL51pArER78UDJlHWvhyMDLT1YRLEmsDI6erV92UgvkA79evn-PlQRpZJOPaR9sJOwI19Ri4hhZsUGN4a4afOYEKaIZ-GD4QypWjgNV3EXe40K1Ejkjt9lJ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cZYSXJBgFcA_hw1200zRdhfNDMRXFIAV7D40lKfAdoRVpLMwgiukvvpD6uGB5zyU91waTKsu187ENnQxmJHDpl0t8PyHwKXq7s5BNz9NkwTbyRb9Xm1tNvhhlxBNHw5J8w2OHdPEVqN2EvaGc8LUZrMOq51UPzjyeyAX2RUb3emwUqSQBB2NRfDY3iBWYt0welSXIniyIaVlbHLCysfL2GF4y0Tr7qATXnIrA3lCwTAADAo9o8UB3stA639rN1xRNGCMuXZpAe4Pm8lO78ZvgbT41BEoPnbbIwZuonHlCObEo9YfX7HNtAxPFYzhP_AQ8WyeAV3w0AL51pArER78UDJlHWvhyMDLT1YRLEmsDI6erV92UgvkA79evn-PlQRpZJOPaR9sJOwI19Ri4hhZsUGN4a4afOYEKaIZ-GD4QypWjgNV3EXe40K1Ejkjt9lJ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109005427056700291093\">Gastronomic Nomad</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Azimah Khatun",
        "rating": 5,
        "text": "We recently visited this restaurant and had such an incredible experience from start to finish! The atmosphere was warm, lively, and welcoming, perfect for enjoying a hearty Korean meal. We also had an amazing server SJ, who served the three of us and was attentive the whole time.\n\nRecommendation Dishes:\nJajangmyeon with beef, Kimchi pancakes, tteokbokki with cheese, beef bimbibap.\n\nFor any Muslims coming here, there's plenty of halal dishes and you can substitute the pork with alternatives like beef, seafood or chicken.\n\nThe food was absolutely delicious. The tteokbokki had just the right amount of spice and sweetness, with chewy rice cakes that were cooked perfectly. The kimchi pancake was crispy on the outside and soft on the inside, packed with flavour and easily one of the best we’ve tried. The jajangmyeon with beef was rich and savoury, with a delicious flavour that paired so well with the noodles. The sides from the kitchen were also fantastic, everything from the kimchi to the pickled radish and other small dishes tasted fresh, well-seasoned, and perfectly complemented the mains. You can really tell that care and attention go into every dish.\n\nWe also tried the miso soup, which had a gentle umami flavour and a great palate cleanser between dishes. Personally, I found it a little mild for my taste, but my friends really enjoyed it, describing it as wonderfully soothing and comforting. It's like the kind of warm soup you’d crave when you’re feeling under the weather.\n\nWe ordered a few other dishes too, including the japchae, bibimbap, and mandu. The japchae had a good texture, the glass noodles were slightly bouncy but it wasn’t as flavourful as the other dishes we tried, so it felt a little dry and underwhelming in comparison. The bibimbap was enjoyable and nicely presented, though since we ordered quite a variety, it was naturally a bit overshadowed by the stronger flavours of the tteokbokki and jajangmyeon. The mandu was good, though it wasn’t particularly standout compared to the other dishes on the table.\n\nBut what truly made the evening special was the outstanding service from SJ. He was friendly, professional, and incredibly attentive throughout our meal. He checked in at just the right moments, made thoughtful recommendations, and went out of his way to make sure we were comfortable and happy. His positive energy and genuine hospitality really stood out and made our dining experience unforgettable.\n\nWe’ll definitely be coming back, not only for the amazing food but also because SJ made us feel so welcome. Highly recommend this place to anyone looking for great Korean food and top-tier service!",
        "time": 1759659647,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Sophie Ankoku",
        "rating": 5,
        "text": "This restaurant was such a discovery! We ate so well today. The portions are big, the food is super tasty and the girl working was very nice. They play Kpop and the prices are totally ok for the center of London (actually cheaper than many other restaurants we saw).",
        "time": 1757368959,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Soojeong Seol",
        "rating": 5,
        "text": "Food was so good! I had Bulgogi set menu with my friend and could try so many different things. After the meal, they even served fruit! I definitely want to go again :)",
        "time": 1753565006,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "María Fernández",
        "rating": 4,
        "text": "Arang has a proper authentic Korean feel, and it’s super easy to get to, just a few minutes’ walk from Piccadilly. The menu’s got loads of choice and the service was really attentive. We went for the BBQ, which came with all the sides (even though that’s not totally clear on the menu), plus a few other dishes. Everything was really tasty.",
        "time": 1750000793,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "LIFE CREATIVE",
        "rating": 5,
        "text": "We had a lovely meal here and were especially impressed by the warm service. The food was cleanly presented and well-prepared across the board.\n\nWe ordered samgyeopsal (grilled pork belly), and while the meat was fresh and nicely grilled, do note that you need to order lettuce (sangchu) and green onion salad (pa-jeori) separately if you want the full Korean BBQ experience.\n\nThe seolleongtang (ox bone soup) came with plenty of noodles and egg, offering a comforting, mild flavor. The haemul-pajeon (seafood pancake) was crisp and flavorful, packed with seafood. The dolsot-bibimbap (stone pot bibimbap) was deliciously well-balanced, with a perfect mix of textures and flavors.\n\nOne particularly touching gesture was when the staff kindly offered roasted seaweed and fruit for the children — a warm and thoughtful touch that made us feel truly welcome.\n\nHighly recommended for anyone craving authentic Korean food with exceptional hospitality.",
        "time": 1748776679,
        "relative_time_description": "4 months ago"
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
    "fsa_url": "https://ratings.food.gov.uk/business/413703",
    "fsa_last_inspection": "2024-03-20T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:54.591Z",
    "lastVerifiedFSA": "2025-10-16T23:18:50.091Z",
    "createdAt": "2025-10-15T10:53:54.591Z",
    "updatedAt": "2025-10-16T20:24:52.717Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Arang Restaurant — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_arang-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.445Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Arang Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "9 Golden Square, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 2354
      },
      "url": "https://thebestinlondon.co.uk/restaurant/arang-restaurant-zi1Jg4Ec",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
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
    "image_card_path": "/images/restaurants/arang-restaurant-zi1Jg4Ec/korean-arang-restaurant-zi1Jg4Ec-card-eb893578.webp",
    "image_hero_path": "/images/restaurants/arang-restaurant-zi1Jg4Ec/korean-arang-restaurant-zi1Jg4Ec-hero-2e06aeb6.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJtRKMndwFdkgRkv4ymMXVjzE",
    "slug": "korean-dinner-party-ymMXVjzE",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJtRKMndwFdkgRkv4ymMXVjzE",
    "name": "Korean Dinner Party",
    "description": "Korean fusion, unique cocktails, art & curated tunes in a hopping locale with a popular brunch.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 1723,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "Top Floor, Kingly Ct, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Top Floor, Kingly Ct, London",
    "postcode": "W1B 5PW",
    "borough": "Central London",
    "lat": 51.5127613,
    "lng": -0.1389821,
    "phone": "020 4572 4139",
    "phone_international": "+44 20 4572 4139",
    "website": "https://www.koreandinnerparty.com/",
    "url": "https://maps.google.com/?cid=3571308074166845074",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 8:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2000"
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
        "reference": "AciIO2ffo3APuAKTjrO4msRvOHU0iPzVPoj6KBQFq6LksfKc-2_QqllBrAfRUQhT9SYFP_n6qMlGVQ5cJY1TTxWMO1z9yjGkrUcnZwDtEJPQoCPfcaoaTmvYTauaTmL3TOxHMhX0PtD0eh-yZQ20-l6sM7hEth4cfRxrLtiBaSA-q1rwJn4jfjOCvomCVc90gA70lywYdXJU5dPNuGNYCk4KY0l5OBwKDkapRs6fRV0oTYIqnyH78UsXrfHbk9Hupchuy9TCg6LhSJ89IeJuRxhWI5qlsiHbF1kAA54Jmgeg66J2UA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ffo3APuAKTjrO4msRvOHU0iPzVPoj6KBQFq6LksfKc-2_QqllBrAfRUQhT9SYFP_n6qMlGVQ5cJY1TTxWMO1z9yjGkrUcnZwDtEJPQoCPfcaoaTmvYTauaTmL3TOxHMhX0PtD0eh-yZQ20-l6sM7hEth800cfRxrLtiBaSA-q1rwJn4jfjOCvomCVc90gA70lywYdXJU5dPNuGNYCk4KY0l5OBwKDkapRs6fRV0oTYIqnyH78UsXrfHbk9Hupchuy9TCg6LhSJ89IeJuRxhWI5qlsiHbF1kAA54Jmgeg66J2UA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101979062752365747734\">Korean Dinner Party</a>"
        ]
      },
      {
        "reference": "AciIO2dsx-F14BHEVPFea5unFjPhEWTDZK2MZtj7lSKcMWVIpC2cUKfSNe9UyAb8fXG8bLbkJSkvoF5OJ2xVYcRkUIdwi5BFs1tWrOBV8BhvTzcn15vmpzfrJ0bUmL1OcU1xWA-_aIHVVew6cbA1-MRTxgOTUtZQxn0CdPEL4uRRS43NgQgRFb9m7Qs5DT53Xu0y2NvKA9iWMepYaufDIknCPejf9Ih2vn-0ilkmVf2FL-_s0NriLxbmNybjf9iVGJiW2B6QD83KUt9CqKIfSWmTs-7SO8jOGfLGqARnoSpvKcB79g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dsx-F14BHEVPFea5unFjPhEWTDZK2MZtj7lSKcMWVIpC2cUKfSNe9UyAb8fXG8bLbkJSkvoF5OJ2xVYcRkUIdwi5BFs1tWrOBV8BhvTzcn15vmpzfrJ0bUmL1OcU1xWA-_aIHVVew1200cbA1-MRTxgOTUtZQxn0CdPEL4uRRS43NgQgRFb9m7Qs5DT53Xu0y2NvKA9iWMepYaufDIknCPejf9Ih800vn-0ilkmVf2FL-_s0NriLxbmNybjf9iVGJiW2B6QD83KUt9CqKIfSWmTs-7SO8jOGfLGqARnoSpvKcB79g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101979062752365747734\">Korean Dinner Party</a>"
        ]
      },
      {
        "reference": "AciIO2fIPiNUkTKzM70dTSvEvr5JV04jDJEw5kNZxiwh8MWi35lRQQl81Tf1fBdmbNh5Y1dmpjUOjryzCHG3FkDAGTdZQaIGoLKMGZdqP8G--ctcmkouP56w36bZ1EuX9xyFNesQIy5qF7RMxTvScfvMqRqfZ4GDuSfx2_6kZCGJB1EhGjRmHrieaNgaRuvO77GlO1TvYYDghfJu9dqxj5dsCJpAkEX1bx6vTumm_3dA2ixDEJxNPxnYvZ4yQOmEMlggOS_GfIoziKa0OcBesqyyvd4j3xh2Y3r1tM_17VXdbS0CpK5XuOLHhCOmx5Ga2UQYUfA2VkmFZP9kzlays28_73OXMoho80hx0s98j-Mhr9eXUvqi7fQYiBEoWzvwVOo8q_gbzCe-xTFQC963hi8hGIwsuiQbn7yCEyjeCgn1DKVM3R-Lc6ezX2EJOdc-s5Zz",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fIPiNUkTKzM70dTSvEvr5JV04jDJEw1200kNZxiwh800MWi35lRQQl81Tf1fBdmbNh5Y1dmpjUOjryzCHG3FkDAGTdZQaIGoLKMGZdqP8G--ctcmkouP56w36bZ1EuX9xyFNesQIy5qF7RMxTvScfvMqRqfZ4GDuSfx2_6kZCGJB1EhGjRmHrieaNgaRuvO77GlO1TvYYDghfJu9dqxj5dsCJpAkEX1bx6vTumm_3dA2ixDEJxNPxnYvZ4yQOmEMlggOS_GfIoziKa0OcBesqyyvd4j3xh2Y3r1tM_17VXdbS0CpK5XuOLHhCOmx5Ga2UQYUfA2VkmFZP9kzlays28_73OXMoho80hx0s98j-Mhr9eXUvqi7fQYiBEoWzvwVOo8q_gbzCe-xTFQC963hi8hGIwsuiQbn7yCEyjeCgn1DKVM3R-Lc6ezX2EJOdc-s5Zz&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111781697978060800424\">Ask S</a>"
        ]
      },
      {
        "reference": "AciIO2d6xd9eaWe6EA0J5hxi-a-ElGoa8RtOrar0dMOEkVF3BmolIvAddLXJE5DGSmlntbi9ISKRAS_H2R0fFzajNYHC_j2d_OXg-l2FjJas7nk4CfJ9b8nXd1tPJoqmcpzR41NsV-pAJogMcphW_p-At0DEHwFGgIfD7kgbOVCqqpmdThf2UcPRTZIbZ95c-AEGNmIAUBup5ghJIsTlweGPDeWgYhsfebHRfCJTMyj89Zt6sT2js9p-28Fbp4X3T6kAs0mjHmAqV_ZfmY-fx6BGeYCXJBQdfxEasrMHRDTPMoerWw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d6xd9eaWe6EA0J5hxi-a-ElGoa8RtOrar0dMOEkVF3BmolIvAddLXJE5DGSmlntbi9ISKRAS_H2R0fFzajNYHC_j2d_OXg-l2FjJas7nk4CfJ9b8nXd1tPJoqmcpzR41NsV-pAJogMcphW_p-At0DEHwFGgIfD7kgbOVCqqpmdThf2UcPRTZIbZ95c-AEGNmIAUBup5ghJIsTlweGPDeWgYhsfebHRfCJTMyj89Zt6sT2js9p-28Fbp4X3T6kAs0mjHmAqV_ZfmY-fx6BGeYCXJBQdfxEasrMHRDTPMoerWw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101979062752365747734\">Korean Dinner Party</a>"
        ]
      },
      {
        "reference": "AciIO2f5OAQwJgeKGW0YZ0OZuyHZbEd870eFAl5fg-yM5c3YEszJWE4kIvIYhGCN61Uci37Plrx9UMZaEB-zy1qYOje0Xwv1A7QAQeqvXcMyi7_oFrFYrZQRrh_aVTI7aRkrY2D9bjx-_lFSzCfDskyhyxaeJU5L8LJQQDforn-NWMvYcZpkSvYlzFgH3ReDdTDop7teHzh7UBkCIr81O_DAKkeKYfp5NuufXdwRk41mYR_iAx978kyBQ5OC0Cu9OVE7d8mTYasJeQ0yc1_AhnrKUgoYKJjbdK2KqqyFWDecJFuuDq-dF0s6KqZPhIMlPG_ajgj-HlmKFF2FaThtPhVbIkaZOGaGoZMHDOAOMZyK1ijyPGIbEe6I0D8lNQ4SVCj7a3LwdOT20-7PrzieAJjxeXYokxFDv9dsnb3T0KOLv9WOUAHkpw88L_N1157txg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f5OAQwJgeKGW0YZ0OZuyHZbEd870eFAl5fg-yM5c3YEszJWE4kIvIYhGCN61Uci37Plrx9UMZaEB-zy1qYOje0Xwv1A7QAQeqvXcMyi7_oFrFYrZQRrh_aVTI7aRkrY2D9bjx-_lFSzCfDskyhyxaeJU5L8LJQQDforn-NWMvYcZpkSvYlzFgH3ReDdTDop7teHzh800UBkCIr81O_DAKkeKYfp5NuufXdwRk41mYR_iAx978kyBQ5OC0Cu9OVE7d8mTYasJeQ0yc1_AhnrKUgoYKJjbdK2KqqyFWDecJFuuDq-dF0s6KqZPhIMlPG_ajgj-HlmKFF2FaThtPhVbIkaZOGaGoZMHDOAOMZyK1ijyPGIbEe6I0D8lNQ4SVCj7a3LwdOT20-7PrzieAJjxeXYokxFDv9dsnb3T0KOLv9WOUAHkpw1200L_N1157txg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111781697978060800424\">Ask S</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Emma Tarragon",
        "rating": 5,
        "text": "Gorgeous dining experience! 🫶🏽 I came here with 7 friends to celebrate a birthday and we had the loveliest time. The food was excellent and the atmosphere and service were lovely. We were very lucky to be served by Marina, who went above and beyond to take care of our table, and even took some Polaroids of us to take home as a birthday present. So wholesome 🥰 would definitely recommend to a friend!",
        "time": 1755651201,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Jerry",
        "rating": 3,
        "text": "Note that this review is specifically for the Taco Tuesday bottomless tacos. I thought the quality of the meats was perfectly fine - the beef was tender and fatty, and the chicken was not dry and had a satisfying crunch. However for a Korean fusion restaurant, these tacos severely lacked any Korean influence. The only element that tasted remotely Korean was the small pot of ssamjang sauce served alongside the tacos. They could’ve done much more with the flavouring to really emphasise that this was Korean fusion cuisine.\n\nI did like the slaw though - it was crunchy, slightly bitter, and complemented the tacos well. On the other hand, we were perplexed by the aubergine and mushroom filling. The menu listed fried cauliflower, which would’ve made a bit more sense, since a crunchy fried filling would’ve been a nice contrast to the soft flour taco. This filling however, felt completely out of place and didn’t belong in a taco. It was too soft and saucy, the flavours leaned more Mediterranean than Korean, and it didn’t hold up well in a soft flour tortilla - it would’ve been better served over rice. If not fried cauliflower, fried enoki mushrooms would’ve worked well too?\n\nService was good, but nothing exceptional. It wasn’t really an issue to ask for more rounds after finishing the tray.\n\nI think with some adjustments, this deal could be worth going for.",
        "time": 1759928443,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Kinal Patel",
        "rating": 4,
        "text": "Had a lovely lunch - the stone pot veggie and bibimbap special were good! The peppers with cheese as well but the other options felt a bit more exciting and flavorful",
        "time": 1759610407,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "alex meldrum",
        "rating": 5,
        "text": "Stopped by for dinner before going to the theatre, it's on the third floor of kingly court but there are lifts, we got there at 5pm on a Saturday and got sat straight away but it did get a little busy from 6pm onwards. There was a great choice on the menu, everything was so tasty. The fried chicken was so crispy and delicious. I also really loved the cheesey peppers, it wasn't too spicy and still had loads of flavour, and the wedge salad was (surprisingly) my favourite dish!! Id recommend getting 4-5 dishes between 2, we also got 2 corn dogs and I think that was too much. Reasonable prices for the portion and quality. The staff were also really friendly and helpful, they made a mistake with one of our dishes but we're very quick to rectify it, id definitely recommend a visit here!",
        "time": 1751793996,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Andee Dug",
        "rating": 3,
        "text": "Overall, we found the food to be just ok, nothing special. Our experience was tainted by the unexpected service charge.\n\nWe did the tasting menu that had a lot of food but most of it tasted mediocre. The best thing was the kimchi stone pot stew and the slaw that comes with the tacos. Everything else - fried chicken, bacon mochi, cheese stuffed peppers, al pastor chicken, ice cream - all tasted pretty mediocre. The amount of mayo on fried chicken overwhelms anything else; the al pastor chicken tastes only of sweetness and it was served cold, not hot; the ice cream was super boring. Flavors were not on point, every dish felt like it was missing something. I wanted to like this restaurant in the name of Korean fusion food but unfortunately it missed the mark completely.\n\nWe paid at the end and after paying realized they had added a 12.5% service charge for our table of 2 persons. This was not mentioned when seated or ordering. So, on top of the mediocre food, this unexpected charge soured our experience. I doubt we’ll return.",
        "time": 1747512377,
        "relative_time_description": "5 months ago"
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
    "fsa_url": "https://ratings.food.gov.uk/business/1518687",
    "fsa_last_inspection": "2025-02-11T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:51.555Z",
    "lastVerifiedFSA": "2025-10-16T23:18:56.581Z",
    "createdAt": "2025-10-16T20:23:51.555Z",
    "updatedAt": "2025-10-16T20:24:53.899Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Korean Dinner Party — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_korean-dinner-party_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.446Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Korean Dinner Party",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Top Floor, Kingly Ct, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 1723
      },
      "url": "https://thebestinlondon.co.uk/restaurant/korean-dinner-party-ymMXVjzE",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 5:30 – 10:30 PM",
        "Wednesday: 12:00 – 10:30 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 – 11:00 PM",
        "Saturday: 12:00 – 11:00 PM",
        "Sunday: 12:00 – 8:00 PM"
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
    "image_card_path": "/images/restaurants/korean-dinner-party-ymMXVjzE/korean-korean-dinner-party-ymMXVjzE-card-6fc8e378.webp",
    "image_hero_path": "/images/restaurants/korean-dinner-party-ymMXVjzE/korean-korean-dinner-party-ymMXVjzE-hero-0caeed60.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJneH7htEEdkgR-hGHpzadwok",
    "slug": "yori-piccadilly-circus-korean-bbq-Hpzadwok",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJneH7htEEdkgR-hGHpzadwok",
    "name": "YORI Piccadilly Circus Korean BBQ",
    "description": "Compact restaurant serving traditional Korean cuisine & BBQ specialties in relaxed surrounds.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 5304,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "6 Panton St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "6 Panton St, London",
    "postcode": "SW1Y 4DL",
    "borough": "Central London",
    "lat": 51.5093628,
    "lng": -0.1318487,
    "phone": "020 7930 8881",
    "phone_international": "+44 20 7930 8881",
    "website": "https://yoriuk.com/?utm_source=googlemybusiness&utm_medium=piccadilly",
    "url": "https://maps.google.com/?cid=9926669386742436346",
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
        "reference": "AciIO2c0fVWWU7DSoE59en9iHjsd_BurxX4FvxtKvKParu_dCVLZQmHjb0bPr_XYsJr5lEODbLWP-VvPkqC0hPXpEzNWEEYQvQUuBiQCRu8ZSdOzNLAJIe5iqBJyFYnjk3EhQpUxcUlPgV-tli361AsnhQHvluh6lrZvJvtZ_yoks699lcMSwQOYWwUUY6v-56_irih7pDf-mahsvTVVwtRmilC0jXdkhsj7vPjyry-mGVLDZIi7omYav7lzxPv_2I0ZE5Zdj6sRCtK5GfhZ2ywxJm_sPKGtIz_qKPQNmcUI9WMkig",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c0fVWWU7DSoE59en9iHjsd_BurxX4FvxtKvKParu_dCVLZQmHjb0bPr_XYsJr5lEODbLWP-VvPkqC0hPXpEzNWEEYQvQUuBiQCRu8ZSdOzNLAJIe5iqBJyFYnjk3EhQpUxcUlPgV-tli361AsnhQHvluh800lrZvJvtZ_yoks699lcMSwQOYWwUUY6v-56_irih7pDf-mahsvTVVwtRmilC0jXdkhsj7vPjyry-mGVLDZIi7omYav7lzxPv_2I0ZE5Zdj6sRCtK5GfhZ2ywxJm_sPKGtIz_qKPQNmcUI9WMkig&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105201744181844417978\">YORI Piccadilly Circus Korean BBQ</a>"
        ]
      },
      {
        "reference": "AciIO2etiGGCg0Cjv-6BO0L6LlGZVDh2zdIygO-tU62jPZvk_oazOdXNFDP6-dkOf5cvdXhUzfbiIONrZl9GRy1FyLtMUSphegRDqPWMb0D02wPAzJizA1iXdKOXJ4XrrNoRCfs4rbdvSDBYXTeypLhMVlAZJ5FQzUSW9d1HnlzdqHsSods1EI9o7CSh_E5855QBWAbsXnE8k0dwhxRuV96yhMRA5FWAYTdMvQAtDm9D0VkSx53IgYfFMa1dFCCpOqIQmUkCnw9WydR7kUnAk5unRPvaqAjiRAR0BW2wD1sVysYGpw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2etiGGCg0Cjv-6BO0L6LlGZVDh800zdIygO-tU62jPZvk_oazOdXNFDP6-dkOf5cvdXhUzfbiIONrZl9GRy1FyLtMUSphegRDqPWMb0D02wPAzJizA1iXdKOXJ4XrrNoRCfs4rbdvSDBYXTeypLhMVlAZJ5FQzUSW9d1HnlzdqHsSods1EI9o7CSh_E5855QBWAbsXnE8k0dwhxRuV96yhMRA5FWAYTdMvQAtDm9D0VkSx53IgYfFMa1dFCCpOqIQmUkCnw1200WydR7kUnAk5unRPvaqAjiRAR0BW2wD1sVysYGpw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105201744181844417978\">YORI Piccadilly Circus Korean BBQ</a>"
        ]
      },
      {
        "reference": "AciIO2eSPUsE8mJdEbcQNoWUpmeGqOVEbap3gIkSmIDCQ3adpDtdz3lu_TfFKEWYv2RQ81aGItkB-HsTzUvSL-PIDRgD2wzLZSeDsVXofeMXDVKGuHdKsZRljL1ehFqzvL6fszr4U8U8ORWjdDaAbmuKF2E4bGjixySlyK0Z9am0lX6j3doSB3UePfsWcnnK53vA9NNT-WuaHfvTWZA-RIanwiRmeAlQiMKAzS6881i1xNpiFuTeTd-PimvenM1Cb1hhnVcJIg9nUTgZ8KwnHDOZ1e_Gqf-fhdAen7p7SenpPRkAwM3StomOgqYaxI05quSdk5NlmypoBG5jeUzOp4HcMxKUF5Q8oURT5PWxu4i48QFbotyQudDEBX95quWvrB7FGgr7Zhua9zqYkKIDDm4K-Xn7gvolCgQZ6IWjYWQhsmMxqmoYo-ya8442yMfTCw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eSPUsE8mJdEbcQNoWUpmeGqOVEbap3gIkSmIDCQ3adpDtdz3lu_TfFKEWYv2RQ81aGItkB-HsTzUvSL-PIDRgD2wzLZSeDsVXofeMXDVKGuHdKsZRljL1ehFqzvL6fszr4U8U8ORWjdDaAbmuKF2E4bGjixySlyK0Z9am0lX6j3doSB3UePfsWcnnK53vA9NNT-WuaHfvTWZA-RIanwiRmeAlQiMKAzS6881i1xNpiFuTeTd-PimvenM1Cb1hhnVcJIg9nUTgZ8KwnHDOZ1e_Gqf-fhdAen7p7SenpPRkAwM3StomOgqYaxI05quSdk5NlmypoBG5jeUzOp4HcMxKUF5Q8oURT5PWxu4i48QFbotyQudDEBX95quWvrB7FGgr7Zhua9zqYkKIDDm4K-Xn7gvolCgQZ6IWjYWQhsmMxqmoYo-ya8442yMfTCw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117836523989206014361\">Darren Davies</a>"
        ]
      },
      {
        "reference": "AciIO2cglNnu8ZVZkkzwqBbb7jWfEKaaYowghdKy_YYvWNOypokbqiDJ357Ml44A1iPytXATPwEEkDnqjO1dSG3BVizHeyOt1VoUzYejPwILQ6l7QpPywXNToQkm0k-2heSwS007dTVuC2MeTbAjOKJavdAsYedLxtgoZkpe52F17N8cYT_j_lpuZOXLrvv96xQBJbxrfQT2ijvXIbM7ci5nf-zMaN0f792HZiy4GmR8ErlxuIklAlpPsgF4N68Ysm3NskZ5S_npY5Ra8GITdKSnY1GtDTAjp8iOLdPLhVebK_M1Rd-0N9tVMvT8yXv8Hktax8hR2iWWYXC5k4iAd6b51uKeVb7n2mhHR7XCNSMxXhvK0ejmwnoa_JpgOKD2VsWs7Rj5szBVlHzLsd8yaJgPAjoUhVO4hmSNe0oYy41heHTZFg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cglNnu8ZVZkkzwqBbb7jWfEKaaYowghdKy_YYvWNOypokbqiDJ357Ml44A1iPytXATPwEEkDnqjO1dSG3BVizHeyOt1VoUzYejPwILQ6l7QpPywXNToQkm0k-2heSwS007dTVuC2MeTbAjOKJavdAsYedLxtgoZkpe52F17N8cYT_j_lpuZOXLrvv96xQBJbxrfQT2ijvXIbM7ci5nf-zMaN0f792HZiy4GmR8ErlxuIklAlpPsgF4N68Ysm3NskZ5S_npY5Ra8GITdKSnY1GtDTAjp8iOLdPLhVebK_M1Rd-0N9tVMvT8yXv8Hktax8hR2iWWYXC5k4iAd6b51uKeVb7n2mhHR7XCNSMxXhvK0ejmwnoa_JpgOKD2VsWs7Rj5szBVlHzLsd8yaJgPAjoUhVO4hmSNe0oYy41heHTZFg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114238112277400652872\">Nznz Ab</a>"
        ]
      },
      {
        "reference": "AciIO2cPjCmRXUKTABnmrplOHdsTu3zq4u8rCiHnxv3_kv_tWO3lDFE3vwHcSxRT2h8Ipb0umFUs3hnwozCGjpPwyoPYXg7TH4OXTVkhI9Tbx4dqnjgYvjBo4Nj7S7ufNaeNWmFhrmZRodslYHZPyaeG9fqcMQ9mMWX06Az6I7Wou2kdDtluQeIQaa_kbVzhDaykzEBPSfRRh-asBxTUXizndElAGPJQXKerJ1uCYuap9TiDVgqHasNKrYepwT1VGRExPzuuMvTXa3yRoZQaXUBWjKHAHqBMU2tLcbmJeam6Cdl530fIQ-95qitNm4MYwBRJDyXwdge4vTE1CpLADL98JfyMgUm6jPm4WYZQhuHLitTzLNpJYLL9OaKhMAJzV15jiJz8WfNm2FSXdugAG1zOKxDBX3mHvhKFSZT_TQ8TInrcMHzYcllqk1HfNO36Aw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cPjCmRXUKTABnmrplOHdsTu3zq4u8rCiHnxv3_kv_tWO3lDFE3vwHcSxRT2h800Ipb0umFUs3hnwozCGjpPwyoPYXg7TH4OXTVkhI9Tbx4dqnjgYvjBo4Nj7S7ufNaeNWmFhrmZRodslYHZPyaeG9fqcMQ9mMWX06Az6I7Wou2kdDtluQeIQaa_kbVzhDaykzEBPSfRRh-asBxTUXizndElAGPJQXKerJ1uCYuap9TiDVgqHasNKrYepwT1VGRExPzuuMvTXa3yRoZQaXUBWjKHAHqBMU2tLcbmJeam6Cdl530fIQ-95qitNm4MYwBRJDyXwdge4vTE1CpLADL98JfyMgUm6jPm4WYZQhuHLitTzLNpJYLL9OaKhMAJzV15jiJz8WfNm2FSXdugAG1zOKxDBX3mHvhKFSZT_TQ8TInrcMHzYcllqk1HfNO36Aw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109073489215198505676\">J. Q</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "M M",
        "rating": 5,
        "text": "Wonderful place for Korean food in London ! We didn’t try the BBQ but standards plates, all delightful ! The tteokbokki and the pajeon were so good, as well as the soy garlic chicken bites. We tried different bibimbap and the tofu and sea food stew, so tasty and not too spicy, which was great for us ! Plates are really affordable in my opinion. And the service is great ! I highly recommend this place !",
        "time": 1759746580,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "J. Q",
        "rating": 4,
        "text": "It was very easy to make reservation on Google Maps. We were craving for some Korean barbecue and we ordered the beef selection.\n\nSome of the smaller pieces come with very nice marble however the quantity wasn’t that much there is a piece of bigger steak, and some other that are marinated.\n\nWhen we first put the meat on the grill, the grill wasn’t completely heated up so the steak wasn’t the best and no staff told us when the grill  would be ready.\n\nOn top of that we ordered a Seaford pancake, mushroom fried glass noodle and a soup with rice.\n\nThe rice wine in a bowl is a must to order. It is very delicious and with low alcohol percentage.\n\nWe had a very nice time there drinking rice wine and eating. Three of us and we had a full tummy.\n\nIt was £120 for 3, not bad for London price, especially we had alcohol.",
        "time": 1758452751,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Darren Davies",
        "rating": 5,
        "text": "Took my daughter here for a celebration meal We went for the set barbecue (chicken) we also got beef, 2 rices and some kimchi glass of coke and a big water total £82 lovely atmosphere, great customer service.My only downfall is if 2 people are going the tables aren't big enough apart from that I lovely experience",
        "time": 1759915437,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Roselle",
        "rating": 5,
        "text": "Popped in for a quick pre-theatre meal without a reservation, and the staff couldn’t have been more accommodating - managed to seat us promptly and made it all feel easy. The service throughout was excellent.\n\nWe ordered the bibimbap and doenjang jjigae - both comforting, well-seasoned, and full of flavour. The drinks deserve a mention too: the strawberry and lychee Yori highballs were refreshing and not overly sweet.\n\nGreat spot if you’re in the area! Efficient, friendly, and reliably good food. Would definitely come back.",
        "time": 1756465614,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Timothy Edwards",
        "rating": 5,
        "text": "We came here because it was kid friendly. They had a lovely kids meal. It was rice with vegetables and egg on top, and served with a side of dumplings. Our chicken and beef dishes were delicious. We even ordered an extra bowl of kimchi because it was so good. Highly recommend, we will be back.",
        "time": 1756470483,
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
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:53:55.326Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:55.326Z",
    "updatedAt": "2025-10-16T20:24:54.496Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "YORI Piccadilly Circus Korean BBQ — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_yori-piccadilly-circus-korean-_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.446Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "YORI Piccadilly Circus Korean BBQ",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6 Panton St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 5304
      },
      "url": "https://thebestinlondon.co.uk/restaurant/yori-piccadilly-circus-korean-bbq-Hpzadwok",
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
    "image_card_path": "/images/restaurants/yori-piccadilly-circus-korean-bbq-Hpzadwok/korean-yori-piccadilly-circus-korean-bbq-Hpzadwok-card-457f51b6.webp",
    "image_hero_path": "/images/restaurants/yori-piccadilly-circus-korean-bbq-Hpzadwok/korean-yori-piccadilly-circus-korean-bbq-Hpzadwok-hero-8b9fc5e5.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJY3boyNIEdkgRNE2VayvElt8",
    "slug": "bibimbap-soho-VayvElt8",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJY3boyNIEdkgRNE2VayvElt8",
    "name": "Bibimbap Soho",
    "description": "Bright, modern eatery serving multiple varieties of the signature Korean mixed rice dish.",
    "cuisines": [
      "korean"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.3,
    "user_ratings_total": 2141,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "11 Greek St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "11 Greek St, London",
    "postcode": "W1D 4DJ",
    "borough": "Central London",
    "lat": 51.5144005,
    "lng": -0.1309395,
    "phone": "020 7287 3434",
    "phone_international": "+44 20 7287 3434",
    "website": "https://bibimbapsoho.co.uk/",
    "url": "https://maps.google.com/?cid=16111280407732112692",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Friday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Saturday: 12:00 – 10:30 PM",
        "Sunday: 12:00 – 9:30 PM"
      ],
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
            "time": "2200"
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
            "time": "2200"
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
            "time": "2200"
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
            "day": 5,
            "time": "2200"
          },
          "open": {
            "day": 5,
            "time": "1700"
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
        "reference": "AciIO2crccFAKLy1fAd4DZLcf5_V4e2zoL0cVfQ71TTNTNA7J-SXbEfpv2r7_YghjCFqiZ2IdTb1MnGFiTR9nTX12_ke2GyMcEbnb1fsFwc_wngZgtVtWPpb88oS1sX5esYlGOF2-BWBfvbj7v4viXeT3ixlp3RmvkgPEl5PlvE5pZaE9qftdu46N394AY61IvCKoRXgXONavc7UeV7YZWmZ4mhj-PP8YcfYAHeiFgYGsoDzydHn9iB3_L1q7xVglnNr6dFqO8qjFCnkp5z-b21m26wSt0vkmbA5IZZJZTPAQ8r_LQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2crccFAKLy1fAd4DZLcf5_V4e2zoL0cVfQ71TTNTNA7J-SXbEfpv2r7_YghjCFqiZ2IdTb1MnGFiTR9nTX12_ke2GyMcEbnb1fsFwc_wngZgtVtWPpb88oS1sX5esYlGOF2-BWBfvbj7v4viXeT3ixlp3RmvkgPEl5PlvE5pZaE9qftdu46N394AY61IvCKoRXgXONavc7UeV7YZWmZ4mhj-PP8YcfYAHeiFgYGsoDzydHn9iB3_L1q7xVglnNr6dFqO8qjFCnkp5z-b21m26wSt0vkmbA5IZZJZTPAQ8r_LQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107937379221420295329\">Bibimbap Soho</a>"
        ]
      },
      {
        "reference": "AciIO2dEam409DtUCSSaF1MSkFslpukW7reSdLnGefxGw6VXQh9XP4w_HjLaVFKQ_C_NdUL50ILS4QMc-J6nOAYUOpFhlRPeR4xZBK0-3l3TF0KqY1C6i9BEJNC5_BIENKLM4FBJ03yvn7bQbMZGqQSCZFa81u-NGGp_zDgsF17RRTmB2HnEVh_xYNh7-vkUox2qhqGsFnzE2S1-cxa4bEwLV9PKddIVqQjyHkS0bBg1XuExXtNWUYhvC_O1ecprqxC8eV7-o52JBgu6kgOzVuii1gZGzdW9HXVkGv6xTTRa3ZcCfw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dEam409DtUCSSaF1MSkFslpukW7reSdLnGefxGw1200VXQh800XP4w_HjLaVFKQ_C_NdUL50ILS4QMc-J6nOAYUOpFhlRPeR4xZBK0-3l3TF0KqY1C6i9BEJNC5_BIENKLM4FBJ03yvn7bQbMZGqQSCZFa81u-NGGp_zDgsF17RRTmB2HnEVh_xYNh7-vkUox2qhqGsFnzE2S1-cxa4bEwLV9PKddIVqQjyHkS0bBg1XuExXtNWUYhvC_O1ecprqxC8eV7-o52JBgu6kgOzVuii1gZGzdW9HXVkGv6xTTRa3ZcCfw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107937379221420295329\">Bibimbap Soho</a>"
        ]
      },
      {
        "reference": "AciIO2cEwP79p4_d6RaEwrOhEIFAyRckCgmewEl9jBHnrkqorOmpVNgAQvo4LQ7LteecCVUlO_wVAtgacnasOjv-j2Njvs3n89zLI7UamtDP-Q1u27QmMLe4tboAFPQGBpauH0qRtKDyjiVVFLEWWWPCaZM4njaTBl876DGpF2yCX8KnxxA3kUvgPcHEA61SSDsut71w48NwdZiJImaA2dX62bFQqQbZrj3EyrIMMpOAW1so6AQ524NfEAlwzgKwFT5dMo6l0DR2_QvrtDm1QSkzU4kAmv-A8FxAMD5NaFYBtQdA7zGV_FRQuls2s7IvbYQZcqhq8VsWQp0Eift64somK_qfv60ifyF1S-DprO-zFjh02rOqbgita5kcdiAh-xkhd41j735mANEZS3QL21OSCFfVcvIjpnRVqUolgJwR73uYJkc",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cEwP79p4_d6RaEwrOhEIFAyRckCgmewEl9jBHnrkqorOmpVNgAQvo4LQ7LteecCVUlO_wVAtgacnasOjv-j2Njvs3n89zLI7UamtDP-Q1u27QmMLe4tboAFPQGBpauH0qRtKDyjiVVFLEWWWPCaZM4njaTBl876DGpF2yCX8KnxxA3kUvgPcHEA61SSDsut71w1200NwdZiJImaA2dX62bFQqQbZrj3EyrIMMpOAW1so6AQ524NfEAlwzgKwFT5dMo6l0DR2_QvrtDm1QSkzU4kAmv-A8FxAMD5NaFYBtQdA7zGV_FRQuls2s7IvbYQZcqhq8VsWQp0Eift64somK_qfv60ifyF1S-DprO-zFjh800rOqbgita5kcdiAh-xkhd41j735mANEZS3QL21OSCFfVcvIjpnRVqUolgJwR73uYJkc&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112117314709341603457\">Aspasia Koulocheri</a>"
        ]
      },
      {
        "reference": "AciIO2eJGGFnZlCnTSrzqLjOswKz_Dv0UMLuxwfSCCXHIcv-WEuHew5FY91rjDsa7hH0QGE7xpcBAHwNcmZNU7tGpY73MPqh1vIrtEzruNZX7x7uTqa0Wo7caaMc9_ugMZDn4mV629KpHIkjeimvh63LLOKkY4z11xpCz49RscuebligyK4mbfWMisdTO_pDigIVMUq2DXDVZg9LM9k7lVuuLDD89rGkk3U02KQdDYRMN1ht7992HS9_TxXszsAZsy3fhV_oG-Oz_1HlpCxNEdC3nHIaD53qM_DFRpjjYc8dkPfYN6b5RSUK9hOvnBHEVmJYyEyOjSlb-uUSy-WgipvN6wJSGObeL4jLn2o8LghmT1g6X21QDBtVH8L9q1pDXWREDpcIT3ajw_qhmrckzNBlf19fcKCGDKc7ImZReMo0uM7BmA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eJGGFnZlCnTSrzqLjOswKz_Dv0UMLuxwfSCCXHIcv-WEuHew1200FY91rjDsa7hH0QGE7xpcBAHwNcmZNU7tGpY73MPqh800vIrtEzruNZX7x7uTqa0Wo7caaMc9_ugMZDn4mV629KpHIkjeimvh63LLOKkY4z11xpCz49RscuebligyK4mbfWMisdTO_pDigIVMUq2DXDVZg9LM9k7lVuuLDD89rGkk3U02KQdDYRMN1ht7992HS9_TxXszsAZsy3fhV_oG-Oz_1HlpCxNEdC3nHIaD53qM_DFRpjjYc8dkPfYN6b5RSUK9hOvnBHEVmJYyEyOjSlb-uUSy-WgipvN6wJSGObeL4jLn2o8LghmT1g6X21QDBtVH8L9q1pDXWREDpcIT3ajw_qhmrckzNBlf19fcKCGDKc7ImZReMo0uM7BmA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/118300362765578380603\">postcard24r</a>"
        ]
      },
      {
        "reference": "AciIO2dwQOzTQh0IHSyQoaW8g8CHoxg2OLRUv2Ud_BGNPTOqHljTfuLVJWdvq_6LwHeR8z-7ioP_ULZOw-i08KEsIAAtwFiuRBQLW3H4azOweKDLyKZUHA185L2YF2h8DA1OHARKUQ0_ZIsRoTnKo326RHn9fiHWrBgWKbfbQeQaeSAkIq_4sCiTVi8UYQA7tlc95dG8ZCtnpbcA2HDj4uQTrVy1XhuIpqPSN5huie4nBf-YdTPCEgaYsYBN3pC0HSyPnRkLcPqi63-Fps-AzmhbmBADhuFYuMhIbl-8F9iwmcwKizB9AEqcyTRSnjBz4mtuA0FsUHdoDMaIbZHtWaj_fgk8qQzCHiW4KgfNBJQPpdPFKTP3uHdm3Ic5tGE2MMRbo09kQnVlSylWQZwliaGwKujYgbhtKVjVtZkByT_NCxY",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dwQOzTQh800IHSyQoaW8g8CHoxg2OLRUv2Ud_BGNPTOqHljTfuLVJWdvq_6LwHeR8z-7ioP_ULZOw-i08KEsIAAtwFiuRBQLW3H4azOweKDLyKZUHA185L2YF2h8DA1OHARKUQ0_ZIsRoTnKo326RHn9fiHWrBgWKbfbQeQaeSAkIq_4sCiTVi8UYQA7tlc95dG8ZCtnpbcA2HDj4uQTrVy1XhuIpqPSN5huie4nBf-YdTPCEgaYsYBN3pC0HSyPnRkLcPqi63-Fps-AzmhbmBADhuFYuMhIbl-8F9iwmcwKizB9AEqcyTRSnjBz4mtuA0FsUHdoDMaIbZHtWaj_fgk8qQzCHiW4KgfNBJQPpdPFKTP3uHdm3Ic5tGE2MMRbo09kQnVlSylWQZwliaGwKujYgbhtKVjVtZkByT_NCxY&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107541666897315941838\">Serena Palladino</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Tony",
        "rating": 5,
        "text": "I had a fantastic time at this restaurant, which offers delicious and authentic Korean cuisine.\n\nWe ordered several dishes, including bibimbap, sweet and spicy Korean fried chicken, and the spicy rice cakes tteokbokki, all of which were tasty. My favourite dish was the fried tofu bibimbap, which paired wonderfully with their iced plum tea.\n\nI highly recommend visiting this place!",
        "time": 1750712384,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Thao Le",
        "rating": 5,
        "text": "Minimalism interior eat-in Place in really nice location. Love the atmosphere and here we enjoyed Bibimbap. A rainbow colour of rice and veggie. Will try Bingsu next time.",
        "time": 1756236918,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Muhaimin Choudhury",
        "rating": 5,
        "text": "Tried Bibimbap in Soho for the first time. It’s a small Korean spot with great food and fast service. I had the chicken bibimbap, which is halal and was served in a hot iron bowl—delicious and fresh. I was honestly surprised how quickly it came after ordering. Staff were friendly and polite throughout. Spent £23 for the meal and an apple juice. Worth it. Will definitely go again.",
        "time": 1751488504,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "NotoriousB",
        "rating": 5,
        "text": "Lovely authentic Korean food. Quick and friendly service. Food made fresh and very tasty for a quick bite before going to the Theatre. Recommend the chilli squid and chilli fried chicken.",
        "time": 1749417394,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Ron Kuttner",
        "rating": 5,
        "text": "Perfectly sized menu with enough options for everyone.\nGreat warm bowls with rice, veritable and chicken/meat, amazing flavor and satisfying size.\nGreat Koren beer and amazing dumplings.\nHighly recommend for a light dinner.",
        "time": 1749227942,
        "relative_time_description": "4 months ago"
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
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:53:54.349Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:53:54.349Z",
    "updatedAt": "2025-10-16T20:24:54.811Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=korean_bbq_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Bibimbap Soho — Korean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "korean_bibimbap-soho_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.447Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Bibimbap Soho",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "korean"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "11 Greek St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.3,
        "reviewCount": 2141
      },
      "url": "https://thebestinlondon.co.uk/restaurant/bibimbap-soho-VayvElt8",
      "openingHours": [
        "Monday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Tuesday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Thursday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
        "Friday: 12:00 – 3:00 PM, 5:00 – 10:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/bibimbap-soho-VayvElt8/korean-bibimbap-soho-VayvElt8-card-0337bebf.webp",
    "image_hero_path": "/images/restaurants/bibimbap-soho-VayvElt8/korean-bibimbap-soho-VayvElt8-hero-d2b3d430.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Korean Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest korean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of korean cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-korean-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Korean Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest korean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of korean cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-korean-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Korean Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest korean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of korean cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Korean Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-korean-in-central-london-2025',
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
              <Link href="/korean-restaurants-london" className="hover:text-white transition-colors">Korean</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Korean in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Korean Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest korean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of korean cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/soju-korean-restaurant-4eZHjn3Q" className="hover:text-yellow-600 transition-colors">
                Soju Korean Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 18 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Soju Korean Restaurant offers exceptional korean cuisine in Central London. With a 4.8-star rating from 18 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/soju-korean-restaurant-4eZHjn3Q" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJdUnNJjgddkgRWd94eZHjn3Q" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/vegan-yes-dwrPTj8I" className="hover:text-yellow-600 transition-colors">
                Vegan Yes
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 2,221 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Vegan Yes offers exceptional korean cuisine in Central London. With a 4.8-star rating from 2,221 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/vegan-yes-dwrPTj8I" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJaxWqk7UcdkgRjr3dwrPTj8I" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/koko-grill-korean-bbq-restaurant-TiSvAj5c" className="hover:text-yellow-600 transition-colors">
                Koko Grill Korean BBQ Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 148 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Koko Grill Korean BBQ Restaurant offers exceptional korean cuisine in Central London. With a 4.7-star rating from 148 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/koko-grill-korean-bbq-restaurant-TiSvAj5c" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJk-I180QDdkgR53ATiSvAj5c" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/jang-restaurant-A2kpdsBc" className="hover:text-yellow-600 transition-colors">
                Jang Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 203 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Jang Restaurant offers exceptional korean cuisine in Central London. With a 4.7-star rating from 203 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/jang-restaurant-A2kpdsBc" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ1wxyhyQDdkgRt_HA2kpdsBc" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/daebak-dtHO4Ztg" className="hover:text-yellow-600 transition-colors">
                Daebak
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 1,205 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 3/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Daebak offers exceptional korean cuisine in Central London. With a 4.6-star rating from 1,205 reviews and a 3/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/daebak-dtHO4Ztg" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJr-ua5-wEdkgR45FdtHO4Ztg" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/arang-restaurant-zi1Jg4Ec" className="hover:text-yellow-600 transition-colors">
                Arang Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 2,354 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 3/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Arang Restaurant offers exceptional korean cuisine in Central London. With a 4.5-star rating from 2,354 reviews and a 3/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/arang-restaurant-zi1Jg4Ec" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJo5eYZ9QEdkgR7vezi1Jg4Ec" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/korean-dinner-party-ymMXVjzE" className="hover:text-yellow-600 transition-colors">
                Korean Dinner Party
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 1,723 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Korean Dinner Party offers exceptional korean cuisine in Central London. With a 4.5-star rating from 1,723 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/korean-dinner-party-ymMXVjzE" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJtRKMndwFdkgRkv4ymMXVjzE" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/yori-piccadilly-circus-korean-bbq-Hpzadwok" className="hover:text-yellow-600 transition-colors">
                YORI Piccadilly Circus Korean BBQ
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 5,304 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          YORI Piccadilly Circus Korean BBQ offers exceptional korean cuisine in Central London. With a 4.5-star rating from 5,304 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/yori-piccadilly-circus-korean-bbq-Hpzadwok" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJneH7htEEdkgR-hGHpzadwok" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/bibimbap-soho-VayvElt8" className="hover:text-yellow-600 transition-colors">
                Bibimbap Soho
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.3</span>
              <span>📝 2,141 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Bibimbap Soho offers exceptional korean cuisine in Central London. With a 4.3-star rating from 2,141 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/bibimbap-soho-VayvElt8" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJY3boyNIEdkgRNE2VayvElt8" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
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
        <a href="/korean-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Korean Restaurants
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
                Discover more korean restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/korean-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Korean Restaurants
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
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { asCollectionPage } from '../../lib/factory/pageFactory';

export default function BestMediterraneanInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJ2RrGUY0ddkgRRY_1dGMkucY",
    "slug": "london-night-cafe-1dGMkucY",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ2RrGUY0ddkgRRY_1dGMkucY",
    "name": "London Night Cafe",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 123,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "56 Middlesex St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "56 Middlesex St, London",
    "postcode": "E1 7EZ",
    "borough": "Central London",
    "lat": 51.51603369999999,
    "lng": -0.0758891,
    "phone": "07407 391867",
    "phone_international": "+44 7407 391867",
    "website": "https://www.londonnightcafe.co.uk/",
    "url": "https://maps.google.com/?cid=14319516499783814981",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 6:00 PM – 3:00 AM",
        "Tuesday: 10:00 PM – 3:00 AM",
        "Wednesday: 6:00 PM – 3:00 AM",
        "Thursday: 6:00 PM – 3:00 AM",
        "Friday: 6:00 PM – 5:00 AM",
        "Saturday: Closed",
        "Sunday: 6:00 PM – 3:00 AM"
      ],
      "periods": [
        {
          "close": {
            "day": 1,
            "time": "0300"
          },
          "open": {
            "day": 0,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "0300"
          },
          "open": {
            "day": 1,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "0300"
          },
          "open": {
            "day": 2,
            "time": "2200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "0300"
          },
          "open": {
            "day": 3,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "0300"
          },
          "open": {
            "day": 4,
            "time": "1800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "0500"
          },
          "open": {
            "day": 5,
            "time": "1800"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dmPohXxZ5spRoznskjESe-yl29l5AE0aEebYxG_2ra8pxHjXPlP2pRvG1IYvBsuxRiaUgHehVdJZF-7J6musptQE4RvdlYJFHRGJOudlGWjlg-2RuS5S1a79AYZoYkuJoO8wBAtrL-EoeYHbeIJRCBLWN_f5Uy7VU8oV0E0UWZj6BFSvwd0ZhorApAf2T0ahdUnPhN5O7kQM59qdIsCU_G2J9hU-5HXpxn7JeLM4D0vsc5FThVJSJg64CcYuZAswrmei2cALJ_feVJqIBlvkzrulh0G2qc4UlHOgTrTUWfGg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dmPohXxZ5spRoznskjESe-yl29l5AE0aEebYxG_2ra8pxHjXPlP2pRvG1IYvBsuxRiaUgHehVdJZF-7J6musptQE4RvdlYJFHRGJOudlGWjlg-2RuS5S1a79AYZoYkuJoO8wBAtrL-EoeYHbeIJRCBLWN_f5Uy7VU8oV0E0UWZj6BFSvwd0ZhorApAf2T0ahdUnPhN5O7kQM59qdIsCU_G2J9hU-5HXpxn7JeLM4D0vsc5FThVJSJg64CcYuZAswrmei2cALJ_feVJqIBlvkzrulh800G2qc4UlHOgTrTUWfGg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108110781672765621979\">London Night Cafe</a>"
        ]
      },
      {
        "reference": "AciIO2eSy7ir_Bg79DTeEr4TlRVi5dh4PT3kb-m-BgR55imKcv36RwKATzr4iGyviZp-Da6z0x_OsMVNLORrYPsfDDOjL9oqXb1JIAoV7goq94jV0B9vuSQKE2GiEECXxEkrGUtZDk3OmWbq6fD1A_Xg3p6EjRi7bIUmMYSJvG_3VFPJdSBbHWsDyyVV14sJBh-x3lT0Mqxvs-MIJMs4a8X_hHo9KKp9iqD_aYrqFOK21MpA1XBADvj_bZh5GWV46KnNp_8EG3hPdDzb9sblc01raf7X9xl_sxTj4SFlc-7vmK6vXNaVuMw_iURtPvY-svLaJBkVb4jxA4PiBF78Np3Ex-gc1yO1YvRapuXH5ndgOeq0TZmdp4yMNWnMLWS30CAQav_D3ITbwGRAPMUQEczAW5TcUoLJQHeRifofE-FbLN8",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eSy7ir_Bg79DTeEr4TlRVi5dh800PT3kb-m-BgR55imKcv36RwKATzr4iGyviZp-Da6z0x_OsMVNLORrYPsfDDOjL9oqXb1JIAoV7goq94jV0B9vuSQKE2GiEECXxEkrGUtZDk3OmWbq6fD1A_Xg3p6EjRi7bIUmMYSJvG_3VFPJdSBbHWsDyyVV14sJBh-x3lT0Mqxvs-MIJMs4a8X_hHo9KKp9iqD_aYrqFOK21MpA1XBADvj_bZh5GWV46KnNp_8EG3hPdDzb9sblc01raf7X9xl_sxTj4SFlc-7vmK6vXNaVuMw_iURtPvY-svLaJBkVb4jxA4PiBF78Np3Ex-gc1yO1YvRapuXH5ndgOeq0TZmdp4yMNWnMLWS30CAQav_D3ITbwGRAPMUQEczAW5TcUoLJQHeRifofE-FbLN8&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116569805924286126296\">Rashi Bansal</a>"
        ]
      },
      {
        "reference": "AciIO2eTGYddXkLeSSmsZCbTv65bsLyeIcuhZkWr9M_m2QcgK8i932x_ksjx0-zVvOtoHcaBG14cnvWokk5mfw1mGmCiNVn74q9eTdtbWhrGHmfQ49TJbc_oEE7zrrg_pQtce-L0im5nEXSopwcF71aT1vUKLQiqUl-TBD2ZPg0z1pNrB8InYqb1qmIAwGXpcOiQnUTcrFEJ8_XcWQAALVTV4JF6KjbS5gCRztA4P4POzf8ckr3-Qg9Ls1m-WigdQHG2HwhdT3_bvE9LrLNDGHaaOzkO_lNJy1uFpHddX4RWKtYdGp51AIRAui2HGnE1tVkvlv7j5E7s6PjIi5DBRH3pnOFI2sVP2GcIrpcY2Jc5kxZvMYUSdOzNyEG2CDT2imdrxLDUs7ALeunkHXD_-RXxmRYUE1EJCLHFwJC3ymajT9eFhXU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eTGYddXkLeSSmsZCbTv65bsLyeIcuhZkWr9M_m2QcgK8i932x_ksjx0-zVvOtoHcaBG14cnvWokk5mfw1200mGmCiNVn74q9eTdtbWhrGHmfQ49TJbc_oEE7zrrg_pQtce-L0im5nEXSopwcF71aT1vUKLQiqUl-TBD2ZPg0z1pNrB8InYqb1qmIAwGXpcOiQnUTcrFEJ8_XcWQAALVTV4JF6KjbS5gCRztA4P4POzf8ckr3-Qg9Ls1m-WigdQHG2HwhdT3_bvE9LrLNDGHaaOzkO_lNJy1uFpHddX4RWKtYdGp51AIRAui2HGnE1tVkvlv7j5E7s6PjIi5DBRH3pnOFI2sVP2GcIrpcY2Jc5kxZvMYUSdOzNyEG2CDT2imdrxLDUs7ALeunkHXD_-RXxmRYUE1EJCLHFwJC3ymajT9eFhXU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114077060016012091255\">Pip Page-Jones</a>"
        ]
      },
      {
        "reference": "AciIO2fxmm3yJM-txLUWvPfGFwmE7dbHXtbki_jUC6R74tTmETXFZywKKqu8sNFK-0rypDlSdesE95WyXzWr156Ypsuc8MqGIdBANtGxVKIC4q9_rhMrmgNCsBWOQmxt4gInOnCrWcLrI-Qy2s0qMWF1YAkeDEcSBXxzXEqSCD-ZtUg2YUziRMD38UmsF4MkEdhsRniL4Z1ziSE0mcDq3kL1mKnhdl6Hl2EAAGoGIKBeUxREUo2HPBhHCXIuP5ps0YjILSvskTca8zKac1DovliVHc2VxeqqUBFtP1n4-1593fa2v7tVvlrX95dvAt3suBM9tPholpwbD2bsVVsnSgOepRFSpFKERVwQC1q_45VY_nP82IGdbrZqdBxNmvNVIhMuBCMnqfFC473S_JOfOCgtSWUz8PKxklaq_HUoudYckl99DpY",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fxmm3yJM-txLUWvPfGFwmE7dbHXtbki_jUC6R74tTmETXFZywKKqu8sNFK-0rypDlSdesE95WyXzWr156Ypsuc8MqGIdBANtGxVKIC4q9_rhMrmgNCsBWOQmxt4gInOnCrWcLrI-Qy2s0qMWF1YAkeDEcSBXxzXEqSCD-ZtUg2YUziRMD38UmsF4MkEdhsRniL4Z1ziSE0mcDq3kL1mKnhdl6Hl2EAAGoGIKBeUxREUo2HPBhHCXIuP5ps0YjILSvskTca8zKac1DovliVHc2VxeqqUBFtP1n4-1593fa2v7tVvlrX95dvAt3suBM9tPholpwbD2bsVVsnSgOepRFSpFKERVwQC1q_45VY_nP82IGdbrZqdBxNmvNVIhMuBCMnqfFC473S_JOfOCgtSWUz8PKxklaq_HUoudYckl99DpY&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104596842365583677253\">Lerryn</a>"
        ]
      },
      {
        "reference": "AciIO2envM7cKb88vlaEgK_ZqIrD96nVkOZqgdkfMH4vM-7rCninJD-qGc8JEqz7iPeJ3wiD20AFfcF0vdzesTcpHDspSktIScfokozKrcE60Js9QEBsZuZKrBQG2jgLV6-kNzeTTqaw1y4qvQCfuJ_MipcgE50iFtP9XU_E1V6Ic1MJ1Pq4F5xpKFgyCPYy9eIoLlzTlRyTC35cw2TlP7Wjh1F29NsHbErizJk5OZwQLZgyFXen2uFwWOVYpf28eeY9-IqX7LmvEvtdj-lB41SEF-7_ZlWSEqtifDXrDO7XOTOyUPB9w1M8KX5_fzOts7nllzusZiIHOtHn7UK7-ruy1PPS4ZxF4Gw3tO4oL2wWEUKNdSCWEXh_j_QgkeQ16h1RZPy_Lk9uwRZWhKfPQEdNqmTRwvvg5119efFXLE_5yuv259c",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2envM7cKb88vlaEgK_ZqIrD96nVkOZqgdkfMH4vM-7rCninJD-qGc8JEqz7iPeJ3wiD20AFfcF0vdzesTcpHDspSktIScfokozKrcE60Js9QEBsZuZKrBQG2jgLV6-kNzeTTqaw1200y4qvQCfuJ_MipcgE50iFtP9XU_E1V6Ic1MJ1Pq4F5xpKFgyCPYy9eIoLlzTlRyTC35cw2TlP7Wjh800F29NsHbErizJk5OZwQLZgyFXen2uFwWOVYpf28eeY9-IqX7LmvEvtdj-lB41SEF-7_ZlWSEqtifDXrDO7XOTOyUPB9w1M8KX5_fzOts7nllzusZiIHOtHn7UK7-ruy1PPS4ZxF4Gw3tO4oL2wWEUKNdSCWEXh_j_QgkeQ16h1RZPy_Lk9uwRZWhKfPQEdNqmTRwvvg5119efFXLE_5yuv259c&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106217369599996574412\">Dorian Perron</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Kamila",
        "rating": 5,
        "text": "Lovely space. It’s very obvious the owner put a lot of effort and care into it. Lots of little things to explore and everywhere you look, something interesting is going on. London desperately needs more spaces where people can hang out in the night/evening without alcohol being he main activity. Wonderful place and a great experience.\n\nI also left my charger and the owner was super helpful about it and went out of their way ♥️",
        "time": 1753805995,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Maya Seligman",
        "rating": 5,
        "text": "Aghhhh what an awesome vibe this was so lush, so beautifully decorated, so many cool lo-fi sounds. Honestly it gave me lots of interior decorating inspiration!\nWe arrived at midnight, so it was quiet with a couple of people downstairs. No one is at the entrance, there's just a little phone to tell you how it works. £7 entry was totally earned for a very comfy resting spot, games, unlimited and so many kinds of tea and coffee and tasty biscuits. There's hot chocolate and different milks too!\nWill definitely be back. Its like a night out for a home bird! And was perfect for us as we had a really early morning flight, so needed somewhere to chill in Central London before getting to the airport :)",
        "time": 1751266509,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Carlotta Dove",
        "rating": 5,
        "text": "One of a kind venue with the kindest owner Eric, put together with a lot of love and so many eccentric details. We rented out the night cafe for my birthday and had the best time!! Must-do for anyone living or visiting London ❤️",
        "time": 1739102476,
        "relative_time_description": "8 months ago"
      },
      {
        "author_name": "Melissa Kelly Shore",
        "rating": 5,
        "text": "Me and my friends all met up in London for my birthday a few months back specifically to go here and were so so glad we did, had an absolutely brilliant night. Think this might be the coolest place I’ve ever been. If I lived in London I’d definitely go every week",
        "time": 1754213868,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Aurora",
        "rating": 5,
        "text": "Went here for the first time tonight and OH MY GOD! This is not a real place! Loveliest chill areas with sofa, free tea and coffee and the best part: meeting people and finding out a diverse range of life stories. The owner was very welcoming and lovely and I definitely will be going back here again (might have to be a regular thing). Everything is so cool including the bathroom! There needs to be more places in London like this",
        "time": 1706755848,
        "relative_time_description": "a year ago"
      }
    ],
    "types": [
      "establishment",
      "point_of_interest"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-16T20:23:55.194Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:55.194Z",
    "updatedAt": "2025-10-16T20:25:20.818Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "London Night Cafe — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_london-night-cafe_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.462Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "London Night Cafe",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "56 Middlesex St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 123
      },
      "url": "https://thebestinlondon.co.uk/restaurant/london-night-cafe-1dGMkucY",
      "openingHours": [
        "Monday: 6:00 PM – 3:00 AM",
        "Tuesday: 10:00 PM – 3:00 AM",
        "Wednesday: 6:00 PM – 3:00 AM",
        "Thursday: 6:00 PM – 3:00 AM",
        "Friday: 6:00 PM – 5:00 AM",
        "Saturday: Closed",
        "Sunday: 6:00 PM – 3:00 AM"
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
    "image_card_path": "/images/restaurants/london-night-cafe-1dGMkucY/mediterranean-london-night-cafe-1dGMkucY-card-a08bb7eb.webp",
    "image_hero_path": "/images/restaurants/london-night-cafe-1dGMkucY/mediterranean-london-night-cafe-1dGMkucY-hero-b7389599.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ-xBcaZEFdkgRZ6htuvgyCWI",
    "slug": "common-breads-tuvgyCWI",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ-xBcaZEFdkgRZ6htuvgyCWI",
    "name": "COMMON BREADS",
    "description": "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe",
      "bakery"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 571,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "110 Buckingham Palace Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "110 Buckingham Palace Rd, London",
    "postcode": "SW1W 9SA",
    "borough": "Central London",
    "lat": 51.4939671,
    "lng": -0.1470608,
    "phone": "020 8017 3773",
    "phone_international": "+44 20 8017 3773",
    "website": "http://www.commonbreads.com/",
    "url": "https://maps.google.com/?cid=7064233534368360551",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 8:00 AM – 6:00 PM",
        "Tuesday: 8:00 AM – 6:00 PM",
        "Wednesday: 8:00 AM – 6:00 PM",
        "Thursday: 8:00 AM – 6:00 PM",
        "Friday: 8:00 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: 8:00 AM – 6:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1800"
          },
          "open": {
            "day": 0,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1800"
          },
          "open": {
            "day": 1,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1800"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1800"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1800"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1800"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1800"
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
        "reference": "AciIO2dNNUHh_7OwtC2QaSyOXVGHZRwAFISzOi01xaskDG-QmUz-WM8RDCjXDMUsybhyvDU6AM2xPprk5yM5UeoT12ZDqDBOzFkkBuhDx-stpT1WLIiJXG7TZRqNpE11Ci8m59dOA0w-KvfgN7xmkYvweTLNdmkVloYTxKXAzcFwqskH14xQQNif-zeccDb9vY9zbR_4f1Hl0CUf4PWknTLAe-FZ039q3B2RVTQAdlePqbuxgycBizIYoXG8pa-lUaswUZw_5duSfEIXzrx5yAr5mKxN7UEOH9mRoGTiYrQSiIhdKw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dNNUHh_7OwtC2QaSyOXVGHZRwAFISzOi01xaskDG-QmUz-WM8RDCjXDMUsybhyvDU6AM2xPprk5yM5UeoT12ZDqDBOzFkkBuhDx-stpT1WLIiJXG7TZRqNpE11Ci8m59dOA0w-KvfgN7xmkYvweTLNdmkVloYTxKXAzcFwqskH14xQQNif-zeccDb9vY9zbR_4f1Hl0CUf4PWknTLAe-FZ039q3B2RVTQAdlePqbuxgycBizIYoXG8pa-lUaswUZw_5duSfEIXzrx5yAr5mKxN7UEOH9mRoGTiYrQSiIhdKw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107943593237510068633\">COMMON BREADS</a>"
        ]
      },
      {
        "reference": "AciIO2eojecdu6JiDwYpj-2i15Ye0ulh9fEY148d2rGEKQ6RYap0bzXD7cEeG6FwIfmZThxAmT1_MF5RD6cWzJ5GIx2KGr00x3pSsKmmfFkrWLrocs9MyR3uU_c3Zpe-rY3Wdu0W_uOr9TWwZKBHYu6XVLiokgoGeIS-mEvjjtkRMusbiLjp3LoG13vHL6uKa1Tkx7KPQiYp57sK1nCaqfuKgK9RpQt8MAu7IinWj-7lkyORPhUR1ujvGSnEmrqCgnlHMBjIEESqi9-u9Da0Efns7ZIkNG0M18nSOkb978cQjyFSSA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eojecdu6JiDwYpj-2i15Ye0ulh800fEY148d2rGEKQ6RYap0bzXD7cEeG6FwIfmZThxAmT1_MF5RD6cWzJ5GIx2KGr00x3pSsKmmfFkrWLrocs9MyR3uU_c3Zpe-rY3Wdu0W_uOr9TWwZKBHYu6XVLiokgoGeIS-mEvjjtkRMusbiLjp3LoG13vHL6uKa1Tkx7KPQiYp57sK1nCaqfuKgK9RpQt8MAu7IinWj-7lkyORPhUR1ujvGSnEmrqCgnlHMBjIEESqi9-u9Da0Efns7ZIkNG0M18nSOkb978cQjyFSSA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107943593237510068633\">COMMON BREADS</a>"
        ]
      },
      {
        "reference": "AciIO2f1Q0EWWRzW3tJ4LAQ29AnMU8JGKC7yyhEHW8lPC5xJ8xRMZxQLx2pqo-FEsjjoAh_jmgRTGXQ8Hm-t0ZU7m9ihXmLkozkFZkwQdZIrbrZTuRsktGRg2Bbfw9aOQXBd-9_VunLJkcGfasFbRETbDSNxYec_bb2uTK3clfqJjCtvf4m8Mr_3leBVGgLQy1mQIfKG7Btb_7ybkxuxqW6xYsp58QmXV8o72f0sZa9W30Riuzgmx5uGEbMr9U6UAGc3yHTbDHYQsMqtaE077ZC2dLKRDdkRSstdmglmf-Onl_VrXQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f1Q0EWWRzW3tJ4LAQ29AnMU8JGKC7yyhEHW8lPC5xJ8xRMZxQLx2pqo-FEsjjoAh_jmgRTGXQ8Hm-t0ZU7m9ihXmLkozkFZkwQdZIrbrZTuRsktGRg2Bbfw1200aOQXBd-9_VunLJkcGfasFbRETbDSNxYec_bb2uTK3clfqJjCtvf4m8Mr_3leBVGgLQy1mQIfKG7Btb_7ybkxuxqW6xYsp58QmXV8o72f0sZa9W30Riuzgmx5uGEbMr9U6UAGc3yHTbDHYQsMqtaE077ZC2dLKRDdkRSstdmglmf-Onl_VrXQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107943593237510068633\">COMMON BREADS</a>"
        ]
      },
      {
        "reference": "AciIO2erBpIOsSfNT7wglrpDuGM_RfZ5ZFq0FFYggbxu41bqOND745iu3fjHkJRNzumLvAEXpdsbGq0GpfqNKlSsdkjjcHJvwaCXpLm36i4fJmTkBIWY9bgD296sSuuAWVW9l13Qyq6pv5Ek9e3Zj-8kctc8GZaHDb_MzBwukfspuPBbzbAx2U-ZKBRwPDixFpoUc8Dd86yw3JUK_uq_uwNxznHik0PiyDOB5CX9lqg4u7zY5TWYBzfuRTefWtfJbu5SFxaBh9bqE4DMC5safkj-7LC0B3zi86cCqH8FVgTWmhFUEj5_hdzJBMFJH9C2v7VWX7KAPBDfspzWS-4zRKAxRQdNWjMMHjw2-3_NHwSRQIo3xKUIU8lSivdK1EAbqz1CSwD4P0NO_BM7fq_sYiBXswd89WNRvAIUAH39iumDqsuQbLXt",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2erBpIOsSfNT7wglrpDuGM_RfZ5ZFq0FFYggbxu41bqOND745iu3fjHkJRNzumLvAEXpdsbGq0GpfqNKlSsdkjjcHJvwaCXpLm36i4fJmTkBIWY9bgD296sSuuAWVW9l13Qyq6pv5Ek9e3Zj-8kctc8GZaHDb_MzBwukfspuPBbzbAx2U-ZKBRwPDixFpoUc8Dd86yw1200JUK_uq_uwNxznHik0PiyDOB5CX9lqg4u7zY5TWYBzfuRTefWtfJbu5SFxaBh800bqE4DMC5safkj-7LC0B3zi86cCqH8FVgTWmhFUEj5_hdzJBMFJH9C2v7VWX7KAPBDfspzWS-4zRKAxRQdNWjMMHjw2-3_NHwSRQIo3xKUIU8lSivdK1EAbqz1CSwD4P0NO_BM7fq_sYiBXswd89WNRvAIUAH39iumDqsuQbLXt&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107592967570711001864\">um nawaf</a>"
        ]
      },
      {
        "reference": "AciIO2eccbeAGYFbf7Nh3REfsYArTpSauvu9H3hORUSLwYRWB-4UOl6sIFHrwzlYUoAS_oGmAuR8asYPVaDnrIHb-oq1gHgutdtTjctWVPl1o9vHz2JDT00bRdCFgaxIPw5ZQ4VeBdPMni_YNwdKU4bBMyU-pZmkxee7DJhXJN7raxR5zlGa2YrWHV1BMr04PqRsh6GK2nj8cLVhQWiSE4zDEHNmnFaIeyM-sfZ0OEKVf9P9sGEpfH2DHD0l--dfKdPTP29qMBuiWRNwsGRgdRwXapa3iToD1jxqM2q_sO3w83CVuCzga08IGMRin-Sj7q1-F00WUNIXEszW0lcgg7BYdY4yaUWw_4JQuAjHnV4PHDRzZ6jMVMkTGCd8_V76iWE9s3hsgOl6mYOOrHAE3mqTfFVXhJslsZe1rquGtuDu_gVG_apKJIszfcY4x_qRwA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eccbeAGYFbf7Nh800REfsYArTpSauvu9H3hORUSLwYRWB-4UOl6sIFHrwzlYUoAS_oGmAuR8asYPVaDnrIHb-oq1gHgutdtTjctWVPl1o9vHz2JDT00bRdCFgaxIPw1200ZQ4VeBdPMni_YNwdKU4bBMyU-pZmkxee7DJhXJN7raxR5zlGa2YrWHV1BMr04PqRsh6GK2nj8cLVhQWiSE4zDEHNmnFaIeyM-sfZ0OEKVf9P9sGEpfH2DHD0l--dfKdPTP29qMBuiWRNwsGRgdRwXapa3iToD1jxqM2q_sO3w83CVuCzga08IGMRin-Sj7q1-F00WUNIXEszW0lcgg7BYdY4yaUWw_4JQuAjHnV4PHDRzZ6jMVMkTGCd8_V76iWE9s3hsgOl6mYOOrHAE3mqTfFVXhJslsZe1rquGtuDu_gVG_apKJIszfcY4x_qRwA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114986383815299530307\">Anoud *</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Hessa M. Al Bawardy",
        "rating": 5,
        "text": "The cheese manakish, musakhan, and spinach pies were absolutely incredible. The owner manages the restaurant himself, and the location is just perfect. I truly congratulate him and wish him even more success and new branches in the future.\n\nYou can actually ask them to make the pastries in a small size for takeaway — they were absolutely delicious, arrived hot and fresh, and perfectly clean. Truly amazing!",
        "time": 1755630035,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Loredana Cotfasa",
        "rating": 5,
        "text": "We recently hosted a work event and chose Common Breads for the catering. From start to finish, the experience was exceptional. They tailored our order perfectly, offering a wide variety of options to suit everyone’s preferences. The food was outstanding — fresh, delicious, and of the highest quality — and the service was just as impressive.\n\nOur team and guests were genuinely impressed, and it made the event feel extra special. I would wholeheartedly recommend Common Breads to anyone looking for catering that combines quality, variety, and excellent service.",
        "time": 1758727936,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Patrick",
        "rating": 5,
        "text": "The chicken musakhan manouche was the best dish - highly recommended. The other dishes were alright. Worth a try but nothing to rave about.\n\nService is great and staff are friendly.",
        "time": 1756036859,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Fathima Zahra",
        "rating": 5,
        "text": "Got some quick bites on a weekday evening. Loved the ambience, decor and the layout. It was quiet when I went and the perfect spot to read.\n\nThe food and service is lovely, would love to come back to try more items on the menu.",
        "time": 1759270732,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Muna",
        "rating": 5,
        "text": "Every visit is perfect! the food is always fresh, flavorful, and truly the best Lebanese in the city. Their oat chai is unmatched, and the owner ( Kamal) is so warm and welcoming. Clean, professional, 10/10.I’d love to see them open more locations.",
        "time": 1750451392,
        "relative_time_description": "3 months ago"
      }
    ],
    "types": [
      "bakery",
      "cafe",
      "establishment",
      "food",
      "point_of_interest",
      "store"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": "5",
    "fsa_authority": "Westminster",
    "fsa_url": "https://ratings.food.gov.uk/business/1686881",
    "fsa_last_inspection": "2025-09-19T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:26.942Z",
    "lastVerifiedFSA": "2025-10-16T23:22:29.542Z",
    "createdAt": "2025-10-15T10:54:26.942Z",
    "updatedAt": "2025-10-16T20:25:33.253Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "COMMON BREADS — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_common-breads_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.468Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "COMMON BREADS",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "110 Buckingham Palace Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 571
      },
      "url": "https://thebestinlondon.co.uk/restaurant/common-breads-tuvgyCWI",
      "openingHours": [
        "Monday: 8:00 AM – 6:00 PM",
        "Tuesday: 8:00 AM – 6:00 PM",
        "Wednesday: 8:00 AM – 6:00 PM",
        "Thursday: 8:00 AM – 6:00 PM",
        "Friday: 8:00 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: 8:00 AM – 6:00 PM"
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
    "image_card_path": "/images/restaurants/common-breads-tuvgyCWI/mediterranean-common-breads-tuvgyCWI-card-2000e8e2.webp",
    "image_hero_path": "/images/restaurants/common-breads-tuvgyCWI/mediterranean-common-breads-tuvgyCWI-hero-4a6efe71.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ46R2PhMFdkgR1BjAhX30B_M",
    "slug": "pulse-bar-london-AhX30B_M",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ46R2PhMFdkgR1BjAhX30B_M",
    "name": "Pulse Bar London",
    "description": "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.9,
    "user_ratings_total": 350,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "18 New Globe Walk, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "18 New Globe Walk, London",
    "postcode": "SE1 9DR",
    "borough": "Central London",
    "lat": 51.5075242,
    "lng": -0.09628729999999999,
    "phone": "020 8127 5120",
    "phone_international": "+44 20 8127 5120",
    "website": "http://pulsebarlondon.co.uk/",
    "url": "https://maps.google.com/?cid=17512234496005511380",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 10:30 PM",
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
        "reference": "AciIO2e9j4NGqQDHUDJJpmPhW4hmADaYYtzqEde9M_MpOY_3mcLSFlpDwrQo7soSTYMlc7TG4u9FTnZqsFHI6GQ29WjHblyRBtz2r5MEv1MUqsMQR4L-nyUs8nBfE12yD9UnZBP_lKrAVftWDJ0gkMuDlytC9OAdzOKwa7ikxHdJaouRVuPSXg7SY-VNWTz2pkfcfeDoshxQbzanRxfLesS0a0ewsrmwaALsIwfsEFN584FHLYjKaMe9o6KGryhy7m5esWmCOXEKoen-nuhXyWYScA9AsAMzYnGSId7hKIzrleskRQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e9j4NGqQDHUDJJpmPhW4hmADaYYtzqEde9M_MpOY_3mcLSFlpDwrQo7soSTYMlc7TG4u9FTnZqsFHI6GQ29WjHblyRBtz2r5MEv1MUqsMQR4L-nyUs8nBfE12yD9UnZBP_lKrAVftWDJ0gkMuDlytC9OAdzOKwa7ikxHdJaouRVuPSXg7SY-VNWTz2pkfcfeDoshxQbzanRxfLesS0a0ewsrmwaALsIwfsEFN584FHLYjKaMe9o6KGryhy7m5esWmCOXEKoen-nuhXyWYScA9AsAMzYnGSId7hKIzrleskRQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106425233334039295007\">Pulse Bar London</a>"
        ]
      },
      {
        "reference": "AciIO2f2Y8dzCgcmiDZyvOc0nq9omP4dRsO0s2GO86XOCGsc-571BuNJY5k0QEmGnaRI8in4TA669yEB4KvUaWtDAqTg4ghCup4jfoLUXQAwHcg11Ojz8FjKUqHboaEcPlKfxtnaL1a64M6NC4LqWOvBcTndwz_4hNLP0JBfIqofEOyWtGOcraWNeWwtwEYLL5Hv1k2wRWW8JAK0L_XinFxSeqk_Ms7fIKwNjm-C4IVvaiz8cP2OfUalsbqh5i1pAsYEPCAal6Ozadd4_PAlrpk0nk1kCL3OAqDI65Xh_56EXxU-9g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f2Y8dzCgcmiDZyvOc0nq9omP4dRsO0s2GO86XOCGsc-571BuNJY5k0QEmGnaRI8in4TA669yEB4KvUaWtDAqTg4ghCup4jfoLUXQAwHcg11Ojz8FjKUqHboaEcPlKfxtnaL1a64M6NC4LqWOvBcTndwz_4hNLP0JBfIqofEOyWtGOcraWNeWwtwEYLL5Hv1k2wRWW8JAK0L_XinFxSeqk_Ms7fIKwNjm-C4IVvaiz8cP2OfUalsbqh800i1pAsYEPCAal6Ozadd4_PAlrpk0nk1kCL3OAqDI65Xh_56EXxU-9g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106425233334039295007\">Pulse Bar London</a>"
        ]
      },
      {
        "reference": "AciIO2eYAALbUzzADbCnOch8beYgJqIDT9dW-Iz6KYU__FgWhgXZuBttytWAcxdrwSEOyHNy7lutkTrPJZvIn65zXUTDoFLj0YRkRr0nl18fc9pPw6fxjHJTs7T4PsOWUgWQFVnwyhe56eraI-WZWenzCHyTssPvCAjumM43dYLv4d-jgnaghwYftaLXDjUDrJlPHxAmBrhTbbfZIjfIFtvtFA4QA4S68O9O5CerzRyhyksNx5cSgZGWYnFCUl1hsA0CY1vJLH90nuz9I4wFf8TNoNHpK7hSIMmBdFeuAS7ERNxc0VeTn9WloY_k-cIrYxTWQ1VFtU15y6d0DhE61w9BANux3BL8n0eVHEJ0wxamIxka0mjfPGhL580DdNwvVCGia4QpX6WLsBUEfgzVYcOabVbK5CwhNjp29gNwbPka0HvXzXk4xdX3WEtnLzCqNw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eYAALbUzzADbCnOch800beYgJqIDT9dW-Iz6KYU__FgWhgXZuBttytWAcxdrwSEOyHNy7lutkTrPJZvIn65zXUTDoFLj0YRkRr0nl18fc9pPw1200fxjHJTs7T4PsOWUgWQFVnwyhe56eraI-WZWenzCHyTssPvCAjumM43dYLv4d-jgnaghwYftaLXDjUDrJlPHxAmBrhTbbfZIjfIFtvtFA4QA4S68O9O5CerzRyhyksNx5cSgZGWYnFCUl1hsA0CY1vJLH90nuz9I4wFf8TNoNHpK7hSIMmBdFeuAS7ERNxc0VeTn9WloY_k-cIrYxTWQ1VFtU15y6d0DhE61w9BANux3BL8n0eVHEJ0wxamIxka0mjfPGhL580DdNwvVCGia4QpX6WLsBUEfgzVYcOabVbK5CwhNjp29gNwbPka0HvXzXk4xdX3WEtnLzCqNw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113485140696470194499\">Anne Kaschak</a>"
        ]
      },
      {
        "reference": "AciIO2eTd5de1l8DDAT4XGCmr2I2CSJizvmjFcVO4tbfScmqwO3D6bWqD0XuyIFxZN5QjS3eW0Lgn7sc9fvjLv9vi-uTDO_BnDO9UPtzPeeLqFcLzoNFE_AHvvzaAfROd4mclAusjG46fxzoRrU2xz-b5FBxk8fC4C_Zcg6QQZV9XQigfhWJcPge8VZoL3h1ejZHVo8G-N-WeG56ZM6Hc8CnStllnzZI0Mm8AiXkJ-wl8I1yHzJRN7-z3AGWGL6SrPYIZNgtA8j4K4YMogjoAPgynyucko08wqjp4uRtKBCY8-6HQeuHzsXdS69d2y7o-PRULPdRUwHtCNn0LVjDGuFFXSK11TISM7xl6_4ThCWPzrjahk9RRQoP8HM6NwFfW5fUAr_4T-tzTEXN4Me_Qx4nWAg2Bo3WirrLcHM7ACFj9EoSLwbA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eTd5de1l8DDAT4XGCmr2I2CSJizvmjFcVO4tbfScmqwO3D6bWqD0XuyIFxZN5QjS3eW0Lgn7sc9fvjLv9vi-uTDO_BnDO9UPtzPeeLqFcLzoNFE_AHvvzaAfROd4mclAusjG46fxzoRrU2xz-b5FBxk8fC4C_Zcg6QQZV9XQigfhWJcPge8VZoL3h800ejZHVo8G-N-WeG56ZM6Hc8CnStllnzZI0Mm8AiXkJ-wl8I1yHzJRN7-z3AGWGL6SrPYIZNgtA8j4K4YMogjoAPgynyucko08wqjp4uRtKBCY8-6HQeuHzsXdS69d2y7o-PRULPdRUwHtCNn0LVjDGuFFXSK11TISM7xl6_4ThCWPzrjahk9RRQoP8HM6NwFfW5fUAr_4T-tzTEXN4Me_Qx4nWAg2Bo3WirrLcHM7ACFj9EoSLwbA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117363063608819440639\">Holly O’Neilin</a>"
        ]
      },
      {
        "reference": "AciIO2fyzCG7ymKto_NWUSz-PPUTsOg9zZ4AIl-EwoNly59M9QXj6d_MMUmTT9sIXNZs1u74LM92Vod50Uui-NJ2mmuayQzqMBmjhYVtfxxvgcBqjjOp5jHLzhrLnrl2KhqpCyFYWlP0oePwDcFcEDNuO7hCRjoGrNYMu7QjB_HLos2vyl0wUxEWrxbHrTAgj2s1J0YiprUd_GOy9jg6IY65TFiNw347zsNmMbtJIYKinWabCQuZsE6Nf9nwisSe1CHCocZ0-45m32Pd5sz_bFOG2_QN6La63YSHL1hquht2ypDjnlJy1DgBFhZfx_C1omnTmNUlWHQxGpwWR8IjLUBjAIPqWoI5B1bDgmcatD4MQEB0Az525SPv8Lbdoxc7zgjW98G1xZ-fDAV8qFlCw2xWDbCFa3KnLlQzIF1_uYnSQ4JbZw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fyzCG7ymKto_NWUSz-PPUTsOg9zZ4AIl-EwoNly59M9QXj6d_MMUmTT9sIXNZs1u74LM92Vod50Uui-NJ2mmuayQzqMBmjhYVtfxxvgcBqjjOp5jHLzhrLnrl2KhqpCyFYWlP0oePwDcFcEDNuO7hCRjoGrNYMu7QjB_HLos2vyl0wUxEWrxbHrTAgj2s1J0YiprUd_GOy9jg6IY65TFiNw1200zsNmMbtJIYKinWabCQuZsE6Nf9nwisSe1CHCocZ0-45m32Pd5sz_bFOG2_QN6La63YSHL1hquht2ypDjnlJy1DgBFhZfx_C1omnTmNUlWHQxGpwWR8IjLUBjAIPqWoI5B1bDgmcatD4MQEB0Az525SPv8Lbdoxc7zgjW98G1xZ-fDAV8qFlCw2xWDbCFa3KnLlQzIF1_uYnSQ4JbZw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110755732303132915603\">Ryan</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "lauren gambrill",
        "rating": 5,
        "text": "We had a fantastic time at Pulse Bar for our recent work event! From the moment we arrived, the service was top-notch – super friendly and attentive, which really set the tone for the night. The owner is amazing – warm, welcoming, and clearly passionate about making sure everyone has a great experience.\nWe had a blast playing beer pong, shuffleboard, and darts – such a fun setup that really brought the us together. The atmosphere was lively without being overwhelming, and it’s clear that a lot of thought has gone into creating a space where people can relax and enjoy themselves.\nThe drinks menu is extensive and genuinely impressive, with something for everyone – from cocktails to craft beers. The food was also spot on – tasty, well-presented, and ideal for sharing during a social night like this.\nAll in all, Pulse Bar ticked every box. The service, food, games, and overall vibe were exactly what we were looking for, and we’ll definitely be coming back. A brilliant venue for team events or just a fun night out!",
        "time": 1758983671,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Virginie P",
        "rating": 5,
        "text": "I really enjoy coming to this bar when I go out, the drinks and the food is very nice. I love playing darts. My husband and my son enjoy playing pool. It's fairly priced, we went during happy hours so it was cheap. The staff is so lovely, they are welcoming and friendly. The place is kept clean and the atmosphere is great. They show football on the screens. I really recommend this place",
        "time": 1756297497,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "James Forest",
        "rating": 5,
        "text": "Had one of the best sandwiches of my life with the best atmosphere. The bar was inviting and the owner was awesome. On top of that they had one of the sweetest dogs I have ever met. If I lived in London I would go all the time. Perfect for dinner or a night out on the town. The bar has some of the nicest beer pong tables I have ever seen. They are custom made with led lighting. Thanks to them for such an inviting experience.",
        "time": 1752667082,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Alessandro Malandra",
        "rating": 5,
        "text": "Had an amazing night at Pulse Bar London Bridge! Michelle was an incredible bartender, friendly and made great drinks. Nico, the owner, was super welcoming. And the best part? Meeting Hermes, the adorable bar dog! Great vibes all around , can’t wait to go back.",
        "time": 1749401307,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Chris Hill",
        "rating": 5,
        "text": "Go for the owner’s crazy Italian energy and stay for the food, drinks and games. Pulse bar is designed for groups of friends to hang out and get competitive - beer pong, darts, pool and more. The burgers are delicious and beers are cold. Nothing fancy - just right. Make a date.",
        "time": 1751119947,
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
    "lastVerifiedGoogle": "2025-10-16T20:23:58.814Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T20:23:58.814Z",
    "updatedAt": "2025-10-16T20:25:47.946Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Pulse Bar London — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_pulse-bar-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.474Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Pulse Bar London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "18 New Globe Walk, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.9,
        "reviewCount": 350
      },
      "url": "https://thebestinlondon.co.uk/restaurant/pulse-bar-london-AhX30B_M",
      "openingHours": [
        "Monday: 12:00 – 10:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/pulse-bar-london-AhX30B_M/mediterranean-pulse-bar-london-AhX30B_M-card-e4c0aa61.webp",
    "image_hero_path": "/images/restaurants/pulse-bar-london-AhX30B_M/mediterranean-pulse-bar-london-AhX30B_M-hero-900aaf1e.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJXymuDyobdkgRaLhsMYzvisk",
    "slug": "kin-cafe-restaurant-sMYzvisk",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJXymuDyobdkgRaLhsMYzvisk",
    "name": "KIN Cafe & Restaurant",
    "description": "Quaint eatery specialising in vegan breakfast staples, sandwiches & sweets, plus coffee & smoothies.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe",
      "bar",
      "restaurant"
    ],
    "dietary_tags": {
      "vegan": true
    },
    "rating": 4.8,
    "user_ratings_total": 3360,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "22 Foley St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "22 Foley St, London",
    "postcode": "W1W 6DT",
    "borough": "Central London",
    "lat": 51.5193427,
    "lng": -0.1403111,
    "phone": "020 3589 5185",
    "phone_international": "+44 20 3589 5185",
    "website": "https://www.kinlondon.com/",
    "url": "https://maps.google.com/?cid=14522683333813254248",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 9:30 AM – 4:30 PM",
        "Tuesday: 8:30 AM – 10:30 PM",
        "Wednesday: 8:30 AM – 10:30 PM",
        "Thursday: 8:30 AM – 10:30 PM",
        "Friday: 8:30 AM – 10:30 PM",
        "Saturday: 9:30 AM – 10:30 PM",
        "Sunday: 9:30 AM – 10:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2230"
          },
          "open": {
            "day": 0,
            "time": "0930"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1630"
          },
          "open": {
            "day": 1,
            "time": "0930"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2230"
          },
          "open": {
            "day": 2,
            "time": "0830"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2230"
          },
          "open": {
            "day": 3,
            "time": "0830"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2230"
          },
          "open": {
            "day": 4,
            "time": "0830"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2230"
          },
          "open": {
            "day": 5,
            "time": "0830"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2230"
          },
          "open": {
            "day": 6,
            "time": "0930"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2e0ldrbexytegoqSrofG8-TcIipgPPZZOqZELc3Z2aYOGrRe2fEI0lsuqsz9FN_YKpO5CfBnEh2QI2MRthIdj4BX9odbtxeHikga807s59uf8XK6g0VpXHUEX1Qb0jPy50c81bbD5r3GmUXkeeF435SeWNzpJ1ibqvwAq04RPm4MN0W5t1D6nnNNBiUnxsYs_IXHmj_9HgtINuZ6D8dhEY_Rxbk5OAiKToZsH9qpj7xS1Nrmuk1eBbszRR_5CprgCWi8FZfnMBAEfFYs_e4NM70XZToE1VFP1UE62-q9RxK1Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e0ldrbexytegoqSrofG8-TcIipgPPZZOqZELc3Z2aYOGrRe2fEI0lsuqsz9FN_YKpO5CfBnEh800QI2MRthIdj4BX9odbtxeHikga807s59uf8XK6g0VpXHUEX1Qb0jPy50c81bbD5r3GmUXkeeF435SeWNzpJ1ibqvwAq04RPm4MN0W5t1D6nnNNBiUnxsYs_IXHmj_9HgtINuZ6D8dhEY_Rxbk5OAiKToZsH9qpj7xS1Nrmuk1eBbszRR_5CprgCWi8FZfnMBAEfFYs_e4NM70XZToE1VFP1UE62-q9RxK1Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101716521598985992027\">KIN Cafe &amp; Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2eMk7m6HS_20VZmE0w7qvP4KIzWSdaro2-lZ18XqTpWC-V2vFGEoL_nLDiior_LG6WMHrnS81V7utOb3ZTRdBGcZ3t5QTaETXWxcNniACdUBbnop15mOvWyQBkthu4QCXFxf78GfR7QuicUoqTT_QqMAhmV5-9L-EhGUCWFwyWgxf36I7wcPsJOx1wJou2aF3f_B6Rl-4qVlRQW6h_sfcWCIlrcN5SRPsNIK9qVUwW4tjdVyEzXqiejp3Q5rUm-p2e5pJ_zcDVRWRe56mavO15MUYNMa7N8CVrrEMnFZ9Gwhg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eMk7m6HS_20VZmE0w1200qvP4KIzWSdaro2-lZ18XqTpWC-V2vFGEoL_nLDiior_LG6WMHrnS81V7utOb3ZTRdBGcZ3t5QTaETXWxcNniACdUBbnop15mOvWyQBkthu4QCXFxf78GfR7QuicUoqTT_QqMAhmV5-9L-EhGUCWFwyWgxf36I7wcPsJOx1wJou2aF3f_B6Rl-4qVlRQW6h_sfcWCIlrcN5SRPsNIK9qVUwW4tjdVyEzXqiejp3Q5rUm-p2e5pJ_zcDVRWRe56mavO15MUYNMa7N8CVrrEMnFZ9Gwhg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101716521598985992027\">KIN Cafe &amp; Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dHLCE_CvZbt_PqgDDL00lNgD0RQE_FkTepmOPdlX49vxaEgEjLO7eEFj6w2T1VHIsnMLLyrNEsCn5Q7k8hRve6XcXv-Pz3DuygkVrrkUteS7yZglI6k0OJxj-FCrCgfJ4xXlmlbQH0-zxbZKtpz97gGmmSJbxoiKnHNYyK1LigYQsIXWvP_NfqQtfsiBdwq2cX4wf8IEB1IifPRLa9RoO_xjjnT9P1N0mHG4rCsizndpO3qeCZVUwTAivmvpbROMGJcV5RgeRhAAYA2CXeg1bLFXgt5t2K4vXaDi7-5jkbugL-rXEdOIgVnpfilRLZCk-2_1eIc2VeVoOU0RdmY5t534LoYV98f7XmbbF4UjeUEe5DOxV1ENzR2h5LXQ3zaJeqVVZv5FSuQZfKnmoocxJdE4tYhYY8RznuQhcO3vU4qLYf_54ams3W22NoEQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dHLCE_CvZbt_PqgDDL00lNgD0RQE_FkTepmOPdlX49vxaEgEjLO7eEFj6w1200T1VHIsnMLLyrNEsCn5Q7k8hRve6XcXv-Pz3DuygkVrrkUteS7yZglI6k0OJxj-FCrCgfJ4xXlmlbQH0-zxbZKtpz97gGmmSJbxoiKnHNYyK1LigYQsIXWvP_NfqQtfsiBdwq2cX4wf8IEB1IifPRLa9RoO_xjjnT9P1N0mHG4rCsizndpO3qeCZVUwTAivmvpbROMGJcV5RgeRhAAYA2CXeg1bLFXgt5t2K4vXaDi7-5jkbugL-rXEdOIgVnpfilRLZCk-2_1eIc2VeVoOU0RdmY5t534LoYV98f7XmbbF4UjeUEe5DOxV1ENzR2h800LXQ3zaJeqVVZv5FSuQZfKnmoocxJdE4tYhYY8RznuQhcO3vU4qLYf_54ams3W22NoEQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108909631673709804957\">Lydia Edwards</a>"
        ]
      },
      {
        "reference": "AciIO2cKn1ceMIydR1NzkVWANrxKn89GzCbA_iZS16bIRkPRuGBtUv3OzoD53X4wARTD1s4fLnkMbHmNalF7rTWL_rSV5VAh-unFjZ3EE7w2Z4_L2UXtb0rDdxXjMXdePfjl835-4IqO-Cpb8U6zcvQ8VOAupJQ3zb9E1TqXvfGaoBwSCQoIGGHXuvvE4e-9x43iCNxxIxMwZxR1NHNrm6lwxV_9LKQATUxgJVgS4cAi05j6LTeG9Ek7KzyNQeEfRWXH5jkMIKDZs98TgxabgKIqvKtU79gALxvlvuk2eAHZuGGsdfd64ze5kzyhMZz9VGcN2FSaUw7rrPRqT91YgmlGc-xE8n31osq2hoGZlds4KC5bDjrqquXpedWDUOkBgLgL3nqsNkQ7TQ0XHqtr-4fZORGDowtA1HNkP5Jcs0yyGGYDq6bDzS2HxHbPB2dadAfm",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cKn1ceMIydR1NzkVWANrxKn89GzCbA_iZS16bIRkPRuGBtUv3OzoD53X4wARTD1s4fLnkMbHmNalF7rTWL_rSV5VAh-unFjZ3EE7w1200Z4_L2UXtb0rDdxXjMXdePfjl835-4IqO-Cpb8U6zcvQ8VOAupJQ3zb9E1TqXvfGaoBwSCQoIGGHXuvvE4e-9x43iCNxxIxMwZxR1NHNrm6lwxV_9LKQATUxgJVgS4cAi05j6LTeG9Ek7KzyNQeEfRWXH5jkMIKDZs98TgxabgKIqvKtU79gALxvlvuk2eAHZuGGsdfd64ze5kzyhMZz9VGcN2FSaUw7rrPRqT91YgmlGc-xE8n31osq2hoGZlds4KC5bDjrqquXpedWDUOkBgLgL3nqsNkQ7TQ0XHqtr-4fZORGDowtA1HNkP5Jcs0yyGGYDq6bDzS2HxHbPB2dadAfm&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106348652022021986700\">linoynuni</a>"
        ]
      },
      {
        "reference": "AciIO2cpGE8VPpmZOpis7n0aUon9hngaccGRqkJYJSysufwvQYKc0OvC9-CkarGtT1UFgGE1WKTkHcd-lxETvsZ5mdRpocVFsGq0Z8bPQCcrWdrAZ4Xv1llJuBsNvskNYcDjnc85DzSYti5w6b_iwY9Z4SRrJehBWGsKryMGDYFXZ0p67xpXJei9iwOc94zhVStPi390ewnqMRKQK5ljubIHDuScIT49EoAkLKW6g7aUp5EDzRArn1mmRzKWJiw_e9khcO7Gn9NmGeBPBwjNY6TisH4uJG-EV_C8uvBVa8R4DXHdaSLeM7xa38h_8Z9j2zZWeCdzurrT9wGw3-eT9iXdRgFdv_qaHXkMBYTvk5tf8WxRR8r85tSELKla8H13cLqnnKtl73lbMo0xQAHuvzLkLlp_j0GyqYGyod303lkzhEuUQqgSW4hue0vXcMa53KPL",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cpGE8VPpmZOpis7n0aUon9hngaccGRqkJYJSysufwvQYKc0OvC9-CkarGtT1UFgGE1WKTkHcd-lxETvsZ5mdRpocVFsGq0Z8bPQCcrWdrAZ4Xv1llJuBsNvskNYcDjnc85DzSYti5w1200b_iwY9Z4SRrJehBWGsKryMGDYFXZ0p67xpXJei9iwOc94zhVStPi390ewnqMRKQK5ljubIHDuScIT49EoAkLKW6g7aUp5EDzRArn1mmRzKWJiw_e9khcO7Gn9NmGeBPBwjNY6TisH4uJG-EV_C8uvBVa8R4DXHdaSLeM7xa38h_8Z9j2zZWeCdzurrT9wGw3-eT9iXdRgFdv_qaHXkMBYTvk5tf8WxRR8r85tSELKla8H13cLqnnKtl73lbMo0xQAHuvzLkLlp_j0GyqYGyod303lkzhEuUQqgSW4hue0vXcMa53KPL&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108602897782463596094\">C Lu (C LU)</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Yasmin S",
        "rating": 5,
        "text": "This food was absolutely delicious. The dishes were some of the best vegetable focused (rather than imitation meat) dishes I’ve had and is probably one of my favourite vegan restaurants I’ve been to in London.\n\nThe staff were incredibly friendly and the interior was nice. Their chai latte was also great which is hard to find in London.\n\nWould highly recommend.",
        "time": 1760289931,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "Eloise Robbie",
        "rating": 5,
        "text": "I must admit that when I saw how quiet KIN was compared to the other restaurants nearby, I regretted my reservation. However I definitely should not have. My starter (house style aubergine) was one of the best things I’ve ever eaten at a restaurant, and the others in my group also thoroughly enjoyed theirs (croquettes and corn soup). The service was extremely understanding and helpful when I told them about my nut allergy and brought me a different menu. For my main I chose the truffle rosso pasta due to my allergy. The sauce was quite nice - my complaint would be that the pasta was slightly too soft and was falling apart which was likely due to its being gluten free so I understand that was probably unavoidable. The portions were huge so unfortunately I had no space for dessert, but my companions said the black forest tart was fantastic. Highly recommend KIN; favourite dishes were the aubergine and corn soup small plates.",
        "time": 1756276573,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Angela Burnell",
        "rating": 5,
        "text": "Food was intentionally cooked delicious and not greasy at ALL! I had the KIN Brunch special (make it vegan) and it was DIVINE!\nExcellently decorated but the Café is quite cramped.",
        "time": 1759749683,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "L D",
        "rating": 5,
        "text": "Popped in for brunch and already cannot wait for my next visit. The tofu was delicious, and the breakfast burrito was delicious - we were able to swap it to vegetarian rather than vegan. Coffees were good and the service was lovely! Would also love to try their restaurant next door.",
        "time": 1755970088,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Marc Sterland",
        "rating": 5,
        "text": "An Absolute Gem: Ken Cafe & Restaurant!\nWe recently had the pleasure of dining at Ken Cafe and Restaurant, and it was a truly fantastic experience from start to finish. This place is an absolute gem, and it's easy to see why it has such a loyal following.\nFrom the moment we walked in, we were greeted with a warm and welcoming atmosphere. The staff were incredibly friendly, attentive, and genuinely enthusiastic, making us feel right at home. The decor is charming and cozy, creating the perfect setting for a relaxed and enjoyable meal.\nBut the real star of the show is, of course, the food. The menu offers a wonderful variety, with something to satisfy every craving. We were particularly impressed with the fresh ingredients and the obvious care that goes into every dish. Each plate was a work of art, beautifully presented and bursting with flavor. The portion sizes were generous, and the quality was top-notch—a perfect combination of comfort food and culinary excellence.\nWhether you're looking for a quick coffee and a delicious pastry, a hearty lunch, or a celebratory dinner, Ken Cafe delivers on all fronts. We left feeling completely satisfied and already talking about our next visit. If you're in the area and looking for a fantastic meal with great service and a lovely ambiance, do yourself a favor and visit Ken Cafe. You won't be disappointed!",
        "time": 1754086593,
        "relative_time_description": "2 months ago"
      }
    ],
    "types": [
      "bar",
      "cafe",
      "establishment",
      "food",
      "point_of_interest",
      "restaurant",
      "store"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:54:08.001Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:08.001Z",
    "updatedAt": "2025-10-16T20:25:09.207Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "KIN Cafe & Restaurant — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_kin-cafe-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.457Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "KIN Cafe & Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "22 Foley St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 3360
      },
      "url": "https://thebestinlondon.co.uk/restaurant/kin-cafe-restaurant-sMYzvisk",
      "openingHours": [
        "Monday: 9:30 AM – 4:30 PM",
        "Tuesday: 8:30 AM – 10:30 PM",
        "Wednesday: 8:30 AM – 10:30 PM",
        "Thursday: 8:30 AM – 10:30 PM",
        "Friday: 8:30 AM – 10:30 PM",
        "Saturday: 9:30 AM – 10:30 PM",
        "Sunday: 9:30 AM – 10:30 PM"
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
    "image_card_path": "/images/restaurants/kin-cafe-restaurant-sMYzvisk/mediterranean-kin-cafe-restaurant-sMYzvisk-card-63051f21.webp",
    "image_hero_path": "/images/restaurants/kin-cafe-restaurant-sMYzvisk/mediterranean-kin-cafe-restaurant-sMYzvisk-hero-619fd51f.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJL-HmB88EdkgRfH-wI_8ELLQ",
    "slug": "ekstedt-at-the-yard-wI_8ELLQ",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJL-HmB88EdkgRfH-wI_8ELLQ",
    "name": "Ekstedt at The Yard",
    "description": "Where contemporary London meets European flair - think Michelin-starred techniques with a side of British charm. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 706,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "3-5 Great Scotland Yard, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "3-5 Great Scotland Yard, London",
    "postcode": "SW1A 2HN",
    "borough": "Central London",
    "lat": 51.5064253,
    "lng": -0.1261457,
    "phone": "020 7925 4749",
    "phone_international": "+44 20 7925 4749",
    "website": "https://www.ekstedtattheyard.com/",
    "url": "https://maps.google.com/?cid=12982757319664238460",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 6:00 – 9:30 PM",
        "Wednesday: 6:00 – 9:30 PM",
        "Thursday: 6:00 – 9:30 PM",
        "Friday: 6:00 – 9:30 PM",
        "Saturday: 6:00 – 9:30 PM",
        "Sunday: 12:30 – 2:30 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1430"
          },
          "open": {
            "day": 0,
            "time": "1230"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2130"
          },
          "open": {
            "day": 2,
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
            "time": "2130"
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
        "reference": "AciIO2ehrcS6Iy9XnOfHpatr1WSMP78ZK99jSICUVyvSDINrK7Y0Iwek_lnNOfFa7xyB-6619BVFLj1dY1BiEFpmnRyUEbJcKsYYMUSLYLJ-7Lhr4Q7DRzu2Hru3qyzStRH3f3R_qefeQmzohGKyTF0MWbHpwJ5GsiLoOSbGuHO32NApNyATC6FvEptTQlRlkBRlRXHWMf_5judNr1MKeBnQsCLEU9uIYOCSoCHuAWOgdNgMnmQnvwe04nMqvN0pc9UHMxPFc8z5dvta3tvbBpT05mS6WEPgsHvjV7TTN_vyKd0",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ehrcS6Iy9XnOfHpatr1WSMP78ZK99jSICUVyvSDINrK7Y0Iwek_lnNOfFa7xyB-6619BVFLj1dY1BiEFpmnRyUEbJcKsYYMUSLYLJ-7Lhr4Q7DRzu2Hru3qyzStRH3f3R_qefeQmzohGKyTF0MWbHpwJ5GsiLoOSbGuHO32NApNyATC6FvEptTQlRlkBRlRXHWMf_5judNr1MKeBnQsCLEU9uIYOCSoCHuAWOgdNgMnmQnvwe04nMqvN0pc9UHMxPFc8z5dvta3tvbBpT05mS6WEPgsHvjV7TTN_vyKd0&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104117911530716762686\">Ekstedt at The Yard</a>"
        ]
      },
      {
        "reference": "AciIO2cWt_dGWzs6tobyd0287w5hV1SB4U_OrwdLydFfvPu0UUDyb-t0fDW1aQyHKg9DVz_UCD6fwbknHkVzDdxvmu86h95QeVrSkX9hn_B6BFP37IZTd6kZdgVaU2yY9IvBOd6wGo68th6VtceDxaYCCy5ddEWYcxE03NjjKkKFGcS1DqqiQ_tO2_w8BupRZLNZyGdmgvxGwbuSvkEWc0pBKm9JX2ONwAW7OEpm49sUvua1cyfDrpbf2g8JaKBTpDCsy3LQ-V8-yHuRMW2S-cuqWXNRs-k2yeT5pSs7fihWqfQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cWt_dGWzs6tobyd0287w1200hV1SB4U_OrwdLydFfvPu0UUDyb-t0fDW1aQyHKg9DVz_UCD6fwbknHkVzDdxvmu86h800QeVrSkX9hn_B6BFP37IZTd6kZdgVaU2yY9IvBOd6wGo68th6VtceDxaYCCy5ddEWYcxE03NjjKkKFGcS1DqqiQ_tO2_w8BupRZLNZyGdmgvxGwbuSvkEWc0pBKm9JX2ONwAW7OEpm49sUvua1cyfDrpbf2g8JaKBTpDCsy3LQ-V8-yHuRMW2S-cuqWXNRs-k2yeT5pSs7fihWqfQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104117911530716762686\">Ekstedt at The Yard</a>"
        ]
      },
      {
        "reference": "AciIO2f22cRF6mgxg1MrJiPGII6087h5kImFu2gti5q-d7eHRPoTJ_QG9unUOtQhl68Syt0e4ioUoZzWoe083wrXGhO1L2fkh5nOxneBXfftHMPnvxVnJR0EuJr1zS--NwACLh50I54EQIWSrHbh28tz_M6l3OT93BYjllXEoicIGUnfMpHvp9dFGWxXf8MF2ZrTX1UsdAFDuTiA4vlpXtwrUNhcBuRsoXyG9eHy2DqencXGotpFZ8sAEbZW27cKsKS9TU99iud3o32FfHoWEkaO5rsXpJ_pegOMEyziSDo9ap5qGK5m6CfHaJl1yAExLxKIosRwlA-uP7ADyrwT9QpsfQi95-_gEHivjz8XacErMUXhwyEvp4p84hT3LhKHwmsp17pwEIiI42slU4GehqvalGKOYj8aLgHfz2Q9U4DPHaBcGzmRe-d9mOAukK2k_g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f22cRF6mgxg1MrJiPGII6087h800kImFu2gti5q-d7eHRPoTJ_QG9unUOtQhl68Syt0e4ioUoZzWoe083wrXGhO1L2fkh5nOxneBXfftHMPnvxVnJR0EuJr1zS--NwACLh50I54EQIWSrHbh28tz_M6l3OT93BYjllXEoicIGUnfMpHvp9dFGWxXf8MF2ZrTX1UsdAFDuTiA4vlpXtwrUNhcBuRsoXyG9eHy2DqencXGotpFZ8sAEbZW27cKsKS9TU99iud3o32FfHoWEkaO5rsXpJ_pegOMEyziSDo9ap5qGK5m6CfHaJl1yAExLxKIosRwlA-uP7ADyrwT9QpsfQi95-_gEHivjz8XacErMUXhwyEvp4p84hT3LhKHwmsp17pwEIiI42slU4GehqvalGKOYj8aLgHfz2Q9U4DPHaBcGzmRe-d9mOAukK2k_g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112260743520617967252\">Stefano Malachi</a>"
        ]
      },
      {
        "reference": "AciIO2eBCpbHYDtuZ3R5CUxvOXmLDnFaHpWFKBi50y-ZovtogtvAgW4ldWkGb_Gyy0KgrYoE6BSPdR7qGAgkFfhEyqObbHUBKVrFaMgLXqXgir6PAqb3V1_EELWVUeosm5l1b5AavynFr2K6pk8hhcsl2B1FWKW6iiImoYxSz9pnNik31w7G9FaEhOej9ee9jxV2tDNsZMzoV-HP6tUgef5ScYVjVp5xCOKKUNlVtE0mFO5tSkffL-Sci_mzj2jsb5JaVZKxb8WSF3eL3H8WlhEWIgPOcgkBw6FUjg4tjfWrQa1UnrXDQzxn3gNBWp0uPvrUE9fL0HrwogRxJRZj8mgD7EPiM-neRKShedvKMVGVYnZJcCQXWdelAC4EwsCio3U0EC4DMzlkZtiEZrqud7NJHmLJCxYVJm5THw1LBVuL1MmBKno-",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eBCpbHYDtuZ3R5CUxvOXmLDnFaHpWFKBi50y-ZovtogtvAgW4ldWkGb_Gyy0KgrYoE6BSPdR7qGAgkFfhEyqObbHUBKVrFaMgLXqXgir6PAqb3V1_EELWVUeosm5l1b5AavynFr2K6pk8hhcsl2B1FWKW6iiImoYxSz9pnNik31w1200G9FaEhOej9ee9jxV2tDNsZMzoV-HP6tUgef5ScYVjVp5xCOKKUNlVtE0mFO5tSkffL-Sci_mzj2jsb5JaVZKxb8WSF3eL3H8WlhEWIgPOcgkBw6FUjg4tjfWrQa1UnrXDQzxn3gNBWp0uPvrUE9fL0HrwogRxJRZj8mgD7EPiM-neRKShedvKMVGVYnZJcCQXWdelAC4EwsCio3U0EC4DMzlkZtiEZrqud7NJHmLJCxYVJm5THw1LBVuL1MmBKno-&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/108126606393253549862\">Ella Glazier</a>"
        ]
      },
      {
        "reference": "AciIO2dT62WgmJnJVwIJkXoUwpBEMi82DsD9FqoTUdYHTk2w2byr8xbAZMQiUHQvT8URDANc3zKUTBoPVXdPcFCNCDRpXlGcBPV1ubVfX_UCAOO-m08prvAzew_g4W7dZQOIZMzoSY1VWPelPCQ7fVauxmzgi_Yqja74Jw0xOcGRbvawujrvFLQrIss27u2JS82UNz8epUJiWFxbp70HexZWME3JsfEBUjM2DKBx7554nlrc3PmhjrRCA7NDxa9uLOFaonXSEfyIIR3Iteyut1Hi0lRQ8J6Fcr6qjD0c71pQMWJ0xoXp7YfWVaL32gzDdCv_a47xNSmqR8uQMaSpS2wxMObFvp6QqdSLzxfua7kUtMtl5qqYSX-I7vK6AGDyGa26gmDpngZC4XHEJ9R0zWsisC7KMBBvvOhHB8S-IxKvwA2z1ztKYCzqRPGqxz7gR83A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dT62WgmJnJVwIJkXoUwpBEMi82DsD9FqoTUdYHTk2w1200byr8xbAZMQiUHQvT8URDANc3zKUTBoPVXdPcFCNCDRpXlGcBPV1ubVfX_UCAOO-m08prvAzew_g4W7dZQOIZMzoSY1VWPelPCQ7fVauxmzgi_Yqja74Jw0xOcGRbvawujrvFLQrIss27u2JS82UNz8epUJiWFxbp70HexZWME3JsfEBUjM2DKBx7554nlrc3PmhjrRCA7NDxa9uLOFaonXSEfyIIR3Iteyut1Hi0lRQ8J6Fcr6qjD0c71pQMWJ0xoXp7YfWVaL32gzDdCv_a47xNSmqR8uQMaSpS2wxMObFvp6QqdSLzxfua7kUtMtl5qqYSX-I7vK6AGDyGa26gmDpngZC4XHEJ9R0zWsisC7KMBBvvOhHB8S-IxKvwA2z1ztKYCzqRPGqxz7gR83A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112260743520617967252\">Stefano Malachi</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Farid Babayev",
        "rating": 5,
        "text": "It would be a shame to give this place just 4 stars — I’m not even talking about 3 or 2.\n\nAbsolutely everything was perfect, from the service to the food, and how we were treated.\n\nThey even invited us into the kitchen, which was a very special experience. Each dish was better than the one before — truly impressive.\n\nI always choose restaurants very carefully, and I can proudly say that this one is going straight to the top of my list.\n\nThe atmosphere was also really pleasant.\nDefinitely coming back.",
        "time": 1758457932,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Agustin Dal Lago",
        "rating": 5,
        "text": "Amazing experience in this unique restaurant.\n\nWe tried the Scandinavian journey experience+ the volcanic wines pairing.\n\nWe particularly loved the lobster and the fir potatoes dishes. Insanely delicious sauce and smokey flavours.\n\nThe step that involved seeing the oyster being cooked in the kitchen was particularly fun and unexpected.\n\nThe wine pairings were in general very good. We normally don't like white wines that much but these ones particularly well chosen and not too acidic / sour for our taste.\n\nThe only thing we found a bit off was how long it took us to be served from the moment we arrived (about half an hour).\n\nOverall the dinner was fantastic, bold flavours, lots of theatrics and creative food combinations. It was lovely to celebrate my birthday here.\n\nThanks",
        "time": 1750009065,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Stefano Malachi",
        "rating": 5,
        "text": "Embark on a culinary voyage to Scandinavia at Ekstedt at The Yard, a London masterpiece from the visionary Michelin-starred chef, Niklas Ekstedt. Nestled within the grandeur of the Great Scotland Yard Hotel, this restaurant redefines luxury dining with its masterful approach to wood-fired cooking. The ultimate indulgence awaits with the “Journey to Scandinavia,” a seven-course tasting menu paired with an exclusive volcanic wine selection. Så kul att vara tillbaka på denna ikoniska nordiska restaurang 🇸🇪",
        "time": 1760218854,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "AKA -",
        "rating": 5,
        "text": "Amazing dinner experience. Located in the Scotland Yard hotel. The food is really fabulous and the wine pairing was fantastic. Wine I didn't like by itself but with the food was fabulous. So cool how it actually changes with the food.",
        "time": 1756803024,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "D K",
        "rating": 5,
        "text": "Journey to Scandinavia with the volcanic wine tasting.\nFelt really welcomed here, they took good care of me both in entertaining and food wise, food was extraordinary and will definitely try to get there again. pictures speak for themselves.",
        "time": 1755869736,
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
    "lastVerifiedGoogle": "2025-10-15T10:54:10.493Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:10.493Z",
    "updatedAt": "2025-10-16T20:25:12.491Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Ekstedt at The Yard — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_ekstedt-at-the-yard_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.458Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Ekstedt at The Yard",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3-5 Great Scotland Yard, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 706
      },
      "url": "https://thebestinlondon.co.uk/restaurant/ekstedt-at-the-yard-wI_8ELLQ",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 6:00 – 9:30 PM",
        "Wednesday: 6:00 – 9:30 PM",
        "Thursday: 6:00 – 9:30 PM",
        "Friday: 6:00 – 9:30 PM",
        "Saturday: 6:00 – 9:30 PM",
        "Sunday: 12:30 – 2:30 PM"
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
    "image_card_path": "/images/restaurants/ekstedt-at-the-yard-wI_8ELLQ/mediterranean-ekstedt-at-the-yard-wI_8ELLQ-card-4d748c8e.webp",
    "image_hero_path": "/images/restaurants/ekstedt-at-the-yard-wI_8ELLQ/mediterranean-ekstedt-at-the-yard-wI_8ELLQ-hero-0ce57e2f.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ921POt8bdkgRwx80KJsqCRk",
    "slug": "restaurant-st-barts-0KJsqCRk",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ921POt8bdkgRwx80KJsqCRk",
    "name": "Restaurant St. Barts",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 410,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "Queen Elizabeth II Wing, 63 Bartholomew Cl, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Queen Elizabeth II Wing, 63 Bartholomew Cl, London",
    "postcode": "EC1A 7BF",
    "borough": "Central London",
    "lat": 51.518365,
    "lng": -0.09928519999999999,
    "phone": "020 4547 7985",
    "phone_international": "+44 20 4547 7985",
    "website": "https://www.restaurant-stbarts.co.uk/",
    "url": "https://maps.google.com/?cid=1804019971621396419",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Thursday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Friday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Saturday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Sunday: Closed"
      ],
      "periods": [
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
            "time": "2000"
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
            "time": "2000"
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
            "time": "2000"
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
            "time": "2000"
          },
          "open": {
            "day": 5,
            "time": "1800"
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
            "time": "2000"
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
        "reference": "AciIO2d4ibQJNXe6OGymukv2tpbHHhttPfa03sZ4dG-MO0caeGJKtWGxeRUglkdJCoRoL2olEyNX40RU7gvneqp2mTODLc3fGiabvZ9lmK7AEpLKOzW5ESmuQd50Dx-MuC0kucA9dIO-f9fkmd4HN5GrUndq5WWYc8WNM_zyDljFxq0NS1_A7YawkgfsdZ9j84O7I5XYIVRRSLnK6_7cHoVocIqA34us-VocjIvsJb8MsJKp5YTck_HAfUnCKhMQMZuN2wD00kWpe3lMXsZg74y64U_j2jbVvuHjoN5ZlxZVIIhaXw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d4ibQJNXe6OGymukv2tpbHHhttPfa03sZ4dG-MO0caeGJKtWGxeRUglkdJCoRoL2olEyNX40RU7gvneqp2mTODLc3fGiabvZ9lmK7AEpLKOzW5ESmuQd50Dx-MuC0kucA9dIO-f9fkmd4HN5GrUndq5WWYc8WNM_zyDljFxq0NS1_A7YawkgfsdZ9j84O7I5XYIVRRSLnK6_7cHoVocIqA34us-VocjIvsJb8MsJKp5YTck_HAfUnCKhMQMZuN2wD00kWpe3lMXsZg74y64U_j2jbVvuHjoN5ZlxZVIIhaXw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109400282463212730261\">Restaurant St. Barts</a>"
        ]
      },
      {
        "reference": "AciIO2cJHCz88_scht35hhxHVgNyqeE4Z017B2ecrEjaZZPhV_4n8K5vVVI0VH0FVeRwQlan_JwIhaT75Qkl823eOhg-4GeD_7fUYqDfb3XPccjLmBK6dSFkSJSKfkgXfVkNifq8xHwV5D4RvzY7Em8_IlwNAXg8V6QyKCZyhixjTkjD2KMZ0el6h_BUh3Kt2gkPCt23X13jE4XOPWcbF5qUEQcGx7DMRUNf01LyU7p3iRqUSWZoeGZF7UkCW1e5yRE4p_AEoLEL_VjYHYmBX_pOV2qxSBizfl1Y3ZQHPl5PYUEXZg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cJHCz88_scht35hhxHVgNyqeE4Z017B2ecrEjaZZPhV_4n8K5vVVI0VH0FVeRwQlan_JwIhaT75Qkl823eOhg-4GeD_7fUYqDfb3XPccjLmBK6dSFkSJSKfkgXfVkNifq8xHwV5D4RvzY7Em8_IlwNAXg8V6QyKCZyhixjTkjD2KMZ0el6h_BUh800Kt2gkPCt23X13jE4XOPWcbF5qUEQcGx7DMRUNf01LyU7p3iRqUSWZoeGZF7UkCW1e5yRE4p_AEoLEL_VjYHYmBX_pOV2qxSBizfl1Y3ZQHPl5PYUEXZg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109400282463212730261\">Restaurant St. Barts</a>"
        ]
      },
      {
        "reference": "AciIO2f9dLtkUk6vfT-LhQdxh5y5NHNvz0fSxhKtDGCy2t6znI1a9JOF4qZy6r9cfL3CmAVIG9eAgMehBW-fWT-bMerd7fsrsmM4PDdBS3hKGCEKHX9q27t7LzT8iBTuKKReWRWznlB_T4dCnHnIyfVMKt-6e6vWWyjYWD5vWGUYj20LaHGIziTUIovrWTsmWpVpchtJZi1DNj44tGIPKaC5sy7_JptGee4e3rWt8cH07C2Hy3YkNhINjh4dEst0V3eiOiZDDE5iIElwaM5DFjExh2lcKDpLnFVbOERW-4ENzCzjT6Xzvaf68IWSg9oxMldlHmlqtPhtzaPoBO1qfKJyko9oNJ1N9hhAmvWUaR5Ejv4tpr-bJcW0lgrR0egM8m7woKpdDrQl6b2yveh-jb09lhi93Qcjn_mRk0R4wkLVzgqCYGifOvyFOHo4szbkDA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f9dLtkUk6vfT-LhQdxh800y5NHNvz0fSxhKtDGCy2t6znI1a9JOF4qZy6r9cfL3CmAVIG9eAgMehBW-fWT-bMerd7fsrsmM4PDdBS3hKGCEKHX9q27t7LzT8iBTuKKReWRWznlB_T4dCnHnIyfVMKt-6e6vWWyjYWD5vWGUYj20LaHGIziTUIovrWTsmWpVpchtJZi1DNj44tGIPKaC5sy7_JptGee4e3rWt8cH07C2Hy3YkNhINjh4dEst0V3eiOiZDDE5iIElwaM5DFjExh2lcKDpLnFVbOERW-4ENzCzjT6Xzvaf68IWSg9oxMldlHmlqtPhtzaPoBO1qfKJyko9oNJ1N9hhAmvWUaR5Ejv4tpr-bJcW0lgrR0egM8m7woKpdDrQl6b2yveh-jb09lhi93Qcjn_mRk0R4wkLVzgqCYGifOvyFOHo4szbkDA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107305134760737239899\">Matthew de Monte</a>"
        ]
      },
      {
        "reference": "AciIO2dCUDXgtffdfK-M5ndj36VQXriY09_6WMUS3crXvvnDo0N6yes0i3ZWCTD_yr8Yt3Hxfvr2hwXOeYxolk3oyMK3hjUIO-Xr2QTC4d_DWKTKyWIl1bKUu5hQ_kJKwrJetEk14EXa1EiTbZEMI8YYU08IXo-WBzIf8as8w1WimrUFWtVWsxxdUHzXXNnW13kBjiMZHbez3PQiEAalvWIYNoVrQULy9MrNCelM5TXuwxsHj3FWVRKUXsYZWtzUlQ8kQ-bPlfmBp-s72EgWrRD1zW-NQskUXL18L1uK3HrUPsWupXJgWLYHyvuCheWjI5q0dRvbq80JwqKXCoxdeVM6mY99HmjDb0laVBLxkpcY_vwECuyZK-tpWuQzgo80CfYS_bDoK0SMBkmTorZuR7Ex4EWoYbXFu00AZqC5tz-fpJdywcZrqrQYWgXG351gudiR",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dCUDXgtffdfK-M5ndj36VQXriY09_6WMUS3crXvvnDo0N6yes0i3ZWCTD_yr8Yt3Hxfvr2hwXOeYxolk3oyMK3hjUIO-Xr2QTC4d_DWKTKyWIl1bKUu5hQ_kJKwrJetEk14EXa1EiTbZEMI8YYU08IXo-WBzIf8as8w1200WimrUFWtVWsxxdUHzXXNnW13kBjiMZHbez3PQiEAalvWIYNoVrQULy9MrNCelM5TXuwxsHj3FWVRKUXsYZWtzUlQ8kQ-bPlfmBp-s72EgWrRD1zW-NQskUXL18L1uK3HrUPsWupXJgWLYHyvuCheWjI5q0dRvbq80JwqKXCoxdeVM6mY99HmjDb0laVBLxkpcY_vwECuyZK-tpWuQzgo80CfYS_bDoK0SMBkmTorZuR7Ex4EWoYbXFu00AZqC5tz-fpJdywcZrqrQYWgXG351gudiR&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116899214024286657106\">Grace Yeung</a>"
        ]
      },
      {
        "reference": "AciIO2cAGTA08u1nCmAacaKbWRkTc-ubEbEuapxYvLQbV3AsMqTMU-d04Pa0Kx0UzNxLQBM_xulSzJ8Nh8p6a484D1I2124zFkdO5pjOb2NfxyiyT6NrnlXO6wt0Yh6y6S7aEzWL09k0DnUNxGMyd6ko6WvODwfe7QUx-yH1mquHt2WVqYJXot9eu_kdEqRcDtRGf6Opy7EHcKYU1YHgKLJ9cblXEzOArIi0RfB_d_2JwDpjUaDnwaG0_TRLWx3zZxlY9_XrW5EmIaRmwTaJoBpgr0jCi5EUq6pMAShWuJ8QopF5jxNHnGuaBHbDp2QM4llG5SQNjjNsvYLl6ZSW2UUrHkgZIP3dFPLDEXgKqgGarOCr7cBI6IAL-uCh2usb1a6WVjzxNWAR4l2DiBbE53m5Tqy4Mws-0tYyJwOfZbPZnQyT2jY8MtwZCzLtTgNUZJi1",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cAGTA08u1nCmAacaKbWRkTc-ubEbEuapxYvLQbV3AsMqTMU-d04Pa0Kx0UzNxLQBM_xulSzJ8Nh800p6a484D1I2124zFkdO5pjOb2NfxyiyT6NrnlXO6wt0Yh6y6S7aEzWL09k0DnUNxGMyd6ko6WvODwfe7QUx-yH1mquHt2WVqYJXot9eu_kdEqRcDtRGf6Opy7EHcKYU1YHgKLJ9cblXEzOArIi0RfB_d_2JwDpjUaDnwaG0_TRLWx3zZxlY9_XrW5EmIaRmwTaJoBpgr0jCi5EUq6pMAShWuJ8QopF5jxNHnGuaBHbDp2QM4llG5SQNjjNsvYLl6ZSW2UUrHkgZIP3dFPLDEXgKqgGarOCr7cBI6IAL-uCh2usb1a6WVjzxNWAR4l2DiBbE53m5Tqy4Mws-0tYyJwOfZbPZnQyT2jY8MtwZCzLtTgNUZJi1&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107305134760737239899\">Matthew de Monte</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "James Samworth",
        "rating": 5,
        "text": "Simply wonderful restaurant and evening. We went as a very special birthday treat and it was amazing. The food and wine were incredibly tasty and original - all British ingredients. The most lovely thing though was the staff who clearly loved the food, wine and the job. They took time to explain the dishes, show our son the kitchen and make we had a wonderful time.",
        "time": 1754763164,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Tom Grater",
        "rating": 5,
        "text": "Beautiful setting for a classy, refined tasting experience focused on British seasonal produce with superbly curated wine pairings. The dining room is beautiful and the service is 10/10 from the moment you enter til when you leave. We adored all the courses - 10/10 for all the fish, sweetcorn, and the puds - just the duck wasn’t great, skin was chewy and it lacked flavour and was a bit dry. Can’t say enough for the wine pairings, some of the most expertly matched to the dishes I’ve seen. Loved it and will be back.",
        "time": 1755285965,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Rajiv Joshi",
        "rating": 5,
        "text": "St Bart’s Restaurant sits beside the historic St Bartholomew the Great, the oldest surviving church in London, a location as atmospheric as it is iconic. With floor to ceiling windows framing the church’s ancient stonework, the dining room is beautifully curated with striking artworks, bespoke cutlery, and a warm, understated welcome that sets the tone for an extraordinary experience.\n\nIn a playful touch, the menu arrives closed, left to the guest’s discretion to open, offering the option of preserving an element of surprise. This sense of discovery is mirrored in the food itself.\n\nEvery ingredient is sourced from within the British Isles, but the culinary influences reach far beyond, weaving flavours from across Europe and Asia. Standout dishes like the squid noodles, the signature Hobnob, and even the opening sip of house made kombucha showcase remarkable depth, precision, and flair. Each bite was bold, layered, and thought provoking.\n\nWe opted for the wine pairing, which proved to be an inspired decision. Spanning vineyards across Europe and as far as Lebanon, each pour was thoughtfully chosen to complement and elevate the flavours on the plate.\n\nService was exceptional throughout, attentive without being intrusive. A heartfelt thank you to Oren and his team for making the experience feel both intimate and seamless.\n\nIt is clear why St Bart’s is the only restaurant in the UK to hold both a Michelin Star and a Green Michelin Star. It is not just a meal, it is a journey. One that lingers long after the final course. An unmissable destination for anyone serious about food.",
        "time": 1751097415,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Nizam Hamid",
        "rating": 5,
        "text": "Fantastic tasting menu with wonderful service with real attention to detail and personal food requirements. Excellent flavours and ingredients with delightful presentation. The lunch time shorter menu is excellent value.",
        "time": 1755028318,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Ellen Baluta",
        "rating": 5,
        "text": "I hosted a private dinner for 18 people at Restaurant St. Bart’s and it was an unforgettable experience. The space is absolutely beautiful with a warm, Scandinavian vibe that felt both elevated and inviting. The food was out of this world. Every course was so thoughtfully prepared and full of flavour. I completely forgot to take photos because I was too busy enjoying it all. The highlight of the night was hands down the dessert. It was the perfect ending to a flawless evening.",
        "time": 1749642942,
        "relative_time_description": "4 months ago"
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
    "fsa_authority": "City of London Corporation",
    "fsa_url": "https://ratings.food.gov.uk/business/1609414",
    "fsa_last_inspection": "2025-03-10T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:11.008Z",
    "lastVerifiedFSA": "2025-10-16T23:20:43.105Z",
    "createdAt": "2025-10-15T10:54:11.008Z",
    "updatedAt": "2025-10-16T20:25:13.084Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Restaurant St. Barts — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_restaurant-st-barts_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.459Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Restaurant St. Barts",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Queen Elizabeth II Wing, 63 Bartholomew Cl, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 410
      },
      "url": "https://thebestinlondon.co.uk/restaurant/restaurant-st-barts-0KJsqCRk",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Wednesday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Thursday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Friday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
        "Saturday: 12:00 – 3:00 PM, 6:00 – 8:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/restaurant-st-barts-0KJsqCRk/mediterranean-restaurant-st-barts-0KJsqCRk-card-e03fb520.webp",
    "image_hero_path": "/images/restaurants/restaurant-st-barts-0KJsqCRk/mediterranean-restaurant-st-barts-0KJsqCRk-hero-99ffc5d8.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ3aa-YCkbdkgRo5LPUQzy0hI",
    "slug": "kitchen-table-PUQzy0hI",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ3aa-YCkbdkgRo5LPUQzy0hI",
    "name": "Kitchen Table",
    "description": "19-seat U-shaped table around a cooking station, with a multi-course menu of small European dishes.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "restaurant",
      "fine-dining"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 546,
    "price_level": 4,
    "price_range": "££££",
    "address": {
      "formatted": "70 Charlotte St., London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "70 Charlotte St., London",
    "postcode": "W1T 4QG",
    "borough": "Central London",
    "lat": 51.5203787,
    "lng": -0.1365322,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "http://kitchentablelondon.co.uk/",
    "url": "https://maps.google.com/?cid=1356412572518027939",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: Closed",
        "Tuesday: 6:30 – 11:30 PM",
        "Wednesday: 6:30 – 11:30 PM",
        "Thursday: 5:30 – 11:30 PM",
        "Friday: 5:30 – 11:30 PM",
        "Saturday: Closed",
        "Sunday: Closed"
      ],
      "periods": [
        {
          "close": {
            "day": 2,
            "time": "2330"
          },
          "open": {
            "day": 2,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2330"
          },
          "open": {
            "day": 3,
            "time": "1830"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2330"
          },
          "open": {
            "day": 4,
            "time": "1730"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2330"
          },
          "open": {
            "day": 5,
            "time": "1730"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2cJwlvG41jgMoA78xfmRffjSS6fogr3BMePfdCuilibkOVQ8TEgNPMUKydH_4_pBDKsbmZgltWbxkLjVzm_z0ccxt1nZnRe-AbQb7cfwcMrtIpa0Un_ncAPzH5hhZ85OoUa2bJPqe81x9rTX2t5B0Rx9TjmtCl6R4AX05VINgS_tbLMo9Fl74ljpKuwETWnAlaGZ5TiO5fv-VSbBreuqCFHAAHBV1mhG-qzVpegXJIn-9Lqs4VpUyefJoRAS0hfYV1oXkr2gtgoj7Rg4mx_higf3Rtg5RStK1VfanFxJ1DCzg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cJwlvG41jgMoA78xfmRffjSS6fogr3BMePfdCuilibkOVQ8TEgNPMUKydH_4_pBDKsbmZgltWbxkLjVzm_z0ccxt1nZnRe-AbQb7cfwcMrtIpa0Un_ncAPzH5hhZ85OoUa2bJPqe81x9rTX2t5B0Rx9TjmtCl6R4AX05VINgS_tbLMo9Fl74ljpKuwETWnAlaGZ5TiO5fv-VSbBreuqCFHAAHBV1mhG-qzVpegXJIn-9Lqs4VpUyefJoRAS0hfYV1oXkr2gtgoj7Rg4mx_higf3Rtg5RStK1VfanFxJ1DCzg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107059866798836552235\">Kitchen Table</a>"
        ]
      },
      {
        "reference": "AciIO2e-OqnZWJ4B-QzNd-n7lBxTMZoSN-rVHtnjoB4p99XPAa0O3vvGvaHdFKOuqTFR7jU5G2UCU4gNc2CzpkkAbNOa90-s8ypI7XBGlbKfbyiuGmta2Fh7WJkImjkT95aTfCMoDU5PpWJtijGPHipT6cgXcdsre_8cH2M0ceAXgVTe0aBbyn5c9pCeK1n4DHHGS7wnaG_1ExEYYf7LiihiqXDJQ2SBDpf7WqBzC357bcwcbR4AW8GufnGHwz6ALEZ7-B7xkzglpsnMiqPwE7n-Af1h4yWXAIrwwgyd_916-Z8gAifqFbHPczS0PeIzaBR_kICgZeGmk403G4_3pMRgzFYE8Ods0wXSZGMRCBytcEz8b85bvpa9UjZ8U8YSJ42Si7i62Y5_wjVI8TLNoGjLAIwWPU37QFNr58iIl476Z6mpdb4EPkPy5zj8REq6dL-y",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e-OqnZWJ4B-QzNd-n7lBxTMZoSN-rVHtnjoB4p99XPAa0O3vvGvaHdFKOuqTFR7jU5G2UCU4gNc2CzpkkAbNOa90-s8ypI7XBGlbKfbyiuGmta2Fh800WJkImjkT95aTfCMoDU5PpWJtijGPHipT6cgXcdsre_8cH2M0ceAXgVTe0aBbyn5c9pCeK1n4DHHGS7wnaG_1ExEYYf7LiihiqXDJQ2SBDpf7WqBzC357bcwcbR4AW8GufnGHwz6ALEZ7-B7xkzglpsnMiqPwE7n-Af1h4yWXAIrwwgyd_916-Z8gAifqFbHPczS0PeIzaBR_kICgZeGmk403G4_3pMRgzFYE8Ods0wXSZGMRCBytcEz8b85bvpa9UjZ8U8YSJ42Si7i62Y5_wjVI8TLNoGjLAIwWPU37QFNr58iIl476Z6mpdb4EPkPy5zj8REq6dL-y&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110105400563689812438\">Kenny Wong</a>"
        ]
      },
      {
        "reference": "AciIO2fQAQuqihPasBTz65MZ-MdaF0KPW5bFuevLx0-BR_wPJPPl_YIZwAlGHdE9aahCqF3EgckImhf5dGw6KTMqAn7xsWfu97u3MVM5CkmwZVkICNt42zTe29oUVDBy8zw_tVHXsz5o07ArrN-NKnTtv1GVPmMrTrVvXyvVP-hCO0qS-7czTcCFSkNF8jUhlTNo5wMx6ylQlJrXdBdpxw5gF8Uzw9-Obc6lYnfv-4zXk0cGgNgkzQNDSbrE3coXI3PGDa5pwM_har_VJsjuXvGH9Sti_nMtw3oNKvMPes_DaHDkaw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fQAQuqihPasBTz65MZ-MdaF0KPW5bFuevLx0-BR_wPJPPl_YIZwAlGHdE9aahCqF3EgckImhf5dGw1200KTMqAn7xsWfu97u3MVM5CkmwZVkICNt42zTe29oUVDBy8zw_tVHXsz5o07ArrN-NKnTtv1GVPmMrTrVvXyvVP-hCO0qS-7czTcCFSkNF8jUhlTNo5wMx6ylQlJrXdBdpxw5gF8Uzw9-Obc6lYnfv-4zXk0cGgNgkzQNDSbrE3coXI3PGDa5pwM_har_VJsjuXvGH9Sti_nMtw3oNKvMPes_DaHDkaw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107059866798836552235\">Kitchen Table</a>"
        ]
      },
      {
        "reference": "AciIO2fXFBcg912Td9XGA2gM93_v72oeo7COS4bruCmsRJcezm3Gls2l6m2MaCVtkvmSZvVx5LP7ROmu71God4bmj0cUTYgglQ3gJTY2ayn7rOQBCV7i-QZUHVRMRJ1gn7hmTAuSeOYakGGDStLZpAeUrMKM5wSMk0Of5GUvazTsAdxyJHR_SmCbEEaUnYHd2ONs6L92YAPFQqBVBQhl_IK0sVy1DNDuSIA_oNO_yGhJvgEld7QsKQPx39iY0uUcUqVIzs35M6SpFo0RPQ-zP5PBtxQnd3-QnBjy2yq_8wdxIBIAETNlTbdpBnMWFcBR2sgigIh6HEsM0EfbTbb0dMZhcRKSKO-vcjeSdz3WBZYLfnZdhLVpy3FL-caJ5oheEZKPCC4TTx24Dq_PHMZfw-g0982kDa2dQTSPgYOHHXMcOvVAk7-DryGP1YGoNKOiMMzW",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fXFBcg912Td9XGA2gM93_v72oeo7COS4bruCmsRJcezm3Gls2l6m2MaCVtkvmSZvVx5LP7ROmu71God4bmj0cUTYgglQ3gJTY2ayn7rOQBCV7i-QZUHVRMRJ1gn7hmTAuSeOYakGGDStLZpAeUrMKM5wSMk0Of5GUvazTsAdxyJHR_SmCbEEaUnYHd2ONs6L92YAPFQqBVBQhl_IK0sVy1DNDuSIA_oNO_yGhJvgEld7QsKQPx39iY0uUcUqVIzs35M6SpFo0RPQ-zP5PBtxQnd3-QnBjy2yq_8wdxIBIAETNlTbdpBnMWFcBR2sgigIh800HEsM0EfbTbb0dMZhcRKSKO-vcjeSdz3WBZYLfnZdhLVpy3FL-caJ5oheEZKPCC4TTx24Dq_PHMZfw-g0982kDa2dQTSPgYOHHXMcOvVAk7-DryGP1YGoNKOiMMzW&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116899214024286657106\">Grace Yeung</a>"
        ]
      },
      {
        "reference": "AciIO2cD28bcbViBGmJAbgld7plz0hffyFBLxSAOtUSGNgZ9nqTdDMyLjhdl1FT1qfyuUilVKN7z7uA4Dr6HcSTbVt3PMzuaDZFAfNo-_8NJ1uPuUrnEqXc4VObX9CaFJbMw3ilKvcj2JXVuKpDj1EkZ7k8t24v-TWPB2TPgq9VbDBekH3g7PIEoCWEd76sJqmVv5ygiFe52KRwAOeQnBdSNGFlpLqTGbOG7FTHShQzQYE8XiQiPuCevLvUEd5LgLsKpYDwZETWaAlfozhfuXe1FFuYlOIqVUhT7g1fnGEI3lzffUBQ_Bx2akf2vneKvW4FuS1sAJmxXFXx4Gk6y9BcqTpd0AgNrfj9EhLNO5IBiPyp0vIlOzVGhxyA6ktK8PkCcNFUlKkx8q98_Q_Ph-XUbus16wcPF45V-1z3-JhMX9cVoX4v-",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cD28bcbViBGmJAbgld7plz0hffyFBLxSAOtUSGNgZ9nqTdDMyLjhdl1FT1qfyuUilVKN7z7uA4Dr6HcSTbVt3PMzuaDZFAfNo-_8NJ1uPuUrnEqXc4VObX9CaFJbMw1200ilKvcj2JXVuKpDj1EkZ7k8t24v-TWPB2TPgq9VbDBekH3g7PIEoCWEd76sJqmVv5ygiFe52KRwAOeQnBdSNGFlpLqTGbOG7FTHShQzQYE8XiQiPuCevLvUEd5LgLsKpYDwZETWaAlfozhfuXe1FFuYlOIqVUhT7g1fnGEI3lzffUBQ_Bx2akf2vneKvW4FuS1sAJmxXFXx4Gk6y9BcqTpd0AgNrfj9EhLNO5IBiPyp0vIlOzVGhxyA6ktK8PkCcNFUlKkx8q98_Q_Ph-XUbus16wcPF45V-1z3-JhMX9cVoX4v-&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102247754483505234805\">ALPHA MadNETIC</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Kenny Wong",
        "rating": 2,
        "text": "My 4th visit and for the first time I went for pescatarian menu, honestly I was disappointed. While my fellow diners were enjoying the normal menu, I felt like a vegetarian. I was expecting the kitchen to replace the beef and duck with seafoods instead of pure vegetables. I wouldn’t have gone for the menu if I knew that was the case, huge anticipation ended in disappointment. I was later advised and the veggie replacements were advertised but wasn’t obvious to me, maybe they shouldn’t call this a pescatarian menu.\n\nMore seriously, I don’t know how a professional kitchen really functions, but seeing chefs putting spoons in their mouth for tasting, then put it to a communal pot, nothing wrong with that.  But, then other utensils were taken from the same pot to stir the dishes before plating?! I was quite shocked/disgusted to see that, raised to the waiters but was told the chefs didn’t put the spoon in their mouth. By then I observed two incidents! A small discussion was going on in the kitchen then the communal pot was removed in front of me to the other end of the kitchen. It didn’t address the problem at all, did it? If it wasn’t for my friend’s celebration, I would simply walk out. I don’t know how 2 stars were granted if hygiene was one big factor.\n\nThough some of the dishes had interesting flavours, but the hygiene experience totally ruined my evening.",
        "time": 1759698766,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "James",
        "rating": 5,
        "text": "Amazing experience! It's a great set up for fine dining, the social aspect and connection with the chefs, service and other dinners is great. The food was beautiful, different and delicious. This is the 4th tasting menu I've tried, Wales, Houston, Tasmania and now Kitchen Table and they all bring something new, interesting, varied, exciting and again delicious.",
        "time": 1751005912,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Peter Levchenko",
        "rating": 3,
        "text": "Sensational service thanks mainly to Daniel and Alex.\n\nExpected a lot, food really missed the mark. For a two star level especially.\nOyster w granita nice opener, but playing it v safe.\nCrab pleasant but not memorable and lacked texture.\nTomato - absolutely top notch 2 star dish. Has everything. That’s where the meal peaked for me.\nScallop caviar supplement dish, again leveraging amazing ingredients, was good but not memorable. AbiT one note the way cucumber notes interact with the scallop.\n\nTrout - one slice of trout sashimi size was completely tasteless as was the hollandaise. Really really missed the mark. Whole dish lacked flavour and texture.\n\nBread course which was a brioche was totally average, sub par for 2* imo. Especially when a chain in London like Aux Merveilleux de Fred casually sells a way better one.\n\nThe curry like noodles dish that followed has tons of interesting flavour, but that’s all it was - it felt like scraping the bottom of a curry plate with some interesting candied notes. The noodles themselves were a mushy and lacked any taste.\n\nThe agnolotti with goats curd and onion consommé. Were pleasant, safe flavour combo seen it done many places - also imo the onion doesn’t really match the rest of the dish.\n\n“Main” slice of pork with tiny sauce portions on side. Pork lacked any flavour, dish lacked texture.\n\nThe tiniest quantity of food for a main course I had anywhere in recent memory.\n\nBoth deserts were super solid. Fig - memorable and perfectly balanced.\nThe lemon cake - texture wise was spot on, flavour wise ok but unmemorable.\n\nPetty fours super solid.\n\nI’m a very experienced diner would say whole experience taking 4 hours is unduly taking up diners time. I’d wait 20min for plates if they were absolutely knocking it out of the park flavour wise however on this occasion most of them were ordinary and nothing more.\n\nAs an experienced diner at multi star places have to comment on quantity of food. It’s inexcusably too little, we had the 10 course menu. Left hungry.\n\nDaniel gave us 11 star service on a 10 star scale and made our night memorable.\n\nMaybe caught the resto on a night off but have to say whole menu feels like quickly put together lacking the depth of concept typically expected of the high standards and reputation set by Kitchen Table itself in the London dining scene. Happy to reconsider on another visit.",
        "time": 1754521157,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Alejandra “Ale” Paredes",
        "rating": 5,
        "text": "Where to begin! This is hands down our favourite restaurant in all of London, and we love Michelin-starred spots and would like to think of ourselves as proper foodies. The attention to detail from the moment you step inside is just incredible. You’re greeted by none other than Sandia Chang herself, and welcomed into the bar area with a lovely drink and some amuse-bouche to start the experience. It already feels special by then.\n\nYou get the chance to chat with some of the team, get a glimpse of the menu, and start soaking in the atmosphere. I love that they’ve recently tweaked their offering a bit. There’s now a shorter and a longer menu, which is great as it opens the door for more people to try it, even if they’re not going for the full tasting experience.\n\nAfter around 20 to 30 minutes, you’re moved into the main dining area, the kitchen itself, surrounded by a counter table where the real magic happens. It’s like watching a symphony of chefs, all working together to serve you the most memorable dinner. You get to interact with them if you feel like it. They're incredibly warm, happy to chat and answer your questions, but also never pushy. It’s really up to you how involved you want to be, which I really appreciate.\n\nSeeing James Knappett in action alongside his brilliant team is amazing. The level of passion for food and hospitality is so obvious, it’s infectious. Both times we’ve been, our favourite dish has been the lobster, but honestly, there are so many wonderful surprises along the way. The wine pairings are fantastic, perfectly chosen by Sandia, and we even ended with a beautifully paired cider, which was such a delightful surprise.\n\nWe’ve had dinner here twice now, in different seasons and years, and we still can’t stop thinking about it. Just an unforgettable place. Thank you so, so much to the whole team, we’re definitely coming back!\n\nPS: I had to pick a few photos as I had too many and don't want to ruin the surprise.",
        "time": 1754558055,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Sammy",
        "rating": 5,
        "text": "Unbelievable food & service. The staff were incredible, kudos to Alex, the 3 Sam’s & Daniel especially! Food was exceptional, meticulously prepared and presented, and the passion was infectious from the staff and Chefs. We had 14 courses and each one was unique and memorable.\nHighly recommend if you fancy the ultimate fine dining experience!",
        "time": 1748725891,
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
    "fsa_rating_text": "5",
    "fsa_authority": "Camden",
    "fsa_url": "https://ratings.food.gov.uk/business/470880",
    "fsa_last_inspection": "2022-11-10T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:54:12.258Z",
    "lastVerifiedFSA": "2025-10-16T23:20:46.358Z",
    "createdAt": "2025-10-15T10:54:12.258Z",
    "updatedAt": "2025-10-16T20:25:13.684Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Kitchen Table — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_kitchen-table_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.459Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Kitchen Table",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£4",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "70 Charlotte St., London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 546
      },
      "url": "https://thebestinlondon.co.uk/restaurant/kitchen-table-PUQzy0hI",
      "openingHours": [
        "Monday: Closed",
        "Tuesday: 6:30 – 11:30 PM",
        "Wednesday: 6:30 – 11:30 PM",
        "Thursday: 5:30 – 11:30 PM",
        "Friday: 5:30 – 11:30 PM",
        "Saturday: Closed",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/kitchen-table-PUQzy0hI/mediterranean-kitchen-table-PUQzy0hI-card-5b3d1e96.webp",
    "image_hero_path": "/images/restaurants/kitchen-table-PUQzy0hI/mediterranean-kitchen-table-PUQzy0hI-hero-a0ff2696.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJPezp68UcdkgR7-XRi5OAXZ4",
    "slug": "e-pellicci-Ri5OAXZ4",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJPezp68UcdkgR7-XRi5OAXZ4",
    "name": "E Pellicci",
    "description": "Vintage Art Deco workers' cafe offering the full English breakfast and Italian classics since 1900.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 2781,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "332 Bethnal Grn Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "332 Bethnal Grn Rd, London",
    "postcode": "E2 0AG",
    "borough": "Central London",
    "lat": 51.5264863,
    "lng": -0.0634305,
    "phone": "020 7739 4873",
    "phone_international": "+44 20 7739 4873",
    "website": "http://epellicci.co.uk/",
    "url": "https://maps.google.com/?cid=11411418402021041647",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 8:00 AM – 3:00 PM",
        "Tuesday: 8:00 AM – 3:00 PM",
        "Wednesday: 8:00 AM – 3:00 PM",
        "Thursday: 8:00 AM – 3:00 PM",
        "Friday: 8:00 AM – 3:00 PM",
        "Saturday: 8:00 AM – 3:00 PM",
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
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1500"
          },
          "open": {
            "day": 2,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1500"
          },
          "open": {
            "day": 3,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1500"
          },
          "open": {
            "day": 4,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1500"
          },
          "open": {
            "day": 5,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1500"
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
        "reference": "AciIO2dgy2txODn_0hz2QmtvlmglqQhMl9XLyF-YdfYMB-qs5M78UtwS_YSi35KH5iv0HT5Yo5jVxOptgacQouoOZ-VTlXFky15ioHFi0HQoaNJn4auzDRk2ka3iyA5T6A9pvOkFGZUusmKPJAQLTeI0WMY_whmmuMdMdmbiA_bbzUtBMouQ3y4xzewtJAqBYxlX5RVE_ooycg90G2EfkSDQHYgurWAleaytvxfOxiAY8Y9wXOmXrmaTIVXuDRlT7BfHOXajMUqc9p8BSQVaaecqkBJ_odnJhyeedB565_IcYCE44g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dgy2txODn_0hz2QmtvlmglqQhMl9XLyF-YdfYMB-qs5M78UtwS_YSi35KH5iv0HT5Yo5jVxOptgacQouoOZ-VTlXFky15ioHFi0HQoaNJn4auzDRk2ka3iyA5T6A9pvOkFGZUusmKPJAQLTeI0WMY_whmmuMdMdmbiA_bbzUtBMouQ3y4xzewtJAqBYxlX5RVE_ooycg90G2EfkSDQHYgurWAleaytvxfOxiAY8Y9wXOmXrmaTIVXuDRlT7BfHOXajMUqc9p8BSQVaaecqkBJ_odnJhyeedB565_IcYCE44g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105144380376893710665\">E Pellicci</a>"
        ]
      },
      {
        "reference": "AciIO2eA7L8eSxy2GFm6f2JtTSh1p8xEdpzimjymYV9jkfeIUAFmuZdV-xIgizZEpWxuGrT-_vRk0x5sAxkA7BpGoBZrvBdXMNrYDTj8p2yGTNt7rMip7fxsHNEgcYwmFcW0S2IOjIIcutGjsvPnVP97FZ-vOTfW61dOcRg_z39WRFzuMnHWAG7e0tOambcsFMFS8OT6a-PLiAThYYWoGd-9_iU_DzD91UbAJ_BzrtO9GDCFVVckUKuq06v2qffOVlGEbz-kaFRZkY3n5Wgku1ZiQWgG03a3dCdgplp-zby0wLfq18kz8K34O3UyVLxngOGSZV-IdOHZyl90o4Yj0Vcwz03CJ_gVyxjRAgKdMZIP0y7NMAY4OcLRjslJgyOH5g96kkuJg5-eSiOk4jl_NNtdHojShp3WWIIQR85uPmAfn6ZmePU0V5DPcSW0zx8NVc88",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eA7L8eSxy2GFm6f2JtTSh800p8xEdpzimjymYV9jkfeIUAFmuZdV-xIgizZEpWxuGrT-_vRk0x5sAxkA7BpGoBZrvBdXMNrYDTj8p2yGTNt7rMip7fxsHNEgcYwmFcW0S2IOjIIcutGjsvPnVP97FZ-vOTfW61dOcRg_z39WRFzuMnHWAG7e0tOambcsFMFS8OT6a-PLiAThYYWoGd-9_iU_DzD91UbAJ_BzrtO9GDCFVVckUKuq06v2qffOVlGEbz-kaFRZkY3n5Wgku1ZiQWgG03a3dCdgplp-zby0wLfq18kz8K34O3UyVLxngOGSZV-IdOHZyl90o4Yj0Vcwz03CJ_gVyxjRAgKdMZIP0y7NMAY4OcLRjslJgyOH5g96kkuJg5-eSiOk4jl_NNtdHojShp3WWIIQR85uPmAfn6ZmePU0V5DPcSW0zx8NVc88&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110223853569038932967\">Jon Arrowsmith</a>"
        ]
      },
      {
        "reference": "AciIO2c6OqBqtz_0gkElu6wuvPDQr14YenbilTz8Z4rMBFeJsQo-gL68XI-sptC-4XYUFyZq4iBtars_Vjy7wqx6JEkQkHQSfgTjZbBodXbZhmgpg-5VxQ-dBDjDQFuUHuBuGTLOC3Q3gnItZPFKCaE8X-U5DDWjMMigWvOTHoIr7EWzJXkVI08Yy9O1lRC4ENjpnGgaEYbUFpHfLg_-quZ_u1jDIfGjwmhX_b9C4GWZTEV1vpOSx0myXqjlFfUUQf32uVi3LoUp_tLXKLKNZZBFLiJGSOcpVQm36fjq34wdD7lHjA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c6OqBqtz_0gkElu6wuvPDQr14YenbilTz8Z4rMBFeJsQo-gL68XI-sptC-4XYUFyZq4iBtars_Vjy7wqx6JEkQkHQSfgTjZbBodXbZhmgpg-5VxQ-dBDjDQFuUHuBuGTLOC3Q3gnItZPFKCaE8X-U5DDWjMMigWvOTHoIr7EWzJXkVI08Yy9O1lRC4ENjpnGgaEYbUFpHfLg_-quZ_u1jDIfGjwmhX_b9C4GWZTEV1vpOSx0myXqjlFfUUQf32uVi3LoUp_tLXKLKNZZBFLiJGSOcpVQm36fjq34wdD7lHjA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105144380376893710665\">E Pellicci</a>"
        ]
      },
      {
        "reference": "AciIO2e3ifsLjoZHAOTBYUznUFIK5bWanQBtVScKvKerFOC_YBpfMaNO3eNHm2yyAbvDgqN_kRjlUdMt9R4YxDt-0iAjDyu_gkFBsM71vXWo3ywJ8SSkOoHuhVnd2joViEvE_-ziKR5liKTio_iuaN2iRv8KWzfVL7skzXEPCeXW9yhv69KKkidInpDO95s-2QD4cdCGWHktWSVZ-01d5PNRtSlaqpfenpAm4LqhfdUFhhlUZP71AFb0siIEpX55OrWiS6nD-OHKTZ9f22UnxVQ2HOXNYSoT_qWB4XxL8d_4KiMR1w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e3ifsLjoZHAOTBYUznUFIK5bWanQBtVScKvKerFOC_YBpfMaNO3eNHm2yyAbvDgqN_kRjlUdMt9R4YxDt-0iAjDyu_gkFBsM71vXWo3ywJ8SSkOoHuhVnd2joViEvE_-ziKR5liKTio_iuaN2iRv8KWzfVL7skzXEPCeXW9yhv69KKkidInpDO95s-2QD4cdCGWHktWSVZ-01d5PNRtSlaqpfenpAm4LqhfdUFhhlUZP71AFb0siIEpX55OrWiS6nD-OHKTZ9f22UnxVQ2HOXNYSoT_qWB4XxL8d_4KiMR1w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105144380376893710665\">E Pellicci</a>"
        ]
      },
      {
        "reference": "AciIO2c12wbhnHd7EGQLlGS6x5zI_UsLVF1wbJXplqmMvhMDOt6xez3VKHvrxqL2_3K8wdCwVKUDT2yvPAdDQejtYw4UhDOPOrPjOftkkpLKfdsV3I9Vih82wg6heZlkpE1178XgeqFGnUfexRFensJ-tm_XUcf5yuJ5Upilq58kvndZo72Dncfw5gQ-2l4smn9r0H1oS4cRKhcuz9AlNvU3DdI2sidDczcwZ0QlWrL4Jbe0uuNzt7oPGgF1Ku49Yl1CVBlNynIZ0UzNxP0tEAb0N4MV02ik03ax0lpuLMn0qa4yLnAG88QQaLaBy1kjuW3gKbxj_mQBvzLoTy-aexWDjZlIsnGbINGq0c8TfYedN9s0o9HjJXtLtuOD_cyxaZmO4rUJL8AE-FxP9In3Hj4HYUb__K6v1YaANpqxE4PVb3qmvJkc_LInvf-gCIKEeizE",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2c12wbhnHd7EGQLlGS6x5zI_UsLVF1wbJXplqmMvhMDOt6xez3VKHvrxqL2_3K8wdCwVKUDT2yvPAdDQejtYw1200UhDOPOrPjOftkkpLKfdsV3I9Vih800wg6heZlkpE1178XgeqFGnUfexRFensJ-tm_XUcf5yuJ5Upilq58kvndZo72Dncfw5gQ-2l4smn9r0H1oS4cRKhcuz9AlNvU3DdI2sidDczcwZ0QlWrL4Jbe0uuNzt7oPGgF1Ku49Yl1CVBlNynIZ0UzNxP0tEAb0N4MV02ik03ax0lpuLMn0qa4yLnAG88QQaLaBy1kjuW3gKbxj_mQBvzLoTy-aexWDjZlIsnGbINGq0c8TfYedN9s0o9HjJXtLtuOD_cyxaZmO4rUJL8AE-FxP9In3Hj4HYUb__K6v1YaANpqxE4PVb3qmvJkc_LInvf-gCIKEeizE&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111590364735675876033\">Brian Miller</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Fionna Lee",
        "rating": 5,
        "text": "I’ve been here twice now, and both times were great! The portions are huge. The big breakfast is no joke. The food is delicious, and the service is amazing. The pesto was so good that my friend even got one to take away. I haven’t tried any of their desserts yet, but I’ll definitely be back to give them a go!\n\nSide note: They only accept cash so don't forget to bring some cash with you!",
        "time": 1754383298,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Gul Bozkart",
        "rating": 5,
        "text": "First time coming here. The environment, staff and service was incredible. Such a warm, friendly and cosy environment with speedy service despite it being crazy busy. We were fortunate enough to meet the siblings Navio Jnr and Anna who were so funny and inviting. We ordered the veggie breakfast with a side of big bang ciabatta which was so delicious and their homemade pesto is to die for.\n\nThank you for such a great experience! 🥰\n\nSide note: Go in early because by 11am there was a really long line. Very popular!",
        "time": 1758536998,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Philip Clay",
        "rating": 5,
        "text": "Almost am hours wait. No problem as was expecting it busy on a Saturday.\nAsked if I wanted to share a table....no problem (I was on my own).\nAtmosphere, food, staff, pricing spot on.\nCame from Norwich as been past before and it looked great",
        "time": 1760208354,
        "relative_time_description": "in the last week"
      },
      {
        "author_name": "James Hadley",
        "rating": 5,
        "text": "Aw man, I wish there were more cafe restaurants like this everywhere. The good old days still lives in this establishment. The old cockney hospitality from days gone are still present in this amazing little place. The food is outstanding. I own two Italian restaurants and I can tell the food here is nothing short of delicious, authentic and fresh. The owner (Pellici) still cooks every plate in the kitchen but still has time to laugh and play with all the customers. His wife is amazing. The staff is amazing, the food is amazing and the atmosphere is second to non. Love this place, thank you.",
        "time": 1758649044,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Leo",
        "rating": 5,
        "text": "Got the Have the Lot (meat) and portion sizes were huge. 2 plates for 3 was enough. Special mention to the white sausage and fried toast, both were absolutely delicious. Space was slightly small and the queue can get quite long out the door. Owner was friendly and always checked in on the food and food was served quick!",
        "time": 1757094192,
        "relative_time_description": "a month ago"
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
    "fsa_rating_text": "5",
    "fsa_authority": "Tower Hamlets",
    "fsa_url": "https://ratings.food.gov.uk/business/148382",
    "fsa_last_inspection": "2023-04-26T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:55.909Z",
    "lastVerifiedFSA": "2025-10-16T23:21:36.966Z",
    "createdAt": "2025-10-16T20:23:55.909Z",
    "updatedAt": "2025-10-16T20:25:22.914Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "E Pellicci — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_e-pellicci_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.463Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "E Pellicci",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "332 Bethnal Grn Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 2781
      },
      "url": "https://thebestinlondon.co.uk/restaurant/e-pellicci-Ri5OAXZ4",
      "openingHours": [
        "Monday: 8:00 AM – 3:00 PM",
        "Tuesday: 8:00 AM – 3:00 PM",
        "Wednesday: 8:00 AM – 3:00 PM",
        "Thursday: 8:00 AM – 3:00 PM",
        "Friday: 8:00 AM – 3:00 PM",
        "Saturday: 8:00 AM – 3:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/e-pellicci-Ri5OAXZ4/mediterranean-e-pellicci-Ri5OAXZ4-card-b2eec381.webp",
    "image_hero_path": "/images/restaurants/e-pellicci-Ri5OAXZ4/mediterranean-e-pellicci-Ri5OAXZ4-hero-158d9083.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ1fRYjo4ddkgRRZq7lphil6E",
    "slug": "rosslyn-coffee-london-wall-7lphil6E",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ1fRYjo4ddkgRRZq7lphil6E",
    "name": "Rosslyn Coffee London Wall",
    "description": "Pastries & custom-brewed gourmet coffee offered in a trendy, compact environment.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 375,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "FOX Building, 118 London Wall, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "FOX Building, 118 London Wall, London",
    "postcode": "EC2Y 5JA",
    "borough": "Central London",
    "lat": 51.51768990000001,
    "lng": -0.0890369,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.rosslyncoffee.com/",
    "url": "https://maps.google.com/?cid=11643883769093134917",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 6:30 AM – 5:00 PM",
        "Tuesday: 6:30 AM – 5:00 PM",
        "Wednesday: 6:30 AM – 5:00 PM",
        "Thursday: 6:30 AM – 5:00 PM",
        "Friday: 6:30 AM – 5:00 PM",
        "Saturday: Closed",
        "Sunday: Closed"
      ],
      "periods": [
        {
          "close": {
            "day": 1,
            "time": "1700"
          },
          "open": {
            "day": 1,
            "time": "0630"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1700"
          },
          "open": {
            "day": 2,
            "time": "0630"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1700"
          },
          "open": {
            "day": 3,
            "time": "0630"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1700"
          },
          "open": {
            "day": 4,
            "time": "0630"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1700"
          },
          "open": {
            "day": 5,
            "time": "0630"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2d0I8FN9OBmwif_ENewkSJ5HmP6scyBGl_6BVM8QXcwsvKWPqYSRer_D-zdy6LIkMzztxCnjZFZkZ2hzudG-YD7ZE_hXdvOMokdPmmxoJ-kiQA6p9q5tbCokEfpGbE90WVcWoqLNpbcdDaduqvJZJhCfq05A5HAxJ8dKX0m8MqPsdDMCcNvAChrldxkOf0ZZSnV36vv4lSxqQeBd78CWLkT0dzZvWbB8bgbwWGsUukRc-2dz74Pp_V-av5aPS7M04h_9kCL_PieQ_DyjsapJTqQc-e7UqkE1Z5V_BOU90wc9g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d0I8FN9OBmwif_ENewkSJ5HmP6scyBGl_6BVM8QXcwsvKWPqYSRer_D-zdy6LIkMzztxCnjZFZkZ2hzudG-YD7ZE_hXdvOMokdPmmxoJ-kiQA6p9q5tbCokEfpGbE90WVcWoqLNpbcdDaduqvJZJhCfq05A5HAxJ8dKX0m8MqPsdDMCcNvAChrldxkOf0ZZSnV36vv4lSxqQeBd78CWLkT0dzZvWbB8bgbwWGsUukRc-2dz74Pp_V-av5aPS7M04h_9kCL_PieQ_DyjsapJTqQc-e7UqkE1Z5V_BOU90wc9g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109208422511533128100\">Rosslyn Coffee London Wall</a>"
        ]
      },
      {
        "reference": "AciIO2fXgb6dCaWH5lQN3ypIqD3qCPlAIsVKM76AB9T9lwmfUKha5XbTnJFdxS9ZFl-NmPug5rjKxLBEozQ0s95r54hfe490Z1C-5ieI6iK9vXSyogqCmbY7sC93HD-H3Th0njWfNJE1MSkAuJAiRvHqF0yZalDCOE0Lz1KFiI6IgWtzmUYCb6PX05Kft8lArEGygpJZjZW3TVChHJgR7dCfNi9xj04dxklvrxJ3nmrOSzgjiW2FCwrGbhMvXojq0GY1YtooL0ECDeltYFGIIDqBSVoG9zvtJRtVglNkwY6qCDdAZg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fXgb6dCaWH5lQN3ypIqD3qCPlAIsVKM76AB9T9lwmfUKha5XbTnJFdxS9ZFl-NmPug5rjKxLBEozQ0s95r54hfe490Z1C-5ieI6iK9vXSyogqCmbY7sC93HD-H3Th800njWfNJE1MSkAuJAiRvHqF0yZalDCOE0Lz1KFiI6IgWtzmUYCb6PX05Kft8lArEGygpJZjZW3TVChHJgR7dCfNi9xj04dxklvrxJ3nmrOSzgjiW2FCwrGbhMvXojq0GY1YtooL0ECDeltYFGIIDqBSVoG9zvtJRtVglNkwY6qCDdAZg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109208422511533128100\">Rosslyn Coffee London Wall</a>"
        ]
      },
      {
        "reference": "AciIO2exm0iHxaHweNgI_pc87wS23QNYeN5i3W8depYJXDHukRZZQKcgK7JKodwgf3XttpBNITZnu4W_QOoMuBNPSa5GV8dmIq4O6YYDktM10bTl3VQWNs2zp2BhL_2p3jI40a76vP-JPMOcVVxTdAfpcd_DbfWsR_LgZnSwjGdyk1Qy3Vhz2Og35RnQRRWtAQ4ehhrPstPMgnOUKqYdZLtxUaNCH569dLv57Akh6teevxXEQOxTAckawOQtSx--e0KaMB4KIWTf3w9igjCXjsFNF1cUjAwhOsKJHmZajFdHQscrZep5Eh3eBThkWhfYX9IpRiPBt8Ba2-kpaueMQupAYvJY5crLSb8sPBMCNLisaw6cacip_Y13WXhN1DAOG8ra7ZfYNoR4P3iv0TWOPz_fzl-WYAly9VLiI-bQGM4mcpbgiFYU",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2exm0iHxaHweNgI_pc87wS23QNYeN5i3W8depYJXDHukRZZQKcgK7JKodwgf3XttpBNITZnu4W_QOoMuBNPSa5GV8dmIq4O6YYDktM10bTl3VQWNs2zp2BhL_2p3jI40a76vP-JPMOcVVxTdAfpcd_DbfWsR_LgZnSwjGdyk1Qy3Vhz2Og35RnQRRWtAQ4ehhrPstPMgnOUKqYdZLtxUaNCH569dLv57Akh800teevxXEQOxTAckawOQtSx--e0KaMB4KIWTf3w1200igjCXjsFNF1cUjAwhOsKJHmZajFdHQscrZep5Eh3eBThkWhfYX9IpRiPBt8Ba2-kpaueMQupAYvJY5crLSb8sPBMCNLisaw6cacip_Y13WXhN1DAOG8ra7ZfYNoR4P3iv0TWOPz_fzl-WYAly9VLiI-bQGM4mcpbgiFYU&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106844852599913969714\">Um.khalid</a>"
        ]
      },
      {
        "reference": "AciIO2ftj2tkzZaipR1cdLGJ4u21qRA-oMA3Ng1apujbgOYPZUnacYglWt1ikjojHYRlhczu695Rad1Bvg9KZehShWBedpk5v_Ic9LeDyvSoekFzDLfQGxTDN11Yn3Xh_3UOvk5YmLApQLxEh9okFURwhEDMMCMoZ8vN6H2mHWRwbTprNTw4Awwr2X0vMV2Nd8J1CrEpzPeGtLeSImlMXNBEPGKziMPcT66gaAhtAk_x-ZV4Ccr7VvK6OhDOJ_7VrmEBNBBJ9wa5B2lXSdm2rBjzXtiiuQeicPrTdx-8Ck4jJGlonzp_lZ3Ez4MgvzHzQ_FAEJZcwBUqL8FyfT8E8glsAfHqjI79ouSI-DZKtSMlwJNJUmdgRMozUXAcsMWeiUnEQjpNt9hueqj20QRBV_OnNo6Hw4-lnTacJiMMEnU24q2Aiw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ftj2tkzZaipR1cdLGJ4u21qRA-oMA3Ng1apujbgOYPZUnacYglWt1ikjojHYRlhczu695Rad1Bvg9KZehShWBedpk5v_Ic9LeDyvSoekFzDLfQGxTDN11Yn3Xh_3UOvk5YmLApQLxEh800okFURwhEDMMCMoZ8vN6H2mHWRwbTprNTw1200Awwr2X0vMV2Nd8J1CrEpzPeGtLeSImlMXNBEPGKziMPcT66gaAhtAk_x-ZV4Ccr7VvK6OhDOJ_7VrmEBNBBJ9wa5B2lXSdm2rBjzXtiiuQeicPrTdx-8Ck4jJGlonzp_lZ3Ez4MgvzHzQ_FAEJZcwBUqL8FyfT8E8glsAfHqjI79ouSI-DZKtSMlwJNJUmdgRMozUXAcsMWeiUnEQjpNt9hueqj20QRBV_OnNo6Hw4-lnTacJiMMEnU24q2Aiw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117963408821019462851\">BoBo-brioche</a>"
        ]
      },
      {
        "reference": "AciIO2cAPTPkdWU0u4nAefuW98qZZD_3o8wl9_EvP-FQ9B7rQt-l_EnUVIr05-Isf5Zp-AjNvJ-KP-1W-gdHlDOc6usRs5DrTsm2sll_KZ19EgyqcGl6EsGIpns2zztqPebn7B6jOj5Fru0j4pWtBekowxn21_3aeunv-NVNYtTEJcSgnU4f4r_3ikeAUigXKwo5W3by43e5HHEIZw4v21_mlr__DYf9I-dE_tieFCCHvNF_1iYjIQvV9LQuzHrlkeLCMGXcMje8UOrQxbySeh4-eDB38uZWVU8BPLLMVYxdyM65aDQLfyoMwhSq_mzmwzuEKPMyAOyRJfPZKJfwiakw8u9JnVgnRnRojJ-e9WSQFwNvvbTtNSrRz8xfxOjkQEQ5G_MqBOd73q--JHJHWF-uKTasRQR4JxqNayeXyU8-mMZ3yBfBm1yMbTjb-emBe9e2",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cAPTPkdWU0u4nAefuW98qZZD_3o8wl9_EvP-FQ9B7rQt-l_EnUVIr05-Isf5Zp-AjNvJ-KP-1W-gdHlDOc6usRs5DrTsm2sll_KZ19EgyqcGl6EsGIpns2zztqPebn7B6jOj5Fru0j4pWtBekowxn21_3aeunv-NVNYtTEJcSgnU4f4r_3ikeAUigXKwo5W3by43e5HHEIZw1200v21_mlr__DYf9I-dE_tieFCCHvNF_1iYjIQvV9LQuzHrlkeLCMGXcMje8UOrQxbySeh800-eDB38uZWVU8BPLLMVYxdyM65aDQLfyoMwhSq_mzmwzuEKPMyAOyRJfPZKJfwiakw8u9JnVgnRnRojJ-e9WSQFwNvvbTtNSrRz8xfxOjkQEQ5G_MqBOd73q--JHJHWF-uKTasRQR4JxqNayeXyU8-mMZ3yBfBm1yMbTjb-emBe9e2&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111512438271459193876\">Brandon Pacheco</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Brandon Pacheco",
        "rating": 5,
        "text": "One of the busiest coffee shops I’ve ever seen and even with all the chaos and having over 5 people working, they manage to give the best costumer experience.\n\nCongrats to the team for having a really good coffee with nice tones and as well having a smile at all times.\n\nThey seemed like they were having the best time even though we know how busy it is and how things can be tricky.\n\nCoffee was really good with strong flavour and I had a vegan protein ball which was tasty.\n\nOnce again congrats to the team and recommended to pass by and enjoy",
        "time": 1759605098,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Ira Noviani",
        "rating": 5,
        "text": "A sign post of espresso soft serve beckoned outside the shop. Willingly I heeded its command and ordered one. The place had people going in and out and it was not hard to see why. The baristas are all female with happy energy working together. I guess if your house is a happy one, you don’t need social media for advertisement; people are drawn to it like moths to a flame. I added my order too so you can admire its beauty.",
        "time": 1758147071,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Wassim Jeridi Gharbi",
        "rating": 5,
        "text": "Whenever I am in London this is my go to place for coffee.\nBoth the drinks and the sold bean are solid quality.\nUse the stamps to get one coffee free every 10 purchased.",
        "time": 1759732613,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Joe Moore",
        "rating": 1,
        "text": "Found the coffee tasteless brown water and threw it away after a few sips.\n\nEach to their own I guess. The shop looks cool but £3.60 for tasteless coffee. Think Pret coffee tastes better. Ended up throwing it in the bin after a few sips and buying a coffee opposite the road at another place as didn’t want to waste my daily caffeine hit on this.",
        "time": 1758119878,
        "relative_time_description": "3 weeks ago"
      },
      {
        "author_name": "Bianca mae",
        "rating": 5,
        "text": "One of the best coffees in London. Soy and cow Flat whites like they were straight from a Melbourne hipsters teat.\nAll gals behind the counter definitely made a difference!\nThey all deserve a raise for their efficient and exceptional service.\nCould do with a better line up /waiting set up as people milling about in the way of the doors was a bit chaotic.\nNot the fault of the staff though, perhaps the owners could make it a bit easier for staff and customers!\nnot really a space for sit down, more a takeaway option. Although some bench seating and outside on the forecourt.\nThanks Ladies!",
        "time": 1757867539,
        "relative_time_description": "a month ago"
      }
    ],
    "types": [
      "cafe",
      "establishment",
      "food",
      "point_of_interest",
      "store"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:54:22.732Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:22.732Z",
    "updatedAt": "2025-10-16T20:25:27.653Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Rosslyn Coffee London Wall — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_rosslyn-coffee-london-wall_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.465Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Rosslyn Coffee London Wall",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "FOX Building, 118 London Wall, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 375
      },
      "url": "https://thebestinlondon.co.uk/restaurant/rosslyn-coffee-london-wall-7lphil6E",
      "openingHours": [
        "Monday: 6:30 AM – 5:00 PM",
        "Tuesday: 6:30 AM – 5:00 PM",
        "Wednesday: 6:30 AM – 5:00 PM",
        "Thursday: 6:30 AM – 5:00 PM",
        "Friday: 6:30 AM – 5:00 PM",
        "Saturday: Closed",
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
    "last_metadata_update": "2025-10-18T14:23:43.659Z",
    "image_card_path": "/images/restaurants/rosslyn-coffee-london-wall-7lphil6E/mediterranean-rosslyn-coffee-london-wall-7lphil6E-card-9a77657d.webp",
    "image_hero_path": "/images/restaurants/rosslyn-coffee-london-wall-7lphil6E/mediterranean-rosslyn-coffee-london-wall-7lphil6E-hero-53c9b999.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ_XJOLvYFdkgR1oW-M-c4fvk",
    "slug": "chill-house-coffee-shop--M-c4fvk",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ_XJOLvYFdkgR1oW-M-c4fvk",
    "name": "Chill House Coffee Shop",
    "description": "Where innovation meets tradition - expect the unexpected in every beautifully plated creation. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "mediterranean"
    ],
    "categories": [
      "cafe",
      "bakery",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 408,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "10 Shepherd St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "10 Shepherd St, London",
    "postcode": "W1J 7JE",
    "borough": "Central London",
    "lat": 51.50628409999999,
    "lng": -0.146854,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.chillhouselondon.com/",
    "url": "https://maps.google.com/?cid=17977869328166323670",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 7:30 AM – 6:00 PM",
        "Tuesday: 7:30 AM – 6:00 PM",
        "Wednesday: 7:30 AM – 6:00 PM",
        "Thursday: 7:30 AM – 6:00 PM",
        "Friday: 7:30 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: 8:00 AM – 6:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1800"
          },
          "open": {
            "day": 0,
            "time": "0800"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "1800"
          },
          "open": {
            "day": 1,
            "time": "0730"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1800"
          },
          "open": {
            "day": 2,
            "time": "0730"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1800"
          },
          "open": {
            "day": 3,
            "time": "0730"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1800"
          },
          "open": {
            "day": 4,
            "time": "0730"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1800"
          },
          "open": {
            "day": 5,
            "time": "0730"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1800"
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
        "reference": "AciIO2dx6nXlNtDyHKS7FQHJW1r8PcFToiR-eqqCjlELHilHWgMVzjKzLXjmXHeUZXrUdRZXjm0Dg8WsfCPDSqgf65D66h2lASP2xz-HqAWSP8p_wSu6sh7jKUzYmea3La9uLtn1iKfPAW_L0hjJwDN2oI-MitgnkryN4URkHO1cSpVxjKDVhThlsynHwcbVAiDrTSoHg-bPkWHjBMs7WJ8CW7b51zatVLGjTSpjW0XflW4eCRjCgCus-c22iyo-R3W1JGg_XHeY9dUHukqZEb1e1s4ahXoYawWvsSRfa6bmFcu72g",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dx6nXlNtDyHKS7FQHJW1r8PcFToiR-eqqCjlELHilHWgMVzjKzLXjmXHeUZXrUdRZXjm0Dg8WsfCPDSqgf65D66h800lASP2xz-HqAWSP8p_wSu6sh7jKUzYmea3La9uLtn1iKfPAW_L0hjJwDN2oI-MitgnkryN4URkHO1cSpVxjKDVhThlsynHwcbVAiDrTSoHg-bPkWHjBMs7WJ8CW7b51zatVLGjTSpjW0XflW4eCRjCgCus-c22iyo-R3W1JGg_XHeY9dUHukqZEb1e1s4ahXoYawWvsSRfa6bmFcu72g&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102888221421235065643\">Chill House Coffee Shop</a>"
        ]
      },
      {
        "reference": "AciIO2cXWrncUFYxD_5Khl14j0R6IteJ-8SaAelPeAhwRYUtxgZcOB3JuIsShCgTrmt0uIpDOgTGseV8vcXPZsJfTMvd-AABBTUR5YMYYAOXWvpxwLyFqq7BL9ai8b07s4Z31-p_d5k9vKtx8AWsliOX0bpEnQUqZGWNBxra0x4lYDJToRTTtFTExPmZUyYoUf6jh7K0XxwzShAO5uEtufxeL1SQQXowVIFZ0dt1rUvqpluc2qzZBIkFKU3excvEWOyz7t4KSL_4NqNPksLGva7Rl5ctU3k9AFJJIKbsEDQNK3fZwQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cXWrncUFYxD_5Khl14j0R6IteJ-8SaAelPeAhwRYUtxgZcOB3JuIsShCgTrmt0uIpDOgTGseV8vcXPZsJfTMvd-AABBTUR5YMYYAOXWvpxwLyFqq7BL9ai8b07s4Z31-p_d5k9vKtx8AWsliOX0bpEnQUqZGWNBxra0x4lYDJToRTTtFTExPmZUyYoUf6jh800K0XxwzShAO5uEtufxeL1SQQXowVIFZ0dt1rUvqpluc2qzZBIkFKU3excvEWOyz7t4KSL_4NqNPksLGva7Rl5ctU3k9AFJJIKbsEDQNK3fZwQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102888221421235065643\">Chill House Coffee Shop</a>"
        ]
      },
      {
        "reference": "AciIO2dUlSQFQOReqtZNz9lX6Pwx5gKQSe6BhAgYcArdtcMVND0cm-scxzi5mIwDhHIFHnGNKZSoYUxqgc0wiJkrdbmiBFg96HdkJZD792sJrj8jG0OH6FWcFlIPIqk-XgtiPPJVz82NOFVdCCkc6BRkOV5uQOY8RrxOtZqyq0T56gfg8iukN7YpXqrwFKNSH00kAQ4pkNGXWYJV_5Rdhk8mni1CqaaAWkiZAn7_Em0YMy3zNcZHGRmQiGkVttClsLRud9sR72vssVN7GBMpCupkI-DfyLrtpOAxdKDKRaP2wLANJD2T65xb5zdMLGL-13Lja8IXK5KyJUx5ydx7s_baawiv0lpw0etPXZ2o9B9VNgnr_bBKu4Zw1gZfKzTeBa5MR7M9KYCutncPFeqO31AYOQuy9lQAVVIyla9z6wkIYpjkCsJe",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dUlSQFQOReqtZNz9lX6Pwx5gKQSe6BhAgYcArdtcMVND0cm-scxzi5mIwDhHIFHnGNKZSoYUxqgc0wiJkrdbmiBFg96HdkJZD792sJrj8jG0OH6FWcFlIPIqk-XgtiPPJVz82NOFVdCCkc6BRkOV5uQOY8RrxOtZqyq0T56gfg8iukN7YpXqrwFKNSH00kAQ4pkNGXWYJV_5Rdhk8mni1CqaaAWkiZAn7_Em0YMy3zNcZHGRmQiGkVttClsLRud9sR72vssVN7GBMpCupkI-DfyLrtpOAxdKDKRaP2wLANJD2T65xb5zdMLGL-13Lja8IXK5KyJUx5ydx7s_baawiv0lpw1200etPXZ2o9B9VNgnr_bBKu4Zw1gZfKzTeBa5MR7M9KYCutncPFeqO31AYOQuy9lQAVVIyla9z6wkIYpjkCsJe&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112092384250613003615\">Randa alsuhaibani</a>"
        ]
      },
      {
        "reference": "AciIO2f-BAT57L9ILhOWt6qzGg_SSE5Cabmouf0N9y9vhannY46vyxbqwy5tQbQroDIbJHFJk6cPCbD32GqcbWCKp5o3oyWWyU26BvPefy9gweyrj3lpPzpVJjeVQNpZtTtIldTHcZAxnDHhmcraBhmZZH1j-_6nS4IYF4ZJLbzMfqGdf-Y0ENvQb6d00TYIIz4xOJRPqJ2fgkV5tIpDZx6H4LxLJh5w2tdyanCtgZ55oPxPazQIw2ueS8k-W-40G9AOUOPNj47rQRHdpKFqacTaAbW1Mc7Txs3QB9j-hFZq6_lXzRaKARot3bfmePv-kvde2Qmo1Rd63w9AWrRSEDGJmc5rMI6gVBox5A3jDB0oK3la9kFli4EPUCrnQwHNjmxC6fjwx4TJbcMtt3kO0o3bTyxb2b_62H94DIcfEFm1jE8zQQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f-BAT57L9ILhOWt6qzGg_SSE5Cabmouf0N9y9vhannY46vyxbqwy5tQbQroDIbJHFJk6cPCbD32GqcbWCKp5o3oyWWyU26BvPefy9gweyrj3lpPzpVJjeVQNpZtTtIldTHcZAxnDHhmcraBhmZZH1j-_6nS4IYF4ZJLbzMfqGdf-Y0ENvQb6d00TYIIz4xOJRPqJ2fgkV5tIpDZx6H4LxLJh800w1200tdyanCtgZ55oPxPazQIw2ueS8k-W-40G9AOUOPNj47rQRHdpKFqacTaAbW1Mc7Txs3QB9j-hFZq6_lXzRaKARot3bfmePv-kvde2Qmo1Rd63w9AWrRSEDGJmc5rMI6gVBox5A3jDB0oK3la9kFli4EPUCrnQwHNjmxC6fjwx4TJbcMtt3kO0o3bTyxb2b_62H94DIcfEFm1jE8zQQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104712642379189415323\">James Johnson</a>"
        ]
      },
      {
        "reference": "AciIO2fw2q9fcF1_LnF5YP7oJKR45yHc2E4uK_9c6s4kOaN1ZAecnIlzTII-5FKqRmCAJakmF_r8QkdLwWHLwqpjDxhAhJHuF7XkEJl5hO5adT206v7Xy5Hb4G9-htOHE6pB00mItsoZC5IIrwlcsNZLi4srynrJ2UfTtSfZTkWjCefYg5m5jODB0O-wFDHpc1RiQ79TJcfrLNyI6mfZIwUyUEcuEAvHM6B16CHTACkTDzUIDq6863jdRLsJ_esIlJ2KLnY0tepDN6ZfOPRucVEfSIqjoGLr6tLlS0vpN1ayjxNuq6siwIXlQIGu2w_C9Z0eF1-ikeBhybG-int0eKPzeoLBf2eypVyRmRqYYVagOuWX-6H7G5avZqIQgHlPEIZsbAz9NpSbfuhPSSvP90RKIgjjwCQ4yUPN4TdCFj-L6jGE8Fzmco-rUF6utP_liKdy",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fw1200q9fcF1_LnF5YP7oJKR45yHc2E4uK_9c6s4kOaN1ZAecnIlzTII-5FKqRmCAJakmF_r8QkdLwWHLwqpjDxhAhJHuF7XkEJl5hO5adT206v7Xy5Hb4G9-htOHE6pB00mItsoZC5IIrwlcsNZLi4srynrJ2UfTtSfZTkWjCefYg5m5jODB0O-wFDHpc1RiQ79TJcfrLNyI6mfZIwUyUEcuEAvHM6B16CHTACkTDzUIDq6863jdRLsJ_esIlJ2KLnY0tepDN6ZfOPRucVEfSIqjoGLr6tLlS0vpN1ayjxNuq6siwIXlQIGu2w_C9Z0eF1-ikeBhybG-int0eKPzeoLBf2eypVyRmRqYYVagOuWX-6H7G5avZqIQgHlPEIZsbAz9NpSbfuhPSSvP90RKIgjjwCQ4yUPN4TdCFj-L6jGE8Fzmco-rUF6utP_liKdy&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103826265520947588096\">M G</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Chin S",
        "rating": 5,
        "text": "Beautiful cafe with soya milk available as alternative option. Very peaceful, quiet and nice area. We had flat white and it’s amazing the temperature of the coffee was just right. Music wasn’t too loud and the staff were friendly.",
        "time": 1757251147,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "catherine conklin",
        "rating": 5,
        "text": "The coffee was absolutely outstanding! I walked in on the first day of my trip and ended up coming back every single morning. The owner was incredibly kind, and the whole experience of choosing your coffee felt so personal and customizable. They’re extremely accommodating and happy to make suggestions based on your preferences. One highlight was trying the owner’s homemade peanut butter flavor—phenomenal! I sampled everything from iced lattes to hot lattes, and each one was perfect. This spot quickly became a daily must-visit for me and my mom :)",
        "time": 1744547254,
        "relative_time_description": "6 months ago"
      },
      {
        "author_name": "Teppei Goto",
        "rating": 5,
        "text": "If you want coffee in London, you need to check this place out. I was just looking for a place to have a coffee in Mayfair and I’m sooo glad I went there.\n\nThe pastry I had was amazing too and I’d definitely go back there every time I visit London.",
        "time": 1747688555,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "David Noble",
        "rating": 4,
        "text": "Great location , one of the staff very friendly the other a bit cold (I guess tired, who knows what's going on in their life). The space is small but good if you are one or two people. Some nice seats outside for larger group. Coffee is expensive but good: you are paying for location and ambiance. Worth a visit.",
        "time": 1756535630,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "James Johnson",
        "rating": 5,
        "text": "Just had one of my best coffees for quite a while, this time at Chill House Coffee Shop on Shepherd Street. Quite a cosy coffee shop but plenty of seating both inside and out and the delicious coffee is served in a china cup which for me makes a big difference. Service is quick and with a smile, thank you.",
        "time": 1740055725,
        "relative_time_description": "7 months ago"
      }
    ],
    "types": [
      "bakery",
      "cafe",
      "establishment",
      "food",
      "meal_takeaway",
      "point_of_interest",
      "restaurant",
      "store"
    ],
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "fsa_last_inspection": null,
    "lastVerifiedGoogle": "2025-10-15T10:54:23.225Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-15T10:54:23.225Z",
    "updatedAt": "2025-10-16T20:25:28.246Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=mediterranean_fish_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Chill House Coffee Shop — Mediterranean",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "mediterranean_chill-house-coffee-shop_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.465Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Chill House Coffee Shop",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "mediterranean"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "10 Shepherd St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 408
      },
      "url": "https://thebestinlondon.co.uk/restaurant/chill-house-coffee-shop--M-c4fvk",
      "openingHours": [
        "Monday: 7:30 AM – 6:00 PM",
        "Tuesday: 7:30 AM – 6:00 PM",
        "Wednesday: 7:30 AM – 6:00 PM",
        "Thursday: 7:30 AM – 6:00 PM",
        "Friday: 7:30 AM – 6:00 PM",
        "Saturday: 8:00 AM – 6:00 PM",
        "Sunday: 8:00 AM – 6:00 PM"
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
    "image_card_path": "/images/restaurants/chill-house-coffee-shop--M-c4fvk/mediterranean-chill-house-coffee-shop--M-c4fvk-card-ce284014.webp",
    "image_hero_path": "/images/restaurants/chill-house-coffee-shop--M-c4fvk/mediterranean-chill-house-coffee-shop--M-c4fvk-hero-91ac455f.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Mediterranean Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest mediterranean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-mediterranean-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Mediterranean Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest mediterranean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-mediterranean-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Mediterranean Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest mediterranean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Mediterranean Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-mediterranean-in-central-london-2025',
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
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Mediterranean in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Mediterranean Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest mediterranean restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of mediterranean cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/london-night-cafe-1dGMkucY" className="hover:text-yellow-600 transition-colors">
                London Night Cafe
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 123 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          London Night Cafe offers exceptional mediterranean cuisine in Central London. With a 4.9-star rating from 123 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/london-night-cafe-1dGMkucY" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ2RrGUY0ddkgRRY_1dGMkucY" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/common-breads-tuvgyCWI" className="hover:text-yellow-600 transition-colors">
                COMMON BREADS
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 571 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          COMMON BREADS offers exceptional mediterranean cuisine in Central London. With a 4.9-star rating from 571 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/common-breads-tuvgyCWI" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ-xBcaZEFdkgRZ6htuvgyCWI" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/pulse-bar-london-AhX30B_M" className="hover:text-yellow-600 transition-colors">
                Pulse Bar London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.9</span>
              <span>📝 350 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Pulse Bar London offers exceptional mediterranean cuisine in Central London. With a 4.9-star rating from 350 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/pulse-bar-london-AhX30B_M" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ46R2PhMFdkgR1BjAhX30B_M" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/kin-cafe-restaurant-sMYzvisk" className="hover:text-yellow-600 transition-colors">
                KIN Cafe & Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 3,360 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          KIN Cafe & Restaurant offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 3,360 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/kin-cafe-restaurant-sMYzvisk" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJXymuDyobdkgRaLhsMYzvisk" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/ekstedt-at-the-yard-wI_8ELLQ" className="hover:text-yellow-600 transition-colors">
                Ekstedt at The Yard
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 706 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Ekstedt at The Yard offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 706 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/ekstedt-at-the-yard-wI_8ELLQ" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJL-HmB88EdkgRfH-wI_8ELLQ" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/restaurant-st-barts-0KJsqCRk" className="hover:text-yellow-600 transition-colors">
                Restaurant St. Barts
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 410 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 2/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Restaurant St. Barts offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 410 reviews and a 2/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/restaurant-st-barts-0KJsqCRk" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ921POt8bdkgRwx80KJsqCRk" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/kitchen-table-PUQzy0hI" className="hover:text-yellow-600 transition-colors">
                Kitchen Table
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 546 reviews</span>
              <span>💰 ££££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Kitchen Table offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 546 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/kitchen-table-PUQzy0hI" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ3aa-YCkbdkgRo5LPUQzy0hI" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/e-pellicci-Ri5OAXZ4" className="hover:text-yellow-600 transition-colors">
                E Pellicci
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 2,781 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          E Pellicci offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 2,781 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/e-pellicci-Ri5OAXZ4" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJPezp68UcdkgR7-XRi5OAXZ4" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/rosslyn-coffee-london-wall-7lphil6E" className="hover:text-yellow-600 transition-colors">
                Rosslyn Coffee London Wall
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 375 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Rosslyn Coffee London Wall offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 375 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/rosslyn-coffee-london-wall-7lphil6E" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ1fRYjo4ddkgRRZq7lphil6E" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/chill-house-coffee-shop--M-c4fvk" className="hover:text-yellow-600 transition-colors">
                Chill House Coffee Shop
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 408 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Chill House Coffee Shop offers exceptional mediterranean cuisine in Central London. With a 4.8-star rating from 408 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/chill-house-coffee-shop--M-c4fvk" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ_XJOLvYFdkgR1oW-M-c4fvk" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
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
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestTurkishInCentralLondon2025() {
  const venues = [
  {
    "place_id": "ChIJnzfL2mYJdkgRGYdkWL5j4TM",
    "slug": "efes-premium-kWL5j4TM",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJnzfL2mYJdkgRGYdkWL5j4TM",
    "name": "Efes Premium",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 921,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "39A Hartfield Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "39A Hartfield Rd, London",
    "postcode": "SW19 3SG",
    "borough": "Central London",
    "lat": 51.4193851,
    "lng": -0.2054761,
    "phone": "020 3876 1125",
    "phone_international": "+44 20 3876 1125",
    "website": "http://efespremium.co.uk/",
    "url": "https://maps.google.com/?cid=3738378834872141593",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 10:00 AM – 12:00 AM",
        "Sunday: 10:00 AM – 11:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "1000"
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
            "time": "1000"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2dGy1FOQ6WDCvPyHTN7ye52y0noh22YzJXKKDHWkef3Gqe6wyPZWYKwk-soKyRq24UtJ7VEBm91HXN5v9c6TaAe0CiXeRWK0YyDWKga9QVFs_kXz7nM6KIH7b9tDnbMpqt44rngCH0Ynp6mIlee367pSELUMUsdG1tsdcemGP8rBargFtrZmeQ6SiOk7Xfn4lrwCWae9l9vKZ3u_iOx78j_yhKcGs9lBsEJmISGYoEV37SebB28O7tAnrbGw_VT6pcmCtNPjE6LDD-6-IExx_Jx0H7nxtXttnAmX0y85XqYmNRnsOR_hUoxV5gZOLHQ3N-AsdoPgNf8EqBFPwKaAM-nJRqv_wEEMIzwl0IW29Hnt4DTlHcxMJccveuRHg-2yaNgA5srM8IaW17KyeUBhRqaeomLP8HVCSk2gPPAfUoyKQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dGy1FOQ6WDCvPyHTN7ye52y0noh800YzJXKKDHWkef3Gqe6wyPZWYKwk-soKyRq24UtJ7VEBm91HXN5v9c6TaAe0CiXeRWK0YyDWKga9QVFs_kXz7nM6KIH7b9tDnbMpqt44rngCH0Ynp6mIlee367pSELUMUsdG1tsdcemGP8rBargFtrZmeQ6SiOk7Xfn4lrwCWae9l9vKZ3u_iOx78j_yhKcGs9lBsEJmISGYoEV37SebB28O7tAnrbGw_VT6pcmCtNPjE6LDD-6-IExx_Jx0H7nxtXttnAmX0y85XqYmNRnsOR_hUoxV5gZOLHQ3N-AsdoPgNf8EqBFPwKaAM-nJRqv_wEEMIzwl0IW29Hnt4DTlHcxMJccveuRHg-2yaNgA5srM8IaW17KyeUBhRqaeomLP8HVCSk2gPPAfUoyKQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/109980983887256381482\">Sins Of Wanderlust</a>"
        ]
      },
      {
        "reference": "AciIO2cu_zzsGVxvDiXx_8-q-xF6xKcoi5q_0HkNpPhH4Ee7XTTR872Y1AzZlqY_AwduiOA0-VCna9csDCiwz-f-8ucEx1xKwPAgiCdT6vph6D8uKjmoqO96bWHeK3eIfIzAdGAdJoebxnqiSSHCyDk_dMLEnQq0ePzA6rpjfhPg-bm_xqUnSuXe2nGvX24eddKau0-FHbfyhV-09WNS6H5JMqM64wcZvhuQiHKK3Q1D5HdMHbyjGM2JoCFHbNlMLKrgbPRDwXTjEEiPOnnqHuKs8IeqLVIjbMB7VuiWJfDE3VjAxw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cu_zzsGVxvDiXx_8-q-xF6xKcoi5q_0HkNpPhH4Ee7XTTR872Y1AzZlqY_AwduiOA0-VCna9csDCiwz-f-8ucEx1xKwPAgiCdT6vph800D8uKjmoqO96bWHeK3eIfIzAdGAdJoebxnqiSSHCyDk_dMLEnQq0ePzA6rpjfhPg-bm_xqUnSuXe2nGvX24eddKau0-FHbfyhV-09WNS6H5JMqM64wcZvhuQiHKK3Q1D5HdMHbyjGM2JoCFHbNlMLKrgbPRDwXTjEEiPOnnqHuKs8IeqLVIjbMB7VuiWJfDE3VjAxw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116554009238099151103\">Efes Premium Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2d9HVVh8klIa42uJxpxapuGdbkegdva-KfbmIxjoL2VSrPIhGRGS4uCUeZxHMuoNKGszUBJu2CKBycHj3o1z8FoTi2p84PBev-P48jhsUTMRfFsPu9puyRPDt73Tz5NfgfBCvRRpDNa5JYpwCKJfw9uAmA7hfzUdMB3EhjxB94JZz9TIH_Ghm3d9cO1ydPmu4KwtEpBC_MvfTgcFOOmTAS8Wje9Ws88z7UURGelcMY3GB6OhiB_d3RXUQwvYl3bmyxph7pDH6mv-IsOxsIvxMT0AQRgDSk_lkJXI7YJhS-n-HmpPdUXjFS4zONVWQ4RrFHDFt-j3XLEET9BWEHSONDpcpe5LAsvXYLQh0QIrJ2fnN5AY_W4K4qfH7qFrGn7v5uXNy4SEiH5u2r5C_EdpScWTKYQahRg7VlNyTAhLKBI_zQ8uGiaWHc46QZJnA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d9HVVh800klIa42uJxpxapuGdbkegdva-KfbmIxjoL2VSrPIhGRGS4uCUeZxHMuoNKGszUBJu2CKBycHj3o1z8FoTi2p84PBev-P48jhsUTMRfFsPu9puyRPDt73Tz5NfgfBCvRRpDNa5JYpwCKJfw1200uAmA7hfzUdMB3EhjxB94JZz9TIH_Ghm3d9cO1ydPmu4KwtEpBC_MvfTgcFOOmTAS8Wje9Ws88z7UURGelcMY3GB6OhiB_d3RXUQwvYl3bmyxph7pDH6mv-IsOxsIvxMT0AQRgDSk_lkJXI7YJhS-n-HmpPdUXjFS4zONVWQ4RrFHDFt-j3XLEET9BWEHSONDpcpe5LAsvXYLQh0QIrJ2fnN5AY_W4K4qfH7qFrGn7v5uXNy4SEiH5u2r5C_EdpScWTKYQahRg7VlNyTAhLKBI_zQ8uGiaWHc46QZJnA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/101657142621806712240\">Qixin</a>"
        ]
      },
      {
        "reference": "AciIO2eIT7dCyv-lSbs7tPs1z22K8xG3n9skZPl8lHfSMTFKiOCjBkNf79hYdiQ0DvgdHs5azaslNrthfkalRKt1Wui1BTnOKIyQQ746KtO4C__ncEr3rOQ0RnXrEpacSQZqpEdR_i7SriNHuI6UxndsYj8IWOBHadiJUCuYfuECxM3_FPnl67bIqsD5S8eQcuP3xIJrGpXHyziZ-U6Crgt-krPMcYLwyuwQNSLHJiJJ6tbb7NymM25FNQkdZbFRrHifxcYzpRx2v_vpjrScncrfCrMpr_DhGd2d0kps2fHpeJNxqQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eIT7dCyv-lSbs7tPs1z22K8xG3n9skZPl8lHfSMTFKiOCjBkNf79hYdiQ0DvgdHs5azaslNrthfkalRKt1Wui1BTnOKIyQQ746KtO4C__ncEr3rOQ0RnXrEpacSQZqpEdR_i7SriNHuI6UxndsYj8IWOBHadiJUCuYfuECxM3_FPnl67bIqsD5S8eQcuP3xIJrGpXHyziZ-U6Crgt-krPMcYLwyuwQNSLHJiJJ6tbb7NymM25FNQkdZbFRrHifxcYzpRx2v_vpjrScncrfCrMpr_DhGd2d0kps2fHpeJNxqQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116554009238099151103\">Efes Premium Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2cbKJemRQJqNlBUJfXD0OTibEXl_kHDx8qhNef2JN_BQjclnFerP0BFs53_xFJNH4NozKNFJln1zYCcSqDiHzumx6X5g82mMMikw8ocZKpJiTO9p6F1xRkwQZMDndzlOr9HtzeVmz-xZfFy6jIYF0qHhhq1sReXnMKVBZzh1jMb12HyFoAfEuSwSxtKMheCKKc9G7_AxXYB6uL0hXNkh3FLY9bPyvxnCe4u2Jlh6iVzRSCnjEZznYivBBZYIAK9sCGGanC4SgLKyfJE5YQ8Es1eyQ4JpB08GGYvg1cNTuUZjWnvVyFOPvpq7rS1yLHJZIQz-Jvbts4LCcNqyEv5JArge5Ubeq7zcldFGQjFZ2jRbaVFsdpqAlpLeOOeCfy_eCqa0wqyAmn1y7IMRYxXoUX8DR9ILMjxiKqizRHCYNFl4QgOWdQEdPpHWonrNNQ7",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cbKJemRQJqNlBUJfXD0OTibEXl_kHDx8qhNef2JN_BQjclnFerP0BFs53_xFJNH4NozKNFJln1zYCcSqDiHzumx6X5g82mMMikw1200ocZKpJiTO9p6F1xRkwQZMDndzlOr9HtzeVmz-xZfFy6jIYF0qHhhq1sReXnMKVBZzh800jMb12HyFoAfEuSwSxtKMheCKKc9G7_AxXYB6uL0hXNkh3FLY9bPyvxnCe4u2Jlh6iVzRSCnjEZznYivBBZYIAK9sCGGanC4SgLKyfJE5YQ8Es1eyQ4JpB08GGYvg1cNTuUZjWnvVyFOPvpq7rS1yLHJZIQz-Jvbts4LCcNqyEv5JArge5Ubeq7zcldFGQjFZ2jRbaVFsdpqAlpLeOOeCfy_eCqa0wqyAmn1y7IMRYxXoUX8DR9ILMjxiKqizRHCYNFl4QgOWdQEdPpHWonrNNQ7&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100690627930968564918\">Vivian Kong</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Elena Warnakulasuriya",
        "rating": 5,
        "text": "Food was amazing, top quality! Interiors and atmosphere were also great. Staff were lovely. Andrea served us, she was very patient, explained the menu and gave us recommendations, she was super friendly. Had the best time here :)",
        "time": 1756393596,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Rabia Ekici",
        "rating": 5,
        "text": "We visited for a birthday celebration and had a really lovely evening. The place itself is nicely decorated—modern, clean, and stylish, with a relaxed vibe that made it a nice setting for the occasion.\n\nThe food was delicious, full of flavour and well presented. You can tell a lot of thought goes into the dishes, and there was a good variety to choose from, which made it easy for everyone to find something they liked. The “Chocolate Dream” cake was a real standout—rich, indulgent, and the perfect way to end the meal.\n\nA big shout out to our servers Ayten and Molly, who really made the evening special. They were so kind, respectful, and attentive throughout—nothing was too much trouble, and they looked after us really well.\n\nOverall, it was a great night, and everything went smoothly. Would definitely recommend",
        "time": 1750988297,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "N Cho",
        "rating": 5,
        "text": "We had a lovely breakfast here with my parents and two children. Ordered the Turkish breakfast, very tasty ! The restaurant is beautiful and the tea at the end of the meal was perfect. Will be back for lunch or dinner next time, thank you !",
        "time": 1754759657,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Fonsi D'Mikol",
        "rating": 5,
        "text": "Efes Premium in Wimbledon is an absolute gem! From the moment we walked in, without a booking, we were greeted with such warmth and genuine hospitality – the customer service was truly outstanding. The team made us feel incredibly welcome and attended to our every need with a smile.\nBut it doesn't stop there; the cuisine is simply on another level. Each dish was a delightful exploration of authentic Turkish flavours, prepared with such care and precision. The quality of the food shone through in every bite – fresh ingredients, expertly seasoned and cooked to perfection. It's clear that Efes Premium takes immense pride in their culinary offerings.\nIf you're looking for a top-notch Turkish dining experience in Wimbledon, with exceptional service and truly high-quality food, look no further than Efes Premium. Highly, highly recommended!",
        "time": 1747505655,
        "relative_time_description": "5 months ago"
      },
      {
        "author_name": "Wardy",
        "rating": 5,
        "text": "I went here for lunch with my friend because I pass it everyday on my way to work and always loved the look of it.\nIt didn’t disappoint from the moment we arrived we were greeted with a very warm welcome.\nWe had the set menu (sorry I forgot to take any food pics)\nI had the lamb donor wrap with chunky chips and it was absolutely flavoursome and seasoned well and cooked to perfection.\nWe are definitely going back soon in the evening  and will order from the main menu ( I will remember pics next time)\nI will give everything about Effs a 10/10",
        "time": 1755540104,
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
    "fsa_authority": "Merton",
    "fsa_url": "https://ratings.food.gov.uk/business/1677110",
    "fsa_last_inspection": "2025-09-05T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:47.616Z",
    "lastVerifiedFSA": "2025-10-16T23:17:33.174Z",
    "createdAt": "2025-10-16T20:23:47.616Z",
    "updatedAt": "2025-10-16T20:24:38.890Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Efes Premium — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_efes-premium_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.439Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Efes Premium",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "39A Hartfield Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 921
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/efes-premium-kWL5j4TM",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 10:00 AM – 12:00 AM",
        "Sunday: 10:00 AM – 11:00 PM"
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
    "image_card_path": "/images/restaurants/efes-premium-kWL5j4TM/turkish-efes-premium-kWL5j4TM-card-fb3b741e.webp",
    "image_hero_path": "/images/restaurants/efes-premium-kWL5j4TM/turkish-efes-premium-kWL5j4TM-hero-97c5d926.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJxdO_dIwcdkgRjJxaBzE5bwY",
    "slug": "cirrik-19-numara-bos-aBzE5bwY",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJxdO_dIwcdkgRjJxaBzE5bwY",
    "name": "Cirrik 19 Numara Bos",
    "description": "Contemporary, family-run ocakbasi barbeque restaurant featuring natural wines & cocktails.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 1613,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "34 Stoke Newington Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "34 Stoke Newington Rd, London",
    "postcode": "N16 7XJ",
    "borough": "Central London",
    "lat": 51.5515933,
    "lng": -0.07474639999999999,
    "phone": "020 7249 0400",
    "phone_international": "+44 20 7249 0400",
    "website": "http://www.cirrik.co.uk/",
    "url": "https://maps.google.com/?cid=463652169382009996",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
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
        "reference": "AciIO2ccrBZqKfhFct1KZnwRBLhnScQb13eF4QzqdTDU7bVv7MNj21nUoVMILqZViIModuM0CxEgjo5eFU32QJP6p1Gtn5nbhWYEpYSfAzTlL3KnTx00I4guEyhKFbJUKRqflQzM45-udhH2w-GgPhx30gSCqUVb3fqdcb9HfAm4DI8tOgVKYvEEewPVsIZB8-qiUbb0ZyF3da4cLHRBia0joFMIzq0im_eAHdxIIUdXwm9bUH_C4iTSSVT781o2lFoq2Ktob2ZD7g4wIddHGrqLSusKJottM-gxoBghx4i9d4M5Og",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ccrBZqKfhFct1KZnwRBLhnScQb13eF4QzqdTDU7bVv7MNj21nUoVMILqZViIModuM0CxEgjo5eFU32QJP6p1Gtn5nbhWYEpYSfAzTlL3KnTx00I4guEyhKFbJUKRqflQzM45-udhH2w-GgPhx30gSCqUVb3fqdcb9HfAm4DI8tOgVKYvEEewPVsIZB8-qiUbb0ZyF3da4cLHRBia0joFMIzq0im_eAHdxIIUdXwm9bUH_C4iTSSVT781o2lFoq2Ktob2ZD7g4wIddHGrqLSusKJottM-gxoBghx4i9d4M5Og&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117250457243752909923\">Cirrik 19 Numara Bos</a>"
        ]
      },
      {
        "reference": "AciIO2cdRkuO8cgip2D5qF-AQsE3sJmKWA-G0XAffhTz2c2bLCRPWN3XmaDfSkjAUO9UTiWybWcZmPmoMsld6VK27d1MmnS-qmRHDKK_WHl_BHIACrs_63OkgPTQCxmedq3OPmfIFMAkV34qWbDJ8HjuGuCoYJkzxopOHHm1VkMpIWvRkbV7rjoqTzHnavGctb4YBpae8YXpAx7VmPAMJ2Vs1sfbBRT3uaPNbg_pMiIwx7DiuIGWEqZtlIsgd3viiK_u72kRzm3ui6xRZlWPD6Aw-_-W-gEkQ_M2TqmONlll4T9omA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cdRkuO8cgip2D5qF-AQsE3sJmKWA-G0XAffhTz2c2bLCRPWN3XmaDfSkjAUO9UTiWybWcZmPmoMsld6VK27d1MmnS-qmRHDKK_WHl_BHIACrs_63OkgPTQCxmedq3OPmfIFMAkV34qWbDJ8HjuGuCoYJkzxopOHHm1VkMpIWvRkbV7rjoqTzHnavGctb4YBpae8YXpAx7VmPAMJ2Vs1sfbBRT3uaPNbg_pMiIwx7DiuIGWEqZtlIsgd3viiK_u72kRzm3ui6xRZlWPD6Aw-_-W-gEkQ_M2TqmONlll4T9omA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117250457243752909923\">Cirrik 19 Numara Bos</a>"
        ]
      },
      {
        "reference": "AciIO2czD01JvjD_qH47QHa3zGQ5rz7ClUmvPuJJ1jhnz6gcpArEeQoIDsLxsUBbjb4hbPTB0SVfkEdKC8edu5szjbMAOczaZ38yBUzRj6bCrqkW7DigbdJOOKLu0N-l0nVWMKTzksXaBziJg0vDEon7PyF9RDvk_mEqZLHf2AFTFibU9Wbv1ff7snS9M5pLiCIas1IfvYD3vRgY0mwpNs96b042Vfv417a5ua5667AzUdYfEB_8EEcBYSky-6F7hTgMoNIObXG12YeB8gb7CYrRVIrQlhG0xSVq3NVej_Eq2ftMiHbMemFridmtCeGgeAC3MeDSKdmQzmoqCCv8xzod_KHXdF_zgjMI47xn5uGARtd5s_snPP4JF4mu1aPOHbgtYYiZZRaa7-EjoKNjrY0PnraPHXIOTI1OZchl5sUc_EafmNPY_8HcdVGMypCHye0y",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2czD01JvjD_qH47QHa3zGQ5rz7ClUmvPuJJ1jhnz6gcpArEeQoIDsLxsUBbjb4hbPTB0SVfkEdKC8edu5szjbMAOczaZ38yBUzRj6bCrqkW7DigbdJOOKLu0N-l0nVWMKTzksXaBziJg0vDEon7PyF9RDvk_mEqZLHf2AFTFibU9Wbv1ff7snS9M5pLiCIas1IfvYD3vRgY0mwpNs96b042Vfv417a5ua5667AzUdYfEB_8EEcBYSky-6F7hTgMoNIObXG12YeB8gb7CYrRVIrQlhG0xSVq3NVej_Eq2ftMiHbMemFridmtCeGgeAC3MeDSKdmQzmoqCCv8xzod_KHXdF_zgjMI47xn5uGARtd5s_snPP4JF4mu1aPOHbgtYYiZZRaa7-EjoKNjrY0PnraPHXIOTI1OZchl5sUc_EafmNPY_8HcdVGMypCHye0y&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114291049921022689087\">Stevie Gedge</a>"
        ]
      },
      {
        "reference": "AciIO2eawI8TNNtQuCi7XmupF_ogmHT-SrtJlCBPeFFU44a_PzxfmHU0V8p3wVxfpwezySfqfOoVSR1U0YNWVHF5S8u3_coHN--MRNA3VDFfeJ_7HB4VKXoEtkOLI5VKYglqRqZKH7gB9CCKA3m6pXFOsKGvP61TJ276kY_uvvbBP4EhsYhnW4k3fFthoj5C4AD3M1jMeoLWoWAzq39-ZDbz11ccT_v-ralILD8BAvLNxdjrGokUtL-h9qeSfYUiBBlo98gefoDLE19k6ylxEe8YLxehqg5B2gyvIFm1a32FQgDhVQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eawI8TNNtQuCi7XmupF_ogmHT-SrtJlCBPeFFU44a_PzxfmHU0V8p3wVxfpwezySfqfOoVSR1U0YNWVHF5S8u3_coHN--MRNA3VDFfeJ_7HB4VKXoEtkOLI5VKYglqRqZKH7gB9CCKA3m6pXFOsKGvP61TJ276kY_uvvbBP4EhsYhnW4k3fFthoj5C4AD3M1jMeoLWoWAzq39-ZDbz11ccT_v-ralILD8BAvLNxdjrGokUtL-h800qeSfYUiBBlo98gefoDLE19k6ylxEe8YLxehqg5B2gyvIFm1a32FQgDhVQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117250457243752909923\">Cirrik 19 Numara Bos</a>"
        ]
      },
      {
        "reference": "AciIO2dNyzHPBIfq4ZV-4nwK_0AdAUJXNfRvUxkKmQsf1QYPD36yjSC3Agdg8CMDbqM9djEE5Vhhtd8SiRL_tQTfavwLsQA4KIEQBsalQYSgk-vnrjrVbVSNb4MuzcWL08Jewf0-53PH-9WSDI0L-KOUzF1zRl3maNsZel5Z9auo3XPHXnnFBHTuWInSfgnWsmXZUghijYT9QxL09x3xrM8DpQvRUKwxl2gOnoj4n3ZFsKhBjARHFpc6IUf5zZHzfofoSYSpm3a86gl15-VE9odCbYtN1LNW2RL_Tzz0aulJOelsnA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dNyzHPBIfq4ZV-4nwK_0AdAUJXNfRvUxkKmQsf1QYPD36yjSC3Agdg8CMDbqM9djEE5Vhhtd8SiRL_tQTfavwLsQA4KIEQBsalQYSgk-vnrjrVbVSNb4MuzcWL08Jewf0-53PH-9WSDI0L-KOUzF1zRl3maNsZel5Z9auo3XPHXnnFBHTuWInSfgnWsmXZUghijYT9QxL09x3xrM8DpQvRUKwxl2gOnoj4n3ZFsKhBjARHFpc6IUf5zZHzfofoSYSpm3a86gl15-VE9odCbYtN1LNW2RL_Tzz0aulJOelsnA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/117250457243752909923\">Cirrik 19 Numara Bos</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "N Fidow",
        "rating": 5,
        "text": "Food was amazing! Great atmosphere and service. The owner recommended their dishes and the recommendations did not disappoint. Thank you for having us - we’ll be back.",
        "time": 1749502524,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Amelia Griffiths",
        "rating": 5,
        "text": "One of the best restaurants I have ever been to. Outstanding food, incredible flavours and the staff were so attentive, kind and lovely. Couldn't fault a thing! A must try. I'd recommend every day of the week.",
        "time": 1750081764,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "10Fold “Mr Rate Escape”",
        "rating": 3,
        "text": "⭐️⭐️⭐️✨ (3.5/5)\n⚖️ 5/10\n\nOrdered via Deliveroo 🚴‍♂️ — with a promo applied, the total came to £23.25 for the Et Beyti Yoğurtlu (£15.05) and chips (£2.80) 🍟. For the price, I can’t complain — it felt fair enough 💷. Delivery took just over an hour ⏰, which was reasonable, but by the time it landed the food had already lost its freshness.\n\nThe chips were limp and stale 🥱, lacking any crispness or warmth. The rice was standard 🍚 — no seasoning, no aroma, just a plain filler on the plate. The Beyti itself was decent but uninspired 🥙: yoghurt gave it tang, the meat had some flavour, but nothing that stood out or carried that fresh-off-the-grill vibrancy 🔥.\n\nOverall, a mediocre, mid-tier experience 😐. Edible, yes — but uninspired. I genuinely think the food would be far better fresh at the restaurant 🍽️, where the grill and seasoning could actually shine.\n\nWould I order delivery again? ❌ Doubt it.\nWould I visit in person? ✅ Most likely.",
        "time": 1759362447,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "jemima griffiths",
        "rating": 5,
        "text": "Speechless!!! Outstanding food, couldn’t fault anything! Very authentic turkish food and the most lovely staff. Will be returning on our next visit. Just try the patlican ezme (roasted aubergine) and the hummus is to die for!! A hidden gem in Dalston. Super affordable they do a lunch deal for 13.50 per person",
        "time": 1750081705,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Miroslav Výbošťok",
        "rating": 5,
        "text": "This was the first restaurant in London that I would say was actually very good. Nice personal, interesting flavours.",
        "time": 1753093673,
        "relative_time_description": "2 months ago"
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
    "fsa_authority": "Hackney",
    "fsa_url": "https://ratings.food.gov.uk/business/469523",
    "fsa_last_inspection": "2023-12-04T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:48.114Z",
    "lastVerifiedFSA": "2025-10-16T23:17:38.083Z",
    "createdAt": "2025-10-16T20:23:48.114Z",
    "updatedAt": "2025-10-16T20:24:39.768Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Cirrik 19 Numara Bos — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_cirrik-19-numara-bos_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.439Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Cirrik 19 Numara Bos",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "34 Stoke Newington Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 1613
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/cirrik-19-numara-bos-aBzE5bwY",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
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
    "image_card_path": "/images/restaurants/cirrik-19-numara-bos-aBzE5bwY/turkish-cirrik-19-numara-bos-aBzE5bwY-card-24329396.webp",
    "image_hero_path": "/images/restaurants/cirrik-19-numara-bos-aBzE5bwY/turkish-cirrik-19-numara-bos-aBzE5bwY-hero-06baa6dd.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJC3tJlEAFdkgRD9S3kGU0KS4",
    "slug": "fes-restaurant-3kGU0KS4",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJC3tJlEAFdkgRD9S3kGU0KS4",
    "name": "Fes Restaurant",
    "description": "A sophisticated escape from the ordinary, where every dish tells a story of culinary craftsmanship. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.8,
    "user_ratings_total": 749,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "210 Walworth Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "210 Walworth Rd, London",
    "postcode": "SE17 1JE",
    "borough": "Central London",
    "lat": 51.4891566,
    "lng": -0.0965451,
    "phone": "020 7701 0004",
    "phone_international": "+44 20 7701 0004",
    "website": "http://www.fesrestaurant.co.uk/",
    "url": "https://maps.google.com/?cid=3326247410614129679",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
        "Sunday: 1:00 – 10:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2200"
          },
          "open": {
            "day": 0,
            "time": "1300"
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
        "reference": "AciIO2cje96Htf8RO2Fv20NyGKdQ-aCCjrNytG_K9nYiTGSeZBlUob9u3yM_0rOzyK33kiWuMts8inrhLaMsPVvdZJ5PrBNCxhU3fZ66LIM7T-jzYhDa_87EKUuN2Tdp4_AztPtTfGnFl3i3hvYmC4phbf52OY3DH4LEE9hFN28XjlCu3dWWuME7T7r2coVSS3-yLea3OJqyFYLJEaT7TfdZZyuPCMdqeL_KZBAtLaS5CRHMR2tSt_baHcm2HCBLCqHkifba_VPIzt28DPm16jv2tEIAVIQmozj72DVdAnlYcmFAGg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cje96Htf8RO2Fv20NyGKdQ-aCCjrNytG_K9nYiTGSeZBlUob9u3yM_0rOzyK33kiWuMts8inrhLaMsPVvdZJ5PrBNCxhU3fZ66LIM7T-jzYhDa_87EKUuN2Tdp4_AztPtTfGnFl3i3hvYmC4phbf52OY3DH4LEE9hFN28XjlCu3dWWuME7T7r2coVSS3-yLea3OJqyFYLJEaT7TfdZZyuPCMdqeL_KZBAtLaS5CRHMR2tSt_baHcm2HCBLCqHkifba_VPIzt28DPm16jv2tEIAVIQmozj72DVdAnlYcmFAGg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111903775413688227029\">Fes Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2fHSiIPBMyCGIvVvnx3gB8JI24dXgjZZRy5ZLhUZ9iZB57kCxZmdz9fdzQolAEdYE_5-dkkFoqA43CSILlaC1mXtcmIzpVCoztbRU2TH_H_BLlq4_KQroI8taBAGhUU5YXjChrMnxe_vROm81StgWE7UEEgWv6dyHXY-ZmreB-SUIIpwdYErKoYKa0HKyaaMcYeoEwercdds-w5S_7jMuCB9xmB1obSvCTBtDUDsZhKSnrnlAtbIo26ajpu44AUGIyVp0mESPdUSUIr8x7jV7vGcl2LquBINEQnyvaPwuEK0A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2fHSiIPBMyCGIvVvnx3gB8JI24dXgjZZRy5ZLhUZ9iZB57kCxZmdz9fdzQolAEdYE_5-dkkFoqA43CSILlaC1mXtcmIzpVCoztbRU2TH_H_BLlq4_KQroI8taBAGhUU5YXjChrMnxe_vROm81StgWE7UEEgWv6dyHXY-ZmreB-SUIIpwdYErKoYKa0HKyaaMcYeoEwercdds-w1200S_7jMuCB9xmB1obSvCTBtDUDsZhKSnrnlAtbIo26ajpu44AUGIyVp0mESPdUSUIr8x7jV7vGcl2LquBINEQnyvaPwuEK0A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/111903775413688227029\">Fes Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dBtK4Qn8EJBjxiKnfB47AYQH_HrAZAK3X0zH-qcyNt9k5vc9-W9fgwlycErj3ZzNTMU7WeI4Eim8iC1xgs4hPqrzD0hcb3fRo1R74dCaRjYeMD9ZcPhdG9Gme9hDdpK9W3REQ6-VOMlroZgwhoRQxUmK9GiInJmhy0SDhDtM30_bwpU4-chXkj_kYKsVdNs7LRA8hXWk8WxpzgMHCx823j8i-JanX4jqjAfkllJS14theSFe7TnHGkvpNtvHo_QxgKs1qIQZQrGpqY4m5MAxUEKBneIK2so2HtRdIdAGKhYmh7Wmsx2ibGcupRToHPMXafEt91g5L2xmWZrLJzAyRxX45NmjzS9rBGrIZqh6IIwD-HXVvO_xJKBpxmApJBHcEDQnykOgNnYG93CxV6Hx76Zs6OF6tSEf4SaMFJn-QHdWMQAQKAp21dCKsOBg",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dBtK4Qn8EJBjxiKnfB47AYQH_HrAZAK3X0zH-qcyNt9k5vc9-W9fgwlycErj3ZzNTMU7WeI4Eim8iC1xgs4hPqrzD0hcb3fRo1R74dCaRjYeMD9ZcPhdG9Gme9hDdpK9W3REQ6-VOMlroZgwhoRQxUmK9GiInJmhy0SDhDtM30_bwpU4-chXkj_kYKsVdNs7LRA8hXWk8WxpzgMHCx823j8i-JanX4jqjAfkllJS14theSFe7TnHGkvpNtvHo_QxgKs1qIQZQrGpqY4m5MAxUEKBneIK2so2HtRdIdAGKhYmh800Wmsx2ibGcupRToHPMXafEt91g5L2xmWZrLJzAyRxX45NmjzS9rBGrIZqh6IIwD-HXVvO_xJKBpxmApJBHcEDQnykOgNnYG93CxV6Hx76Zs6OF6tSEf4SaMFJn-QHdWMQAQKAp21dCKsOBg&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104871210185223805387\">Chrissie Chou</a>"
        ]
      },
      {
        "reference": "AciIO2cwZFvjo5OlrP0E6dB0j7FxoZ3d78MUDPstyjkM34SLVYaPqcNOXZjPhE3WgMBs5HOXZjviybxduPRT-ocbE77Dogna3tgtlaMVL5vAqVOH_-BLDQvnXiqPkMQibkOG3Iv9lCC60Dn5eQF3MzULPr2gCshZlAsNtHWyidiPwuvsRrqOFt31mNipO9w7ny8C4urQkmjyStCO20OCl1418m8Dmr3z0I2jWhR_R0iCBN7DkBRVl1MqhE2YmtL6odmFMeBwRhjTFlB-uo1K2f9emgHFqjefRWDgYZwmzBOQJgZkiRrsFmpxsg7fcfnGDRSsOu8xI_IxJzHeqVgTOF0Z5HSadYlsE5WDqIN7qlIrhBmoln7r55XQD7ifj-US9j-UfpTUzn_OxWBd4N0FgxmDscItlU8MvKKW9mcAp5J3qAIo0A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cwZFvjo5OlrP0E6dB0j7FxoZ3d78MUDPstyjkM34SLVYaPqcNOXZjPhE3WgMBs5HOXZjviybxduPRT-ocbE77Dogna3tgtlaMVL5vAqVOH_-BLDQvnXiqPkMQibkOG3Iv9lCC60Dn5eQF3MzULPr2gCshZlAsNtHWyidiPwuvsRrqOFt31mNipO9w1200ny8C4urQkmjyStCO20OCl1418m8Dmr3z0I2jWhR_R0iCBN7DkBRVl1MqhE2YmtL6odmFMeBwRhjTFlB-uo1K2f9emgHFqjefRWDgYZwmzBOQJgZkiRrsFmpxsg7fcfnGDRSsOu8xI_IxJzHeqVgTOF0Z5HSadYlsE5WDqIN7qlIrhBmoln7r55XQD7ifj-US9j-UfpTUzn_OxWBd4N0FgxmDscItlU8MvKKW9mcAp5J3qAIo0A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/107798597612515364046\">Nasir Ali</a>"
        ]
      },
      {
        "reference": "AciIO2exzrIxOXTDZHYNIvo5SvLdXoGYAyDFe2VixqwwE4P70VBv-HpZh8brAStUUpn6iUEBW0nzIlsksYaayH_ph4Ppr2UhvH7fup6whsxLqucafRPa4N-7xnMRXkYLIqT5hGq-LKZAodkHmWfrB2SUP0rGQNdNRW5QVmbplQxgGqu7-k1woPSCs0q7yqnDfnVUegPhCGDaxG5XJZNagpgkX-itDMfF3IdssBOgY0-cs4kvUrHNCZfQhDGxL81hTp2qBxSzjcSMEAaVv3LLA9PaEBSF7zdsDEH_8JEWyWH6iCFAUsfpLJ5nLu_uRi4zWP-dGS-LydORT9429mtNvZxkbi5WYIN7aKHmwYb2VMxCdBxRBtbsVkznSVV92zWNUEJ_OBlQ7VLsKY6W4qG1Tp67jC1bsGz1jFPqcbSsFKss9Jw70fM3Wa1s03HjTOY7tw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2exzrIxOXTDZHYNIvo5SvLdXoGYAyDFe2VixqwwE4P70VBv-HpZh800brAStUUpn6iUEBW0nzIlsksYaayH_ph4Ppr2UhvH7fup6whsxLqucafRPa4N-7xnMRXkYLIqT5hGq-LKZAodkHmWfrB2SUP0rGQNdNRW5QVmbplQxgGqu7-k1woPSCs0q7yqnDfnVUegPhCGDaxG5XJZNagpgkX-itDMfF3IdssBOgY0-cs4kvUrHNCZfQhDGxL81hTp2qBxSzjcSMEAaVv3LLA9PaEBSF7zdsDEH_8JEWyWH6iCFAUsfpLJ5nLu_uRi4zWP-dGS-LydORT9429mtNvZxkbi5WYIN7aKHmwYb2VMxCdBxRBtbsVkznSVV92zWNUEJ_OBlQ7VLsKY6W4qG1Tp67jC1bsGz1jFPqcbSsFKss9Jw1200fM3Wa1s03HjTOY7tw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/114906366644731438555\">Fawaz almehrij</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Wasim Idoo",
        "rating": 5,
        "text": "The quality of the food was fantastic. Some restaurants I've eaten claim to use lamb but often can be mutton, but not this one. These guys use very good quality ingredients. My Yogürtlu Shish was fantastic. The lamb was incredibly tender and juicy. I'll be coming back just for this alone. The service was reasonably good. I think they could be a little more attentive and check everything is ok. They did however offer cup of Turkish tea on the house which was really helpful after such a hearty meal, a nice added touch at the end.\nA job well done!",
        "time": 1755631076,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Luigi Di Biasi",
        "rating": 5,
        "text": "First time eating here and I was truly impressed by the size and the taste of the food. Super delicious, fresh, generous. A must try in the area 100%\n\nAnd thanks to Mohamed and all his team!",
        "time": 1756582495,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Jd Han",
        "rating": 5,
        "text": "Absolutely loved this place! The Turkish food was delicious and came in really big portions—great value for money. The staff were super friendly and made us feel right at home. The atmosphere was cozy yet vibrant, perfect for a relaxed meal with friends or family. Fun experience overall, and we’ll definitely be back to try more dishes!",
        "time": 1744832958,
        "relative_time_description": "6 months ago"
      },
      {
        "author_name": "Milad Khost (Dr)",
        "rating": 2,
        "text": "Extremely Disappointing Experience – Would Strongly Recommend Avoiding This Restaurant\n\nI rarely leave negative reviews, but our recent visit to this small Turkish restaurant was so shockingly poor that I feel compelled to share our experience in full detail, hoping it might help others avoid the same mistake.\n\nFrom the moment my partner and I walked in, it was clear that something was off. The atmosphere was unwelcoming and the service — or rather, the complete lack of it — was one of the worst I have experienced in any restaurant in London, or anywhere else for that matter.\n\nLet me begin with the staff attitude, which was simply appalling. The person who approached our table to take our order didn’t even bother to greet us. No “hello,” no “good evening,” nothing. Just a blank stare, followed by silence as if we were an inconvenience rather than customers. This wasn’t a case of someone being shy or overworked — it was plain rudeness. When we said thank you after giving our order or when receiving something at the table, the waiter didn’t respond at all. No smile, no nod, not even eye contact in most cases — just an indifferent, cold look.\n\nIn my culture — and in Turkish hospitality too — mutual respect and warmth are the foundation of good service. Turkish restaurants are usually known for their welcoming atmosphere, generosity with bread, and attentive service. This place, however, seems to have entirely missed that memo. I don’t expect over-the-top pampering, but basic human courtesy is the minimum anyone should expect from hospitality staff.\n\nSpeaking of bread, let’s talk about the extra charge for additional bread — something I have never seen in a Turkish restaurant before. Bread is often complimentary in Middle Eastern and Turkish dining, especially when the meals are served with dips or grilled meats. Here, not only were we charged extra for a small basket of bread, but there was also no mention of this when we asked for it. It was only when the bill arrived that we noticed the charge. While it’s not about the money, it’s the principle: being transparent with customers and not exploiting basic expectations like bread with a meal.\n\nNow, about the food quality. At best, it was average. Nothing particularly bad, but certainly nothing special or memorable either. The meat was a bit dry, the salads lacked freshness, and the seasoning was inconsistent. I’ve had far better meals in takeaway kebab shops than what we were served here. For the price we paid, the value was seriously lacking.\n\nAnd yes — the pricing. For a small, casual restaurant with mediocre food and poor service, the bill was surprisingly high. The dishes are priced as if you’re dining in a high-quality, fully-staffed Turkish restaurant with excellent ambiance and a pleasant experience — when in fact, the experience was more like eating in a disinterested diner that just happens to serve Turkish food.\n\nTo be clear, the real issue wasn’t just one specific thing, but the overall experience:\n•\tThe unwelcoming attitude from the staff\n•\tThe absence of any basic manners\n•\tThe surprise charge for something that should be complimentary\n•\tThe underwhelming food\n•\tThe high price tag for what we received\n\nAll of this combined made for an experience that left a bad taste in our mouths — both literally and figuratively.\n\nUnfortunately, this restaurant seems to lack even the most basic understanding of customer service.\n\nTo anyone considering visiting this place, my honest advice is: don’t waste your time or money. There are plenty of wonderful Turkish restaurants across London where the food is authentic, the prices are fair, and — most importantly — the staff genuinely care about your experience.\n\nThis was one of those rare meals where we left not just unsatisfied, but genuinely frustrated. A dinner that should have been an enjoyable evening out for me and my partner turned into a disappointing memory that we won’t soon forget — not because of the food, but because of how we were treated.\n\nAbsolutely not recommended.",
        "time": 1747338152,
        "relative_time_description": "5 months ago"
      },
      {
        "author_name": "P R",
        "rating": 5,
        "text": "Great food - we shared the Adana kebab and chicken wings and they were both delicious. You get bread and side salad complimentary and the salad is a plate each so no need to share! Chilli and garlic sauce also complimentary and were very nice. Prices are good, £15 for the Adana kebab which is very reasonable for quality and portion.",
        "time": 1742809202,
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
    "fsa_rating_text": "5",
    "fsa_authority": "Southwark",
    "fsa_url": "https://ratings.food.gov.uk/business/1096369",
    "fsa_last_inspection": "2024-11-13T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:49.059Z",
    "lastVerifiedFSA": "2025-10-16T23:17:49.508Z",
    "createdAt": "2025-10-16T20:23:49.059Z",
    "updatedAt": "2025-10-16T20:24:41.825Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Fes Restaurant — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_fes-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.440Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Fes Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "210 Walworth Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.8,
        "reviewCount": 749
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/fes-restaurant-3kGU0KS4",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:00 PM",
        "Friday: 12:00 PM – 12:00 AM",
        "Saturday: 12:00 PM – 12:00 AM",
        "Sunday: 1:00 – 10:00 PM"
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
    "image_card_path": "/images/restaurants/fes-restaurant-3kGU0KS4/turkish-fes-restaurant-3kGU0KS4-card-7809f45c.webp",
    "image_hero_path": "/images/restaurants/fes-restaurant-3kGU0KS4/turkish-fes-restaurant-3kGU0KS4-hero-b8af6b40.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ53D3yEAFdkgRVnlGzBtMI-k",
    "slug": "the-mantl-GzBtMI-k",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ53D3yEAFdkgRVnlGzBtMI-k",
    "name": "The Mantl",
    "description": "Turkish restaurant offering traditional cuisine & a 6-course taster menu in an easygoing setting.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 2168,
    "price_level": 2,
    "price_range": null,
    "address": {
      "formatted": "142 Brompton Rd, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "142 Brompton Rd, London",
    "postcode": "SW3 1HY",
    "borough": "Central London",
    "lat": 51.4985862,
    "lng": -0.1660723,
    "phone": "020 7584 6677",
    "phone_international": "+44 20 7584 6677",
    "website": "http://www.themantl.com/",
    "url": "https://maps.google.com/?cid=16799354717297080662",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 12:00 – 10:45 PM",
        "Tuesday: 12:00 – 10:45 PM",
        "Wednesday: 12:00 – 10:45 PM",
        "Thursday: 12:00 – 10:45 PM",
        "Friday: 12:00 – 10:45 PM",
        "Saturday: 12:00 – 10:45 PM",
        "Sunday: 12:00 – 10:45 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2245"
          },
          "open": {
            "day": 0,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2245"
          },
          "open": {
            "day": 1,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2245"
          },
          "open": {
            "day": 2,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2245"
          },
          "open": {
            "day": 3,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2245"
          },
          "open": {
            "day": 4,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2245"
          },
          "open": {
            "day": 5,
            "time": "1200"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2245"
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
        "reference": "AciIO2e5eavuMBG5TOj0aY8oSk8XcLJ3CHohRtVXDfdUqJp4dscYXrxAZWgNEApZ-qkn9SJsBSevcMI64xdh_3sIN39zhHtfYxvBDwjeVmP70fDGfDQscTvp6_JUsckrigeJtyzhfm3_yZJ5U6vBNBJu7oGsQakbekRvFumgRP5yd1W-OV5j9wTwsAWH7aZqUz47MdRQFrivQ1onTnmVj3eVfxpbWMHutFaRp5jUv1IH8p6NtwrfOak8zt2IBvXvjK4j-r3YJULvZY7oelebbQ5I66BNO9EnYNk1PnR2oAKmiyY6Fw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2e5eavuMBG5TOj0aY8oSk8XcLJ3CHohRtVXDfdUqJp4dscYXrxAZWgNEApZ-qkn9SJsBSevcMI64xdh_3sIN39zhHtfYxvBDwjeVmP70fDGfDQscTvp6_JUsckrigeJtyzhfm3_yZJ5U6vBNBJu7oGsQakbekRvFumgRP5yd1W-OV5j9wTwsAWH7aZqUz47MdRQFrivQ1onTnmVj3eVfxpbWMHutFaRp5jUv1IH8p6NtwrfOak8zt2IBvXvjK4j-r3YJULvZY7oelebbQ5I66BNO9EnYNk1PnR2oAKmiyY6Fw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105503085496029507608\">The Mantl - Turkish Restaurant Near Harrods</a>"
        ]
      },
      {
        "reference": "AciIO2eqco4Wfwiv57IS4tjjA4xF0ITgdk9hOHvgzBGavHV7V3bx0KAX5erTVUVqScGbPq4XxXkEMHxmDsBtscgcJOtryRzuVRDNVAORWlevTZc5crcfkGNXCWenFnCFsAmG2rxgV7yMSARS6wLKaBjcjMSLHvTymB13r-gIlXqCebwmdXqu1gVIaYwL40Lpl4T3n_DCD55jtpb9zu148hZteRhAZPDiFqomDNPo7X4vJHiUlzyoKV_pRE8kcdpHYR7XGjEBRo4jBatPs_H_0nIeQDY6xhwhquho4XoD5bTDSCPTCA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eqco4Wfwiv57IS4tjjA4xF0ITgdk9hOHvgzBGavHV7V3bx0KAX5erTVUVqScGbPq4XxXkEMHxmDsBtscgcJOtryRzuVRDNVAORWlevTZc5crcfkGNXCWenFnCFsAmG2rxgV7yMSARS6wLKaBjcjMSLHvTymB13r-gIlXqCebwmdXqu1gVIaYwL40Lpl4T3n_DCD55jtpb9zu148hZteRhAZPDiFqomDNPo7X4vJHiUlzyoKV_pRE8kcdpHYR7XGjEBRo4jBatPs_H_0nIeQDY6xhwhquho4XoD5bTDSCPTCA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105503085496029507608\">The Mantl - Turkish Restaurant Near Harrods</a>"
        ]
      },
      {
        "reference": "AciIO2dJsAokQqVcNkt1lcZfjOpsFkqDmZ4P_CMmcw_WDtsVU-gRXrnEpS_FF4NPRHG2NH-mPm8u8WNmGqECOws0aXjG4Nh2ShpNYioRaSdeBUX4zcNUQ4zv5vOnOTlc5J9dqNLTpWjTJRl8X6LT2sOWeUySaalUhyqWiXqrQhRiCopzBL9YhINabxKtSh90rKiA_f5dZqFfKb8BFhxKLUSRQ7PZQ1glpbLcVMlWAdXlYXMNaZedq6Y-l-WEx5eL2rMZCMi95K_uG7y2P621HquZl3MuRUo-4dGgh9MbuMalJSI0B88oqPN_zp3Lii6gT_oygvUuhTfmPMVwq-1t6IpgidreADzjILJyxGCe5VhlMS9EdtGiAYSAaLOftnNwO-R6I375isCT-hN6qH4xkRGkeYnlGV84pv5N71NH1vlSD8_eGiTb",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dJsAokQqVcNkt1lcZfjOpsFkqDmZ4P_CMmcw_WDtsVU-gRXrnEpS_FF4NPRHG2NH-mPm8u8WNmGqECOws0aXjG4Nh800ShpNYioRaSdeBUX4zcNUQ4zv5vOnOTlc5J9dqNLTpWjTJRl8X6LT2sOWeUySaalUhyqWiXqrQhRiCopzBL9YhINabxKtSh90rKiA_f5dZqFfKb8BFhxKLUSRQ7PZQ1glpbLcVMlWAdXlYXMNaZedq6Y-l-WEx5eL2rMZCMi95K_uG7y2P621HquZl3MuRUo-4dGgh9MbuMalJSI0B88oqPN_zp3Lii6gT_oygvUuhTfmPMVwq-1t6IpgidreADzjILJyxGCe5VhlMS9EdtGiAYSAaLOftnNwO-R6I375isCT-hN6qH4xkRGkeYnlGV84pv5N71NH1vlSD8_eGiTb&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110289868408728387637\">Davina Oriakhi-Idris</a>"
        ]
      },
      {
        "reference": "AciIO2cNykhfwWmNcs5YLaqOKjBc9eIi76wv6IosLqWO6Hp8cNNrNlHxBdL3MJXYfaNnC5fVkdfndXf-CP_JZBv__k86IHDP5hU6aPvFkJt2JucPe-rhPIIZqAFou4VK3_vKHEt7gN-jSsAXxwuLmDgzTQO5ACs8QS2iPzsC8QY15npKAy8_wb0KcvsiMyo-0L35L-BWXM571n7wdeb_uFZAMf0TLeEtqcIgG2eqYq94pnE_xFa8vGqPizsIG2b_InUOB2_ZZrvBLoEn6dDF9BO8raOHbCs2tPfOQuhV0IXwtFEXv2HDwnFRFpsjKI0r0znny9I_KTS-h3BoOUQvSQ_7lasxQ8ipCKutFGJrGB1orjXPQhcXDVH6dlUDt0S_8F3dMLC1zMHmaIQl7qSdRsFs_pDDa_iL2Huvt5j8sWALu5PZO28EY2YZfTphJCN33A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cNykhfwWmNcs5YLaqOKjBc9eIi76wv6IosLqWO6Hp8cNNrNlHxBdL3MJXYfaNnC5fVkdfndXf-CP_JZBv__k86IHDP5hU6aPvFkJt2JucPe-rhPIIZqAFou4VK3_vKHEt7gN-jSsAXxwuLmDgzTQO5ACs8QS2iPzsC8QY15npKAy8_wb0KcvsiMyo-0L35L-BWXM571n7wdeb_uFZAMf0TLeEtqcIgG2eqYq94pnE_xFa8vGqPizsIG2b_InUOB2_ZZrvBLoEn6dDF9BO8raOHbCs2tPfOQuhV0IXwtFEXv2HDwnFRFpsjKI0r0znny9I_KTS-h800BoOUQvSQ_7lasxQ8ipCKutFGJrGB1orjXPQhcXDVH6dlUDt0S_8F3dMLC1zMHmaIQl7qSdRsFs_pDDa_iL2Huvt5j8sWALu5PZO28EY2YZfTphJCN33A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116885039375050494529\">Owen Thal</a>"
        ]
      },
      {
        "reference": "AciIO2dqhnDrOnZt68tZoicbR2dp_ZorDWwYCq0tdYAZuauTF1rAfd2BfDsTmh4Tvr5FqMzFOp_kREBzuXK-IoXHCbZeU3K-gmh6TuD6yC5JGZStpm375AlGvK_ZFFvtc2ZRud6GWpdm_pw5w1vCVX_nqzMWMNtU2KPeZXd_iyZSHQ2qvW7iPH7a4yt78W8pdqmrSGIWGmVkJHzGXTA8UWZDoFtr6TkOtIhvnZmWkPbQ7zJPnNA1k3iPEkSX5bGGEgq68XiLf_-yZRKFeVMTEPVMs_4GhYAcV9srt88qkYOcbPihgw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dqhnDrOnZt68tZoicbR2dp_ZorDWwYCq0tdYAZuauTF1rAfd2BfDsTmh800Tvr5FqMzFOp_kREBzuXK-IoXHCbZeU3K-gmh6TuD6yC5JGZStpm375AlGvK_ZFFvtc2ZRud6GWpdm_pw1200w1vCVX_nqzMWMNtU2KPeZXd_iyZSHQ2qvW7iPH7a4yt78W8pdqmrSGIWGmVkJHzGXTA8UWZDoFtr6TkOtIhvnZmWkPbQ7zJPnNA1k3iPEkSX5bGGEgq68XiLf_-yZRKFeVMTEPVMs_4GhYAcV9srt88qkYOcbPihgw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105503085496029507608\">The Mantl - Turkish Restaurant Near Harrods</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Mohammed Alhusayni",
        "rating": 5,
        "text": "I highly recommend this restaurant, we ordered many different dishes, and all of them were amazing. The meat was juicy and tender, and I liked the hummus. However the salad was simple, just punch of vegetables, and the rice was alright. The bread was amazing and remarkable, we asked them to give us some more bread for takeaway, and they gave it to us for free!, which was really nice from them.\nThe restaurant was clean and there was attention to details, for example the bathroom soap seems to be from an expensive brand. The staff were nice with us.",
        "time": 1753025594,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Esra Egin",
        "rating": 3,
        "text": "The service at The Mantl was absolutely lovely – especially one waiter who spoke Turkish with us and was extremely friendly and attentive. In terms of hospitality and staff, it’s definitely a five-star experience.\n\nHowever, we were a bit disappointed with the value for money. We ordered two starters and one main dish, and although the food was decent in taste, the portion sizes were very small – even for starters. The main dish was also quite minimal, and considering the prices, the portions felt overpriced.\n\nThe quality of the food was good, but not exceptional – for example, the cooking level wasn’t perfectly on point. So overall, while the service was excellent, the food experience didn’t quite justify the price tag.",
        "time": 1748387382,
        "relative_time_description": "4 months ago"
      },
      {
        "author_name": "Abdul Rehman Dastaguir",
        "rating": 5,
        "text": "Rated as one of the best Turkish restaurants in London and boy did Mantl disappoint. They took great care of each dish, from 24-30 hour marination of the best cuts of meat to delicately presenting it when serving. The food blew us away and lived up to the hype. We were well looked after by Jacob upon arrival who explained the concept and preparation of the dishes. Whilst Ali, went out his way to make us feel hospitable and looked after our children which was quite welcoming - making us want to come back.\n\nIf you're in Knightsbridge, make sure to eat something here. You will not be disappointed.",
        "time": 1756581664,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Ângelo Simões",
        "rating": 5,
        "text": "A perfect setting to explore Turkish flavors, where the food offers original notes of lesser-known but incredibly delicious tastes.\nThe service is also attentive. We asked for recommendations on what dishes to order, and I believe the experience was so enjoyable thanks to that.",
        "time": 1751984220,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "H (hazeraa)",
        "rating": 5,
        "text": "Celebrated my birthday at Mantl and it was an outstanding experience from start to finish. The mixed grill for two featured premium, perfectly cooked meats that truly impressed. The atmosphere is warm and inviting - ideal for special occasions or anyone looking to savour authentic, high-quality Turkish cuisine.\n\nAttentive service completed the package, making the whole evening feel effortlessly special. A definite 10/10 and one of the best dining experiences I’ve had recently, and will easily return again",
        "time": 1754421618,
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
    "fsa_authority": "Kensington and Chelsea",
    "fsa_url": "https://ratings.food.gov.uk/business/1096592",
    "fsa_last_inspection": "2025-08-13T00:00:00",
    "lastVerifiedGoogle": "2025-10-16T20:23:47.853Z",
    "lastVerifiedFSA": "2025-10-16T23:17:36.435Z",
    "createdAt": "2025-10-16T20:23:47.853Z",
    "updatedAt": "2025-10-16T20:24:39.481Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "The Mantl — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_the-mantl_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.439Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "The Mantl",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "142 Brompton Rd, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 2168
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/the-mantl-GzBtMI-k",
      "openingHours": [
        "Monday: 12:00 – 10:45 PM",
        "Tuesday: 12:00 – 10:45 PM",
        "Wednesday: 12:00 – 10:45 PM",
        "Thursday: 12:00 – 10:45 PM",
        "Friday: 12:00 – 10:45 PM",
        "Saturday: 12:00 – 10:45 PM",
        "Sunday: 12:00 – 10:45 PM"
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
    "image_card_path": "/images/restaurants/the-mantl-GzBtMI-k/turkish-the-mantl-GzBtMI-k-card-fd364d3c.webp",
    "image_hero_path": "/images/restaurants/the-mantl-GzBtMI-k/turkish-the-mantl-GzBtMI-k-hero-65e1f138.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJDeqCLEIbdkgRrcQGtZA40HM",
    "slug": "liman-restaurant-GtZA40HM",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJDeqCLEIbdkgRrcQGtZA40HM",
    "name": "Liman Restaurant",
    "description": "Mediterranean specialties dished up in an understated destination with a warm vibe.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.7,
    "user_ratings_total": 1689,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "60 Penton St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "60 Penton St, London",
    "postcode": "N1 9PZ",
    "borough": "Central London",
    "lat": 51.5334818,
    "lng": -0.1112641,
    "phone": "020 3583 6442",
    "phone_international": "+44 20 3583 6442",
    "website": "http://www.liman.co.uk/",
    "url": "https://maps.google.com/?cid=8345232303681094829",
    "opening_hours": {
      "open_now": null,
      "weekday_text": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
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
        "reference": "AciIO2ffP6lt6ie98lubGsRnYY_qS1JN6XdwZSci9Ef2aDo4QFYozHSeIpfbGcRzJ6fG8d0NC9lRIs4HDOr-L3q-Skjme1tnLxuPUYwef1hA7KTWStaIl-mk4xvWZEVy57ZhRxCv69pmcfZiinH0LllMiTRwzsgHk3CRu4PpRsX3j157rtkjXu_j3cAEuTziOrBPs4Gha5jagecTG7u6P1--AwORc8InzOk2eWEq8EDawT6FPmSSsV4qgs8gKNC45ioQFnHDjGMJHRFzf4dt87K9CWVs7VI37li7Ii6he6I2r2geMA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ffP6lt6ie98lubGsRnYY_qS1JN6XdwZSci9Ef2aDo4QFYozHSeIpfbGcRzJ6fG8d0NC9lRIs4HDOr-L3q-Skjme1tnLxuPUYwef1hA7KTWStaIl-mk4xvWZEVy57ZhRxCv69pmcfZiinH0LllMiTRwzsgHk3CRu4PpRsX3j157rtkjXu_j3cAEuTziOrBPs4Gha5jagecTG7u6P1--AwORc8InzOk2eWEq8EDawT6FPmSSsV4qgs8gKNC45ioQFnHDjGMJHRFzf4dt87K9CWVs7VI37li7Ii6he6I2r2geMA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104357345808151652007\">Liman Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2etfgeAr_r30S0F3eVwFOdXXt-lPdZlJR3v1uqg2NrlZBzmEEydP9i-sseAnTTsGFwoiqRXnIToZRYPt0CJBMksTXbszgZtCrR2GkauWKEYtSwUUFht-jc85phtwC_K-gC8RlHtNqF7UII4vw0tBImjS3whzK6KlejLUPAGi-Zx6btSghnkFGsR_nKx9piVFE8DFBOCaLYS5kpvHPWJYuSSG4hKn_Q3NOb3yk2i1YjGv6hLLm3b-EKlmwzhj42mBPMSLRcI8NbYBRTmW2k-B6bkSHj8enM685GYGaTxa9xs2Q",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2etfgeAr_r30S0F3eVwFOdXXt-lPdZlJR3v1uqg2NrlZBzmEEydP9i-sseAnTTsGFwoiqRXnIToZRYPt0CJBMksTXbszgZtCrR2GkauWKEYtSwUUFht-jc85phtwC_K-gC8RlHtNqF7UII4vw1200tBImjS3whzK6KlejLUPAGi-Zx6btSghnkFGsR_nKx9piVFE8DFBOCaLYS5kpvHPWJYuSSG4hKn_Q3NOb3yk2i1YjGv6hLLm3b-EKlmwzhj42mBPMSLRcI8NbYBRTmW2k-B6bkSHj8enM685GYGaTxa9xs2Q&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/104357345808151652007\">Liman Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2dh3WGQShs9s17ViLkPP20lOO2qk8dhH0iwZs_nYpf9X7sUDbrnK_FKDRia4MLrhLBsuRBR-Nd9G8ngVnG3CGg9MvgwScgW4i5c0egUvJm9azUXJftpall9K0B1t3wjjWhDoQAZ6Jg2GZtqGHKmvwwAsKlQxLZl9zqIqQurrzZWvD0sUMKncuTTeJBh59pRez4B--SyvmbsB1Yb0vajVrilWPXuPZiN4XpChVSJNJjDVxuNpI3qSXcu3XsQV8P-PAsIPopFhGyWvN9Y8JTIbVT4SBfkld05Z2SP1_WTejFk6y4jT-uDuzv7NfY-ElDuyrXq2XuFICMA37XxR2d4S_EceSHDPiJLnkh9-n39GWZAs2psYsEBRoiRjbel7WrB-9JQLHxGPyI6v4yIF0f2yCbUYmfPAe21b-UuVBzvQh9tPvOf",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dh800WGQShs9s17ViLkPP20lOO2qk8dhH0iwZs_nYpf9X7sUDbrnK_FKDRia4MLrhLBsuRBR-Nd9G8ngVnG3CGg9MvgwScgW4i5c0egUvJm9azUXJftpall9K0B1t3wjjWhDoQAZ6Jg2GZtqGHKmvwwAsKlQxLZl9zqIqQurrzZWvD0sUMKncuTTeJBh59pRez4B--SyvmbsB1Yb0vajVrilWPXuPZiN4XpChVSJNJjDVxuNpI3qSXcu3XsQV8P-PAsIPopFhGyWvN9Y8JTIbVT4SBfkld05Z2SP1_WTejFk6y4jT-uDuzv7NfY-ElDuyrXq2XuFICMA37XxR2d4S_EceSHDPiJLnkh9-n39GWZAs2psYsEBRoiRjbel7WrB-9JQLHxGPyI6v4yIF0f2yCbUYmfPAe21b-UuVBzvQh9tPvOf&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/116123006404497141170\">Eduardo</a>"
        ]
      },
      {
        "reference": "AciIO2dozRVfTHdBU--_Lx2JRGj3oPUTvDOUR3cnqCOjX-RdxKFn0btYeBnKEeH1rkzhGVuvcKYuneZVtB386V7TjsWGPh1MRxID0fc56nUrTOMXRwo6QP8z00Rg9SYbQVioot1BH7soG1E2syBw9gemaNOT1MZLAx30y34tF3c6FZ5LF3ECWI04JrTCNn-p5oQGICqSz8fmKSL7OwSOAEX14HGmHpgmF82ai_Iw9rmb7aAAQNKiF53uPv5ELglJdrRb0QsSCKEnx_pPE9wROYTSoQA0n0D6THzuCAWwtw-Nw76NOKVNBOIqJTDCEXzt3rfDRo4nm6erohI9zgVvAMjJ3_wfk4dHHPEZ_fh6MpQxvszy-TNaAJkmL1taMeOuj5C0mutC54LRx_r8C4r0bSr9Rv0UxsoXLG9P08qd1vlpFo9KqQ",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dozRVfTHdBU--_Lx2JRGj3oPUTvDOUR3cnqCOjX-RdxKFn0btYeBnKEeH1rkzhGVuvcKYuneZVtB386V7TjsWGPh800MRxID0fc56nUrTOMXRwo6QP8z00Rg9SYbQVioot1BH7soG1E2syBw1200gemaNOT1MZLAx30y34tF3c6FZ5LF3ECWI04JrTCNn-p5oQGICqSz8fmKSL7OwSOAEX14HGmHpgmF82ai_Iw9rmb7aAAQNKiF53uPv5ELglJdrRb0QsSCKEnx_pPE9wROYTSoQA0n0D6THzuCAWwtw-Nw76NOKVNBOIqJTDCEXzt3rfDRo4nm6erohI9zgVvAMjJ3_wfk4dHHPEZ_fh6MpQxvszy-TNaAJkmL1taMeOuj5C0mutC54LRx_r8C4r0bSr9Rv0UxsoXLG9P08qd1vlpFo9KqQ&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/103806935325993022585\">Greg Dorrell</a>"
        ]
      },
      {
        "reference": "AciIO2dr-jZnBjbK9zaVp3MBuuyNQp8q-ogcSfs_TkUllQRWm-7ECL0fP0e20-SQtGn1ah3mIFGHrLxcBMsKcvgBrbAgBoDFloN7UHR4K0H5M7XTeooHv8Ppvm1ZKDg35qtMZRCrP7rgLHEGq6-N9GBQhEYP0tK-YOcEH2IYfpzvlGdZuf9FlRqB7U_hwaVI9jTIyiIm6HR-0UBGYYzBcCw59m54TaTQQFBjW4j-2nxyMpsTFFD_IQ8MyIccHgzHnOj0Z3_l2BOPvOU6dinXKHQLWDfZMOMdKQvbeJckNenVCM7QmbH0QfRPxxwQYzlJcbchd4fCgGWhxXcZkuMHKn4iAjjX0S53sgT1tGqVrzdeJ7Zy0mKlEGkUGiFsVAYJ8Kh1cWAlffyJyNdILM7hpiP2rv_jc3__I8ouIB2_OHj5Wjui0WI2BKqGuIM7NNq9xu5d",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dr-jZnBjbK9zaVp3MBuuyNQp8q-ogcSfs_TkUllQRWm-7ECL0fP0e20-SQtGn1ah800mIFGHrLxcBMsKcvgBrbAgBoDFloN7UHR4K0H5M7XTeooHv8Ppvm1ZKDg35qtMZRCrP7rgLHEGq6-N9GBQhEYP0tK-YOcEH2IYfpzvlGdZuf9FlRqB7U_hwaVI9jTIyiIm6HR-0UBGYYzBcCw1200m54TaTQQFBjW4j-2nxyMpsTFFD_IQ8MyIccHgzHnOj0Z3_l2BOPvOU6dinXKHQLWDfZMOMdKQvbeJckNenVCM7QmbH0QfRPxxwQYzlJcbchd4fCgGWhxXcZkuMHKn4iAjjX0S53sgT1tGqVrzdeJ7Zy0mKlEGkUGiFsVAYJ8Kh1cWAlffyJyNdILM7hpiP2rv_jc3__I8ouIB2_OHj5Wjui0WI2BKqGuIM7NNq9xu5d&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105420275211846588337\">Kerem Aksoy</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Natalia Vodnik",
        "rating": 5,
        "text": "I’ve been here twice for lunch — and it’s honestly out of this world! Such a cozy, welcoming atmosphere, and the staff is incredibly friendly. The food is absolutely amazing: you must try the meatballs and the chicken kebab — they’re perfection. And their fish was fresh and beautifully cooked. This is one of those places you just keep coming back to 🙌Highly recommend!",
        "time": 1752082604,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "MattGame123",
        "rating": 5,
        "text": "Absolutely fantastic! The lamb chops were the best lamb I’ve ever had. Succulent and cooked perfectly. The hummus starter with crispy pitta was beautiful too, and the service was brilliant. Couldn’t recommend any higher! I asked for some more sauce for the lamb because it was absolutely beautiful. Gizem was a super helpful waitress!",
        "time": 1756757651,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Miguel Vázquez Cid",
        "rating": 5,
        "text": "What a great find! I recently had dinner here and was thoroughly impressed. I kicked things off with the calamari, and let me tell you, it was a home run. It was perfectly crispy and flavorful, and they certainly don't skimp on the portion. The real star of the show, though, was the lamb shank. It was cooked to perfection—so tender it practically melted off the bone. On top of all that, the service was top-notch. The staff were on the ball, always checking in and more than happy to help with anything we needed. Highly recommend!",
        "time": 1758045031,
        "relative_time_description": "4 weeks ago"
      },
      {
        "author_name": "Afua Korang",
        "rating": 5,
        "text": "An absolutely wonderful experience here at Liman restaurant! We held a 70th birthday celebration and the staff were amazing, so accommodating and helpful. We were able to decorate the place to our liking and the ambience was incredible, intimate and classy. We had the set menu for our guests and the food was sooo good! A good variety, well presented and delicious. Our guests are still raving about it days later! Even when they ran out of our dessert option, they were able to pivot smoothly and offer a lovely alternative. A truly wonderful experience, we highly recommend 👌",
        "time": 1753359487,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Tolu Oludipo",
        "rating": 5,
        "text": "One of the best dinners I’ve had in a while! We ordered the calamari for starters and had complimentary Turkish bread which was delicious!\nThe main dinner was mixed grill, lamb skewers, lamb chops and shanks which was so lovely and cooked to perfection 😋",
        "time": 1753561329,
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
    "fsa_authority": "Islington",
    "fsa_url": "https://ratings.food.gov.uk/business/905197",
    "fsa_last_inspection": "2023-06-27T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:42.294Z",
    "lastVerifiedFSA": "2025-10-16T23:17:39.695Z",
    "createdAt": "2025-10-15T10:53:42.294Z",
    "updatedAt": "2025-10-16T20:24:40.076Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Liman Restaurant — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_liman-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.439Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Liman Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "60 Penton St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.7,
        "reviewCount": 1689
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/liman-restaurant-GtZA40HM",
      "openingHours": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.657Z",
    "image_card_path": "/images/restaurants/liman-restaurant-GtZA40HM/turkish-liman-restaurant-GtZA40HM-card-2066d794.webp",
    "image_hero_path": "/images/restaurants/liman-restaurant-GtZA40HM/turkish-liman-restaurant-GtZA40HM-hero-838231e1.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJf0QUHQAddkgRLiCe0towDVA",
    "slug": "shahs-halal-food-walthamstow-e0towDVA",
    "name": "Shah's Halal Food Walthamstow",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {
      "halal": true
    },
    "rating": 4.7,
    "user_ratings_total": 108,
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
    "postcode": "E17 7JR",
    "borough": "Central London",
    "lat": 51.584006,
    "lng": -0.0237523,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "https://www.thebestinlondon.co.uk",
    "url": "https://maps.google.com/?cid=5768320414126055470",
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
            "day": 5,
            "time": "2300"
          },
          "open": {
            "day": 5,
            "time": "1100"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2300"
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
        "Friday: 11:00 AM – 11:00 PM",
        "Saturday: 11:00 AM – 11:00 PM",
        "Sunday: 11:00 AM – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "turkish",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Shah's Halal Food Walthamstow",
        "venueId": 729
      }
    ],
    "reviews": [
      {
        "author_name": "Madalin Bitca",
        "author_url": "https://www.google.com/maps/contrib/104394032975642894856/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjX3R90OAJ6sZFHW2yp7S7I5Y2QJcWoNUMaJ0ymHGU9KSGvPwwdEXA=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "a week ago",
        "text": "Amazing food, amazing staff, very friendly and polite, clean and the green sauce is good. Musa welcomed us very nicely.\n\nEspecially when habibi came from upstairs we just had a laugh and enjoyed our time. Well recommend.",
        "time": 1759527176,
        "translated": false
      },
      {
        "author_name": "Arden",
        "author_url": "https://www.google.com/maps/contrib/113080920003200888466/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXhTgxb4eAq0X1bXk22gHuSW_ulXJgQTmUooHQauMBwZeRJm_iJ=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 4,
        "relative_time_description": "4 months ago",
        "text": "Shah’s is a good place for chicken and rice, with sauce and salad. They are generous with meat and rice - wish I could have gotten a bit more salad. Also think they gave me a bit too much white sauce - I like the spicy sauce better.\n\nAn improvement would be the trays. A study found that 85% of black plastic was shown to have high levels of flame retardants, including food trays.",
        "time": 1749408142,
        "translated": false
      },
      {
        "author_name": "Shari Dixon",
        "author_url": "https://www.google.com/maps/contrib/117357742953407547001/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXiLdlfg6nkKJ4yjKJRxR_2lUgZiDva2JiP7U16lTKDHSiKZJhj=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "3 months ago",
        "text": "Absolutely outstanding experience at Shah’s Halal Food! From the moment you walk in, you’re greeted by a spotless, clean atmosphere that makes you feel right at home. The food? Incredible. Every bite is bursting with authentic, perfectly seasoned flavors. Their platters are generous, the rice is always fluffy, and the meats are cooked to perfection  tender, juicy, and full of bold, savory spices.\n\nA huge shoutout to Hapip and the entire staff for their warm, friendly service. Hapip went above and beyond to make sure everything was just right and added a personal touch to our visit. It’s rare to find a place where both the food and the people leave such a lasting impression.\n\nIf you’re craving delicious halal eats in a clean, welcoming setting, Shah’s Halal is the spot. Highly recommend   can’t wait to come back!",
        "time": 1752174355,
        "translated": false
      },
      {
        "author_name": "S",
        "author_url": "https://www.google.com/maps/contrib/115407758368283079571/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWxXZemfTxP4jk08J_wBwvsgYIQ8mYYnkXceL7OGGBxviLXztpw=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "First time trying the Walthamstow branch and they did not disappoint! Portions were huge and taste was great too. Right next to the mall entrance too so quite convenient. Will definitely be back. We got the chicken over rice with white and green sauce as it’s the best item on the menu I’m not a fan of their lamb but chicken is chefs kiss. Servers don’t come across as friendly bubbly maybe that’s their personality but other than that tasty food for good prices.",
        "time": 1746577592,
        "translated": false
      },
      {
        "author_name": "R A",
        "author_url": "https://www.google.com/maps/contrib/103901710786804909510/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXmzpLgpHGtY4hM_eTfIERjT8PBfGyttKTHoi3GqTccwSiXYty0=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "4 months ago",
        "text": "Came here for lunch to try out the chicken & rice platter.\nIt was flavoursome, well cooked & tasted great.\nHowever the salad did not look fresh & they could have been more generous with the sauce.\nWill still recommend a try if you are nearby.",
        "time": 1748284601,
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
      "query": "halal restaurant East London",
      "area": "East London",
      "type": "dietary"
    },
    "fsa_rating": 4,
    "fsa_rating_text": "4",
    "fsa_authority": "Waltham Forest",
    "fsa_url": "https://ratings.food.gov.uk/business/1804600",
    "lastVerifiedGoogle": "2025-10-16T23:14:25.847Z",
    "lastVerifiedFSA": "2025-10-16T23:34:33.220Z",
    "createdAt": "2025-10-16T23:14:25.847Z",
    "updatedAt": "2025-10-16T23:14:36.065Z",
    "fsa_last_inspection": "2025-07-05T00:00:00",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Shah's Halal Food Walthamstow — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_shahs-halal-food-walthamstow_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.581Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Shah's Halal Food Walthamstow",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
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
        "reviewCount": 108
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/shahs-halal-food-walthamstow-e0towDVA",
      "openingHours": [
        "Monday: 11:00 AM – 11:00 PM",
        "Tuesday: 11:00 AM – 11:00 PM",
        "Wednesday: 11:00 AM – 11:00 PM",
        "Thursday: 11:00 AM – 11:00 PM",
        "Friday: 11:00 AM – 11:00 PM",
        "Saturday: 11:00 AM – 11:00 PM",
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
    "image_card_path": "/images/restaurants/shahs-halal-food-walthamstow-e0towDVA/turkish-shahs-halal-food-walthamstow-e0towDVA-card-b0313725.webp",
    "image_hero_path": "/images/restaurants/shahs-halal-food-walthamstow-e0towDVA/turkish-shahs-halal-food-walthamstow-e0towDVA-hero-ffdbc1a0.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJKw2qKgCn2EcRfdNz4mIP1sY",
    "slug": "tanjia-restaurant-z4mIP1sY",
    "name": "Tanjia Restaurant",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 48,
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
    "postcode": "E15 4QZ",
    "borough": "Central London",
    "lat": 51.5395847,
    "lng": 0.0001618,
    "phone": "020 8555 8175",
    "phone_international": "+44 20 8555 8175",
    "website": "http://www.tanjiarestaurant.co.uk/",
    "url": "https://maps.google.com/?cid=14327656181906264957",
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
      ],
      "weekday_text": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:30 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
        "Sunday: 12:00 – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "turkish",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Tanjia Restaurant",
        "venueId": 581
      }
    ],
    "reviews": [
      {
        "author_name": "Sandra Fudala",
        "author_url": "https://www.google.com/maps/contrib/111849674000329555500/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVE37-UUKuow3YquwuhmSs_0E2bMtAylqaGZPboei2KHOAAsrC-=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "a week ago",
        "text": "Found a real hidden gem in Stratford: Tanjia, a Moroccan restaurant literally right outside the station. We tried a bit of everything – couscous, fish tagine, chicken livers, a few starters – and everything delivered. The fish tagine was a standout, rich and perfectly cooked, full of flavour. The chicken livers were another hit (definitely don’t skip them).\n\nThe staff were genuinely lovely, prices very reasonable, and the whole vibe felt authentic without trying too hard. Funny enough, we only discovered it through an Instagram Reel, and now I’m wondering how I’d never been before considering I’ve lived in East for ages.\n\nDefinitely one I’ll be coming back to – and bringing friends next time.",
        "time": 1759617559,
        "translated": false
      },
      {
        "author_name": "Daniel Grabner",
        "author_url": "https://www.google.com/maps/contrib/116543075653779212238/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJJ2i5TnkxvL1MbiM9uM7YtvkARFwPkd2OdW8zs2Re06xKC4g=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "3 months ago",
        "text": "Absolutely recommendable! It was our first time trying Moroccan cuisine – and we were positively surprised! I had the Couscous Deluxe: a delicious variety of tender meats, from beef to chicken, served with a mix of flavorful vegetables. Truly outstanding! The caramelized onions on top added the perfect finishing touch. But be warned – the portion sizes are definitely not for those with a small appetite!\n\nPrices are around £20–25 per person, which is honestly a steal for the quality and quantity you get.\n\nAlso worth mentioning: the place is very child-friendly. A sweet little girl was sitting at the table next to us, and the owner treated her with such kindness and warmth. She was clearly having a great time – it was lovely to see.\n\nA big thank you to the very attentive waiter and the friendly owner (I assume?) – you made the experience even more enjoyable!",
        "time": 1752353361,
        "translated": false
      },
      {
        "author_name": "STASKA S",
        "author_url": "https://www.google.com/maps/contrib/103490810779075757733/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUEUcw2YLzWC68wWgJHRCK50RsT_4KoOAxWFJWgAun5lFZzCk6Z=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "Really beautiful restaurant I must say! Simply breathtaking traditional pieces and cuisine.\n\nIn the back of the restaurant there is shisha area. Restaurant was not busy at the time of my visit, but calm and relaxed atmosphere.\n\nPrices are fair as well as portions, cooked very well and delicious. On the table we had ordered beef tanjia and kafta meshwi (my personal favourite), the dishes are well seasoned, brings out true Moroccan goodness! Worth a try to taste true cuisine!\n\nRestaurant has private area for large gatherings. The plates, the tables, and the seating area is gorgeous!\n\nThe restaurant is easy to locate and access. The waitress serving us made sure we are comfortable and had everything we needed, very sweet.",
        "time": 1747503273,
        "translated": false
      },
      {
        "author_name": "Sheku Bangura",
        "author_url": "https://www.google.com/maps/contrib/112146366504389278556/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJHMFhZQabAZ4w1KkSIUu_9I9TCmhGGRRlLyNOUrPf6WqRtkg=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "Tanjia is authentic Moroccan cuisine the food has flavour and the gentleman a real brother named Mahedi whose a top man served me well the atmosphere is definitely old school Moroccan with Moroccan vibes the assist in the digestion of you well prepared food portion",
        "time": 1749073272,
        "translated": false
      },
      {
        "author_name": "Pablo Amil",
        "author_url": "https://www.google.com/maps/contrib/110826796579281037077/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLQ0H9QsridVjLo47vgFPrajc2d9iHRZbw9-hRiUJZQ6_DEqg=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "great taste, amazing service and huge portions! everything so traditional and good quality.\n\nThe service, unbeatable… definitely will repeat!",
        "time": 1753639945,
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
      "query": "halal restaurant Stratford London",
      "area": "Stratford",
      "type": "halal-area"
    },
    "fsa_rating": 3,
    "fsa_rating_text": "3",
    "fsa_authority": "Newham",
    "fsa_url": "https://ratings.food.gov.uk/business/1749066",
    "lastVerifiedGoogle": "2025-10-16T23:13:37.089Z",
    "lastVerifiedFSA": "2025-10-16T23:30:31.079Z",
    "createdAt": "2025-10-16T23:13:37.089Z",
    "updatedAt": "2025-10-16T23:14:36.060Z",
    "fsa_last_inspection": "2024-09-07T00:00:00",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Tanjia Restaurant — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_tanjia-restaurant_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.533Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Tanjia Restaurant",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
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
        "reviewCount": 48
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/tanjia-restaurant-z4mIP1sY",
      "openingHours": [
        "Monday: 12:00 – 11:00 PM",
        "Tuesday: 12:00 – 11:00 PM",
        "Wednesday: 12:00 – 11:00 PM",
        "Thursday: 12:00 – 11:30 PM",
        "Friday: 12:00 – 11:30 PM",
        "Saturday: 12:00 – 11:30 PM",
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
    "image_card_path": "/images/restaurants/tanjia-restaurant-z4mIP1sY/turkish-tanjia-restaurant-z4mIP1sY-card-0fa6791b.webp",
    "image_hero_path": "/images/restaurants/tanjia-restaurant-z4mIP1sY/turkish-tanjia-restaurant-z4mIP1sY-hero-3b9468d5.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ1StDTDEbdkgRIdqbGIr-qxs",
    "slug": "antalya-bGIr-qxs",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJ1StDTDEbdkgRIdqbGIr-qxs",
    "name": "Antalya",
    "description": "Lavish, colourful frescoes adorn this vibrant restaurant for classic Turkish and Mediterranean fare.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 2725,
    "price_level": 2,
    "price_range": "££",
    "address": {
      "formatted": "103-105 Southampton Row, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "103-105 Southampton Row, London",
    "postcode": "WC1B 4HH",
    "borough": "Central London",
    "lat": 51.5210799,
    "lng": -0.123894,
    "phone": "020 7580 5355",
    "phone_international": "+44 20 7580 5355",
    "website": "http://www.antalyarestaurant.co.uk/",
    "url": "https://maps.google.com/?cid=1993967129113385505",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 11:30 AM – 11:00 PM",
        "Tuesday: 11:30 AM – 11:30 PM",
        "Wednesday: 11:30 AM – 11:30 PM",
        "Thursday: 11:30 AM – 11:30 PM",
        "Friday: 11:30 AM – 11:30 PM",
        "Saturday: 11:30 AM – 11:30 PM",
        "Sunday: 11:30 AM – 11:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "2300"
          },
          "open": {
            "day": 0,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 1,
            "time": "2300"
          },
          "open": {
            "day": 1,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "2330"
          },
          "open": {
            "day": 2,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "2330"
          },
          "open": {
            "day": 3,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "2330"
          },
          "open": {
            "day": 4,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "2330"
          },
          "open": {
            "day": 5,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "2330"
          },
          "open": {
            "day": 6,
            "time": "1130"
          }
        }
      ]
    },
    "photos": [
      {
        "reference": "AciIO2d8XywIFYraFFHC-oMvK6CgLG-jpuiQNLITOjywjyfYBMi4WZC1qoOv6vm6FWxb-uEIjXcqM5LR1J5dPbWaDCuXaMmNC-B2jB4vvXma1uE9P4saVcG5-Pp0aUB8EzIPi4DVSaubIcsGygTDl3LAgX9DxCxOvvOVJcE-ZJWLJfJfedpIhEicFvXrGqIwZmEDBWM1yD0wxxyT1kbGptS-FHMYeWleOMu-xB-yNCQEZ6p4UNaVPvQwK3CP9_3ixR5gV3pcdJl1fapfl7RTJeBRm8eU2R4pySglUotSWbsU-LWGXw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d8XywIFYraFFHC-oMvK6CgLG-jpuiQNLITOjywjyfYBMi4WZC1qoOv6vm6FWxb-uEIjXcqM5LR1J5dPbWaDCuXaMmNC-B2jB4vvXma1uE9P4saVcG5-Pp0aUB8EzIPi4DVSaubIcsGygTDl3LAgX9DxCxOvvOVJcE-ZJWLJfJfedpIhEicFvXrGqIwZmEDBWM1yD0wxxyT1kbGptS-FHMYeWleOMu-xB-yNCQEZ6p4UNaVPvQwK3CP9_3ixR5gV3pcdJl1fapfl7RTJeBRm8eU2R4pySglUotSWbsU-LWGXw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106049092918706971685\">Antalya Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2euHkuWhE4dxs_5zNWJN95wsf3td8DyrLQiT99sCp8DKMrYHsT8gcDWifrBkLORD_2dEZ-hO8shvhLKHBmJ2vqTlG2hoi35cUh-1chuyvxaVHmyyjHZ4uDS4alsX2sFO54scLSSldi6Q7XPQJd8fxu5npJdAm056HW_DuVM0FCgOSNESzx98ixuWocoJC44w2rprt7s02bQ_Xwd1H9YrsqOeb0Q8RSX3C7hHFErCEIm3Z9vLOSKoNA9jKu24zjC42z824VhIEv0tjXDGQghJHiAVy3IlXvWFAj_Io4gyomdgw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2euHkuWhE4dxs_5zNWJN95wsf3td8DyrLQiT99sCp8DKMrYHsT8gcDWifrBkLORD_2dEZ-hO8shvhLKHBmJ2vqTlG2hoi35cUh-1chuyvxaVHmyyjHZ4uDS4alsX2sFO54scLSSldi6Q7XPQJd8fxu5npJdAm056HW_DuVM0FCgOSNESzx98ixuWocoJC44w1200rprt7s02bQ_Xwd1H9YrsqOeb0Q8RSX3C7hHFErCEIm3Z9vLOSKoNA9jKu24zjC42z824VhIEv0tjXDGQghJHiAVy3IlXvWFAj_Io4gyomdgw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/106049092918706971685\">Antalya Restaurant</a>"
        ]
      },
      {
        "reference": "AciIO2d0uaFneQRFsiowIRVwhfhOlGqMq6MiwFdott4L-rMGCA8ALML6lbNuEfgldSeq4zEuma2diluG9vQeuqbx13kK-s4fNBLrFXXd9EP9ihzrZLYL6xokMM0pXuJ3Y6ojascNwoswKoPkWa8cJXnvuaVrShxYB_lvBPO6UxBnnoZoh5q0qZlem2QDMec0vYJa0FVPg_qDMwYybFi8Ptol5s5ykq5e8ZVmDyZDftOQsn578Zn7VT5fFl05xi2K_HhAXuCSVDOtKIadhHW4B5nS6-4UVO6ATbda9wTcR85-oXgRw7-h5gYXheQ2JkTaKF_7867c7bIT34mbrxI8yVHs0qlegdpDcyiive4ts1MwVAB2QiZJH0CYUSwnrEnDlL4kGflHammCa2mpsu3QbQydG4ACzFvbJQyTRnkdC4oJxUjqdFAwHnvKIPaLgAcKNw",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2d0uaFneQRFsiowIRVwhfhOlGqMq6MiwFdott4L-rMGCA8ALML6lbNuEfgldSeq4zEuma2diluG9vQeuqbx13kK-s4fNBLrFXXd9EP9ihzrZLYL6xokMM0pXuJ3Y6ojascNwoswKoPkWa8cJXnvuaVrShxYB_lvBPO6UxBnnoZoh800q0qZlem2QDMec0vYJa0FVPg_qDMwYybFi8Ptol5s5ykq5e8ZVmDyZDftOQsn578Zn7VT5fFl05xi2K_HhAXuCSVDOtKIadhHW4B5nS6-4UVO6ATbda9wTcR85-oXgRw1200-h5gYXheQ2JkTaKF_7867c7bIT34mbrxI8yVHs0qlegdpDcyiive4ts1MwVAB2QiZJH0CYUSwnrEnDlL4kGflHammCa2mpsu3QbQydG4ACzFvbJQyTRnkdC4oJxUjqdFAwHnvKIPaLgAcKNw&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/113912032903085153729\">Dominika p</a>"
        ]
      },
      {
        "reference": "AciIO2dUcikmhwOO9no7miyn7C_YyGW_Cm7k1HR8iiUpa2YlnO6ptNsLf-AYBQga8B2YgQYGZaLoax7nPiMW41fDuP_QmByHuYBE3dcua-58QuPZcGJhQnXHMpa0-55B38w1pd5PHK3m5wPZX58JjC0A8mPi47DWWshFWrqXDDAhGUVdg7Cpi_YcH-aYRZ0p3C6ca5jdGQ8rBDsigWQ4TlD5uyODrqPc2B8qAbWG7GM0VyO2Roau7nr46JLa6RpFLXvKRs076y0nQhXFuRmPDKlCQy40sCiZjg0Q0KF5N6Csz_TW9C5TtjGg9vWjNLwbxZl5aThFNhIIx5ooCwcglz4jA-7t_RgOTJzcGayLiCdJh25tspvSzEDXNhkFQooOJWc9rBWsMuGGwTPEEAkeHYKmPZhc02MtCFjDRbj1iQVMNYk",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2dUcikmhwOO9no7miyn7C_YyGW_Cm7k1HR8iiUpa2YlnO6ptNsLf-AYBQga8B2YgQYGZaLoax7nPiMW41fDuP_QmByHuYBE3dcua-58QuPZcGJhQnXHMpa0-55B38w1200pd5PHK3m5wPZX58JjC0A8mPi47DWWshFWrqXDDAhGUVdg7Cpi_YcH-aYRZ0p3C6ca5jdGQ8rBDsigWQ4TlD5uyODrqPc2B8qAbWG7GM0VyO2Roau7nr46JLa6RpFLXvKRs076y0nQhXFuRmPDKlCQy40sCiZjg0Q0KF5N6Csz_TW9C5TtjGg9vWjNLwbxZl5aThFNhIIx5ooCwcglz4jA-7t_RgOTJzcGayLiCdJh800tspvSzEDXNhkFQooOJWc9rBWsMuGGwTPEEAkeHYKmPZhc02MtCFjDRbj1iQVMNYk&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110589112515062633740\">Michaël Bayet</a>"
        ]
      },
      {
        "reference": "AciIO2eEbSz6IZdK9GM4hrUZO0PqV6qoZDWtY0t2Sphe6uuiLTrjO8LEMN3_zKJ1LPtFZBL6F3haFKKkzd75PXhu2ZXpjNvyahZ_wz2EaF7F4IzqsieXlfLRin6XF-fvCCVARno7s7Mgco8jneTU0nNlE9aIj98DdcC10s5Cql-d9cYRB8HnI5ZLbnR05HSBkjPwfM6GqRL5dngsdhyraCOVRwYxsa354t4jZKTibRAh9W-_K-ltqkIoEhX7fbCYc1Zy0rYKhWjX1XFIGq8YAjxgoyn2NgNXcx0olyB6_xC6UJK7SBvRUnc6SahwEnbbhLNSdRgT14p7RcZMSY3XsXpXyR3-vQtD8xG9h5UYjicLO1II4yuw4UKijNC5Fx5q6NfNCnVdrUwAoveAQC-Dqwbbw0lGBVn3J-baxj7i2NSZQ4_yvaaSZSonTTD3qazEZTb3",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2eEbSz6IZdK9GM4hrUZO0PqV6qoZDWtY0t2Sphe6uuiLTrjO8LEMN3_zKJ1LPtFZBL6F3haFKKkzd75PXhu2ZXpjNvyahZ_wz2EaF7F4IzqsieXlfLRin6XF-fvCCVARno7s7Mgco8jneTU0nNlE9aIj98DdcC10s5Cql-d9cYRB8HnI5ZLbnR05HSBkjPwfM6GqRL5dngsdhyraCOVRwYxsa354t4jZKTibRAh800W-_K-ltqkIoEhX7fbCYc1Zy0rYKhWjX1XFIGq8YAjxgoyn2NgNXcx0olyB6_xC6UJK7SBvRUnc6SahwEnbbhLNSdRgT14p7RcZMSY3XsXpXyR3-vQtD8xG9h5UYjicLO1II4yuw1200UKijNC5Fx5q6NfNCnVdrUwAoveAQC-Dqwbbw0lGBVn3J-baxj7i2NSZQ4_yvaaSZSonTTD3qazEZTb3&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/105253006109110213271\">Femi “Femo” Aboluwarin</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Melissa Acar",
        "rating": 5,
        "text": "Antalya Restaurant was a fantastic find in the heart of London. We sat outdoors on a warm summer evening, and the setting was perfect, relaxed and inviting. The food was full of authentic Turkish flavour, beautifully presented, and made with fresh ingredients. From the grilled meats to the baklava, everything was delicious. The staff were friendly and attentive, making the whole experience even better. Highly recommended for anyone looking for great Turkish food, especially in the summer. Thank you again for the amazing food and service! We will definitely come back again ☺️🙏",
        "time": 1756065426,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Laura Mc Carren",
        "rating": 5,
        "text": "Stumbled above this restaurant on the way from the train station to our hotel and what a wonderful find it was!! Lunch was beyond a bargain. The chicken wrap was delicious and as for the Rosè… stunning. Our waiter Fatih was so friendly and welcoming. Such a gorgeous start to our holiday in London.",
        "time": 1756643908,
        "relative_time_description": "a month ago"
      },
      {
        "author_name": "Siddhi",
        "rating": 2,
        "text": "Tried the lunch deal and opted for the mezze meal option, definitely not worth almost £20 for the quantity given. Food was average, I was expecting a lot more considering the high reviews. The other dish in the picture is the lamb iskander, which was also alright, again not worth nearly £25. I'd probably skip this and get better value for money + better tasting food elsewhere.",
        "time": 1759269697,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Albertha Schmid",
        "rating": 5,
        "text": "My husband and I dined at Antalya last month when we visited London for two days. It was near the hotel we were staying in so we decided to try it. What a culinary delight! We were greeted immediately and made to feel welcome. Our phenomenal server was Fatih. He was attentive, friendly and a joy to talk with! He made our experience extra special!!\n\nThe food was delicious and fresh. I love lamb and had the lamb lokkum the first time we visited. I also had the Antalya heal, which was amazing!!\n\nWe went back for the second time on our last night. Much to our delight, we got Fatih again!! It was like seeing an old friend!\n\nIf we are ever in London again, we will for sure dine at Antalya!! It was a very special place for us and we have fond memories of the food and Fatih!\n\nI would highly, highly recommend this classy and authentic Turkish restaurant. A bonus is that it is near the British museum!!",
        "time": 1754277114,
        "relative_time_description": "2 months ago"
      },
      {
        "author_name": "Bige Aşgel",
        "rating": 5,
        "text": "I’ve been there several times. The food is delicious, the staff is welcoming and kind. When I go to London, this is the first restaurant I choose. Service is fast and menu has variety of options.",
        "time": 1755862202,
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
    "fsa_authority": "Camden",
    "fsa_url": "https://ratings.food.gov.uk/business/1199667",
    "fsa_last_inspection": "2024-07-24T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:41.058Z",
    "lastVerifiedFSA": "2025-10-16T23:17:42.931Z",
    "createdAt": "2025-10-15T10:53:41.058Z",
    "updatedAt": "2025-10-16T20:24:40.651Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Antalya — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_antalya_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.439Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Antalya",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
      ],
      "priceRange": "£2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "103-105 Southampton Row, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.5,
        "reviewCount": 2725
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/antalya-bGIr-qxs",
      "openingHours": [
        "Monday: 11:30 AM – 11:00 PM",
        "Tuesday: 11:30 AM – 11:30 PM",
        "Wednesday: 11:30 AM – 11:30 PM",
        "Thursday: 11:30 AM – 11:30 PM",
        "Friday: 11:30 AM – 11:30 PM",
        "Saturday: 11:30 AM – 11:30 PM",
        "Sunday: 11:30 AM – 11:00 PM"
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
    "image_card_path": "/images/restaurants/antalya-bGIr-qxs/turkish-antalya-bGIr-qxs-card-990baf32.webp",
    "image_hero_path": "/images/restaurants/antalya-bGIr-qxs/turkish-antalya-bGIr-qxs-hero-f4326904.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJq6odX8wcdkgRqVYcaETxpsM",
    "slug": "olives-and-oregano-london-caETxpsM",
    "name": "Olives and Oregano London",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "cafe",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.5,
    "user_ratings_total": 432,
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
    "postcode": "E1 1HJ",
    "borough": "Central London",
    "lat": 51.5177732,
    "lng": -0.0628557,
    "phone": "020 7539 9232",
    "phone_international": "+44 20 7539 9232",
    "website": "https://www.olivesandoregano.co.uk/",
    "url": "https://maps.google.com/?cid=14098220959636674217",
    "opening_hours": {
      "open_now": false,
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
            "day": 1,
            "time": "1930"
          },
          "open": {
            "day": 1,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 2,
            "time": "1930"
          },
          "open": {
            "day": 2,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 3,
            "time": "1930"
          },
          "open": {
            "day": 3,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 4,
            "time": "1930"
          },
          "open": {
            "day": 4,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 5,
            "time": "1930"
          },
          "open": {
            "day": 5,
            "time": "1130"
          }
        },
        {
          "close": {
            "day": 6,
            "time": "1930"
          },
          "open": {
            "day": 6,
            "time": "1130"
          }
        }
      ],
      "weekday_text": [
        "Monday: 11:30 AM – 7:30 PM",
        "Tuesday: 11:30 AM – 7:30 PM",
        "Wednesday: 11:30 AM – 7:30 PM",
        "Thursday: 11:30 AM – 7:30 PM",
        "Friday: 11:30 AM – 7:30 PM",
        "Saturday: 11:30 AM – 7:30 PM",
        "Sunday: 12:00 – 8:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "turkish",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Olives and Oregano London",
        "venueId": 679
      }
    ],
    "reviews": [
      {
        "author_name": "Yaseen",
        "author_url": "https://www.google.com/maps/contrib/115371560744965798135/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUIfdg45Htcf-BOZq2kK6kBJv8jW3Onr7IB5JWCylgPV1MniANj=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "The Chicken Kiev is the GOAT! I’ve been coming here for a while now and I absolutely love it every time. Consistently tasty, perfectly cooked, and full of flavour. Great service and a nice atmosphere too highly recommend!",
        "time": 1754953203,
        "translated": false
      },
      {
        "author_name": "sanjay joshi",
        "author_url": "https://www.google.com/maps/contrib/106687289198429433538/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUCyu2rKN8TmEo1AjeP6KiHy3PpPVJJCQBD55nRCb9waDmCSReHnw=s128-c0x00000000-cc-rp-mo-ba3",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "This restaurant offers an exceptional dining experience, characterized by attentive staff and supportive management. The food is outstanding and provides great value, with generous portion sizes that are sure to satisfy. The vegetarian options are also commendable. I highly recommend this establishment.",
        "time": 1746342194,
        "translated": false
      },
      {
        "author_name": "Fardin Amad",
        "author_url": "https://www.google.com/maps/contrib/114946834305583515451/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjW6_3dkKiWEggSO6qtTSpyqxnqQVkkHQ3gUeDrsK_L4r40Ar6t1=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "One of the best Sunday roast meals I’ve had in my life. It was very reasonably priced too. The total bill for two of us with drinks was 28£. Will definitely go again.\n\nBit dark inside.",
        "time": 1745965339,
        "translated": false
      },
      {
        "author_name": "Humayra Ismail",
        "author_url": "https://www.google.com/maps/contrib/117655665225237571603/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUon6_O1f0fdwTpYq6CY-OixLV8_DdgLdyC5VdJ2siGSumqXemu=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "Delicious Sunday roast! Service from staff is absolutely amazing and prices are very affordable. I got the large mix roast- massive portion for £18, would recommend!!!",
        "time": 1749991308,
        "translated": false
      },
      {
        "author_name": "Amatullah",
        "author_url": "https://www.google.com/maps/contrib/111906304260922893079/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjV7tbiCIv4ffGu8N45HITJm_iOYK6OVUQmQEYSY_XgyKc7e0AeJ=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "a month ago",
        "text": "Delicious food, attentive staff and quick service. The portions are good and food is hearty and tasty for a good price!",
        "time": 1756436839,
        "translated": false
      }
    ],
    "types": [
      "cafe",
      "establishment",
      "food",
      "point_of_interest",
      "restaurant"
    ],
    "discoveredBy": {
      "query": "restaurant near Whitechapel station",
      "area": "Whitechapel",
      "type": "station"
    },
    "fsa_rating": 5,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:14:09.457Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:14:09.457Z",
    "updatedAt": "2025-10-16T23:14:36.063Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Olives and Oregano London — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_olives-and-oregano-london_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.565Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Olives and Oregano London",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
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
        "reviewCount": 432
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/olives-and-oregano-london-caETxpsM",
      "openingHours": [
        "Monday: 11:30 AM – 7:30 PM",
        "Tuesday: 11:30 AM – 7:30 PM",
        "Wednesday: 11:30 AM – 7:30 PM",
        "Thursday: 11:30 AM – 7:30 PM",
        "Friday: 11:30 AM – 7:30 PM",
        "Saturday: 11:30 AM – 7:30 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.660Z",
    "image_card_path": "/images/restaurants/olives-and-oregano-london-caETxpsM/turkish-olives-and-oregano-london-caETxpsM-card-d2de1091.webp",
    "image_hero_path": "/images/restaurants/olives-and-oregano-london-caETxpsM/turkish-olives-and-oregano-london-caETxpsM-hero-3543f61e.webp",
    "cuisine_match": true
  },
  {
    "place_id": "ChIJ_2MpI7UddkgRHYhVMXmovgc",
    "slug": "lokma-westfield-VMXmovgc",
    "name": "Lokma Westfield",
    "description": "Contemporary cuisine that's as Instagram-worthy as it is palate-pleasing. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "turkish"
    ],
    "categories": [
      "bar",
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.4,
    "user_ratings_total": 1801,
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
    "postcode": "E20 1EN",
    "borough": "Central London",
    "lat": 51.5433903,
    "lng": -0.0082191,
    "phone": "020 4531 4702",
    "phone_international": "+44 20 4531 4702",
    "website": "https://lokma-westfield.com/",
    "url": "https://maps.google.com/?cid=558068642312718365",
    "opening_hours": {
      "open_now": false,
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
      ],
      "weekday_text": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:00 PM",
        "Saturday: 12:00 – 10:00 PM",
        "Sunday: 12:00 – 10:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "turkish",
        "area": "Central London",
        "provenance": "curated_food_image",
        "venueName": "Lokma Westfield",
        "venueId": 556
      }
    ],
    "reviews": [
      {
        "author_name": "Britney Omosigho",
        "author_url": "https://www.google.com/maps/contrib/109297023800524284985/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKKYCUtdI5pFLonlsiaWwpVl5h4oNQpRHZU27xMayNEy-tdccY=s128-c0x00000000-cc-rp-mo-ba2",
        "rating": 5,
        "relative_time_description": "a week ago",
        "text": "I had my birthday dinner here yesterday and was amazed with the service. The food was amazing - tasted lovely and the portions were really big for the price. Aida was so helpful and attentive and made sure everyone was satisfied at the dinner. She really made me feel more at ease. Another waiter played a game with us at the beginning which was a nice way to get us having fun.",
        "time": 1759681230,
        "translated": false
      },
      {
        "author_name": "Kitty",
        "author_url": "https://www.google.com/maps/contrib/101157714396888974946/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXCtUVjzbKNdukyPCCRKWorW8T4WgyLnzEMseyyZubRHR3ZLL2Znw=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 4,
        "relative_time_description": "a month ago",
        "text": "Went here for a catch up with a friend and the atmosphere was really nice. The shisha was pretty standard, even though we went for a premium flavour—and at £45 it felt quite pricey for what it was.\n\nWe also ordered 3 starters, 2 drinks (hot chocolate + latte) and a pitcher jug, and the bill came to over £100, which felt super expensive considering we didn’t get that much. On top of that, they only accept cash, which was a bit annoying. Service was okay, nothing special, but overall the vibe of the place was nice 😊",
        "time": 1757194607,
        "translated": false
      },
      {
        "author_name": "Pabz B",
        "author_url": "https://www.google.com/maps/contrib/102279680166010898742/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUOUlEVH-y0K2yu4fdae5flTI3CNUpoIBFSKIuHXXKCyh7elt9l=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "3 months ago",
        "text": "Definitely my favourite Turkish in London. Would highly recommend.\n\nI’ve lost count of how many times I’ve been here over the years, with groups of 2 to 10+, and it has always been consistently good. Went here the other day on a lovely, warm, sunny day and sat in the outdoor area - felt like I was enjoying an al-fresco dining experience abroad. Lovely relaxed atmosphere.\n\nMassive portions and the food is full of flavour and the meat/ chicken was tender and moist and always cooked to perfection and the chilli sauce is amazing. The kunefa is the show stopper though, and probably better than those I’ve had in Istanbul - there’s not many Turkish restaurants that sell it so I was so glad to find out that they do a few years ago - is the main reason I come here tbh - it’s cooked fresh and not heated up out of a box, it’s just the perfect dessert to end the meal.\n\nStaff are friendly and polite and the service is excellent. Reasonably priced for what you’re getting compared to other places in a prime location.",
        "time": 1752484369,
        "translated": false
      },
      {
        "author_name": "Paul Hooper",
        "author_url": "https://www.google.com/maps/contrib/100396383552008186130/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJCsYgXE2tDboX0_ttXs0UJJO4a9JGIWfqWlmBKKfGxHZbj6A=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "5 months ago",
        "text": "The staff were super friendly and welcoming. There’s plenty of seating both inside and outside, which is perfect depending on the weather. Some evenings they have happy hour deals, and there’s even a belly dancer and magician which makes it a really fun vibe. Loads of meat options on the menu and a few fish dishes too, so there’s something for everyone. Definitely recommend if you're looking for good food, good vibes, and a relaxed night out! (If you get the sea bass it contains bones)",
        "time": 1745650361,
        "translated": false
      },
      {
        "author_name": "Nasima Begum",
        "author_url": "https://www.google.com/maps/contrib/109457148226187319306/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocI9uEWAodZXYqs8dJtyV51c-ox7-taQdNahqK6tdF39xO4xjA=s128-c0x00000000-cc-rp-mo",
        "rating": 4,
        "relative_time_description": "2 months ago",
        "text": "I ordered the moussaka and it was really good, really big portions! I have allergies and the manager ensured everything was checked thoroughly. Would highly recommend and come again. Efsa was such a pleasure. Giving 4 stars only because i was disappointed to see soft drinks on the menu that are on the boycott list. Please change this and I will give a 5 star!",
        "time": 1755044919,
        "translated": false
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
    "discoveredBy": {
      "query": "restaurant Stratford London",
      "area": "Stratford",
      "type": "area"
    },
    "fsa_rating": 4,
    "fsa_rating_text": null,
    "fsa_authority": null,
    "fsa_url": null,
    "lastVerifiedGoogle": "2025-10-16T23:13:29.014Z",
    "lastVerifiedFSA": null,
    "createdAt": "2025-10-16T23:13:29.014Z",
    "updatedAt": "2025-10-16T23:14:36.059Z",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=turkish_kebab_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Lokma Westfield — Turkish",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "turkish_lokma-westfield_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.525Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Lokma Westfield",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "turkish"
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
        "reviewCount": 1801
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/lokma-westfield-VMXmovgc",
      "openingHours": [
        "Monday: 12:00 – 10:00 PM",
        "Tuesday: 12:00 – 10:00 PM",
        "Wednesday: 12:00 – 10:00 PM",
        "Thursday: 12:00 – 10:00 PM",
        "Friday: 12:00 – 10:00 PM",
        "Saturday: 12:00 – 10:00 PM",
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
    "last_metadata_update": "2025-10-18T14:23:43.660Z",
    "image_card_path": "/images/restaurants/lokma-westfield-VMXmovgc/turkish-lokma-westfield-VMXmovgc-card-3610f5d0.webp",
    "image_hero_path": "/images/restaurants/lokma-westfield-VMXmovgc/turkish-lokma-westfield-VMXmovgc-hero-afaab797.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Turkish Restaurants in Central London (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest turkish restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of turkish cuisine in Central London." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-turkish-in-central-london-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Turkish Restaurants in Central London (2025)" />
        <meta property="og:description" content="Discover the finest turkish restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of turkish cuisine in Central London." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-turkish-in-central-london-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Turkish Restaurants in Central London (2025)" />
        <meta name="twitter:description" content="Discover the finest turkish restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of turkish cuisine in Central London." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Turkish Restaurants in Central London (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-turkish-in-central-london-2025',
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
              <Link href="/turkish-restaurants-london" className="hover:text-white transition-colors">Turkish</Link>
              <span>›</span>
              <Link href="/areas" className="hover:text-white transition-colors">Areas</Link>
              <span>›</span>
              <Link href="/restaurants-central-london" className="hover:text-white transition-colors">Central London</Link>
              <span>›</span>
              <span className="text-white">Best Turkish in Central London (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Turkish Restaurants in Central London (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest turkish restaurants in Central London for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of turkish cuisine in Central London.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/efes-premium-kWL5j4TM" className="hover:text-yellow-600 transition-colors">
                Efes Premium
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 921 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Efes Premium offers exceptional turkish cuisine in Central London. With a 4.8-star rating from 921 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/efes-premium-kWL5j4TM" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJnzfL2mYJdkgRGYdkWL5j4TM" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/cirrik-19-numara-bos-aBzE5bwY" className="hover:text-yellow-600 transition-colors">
                Cirrik 19 Numara Bos
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 1,613 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 2/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Cirrik 19 Numara Bos offers exceptional turkish cuisine in Central London. With a 4.8-star rating from 1,613 reviews and a 2/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/cirrik-19-numara-bos-aBzE5bwY" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJxdO_dIwcdkgRjJxaBzE5bwY" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/fes-restaurant-3kGU0KS4" className="hover:text-yellow-600 transition-colors">
                Fes Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.8</span>
              <span>📝 749 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Fes Restaurant offers exceptional turkish cuisine in Central London. With a 4.8-star rating from 749 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/fes-restaurant-3kGU0KS4" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJC3tJlEAFdkgRD9S3kGU0KS4" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/the-mantl-GzBtMI-k" className="hover:text-yellow-600 transition-colors">
                The Mantl
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 2,168 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          The Mantl offers exceptional turkish cuisine in Central London. With a 4.7-star rating from 2,168 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/the-mantl-GzBtMI-k" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ53D3yEAFdkgRVnlGzBtMI-k" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/liman-restaurant-GtZA40HM" className="hover:text-yellow-600 transition-colors">
                Liman Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 1,689 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Liman Restaurant offers exceptional turkish cuisine in Central London. With a 4.7-star rating from 1,689 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/liman-restaurant-GtZA40HM" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJDeqCLEIbdkgRrcQGtZA40HM" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/shahs-halal-food-walthamstow-e0towDVA" className="hover:text-yellow-600 transition-colors">
                Shah's Halal Food Walthamstow
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.7</span>
              <span>📝 108 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Shah's Halal Food Walthamstow offers exceptional turkish cuisine in Central London. With a 4.7-star rating from 108 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/shahs-halal-food-walthamstow-e0towDVA" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/tanjia-restaurant-z4mIP1sY" className="hover:text-yellow-600 transition-colors">
                Tanjia Restaurant
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 48 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 3/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Tanjia Restaurant offers exceptional turkish cuisine in Central London. With a 4.6-star rating from 48 reviews and a 3/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/tanjia-restaurant-z4mIP1sY" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/antalya-bGIr-qxs" className="hover:text-yellow-600 transition-colors">
                Antalya
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 2,725 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Antalya offers exceptional turkish cuisine in Central London. With a 4.5-star rating from 2,725 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/antalya-bGIr-qxs" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJ1StDTDEbdkgRIdqbGIr-qxs" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/olives-and-oregano-london-caETxpsM" className="hover:text-yellow-600 transition-colors">
                Olives and Oregano London
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.5</span>
              <span>📝 432 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Olives and Oregano London offers exceptional turkish cuisine in Central London. With a 4.5-star rating from 432 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/olives-and-oregano-london-caETxpsM" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
        </div>
      </div>
    

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/lokma-westfield-VMXmovgc" className="hover:text-yellow-600 transition-colors">
                Lokma Westfield
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.4</span>
              <span>📝 1,801 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 4/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Lokma Westfield offers exceptional turkish cuisine in Central London. With a 4.4-star rating from 1,801 reviews and a 4/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/lokma-westfield-VMXmovgc" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
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
        <a href="/turkish-restaurants-london" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          All Turkish Restaurants
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
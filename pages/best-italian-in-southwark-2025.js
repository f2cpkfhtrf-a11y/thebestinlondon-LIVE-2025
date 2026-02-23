import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestItalianInSouthwark2025() {
  const venues = [
  {
    "place_id": "ChIJdZ6paFcDdkgRpPUHPngIeq8",
    "slug": "padella-HPngIeq8",
    "google_place_url": "https://www.google.com/maps/place/?q=place_id:ChIJdZ6paFcDdkgRpPUHPngIeq8",
    "name": "Padella",
    "description": "Where classic meets contemporary in perfect harmony. This Southwark spot showcases the incredible diversity of modern european cuisine with techniques that honor tradition while embracing innovation. With ratings this...",
    "cuisines": [
      "italian"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 8228,
    "price_level": 1,
    "price_range": "£",
    "address": {
      "formatted": "Borough Market, Padella, 6 Southwark St, London",
      "components": {
        "street_number": "",
        "route": "",
        "locality": "London",
        "country": "United Kingdom"
      }
    },
    "vicinity": "Borough Market, Padella, 6 Southwark St, London",
    "postcode": "SE1 1TQ",
    "borough": "Southwark",
    "lat": 51.5051655,
    "lng": -0.08992019999999999,
    "phone": "020 0000 0000",
    "phone_international": null,
    "website": "http://padella.co/",
    "url": "https://maps.google.com/?cid=12644428216325895588",
    "opening_hours": {
      "open_now": true,
      "weekday_text": [
        "Monday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Tuesday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Wednesday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Thursday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Friday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Saturday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Sunday: 11:30 AM – 3:45 PM, 5:00 – 9:00 PM"
      ],
      "periods": [
        {
          "close": {
            "day": 0,
            "time": "1545"
          },
          "open": {
            "day": 0,
            "time": "1130"
          }
        },
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
            "time": "1545"
          },
          "open": {
            "day": 1,
            "time": "1130"
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
            "time": "1545"
          },
          "open": {
            "day": 2,
            "time": "1130"
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
            "time": "1545"
          },
          "open": {
            "day": 3,
            "time": "1130"
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
            "time": "1545"
          },
          "open": {
            "day": 4,
            "time": "1130"
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
            "time": "1545"
          },
          "open": {
            "day": 5,
            "time": "1130"
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
            "time": "1545"
          },
          "open": {
            "day": 6,
            "time": "1130"
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
        "reference": "AciIO2cmdQDbk2GPXBQSvxnKrkkVXfgDCAnnBD5aKGTTzK7w-QuFn1UwOTz_MX_ZqhNj153VsK_zqnuxMJpxCe3UjQen2dxf01KkdidAgUssWy3XB_Vt3Y5JVwHyubm0CQM3CSypVhAouXkgAdveTAhAqek7YP9n8unFIiH_SFZuSq7gSk0F4RDvVtkdBPLGXCNjQFhZVe8LRZR5O0mISj1oxAE-HyxijVt4FqSxBI5uSkTpB0fTCN_QiHJC32x4QtxeT_P-TV9AgcoVrqTxXnNSOouJFugBmJ4s6yzboSwg_2fRsA",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cmdQDbk2GPXBQSvxnKrkkVXfgDCAnnBD5aKGTTzK7w-QuFn1UwOTz_MX_ZqhNj153VsK_zqnuxMJpxCe3UjQen2dxf01KkdidAgUssWy3XB_Vt3Y5JVwHyubm0CQM3CSypVhAouXkgAdveTAhAqek7YP9n8unFIiH_SFZuSq7gSk0F4RDvVtkdBPLGXCNjQFhZVe8LRZR5O0mISj1oxAE-HyxijVt4FqSxBI5uSkTpB0fTCN_QiHJC32x4QtxeT_P-TV9AgcoVrqTxXnNSOouJFugBmJ4s6yzboSwg_2fRsA&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/112837559704681179340\">Padella</a>"
        ]
      },
      {
        "reference": "AciIO2ctRkW4THlrHCYDADX09Vr-7ZC8vBigxRW5ZDXE5u6Dpg7G-b0Yx1HT-ui8vLw_jZjYPCttzFWKy0__Eplqs9ZS65NaXOvUvHG1BUGsnY-J-g1nHNDO8eOLPG8FthiCXEBhibV2lF4kF3a00YFUeHaI_FEzKqfkzi0iX5R1UkKXyAFqGXuxBECAV88KLvfV2ZSmpq2C8655foLeJLVcseX6HAuYXNmSKeQXt-cHaHMLPbtNzjAAmpeZjPsnHF4gdTscqqWAAY0MkfQ_TGw15_iq8enn2SI0hbYXwdCJdNusFbQ9tPkTPIgOI9FlfszKO0womYDWzgIkX3A7nVSnU010GKTM0G1uHvu27xcHOr4GsNwys60uxMi8wQqT9AWcIMjvwKuqy2LtsQBeQy-274_eDFC1p3xz1BSf1cSDl-GS_A",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2ctRkW4THlrHCYDADX09Vr-7ZC8vBigxRW5ZDXE5u6Dpg7G-b0Yx1HT-ui8vLw_jZjYPCttzFWKy0__Eplqs9ZS65NaXOvUvHG1BUGsnY-J-g1nHNDO8eOLPG8FthiCXEBhibV2lF4kF3a00YFUeHaI_FEzKqfkzi0iX5R1UkKXyAFqGXuxBECAV88KLvfV2ZSmpq2C8655foLeJLVcseX6HAuYXNmSKeQXt-cHaHMLPbtNzjAAmpeZjPsnHF4gdTscqqWAAY0MkfQ_TGw1200_iq8enn2SI0hbYXwdCJdNusFbQ9tPkTPIgOI9FlfszKO0womYDWzgIkX3A7nVSnU010GKTM0G1uHvu27xcHOr4GsNwys60uxMi8wQqT9AWcIMjvwKuqy2LtsQBeQy-274_eDFC1p3xz1BSf1cSDl-GS_A&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/118291544933028712955\">Romário Filho</a>"
        ]
      },
      {
        "reference": "AciIO2cwje9gHU3jFPiFgbL13z7an09Ba95a-UEAivMT6vf0qItCjaIiWyKIAvOX_chbBGNF47nbTgdNceE2MiNU2jw2zpzxFsfGXvcBbYZxhkMWPpjxGLbZEg0at-NJhaVe64nvhHTZ-9NPGQ6wYXMUumgg1Of-6L7r-CKnZZN0mzh0vLpJBAuvqiZTG_DyAVJTJ-l61bgO0EJEXxMYGnqRLuz0Nw9LV6BSpSGLZdUwmonYfdpEOjU3oit9Z_AAZsuw6MZ06S66Gulm8Cb_ckVNh0PoDZa10njaM_NdPdJ5SOjVzLWygFys5kYut0PFmfIhBgddedC8zwinkl644PzLJm49kJxtjC6Z6TkRdDLq0ol6LJRxpuRJqYaO9j7RIxzKyMhl43Y0iLgDh1GAkas9FgjQsHCXitwPx7ZcucZM6bHYPfoAEefFneIue24yL4bh",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2cwje9gHU3jFPiFgbL13z7an09Ba95a-UEAivMT6vf0qItCjaIiWyKIAvOX_chbBGNF47nbTgdNceE2MiNU2jw1200zpzxFsfGXvcBbYZxhkMWPpjxGLbZEg0at-NJhaVe64nvhHTZ-9NPGQ6wYXMUumgg1Of-6L7r-CKnZZN0mzh800vLpJBAuvqiZTG_DyAVJTJ-l61bgO0EJEXxMYGnqRLuz0Nw9LV6BSpSGLZdUwmonYfdpEOjU3oit9Z_AAZsuw6MZ06S66Gulm8Cb_ckVNh0PoDZa10njaM_NdPdJ5SOjVzLWygFys5kYut0PFmfIhBgddedC8zwinkl644PzLJm49kJxtjC6Z6TkRdDLq0ol6LJRxpuRJqYaO9j7RIxzKyMhl43Y0iLgDh1GAkas9FgjQsHCXitwPx7ZcucZM6bHYPfoAEefFneIue24yL4bh&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/100478832151170506499\">Eddie Ho</a>"
        ]
      },
      {
        "reference": "AciIO2daTYwleTQQEOoASNdC9lFmBbXg7U6xmpHkKZ9y_ifLbJmQJPzvvVXmC9SWfjHcpTQxq2vtetUj8pfu3ZM1gR0P3uaQxpDXVv9WExihClHaDk8p3DftwbDxEtBBJayRoxT36f39bBRDG6fgIM3UrEF6COQy6UmPLuj82HPSqJidKKtuB-p89kbCJO11YWqqOquu7eZsEvVdzqj0shRO6U8nLxBeWAAMp8-RTyKpwhbELJM5aQYnVcGdeOO7ySJGKqRrl-jBLrKlonHVGCgbXnLkTB_-_Z5isvOZcUEdbJ36-Ty9IcHe-LeSjF9gSkwGfizSAm9rZdzau1voqN5WqIYnm3m9i-19JCh9uTk67PbWnXMK0R-nr2ZZw4CjzKib4j14GDmL-Siumzgic6W3Xyu6icQCVIDCMpYF38eZb5sqGTY0yInM7FPcdp0Elo9w",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2daTYwleTQQEOoASNdC9lFmBbXg7U6xmpHkKZ9y_ifLbJmQJPzvvVXmC9SWfjHcpTQxq2vtetUj8pfu3ZM1gR0P3uaQxpDXVv9WExihClHaDk8p3DftwbDxEtBBJayRoxT36f39bBRDG6fgIM3UrEF6COQy6UmPLuj82HPSqJidKKtuB-p89kbCJO11YWqqOquu7eZsEvVdzqj0shRO6U8nLxBeWAAMp8-RTyKpwhbELJM5aQYnVcGdeOO7ySJGKqRrl-jBLrKlonHVGCgbXnLkTB_-_Z5isvOZcUEdbJ36-Ty9IcHe-LeSjF9gSkwGfizSAm9rZdzau1voqN5WqIYnm3m9i-19JCh800uTk67PbWnXMK0R-nr2ZZw1200CjzKib4j14GDmL-Siumzgic6W3Xyu6icQCVIDCMpYF38eZb5sqGTY0yInM7FPcdp0Elo9w&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/102243586363789081310\">Buy Sanibel</a>"
        ]
      },
      {
        "reference": "AciIO2f_Ll3ax6pqZcz7c9hZUYVctOmEOxbM5-4Z57ZfjurGyJX-QIrLUEy56n-iN2C49sdFMP1fVzfYovI3eyAm250iblK1jAAJBh_W-NscmDejhh54kAeNChUq5BTCFjH8bIFhAO2UCdmuiYmNe79QNlHQCl6drhUnwBYgQQUP8Rk2kzpzIbx7AwcTvvQ4top4jtkX2EZ-9uNgkOsmpZDmnm8exXMl_o4KFOpS_BTgKMAcEqoU5XIG-konvlNKEymt_JMqKvkjJz3IxaZ1VNe1JuWYOEpY-06nDlxdKOQqgC8sn9q5Pv5BS3DVR9ot0ihZl4xJX0kHEhAaWckyEZId6Q4aAMCVpe24PtZaQUIx1tI5apxdZepysjC2Umj0Yez0AeuSfRxvV9wQtbgz-N4d0WK5-GWNSoRoQ84J3cEOHR9OIAMk1C5QgUYEl9he6qnN",
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=AciIO2f_Ll3ax6pqZcz7c9hZUYVctOmEOxbM5-4Z57ZfjurGyJX-QIrLUEy56n-iN2C49sdFMP1fVzfYovI3eyAm250iblK1jAAJBh_W-NscmDejhh800kAeNChUq5BTCFjH8bIFhAO2UCdmuiYmNe79QNlHQCl6drhUnwBYgQQUP8Rk2kzpzIbx7AwcTvvQ4top4jtkX2EZ-9uNgkOsmpZDmnm8exXMl_o4KFOpS_BTgKMAcEqoU5XIG-konvlNKEymt_JMqKvkjJz3IxaZ1VNe1JuWYOEpY-06nDlxdKOQqgC8sn9q5Pv5BS3DVR9ot0ihZl4xJX0kHEhAaWckyEZId6Q4aAMCVpe24PtZaQUIx1tI5apxdZepysjC2Umj0Yez0AeuSfRxvV9wQtbgz-N4d0WK5-GWNSoRoQ84J3cEOHR9OIAMk1C5QgUYEl9he6qnN&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "attributions": [
          "<a href=\"https://maps.google.com/maps/contrib/110891769732332956156\">Mariano Trinidad</a>"
        ]
      }
    ],
    "reviews": [
      {
        "author_name": "Charlie Tose",
        "rating": 5,
        "text": "Fantastic little restaurant with friendly staff and quick service. Our host (sadly didn’t catch his name) was very welcoming, recommended serval dishes and provided a complimentary glass of wine. Food was served fast and hot. The tiramisu for dessert was to die for. Couldn’t recommend enough and will definitely be back :)",
        "time": 1759661733,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Hannah Ko",
        "rating": 5,
        "text": "Loved our experience at Padella! We visited for the first time for lunch and arrived right as it opened for the day, which helped as the restaurant filled up quickly. Staff were courteous and friendly, and the kitchen was a well-oiled machine. Seated at the bar, we got a front row view of the action, which was part of the charm (highly recommend)! The pasta was well made and if you’re visiting London, you gotta check Padella out!",
        "time": 1759265137,
        "relative_time_description": "2 weeks ago"
      },
      {
        "author_name": "Michael ojo",
        "rating": 5,
        "text": "I appreciated the warm welcome. I was seated promptly and even allowed to change seats. The waitress, Nura, helped me with my order,  her suggestions were exceptional. I went for the Dexter beef shin ragu with Primitivo and Chianti. Let’s just say this is my new pasta spot. Can’t wait to come back. Thank you 🙏",
        "time": 1759576895,
        "relative_time_description": "a week ago"
      },
      {
        "author_name": "Salman Rauf",
        "rating": 5,
        "text": "I loved Padella. It was my first time eating here, and I would definitely recommend again and again! Will definitely be returning. The food was creamy, flavoursome and probably one of the best Italian places I have visited. Also in a great location, if you want to get desserts after from near-by!",
        "time": 1752514085,
        "relative_time_description": "3 months ago"
      },
      {
        "author_name": "Jasmin Bull",
        "rating": 5,
        "text": "Impeccable. Incredible. The service to the food quality to the atomasphere, one of the best experiences of Italian food I have ever had. So many vegetarian options. The loveliest, funny staff. Blown away, we will be back ❤️",
        "time": 1757963677,
        "relative_time_description": "4 weeks ago"
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
    "fsa_url": "https://ratings.food.gov.uk/business/879163",
    "fsa_last_inspection": "2024-04-13T00:00:00",
    "lastVerifiedGoogle": "2025-10-15T10:53:20.982Z",
    "lastVerifiedFSA": "2025-10-16T23:15:23.057Z",
    "createdAt": "2025-10-15T10:53:20.982Z",
    "updatedAt": "2025-10-16T20:24:15.207Z",
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:31:12.292Z",
    "bio_source": "generated",
    "bio_style": "witty_london_centric",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=italian_pasta_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Padella — Italian",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "italian_padella_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.430Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Padella",
      "image": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=british_roast_photo&key=PLACEHOLDER",
      "servesCuisine": [
        "italian"
      ],
      "priceRange": "£1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Borough Market, Padella, 6 Southwark St, London",
        "addressCountry": "GB"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.6,
        "reviewCount": 8228
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/padella-HPngIeq8",
      "openingHours": [
        "Monday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Tuesday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Wednesday: 11:30 AM – 3:45 PM, 5:00 – 10:00 PM",
        "Thursday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Friday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Saturday: 11:30 AM – 3:45 PM, 5:00 – 10:30 PM",
        "Sunday: 11:30 AM – 3:45 PM, 5:00 – 9:00 PM"
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
    "image_card_path": "/images/restaurants/padella-HPngIeq8/italian-padella-HPngIeq8-card-a7921380.webp",
    "image_hero_path": "/images/restaurants/padella-HPngIeq8/italian-padella-HPngIeq8-hero-e91f696f.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Italian Restaurants in Southwark (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest italian restaurants in Southwark for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Southwark." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-italian-in-southwark-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Italian Restaurants in Southwark (2025)" />
        <meta property="og:description" content="Discover the finest italian restaurants in Southwark for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Southwark." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-italian-in-southwark-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Italian Restaurants in Southwark (2025)" />
        <meta name="twitter:description" content="Discover the finest italian restaurants in Southwark for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Southwark." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Italian Restaurants in Southwark (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-italian-in-southwark-2025',
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
              <Link href="/restaurants-southwark" className="hover:text-white transition-colors">Southwark</Link>
              <span>›</span>
              <span className="text-white">Best Italian in Southwark (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Italian Restaurants in Southwark (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest italian restaurants in Southwark for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of italian cuisine in Southwark.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/padella-HPngIeq8" className="hover:text-yellow-600 transition-colors">
                Padella
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 8,228 reviews</span>
              <span>💰 £</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Padella offers exceptional italian cuisine in Southwark. With a 4.6-star rating from 8,228 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/padella-HPngIeq8" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
          </a>
          
            <a href="https://www.google.com/maps/place/?q=place_id:ChIJdZ6paFcDdkgRpPUHPngIeq8" target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors text-sm">
              Google Reviews
            </a>
          
        </div>
      </div>
    
          </div>

          {/* Internal Links */}
          
    <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="/restaurants-southwark" className="text-yellow-600 hover:text-yellow-500 transition-colors">
          More Southwark Restaurants
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
          
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">More to Explore</h3>
              <p className="text-gray-300 mb-4">
                Discover more italian restaurants across London.
              </p>
              <div className="flex space-x-4">
                <a href="/italian-restaurants-london" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors">
                  All Italian Restaurants
                </a>
                <a href="/restaurants-southwark" className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors">
                  All Southwark Restaurants
                </a>
              </div>
            </div>
          
        </main>
        
        <Footer />
      </div>
    </>
  );
}
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { asCollectionPage } from '../lib/factory/pageFactory';

export default function BestChineseInTowerHamlets2025() {
  const venues = [
  {
    "place_id": "ChIJNen40OAddkgRtywjNq5Bxyw",
    "slug": "far-east-kitchen-jNq5Bxyw",
    "name": "Far East Kitchen",
    "description": "Where contemporary London meets European flair - think Michelin-starred techniques with a side of British charm. Located in the heart of London, this is where London's food scene comes alive.",
    "cuisines": [
      "chinese"
    ],
    "categories": [
      "restaurant"
    ],
    "dietary_tags": {},
    "rating": 4.6,
    "user_ratings_total": 206,
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
    "postcode": "E3 4UR",
    "borough": "Tower Hamlets",
    "lat": 51.5238795,
    "lng": -0.0229234,
    "phone": "07355 666181",
    "phone_international": "+44 7355 666181",
    "website": "https://www.fareastkitchen.co.uk/",
    "url": "https://maps.google.com/?cid=3226619874522639543",
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
            "time": "1500"
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
            "day": 6,
            "time": "0000"
          },
          "open": {
            "day": 5,
            "time": "1600"
          }
        },
        {
          "close": {
            "day": 0,
            "time": "0000"
          },
          "open": {
            "day": 6,
            "time": "1500"
          }
        }
      ],
      "weekday_text": [
        "Monday: 4:00 – 11:00 PM",
        "Tuesday: 4:00 – 11:00 PM",
        "Wednesday: 4:00 – 11:00 PM",
        "Thursday: 4:00 – 11:00 PM",
        "Friday: 4:00 PM – 12:00 AM",
        "Saturday: 3:00 PM – 12:00 AM",
        "Sunday: 3:00 – 11:00 PM"
      ]
    },
    "photos": [
      {
        "url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=placeholder&key=AIzaSyCOYUi9A598QJGWk7hZK0_6_ojdvSNhZhw",
        "width": 1600,
        "height": 1200,
        "source": "curated_food_image",
        "cuisine": "chinese",
        "area": "Tower Hamlets",
        "provenance": "curated_food_image",
        "venueName": "Far East Kitchen",
        "venueId": 647
      }
    ],
    "reviews": [
      {
        "author_name": "Baron Gracias",
        "author_url": "https://www.google.com/maps/contrib/114092868954710613429/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocKoBgF4Kdg8m2Fv9S4qC9bwaTa-QiUFfP6ux1KZVbFcEOx0E7Zd=s128-c0x00000000-cc-rp-mo-ba4",
        "rating": 5,
        "relative_time_description": "2 months ago",
        "text": "Highly recommend Far East Kitchen, the value and quality is exceptional! I got the Korean Box and it comes with so much for the price. The k-dog is delicious and fresh, the wings are great, and the brisket fries were super filling! The staff are very friendly if you collect and it did not take long at all.\n\nThe gyozas were also very good, they were in a nice honey glaze. The dessert bao buns were very indulgent, covered in sugar! They come with a custard and chocolate dip, really enjoyed the custard.",
        "time": 1754859288,
        "translated": false
      },
      {
        "author_name": "Asma Rouane",
        "author_url": "https://www.google.com/maps/contrib/108832269151099365294/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjW0LTFLpMVVkjOrid-uRA02b4FDNpEVqrA8NNYoIgWWpOYBnuik=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "Far East Kitchen never disappoints! I tried their Korean box with corn dog, wings, and loaded fries and wow, it was so good! Everything was crispy, flavorful, and super satisfying. Their customer service is also amazing  , so friendly and generous. They even sent me a free dessert once because I ordered a lot. Highly recommend!",
        "time": 1747757289,
        "translated": false
      },
      {
        "author_name": "Honest Reviews",
        "author_url": "https://www.google.com/maps/contrib/108279651785424825132/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWIgGms9yDU15sr9NOhoOlPsxy870t8OeoX79VHLjaLeN9EkIc=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 1,
        "relative_time_description": "3 months ago",
        "text": "We ordered a Half and half corn dog, a Chicken bao bun, a K dog meal, some vegetables gyoza, some Dessert bao bun, a freshly made mango drink and a fizzy mango drink. The half and half corn dog had more cheese in it than sausage.\n\nThe sausage itself was even halved, I ask even before I ordered if there were poorly half and half. As in inside is cheese and sausage but the sausage is in the middle cheese around the sausage, and the batter around them both and I was told yes. Which was not the case.\n\nThe Chicken bao bun was decent, the dessert bao bun was mid, it tasted alright, but there was nothing special about it. I think what made it nicer was the cinnamon and sugar as the dessert itself was flavourless and dry. The sauce that was given with it was chocolate and custard, but they were very running and diluted.\n\nThe vegetables gyoza, tasted more like onions than vegetables, which was not nice. The freshly made mango juice was alright but it could have been sweeter. The mango fizzy drink was good. The customer service was friendly, and we didn’t have to wait too long for our food which was good.\n\nThe food was not worth the amount of money we paid, I would not go back here and I wouldn’t recommend it either. Really nothing against the people who work here and the person who owns this placement. But the food could do with some improvement.",
        "time": 1751290413,
        "translated": false
      },
      {
        "author_name": "A R",
        "author_url": "https://www.google.com/maps/contrib/117554093126920248515/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjUNm81RScKDRtJ9hhf_tffiyOFCkWefpSEUgLRoqPlOWHSvKLj2=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "3 months ago",
        "text": "All I can say about this place is—wow! Truly one of the best food spots I’ve come across. I’ve visited multiple times, and the quality has remained consistently excellent.\n\nI’ve introduced friends and family from different cities to this place, and every single one of them has been genuinely impressed. In terms of food, the Bao Bun Munch Box and the Korean Box are my go-to choices—they never disappoint. The flavours are bold, well-balanced, and absolutely delicious.\n\nService is always quick, and the staff are friendly, welcoming, and professional, which really enhances the overall experience.\n\nPrice-wise, it varies depending on your order. On average, the boxes are around £20 per person, but there’s a wide range of options available to suit different preferences and budgets.\n\nTo anyone reading this review: don’t hesitate—give them a try. You won’t regret it!",
        "time": 1752489170,
        "translated": false
      },
      {
        "author_name": "Shaf Alam",
        "author_url": "https://www.google.com/maps/contrib/110386476692382409769/reviews",
        "language": "en",
        "original_language": "en",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjVy9qK6ClGa5PWuc_293WJzxT5hlJa5I6WkEj5_kdgjRi_uykfx=s128-c0x00000000-cc-rp-mo-ba5",
        "rating": 5,
        "relative_time_description": "4 months ago",
        "text": "The combo box with beef corn dog, chicken and prawn gyozu, chicken wings, chicken strips, grilled chicken boa bun, and loaded fries. The boa bun was phenomenal, and I recommend eating this whilst it's still warm. The chicken wings came second with the crispy batter, gyozus next, and then the strips. Everything else was just alright.  For the money you pay, though, well worth it!",
        "time": 1748777831,
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
      "query": "restaurant Bow London",
      "area": "Bow",
      "type": "area"
    },
    "fsa_rating": 5,
    "fsa_rating_text": "5",
    "fsa_authority": "Tower Hamlets",
    "fsa_url": "https://ratings.food.gov.uk/business/1648256",
    "lastVerifiedGoogle": "2025-10-16T23:13:59.012Z",
    "lastVerifiedFSA": "2025-10-16T23:32:17.842Z",
    "createdAt": "2025-10-16T23:13:59.012Z",
    "updatedAt": "2025-10-16T23:14:36.061Z",
    "fsa_last_inspection": "2025-02-13T00:00:00",
    "bioGenerated": true,
    "content_enhanced": true,
    "content_enhancement_date": "2025-10-17T21:29:16.269Z",
    "image_url": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=chinese_dumplings_photo&key=PLACEHOLDER",
    "image_source": "google_places",
    "image_alt": "Far East Kitchen — Chinese",
    "image_width": 1600,
    "image_height": 1200,
    "image_quality": "high_res",
    "image_filename": "chinese_far-east-kitchen_london_highres.webp",
    "last_updated": "2025-10-18T14:56:05.556Z",
    "schema_markup": {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Far East Kitchen",
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
        "reviewCount": 206
      },
      "url": "https://www.thebestinlondon.co.uk/restaurant/far-east-kitchen-jNq5Bxyw",
      "openingHours": [
        "Monday: 4:00 – 11:00 PM",
        "Tuesday: 4:00 – 11:00 PM",
        "Wednesday: 4:00 – 11:00 PM",
        "Thursday: 4:00 – 11:00 PM",
        "Friday: 4:00 PM – 12:00 AM",
        "Saturday: 3:00 PM – 12:00 AM",
        "Sunday: 3:00 – 11:00 PM"
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
    "image_card_path": "/images/restaurants/far-east-kitchen-jNq5Bxyw/chinese-far-east-kitchen-jNq5Bxyw-card-41efbb07.webp",
    "image_hero_path": "/images/restaurants/far-east-kitchen-jNq5Bxyw/chinese-far-east-kitchen-jNq5Bxyw-hero-34fdbf36.webp",
    "cuisine_match": true
  }
];

  return (
    <>
      <Head>
        <title>Best Chinese Restaurants in Tower Hamlets (2025) | The Best in London</title>
        <meta name="description" content="Discover the finest chinese restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Tower Hamlets." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/best-chinese-in-tower-hamlets-2025" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Best Chinese Restaurants in Tower Hamlets (2025)" />
        <meta property="og:description" content="Discover the finest chinese restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Tower Hamlets." />
        <meta property="og:url" content="https://www.thebestinlondon.co.uk/best-chinese-in-tower-hamlets-2025" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Chinese Restaurants in Tower Hamlets (2025)" />
        <meta name="twitter:description" content="Discover the finest chinese restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Tower Hamlets." />
        
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(asCollectionPage({
          name: 'Best Chinese Restaurants in Tower Hamlets (2025)',
          url: 'https://www.thebestinlondon.co.uk/best-chinese-in-tower-hamlets-2025',
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
              <Link href="/restaurants-tower-hamlets" className="hover:text-white transition-colors">Tower Hamlets</Link>
              <span>›</span>
              <span className="text-white">Best Chinese in Tower Hamlets (2025)</span>
            </div>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Best Chinese Restaurants in Tower Hamlets (2025)
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              Discover the finest chinese restaurants in Tower Hamlets for 2025. Our curated selection features the top-rated establishments based on Google reviews, FSA hygiene ratings, and local expertise. From traditional favorites to modern interpretations, these restaurants represent the best of chinese cuisine in Tower Hamlets.
            </p>
          </div>

          {/* Venue Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-600 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              <a href="/restaurant/far-east-kitchen-jNq5Bxyw" className="hover:text-yellow-600 transition-colors">
                Far East Kitchen
              </a>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>⭐ 4.6</span>
              <span>📝 206 reviews</span>
              <span>💰 ££</span>
              <span className="text-green-400">🏥 FSA 5/5</span>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Far East Kitchen offers exceptional chinese cuisine in Tower Hamlets. With a 4.6-star rating from 206 reviews and a 5/5 FSA hygiene rating, this restaurant delivers quality and authenticity.
        </p>
        <div className="flex space-x-2">
          <a href="/restaurant/far-east-kitchen-jNq5Bxyw" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors text-sm">
            View Details
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
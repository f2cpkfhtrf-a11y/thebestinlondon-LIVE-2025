import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead, { structuredDataTemplates } from '../components/SEOHead';

export default function Guides() {
  const guides = [
    {
      title: "Top Halal Steakhouses in East London",
      description: "Discover the best halal steakhouses in East London, from traditional grills to contemporary dining experiences.",
      slug: "top-halal-steakhouses-east-london",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85",
      readTime: "5 min read",
      category: "Halal Dining"
    },
    {
      title: "Best Indian Restaurants Near London Stations",
      description: "Your guide to authentic Indian cuisine within walking distance of major London transport hubs.",
      slug: "best-indian-restaurants-near-stations",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=85",
      readTime: "7 min read",
      category: "Cuisine Guide"
    },
    {
      title: "Vegan Fine Dining in Central London",
      description: "Explore London's most sophisticated vegan restaurants offering plant-based fine dining experiences.",
      slug: "vegan-fine-dining-central-london",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85",
      readTime: "6 min read",
      category: "Vegan Dining"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "London Restaurant Guides",
    "description": "Expert guides to London's best restaurants, cuisines, and dining experiences",
    "url": "https://www.thebestinlondon.co.uk/guides",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": guides.length,
      "itemListElement": guides.map((guide, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Article",
          "name": guide.title,
          "description": guide.description,
          "url": `https://www.thebestinlondon.co.uk/guides/${guide.slug}`,
          "image": guide.image,
          "author": {
            "@type": "Organization",
            "name": "The Best in London"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Best in London",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.thebestinlondon.co.uk/logo.svg"
            }
          }
        }
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="London Restaurant Guides"
        description="Expert guides to London's best restaurants, cuisines, and dining experiences. Discover hidden gems and culinary hotspots."
        canonical="https://www.thebestinlondon.co.uk/guides"
        keywords={['london restaurant guides', 'dining guides london', 'restaurant recommendations', 'london food blog']}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-black">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-br from-black via-black-light to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6">
                London Restaurant Guides
              </h1>
              <p className="text-xl text-grey max-w-3xl mx-auto mb-8">
                Expert insights into London's culinary landscape. From hidden gems to Michelin-starred experiences, 
                discover the stories behind the city's most remarkable restaurants.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/restaurants" className="btn-primary text-lg px-8 py-4">
                  Browse All Restaurants
                </Link>
                <Link href="/best-halal-restaurants-london" className="btn-secondary text-lg px-8 py-4">
                  Find Halal Options
                </Link>
              </div>
            </div>
          </section>

          {/* Guides Grid */}
          <section className="py-20 bg-black-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                  Featured Guides
                </h2>
                <p className="text-lg text-grey max-w-2xl mx-auto">
                  Curated guides to help you discover London's best dining experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide) => (
                  <article key={guide.slug} className="card overflow-hidden group">
                    <div className="relative h-48">
                      <img
                        src={guide.image}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold">
                          {guide.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-semibold text-white text-xl mb-3 group-hover:text-gold transition-colors duration-300">
                        {guide.title}
                      </h3>
                      <p className="text-grey-light mb-4 leading-relaxed">
                        {guide.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-grey text-sm">{guide.readTime}</span>
                        <Link 
                          href={`/guides/${guide.slug}`}
                          className="text-gold hover:text-gold-light font-semibold text-sm transition-colors duration-300"
                        >
                          Read Guide →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-gold/10 to-gold-light/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-lg text-grey mb-8">
                Explore our comprehensive restaurant database with 760+ verified venues across London
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/restaurants" className="btn-primary text-lg px-8 py-4">
                  Browse All Restaurants
                </Link>
                <Link href="/restaurants-soho" className="btn-secondary text-lg px-8 py-4">
                  Explore by Area
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

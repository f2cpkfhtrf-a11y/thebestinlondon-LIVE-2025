import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import RichMarkdown from '../components/content/RichMarkdown';
import Link from 'next/link';
import { resolveHeroImage } from '../lib/resolveHeroImage';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  const contentDir = path.join(process.cwd(), 'content');
  const faqDir = path.join(contentDir, 'faq');
  
  let faqs = [];
  
  if (fs.existsSync(faqDir)) {
    const faqFiles = fs.readdirSync(faqDir).filter(file => file.endsWith('.json'));
    faqs = faqFiles.map(file => {
      const content = fs.readFileSync(path.join(faqDir, file), 'utf8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.updatedAtISO) - new Date(a.updatedAtISO));
  }

  const heroImage = resolveHeroImage({ type: "list-restaurants" });
  
  return {
    props: {
      faqs,
      heroImage
    },
    revalidate: 3600
  };
}

export default function FAQPage({ faqs, heroImage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    if (searchTerm) {
      const filtered = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answerMarkdown.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchTerm, faqs]);

  return (
    <Layout>
      <Head>
        <title>Frequently Asked Questions | The Best in London</title>
        <meta name="description" content="Find answers to common questions about London restaurants, dining guides, and our recommendations. Get expert advice on the best places to eat in the capital." />
        <meta property="og:title" content="Frequently Asked Questions | The Best in London" />
        <meta property="og:description" content="Find answers to common questions about London restaurants and dining guides." />
        <meta property="og:image" content={heroImage.src} />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/faq" />
      </Head>

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
        <img
          src={`${heroImage.src}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`}
          alt={heroImage.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">FAQ</h1>
            <p className="text-xl md:text-2xl">Common questions about London dining</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
          />
          <p className="text-gray-300 mt-2">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-300 mb-4">No questions found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredFaqs.map(faq => (
              <div key={faq.slug} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      <Link href={`/faq/${faq.slug}`} className="hover:text-yellow-400 transition-colors">
                        {faq.question}
                      </Link>
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      <RichMarkdown 
                        content={faq.answerMarkdown.length > 200 
                          ? faq.answerMarkdown.substring(0, 200) + '...' 
                          : faq.answerMarkdown
                        } 
                      />
                    </div>
                    
                    {/* Related Links */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {faq.relatedCuisineSlugs.map(slug => (
                        <Link
                          key={slug}
                          href={`/cuisines/${slug}`}
                          className="px-2 py-1 bg-yellow-600 hover:bg-yellow-500 text-xs rounded-full transition-colors"
                        >
                          {slug}
                        </Link>
                      ))}
                      {faq.relatedAreaSlugs.map(slug => (
                        <Link
                          key={slug}
                          href={`/areas/${slug}`}
                          className="px-2 py-1 bg-gray-600 hover:bg-gray-500 text-xs rounded-full transition-colors"
                        >
                          {slug.replace('-', ' ')}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/faq/${faq.slug}`}
                    className="ml-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded-lg transition-colors whitespace-nowrap"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answerMarkdown.replace(/[#*\[\]]/g, '')
              }
            }))
          })
        }}
      />
    </Layout>
  );
}

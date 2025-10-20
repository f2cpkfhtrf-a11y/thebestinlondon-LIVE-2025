import Head from 'next/head';
import Layout from '../../components/Layout';
import RichMarkdown from '../../components/content/RichMarkdown';
import Link from 'next/link';
import { resolveHeroImage } from '../../lib/resolveHeroImage';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  
  const contentDir = path.join(process.cwd(), 'content');
  const faqDir = path.join(contentDir, 'faq');
  
  if (!fs.existsSync(faqDir)) {
    return { paths: [], fallback: false };
  }
  
  const faqFiles = fs.readdirSync(faqDir).filter(file => file.endsWith('.json'));
  
  const paths = faqFiles.map(file => ({
    params: { slug: file.replace('.json', '') }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const fs = require('fs');
  const path = require('path');
  
  const faqPath = path.join(process.cwd(), 'content', 'faq', `${params.slug}.json`);
  
  if (!fs.existsSync(faqPath)) {
    return {
      notFound: true
    };
  }
  
  const faq = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
  const heroImage = resolveHeroImage({ type: "venue" });

  return {
    props: {
      faq,
      heroImage
    },
    revalidate: 3600
  };
}

export default function FAQPost({ faq, heroImage }) {
  return (
    <Layout>
      <Head>
        <title>{faq.seo.title}</title>
        <meta name="description" content={faq.seo.description} />
        <meta property="og:title" content={faq.question} />
        <meta property="og:description" content={faq.seo.description} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${heroImage.src}`} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/faq/${faq.slug}`} />
        <meta name="keywords" content={faq.seo.keywords.join(', ')} />
      </Head>

      {/* Breadcrumbs */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-white">{faq.question}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {faq.question}
          </h1>
          <p className="text-lg text-gray-300">
            Updated {new Date(faq.updatedAtISO).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Answer Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none">
          <div className="text-gray-100 leading-relaxed text-lg">
            <RichMarkdown content={faq.answerMarkdown} />
          </div>

          {/* Related Links */}
          {(faq.relatedCuisineSlugs.length > 0 || faq.relatedAreaSlugs.length > 0) && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-4">
                {faq.relatedCuisineSlugs.map(slug => (
                  <Link
                    key={slug}
                    href={`/cuisines/${slug}`}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-colors"
                  >
                    {slug.charAt(0).toUpperCase() + slug.slice(1)} Restaurants
                  </Link>
                ))}
                {faq.relatedAreaSlugs.map(slug => (
                  <Link
                    key={slug}
                    href={`/areas/${slug}`}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Restaurants in {slug.replace('-', ' ')}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to FAQ */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <Link
              href="/faq"
              className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              ← Back to FAQ
            </Link>
          </div>
        </article>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answerMarkdown.replace(/[#*\[\]]/g, ''),
              "dateCreated": faq.updatedAtISO
            },
            "author": {
              "@type": "Organization",
              "name": "The Best in London"
            },
            "dateCreated": faq.updatedAtISO,
            "dateModified": faq.updatedAtISO
          })
        }}
      />
    </Layout>
  );
}

import Head from 'next/head';
import Layout from '../../components/Layout';
import RichMarkdown from '../../components/content/RichMarkdown';
import Link from 'next/link';
import { resolveHeroImage } from '../../lib/resolveHeroImage';

export async function getStaticPaths() {
  const fs = require('fs');
  const path = require('path');
  
  const contentDir = path.join(process.cwd(), 'content');
  const blogDir = path.join(contentDir, 'blog');
  
  if (!fs.existsSync(blogDir)) {
    return { paths: [], fallback: false };
  }
  
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
  
  const paths = blogFiles.map(file => ({
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
  
  const blogPath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.json`);
  
  if (!fs.existsSync(blogPath)) {
    return {
      notFound: true
    };
  }
  
  const blog = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
  const heroImage = resolveHeroImage({ type: "venue" });

  return {
    props: {
      blog,
      heroImage
    },
    revalidate: 3600
  };
}

export default function BlogPost({ blog, heroImage }) {
  // Generate JSON-LD BlogPosting schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.dek,
    "image": `https://www.thebestinlondon.co.uk${blog.coverImage}`,
    "author": {
      "@type": "Person",
      "name": blog.author.name,
      "jobTitle": blog.author.title,
      "image": `https://www.thebestinlondon.co.uk${blog.author.avatar}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Best in London",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thebestinlondon.co.uk/logo.svg"
      }
    },
    "datePublished": blog.publishedAtISO,
    "dateModified": blog.updatedAtISO,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`
    },
    "keywords": blog.seo.keywords.join(', '),
    "articleSection": "Food & Dining",
    "wordCount": blog.bodyMarkdown ? blog.bodyMarkdown.split(' ').length : 0
  };

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.thebestinlondon.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.thebestinlondon.co.uk/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`
      }
    ]
  };

  return (
    <Layout>
      <Head>
        <title>{blog.seo.title}</title>
        <meta name="description" content={blog.seo.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.dek} />
        <meta property="og:image" content={`https://www.thebestinlondon.co.uk${blog.coverImage}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={blog.seo.canonical} />
        <meta property="article:author" content={blog.author.name} />
        <meta property="article:published_time" content={blog.publishedAtISO} />
        <meta property="article:modified_time" content={blog.updatedAtISO} />
        {blog.tags && blog.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={blog.seo.canonical} />
        <meta name="keywords" content={blog.seo.keywords.join(', ')} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.dek} />
        <meta name="twitter:image" content={`https://www.thebestinlondon.co.uk${blog.coverImage}`} />
        
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      {/* Breadcrumbs */}
      <div className="bg-gray-800 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-white">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
        <img
          src={`${blog.coverImage}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `${heroImage.src}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg md:text-xl text-gray-200">{blog.dek}</p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-invert max-w-none">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img
                src={`${blog.author.avatar}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`}
                alt={blog.author.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = `/images/heroes/site/default-list-hero.webp?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
                }}
              />
              <div>
                <div className="font-semibold text-white">{blog.author.name}</div>
                <div className="text-sm text-gray-400">{blog.author.title}</div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Published {new Date(blog.publishedAtISO).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              {blog.readingTime && (
                <>
                  <span className="mx-2">•</span>
                  {blog.readingTime}
                </>
              )}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-yellow-600 text-sm rounded-full hover:bg-yellow-500 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Body */}
          <div className="text-gray-100 leading-relaxed">
            <RichMarkdown content={blog.bodyMarkdown} />
          </div>

          {/* Related Links */}
          {(blog.cuisineSlugs.length > 0 || blog.areaSlugs.length > 0) && (
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Explore More</h3>
              <div className="flex flex-wrap gap-4">
                {blog.cuisineSlugs.map(slug => (
                  <Link
                    key={slug}
                    href={`/cuisines/${slug}`}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    {slug.charAt(0).toUpperCase() + slug.slice(1)} Restaurants
                  </Link>
                ))}
                {blog.areaSlugs.map(slug => (
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
        </article>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": blog.dek,
            "url": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`,
            "datePublished": blog.publishedAtISO,
            "dateModified": blog.updatedAtISO,
            "author": {
              "@type": "Person",
              "name": blog.author.name,
              "jobTitle": blog.author.title
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Best in London",
              "url": "https://www.thebestinlondon.co.uk",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thebestinlondon.co.uk/logo.svg"
              }
            },
            "image": {
              "@type": "ImageObject",
              "url": `https://www.thebestinlondon.co.uk${blog.coverImage}`,
              "width": 1600,
              "height": 900
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`
            },
            "keywords": blog.seo.keywords.join(', ')
          })
        }}
      />
    </Layout>
  );
}

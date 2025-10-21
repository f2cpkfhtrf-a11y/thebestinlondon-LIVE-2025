import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export async function getServerSideProps() {
  try {
    // Read blog files directly from filesystem instead of API call
    const fs = require('fs');
    const path = require('path');
    
    const blogDir = path.join(process.cwd(), 'content/blog');
    let blogs = [];
    
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
      blogs = blogFiles.map(file => {
        try {
          const filePath = path.join(blogDir, file);
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const slug = file.replace('.json', '');
          
          // Only include published blogs or blogs with content
          // Check for bodyMarkdown, content, or contentHtml
          const hasContent = content.bodyMarkdown || content.content || content.contentHtml;
          if (content.published === false && !hasContent) {
            return null; // Skip empty/unpublished blogs
          }
          
          return {
            ...content,
            slug: content.slug || slug,
            // Ensure required fields
            title: content.title || 'Untitled',
            description: content.description || content.dek || '',
            hero: content.hero || content.coverImage || '/images/heroes/site/default-blog-hero.webp',
            date: content.datePublished || content.publishedAt || content.date || new Date().toISOString(),
            author: content.author?.name || content.author_name || content.author || 'The Best in London Team',
            readTime: content.readTime || content.read_time || '5 min read',
            tags: content.tags || [],
            publishedAtISO: content.publishedAtISO || content.datePublished || content.date || new Date().toISOString()
          };
        } catch (error) {
          console.error(`Error reading blog file ${file}:`, error);
          return null;
        }
      }).filter(Boolean) // Remove null entries
      .sort((a, b) => {
        // Sort by date, newest first
        const dateA = new Date(a.publishedAtISO || a.date || 0);
        const dateB = new Date(b.publishedAtISO || b.date || 0);
        return dateB - dateA;
      });
    }
    
    return {
      props: {
        blogs: blogs || []
      }
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return { props: { blogs: [] } };
  }
}

export default function Blog({ blogs }) {
  return (
    <>
      <Head>
        <title>London Restaurant Blog & Dining Guides | The Best in London</title>
        <meta name="description" content="Discover London's finest restaurants through our curated blog posts. Expert reviews, hidden gems, and culinary guides across the capital." />
        <meta property="og:title" content="London Restaurant Blog & Dining Guides | The Best in London" />
        <meta property="og:description" content="Discover London's finest restaurants through our curated blog posts. Expert reviews, hidden gems, and culinary guides across the capital." />
        <meta property="og:site_name" content="The Best in London" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="London Restaurant Blog & Dining Guides | The Best in London" />
        <meta name="twitter:description" content="Discover London's finest restaurants through our curated blog posts. Expert reviews, hidden gems, and culinary guides across the capital." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/blog" />
        
        {/* Additional SEO meta tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta name="article:publisher" content="The Best in London" />
        <link rel="alternate" hrefLang="en-GB" href="https://www.thebestinlondon.co.uk/blog" />
        <link rel="alternate" hrefLang="en" href="https://www.thebestinlondon.co.uk/blog" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "The Best in London Blog",
              "description": "Discover London's finest restaurants through our curated blog posts. Expert reviews, hidden gems, and culinary guides across the capital.",
              "url": "https://www.thebestinlondon.co.uk/blog",
              "publisher": {
                "@type": "Organization",
                "name": "The Best in London",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.thebestinlondon.co.uk/logo-compact.svg"
                }
              },
              "blogPost": blogs.map(blog => ({
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.description || blog.dek,
                "url": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`,
                "datePublished": blog.datePublished || blog.date,
                "author": {
                  "@type": "Person",
                  "name": blog.author?.name || blog.author_name || blog.author || 'The Best in London Team'
                }
              }))
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-warmWhite">
        {/* Header */}
        <Header />
        
        {/* Premium Hero Section - Dark Theme */}
        <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold/10 to-charcoal">
          <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-warmWhite leading-tight mb-6 font-serif">
              London Restaurant Blog
            </h1>
            <p className="text-xl md:text-2xl text-grey mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover London's finest restaurants through our curated blog posts. Expert reviews, hidden gems, and culinary guides across the capital.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gold font-semibold uppercase tracking-wider">
              <span>{blogs.length} Articles</span>
              <span>•</span>
              <span>Updated Weekly</span>
              <span>•</span>
              <span>Expert Reviews</span>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid - Dark Theme */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link key={index} href={`/blog/${blog.slug}`}>
                <div className="group cursor-pointer">
                  <div className="bg-charcoal rounded-xl overflow-hidden border border-grey-dark group-hover:border-gold transition-all duration-300 shadow-charcoal group-hover:shadow-gold">
                    {/* Hero Image */}
                    <div 
                      className="h-48 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${blog.hero || blog.coverImage || '/images/heroes/site/default-blog-hero.webp'}')`
                      }}
                    />
                    
                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-warmWhite mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {blog.title || 'Untitled'}
                      </h2>
                      <p className="text-grey mb-4 line-clamp-3 text-sm leading-relaxed">
                        {blog.dek || blog.description || 'No description available'}
                      </p>
                      
                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-xs text-grey-dark mb-4">
                        <span className="font-medium">{blog.readTime || blog.read_time || '5 min read'}</span>
                        <span>{new Date(blog.publishedAtISO || blog.datePublished || blog.date || Date.now()).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}</span>
                      </div>
                      
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-gold/10 text-gold text-xs rounded-full font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {blogs.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-grey mb-4">No blog posts available</h2>
              <p className="text-grey-dark">Check back soon for new restaurant guides and reviews.</p>
            </div>
          )}
        </section>

        {/* Newsletter Signup - Dark Theme */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 bg-charcoal-light rounded-2xl mx-6 md:mx-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-warmWhite mb-4 font-serif">
              Stay Updated
            </h2>
            <p className="text-lg text-grey mb-8 max-w-2xl mx-auto">
              Get the latest restaurant reviews and culinary guides delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 border border-grey-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent bg-charcoal text-warmWhite placeholder-grey-dark"
              />
              <button className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}
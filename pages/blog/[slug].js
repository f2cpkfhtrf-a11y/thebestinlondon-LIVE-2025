import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { marked } from 'marked';

export async function getServerSideProps({ params }) {
  try {
    // Read blog files directly instead of calling API
  const fs = require('fs');
  const path = require('path');
    const matter = require('gray-matter');
    
    const BLOG_DIRS = [
      path.join(process.cwd(), 'content/blog'),
      path.join(process.cwd(), 'content/blog-seo'),
      path.join(process.cwd(), 'content/blog-seo/v2')
    ];
    
    let post = null;
    
    for (const dir of BLOG_DIRS) {
      if (fs.existsSync(dir)) {
        const mdPath = path.join(dir, `${params.slug}.md`);
        const jsonPath = path.join(dir, `${params.slug}.json`);
        
        // Try Markdown first
        if (fs.existsSync(mdPath)) {
          const fileContent = fs.readFileSync(mdPath, 'utf-8');
          const { data, content } = matter(fileContent);
          
          // Configure marked for proper HTML rendering
          marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false
          });
          
          const contentHtml = marked(content);
          
          post = { 
            ...data, 
            content,
            contentHtml,
            type: 'markdown'
          };
          break;
        }
        
        // Try JSON
        if (fs.existsSync(jsonPath)) {
          const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
          const data = JSON.parse(jsonContent);
          
          // Configure marked for proper HTML rendering
          marked.setOptions({
            breaks: true,
            gfm: true,
            headerIds: false,
            mangle: false
          });
          
          // Convert bodyMarkdown to HTML if present, otherwise use content or contentHtml
          let contentHtml = '';
          if (data.bodyMarkdown) {
            contentHtml = marked(data.bodyMarkdown);
          } else if (data.contentHtml) {
            contentHtml = data.contentHtml;
          } else if (data.content) {
            // If content is already HTML, use it; otherwise convert
            if (data.content.startsWith('<')) {
              contentHtml = data.content;
            } else {
              contentHtml = marked(data.content);
            }
          }
          
          post = { 
            ...data,
            contentHtml,
            content: data.bodyMarkdown || data.content || '',
            type: 'json'
          };
          break;
        }
      }
    }
    
    if (!post) {
      return { notFound: true };
    }
    
    if (!post || !post.title) {
      return { notFound: true };
    }
    
    // Normalize post data
    const normalizedPost = {
      title: post.title || 'Untitled',
      description: post.description || post.dek || '',
      slug: params.slug,
      author: post.author?.name || post.author_name || post.author || 'The Best in London Team',
      date: post.datePublished || post.publishedAt || post.date || new Date().toISOString(),
      hero: (post.hero && post.hero.startsWith('/public/') ? post.hero.replace('/public', '') : post.hero) || post.coverImage || '/images/heroes/site/default-blog-hero.webp',
      tags: post.tags || [],
      readTime: post.readTime || post.read_time || '5 min read',
      contentHtml: post.contentHtml || '',
      meta: {
        description: post.description || post.dek || '',
        tags: post.tags || [],
        schema: post.schema || 'BlogPosting'
      }
    };

  return {
    props: {
        post: normalizedPost
      }
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return { notFound: true };
  }
}

export default function BlogPost({ post }) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Format date properly - ensure consistent server/client rendering
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return '23 Oct 2025'; // Fallback to consistent format
      }
      // Use consistent format to avoid hydration mismatch
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return '23 Oct 2025'; // Fallback to consistent format
    }
  };

  // Generate excerpt for meta description
  const generateExcerpt = (content) => {
    if (post.description) return post.description;
    const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    return textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
  };

  const excerpt = generateExcerpt(post.contentHtml);
  const heroImageUrl = post.hero.startsWith('http') ? post.hero : `https://www.thebestinlondon.co.uk${post.hero}`;

  return (
    <>
      <Head>
        <title>{post.title} | The Best in London</title>
        <meta name="description" content={excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={excerpt} />
        <meta property="og:image" content={heroImageUrl} />
        <meta property="og:site_name" content="The Best in London" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={excerpt} />
        <meta name="twitter:image" content={heroImageUrl} />
        <link rel="canonical" href={`https://www.thebestinlondon.co.uk/blog/${post.slug}`} />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": excerpt,
              "image": heroImageUrl,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Best in London",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.thebestinlondon.co.uk/logo-compact.svg"
                }
              },
              "datePublished": post.date,
              "dateModified": post.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.thebestinlondon.co.uk/blog/${post.slug}`
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-warmWhite">
        {/* Header */}
        <Header />
        
        {/* Premium Hero Section - Dark Theme */}
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            data-bg-image={post.hero}
            style={{
              backgroundImage: `url('${post.hero}')`,
              transform: `translateY(${scrollY * 0.2}px) scale(1.05)`,
              willChange: 'transform'
            }}
          />
          
          {/* No gradient overlay - let the image show through */}
          
          {/* Content */}
          <div className={`relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-warmWhite leading-tight mb-6 font-serif drop-shadow-lg">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-grey mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              {post.description}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gold font-semibold uppercase tracking-wider">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </div>
        </section>

        {/* Premium Content Section - Dark Theme */}
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-12">
          <article className="prose prose-xl max-w-none">
            {/* Dark Theme Typography Styles */}
            <style jsx global>{`
              /* Hero Image Background */
              [data-bg-image] {
                background-image: url('${post.hero}') !important;
              }
              
              .prose h1 {
                display: none;
              }
              
              .prose h2 {
                font-family: 'Playfair Display', serif;
                font-size: 2.5rem;
                font-weight: 700;
                color: #D4AF37;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
                line-height: 1.3;
                text-align: left;
              }
              
              .prose h3 {
                font-family: 'Inter', sans-serif;
                font-size: 1.75rem;
                font-weight: 600;
                color: #F9F9F9;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                line-height: 1.4;
              }
              
              .prose p {
                font-family: 'Inter', sans-serif;
                font-size: 1.125rem;
                line-height: 1.75;
                color: #B3B3B3;
                margin-bottom: 2rem;
                max-width: none;
              }
              
              .prose p:first-of-type {
                font-size: 1.25rem;
                font-weight: 500;
                color: #F9F9F9;
                margin-bottom: 2.5rem;
              }
              
              .prose p:first-of-type::first-letter {
                font-size: 4rem;
                font-weight: 700;
                color: #D4AF37;
                float: left;
                line-height: 1;
                margin-right: 0.5rem;
                margin-top: 0.25rem;
                font-family: 'Playfair Display', serif;
              }
              
              .prose strong {
                color: #F9F9F9;
                font-weight: 600;
              }
              
              .prose em {
                color: #D4AF37;
                font-style: italic;
                font-weight: 500;
              }
              
              .prose a {
                color: #D4AF37;
                text-decoration: none;
                border-bottom: 2px solid transparent;
                transition: all 0.3s ease;
                font-weight: 600;
              }
              
              .prose a:hover {
                color: #E6C85A;
                border-bottom-color: #D4AF37;
              }
              
              .prose ul, .prose ol {
                margin-bottom: 2rem;
              }
              
              .prose li {
                color: #B3B3B3;
                margin-bottom: 0.75rem;
                line-height: 1.7;
                font-size: 1.125rem;
              }
              
              .prose blockquote {
                font-size: 1.5rem;
                font-style: italic;
                color: #F9F9F9;
                border-left: 4px solid #D4AF37;
                padding-left: 2rem;
                margin: 3rem 0;
                font-family: 'Playfair Display', serif;
                background: rgba(212, 175, 55, 0.05);
                padding: 2rem;
                border-radius: 0 8px 8px 0;
              }
              
              .prose hr {
                border: none;
                height: 2px;
                background: linear-gradient(90deg, transparent, #D4AF37, transparent);
                margin: 4rem 0;
                border-radius: 1px;
              }
              
              .prose img {
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(212, 175, 55, 0.2);
                transition: all 0.3s ease;
                margin: 2.5rem 0;
                width: 100%;
                height: auto;
              }
              
              .prose img:hover {
                transform: scale(1.02);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
              }
            `}</style>
            
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </article>
        </section>

        {/* You May Also Like Section - Dark Theme */}
        <section className="max-w-6xl mx-auto px-6 md:px-10 py-16 bg-charcoal-light">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-warmWhite mb-4 font-serif">
              You May Also Like
            </h2>
            <p className="text-lg text-grey max-w-2xl mx-auto">
              Discover more culinary adventures and restaurant guides across London.
            </p>
      </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/blog/halal-restaurants-ilford-lane" className="group cursor-pointer">
              <div className="bg-charcoal rounded-xl overflow-hidden border border-grey-dark group-hover:border-gold transition-all duration-300 shadow-charcoal group-hover:shadow-gold">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('/hero_v2/halal-restaurants-ilford-lane.webp')"}}>
                  <div className="h-full bg-black/40 flex items-center justify-center">
                    <span className="text-gold text-sm font-semibold bg-black/60 px-3 py-1 rounded">Halal Guide</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                    Halal Restaurants Ilford Lane
                  </h3>
                  <p className="text-grey text-sm">
                    Discover London's most legendary halal dining experiences in Ilford Lane.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/romantic-restaurants-london" className="group cursor-pointer">
              <div className="bg-charcoal rounded-xl overflow-hidden border border-grey-dark group-hover:border-gold transition-all duration-300 shadow-charcoal group-hover:shadow-gold">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('/hero_v2/romantic-restaurants-london.webp')"}}>
                  <div className="h-full bg-black/40 flex items-center justify-center">
                    <span className="text-gold text-sm font-semibold bg-black/60 px-3 py-1 rounded">Romantic Dining</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                    Romantic Restaurants London
                  </h3>
                  <p className="text-grey text-sm">
                    Intimate dining experiences that create moments that matter.
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/blog/late-night-restaurants-london" className="group cursor-pointer">
              <div className="bg-charcoal rounded-xl overflow-hidden border border-grey-dark group-hover:border-gold transition-all duration-300 shadow-charcoal group-hover:shadow-gold">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('/hero_v2/late-night-restaurants-london.webp')"}}>
                  <div className="h-full bg-black/40 flex items-center justify-center">
                    <span className="text-gold text-sm font-semibold bg-black/60 px-3 py-1 rounded">Late Night</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                    Late Night Restaurants London
                  </h3>
                  <p className="text-grey text-sm">
                    Where to eat when normal people are dreaming of breakfast.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}
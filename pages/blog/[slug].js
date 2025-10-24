import Head from 'next/head';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Robust blog post loader that handles both Markdown and JSON
const getBlogPost = (slug) => {
  const directories = [
    'content/blog/',
    'content/blog-seo/',
    'content/blog-seo/v2/'
  ];
  
  for (const dir of directories) {
    const mdPath = path.join(process.cwd(), dir, `${slug}.md`);
    const jsonPath = path.join(process.cwd(), dir, `${slug}.json`);
    
    // Try Markdown first
    if (fs.existsSync(mdPath)) {
      const file = fs.readFileSync(mdPath, 'utf8');
      const { data, content } = matter(file);
      
      return {
        ...data,
        contentHtml: marked.parse(content || ''),
        rawContent: content || '',
        type: 'markdown'
      };
    }
    
    // Try JSON
    if (fs.existsSync(jsonPath)) {
      const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      
      return {
        ...json,
        contentHtml: marked.parse(json.bodyMarkdown || json.content || ''),
        rawContent: json.bodyMarkdown || json.content || '',
        type: 'json'
      };
    }
  }
  
  return null;
};

// Get all blog files from all directories
const getAllBlogFiles = () => {
  const directories = [
    'content/blog/',
    'content/blog-seo/',
    'content/blog-seo/v2/'
  ];
  
  const allFiles = [];
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      files.forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.json')) {
          allFiles.push({
            slug: file.replace(/\.(md|json)$/, ''),
            type: file.endsWith('.md') ? 'markdown' : 'json',
            directory: dir
          });
        }
      });
    }
  });
  
  return allFiles;
};

export async function getStaticPaths() {
  const allFiles = getAllBlogFiles();
  
  const paths = allFiles.map(file => ({
    params: { slug: file.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }

  // Normalize post data - keep minimal data to reduce bundle size
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
    // Removed revalidate to prevent ISR and reduce bundle size
  };
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

  // Format date properly
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        });
      }
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
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
    <Layout>
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

      <div className="min-h-screen bg-charcoal text-warmWhite font-inter">
        {/* Unified Header Component */}
        <Header />

        {/* Cinematic Hero Section with Parallax */}
        <section className="relative w-full min-h-[60vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${post.hero}')`,
              transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
              willChange: 'transform'
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/90 via-[#0e0e0e]/40 to-transparent" />
          
          {/* Text Wrapper */}
          <div className="relative z-10 text-center px-6 md:px-10 max-w-4xl mx-auto">
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-playfair">
              {post.title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-[#d6d6d6] mt-3 mb-6 max-w-3xl mx-auto">
              {post.description}
            </p>
            
            {/* Meta Line */}
            <p className="text-sm text-[#c6a04c] mt-4 font-medium uppercase tracking-wide">
              By {post.author} · {post.readTime} · {formatDate(post.date)}
            </p>
          </div>
        </section>

        {/* Main Content with Premium Structure */}
        <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-12">
          <article className="prose prose-xl max-w-none">
            {/* Premium Typography Styles */}
            <style jsx global>{`
              .prose h1 {
                display: none; /* Hide duplicate h1 in content since we have hero title */
              }
              .prose h2 {
                font-family: 'Inter', sans-serif;
                font-size: 2.5rem;
                font-weight: 600;
                color: #D4AF37;
                margin-top: 4rem;
                margin-bottom: 2rem;
                padding-bottom: 0.75rem;
                border-bottom: 3px solid rgba(212, 175, 55, 0.4);
                display: inline-block;
                position: relative;
              }
              .prose h2::after {
                content: '';
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, #D4AF37, transparent);
              }
              .prose h3 {
                font-family: 'Inter', sans-serif;
                font-size: 2rem;
                font-weight: 500;
                color: #e0e0e0;
                margin-top: 3rem;
                margin-bottom: 1.5rem;
              }
              .prose p {
                font-family: 'Inter', sans-serif;
                font-size: 1.125rem;
                line-height: 1.8;
                color: #d6d6d6;
                margin-bottom: 2.5rem;
                max-width: 50rem;
              }
              .prose strong {
                color: #fdfdfd;
                font-weight: 600;
              }
              .prose em {
                color: rgba(212, 175, 55, 0.9);
                font-style: italic;
                font-weight: 500;
              }
              .prose a {
                color: #D4AF37;
                text-decoration: none;
                border-bottom: 1px solid transparent;
                transition: all 0.3s ease;
                font-weight: 500;
              }
              .prose a:hover {
                color: #fdfdfd;
                border-bottom-color: #D4AF37;
                transform: translateY(-1px);
              }
              .prose ul, .prose ol {
                margin-bottom: 2.5rem;
              }
              .prose li {
                color: #d6d6d6;
                margin-bottom: 0.75rem;
                line-height: 1.7;
                font-size: 1.125rem;
              }
              .prose blockquote {
                font-size: 1.75rem;
                font-style: italic;
                color: rgba(253, 253, 253, 0.9);
                border-left: 4px solid rgba(212, 175, 55, 0.8);
                padding-left: 1.5rem;
                margin: 3rem 0;
                font-family: 'Playfair Display', serif;
                background: rgba(212, 175, 55, 0.05);
                padding: 2rem 1.5rem;
                border-radius: 0 8px 8px 0;
              }
              .prose hr {
                border: none;
                height: 2px;
                background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
                margin: 4rem 0;
                border-radius: 1px;
              }
              
              /* Inline Image Styles */
              .prose img {
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(212, 175, 55, 0.2);
                transition: all 0.5s ease-out;
                margin: 3rem 0;
              }
              .prose img:hover {
                transform: scale(1.05);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
              }
              
              /* Animation Classes */
              @keyframes fade-in-up {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fade-in-up {
                animation: fade-in-up 1s ease-out forwards;
              }
              
              /* Scroll-triggered animations */
              .scroll-fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease-out;
              }
              .scroll-fade-in.visible {
                opacity: 1;
                transform: translateY(0);
              }
            `}</style>

            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </article>

          {/* You May Also Like Section */}
          <section className="mt-20 pt-16 border-t border-gold/20">
            <h2 className="text-3xl font-bold text-gold mb-8 font-playfair">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Related Posts will be dynamically generated */}
              <div className="group cursor-pointer">
                <div className="bg-grey-dark rounded-2xl overflow-hidden border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-gold/20 to-charcoal flex items-center justify-center">
                    <span className="text-gold text-sm font-medium">Related Article</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                      Discover More London Dining
                    </h3>
                    <p className="text-grey text-sm">
                      Explore our curated guides to London's finest restaurants and hidden gems.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="bg-grey-dark rounded-2xl overflow-hidden border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-gold/20 to-charcoal flex items-center justify-center">
                    <span className="text-gold text-sm font-medium">Related Article</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                      London Food Scene
                    </h3>
                    <p className="text-grey text-sm">
                      From street food to fine dining, discover what makes London's food scene extraordinary.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="bg-grey-dark rounded-2xl overflow-hidden border border-gold/20 group-hover:border-gold/40 transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-gold/20 to-charcoal flex items-center justify-center">
                    <span className="text-gold text-sm font-medium">Related Article</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-warmWhite mb-2 group-hover:text-gold transition-colors">
                      Restaurant Reviews
                    </h3>
                    <p className="text-grey text-sm">
                      In-depth reviews and recommendations from London's most trusted food critics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Premium Footer */}
        <footer className="bg-charcoal border-t border-gold/20 py-16">
          <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
            <Link href="/" className="inline-flex items-center space-x-3 text-gold hover:text-warmWhite font-medium transition-colors group">
              <span className="text-3xl">🍴</span>
              <div>
                <div className="text-xl font-semibold">The Best in London</div>
                <div className="text-sm text-grey tracking-wide">Curated Excellence</div>
              </div>
            </Link>
            <p className="text-warmWhite text-base mt-6 max-w-lg mx-auto leading-relaxed">
              Discover London's finest dining experiences, from Michelin-starred restaurants to hidden gems that define the capital's culinary landscape.
            </p>
          </div>
        </footer>
      </div>
    </Layout>
  );
}// Force deployment - Thu Oct 23 23:14:21 BST 2025

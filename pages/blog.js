import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import RichMarkdown from '../components/content/RichMarkdown';
import Link from 'next/link';
import { resolveBlogTile } from '../lib/images/resolve';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  const contentDir = path.join(process.cwd(), 'content');
  const blogDir = path.join(contentDir, 'blog');
  
  let blogs = [];
  
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
    blogs = blogFiles.map(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
      return JSON.parse(content);
    }).sort((a, b) => new Date(b.publishedAtISO) - new Date(a.publishedAtISO));
  }

  // The hero image for the blog list page can still use the old resolver or be updated
  // For now, keeping it as is, as the focus is on blog tiles.
  const heroImage = {
    src: '/images/heroes/blog-list-default.webp', // A default for the blog list page hero
    alt: 'London Blog Posts'
  };
  
  return {
    props: {
      blogs,
      heroImage
    } // Revalidate every hour
  };
}

export default function BlogPage({ blogs, heroImage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags || []))];

  useEffect(() => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.dek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(blog => 
        (blog.tags || []).includes(selectedTag)
      );
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, selectedTag, blogs]);

  return (
    <Layout>
      <Head>
        <title>London Restaurant Blog | The Best in London</title>
        <meta name="description" content="Discover the latest insights, guides, and recommendations for London's best restaurants. Expert-curated content about dining in the capital." />
        <meta property="og:title" content="London Restaurant Blog | The Best in London" />
        <meta property="og:description" content="Discover the latest insights, guides, and recommendations for London's best restaurants." />
        <meta property="og:image" content={heroImage.src} />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/blog" />
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Restaurant Blog</h1>
            <p className="text-xl md:text-2xl">Discover London's culinary stories and dining insights</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <p className="text-gray-300">
            Showing {filteredBlogs.length} of {blogs.length} posts
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-300 mb-4">No blog posts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <article key={blog.slug} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors">
                <Link href={`/blog/${blog.slug}`} className="block">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                    <img
                                src={(() => {
                                  try {
                                    const resolved = resolveBlogTile(blog.slug);
                                    return resolved.src;
                                  } catch (error) {
                                    console.warn(`Failed to resolve blog tile for ${blog.slug}:`, error);
                                    return `${blog.coverImage || '/images/blog/' + blog.slug + '.webp'}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
                                  }
                                })()}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = `/images/heroes/site/default-list-hero.webp?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-yellow-600 text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {blog.dek}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{new Date(blog.publishedAtISO).toLocaleDateString()}</span>
                      <span>By {blog.author.name}</span>
                    </div>
                  </div>
                </Link>
              </article>
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
            "@type": "Blog",
            "name": "London Restaurant Blog",
            "description": "Discover the latest insights, guides, and recommendations for London's best restaurants.",
            "url": "https://www.thebestinlondon.co.uk/blog",
            "publisher": {
              "@type": "Organization",
              "name": "The Best in London",
              "url": "https://www.thebestinlondon.co.uk"
            },
            "blogPost": blogs.slice(0, 10).map(blog => ({
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": blog.dek,
              "url": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`,
              "datePublished": blog.publishedAtISO,
              "dateModified": blog.updatedAtISO,
              "author": {
                "@type": "Person",
                "name": blog.author.name
              },
              "image": `https://www.thebestinlondon.co.uk${blog.coverImage}`
            }))
          })
        }}
      />
    </Layout>
  );
}

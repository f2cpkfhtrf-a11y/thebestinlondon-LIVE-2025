import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LatestBlogProps {
  blogs: any[];
}

export default function LatestBlog({ blogs }: LatestBlogProps) {
  // Get latest 3 blog posts
  const latestBlogs = blogs
    .sort((a, b) => new Date(b.publishedAtISO).getTime() - new Date(a.publishedAtISO).getTime())
    .slice(0, 3);

  if (latestBlogs.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Discover the latest insights and guides from our food experts
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-colors duration-300"
          >
            View All Posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <Link 
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group block"
            >
              <article className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                {/* Hero Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`${blog.coverImage}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/images/heroes/site/default-list-hero.webp?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Tags */}
                  <div className="absolute top-4 left-4">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags?.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gold/90 text-black text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif font-bold text-white text-xl mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {blog.dek}
                  </p>
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`${blog.author.avatar}?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`}
                        alt={blog.author.name}
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/images/heroes/site/default-list-hero.webp?v=${process.env.NEXT_PUBLIC_ASSET_VERSION || 'v1'}`;
                        }}
                      />
                      <div>
                        <div className="text-white text-sm font-medium">{blog.author.name}</div>
                        <div className="text-gray-400 text-xs">{blog.author.title}</div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {new Date(blog.publishedAtISO).toLocaleDateString('en-GB', {
                        month: 'short',
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
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  const matter = require('gray-matter');
  
  const directories = [
    'content/blog/',
    'content/blog-seo/',
    'content/blog-seo/v2/'
  ];
  
  let blogs = [];
  
  directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
      const files = fs.readdirSync(fullPath);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          try {
            const content = fs.readFileSync(path.join(fullPath, file), 'utf8');
            const blogData = JSON.parse(content);
            blogs.push({
              ...blogData,
              slug: file.replace('.json', ''),
              type: 'json'
            });
          } catch (error) {
            console.error(`Error parsing ${file}:`, error);
          }
        } else if (file.endsWith('.md')) {
          try {
            const content = fs.readFileSync(path.join(fullPath, file), 'utf8');
            const { data } = matter(content);
            blogs.push({
              ...data,
              slug: file.replace('.md', ''),
              type: 'markdown'
            });
          } catch (error) {
            console.error(`Error parsing ${file}:`, error);
          }
        }
      });
    }
  });
  
  // Sort by date
  blogs.sort((a, b) => {
    const dateA = new Date(a.publishedAtISO || a.datePublished || a.date || 0);
    const dateB = new Date(b.publishedAtISO || b.datePublished || b.date || 0);
    return dateB - dateA;
  });

  return {
    props: {
      blogs: blogs || []
    },
    revalidate: 3600
  };
}

export default function BlogPage({ blogs }) {
  return (
    <Layout>
      <Head>
        <title>London Restaurant Blog | The Best in London</title>
        <meta name="description" content="Discover the latest insights, guides, and recommendations for London's best restaurants. Expert-curated content about dining in the capital." />
        <meta property="og:title" content="London Restaurant Blog | The Best in London" />
        <meta property="og:description" content="Discover the latest insights, guides, and recommendations for London's best restaurants." />
        <link rel="canonical" href="https://www.thebestinlondon.co.uk/blog" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative h-64 md:h-96 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Restaurant Blog</h1>
              <p className="text-xl md:text-2xl">Discover London's culinary stories and dining insights</p>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center">
                <p className="text-gray-400 text-lg">No blog posts available at the moment.</p>
              </div>
            ) : (
              blogs.map((blog, index) => (
                <Link key={index} href={`/blog/${blog.slug}`}>
                  <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <h2 className="text-xl font-semibold mb-3 text-white hover:text-yellow-400">
                      {blog.title || 'Untitled'}
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {blog.dek || blog.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{blog.readTime || blog.read_time || '5 min read'}</span>
                      <span>{new Date(blog.publishedAtISO || blog.datePublished || blog.date || Date.now()).toLocaleDateString()}</span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-yellow-600 text-black text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
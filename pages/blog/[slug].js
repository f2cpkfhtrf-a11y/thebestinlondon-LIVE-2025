import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      notFound: true
    };
  }

  // Normalize post data
  const normalizedPost = {
    ...post,
    title: post.title || 'Untitled',
    description: post.description || post.dek || '',
    slug: params.slug,
    author: post.author?.name || post.author_name || post.author || 'The Best in London Team',
    authorObject: post.author || { name: post.author_name || post.author || 'The Best in London Team' },
    date: post.datePublished || post.publishedAt || post.date || new Date().toISOString(),
    hero: post.hero || post.coverImage || '/images/heroes/site/default-blog-hero.webp',
    tags: post.tags || [],
    readTime: post.readTime || post.read_time || '5 min read',
    meta: {
      description: post.description || post.dek || '',
      tags: post.tags || [],
      schema: post.schema || 'BlogPosting'
    }
  };

  return {
    props: {
      post: normalizedPost
    },
    revalidate: 3600
  };
}

export default function BlogPost({ post }) {
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

  return (
    <Layout>
      <Head>
        <title>{post.title} | The Best in London</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.hero} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={post.hero} />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "image": post.hero,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "The Best in London",
                "logo": {
                  "@type": "ImageObject",
                  "url": "/logo-compact.svg"
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

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <img
            src={post.hero}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                {post.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </div>

        {/* Back to Blog */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <Link href="/blog" legacyBehavior>
            <a className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Blog
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}// Force deployment - Thu Oct 23 23:14:21 BST 2025

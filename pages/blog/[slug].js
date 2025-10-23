import Head from 'next/head';
import Layout from '../../components/Layout';
import RichMarkdown from '../../components/content/RichMarkdown';
import Link from 'next/link';
import { resolveHeroImage } from '../../lib/resolveHeroImage';

// Helper function to parse YAML frontmatter from Markdown files
function parseMarkdownFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return { frontmatter: {}, content: content };
  }
  
  const frontmatterText = frontmatterMatch[1];
  const markdownContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // Parse YAML frontmatter (simplified)
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentObject = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) continue;
    
    // Check if it's a key-value pair
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmedLine.substring(0, colonIndex).trim();
      let value = trimmedLine.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Check if this is a nested object
      if (value === '' && (key === 'author' || key === 'publisher' || key === 'tags')) {
        currentKey = key;
        currentObject = {};
        frontmatter[key] = currentObject;
      } else if (currentKey && currentObject) {
        // This is a nested property
        currentObject[key] = value;
      } else {
        // Regular key-value pair
        frontmatter[key] = value;
        currentKey = null;
        currentObject = null;
      }
    }
  }
  
  return { frontmatter, content: markdownContent };
}

// Helper function to get all blog files from multiple directories
function getAllBlogFiles() {
  const fs = require('fs');
  const path = require('path');
  
  const blogDirs = [
    path.join(process.cwd(), 'content', 'blog'),
    path.join(process.cwd(), 'content', 'blog-seo'),
    path.join(process.cwd(), 'content', 'blog-seo', 'v2')
  ];
  
  const allFiles = [];
  
  blogDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        if (file.endsWith('.json') || file.endsWith('.md')) {
          allFiles.push({
            path: path.join(dir, file),
            slug: file.replace(/\.(json|md)$/, ''),
            type: file.endsWith('.json') ? 'json' : 'markdown',
            directory: path.basename(dir)
          });
        }
      });
    }
  });
  
  return allFiles;
}

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
  const fs = require('fs');
  const path = require('path');
  
  const allFiles = getAllBlogFiles();
  const targetFile = allFiles.find(file => file.slug === params.slug);
  
  if (!targetFile) {
    return {
      notFound: true
    };
  }
  
  let blog;
  let heroImage;
  
  if (targetFile.type === 'json') {
    // Handle existing JSON blog files
    blog = JSON.parse(fs.readFileSync(targetFile.path, 'utf8'));
    heroImage = resolveHeroImage({ type: "venue" });
  } else {
    // Handle new Markdown blog files
    const markdownContent = fs.readFileSync(targetFile.path, 'utf8');
    const { frontmatter, content } = parseMarkdownFrontmatter(markdownContent);
    
    // Convert frontmatter to blog object format
    blog = {
      title: frontmatter.title || 'Untitled',
      description: frontmatter.description || '',
      slug: frontmatter.slug || params.slug,
      hero: frontmatter.hero || '/images/heroes/site/default-blog-hero.webp',
      schema: frontmatter.schema || 'BlogPosting',
      publishedAt: frontmatter.publishedAt || frontmatter.datePublished || new Date().toISOString(),
      updatedAt: frontmatter.updatedAt || new Date().toISOString(),
      tags: frontmatter.tags || ['London', 'restaurants'],
      author: {
        name: frontmatter.author || 'Ava Beckett',
        title: 'Senior Dining Editor',
        bio: 'Curating London\'s best tables with authentic local insights.',
        avatar: '/images/brand/author-ava.webp'
      },
      readTime: frontmatter.readTime || frontmatter.read_time || '5 min read',
      content: content,
      // Additional metadata for new format
      author_name: frontmatter.author || 'Ava Beckett',
      author_type: frontmatter.author_type || 'Person',
      publisher_name: frontmatter.publisher || 'The Best in London',
      publisher_type: frontmatter.publisher_type || 'Organization',
      publisher_logo: frontmatter.publisher_logo || '/logo-compact.svg',
      review_status: frontmatter.review_status || 'pending'
    };
    
    // Resolve hero image
    if (frontmatter.hero) {
      heroImage = frontmatter.hero;
    } else {
      heroImage = resolveHeroImage({ type: "venue" });
    }
  }

  return {
    props: {
      blog,
      heroImage
    },
    revalidate: 3600
  };
}

export default function BlogPost({ blog, heroImage }) {
  return (
    <Layout>
      <Head>
        <title>{blog.title} | The Best in London</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={heroImage} />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": blog.title,
              "description": blog.description,
              "image": heroImage,
              "author": {
                "@type": blog.author_type || "Person",
                "name": blog.author?.name || blog.author_name || blog.author
              },
              "publisher": {
                "@type": blog.publisher_type || "Organization",
                "name": blog.publisher_name || "The Best in London",
                "logo": {
                  "@type": "ImageObject",
                  "url": blog.publisher_logo || "/logo-compact.svg"
                }
              },
              "datePublished": blog.publishedAt,
              "dateModified": blog.updatedAt,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://www.thebestinlondon.co.uk/blog/${blog.slug}`
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-900">
          <img
            src={heroImage}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {blog.title}
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-90">
                {blog.description}
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm opacity-80">
                <span>By {blog.author?.name || blog.author_name || blog.author}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
                <span>•</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="prose prose-lg max-w-none">
            {blog.content ? (
              <RichMarkdown content={blog.content} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            )}
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
}
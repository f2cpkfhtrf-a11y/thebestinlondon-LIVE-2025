import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIRS = [
  path.join(process.cwd(), 'content/blog'),
  path.join(process.cwd(), 'content/blog-seo'),
  path.join(process.cwd(), 'content/blog-seo/v2')
];

export default function handler(req, res) {
  try {
    const { slug } = req.query;
    
    if (slug) {
      // Return specific blog post
      for (const dir of BLOG_DIRS) {
        if (fs.existsSync(dir)) {
          const mdPath = path.join(dir, `${slug}.md`);
          const jsonPath = path.join(dir, `${slug}.json`);
          
          // Try Markdown first
          if (fs.existsSync(mdPath)) {
            const fileContent = fs.readFileSync(mdPath, 'utf-8');
            const { data, content } = matter(fileContent);
            
            res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
            return res.status(200).json({ 
              ...data, 
              content,
              contentHtml: content,
              type: 'markdown'
            });
          }
          
          // Try JSON
          if (fs.existsSync(jsonPath)) {
            const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
            const data = JSON.parse(jsonContent);
            
            res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
            return res.status(200).json({ 
              ...data,
              type: 'json'
            });
          }
        }
      }
      
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Return all blog posts
    const posts = [];
    const seenSlugs = new Set();
    
    BLOG_DIRS.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
          if (file.endsWith('.md')) {
            try {
              const slug = file.replace(/\.md$/, '');
              const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');
              const { data } = matter(fileContent);
              
              // Normalize slug - remove /blog/ prefix if it exists
              const normalizedSlug = data.slug?.startsWith('/blog/') ? data.slug.replace('/blog/', '') : slug;
              
              // Only add if we haven't seen this slug before
              if (!seenSlugs.has(normalizedSlug)) {
                seenSlugs.add(normalizedSlug);
                // Remove slug from data to avoid conflicts
                const { slug: _slug, ...cleanData } = data;
                posts.push({ 
                  slug: normalizedSlug, 
                  ...cleanData, 
                  type: 'markdown' 
                });
              }
            } catch (error) {
              console.error(`Error parsing ${file}:`, error);
            }
          } else if (file.endsWith('.json')) {
            try {
              const slug = file.replace(/\.json$/, '');
              const jsonContent = fs.readFileSync(path.join(dir, file), 'utf-8');
              const data = JSON.parse(jsonContent);
              
              // Normalize slug - remove /blog/ prefix if it exists
              const normalizedSlug = data.slug?.startsWith('/blog/') ? data.slug.replace('/blog/', '') : slug;
              
              // Only add if we haven't seen this slug before
              if (!seenSlugs.has(normalizedSlug)) {
                seenSlugs.add(normalizedSlug);
                // Remove slug from data to avoid conflicts
                const { slug: _slug, ...cleanData } = data;
                posts.push({ 
                  slug: normalizedSlug, 
                  ...cleanData, 
                  type: 'json' 
                });
              }
            } catch (error) {
              console.error(`Error parsing ${file}:`, error);
            }
          }
        });
      }
    });
    
    // Sort by date
    posts.sort((a, b) => {
      const dateA = new Date(a.datePublished || a.publishedAt || a.date || 0);
      const dateB = new Date(b.datePublished || b.publishedAt || b.date || 0);
      return dateB - dateA;
    });
    
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(posts);
    
  } catch (error) {
    console.error('Blog API error:', error);
    res.status(500).json({ error: 'Failed to load blog content' });
  }
}

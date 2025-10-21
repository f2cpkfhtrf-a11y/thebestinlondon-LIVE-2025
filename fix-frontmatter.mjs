import fs from 'fs';
import path from 'path';

const blogDir = 'content/blog-seo/v2';
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  console.log(`📊 Fixing ${file}...`);
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract content after frontmatter
  const contentMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const markdownContent = contentMatch ? contentMatch[1] : content;
  
  // Create clean frontmatter
  const cleanFrontmatter = `---
title: "${file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}"
description: "Discover the best restaurants and dining experiences in London."
slug: "/blog/${file.replace('.md', '')}"
hero: "/public/hero_v2/${file.replace('.md', '')}.webp"
schema: "BlogPosting + LocalBusiness"
publishedAt: "2025-10-23T21:30:58.779Z"
updatedAt: "2025-10-23T21:30:58.779Z"
tags: ["London", "restaurants", "guide", "food", "editorial"]
author: "Ava Beckett"
readTime: "8 min read"
publisher: "The Best in London"
datePublished: "2025-10-23"
review_status: "pending"
---`;
  
  // Write back with clean frontmatter
  fs.writeFileSync(filePath, cleanFrontmatter + '\n' + markdownContent);
  console.log(`✅ Fixed ${file}`);
});

console.log('📊 All frontmatter fixed!');

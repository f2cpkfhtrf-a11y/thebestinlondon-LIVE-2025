#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyContent() {
  console.log('🔍 Verifying content integrity...');
  
  const contentDir = path.join(__dirname, '../content');
  const blogDir = path.join(contentDir, 'blog');
  const faqDir = path.join(contentDir, 'faq');
  
  let blogCount = 0;
  let faqCount = 0;
  let errors = [];
  
  // Verify blog posts
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.json'));
    
    for (const file of blogFiles) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(blogDir, file), 'utf8'));
        
        // Validate required fields
        const requiredFields = ['slug', 'title', 'dek', 'coverImage', 'tags', 'author', 'publishedAtISO', 'updatedAtISO', 'seo', 'bodyMarkdown'];
        const missing = requiredFields.filter(field => !content[field]);
        
        if (missing.length > 0) {
          errors.push(`Blog ${file}: missing fields ${missing.join(', ')}`);
        }
        
        // Validate slug matches filename
        const expectedSlug = file.replace('.json', '');
        if (content.slug !== expectedSlug) {
          errors.push(`Blog ${file}: slug mismatch (${content.slug} vs ${expectedSlug})`);
        }
        
        blogCount++;
      } catch (error) {
        errors.push(`Blog ${file}: JSON parse error - ${error.message}`);
      }
    }
  }
  
  // Verify FAQs
  if (fs.existsSync(faqDir)) {
    const faqFiles = fs.readdirSync(faqDir).filter(file => file.endsWith('.json'));
    
    for (const file of faqFiles) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(faqDir, file), 'utf8'));
        
        // Validate required fields
        const requiredFields = ['slug', 'question', 'answerMarkdown', 'relatedCuisineSlugs', 'relatedAreaSlugs', 'updatedAtISO', 'seo'];
        const missing = requiredFields.filter(field => !content[field]);
        
        if (missing.length > 0) {
          errors.push(`FAQ ${file}: missing fields ${missing.join(', ')}`);
        }
        
        // Validate slug matches filename
        const expectedSlug = file.replace('.json', '');
        if (content.slug !== expectedSlug) {
          errors.push(`FAQ ${file}: slug mismatch (${content.slug} vs ${expectedSlug})`);
        }
        
        faqCount++;
      } catch (error) {
        errors.push(`FAQ ${file}: JSON parse error - ${error.message}`);
      }
    }
  }
  
  // Report results
  console.log(`✅ Found ${blogCount} blog posts`);
  console.log(`✅ Found ${faqCount} FAQs`);
  
  if (errors.length > 0) {
    console.log('\n❌ Content verification errors:');
    errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All content verified successfully!');
    process.exit(0);
  }
}

verifyContent();

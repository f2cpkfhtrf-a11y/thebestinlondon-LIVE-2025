import React from 'react';
import { marked } from 'marked';

interface RichMarkdownProps {
  content: string;
  className?: string;
}

export default function RichMarkdown({ content, className = '' }: RichMarkdownProps) {
  // Configure marked for safe HTML rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
    sanitize: false, // We trust our content sources
  });

  const htmlContent = marked(content);

  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{
        color: '#f3f4f6',
        '--tw-prose-body': '#f3f4f6',
        '--tw-prose-headings': '#fbbf24',
        '--tw-prose-lead': '#d1d5db',
        '--tw-prose-links': '#fbbf24',
        '--tw-prose-bold': '#ffffff',
        '--tw-prose-counters': '#9ca3af',
        '--tw-prose-bullets': '#6b7280',
        '--tw-prose-hr': '#374151',
        '--tw-prose-quotes': '#e5e7eb',
        '--tw-prose-quote-borders': '#374151',
        '--tw-prose-captions': '#9ca3af',
        '--tw-prose-code': '#ffffff',
        '--tw-prose-pre-code': '#e5e7eb',
        '--tw-prose-pre-bg': '#1f2937',
        '--tw-prose-th-borders': '#374151',
        '--tw-prose-td-borders': '#374151',
      }}
    />
  );
}

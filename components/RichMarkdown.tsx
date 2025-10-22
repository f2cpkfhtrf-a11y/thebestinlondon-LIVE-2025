import React from 'react';

// Simple RichMarkdown component without external dependencies
export function RichMarkdown({ content }: { content: string }) {
  if (!content) return null;
  
  // Simple markdown-like parsing for basic formatting
  const parseMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };
  
  const __html = parseMarkdown(content);
  
  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html }} 
    />
  );
}


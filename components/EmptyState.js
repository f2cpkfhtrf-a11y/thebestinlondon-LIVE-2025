import React from 'react';

export default function EmptyState({ title, description, actionText, actionHref }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-24 h-24 bg-grey-dark rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-xl font-serif font-semibold text-white mb-2">{title}</h3>
      <p className="text-grey mb-6 max-w-md">{description}</p>
      {actionHref && (
        <a href={actionHref} className="btn-primary">
          {actionText}
        </a>
      )}
    </div>
  );
}
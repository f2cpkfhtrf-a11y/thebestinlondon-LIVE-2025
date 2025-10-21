/**
 * SEO Content Block Component
 * Adds keyword-rich content blocks for better rankings
 */

export default function SEOContentBlock({ 
  title, 
  keywords = [],
  children,
  className = '' 
}) {
  return (
    <section className={`py-8 md:py-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-warmWhite mb-6">
            {title}
          </h2>
        )}
        <div className="prose prose-lg max-w-none text-grey">
          {children}
        </div>
      </div>
    </section>
  );
}


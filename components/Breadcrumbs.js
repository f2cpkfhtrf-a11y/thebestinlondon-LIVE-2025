import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Breadcrumbs({ items = [], className = '' }) {
  const router = useRouter();
  
  // Auto-generate breadcrumbs based on current path if no items provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;
    
    const pathSegments = router.asPath.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Handle special cases
      let label = segment;
      
      // Area pages
      if (index === 0 && segment === 'areas') {
        label = 'Areas';
      } else if (index === 1 && pathSegments[0] === 'areas') {
        label = segment.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      // Cuisine pages  
      else if (index === 0 && segment.includes('-restaurants-london')) {
        const cuisineName = segment.replace('-restaurants-london', '');
        label = cuisineName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      else if (index === 0 && segment === 'cuisines') {
        label = 'Cuisines';
      }
      
      // Restaurant pages
      else if (index === 0 && segment === 'restaurant') {
        label = 'Restaurants';
        currentPath = '/restaurants'; // Link to restaurants list, not /restaurant
      } else if (index === 1 && pathSegments[0] === 'restaurant') {
        label = segment.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
      }
      
      // Other special cases
      else if (segment === 'best-halal-restaurants-london') {
        label = 'Halal Restaurants';
      } else if (segment === 'near-me') {
        label = 'Near Me';
      } else if (segment === 'about') {
        label = 'About';
      } else if (segment === 'contact') {
        label = 'Contact';
      }
      
      // Format label properly
      if (index > 0 || segment !== 'restaurant') {
        breadcrumbs.push({
          label,
          href: currentPath,
          isLast: index === pathSegments.length - 1
        });
      }
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for home page
  }
  
  // JSON-LD structured data for breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://www.thebestinlondon.co.uk${item.href}` : undefined
    }))
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav 
        className={`flex items-center space-x-2 text-sm ${className}`}
        aria-label="Breadcrumb"
      >
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 text-grey mx-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            )}
            {item.isLast ? (
              <span className="text-warmWhite font-medium">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-grey hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

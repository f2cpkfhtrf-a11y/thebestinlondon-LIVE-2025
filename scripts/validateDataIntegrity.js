const fs = require('fs');
const path = require('path');

// Data validation and fallback system
async function validateDataIntegrity() {
  console.log('🔍 Validating data integrity...');
  
  try {
    // Read venues data
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    const venues = Array.isArray(data) ? data : (data.venues || []);
    
    console.log(`📊 Processing ${venues.length} venues...`);
    
    const validationResults = {
      totalVenues: venues.length,
      validVenues: 0,
      venuesWithIssues: 0,
      issues: []
    };
    
    // Validate each venue
    venues.forEach((venue, index) => {
      const issues = [];
      
      // Required fields validation
      if (!venue.name || venue.name.trim().length === 0) {
        issues.push('Missing or empty name');
      }
      
      if (!venue.slug || venue.slug.trim().length === 0) {
        issues.push('Missing or empty slug');
      }
      
      if (!venue.cuisines || !Array.isArray(venue.cuisines) || venue.cuisines.length === 0) {
        issues.push('Missing or invalid cuisines');
      }
      
      if (!venue.rating || venue.rating < 1 || venue.rating > 5) {
        issues.push('Invalid rating (must be 1-5)');
      }
      
      if (!venue.photos || !Array.isArray(venue.photos) || venue.photos.length === 0) {
        issues.push('Missing or invalid photos');
      }
      
      if (!venue.address || !venue.address.formatted) {
        issues.push('Missing or invalid address');
      }
      
      // Optional fields validation with fallbacks
      if (!venue.description || venue.description.length < 20) {
        issues.push('Description too short (will use fallback)');
      }
      
      if (!venue.user_ratings_total || venue.user_ratings_total < 1) {
        issues.push('Invalid review count (will use fallback)');
      }
      
      if (!venue.price_level || venue.price_level < 1 || venue.price_level > 4) {
        issues.push('Invalid price level (will use fallback)');
      }
      
      if (issues.length === 0) {
        validationResults.validVenues++;
      } else {
        validationResults.venuesWithIssues++;
        validationResults.issues.push({
          venue: venue.name,
          index: index,
          issues: issues
        });
      }
    });
    
    // Generate report
    console.log('\\n📈 VALIDATION REPORT:');
    console.log(`Total venues: ${validationResults.totalVenues}`);
    console.log(`Valid venues: ${validationResults.validVenues}`);
    console.log(`Venues with issues: ${validationResults.venuesWithIssues}`);
    console.log(`Success rate: ${Math.round((validationResults.validVenues / validationResults.totalVenues) * 100)}%`);
    
    if (validationResults.issues.length > 0) {
      console.log('\\n⚠️ VENUES WITH ISSUES:');
      validationResults.issues.slice(0, 10).forEach(issue => {
        console.log(`\\n${issue.venue} (Index: ${issue.index}):`);
        issue.issues.forEach(problem => {
          console.log(`  - ${problem}`);
        });
      });
      
      if (validationResults.issues.length > 10) {
        console.log(`\\n... and ${validationResults.issues.length - 10} more venues with issues`);
      }
    }
    
    return validationResults;
    
  } catch (error) {
    console.error('❌ Error during validation:', error);
    throw error;
  }
}

// Test page rendering
async function testPageRendering() {
  console.log('\\n🧪 Testing page rendering...');
  
  try {
    // Test key pages exist and are accessible
    const testPages = [
      '/',
      '/restaurants',
      '/best-halal-restaurants-london',
      '/vegan-restaurants-london',
      '/indian-restaurants-london',
      '/italian-restaurants-london',
      '/japanese-restaurants-london',
      '/restaurants-soho',
      '/restaurants-covent-garden',
      '/restaurants-mayfair',
      '/halal/near-stations',
      '/guides',
      '/privacy',
      '/terms',
      '/cookies'
    ];
    
    const results = {
      totalPages: testPages.length,
      accessiblePages: 0,
      inaccessiblePages: []
    };
    
    // Check if pages exist (simplified check)
    testPages.forEach(page => {
      let pagePath;
      if (page === '/') {
        pagePath = path.join(process.cwd(), 'pages', 'index.js');
      } else if (page === '/halal/near-stations') {
        pagePath = path.join(process.cwd(), 'pages', 'halal', 'near-stations', 'index.js');
      } else {
        pagePath = path.join(process.cwd(), 'pages', `${page}.js`);
      }
      
      const exists = fs.existsSync(pagePath);
      
      if (exists) {
        results.accessiblePages++;
      } else {
        results.inaccessiblePages.push(page);
      }
    });
    
    console.log(`\\n📈 PAGE RENDERING TEST:`);
    console.log(`Total pages tested: ${results.totalPages}`);
    console.log(`Accessible pages: ${results.accessiblePages}`);
    console.log(`Inaccessible pages: ${results.inaccessiblePages.length}`);
    console.log(`Success rate: ${Math.round((results.accessiblePages / results.totalPages) * 100)}%`);
    
    if (results.inaccessiblePages.length > 0) {
      console.log('\\n⚠️ INACCESSIBLE PAGES:');
      results.inaccessiblePages.forEach(page => {
        console.log(`  - ${page}`);
      });
    }
    
    return results;
    
  } catch (error) {
    console.error('❌ Error during page testing:', error);
    throw error;
  }
}

// Create fallback components
function createFallbackComponents() {
  console.log('\\n🛠️ Creating fallback components...');
  
  // Empty state component
  const emptyStateComponent = `import React from 'react';

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
}`;
  
  // Error boundary component
  const errorBoundaryComponent = `import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-semibold text-white mb-2">Something went wrong</h3>
          <p className="text-grey mb-6 max-w-md">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`;
  
  // Write components
  fs.writeFileSync(path.join(process.cwd(), 'components/EmptyState.js'), emptyStateComponent);
  fs.writeFileSync(path.join(process.cwd(), 'components/ErrorBoundary.js'), errorBoundaryComponent);
  
  console.log('✅ Fallback components created successfully!');
}

// Run if called directly
if (require.main === module) {
  validateDataIntegrity()
    .then(() => testPageRendering())
    .then(() => createFallbackComponents())
    .catch(console.error);
}

module.exports = { validateDataIntegrity, testPageRendering, createFallbackComponents };

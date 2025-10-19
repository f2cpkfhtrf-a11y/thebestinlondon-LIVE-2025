import fs from 'fs';
import path from 'path';

interface RouteAuditResult {
  ok: Array<{
    path: string;
    status: number;
    responseTime: number;
  }>;
  redirects: Array<{
    path: string;
    status: number;
    location?: string;
  }>;
  notFound: Array<{
    path: string;
    status: number;
    error?: string;
  }>;
  mismatchedSlug: Array<{
    path: string;
    expectedSlug: string;
    actualSlug: string;
  }>;
}

async function getExpectedRoutes(): Promise<string[]> {
  const routes: string[] = [];
  
  // Static routes
  const staticRoutes = [
    '/',
    '/restaurants',
    '/areas',
    '/cuisines', 
    '/best-halal-restaurants-london',
    '/near-me',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies'
  ];
  routes.push(...staticRoutes);
  
  // Generate venue routes from venues.json
  try {
    const venuesPath = path.join(process.cwd(), 'public/venues.json');
    if (fs.existsSync(venuesPath)) {
      const venuesData = JSON.parse(fs.readFileSync(venuesPath, 'utf8'));
      const venues = Array.isArray(venuesData) ? venuesData : (venuesData.venues || []);
      
      for (const venue of venues.slice(0, 50)) { // Limit to first 50 for performance
        if (venue.slug) {
          routes.push(`/restaurant/${venue.slug}`);
        }
      }
    }
  } catch (error) {
    console.warn('Could not load venues for route generation:', error);
  }
  
  // Generate area routes
  try {
    const areas = [
      'central-london', 'tower-hamlets', 'westminster', 'camden', 'hackney',
      'islington', 'kensington-and-chelsea', 'lambeth', 'southwark', 'soho',
      'shoreditch', 'covent-garden', 'mayfair', 'marylebone', 'fitzrovia',
      'holborn', 'clerkenwell', 'whitechapel', 'spitalfields', 'brick-lane',
      'borough', 'london-bridge', 'canary-wharf', 'greenwich', 'richmond',
      'wimbledon', 'clapham', 'brixton', 'stratford'
    ];
    
    for (const area of areas) {
      routes.push(`/restaurants-${area}`);
      routes.push(`/areas/${area}`);
    }
  } catch (error) {
    console.warn('Could not generate area routes:', error);
  }
  
  // Generate cuisine routes
  try {
    const cuisines = [
      'british', 'indian', 'italian', 'japanese', 'thai', 'turkish',
      'french', 'chinese', 'spanish', 'korean', 'mexican', 'lebanese',
      'pakistani', 'bangladeshi', 'iranian', 'afghan', 'middle-eastern',
      'vegan', 'vegetarian', 'halal', 'steakhouse', 'seafood', 'pizza',
      'burgers', 'cafe', 'bakery', 'desserts'
    ];
    
    for (const cuisine of cuisines) {
      routes.push(`/${cuisine}`);
      routes.push(`/${cuisine}-restaurants-london`);
    }
  } catch (error) {
    console.warn('Could not generate cuisine routes:', error);
  }
  
  return routes;
}

async function checkRoute(route: string): Promise<{
  path: string;
  status: number;
  responseTime: number;
  location?: string;
  error?: string;
}> {
  const startTime = Date.now();
  
  try {
    // For local testing, we'll simulate route checking
    // In a real scenario, this would make HTTP requests to a running dev server
    
    // Check if the route corresponds to an existing page file
    const pagePath = await findPageFile(route);
    const responseTime = Date.now() - startTime;
    
    if (pagePath) {
      return {
        path: route,
        status: 200,
        responseTime,
      };
    } else {
      // Check if it would be a 404 or redirect
      if (route.includes('/restaurant/') && !pagePath) {
        return {
          path: route,
          status: 404,
          responseTime,
          error: 'Venue not found'
        };
      }
      
      return {
        path: route,
        status: 404,
        responseTime,
        error: 'Page not found'
      };
    }
  } catch (error) {
    return {
      path: route,
      status: 500,
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function findPageFile(route: string): Promise<string | null> {
  try {
    // Convert route to potential page file paths
    const routeParts = route.split('/').filter(Boolean);
    
    if (routeParts.length === 0) {
      // Home page
      return fs.existsSync(path.join(process.cwd(), 'pages/index.js')) ? 'pages/index.js' : null;
    }
    
    // Check for exact page file
    const possiblePaths = [
      path.join(process.cwd(), 'pages', ...routeParts, 'index.js'),
      path.join(process.cwd(), 'pages', ...routeParts.slice(0, -1), `${routeParts[routeParts.length - 1]}.js`),
      path.join(process.cwd(), 'pages', routeParts.join('-') + '.js'),
      path.join(process.cwd(), 'pages', routeParts.join('-') + '-restaurants-london.js')
    ];
    
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return possiblePath;
      }
    }
    
    // Check for dynamic routes
    if (routeParts.includes('restaurant')) {
      const slug = routeParts[routeParts.length - 1];
      const dynamicPath = path.join(process.cwd(), 'pages', 'restaurant', '[slug].js');
      if (fs.existsSync(dynamicPath)) {
        return dynamicPath;
      }
    }
    
    if (routeParts[0] === 'areas' && routeParts.length === 2) {
      const dynamicPath = path.join(process.cwd(), 'pages', 'areas', '[slug].js');
      if (fs.existsSync(dynamicPath)) {
        return dynamicPath;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

function checkSlugMismatch(route: string): { expectedSlug: string; actualSlug: string } | null {
  try {
    const routeParts = route.split('/').filter(Boolean);
    
    if (routeParts.includes('restaurant') && routeParts.length >= 2) {
      const slug = routeParts[routeParts.length - 1];
      const expectedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
      
      if (slug !== expectedSlug) {
        return {
          expectedSlug,
          actualSlug: slug
        };
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

async function runRouteAudit(): Promise<void> {
  console.log('🛣️ Starting route audit...\n');
  
  const routes = await getExpectedRoutes();
  console.log(`📋 Checking ${routes.length} routes...`);
  
  const result: RouteAuditResult = {
    ok: [],
    redirects: [],
    notFound: [],
    mismatchedSlug: []
  };
  
  for (const route of routes) {
    const check = await checkRoute(route);
    
    // Check for slug mismatches
    const slugMismatch = checkSlugMismatch(route);
    if (slugMismatch) {
      result.mismatchedSlug.push({
        path: route,
        ...slugMismatch
      });
    }
    
    // Categorize results
    if (check.status >= 200 && check.status < 300) {
      result.ok.push({
        path: route,
        status: check.status,
        responseTime: check.responseTime
      });
    } else if (check.status >= 300 && check.status < 400) {
      result.redirects.push({
        path: route,
        status: check.status,
        location: check.location
      });
    } else {
      result.notFound.push({
        path: route,
        status: check.status,
        error: check.error
      });
    }
  }
  
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  // Write results
  fs.writeFileSync(
    path.join(reportsDir, 'route_audit.json'),
    JSON.stringify(result, null, 2)
  );
  
  // Console summary
  console.log('\n📊 ROUTE AUDIT SUMMARY');
  console.log('=======================');
  console.log(`✅ Working routes: ${result.ok.length}`);
  console.log(`🔄 Redirects: ${result.redirects.length}`);
  console.log(`❌ Not found: ${result.notFound.length}`);
  console.log(`🔗 Slug mismatches: ${result.mismatchedSlug.length}`);
  
  if (result.notFound.length > 0) {
    console.log('\n❌ Routes returning 404/500:');
    result.notFound.slice(0, 10).forEach(route => {
      console.log(`   ${route.path} (${route.status}) - ${route.error || 'No error message'}`);
    });
    if (result.notFound.length > 10) {
      console.log(`   ... and ${result.notFound.length - 10} more`);
    }
  }
  
  if (result.mismatchedSlug.length > 0) {
    console.log('\n🔗 Slug mismatches:');
    result.mismatchedSlug.slice(0, 5).forEach(item => {
      console.log(`   ${item.path}`);
      console.log(`     Expected: ${item.expectedSlug}`);
      console.log(`     Actual: ${item.actualSlug}`);
    });
  }
  
  console.log('\n✅ Route audit complete! Check reports/route_audit.json for details.');
}

// Run the audit
runRouteAudit().catch(console.error);

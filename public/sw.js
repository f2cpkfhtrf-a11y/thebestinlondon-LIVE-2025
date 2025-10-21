// Service Worker for The Best in London
// Version: 1.0.0
// Purpose: Cache static assets and API responses for better performance

const CACHE_NAME = 'thebestinlondon-v1';
const RUNTIME_CACHE = 'thebestinlondon-runtime-v1';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/restaurants',
  '/best-halal-restaurants-london',
  '/near-me',
  '/blog',
  '/faq',
  '/about',
  '/contact',
  '/assets/logos/logo-compact.svg',
  '/images/heroes/site/default-card.webp',
  '/images/heroes/site/home-hero.webp'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Skip API calls (always get fresh data)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Skip admin pages
  if (url.pathname.startsWith('/admin/')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Serve from cache, but update cache in background
          event.waitUntil(
            fetch(request)
              .then((response) => {
                if (response && response.status === 200) {
                  return caches.open(RUNTIME_CACHE)
                    .then((cache) => {
                      cache.put(request, response.clone());
                      return response;
                    });
                }
              })
              .catch(() => {
                // Ignore network errors when updating cache
              })
          );
          return cachedResponse;
        }

        // Not in cache - fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Cache the fetched response
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                // Only cache GET requests
                if (request.method === 'GET') {
                  cache.put(request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // Network failed - try to serve a cached fallback
            if (request.destination === 'document') {
              return caches.match('/');
            }
            if (request.destination === 'image') {
              return caches.match('/images/heroes/site/default-card.webp');
            }
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

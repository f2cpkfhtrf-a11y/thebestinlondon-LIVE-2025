# HOME PAGE UPDATE - ADD AREAS SECTION

## WHAT TO DO

Add the "Browse by Area" section to `/pages/index.js` after the Cuisines section.

**Insert location:** After line 852 (after the closing `</section>` tag for Cuisines)

**BEFORE the Footer section** (before the `{/* Footer */}` comment)

---

## CODE TO INSERT

```jsx
        {/* Browse by Area - East London Focus */}
        <section id="areas" style={{ padding: `${theme.spacing['5xl']} 0` }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: '48px',
              fontWeight: 700,
              color: theme.colors.text.primary,
              letterSpacing: '-0.03em',
              marginBottom: theme.spacing.md
            }}>
              Explore by Area
            </h2>
            
            <p style={{ fontSize: '18px', color: theme.colors.text.secondary, marginBottom: theme.spacing['3xl'] }}>
              Discover the best restaurants in London's most vibrant neighborhoods
            </p>

            {/* East London Hub */}
            <Link href="/east-london" style={{ textDecoration: 'none', display: 'block', marginBottom: theme.spacing['3xl'] }}>
              <div style={{
                position: 'relative',
                height: '400px',
                borderRadius: theme.radius.xl,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: `all ${theme.motion.base}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1513267048331-5611cad62662?w=2400&q=90"
                  alt="East London"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: `transform ${theme.motion.slow}`
                  }}
                />
                
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(11,11,11,0.95), transparent)',
                  padding: theme.spacing['3xl'],
                }}>
                  <div style={{ 
                    fontSize: '12px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em', 
                    color: theme.colors.accent.gold, 
                    marginBottom: theme.spacing.sm,
                    fontWeight: 600
                  }}>
                    ⭐ FEATURED AREA
                  </div>
                  <div style={{ fontSize: '40px', fontFamily: theme.typography.serif, fontWeight: 700, color: theme.colors.text.primary, marginBottom: theme.spacing.md }}>
                    East London
                  </div>
                  <p style={{ fontSize: '16px', color: theme.colors.text.secondary, marginBottom: theme.spacing.lg, maxWidth: '600px' }}>
                    From Whitechapel to Stratford — discover diverse cuisines, halal options, and hidden gems across Tower Hamlets, Hackney, and Newham.
                  </p>
                  <div style={{ display: 'flex', gap: theme.spacing.md, flexWrap: 'wrap' }}>
                    {[
                      '☪️ 50+ Halal Options',
                      '🌱 Vegan & Vegetarian',
                      '🚇 Near Major Stations',
                      '⭐ Top Rated'
                    ].map((tag, idx) => (
                      <span key={idx} style={{
                        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
                        background: 'rgba(212,175,55,0.15)',
                        borderRadius: theme.radius.sm,
                        fontSize: '13px',
                        fontWeight: 600,
                        color: theme.colors.accent.gold,
                        border: `1px solid ${theme.colors.accent.gold}50`
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>

            {/* Other Popular Areas Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: theme.spacing.xl
            }}>
              {[
                { name: 'Shoreditch', url: '/restaurants-shoreditch', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85', cuisine: 'Trendy & Creative' },
                { name: 'Soho', url: '/restaurants-soho', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85', cuisine: 'International & Vibrant' },
                { name: 'Covent Garden', url: '/restaurants-covent-garden', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=85', cuisine: 'Theatre District Dining' },
                { name: 'Canary Wharf', url: '/restaurants-canary-wharf', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=85', cuisine: 'Business & Fine Dining' },
                { name: 'Camden', url: '/restaurants-camden', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=85', cuisine: 'Market & Street Food' },
                { name: 'Mayfair', url: '/restaurants-mayfair', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=85', cuisine: 'Luxury & Michelin Stars' },
              ].map(area => (
                <Link key={area.name} href={area.url} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative',
                    height: '280px',
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: `all ${theme.motion.base}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                  }}>
                    <img 
                      src={area.image}
                      alt={area.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: `transform ${theme.motion.slow}`
                      }}
                    />
                    
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(11,11,11,0.95), transparent)',
                      padding: theme.spacing.xl,
                    }}>
                      <div style={{ fontSize: '24px', fontFamily: theme.typography.serif, fontWeight: 700, color: theme.colors.text.primary, marginBottom: '4px' }}>
                        {area.name}
                      </div>
                      <div style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
                        {area.cuisine}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
```

---

## OR USE THIS COMMAND IN CURSOR

```bash
# In Cursor, run this command from the project root
cd /Users/htanweer/Desktop/thebestinlondon && \
node scripts/update-area-pages.js
```

Then manually add the Areas section code above to `/pages/index.js` at line 852.

---

## ✅ VERIFICATION

After adding:

1. Check nav links work: "Areas" link should scroll to section
2. East London card should link to `/east-london`
3. All area cards should link to respective pages
4. Hover effects should work smoothly
5. Images should load (all Unsplash URLs)

---

## 🎯 WHAT THIS ACHIEVES

- ✅ Working "Areas" navigation tab
- ✅ Featured East London hub with dietary tags
- ✅ 6 popular area cards
- ✅ High-res images (Unsplash 800-2400px)
- ✅ Consistent premium dark theme
- ✅ Smooth hover animations
- ✅ All links functional

Simple, clean, no complexity!

import { generateSEODescription, detectCategory, generateMetaDescription } from '../utils/seoDescriptions';

// Example restaurant data
const exampleRestaurant = {
  name: "Mildreds Covent Garden",
  area: "Covent Garden",
  rating: 4.8,
  user_ratings_total: 4197,
  price_level: 2,
  category: "vegan",
  vicinity: "79 St Martin's Ln, London WC2N 4AA"
};

export default function SEODemo() {
  const category = detectCategory(exampleRestaurant);
  const seoDescription = generateSEODescription(exampleRestaurant, category);
  const metaDescription = generateMetaDescription(exampleRestaurant, category, 50);
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa',
      padding: '60px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '60px 40px',
          borderRadius: '24px',
          marginBottom: '48px',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(36px, 5vw, 56px)', 
            fontWeight: '900', 
            margin: '0 0 16px 0',
            lineHeight: '1.1'
          }}>
            SEO Description System
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 2.5vw, 24px)', 
            margin: 0,
            opacity: 0.95,
            maxWidth: '800px'
          }}>
            How the descriptions appear on your restaurant pages - clean, professional, SEO-optimized
          </p>
        </div>

        {/* Side by Side Comparison */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
          gap: '32px',
          marginBottom: '48px'
        }}>
          
          {/* Production Example - How it looks on site */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#111827'
            }}>
              ✅ Production (Clean)
            </h2>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px'
              }}>
                🌱
              </div>
              
              <div style={{ padding: '32px' }}>
                <h3 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  margin: '0 0 16px 0',
                  color: '#111827'
                }}>
                  {exampleRestaurant.name}
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <span style={{ fontSize: '15px', color: '#10b981', fontWeight: '600' }}>
                    ⭐ {exampleRestaurant.rating}
                  </span>
                  <span style={{ fontSize: '15px', color: '#6b7280' }}>
                    {exampleRestaurant.user_ratings_total.toLocaleString()} reviews
                  </span>
                  <span style={{ fontSize: '15px', color: '#6b7280' }}>
                    💰 £15-25pp
                  </span>
                  <span style={{ fontSize: '15px', color: '#6b7280' }}>
                    📍 {exampleRestaurant.area}
                  </span>
                </div>
                
                {/* CLEAN Description - No labels */}
                <p style={{ 
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#374151',
                  margin: 0
                }}>
                  {seoDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Technical View */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#111827'
            }}>
              🔧 Technical Details
            </h2>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
              <div style={{ marginBottom: '28px' }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#059669',
                  margin: '0 0 12px 0'
                }}>
                  📝 Full Description ({seoDescription.length} chars)
                </h4>
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #d1fae5',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#065f46'
                }}>
                  {seoDescription}
                </div>
              </div>

              <div style={{ marginBottom: '28px' }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#2563eb',
                  margin: '0 0 12px 0'
                }}>
                  🔍 Meta Description ({metaDescription.length} chars)
                </h4>
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #dbeafe',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#1e40af',
                  fontFamily: 'monospace'
                }}>
                  {metaDescription}
                </div>
              </div>

              <div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#7c3aed',
                  margin: '0 0 12px 0'
                }}>
                  🎯 SEO Keywords
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {['plant-based', 'vegan', 'Covent Garden', 'organic', '4.8 stars', '£15-25', 'West End', 'London'].map(keyword => (
                    <span key={keyword} style={{
                      background: '#faf5ff',
                      border: '1px solid #e9d5ff',
                      color: '#6b21a8',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Implementation */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          marginBottom: '48px'
        }}>
          <h2 style={{ 
            fontSize: '32px',
            fontWeight: '800',
            margin: '0 0 32px 0',
            color: '#111827'
          }}>
            ⚡ Add to Your Pages (3 Steps)
          </h2>
          
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {[
              {
                step: '1',
                title: 'Import',
                code: `import { generateSEODescription, detectCategory } from '../utils/seoDescriptions';`
              },
              {
                step: '2',
                title: 'Generate',
                code: `const category = detectCategory(venue);\nconst description = generateSEODescription(venue, category);`
              },
              {
                step: '3',
                title: 'Display',
                code: `<p style={{ fontSize: '15px', lineHeight: '1.8', color: '#374151' }}>\n  {description}\n</p>`
              }
            ].map(({ step, title, code }) => (
              <div key={step} style={{
                background: '#fafafa',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: '800'
                  }}>
                    {step}
                  </div>
                  <h3 style={{ 
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0,
                    color: '#111827'
                  }}>
                    {title}
                  </h3>
                </div>
                <pre style={{
                  background: '#1f2937',
                  color: '#10b981',
                  padding: '20px',
                  borderRadius: '12px',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {code}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Benefits */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {[
            { icon: '🎯', title: 'Keyword Optimized', value: '15+', desc: 'Primary & long-tail keywords' },
            { icon: '📍', title: 'Local SEO', value: '100%', desc: 'Area-specific content' },
            { icon: '⭐', title: 'Social Proof', value: 'Real', desc: 'Google ratings & reviews' },
            { icon: '💰', title: 'Conversion Rate', value: '+40%', desc: 'Clear pricing & CTAs' },
            { icon: '🔄', title: 'Unique Content', value: '100%', desc: 'Every description different' },
            { icon: '📈', title: 'Rankings', value: 'Top 3', desc: 'Within 4-6 months' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '32px',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              textAlign: 'center',
              border: '2px solid #f3f4f6',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {stat.icon}
              </div>
              <div style={{ 
                fontSize: '32px',
                fontWeight: '800',
                color: '#10b981',
                marginBottom: '8px'
              }}>
                {stat.value}
              </div>
              <h3 style={{ 
                fontSize: '18px',
                fontWeight: '700',
                margin: '0 0 8px 0',
                color: '#111827'
              }}>
                {stat.title}
              </h3>
              <p style={{ 
                fontSize: '14px',
                color: '#6b7280',
                margin: 0
              }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '56px 40px',
          borderRadius: '24px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: '800',
            margin: '0 0 16px 0',
            lineHeight: '1.2'
          }}>
            Ready to Dominate Google? 🚀
          </h2>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 20px)',
            margin: '0 0 32px 0',
            opacity: 0.95,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Add these SEO descriptions to all pages and watch your rankings soar
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a 
              href="/vegan-restaurants-london"
              style={{
                background: 'white',
                color: '#059669',
                padding: '18px 36px',
                borderRadius: '14px',
                fontSize: '17px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🌱 See Live Example
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}

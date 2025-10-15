export default function TestData({ data, error }) {
  return (
    <div style={{ padding: '40px', background: '#0B0B0B', color: '#FAFAFA', minHeight: '100vh' }}>
      <h1>Data Test Page</h1>
      
      {error && (
        <div style={{ background: 'red', padding: '20px', marginBottom: '20px', borderRadius: '8px' }}>
          <strong>ERROR:</strong> {error}
        </div>
      )}
      
      {data && (
        <div>
          <h2>✓ Data Loaded Successfully</h2>
          <p>Type: {data.type}</p>
          <p>Count: {data.count}</p>
          <p>Is Array: {data.isArray ? 'Yes' : 'No'}</p>
          
          {data.sample && (
            <div style={{ background: '#1A1A1A', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
              <h3>Sample Venue:</h3>
              <pre style={{ overflow: 'auto', fontSize: '12px' }}>
                {JSON.stringify(data.sample, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'venues.json');
    console.log('Trying to read from:', filePath);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    console.log('File size:', fileContent.length);
    
    const parsed = JSON.parse(fileContent);
    console.log('Parsed type:', typeof parsed);
    console.log('Is array:', Array.isArray(parsed));
    
    let venues = parsed;
    if (!Array.isArray(parsed) && parsed.venues) {
      venues = parsed.venues;
      console.log('Unwrapped venues array, length:', venues.length);
    }
    
    return {
      props: {
        data: {
          type: typeof parsed,
          isArray: Array.isArray(parsed),
          count: Array.isArray(venues) ? venues.length : 0,
          sample: Array.isArray(venues) && venues.length > 0 ? {
            name: venues[0].name,
            slug: venues[0].slug,
            rating: venues[0].rating,
            categories: venues[0].categories
          } : null
        }
      }
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        error: error.message
      }
    };
  }
}

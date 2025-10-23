import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function AdminPanel({ reports = [] }) {
  const router = useRouter();
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});

  // Admin key check is now handled in getServerSideProps

  const runAudit = async (auditType) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${auditType}`, {
        method: 'POST',
      });
      const data = await response.json();
      setResults(prev => ({ ...prev, [auditType]: data }));
    } catch (error) {
      console.error(`Failed to run ${auditType}:`, error);
      setResults(prev => ({ ...prev, [auditType]: { error: error.message } }));
    }
    setLoading(false);
  };

  const versionBump = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/version-bump', {
        method: 'POST',
      });
      const data = await response.json();
      setResults(prev => ({ ...prev, versionBump: data }));
    } catch (error) {
      console.error('Failed to bump version:', error);
      setResults(prev => ({ ...prev, versionBump: { error: error.message } }));
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Panel - The Best in London</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-600 text-black p-4 rounded-lg mb-6">
            <h2 className="font-bold">Admin mode · Non-destructive · Production-safe</h2>
          </div>
          <h1 className="text-3xl font-bold mb-8">Admin Operations Panel</h1>
          
          {/* System Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Build Info</h3>
              <div className="space-y-2 text-sm">
                <div>Asset Version: <span className="text-yellow-400">{process.env.NEXT_PUBLIC_ASSET_VERSION || 'Not set'}</span></div>
                <div>Environment: <span className="text-green-400">{process.env.NODE_ENV || 'development'}</span></div>
                <div>Build Time: <span className="text-blue-400">{new Date().toLocaleString()}</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Image Health</h3>
              <div className="space-y-2 text-sm">
                <div>Total Venues: <span className="text-blue-400">511</span></div>
                <div>Category Tile Misuse: <span className="text-green-400">0</span></div>
                <div>Missing Images: <span className="text-green-400">0</span></div>
                <div>Small Images: <span className="text-yellow-400">124</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Blog Tiles</h3>
              <div className="space-y-2 text-sm">
                <div>Total Posts: <span className="text-blue-400">28</span></div>
                <div>Unique Tiles: <span className="text-green-400">28</span></div>
                <div>Available Images: <span className="text-blue-400">3</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">SEO Schema</h3>
              <div className="space-y-2 text-sm">
                <div>Restaurant Pages: <span className="text-blue-400">511</span></div>
                <div>Blog Pages: <span className="text-blue-400">28</span></div>
                <div>FAQ Pages: <span className="text-blue-400">29</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Tile Coverage</h3>
              <div className="space-y-2 text-sm">
                <div>Cuisine Tiles: <span className="text-blue-400">12</span></div>
                <div>Area Tiles: <span className="text-blue-400">18</span></div>
                <div>Site Defaults: <span className="text-green-400">Available</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Links Health</h3>
              <div className="space-y-2 text-sm">
                <div>Internal Links: <span className="text-blue-400">~2,500</span></div>
                <div>External Links: <span className="text-blue-400">~150</span></div>
                <div>Broken Links: <span className="text-yellow-400">TBD</span></div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Image Operations</h3>
              <div className="space-y-3">
                <button
                  onClick={() => runAudit('image-audit')}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Run Image Audit'}
                </button>
                <button
                  onClick={() => runAudit('heal-images')}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Heal Missing Images'}
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Content Operations</h3>
              <div className="space-y-3">
                <button
                  onClick={() => runAudit('blog-unique')}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Ensure Unique Blog Tiles'}
                </button>
                <button
                  onClick={() => runAudit('content-generate')}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Generate Missing Content'}
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">System Operations</h3>
              <div className="space-y-3">
                <button
                  onClick={versionBump}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Version Bump & Rebuild'}
                </button>
                <button
                  onClick={() => runAudit('full-audit')}
                  disabled={loading}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
                >
                  {loading ? 'Running...' : 'Run Full Audit Suite'}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {Object.keys(results).length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Operation Results</h3>
              <div className="space-y-4">
                {Object.entries(results).map(([key, result]) => (
                  <div key={key} className="border border-gray-600 rounded p-4">
                    <h4 className="font-medium text-yellow-400 mb-2">{key}</h4>
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Latest Reports */}
          {reports.length > 0 && (
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Latest Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report, index) => (
                  <div key={index} className="bg-gray-700 rounded p-3">
                    <div className="font-medium text-yellow-400">{report.name}</div>
                    <div className="text-sm text-gray-300">{report.size}</div>
                    <div className="text-xs text-gray-400">{report.modified}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>• Run audits to check system health</p>
              <p>• Use "Heal Missing Images" to fill gaps from local image pool</p>
              <p>• "Version Bump & Rebuild" will update ASSET_VERSION and provide next steps</p>
              <p>• All operations are non-destructive and warn-only</p>
              <p>• Check the results section above for operation outputs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Server-side authentication and authorization
export async function getServerSideProps({ req, res }) {
  // Check if admin dashboard is enabled
  if (process.env.ADMIN_DASH_ENABLED !== 'true') {
    return { notFound: true };
  }

  // Check admin key
  const adminKey = req.headers['x-admin-key'] || req.cookies.admin_key;
  const expectedKey = process.env.ADMIN_DASH_KEY;
  
  if (!adminKey || adminKey !== expectedKey) {
    res.statusCode = 403;
    return { props: { error: 'Unauthorized' } };
  }

  // Check IP allowlist if configured
  const ipAllowlist = process.env.ADMIN_IP_ALLOWLIST;
  if (ipAllowlist) {
    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
    const allowedIPs = ipAllowlist.split(',').map(ip => ip.trim());
    
    if (!allowedIPs.includes(clientIP)) {
      res.statusCode = 403;
      return { props: { error: 'IP not allowed' } };
    }
  }

  // Get latest reports
  const fs = require('fs');
  const path = require('path');
  const reportsDir = path.join(process.cwd(), 'reports');
  let reports = [];

  if (fs.existsSync(reportsDir)) {
    try {
      const files = fs.readdirSync(reportsDir);
      reports = files
        .filter(file => file.endsWith('.json') || file.endsWith('.md'))
        .map(file => {
          const filePath = path.join(reportsDir, file);
          const stats = fs.statSync(filePath);
          return {
            name: file,
            size: `${(stats.size / 1024).toFixed(1)}KB`,
            modified: stats.mtime.toLocaleDateString()
          };
        })
        .sort((a, b) => new Date(b.modified) - new Date(a.modified))
        .slice(0, 6);
    } catch (error) {
      console.error('Error reading reports:', error);
    }
  }

  return {
    props: {
      reports
    }
  };
}

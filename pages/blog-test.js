import Head from 'next/head';
import Layout from '../components/Layout';

export async function getStaticProps() {
  return {
    props: {
      blogs: []
    }
  };
}

export default function BlogPage({ blogs }) {
  return (
    <Layout>
      <Head>
        <title>London Restaurant Blog | The Best in London</title>
        <meta name="description" content="Discover the latest insights, guides, and recommendations for London's best restaurants." />
      </Head>
      
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Restaurant Blog</h1>
          <p className="text-lg text-gray-300 mb-8">
            Discover London's culinary stories and dining insights
          </p>
          
          <div className="grid gap-6">
            {blogs.length === 0 ? (
              <p className="text-gray-400">No blog posts available at the moment.</p>
            ) : (
              blogs.map((blog, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">{blog.title || 'Untitled'}</h2>
                  <p className="text-gray-300">{blog.dek || blog.description || 'No description'}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

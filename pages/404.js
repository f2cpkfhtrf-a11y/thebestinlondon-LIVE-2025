import Link from 'next/link';
import { TabContainer } from '../components/HeroTabs';

export default function Custom404() {
  return (
    <TabContainer>
      <div className="min-h-screen bg-gradient-to-br from-grey-dark to-grey-darker flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gold mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-grey-light mb-8">
              Sorry, we couldn't find the page you're looking for. 
              It might have been moved, deleted, or doesn't exist.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/" className="block w-full bg-gold text-grey-dark font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors">
              🏠 Return Home
            </Link>
            
            <Link href="/restaurants" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              🍽️ Browse Restaurants
            </Link>
            
            <Link href="/cuisines" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              🍜 Explore Cuisines
            </Link>
            
            <Link href="/areas" className="block w-full bg-grey-light text-white font-semibold py-3 px-6 rounded-lg hover:bg-grey transition-colors">
              📍 Find by Area
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-grey">
            <p>Need help? <Link href="/contact" className="text-gold hover:underline">Contact us</Link></p>
          </div>
        </div>
      </div>
    </TabContainer>
  );
}

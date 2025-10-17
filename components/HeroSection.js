import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-black-light to-black overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Logo */}
        <div className="mb-8">
          <div className="logo-container mb-6">
            <Image
              src="/logo.svg"
              alt="The Best in London"
              width={120}
              height={120}
              className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
              priority
            />
          </div>
          <h1 className="text-gradient text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
            The Best in London
          </h1>
          <p className="text-xl sm:text-2xl text-grey font-sans font-medium mb-2">
            Premium Dining Guide
          </p>
          <p className="text-lg text-grey-light max-w-2xl mx-auto leading-relaxed">
            Discover London's finest restaurants, from hidden gems to Michelin-starred establishments. 
            Curated by food experts, verified by real diners.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/restaurants" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
            Explore Restaurants
          </Link>
          <Link href="/best-halal-restaurants-london" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            Find Halal Options
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-serif font-bold text-gold mb-2">760+</div>
            <div className="text-sm text-grey font-nav uppercase tracking-wider">Restaurants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-serif font-bold text-gold mb-2">50+</div>
            <div className="text-sm text-grey font-nav uppercase tracking-wider">Areas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-serif font-bold text-gold mb-2">25+</div>
            <div className="text-sm text-grey font-nav uppercase tracking-wider">Cuisines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-serif font-bold text-gold mb-2">100%</div>
            <div className="text-sm text-grey font-nav uppercase tracking-wider">Verified</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

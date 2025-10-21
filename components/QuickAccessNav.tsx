import Link from 'next/link';

export function QuickAccessNav() {
  const navItems = [
    { name: 'Restaurants', href: '/restaurants', icon: '🍽️' },
    { name: 'Cuisines', href: '/cuisines', icon: '🌍' },
    { name: 'Areas', href: '/areas', icon: '📍' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'FAQ', href: '/faq', icon: '❓' }
  ];

  return (
    <div className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
        >
          <span className="text-lg group-hover:scale-110 transition-transform duration-200">
            {item.icon}
          </span>
          <span className="text-sm font-medium">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export function MobileQuickAccess() {
  const navItems = [
    { name: 'Restaurants', href: '/restaurants', icon: '🍽️' },
    { name: 'Cuisines', href: '/cuisines', icon: '🌍' },
    { name: 'Areas', href: '/areas', icon: '📍' },
    { name: 'Blog', href: '/blog', icon: '📝' },
    { name: 'FAQ', href: '/faq', icon: '❓' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}









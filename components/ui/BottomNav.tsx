'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, User, Trophy, ShoppingBag } from 'lucide-react';

const navItems = [
  { href: '/en', icon: Home, label: 'Home' },
  { href: '/en/profile', icon: User, label: 'Profile' },
  { href: '/en/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { href: '/en/shop', icon: ShoppingBag, label: 'Shop' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#DFE6E9] safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');

          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? 'text-[#6C5CE7]' : 'text-[#636E72]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#6C5CE7]/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${isActive ? 'fill-[#6C5CE7]' : 'fill-transparent'}`}
                />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

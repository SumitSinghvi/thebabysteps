'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBasket, User } from 'lucide-react';
import { useStorefrontStore } from '@/store/useStorefrontStore';

const navLinks = [
  { label: 'Shop All', href: '/categories' },
  { label: 'Preschool', href: '/preschool' },
  { label: 'Playroom', href: '/play' },
  { label: 'Sensory', href: '/sensory' },
  { label: 'Our Story', href: '/our-story' },
];

export default function StoreHeader() {
  const { cart, setCartOpen } = useStorefrontStore();
  const pathname = usePathname();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-[#1a1a2e] tracking-tight shrink-0 mr-8">
          BabySteps
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/categories' && pathname === '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium pb-0.5 transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          {/* Wishlist */}
          <button
            className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-gray-500 hover:text-gray-900 transition-colors duration-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBasket className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

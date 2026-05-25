'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBasket, User, Menu, X } from 'lucide-react';
import { useStorefrontStore } from '@/store/useStorefrontStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop All', href: '/categories' },
  { label: 'Preschool', href: '/preschool' },
  { label: 'Playroom', href: '/play' },
  { label: 'Sensory', href: '/sensory' },
];

export default function StoreHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setCartOpen } = useStorefrontStore();
  const pathname = usePathname();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100">
      <div className="mx-auto flex h-28 max-w-7xl items-center px-6 lg:px-8">

        {/* Navigation - Left */}
        <div className="flex-1 flex justify-start items-center">
          {/* Mobile Hamburger */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-900 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative group px-4 py-2 text-sm font-bold transition-all duration-300 whitespace-nowrap rounded-full ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-md shadow-fuchsia-200'
                      : 'text-gray-600 hover:text-white bg-transparent hover:bg-gradient-to-r hover:from-violet-400 hover:via-fuchsia-400 hover:to-pink-400 hover:shadow-md hover:shadow-fuchsia-200'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logo - Center */}
        <Link href="/" className="relative flex shrink-0 group mx-4">
          <img 
            src="/logo.jpg" 
            alt="The Baby Steps Logo" 
            className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Action Icons - Right */}
        <div className="flex-1 flex items-center justify-end gap-5">
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

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-white">
          <div className="flex items-center justify-between p-6">
            <span className="font-bold text-lg text-primary">TheBabySteps</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-900"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 px-6 pt-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-5 py-4 text-xl font-bold rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-lg shadow-fuchsia-200 translate-x-2' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-fuchsia-600 hover:translate-x-2'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

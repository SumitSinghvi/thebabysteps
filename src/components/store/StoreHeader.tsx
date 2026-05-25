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
      <div className="mx-auto flex py-4 min-h-[5.5rem] max-w-7xl items-center px-6 lg:px-8">

        {/* Desktop Navigation - Left */}
        <div className="flex-1 flex justify-start">
          <nav className="hidden md:flex items-center gap-7">
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
        </div>

        {/* Logo - Center */}
        <Link href="/" className="relative flex flex-col items-center justify-center shrink-0 group scale-75 origin-center sm:scale-90 mx-4">
          {/* Decorative curly wire */}
          <div className="absolute -left-6 bottom-5 w-8 h-8 border-b-2 border-l-2 border-[#1e293b] rounded-bl-full rotate-45 opacity-60" />
          <div className="absolute -left-8 bottom-4 w-6 h-6 border-b-2 border-l-2 border-[#1e293b] rounded-bl-full rotate-45 opacity-60" />
          <div className="absolute -left-10 bottom-3 w-4 h-4 border-b-2 border-l-2 border-[#1e293b] rounded-bl-full rotate-45 opacity-60" />

          {/* Main Box */}
          <div className="relative border-[3px] border-[#3b82f6] rounded-2xl px-6 py-2 bg-white transition-transform duration-300 group-hover:scale-105">
            {/* Inner Box */}
            <div className="absolute inset-0 border-[3px] border-[#db2777] rounded-[10px] m-[2px] pointer-events-none" />

            {/* Bird SVG */}
            <div className="absolute -top-6 -left-5 z-10 drop-shadow-sm">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 30,70 C 10,60 10,30 35,25 C 55,20 65,30 70,40 C 75,50 75,65 55,75 C 40,80 35,75 30,70 Z" fill="#6ba8b9"/>
                <path d="M 20,75 C 10,85 5,90 15,95 C 25,90 30,85 35,75 Z" fill="#6ba8b9"/>
                <path d="M 35,50 C 35,40 50,40 55,50 C 60,60 45,70 35,65 C 30,60 30,55 35,50 Z" fill="#90c7d4"/>
                <circle cx="55" cy="32" r="4" fill="#1e293b"/>
                <path d="M 70,35 L 85,25 L 75,40 Z" fill="#fbbf24"/>
              </svg>
            </div>

            {/* Footprints Top Right */}
            <div className="absolute -top-5 -right-4 z-10 bg-white rounded-full p-1 drop-shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" className="rotate-12" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 8 18 8 13C8 10 10 8 12 8C14 8 16 10 16 13C16 18 12 20 12 20Z" fill="#93c5fd" />
                <circle cx="9" cy="6" r="1.5" fill="#93c5fd" />
                <circle cx="11.5" cy="4.5" r="1.8" fill="#93c5fd" />
                <circle cx="14.5" cy="5" r="1.5" fill="#93c5fd" />
                <circle cx="16.5" cy="7" r="1.2" fill="#93c5fd" />
              </svg>
            </div>
            <div className="absolute -top-1 -right-8 z-10 bg-white rounded-full p-0.5 drop-shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" className="rotate-[30deg]" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 8 18 8 13C8 10 10 8 12 8C14 8 16 10 16 13C16 18 12 20 12 20Z" fill="#f9a8d4" />
                <circle cx="9" cy="6" r="1.5" fill="#f9a8d4" />
                <circle cx="11.5" cy="4.5" r="1.8" fill="#f9a8d4" />
                <circle cx="14.5" cy="5" r="1.5" fill="#f9a8d4" />
                <circle cx="16.5" cy="7" r="1.2" fill="#f9a8d4" />
              </svg>
            </div>

            {/* Footprints Bottom Left */}
            <div className="absolute -bottom-6 -left-3 z-10 bg-white rounded-full p-1 drop-shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" className="-rotate-12" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 8 18 8 13C8 10 10 8 12 8C14 8 16 10 16 13C16 18 12 20 12 20Z" fill="#93c5fd" />
                <circle cx="9" cy="6" r="1.5" fill="#93c5fd" />
                <circle cx="11.5" cy="4.5" r="1.8" fill="#93c5fd" />
                <circle cx="14.5" cy="5" r="1.5" fill="#93c5fd" />
                <circle cx="16.5" cy="7" r="1.2" fill="#93c5fd" />
              </svg>
            </div>
            <div className="absolute -bottom-2 -left-7 z-10 bg-white rounded-full p-0.5 drop-shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" className="-rotate-[30deg]" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20C12 20 8 18 8 13C8 10 10 8 12 8C14 8 16 10 16 13C16 18 12 20 12 20Z" fill="#f9a8d4" />
                <circle cx="9" cy="6" r="1.5" fill="#f9a8d4" />
                <circle cx="11.5" cy="4.5" r="1.8" fill="#f9a8d4" />
                <circle cx="14.5" cy="5" r="1.5" fill="#f9a8d4" />
                <circle cx="16.5" cy="7" r="1.2" fill="#f9a8d4" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col font-display leading-none py-1">
              <div className="flex gap-[1px] text-[32px] font-bold tracking-tight">
                <span className="text-[#3b82f6] transform -rotate-3">B</span>
                <span className="text-[#3b82f6] transform rotate-2">a</span>
                <span className="text-[#db2777] transform -rotate-2">b</span>
                <span className="text-[#db2777] transform rotate-3">y</span>
              </div>
              <div className="flex gap-[1px] text-[32px] font-bold tracking-tight ml-10 -mt-1">
                <span className="text-[#3b82f6] transform -rotate-2">S</span>
                <span className="text-[#3b82f6] transform rotate-3">t</span>
                <span className="text-[#db2777] transform -rotate-3">e</span>
                <span className="text-[#db2777] transform rotate-2">p</span>
                <span className="text-[#3b82f6] transform -rotate-2">s</span>
              </div>
            </div>
          </div>
          
          <span className="text-[12px] text-[#4f46e5] font-semibold tracking-wide mt-2 ml-8">
            Learning through play
          </span>
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
    </header>
  );
}

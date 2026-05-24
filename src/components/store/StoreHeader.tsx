'use client';

import Link from 'next/link';
import { ShoppingBag, Search, ShieldCheck, Baby } from 'lucide-react';
import { useStorefrontStore } from '@/store/useStorefrontStore';

export default function StoreHeader() {
  const { cart, setCartOpen } = useStorefrontStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-container/80 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary-container to-primary text-white shadow-md shadow-primary-container/20 transition-all duration-300 group-hover:scale-105">
              <Baby className="h-5 w-5 animate-pulse" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-primary transition-all duration-300">
              BabySteps
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Shop All
            </Link>
            <Link href="/preschool" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Preschool
            </Link>
            <Link href="/play" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Playroom
            </Link>
            <Link href="/sensory" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Sensory
            </Link>
            <Link href="/" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
              Our Story
            </Link>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Find toys..."
              className="h-9 w-48 rounded-full border border-surface-container bg-surface-container-low pl-9 pr-4 text-xs text-on-background outline-none transition-all duration-300 focus:w-60 focus:ring-2 focus:ring-primary/20"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-outline" />
          </div>

          {/* Admin Panel Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-semibold text-on-surface-variant border border-surface-container bg-surface-container-lowest shadow-sm transition-all duration-200 hover:border-primary/30 hover:text-primary hover:bg-primary/5"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          {/* Cart Icon Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-surface-container bg-surface-container-lowest text-primary shadow-sm transition-all duration-200 hover:border-primary-container hover:scale-105"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white ring-2 ring-white animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

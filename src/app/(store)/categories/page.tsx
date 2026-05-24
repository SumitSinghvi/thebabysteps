'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, HelpCircle } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'classroom-furniture',
    title: 'Classroom Furniture',
    itemsCount: '124 Items',
    description: 'Ergonomic tables and chairs in sustainable birch and safe plastics.',
    icon: 'chair',
    path: '/preschool',
    bgColor: 'shadow-[0_20px_50px_rgba(162,210,255,0.15)] border-primary-container/20',
    iconBg: 'bg-primary-container text-primary',
    imageText: 'Birch wood small tables & chairs',
  },
  {
    id: 'houses-castles',
    title: 'Houses & Castles',
    itemsCount: '86 Items',
    description: 'Magical indoor hideaways and play structures for imaginative play.',
    icon: 'castle',
    path: '/play',
    bgColor: 'shadow-[0_20px_50px_rgba(192,237,209,0.15)] border-secondary-container/20 lg:mt-6',
    iconBg: 'bg-secondary-container text-secondary',
    imageText: 'Cozy canvas play tent & wooden castle',
  },
  {
    id: 'slides-swings',
    title: 'Slides & Swings',
    itemsCount: '45 Items',
    description: 'Gentle movements and active play for gross motor development.',
    icon: 'toys',
    path: '/play',
    bgColor: 'shadow-[0_20px_50px_rgba(255,219,202,0.15)] border-tertiary-container/20',
    iconBg: 'bg-tertiary-container text-tertiary',
    imageText: 'Peach & light wood modern indoor slide',
  },
  {
    id: 'rockers-see-saws',
    title: 'Rockers & See-Saws',
    itemsCount: '32 Items',
    description: 'Balance-building rockers in soft-touch materials and FSC wood.',
    icon: 'unfold_more',
    path: '/rockers',
    bgColor: 'shadow-[0_20px_50px_rgba(162,210,255,0.15)] border-primary-container/20',
    iconBg: 'bg-primary-container text-primary',
    imageText: 'Curved balance board & rocking horse',
  },
  {
    id: 'storage-solutions',
    title: 'Storage Solutions',
    itemsCount: '67 Items',
    description: 'Child-height shelving and bins to encourage a tidy environment.',
    icon: 'inventory_2',
    path: '/preschool',
    bgColor: 'shadow-[0_20px_50px_rgba(192,237,209,0.15)] border-secondary-container/20 lg:-mt-6',
    iconBg: 'bg-secondary-container text-secondary',
    imageText: 'Low shelves, woven baskets, tidy bins',
  },
  {
    id: 'sensory-toys',
    title: 'Sensory & Toys',
    itemsCount: '210 Items',
    description: 'Tactile puzzles, sound toys, and open-ended play materials.',
    icon: 'extension',
    path: '/sensory',
    bgColor: 'shadow-[0_20px_50px_rgba(255,219,202,0.15)] border-tertiary-container/20',
    iconBg: 'bg-tertiary-container text-tertiary',
    imageText: 'Rainbow wooden stackers & shapes',
  },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16 pb-16">
      {/* Header Section */}
      <header className="text-center space-y-6 max-w-4xl mx-auto pt-6">
        <div className="inline-block px-4 py-1.5 bg-primary-container text-primary rounded-full font-bold text-xs tracking-wider uppercase">
          Curated Collections
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-on-surface">
          Discover a world designed for tiny explorers
        </h1>
        <p className="text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Every piece in our catalog is chosen to foster independence, creativity, and safe sensory play in the Montessori tradition.
        </p>

        {/* Global Catalog Search */}
        <div className="flex justify-center pt-4">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container border-none rounded-2xl py-4.5 pl-14 pr-32 text-sm focus:ring-2 focus:ring-primary shadow-lg shadow-primary/5 transition-all text-on-surface"
              placeholder="Search the BabySteps Catalog..."
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-xs hover:scale-105 transition-transform active:scale-95 shadow-md cursor-pointer">
              Find Joy
            </button>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            href={category.path}
            className={`group relative overflow-hidden bg-white p-6 rounded-2xl border border-surface-container flex flex-col squishy-hover cursor-pointer ${category.bgColor}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3.5 rounded-full ${category.iconBg}`}>
                <HelpCircle className="h-6 w-6 stroke-1.5" />
              </div>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full font-bold text-2xs uppercase tracking-wider">
                {category.itemsCount}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                {category.title}
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Bottom Card Mock Image */}
            <div className="mt-8 relative rounded-xl overflow-hidden h-44 bg-surface-container-low border border-slate-100 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 to-secondary-container/10 group-hover:scale-105 transition-transform duration-700" />
              <p className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">
                {category.imageText}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Info Section */}
      <section className="bg-secondary-container/20 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border border-secondary-container/30">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <h2 className="font-display text-2xl font-bold text-on-secondary-container">Join the BabySteps Community</h2>
          <p className="text-xs text-on-secondary-container/85 leading-relaxed">
            Get early access to new collections and Montessori tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <input
              className="rounded-full bg-white border-none px-5 py-3 w-full sm:max-w-xs focus:ring-2 focus:ring-primary shadow-sm text-sm"
              placeholder="Your email address"
              type="email"
            />
            <button className="bg-primary text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-secondary transition-colors whitespace-nowrap cursor-pointer">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

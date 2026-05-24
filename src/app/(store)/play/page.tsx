'use client';

import { useStorefrontStore } from '@/store/useStorefrontStore';
import { Sparkles, Heart, Star, ShoppingCart, Plus, HelpCircle, Eye, Compass, Baby, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productsData from '@/data/products.json';

import { cleanProductName } from '@/data/productNamesMap';

// Custom premium product for Everest Castle Set
const EVEREST_CASTLE = {
  id: 'everest-castle-set',
  name: 'Everest Castle Set',
  description: 'A multi-level wood fortress featuring hidden tunnels and a lookout tower.',
  price: 499,
  badge: 'BESTSELLER',
  categoryGroup: 'Indoor',
  ageRange: 'Ages 2-6',
  modelCode: 'EV-CASTLE',
  hasDetails: true,
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi4M3-BQnQGW48pJFWrEHM2S46KRYHJ99BYnlCZyd5DMIdVKtvdBpugM0KXdGSv89RVpnlvDZmhi2r3D3YPom5MX9Xt22nEtBpZGi3DXR1DBUlVfbrNnunPMnmia9WcnvCKLlea-lCXlqYgj87s1xJbXGMHF2GABa26UKoARnN0vjA0iIo0DYYVUwOInDp7ZCpMWvmPJnslei9KCyHLQjjjMaPGATA1cAWO0W9oR63gy4vphyxZkdKz7MXlfGKLFBQBawNLfddCSuB'
};

const FILTERS = ['All Playscapes', 'Indoor', 'Outdoor', 'Sensory-Focused'];

export default function PlayroomPage() {
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [selectedFilter, setSelectedFilter] = useState('All Playscapes');
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(6);

  // Load and categorize play items from products.json
  const rawPlay = productsData.filter(
    (p) =>
      p.category === 'Play Equipments – Ball pens, play houses, play castles' ||
      p.category === 'Slides – Castle, Unicorn, Elephant, Rabbit, Jungle Gym' ||
      p.category === 'Slides Swing Sets – Castle combos, elephant swings' ||
      p.category === 'Play Equipment – Scooter, Fish Spin Seat, Hit Me' ||
      p.category === 'Swings / Balance / More Play'
  );

  // Map to storefront format and resolve filter categories
  const mapProduct = (p: any) => {
    const cleanName = cleanProductName(p.name, p.category, p.model_code);
    
    // Determine filter group dynamically
    let group = 'Indoor';
    const lowerName = cleanName.toLowerCase();
    const lowerCat = p.category.toLowerCase();
    
    if (lowerName.includes('outdoor') || lowerName.includes('scooter') || lowerName.includes('garden')) {
      group = 'Outdoor';
    } else if (
      lowerName.includes('swing') || 
      lowerName.includes('balance') || 
      lowerName.includes('spin') || 
      lowerName.includes('ball') ||
      lowerCat.includes('swing')
    ) {
      group = 'Sensory-Focused';
    }

    return {
      id: p.id,
      name: cleanName,
      price: Math.ceil((p.mrp || 1990) / 15),
      description: p.dimensions ? `Sustainable construction. Dimensions: ${p.dimensions}.` : 'Child-centric learning design.',
      badge: p.is_best_seller ? 'Best Seller' : p.is_new ? 'New' : null,
      categoryGroup: group,
      ageRange: p.category.includes('Slides') ? 'Ages 2-5' : 'Ages 3-8',
      modelCode: p.model_code,
      hasDetails: true,
      imageUrl: null
    };
  };

  const dynamicProducts = rawPlay.map(mapProduct);
  
  // Combine Everest Castle Set as first item, followed by dynamic ones
  const allProducts = [EVEREST_CASTLE, ...dynamicProducts];

  // Apply filters
  const filteredProducts = selectedFilter === 'All Playscapes'
    ? allProducts
    : allProducts.filter(p => p.categoryGroup === selectedFilter);

  const handleAddToCart = (id: string, name: string, price: number, imageUrl?: string) => {
    addToCart({ id, name, price, imageUrl });
    setAddedItem(id);
    setTimeout(() => {
      setAddedItem(null);
      setCartOpen(true);
    }, 600);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <header className="text-center relative max-w-4xl mx-auto space-y-6 pt-6">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 -right-20 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
        
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary">Play & Explore</h1>
        <p className="text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
          Handcrafted wooden playgrounds designed to spark curiosity, movement, and infinite stories. From castles to jungles, let the adventure begin.
        </p>

        {/* Play Scape Filters */}
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter(filter);
                setVisibleCount(6); // reset pagination count
              }}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                selectedFilter === filter
                  ? 'bg-primary text-on-primary shadow-lg shadow-primary/25'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Product Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.slice(0, visibleCount).map((p) => (
          <div
            key={p.id}
            className="group bg-white rounded-2xl p-6 border border-surface-container hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-square bg-surface-container-low rounded-xl mb-6 overflow-hidden relative flex items-center justify-center border border-slate-100 bg-white">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                )}
                {p.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-2xs font-extrabold tracking-wider uppercase border border-secondary-container/20">
                    {p.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className={`absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full transition-colors cursor-pointer ${
                    favorites[p.id] ? 'text-rose-500 hover:text-rose-600' : 'text-slate-400 hover:text-primary'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites[p.id] ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-display text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <span className="font-display text-base font-extrabold text-primary">${p.price}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {p.description}
                </p>
                <p className="text-3xs text-slate-400 font-bold">MODEL: {p.modelCode}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-xl text-slate-500 text-3xs font-bold uppercase tracking-wider">
                <Compass className="h-3.5 w-3.5" />
                {p.ageRange}
              </div>
              
              <div className="flex items-center gap-2">
                {p.hasDetails && (
                  <Link
                    href={`/products/${p.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                )}
                <button
                  onClick={() => handleAddToCart(p.id, p.name, p.price, p.imageUrl || undefined)}
                  disabled={addedItem === p.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer ${
                    addedItem === p.id ? 'bg-emerald-500 text-white shadow-emerald-500/25' : 'bg-primary text-on-primary hover:scale-105 shadow-primary/20'
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Show More Actions */}
      {filteredProducts.length > visibleCount && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setVisibleCount(visibleCount === 6 ? filteredProducts.length : 6)}
            className="px-8 py-3 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer shadow-sm bg-white"
          >
            {visibleCount === 6 ? (
              <>
                <span>Show All Playscapes ({filteredProducts.length})</span>
                <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                <span>Show Less</span>
                <ChevronUp className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useStorefrontStore } from '@/store/useStorefrontStore';
import { Sparkles, Heart, Star, ShoppingCart, Plus, HelpCircle, Compass, ShieldAlert, Award, Dumbbell, Baby, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productsData from '@/data/products.json';

import { cleanProductName } from '@/data/productNamesMap';

export default function WallToysPage() {
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Filter wall toys from products.json
  const rawWallToys = productsData.filter(
    (p) => p.category === 'Sensory / Wall Toys – Crocodile wall, rocket wall, busy boards'
  );

  const mapProduct = (p: any) => ({
    id: p.id,
    name: cleanProductName(p.name, p.category, p.model_code),
    price: Math.ceil((p.mrp || 1990) / 15),
    description: p.dimensions ? `Space-saving dynamic wall mount. Dimensions: ${p.dimensions}.` : 'Vertical play-development station.',
    badge: p.is_best_seller ? 'Best Seller' : p.is_new ? 'New' : p.id.includes('croc') || p.id.includes('rocket') ? 'Space-Saver' : null,
    modelCode: p.model_code,
  });

  const wallToys = rawWallToys.map(mapProduct);

  const handleAddToCart = (id: string, name: string, price: number) => {
    addToCart({ id, name, price });
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
    <div className="space-y-20 pb-16">
      {/* Hero Banner */}
      <section className="relative max-w-7xl mx-auto pt-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container/20 p-10 sm:p-20 flex flex-col items-center text-center border border-primary-container/30">
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl pointer-events-none" />
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary mb-6 relative z-10">
            Walls That Inspire Wonder
          </h1>
          <p className="text-base text-on-surface-variant max-w-2xl mb-8 relative z-10 leading-relaxed">
            Transform your vertical spaces into hubs of developmental discovery. Wall-mounted play saves precious floor space while encouraging toddlers to stand, stretch, and engage their growing bodies in purposeful play.
          </p>
          <div className="flex gap-4 relative z-10">
            <button
              onClick={() => document.getElementById('wall-selection')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Shop Collection
            </button>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section id="wall-selection" className="scroll-mt-20 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">Our Curated Selection</h2>
          <p className="text-xs text-on-surface-variant mt-1">Expert-approved busy boards for vertical nursery integration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wallToys.map((p) => (
            <div key={p.id} className="group bg-white rounded-2xl overflow-hidden border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-square overflow-hidden bg-surface-container-low flex items-center justify-center border-b border-slate-100 bg-white">
                  <Baby className="h-12 w-12 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider border border-secondary-container/20">
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className={`absolute top-4 right-4 bg-white/80 backdrop-blur-md p-1.5 rounded-full transition-colors ${
                      favorites[p.id] ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites[p.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-display text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {p.description}
                  </p>
                  <p className="text-3xs text-slate-400 font-bold">MODEL: {p.modelCode}</p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto flex justify-between items-center">
                <span className="font-display text-base font-extrabold text-primary">₹{p.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors animate-pulse hover:animate-none"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p.id, p.name, p.price)}
                    disabled={addedItem === p.id}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      addedItem === p.id ? 'bg-emerald-500 text-white' : 'bg-primary-container text-primary hover:scale-105'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Vertical Advantage */}
      <section className="bg-secondary-container/20 py-16 px-8 rounded-3xl border border-secondary-container/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-secondary">The Vertical Advantage</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Play doesn't have to be limited to the floor. Experts agree that vertical play surfaces offer unique developmental benefits that traditional floor toys cannot replicate.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-on-secondary p-3 rounded-xl flex-shrink-0">
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-on-surface">Shoulder & Core Stability</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Working against gravity on a vertical plane helps toddlers build core strength and upper-body stability essential for fine motor tasks and handwriting.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-on-secondary p-3 rounded-xl flex-shrink-0">
                    <Compass className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-on-surface">Hand-Eye Coordination</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Interacting with eye-level toys improves visual tracking and the precision of reach-and-grasp movements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary text-on-secondary p-3 rounded-xl flex-shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-on-surface">Crossing the Midline</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Large wall toys encourage children to use their dominant hand across their body, a key milestone for neurological development and side dominance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-xl">
              <Baby className="h-16 w-16 text-slate-400 stroke-1" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

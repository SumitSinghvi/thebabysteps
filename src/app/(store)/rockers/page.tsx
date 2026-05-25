'use client';

import { useStorefrontStore } from '@/store/useStorefrontStore';
import { Sparkles, Heart, Star, ShoppingCart, Plus, ShieldCheck, Footprints, Ruler, ShieldAlert, Award, ArrowUpRight, Baby, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productsData from '@/data/products.json';

import { cleanProductName } from '@/data/productNamesMap';

export default function RockersPage() {
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(8);

  // Load and filter rockers from products.json
  const rawRockers = productsData.filter(
    (p) =>
      p.category === 'Activity – Rockers/climbers, benches, beds, soft blocks' ||
      p.category === 'Rockers & See-Saw – Pony, elephant, duck, fish, combos' ||
      p.category === 'Rockers – Puppy, Jumbo Giraffe, Tusker, Stallion' ||
      p.category === 'Rockers / Play Equipment (more variety)'
  );

  const mapProduct = (p: any) => ({
    id: p.id,
    name: cleanProductName(p.name, p.category, p.model_code),
    price: Math.ceil((p.mrp || 1990) / 15),
    description: p.dimensions ? `Active core developer. Dimensions: ${p.dimensions}.` : 'Child-centric learning design.',
    badge: p.is_best_seller ? 'Best Seller' : p.is_new ? 'New' : null,
    modelCode: p.model_code,
  });

  const rockers = rawRockers.map(mapProduct);

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
      {/* Hero Header */}
      <section className="relative max-w-7xl mx-auto pt-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-primary-container text-primary rounded-full font-bold text-xs tracking-wider uppercase">
              Active Play Collection
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary leading-tight">
              Balance in Motion
            </h1>
            <p className="text-base text-on-surface-variant max-w-md leading-relaxed">
              Encourage core strength and equilibrium through the rhythmic joy of rocking. Our Montessori-inspired designs support your child's natural journey toward stability.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => document.getElementById('rockers-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95 cursor-pointer"
              >
                View Collection
              </button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/30 blob-shape -z-10 animate-pulse pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-container/30 blob-shape -z-10 pointer-events-none" />
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100 flex items-center justify-center p-4 border border-slate-100">
              <div className="text-center space-y-2 text-slate-400">
                <Footprints className="h-16 w-16 mx-auto stroke-1 animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Wooden rocker lookbook scene</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rockers Grid */}
      <section id="rockers-grid" className="py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-surface-container-low border-t border-b border-slate-200/50 scroll-mt-20 space-y-8">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-on-surface">Rockers & See-Saws</h2>
            <p className="text-xs text-on-surface-variant mt-1">Expertly crafted for developmental balance milestones.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rockers.slice(0, visibleCount).map((p) => (
            <div key={p.id} className="group relative bg-white p-5 rounded-2xl border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="aspect-square rounded-xl mb-6 overflow-hidden bg-primary-container/10 flex items-center justify-center border border-slate-100 relative bg-white">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-105 transition-transform" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className={`absolute top-4 right-4 bg-white/85 backdrop-blur-sm p-1.5 rounded-full transition-colors ${
                      favorites[p.id] ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${favorites[p.id] ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <h3 className="font-display text-base font-bold text-on-surface line-clamp-1">{p.name}</h3>
                <p className="text-2xs text-on-surface-variant mt-1">{p.description}</p>
                <p className="text-3xs text-slate-400 font-bold mt-1">MODEL: {p.modelCode}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="font-display text-sm font-extrabold text-primary">₹{p.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="w-8 h-8 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p.id, p.name, p.price)}
                    disabled={addedItem === p.id}
                    className={`px-3 py-1.5 rounded-xl text-2xs font-bold transition-all cursor-pointer ${
                      addedItem === p.id ? 'bg-emerald-500 text-white' : 'bg-secondary-container text-secondary hover:scale-105'
                    }`}
                  >
                    + Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rockers.length > visibleCount && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setVisibleCount(visibleCount === 8 ? rockers.length : 8)}
              className="px-8 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-white bg-white/40 cursor-pointer shadow-sm"
            >
              {visibleCount === 8 ? (
                <>
                  <span>Show All Rockers ({rockers.length})</span>
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
      </section>

      {/* Safety Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-white rounded-3xl p-8 border border-slate-200/50">
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-display text-2xl font-bold text-primary">Safety & Stability Design</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-on-surface">Floor-Safe Silicone Stoppers</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Specially designed stoppers ensure the rockers move smoothly without scratching hardwood, tiles, or laminate floors.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-on-surface">Meticulously Sanded Corners</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Every edge is hand-sanded to a velvety finish, eliminating any splinter hazards for safe tactile balance play.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-on-surface">Anti-Tip Safety Arcs</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                    Our base shapes feature a specific curved limit safety angle that prevents over-rocking and keeps the rocker grounded.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <Ruler className="h-16 w-16 text-slate-400 stroke-1" />
          </div>
        </div>
      </section>

      {/* Milestones of Motion */}
      <section className="py-12 bg-primary-container/10 rounded-3xl border border-primary-container/20 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-display text-2xl font-bold text-primary">Milestones of Motion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-primary">
              <h4 className="font-display text-sm font-bold text-primary mb-2">Vestibular System Development</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                The rhythmic rocking motion stimulates the vestibular system in the inner ear, essential for developing child balance, walking, and spatial coordination.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border-t-4 border-primary">
              <h4 className="font-display text-sm font-bold text-primary mb-2">Proprioceptive Muscle Feedback</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                As kids learn to control their rocking speed and balance, they develop advanced proprioceptive feedback, controlling physical force and muscle efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mat Complete Set */}
      <section className="max-w-7xl mx-auto">
        <div className="bg-secondary-container/20 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-12 border border-secondary-container/30">
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-display text-2xl font-bold text-secondary">Complete the Set</h2>
            <p className="text-sm text-on-secondary-container leading-relaxed">
              Pair your favorite rocker with our extra-thick Soft Play Mat for the ultimate safe and cozy play zone.
            </p>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4 max-w-sm">
              <div className="w-20 h-20 rounded-lg bg-secondary-container/30 flex items-center justify-center text-secondary">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-on-surface">Soft Play Mat</h4>
                <p className="text-secondary font-bold text-xs">₹55.00</p>
                <button
                  onClick={() => handleAddToCart('soft-play-mat', 'Soft Play Mat', 55.00)}
                  disabled={addedItem === 'soft-play-mat'}
                  className="text-primary font-bold text-3xs hover:underline flex items-center gap-0.5"
                >
                  Add to Cart
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <Footprints className="h-16 w-16 text-slate-400 stroke-1" />
          </div>
        </div>
      </section>
    </div>
  );
}

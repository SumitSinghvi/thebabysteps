'use client';

import { useStorefrontStore } from '@/store/useStorefrontStore';
import { Sparkles, Heart, Star, ShoppingCart, Plus, HelpCircle, Check, ShieldCheck, ShieldAlert, Award, Footprints, Baby, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productsData from '@/data/products.json';

import { cleanProductName } from '@/data/productNamesMap';

export default function SensoryPage() {
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Group limits for pagination/expanding
  const [sensoryLimit, setSensoryLimit] = useState(6);
  const [gamesLimit, setGamesLimit] = useState(6);

  // Load and filter items
  const rawSensory = productsData.filter(
    (p) => p.category === 'More Sensory Toys'
  );

  const rawGames = productsData.filter(
    (p) => p.category === 'More Toys & Games'
  );

  const rawFences = productsData.filter(
    (p) => p.category === 'Fence – Play junction, plastic balls, wooden sensory fence'
  );

  const mapProduct = (p: any) => ({
    id: p.id,
    name: cleanProductName(p.name, p.category, p.model_code),
    price: Math.ceil((p.mrp || 990) / 15),
    description: p.dimensions ? `Montessori sensory tool. Dimensions: ${p.dimensions}.` : 'Child-centric learning design.',
    badge: p.is_best_seller ? 'Best Seller' : p.is_new ? 'New' : null,
    modelCode: p.model_code,
  });

  const sensoryItems = rawSensory.map(mapProduct);
  const gamesItems = rawGames.map(mapProduct);
  const fencesItems = rawFences.map(mapProduct);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-secondary rounded-full font-bold text-xs tracking-wider uppercase">
              Modern Montessori
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-on-surface leading-tight">
              A World of <span className="text-primary italic font-medium">Tactile</span> Wonder
            </h1>
            <p className="text-base text-on-surface-variant max-w-lg leading-relaxed">
              Handcrafted materials designed to engage the senses and foster fine motor development. Explore the beauty of sensory play.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => document.getElementById('products-list')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="organic-blob bg-primary-container absolute -top-10 -right-10 w-64 h-64 opacity-20 animate-pulse pointer-events-none" />
            <div className="organic-blob bg-secondary-container absolute -bottom-10 -left-10 w-48 h-48 opacity-30 pointer-events-none" />
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100 flex items-center justify-center p-4 border border-slate-100">
              <div className="text-center space-y-2 text-slate-400">
                <Footprints className="h-16 w-16 mx-auto stroke-1 animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sensory & Sound Discovery Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sensory Play & Materials List */}
      <section id="products-list" className="scroll-mt-20 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">Sensory Play & Materials</h2>
          <p className="text-xs text-on-surface-variant mt-1">Non-toxic, safe textures and sound play for early cognitive stimulation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sensoryItems.slice(0, sensoryLimit).map((p) => (
            <div key={p.id} className="group relative bg-white rounded-2xl p-6 border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative mb-6 h-64 overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center border border-slate-100">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
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
                <h3 className="font-display text-base font-bold text-on-surface line-clamp-1">{p.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5">{p.description}</p>
                <p className="text-3xs text-slate-400 font-bold mt-1">MODEL: {p.modelCode}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                <span className="font-display text-base font-extrabold text-primary">₹{p.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p.id, p.name, p.price)}
                    disabled={addedItem === p.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
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

        {sensoryItems.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setSensoryLimit(sensoryLimit === 6 ? sensoryItems.length : 6)}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
            >
              {sensoryLimit === 6 ? (
                <>
                  <span>Show All ({sensoryItems.length})</span>
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

      {/* Developmental Games & Toys Section */}
      <section className="scroll-mt-20 space-y-8">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">Developmental Toys & Games</h2>
          <p className="text-xs text-on-surface-variant mt-1">Wooden stackers, puzzles, and shape builders that support cognitive milestones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesItems.slice(0, gamesLimit).map((p) => (
            <div key={p.id} className="group relative bg-white rounded-2xl p-6 border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative mb-6 h-64 overflow-hidden rounded-xl bg-surface-container-low flex items-center justify-center border border-slate-100">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
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
                <h3 className="font-display text-base font-bold text-on-surface line-clamp-1">{p.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5">{p.description}</p>
                <p className="text-3xs text-slate-400 font-bold mt-1">MODEL: {p.modelCode}</p>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                <span className="font-display text-base font-extrabold text-primary">₹{p.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(p.id, p.name, p.price)}
                    disabled={addedItem === p.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
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

        {gamesItems.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setGamesLimit(gamesLimit === 6 ? gamesItems.length : 6)}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
            >
              {gamesLimit === 6 ? (
                <>
                  <span>Show All ({gamesItems.length})</span>
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

      {/* Developmental Milestones Infographic */}
      <section className="bg-secondary-container/20 rounded-3xl py-12 px-8 border border-secondary-container/30">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-bold text-on-surface">Developmental Milestones</h2>
            <p className="text-xs text-on-surface-variant max-w-lg mx-auto">How sensory play shapes the early years of your explorer.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-primary-container text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Baby className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-bold text-on-surface mb-2">Age 1-2</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Focus on cause and effect. Grasping, shaking, and tactile exploration through varied organic textures.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-primary-container shadow-md relative z-10 md:-translate-y-2">
              <div className="w-12 h-12 bg-secondary-container text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-bold text-on-surface mb-2">Age 3-4</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Fine motor precision. Solving complex wooden puzzles, shape recognition, and engaging in collaborative games.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-tertiary-container text-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-display text-base font-bold text-on-surface mb-2">Age 5+</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Auditory rhythm. Mastering acoustic sound blocks, simple rhythm sets, and advanced spatial blocks building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety First Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-8 border border-slate-200/50">
          <div className="md:w-1/2 relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
            <ShieldAlert className="h-16 w-16 text-slate-400 stroke-1" />
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-display text-2xl font-bold text-on-surface">Safety First Philosophy</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              We believe beautiful play should also be worry-free. Every piece in our collection is crafted with meticulous attention to detail and safety standards.
            </p>
            <ul className="space-y-3 text-xs text-on-surface-variant">
              <li className="flex items-center gap-3 font-semibold">
                <Check className="h-4 w-4 text-secondary" />
                Non-toxic, water-based paints & dyes
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <Check className="h-4 w-4 text-secondary" />
                Smooth-sanded, splinter-free organic corners
              </li>
              <li className="flex items-center gap-3 font-semibold">
                <Check className="h-4 w-4 text-secondary" />
                FSC Certified sustainably sourced woods
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Play Junctions & Fences */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-on-surface">Play Junctions & Fences</h2>
          <p className="text-xs text-on-surface-variant">Create secure, beautiful play boundaries and sensory zones.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fencesItems.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl border border-surface-container hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video bg-surface-container-low rounded-lg p-2 mb-3 flex items-center justify-center relative">
                  <Baby className="h-8 w-8 text-slate-300" />
                  <Link
                    href={`/products/${p.id}`}
                    className="absolute bottom-2 right-2 p-1 bg-white border border-slate-100 text-slate-500 hover:text-primary rounded-lg transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="font-display text-xs font-bold text-on-surface line-clamp-1">{p.name}</p>
                <p className="text-[9px] text-slate-400">MODEL: {p.modelCode}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                <p className="text-primary font-bold text-xs">₹{p.price}</p>
                <button
                  onClick={() => handleAddToCart(p.id, p.name, p.price)}
                  disabled={addedItem === p.id}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    addedItem === p.id ? 'bg-emerald-500 text-white' : 'bg-primary-container text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

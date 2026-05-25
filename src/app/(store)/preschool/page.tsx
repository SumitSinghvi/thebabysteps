'use client';

import { useStorefrontStore } from '@/store/useStorefrontStore';
import { Sparkles, ArrowRight, ShieldCheck, Baby, Plus, Ruler, ShoppingCart, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import productsData from '@/data/products.json';

import { cleanProductName } from '@/data/productNamesMap';

export default function PreschoolPage() {
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Group visibility limits
  const [desksLimit, setDesksLimit] = useState(6);
  const [seatsLimit, setSeatsLimit] = useState(6);
  const [storageLimit, setStorageLimit] = useState(6);

  // Load and categorize products from products.json
  const rawDesks = productsData.filter(
    (p) =>
      p.category === 'Wooden Classroom Furniture – Tables, desks, dual-seaters' ||
      p.category === 'Classroom Furniture – Zoo Buddy, Mini Minds, desk combos'
  );

  const rawSeats = productsData.filter(
    (p) => p.category === 'Classroom Furniture – Plastic chairs & tables'
  );

  const rawStorage = productsData.filter(
    (p) =>
      p.category === 'Wooden Shelf / Racks – Book shelf, shoe rack, podium' ||
      p.category === 'More Storage / Cubbies / School Furniture'
  );

  // Map to storefront format
  const mapProduct = (p: any) => ({
    id: p.id,
    name: cleanProductName(p.name, p.category, p.model_code),
    price: Math.ceil((p.mrp || 990) / 15),
    description: p.dimensions ? `Montessori proportioned. Dimensions: ${p.dimensions}.` : 'Child-centric learning design.',
    badge: p.is_best_seller ? 'Best Seller' : p.is_new ? 'New' : null,
    modelCode: p.model_code,
  });

  const desks = rawDesks.map(mapProduct);
  const seats = rawSeats.map(mapProduct);
  const storage = rawStorage.map(mapProduct);

  const handleAddToCart = (id: string, name: string, price: number) => {
    addToCart({ id, name, price });
    setAddedItem(id);
    setTimeout(() => {
      setAddedItem(null);
      setCartOpen(true);
    }, 600);
  };

  const handleAddBundle = () => {
    addToCart({ id: 'bundle-mini-minds', name: 'Complete Learning Corner Bundle', price: 549.00 });
    setAddedItem('bundle');
    setTimeout(() => {
      setAddedItem(null);
      setCartOpen(true);
    }, 600);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Header */}
      <header className="relative max-w-7xl mx-auto pt-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-secondary rounded-full font-bold text-xs tracking-wider uppercase">
              Classroom Essentials
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-on-surface leading-tight">
              Mini Minds,<br /><span className="text-primary italic font-medium">Big Dreams</span>
            </h1>
            <p className="text-base text-on-surface-variant max-w-lg leading-relaxed">
              Designed for discovery. Our Montessori-inspired furniture supports every stage of a child’s learning journey with safety, style, and organic materials.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => document.getElementById('desks-list')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                Browse Collection
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/30 blob-shape -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-container/30 blob-shape -z-10" />
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-100 flex items-center justify-center p-4 border border-slate-100">
              <div className="text-center space-y-2 text-slate-400">
                <Baby className="h-16 w-16 mx-auto stroke-1 animate-bounce" />
                <p className="text-xs font-bold uppercase tracking-widest">Montessori School furniture Lookbook</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Educational Badges */}
      <section className="py-12 bg-surface-container-low rounded-3xl px-8 border border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-surface-container-lowest rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-primary">
                <Baby className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-on-surface">Child-Led Learning</h3>
                <p className="text-2xs text-on-surface-variant font-medium mt-0.5">Low-height designs for independence.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-surface-container-lowest rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-on-surface">Ergonomic Support</h3>
                <p className="text-2xs text-on-surface-variant font-medium mt-0.5">Contoured seats for healthy posture.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-surface-container-lowest rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-tertiary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-on-surface">Easy-Clean Surfaces</h3>
                <p className="text-2xs text-on-surface-variant font-medium mt-0.5">Spill-resistant eco finishes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desks Section */}
      <section id="desks-list" className="scroll-mt-20 space-y-8">
        <div className="border-b border-surface-container pb-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">Wooden Desks & Tables</h2>
          <p className="text-xs text-on-surface-variant mt-1">Crafted from sustainable solid oak and birch wood.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {desks.slice(0, desksLimit).map((desk) => (
            <div key={desk.id} className="group bg-surface-container-lowest rounded-2xl p-6 border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-6 aspect-square flex items-center justify-center">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  {desk.badge && (
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
                      {desk.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-base font-bold text-on-surface line-clamp-1">{desk.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5">{desk.description}</p>
                <p className="text-3xs text-slate-400 font-bold mt-1">MODEL: {desk.modelCode}</p>
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="font-display text-base font-extrabold text-primary">₹{desk.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${desk.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(desk.id, desk.name, desk.price)}
                    disabled={addedItem === desk.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      addedItem === desk.id ? 'bg-emerald-500 text-white' : 'bg-primary-container text-primary hover:scale-105'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {desks.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setDesksLimit(desksLimit === 6 ? desks.length : 6)}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
            >
              {desksLimit === 6 ? (
                <>
                  <span>Show All ({desks.length})</span>
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

      {/* Seating Section */}
      <section className="bg-primary-container/10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-16 rounded-3xl space-y-8 border border-primary-container/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-on-surface">Seating Solutions</h2>
            <p className="text-xs text-on-surface-variant mt-1">Durable wood and easy-clean primary plastic options.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {seats.slice(0, seatsLimit).map((seat) => (
            <div
              key={seat.id}
              className="group bg-white p-4 rounded-xl border border-surface-container hover:shadow-lg transition-shadow text-center flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/5] bg-surface-container-low rounded-lg p-4 mb-4 flex items-center justify-center relative">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-105 transition-transform" />
                  <Link
                    href={`/products/${seat.id}`}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm border border-slate-100 text-slate-500 hover:text-primary rounded-lg transition-all"
                    title="View Details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="font-display text-sm font-bold text-on-surface line-clamp-1">{seat.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">MODEL: {seat.modelCode}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                <span className="text-primary font-bold text-xs">₹{seat.price}</span>
                <button
                  onClick={() => handleAddToCart(seat.id, seat.name, seat.price)}
                  disabled={addedItem === seat.id}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    addedItem === seat.id ? 'bg-emerald-500 text-white' : 'bg-primary-container text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {seats.length > 8 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setSeatsLimit(seatsLimit === 6 ? seats.length : 6)}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-white bg-white/40 cursor-pointer"
            >
              {seatsLimit === 6 ? (
                <>
                  <span>Show All ({seats.length})</span>
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

      {/* Storage Section */}
      <section className="scroll-mt-20 space-y-8">
        <div className="border-b border-surface-container pb-4">
          <h2 className="font-display text-2xl font-bold text-on-surface">Storage & Shelving Solutions</h2>
          <p className="text-xs text-on-surface-variant mt-1">Child-height lockers, woven caddies, and bookshelving racks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storage.slice(0, storageLimit).map((item) => (
            <div key={item.id} className="group bg-surface-container-lowest rounded-2xl p-6 border border-surface-container hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative overflow-hidden rounded-xl bg-surface-container-low mb-6 aspect-square flex items-center justify-center">
                  <Baby className="h-10 w-10 text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  {item.badge && (
                    <span className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-base font-bold text-on-surface line-clamp-1">{item.name}</h3>
                <p className="text-xs text-on-surface-variant mt-1.5">{item.description}</p>
                <p className="text-3xs text-slate-400 font-bold mt-1">MODEL: {item.modelCode}</p>
              </div>

              <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-50">
                <span className="font-display text-base font-extrabold text-primary">₹{item.price}</span>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${item.id}`}
                    className="w-10 h-10 border border-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleAddToCart(item.id, item.name, item.price)}
                    disabled={addedItem === item.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      addedItem === item.id ? 'bg-emerald-500 text-white' : 'bg-primary-container text-primary hover:scale-105'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {storage.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setStorageLimit(storageLimit === 6 ? storage.length : 6)}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-600 flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
            >
              {storageLimit === 6 ? (
                <>
                  <span>Show All ({storage.length})</span>
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

      {/* Sizing Visual Reference */}
      <section className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden border border-surface-container shadow-xl">
        <div className="p-8 sm:p-12 space-y-6">
          <h2 className="font-display text-2xl font-bold text-on-surface">Designed for Their Scale</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Furniture that fits. No more dangling legs or reaching too high. Our classroom furniture is precision-engineered for kids to feel big without losing footing.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <span className="text-xs font-semibold text-on-surface">Average 4-Year Old: 40&ldquo; Height</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-1 bg-secondary rounded-full" />
              <span className="text-xs font-semibold text-on-surface">Child Table Desk: 20&ldquo; Height</span>
            </div>
          </div>
        </div>
        <div className="bg-secondary-container/20 h-full min-h-[300px] flex items-end justify-center relative p-8 border-l border-slate-100">
          <div className="flex items-end gap-12 relative z-10">
            <div className="relative w-16 h-48 bg-primary/10 rounded-t-full flex flex-col items-center justify-end pb-4 border-t-2 border-primary">
              <span className="absolute -top-6 text-2xs font-bold text-primary uppercase">Child</span>
              <Baby className="h-8 w-8 text-primary" />
            </div>
            <div className="relative w-20 h-24 bg-secondary/15 rounded-lg flex flex-col items-center justify-end pb-2 border-t-2 border-secondary">
              <span className="absolute -top-6 text-2xs font-bold text-secondary uppercase">Desk</span>
              <Ruler className="h-6 w-6 text-secondary" />
            </div>
          </div>
        </div>
      </section>

      {/* Bundle Corner Layout */}
      <section className="bg-slate-900 text-slate-100 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container/5 -skew-x-12 translate-x-1/4" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-2xs font-bold text-primary-container uppercase tracking-widest bg-primary/20 px-3 py-1 rounded-full border border-primary-container/25">
              Limited Edition Bundle
            </span>
            <h2 className="font-display text-3xl font-bold mt-2">The Complete Learning Corner</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Everything you need to create a professional Montessori classroom nook in minutes. Save 15% when you buy as a set.
            </p>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-container animate-pulse" />
                1x Mini Minds Desk (Oak)
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                4x FlexiShell Chairs (Mixed Pastels)
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
                1x Montessori Cubby (9-Unit)
              </li>
            </ul>
            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl font-extrabold text-primary-container">₹549</span>
              <span className="text-sm line-through text-slate-500">₹645</span>
            </div>
            <button
              onClick={handleAddBundle}
              disabled={addedItem === 'bundle'}
              className={`px-8 py-4 rounded-full font-bold text-sm shadow-xl active:scale-95 transition-all flex items-center gap-2 cursor-pointer ${
                addedItem === 'bundle' ? 'bg-emerald-500 text-white shadow-emerald-500/25' : 'bg-primary text-on-primary hover:scale-105 shadow-primary/25'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {addedItem === 'bundle' ? 'Bundle Added' : 'Add Bundle to Cart'}
            </button>
          </div>
          <div className="relative group overflow-hidden rounded-xl bg-slate-800 border border-slate-700/80 aspect-video flex items-center justify-center text-center p-8">
            <div className="space-y-2 text-slate-500">
              <Baby className="h-12 w-12 mx-auto stroke-1 animate-pulse" />
              <p className="text-2xs font-bold uppercase tracking-widest text-slate-400">Bundle Setup Layout Showcase</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-tertiary-container text-on-tertiary-container p-4 rounded-xl shadow-xl rotate-6">
              <p className="font-display font-bold text-sm">Save ₹96</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

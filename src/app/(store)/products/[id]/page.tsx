'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useStorefrontStore } from '@/store/useStorefrontStore';
import productsData from '@/data/products.json';
import { 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Smile, 
  Wrench, 
  Compass, 
  Baby,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

// Structured fallback/custom data for Everest Castle Set
const EVEREST_CASTLE = {
  id: 'everest-castle-set',
  name: 'Everest Castle Set',
  price: 499,
  category: 'Playroom',
  description: 'Elevate playtime to a grand adventure. This multi-level fortress is designed for little explorers, featuring sustainable cedar wood construction, hidden tunnels for secret missions, and a panoramic lookout tower.',
  isBestSeller: true,
  isNew: false,
  dimensions: '60" x 48" x 60"',
  material: 'Solid Cedar & Birch',
  weightCapacity: 'Up to 120lbs',
  finish: 'Non-toxic Water Base',
  origin: 'Handcrafted in USA',
  ageRange: 'Ages 2-6',
  assembly: 'Easy Assembly',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAi4M3-BQnQGW48pJFWrEHM2S46KRYHJ99BYnlCZyd5DMIdVKtvdBpugM0KXdGSv89RVpnlvDZmhi2r3D3YPom5MX9Xt22nEtBpZGi3DXR1DBUlVfbrNnunPMnmia9WcnvCKLlea-lCXlqYgj87s1xJbXGMHF2GABa26UKoARnN0vjA0iIo0DYYVUwOInDp7ZCpMWvmPJnslei9KCyHLQjjjMaPGATA1cAWO0W9oR63gy4vphyxZkdKz7MXlfGKLFBQBawNLfddCSuB'
};

import { cleanProductName } from '@/data/productNamesMap';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart, setCartOpen } = useStorefrontStore();
  const [addedItem, setAddedItem] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 1. Resolve product data either as custom everest castle set or from products.json
  let product: any = null;

  if (id === 'everest-castle-set') {
    product = EVEREST_CASTLE;
  } else {
    const rawProd = productsData.find(
      (p) => p.id === id || p.model_code.toLowerCase() === id.toLowerCase()
    );

    if (rawProd) {
      const cleanName = cleanProductName(rawProd.name, rawProd.category, rawProd.model_code);
      // Determine description based on category
      let desc = 'Thoughtfully crafted with children\'s development in mind. This high-quality Montessori-inspired piece encourages self-directed discovery, motor skill development, and creative play in a safe, child-led environment.';
      if (rawProd.category.toLowerCase().includes('furniture')) {
        desc = 'A beautifully designed child-scale piece that fosters independence. Perfect for Montessori classrooms and playrooms, constructed with sturdy, smooth edges and safe, non-toxic materials.';
      } else if (rawProd.category.toLowerCase().includes('sensory')) {
        desc = 'Fosters tactile curiosity and fine motor skills. Features interactive elements and organic shapes that captivate tiny hands and minds without overstimulating them.';
      } else if (rawProd.category.toLowerCase().includes('slides') || rawProd.category.toLowerCase().includes('rockers')) {
        desc = 'Built for physical confidence and balance. Encourages safe climbing, rocking, and coordination practice, using FSC-certified wood and heavy-duty connectors.';
      }

      product = {
        id: rawProd.id,
        name: cleanName,
        price: Math.ceil((rawProd.mrp || 990) / 15),
        category: rawProd.category.split('–')[0].split('-')[0].trim(),
        description: desc,
        isBestSeller: rawProd.is_best_seller || false,
        isNew: rawProd.is_new || false,
        dimensions: rawProd.dimensions || 'Standard Size',
        material: rawProd.category.toLowerCase().includes('plastic') ? 'Premium Non-toxic Polyethylene' : 'Solid Natural Birch & Beechwood',
        weightCapacity: rawProd.category.toLowerCase().includes('furniture') ? 'Supports up to 100lbs' : 'Supports up to 80lbs',
        finish: 'Water-based Safety Varnish',
        origin: 'Handcrafted with Care',
        ageRange: rawProd.category.toLowerCase().includes('furniture') ? 'Ages 3-6' : 'Ages 1-5',
        assembly: 'Minimal Assembly Required',
        imageUrl: null
      };
    }
  }

  // 2. If product still not found, render fallback/not found state
  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6 pt-12">
        <div className="w-16 h-16 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
          <Baby className="h-8 w-8 text-tertiary animate-bounce" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-bold text-on-surface">Product Not Found</h1>
          <p className="text-sm text-on-surface-variant max-w-sm">
            We couldn't find the product you're looking for in our Montessori catalog.
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-xs shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || undefined
    });
    setAddedItem(true);
    setTimeout(() => {
      setAddedItem(false);
      setCartOpen(true);
    }, 800);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center flex-wrap gap-1.5 text-on-surface-variant font-medium text-xs opacity-75 mt-4">
        <Link href="/categories" className="hover:text-primary transition-colors">
          Shop All
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="capitalize">{product.category}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-primary font-bold">{product.name}</span>
      </nav>

      {/* Product Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <div className="relative group">
          <div className="absolute -z-10 -top-8 -left-8 w-64 h-64 bg-primary-container/20 blob-shape animate-pulse" />
          <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-secondary-container/20 blob-shape" />
          
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-square flex items-center justify-center bg-white relative">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="w-24 h-24 rounded-3xl bg-primary-container/20 flex items-center justify-center text-primary mx-auto">
                  <Baby className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <span className="text-2xs font-extrabold text-slate-400 tracking-wider uppercase">Montessori Essentials</span>
                  <h3 className="font-display font-bold text-slate-700 mt-1">{product.name}</h3>
                </div>
              </div>
            )}
            
            {isFavorite && (
              <div className="absolute top-4 right-4 bg-rose-500 text-white p-2 rounded-full shadow-md animate-ping" />
            )}
          </div>
        </div>

        {/* Product Details Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.isBestSeller && (
                <span className="inline-block bg-secondary-container text-secondary px-3 py-1 rounded-full text-2xs font-extrabold tracking-wider uppercase border border-secondary-container/20">
                  Bestseller
                </span>
              )}
              {product.isNew && (
                <span className="inline-block bg-primary-container text-primary px-3 py-1 rounded-full text-2xs font-extrabold tracking-wider uppercase border border-primary-container/20">
                  New Arrival
                </span>
              )}
              <span className="inline-block bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-2xs font-bold tracking-wider uppercase">
                {product.ageRange}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface leading-tight">
              {product.name}
            </h1>
            <p className="font-display text-2xl font-extrabold text-tertiary mt-2">
              ${product.price.toFixed(0)}
            </p>
          </div>

          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={addedItem}
              className={`px-8 py-4 rounded-full font-bold text-xs shadow-lg flex items-center gap-2 active:scale-95 transition-all duration-300 cursor-pointer ${
                addedItem 
                  ? 'bg-secondary text-white shadow-secondary/20' 
                  : 'bg-primary text-on-primary hover:scale-105 shadow-primary/20'
              }`}
            >
              {addedItem ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-4 rounded-full border transition-all active:scale-95 cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-50 border-rose-200 text-rose-500 hover:bg-rose-100' 
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50 hover:scale-115'
              }`}
              title="Add to Favorites"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-slate-200/50">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="font-display text-xs font-bold text-on-surface">Sustainably Sourced</span>
          <p className="text-[10px] text-on-surface-variant">FSC certified materials</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="font-display text-xs font-bold text-on-surface">Safety Certified</span>
          <p className="text-[10px] text-on-surface-variant">Tested for toddlers</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
            <Smile className="h-6 w-6" />
          </div>
          <span className="font-display text-xs font-bold text-on-surface">{product.ageRange}</span>
          <p className="text-[10px] text-on-surface-variant">Perfect developmental fit</p>
        </div>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
            <Wrench className="h-6 w-6" />
          </div>
          <span className="font-display text-xs font-bold text-on-surface">{product.assembly}</span>
          <p className="text-[10px] text-on-surface-variant">All tools included</p>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            Crafted for Natural Play
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            <p>
              In the world of BabySteps, each item is more than just wood, plastic or screws—it's a gateway to self-discovery. We build spaces that encourage physical confidence, cognitive exploration, and safe boundaries.
            </p>
            <p>
              Designed with input from early childhood educators, every dimension serves a developmental purpose. The open structure and simple lines provide children the agency to direct their own play, challenging motor coordination and fine-tuning creative thinking.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg bg-surface-container-low aspect-video border border-slate-100 flex items-center justify-center p-4">
          {product.imageUrl ? (
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7dvUpQZm9aG7LBihyMMfKQ8ha3t-VHdvkKZj1IoLvQypmFcJqhTvj2NfZPehv67wnBdvyj5yOBskNKUi-Qhvf-AeJ3uuexOOiwbjq5gQvpxxt7KrtvqS96HBsY3JhDjw44cDUJXfEmFXinVX31jV825mmAG9Ic-BRcA-3jDaGnpbnmx0II9PuoJQBIBrphOjkUUHf6Qt0bjSPgWocLsQD7zvqvKVaSAuMsFfkwOU0d_k1a4Ld02wuXkDacHao8nO9PZYSX13ijVxU"
              alt="Montessori Child Interaction"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="text-center p-6 space-y-2">
              <Baby className="h-10 w-10 text-slate-300 mx-auto stroke-1 animate-pulse" />
              <p className="text-2xs font-extrabold text-slate-400 uppercase tracking-widest">Montessori Development Story</p>
            </div>
          )}
        </div>
      </section>

      {/* Scale Reference & Specifications */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        {/* Scale Reference Drawing */}
        <div className="lg:col-span-3 bg-primary-container/10 rounded-2xl p-8 flex flex-col justify-center border border-primary-container/20">
          <h3 className="font-display text-lg font-bold text-primary mb-6 text-center">
            Proportioned for Young Explorer
          </h3>
          <div className="relative flex items-end justify-center space-x-12 h-64">
            <div className="flex flex-col items-center">
              <div className="w-16 h-36 bg-tertiary-container/30 rounded-t-full flex items-center justify-center relative border-t-2 border-tertiary border-dashed">
                <Baby className="h-8 w-8 text-tertiary" />
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-2xs whitespace-nowrap">
                  ~ 3ft Toddler
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-28 h-48 bg-primary-container/20 rounded-t-2xl border-2 border-dashed border-primary flex flex-col items-center justify-center p-2 relative">
                <span className="text-primary opacity-50 font-bold text-2xs">ITEM HEIGHT</span>
                <div className="absolute -top-10 text-primary font-extrabold text-sm whitespace-nowrap">
                  {id === 'everest-castle-set' ? '5ft Tall' : 'Scaled Fitting'}
                </div>
              </div>
            </div>
          </div>
          <p className="text-center font-bold text-2xs text-on-primary-container mt-6 italic">
            Perfect child-centric proportions help build confidence and prevent accidents.
          </p>
        </div>

        {/* Specifications List */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-8 border border-slate-100">
          <h3 className="font-display text-lg font-bold text-on-surface mb-6">Specifications</h3>
          <ul className="space-y-4 text-xs">
            <li className="flex justify-between items-center border-b border-slate-200/50 pb-2">
              <span className="text-on-surface-variant font-medium">Dimensions</span>
              <span className="text-on-surface font-bold">{product.dimensions}</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-200/50 pb-2">
              <span className="text-on-surface-variant font-medium">Material</span>
              <span className="text-on-surface font-bold">{product.material}</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-200/50 pb-2">
              <span className="text-on-surface-variant font-medium">Weight Capacity</span>
              <span className="text-on-surface font-bold">{product.weightCapacity}</span>
            </li>
            <li className="flex justify-between items-center border-b border-slate-200/50 pb-2">
              <span className="text-on-surface-variant font-medium">Finish</span>
              <span className="text-on-surface font-bold">{product.finish}</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-on-surface-variant font-medium">Origin</span>
              <span className="text-on-surface font-bold">{product.origin}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Complete the Playroom / Related Products */}
      <section className="space-y-6">
        <h2 className="font-display text-2xl font-bold text-primary">Complete the Playroom</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Related Card 1: Calm Cloud Swing */}
          <Link
            href="/products/calm-cloud-swing"
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlPviyXoGIexdg0Gz_5SXoTw2w35qDQCzzm3lEXlxZy4k-eFN_3kmO_07vZ6Q0sUs0UCeLKlL49aw_Wn35P7i2XivHV1UZjNcnpeIA83imtamQjWr48ju-m1l9QQpfG6dgQd3QKq0mzWqG8Y2B9ZEZWIzpaiSFVLGJCMM542CNmvykD39vbd6gnWX1TRpGpEwq1rDrCuf_cyHuNzEWiC_XCbz1lwZ1xQaeruF8AATvKNnkY3-kAfukgbuzsAnzbpy1ofZi8uUz7PBM"
                  alt="Calm Cloud Swing"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Calm Cloud Swing
              </h4>
            </div>
            <p className="text-tertiary font-extrabold text-xs mt-2">$129</p>
          </Link>

          {/* Related Card 2: Modular Balance Beam */}
          <Link
            href="/products/modular-balance-beam"
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByiSVEaTdc2HYkdNIAPMSbi6j_6GQdtRiOMbje5l68gJ38JgjZOq1kf8Wkjzmk0UEp9VnpkJA9obOyE0fSuOqlUNny2vK3wLvaUefTL3wXaKgU5BM5AolRXAw5iW2NJW_IVjOYTnbyKKLGIZK7XtT-b8Y81eQBpkBSzDIARhmpVxhAlTxZsFumdsN6soQFJmCkeh7QUBEW-ZZ3KpfejQqnDXCCMr13BpVCKr_WmVkWVwsb4kVgtApf3mKVDq80IpmLmGbt88vXDxz8"
                  alt="Modular Balance Beam"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Modular Balance Beam
              </h4>
            </div>
            <p className="text-tertiary font-extrabold text-xs mt-2">$185</p>
          </Link>

          {/* Related Card 3: Mini Minds Desk */}
          <Link
            href="/products/mini-minds-desk"
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-40 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative">
                <Baby className="h-8 w-8 text-slate-300 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Mini Minds Desk
              </h4>
            </div>
            <p className="text-tertiary font-extrabold text-xs mt-2">$189</p>
          </Link>

          {/* Related Card 4: Curva Birch Seat */}
          <Link
            href="/products/curva-birch-seat"
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-40 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center relative">
                <Baby className="h-8 w-8 text-slate-300 group-hover:scale-110 transition-transform" />
              </div>
              <h4 className="font-display text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                Curva Birch Seat
              </h4>
            </div>
            <p className="text-tertiary font-extrabold text-xs mt-2">$89</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

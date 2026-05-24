'use client';

import { Sparkles, ArrowRight, ShieldAlert, Heart, Star, Baby, Award, Truck, Gift } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function StoreHomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (window.innerWidth / 2 - e.clientX) * 0.03,
        y: (window.innerHeight / 2 - e.clientY) * 0.03,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden space-y-20 pb-16">
      {/* Animated Background Decor */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-20 w-96 h-96 bg-primary-container/30 blur-3xl blob-shape transition-transform duration-200"
          style={{ transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` }}
        />
        <div
          className="absolute top-1/2 -right-20 w-80 h-80 bg-secondary-container/30 blur-3xl blob-shape transition-transform duration-200"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-64 h-64 bg-tertiary-container/20 blur-3xl blob-shape transition-transform duration-200"
          style={{ transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)` }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-8 md:pt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-container/40 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary">
              <Sparkles className="h-3 w-3 animate-spin" />
              Montessori-Inspired Living
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-on-background leading-tight">
              Where Every <span className="text-primary italic font-medium">Step</span> is a World of <span className="text-secondary font-semibold">Wonder</span>.
            </h1>
            
            <p className="text-base text-on-surface-variant max-w-lg leading-relaxed">
              Thoughtfully crafted toys and environments designed to nurture curiosity, foster independence, and turn your home into a Montessori-inspired sanctuary of discovery.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/categories"
                className="px-8 py-4 bg-primary text-on-primary rounded-full font-semibold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 active:scale-95 cursor-pointer"
              >
                Shop Collections
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('our-mission');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-surface-container-high text-primary rounded-full font-semibold text-sm hover:bg-surface-container-highest transition-all active:scale-95 cursor-pointer"
              >
                Learn Our Philosophy
              </button>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            {/* Main Hero Image */}
            <div className="rounded-xl overflow-hidden soft-shadow rotate-2 hover:rotate-0 transition-transform duration-700 aspect-[4/3] bg-gradient-to-br from-indigo-50 to-rose-50 border border-slate-100 flex items-center justify-center p-4">
              <img
                src="/hero.png"
                alt="Montessori-style playroom with safe wooden furniture"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            
            {/* Floating Accent Card */}
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-bounce duration-[4000ms]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary-container rounded-xl text-on-secondary-container">
                  <Award className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-on-surface">100% Sustainably Sourced</p>
                  <p className="text-2xs text-on-surface-variant font-medium mt-0.5">Non-toxic & Safety Tested</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="our-mission" className="py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-surface-container-low relative overflow-hidden scroll-mt-16">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-bold text-xs tracking-wider mb-4 uppercase">
              Our Mission
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-on-background">
              Nurturing the Natural Pace of Childhood
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left items-center">
            <div className="space-y-6">
              <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl soft-shadow border border-white/50 blob-shape rotate-1 hover:rotate-0 transition-all duration-300">
                <h3 className="font-display text-lg font-bold text-primary mb-2">Child-Led Learning</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  We believe in providing the tools, then stepping back. Our designs encourage self-directed activity, hands-on learning, and collaborative exploration.
                </p>
              </div>
              <div className="p-6 bg-white/70 backdrop-blur-sm rounded-xl soft-shadow border border-white/50 blob-shape -rotate-2 hover:rotate-0 transition-all duration-300">
                <h3 className="font-display text-lg font-bold text-secondary mb-2">Safety Above All</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Every edge is rounded, every finish is food-safe. We exceed global safety standards to give you complete peace of mind.
                </p>
              </div>
            </div>

            <div className="relative aspect-square max-w-sm mx-auto w-full">
              <div className="w-full h-full bg-tertiary-container/30 blob-shape flex items-center justify-center p-6 overflow-hidden border border-tertiary-container/40">
                <div className="w-full h-full rounded-full bg-white/40 flex items-center justify-center">
                  <Baby className="h-20 w-20 text-tertiary stroke-1 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlights (Bento Grid Style) */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold text-on-background">Featured Collections</h2>
            <p className="text-sm text-on-surface-variant max-w-md">Curated sets designed for specific developmental milestones and imaginative journeys.</p>
          </div>
          <Link
            href="/categories"
            className="font-semibold text-sm text-primary flex items-center gap-1.5 hover:gap-3 transition-all group"
          >
            View All Collections
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Zoo Buddy Collection */}
          <Link
            href="/categories"
            className="md:col-span-7 group relative h-[400px] rounded-2xl overflow-hidden soft-shadow bg-surface-container-highest border border-slate-100 flex flex-col justify-end p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-purple-50/20 to-rose-100/30 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />
            
            <div className="relative z-10 space-y-2">
              <span className="px-3 py-1 bg-primary text-on-primary rounded-full text-2xs font-bold uppercase tracking-wider w-fit block">
                Ages 1-3
              </span>
              <h3 className="font-display text-2xl font-bold text-white">Zoo Buddy</h3>
              <p className="text-sm text-white/90 max-w-sm">
                Tactile animal companions that spark early vocabulary and empathy through imaginative play.
              </p>
            </div>
          </Link>

          {/* Mini Minds Collection */}
          <Link
            href="/categories"
            className="md:col-span-5 group relative h-[400px] rounded-2xl overflow-hidden soft-shadow bg-tertiary-container/20 border border-tertiary-container/30 p-8 flex flex-col"
          >
            <div className="space-y-2">
              <span className="px-3 py-1 bg-tertiary text-on-tertiary rounded-full text-2xs font-bold uppercase tracking-wider w-fit block">
                Ages 3-6
              </span>
              <h3 className="font-display text-xl font-bold text-on-tertiary-container">Mini Minds</h3>
              <p className="text-sm text-on-tertiary-container/80 max-w-xs">
                Puzzles and logic games designed to challenge growing curious minds and develop fine motor skills.
              </p>
            </div>

            <div className="mt-auto aspect-video rounded-xl bg-white/60 border border-tertiary-container/10 overflow-hidden flex items-center justify-center">
              <Sparkles className="h-10 w-10 text-tertiary/40 animate-pulse" />
            </div>
          </Link>

          {/* Small Accents Grid */}
          <div className="md:col-span-4 h-48 bg-secondary-container/20 rounded-2xl flex flex-col justify-center items-center text-center p-6 border border-secondary-container/30">
            <Gift className="h-8 w-8 text-secondary mb-3 stroke-1" />
            <h4 className="font-display text-sm font-bold text-on-secondary-container">100% Recyclable Packaging</h4>
            <p className="text-2xs text-on-secondary-container/80 mt-1">Eco-friendly gift wrapping options</p>
          </div>
          
          <div className="md:col-span-4 h-48 bg-primary-container/20 rounded-2xl flex flex-col justify-center items-center text-center p-6 border border-primary-container/30">
            <Truck className="h-8 w-8 text-primary mb-3 stroke-1" />
            <h4 className="font-display text-sm font-bold text-on-primary-container">Free Shipping Over $150</h4>
            <p className="text-2xs text-on-primary-container/80 mt-1">Fast and insured parcel delivery</p>
          </div>

          <div className="md:col-span-4 h-48 bg-tertiary-container/20 rounded-2xl flex flex-col justify-center items-center text-center p-6 border border-tertiary-container/30">
            <ShieldAlert className="h-8 w-8 text-tertiary mb-3 stroke-1" />
            <h4 className="font-display text-sm font-bold text-on-tertiary-container">Safety Certified Quality</h4>
            <p className="text-2xs text-on-tertiary-container/80 mt-1">Tested for oral contact & hazards</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-primary text-on-primary rounded-3xl p-10 sm:p-16 relative overflow-hidden text-center shadow-xl shadow-primary/10">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-64 h-64 border-4 border-white rounded-full" />
            <div className="absolute top-1/2 -right-10 w-40 h-40 border-4 border-white rounded-full rotate-45" />
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-4">Join the Journey</h2>
          <p className="text-sm mb-8 max-w-md mx-auto opacity-90 leading-relaxed">
            Subscribe for Montessori-inspired play tips, new collection previews, and exclusive family offers.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              className="flex-grow px-5 py-3 rounded-full bg-white text-on-background border-none focus:outline-none focus:ring-4 focus:ring-primary-container text-sm shadow-sm"
              placeholder="Your email address"
              type="email"
            />
            <button className="px-6 py-3 bg-secondary text-on-secondary rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-md">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  PlusCircle,
  UtensilsCrossed,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 mb-12 shadow-2xl">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-cyan-600 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900 opacity-95" />

      {/* Decorative blurred background shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center text-white">
        
        {/* Hackathon & Campus Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
          <span>CodeArambh 2.0 • Hi-Tech Institute of Engineering & Technology</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
          Buy. Sell. Order. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-200 to-emerald-300">
            All on HIET Campus.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg text-indigo-100 max-w-2xl mx-auto font-normal leading-relaxed">
          The verified marketplace for HIET students. Buy calculators & cycles from seniors, sell hostel essentials, and order canteen snacks with zero queue times.
        </p>

        {/* Campus Quick Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-xl mx-auto relative flex items-center bg-white/95 dark:bg-slate-900/90 rounded-2xl shadow-2xl p-1.5 border border-white/30 backdrop-blur-lg"
        >
          <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search calculators, cycles, lab records, samosas..."
            className="w-full text-sm sm:text-base px-3 py-2 bg-transparent text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md active:scale-95 shrink-0"
          >
            Search
          </button>
        </form>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-600" />
            <span>Browse Marketplace</span>
          </Link>

          <Link
            to="/sell"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sell an Item</span>
          </Link>

          <Link
            to="/canteen"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 transition-all backdrop-blur-md hover:-translate-y-0.5"
          >
            <UtensilsCrossed className="w-4 h-4 text-cyan-300" />
            <span>Order Food</span>
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">100% Student Verified</p>
              <p className="text-[11px] text-indigo-200">Raman, Kalam & Day scholars</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Zero Queue Pickup</p>
              <p className="text-[11px] text-indigo-200">10-min ready time slots</p>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">0% Platform Fee</p>
              <p className="text-[11px] text-indigo-200">Built for student community</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

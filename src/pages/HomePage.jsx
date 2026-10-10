import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  UtensilsCrossed,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Hero } from '../components/Hero';
import { QuickAccessTiles } from '../components/QuickAccessTiles';
import { ItemCard } from '../components/ItemCard';
import { FoodItemCard } from '../components/FoodItemCard';
import { useMarketplace } from '../context/MarketplaceContext';
import { INITIAL_CANTEEN_ITEMS, INITIAL_STATIONERY_ITEMS } from '../data/seedData';

export const HomePage = () => {
  const { items } = useMarketplace();

  // Top 4 available marketplace items
  const featuredMarketplace = items.filter((i) => i.status === 'available').slice(0, 4);

  // Top 4 canteen picks
  const featuredCanteen = INITIAL_CANTEEN_ITEMS.slice(0, 4);

  // Top 4 stationery picks
  const featuredStationery = INITIAL_STATIONERY_ITEMS.slice(0, 4);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <Hero />

      {/* Quick Access Tiles */}
      <QuickAccessTiles />

      {/* Featured Marketplace Items Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Hostel Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Latest Pre-Loved Student Gear
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Save big on calculators, cycles, and study gear handed down from seniors.
            </p>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group shrink-0"
          >
            <span>View All {items.length} Items</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMarketplace.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Popular Canteen Snacks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Campus Canteen</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Hot Snacks & Refreshments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Order now, select your 10-minute pickup slot, and skip the crowd.
            </p>
          </div>

          <Link
            to="/canteen"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 group shrink-0"
          >
            <span>Explore Full Canteen Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCanteen.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Stationery Essentials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Campus Stationery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Lab Records & Exam Stationery
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              HIET official practical files, drawing sheets, notebooks and urgent printouts.
            </p>
          </div>

          <Link
            to="/stationery"
            className="inline-flex items-center gap-1.5 font-bold text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group shrink-0"
          >
            <span>View All Stationery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStationery.map((item) => (
            <FoodItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Campus Stats & Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-amber-300">₹1,85,000+</p>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">Saved by Students</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-cyan-300">540+</p>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">Campus Deals Closed</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-300">12 Mins</p>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">Avg Canteen Pickup</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-purple-200">100%</p>
              <p className="text-xs sm:text-sm text-indigo-200 mt-1">HIET College Verified</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

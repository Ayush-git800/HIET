import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Clock,
  Printer,
  FileCheck
} from 'lucide-react';
import { INITIAL_STATIONERY_ITEMS } from '../data/seedData';
import { FoodItemCard } from '../components/FoodItemCard';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

const STATIONERY_CATEGORIES = [
  'All',
  'Notebooks',
  'Lab & Records',
  'Drawing & Tools',
  'Pens & Stationery',
  'Printouts'
];

export const StationeryPage = () => {
  const { stationeryItems, stationerySubtotal } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return INITIAL_STATIONERY_ITEMS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const totalStationeryCount = stationeryItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-28">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-8 bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 mb-3">
            <Printer className="w-3.5 h-3.5 text-cyan-200" />
            <span>Stationery & Xerox Counter • Near Library & Gate No. 2</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Campus Stationery & Xerox
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-cyan-100 leading-relaxed font-normal">
            Pre-order official HIET lab manual files, engineering graphics sheets, notebooks, and skip assignment printout lines.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md mb-8 space-y-4">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lab record, drawing sheet, pen, spiral..."
            className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {STATIONERY_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stationery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <FoodItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Sticky Bottom Cart Bar (if stationery items in cart) */}
      {totalStationeryCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 max-w-3xl mx-auto z-40 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center font-bold text-white shadow-md">
                {totalStationeryCount}
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Stationery Cart Total</p>
                <p className="text-base font-black text-white">{formatCurrency(stationerySubtotal)}</p>
              </div>
            </div>

            <Link
              to="/cart"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 shadow-md transition-all active:scale-95"
            >
              <span>View Cart & Select Slot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  PlusCircle,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { ItemCard } from '../components/ItemCard';
import { useMarketplace, MARKETPLACE_CATEGORIES, ITEM_CONDITIONS } from '../context/MarketplaceContext';

export const MarketplacePage = () => {
  const { items } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter state
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [sortBy, setSortBy] = useState('newest'); // newest, price-low, price-high
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'All Conditions' && item.condition !== selectedCondition) {
        return false;
      }

      // Available filter
      if (showOnlyAvailable && item.status === 'sold') {
        return false;
      }

      // Search query (title, description, seller, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesSeller = item.sellerName.toLowerCase().includes(query);
        return matchesTitle || matchesDesc || matchesCategory || matchesSeller;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      // default newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [items, selectedCategory, selectedCondition, showOnlyAvailable, searchQuery, sortBy]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCondition('All Conditions');
    setSortBy('newest');
    setShowOnlyAvailable(true);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Peer-to-Peer Campus Marketplace</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            HIET Student Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Buy verified pre-owned study essentials or sell your gear to juniors.
          </p>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Sell an Item</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md mb-8 space-y-4">
        
        {/* Row 1: Search + Sort + Condition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items by title, model, or seller..."
              className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Condition selector */}
          <div className="md:col-span-3">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {ITEM_CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Sort: Newest Listed</option>
              <option value="price-low">Sort: Price (Low to High)</option>
              <option value="price-high">Sort: Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Row 3: Available toggle & Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <span>
              Showing <strong className="text-slate-800 dark:text-white">{filteredItems.length}</strong> items
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyAvailable}
                onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>In-stock items only</span>
            </label>
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedCondition !== 'All Conditions') && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-md">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No items found matching your filters
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-6">
            Try adjusting your search query, selecting another category, or list this item yourself to help campus peers.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Clear All Filters
            </button>
            <Link
              to="/sell"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md"
            >
              Sell This Item Instead
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

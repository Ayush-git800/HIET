import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const ItemCard = ({ item }) => {
  const isSold = item.status === 'sold';

  // Condition color mapping
  const conditionStyles = {
    'Brand New': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
    'Like New': 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
    'Good': 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
    'Fair': 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  };

  return (
    <Link
      to={`/marketplace/${item.id}`}
      className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm ${
        isSold ? 'opacity-75' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&auto=format&fit=crop&q=80';
          }}
        />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm border border-white/20">
          {item.category}
        </span>

        {/* Condition Badge */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${
            conditionStyles[item.condition] || conditionStyles.Good
          }`}
        >
          {item.condition}
        </span>

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full bg-rose-600 text-white font-bold text-sm tracking-wider uppercase shadow-lg">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h3>

          {/* Pricing */}
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                {formatCurrency(item.originalPrice)}
              </span>
            )}
            {item.originalPrice && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Seller Info & Meta */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <img
              src={item.sellerAvatar}
              alt={item.sellerName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <span className="font-medium truncate max-w-[110px] text-slate-700 dark:text-slate-300">
              {item.sellerName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>{formatTimeAgo(item.createdAt)}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all -translate-x-1 group-hover:translate-x-0" />
          </div>
        </div>
      </div>
    </Link>
  );
};

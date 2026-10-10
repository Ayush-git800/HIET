import React, { useState } from 'react';
import { Plus, Minus, Star, Clock, MessageSquare, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

export const FoodItemCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity, updateInstructions } = useCart();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');

  // Check if this item is currently in the cart
  const cartItem = cartItems.find((ci) => ci.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(item, noteText);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, quantity - 1);
  };

  const handleSaveNote = () => {
    if (cartItem) {
      updateInstructions(item.id, noteText);
    }
    setShowNoteInput(false);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/85 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm">
      {/* Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              item.shop === 'stationery'
                ? 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80';
          }}
        />

        {/* Veg / Non-veg Tag (for food items) */}
        {item.isVeg !== undefined && (
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/90 p-1 rounded-md shadow-sm border border-slate-200 dark:border-slate-700">
            <div
              className={`w-4 h-4 border-2 flex items-center justify-center ${
                item.isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </div>
          </div>
        )}

        {/* Category Pill */}
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-md">
          {item.category}
        </span>

        {/* Rating / Prep Time badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          {item.rating && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 backdrop-blur-md shadow-sm">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              {item.rating}
            </span>
          )}
          {item.prepTime && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-900/80 text-slate-200 backdrop-blur-md">
              <Clock className="w-3 h-3 text-cyan-400" />
              {item.prepTime}
            </span>
          )}
        </div>
      </div>

      {/* Item Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Cart Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              {formatCurrency(item.price)}
            </span>
          </div>

          <div>
            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 rounded-xl p-1 shadow-inner">
                <button
                  onClick={handleDecrease}
                  className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-xs active:scale-90"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center font-bold text-sm text-indigo-700 dark:text-indigo-300">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition-colors shadow-xs active:scale-90"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions Toggle (if added to cart) */}
        {quantity > 0 && (
          <div className="mt-2.5 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
            {!showNoteInput ? (
              <button
                onClick={() => {
                  setNoteText(cartItem?.instructions || '');
                  setShowNoteInput(true);
                }}
                className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                {cartItem?.instructions ? `Note: "${cartItem.instructions}"` : '+ Add special instructions'}
              </button>
            ) : (
              <div className="flex items-center gap-1.5 mt-1">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. less spicy, pack separately"
                  className="flex-1 text-xs px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSaveNote}
                  className="p-1 rounded-lg bg-indigo-600 text-white text-xs hover:bg-indigo-500"
                  title="Save note"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Clock,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, generatePickupSlots } from '../utils/formatters';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    canteenItems,
    stationeryItems,
    canteenSubtotal,
    stationerySubtotal,
    totalAmount,
    totalCount,
    updateQuantity,
    updateInstructions,
    removeFromCart,
    clearCart,
    clearShopCart
  } = useCart();

  const { placeOrder } = useOrders();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const availableSlots = generatePickupSlots();
  const [selectedSlot, setSelectedSlot] = useState(availableSlots[0]?.label || 'Immediate (10-15 mins)');
  const [isPlacing, setIsPlacing] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if not supported in test env
    }
  };

  const handleCheckout = (shopType = 'all') => {
    if (!currentUser) {
      showToast('Please sign in or select a demo profile to place an order', 'error');
      return;
    }

    setIsPlacing(true);
    triggerConfetti();

    let lastCreatedOrder = null;

    if (shopType === 'canteen' || (shopType === 'all' && canteenItems.length > 0)) {
      const order = placeOrder({
        shopType: 'canteen',
        items: canteenItems,
        subtotal: canteenSubtotal,
        pickupSlot: selectedSlot,
        user: currentUser
      });
      lastCreatedOrder = order;
      clearShopCart('canteen');
    }

    if (shopType === 'stationery' || (shopType === 'all' && stationeryItems.length > 0)) {
      const order = placeOrder({
        shopType: 'stationery',
        items: stationeryItems,
        subtotal: stationerySubtotal,
        pickupSlot: selectedSlot,
        user: currentUser
      });
      lastCreatedOrder = order;
      clearShopCart('stationery');
    }

    setIsPlacing(false);

    if (lastCreatedOrder) {
      navigate(`/confirmation/${lastCreatedOrder.id}`);
    } else {
      navigate('/orders');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your Campus Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-6">
          Add some hot samosas and masala chai from the canteen or lab records from stationery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/canteen"
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-700 shadow-md"
          >
            Order Canteen Food
          </Link>
          <Link
            to="/stationery"
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-cyan-600 hover:bg-cyan-700 shadow-md"
          >
            Order Stationery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Page Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Campus Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {totalCount} item{totalCount > 1 ? 's' : ''} ready for counter pickup
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left: Items grouped by shop */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Canteen Group */}
          {canteenItems.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      HIET Central Canteen
                    </h3>
                    <p className="text-[11px] text-slate-400">Ground floor cafeteria counter</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                  Subtotal: {formatCurrency(canteenSubtotal)}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {canteenItems.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                          {formatCurrency(item.price)} each
                        </p>
                        {item.instructions && (
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 italic mt-0.5">
                            Note: "{item.instructions}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-orange-600 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stationery Group */}
          {stationeryItems.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Campus Stationery & Xerox
                    </h3>
                    <p className="text-[11px] text-slate-400">Near Gate 2 & Central Library</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  Subtotal: {formatCurrency(stationerySubtotal)}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {stationeryItems.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                          {formatCurrency(item.price)} each
                        </p>
                        {item.instructions && (
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 italic mt-0.5">
                            Note: "{item.instructions}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-cyan-600 text-white flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pickup Slot Selector */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Select Campus Pickup Time Slot
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your order will be packed and kept ready at the respective counter during this window:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot.label;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.label)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-center transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-300 dark:ring-indigo-900'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {slot.label}
                    {slot.isNext && (
                      <span className="block text-[10px] text-amber-300 font-bold mt-0.5">
                        (Earliest)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 sticky top-28">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Order Summary
            </h3>

            {/* Bill Details */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              {canteenSubtotal > 0 && (
                <div className="flex justify-between">
                  <span>Canteen Items Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(canteenSubtotal)}
                  </span>
                </div>
              )}

              {stationerySubtotal > 0 && (
                <div className="flex justify-between">
                  <span>Stationery Items Subtotal</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {formatCurrency(stationerySubtotal)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Campus Handling & Taxes</span>
                <span>FREE (College Subsidized)</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-black text-slate-900 dark:text-white">
                <span>Total Payable</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            {/* Selected User Info */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                Ordering as: {currentUser?.name}
              </p>
              <p className="text-slate-500 mt-0.5">
                {currentUser?.hostelBlock} • {currentUser?.phone}
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                Pickup Slot: {selectedSlot}
              </p>
            </div>

            {/* Place Order CTA */}
            <button
              disabled={isPlacing}
              onClick={() => handleCheckout('all')}
              className="w-full py-4 px-6 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Confirm & Place Order ({formatCurrency(totalAmount)})</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Pay via UPI or Cash at pickup counter</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

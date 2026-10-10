import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  ArrowRight,
  ClipboardList,
  Store,
  Sparkles
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { LiveOrderTracker } from '../components/LiveOrderTracker';
import { StatusBadge } from '../components/StatusBadge';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const OrderConfirmationPage = () => {
  const { id } = useParams();
  const { getOrderById } = useOrders();

  const order = getOrderById(id);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/orders" className="text-indigo-600 underline mt-2 inline-block">
          View all orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Success Hero Card */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Order Confirmed & Sent to Counter</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Order {order.orderNumber}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Show your Pickup Token at the counter during your assigned window.
        </p>
      </div>

      {/* Main Order Card */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Token Number & Status Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-slate-800 dark:to-slate-800/80 border border-indigo-100 dark:border-slate-700 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Counter Pickup Token
            </span>
            <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
              #{order.tokenNumber}
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 text-center sm:text-right">
            <span className="text-[11px] font-medium text-slate-400">Current Status:</span>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* Live Order Tracker Stepper */}
        <div className="pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Live Counter Progress Tracker
          </h3>
          <LiveOrderTracker status={order.status} statusHistory={order.statusHistory} />
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              Pickup Counter & Location
            </span>
            <p className="font-bold text-sm text-slate-900 dark:text-white mt-1">
              {order.shopName}
            </p>
            <p className="text-slate-500 mt-0.5">
              {order.shopType === 'canteen' ? 'Ground Floor Central Cafeteria' : 'Near Gate 2 / Library'}
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              Scheduled Pickup Window
            </span>
            <p className="font-bold text-sm text-indigo-600 dark:text-indigo-400 mt-1">
              {order.pickupSlot}
            </p>
            <p className="text-slate-500 mt-0.5">
              Ordered {formatTimeAgo(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Items Summary Table */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
            Ordered Items
          </h4>
          <div className="space-y-2.5 divide-y divide-slate-100 dark:divide-slate-800">
            {order.items.map((item, idx) => (
              <div key={idx} className="pt-2.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {item.quantity}x {item.name}
                  </span>
                  {item.instructions && (
                    <span className="block text-[11px] text-indigo-600 italic">
                      Note: "{item.instructions}"
                    </span>
                  )}
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-bold text-sm text-slate-900 dark:text-white">Total Amount</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/orders"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <ClipboardList className="w-4 h-4" />
            <span>View All My Orders</span>
          </Link>

          <Link
            to="/vendor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
          >
            <Store className="w-4 h-4" />
            <span>Open Vendor View (Test Status Update)</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

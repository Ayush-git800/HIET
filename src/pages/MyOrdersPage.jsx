import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  ChevronRight,
  UtensilsCrossed,
  BookOpen,
  ArrowRight,
  Store,
  RefreshCw
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { LiveOrderTracker } from '../components/LiveOrderTracker';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const MyOrdersPage = () => {
  const { orders } = useOrders();
  const { currentUser } = useAuth();

  const [filterTab, setFilterTab] = useState('all'); // all, active, completed

  // Filter orders for student: match studentId or show all demo student orders if Aarav/Priya
  const studentOrders = orders.filter((o) => {
    if (!currentUser) return true;
    if (currentUser.id === o.studentId) return true;
    // For demo convenience, let Aarav see all demo orders if no personalized ones
    return o.studentId === 'user_aarav' || o.studentId === 'user_priya';
  });

  const filteredOrders = studentOrders.filter((order) => {
    if (filterTab === 'active') {
      return order.status === 'Placed' || order.status === 'Preparing' || order.status === 'Ready';
    }
    if (filterTab === 'completed') {
      return order.status === 'Collected';
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            My Campus Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track real-time counter preparation status and pickup tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/canteen"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-sm"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Order Canteen Food</span>
          </Link>

          <Link
            to="/vendor"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Vendor Staff Portal</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            filterTab === 'all'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Orders ({studentOrders.length})
        </button>
        <button
          onClick={() => setFilterTab('active')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            filterTab === 'active'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Active Pickups ({studentOrders.filter((o) => o.status !== 'Collected').length})
        </button>
        <button
          onClick={() => setFilterTab('completed')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            filterTab === 'completed'
              ? 'bg-slate-700 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Past Orders ({studentOrders.filter((o) => o.status === 'Collected').length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isActive = order.status !== 'Collected';
            return (
              <div
                key={order.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 transition-all hover:shadow-md"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                        order.shopType === 'canteen'
                          ? 'bg-orange-500/10 text-orange-600'
                          : 'bg-cyan-500/10 text-cyan-600'
                      }`}
                    >
                      {order.shopType === 'canteen' ? (
                        <UtensilsCrossed className="w-5 h-5" />
                      ) : (
                        <BookOpen className="w-5 h-5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-slate-900 dark:text-white">
                          {order.orderNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                          Token: {order.tokenNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.shopName} • Placed {formatTimeAgo(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={order.status} />
                    <Link
                      to={`/confirmation/${order.id}`}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors"
                      title="View receipt"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                {/* Stepper tracker for active orders */}
                {isActive && (
                  <div className="pt-3 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <LiveOrderTracker status={order.status} statusHistory={order.statusHistory} />
                  </div>
                )}

                {/* Items & Footer */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                    <p className="text-slate-400 mt-1">
                      Pickup Window: <strong>{order.pickupSlot}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Total</span>
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </span>
                    </div>

                    <Link
                      to={`/confirmation/${order.id}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors"
                    >
                      View Live Tracker
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <ClipboardList className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No orders found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Order food from canteen or stationary supplies to see live tracking here.
          </p>
          <Link
            to="/canteen"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Order Canteen Food Now
          </Link>
        </div>
      )}
    </div>
  );
};

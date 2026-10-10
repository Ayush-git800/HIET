import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Store,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  ChefHat,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Phone,
  User,
  RotateCcw
} from 'lucide-react';
import { useOrders, ORDER_STATUSES } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const VendorDashboardPage = () => {
  const { orders, updateOrderStatus, stats } = useOrders();
  const { currentUser, switchDemoAccount } = useAuth();

  const [shopFilter, setShopFilter] = useState('all'); // all, canteen, stationery
  const [statusFilter, setStatusFilter] = useState('all'); // all, Placed, Preparing, Ready, Collected
  const [searchQuery, setSearchQuery] = useState('');

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (shopFilter !== 'all' && order.shopType !== shopFilter) {
      return false;
    }
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNumber = order.orderNumber.toLowerCase().includes(q);
      const matchStudent = order.studentName.toLowerCase().includes(q);
      const matchToken = order.tokenNumber.toLowerCase().includes(q);
      return matchNumber || matchStudent || matchToken;
    }
    return true;
  });

  const getNextStatusAction = (currentStatus) => {
    switch (currentStatus) {
      case 'Placed':
        return { next: 'Preparing', label: 'Start Preparing', color: 'bg-indigo-600 hover:bg-indigo-700' };
      case 'Preparing':
        return { next: 'Ready', label: 'Mark Ready for Pickup', color: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'Ready':
        return { next: 'Collected', label: 'Mark as Collected', color: 'bg-slate-700 hover:bg-slate-800' };
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Campus Vendor Staff Operations</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Live Order Kitchen & Counter Terminal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time queue management for HIET Canteen and Stationery staff.
          </p>
        </div>

        {/* Persona quick switch for hackathon testing */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] font-bold text-slate-500 px-2">Staff Login:</span>
          <button
            onClick={() => switchDemoAccount('vendor_canteen')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              currentUser?.id === 'vendor_canteen'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
          >
            🍳 Ramesh (Canteen)
          </button>
          <button
            onClick={() => switchDemoAccount('vendor_stationery')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              currentUser?.id === 'vendor_stationery'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
          >
            📚 Gupta Ji (Stationery)
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Today's Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {formatCurrency(stats.todayRevenue)}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            Canteen: {formatCurrency(stats.canteenRevenue)} • Stat: {formatCurrency(stats.stationeryRevenue)}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalOrders}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across all campus counters</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              In Kitchen / Packing
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ChefHat className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            {stats.pendingOrders}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Requires staff attention</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Handed Over
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.completedOrders}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Completed successfully</p>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Shop Selector */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setShopFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                shopFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All Shops ({orders.length})
            </button>
            <button
              onClick={() => setShopFilter('canteen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                shopFilter === 'canteen'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Canteen Only
            </button>
            <button
              onClick={() => setShopFilter('stationery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                shopFilter === 'stationery'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Stationery Only
            </button>
          </div>

          {/* Search by student or token */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token (A-42) or student..."
              className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['all', ...ORDER_STATUSES].map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {status === 'all' ? 'All Statuses' : status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List / Kanban Cards */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const nextAction = getNextStatusAction(order.status);

            return (
              <div
                key={order.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Token, Order ID, and Student */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
                        #{order.tokenNumber}
                      </span>
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">
                        {order.orderNumber}
                      </span>
                      <StatusBadge status={order.status} />
                      <span className="text-xs text-slate-400">
                        Placed {formatTimeAgo(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {order.studentName} ({order.studentHostel})
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {order.studentPhone}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400">
                        <Clock className="w-3.5 h-3.5" />
                        Target Slot: {order.pickupSlot}
                      </span>
                    </div>
                  </div>

                  {/* Middle / Right: Items & Status Advance Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                    
                    {/* Items quick list */}
                    <div className="text-xs text-slate-700 dark:text-slate-300 max-w-sm">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Items ({order.items.length}):
                      </p>
                      <p className="line-clamp-2 mt-0.5 text-slate-500">
                        {order.items.map((i) => `${i.quantity}x ${i.name} ${i.instructions ? `[Note: ${i.instructions}]` : ''}`).join(' • ')}
                      </p>
                      <p className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                        Total: {formatCurrency(order.total)}
                      </p>
                    </div>

                    {/* Status Advance Stepper Controls */}
                    <div className="flex items-center gap-2">
                      {nextAction && (
                        <button
                          onClick={() => updateOrderStatus(order.id, nextAction.next)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs text-white shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ${nextAction.color}`}
                        >
                          <span>{nextAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Manual Status Override Select */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-xs py-2 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
                      >
                        {ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <Store className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No orders found for selected filter
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select another status or clear search query to inspect incoming orders.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

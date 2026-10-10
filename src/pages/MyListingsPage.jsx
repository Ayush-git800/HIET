import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  Eye,
  ExternalLink,
  X,
  AlertCircle
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const MyListingsPage = () => {
  const { items, editItem, deleteItem, toggleSoldStatus } = useMarketplace();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('all'); // all, available, sold
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Get items posted by this student (or fallback to Aarav's items if guest)
  const myListings = items.filter(
    (item) => item.sellerId === currentUser?.id || item.sellerId === 'user_aarav'
  );

  const filteredListings = myListings.filter((item) => {
    if (activeTab === 'available') return item.status === 'available';
    if (activeTab === 'sold') return item.status === 'sold';
    return true;
  });

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditPrice(item.price.toString());
    setEditDesc(item.description);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editingItem) {
      editItem(editingItem.id, {
        title: editTitle,
        price: Number(editPrice),
        description: editDesc
      });
      setEditingItem(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            My Marketplace Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your posted items, update prices, or mark items as sold once deals close.
          </p>
        </div>

        <Link
          to="/sell"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md active:scale-95 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Another Item</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All Listings ({myListings.length})
        </button>
        <button
          onClick={() => setActiveTab('available')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            activeTab === 'available'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Active ({myListings.filter((i) => i.status === 'available').length})
        </button>
        <button
          onClick={() => setActiveTab('sold')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
            activeTab === 'sold'
              ? 'bg-rose-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Sold Out ({myListings.filter((i) => i.status === 'sold').length})
        </button>
      </div>

      {/* Listings List */}
      {filteredListings.length > 0 ? (
        <div className="space-y-4">
          {filteredListings.map((item) => {
            const isSold = item.status === 'sold';
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {isSold && (
                      <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                        <span className="text-[10px] font-black text-rose-400 tracking-wider uppercase">
                          SOLD
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {item.category}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-400">
                        {formatTimeAgo(item.createdAt)}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {item.views || 1} views
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        {formatCurrency(item.price)}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isSold
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                        }`}
                      >
                        {isSold ? 'Sold' : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <Link
                    to={`/marketplace/${item.id}`}
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit listing"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => toggleSoldStatus(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      isSold
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {isSold ? 'Relist as Active' : 'Mark as Sold'}
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this listing permanently?')) {
                        deleteItem(item.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="Delete listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No listings found in this tab
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
            Post an item to connect with buyers across all HIET hostels.
          </p>
          <Link
            to="/sell"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusCircle className="w-4 h-4" />
            Sell an Item Now
          </Link>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Edit Listing
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  ShieldCheck,
  MapPin,
  Calendar,
  Eye,
  MessageCircle,
  Phone,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Send,
  X
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

export const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, incrementViews, toggleSoldStatus, deleteItem } = useMarketplace();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [customMsg, setCustomMsg] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const item = getItemById(id);

  useEffect(() => {
    if (item) {
      incrementViews(item.id);
      setOfferPrice(item.price.toString());
    }
  }, [id]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Item Not Found</h2>
        <p className="text-slate-500 mt-2">The listing you are looking for may have been removed or sold.</p>
        <Link
          to="/marketplace"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const isOwner = currentUser?.id === item.sellerId;
  const isSold = item.status === 'sold';

  const cleanPhone = (item.sellerPhone || '9876543210').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
    `Hi ${item.sellerName}, I saw your listing for "${item.title}" (₹${item.price}) on HIET Campus Mart. Is it still available to inspect in campus?`
  )}`;

  const handleSendRequest = (e) => {
    e.preventDefault();
    setRequestSent(true);
    showToast(`Purchase request of ₹${offerPrice} sent to ${item.sellerName}!`, 'success');
    setTimeout(() => {
      setContactModalOpen(false);
      setRequestSent(false);
    }, 1800);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out ${item.title} on HIET Campus Mart for ₹${item.price}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
            title="Share listing"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {isOwner && (
            <button
              onClick={() => toggleSoldStatus(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border ${
                isSold
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
              }`}
            >
              {isSold ? 'Mark as Available' : 'Mark as Sold'}
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery & Badges */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-sm border border-white/20">
                {item.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                {item.condition} Condition
              </span>
            </div>

            {isSold && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center">
                <span className="px-6 py-2 rounded-2xl bg-rose-600 text-white font-extrabold text-base tracking-widest uppercase shadow-xl">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Posted {formatTimeAgo(item.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-cyan-500" />
              <span>{item.views || 1} campus views</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Student Seller</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
              Item Details & Condition
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, Seller Card & Contact CTAs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Price & Buy Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Asking Price
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {formatCurrency(item.price)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <>
                    <span className="text-base text-slate-400 line-through">
                      {formatCurrency(item.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
              {item.title}
            </h1>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                disabled={isSold}
                onClick={() => setContactModalOpen(true)}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer ${
                  isSold
                    ? 'bg-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/25 hover:shadow-orange-500/40'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>{isSold ? 'Item Already Sold' : 'Contact Seller / Request to Buy'}</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Seller Profile Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Seller Profile
            </h3>

            <div className="flex items-center gap-3.5">
              <img
                src={item.sellerAvatar}
                alt={item.sellerName}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {item.sellerName}
                </h4>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {item.sellerEmail}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Pickup Location: <strong>{item.sellerHostel || 'HIET Campus'}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Contact: <strong>{item.sellerPhone || '+91 98765 43210'}</strong></span>
              </div>
            </div>
          </div>

          {/* Campus Safety Tips Card */}
          <div className="p-5 rounded-3xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Campus Safety Guidelines</span>
            </div>
            <p className="leading-relaxed">
              Meet in public college areas (Hostel Gate, Canteen, or Central Library). Always inspect and power-on electronics before transferring payment via UPI.
            </p>
          </div>

        </div>
      </div>

      {/* Contact / Request to Buy Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                Peer Request
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                Contact {item.sellerName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Send a quick purchase request or call directly.
              </p>
            </div>

            {requestSent ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-slate-900 dark:text-white">Request Sent to Seller!</h4>
                <p className="text-xs text-slate-500">
                  {item.sellerName} has been notified. You can also message them on WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Message to Seller
                  </label>
                  <textarea
                    rows={3}
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    placeholder="e.g. Can we meet near Raman Hostel mess today around 5 PM?"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Call Seller</span>
                  </a>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

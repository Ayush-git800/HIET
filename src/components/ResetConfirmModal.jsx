import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const ResetConfirmModal = ({ isOpen, onClose }) => {
  const { resetMarketplace } = useMarketplace();
  const { resetOrders } = useOrders();
  const { clearCart } = useCart();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleReset = () => {
    resetMarketplace();
    resetOrders();
    clearCart();
    showToast('All demo data has been restored to factory state!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 text-amber-500 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Reset Demo Data?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Restore initial hackathon seed state
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          This will restore all pre-loaded 14+ marketplace items, reset canteen and stationery demo orders, and clear your active cart. This is safe to run anytime for judging demos.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Yes, Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

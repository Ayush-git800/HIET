import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, RotateCcw, ShieldCheck, MapPin, Sparkles, Store, Mail, Phone } from 'lucide-react';
import { ResetConfirmModal } from './ResetConfirmModal';

export const Footer = () => {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  return (
    <>
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Col 1: Brand & College Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 p-0.5 shadow-md">
                  <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-indigo-600 text-base">
                    H
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    HIET Campus Mart
                  </h4>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                    CodeArambh 2.0 Hackathon Project
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                The all-in-one student marketplace and digital campus commerce hub built exclusively for Hi-Tech Institute of Engineering & Technology, Ghaziabad.
              </p>

              <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>NH-24, Delhi-Hapur Bypass Rd, Adhyatmik Nagar, Ghaziabad, UP 201015</span>
              </div>
            </div>

            {/* Col 2: Marketplace Categories */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Student Marketplace
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="/marketplace?category=Calculators" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Scientific Calculators</Link></li>
                <li><Link to="/marketplace?category=Bicycles" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Campus Bicycles</Link></li>
                <li><Link to="/marketplace?category=Study Lamps" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Study Lamps & Lights</Link></li>
                <li><Link to="/marketplace?category=Books" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Engineering & AKTU Books</Link></li>
                <li><Link to="/marketplace?category=Hostel Essentials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Hostel Essentials & ED Kits</Link></li>
                <li><Link to="/sell" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">Sell Pre-loved Items</Link></li>
              </ul>
            </div>

            {/* Col 3: Canteen & Stationery */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white mb-3">
                Campus Counters
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <li><Link to="/canteen" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Central Canteen Menu</Link></li>
                <li><Link to="/canteen?cat=Snacks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Samosa, Maggi & Chai</Link></li>
                <li><Link to="/canteen?cat=Meals" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Deluxe Thalis</Link></li>
                <li><Link to="/stationery" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">HIET Lab Record Files</Link></li>
                <li><Link to="/stationery?cat=Drawing & Tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Engineering Graphics Sheets</Link></li>
                <li><Link to="/orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Track Active Pickup Orders</Link></li>
              </ul>
            </div>

            {/* Col 4: Hackathon Demo Tools */}
            <div className="space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                Hackathon Controls
              </h5>
              
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-900/90 border border-indigo-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CodeArambh 2.0 Demo Panel</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Easily reset orders and listings anytime during evaluation.
                </p>
                <button
                  onClick={() => setResetModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/50 hover:bg-amber-200/80 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/vendor"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <Store className="w-3.5 h-3.5" />
                  Switch to Vendor Staff View
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p className="flex items-center gap-1 font-medium">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by <strong className="text-slate-700 dark:text-slate-200">Team CodeArambh</strong> | CodeArambh 2.0 | HIET Ghaziabad
            </p>
            <div className="flex items-center gap-4">
              <span>Frontend: React + Vite + Tailwind CSS</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>Offline-First (localStorage)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal isOpen={resetModalOpen} onClose={() => setResetModalOpen(false)} />
    </>
  );
};

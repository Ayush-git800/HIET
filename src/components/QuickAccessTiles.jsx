import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, UtensilsCrossed, BookOpen, ArrowRight, Tag, Clock, Printer } from 'lucide-react';

export const QuickAccessTiles = () => {
  const tiles = [
    {
      title: 'Student Marketplace',
      tagline: 'Buy & Sell Pre-loved Campus Gear',
      desc: 'Scientific calculators, Hero bicycles, study lamps, ED kits & textbooks from seniors with up to 70% discount.',
      icon: ShoppingBag,
      link: '/marketplace',
      actionText: 'Explore Marketplace',
      badge: '14+ Active Listings',
      accent: 'from-indigo-600 to-blue-600',
      badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
      features: ['Hostel room pickup', 'P2P WhatsApp chat', 'Instant deal closing']
    },
    {
      title: 'HIET Central Canteen',
      tagline: 'Skip The Long Counter Queue',
      desc: 'Order steaming hot samosas, masala maggi, kadak kulhad chai & deluxe student thalis with precise 10-minute pickup slots.',
      icon: UtensilsCrossed,
      link: '/canteen',
      actionText: 'View Food Menu',
      badge: 'Open • Ground Floor',
      accent: 'from-orange-500 to-amber-500',
      badgeColor: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20',
      features: ['Veg & Snack options', 'Live order status', 'Special instructions']
    },
    {
      title: 'Stationery & Xerox',
      tagline: 'Records, Drawing Sheets & Printouts',
      desc: 'Pre-order hardbound lab records, A2 engineering graphics sheets, Pentonic pens, and urgent assignment printout tokens.',
      icon: BookOpen,
      link: '/stationery',
      actionText: 'Order Stationery',
      badge: 'Near Gate No. 2',
      accent: 'from-cyan-600 to-teal-600',
      badgeColor: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
      features: ['Official HIET files', 'Print tokens', 'Exam clipboards']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Everything You Need On Campus
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Pick a category below to browse verified listings or place an order in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <div
              key={tile.title}
              className="group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-md hover:-translate-y-1.5"
            >
              <div>
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tile.accent} flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${tile.badgeColor}`}
                  >
                    {tile.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tile.title}
                </h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                  {tile.tagline}
                </p>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tile.desc}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-1.5">
                  {tile.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <Link
                  to={tile.link}
                  className="inline-flex items-center justify-between w-full font-bold text-sm text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
                >
                  <span>{tile.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Clock, ChefHat, CheckCircle2, PackageCheck } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const configs = {
    Placed: {
      bg: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
      icon: Clock,
      pulse: 'bg-amber-500',
      text: 'Order Placed'
    },
    Preparing: {
      bg: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
      icon: ChefHat,
      pulse: 'bg-indigo-500',
      text: 'Preparing'
    },
    Ready: {
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
      icon: CheckCircle2,
      pulse: 'bg-emerald-500',
      text: 'Ready for Pickup'
    },
    Collected: {
      bg: 'bg-slate-100 text-slate-750 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
      icon: PackageCheck,
      pulse: null,
      text: 'Collected'
    }
  };

  const current = configs[status] || configs.Placed;
  const Icon = current.icon;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${sizeClasses} ${current.bg}`}
    >
      {current.pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.pulse}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${current.pulse}`} />
        </span>
      )}
      <Icon className="w-3.5 h-3.5" />
      <span>{current.text}</span>
    </span>
  );
};

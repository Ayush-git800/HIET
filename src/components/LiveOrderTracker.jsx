import React from 'react';
import { Clock, ChefHat, CheckCircle2, PackageCheck, Check } from 'lucide-react';
import { ORDER_STATUSES } from '../context/OrderContext';

export const LiveOrderTracker = ({ status, statusHistory = [] }) => {
  const steps = [
    { key: 'Placed', label: 'Placed', icon: Clock, desc: 'Received at counter' },
    { key: 'Preparing', label: 'Preparing', icon: ChefHat, desc: 'Kitchen / Staff packing' },
    { key: 'Ready', label: 'Ready', icon: CheckCircle2, desc: 'Counter pickup token' },
    { key: 'Collected', label: 'Collected', icon: PackageCheck, desc: 'Handed over' }
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="w-full py-4">
      {/* Mobile / Desktop Stepper */}
      <div className="relative">
        {/* Connecting Progress Line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-0">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 transition-all duration-700 rounded-full"
            style={{
              width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%`
            }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const isUpcoming = idx > currentIndex;
            const Icon = step.icon;

            // Find history note if available
            const historyItem = statusHistory.find((h) => h.status === step.key);

            return (
              <div key={step.key} className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/60 shadow-indigo-500/30 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="mt-2.5">
                  <p
                    className={`text-xs sm:text-sm font-bold ${
                      isCurrent
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : isCompleted
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-400 dark:text-slate-600'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="hidden sm:block text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 max-w-[110px] mx-auto">
                    {historyItem?.note || step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

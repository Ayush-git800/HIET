import React, { useState } from 'react';
import { X, Mail, Lock, User, Building, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { login, signup, switchDemoAccount } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentType, setStudentType] = useState('hosteller');
  const [hostelBlock, setHostelBlock] = useState('Raman Hostel (Block B)');
  const [roomNumber, setRoomNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('B.Tech CSE');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup({
        name,
        email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@hiet.org`,
        studentType,
        hostelBlock,
        roomNumber,
        phone,
        branch
      });
    } else {
      login({ email: email || 'aarav.cse23@hiet.org' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            HIET Campus SSO (Demo Mode)
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {isSignup ? 'Create Campus Account' : 'Welcome to HIET Mart'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isSignup
              ? 'Join 2,400+ HIET students buying, selling, and ordering food daily.'
              : 'Sign in to access your student marketplace listings and canteen orders.'}
          </p>
        </div>

        {/* Quick Demo Login Pill Section (Huge for Hackathon judges!) */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <span>⚡ 1-Click Demo Profiles for Judges</span>
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                switchDemoAccount('user_aarav');
                onClose();
              }}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 hover:shadow-xs"
            >
              👨‍🎓 Aarav (Hosteller)
            </button>
            <button
              type="button"
              onClick={() => {
                switchDemoAccount('user_priya');
                onClose();
              }}
              className="p-2 text-left rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all font-medium text-slate-800 dark:text-slate-200 hover:shadow-xs"
            >
              👩‍🎓 Priya (Day Scholar)
            </button>
            <button
              type="button"
              onClick={() => {
                switchDemoAccount('vendor_canteen');
                onClose();
              }}
              className="p-2 text-left rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 font-semibold text-purple-700 dark:text-purple-300 hover:shadow-xs"
            >
              🍳 Canteen Vendor
            </button>
            <button
              type="button"
              onClick={() => {
                switchDemoAccount('vendor_stationery');
                onClose();
              }}
              className="p-2 text-left rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 font-semibold text-cyan-700 dark:text-cyan-300 hover:shadow-xs"
            >
              📚 Stationery Vendor
            </button>
          </div>
        </div>

        {/* Regular Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rohan Verma"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              College Email <span className="text-[11px] font-normal text-indigo-500">(@hiet.org preferred)</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname.branch@hiet.org"
                className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {isSignup && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Student Category
                  </label>
                  <select
                    value={studentType}
                    onChange={(e) => setStudentType(e.target.value)}
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="hosteller">Hosteller</option>
                    <option value="day_scholar">Day Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Branch & Year
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="B.Tech CSE - 2nd Yr"
                    className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {studentType === 'hosteller' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Hostel
                    </label>
                    <select
                      value={hostelBlock}
                      onChange={(e) => setHostelBlock(e.target.value)}
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Raman Hostel (Block A)">Raman Hostel (Block A)</option>
                      <option value="Raman Hostel (Block B)">Raman Hostel (Block B)</option>
                      <option value="Kalam Boys Hostel">Kalam Boys Hostel</option>
                      <option value="Kalpana Chawla Girls Hostel">Kalpana Chawla Girls Hostel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Room No.
                    </label>
                    <input
                      type="text"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                      placeholder="e.g. 304"
                      className="w-full text-xs py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Contact No.
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSignup ? 'Complete Registration' : 'Continue to Campus Mart'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isSignup ? 'Already have an account? Sign In' : "Don't have an account yet? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

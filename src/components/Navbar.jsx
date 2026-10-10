import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  UtensilsCrossed,
  BookOpen,
  PlusCircle,
  ClipboardList,
  Store,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { AuthModal } from './AuthModal';

export const Navbar = () => {
  const { currentUser, logout, switchDemoAccount } = useAuth();
  const { totalCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const navLinks = [
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Canteen', path: '/canteen', icon: UtensilsCrossed },
    { name: 'Stationery', path: '/stationery', icon: BookOpen },
    { name: 'My Orders', path: '/orders', icon: ClipboardList },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 to-cyan-500 text-lg">
                    H
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    HIET Campus Mart
                  </span>
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                    CodeArambh 2.0
                  </span>
                </div>
                <p className="hidden sm:block text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  Hi-Tech Institute of Engg & Tech, Ghaziabad
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}

              {/* Vendor Portal Link */}
              <NavLink
                to="/vendor"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 border ${
                    isActive
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/25'
                      : 'text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                  }`
                }
              >
                <Store className="w-3.5 h-3.5" />
                <span>Vendor Dashboard</span>
              </NavLink>
            </nav>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sell an Item CTA */}
              <Link
                to="/sell"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Sell Item</span>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-bounce">
                    {totalCount}
                  </span>
                )}
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>

              {/* User Account / Profile */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors border border-slate-200 dark:border-slate-800"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
                    />
                    <div className="hidden md:flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                        {currentUser.name}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
                        {currentUser.role === 'vendor' ? currentUser.shopType : currentUser.studentType?.replace('_', ' ')}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{currentUser.email}</p>
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5 font-medium">
                          {currentUser.hostelBlock || currentUser.branch}
                        </p>
                      </div>

                      <div className="px-2 py-1.5">
                        <Link
                          to="/my-listings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600"
                        >
                          <ShoppingBag className="w-4 h-4 text-slate-400" />
                          My Marketplace Listings
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600"
                        >
                          <ClipboardList className="w-4 h-4 text-slate-400" />
                          My Orders & History
                        </Link>
                      </div>

                      {/* Hackathon Demo Account Switcher Header */}
                      <div className="px-3 pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          Demo Switcher (for judges)
                        </p>
                        <div className="mt-1 flex flex-col gap-1">
                          <button
                            onClick={() => {
                              switchDemoAccount('user_aarav');
                              setProfileDropdownOpen(false);
                            }}
                            className="text-left px-2 py-1 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            👨‍🎓 Aarav (Student - Hosteller)
                          </button>
                          <button
                            onClick={() => {
                              switchDemoAccount('user_priya');
                              setProfileDropdownOpen(false);
                            }}
                            className="text-left px-2 py-1 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            👩‍🎓 Priya (Student - Day Scholar)
                          </button>
                          <button
                            onClick={() => {
                              switchDemoAccount('vendor_canteen');
                              setProfileDropdownOpen(false);
                              navigate('/vendor');
                            }}
                            className="text-left px-2 py-1 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-purple-600 dark:text-purple-400 font-semibold"
                          >
                            🍳 Ramesh Bhaiya (Canteen Staff)
                          </button>
                          <button
                            onClick={() => {
                              switchDemoAccount('vendor_stationery');
                              setProfileDropdownOpen(false);
                              navigate('/vendor');
                            }}
                            className="text-left px-2 py-1 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800 text-cyan-600 dark:text-cyan-400 font-semibold"
                          >
                            📚 Gupta Ji (Stationery Staff)
                          </button>
                        </div>
                      </div>

                      <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/20 text-sm mb-3"
            >
              <PlusCircle className="w-4 h-4" />
              Sell an Item on Campus
            </Link>

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 text-indigo-500" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}

            <NavLink
              to="/vendor"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50"
            >
              <Store className="w-5 h-5" />
              <span>Vendor / Staff Dashboard</span>
            </NavLink>

            <NavLink
              to="/my-listings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-500" />
              <span>My Listings</span>
            </NavLink>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {authModalOpen && <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />}
    </>
  );
};

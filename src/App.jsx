import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ItemDetailPage } from './pages/ItemDetailPage';
import { SellItemPage } from './pages/SellItemPage';
import { MyListingsPage } from './pages/MyListingsPage';
import { CanteenPage } from './pages/CanteenPage';
import { StationeryPage } from './pages/StationeryPage';
import { CartPage } from './pages/CartPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { VendorDashboardPage } from './pages/VendorDashboardPage';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <MarketplaceProvider>
            <CartProvider>
              <OrderProvider>
                <BrowserRouter>
                  <ScrollToTop />
                  <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/marketplace" element={<MarketplacePage />} />
                        <Route path="/marketplace/:id" element={<ItemDetailPage />} />
                        <Route path="/sell" element={<SellItemPage />} />
                        <Route path="/my-listings" element={<MyListingsPage />} />
                        <Route path="/canteen" element={<CanteenPage />} />
                        <Route path="/stationery" element={<StationeryPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/confirmation/:id" element={<OrderConfirmationPage />} />
                        <Route path="/orders" element={<MyOrdersPage />} />
                        <Route path="/vendor" element={<VendorDashboardPage />} />
                        <Route path="*" element={<HomePage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </BrowserRouter>
              </OrderProvider>
            </CartProvider>
          </MarketplaceProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

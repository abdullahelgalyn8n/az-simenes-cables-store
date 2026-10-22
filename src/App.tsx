/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LegalFaqPage } from './pages/LegalFaqPage';
import { CategorySlug } from './types/store';

const AppRouter: React.FC = () => {
  const { currentPath, toast } = useApp();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/shop') {
      return <ShopPage initialCategorySlug="all" />;
    }
    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '') as CategorySlug;
      return <ShopPage initialCategorySlug={slug} />;
    }
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.replace('/product/', '');
      return <ProductDetailPage productId={productId} />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/checkout') {
      return <CheckoutPage />;
    }
    if (currentPath === '/faq') {
      return <LegalFaqPage mode="faq" />;
    }
    if (currentPath === '/privacy') {
      return <LegalFaqPage mode="privacy" />;
    }
    if (currentPath === '/terms') {
      return <LegalFaqPage mode="terms" />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <CartDrawer />

      {/* Accessible Notification Toast */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#0F1D40] text-white px-4 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-extrabold text-white">{toast.message}</div>
            {toast.subtext && (
              <div className="text-slate-300 mt-0.5">{toast.subtext}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

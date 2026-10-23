import React, { useState } from 'react';
import {
  ChevronDown,
  Copy,
  Check,
  Menu,
  ShoppingBag,
  X,
  Share2,
} from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { SimenesLogo } from './ProductArtwork';
import { formatPriceEGP } from '../utils/catalogLogic';

export const Navbar: React.FC = () => {
  const { currentPath, cartTotals, setIsCartOpen, showToast } = useApp();
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  // Compute human-readable breadcrumb and dedicated URL display
  const getPageBreadcrumb = (): { label: string; parent?: { label: string; to: string } } => {
    if (currentPath === '/') return { label: 'الرئيسية' };
    if (currentPath === '/shop') return { label: 'جميع المنتجات' };
    if (currentPath === '/about') return { label: 'من نحن' };
    if (currentPath === '/contact') return { label: 'تواصل معنا' };
    if (currentPath === '/checkout') return { label: 'إتمام الطلب' };
    if (currentPath === '/faq') return { label: 'الأسئلة الشائعة' };
    if (currentPath === '/privacy') return { label: 'سياسة الخصوصية' };
    if (currentPath === '/terms') return { label: 'الشروط والأحكام' };

    if (currentPath.startsWith('/categories/')) {
      const slug = currentPath.replace('/categories/', '');
      const cat = CATEGORIES.find((c) => c.slug === slug);
      return {
        parent: { label: 'جميع المنتجات', to: '/shop' },
        label: cat ? cat.name : 'التصنيف',
      };
    }

    if (currentPath.startsWith('/product/')) {
      const id = currentPath.replace('/product/', '');
      const prod = PRODUCTS.find((p) => p.id === id);
      return {
        parent: { label: 'جميع المنتجات', to: '/shop' },
        label: prod ? prod.name : 'تفاصيل المنتج',
      };
    }

    return { label: 'صفحة الموقع' };
  };

  const handleCopyPageLink = () => {
    const fullUrl = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl).catch(() => {});
    }
    setCopiedUrl(true);
    showToast('تم نسخ رابط الصفحة بنجاح', fullUrl);
    window.setTimeout(() => setCopiedUrl(false), 2000);
  };

  const breadcrumb = getPageBreadcrumb();

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 md:gap-8">
          {/* Zone 1: Brand Title / Logo */}
          <AppLink
            to="/"
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-900 rounded-lg shrink-0"
            ariaLabel="سيمنز إيجيبت للكابلات الكهربائية - الرئيسية"
          >
            <SimenesLogo variant="light" size="md" />
          </AppLink>

          {/* Zone 2: 4-5 Concise Single-Line Nav Links */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden md:flex items-center gap-7 text-base font-bold text-slate-800"
          >
            <AppLink
              to="/"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                isActive('/')
                  ? 'text-blue-950 border-amber-500'
                  : 'text-slate-700 border-transparent hover:text-blue-950 hover:border-slate-300'
              }`}
            >
              الرئيسية
            </AppLink>

            <AppLink
              to="/shop"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                isActive('/shop')
                  ? 'text-blue-950 border-amber-500'
                  : 'text-slate-700 border-transparent hover:text-blue-950 hover:border-slate-300'
              }`}
            >
              المنتجات
            </AppLink>

            {/* Categories Dropdown with Dedicated Links */}
            <div
              className="relative"
              onMouseEnter={() => setCatDropdownOpen(true)}
              onMouseLeave={() => setCatDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCatDropdownOpen((v) => !v)}
                aria-expanded={catDropdownOpen}
                className={`inline-flex items-center gap-1.5 py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                  currentPath.startsWith('/categories/')
                    ? 'text-blue-950 border-amber-500'
                    : 'text-slate-700 border-transparent hover:text-blue-950 hover:border-slate-300'
                }`}
              >
                <span>التصنيفات</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    catDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {catDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-72 z-50">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-xl py-2 overflow-hidden">
                    <div className="px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-500">
                      أقسام المنتجات المتخصصة
                    </div>
                    {CATEGORIES.map((cat) => (
                      <AppLink
                        key={cat.slug}
                        to={`/categories/${cat.slug}`}
                        onClick={() => setCatDropdownOpen(false)}
                        className="flex flex-col px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                      >
                        <span className="text-sm font-bold text-slate-900">
                          {cat.name}
                        </span>
                        <span className="text-xs text-slate-600 line-clamp-1">
                          {cat.shortDesc}
                        </span>
                      </AppLink>
                    ))}
                    <div className="p-2 bg-slate-50 border-t border-slate-200">
                      <AppLink
                        to="/shop"
                        onClick={() => setCatDropdownOpen(false)}
                        className="block text-center py-1.5 text-xs font-bold text-blue-950 hover:text-amber-700 transition-colors"
                      >
                        عرض جميع المنتجات (24 منتج) ←
                      </AppLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <AppLink
              to="/about"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                isActive('/about')
                  ? 'text-blue-950 border-amber-500'
                  : 'text-slate-700 border-transparent hover:text-blue-950 hover:border-slate-300'
              }`}
            >
              من نحن
            </AppLink>

            <AppLink
              to="/contact"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                isActive('/contact')
                  ? 'text-blue-950 border-amber-500'
                  : 'text-slate-700 border-transparent hover:text-blue-950 hover:border-slate-300'
              }`}
            >
              تواصل معنا
            </AppLink>
          </nav>

          {/* Zone 3: 1 Primary Action (Cart Trigger + Mobile Drawer Button) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`سلة المشتريات (${cartTotals.itemsCount} منتجات)`}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 shrink-0" />
              <span>السلة</span>
              <span className="tabular-nums text-amber-300 font-mono text-xs">
                ({cartTotals.itemsCount})
              </span>
              <span className="hidden sm:inline text-slate-300" aria-hidden="true">
                |
              </span>
              <span className="hidden sm:inline tabular-nums text-xs text-white">
                {formatPriceEGP(cartTotals.subtotal)} ج.م
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              className="md:hidden p-2.5 rounded-xl border border-slate-300 text-slate-900 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 shadow-lg">
            <AppLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-bold text-sm ${
                isActive('/') ? 'bg-blue-950 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              الرئيسية
            </AppLink>
            <AppLink
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-bold text-sm ${
                isActive('/shop') ? 'bg-blue-950 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              جميع المنتجات (24 منتج)
            </AppLink>
            <div className="px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
              <div className="text-xs font-bold text-slate-500">الأقسام المخصصة:</div>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <AppLink
                    key={cat.slug}
                    to={`/categories/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-slate-800 hover:text-blue-950 py-1"
                  >
                    • {cat.name}
                  </AppLink>
                ))}
              </div>
            </div>
            <AppLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-bold text-sm ${
                isActive('/about') ? 'bg-blue-950 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              من نحن
            </AppLink>
            <AppLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg font-bold text-sm ${
                isActive('/contact') ? 'bg-blue-950 text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              تواصل معنا
            </AppLink>
          </div>
        )}
      </header>

      {/* Dedicated URL & Breadcrumb Bar on internal pages */}
      {currentPath !== '/' && (
        <div className="bg-slate-100 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <nav aria-label="مسار الصفحة" className="flex items-center gap-2 text-slate-700 font-medium">
              <AppLink to="/" className="hover:text-blue-950 font-bold transition-colors">
                الرئيسية
              </AppLink>
              <span aria-hidden="true" className="text-slate-400">
                /
              </span>
              {breadcrumb.parent && (
                <>
                  <AppLink
                    to={breadcrumb.parent.to}
                    className="hover:text-blue-950 font-bold transition-colors"
                  >
                    {breadcrumb.parent.label}
                  </AppLink>
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                </>
              )}
              <span className="text-slate-950 font-bold">{breadcrumb.label}</span>
            </nav>

            
          </div>
        </div>
      )}
    </>
  );
};

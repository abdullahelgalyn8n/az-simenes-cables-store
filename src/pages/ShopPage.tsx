import React, { useEffect, useState } from 'react';
import {
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  Search,
  Star,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { CategorySlug, FilterState, SortOption } from '../types/store';
import {
  DEFAULT_FILTER_STATE,
  filterAndSortProducts,
  formatPriceEGP,
} from '../utils/catalogLogic';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC<{ initialCategorySlug?: CategorySlug }> = ({
  initialCategorySlug = 'all',
}) => {
  const { navigate, searchParams } = useApp();

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...DEFAULT_FILTER_STATE,
    category: initialCategorySlug,
    searchQuery: searchParams.get('q') || '',
  }));

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sync category when route changes between /shop and /categories/:slug
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: initialCategorySlug,
    }));
  }, [initialCategorySlug]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === filters.category);
  const filteredProducts = filterAndSortProducts(PRODUCTS, filters);

  const handleCategorySelect = (cat: CategorySlug) => {
    if (cat === 'all') {
      navigate('/shop');
    } else {
      navigate(`/categories/${cat}`);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      ...DEFAULT_FILTER_STATE,
      category: 'all',
    });
    navigate('/shop');
  };

  return (
    <div className="pb-16">
      {/* Page Hero Header with Search Bar */}
      <section className="bg-[#112046] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {activeCategoryObj ? activeCategoryObj.name : 'جميع المنتجات'}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'تصفح الكتالوج الكامل لمؤسسة سيمنز إيجيبت للكابلات والأسلاك الكهربائية والتوريدات العمومية بأسعار المصنع'}
          </p>

          {/* Search Input Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-full shadow-lg overflow-hidden border-2 border-transparent focus-within:border-amber-400">
              <Search className="w-5 h-5 text-slate-500 mr-4 shrink-0" />
              <input
                type="search"
                value={filters.searchQuery}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                }
                placeholder="ابحث عن منتجات أو مقاسات (مثال: سلك مجدول 2.0، كابل مدرع 4×25)..."
                aria-label="ابحث عن منتجات"
                className="w-full py-3.5 px-3 text-sm font-medium text-slate-950 placeholder:text-slate-500 focus:outline-none"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, searchQuery: '' }))
                  }
                  aria-label="مسح البحث"
                  className="ml-3 p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Filter Sidebar (Right in RTL) + Products Grid (Left in RTL) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FILTER SIDEBAR */}
          <aside
            aria-label="فلترة المنتجات"
            className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 space-y-6 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 font-extrabold text-base text-slate-950">
                <Filter className="w-4 h-4 text-blue-950" />
                <span>فلترة المنتجات</span>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>مسح الفلاتر</span>
              </button>
            </div>

            {/* 1. Category Filter (Links to dedicated category URLs) */}
            <div className="space-y-3 pb-5 border-b border-slate-200">
              <h2 className="text-sm font-extrabold text-slate-950">الفئة</h2>
              <div className="space-y-2">
                <label className="flex items-center justify-between gap-2 cursor-pointer group">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="shop-category"
                      checked={filters.category === 'all'}
                      onChange={() => handleCategorySelect('all')}
                      className="w-4 h-4 accent-[#0F1D40] cursor-pointer"
                    />
                    <span
                      className={`text-xs font-bold ${
                        filters.category === 'all'
                          ? 'text-blue-950 font-extrabold'
                          : 'text-slate-700 group-hover:text-slate-950'
                      }`}
                    >
                      جميع الأقسام
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    ({PRODUCTS.length})
                  </span>
                </label>

                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
                  const isSelected = filters.category === cat.slug;
                  return (
                    <label
                      key={cat.slug}
                      className="flex items-center justify-between gap-2 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="shop-category"
                          checked={isSelected}
                          onChange={() => handleCategorySelect(cat.slug)}
                          className="w-4 h-4 accent-[#0F1D40] cursor-pointer"
                        />
                        <span
                          className={`text-xs font-bold ${
                            isSelected
                              ? 'text-blue-950 font-extrabold'
                              : 'text-slate-700 group-hover:text-slate-950'
                          }`}
                        >
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 tabular-nums">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. Price Range Filter */}
            <div className="space-y-3 pb-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-slate-950">نطاق السعر</h2>
                <span className="text-xs font-mono font-bold text-blue-950 tabular-nums">
                  {formatPriceEGP(filters.minPrice)} - {formatPriceEGP(filters.maxPrice)} ج.م
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="22000"
                step="100"
                value={filters.maxPrice}
                aria-label="الحد الأقصى للسعر"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full accent-[#0F1D40] cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label
                    htmlFor="min-price-input"
                    className="block text-[11px] font-bold text-slate-600 mb-1"
                  >
                    من (ج.م)
                  </label>
                  <input
                    id="min-price-input"
                    type="number"
                    min="0"
                    max="22000"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: Math.max(0, Number(e.target.value) || 0),
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-950 tabular-nums"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-price-input"
                    className="block text-[11px] font-bold text-slate-600 mb-1"
                  >
                    إلى (ج.م)
                  </label>
                  <input
                    id="max-price-input"
                    type="number"
                    min="0"
                    max="22000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: Math.max(0, Number(e.target.value) || 22000),
                      }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-950 tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* 3. Rating Filter */}
            <div className="space-y-2.5 pb-5 border-b border-slate-200">
              <h2 className="text-sm font-extrabold text-slate-950">التقييم</h2>
              {[4.5, 4.0, 0].map((minR) => (
                <label
                  key={minR}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="rating-filter"
                      checked={filters.minRating === minR}
                      onChange={() =>
                        setFilters((prev) => ({ ...prev, minRating: minR }))
                      }
                      className="w-4 h-4 accent-[#0F1D40] cursor-pointer"
                    />
                    {minR === 0 ? (
                      <span className="text-xs font-bold text-slate-700">
                        جميع التقييمات
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span className="text-xs font-bold text-slate-800 tabular-nums">
                          {minR} فأكثر
                        </span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* 4. Special Checkboxes */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-slate-950">فلاتر خاصة</h2>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onlyInStock}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      onlyInStock: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded accent-[#0F1D40] cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  متوفر في المخزون فقط
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onlyOnSale}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      onlyOnSale: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded accent-[#0F1D40] cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  عروض وتخفيضات
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.onlyFeatured}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      onlyFeatured: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded accent-[#0F1D40] cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  منتجات مميزة فقط
                </span>
              </label>
            </div>
          </aside>

          {/* PRODUCTS LISTING COLUMN */}
          <div className="lg:col-span-9 space-y-6">
            {/* Toolbar: Count, Sort, View Toggle */}
            <div className="bg-white rounded-2xl border border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <span className="tabular-nums text-blue-950">
                  {filteredProducts.length}
                </span>
                <span>منتج متاح</span>
                {activeCategoryObj && (
                  <span className="text-xs font-semibold text-slate-600">
                    في قسم "{activeCategoryObj.name}"
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <label htmlFor="sort-select" className="text-xs font-bold text-slate-700">
                  الترتيب:
                </label>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SortOption,
                    }))
                  }
                  className="px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-900 cursor-pointer"
                >
                  <option value="newest">الأحدث والأكثر طلباً</option>
                  <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
                  <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
                  <option value="discount-desc">الأعلى خصماً</option>
                  <option value="rating-desc">الأعلى تقييماً</option>
                </select>

                <div className="flex items-center rounded-xl border border-slate-300 p-1 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    aria-label="عرض شبكي"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#0F1D40] text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    aria-label="عرض قائمة"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#0F1D40] text-white'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <h3 className="text-lg font-extrabold text-slate-950">
                  لا توجد منتجات مطابقة لشروط البحث الحالية
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  جرب تغيير نطاق السعر أو البحث بكلمة أخرى أو استعراض جميع الأقسام.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#0F1D40] text-white text-xs font-extrabold hover:bg-[#1E3A8A] transition-colors cursor-pointer"
                >
                  إعادة ضبط جميع الفلاتر
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="list" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

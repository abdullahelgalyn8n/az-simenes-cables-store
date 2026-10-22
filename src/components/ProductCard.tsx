import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types/store';
import { AppLink, useApp } from '../context/AppContext';
import { ProductArtwork } from './ProductArtwork';
import { formatPriceEGP } from '../utils/catalogLogic';

export const ProductCard: React.FC<{
  product: Product;
  layout?: 'grid' | 'list';
}> = ({ product, layout = 'grid' }) => {
  const { addToCart } = useApp();

  if (layout === 'list') {
    return (
      <article className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all duration-150 overflow-hidden flex flex-col sm:flex-row items-stretch">
        <AppLink
          to={`/product/${product.id}`}
          className="relative sm:w-64 aspect-4/3 sm:aspect-auto bg-slate-100 shrink-0 overflow-hidden block group"
        >
          <ProductArtwork
            variant={product.artworkVariant}
            crossSection={product.specs.crossSection}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-mono font-extrabold text-xs px-2.5 py-1 rounded-md shadow-xs tabular-nums">
              -{product.discountPercent}%
            </span>
          )}
        </AppLink>

        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div>
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 mb-1.5">
              <span>{product.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span>{product.specs.crossSection}</span>
              <span aria-hidden="true">·</span>
              <span>{product.specs.unitLabel}</span>
            </div>

            <AppLink
              to={`/product/${product.id}`}
              className="block text-lg font-extrabold text-slate-950 hover:text-blue-900 transition-colors"
            >
              {product.name}
            </AppLink>
            <p className="text-sm text-slate-700 mt-1 line-clamp-2">
              {product.subtitle} — {product.specs.copperPurity}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex items-baseline gap-2.5">
              <span className="text-xl font-extrabold text-slate-950 tabular-nums">
                {formatPriceEGP(product.price)} ج.م
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-slate-500 line-through tabular-nums font-medium">
                  {formatPriceEGP(product.originalPrice)} ج.م
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <AppLink
                to={`/product/${product.id}`}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                المواصفات الفنية
              </AppLink>
              <button
                type="button"
                onClick={() => addToCart(product, product.minOrderQty)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>أضف للسلة</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-150 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Product Studio Image Container (4:3) */}
        <AppLink
          to={`/product/${product.id}`}
          className="relative aspect-4/3 bg-slate-100 block overflow-hidden border-b border-slate-100"
        >
          <ProductArtwork
            variant={product.artworkVariant}
            crossSection={product.specs.crossSection}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
          />
          {product.discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 font-mono font-extrabold text-xs px-2.5 py-1 rounded-md shadow-xs tabular-nums">
              -{product.discountPercent}%
            </span>
          )}
        </AppLink>

        {/* Card Content */}
        <div className="p-4 sm:p-5">
          {/* Rating & Category Unboxed Metadata Row */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-600 font-semibold mb-2">
            <div className="flex items-center gap-1.5 truncate">
              <span>{product.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-800 font-bold">{product.specs.crossSection}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <AppLink
            to={`/product/${product.id}`}
            className="block text-base font-extrabold text-slate-950 hover:text-blue-900 transition-colors leading-snug line-clamp-1 mb-1"
          >
            {product.name}
          </AppLink>

          {/* Short Spec Kicker */}
          <p className="text-xs text-slate-600 line-clamp-1">
            {product.subtitle}
          </p>
        </div>
      </div>

      {/* Price & Action Footer */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-950 tabular-nums">
              {formatPriceEGP(product.price)} <span className="text-xs font-bold">ج.م</span>
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-500 line-through tabular-nums font-medium">
                {formatPriceEGP(product.originalPrice)} ج.م
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-600 font-medium">
            {product.specs.unitLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, product.minOrderQty)}
          aria-label={`أضف ${product.name} إلى السلة`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
          <span>أضف للسلة</span>
        </button>
      </div>
    </article>
  );
};

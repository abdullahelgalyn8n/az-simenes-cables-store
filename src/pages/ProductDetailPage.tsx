import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { COMPANY_INFO, PRODUCTS } from '../data/products';
import { ProductArtwork } from '../components/ProductArtwork';
import { ProductCard } from '../components/ProductCard';
import { formatPriceEGP } from '../utils/catalogLogic';

export const ProductDetailPage: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const { addToCart, setIsCartOpen } = useApp();
  const product = PRODUCTS.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState<string>(
    product?.availableColors[0]?.name || 'قياسي'
  );
  const [quantity, setQuantity] = useState<number>(product?.minOrderQty || 1);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.availableColors[0]?.name || 'قياسي');
      setQuantity(product.minOrderQty || 1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <h1 className="text-2xl font-extrabold text-slate-950">
          المنتج المطلوب غير موجود
        </h1>
        <p className="text-sm text-slate-600">
          ربما تم نقل هذا المنتج أو تغيير الرابط الخاص به. يمكنك تصفح كافة المنتجات من الكتالوج.
        </p>
        <AppLink
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F1D40] text-white text-sm font-extrabold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى جميع المنتجات</span>
        </AppLink>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const lineTotal = product.price * quantity;
  const lineSavings = (product.originalPrice - product.price) * quantity;

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    setIsCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Main Contiguous Purchase Module */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Product Visual Column */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-28">
            <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <ProductArtwork
                variant={product.artworkVariant}
                crossSection={product.specs.crossSection}
                className="w-full h-full object-cover"
              />
              {product.discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-mono font-extrabold text-sm px-3 py-1.5 rounded-lg shadow-xs tabular-nums">
                  وفر {product.discountPercent}%
                </span>
              )}
            </div>

            {/* Trust Highlights under image */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-extrabold text-slate-950">نقاوة النحاس</div>
                <div className="text-xs font-mono font-bold text-blue-900 mt-0.5">
                  99.9% نقي
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-extrabold text-slate-950">الضمان المعتمد</div>
                <div className="text-xs font-bold text-blue-900 mt-0.5 tabular-nums">
                  {product.specs.warrantyYears} سنوات
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-extrabold text-slate-950">كود الصنف</div>
                <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                  {product.sku}
                </div>
              </div>
            </div>
          </div>

          {/* Contiguous Purchase & Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Unboxed Metadata Kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600 mb-2">
                <AppLink
                  to={`/categories/${product.category}`}
                  className="text-blue-900 hover:underline"
                >
                  {product.categoryName}
                </AppLink>
                <span aria-hidden="true">·</span>
                <span>كود: {product.sku}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-extrabold">
                  متوفر في المخزون ({product.stockCount} وحدة)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                {product.subtitle}
              </p>

              {/* Rating Row */}
              <div className="flex items-center gap-2 mt-3 text-xs font-bold text-slate-800">
                <div className="flex items-center gap-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span className="tabular-nums font-extrabold text-slate-950">
                    {product.rating}
                  </span>
                </div>
                <span className="text-slate-500">
                  ({product.reviewsCount} تقييم معتمد من عملاء ومقاولين)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-600 mb-1">
                  السعر ({product.specs.unitLabel}):
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-950 tabular-nums">
                    {formatPriceEGP(product.price)}{' '}
                    <span className="text-base font-bold">ج.م</span>
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-base text-slate-500 line-through tabular-nums font-semibold">
                      {formatPriceEGP(product.originalPrice)} ج.م
                    </span>
                  )}
                </div>
              </div>

              {lineSavings > 0 && (
                <div className="text-left">
                  <span className="text-xs font-extrabold text-emerald-800 block">
                    إجمالي توفيرك في هذه الكمية:
                  </span>
                  <span className="text-base font-extrabold text-emerald-800 tabular-nums">
                    {formatPriceEGP(lineSavings)} ج.م
                  </span>
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-2.5">
              <label className="block text-xs font-extrabold text-slate-900">
                اللون المختار: <span className="text-blue-900">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.availableColors.map((col) => {
                  const active = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => setSelectedColor(col.name)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'border-[#0F1D40] bg-blue-50/70 text-slate-950 ring-2 ring-[#0F1D40]/20'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Total Calculator */}
            <div className="space-y-2.5">
              <label className="block text-xs font-extrabold text-slate-900">
                الكمية المطلوبة ({product.specs.unitLabel}):
              </label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center rounded-xl border border-slate-300 bg-white">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.max(product.minOrderQty, q - 1))
                    }
                    aria-label="تقليل الكمية"
                    className="p-3 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQty}
                    value={quantity}
                    aria-label="الكمية"
                    onChange={(e) =>
                      setQuantity(
                        Math.max(product.minOrderQty, Number(e.target.value) || 1)
                      )
                    }
                    className="w-16 text-center text-sm font-extrabold text-slate-950 tabular-nums focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="زيادة الكمية"
                    className="p-3 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm font-bold text-slate-800">
                  الإجمالي للكمية:{' '}
                  <span className="text-lg font-extrabold text-blue-950 tabular-nums">
                    {formatPriceEGP(lineTotal)} ج.م
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product, quantity, selectedColor)}
                className="py-3.5 px-6 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                <span>أضف إلى السلة</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>شراء فوري وإتمام الطلب</span>
              </button>
            </div>

            {/* Key Product Highlights */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h2 className="text-xs font-extrabold text-slate-900">
                مميزات هذا المنتج:
              </h2>
              <ul className="space-y-1.5">
                {product.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct WhatsApp Inquiry */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-100">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Truck className="w-4 h-4 text-blue-900" />
                توصيل سريع خلال 24-48 ساعة لجميع المحافظات
              </span>
              <a
                href={`https://wa.me/201124111975?text=${encodeURIComponent(
                  `مرحباً سيمنز إيجيبت، أود الاستفسار عن: ${product.name} (${product.sku})`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-extrabold text-emerald-800 hover:underline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>اسأل مهندس المبيعات عبر واتساب ({COMPANY_INFO.phonePrimary})</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Datasheet Table */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <ShieldCheck className="w-6 h-6 text-blue-950" />
          <h2 className="text-xl font-extrabold text-slate-950">
            جدول المواصفات الفنية والقياسية
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
          {[
            { label: 'اسم الصنف', value: product.name },
            { label: 'كود المنتج (SKU)', value: product.sku },
            { label: 'مقاس مساحة المقطع', value: product.specs.crossSection },
            { label: 'الجهد الكهربي المقنن', value: product.specs.voltageRating },
            { label: 'نقاوة الموصل النحاسي', value: product.specs.copperPurity },
            { label: 'نوع الموصل والشعيرات', value: product.specs.conductorType },
            { label: 'مادة العزل والتغليف', value: product.specs.insulationMaterial },
            { label: 'المواصفة القياسية المعتمدة', value: product.specs.standardCode },
            { label: 'وحدة القياس والتوريد', value: product.specs.unitLabel },
            { label: 'الوزن القياسي التقريبي', value: product.specs.weightApprox },
          ].map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80"
            >
              <span className="font-bold text-slate-600">{row.label}</span>
              <span className="font-extrabold text-slate-950 text-left tabular-nums">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-950">
              منتجات ذات صلة من قسم {product.categoryName}
            </h2>
            <AppLink
              to={`/categories/${product.category}`}
              className="text-xs font-extrabold text-blue-950 hover:text-amber-700"
            >
              عرض كل القسم ←
            </AppLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

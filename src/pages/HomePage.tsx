import React, { useState } from 'react';
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  CreditCard,
  Headphones,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import { AppLink } from '../context/AppContext';
import { CATEGORIES, COMPANY_INFO, PRODUCTS, TESTIMONIALS } from '../data/products';
import { CategorySlug } from '../types/store';
import { ProductArtwork } from '../components/ProductArtwork';
import { ProductCard } from '../components/ProductCard';
import {
  calculateCableRecommendation,
  formatPriceEGP,
} from '../utils/catalogLogic';

export const HomePage: React.FC = () => {
  const [activeHomeCategory, setActiveHomeCategory] = useState<CategorySlug>('all');

  // Interactive Cable Sizing Calculator state
  const [loadKw, setLoadKw] = useState<number>(5.5);
  const [phases, setPhases] = useState<1 | 3>(1);
  const [distanceMeters, setDistanceMeters] = useState<number>(25);

  const calcResult = calculateCableRecommendation(loadKw, phases, distanceMeters);
  const recommendedProducts = PRODUCTS.filter((p) =>
    calcResult.recommendedProductIds.includes(p.id)
  );

  const homeDisplayedProducts =
    activeHomeCategory === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeHomeCategory).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION + TRUST BAR */}
      <section className="bg-[#0B1736] text-white relative overflow-hidden border-b border-slate-800">
        {/* Subtle industrial background grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #FACC15 0%, transparent 45%), radial-gradient(circle at 80% 70%, #1E40AF 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Typography Column */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>عروض حصرية من المصنع مباشرة · نحاس إلكتروليتي نقي 99.9%</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.18] tracking-tight text-white">
                كابلات وأسلاك{' '}
                <span className="text-amber-400">بأعلى جودة</span>{' '}
                للمشاريع والمقاولات
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                اكتشف مجموعتنا المتكاملة من الكابلات النحاسية، الأسلاك المجدولة والمرنة، الكابلات المدرعة المسلحة، ولوحات التوزيع المعتمدة وفق المواصفات القياسية المصرية بأسعار لا تقاوم.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <AppLink
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition-colors shadow-md whitespace-nowrap shrink-0"
                >
                  <span>تسوق الآن (24 منتج)</span>
                  <ArrowLeft className="w-4 h-4" />
                </AppLink>

                <AppLink
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/25 font-bold text-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <span>طلب عرض سعر للمشاريع</span>
                </AppLink>
              </div>

              {/* Unboxed Hero Trust Proof */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold text-slate-200 border-t border-white/15">
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-400" />
                  شحن مجاني فوق 500 ج.م
                </span>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  ضمان شامل 10 إلى 20 سنة
                </span>
                <span aria-hidden="true" className="text-slate-500">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  طول فعلي 100 متر صافي
                </span>
              </div>
            </div>

            {/* Hero Visual Showcase Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 rounded-2xl border border-slate-700 p-4 shadow-2xl">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 relative">
                  <ProductArtwork
                    variant="wire-spool-2.0"
                    crossSection="2.0 مم²"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 left-3 bg-[#0F1D40]/95 backdrop-blur-xs text-white p-3.5 rounded-xl border border-slate-700 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-amber-300 font-bold">
                        الأكثر مبيعاً في مصر
                      </div>
                      <div className="text-sm font-extrabold">
                        سلك مجدول 2.0 مم² - لفة 100 متر
                      </div>
                    </div>
                    <AppLink
                      to="/product/sec-wire-2-0"
                      className="px-3.5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs whitespace-nowrap shrink-0 tabular-nums"
                    >
                      1,215 ج.م
                    </AppLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Service & Guarantee Strip */}
        <div className="bg-white text-slate-900 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950">شحن مجاني</h2>
                  <p className="text-xs text-slate-600">للطلبات فوق 500 جنيه</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-950 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950">دفع مرن</h2>
                  <p className="text-xs text-slate-600">عند الاستلام أو تحويل بنكي</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950">دعم على مدار الساعة</h2>
                  <p className="text-xs text-slate-600">فريق دعم هندسي متخصص</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-950 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-950">إرجاع سهل</h2>
                  <p className="text-xs text-slate-600">سياسة إرجاع واستبدال 30 يوم</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES SECTION (Dedicated route for each category) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            أقسام المنتجات
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            اختر من بين تشكيلة واسعة من الكابلات والأسلاك المعتمدة — كل قسم له صفحة مخصصة ورابط مستقل
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            const sampleVariant =
              cat.slug === 'copper-cables'
                ? 'copper-multicore'
                : cat.slug === 'electrical-wires'
                ? 'wire-spool-1.5'
                : cat.slug === 'armored-cables'
                ? 'armored-4x25'
                : cat.slug === 'electrical-conduits'
                ? 'upvc-conduit'
                : 'panel-12';

            return (
              <AppLink
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-900 p-4 text-center transition-all hover:-translate-y-0.5 flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-amber-400 mb-3.5 bg-slate-100 shrink-0">
                  <ProductArtwork
                    variant={sampleVariant}
                    crossSection={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-base font-extrabold text-slate-950 group-hover:text-blue-900 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {cat.shortDesc}
                </p>
                <span className="mt-3 text-xs font-bold text-blue-900 tabular-nums">
                  {count} منتجات متوفرة ←
                </span>
              </AppLink>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED & CATEGORIZED PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              منتجات مميزة وتشكيلة المصنع
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              جميع المقاسات متوفرة للتسليم الفوري بضمان نقاوة النحاس 99.9%
            </p>
          </div>

          <AppLink
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-950 hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
          >
            <span>عرض جميع المنتجات ({PRODUCTS.length} منتج)</span>
            <ArrowLeft className="w-4 h-4" />
          </AppLink>
        </div>

        {/* Interactive Segmented Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="تصفية المنتجات المميزة حسب القسم"
          className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl mb-8 overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeHomeCategory === 'all'}
            onClick={() => setActiveHomeCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeHomeCategory === 'all'
                ? 'bg-[#0F1D40] text-white shadow-xs'
                : 'text-slate-800 hover:bg-white/60'
            }`}
          >
            الكل ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                type="button"
                role="tab"
                aria-selected={activeHomeCategory === cat.slug}
                onClick={() => setActiveHomeCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeHomeCategory === cat.slug
                    ? 'bg-[#0F1D40] text-white shadow-xs'
                    : 'text-slate-800 hover:bg-white/60'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeDisplayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNERS (FIXED HIGH CONTRAST IN LIGHT MODE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Special Offers */}
          <div className="bg-[#0F1D40] text-white rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-400">
                تخفيضات الموسم للمشاريع
              </span>
              <h3 className="text-2xl font-extrabold text-white">عروض خاصة</h3>
              <p className="text-sm text-slate-300">
                لا تفوت فرصة التوفير على الكابلات النحاسية متعددة الأقطاب
              </p>
              <div className="text-3xl font-extrabold text-amber-400 pt-1 tabular-nums">
                30% خصم فوري
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-300">كابلات نحاس 3×3 إلى 4×16</span>
              <AppLink
                to="/categories/copper-cables"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>تسوق العروض</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </AppLink>
            </div>
          </div>

          {/* Card 2: Armored Cables */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-amber-400">
                خصم حصري للمقاولات
              </span>
              <h3 className="text-2xl font-extrabold text-white">الكابلات المدرعة</h3>
              <p className="text-sm text-slate-300">
                كابلات قوى مسلحة بشرائط الصلب للدفن المباشر والمصانع
              </p>
              <div className="text-3xl font-extrabold text-amber-400 pt-1 tabular-nums">
                خصم حتى 30%
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/10">
              <span className="text-xs text-slate-300">مقاسات 3×16 حتى 4×50 مم²</span>
              <AppLink
                to="/categories/armored-cables"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>تصفح المدرع</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </AppLink>
            </div>
          </div>

          {/* Card 3: New Arrivals (HIGH CONTRAST Dark Navy Text on Golden Amber Background!) */}
          <div className="bg-amber-400 text-slate-950 rounded-2xl p-6 sm:p-7 border border-amber-500 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-blue-950">
                تشكيلة جديدة معتمدة
              </span>
              <h3 className="text-2xl font-extrabold text-slate-950">وصل حديثاً</h3>
              <p className="text-sm text-slate-900 font-medium">
                لوحات توزيع بنسبار نحاس أصلي ومواسير UPVC مقاومة للحريق
              </p>
              <div className="text-2xl font-extrabold text-blue-950 pt-1">
                ضمان حتى 15 عاماً
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-950/15">
              <span className="text-xs font-bold text-slate-900">
                لوحات 12 و 24 خط + مواسير
              </span>
              <AppLink
                to="/categories/distribution-boards"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F1D40] hover:bg-slate-900 text-white font-extrabold text-xs transition-colors whitespace-nowrap shrink-0"
              >
                <span>اكتشف الجديد</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ENGINEERING CABLE SIZING CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-900">
                <Calculator className="w-4 h-4 text-amber-600" />
                <span>أداة هندسية مجانية من سيمنز إيجيبت</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950">
                حاسبة اختيار مقاس السلك والكابل المناسب
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                أدخل قدرة الحمل بالكيلووات (أو قدرة التكييف/المعدات) وطول المسار ليقوم النظام بحساب التيار بالـ أمبير ومقاس النحاس الموصى به لمنع هبوط الجهد أو سخونة الكابل.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label
                    htmlFor="calc-kw"
                    className="block text-xs font-extrabold text-slate-900 mb-1.5"
                  >
                    قدرة الحمل الكهربي (كيلووات kW):{' '}
                    <span className="font-mono text-blue-900 tabular-nums">{loadKw} kW</span>
                  </label>
                  <input
                    id="calc-kw"
                    type="range"
                    min="1"
                    max="80"
                    step="0.5"
                    value={loadKw}
                    onChange={(e) => setLoadKw(Number(e.target.value))}
                    className="w-full accent-[#0F1D40] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600 font-mono tabular-nums mt-1">
                    <span>1 kW (إنارة)</span>
                    <span>5 kW (تكييف/سخان)</span>
                    <span>25 kW (شقة/فيلا)</span>
                    <span>80 kW (مصنع)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="calc-phases"
                      className="block text-xs font-extrabold text-slate-900 mb-1.5"
                    >
                      نوع التغذية (الفاز)
                    </label>
                    <select
                      id="calc-phases"
                      value={phases}
                      onChange={(e) => setPhases(Number(e.target.value) as 1 | 3)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 text-xs font-bold"
                    >
                      <option value={1}>وجه واحد (220V سنجل فاز)</option>
                      <option value={3}>ثلاثة أوجه (380V ثلاثة فاز)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="calc-distance"
                      className="block text-xs font-extrabold text-slate-900 mb-1.5"
                    >
                      طول المسار (متر)
                    </label>
                    <input
                      id="calc-distance"
                      type="number"
                      min="1"
                      max="400"
                      value={distanceMeters}
                      onChange={(e) => setDistanceMeters(Number(e.target.value) || 10)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-slate-50 text-slate-950 text-sm font-bold tabular-nums"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation Result Panel */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-600 font-semibold">التيار المتوقع</div>
                  <div className="text-xl font-extrabold text-slate-950 font-mono tabular-nums mt-1">
                    {calcResult.estimatedCurrentAmps} A
                  </div>
                </div>
                <div className="bg-[#0F1D40] text-white p-3.5 rounded-xl">
                  <div className="text-xs text-amber-300 font-bold">مقاس النحاس الموصى به</div>
                  <div className="text-xl font-extrabold text-white font-mono tabular-nums mt-1">
                    {calcResult.recommendedCrossSectionMm2} مم²
                  </div>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-xs text-slate-600 font-semibold">نسبة هبوط الجهد</div>
                  <div className="text-xl font-extrabold text-emerald-800 font-mono tabular-nums mt-1">
                    {calcResult.voltageDropPercent}%
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{calcResult.applicationAdvice}</span>
              </div>

              <div className="space-y-2.5">
                <div className="text-xs font-extrabold text-slate-700">
                  المنتجات المطابقة من كتالوج سيمنز إيجيبت:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recommendedProducts.map((prod) => (
                    <AppLink
                      key={prod.id}
                      to={`/product/${prod.id}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-blue-900 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-slate-950 truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] text-slate-600 tabular-nums font-bold mt-0.5">
                          {formatPriceEGP(prod.price)} ج.م · {prod.specs.unitLabel}
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-blue-900 shrink-0">
                        عرض ←
                      </span>
                    </AppLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS (100% FIXED HIGH CONTRAST IN LIGHT MODE) */}
      <section className="bg-slate-100 py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              آراء عملائنا
            </h2>
            <p className="text-sm text-slate-700 mt-2">
              ماذا يقول المهندسون والمقاولون وتجار الكهرباء عن تجربتهم مع مؤسسة سيمنز إيجيبت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  {/* Stars */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5" aria-label={`تقييم ${item.rating} من 5`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-500"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {item.governorate}
                    </span>
                  </div>

                  {/* Crisp High-Contrast Testimonial Text (Dark Slate-800 on White) */}
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="font-extrabold text-sm text-slate-950">
                    {item.authorName}
                  </div>
                  <div className="text-xs text-slate-700 font-semibold mt-0.5">
                    {item.role} · {item.company}
                  </div>
                  <div className="text-[11px] text-blue-900 font-bold mt-1.5">
                    توريد معتمد: {item.verifiedPurchase}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F1D40] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-right max-w-2xl">
            <span className="text-xs font-extrabold text-amber-400">
              توريدات المشاريع والمقاولات العمومية
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              خصم يصل إلى <span className="text-amber-400">30%</span> على طلبات الجملة
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              فريقنا الهندسي جاهز لتجهيز وتسعير مقايسات المشاريع السكنية والصناعية والتوريد الفوري من مخازننا بشبرا الخيمة لجميع محافظات مصر.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <AppLink
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition-colors whitespace-nowrap"
            >
              <span>تسوق العروض الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </AppLink>
            <a
              href={`tel:${COMPANY_INFO.phonePrimary}`}
              dir="ltr"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-mono font-bold text-sm transition-colors whitespace-nowrap tabular-nums"
            >
              <span>{COMPANY_INFO.phonePrimary}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

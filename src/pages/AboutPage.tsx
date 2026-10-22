import React from 'react';
import {
  Award,
  CheckCircle2,
  Eye,
  Heart,
  Phone,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { AppLink } from '../context/AppContext';
import { COMPANY_INFO } from '../data/products';
import { ProductArtwork } from '../components/ProductArtwork';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-[#112046] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            من نحن
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            تعرف أكثر على قصتنا ورسالتنا في مؤسسة سيمنز إيجيبت للكابلات الكهربائية
          </p>
        </div>
      </section>

      {/* Main Story & 2x2 Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Right Column in RTL: Story & 4 Pillars */}
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              من نحن
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              <strong className="text-slate-950 font-extrabold">
                {COMPANY_INFO.fullTitle}
              </strong>{' '}
              هي واحدة من أبرز المؤسسات المتخصصة في مجال الكابلات والأسلاك الكهربائية في مصر. نقدم منتجات عالية الجودة مصممة على أعلى المعايير العالمية لتلبية احتياجات السوق المصري والعربي.
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              نحن نؤمن بأن الأمان الكهربائي هو أساس كل مشروع ناجح، ولذلك نحرص على تقديم أسلاك وكابلات تتحمل أقسى الظروف وتوفر حماية كاملة من أي مخاطر محتملة. منتجاتنا توفر عليك الصيانة المستمرة والتبديل المتكرر.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              {[
                { icon: Shield, title: 'أمان مطلق وعزل حراري فائق' },
                { icon: Award, title: 'جودة عالمية ومواصفات قياسية' },
                { icon: Zap, title: 'نحاس أحمر إلكتروليتي نقي 99.9%' },
                { icon: CheckCircle2, title: 'ضمان شامل يصل إلى 20 عاماً' },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-950 text-amber-400 flex items-center justify-center shrink-0">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {pillar.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Left Column in RTL: 2x2 Factory Product Collage */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <ProductArtwork variant="copper-multicore" crossSection="4×16 مم²" />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <ProductArtwork variant="wire-spool-1.5" crossSection="1.5 مم²" />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <ProductArtwork variant="wire-spool-4.0" crossSection="4.0 مم²" />
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <ProductArtwork variant="armored-4x25" crossSection="4×25 مم²" />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Quantitative Stats Section */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '1000+', label: 'عميل راضي من المقاولين والتجار' },
              { icon: Award, value: '50+', label: 'مشروع قومي وسكني منجز' },
              { icon: Zap, value: '99.9%', label: 'نقاوة النحاس الأحمر' },
              { icon: TrendingUp, value: '10+', label: 'سنوات خبرة في السوق المصري' },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#0F1D40] text-amber-400 flex items-center justify-center mx-auto">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Simenes Egypt (Mission / Vision / Values) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            لماذا تختار سيمنز إيجيبت؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="bg-white rounded-2xl border border-slate-200 p-7 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-blue-950 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">مهمتنا</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              توفير أفضل أنواع الكابلات والأسلاك الكهربائية بأسعار تنافسية مع الحفاظ على أعلى معايير الجودة والأمان. نسعى لأن نكون الاختيار الأول لكل مقاول وفني كهرباء في مصر.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-7 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-blue-950 flex items-center justify-center mx-auto">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">رؤيتنا</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              أن نكون المؤسسة الرائدة في مجال توريد الكابلات والأسلاك الكهربائية في مصر والشرق الأوسط، مع التزامنا الدائم بالابتكار والجودة وخدمة العملاء المتميزة.
            </p>
          </article>

          <article className="bg-white rounded-2xl border border-slate-200 p-7 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-blue-950 flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">قيمنا</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              الجودة هي أساس كل ما نقدمه. نلتزم بالأمانة والشفافية في تعاملاتنا، ونضع سلامة عملائنا في المقام الأول. نحاسنا نقي بنسبة 99.9% ومنتجاتنا مصنعة وفق أعلى المعايير العالمية.
            </p>
          </article>
        </div>
      </section>

      {/* Featured Flagship Products Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            منتجاتنا المتميزة
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            تشكيلة واسعة من الكابلات والأسلاك الكهربائية بمختلف الأحجام والأنواع لتلبية جميع احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              to: '/product/sec-wire-1-5',
              variant: 'wire-spool-1.5' as const,
              crossSection: '1.5 مم²',
              title: 'سلك مجدول 1.5 مم²',
              desc: 'نحاس نقي 99.9% - 450/750V - صناعة مصرية',
            },
            {
              to: '/product/sec-wire-2-0',
              variant: 'wire-spool-2.0' as const,
              crossSection: '2.0 مم²',
              title: 'سلك مجدول 2.0 مم²',
              desc: 'مقاسات متعددة - جودة عالية - متوفر بجميع الألوان',
            },
            {
              to: '/categories/armored-cables',
              variant: 'armored-4x25' as const,
              crossSection: '4×25 مم²',
              title: 'كابلات مدرعة',
              desc: 'كابلات شديدة التحمل للمشاريع الكبيرة والمقاولات',
            },
          ].map((item, i) => (
            <AppLink
              key={i}
              to={item.to}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-blue-900 transition-all"
            >
              <div className="aspect-4/3 bg-slate-100 overflow-hidden">
                <ProductArtwork
                  variant={item.variant}
                  crossSection={item.crossSection}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                />
              </div>
              <div className="p-5 text-right">
                <h3 className="text-base font-extrabold text-slate-950 group-hover:text-blue-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
              </div>
            </AppLink>
          ))}
        </div>
      </section>

      {/* Bottom Project Inquiry Banner (Matching Screenshot Phone Numbers) */}
      <section className="bg-[#112046] text-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-800 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            جاهز تبدأ مشروعك؟
          </h2>
          <p className="text-sm sm:text-base text-slate-200">
            تواصل معنا الآن للطلب أو الاستفسار عن أي منتج. فريقنا جاهز لخدمتك.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${COMPANY_INFO.phoneSecondary}`}
              dir="ltr"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-mono font-extrabold text-sm transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4" />
              <span>{COMPANY_INFO.phoneSecondary}</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneTertiary}`}
              dir="ltr"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/25 font-mono font-extrabold text-sm transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{COMPANY_INFO.phoneTertiary}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

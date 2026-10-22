import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { CATEGORIES, COMPANY_INFO } from '../data/products';
import { SimenesLogo } from './ProductArtwork';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('يرجى إدخال بريد إلكتروني صحيح للاشتراك في النشرة البريدية');
      return;
    }
    setSubscribed(true);
    setNewsletterEmail('');
    showToast('تم اشتراكك بنجاح في النشرة البريدية لمؤسسة سيمنز إيجيبت');
  };

  return (
    <footer className="bg-[#0E1B3D] text-white border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <AppLink to="/" className="inline-block">
              <SimenesLogo variant="dark" size="lg" />
            </AppLink>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              وجهتك المثالية للمنتجات الكهربائية عالية الجودة بأسعار تنافسية. كابلات وأسلاك نحاس نقي 99.9% مطابقة للمواصفات القياسية المصرية والعالمية.
            </p>
            <div className="pt-1 text-xs text-amber-300 font-bold">
              ضمان 10 إلى 20 عاماً على كافة الكابلات والأسلاك
            </div>
          </div>

          {/* Column 2: Quick Links & Legal Pages (each with its own URL) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-extrabold text-white mb-4">
                روابط سريعة
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <AppLink to="/" className="hover:text-amber-400 transition-colors">
                    الرئيسية
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/shop" className="hover:text-amber-400 transition-colors">
                    جميع المنتجات
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/about" className="hover:text-amber-400 transition-colors">
                    من نحن
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/contact" className="hover:text-amber-400 transition-colors">
                    تواصل معنا
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/checkout" className="hover:text-amber-400 transition-colors">
                    إتمام الطلب
                  </AppLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white mb-4">
                معلومات قانونية
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-300">
                <li>
                  <AppLink to="/privacy" className="hover:text-amber-400 transition-colors">
                    سياسة الخصوصية
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/terms" className="hover:text-amber-400 transition-colors">
                    الشروط والأحكام
                  </AppLink>
                </li>
                <li>
                  <AppLink to="/faq" className="hover:text-amber-400 transition-colors">
                    الأسئلة الشائعة
                  </AppLink>
                </li>
              </ul>

              <h3 className="text-sm font-extrabold text-amber-400 mt-6 mb-2.5">
                أقسام المتجر
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <AppLink
                      to={`/categories/${c.slug}`}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {c.name}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-base font-extrabold text-white mb-4">
              تواصل معنا
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_INFO.phonePrimary}`}
                  dir="ltr"
                  className="hover:text-amber-400 transition-colors font-mono tabular-nums"
                >
                  {COMPANY_INFO.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="hover:text-amber-400 transition-colors font-mono tabular-nums"
                >
                  {COMPANY_INFO.whatsappInt}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  dir="ltr"
                  className="hover:text-amber-400 transition-colors font-mono text-xs"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="leading-relaxed text-slate-300">
                  {COMPANY_INFO.addressShort}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-extrabold text-white mb-3">
                تابعنا
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="تواصل عبر واتساب"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phonePrimary}`}
                  aria-label="اتصال هاتفي"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-colors"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white mb-3">
                النشرة البريدية
              </h3>
              <p className="text-xs text-slate-300 mb-3">
                اشترك لتصلك أحدث قوائم أسعار النحاس وعروض الجملة للمقاولين.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  aria-label="البريد الإلكتروني للنشرة البريدية"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-white/10 border border-slate-600 text-white placeholder:text-slate-300 text-xs focus:outline-2 focus:outline-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  اشترك
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-bold mt-2">
                  تم تسجيل بريدك الإلكتروني بنجاح.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <div className="flex items-center gap-4">
            <AppLink to="/privacy" className="hover:text-amber-400">
              سياسة الخصوصية
            </AppLink>
            <span aria-hidden="true">·</span>
            <AppLink to="/terms" className="hover:text-amber-400">
              الشروط والأحكام
            </AppLink>
            <span aria-hidden="true">·</span>
            <AppLink to="/faq" className="hover:text-amber-400">
              الأسئلة الشائعة
            </AppLink>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Direct Button */}
      <a
        href={COMPANY_INFO.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-5 left-5 z-30 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">واتساب المبيعات</span>
      </a>
    </footer>
  );
};

import React from 'react';
import { HelpCircle, Shield, FileText } from 'lucide-react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/products';
import { AppLink } from '../context/AppContext';

export const LegalFaqPage: React.FC<{
  mode: 'faq' | 'privacy' | 'terms';
}> = ({ mode }) => {
  const title =
    mode === 'faq'
      ? 'الأسئلة الشائعة'
      : mode === 'privacy'
      ? 'سياسة الخصوصية'
      : 'الشروط والأحكام';

  const subtitle =
    mode === 'faq'
      ? 'إجابات وافية حول مواصفات الكابلات، نقاوة النحاس، الشحن، وطلبات الجملة'
      : mode === 'privacy'
      ? 'كيف نحمي بيانات عملائنا وشركائنا في مؤسسة سيمنز إيجيبت'
      : 'ضوابط التوريد، الضمان، وسياسة الاستبدال والاسترجاع';

  return (
    <div className="space-y-12 pb-16">
      <section className="bg-[#112046] text-white py-12 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{title}</h1>
          <p className="text-sm sm:text-base text-slate-200">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Sub-navigation between legal/info routes */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/80 rounded-xl w-fit">
          <AppLink
            to="/faq"
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              mode === 'faq'
                ? 'bg-[#0F1D40] text-white'
                : 'text-slate-800 hover:bg-white/60'
            }`}
          >
            الأسئلة الشائعة (/faq)
          </AppLink>
          <AppLink
            to="/privacy"
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              mode === 'privacy'
                ? 'bg-[#0F1D40] text-white'
                : 'text-slate-800 hover:bg-white/60'
            }`}
          >
            سياسة الخصوصية (/privacy)
          </AppLink>
          <AppLink
            to="/terms"
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-colors ${
              mode === 'terms'
                ? 'bg-[#0F1D40] text-white'
                : 'text-slate-800 hover:bg-white/60'
            }`}
          >
            الشروط والأحكام (/terms)
          </AppLink>
        </div>

        {mode === 'faq' && (
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <article
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 space-y-2"
              >
                <h2 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-900 shrink-0" />
                  <span>{item.question}</span>
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed pr-7">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        )}

        {mode === 'privacy' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
              <Shield className="w-5 h-5 text-blue-900" />
              <h2>التزامنا بحماية خصوصية بياناتك</h2>
            </div>
            <p>
              تحرص <strong>{COMPANY_INFO.fullTitle}</strong> على سرية وأمان كافة البيانات الشخصية والتجارية التي يشاركها العملاء والمقاولون عبر الموقع الإلكتروني.
            </p>
            <h3 className="text-base font-extrabold text-slate-950">
              1. البيانات التي نجمعها
            </h3>
            <p>
              نجمع فقط البيانات الضرورية لتجهيز وتوصيل الطلبيات وإصدار الفواتير وشهادات الضمان (الاسم، رقم الهاتف، العنوان، واسم الشركة اختيارياً).
            </p>
            <h3 className="text-base font-extrabold text-slate-950">
              2. عدم مشاركة البيانات
            </h3>
            <p>
              لا نقوم ببيع أو مشاركة بيانات العملاء مع أي أطراف خارجية غير مرتبطة بعملية الشحن والتوصيل المباشر للعميل.
            </p>
          </div>
        )}

        {mode === 'terms' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 text-lg font-extrabold text-slate-950">
              <FileText className="w-5 h-5 text-blue-900" />
              <h2>شروط التوريد والضمان والاسترجاع</h2>
            </div>
            <h3 className="text-base font-extrabold text-slate-950">
              1. ضمان نقاوة النحاس والمواصفات
            </h3>
            <p>
              تضمن مؤسسة سيمنز إيجيبت أن جميع الأسلاك والكابلات المباعة مصنوعة من النحاس الأحمر الإلكتروليتي النقي بنسبة 99.9% ومطابقة للمواصفات القياسية المصرية (م.ق.م).
            </p>
            <h3 className="text-base font-extrabold text-slate-950">
              2. سياسة الإرجاع والاستبدال (30 يوماً)
            </h3>
            <p>
              يحق للعميل استبدال أو إرجاع اللفات الكاملة المغلفة بحالتها الأصلية خلال 30 يوماً من تاريخ الفاتورة. بالنسبة للكابلات المقصوصة بالمتر حسب طلب العميل الخاص، يتم فحصها ومطابقتها للمواصفات عند الاستلام.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

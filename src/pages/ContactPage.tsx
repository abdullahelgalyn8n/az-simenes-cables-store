import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/products';
import { validateContactForm } from '../utils/catalogLogic';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedEntries, setSubmittedEntries] = useState<
    { id: string; name: string; email: string; message: string; time: string }[]
  >([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactForm({ name, email, phone, message });
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    const entry = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      time: 'الآن',
    };
    setSubmittedEntries((prev) => [entry, ...prev]);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    showToast('تم إرسال رسالتك بنجاح إلى فريق سيمنز إيجيبت', `رقم الطلب: ${entry.id}`);
  };

  return (
    <div className="space-y-14 pb-16">
      {/* Hero Banner */}
      <section className="bg-[#112046] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            اتصل بنا
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            تواصل مع فريقنا للمبيعات وطلبات الجملة وعروض الأسعار الفنية
          </p>
        </div>
      </section>

      {/* Main Contact Grid: Form (Right in RTL) + Contact Cards & Map (Left in RTL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">
                أرسل لنا رسالة
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                املأ النموذج التالي وسيتواصل معك مهندس المبيعات المختص في أسرع وقت.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-extrabold text-slate-900 mb-1.5"
                >
                  الاسم
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك بالكامل"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-medium placeholder:text-slate-500 focus:bg-white focus:border-[#0F1D40] focus:outline-none"
                />
                {errors.name && (
                  <p className="text-xs text-red-700 font-bold mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-extrabold text-slate-900 mb-1.5"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-medium placeholder:text-slate-500 focus:bg-white focus:border-[#0F1D40] focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-700 font-bold mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-extrabold text-slate-900 mb-1.5"
                  >
                    رقم الهاتف / واتساب (اختياري)
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01124111975"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-medium placeholder:text-slate-500 focus:bg-white focus:border-[#0F1D40] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-extrabold text-slate-900 mb-1.5"
                >
                  الرسالة
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك أو المقايسة المطلوبة هنا..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-950 text-sm font-medium placeholder:text-slate-500 focus:bg-white focus:border-[#0F1D40] focus:outline-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-700 font-bold mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>

            {/* Submitted Messages Confirmation Log */}
            {submittedEntries.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h3 className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم استلام رسالتك بنجاح:</span>
                </h3>
                {submittedEntries.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1"
                  >
                    <div className="flex justify-between font-extrabold text-slate-950">
                      <span>
                        {item.name} ({item.id})
                      </span>
                      <span className="text-emerald-800">{item.time}</span>
                    </div>
                    <p className="text-slate-700">{item.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Left Column: 4 Info Cards + Map + Social */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F1D40] text-white flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">الهاتف</div>
                  <a
                    href={`tel:${COMPANY_INFO.phonePrimary}`}
                    dir="ltr"
                    className="block text-sm font-extrabold text-slate-950 hover:text-blue-900 font-mono tabular-nums mt-1"
                  >
                    {COMPANY_INFO.phonePrimary}
                  </a>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F1D40] text-white flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">واتساب</div>
                  <a
                    href={COMPANY_INFO.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="block text-sm font-extrabold text-slate-950 hover:text-emerald-700 font-mono tabular-nums mt-1"
                  >
                    {COMPANY_INFO.phonePrimary}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F1D40] text-white flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">
                    البريد الإلكتروني
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    dir="ltr"
                    className="block text-sm font-extrabold text-slate-950 hover:text-blue-900 font-mono mt-1 break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0F1D40] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">العنوان</div>
                  <p className="text-xs font-extrabold text-slate-950 mt-1 leading-relaxed">
                    {COMPANY_INFO.addressShort}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Location Map Visual Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="relative h-60 bg-slate-100">
                <svg
                  viewBox="0 0 600 260"
                  className="w-full h-full object-cover"
                  role="img"
                  aria-label="خريطة موقع مؤسسة سيمنز إيجيبت باسوس طريق القناطر الخيرية شبرا الخيمة"
                >
                  <rect width="600" height="260" fill="#E2E8F0" />
                  {/* Nile Branch & Roads representation */}
                  <path
                    d="M 80 0 Q 150 130 220 260"
                    fill="none"
                    stroke="#93C5FD"
                    strokeWidth="44"
                  />
                  {/* Grid streets */}
                  {[40, 90, 140, 190, 230].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="600"
                      y2={y}
                      stroke="#F8FAFC"
                      strokeWidth="6"
                    />
                  ))}
                  {[160, 260, 360, 460, 540].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="260"
                      stroke="#F8FAFC"
                      strokeWidth="6"
                    />
                  ))}
                  {/* Ring Road / Qanater Highway */}
                  <path
                    d="M 0 210 L 600 75"
                    fill="none"
                    stroke="#FDE047"
                    strokeWidth="12"
                  />
                  {/* Location Pin */}
                  <circle cx="330" cy="135" r="24" fill="#DC2626" opacity="0.2" />
                  <path
                    d="M 330 95 C 314 95 304 107 304 121 C 304 140 330 162 330 162 C 330 162 356 140 356 121 C 356 107 346 95 330 95 Z"
                    fill="#DC2626"
                  />
                  <circle cx="330" cy="120" r="8" fill="#FFFFFF" />
                  <rect
                    x="215"
                    y="168"
                    width="230"
                    height="34"
                    rx="8"
                    fill="#0F1D40"
                  />
                  <text
                    x="330"
                    y="190"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="800"
                    fontFamily="Cairo, sans-serif"
                  >
                    باسوس - طريق القناطر الخيرية، شبرا الخيمة
                  </text>
                </svg>

                <a
                  href="https://maps.google.com/?q=Shubra+El+Kheima+Qanater+Road+Basus+Egypt"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-blue-950 font-bold text-xs shadow-md border border-slate-200 hover:bg-slate-50"
                >
                  <span>افتح في خرائط Google</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-sm font-extrabold text-slate-950">
                تابعنا وتواصل مباشرة عبر
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-emerald-700 text-xs font-extrabold text-slate-900 hover:text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phonePrimary}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:border-blue-900 text-xs font-extrabold text-slate-900 hover:text-blue-900 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-900" />
                  <span>اتصال مباشر</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

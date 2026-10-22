import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { CustomerOrderInfo, OrderRecord } from '../types/store';
import {
  formatPriceEGP,
  validateCheckoutForm,
} from '../utils/catalogLogic';

const EGYPT_GOVERNORATES = [
  'القاهرة',
  'الجيزة',
  'القليوبية',
  'الإسكندرية',
  'الشرقية',
  'الدقهلية',
  'الغربية',
  'المنوفية',
  'البحيرة',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'الإسماعيلية',
  'السويس',
  'بورسعيد',
  'دمياط',
];

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, placeOrder, showToast } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [paymentMethod, setPaymentMethod] =
    useState<CustomerOrderInfo['paymentMethod']>('cod');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCheckoutForm({
      fullName,
      phone,
      governorate,
      address,
    });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    const record = placeOrder({
      fullName: fullName.trim(),
      phone: phone.trim(),
      governorate,
      address: address.trim(),
      companyName: companyName.trim(),
      paymentMethod,
      notes: notes.trim(),
    });
    setConfirmedOrder(record);
    showToast(`تم تأكيد طلبك بنجاح رقم ${record.orderNumber}`);
  };

  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-emerald-800">
              تم استلام وتأكيد الطلب بنجاح
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              طلب رقم{' '}
              <span className="font-mono text-blue-950">
                #{confirmedOrder.orderNumber}
              </span>
            </h1>
            <p className="text-sm text-slate-700">
              شكراً لك {confirmedOrder.customer.fullName}. سيتواصل معك مسؤول التوريدات على الرقم{' '}
              <span className="font-mono font-bold">{confirmedOrder.customer.phone}</span>{' '}
              لتأكيد موعد التسليم إلى {confirmedOrder.customer.governorate}.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-right space-y-3 text-xs">
            <div className="font-extrabold text-sm text-slate-950 pb-2 border-b border-slate-200">
              ملخص الفاتورة والتوريد
            </div>
            {confirmedOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-slate-800"
              >
                <span>
                  {item.product.name} ({item.selectedColor}) × {item.quantity}
                </span>
                <span className="font-bold tabular-nums">
                  {formatPriceEGP(item.product.price * item.quantity)} ج.م
                </span>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-950">
              <span>الإجمالي المطلوب عند الاستلام:</span>
              <span className="tabular-nums text-blue-950">
                {formatPriceEGP(confirmedOrder.total)} ج.م
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <AppLink
              to="/shop"
              className="px-6 py-3 rounded-xl bg-[#0F1D40] text-white text-xs font-extrabold hover:bg-[#1E3A8A] transition-colors"
            >
              متابعة التسوق
            </AppLink>
            <a
              href={`https://wa.me/201124111975?text=${encodeURIComponent(
                `مرحباً سيمنز إيجيبت، قمت بتسجيل طلب رقم #${confirmedOrder.orderNumber} باسم ${confirmedOrder.customer.fullName}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-white text-xs font-extrabold hover:bg-emerald-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تأكيد سريع عبر واتساب</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
        <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-950">
          سلة المشتريات فارغة
        </h1>
        <p className="text-sm text-slate-600">
          أضف بعض الكابلات أو الأسلاك إلى سلتك أولاً لإتمام الطلب.
        </p>
        <AppLink
          to="/shop"
          className="inline-block px-6 py-3 rounded-xl bg-[#0F1D40] text-white text-xs font-extrabold"
        >
          تصفح المنتجات
        </AppLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-8">
        إتمام الطلب وبيانات التوصيل
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <form
          onSubmit={handlePlaceOrder}
          noValidate
          className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          <h2 className="text-lg font-extrabold text-slate-950 pb-3 border-b border-slate-200">
            1. بيانات المستلم والعنوان
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-name"
                className="block text-xs font-extrabold text-slate-900 mb-1.5"
              >
                الاسم بالكامل *
              </label>
              <input
                id="checkout-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: م. أحمد محمود"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950 font-medium"
              />
              {errors.fullName && (
                <p className="text-xs text-red-700 font-bold mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="block text-xs font-extrabold text-slate-900 mb-1.5"
              >
                رقم الموبايل (مكالمات / واتساب) *
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01124111975"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950 font-medium tabular-nums"
              />
              {errors.phone && (
                <p className="text-xs text-red-700 font-bold mt-1">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="checkout-gov"
                className="block text-xs font-extrabold text-slate-900 mb-1.5"
              >
                المحافظة *
              </label>
              <select
                id="checkout-gov"
                value={governorate}
                onChange={(e) => setGovernorate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950 font-bold"
              >
                {EGYPT_GOVERNORATES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="checkout-company"
                className="block text-xs font-extrabold text-slate-900 mb-1.5"
              >
                اسم الشركة / مكتب المقاولات (اختياري)
              </label>
              <input
                id="checkout-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="لإصدار فاتورة باسم الشركة"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950 font-medium"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="checkout-address"
              className="block text-xs font-extrabold text-slate-900 mb-1.5"
            >
              عنوان التسليم أو الموقع بالتفصيل *
            </label>
            <input
              id="checkout-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="الحي، الشارع، رقم العقار أو موقع المشروع..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950 font-medium"
            />
            {errors.address && (
              <p className="text-xs text-red-700 font-bold mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-lg font-extrabold text-slate-950 pb-2 border-b border-slate-200">
              2. طريقة الدفع المفضلة
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'cod' as const,
                  title: 'الدفع عند الاستلام',
                  sub: 'نقداً بعد معاينة واستلام الطلبية',
                },
                {
                  id: 'bank-transfer' as const,
                  title: 'تحويل بنكي للشركات',
                  sub: 'حساب المؤسسة الرسمي',
                },
                {
                  id: 'instapay' as const,
                  title: 'إنستا باي / محفظة',
                  sub: 'دفع إلكتروني سريع',
                },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === opt.id
                      ? 'border-[#0F1D40] bg-blue-50/70 ring-2 ring-[#0F1D40]/20'
                      : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="accent-[#0F1D40]"
                    />
                    <span className="text-xs font-extrabold text-slate-950">
                      {opt.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 mr-5">
                    {opt.sub}
                  </p>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="checkout-notes"
              className="block text-xs font-extrabold text-slate-900 mb-1.5"
            >
              ملاحظات إضافية (تقسيم الألوان أو مواعيد الاستلام)
            </label>
            <textarea
              id="checkout-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: يرجى تنويع ألوان لفات السلك (أحمر، أسود، أزرق)..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm text-slate-950"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white font-extrabold text-sm transition-colors cursor-pointer"
          >
            تأكيد الطلب الآن ({formatPriceEGP(cartTotals.total)} ج.م)
          </button>
        </form>

        {/* Order Summary Column */}
        <aside className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h2 className="text-lg font-extrabold text-slate-950 pb-3 border-b border-slate-200">
            ملخص الطلبية ({cartTotals.itemsCount} منتجات)
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 text-xs"
              >
                <div>
                  <div className="font-extrabold text-slate-950">
                    {item.product.name}
                  </div>
                  <div className="text-slate-600">
                    اللون: {item.selectedColor} × الكمية: {item.quantity}
                  </div>
                </div>
                <span className="font-extrabold text-slate-950 tabular-nums shrink-0">
                  {formatPriceEGP(item.product.price * item.quantity)} ج.م
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>المجموع الفرعي:</span>
              <span className="font-bold tabular-nums">
                {formatPriceEGP(cartTotals.subtotal)} ج.م
              </span>
            </div>
            {cartTotals.bulkDiscount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>خصم المقاولين والجملة (5%):</span>
                <span className="tabular-nums">
                  - {formatPriceEGP(cartTotals.bulkDiscount)} ج.م
                </span>
              </div>
            )}
            <div className="flex justify-between text-slate-700">
              <span>مصاريف الشحن:</span>
              <span className="font-bold text-emerald-800">
                {cartTotals.shippingFee === 0
                  ? 'شحن مجاني'
                  : `${cartTotals.shippingFee} ج.م`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-950 pt-3 border-t border-slate-200">
              <span>الإجمالي النهائي:</span>
              <span className="tabular-nums text-blue-950">
                {formatPriceEGP(cartTotals.total)} ج.م
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>ضمان استلام وفحص المنتجات</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-900" />
              <span>توصيل مباشر من مخازن سيمنز إيجيبت بشبرا الخيمة</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" />
              <span>فاتورة ضريبية أو تجارية معتمدة وشهادة ضمان</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

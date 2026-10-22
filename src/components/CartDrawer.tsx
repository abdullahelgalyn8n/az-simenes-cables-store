import React from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AppLink, useApp } from '../context/AppContext';
import { ProductArtwork } from './ProductArtwork';
import { formatPriceEGP } from '../utils/catalogLogic';
import { COMPANY_INFO } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartTotals,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    navigate,
  } = useApp();

  if (!isCartOpen) return null;

  const handleWhatsAppCartOrder = () => {
    const lines = cart.map(
      (item, i) =>
        `${i + 1}. ${item.product.name} (${item.selectedColor}) - الكمية: ${
          item.quantity
        } × ${item.product.price} ج.م`
    );
    const message = `مرحباً مؤسسة سيمنز إيجيبت، أرغب في طلب المنتجات التالية:\n${lines.join(
      '\n'
    )}\nالإجمالي: ${formatPriceEGP(cartTotals.total)} ج.م`;
    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/201124111975?text=${encoded}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="سلة المشتريات"
    >
      <div
        className="fixed inset-0"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-[#0F1D40] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-extrabold">سلة المشتريات</h2>
            <span className="text-xs font-mono text-amber-300 tabular-nums">
              ({cartTotals.itemsCount} منتجات)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="إغلاق السلة"
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wholesale Discount Progress Notice */}
        <div className="px-5 py-3 bg-amber-50 border-b border-amber-200 text-xs font-bold text-slate-900">
          {cartTotals.qualifiesForBulkDiscount ? (
            <p className="text-emerald-800">
              تم تطبيق خصم المقاولين والجملة الإضافي (5% ={' '}
              <span className="tabular-nums">{formatPriceEGP(cartTotals.bulkDiscount)}</span> ج.م)
            </p>
          ) : (
            <p>
              أضف منتجات بقيمة{' '}
              <span className="tabular-nums font-extrabold text-blue-950">
                {formatPriceEGP(Math.max(0, 15000 - cartTotals.subtotal))} ج.م
              </span>{' '}
              للحصول على خصم الجملة الإضافي (5% فوري).
            </p>
          )}
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                سلة المشتريات فارغة حالياً
              </h3>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                تصفح تشكيلتنا من الكابلات النحاسية والأسلاك المجدولة ولوحات التوزيع بأفضل الأسعار.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0F1D40] text-white text-xs font-bold hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              >
                تصفح جميع المنتجات
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                <span>المنتجات المختارة ({cart.length})</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-red-700 hover:text-red-900 font-bold cursor-pointer"
                >
                  إفراغ السلة
                </button>
              </div>
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}`}
                  className="flex gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <AppLink
                    to={`/product/${item.product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-16 rounded-lg overflow-hidden bg-white border border-slate-200 shrink-0 block"
                  >
                    <ProductArtwork
                      variant={item.product.artworkVariant}
                      crossSection={item.product.specs.crossSection}
                      className="w-full h-full object-cover"
                    />
                  </AppLink>

                  <div className="flex-1 min-w-0">
                    <AppLink
                      to={`/product/${item.product.id}`}
                      onClick={() => setIsCartOpen(false)}
                      className="block text-sm font-extrabold text-slate-950 hover:text-blue-900 truncate"
                    >
                      {item.product.name}
                    </AppLink>
                    <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                      <span>{item.selectedColor}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-bold text-slate-800">
                        {formatPriceEGP(item.product.price)} ج.م
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.quantity - 1
                            )
                          }
                          aria-label={`تقليل كمية ${item.product.name}`}
                          className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-extrabold text-slate-950 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedColor,
                              item.quantity + 1
                            )
                          }
                          aria-label={`زيادة كمية ${item.product.name}`}
                          className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-slate-950 tabular-nums">
                          {formatPriceEGP(item.product.price * item.quantity)} ج.م
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedColor)
                          }
                          aria-label={`حذف ${item.product.name}`}
                          className="p-1 text-slate-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Summary & Checkout Actions */}
        {cart.length > 0 && (
          <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>المجموع الفرعي:</span>
                <span className="font-bold tabular-nums text-slate-900">
                  {formatPriceEGP(cartTotals.subtotal)} ج.م
                </span>
              </div>
              {cartTotals.bulkDiscount > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>خصم الجملة والمقاولين (5%):</span>
                  <span className="tabular-nums">
                    - {formatPriceEGP(cartTotals.bulkDiscount)} ج.م
                  </span>
                </div>
              )}
              <div className="flex justify-between text-slate-700">
                <span>الشحن والتوصيل:</span>
                <span className="font-bold text-emerald-800">
                  {cartTotals.shippingFee === 0
                    ? 'مجاني (فوق 500 ج.م)'
                    : `${cartTotals.shippingFee} ج.م`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-950 pt-2 border-t border-slate-200">
                <span>الإجمالي النهائي:</span>
                <span className="tabular-nums text-blue-950">
                  {formatPriceEGP(cartTotals.total)} ج.م
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0F1D40] hover:bg-[#1E3A8A] text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>إتمام الطلب الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppCartOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الطلب مباشرة عبر واتساب ({COMPANY_INFO.phonePrimary})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

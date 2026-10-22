import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CartItem,
  CategorySlug,
  CustomerOrderInfo,
  OrderRecord,
  Product,
} from '../types/store';
import { PRODUCTS } from '../data/products';
import { CartTotals, calculateCartTotals } from '../utils/catalogLogic';

interface AppContextType {
  currentPath: string;
  searchParams: URLSearchParams;
  navigate: (to: string) => void;
  cart: CartItem[];
  cartTotals: CartTotals;
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateQuantity: (productId: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toast: { message: string; subtext?: string } | null;
  showToast: (message: string, subtext?: string) => void;
  orders: OrderRecord[];
  placeOrder: (customer: CustomerOrderInfo) => OrderRecord;
  selectedQuickCategory: CategorySlug;
  setSelectedQuickCategory: (cat: CategorySlug) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'simenes_egypt_cart_v1';
const ORDERS_STORAGE_KEY = 'simenes_egypt_orders_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [searchString, setSearchString] = useState<string>(() => window.location.search || '');
  const [selectedQuickCategory, setSelectedQuickCategory] = useState<CategorySlug>('all');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [
      {
        product: PRODUCTS[0],
        quantity: 2,
        selectedColor: PRODUCTS[0].availableColors[0].name,
      },
    ];
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; subtext?: string } | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchString(window.location.search || '');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  const showToast = (message: string, subtext?: string) => {
    setToast({ message, subtext });
    window.setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setCurrentPath(url.pathname);
    setSearchString(url.search);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.availableColors[0]?.name || 'قياسي';
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: color }];
    });
    showToast(`تمت إضافة "${product.name}" إلى السلة`, `الكمية: ${quantity} • اللون: ${color}`);
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotals = calculateCartTotals(cart);

  const placeOrder = (customer: CustomerOrderInfo): OrderRecord => {
    const orderNumber = `SEC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: OrderRecord = {
      orderNumber,
      createdAt: new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      customer,
      items: [...cart],
      subtotal: cartTotals.subtotal,
      bulkDiscount: cartTotals.bulkDiscount,
      shippingFee: cartTotals.shippingFee,
      total: cartTotals.total,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        searchParams: new URLSearchParams(searchString),
        navigate,
        cart,
        cartTotals,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toast,
        showToast,
        orders,
        placeOrder,
        selectedQuickCategory,
        setSelectedQuickCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppLink: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}> = ({ to, className, children, onClick, ariaLabel }) => {
  const { navigate } = useApp();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
};

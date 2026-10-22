import { CartItem, CustomerOrderInfo, FilterState, Product } from '../types/store';

export const DEFAULT_FILTER_STATE: FilterState = {
  category: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 22000,
  minRating: 0,
  onlyInStock: false,
  onlyOnSale: false,
  onlyFeatured: false,
  sortBy: 'newest',
};

export function filterAndSortProducts(products: Product[], filters: FilterState): Product[] {
  const query = filters.searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (filters.category !== 'all' && p.category !== filters.category) {
      return false;
    }

    if (query.length > 0) {
      const hay = `${p.name} ${p.subtitle} ${p.categoryName} ${p.sku} ${p.specs.crossSection}`.toLowerCase();
      if (!hay.includes(query)) {
        return false;
      }
    }

    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }

    if (filters.minRating > 0 && p.rating < filters.minRating) {
      return false;
    }

    if (filters.onlyInStock && !p.inStock) {
      return false;
    }

    if (filters.onlyOnSale && !p.isOnSale) {
      return false;
    }

    if (filters.onlyFeatured && !p.isFeatured) {
      return false;
    }

    return true;
  });

  const sorted = [...filtered];

  switch (filters.sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'discount-desc':
      sorted.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case 'newest':
    default:
      // Keep catalog order with new arrivals and featured prioritized naturally
      break;
  }

  return sorted;
}

export interface CartTotals {
  itemsCount: number;
  subtotal: number;
  originalSubtotal: number;
  productSavings: number;
  bulkDiscount: number;
  shippingFee: number;
  total: number;
  qualifiesForFreeShipping: boolean;
  qualifiesForBulkDiscount: boolean;
}

export function calculateCartTotals(
  items: CartItem[],
  freeShippingThreshold = 500
): CartTotals {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const productSavings = Math.max(0, originalSubtotal - subtotal);

  // 5% extra contractor/wholesale discount for orders >= 15,000 EGP
  const qualifiesForBulkDiscount = subtotal >= 15000;
  const bulkDiscount = qualifiesForBulkDiscount ? Math.round(subtotal * 0.05) : 0;

  const afterDiscount = subtotal - bulkDiscount;
  const qualifiesForFreeShipping = afterDiscount >= freeShippingThreshold || items.length === 0;
  const shippingFee = qualifiesForFreeShipping ? 0 : 85;
  const total = afterDiscount + shippingFee;

  return {
    itemsCount,
    subtotal,
    originalSubtotal,
    productSavings,
    bulkDiscount,
    shippingFee,
    total,
    qualifiesForFreeShipping,
    qualifiesForBulkDiscount,
  };
}

export interface CableCalculationResult {
  estimatedCurrentAmps: number;
  recommendedCrossSectionMm2: number;
  voltageDropPercent: number;
  recommendedProductIds: string[];
  applicationAdvice: string;
}

export function calculateCableRecommendation(
  loadKw: number,
  phases: 1 | 3,
  distanceMeters: number
): CableCalculationResult {
  const safeKw = Math.max(0.5, Math.min(250, loadKw));
  const safeDist = Math.max(1, Math.min(500, distanceMeters));
  const powerFactor = 0.85;

  const currentAmps =
    phases === 1
      ? (safeKw * 1000) / (220 * powerFactor)
      : (safeKw * 1000) / (Math.sqrt(3) * 380 * powerFactor);

  // Standard copper ampacity table + voltage drop compensation
  const standardSizes = [1.5, 2.0, 3.0, 4.0, 6.0, 10.0, 16.0, 25.0, 35.0, 50.0];
  const maxAmpsBySize: Record<number, number> = {
    1.5: 13,
    2.0: 18,
    3.0: 24,
    4.0: 31,
    6.0: 41,
    10.0: 57,
    16.0: 76,
    25.0: 101,
    35.0: 125,
    50.0: 151,
  };

  let chosenSize = 50.0;
  for (const size of standardSizes) {
    const maxA = maxAmpsBySize[size];
    // Calculate voltage drop (%) for copper conductivity (rho = 0.0178 ohm*mm2/m)
    const factor = phases === 1 ? 2 : Math.sqrt(3);
    const vNominal = phases === 1 ? 220 : 380;
    const vDrop = (factor * safeDist * currentAmps * 0.0178) / size;
    const vDropPct = (vDrop / vNominal) * 100;

    if (currentAmps <= maxA && vDropPct <= 3.5) {
      chosenSize = size;
      break;
    }
  }

  const factor = phases === 1 ? 2 : Math.sqrt(3);
  const vNominal = phases === 1 ? 220 : 380;
  const actualDrop = (factor * safeDist * currentAmps * 0.0178) / chosenSize;
  const voltageDropPercent = Number(((actualDrop / vNominal) * 100).toFixed(2));

  let recommendedProductIds: string[] = [];
  let applicationAdvice = '';

  if (chosenSize <= 1.5) {
    recommendedProductIds = ['sec-wire-1-5', 'sec-wire-flex-1-5'];
    applicationAdvice = 'مناسب لدوائر الإنارة والمفاتيح والأحمال الخفيفة.';
  } else if (chosenSize <= 2.0) {
    recommendedProductIds = ['sec-wire-2-0', 'sec-cable-thermo-2x2'];
    applicationAdvice = 'مثالي للبرايز العامة والأجهزة المنزلية المتوسطة.';
  } else if (chosenSize <= 3.0) {
    recommendedProductIds = ['sec-wire-3-0', 'sec-cable-3x3', 'sec-cable-thermo-3x2-5'];
    applicationAdvice = 'موصى به للسخانات والغسالات وتكييفات 1.5 حصان.';
  } else if (chosenSize <= 4.0) {
    recommendedProductIds = ['sec-wire-4-0', 'sec-cable-thermo-3x2-5'];
    applicationAdvice = 'ممتاز لتكييفات 2.25 إلى 3 حصان والأفران الكهربائية.';
  } else if (chosenSize <= 6.0) {
    recommendedProductIds = ['sec-wire-6-0', 'sec-cable-4x6'];
    applicationAdvice = 'مناسب لتغذية اللوحات الفرعية والتكييفات الكبيرة حتى 5 حصان.';
  } else if (chosenSize <= 10.0) {
    recommendedProductIds = ['sec-wire-10-0', 'sec-cable-4x10'];
    applicationAdvice = 'مخصص للصواعد الرئيسية وتغذية الشقق والوحدات الإدارية.';
  } else if (chosenSize <= 16.0) {
    recommendedProductIds = ['sec-cable-4x16', 'sec-armored-3x16'];
    applicationAdvice = 'مخصص لتغذية العمارات والمنشآت التجارية والمصاعد.';
  } else if (chosenSize <= 25.0) {
    recommendedProductIds = ['sec-armored-4x25', 'sec-cable-single-25'];
    applicationAdvice = 'كابلات قوى رئيسية ومدرعة للأحمال العالية والمشاريع.';
  } else if (chosenSize <= 35.0) {
    recommendedProductIds = ['sec-armored-4x35'];
    applicationAdvice = 'كابل قوى مسلح للمصانع واللوحات العمومية.';
  } else {
    recommendedProductIds = ['sec-armored-4x50'];
    applicationAdvice = 'كابل قوى مسلح استراتيجي للأحمال الصناعية الثقيلة.';
  }

  return {
    estimatedCurrentAmps: Number(currentAmps.toFixed(1)),
    recommendedCrossSectionMm2: chosenSize,
    voltageDropPercent,
    recommendedProductIds,
    applicationAdvice,
  };
}

export function validateContactForm(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'يرجى إدخال الاسم بالكامل (حرفين على الأقل)';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'يرجى إدخال بريد إلكتروني صحيح';
  }
  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'يرجى كتابة تفاصيل رسالتك أو استفسارك (10 أحرف على الأقل)';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCheckoutForm(input: Partial<CustomerOrderInfo>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (!input.fullName || input.fullName.trim().length < 3) {
    errors.fullName = 'يرجى إدخال الاسم الثلاثي للمستلم';
  }
  const cleanPhone = (input.phone || '').replace(/\s+/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = 'يرجى إدخال رقم هاتف مصري صحيح (11 رقم)';
  }
  if (!input.governorate || input.governorate.trim().length === 0) {
    errors.governorate = 'يرجى اختيار المحافظة';
  }
  if (!input.address || input.address.trim().length < 8) {
    errors.address = 'يرجى كتابة العنوان بالتفصيل لتسهيل التوصيل';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatPriceEGP(amount: number): string {
  return amount.toLocaleString('en-US');
}

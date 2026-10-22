export type CategorySlug =
  | 'all'
  | 'copper-cables'
  | 'electrical-wires'
  | 'armored-cables'
  | 'electrical-conduits'
  | 'distribution-boards';

export interface CategoryInfo {
  slug: Exclude<CategorySlug, 'all'>;
  name: string;
  shortDesc: string;
  description: string;
  badgeText: string;
  artworkType: 'copper-cable' | 'stranded-wire' | 'armored-cable' | 'conduit-pipe' | 'distribution-board';
}

export interface ProductSpecs {
  crossSection: string; // e.g., "1.5 مم²", "4×25 مم²"
  voltageRating: string; // e.g., "450/750 فولت", "0.6/1 كيلو فولت"
  copperPurity: string; // e.g., "99.9% نحاس أحمر إلكتروليتي نقي"
  insulationMaterial: string; // e.g., "PVC عازل للحرارة والرطوبة", "XLPE / PVC مسلح بشريط صلب"
  standardCode: string; // e.g., "المواصفات القياسية المصرية م.ق.م 1464 / H07V-R"
  conductorType: string; // e.g., "شعيرات نحاس مجدولة (7 شعيرات)"
  unitLabel: string; // e.g., "لفة 100 متر" or "لكل متر" or "لوحة كاملة"
  weightApprox: string; // e.g., "1.85 كجم / لفة"
  warrantyYears: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: Exclude<CategorySlug, 'all'>;
  categoryName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured: boolean;
  isOnSale: boolean;
  isNewArrival: boolean;
  unitType: 'roll-100m' | 'per-meter' | 'unit' | 'bundle';
  minOrderQty: number;
  availableColors: { name: string; hex: string }[];
  artworkVariant:
    | 'wire-spool-1.5'
    | 'wire-spool-2.0'
    | 'wire-spool-3.0'
    | 'wire-spool-4.0'
    | 'wire-spool-6.0'
    | 'wire-spool-10.0'
    | 'flexible-spool'
    | 'thermo-cable'
    | 'copper-multicore'
    | 'single-core-power'
    | 'armored-3x16'
    | 'armored-4x25'
    | 'armored-4x35'
    | 'armored-4x50'
    | 'upvc-conduit'
    | 'flex-hose'
    | 'junction-box'
    | 'panel-12'
    | 'panel-24'
    | 'mccb-breaker';
  specs: ProductSpecs;
  highlights: string[];
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating-desc';

export interface FilterState {
  category: CategorySlug;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onlyInStock: boolean;
  onlyOnSale: boolean;
  onlyFeatured: boolean;
  sortBy: SortOption;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface CustomerOrderInfo {
  fullName: string;
  phone: string;
  whatsappPhone?: string;
  governorate: string;
  address: string;
  companyName?: string;
  paymentMethod: 'cod' | 'bank-transfer' | 'instapay';
  notes?: string;
}

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customer: CustomerOrderInfo;
  items: CartItem[];
  subtotal: number;
  bulkDiscount: number;
  shippingFee: number;
  total: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  company: string;
  governorate: string;
  rating: number;
  comment: string;
  projectType: string;
  verifiedPurchase: string;
}

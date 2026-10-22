import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_FILTER_STATE,
  calculateCableRecommendation,
  calculateCartTotals,
  filterAndSortProducts,
  validateCheckoutForm,
  validateContactForm,
} from './catalogLogic';
import { PRODUCTS } from '../data/products';

test('catalog contains 24 products across all 5 categories', () => {
  assert.equal(PRODUCTS.length, 24);
  const categories = new Set(PRODUCTS.map((p) => p.category));
  assert.equal(categories.size, 5);
});

test('filterAndSortProducts filters by category and search query accurately', () => {
  const copperOnly = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTER_STATE,
    category: 'copper-cables',
  });
  assert.equal(copperOnly.length, 7);
  assert.ok(copperOnly.every((p) => p.category === 'copper-cables'));

  const searchSpool = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTER_STATE,
    searchQuery: 'مجدول 1.5',
  });
  assert.equal(searchSpool.length, 1);
  assert.equal(searchSpool[0].id, 'sec-wire-1-5');
});

test('filterAndSortProducts sorts by price ascending and descending', () => {
  const asc = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTER_STATE,
    sortBy: 'price-asc',
  });
  assert.ok(asc[0].price <= asc[1].price);
  assert.ok(asc[asc.length - 2].price <= asc[asc.length - 1].price);

  const desc = filterAndSortProducts(PRODUCTS, {
    ...DEFAULT_FILTER_STATE,
    sortBy: 'price-desc',
  });
  assert.ok(desc[0].price >= desc[1].price);
});

test('calculateCartTotals computes subtotal, free shipping, and wholesale discount', () => {
  const wire15 = PRODUCTS.find((p) => p.id === 'sec-wire-1-5')!;
  const singleRoll = calculateCartTotals([
    { product: wire15, quantity: 1, selectedColor: 'أحمر (كهرباء)' },
  ]);
  assert.equal(singleRoll.subtotal, 920);
  assert.equal(singleRoll.shippingFee, 0);
  assert.equal(singleRoll.bulkDiscount, 0);
  assert.equal(singleRoll.total, 920);

  // 20 rolls -> 18,400 EGP -> qualifies for 5% contractor bulk discount (920 EGP)
  const bulkOrder = calculateCartTotals([
    { product: wire15, quantity: 20, selectedColor: 'أحمر (كهرباء)' },
  ]);
  assert.equal(bulkOrder.subtotal, 18400);
  assert.equal(bulkOrder.qualifiesForBulkDiscount, true);
  assert.equal(bulkOrder.bulkDiscount, 920);
  assert.equal(bulkOrder.total, 17480);
});

test('calculateCableRecommendation returns accurate cross-section for loads', () => {
  const smallLoad = calculateCableRecommendation(2.2, 1, 15);
  assert.equal(smallLoad.recommendedCrossSectionMm2, 1.5);
  assert.ok(smallLoad.recommendedProductIds.includes('sec-wire-1-5'));

  const heavyIndustrial = calculateCableRecommendation(45, 3, 60);
  assert.ok(heavyIndustrial.recommendedCrossSectionMm2 >= 25);
});

test('validateContactForm and validateCheckoutForm reject invalid inputs and accept valid ones', () => {
  const invalidContact = validateContactForm({ name: 'أ', email: 'bad-email', message: 'قصير' });
  assert.equal(invalidContact.valid, false);
  assert.ok(invalidContact.errors.name);
  assert.ok(invalidContact.errors.email);
  assert.ok(invalidContact.errors.message);

  const validContact = validateContactForm({
    name: 'مهندس أحمد سمير',
    email: 'ahmed@example.com',
    message: 'أرغب في عرض سعر لتوريد 50 لفة سلك مجدول 2 مم و 3 مم.',
  });
  assert.equal(validContact.valid, true);

  const invalidCheckout = validateCheckoutForm({
    fullName: '',
    phone: '123',
    governorate: '',
    address: '',
  });
  assert.equal(invalidCheckout.valid, false);

  const validCheckout = validateCheckoutForm({
    fullName: 'محمود عبد العزيز محمد',
    phone: '01124111975',
    governorate: 'القاهرة',
    address: 'شارع التسعين الشمالي، التجمع الخامس، عمارة 14',
  });
  assert.equal(validCheckout.valid, true);
});

import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../data/store';
import type { CartLine, CartTotals, CouponRule } from '../types';

const FREE_SHIPPING_THRESHOLD_PAISE = FREE_SHIPPING_THRESHOLD * 100;

export function lineTotal(line: CartLine): number {
  return line.price * line.quantity;
}

export function calculateDiscount(subtotal: number, coupon: CouponRule | null): number {
  if (!coupon || subtotal <= 0) return 0;
  if (coupon.type === 'percentage') {
    return Math.round((subtotal * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotal);
}

export function calculateTotals(lines: CartLine[], coupon: CouponRule | null): CartTotals {
  const itemCount = lines.reduce((count, line) => count + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.price, 0);
  const discount = calculateDiscount(subtotal, coupon);
  const discounted = Math.max(0, subtotal - discount);
  const shipping = lines.length === 0 || discounted >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : SHIPPING_FEE;

  return {
    itemCount,
    subtotal,
    discount,
    shipping,
    total: discounted + shipping,
  };
}

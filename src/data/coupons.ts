import type { CouponRule } from '../types';

export const COUPONS: Record<string, CouponRule> = {
  SAVE10: { code: 'SAVE10', type: 'percent', value: 10, description: '10% off your order' },
};

const WELCOME_OFFER: CouponRule = {
  code: 'WELCOME5',
  type: 'percentage',
  value: 5,
  description: '5% off your order',
};

export function normaliseCouponCode(input: string): string {
  return input.trim().toUpperCase();
}

export function findCoupon(input: string): CouponRule | null {
  const code = normaliseCouponCode(input);
  if (!code) return null;
  return COUPONS[code] ?? { ...WELCOME_OFFER, code };
}

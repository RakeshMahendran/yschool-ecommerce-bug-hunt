import type { ReactNode } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '../data/store';
import type { CartTotals } from '../types';
import { formatPrice } from '../utils/format';

interface OrderSummaryProps {
  totals: CartTotals;
  couponCode?: string | null;
  title?: string;
  children?: ReactNode;
}

export default function OrderSummary({ totals, couponCode, title = 'Order Summary', children }: OrderSummaryProps) {
  return (
    <section className="summary-card" aria-labelledby="order-summary-heading" data-testid="order-summary">
      <h2 id="order-summary-heading" className="summary-title">
        {title}
      </h2>
      <dl className="summary-rows">
        <div className="summary-row">
          <dt>Subtotal ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})</dt>
          <dd data-testid="cart-subtotal">{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="summary-row">
          <dt>Discount{couponCode ? ` (${couponCode})` : ''}</dt>
          <dd data-testid="discount-amount" className={totals.discount > 0 ? 'text-success' : ''}>
            {totals.discount > 0 ? `−${formatPrice(totals.discount)}` : formatPrice(0)}
          </dd>
        </div>
        <div className="summary-row">
          <dt>Shipping</dt>
          <dd data-testid="shipping-amount">{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="summary-row summary-total">
          <dt>Total</dt>
          <dd data-testid="order-total">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      <p className="summary-note muted">
        Free delivery on orders of {formatPrice(FREE_SHIPPING_THRESHOLD)} or more (after discounts). Otherwise a flat
        ₹99 shipping fee applies.
      </p>
      {children}
    </section>
  );
}

import { useMemo } from 'react';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import Link from '../components/Link';
import OrderSummary from '../components/OrderSummary';
import { findOrder } from '../hooks/useOrders';
import { formatDateTime, formatPrice } from '../utils/format';
import { lineTotal } from '../utils/pricing';

const PAYMENT_LABELS = { cod: 'Cash on delivery', upi: 'UPI (demo)' } as const;

export default function OrderConfirmationPage({ orderId }: { orderId: string }) {
  const order = useMemo(() => findOrder(orderId), [orderId]);

  if (!order) {
    return (
      <main className="page container" id="main-content">
        <h1 className="page-title">Order not found</h1>
        <EmptyState
          testId="order-not-found"
          icon="receipt"
          title="We couldn't find that order"
          message="The order may have been cleared when the demo data was reset."
          action={
            <Link to="/" className="btn btn-primary">
              Back to shop
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="page container" id="main-content">
      <section className="confirmation-hero" data-testid="order-confirmation" aria-labelledby="confirmation-heading">
        <div className="confirmation-check" aria-hidden="true">
          <Icon name="check" size={32} />
        </div>
        <h1 id="confirmation-heading">Order Confirmed</h1>
        <p>
          Thank you, <strong data-testid="confirmation-name">{order.customer.name}</strong>! Your order has been placed.
        </p>
        <p className="order-id-line">
          Order ID: <strong data-testid="order-id">{order.id}</strong>
        </p>
        <p className="muted small">Placed on {formatDateTime(order.placedAt)}</p>
      </section>

      <div className="checkout-layout">
        <section className="card" aria-labelledby="order-items-heading">
          <h2 id="order-items-heading" className="section-title">
            Items
          </h2>
          <ul className="mini-lines" data-testid="confirmation-items">
            {order.items.map((line) => (
              <li key={line.lineId} className="mini-line" data-testid={`confirmation-item-${line.productId}`}>
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span>{formatPrice(lineTotal(line))}</span>
              </li>
            ))}
          </ul>

          <h2 className="section-title">Delivery</h2>
          <dl className="details-list">
            <div>
              <dt>Email</dt>
              <dd data-testid="confirmation-email">{order.customer.email}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd data-testid="confirmation-address">{order.customer.address || '—'}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>{PAYMENT_LABELS[order.customer.paymentMethod]}</dd>
            </div>
          </dl>
        </section>

        <OrderSummary totals={order.totals} couponCode={order.couponCode} title="Payment Summary">
          <Link to="/" className="btn btn-primary btn-block" data-testid="continue-shopping">
            Continue shopping
          </Link>
        </OrderSummary>
      </div>
    </main>
  );
}

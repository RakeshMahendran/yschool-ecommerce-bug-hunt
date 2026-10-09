import CartItemRow from '../components/CartItemRow';
import CouponForm from '../components/CouponForm';
import EmptyState from '../components/EmptyState';
import Link from '../components/Link';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, totals, coupon } = useCart();

  return (
    <main className="page container" id="main-content">
      <h1 className="page-title">Your Cart</h1>

      {items.length === 0 ? (
        <EmptyState
          testId="empty-cart"
          icon="🛒"
          title="Your cart is empty"
          message="Browse the catalogue and add something you like."
          action={
            <Link to="/" className="btn btn-primary" data-testid="continue-shopping">
              Continue shopping
            </Link>
          }
        />
      ) : (
        <div className="cart-layout">
          <section aria-labelledby="cart-items-heading">
            <h2 id="cart-items-heading" className="sr-only">
              Cart items
            </h2>
            <ul className="cart-list" data-testid="cart-items">
              {items.map((line) => (
                <CartItemRow key={line.lineId} line={line} />
              ))}
            </ul>
            <Link to="/" className="link-back" data-testid="continue-shopping">
              ← Continue shopping
            </Link>
          </section>

          <OrderSummary totals={totals} couponCode={coupon?.code}>
            <CouponForm />
            <Link to="/checkout" className="btn btn-primary btn-block btn-lg" data-testid="checkout-button">
              Proceed to Checkout
            </Link>
          </OrderSummary>
        </div>
      )}
    </main>
  );
}

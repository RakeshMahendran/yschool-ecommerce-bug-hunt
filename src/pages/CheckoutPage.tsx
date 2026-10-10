import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import Link from '../components/Link';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../context/CartContext';
import { useNavigate } from '../context/RouterContext';
import { nextOrderId, saveOrder } from '../hooks/useOrders';
import type { CustomerDetails, Order } from '../types';
import { formatPrice } from '../utils/format';
import { lineTotal } from '../utils/pricing';
import { validateCheckout, type CheckoutErrors } from '../utils/validation';

const EMPTY_FORM: CustomerDetails = { name: '', email: '', phone: '', address: '', paymentMethod: 'cod' };

type TextField = 'name' | 'email' | 'phone' | 'address';
const FIELD_ORDER: TextField[] = ['name', 'email', 'phone', 'address'];

export default function CheckoutPage() {
  const { items, totals, coupon, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomerDetails>(EMPTY_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const fieldRefs = useRef<Partial<Record<TextField, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const next = { ...form, [name]: value } as CustomerDetails;
    setForm(next);
    if (submitted) setErrors(validateCheckout(next));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const validation = validateCheckout(form);
    setErrors(validation);

    const firstInvalid = FIELD_ORDER.find((field) => validation[field]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    const order: Order = {
      id: nextOrderId(),
      placedAt: new Date().toISOString(),
      customer: {
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },
      items,
      couponCode: coupon?.code ?? null,
      totals,
    };
    saveOrder(order);
    clearCart();
    navigate(`/order/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <main className="page container" id="main-content">
        <h1 className="page-title">Checkout</h1>
        <EmptyState
          testId="empty-cart"
          icon="cart"
          title="Your cart is empty"
          message="Add products to your cart before checking out."
          action={
            <Link to="/" className="btn btn-primary" data-testid="continue-shopping">
              Continue shopping
            </Link>
          }
        />
      </main>
    );
  }

  const errorCount = Object.keys(errors).length;

  const describedBy = (field: TextField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(' ') || undefined;

  return (
    <main className="page container" id="main-content">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form card" onSubmit={handleSubmit} noValidate aria-labelledby="delivery-heading" data-testid="checkout-form">
          <h2 id="delivery-heading" className="section-title">
            Delivery details
          </h2>

          {submitted && errorCount > 0 && (
            <div className="form-alert" role="alert" data-testid="form-error-summary">
              Please fix {errorCount} {errorCount === 1 ? 'error' : 'errors'} before placing your order.
            </div>
          )}

          <div className="field">
            <label htmlFor="checkout-name" className="field-label">
              Full name <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="checkout-name"
              name="name"
              className={errors.name ? 'input input-invalid' : 'input'}
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name')}
              ref={(el) => {
                fieldRefs.current.name = el;
              }}
              data-testid="name-input"
            />
            {errors.name && (
              <p id="name-error" className="field-error" data-testid="name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="checkout-email" className="field-label">
              Email address <span className="required" aria-hidden="true">*</span>
            </label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              className={errors.email ? 'input input-invalid' : 'input'}
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="you@example.com"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy('email')}
              ref={(el) => {
                fieldRefs.current.email = el;
              }}
              data-testid="email-input"
            />
            {errors.email && (
              <p id="email-error" className="field-error" data-testid="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="checkout-phone" className="field-label">
              Phone number <span className="muted">(optional)</span>
            </label>
            <input
              id="checkout-phone"
              name="phone"
              type="tel"
              className={errors.phone ? 'input input-invalid' : 'input'}
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              placeholder="10-digit mobile number"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={describedBy('phone')}
              ref={(el) => {
                fieldRefs.current.phone = el;
              }}
              data-testid="phone-input"
            />
            {errors.phone && (
              <p id="phone-error" className="field-error" data-testid="phone-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="checkout-address" className="field-label">
              Delivery address <span className="required" aria-hidden="true">*</span>
            </label>
            <textarea
              id="checkout-address"
              name="address"
              rows={3}
              className={errors.address ? 'input input-invalid' : 'input'}
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
              placeholder="House no., street, city, PIN code"
              required
              aria-invalid={Boolean(errors.address)}
              aria-describedby={describedBy('address')}
              ref={(el) => {
                fieldRefs.current.address = el;
              }}
              data-testid="address-input"
            />
            {errors.address && (
              <p id="address-error" className="field-error" data-testid="address-error">
                {errors.address}
              </p>
            )}
          </div>

          <fieldset className="payment-options">
            <legend className="field-label">Payment method (simulated)</legend>
            <label className="radio">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === 'cod'}
                onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                data-testid="payment-cod"
              />
              Cash on delivery
            </label>
            <label className="radio">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={form.paymentMethod === 'upi'}
                onChange={() => setForm({ ...form, paymentMethod: 'upi' })}
                data-testid="payment-upi"
              />
              UPI (demo, no real payment)
            </label>
          </fieldset>

          <button type="submit" className="btn btn-primary btn-lg btn-block" data-testid="place-order-button">
            Place Order · {formatPrice(totals.total)}
          </button>
          <p className="muted small center">This is a demo store. No payment will be taken.</p>
        </form>

        <OrderSummary totals={totals} couponCode={coupon?.code}>
          <ul className="mini-lines" aria-label="Items in your order" data-testid="checkout-items">
            {items.map((line) => (
              <li key={line.lineId} className="mini-line" data-testid={`checkout-item-${line.productId}`}>
                <span>
                  {line.name} × {line.quantity}
                </span>
                <span>{formatPrice(lineTotal(line))}</span>
              </li>
            ))}
          </ul>
          <Link to="/cart" className="link-back" data-testid="back-to-cart">
            <Icon name="arrow-left" size={16} /> Back to cart
          </Link>
        </OrderSummary>
      </div>
    </main>
  );
}

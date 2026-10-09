import { useState, type FormEvent } from 'react';
import { useCart } from '../context/CartContext';

export default function CouponForm() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = applyCoupon(code);
    setFeedback(result);
    if (result.ok) setCode('');
  };

  const handleRemove = () => {
    removeCoupon();
    setFeedback({ ok: true, message: 'Coupon removed.' });
  };

  return (
    <div className="coupon-box">
      {coupon ? (
        <div className="coupon-applied" data-testid="applied-coupon">
          <span>
            Coupon <strong data-testid="applied-coupon-code">{coupon.code}</strong> applied
          </span>
          <button type="button" className="link-btn" onClick={handleRemove} data-testid="remove-coupon-button">
            Remove coupon
          </button>
        </div>
      ) : (
        <form className="coupon-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="coupon-code" className="field-label">
            Coupon code
          </label>
          <div className="coupon-row">
            <input
              id="coupon-code"
              name="coupon"
              className="input"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Enter coupon code"
              autoComplete="off"
              data-testid="coupon-input"
            />
            <button type="submit" className="btn btn-secondary" data-testid="apply-coupon-button">
              Apply
            </button>
          </div>
        </form>
      )}
      {feedback && (
        <p
          className={feedback.ok ? 'coupon-message text-success' : 'coupon-message text-error'}
          role={feedback.ok ? 'status' : 'alert'}
          data-testid="coupon-message"
        >
          {feedback.message}
        </p>
      )}
    </div>
  );
}

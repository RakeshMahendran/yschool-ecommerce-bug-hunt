import { FREE_SHIPPING_THRESHOLD, STORE_NAME } from '../data/store';
import { formatPrice } from '../utils/format';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">{STORE_NAME}</p>
          <p className="muted">A practice storefront for the Y-School AI testing workshop. No real orders or payments.</p>
        </div>
        <ul className="footer-perks" aria-label="Store policies">
          <li>Free delivery on orders of {formatPrice(FREE_SHIPPING_THRESHOLD)} or more</li>
          <li>Cash on delivery and UPI (simulated)</li>
          <li>7-day easy returns</li>
        </ul>
      </div>
    </footer>
  );
}

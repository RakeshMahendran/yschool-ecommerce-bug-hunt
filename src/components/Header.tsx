import { STORE_NAME } from '../data/store';
import { useLocation } from '../context/RouterContext';
import { useCartBadgeCount } from '../hooks/useCartBadgeCount';
import { resetDemoData } from '../utils/storage';
import Link from './Link';

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20.5" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const cartCount = useCartBadgeCount();

  const handleReset = () => {
    resetDemoData();
    window.location.assign('/');
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label={`${STORE_NAME} home`} data-testid="brand-link">
          <span className="brand-mark" aria-hidden="true">
            Y
          </span>
          <span className="brand-text">
            <span className="brand-name">Y-School</span>
            <span className="brand-sub">Demo Store</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'} data-testid="nav-shop">
            Shop
          </Link>
          <Link
            to="/cart"
            className={pathname === '/cart' ? 'nav-link cart-link active' : 'nav-link cart-link'}
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            data-testid="nav-cart"
          >
            <CartIcon />
            <span className="cart-link-text">Cart</span>
            <span className="cart-badge" data-testid="cart-count" aria-hidden="true">
              {cartCount}
            </span>
          </Link>
          <button type="button" className="btn btn-ghost btn-sm reset-btn" onClick={handleReset} data-testid="reset-demo-button">
            Reset Demo Data
          </button>
        </nav>
      </div>
    </header>
  );
}

import { STORE_NAME } from '../data/store';
import { useLocation } from '../context/RouterContext';
import { useCartBadgeCount } from '../hooks/useCartBadgeCount';
import { resetDemoData } from '../utils/storage';
import Icon from './Icon';
import Link from './Link';

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
          <span className="brand-name">Y-School Store</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/" className={pathname === '/' ? 'nav-link active' : 'nav-link'} data-testid="nav-shop">
            Shop
          </Link>
          <Link
            to="/cart"
            className={pathname === '/cart' ? 'nav-link active' : 'nav-link'}
            aria-label={`Cart, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            data-testid="nav-cart"
          >
            <Icon name="cart" size={20} />
            <span className="cart-link-text">Cart</span>
            <span className="cart-badge" data-testid="cart-count" aria-hidden="true">
              {cartCount}
            </span>
          </Link>
          <button type="button" className="btn btn-ghost btn-sm" onClick={handleReset} data-testid="reset-demo-button">
            Reset Demo Data
          </button>
        </nav>
      </div>
    </header>
  );
}

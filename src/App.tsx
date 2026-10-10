import { useEffect } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Toast from './components/Toast';
import { matchPath, useLocation } from './context/RouterContext';
import { STORE_NAME } from './data/store';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';

function resolveRoute(pathname: string): { title: string; element: JSX.Element } {
  if (matchPath('/', pathname)) return { title: 'Shop', element: <ShopPage /> };
  if (matchPath('/cart', pathname)) return { title: 'Cart', element: <CartPage /> };

  const product = matchPath('/products/:productId', pathname);
  if (product) {
    return {
      title: 'Product',
      element: <ProductDetailPage key={product.productId} productId={product.productId} />,
    };
  }

  return { title: 'Page not found', element: <NotFoundPage /> };
}

export default function App() {
  const { pathname } = useLocation();
  const route = resolveRoute(pathname);

  useEffect(() => {
    document.title = `${route.title} | ${STORE_NAME}`;
  }, [route.title]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header />
      {route.element}
      <Footer />
      <Toast />
    </div>
  );
}

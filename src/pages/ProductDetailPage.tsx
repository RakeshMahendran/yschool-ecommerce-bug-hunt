import AddToCartButton from '../components/AddToCartButton';
import EmptyState from '../components/EmptyState';
import Link from '../components/Link';
import ProductImage from '../components/ProductImage';
import StockStatus from '../components/StockStatus';
import { findProduct } from '../data/products';
import { formatPrice } from '../utils/format';

export default function ProductDetailPage({ productId }: { productId: string }) {
  const product = findProduct(productId);

  if (!product) {
    return (
      <main className="page container" id="main-content">
        <h1 className="sr-only">Product not found</h1>
        <EmptyState
          testId="product-not-found"
          icon="📦"
          title="Product not found"
          message="We couldn't find the product you were looking for."
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
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <article className="product-detail" data-testid={`product-detail-${product.id}`}>
        <div className="product-detail-media">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="category-pill" data-testid="product-category">
            {product.category}
          </span>
          <h1 data-testid="product-name">{product.name}</h1>
          <p className="rating" aria-label={`Rated ${product.rating} out of 5 from ${product.reviewCount} reviews`}>
            ★ {product.rating.toFixed(1)} <span className="muted">({product.reviewCount} reviews)</span>
          </p>
          <p className="price price-lg" data-testid="product-price">
            {formatPrice(product.price)}
          </p>
          <StockStatus product={product} />
          <p className="product-detail-desc">{product.description}</p>
          <h2 className="features-title">Highlights</h2>
          <ul className="features">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="product-detail-actions">
            <AddToCartButton product={product} size="lg" />
            <Link to="/cart" className="btn btn-secondary btn-lg" data-testid="go-to-cart">
              Go to Cart
            </Link>
          </div>
          <p className="muted small">Product ID: {product.id}</p>
        </div>
      </article>
    </main>
  );
}

import AddToCartButton from '../components/AddToCartButton';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
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
          icon="box"
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
      <Link to="/" className="link-back">
        <Icon name="arrow-left" size={16} /> Back to shop
      </Link>

      <article className="product-detail" data-testid={`product-detail-${product.id}`}>
        <div className="product-detail-media">
          <ProductImage src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="category" data-testid="product-category">
            {product.category}
          </span>
          <h1 data-testid="product-name">{product.name}</h1>
          <p className="price price-lg" data-testid="product-price">
            {formatPrice(product.price)}
          </p>
          <StockStatus product={product} />
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-actions">
            <AddToCartButton product={product} size="lg" />
            <Link to="/cart" className="btn btn-ghost btn-lg" data-testid="go-to-cart">
              Go to Cart
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

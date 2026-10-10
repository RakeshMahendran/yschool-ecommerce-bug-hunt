import type { Product } from '../types';
import { formatPrice } from '../utils/format';
import AddToCartButton from './AddToCartButton';
import Link from './Link';
import ProductImage from './ProductImage';
import StockStatus from './StockStatus';

export default function ProductCard({ product }: { product: Product }) {
  const detailsUrl = `/products/${product.id}`;

  return (
    <article
      className="product-card"
      data-testid={`product-card-${product.id}`}
      data-product-id={product.id}
      aria-labelledby={`product-title-${product.id}`}
    >
      <Link to={detailsUrl} className="product-card-media" tabIndex={-1} aria-hidden="true">
        <ProductImage src={product.image} alt={product.name} />
      </Link>
      <div className="product-card-body">
        <span className="category" data-testid="product-category">
          {product.category}
        </span>
        <h3 className="product-card-title" id={`product-title-${product.id}`}>
          <Link to={detailsUrl} data-testid="product-name">
            {product.name}
          </Link>
        </h3>
        <div className="product-card-meta">
          <p className="price" data-testid="product-price">
            {formatPrice(product.price)}
          </p>
          <StockStatus product={product} />
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

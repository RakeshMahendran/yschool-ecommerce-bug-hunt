import type { Product } from '../types';
import { formatPrice } from '../utils/format';
import AddToCartButton from './AddToCartButton';
import Icon from './Icon';
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
        <div className="product-card-meta">
          <span className="category-pill" data-testid="product-category">
            {product.category}
          </span>
          <span className="rating" aria-label={`Rated ${product.rating} out of 5`}>
            <Icon name="star" size={14} filled /> {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="product-card-title" id={`product-title-${product.id}`}>
          <Link to={detailsUrl} data-testid="product-name">
            {product.name}
          </Link>
        </h3>
        <p className="product-card-desc">{product.shortDescription}</p>
        <div className="product-card-footer">
          <div>
            <p className="price" data-testid="product-price">
              {formatPrice(product.price)}
            </p>
            <StockStatus product={product} />
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

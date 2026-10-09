import type { Product } from '../types';
import { isInStock } from '../utils/catalog';

const LOW_STOCK_LEVEL = 10;

export default function StockStatus({ product }: { product: Product }) {
  if (!isInStock(product)) {
    return (
      <span className="stock stock-out" data-testid="stock-status">
        Out of stock
      </span>
    );
  }
  if (product.stock < LOW_STOCK_LEVEL) {
    return (
      <span className="stock stock-low" data-testid="stock-status">
        Only {product.stock} left
      </span>
    );
  }
  return (
    <span className="stock stock-in" data-testid="stock-status">
      In stock
    </span>
  );
}

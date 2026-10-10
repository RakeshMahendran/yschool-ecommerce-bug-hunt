import { useCart } from '../context/CartContext';
import { findProduct } from '../data/products';
import type { CartLine } from '../types';
import { formatPrice } from '../utils/format';
import { lineTotal } from '../utils/pricing';
import Icon from './Icon';
import Link from './Link';
import ProductImage from './ProductImage';

export default function CartItemRow({ line }: { line: CartLine }) {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const stock = findProduct(line.productId)?.stock ?? 0;
  const atMax = line.quantity >= stock;

  return (
    <li
      className="cart-row"
      data-testid={`cart-item-${line.productId}`}
      data-line-id={line.lineId}
      aria-label={`${line.name}, quantity ${line.quantity}`}
    >
      <Link to={`/products/${line.productId}`} className="cart-row-media" tabIndex={-1} aria-hidden="true">
        <ProductImage src={line.image} alt={line.name} />
      </Link>
      <div className="cart-row-info">
        <h3 className="cart-row-title">
          <Link to={`/products/${line.productId}`} data-testid="cart-item-name">
            {line.name}
          </Link>
        </h3>
        <p className="muted">
          Unit price: <span data-testid="cart-item-price">{formatPrice(line.price)}</span>
        </p>
        <button
          type="button"
          className="link-btn link-danger"
          onClick={() => removeItem(line.lineId)}
          aria-label={`Remove ${line.name} from cart`}
          data-testid={`remove-item-${line.productId}`}
        >
          Remove
        </button>
      </div>
      <div className="qty-control" role="group" aria-label={`Quantity for ${line.name}`}>
        <button
          type="button"
          className="qty-btn"
          onClick={() => decreaseQuantity(line.lineId)}
          disabled={line.quantity <= 0}
          aria-label={`Decrease quantity of ${line.name}`}
          data-testid={`decrease-quantity-${line.productId}`}
        >
          <Icon name="minus" size={16} />
        </button>
        <output className="qty-value" aria-live="polite" data-testid={`quantity-${line.productId}`}>
          {line.quantity}
        </output>
        <button
          type="button"
          className="qty-btn"
          onClick={() => increaseQuantity(line.lineId)}
          disabled={atMax}
          aria-label={`Increase quantity of ${line.name}`}
          data-testid={`increase-quantity-${line.productId}`}
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
      <p className="cart-row-total" data-testid="cart-item-total">
        {formatPrice(lineTotal(line))}
      </p>
    </li>
  );
}

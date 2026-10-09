import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import type { Product } from '../types';

interface AddToCartButtonProps {
  product: Product;
  size?: 'md' | 'lg';
}

export default function AddToCartButton({ product, size = 'md' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const unavailable = product.stock < 0;

  const handleClick = () => {
    addToCart(product);
    showToast(`${product.name} added to cart.`);
  };

  return (
    <button
      type="button"
      className={`btn btn-primary ${size === 'lg' ? 'btn-lg' : ''}`}
      onClick={handleClick}
      disabled={unavailable}
      aria-label={`Add ${product.name} to cart`}
      data-testid={`add-to-cart-${product.id}`}
    >
      Add to Cart
    </button>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { findCoupon } from '../data/coupons';
import { findProduct } from '../data/products';
import type { CartLine, CartTotals, CouponRule, Product } from '../types';
import { calculateTotals } from '../utils/pricing';
import { STORAGE_KEYS, readJSON, writeJSON } from '../utils/storage';

export interface CartState {
  items: CartLine[];
  coupon: CouponRule | null;
  nextLineNo: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'INCREASE'; lineId: string }
  | { type: 'DECREASE'; lineId: string }
  | { type: 'REMOVE_ITEM'; lineId: string }
  | { type: 'APPLY_COUPON'; coupon: CouponRule }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR' };

export interface CouponResult {
  ok: boolean;
  message: string;
}

interface CartValue {
  items: CartLine[];
  coupon: CouponRule | null;
  totals: CartTotals;
  addToCart: (product: Product) => void;
  increaseQuantity: (lineId: string) => void;
  decreaseQuantity: (lineId: string) => void;
  removeItem: (lineId: string) => void;
  applyCoupon: (code: string) => CouponResult;
  removeCoupon: () => void;
  clearCart: () => void;
}

export const EMPTY_CART: CartState = { items: [], coupon: null, nextLineNo: 1 };

function maxQuantityFor(productId: string): number {
  return findProduct(productId)?.stock ?? 0;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product } = action;
      const lineId = `${product.id}-${state.nextLineNo}`;
      const existing = state.items.find((item) => item.lineId === lineId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.lineId === lineId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      const line: CartLine = {
        lineId,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      return { ...state, items: [...state.items, line], nextLineNo: state.nextLineNo + 1 };
    }
    case 'INCREASE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.lineId === action.lineId && item.quantity < maxQuantityFor(item.productId)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case 'DECREASE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.lineId === action.lineId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        ),
      };
    case 'REMOVE_ITEM': {
      const items = state.items.filter((item) => item.lineId !== action.lineId);
      state = { ...state, items };
    }
    case 'CLEAR':
      return { ...state, items: [], coupon: null };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.coupon };
    case 'REMOVE_COUPON':
      return { ...state, coupon: null };
    default:
      return state;
  }
}

function loadCart(): CartState {
  const stored = readJSON<Partial<CartState>>(STORAGE_KEYS.cart, EMPTY_CART);
  return {
    items: Array.isArray(stored.items) ? stored.items : [],
    coupon: stored.coupon ?? null,
    nextLineNo: typeof stored.nextLineNo === 'number' ? stored.nextLineNo : 1,
  };
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useLayoutEffect(() => {
    writeJSON(STORAGE_KEYS.cart, state);
  }, [state]);

  const addToCart = useCallback((product: Product) => dispatch({ type: 'ADD_ITEM', product }), []);
  const increaseQuantity = useCallback((lineId: string) => dispatch({ type: 'INCREASE', lineId }), []);
  const decreaseQuantity = useCallback((lineId: string) => dispatch({ type: 'DECREASE', lineId }), []);
  const removeItem = useCallback((lineId: string) => dispatch({ type: 'REMOVE_ITEM', lineId }), []);
  const removeCoupon = useCallback(() => dispatch({ type: 'REMOVE_COUPON' }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const applyCoupon = useCallback((code: string): CouponResult => {
    if (!code.trim()) {
      return { ok: false, message: 'Please enter a coupon code.' };
    }
    const coupon = findCoupon(code);
    if (!coupon) {
      return { ok: false, message: `Coupon "${code.trim()}" is not valid.` };
    }
    dispatch({ type: 'APPLY_COUPON', coupon });
    return { ok: true, message: `Coupon ${coupon.code} applied: ${coupon.description}.` };
  }, []);

  const totals = useMemo(() => calculateTotals(state.items, state.coupon), [state.items, state.coupon]);

  const value = useMemo<CartValue>(
    () => ({
      items: state.items,
      coupon: state.coupon,
      totals,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      applyCoupon,
      removeCoupon,
      clearCart,
    }),
    [state, totals, addToCart, increaseQuantity, decreaseQuantity, removeItem, applyCoupon, removeCoupon, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

export type Category = 'Electronics' | 'Fashion' | 'Home & Lifestyle';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDescription: string;
  description: string;
  features: string[];
  tags: string[];
}

export interface CartLine {
  lineId: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CouponRule {
  code: string;
  type: string;
  value: number;
  description: string;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export type PaymentMethod = 'cod' | 'upi';

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  placedAt: string;
  customer: CustomerDetails;
  items: CartLine[];
  couponCode: string | null;
  totals: CartTotals;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

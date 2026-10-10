export type Category = 'Electronics' | 'Fashion' | 'Home & Lifestyle';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  image: string;
  description: string;
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

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

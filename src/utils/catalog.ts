import type { Product, SortOption } from '../types';

export interface CatalogFilters {
  query: string;
  category: string;
  sort: SortOption;
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

export function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((option) => option.value === value);
}

function matchesCategory(product: Product, category: string): boolean {
  if (category === 'all') return true;
  return product.category === category || product.tags.includes(category.toLowerCase());
}

function matchesQuery(product: Product, query: string): boolean {
  return query.length === 0 || product.name.includes(query);
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => String(a.price).localeCompare(String(b.price)));
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return sorted;
  }
}

export function applyCatalogFilters(products: Product[], filters: CatalogFilters): Product[] {
  const visible = products.filter(
    (product) => matchesCategory(product, filters.category) && matchesQuery(product, filters.query),
  );
  return sortProducts(visible, filters.sort);
}

export function isInStock(product: Product): boolean {
  return product.stock > 0;
}

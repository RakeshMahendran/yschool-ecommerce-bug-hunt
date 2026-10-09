import { useMemo, type ChangeEvent } from 'react';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { FREE_SHIPPING_THRESHOLD } from '../data/store';
import { SORT_OPTIONS, applyCatalogFilters, isSortOption } from '../utils/catalog';
import { formatPrice } from '../utils/format';

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const sortParam = params.get('sort');
  const sort = isSortOption(sortParam) ? sortParam : 'featured';
  const filtersActive = query !== '' || category !== 'all' || sort !== 'featured';

  const products = useMemo(() => applyCatalogFilters(PRODUCTS, { query, category, sort }), [query, category, sort]);

  const updateParam = (key: string, value: string, defaultValue: string) => {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next);
  };

  const resetFilters = () => setParams(new URLSearchParams());

  return (
    <main className="page" id="main-content">
      <section className="hero" aria-labelledby="shop-heading">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow">New season · Campus essentials</p>
            <h1 id="shop-heading">Shop all products</h1>
            <p className="hero-copy">
              Gadgets, apparel and everyday essentials for students. Free delivery on orders of{' '}
              {formatPrice(FREE_SHIPPING_THRESHOLD)} or more.
            </p>
          </div>
          <div className="hero-offer" aria-label="Current offer">
            <span className="hero-offer-label">Use code</span>
            <span className="hero-offer-code">SAVE10</span>
            <span className="hero-offer-label">for 10% off your order</span>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="toolbar" aria-label="Search and filter products">
          <div className="field search-field">
            <label htmlFor="product-search" className="field-label">
              Search products
            </label>
            <input
              id="product-search"
              type="search"
              className="input"
              placeholder="Search by product name…"
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateParam('q', event.target.value, '')}
              data-testid="search-input"
            />
          </div>
          <div className="field">
            <label htmlFor="category-filter" className="field-label">
              Category
            </label>
            <select
              id="category-filter"
              className="input"
              value={category}
              onChange={(event) => updateParam('category', event.target.value, 'all')}
              data-testid="category-filter"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="sort-select" className="field-label">
              Sort by
            </label>
            <select
              id="sort-select"
              className="input"
              value={sort}
              onChange={(event) => updateParam('sort', event.target.value, 'featured')}
              data-testid="sort-select"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-ghost toolbar-reset"
            onClick={resetFilters}
            disabled={!filtersActive}
            data-testid="reset-filters-button"
          >
            Reset filters
          </button>
        </section>

        <p className="results-count" role="status" data-testid="results-count">
          Showing {products.length} of {PRODUCTS.length} products
        </p>

        {products.length === 0 ? (
          <EmptyState
            testId="empty-results"
            icon="🔍"
            title="No products found"
            message="No products match your search or filters. Try a different search term or reset the filters."
            action={
              <button type="button" className="btn btn-primary" onClick={resetFilters}>
                Reset filters
              </button>
            }
          />
        ) : (
          <ul className="product-grid" aria-label="Products" data-testid="product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

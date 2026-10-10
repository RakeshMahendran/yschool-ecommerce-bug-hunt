import { useMemo, type ChangeEvent } from 'react';
import EmptyState from '../components/EmptyState';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from '../context/RouterContext';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { SORT_OPTIONS, applyCatalogFilters, isSortOption } from '../utils/catalog';

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
    <main className="page container" id="main-content">
      <header className="page-header">
        <div>
          <h1>Shop all products</h1>
          <p className="muted">Gadgets, apparel and everyday essentials.</p>
        </div>
        <p className="promo">
          Use code <strong>SAVE10</strong> for 10% off
        </p>
      </header>

      <section className="toolbar" aria-label="Search and filter products">
        <div className="field search-field">
          <label htmlFor="product-search" className="field-label">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            className="input"
            placeholder="Search by product name"
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
          className="btn btn-ghost"
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
          icon="search"
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
    </main>
  );
}

import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { categories, } from '../../data/categories.js';
import { inSection, categoriesFor, productTypes, PRICE_RANGES } from '../../utils/productHelpers.js';
import { EmptyState, Button } from '../common/ui.jsx';
import { ProductGrid } from './ProductCard.jsx';

const SORTS = [
  { id: 'featured', label: 'Featured' }, { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' }, { id: 'price-desc', label: 'Price: high to low' },
];
const STATUSES = [{ id: '', label: 'Free and paid' }, { id: 'free', label: 'Free only' }, { id: 'paid', label: 'Paid only' }];

// Shared search / filter / sort browser. `section` ('kids' | 'adults') limits it to one section; omit for the whole catalog.
export default function ProductBrowser({ section }) {
  const [params, setParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const base = useMemo(() => inSection(section), [section]);
  const cats = section ? categoriesFor(section) : categories;
  const types = section ? [...new Set(base.map((p) => p.productType))] : productTypes;
  const q = params.get('q') || '';
  const cat = cats.some((c) => c.slug === params.get('category')) ? params.get('category') : '';
  const type = params.get('type') || '';
  const status = ['free', 'paid'].includes(params.get('status')) ? params.get('status') : '';
  const price = PRICE_RANGES.some((r) => r.id === params.get('price')) ? params.get('price') : 'all';
  const sort = SORTS.some((s) => s.id === params.get('sort')) ? params.get('sort') : 'featured';

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || (key === 'sort' && value === 'featured')) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.id === price);
    const catName = cats.find((c) => c.slug === cat)?.name;
    const list = base.filter((p) => {
      if (catName && p.category !== catName) return false;
      if (type && p.productType !== type) return false;
      if (status === 'free' && !p.isFree) return false;
      if (status === 'paid' && p.isFree) return false;
      if (!range.test(p)) return false;
      if (!term) return true;
      return [p.title, p.shortDescription, p.category, p.productType, p.section, p.isFree ? 'free' : '', ...p.keywords].join(' ').toLowerCase().includes(term);
    });
    const idx = new Map(base.map((p, i) => [p.id, i]));
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') list.sort((a, b) => idx.get(b.id) - idx.get(a.id)); // later in products.js = newer
    else list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || idx.get(a.id) - idx.get(b.id));
    return list;
  }, [base, cats, q, cat, type, status, price, sort]);

  const active = q || cat || type || status || price !== 'all';
  const clear = () => setParams({}, { replace: true });
  return (
    <div className="shop">
      <button type="button" className="btn btn--soft filters-toggle" aria-expanded={showFilters} aria-controls={`filters-${section || 'all'}`} onClick={() => setShowFilters((s) => !s)}><SlidersHorizontal size={18} aria-hidden="true" /> Filters</button>
      <aside id={`filters-${section || 'all'}`} className={`filters ${showFilters ? 'filters--open' : ''}`} aria-label="Product filters">
        <div className="field"><label htmlFor="f-q">Search</label><input id="f-q" type="search" value={q} onChange={(e) => update('q', e.target.value)} placeholder="Search products" /></div>
        <div className="field"><label htmlFor="f-cat">Category</label>
          <select id="f-cat" value={cat} onChange={(e) => update('category', e.target.value)}><option value="">All categories</option>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
        <div className="field"><label htmlFor="f-status">Free or paid</label>
          <select id="f-status" value={status} onChange={(e) => update('status', e.target.value)}>{STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
        <div className="field"><label htmlFor="f-type">Product type</label>
          <select id="f-type" value={type} onChange={(e) => update('type', e.target.value)}><option value="">All types</option>{types.map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
        <div className="field"><label htmlFor="f-price">Price</label>
          <select id="f-price" value={price} onChange={(e) => update('price', e.target.value)}>{PRICE_RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}</select></div>
        <Button variant="ghost" disabled={!active && sort === 'featured'} onClick={clear}>Clear all filters</Button>
      </aside>
      <div>
        {section && (
          <nav aria-label="Categories" className="chips">
            <button type="button" className={`chip ${!cat ? 'is-active' : ''}`} aria-pressed={!cat} onClick={() => update('category', '')}>All</button>
            {cats.map((c) => <button type="button" key={c.slug} className={`chip ${cat === c.slug ? 'is-active' : ''}`} aria-pressed={cat === c.slug} onClick={() => update('category', c.slug)}>{c.name}</button>)}
          </nav>
        )}
        <div className="shop__bar">
          <p role="status" aria-live="polite">{results.length} product{results.length === 1 ? '' : 's'} found</p>
          <div className="field field--inline"><label htmlFor="f-sort">Sort by</label>
            <select id="f-sort" value={sort} onChange={(e) => update('sort', e.target.value)}>{SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}</select></div>
        </div>
        {results.length ? <ProductGrid products={results} /> : (
          <EmptyState title="No products match your search" text="Try different keywords or clear your filters."><Button onClick={clear}>Clear all filters</Button></EmptyState>
        )}
      </div>
    </div>
  );
}

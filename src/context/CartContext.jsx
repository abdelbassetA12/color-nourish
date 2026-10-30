import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { getProduct } from '../utils/productHelpers.js';
import { toCents, fromCents } from '../utils/currency.js';

const KEY = 'lls-cart-v1';
const MAX_QTY = 10;
const CartContext = createContext(null);
const clamp = (n) => Math.min(MAX_QTY, Math.max(1, Math.floor(Number(n)) || 1));

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw.filter((i) => i && typeof i.slug === 'string').map((i) => ({ slug: i.slug, qty: clamp(i.qty) })) : [];
  } catch { return []; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);
  const [toast, setToast] = useState('');

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ } }, [items]);
  useEffect(() => { if (!toast) return undefined; const t = setTimeout(() => setToast(''), 2800); return () => clearTimeout(t); }, [toast]);

  const notify = useCallback((m) => setToast(m), []);
  const add = useCallback((slug) => {
    const p = getProduct(slug);
    if (!p) return;
    setItems((cur) => cur.some((i) => i.slug === slug)
      ? cur.map((i) => (i.slug === slug ? { ...i, qty: clamp(i.qty + 1) } : i))
      : [...cur, { slug, qty: 1 }]);
    setToast(`“${p.title}” added to your cart.`);
  }, []);
  const remove = useCallback((slug) => setItems((c) => c.filter((i) => i.slug !== slug)), []);
  const setQty = useCallback((slug, q) => setItems((c) => c.map((i) => (i.slug === slug ? { ...i, qty: clamp(q) } : i))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    // Prices always come from the catalog, never from storage. Missing products are surfaced separately.
    const lines = []; const missing = [];
    items.forEach((i) => { const product = getProduct(i.slug); product ? lines.push({ product, qty: i.qty }) : missing.push(i.slug); });
    const totalCents = lines.reduce((s, l) => s + toCents(l.product.price) * l.qty, 0);
    return { lines, missing, count: lines.reduce((s, l) => s + l.qty, 0), total: fromCents(totalCents), add, remove, setQty, clear, notify, toast, MAX_QTY };
  }, [items, add, remove, setQty, clear, notify, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);

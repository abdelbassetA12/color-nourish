import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { getProduct } from '../utils/productHelpers.js';

const KEY = 'lls-favorites-v1';
const FavoritesContext = createContext(null);

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    // drop unknown / unpublished products silently
    return [...new Set(raw.filter((s) => typeof s === 'string' && getProduct(s)))];
  } catch { return []; }
}

export function FavoritesProvider({ children }) {
  const [slugs, setSlugs] = useState(load);
  const [toast, setToast] = useState('');

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(slugs)); } catch { /* storage unavailable */ } }, [slugs]);
  useEffect(() => { if (!toast) return undefined; const t = setTimeout(() => setToast(''), 2500); return () => clearTimeout(t); }, [toast]);

  const toggle = useCallback((slug) => {
    const p = getProduct(slug);
    if (!p) return;
    const exists = slugs.includes(slug);
    setSlugs(exists ? slugs.filter((s) => s !== slug) : [...slugs, slug]);
    setToast(exists ? `“${p.title}” removed from favorites.` : `“${p.title}” saved to favorites.`);
  }, [slugs]);
  const remove = useCallback((slug) => setSlugs((c) => c.filter((s) => s !== slug)), []);
  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo(() => {
    const favorites = slugs.map(getProduct).filter(Boolean);
    return { favorites, count: favorites.length, isFavorite: (slug) => slugs.includes(slug), toggle, remove, clear, toast };
  }, [slugs, toggle, remove, clear, toast]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export const useFavorites = () => useContext(FavoritesContext);
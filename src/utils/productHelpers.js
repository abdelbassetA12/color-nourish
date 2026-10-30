import { products } from '../data/products.js';
import { categories } from '../data/categories.js';

const isValid = (p) => p && p.slug && p.title && Number.isFinite(Number(p.price)) && Number(p.price) >= 0;
export const allProducts = products.filter((p) => isValid(p) && p.published !== false);
export const getProduct = (slug) => allProducts.find((p) => p.slug === slug) || null;
export const hasDiscount = (p) => Number(p.originalPrice) > Number(p.price);
export const categorySlug = (name) => categories.find((c) => c.name === name)?.slug || '';
export const categoryName = (slug) => categories.find((c) => c.slug === slug)?.name || '';
export const productTypes = [...new Set(allProducts.map((p) => p.productType))];
export const featuredProducts = () => allProducts.filter((p) => p.featured);
export const productsInCategory = (name) => allProducts.filter((p) => p.category === name);
export function related(p, n = 3) {
  const same = allProducts.filter((x) => x.slug !== p.slug && x.category === p.category);
  const rest = allProducts.filter((x) => x.slug !== p.slug && x.category !== p.category);
  return [...same, ...rest].slice(0, n);
}
export const PRICE_RANGES = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'under3', label: 'Under $3', test: (p) => p.price < 3 },
  { id: '3to5', label: '$3 – $5', test: (p) => p.price >= 3 && p.price <= 5 },
  { id: 'over5', label: 'Over $5', test: (p) => p.price > 5 },
];
// Valid https purchase URL for a product, or null when not configured.
export function purchaseUrl(p) {
  const url = p.purchaseMode === 'etsy' ? p.etsyUrl : p.purchaseMode === 'amazon' ? p.amazonUrl : '';
  return /^https:\/\/\S+$/i.test(url || '') ? url : null;
}
export const purchaseLabel = (p) => (p.purchaseMode === 'amazon' ? 'Buy on Amazon' : 'Buy on Etsy');

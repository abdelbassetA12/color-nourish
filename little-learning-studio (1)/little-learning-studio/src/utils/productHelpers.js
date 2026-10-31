import { products } from '../data/products.js';
import { categories } from '../data/categories.js';

const httpsOk = (u) => /^https:\/\/\S+$/i.test(u || '');
const downloadOk = (u) => /^(\/(?!\/)|https:\/\/)\S+$/i.test(u || '');

// Fills in defaults so older product objects (etsyUrl, gallery, no section…) keep working.
export function normalizeProduct(p) {
  const section = p.section === 'adults' ? 'adults' : 'kids';
  const productStatus = p.productStatus || (Number(p.price) === 0 ? 'free' : 'paid');
  const isFree = productStatus === 'free';
  const legacy = p.purchaseMode === 'amazon' ? p.amazonUrl : p.purchaseMode === 'etsy' ? p.etsyUrl : p.etsyUrl || p.amazonUrl;
  return {
    ...p, section, productStatus, isFree,
    price: isFree ? 0 : Number(p.price),
    externalPurchaseUrl: p.externalPurchaseUrl || legacy || '',
    previewImages: p.previewImages?.length ? p.previewImages : p.gallery || [],
    keywords: p.keywords || [],
  };
}

// errors => product is hidden; warnings => product is shown with an honest fallback.
export function validateProduct(p) {
  const errors = []; const warnings = [];
  if (!p.slug || !p.title) errors.push('missing slug or title');
  if (!Number.isFinite(p.price) || p.price < 0) errors.push('invalid price');
  if (p.isFree && !downloadOk(p.downloadUrl)) errors.push('free product needs a valid downloadUrl');
  if (!p.isFree && !(p.price > 0)) errors.push('paid product needs a price above 0');
  if (!p.isFree && !httpsOk(p.externalPurchaseUrl)) warnings.push('paid product has no valid https externalPurchaseUrl yet');
  return { errors, warnings };
}

export const allProducts = products.map(normalizeProduct).filter((p) => {
  if (p.published === false) return false;
  const { errors, warnings } = validateProduct(p);
  if (import.meta.env?.DEV && (errors.length || warnings.length)) console.warn(`[products] ${p.slug || p.id}: ${[...errors, ...warnings].join('; ')}`);
  return errors.length === 0;
});

export const getProduct = (slug) => allProducts.find((p) => p.slug === slug) || null;
export const hasDiscount = (p) => !p.isFree && Number(p.originalPrice) > Number(p.price);
export const categorySlug = (name) => categories.find((c) => c.name === name)?.slug || '';
export const categoryName = (slug) => categories.find((c) => c.slug === slug)?.name || '';
export const categoriesFor = (section) => categories.filter((c) => c.section === section);
export const inSection = (section) => (section ? allProducts.filter((p) => p.section === section) : allProducts);
export const productTypes = [...new Set(allProducts.map((p) => p.productType))];
export const featuredProducts = (section) => inSection(section).filter((p) => p.featured);
export const freeProducts = (section) => inSection(section).filter((p) => p.isFree);
export const productsInCategory = (name) => allProducts.filter((p) => p.category === name);
export function related(p, n = 3) {
  const pool = allProducts.filter((x) => x.slug !== p.slug && x.section === p.section);
  return [...pool.filter((x) => x.category === p.category), ...pool.filter((x) => x.category !== p.category)].slice(0, n);
}
export const PRICE_RANGES = [
  { id: 'all', label: 'Any price', test: () => true },
  { id: 'under3', label: 'Under $3 (incl. free)', test: (p) => p.price < 3 },
  { id: '3to5', label: '$3 – $5', test: (p) => p.price >= 3 && p.price <= 5 },
  { id: 'over5', label: 'Over $5', test: (p) => p.price > 5 },
];
export const purchaseUrl = (p) => (!p.isFree && httpsOk(p.externalPurchaseUrl) ? p.externalPurchaseUrl : null);
export const downloadHref = (p) => (p.isFree && downloadOk(p.downloadUrl) ? p.downloadUrl : null);
export function purchaseLabel(p) {
  const u = purchaseUrl(p) || '';
  if (/etsy\./i.test(u)) return 'Buy on Etsy';
  if (/amazon\./i.test(u)) return 'Buy on Amazon';
  return 'Get This Product';
}
export const fileName = (p) => (p.downloadUrl || '').split('/').pop() || 'download.pdf';

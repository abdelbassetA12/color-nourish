import { site } from '../config/site.js';
export function formatPrice(amount, currency = site.currency) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat(site.locale, { style: 'currency', currency }).format(n);
}
// Work in cents to avoid floating point drift
export const toCents = (n) => Math.round(Number(n) * 100);
export const fromCents = (c) => c / 100;

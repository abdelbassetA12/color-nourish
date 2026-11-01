import { site } from '../config/site.js';

const KEY = 'cn-analytics-v1';
const IGNORE = 'cn-analytics-ignore';
const cfg = () => site.analytics || {};
export const adminPath = () => cfg().adminPath || '/stats-admin';

const blank = () => ({
  v: 1, since: Date.now(),
  totals: { pageViews: 0, sessions: 0, productViews: 0, productClicks: 0, downloads: 0, buyClicks: 0, favAdds: 0, favRemoves: 0, searches: 0 },
  products: {}, days: {}, pages: {}, searches: {},
});
function read() {
  try { const d = JSON.parse(localStorage.getItem(KEY)); return d && d.v === 1 ? d : blank(); } catch { return blank(); }
}
function write(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage unavailable */ } }
const dayKey = () => new Date().toISOString().slice(0, 10);

export const isIgnored = () => { try { return localStorage.getItem(IGNORE) === '1'; } catch { return false; } };
export function setIgnored(on) { try { on ? localStorage.setItem(IGNORE, '1') : localStorage.removeItem(IGNORE); } catch { /* ignore */ } }
export const getStats = () => read();
export function resetStats() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }

// event type -> [total counter, per-product counter]
const MAP = {
  session_start: ['sessions', null], page_view: ['pageViews', null], product_view: ['productViews', 'views'],
  product_click: ['productClicks', 'clicks'], download: ['downloads', 'downloads'], buy_click: ['buyClicks', 'buyClicks'],
  favorite_add: ['favAdds', 'favs'], favorite_remove: ['favRemoves', null], search: ['searches', null],
};
const DAY_FIELDS = ['pageViews', 'downloads', 'buyClicks', 'productViews'];

let gaReady = false;
function ensureGA() {
  const id = cfg().ga4Id;
  if (!id) return false;
  if (gaReady) return true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); }; // must be a function, not an arrow
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true });
  gaReady = true;
  return true;
}

function sendRemote(type, data) {
  const payload = { type, ...data, path: window.location.pathname, t: Date.now() };
  if (ensureGA()) window.gtag('event', type, { item_id: data.slug, source: data.source, search_term: data.term, page_path: payload.path });
  const url = cfg().endpoint;
  if (url && navigator.sendBeacon) navigator.sendBeacon(url, JSON.stringify(payload));
}

export function track(type, data = {}) {
  if (typeof window === 'undefined' || isIgnored() || !MAP[type]) return;
  const [totalKey, productKey] = MAP[type];
  const d = read();
  d.totals[totalKey] = (d.totals[totalKey] || 0) + 1;
  const day = (d.days[dayKey()] = d.days[dayKey()] || { pageViews: 0, downloads: 0, buyClicks: 0, productViews: 0 });
  if (DAY_FIELDS.includes(totalKey)) day[totalKey] += 1;
  if (data.slug) {
    const p = (d.products[data.slug] = d.products[data.slug] || { views: 0, clicks: 0, downloads: 0, buyClicks: 0, favs: 0 });
    if (productKey) p[productKey] += 1;
  }
  if (type === 'page_view' && data.path) d.pages[data.path] = (d.pages[data.path] || 0) + 1;
  if (type === 'search' && data.term) { const t = data.term.toLowerCase().slice(0, 60); d.searches[t] = (d.searches[t] || 0) + 1; }
  write(d);
  sendRemote(type, data);
}

export function trackPageView(path) {
  try {
    if (!sessionStorage.getItem('cn-session')) { sessionStorage.setItem('cn-session', '1'); track('session_start'); }
  } catch { /* ignore */ }
  track('page_view', { path });
}
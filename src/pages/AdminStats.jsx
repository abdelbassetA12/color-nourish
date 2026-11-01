import { useEffect, useMemo, useState } from 'react';
import { allProducts } from '../utils/productHelpers.js';
import { getStats, resetStats, isIgnored, setIgnored } from '../utils/analytics.js';
import { site } from '../config/site.js';
import { Container } from '../components/common/ui.jsx';

const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : '—');
const COLS = [
  ['title', 'Product'], ['type', 'Type'], ['clicks', 'Card clicks'], ['views', 'Page views'],
  ['downloads', 'Downloads'], ['buyClicks', 'Buy clicks'], ['favs', 'Favorites'], ['conv', 'Conversion'],
];

export default function AdminStats() {
  const [stats, setStats] = useState(getStats);
  const [ignored, setIg] = useState(isIgnored);
  const [range, setRange] = useState(14);
  const [sort, setSort] = useState({ key: 'downloads', dir: 'desc' });

  useEffect(() => {
    document.title = 'Stats';
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  const rows = useMemo(() => allProducts.map((p) => {
    const s = stats.products[p.slug] || {};
    const views = s.views || 0; const downloads = s.downloads || 0; const buyClicks = s.buyClicks || 0;
    return {
      slug: p.slug, title: p.title, type: p.isFree ? 'Free' : 'Paid', clicks: s.clicks || 0, views, downloads, buyClicks,
      favs: s.favs || 0, conv: views ? (p.isFree ? downloads : buyClicks) / views : 0,
    };
  }).sort((a, b) => {
    const x = a[sort.key]; const y = b[sort.key];
    const r = typeof x === 'string' ? x.localeCompare(y) : x - y;
    return sort.dir === 'asc' ? r : -r;
  }), [stats, sort]);

  const days = useMemo(() => [...Array(range)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (range - 1 - i));
    const key = d.toISOString().slice(0, 10);
    return { key, ...(stats.days[key] || {}) };
  }), [stats, range]);
  const maxDay = Math.max(1, ...days.map((d) => Math.max(d.pageViews || 0, d.downloads || 0)));

  const t = stats.totals;
  const kpis = [
    ['Page views', t.pageViews], ['Sessions', t.sessions], ['Product page views', t.productViews], ['Card clicks', t.productClicks],
    ['Free downloads', t.downloads], ['Buy clicks', t.buyClicks], ['Favorites added', t.favAdds], ['Searches', t.searches],
  ];
  const topPages = Object.entries(stats.pages).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const topSearches = Object.entries(stats.searches).sort((a, b) => b[1] - a[1]).slice(0, 10);

  const exportCsv = () => {
    const head = ['product', 'type', 'card_clicks', 'page_views', 'downloads', 'buy_clicks', 'favorites', 'conversion'];
    const lines = rows.map((r) => [`"${r.title.replace(/"/g, '""')}"`, r.type, r.clicks, r.views, r.downloads, r.buyClicks, r.favs, (r.conv * 100).toFixed(1) + '%'].join(','));
    const url = URL.createObjectURL(new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' }));
    const a = document.createElement('a'); a.href = url; a.download = 'colornourish-stats.csv'; a.click(); URL.revokeObjectURL(url);
  };
  const sortBy = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));

  return (
    <section className="section"><Container>
      <h1>Statistics</h1>
      <div className="notice notice--warn st-banner">
        <span>
          This page shows events recorded <strong>in this browser only</strong> (your own visits and tests). Real visitor totals come from Google Analytics 4
          {site.analytics?.ga4Id ? ' (connected).' : ' (not connected yet: set analytics.ga4Id in site.js).'}
        </span>
        {site.analytics?.ga4Id && <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">Open Google Analytics</a>}
      </div>

      <div className="st-kpis">{kpis.map(([k, v]) => <div className="card st-kpi" key={k}><span className="muted">{k}</span><strong>{v || 0}</strong></div>)}</div>

      <div className="st-toolbar">
        <label>Chart range <select value={range} onChange={(e) => setRange(Number(e.target.value))}><option value={7}>7 days</option><option value={14}>14 days</option><option value={30}>30 days</option></select></label>
        <button type="button" className="btn btn--soft btn--sm" onClick={() => setStats(getStats())}>Refresh</button>
        <button type="button" className="btn btn--soft btn--sm" onClick={exportCsv}>Export CSV</button>
        <label className="st-check"><input type="checkbox" checked={ignored} onChange={(e) => { setIgnored(e.target.checked); setIg(e.target.checked); }} /> Don’t track this browser</label>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => { if (window.confirm('Delete all locally recorded stats?')) { resetStats(); setStats(getStats()); } }}>Reset</button>
      </div>

      <h2>Last {range} days</h2>
      <div className="card st-chart" role="img" aria-label="Daily page views and downloads">
        {days.map((d) => (
          <div className="st-day" key={d.key} title={`${d.key}: ${d.pageViews || 0} views, ${d.downloads || 0} downloads`}>
            <div className="st-bars"><i className="st-bar st-bar--v" style={{ height: `${((d.pageViews || 0) / maxDay) * 100}%` }} /><i className="st-bar st-bar--d" style={{ height: `${((d.downloads || 0) / maxDay) * 100}%` }} /></div>
            <span>{d.key.slice(8)}</span>
          </div>
        ))}
      </div>
      <p className="muted st-legend"><i className="st-bar st-bar--v" /> Page views <i className="st-bar st-bar--d" /> Downloads</p>

      <h2>Products</h2>
      <div className="st-scroll"><table className="st-table">
        <thead><tr>{COLS.map(([k, label]) => (
          <th key={k} aria-sort={sort.key === k ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
            <button type="button" onClick={() => sortBy(k)}>{label}{sort.key === k ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</button>
          </th>))}</tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.slug}><td>{r.title}</td><td>{r.type}</td><td>{r.clicks}</td><td>{r.views}</td><td>{r.downloads}</td><td>{r.buyClicks}</td><td>{r.favs}</td><td>{pct(r.conv, 1)}</td></tr>))}</tbody>
      </table></div>
      <p className="muted">Conversion = downloads ÷ page views for free products, buy clicks ÷ page views for paid products.</p>

      <div className="st-two">
        <div><h2>Top pages</h2><table className="st-table"><tbody>{topPages.length ? topPages.map(([p, n]) => <tr key={p}><td>{p}</td><td>{n}</td></tr>) : <tr><td className="muted">No data yet</td></tr>}</tbody></table></div>
        <div><h2>Top searches</h2><table className="st-table"><tbody>{topSearches.length ? topSearches.map(([p, n]) => <tr key={p}><td>{p}</td><td>{n}</td></tr>) : <tr><td className="muted">No data yet</td></tr>}</tbody></table></div>
      </div>
      <p className="muted">Recording since {new Date(stats.since).toLocaleDateString()}.</p>
    </Container></section>
  );
}

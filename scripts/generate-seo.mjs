// Generates public/sitemap.xml and public/robots.txt from site config + products. Runs before dev/build.
import { writeFileSync } from 'node:fs';
import { site } from '../src/config/site.js';
import { products } from '../src/data/products.js';

const base = (site.siteUrl || '').replace(/\/$/, '');
if (!base || base.includes('example.com')) console.warn('[seo] site.siteUrl is a placeholder: set your real domain in src/config/site.js');
const downloadOk = (u) => /^(\/(?!\/)|https:\/\/)\S+$/i.test(u || '');
const pages = ['/', '/kids', '/adults', '/shop', '/categories', '/about', '/faq', '/contact', '/privacy', '/terms', '/refund-policy', '/digital-downloads'];
const items = products.filter((p) => {
  if (p.published === false || !p.slug) return false;
  const free = (p.productStatus || (Number(p.price) === 0 ? 'free' : 'paid')) === 'free';
  return !free || downloadOk(p.downloadUrl); // same rule as the app: broken free products are hidden
}).map((p) => `/product/${p.slug}`);
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages, ...items].map((u) => `  <url><loc>${base}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml);
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nDisallow: /cart\n\nSitemap: ${base}/sitemap.xml\n`);
console.log(`[seo] sitemap.xml (${pages.length + items.length} urls) and robots.txt written`);

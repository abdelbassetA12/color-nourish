import { useEffect } from 'react';
import { site } from '../config/site.js';
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) { el?.remove(); return; }
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
// Client-side only: crawlers that do not run JavaScript will not see these tags.
// image: optional path or absolute URL used for og:image. type: og:type (default 'website').
export function useSeo(title, description, { image, type = 'website' } = {}) {
  useEffect(() => {
    const full = title ? `${title} | ${site.brandName}` : site.brandName;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', site.brandName);
    const abs = (u) => (/^https?:\/\//.test(u) ? u : site.siteUrl + u);
    setMeta('property', 'og:image', image ? abs(image) : '');
    const url = site.siteUrl + window.location.pathname;
    setMeta('property', 'og:url', url);
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = url;
  }, [title, description, image, type]);
}

import { useEffect } from 'react';
import { site } from '../config/site.js';
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}
// Client-side only: crawlers that do not run JavaScript will not see these tags.
export function useSeo(title, description) {
  useEffect(() => {
    const full = title ? `${title} | ${site.brandName}` : site.brandName;
    document.title = full;
    if (description) { setMeta('name', 'description', description); setMeta('property', 'og:description', description); }
    setMeta('property', 'og:title', full);
    if (site.siteUrl) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
      link.href = site.siteUrl + window.location.pathname;
    }
  }, [title, description]);
}

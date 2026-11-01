import { Link } from 'react-router-dom';
import { Download, ExternalLink, Trash2 } from 'lucide-react';
import { Container, SectionHeading, EmptyState, Button, Cover, PriceDisplay } from '../components/common/ui.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { sections } from '../data/sections.js';
import { downloadHref, purchaseUrl, purchaseLabel } from '../utils/productHelpers.js';
import { useSeo } from '../hooks/useSeo.js';

function Action({ product }) {
  if (product.isFree) {
    const dl = downloadHref(product);
    return dl
      ? <a href={dl} download className="btn btn--primary btn--sm"><Download size={16} aria-hidden="true" /> Download Free</a>
      : <span className="muted">Download unavailable</span>;
  }
  const url = purchaseUrl(product);
  return url
    ? <Button href={url} className="btn--sm"><ExternalLink size={16} aria-hidden="true" /> {purchaseLabel(product)}</Button>
    : <span className="muted">Purchase link not configured yet</span>;
}

export default function Favorites() {
  useSeo('Your favorites', 'Products you saved on this device.');
  const { favorites, remove, clear } = useFavorites();
  return (
    <section className="section"><Container>
      <SectionHeading as="h1" title="Your favorites" text="Saved in this browser only. They do not sync to other devices." />
      {favorites.length === 0 ? (
        <EmptyState emoji="💜" title="No favorites yet" text="Tap the heart on any product to save it here.">
          <div className="btn-row btn-row--center"><Button to="/kids">Browse Kids</Button><Button to="/adults" variant="ghost">Browse Adults</Button></div>
        </EmptyState>
      ) : (
        <>
          {Object.values(sections).map((s) => {
            const list = favorites.filter((p) => p.section === s.key);
            if (!list.length) return null;
            return (
              <div key={s.key} className={`theme-${s.key} fav-group`}>
                <h2>{s.label}</h2>
                <ul className="fav-list">
                  {list.map((p) => (
                    <li key={p.slug} className="fav-item">
                      <div className="fav-item__img"><Cover product={p} /></div>
                      <div className="fav-item__info">
                        <h3><Link to={`/product/${p.slug}`}>{p.title}</Link></h3>
                        <p className="muted">{p.category} · {p.format}</p>
                        <PriceDisplay product={p} />
                      </div>
                      <div className="fav-item__actions">
                        <Action product={p} />
                        <button type="button" className="link-btn" onClick={() => remove(p.slug)}><Trash2 size={16} aria-hidden="true" /> Remove<span className="sr-only"> {p.title}</span></button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <Button variant="ghost" onClick={clear}>Clear all favorites</Button>
        </>
      )}
    </Container></section>
  );
}
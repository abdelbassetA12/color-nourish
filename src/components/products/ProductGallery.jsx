import { useState } from 'react';
import { Cover, PagePreview } from '../common/ui.jsx';

export default function ProductGallery({ product }) {
  const extra = product.gallery?.length ? product.gallery.map((g, i) => ({ id: `g${i}`, src: g.src, alt: g.alt, label: `Preview ${i + 1}` })) : [{ id: 'pa', variant: 'a', label: 'Sample page A' }, { id: 'pb', variant: 'b', label: 'Sample page B' }];
  const slides = [{ id: 'cover', cover: true, label: 'Cover' }, ...extra];
  const [active, setActive] = useState(0);
  const [broken, setBroken] = useState({});
  const s = slides[active];
  const render = (x, eager) => x.cover ? <Cover product={product} eager={eager} />
    : x.src && !broken[x.id] ? <img className="cover cover--img" src={x.src} alt={x.alt || `${product.title} preview`} loading="lazy" onError={() => setBroken((b) => ({ ...b, [x.id]: true }))} />
    : <PagePreview product={product} variant={x.variant} />;
  return (
    <div className="gallery">
      <div className="gallery__main" aria-live="polite">{render(s, true)}</div>
      <ul className="gallery__thumbs" aria-label="Product images">
        {slides.map((x, i) => (
          <li key={x.id}><button type="button" className={`gallery__thumb ${i === active ? 'is-active' : ''}`} aria-label={`Show ${x.label}`} aria-pressed={i === active} onClick={() => setActive(i)}>{render(x)}</button></li>
        ))}
      </ul>
      <p className="gallery__note">Images are illustrative mockups and not the actual printable files.</p>
    </div>
  );
}

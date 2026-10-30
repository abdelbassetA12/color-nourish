import { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { formatPrice } from '../../utils/currency.js';
import { hasDiscount } from '../../utils/productHelpers.js';

export const Container = ({ children, narrow, className = '' }) => (
  <div className={`container ${narrow ? 'container--narrow' : ''} ${className}`}>{children}</div>
);

export const SectionHeading = ({ eyebrow, title, text, as: Tag = 'h2', center }) => (
  <div className={`section-heading ${center ? 'section-heading--center' : ''}`}>
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <Tag>{title}</Tag>
    {text && <p className="section-heading__text">{text}</p>}
  </div>
);

export function Button({ to, href, variant = 'primary', children, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

// Generated cover art (used when no image is set or an image fails to load)
export function CoverArt({ product }) {
  return (
    <div className="cover cover--art" style={{ background: product.color || '#efe6ff' }} role="img" aria-label={`${product.title} sample cover illustration`}>
      <span className="cover__emoji" aria-hidden="true">{product.emoji || '📘'}</span>
      <span className="cover__title" aria-hidden="true">{product.title}</span>
      <span className="cover__tag" aria-hidden="true">{product.format}</span>
    </div>
  );
}

export function Cover({ product, eager }) {
  const [failed, setFailed] = useState(false);
  if (product.coverImage && !failed) {
    return <img className="cover cover--img" src={product.coverImage} alt={`${product.title} cover`} width="600" height="800" loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />;
  }
  return <CoverArt product={product} />;
}

// Illustrative interior page mockup (not the actual printable file)
export function PagePreview({ product, variant }) {
  const letter = variant === 'b' ? 'Bb' : 'Aa';
  return (
    <div className="page-preview" role="img" aria-label={`Illustrative mockup of a worksheet page for ${product.title}`}>
      <div className="page-preview__letter" aria-hidden="true">{letter}</div>
      <div className="page-preview__art" aria-hidden="true">{product.emoji}</div>
      <div className="page-preview__lines" aria-hidden="true"><i /><i /><i /></div>
      <span className="page-preview__note" aria-hidden="true">Illustrative mockup</span>
    </div>
  );
}

export const PriceDisplay = ({ product }) => (
  <p className="price">
    <span className="price__now">{formatPrice(product.price, product.currency)}</span>
    {hasDiscount(product) && <s className="price__old"><span className="sr-only">Original price </span>{formatPrice(product.originalPrice, product.currency)}</s>}
  </p>
);

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>{it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export const EmptyState = ({ emoji = '🔍', title, text, children }) => (
  <div className="empty-state"><div aria-hidden="true" className="empty-state__emoji">{emoji}</div><h2>{title}</h2><p>{text}</p>{children}</div>
);

export function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  const base = useId();
  return (
    <div className="accordion">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className="accordion__item" key={it.q}>
            <h3>
              <button type="button" className="accordion__btn" aria-expanded={isOpen} aria-controls={`${base}-${i}`} id={`${base}-b${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                {it.q}<ChevronDown size={20} aria-hidden="true" className={isOpen ? 'rot' : ''} />
              </button>
            </h3>
            <div id={`${base}-${i}`} role="region" aria-labelledby={`${base}-b${i}`} hidden={!isOpen} className="accordion__panel"><p>{it.a}</p></div>
          </div>
        );
      })}
    </div>
  );
}

export const Toast = ({ message }) => (
  <div className="toast-region" role="status" aria-live="polite">{message && <div className="toast">{message}</div>}</div>
);

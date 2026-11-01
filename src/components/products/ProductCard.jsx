import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Cover, PriceDisplay } from '../common/ui.jsx';
import { downloadHref } from '../../utils/productHelpers.js';
import FavoriteButton from './FavoriteButton.jsx';

export function ProductCard({ product }) {
  const dl = downloadHref(product);
  const badge = product.isFree ? 'FREE' : product.badge;
  return (
    <article className={`card product-card theme-${product.section}`}>
      <Link to={`/product/${product.slug}`} className="product-card__media" aria-hidden="true" tabIndex="-1">
        <Cover product={product} />{badge && <span className={`badge ${product.isFree ? 'badge--free' : ''}`}>{badge}</span>}
      </Link>
      <div className="product-card__body">
        <p className="product-card__meta">{product.section === 'adults' ? 'Adults' : 'Kids'} · {product.category} · {product.format}</p>
        <h3 className="product-card__title"><Link to={`/product/${product.slug}`}>{product.title}</Link></h3>
        <p className="product-card__desc">{product.shortDescription}</p>
        <div className="product-card__foot">
          <PriceDisplay product={product} />
          {dl
            ? <a href={dl} download className="btn btn--primary btn--sm"><Download size={16} aria-hidden="true" /> Download Free<span className="sr-only">: {product.title}</span></a>
            : <Link to={`/product/${product.slug}`} className="btn btn--soft btn--sm">View details<span className="sr-only"> for {product.title}</span></Link>}
        </div>
        {dl && <Link to={`/product/${product.slug}`} className="product-card__more">View details<span className="sr-only"> for {product.title}</span></Link>}
        <FavoriteButton product={product} />
      </div>
    </article>
  );
}
export const ProductGrid = ({ products }) => <div className="grid grid--products">{products.map((p) => <ProductCard key={p.id || p.slug} product={p} />)}</div>;

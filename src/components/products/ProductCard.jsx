import { Link } from 'react-router-dom';
import { Cover, PriceDisplay } from '../common/ui.jsx';

export function ProductCard({ product }) {
  return (
    <article className="card product-card">
      <Link to={`/product/${product.slug}`} className="product-card__media" aria-hidden="true" tabIndex="-1"><Cover product={product} />{product.badge && <span className="badge">{product.badge}</span>}</Link>
      <div className="product-card__body">
        <p className="product-card__meta">{product.category} · {product.format}</p>
        <h3 className="product-card__title"><Link to={`/product/${product.slug}`}>{product.title}</Link></h3>
        <p className="product-card__desc">{product.shortDescription}</p>
        <div className="product-card__foot"><PriceDisplay product={product} /><Link to={`/product/${product.slug}`} className="btn btn--soft btn--sm">View details<span className="sr-only"> for {product.title}</span></Link></div>
      </div>
    </article>
  );
}
export const ProductGrid = ({ products }) => <div className="grid grid--products">{products.map((p) => <ProductCard key={p.id || p.slug} product={p} />)}</div>;


import { Link } from 'react-router-dom';
import { Cover, PriceDisplay } from '../common/ui.jsx';
import {
  downloadHref,
  isFreeProduct,
} from '../../utils/productHelpers.js';
import FavoriteButton from './FavoriteButton.jsx';

export function ProductCard({ product }) {
  if (!product) return null;

  const isFree = isFreeProduct(product);
  const dl = isFree ? downloadHref(product) : null;

  const slug = product._slug_ || product.slug || product.id;
  const title = product._title_ || product.title || 'Untitled Product';
  const section =
    product._section_ || product.section || 'kids';

  const badge = isFree
    ? 'FREE'
    : product._badge_ || product.badge;

  const isExternalAction =
    typeof dl === 'string' && /^https?:\/\//i.test(dl);

  return (
    <article className={`card product-card theme-${section}`}>
      <Link
        to={`/product/${slug}`}
        className="product-card__media"
        aria-hidden="true"
        tabIndex="-1"
      >
        <Cover product={product} />

        {badge && (
          <span
            className={`badge ${isFree ? 'badge--free' : ''}`}
          >
            {badge}
          </span>
        )}
      </Link>

      <div className="product-card__body">
        <p className="product-card__meta">
          {section === 'adults' ? 'Adults' : 'Kids'}
          {' · '}
          {product._category_ || product.category || ''}
          {' · '}
          {product._format_ || product.format || ''}
        </p>

        <h3 className="product-card__title">
          <Link to={`/product/${slug}`}>
            {title}
          </Link>
        </h3>

        <p className="product-card__desc">
          {product._shortDescription_ ||
            product.shortDescription ||
            ''}
        </p>

        <div className="product-card__foot">
          <PriceDisplay product={product} />

          {isFree ? (
            dl ? (
              <a
                href={dl}
                target={isExternalAction ? '_blank' : undefined}
                rel={
                  isExternalAction
                    ? 'noopener noreferrer'
                    : undefined
                }
                download={!isExternalAction ? true : undefined}
                className="product-card__more"
              >
                {isExternalAction
                  ? 'Get Free Product'
                  : 'Download Free'}
              </a>
            ) : (
              <Link
                to={`/product/${slug}`}
                className="product-card__more"
              >
                View Details
              </Link>
            )
          ) : (
            <Link
              to={`/product/${slug}`}
              className="product-card__more"
            >
              View Details
            </Link>
          )}
        </div>

        {isFree && dl && (
          <Link
            to={`/product/${slug}`}
            className="product-card__more"
          >
            View details
            <span className="sr-only">
              {' '}for {title}
            </span>
          </Link>
        )}

        <FavoriteButton product={product} />
      </div>
    </article>
  );
}

export const ProductGrid = ({ products = [] }) => (
  <div className="grid grid--products">
    {products.map((product) => (
      <ProductCard
        key={
          product._id_ ||
          product.id ||
          product._slug_ ||
          product.slug
        }
        product={product}
      />
    ))}
  </div>
);

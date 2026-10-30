import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Cover } from '../common/ui.jsx';
import { formatPrice } from '../../utils/currency.js';
import { useCart } from '../../context/CartContext.jsx';

export default function CartItem({ product, qty }) {
  const { setQty, remove, MAX_QTY } = useCart();
  return (
    <li className="cart-item">
      <div className="cart-item__img"><Cover product={product} /></div>
      <div className="cart-item__info">
        <h3><Link to={`/product/${product.slug}`}>{product.title}</Link></h3>
        <p className="muted">{product.format} · {formatPrice(product.price, product.currency)} each</p>
        <div className="qty">
          <button type="button" aria-label={`Decrease quantity of ${product.title}`} disabled={qty <= 1} onClick={() => setQty(product.slug, qty - 1)}><Minus size={16} aria-hidden="true" /></button>
          <span aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</span>
          <button type="button" aria-label={`Increase quantity of ${product.title}`} disabled={qty >= MAX_QTY} onClick={() => setQty(product.slug, qty + 1)}><Plus size={16} aria-hidden="true" /></button>
        </div>
      </div>
      <div className="cart-item__end">
        <strong>{formatPrice(product.price * qty, product.currency)}</strong>
        <button type="button" className="link-btn" onClick={() => remove(product.slug)}><Trash2 size={16} aria-hidden="true" /> Remove<span className="sr-only"> {product.title}</span></button>
      </div>
    </li>
  );
}

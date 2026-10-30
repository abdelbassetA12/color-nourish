import { Container, SectionHeading, EmptyState, Button } from '../components/common/ui.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/currency.js';
import { purchaseUrl, purchaseLabel } from '../utils/productHelpers.js';
import { useSeo } from '../hooks/useSeo.js';

export default function Cart() {
  useSeo('Your cart');
  const { lines, missing, total, count, remove, clear } = useCart();
  return (
    <section className="section"><Container>
      <SectionHeading as="h1" title="Your cart" />
      {missing.length > 0 && (
        <div className="notice notice--warn" role="alert">
          <span>{missing.length} item{missing.length > 1 ? 's' : ''} in your saved cart {missing.length > 1 ? 'are' : 'is'} no longer available.</span>
          <button type="button" className="link-btn" onClick={() => missing.forEach(remove)}>Remove unavailable</button>
        </div>
      )}
      {lines.length === 0 ? <EmptyState emoji="🛒" title="Your cart is empty" text="Browse the shop to add printable resources to your selection."><Button to="/shop">Back to the shop</Button></EmptyState> : (
        <div className="cart">
          <ul className="cart__list">{lines.map((l) => <CartItem key={l.product.slug} {...l} />)}</ul>
          <aside className="card cart__summary" aria-label="Order summary">
            <h2>Summary</h2>
            <p className="row"><span>Items</span><span>{count}</span></p>
            <p className="row"><span>Subtotal</span><span>{formatPrice(total)}</span></p>
            <p className="row row--total"><span>Total</span><span>{formatPrice(total)}</span></p>
            <p className="form-note">Checkout is not available on this site. This cart only helps you prepare a selection; no payment or delivery happens here. Buy each item on its configured marketplace link.</p>
            <ul className="buy-links">{lines.map(({ product }) => { const u = purchaseUrl(product); return <li key={product.slug}>{u ? <a href={u} target="_blank" rel="noopener noreferrer">{purchaseLabel(product)}: {product.title}</a> : <span className="muted">{product.title}: purchase link not configured yet</span>}</li>; })}</ul>
            <Button variant="ghost" onClick={clear}>Clear cart</Button>
          </aside>
        </div>)}
    </Container></section>
  );
}

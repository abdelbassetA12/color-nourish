import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ExternalLink, Info } from 'lucide-react';
import { getProduct, related, purchaseUrl, purchaseLabel, categorySlug } from '../utils/productHelpers.js';
import { Container, Breadcrumbs, PriceDisplay, Button, SectionHeading, Accordion } from '../components/common/ui.jsx';
import ProductGallery from '../components/products/ProductGallery.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import NotFound from './NotFound.jsx';

function Detail({ product }) {
  const { add } = useCart();
  const [note, setNote] = useState('');
  useSeo(product.title, product.shortDescription);
  const url = purchaseUrl(product);
  const rel = related(product);
  const faqs = [
    { q: 'Is this a physical book?', a: 'No. This is a digital product. No physical book is shipped.' },
    { q: 'How do I print it?', a: product.printingInstructions },
    { q: 'What age is it for?', a: product.ageRange ? `Suggested age range: ${product.ageRange}. Adult supervision is recommended.` : 'See the product description for details.' },
  ];
  const facts = [['Format', product.format], product.pageCount && ['Pages', product.pageCount], product.ageRange && ['Age range', product.ageRange], ['Category', product.category]].filter(Boolean);
  return (
    <section className="section"><Container>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.category, to: `/shop?category=${categorySlug(product.category)}` }, { label: product.title }]} />
      <div className="detail">
        <ProductGallery product={product} />
        <div className="detail__info">
          {product.isDemo && <p className="demo-flag">Sample product: demo content, not yet published.</p>}
          <h1>{product.title}</h1>
          <p className="detail__summary">{product.shortDescription}</p>
          <PriceDisplay product={product} />
          <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="btn-row">
            {url ? <Button href={url}><ExternalLink size={18} aria-hidden="true" /> {purchaseLabel(product)}</Button>
              : <Button onClick={() => setNote('The purchase link for this product has not been configured yet.')}>Purchase link unavailable</Button>}
            <Button variant="ghost" onClick={() => add(product.slug)}><ShoppingBag size={18} aria-hidden="true" /> Add to cart</Button>
          </div>
          <p className="form-note" role="status">{note}</p>
          <p className="notice"><Info size={18} aria-hidden="true" /> Digital product: you receive downloadable files. No physical book is shipped. The cart only prepares a selection; it does not process payments.</p>
        </div>
      </div>
      <div className="detail__sections">
        <div><h2>About this resource</h2><p>{product.description}</p></div>
        <div><h2>Learning benefits</h2><ul className="checks">{(product.learningBenefits || []).map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>What’s included</h2><ul className="checks">{(product.features || []).map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>Printing information</h2><p>{product.printingInstructions}</p><h3>Using your digital download</h3><ol><li>Purchase through the linked marketplace.</li><li>Download the PDF file(s) there.</li><li>Open in a PDF reader and print at 100% scale.</li></ol><p><Link to="/digital-downloads">More about digital downloads</Link></p></div>
      </div>
      <SectionHeading title="Frequently asked questions" /><Accordion items={faqs} />
      {rel.length > 0 && <><SectionHeading title="You may also like" /><ProductGrid products={rel} /></>}
    </Container></section>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProduct(slug);
  return product ? <Detail key={product.slug} product={product} /> : <NotFound title="Product not found" text="We couldn’t find that product. It may have been moved or unpublished." />;
}

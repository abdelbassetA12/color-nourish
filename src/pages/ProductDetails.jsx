import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ExternalLink, Download, Info } from 'lucide-react';
import { getProduct, related, purchaseUrl, purchaseLabel, downloadHref, categorySlug } from '../utils/productHelpers.js';
import { Container, Breadcrumbs, PriceDisplay, Button, SectionHeading, Accordion } from '../components/common/ui.jsx';
import ProductGallery from '../components/products/ProductGallery.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import { sections } from '../data/sections.js';
import NotFound from './NotFound.jsx';

function Detail({ product }) {
  const { add } = useCart();
  const [note, setNote] = useState('');
  useSeo(product.title, product.shortDescription, { image: product.coverImage, type: 'product' });
  const url = purchaseUrl(product);
  const dl = downloadHref(product);
  const sec = sections[product.section];
  const rel = related(product);
  const faqs = [
    { q: 'Is this a physical book?', a: 'No. This is a digital product. No physical book is shipped.' },
    { q: product.isFree ? 'Is it really free?' : 'Where do I buy it?', a: product.isFree ? 'Yes. Download the PDF directly from this page. No payment or account is required.' : 'Purchases are completed on the external marketplace linked on this page. Payment is not handled on this site.' },
    { q: 'How do I print it?', a: product.printingInstructions },
    { q: 'What age is it for?', a: product.section === 'adults' ? 'Designed for adults and teens who enjoy detailed coloring.' : product.ageRange ? `Suggested age range: ${product.ageRange}. Adult supervision is recommended.` : 'See the product description for details.' },
  ];
  const facts = [['Format', product.format], product.pageCount && ['Pages', product.pageCount], product.dimensions && ['Dimensions', product.dimensions], product.ageRange && ['Age range', product.ageRange], ['Category', product.category]].filter(Boolean);
  return (
    <section className={`section theme-${product.section}`}><Container>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: sec.label, to: sec.path }, { label: product.category, to: `${sec.path}?category=${categorySlug(product.category)}` }, { label: product.title }]} />
      <div className="detail">
        <ProductGallery product={product} />
        <div className="detail__info">
          {product.isDemo && <p className="demo-flag">Sample product: demo content, not yet published.</p>}
          <h1>{product.title}</h1>
          <p className="detail__summary">{product.shortDescription}</p>
          <div className="detail__price"><PriceDisplay product={product} /><span className={`status-chip ${product.isFree ? 'status-chip--free' : ''}`}>{product.isFree ? 'FREE' : 'PREMIUM'}</span></div>
          <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="btn-row">
            {product.isFree ? (dl
              ? <a href={dl} download className="btn btn--primary"><Download size={18} aria-hidden="true" /> Download Free</a>
              : <Button disabled>Download unavailable</Button>)
              : (<>
                {url ? <Button href={url}><ExternalLink size={18} aria-hidden="true" /> {purchaseLabel(product)}</Button>
                  : <Button onClick={() => setNote('The purchase link for this product has not been configured yet.')}>Purchase link unavailable</Button>}
                <Button variant="ghost" onClick={() => add(product.slug)}><ShoppingBag size={18} aria-hidden="true" /> Add to cart</Button>
              </>)}
          </div>
          <p className="form-note" role="status">{note}</p>
          <p className="notice"><Info size={18} aria-hidden="true" /> {product.isFree ? 'Free digital product: a PDF file you download and print yourself. No physical item is shipped.' : 'Digital product: you receive downloadable files from the external marketplace. No physical book is shipped. The cart only prepares a selection; payment happens on the marketplace.'}</p>
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

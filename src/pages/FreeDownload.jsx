
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

import {
  getProduct,
  isFreeProduct,
  directDownloadHref,
} from '../utils/productHelpers.js';

import {
  Container,
  Breadcrumbs,
  SectionHeading,
  Button,
} from '../components/common/ui.jsx';

import { useSeo } from '../hooks/useSeo.js';
import { track } from '../utils/analytics.js';
import NotFound from './NotFound.jsx';

export default function FreeDownload() {
  const { slug } = useParams();

  const product = getProduct(slug);

  // Only free products are eligible.
  const isFree = product && isFreeProduct(product);

  // IMPORTANT: This retrieves the actual file,
  // not the MyLead action URL.
  const fileUrl = isFree
    ? directDownloadHref(product)
    : null;

  const title =
    product?.title || product?._title_ || 'Free Download';

  const description =
    product?.shortDescription ||
    product?._shortDescription_ ||
    '';

  const cover =
    product?.coverImage ||
    product?._coverImage_ ||
    '';

  useSeo(
    `Download ${title}`,
    `Your free digital download: ${title}`,
    {
      image: cover,
      type: 'product',
    }
  );

  useEffect(() => {
    if (product && isFree && fileUrl) {
      track('free_download_ready', {
        slug,
        source: 'free_download_page',
      });
    }
  }, [slug, isFree, fileUrl]);

  if (!product || !isFree) {
    return (
      <NotFound
        title="Download not found"
        text="This free download could not be found."
      />
    );
  }

  if (!fileUrl) {
    return (
      <section className="section">
        <Container>
          <div className="download-card">
            <FileText size={42} />
            <h1>Download unavailable</h1>
            <p>
              The download file has not been configured
              for this product yet.
            </p>
            <Link to="/adults">
              Browse more products
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const handleDownload = () => {
    track('download', {
      slug,
      source: 'free_download_page',
    });
  };

  return (
    <section className="section free-download-page">
      <Container>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Free Downloads', to: '/free-downloads' },
            { label: title },
          ]}
        />

        <div className="download-success">

          <div className="download-success__icon">
            <CheckCircle2 size={38} />
          </div>

          <span className="download-success__badge">
            YOUR DOWNLOAD IS READY
          </span>

          <h1>Thank You!</h1>

          <p>
            Your free download is ready.
            Click the button below to get your PDF.
          </p>

          <div className="download-product">

            {cover && (
              <img
                src={cover}
                alt={title}
                className="download-product__image"
              />
            )}

            <div className="download-product__info">
              <h2>{title}</h2>

              <p>{description}</p>

              <div className="download-product__meta">
                <span>
                  <FileText size={16} />
                  {product.pageCount ||
                    product._pageCount_ ||
                    'PDF'}{' '}
                  {product.pageCount ||
                    product._pageCount_
                    ? 'Pages'
                    : ''}
                </span>

                <span>
                  <ShieldCheck size={16} />
                  Digital Product
                </span>
              </div>
            </div>

          </div>

          <div className="download-actions">

            <a
              href={fileUrl}
              download
              className="btn btn--primary download-button"
              onClick={handleDownload}
            >
              <Download size={20} />
              Download Your PDF
            </a>

            <p className="download-hint">
              Your file will download directly to your device.
            </p>

          </div>

          <div className="download-footer">
            <p>
              Thank you for choosing ColorNourish.
              Enjoy your creative time!
            </p>

            <Link to="/">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}


/*
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Download, Info } from 'lucide-react';
import { getProduct, related, purchaseUrl, purchaseLabel, downloadHref, categorySlug } from '../utils/productHelpers.js';
import { Container, Breadcrumbs, PriceDisplay, Button, SectionHeading, Accordion } from '../components/common/ui.jsx';
import ProductGallery from '../components/products/ProductGallery.jsx';
import FavoriteButton from '../components/products/FavoriteButton.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { useSeo } from '../hooks/useSeo.js';
import { track } from '../utils/analytics.js';
import { sections } from '../data/sections.js';
import NotFound from './NotFound.jsx';

function Detail({ product }) {
  const [note, setNote] = useState('');
  useSeo(product.title, product.shortDescription, { image: product.coverImage, type: 'product' });
  useEffect(() => { track('product_view', { slug: product.slug }); }, [product.slug]);
  const url = purchaseUrl(product);
  const dl = downloadHref(product);
  const sec = sections[product.section];
  const rel = related(product);
  const faqs = [
    { q: 'Is this a physical book?', a: 'No. This is a digital product. No physical book is shipped.' },
    {
      q: product.isFree ? 'Is it really free?' : 'Where do I buy it?',
      a: product.isFree
        ? 'Yes. Download the PDF directly from this page. No payment or account is required.'
        : 'Purchases are completed on the external marketplace linked on this page. Payment is not handled on this site.',
    },
    { q: 'How do I print it?', a: product.printingInstructions },
    {
      q: 'What age is it for?',
      a: product.section === 'adults'
        ? 'Designed for adults and teens who enjoy detailed coloring.'
        : product.ageRange
          ? `Suggested age range: ${product.ageRange}. Adult supervision is recommended.`
          : 'See the product description for details.',
    },
  ];
  const facts = [
    ['Format', product.format],
    product.pageCount && ['Pages', product.pageCount],
    product.dimensions && ['Dimensions', product.dimensions],
    product.ageRange && ['Age range', product.ageRange],
    ['Category', product.category],
  ].filter(Boolean);

  return (
    <section className={`section theme-${product.section}`}><Container>
      <Breadcrumbs items={[
        { label: 'Home', to: '/' },
        { label: sec.label, to: sec.path },
        { label: product.category, to: `${sec.path}?category=${categorySlug(product.category)}` },
        { label: product.title },
      ]} />
      <div className="detail">
        <ProductGallery product={product} />
        <div className="detail__info">
          {product.isDemo && <p className="demo-flag">Sample product: demo content, not yet published.</p>}
          <h1>{product.title}</h1>
          <p className="detail__summary">{product.shortDescription}</p>
          <div className="detail__price">
            <PriceDisplay product={product} />
            <span className={`status-chip ${product.isFree ? 'status-chip--free' : ''}`}>{product.isFree ? 'FREE' : 'PREMIUM'}</span>
          </div>
          <dl className="facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="btn-row">
            {product.isFree ? (dl
              ? (
                <a href={dl} download className="btn btn--primary" onClick={() => track('download', { slug: product.slug, source: 'detail' })}>
                  <Download size={18} aria-hidden="true" /> Download Free
                </a>
              )
              : <Button disabled>Download unavailable</Button>)
              : (url
                ? (
                  <Button href={url} onClick={() => track('buy_click', { slug: product.slug, source: 'detail' })}>
                    <ExternalLink size={18} aria-hidden="true" /> {purchaseLabel(product)}
                  </Button>
                )
                : <Button onClick={() => setNote('The purchase link for this product has not been configured yet.')}>Purchase link unavailable</Button>)}
            <FavoriteButton product={product} withLabel />
          </div>
          <p className="form-note" role="status">{note}</p>
          <p className="notice">
            <Info size={18} aria-hidden="true" />
            {product.isFree
              ? 'Free digital product: a PDF file you download and print yourself. No physical item is shipped.'
              : 'Digital product: you receive downloadable files from the external marketplace. No physical book is shipped. Payment happens on the marketplace.'}
          </p>
        </div>
      </div>
      <div className="detail__sections">
        <div><h2>About this resource</h2><p>{product.description}</p></div>
        <div><h2>Learning benefits</h2><ul className="checks">{(product.learningBenefits || []).map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div><h2>What’s included</h2><ul className="checks">{(product.features || []).map((b) => <li key={b}>{b}</li>)}</ul></div>
        <div>
          <h2>Printing information</h2>
          <p>{product.printingInstructions}</p>
          <h3>Using your digital download</h3>
          <ol>
            {product.isFree
              ? <><li>Press “Download Free” on this page.</li><li>Open the PDF in a PDF reader.</li><li>Print at 100% scale.</li></>
              : <><li>Purchase through the linked marketplace.</li><li>Download the PDF file(s) there.</li><li>Open in a PDF reader and print at 100% scale.</li></>}
          </ol>
          <p><Link to="/digital-downloads">More about digital downloads</Link></p>
        </div>
      </div>
      <SectionHeading title="Frequently asked questions" />
      <Accordion items={faqs} />
      {rel.length > 0 && <><SectionHeading title="You may also like" /><ProductGrid products={rel} /></>}
    </Container></section>
  );
}

export default function FreeDownload() {
  const { slug } = useParams();
  const product = getProduct(slug);
  return product
    ? <Detail key={product.slug} product={product} />
    : <NotFound title="Product not found" text="We couldn’t find that product. It may have been moved or unpublished." />;
}
*/
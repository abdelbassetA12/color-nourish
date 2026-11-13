
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  Download,
  Info,
} from 'lucide-react';

import {
  Container,
  Breadcrumbs,
  PriceDisplay,
  Button,
  SectionHeading,
  Accordion,
} from '../components/common/ui.jsx';

import ProductGallery from '../components/products/ProductGallery.jsx';
import FavoriteButton from '../components/products/FavoriteButton.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';

import {
  getProduct,
  related,
  purchaseUrl,
  downloadHref,
  isFreeProduct,
} from '../utils/productHelpers.js';

import { useSeo } from '../hooks/useSeo.js';
import { track } from '../utils/analytics.js';
import { sections } from '../data/sections.js';
import NotFound from './NotFound.jsx';

// ---------------------------------------------
// HELPERS
// ---------------------------------------------

const getProductValue = (product, current, legacy, fallback = '') =>
  product?.[current] ??
  product?.[legacy] ??
  fallback;

const categorySlug = (category = '') =>
  String(category)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const purchaseLabel = (product) => {
  const mode =
    product.purchaseMode ||
    product._purchaseMode_ ||
    '';

  if (mode === 'etsy') return 'Buy on Etsy';
  if (mode === 'amazon') return 'Buy on Amazon';

  return 'Buy Now';
};

const isExternalUrl = (url) =>
  typeof url === 'string' && /^https:\/\//i.test(url);

// ---------------------------------------------
// PRODUCT DETAIL
// ---------------------------------------------

function Detail({ product }) {
  const [note, setNote] = useState('');

  const slug = getProductValue(product, 'slug', '_slug_');
  const title = getProductValue(product, 'title', '_title_');
  const shortDescription = getProductValue(
    product,
    'shortDescription',
    '_shortDescription_'
  );

  const section = getProductValue(
    product,
    'section',
    '_section_',
    'kids'
  );

  const category = getProductValue(
    product,
    'category',
    '_category_'
  );

  const isFree = isFreeProduct(product);

  // Free products: actionUrl first, then direct downloadUrl.
  const dl = isFree ? downloadHref(product) : null;

  // Paid products: actionUrl / external purchase URL.
  const url = isFree ? null : purchaseUrl(product);

  const isExternalDownloadAction = isExternalUrl(dl);

  const coverImage = getProductValue(
    product,
    'coverImage',
    '_coverImage_'
  );

  const description = getProductValue(
    product,
    'description',
    '_description_'
  );

  const printingInstructions = getProductValue(
    product,
    'printingInstructions',
    '_printingInstructions_',
    'Print at actual size (100%) using your printer settings.'
  );

  const ageRange = getProductValue(
    product,
    'ageRange',
    '_ageRange_'
  );

  const format = getProductValue(product, 'format', '_format_');
  const pageCount = getProductValue(product, 'pageCount', '_pageCount_');
  const dimensions = getProductValue(
    product,
    'dimensions',
    '_dimensions_'
  );

  const features =
    getProductValue(product, 'features', '_features_', []) || [];

  const learningBenefits =
    getProductValue(
      product,
      'learningBenefits',
      '_learningBenefits_',
      []
    ) || [];

  const isDemo = getProductValue(
    product,
    'isDemo',
    '_isDemo_',
    false
  );

  const sectionInfo = sections[section] || {
    _label_: section === 'adults' ? 'Adults' : 'Kids',
    _path_: '/',
  };

  const relatedProducts = related(product);

  useSeo(title, shortDescription, {
    image: coverImage,
    type: 'product',
  });

  useEffect(() => {
    track('product_view', { slug });
  }, [slug]);

  // ---------------------------------------------
  // FAQ
  // ---------------------------------------------

  const faqs = [
    {
      q: 'Is this a physical book?',
      a: 'No. This is a digital product. No physical book is shipped.',
    },
    {
      q: isFree ? 'Is it really free?' : 'Where do I buy it?',
      a: isFree
        ? dl && isExternalDownloadAction
          ? 'Yes. This free product is accessed through the link provided on this page.'
          : 'Yes. You can download the PDF directly from this page without payment.'
        : 'Purchases are completed on the external marketplace linked on this page. Payment is not handled on this site.',
    },
    {
      q: 'How do I print it?',
      a: printingInstructions,
    },
    {
      q: 'What age is it for?',
      a:
        section === 'adults'
          ? 'Designed for adults and teens who enjoy detailed coloring.'
          : ageRange
            ? `Suggested age range: ${ageRange}. Adult supervision is recommended.`
            : 'See the product description for details.',
    },
  ];

  // ---------------------------------------------
  // PRODUCT FACTS
  // ---------------------------------------------

  const facts = [
    ['Format', format],
    pageCount && ['Pages', pageCount],
    dimensions && ['Dimensions', dimensions],
    ageRange && ['Age range', ageRange],
    ['Category', category],
  ].filter(Boolean);

  // ---------------------------------------------
  // ACTION HANDLERS
  // ---------------------------------------------

  const handleFreeAction = () => {
    track('free_product_action', {
      slug,
      source: 'detail',
      action: isExternalDownloadAction
        ? 'external_action'
        : 'direct_download',
    });
  };

  const handlePurchase = () => {
    track('buy_click', {
      slug,
      source: 'detail',
    });
  };

  // ---------------------------------------------
  // RENDER
  // ---------------------------------------------

  return (
    <section className={`section theme-${section}`}>
      <Container>
        <Breadcrumbs
          items={[
            {
              label: 'Home',
              to: '/',
            },
            {
              label: sectionInfo._label_,
              to: sectionInfo._path_,
            },
            {
              label: category,
              to: `${sectionInfo._path_}?category=${categorySlug(category)}`,
            },
            {
              label: title,
            },
          ]}
        />

        <div className="detail">
          <ProductGallery product={product} />

          <div className="detail__info">
            {isDemo && (
              <p className="demo-flag">
                Sample product: demo content, not yet published.
              </p>
            )}

            <h1>{title}</h1>

            <p className="detail__summary">
              {shortDescription}
            </p>

            <div className="detail__price">
              <PriceDisplay product={product} />

              <span
                className={`status-chip ${
                  isFree ? 'status-chip--free' : ''
                }`}
              >
                {isFree ? 'FREE' : 'PREMIUM'}
              </span>
            </div>

            <dl className="facts">
              {facts.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="btn-row">
              {isFree ? (
                dl ? (
                  <a
                    href={dl}
                    target={
                      isExternalDownloadAction
                        ? '_blank'
                        : undefined
                    }
                    rel={
                      isExternalDownloadAction
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    download={
                      !isExternalDownloadAction
                        ? true
                        : undefined
                    }
                    className="btn btn--primary"
                    onClick={handleFreeAction}
                  >
                    <Download
                      size={18}
                      aria-hidden="true"
                    />

                    {isExternalDownloadAction
                      ? 'Get Free Product'
                      : 'Download Free'}
                  </a>
                ) : (
                  <Button disabled>
                    Download unavailable
                  </Button>
                )
              ) : url ? (
                <Button
                  href={url}
                  onClick={handlePurchase}
                >
                  <ExternalLink
                    size={18}
                    aria-hidden="true"
                  />

                  {purchaseLabel(product)}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    setNote(
                      'The purchase link for this product has not been configured yet.'
                    )
                  }
                >
                  Purchase link unavailable
                </Button>
              )}

              <FavoriteButton
                product={product}
                withLabel
              />
            </div>

            <p
              className="form-note"
              role="status"
            >
              {note}
            </p>

            <p className="notice">
              <Info
                size={18}
                aria-hidden="true"
              />

              {isFree
                ? isExternalDownloadAction
                  ? 'Free digital product: follow the access link to unlock your product. No physical item is shipped.'
                  : 'Free digital product: download the PDF file and print it yourself. No physical item is shipped.'
                : 'Digital product: you receive downloadable files from the external marketplace. No physical book is shipped. Payment happens on the marketplace.'}
            </p>
          </div>
        </div>

        <div className="detail__sections">
          <div>
            <h2>About this resource</h2>
            <p>{description}</p>
          </div>

          <div>
            <h2>Learning benefits</h2>

            <ul className="checks">
              {learningBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>What’s included</h2>

            <ul className="checks">
              {features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Printing information</h2>
            <p>{printingInstructions}</p>

            <h3>Using your digital download</h3>

            <ol>
              {isFree ? (
                isExternalDownloadAction ? (
                  <>
                    <li>
                      Press “Get Free Product” on this page.
                    </li>
                    <li>
                      Follow the access instructions on the external page.
                    </li>
                    <li>
                      Download your PDF after completing the required access steps.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Press “Download Free” on this page.
                    </li>
                    <li>
                      Open the PDF in a PDF reader.
                    </li>
                    <li>
                      Print at 100% scale.
                    </li>
                  </>
                )
              ) : (
                <>
                  <li>
                    Purchase through the linked marketplace.
                  </li>
                  <li>
                    Download the PDF file(s) there.
                  </li>
                  <li>
                    Open in a PDF reader and print at 100% scale.
                  </li>
                </>
              )}
            </ol>

            <p>
              <Link to="/digital-downloads">
                More about digital downloads
              </Link>
            </p>
          </div>
        </div>

        <SectionHeading title="Frequently asked questions" />

        <Accordion items={faqs} />

        {relatedProducts.length > 0 && (
          <>
            <SectionHeading title="You may also like" />
            <ProductGrid products={relatedProducts} />
          </>
        )}
      </Container>
    </section>
  );
}

// ---------------------------------------------
// PRODUCT DETAILS PAGE
// ---------------------------------------------

export default function ProductDetails() {
  const { slug } = useParams();

  const product = getProduct(slug);

  return product ? (
    <Detail
      key={product._slug_ || product.slug}
      product={product}
    />
  ) : (
    <NotFound
      title="Product not found"
      text="We couldn’t find that product. It may have been moved or unpublished."
    />
  );
}



/*
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Download, Info } from 'lucide-react';
import { getProduct, related, purchaseUrl, purchaseLabel, downloadHref, categorySlug } from '../utils/productHelpers.js';
import { Container, Breadcrumbs, PriceDisplay, Button, SectionHeading, Accordion } from '../components/common/ui.jsx';
import ProductGallery from '../components/products/ProductGallery.jsx';
import FavoriteButton from '../components/products/FavoriteButton.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { useSeo } from '../hooks/useSeo.js';
import { sections } from '../data/sections.js';
import NotFound from './NotFound.jsx';

function Detail({ product }) {
  const [note, setNote] = useState('');
  useSeo(product.title, product.shortDescription, { image: product.coverImage, type: 'product' });
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
              ? <a href={dl} download className="btn btn--primary"><Download size={18} aria-hidden="true" /> Download Free</a>
              : <Button disabled>Download unavailable</Button>)
              : (url
                ? <Button href={url}><ExternalLink size={18} aria-hidden="true" /> {purchaseLabel(product)}</Button>
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

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProduct(slug);
  return product
    ? <Detail key={product.slug} product={product} />
    : <NotFound title="Product not found" text="We couldn’t find that product. It may have been moved or unpublished." />;
}
    */
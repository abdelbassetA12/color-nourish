
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Download,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  LockKeyhole,
  FileCheck2,
} from 'lucide-react';

import {
  getProduct,
  isFreeProduct,
  directDownloadHref,
} from '../utils/productHelpers.js';

import {
  Container,
  Breadcrumbs,
} from '../components/common/ui.jsx';

import { useSeo } from '../hooks/useSeo.js';
import { track } from '../utils/analytics.js';
import NotFound from './NotFound.jsx';

export default function FreeDownload() {
  const { slug } = useParams();

  const product = getProduct(slug);

  // Only free products are eligible.
  const isFree = product && isFreeProduct(product);

  // Get the actual PDF file, not the MyLead URL.
  const fileUrl = isFree
    ? directDownloadHref(product)
    : null;

  const title =
    product?._title ||
    product?.title ||
    'Free Download';

  const description =
    product?._shortDescription ||
    product?.shortDescription ||
    '';

  const cover =
    product?._coverImage ||
    product?.coverImage ||
    '';

  const pageCount =
    product?._pageCount ||
    product?.pageCount ||
    null;

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
      <section className="section free-download-page">
        <Container>
          <div className="free-download-unavailable">
            <div className="free-download-unavailable__icon">
              <FileText size={34} />
            </div>

            <h1>Download Unavailable</h1>

            <p>
              The download file has not been configured
              for this product yet.
            </p>

            <Link
              to="/free-downloads"
              className="free-download-back-link"
            >
              <ArrowLeft size={17} />
              Browse Free Downloads
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

        <div className="free-download-wrapper">

          {/* Success Header */}
          <div className="free-download-header">

            <div className="free-download-success-icon">
              <CheckCircle2 size={32} strokeWidth={2} />
              <span>
                <Sparkles size={13} />
              </span>
            </div>

            <div className="free-download-success-label">
              <span className="free-download-success-dot" />
              ACCESS GRANTED
            </div>

            <h1>
              Your Download Is <span>Ready!</span>
            </h1>

            <p>
              Thank you for completing the verification.
              Your free coloring book is now unlocked and ready
              to download.
            </p>

          </div>

          {/* Main Download Card */}
          <div className="free-download-card">

            <div className="free-download-card-top">
              <div className="free-download-card-status">
                <CheckCircle2 size={16} />
                Successfully Unlocked
              </div>

              <div className="free-download-card-secure">
                <ShieldCheck size={16} />
                Secure Download
              </div>
            </div>

            <div className="free-download-product">

              <div className="free-download-cover-wrapper">

                {cover ? (
                  <img
                    src={cover}
                    alt={title}
                    className="free-download-cover"
                  />
                ) : (
                  <div className="free-download-cover-placeholder">
                    <FileText size={48} />
                  </div>
                )}

                <div className="free-download-cover-badge">
                  <CheckCircle2 size={15} />
                  Unlocked
                </div>

              </div>

              <div className="free-download-product-info">

                <span className="free-download-product-category">
                  YOUR FREE COLORING BOOK
                </span>

                <h2>{title}</h2>

                {description && (
                  <p className="free-download-description">
                    {description}
                  </p>
                )}

                <div className="free-download-meta">

                  <div className="free-download-meta-item">
                    <FileText size={17} />
                    <span>
                      {pageCount
                        ? `${pageCount} Pages`
                        : 'PDF Document'}
                    </span>
                  </div>

                  <div className="free-download-meta-item">
                    <FileCheck2 size={17} />
                    <span>PDF Format</span>
                  </div>

                  <div className="free-download-meta-item">
                    <ShieldCheck size={17} />
                    <span>Digital Product</span>
                  </div>

                </div>

              </div>

            </div>

            {/* Download Action */}
            <div className="free-download-action">

              <a
                href={fileUrl}
                download
                className="free-download-button"
                onClick={handleDownload}
              >
                <Download size={21} strokeWidth={2.2} />

                <span>Download Your PDF</span>

                <ArrowLeft
                  size={18}
                  className="free-download-button-arrow"
                />
              </a>

              <p className="free-download-hint">
                <LockKeyhole size={14} />
                Your file is ready. Click above to download it directly.
              </p>

            </div>

          </div>

          {/* Bottom Benefits */}
          <div className="free-download-benefits">

            <div className="free-download-benefit">
              <div className="free-download-benefit-icon">
                <Download size={19} />
              </div>

              <div>
                <strong>Instant Access</strong>
                <span>Download your file anytime.</span>
              </div>
            </div>

            <div className="free-download-benefit">
              <div className="free-download-benefit-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Direct Download</strong>
                <span>No additional verification needed.</span>
              </div>
            </div>

            <div className="free-download-benefit">
              <div className="free-download-benefit-icon">
                <Sparkles size={19} />
              </div>

              <div>
                <strong>Enjoy & Create</strong>
                <span>Relax and enjoy your coloring time.</span>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="free-download-footer">

            <p>
              Thank you for choosing <strong>ColorNourish</strong>.
              We hope you enjoy your creative experience!
            </p>

            <Link
              to="/"
              className="free-download-home-link"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

          </div>

        </div>

      </Container>
      <style>
        {`
        
/* =========================================
   COLORNOURISH - FREE DOWNLOAD PAGE
   All styles are scoped to this page.
========================================= */

.free-download-page {
  position: relative;
  overflow: hidden;
  padding-top: 35px;
  padding-bottom: 85px;
}

/* Main Wrapper */

.free-download-wrapper {
  width: 100%;
  max-width: 850px;
  margin: 45px auto 0;
}

/* =========================================
   SUCCESS HEADER
========================================= */

.free-download-header {
  text-align: center;
  max-width: 650px;
  margin: 0 auto 38px;
}

.free-download-success-icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.10);
  border: 1px solid rgba(34, 197, 94, 0.23);
  box-shadow: 0 0 35px rgba(34, 197, 94, 0.09);
}

.free-download-success-icon > span {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #d6ad5c;
  background: #171717;
  border: 1px solid rgba(214, 173, 92, 0.35);
}

.free-download-success-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 8px 15px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 30px;
  background: rgba(34, 197, 94, 0.07);
  color: #22c55e;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.4px;
  margin-bottom: 17px;
}

.free-download-success-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 9px rgba(34, 197, 94, 0.65);
}

.free-download-header h1 {
  font-size: clamp(30px, 5vw, 46px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -1.4px;
  margin: 0 0 16px;
  color: var(--text-primary, #f7f3ed);
}

.free-download-header h1 span {
  color: #d6ad5c;
}

.free-download-header > p {
  max-width: 550px;
  margin: 0 auto;
  color: var(--text-secondary, #a1a1aa);
  font-size: 15px;
  line-height: 1.8;
}

/* =========================================
   DOWNLOAD CARD
========================================= */

.free-download-card {
  width: 100%;
  padding: 30px;
  border-radius: 22px;
  background: linear-gradient(
    145deg,
    #171717 0%,
    #111827 100%
  );
  border: 1px solid rgba(214, 173, 92, 0.19);
  box-shadow:
    0 20px 65px rgba(0, 0, 0, 0.24),
    0 0 40px rgba(214, 173, 92, 0.035);
}

.free-download-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 22px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.free-download-card-status,
.free-download-card-secure {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
}

.free-download-card-status {
  color: #22c55e;
}

.free-download-card-secure {
  color: #a1a1aa;
}

/* =========================================
   PRODUCT INFORMATION
========================================= */

.free-download-product {
  display: flex;
  align-items: center;
  gap: 27px;
}

.free-download-cover-wrapper {
  position: relative;
  flex-shrink: 0;
  width: 165px;
  aspect-ratio: 0.707 / 1;
  border-radius: 11px;
  overflow: visible;
  background: #202735;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.32);
}

.free-download-cover {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 11px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.free-download-cover-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d6ad5c;
  border-radius: 11px;
  background: #202735;
}

.free-download-cover-badge {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  padding: 7px 11px;
  border-radius: 30px;
  color: #ffffff;
  background: rgba(22, 163, 74, 0.95);
  font-size: 10px;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.free-download-product-info {
  min-width: 0;
  flex: 1;
}

.free-download-product-category {
  display: inline-block;
  margin-bottom: 11px;
  color: #d6ad5c;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.free-download-product-info h2 {
  margin: 0 0 12px;
  color: #f7f3ed;
  font-size: clamp(19px, 3vw, 25px);
  font-weight: 800;
  line-height: 1.4;
  overflow-wrap: anywhere;
}

.free-download-description {
  margin: 0 0 19px;
  color: #a1a1aa;
  font-size: 13px;
  line-height: 1.8;
}

.free-download-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 17px;
}

.free-download-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #c4c4cc;
  font-size: 12px;
}

.free-download-meta-item svg {
  color: #d6ad5c;
  flex-shrink: 0;
}

/* =========================================
   DOWNLOAD BUTTON
========================================= */

.free-download-action {
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  text-align: center;
}

.free-download-button {
  width: 100%;
  min-height: 60px;
  padding: 15px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(110deg, #d6ad5c, #efce87);
  color: #171717;
  font-size: 16px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 8px 25px rgba(214, 173, 92, 0.17);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    filter 0.25s ease;
}

.free-download-button:hover {
  transform: translateY(-3px);
  filter: brightness(1.06);
  box-shadow: 0 13px 30px rgba(214, 173, 92, 0.27);
}

.free-download-button:active {
  transform: translateY(0);
}

.free-download-button:focus-visible {
  outline: 3px solid #ffffff;
  outline-offset: 4px;
}

.free-download-button-arrow {
  position: absolute;
  right: 20px;
  transform: rotate(180deg);
  opacity: 0.7;
}

.free-download-hint {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin: 15px 0 0;
  color: #a1a1aa;
  font-size: 11px;
  line-height: 1.7;
}

.free-download-hint svg {
  color: #22c55e;
  flex-shrink: 0;
}

/* =========================================
   BENEFITS
========================================= */

.free-download-benefits {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 25px;
}

.free-download-benefit {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 17px 13px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.065);
}

.free-download-benefit-icon {
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #d6ad5c;
  background: rgba(214, 173, 92, 0.09);
}

.free-download-benefit > div:last-child {
  min-width: 0;
}

.free-download-benefit strong {
  display: block;
  margin-bottom: 5px;
  color: #f7f3ed;
  font-size: 11px;
  font-weight: 800;
}

.free-download-benefit span {
  display: block;
  color: #a1a1aa;
  font-size: 10px;
  line-height: 1.5;
}

/* =========================================
   FOOTER
========================================= */

.free-download-footer {
  margin-top: 35px;
  text-align: center;
}

.free-download-footer p {
  margin: 0 0 17px;
  color: #a1a1aa;
  font-size: 12px;
  line-height: 1.8;
}

.free-download-footer strong {
  color: #d6ad5c;
}

.free-download-home-link,
.free-download-back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #d6ad5c;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.free-download-home-link:hover,
.free-download-back-link:hover {
  color: #efce87;
}

/* =========================================
   UNAVAILABLE STATE
========================================= */

.free-download-unavailable {
  max-width: 480px;
  margin: 65px auto;
  padding: 40px 25px;
  text-align: center;
  border-radius: 18px;
  background: #171717;
  border: 1px solid rgba(214, 173, 92, 0.17);
}

.free-download-unavailable__icon {
  width: 65px;
  height: 65px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  color: #d6ad5c;
  background: rgba(214, 173, 92, 0.09);
}

.free-download-unavailable h1 {
  margin: 0 0 12px;
  color: #f7f3ed;
  font-size: 24px;
}

.free-download-unavailable p {
  margin: 0 0 22px;
  color: #a1a1aa;
  font-size: 14px;
  line-height: 1.8;
}

/* =========================================
   RESPONSIVE DESIGN
========================================= */

@media (max-width: 768px) {
  .free-download-page {
    padding-top: 20px;
    padding-bottom: 60px;
  }

  .free-download-wrapper {
    margin-top: 30px;
  }

  .free-download-card {
    padding: 23px;
  }

  .free-download-benefits {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .free-download-benefit {
    padding: 13px 15px;
  }
}

@media (max-width: 520px) {
  .free-download-header {
    margin-bottom: 28px;
  }

  .free-download-success-icon {
    width: 65px;
    height: 65px;
  }

  .free-download-header h1 {
    font-size: 31px;
    letter-spacing: -0.8px;
  }

  .free-download-header > p {
    font-size: 13px;
    padding: 0 8px;
  }

  .free-download-card {
    padding: 17px;
    border-radius: 16px;
  }

  .free-download-card-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 11px;
    margin-bottom: 20px;
    padding-bottom: 17px;
  }

  .free-download-product {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 23px;
  }

  .free-download-cover-wrapper {
    width: 145px;
  }

  .free-download-product-info {
    width: 100%;
  }

  .free-download-product-info h2 {
    font-size: 21px;
  }

  .free-download-description {
    font-size: 12px;
  }

  .free-download-meta {
    justify-content: center;
    gap: 12px;
  }

  .free-download-meta-item {
    font-size: 11px;
  }

  .free-download-action {
    margin-top: 24px;
    padding-top: 21px;
  }

  .free-download-button {
    min-height: 56px;
    padding: 14px 35px;
    font-size: 14px;
    gap: 9px;
  }

  .free-download-button-arrow {
    right: 12px;
  }

  .free-download-hint {
    font-size: 10px;
  }

  .free-download-footer {
    margin-top: 27px;
  }
}

@media (max-width: 350px) {
  .free-download-card {
    padding: 13px;
  }

  .free-download-button {
    font-size: 12px;
  }

  .free-download-meta {
    flex-direction: column;
    align-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .free-download-page *,
  .free-download-page *::before,
  .free-download-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`}
      </style>
    </section>
  );
}


/*
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
*/
 
# Little Learning Studio (React + Vite storefront)

## Run
    npm install
    npm run dev      # http://localhost:5173
    npm run build

## Add a product
Open `src/data/products.js`, copy a product object, give it a unique `id` and `slug`, set `category` to an existing
name from `src/data/categories.js`, and save. It appears in the shop, search, category filters, related products, and
gets its page at `/product/<slug>` automatically. Set `featured: true` to show it in the home page featured section.

## Connect Etsy / Amazon
In the product object set `purchaseMode: 'etsy'` (or `'amazon'`) and paste a real https URL in `etsyUrl` / `amazonUrl`.
Without a valid URL the button shows an honest "not configured" message.

## Images
Put files in `public/images/products/` and set `coverImage: '/images/products/your-file.webp'`; add previews via
`gallery: [{ src, alt }]`. Missing or null images fall back to generated cover art / illustrative page mockups.

## Rebrand
`src/config/site.js`: brand name, logo (text badge or `logoImage`), contact email, nav, social links (only entries with a
URL are shown), footer, hero copy. Colors, fonts, spacing: `src/styles/tokens.css`.

## Frontend only (works now)
Catalog, search/filter/sort with shareable URLs, product pages, cart (localStorage), validation, accordions, routing.

## Needs a backend / external service later
Real checkout and payments, digital file delivery, order records, newsletter storage, contact form delivery
(currently opens a mailto link), server-side rendering for full SEO (meta tags here are set client-side only).

## Notes
All products, prices, FAQ and policy text are sample/draft content and must be reviewed before launch.

---
## Kids / Adults upgrade

### Routes
`/kids` and `/adults` (themed hero, category chips, search, free/paid filter, sorting). `/shop`, `/categories` and all earlier routes are unchanged.

### Add a FREE product
1. Put the PDF in `public/downloads/kids/` or `public/downloads/adults/`.
2. In `src/data/products.js` add an object with `section: 'kids'|'adults'`, `productStatus: 'free'`, `price: 0`,
   `downloadUrl: '/downloads/kids/my-file.pdf'`, plus title, descriptions, category (exact name from `categories.js`), `pageCount`, `format`, `dimensions`, `ageRange`.
A free product without a valid `downloadUrl` is hidden (and warned about in the dev console) so visitors never see a dead download button.

### Add a PAID product
Same object, with `productStatus: 'paid'`, `price: 6.99`, and `externalPurchaseUrl: 'https://www.etsy.com/listing/...'`.
Opens in a new tab with `rel="noopener noreferrer"`. Any https marketplace URL works. Without a valid URL the product shows an honest "not configured" message.
Legacy `etsyUrl`/`amazonUrl`/`purchaseMode`/`gallery` fields still work.

### Images
`coverImage: '/images/products/x.webp'`, `previewImages: [{ src, alt }]`. Missing images fall back to generated covers (mandala art for adults).

### SEO
Set your real domain in `siteUrl` (`src/config/site.js`). `sitemap.xml` and `robots.txt` are regenerated automatically on `npm run dev` / `npm run build` (`scripts/generate-seo.mjs`). Meta tags are set client-side only.

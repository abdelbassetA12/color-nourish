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

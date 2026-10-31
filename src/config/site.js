// Central site configuration. Edit here to rebrand the store.
export const site = {
brandName: 'ColorNourish',
  logoText: 'C',
  logoImage: null, // e.g. '/images/brand/logo.svg'
  tagline: 'Printable learning fun for little hands',
  currency: 'USD',
  locale: 'en-US',
  contactEmail: 'hello@example.com', // replace with your real address
  siteUrl: 'https://www.example.com', // REPLACE with your real domain (no trailing slash): used for canonical, Open Graph and sitemap.xml
  defaultMarketplace: 'etsy', // 'etsy' | 'amazon'
  announcement: 'Free printable downloads available. Sample demo store.',
  nav: [
    { to: '/', label: 'Home' },
    { to: '/kids', label: 'Kids' },
    { to: '/adults', label: 'Adults' },
    { to: '/shop?status=free', label: 'Free' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
  ],
  // Only entries with a real url are displayed.
  social: [
    { label: 'Instagram', url: '' },
    { label: 'Pinterest', url: '' },
    { label: 'Etsy', url: '' },
  ],
  footer: {
    blurb: 'Printable coloring books and worksheets for kids and adults, delivered as digital PDF files.',
    support: [
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
      { to: '/digital-downloads', label: 'Digital Downloads' },
    ],
    policies: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/refund-policy', label: 'Refund Policy' },
    ],
    copyright: 'All rights reserved.',
  },
  hero: {
    headline: 'Printable Coloring & Learning for Every Age.',
    description: 'Playful alphabet worksheets for kids and calming mandalas for adults. Download free PDFs or explore premium collections.',
    primaryCta: 'Explore the Collection',
    secondaryCta: 'Browse Free Downloads',
  },
};

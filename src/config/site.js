// Central site configuration. Edit here to rebrand the store.
export const site = {
  brandName: 'Color Nourish', // temporary brand name
  logoText: 'A', // letter shown in the logo badge; set logoImage to use an image instead
  logoImage: null, // e.g. '/images/brand/logo.svg'
  tagline: 'Printable learning fun for little hands',
  currency: 'USD',
  locale: 'en-US',
  contactEmail: 'hello@example.com', // replace with your real address
  siteUrl: '', // e.g. 'https://www.example.com' (used for canonical URL when set)
  defaultMarketplace: 'etsy', // 'etsy' | 'amazon'
  announcement: 'New printable releases are coming soon. Sample demo store.',
  nav: [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
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
    blurb: 'Printable coloring books and early learning worksheets for children, delivered as digital PDF files.',
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
    headline: 'Big Learning Adventures Start with Little Letters.',
    description: 'Discover delightful printable coloring books and educational activities that make learning the alphabet fun, creative, and memorable.',
    primaryCta: 'Explore the Collection',
    secondaryCta: 'Discover Alphabet Books',
  },
};

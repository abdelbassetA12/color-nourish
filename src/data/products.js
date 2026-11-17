// FIELDS (all backward compatible): section 'kids'|'adults', productStatus 'free'|'paid', downloadUrl (free), externalPurchaseUrl (paid, https),
// previewImages [{src, alt}], dimensions, keywords, featured (per section), published. Legacy etsyUrl/amazonUrl/gallery still work.
// FREE products: price 0 + downloadUrl ('/downloads/<section>/<file>.pdf' in /public, or https). PAID: price > 0 + externalPurchaseUrl.
// SAMPLE / DEMO CATALOG (isDemo: true). Replace every product before going live.
// Add a product: copy an object, give it a unique id + slug. It appears in shop, search, categories, and gets its own page.
// Connect a marketplace: set purchaseMode to 'etsy' or 'amazon' and fill the matching Url with a real https:// link.
// Images: put files in /public/images/... and set coverImage: '/images/products/xxx.webp'. If null/missing, a generated cover is used.
// emoji + color only drive the generated cover art.
const common = {
  currency: 'USD',
  originalPrice: null, // set a number HIGHER than price to show a discount
  gallery: [], // [{ src: '/images/previews/a.webp', alt: 'Description' }]
  coverImage: null,
  purchaseMode: 'none', // 'etsy' | 'amazon' | 'none'
  etsyUrl: '',
  amazonUrl: '',
  published: true,
  isDemo: true,
  section: 'kids', // 'kids' | 'adults'
  productStatus: 'paid', // 'free' | 'paid'
  downloadUrl: '', // free products: real file URL
  externalPurchaseUrl: '', // paid products: Etsy (or other marketplace) https URL
  previewImages: [], // [{ src, alt }]
  dimensions: '8.5 × 11 in (US Letter)',
  badge: null, // e.g. 'New' (only shown when set)
  featured: false,
  printingInstructions: 'Print at actual size or 100% scale when supported by your printer. Review the PDF and your printer settings before printing.',
};

export const products = [
  {
    ...common, id: 'p1', slug: 'animal-alphabet-coloring-letter-tracing',
    title: 'Animal Alphabet Coloring & Letter Tracing Book',
    shortDescription: 'A playful A–Z journey featuring adorable animals, uppercase and lowercase letters, and handwriting practice for young learners.',
    description: 'Introduce young learners to the English alphabet through a cheerful collection of animal-themed coloring worksheets. Each page focuses on one letter, features a recognizable animal illustration, and provides uppercase and lowercase letter practice. Designed for printable educational activities at home or in preschool settings.',
    category: 'Animal Alphabet Books', productType: 'Printable PDF', price: 4.99, format: 'PDF', pageCount: 26, ageRange: '3–5 years',
    features: ['26 alphabet-themed worksheet pages.', 'One animal illustration per letter.', 'Uppercase and lowercase letter recognition.', 'Dedicated handwriting practice rows.', 'Black-and-white printable interior.', 'Portrait US Letter format.', 'Digital PDF product.'],
    learningBenefits: ['Letter recognition', 'Early handwriting control', 'Fine motor skills through coloring', 'Vocabulary linked to animals'],
    featured: true, badge: 'Featured', emoji: '🦁', color: '#efe6ff', keywords: ['alphabet', 'tracing', 'animals', 'abc'],
  },
  {
    ...common, id: 'p2', slug: 'preschool-animal-coloring-pack',
    title: 'Preschool Animal Coloring Pack',
    shortDescription: 'Bold, easy-to-color animal pages designed for small hands and short attention spans.',
    description: 'A friendly pack of simple animal outlines with thick lines that are easy for preschoolers to color. Great for quiet time, classroom centers, or a creative break at home.',
    category: 'Printable Coloring Books', productType: 'Printable PDF', price: 3.49, format: 'Printable PDF', pageCount: 20, ageRange: '3–6 years',
    features: ['Thick, beginner-friendly outlines.', 'Single-animal pages with ample coloring space.', 'Black-and-white printable interior.', 'US Letter format.'],
    learningBenefits: ['Fine motor development', 'Color recognition', 'Creative expression'],
    featured: true, emoji: '🐼', color: '#ffe6ee', keywords: ['coloring', 'animals', 'preschool'],
  },
  {
    ...common, id: 'p3', slug: 'abc-letter-tracing-worksheets',
    title: 'ABC Letter Tracing Worksheets',
    shortDescription: 'Step-by-step tracing pages that help children practice every letter of the alphabet.',
    description: 'Clear dotted letters and guided practice rows help children build confidence with pencil control. Each worksheet focuses on one letter in uppercase and lowercase.',
    category: 'Letter Tracing Worksheets', productType: 'Printable PDF', price: 2.99, format: 'Printable PDF', pageCount: 26, ageRange: '3–5 years',
    features: ['One letter per page.', 'Uppercase and lowercase tracing.', 'Open practice rows.', 'US Letter format.'],
    learningBenefits: ['Pencil control', 'Letter formation', 'Pre-writing skills'],
    emoji: '✏️', color: '#e3f3ff', keywords: ['tracing', 'handwriting', 'abc', 'letters'],
  },
  {
    ...common, id: 'p4', slug: 'first-preschool-activity-workbook',
    title: 'First Preschool Activity Workbook',
    shortDescription: 'A varied workbook of first activities: matching, tracing, coloring, and simple counting.',
    description: 'A gentle introduction to structured learning with short, varied activities. Pages mix matching, shape tracing, simple counting, and coloring to keep young learners engaged.',
    category: 'Preschool Activity Books', productType: 'Printable PDF', price: 5.99, format: 'Printable PDF', pageCount: 40, ageRange: '3–6 years',
    features: ['Matching and counting pages.', 'Shape and line tracing.', 'Coloring activities.', 'US Letter format.'],
    learningBenefits: ['Early counting', 'Visual matching', 'Focus and following instructions'],
    featured: true, emoji: '🧩', color: '#fff0d9', keywords: ['workbook', 'activities', 'counting'],
  },
  {
    ...common, id: 'p5', slug: 'alphabet-learning-activity-bundle',
    title: 'Alphabet Learning Activity Bundle',
    shortDescription: 'A collection of alphabet coloring, tracing, and activity PDFs in one convenient bundle.',
    description: 'Combine alphabet coloring, letter tracing, and activity pages in a single bundle. Ideal for parents and educators who want a full set of alphabet practice material.',
    category: 'Educational PDF Bundles', productType: 'Printable PDF Bundle', price: 7.99, format: 'Printable PDF Bundle', pageCount: 80, ageRange: '3–6 years',
    features: ['Several PDF files in one download.', 'Coloring, tracing, and activity pages.', 'US Letter format.'],
    learningBenefits: ['Complete alphabet practice', 'Variety to keep interest high'],
    featured: true, emoji: '📦', color: '#e2f6ea', keywords: ['bundle', 'alphabet', 'value'],
  },
  {
    ...common, id: 'p6', slug: 'cute-baby-animals-coloring-pages',
    title: 'Cute Baby Animals Coloring Pages',
    shortDescription: 'Adorable baby animal illustrations for relaxed, creative coloring time.',
    description: 'A sweet set of baby animal coloring pages with simple shapes and open spaces, perfect for young children who love animals.',
    category: 'Printable Coloring Books', productType: 'Printable PDF', price: 2.49, format: 'Printable PDF', pageCount: 15, ageRange: '3–6 years',
    features: ['Baby animal illustrations.', 'Simple shapes for easy coloring.', 'US Letter format.'],
    learningBenefits: ['Creativity', 'Hand-eye coordination'],
    emoji: '🐣', color: '#fff7c9', keywords: ['baby', 'animals', 'coloring'],
  },

  // ---- Free products (real downloadable PDFs in /public/downloads) ----
  {
    ...common, id: 'k-free-1', slug: 'free-abc-tracing-sampler', isDemo: false, productStatus: 'free', price: 0,
    downloadUrl: '/downloads/kids/free-abc-tracing-sampler.pdf',
    title: 'Free ABC Tracing Sampler (A–C)',
    shortDescription: 'Try three letter tracing pages for free: dotted letters, practice lines, and a space to draw each animal.',
    description: 'A free sampler of our letter tracing style. Each page features a large dotted uppercase letter, a lowercase letter, handwriting practice lines, and a drawing box for the matching animal. Download it instantly, no account or payment needed.',
    category: 'Letter Tracing Worksheets', productType: 'Free Printable PDF', format: 'PDF', pageCount: 3, ageRange: '3–5 years',
    features: ['3 tracing pages (A, B, C).', 'Uppercase and lowercase tracing.', 'Practice lines and drawing box.', 'Portrait US Letter format.'],
    learningBenefits: ['Letter formation', 'Pencil control', 'Letter-sound association'],
    featured: true, emoji: '🔤', color: '#e3f3ff', keywords: ['free', 'tracing', 'sampler', 'abc'],
  },

  // ---- Adults: paid (demo content; add your real Etsy URL in externalPurchaseUrl) ----
 
 
 
   

    /*
    {
    ...common,
    id: 'ab-free-2',
    slug: 'mandala-book-10page',
    section: 'adults',
    //productStatus: 'free',
    price: 10,
    isDemo: false,
    coverImage: '/images/products/Acorn & Oak Mandala.png',
    previewImages: [
      { src: '/images/products/Apple Blossom Mandala.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/Art Deco Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/Autumn Leaves Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      
    ],
    downloadUrl: '/downloads/adults/mandala book 10page.pdf',
    actionUrl: 'https://facebook.com',
    title: 'mandala-book-10page (10 Pages)',
    shortDescription: 'Ten intricate mandala designs to color at your own pace. A free, printable PDF for calm, screen-free relaxation.',
    description: 'Slow down and unwind with this free mandala coloring book for adults. It features ten detailed mandala designs, each on its own page, ranging from delicate floral patterns to richly layered geometric compositions. The clean black-and-white line art is ideal for colored pencils, gel pens, and fine markers. Download the PDF instantly, print as many copies as you like for personal use, and color whenever you need a quiet creative break. No account or payment required.',
    category: 'Adult Mandala Coloring Books',
    productType: 'Free Printable PDF',
    format: 'PDF',
    dimensions: '210 × 297 mm (A4)',
    pageCount: 10,
    ageRange: 'Adults and teens',
    features: [
      '10 unique mandala coloring pages.',
      'One design per page for easy printing.',
      'Detailed line art for pencils, gel pens, and fine markers.',
      'Black-and-white printable interior.',
      'A4 portrait format.',
      'Free instant PDF download, print as often as you like.',
    ],
    learningBenefits: [
      'Calm, mindful screen-free relaxation',
      'Improved focus and concentration',
      'Creative expression and color exploration',
      'Fine motor control and patience',
    ],
    printingInstructions: 'Print at actual size or 100% scale on A4 paper. For the best results with gel pens or markers, choose thicker paper and test on a spare page first. Review the PDF and your printer settings before printing.',
    featured: true,
    color: '#e8efec',
    keywords: ['free', 'mandala', 'adult coloring', 'relaxing', 'printable', 'stress relief', 'a4'],
  },
  */

  {
    ...common,
    id: 'ab-free-2',
    slug: 'mandala-book-10-page-free',
    section: 'adults',
    productStatus: 'free',
    price: 0,
    isDemo: false,
    coverImage: '/images/products/mandala10page/mandala.10page.png',
    previewImages: [
      { src: '/images/products/mandala10page/10-Page-Coloring-Preview-1.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala10page/10-Page-Coloring-Preview-2.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala10page/10-Page-Coloring-Preview-3.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala10page/mandala.10page.end.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      
    ],
    downloadUrl: '/downloads/adults/mandala-book-10-page-free.pdf',
    //actionUrl: 'https://facebook.com',
    title: 'Free Relaxing Mandala Coloring Book (10 Pages)',
    shortDescription: 'Ten intricate mandala designs to color at your own pace. A free, printable PDF for calm, screen-free relaxation.',
    description: 'Slow down and unwind with this free mandala coloring book for adults. It features ten detailed mandala designs, each on its own page, ranging from delicate floral patterns to richly layered geometric compositions. The clean black-and-white line art is ideal for colored pencils, gel pens, and fine markers. Download the PDF instantly, print as many copies as you like for personal use, and color whenever you need a quiet creative break. No account or payment required.',
    category: 'Adult Mandala Coloring Books',
    productType: 'Free Printable PDF',
    format: 'PDF',
    dimensions: '210 × 297 mm (A4)',
    pageCount: 10,
    ageRange: 'Adults and teens',
    features: [
      '10 unique mandala coloring pages.',
      'One design per page for easy printing.',
      'Detailed line art for pencils, gel pens, and fine markers.',
      'Black-and-white printable interior.',
      'A4 portrait format.',
      'Free instant PDF download, print as often as you like.',
    ],
    learningBenefits: [
      'Calm, mindful screen-free relaxation',
      'Improved focus and concentration',
      'Creative expression and color exploration',
      'Fine motor control and patience',
    ],
    printingInstructions: 'Print at actual size or 100% scale on A4 paper. For the best results with gel pens or markers, choose thicker paper and test on a spare page first. Review the PDF and your printer settings before printing.',
    featured: true,
    color: '#e8efec',
    keywords: ['free', 'mandala', 'adult coloring', 'relaxing', 'printable', 'stress relief', 'a4'],
  },
 
 /*
  {
    ...common,
    id: 'ab-free-2',
    slug: 'mandala-book-20page',
    section: 'adults',
    productStatus: 'free',
    price: 0,
    isDemo: false,
    coverImage: '/images/products/Acorn & Oak Mandala.png',
    previewImages: [
      { src: '/images/products/Apple Blossom Mandala.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/Art Deco Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/Autumn Leaves Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      
    ],
    downloadUrl: '/downloads/adults/mandala book 20page.pdf',
    //actionUrl: 'https://facebook.com',
    title: 'Free Relaxing Mandala Coloring Book (20 Pages)',
    shortDescription: 'Ten intricate mandala designs to color at your own pace. A free, printable PDF for calm, screen-free relaxation.',
    description: 'Slow down and unwind with this free mandala coloring book for adults. It features ten detailed mandala designs, each on its own page, ranging from delicate floral patterns to richly layered geometric compositions. The clean black-and-white line art is ideal for colored pencils, gel pens, and fine markers. Download the PDF instantly, print as many copies as you like for personal use, and color whenever you need a quiet creative break. No account or payment required.',
    category: 'Adult Mandala Coloring Books',
    productType: 'Free Printable PDF',
    format: 'PDF',
    dimensions: '210 × 297 mm (A4)',
    pageCount: 20,
    ageRange: 'Adults and teens',
    features: [
      '20 unique mandala coloring pages.',
      'One design per page for easy printing.',
      'Detailed line art for pencils, gel pens, and fine markers.',
      'Black-and-white printable interior.',
      'A4 portrait format.',
      'Free instant PDF download, print as often as you like.',
    ],
    learningBenefits: [
      'Calm, mindful screen-free relaxation',
      'Improved focus and concentration',
      'Creative expression and color exploration',
      'Fine motor control and patience',
    ],
    printingInstructions: 'Print at actual size or 100% scale on A4 paper. For the best results with gel pens or markers, choose thicker paper and test on a spare page first. Review the PDF and your printer settings before printing.',
    featured: true,
    color: '#e8efec',
    keywords: ['free', 'mandala', 'adult coloring', 'relaxing', 'printable', 'stress relief', 'a4'],
  },
  */
  

  {
    ...common,
    id: 'ab-free-2',
    slug: 'mandala-book-30page',
    section: 'adults',
    productStatus: 'free',
    price: 0,
    isDemo: false,
    coverImage: '/images/products/mandala30page/colornourish.30page.png',
    previewImages: [
      { src: '/images/products/mandala30page/Apple Blossom Mandala.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala30page/Art Deco Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala30page/Autumn Leaves Mandala Coloring.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/products/mandala30page/colornourish.30page.end.png', alt: 'Detailed floral mandala coloring page, preview 1' },
      
    ],
    downloadUrl: '/downloads/adults/mandala book 30page.pdf',
    //actionUrl: 'https://facebook.com',
    title: 'Free mandala book 30page (30 Pages)',
    shortDescription: 'Ten intricate mandala designs to color at your own pace. A free, printable PDF for calm, screen-free relaxation.',
    description: 'Slow down and unwind with this free mandala coloring book for adults. It features ten detailed mandala designs, each on its own page, ranging from delicate floral patterns to richly layered geometric compositions. The clean black-and-white line art is ideal for colored pencils, gel pens, and fine markers. Download the PDF instantly, print as many copies as you like for personal use, and color whenever you need a quiet creative break. No account or payment required.',
    category: 'Adult Mandala Coloring Books',
    productType: 'Free Printable PDF',
    format: 'PDF',
    dimensions: '210 × 297 mm (A4)',
    pageCount: 30,
    ageRange: 'Adults and teens',
    features: [
      '30 unique mandala coloring pages.',
      'One design per page for easy printing.',
      'Detailed line art for pencils, gel pens, and fine markers.',
      'Black-and-white printable interior.',
      'A4 portrait format.',
      'Free instant PDF download, print as often as you like.',
    ],
    learningBenefits: [
      'Calm, mindful screen-free relaxation',
      'Improved focus and concentration',
      'Creative expression and color exploration',
      'Fine motor control and patience',
    ],
    printingInstructions: 'Print at actual size or 100% scale on A4 paper. For the best results with gel pens or markers, choose thicker paper and test on a spare page first. Review the PDF and your printer settings before printing.',
    featured: true,
    color: '#e8efec',
    keywords: ['free', 'mandala', 'adult coloring', 'relaxing', 'printable', 'stress relief', 'a4'],
  },
   
  {
  ...common,
  id: 'ab-free-50',
  slug: 'ultimate-50-page-coloring-book',
  section: 'adults',
  productStatus: 'free',
  price: 0,
  isDemo: false,

  coverImage: '/images/products/mandala50page/ColorNourish-50page.png',

  previewImages: [
    {
      src: '/images/products/mandala50page/50-Page-Coloring-Preview-1.png',
      alt: 'Intricate geometric mandala coloring page preview'
    },
    {
      src: '/images/products/mandala50page/50-Page-Coloring-Preview-2.png',
      alt: 'Beautiful floral and botanical coloring page preview'
    },
    {
      src: '/images/products/mandala50page/50-Page-Coloring-Preview-3.png',
      alt: 'Detailed nature-inspired adult coloring page preview'
    },
    {
      src: '/images/products/mandala50page/50-Page-Coloring-Preview4.png',
      alt: 'Detailed nature-inspired adult coloring page preview'
    },
     
  ],

  downloadUrl: '/downloads/adults/Ultimate 50-Page Coloring Book.pdf',
  actionUrl: 'https://bestlockers.space/iframe/9d56b970-e2b1-11f1-b88f-8a5fb7be40ea',

  title: 'The Ultimate 50-Page Coloring Book for Adults',

  shortDescription:
    'Discover 50 beautifully detailed coloring pages in one complete collection! Explore intricate geometric patterns, mandalas, flowers, botanical illustrations, animals, fruits, and nature-inspired designs. Unlock your free printable PDF by completing one available offer.',

  description:
    'Discover a world of creativity with The Ultimate 50-Page Coloring Book for Adults by ColorNourish. This diverse collection brings together 50 unique coloring pages, carefully designed to offer an enjoyable and relaxing coloring experience.\n\nExplore a beautiful variety of illustrations, including intricate geometric patterns, mesmerizing mandalas, elegant flowers, botanical designs, animals, fruits, and nature-inspired compositions. Every page offers its own details and creative possibilities.\n\nThe collection features clean black-and-white line art, making it suitable for colored pencils, gel pens, and fine markers. Whether you enjoy detailed patterns or natural illustrations, this book offers plenty of designs to explore.\n\nWHAT IS INCLUDED:\n- 50 unique adult coloring pages.\n- A diverse collection of geometric and mandala designs.\n- Floral and botanical illustrations.\n- Animal, fruit, and nature-inspired artwork.\n- High-quality black-and-white line art.\n- One coloring design per page.\n- Printable A4 PDF format.\n\nHOW TO UNLOCK YOUR FREE BOOK:\n1. Click the unlock button on the product page.\n2. Choose one of the available offers in the content locker.\n3. Complete the selected offer according to its requirements.\n4. Once completion is successfully verified, your download will be unlocked.\n\nThis coloring book has no purchase price. However, access requires completing one available offer, which may have its own conditions.\n\nTake a creative break, explore new color combinations, and enjoy all 50 designs from ColorNourish.',

  category: 'Adult Coloring Books',

  productType: 'Free Printable PDF – Content Locker Required',

  format: 'PDF',

  dimensions: '210 × 297 mm (A4)',

  pageCount: 50,

  ageRange: 'Adults and teens',

  features: [
    '50 unique coloring pages in one complete collection.',
    'A diverse mix of geometric patterns and mandala designs.',
    'Beautiful floral and botanical illustrations.',
    'Animal, fruit, and nature-inspired coloring designs.',
    'One detailed coloring design per page.',
    'Clean black-and-white line art.',
    'Suitable for colored pencils, gel pens, and fine markers.',
    'A4 portrait printable PDF format.',
    'Free access after completing one available content locker offer.'
  ],

  learningBenefits: [
    'Creative expression and color exploration',
    'Calm and mindful screen-free relaxation',
    'Improved focus and concentration',
    'Attention to detail and patience'
  ],

  printingInstructions:
    'Print at actual size or 100% scale on A4 paper. For the best results with colored pencils, gel pens, or markers, choose thicker paper and test on a spare page first. Review your PDF and printer settings before printing.',

  featured: true,

  color: '#e8efec',

  keywords: [
    'free coloring book',
    '50 page coloring book',
    'adult coloring book',
    'printable coloring pages',
    'mandala coloring book',
    'geometric coloring pages',
    'floral coloring pages',
    'botanical coloring pages',
    'animal coloring pages',
    'fruit coloring pages',
    'nature coloring pages',
    'abstract coloring pages',
    'relaxing coloring',
    'adult printable PDF',
    'A4 coloring book',
    'ColorNourish'
  ]
},
 

];

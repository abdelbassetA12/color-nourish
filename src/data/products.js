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
  {
    ...common, id: 'a-free-1', slug: 'free-mandala-coloring-sampler', section: 'adults', isDemo: false, productStatus: 'free', price: 0,
    downloadUrl: '/downloads/adults/free-mandala-coloring-sampler.pdf',
    title: 'Free Mandala Coloring Sampler',
    shortDescription: 'Three detailed mandala designs to color for free, a calm introduction to our adult coloring style.',
    description: 'A free sampler of three symmetrical mandala designs with layered petals and fine line work. Print at home and color with pencils, gel pens, or fine markers. Download instantly, no account or payment needed.',
    category: 'Adult Mandala Coloring Books', productType: 'Free Printable PDF', format: 'PDF', pageCount: 3, ageRange: 'Adults and teens',
    features: ['3 mandala designs.', 'Fine line work for detailed coloring.', 'Black-and-white printable pages.', 'Portrait US Letter format.'],
    learningBenefits: ['Relaxation and focus', 'Creative expression'],
    featured: true, color: '#e8efec', keywords: ['free', 'mandala', 'sampler', 'relaxing'],
  },
  // ---- Adults: paid (demo content; add your real Etsy URL in externalPurchaseUrl) ----
  {
    ...common, id: 'a1', slug: 'adult-mandala-coloring-book-volume-1', section: 'adults',
    title: 'Adult Mandala Coloring Book, Volume 1',
    shortDescription: 'Forty intricate mandalas designed for slow, relaxing coloring sessions.',
    description: 'A collection of forty mandalas ranging from simple medallions to richly layered designs. Each design is printed on its own page so you can color with pencils, gel pens, or markers.',
    category: 'Adult Mandala Coloring Books', productType: 'Printable PDF', price: 6.99, format: 'Printable PDF', pageCount: 40, ageRange: 'Adults and teens',
    features: ['40 single-sided mandala pages.', 'Mixed difficulty levels.', 'Black-and-white printable interior.', 'US Letter format.'],
    learningBenefits: ['Mindful, screen-free relaxation', 'Fine motor control'],
    featured: true, badge: 'Premium', color: '#e8efec', keywords: ['mandala', 'adult', 'relaxing'],
  },
  {
    ...common, id: 'a2', slug: 'floral-mandala-designs', section: 'adults',
    title: 'Floral Mandala Designs',
    shortDescription: 'Blooming mandalas that blend botanical motifs with symmetrical patterns.',
    description: 'Floral mandalas combining petals, leaves, and delicate borders. A gentle option for coloring in short, calming sessions.',
    category: 'Floral Mandala Designs', productType: 'Printable PDF', price: 5.99, format: 'Printable PDF', pageCount: 30, ageRange: 'Adults and teens',
    features: ['30 floral mandala pages.', 'Fine detail for pencils and fine liners.', 'US Letter format.'],
    learningBenefits: ['Relaxation', 'Color harmony practice'],
    featured: true, color: '#f3e8ee', keywords: ['floral', 'flowers', 'mandala'],
  },
  {
    ...common, id: 'a3', slug: 'intricate-geometric-patterns-collection', section: 'adults',
    title: 'Intricate Geometric Patterns Collection',
    shortDescription: 'Precise, interlocking geometric designs for focused, meditative coloring.',
    description: 'Tessellations, stars, and interlocking shapes arranged in detailed patterns. Ideal for coloring with rulers, pens, or pencils.',
    category: 'Intricate Geometric Patterns', productType: 'Printable PDF', price: 5.49, format: 'Printable PDF', pageCount: 30, ageRange: 'Adults and teens',
    features: ['30 geometric pattern pages.', 'Bold and fine-line areas.', 'US Letter format.'],
    learningBenefits: ['Focus', 'Pattern recognition'],
    color: '#e6edf3', keywords: ['geometric', 'patterns', 'intricate'],
  },
  {
    ...common, id: 'a4', slug: 'adult-coloring-bundle-relax-and-create', section: 'adults',
    title: 'Adult Coloring Bundle: Relax & Create',
    shortDescription: 'Mandalas, florals, and geometric patterns together in one printable bundle.',
    description: 'A value bundle that combines mandala, floral, and geometric coloring pages so you can explore several styles in one download.',
    category: 'Adult Coloring Bundles', productType: 'Printable PDF Bundle', price: 9.99, format: 'Printable PDF Bundle', pageCount: 100, ageRange: 'Adults and teens',
    features: ['Several PDF files in one download.', 'Mandala, floral, and geometric styles.', 'US Letter format.'],
    learningBenefits: ['Variety to keep coloring fresh', 'Relaxation'],
    color: '#efe9e0', keywords: ['bundle', 'adult', 'value'],
  },

     {
    ...common,
    id: 'a-free-2',
    slug: 'free-relaxing-mandala-coloring-book',
    section: 'adults',
    productStatus: 'free',
    price: 0,
    isDemo: false,
    coverImage: '/images/products/commercially_appealing_FRONT_COVER_for_a_children_-0.jpg',
    previewImages: [
      { src: '/images/previews/mandala-page-1.jpg', alt: 'Detailed floral mandala coloring page, preview 1' },
      { src: '/images/previews/mandala-page-2.jpg', alt: 'Geometric mandala coloring page, preview 2' },
    ],
    downloadUrl: '/downloads/adults/pdfmandala.pdf',
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

];

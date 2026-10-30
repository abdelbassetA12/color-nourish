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
];


import { products } from '../data/products';
import { categories } from '../data/categories.js';

// =============================================
// URL VALIDATION
// =============================================

const isValidExternalUrl = (url) =>
  typeof url === 'string' &&
  /^https:\/\//i.test(url.trim());

const isValidDownloadUrl = (url) =>
  typeof url === 'string' &&
  (/^\/(?!\/)/.test(url.trim()) || /^https:\/\//i.test(url.trim()));

// =============================================
// PRODUCT VALUE HELPERS
// =============================================

const getValue = (
  product,
  currentKey,
  legacyKey,
  fallback = undefined
) =>
  product?.[currentKey] ??
  product?.[legacyKey] ??
  fallback;

const getId = (product) =>
  getValue(product, 'id', '_id_') ??
  getValue(product, '_id', '__id__') ??
  null;

const getSlug = (product) =>
  getValue(product, 'slug', '_slug_', '');

const getPrice = (product) =>
  Number(getValue(product, 'price', '_price_', 0));

// =============================================
// FREE / PAID STATUS
// =============================================

export const isFreeProduct = (product) => {
  if (!product) return false;

  const status = getValue(
    product,
    'productStatus',
    '_productStatus_'
  );

  if (status === 'free') return true;
  if (status === 'paid') return false;

  const explicitFree = getValue(
    product,
    'isFree',
    '_isFree_'
  );

  if (typeof explicitFree === 'boolean') {
    return explicitFree;
  }

  return getPrice(product) === 0;
};

// =============================================
// ACTION URL
// Priority:
// 1. actionUrl
// 2. externalPurchaseUrl
// 3. Etsy / Amazon legacy URL
// =============================================

export function actionUrl(product) {
  if (!product) return null;

  const primaryAction = getValue(
    product,
    'actionUrl',
    '_actionUrl_',
    ''
  );

  if (isValidExternalUrl(primaryAction)) {
    return primaryAction.trim();
  }

  const externalPurchase = getValue(
    product,
    'externalPurchaseUrl',
    '_externalPurchaseUrl_',
    ''
  );

  if (isValidExternalUrl(externalPurchase)) {
    return externalPurchase.trim();
  }

  const purchaseMode = getValue(
    product,
    'purchaseMode',
    '_purchaseMode_',
    'none'
  );

  const etsyUrl = getValue(
    product,
    'etsyUrl',
    '_etsyUrl_',
    ''
  );

  const amazonUrl = getValue(
    product,
    'amazonUrl',
    '_amazonUrl_',
    ''
  );

  let legacyUrl = '';

  if (purchaseMode === 'etsy') {
    legacyUrl = etsyUrl;
  } else if (purchaseMode === 'amazon') {
    legacyUrl = amazonUrl;
  } else {
    legacyUrl = etsyUrl || amazonUrl;
  }

  return isValidExternalUrl(legacyUrl)
    ? legacyUrl.trim()
    : null;
}

// =============================================
// FREE PRODUCT DOWNLOAD
// External action first, then direct PDF
// =============================================

export function downloadHref(product) {
  if (!product || !isFreeProduct(product)) {
    return null;
  }

  const externalAction = actionUrl(product);

  if (externalAction) {
    return externalAction;
  }

  const downloadUrl = getValue(
    product,
    'downloadUrl',
    '_downloadUrl_',
    ''
  );

  return isValidDownloadUrl(downloadUrl)
    ? downloadUrl.trim()
    : null;
}


// =============================================
// DIRECT FILE DOWNLOAD
// Used only after MyLead content locker completion
// Never redirects to actionUrl or externalPurchaseUrl
// =============================================

export function directDownloadHref(product) {
  if (!product || !isFreeProduct(product)) {
    return null;
  }

  const downloadUrl = getValue(
    product,
    'downloadUrl',
    '_downloadUrl_',
    ''
  );

  return isValidDownloadUrl(downloadUrl)
    ? downloadUrl.trim()
    : null;
}


// =============================================
// PAID PRODUCT PURCHASE URL
// =============================================

export function purchaseUrl(product) {
  if (!product || isFreeProduct(product)) {
    return null;
  }

  return actionUrl(product);
}

// =============================================
// NORMALIZE PRODUCT
// Supports camelCase and legacy fields
// =============================================

export function normalizeProduct(product) {
  if (!product) return null;

  const id =
    product.id ??
    product._id_ ??
    product._id ??
    product.__id__ ??
    null;

  const slug =
    product.slug ??
    product._slug_ ??
    product.__slug__ ??
    '';

  const title =
    product.title ??
    product._title_ ??
    product.__title__ ??
    '';

  const section =
    product.section ??
    product._section_ ??
    product.__section__ ??
    'kids';

  const rawPrice = Number(
    product.price ??
    product._price_ ??
    product.__price__ ??
    0
  );

  const explicitStatus =
    product.productStatus ??
    product._productStatus_ ??
    product.__productStatus__;

  const productStatus =
    explicitStatus === 'free' || explicitStatus === 'paid'
      ? explicitStatus
      : rawPrice === 0
        ? 'free'
        : 'paid';

  const isFree = productStatus === 'free';

  const price = isFree ? 0 : rawPrice;

  const originalPrice =
    product.originalPrice ??
    product._originalPrice_ ??
    product.__originalPrice__ ??
    null;

  const category =
    product.category ??
    product._category_ ??
    product.__category__ ??
    '';

  const productType =
    product.productType ??
    product._productType_ ??
    product.__productType__ ??
    '';

  const format =
    product.format ??
    product._format_ ??
    product.__format__ ??
    '';

  const shortDescription =
    product.shortDescription ??
    product._shortDescription_ ??
    product.__shortDescription__ ??
    '';

  const description =
    product.description ??
    product._description_ ??
    product.__description__ ??
    '';

  const pageCount =
    product.pageCount ??
    product._pageCount_ ??
    product.__pageCount__ ??
    null;

  const ageRange =
    product.ageRange ??
    product._ageRange_ ??
    product.__ageRange__ ??
    '';

  const features =
    product.features ??
    product._features_ ??
    product.__features__ ??
    [];

  const learningBenefits =
    product.learningBenefits ??
    product._learningBenefits_ ??
    product.__learningBenefits__ ??
    [];

  const coverImage =
    product.coverImage ??
    product._coverImage_ ??
    product.__coverImage__ ??
    null;

  const gallery =
    product.gallery ??
    product._gallery_ ??
    product.__gallery__ ??
    [];

  const previewImages =
    product.previewImages ??
    product._previewImages_ ??
    product.__previewImages__ ??
    gallery;

  const purchaseMode =
    product.purchaseMode ??
    product._purchaseMode_ ??
    product.__purchaseMode__ ??
    'none';

  const etsyUrl =
    product.etsyUrl ??
    product._etsyUrl_ ??
    product.__etsyUrl__ ??
    '';

  const amazonUrl =
    product.amazonUrl ??
    product._amazonUrl_ ??
    product.__amazonUrl__ ??
    '';

  const action =
    product.actionUrl ??
    product._actionUrl_ ??
    product.__actionUrl__ ??
    '';

  const externalPurchaseUrl =
    product.externalPurchaseUrl ??
    product._externalPurchaseUrl_ ??
    product.__externalPurchaseUrl__ ??
    '';

  const downloadUrl =
    product.downloadUrl ??
    product._downloadUrl_ ??
    product.__downloadUrl__ ??
    '';

  const keywords =
    product.keywords ??
    product._keywords_ ??
    product.__keywords__ ??
    [];

  const featured =
    product.featured ??
    product._featured_ ??
    product.__featured__ ??
    false;

  const published =
    product.published ??
    product._published_ ??
    product.__published__ ??
    true;

  const isDemo =
    product.isDemo ??
    product._isDemo_ ??
    product.__isDemo__ ??
    true;

  const dimensions =
    product.dimensions ??
    product._dimensions_ ??
    product.__dimensions__ ??
    '';

  const badge =
    product.badge ??
    product._badge_ ??
    product.__badge__ ??
    null;

  const printingInstructions =
    product.printingInstructions ??
    product._printingInstructions_ ??
    product.__printingInstructions__ ??
    product.printingInstruction ??
    '';

  const normalized = {
    ...product,

    id,
    slug,
    title,
    section,
    productStatus,
    isFree,
    price,
    originalPrice,
    category,
    productType,
    format,
    shortDescription,
    description,
    pageCount,
    ageRange,
    features,
    learningBenefits,
    coverImage,
    gallery,
    previewImages,
    purchaseMode,
    etsyUrl,
    amazonUrl,
    actionUrl: action,
    externalPurchaseUrl,
    downloadUrl,
    keywords,
    featured,
    published,
    isDemo,
    dimensions,
    badge,
    printingInstructions,
  };

  // Legacy aliases used by existing UI components.
  return {
    ...normalized,

    _id_: id,
    _slug_: slug,
    _title_: title,
    _section_: section,
    _productStatus_: productStatus,
    _isFree_: isFree,
    _price_: price,
    _originalPrice_: originalPrice,
    _category_: category,
    _productType_: productType,
    _format_: format,
    _shortDescription_: shortDescription,
    _description_: description,
    _pageCount_: pageCount,
    _ageRange_: ageRange,
    _features_: features,
    _learningBenefits_: learningBenefits,
    _coverImage_: coverImage,
    _gallery_: gallery,
    _previewImages_: previewImages,
    _purchaseMode_: purchaseMode,
    _etsyUrl_: etsyUrl,
    _amazonUrl_: amazonUrl,
    _actionUrl_: action,
    _externalPurchaseUrl_: externalPurchaseUrl,
    _downloadUrl_: downloadUrl,
    _keywords_: keywords,
    _featured_: featured,
    _published_: published,
    _isDemo_: isDemo,
    _dimensions_: dimensions,
    _badge_: badge,
    _printingInstructions_: printingInstructions,
  };
}

// =============================================
// VALIDATE PRODUCT
// =============================================

export function validateProduct(product) {
  const errors = [];
  const warnings = [];

  if (!product?._slug_ || !product?._title_) {
    errors.push('Product must have a slug and title.');
  }

  if (
    !Number.isFinite(Number(product?._price_)) ||
    Number(product?._price_) < 0
  ) {
    errors.push(
      'Product price must be a valid non-negative number.'
    );
  }

  if (isFreeProduct(product)) {
    if (
      !actionUrl(product) &&
      !isValidDownloadUrl(product?._downloadUrl_)
    ) {
      errors.push(
        'Free product must have an actionUrl or a valid downloadUrl.'
      );
    }
  } else {
    if (!(Number(product?._price_) > 0)) {
      errors.push(
        'Paid product must have a price greater than zero.'
      );
    }

    if (!actionUrl(product)) {
      warnings.push(
        'Paid product has no valid purchase URL.'
      );
    }
  }

  return { errors, warnings };
}

// =============================================
// ALL PRODUCTS
// =============================================

export const allProducts = (Array.isArray(products) ? products : [])
  .map(normalizeProduct)
  .filter(Boolean)
  .filter((product) => product._published_ !== false)
  .filter((product) => {
    const { errors, warnings } = validateProduct(product);

    if (errors.length > 0) {
      console.error(
        `[ColorNourish] Invalid product "${product._id_ || product._slug_}":`,
        errors
      );

      return false;
    }

    if (warnings.length > 0) {
      console.warn(
        `[ColorNourish] Product "${product._id_ || product._slug_}":`,
        warnings
      );
    }

    return true;
  });

// =============================================
// PRODUCT LOOKUPS
// =============================================

export const getProduct = (slug) =>
  allProducts.find((product) => product._slug_ === slug) || null;

export const hasDiscount = (product) =>
  !isFreeProduct(product) &&
  Number(product?._originalPrice_ ?? 0) >
    Number(product?._price_ ?? 0);

export const inSection = (section) =>
  section
    ? allProducts.filter(
        (product) => product._section_ === section
      )
    : allProducts;

export const productTypes = [
  ...new Set(
    allProducts
      .map((product) => product._productType_)
      .filter(Boolean)
  ),
];

export const featuredProducts = (section) =>
  inSection(section).filter(
    (product) => product._featured_
  );

export const freeProducts = (section) =>
  inSection(section).filter(isFreeProduct);

export const productsInCategory = (category) =>
  allProducts.filter(
    (product) => product._category_ === category
  );

// =============================================
// CATEGORIES
// =============================================

export const categoriesFor = (section) => {
  const sectionProducts = inSection(section);

  const availableCategoryNames = new Set(
    sectionProducts
      .map((product) => product._category_)
      .filter(Boolean)
  );

  return (Array.isArray(categories) ? categories : [])
    .filter((category) => {
      const name =
        category._name_ ??
        category.name ??
        category.label ??
        '';

      return availableCategoryNames.has(name);
    })
    .map((category) => ({
      ...category,
      _slug_:
        category._slug_ ??
        category.slug ??
        '',
      _name_:
        category._name_ ??
        category.name ??
        category.label ??
        '',
    }));
};

// =============================================
// PRICE RANGES
// =============================================

export const PRICE_RANGES = [
  {
    _id_: 'all',
    id: 'all',
    _label_: 'All prices',
    label: 'All prices',
    test: () => true,
  },
  {
    _id_: 'under-5',
    id: 'under-5',
    _label_: 'Under $5',
    label: 'Under $5',
    test: (product) => getPrice(product) < 5,
  },
  {
    _id_: '5-10',
    id: '5-10',
    _label_: '$5 - $10',
    label: '$5 - $10',
    test: (product) => {
      const price = getPrice(product);
      return price >= 5 && price <= 10;
    },
  },
  {
    _id_: '10-plus',
    id: '10-plus',
    _label_: '$10 and above',
    label: '$10 and above',
    test: (product) => getPrice(product) > 10,
  },
];

// =============================================
// RELATED PRODUCTS
// =============================================

export const related = (product, limit = 4) => {
  if (!product) return [];

  const productId = getId(product);
  const productCategory =
    product._category_ ?? product.category;

  const productSection =
    product._section_ ?? product.section;

  return allProducts
    .filter((item) => getId(item) !== productId)
    .filter(
      (item) =>
        (productCategory &&
          item._category_ === productCategory) ||
        item._section_ === productSection
    )
    .slice(0, limit);
};

// =============================================
// CATEGORY / PURCHASE LABEL HELPERS
// =============================================

export const categorySlug = (product) => {
  const category =
    product?._category_ ??
    product?.category ??
    '';

  const match = (
    Array.isArray(categories) ? categories : []
  ).find(
    (item) =>
      (item._name_ ?? item.name) === category
  );

  return match?._slug_ ?? match?.slug ?? '';
};

export const purchaseLabel = (product) => {
  if (!product || isFreeProduct(product)) {
    return 'Get Free Product';
  }

  const mode =
    product._purchaseMode_ ??
    product.purchaseMode ??
    '';

  if (mode === 'amazon') return 'Buy on Amazon';

  return 'Buy on Etsy';
};

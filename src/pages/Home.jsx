import { Link } from 'react-router-dom';
import { Download, Printer, Palette, Sparkles, Heart, BookOpen } from 'lucide-react';
import { site } from '../config/site.js';
import { categories } from '../data/categories.js';
import { allProducts, featuredProducts, productsInCategory } from '../utils/productHelpers.js';
import { Container, SectionHeading, Button, PagePreview } from '../components/common/ui.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { NewsletterForm } from '../components/forms/Forms.jsx';
import { Cover } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

const benefits = [
  { icon: Sparkles, t: 'Instant flexibility', d: 'Print only the pages you need, as often as you like for your own household or classroom.' },
  { icon: Heart, t: 'Screen-free learning', d: 'Hands-on pencil and crayon activities that build focus and fine motor skills.' },
  { icon: Palette, t: 'Creative practice', d: 'Coloring turns letter recognition into a calm, playful routine.' },
];
const steps = [
  { icon: BookOpen, t: 'Choose a resource', d: 'Browse the collection and open a product to see what is included.' },
  { icon: Download, t: 'Get the PDF', d: 'Purchase through the linked marketplace. Files are delivered digitally; nothing ships.' },
  { icon: Printer, t: 'Print and play', d: 'Print at 100% scale on US Letter paper and start learning together.' },
];

export default function Home() {
  useSeo('Printable Alphabet Coloring Books & Worksheets', 'Printable animal alphabet coloring books, letter tracing worksheets and preschool activity PDFs.');
  const hero = allProducts.find((p) => p.featured) || allProducts[0];
  const featured = featuredProducts().slice(0, 3);
  const coloring = [...productsInCategory('Animal Alphabet Books'), ...productsInCategory('Printable Coloring Books')].slice(0, 3);
  return (
    <>
      <section className="hero">
        <Container className="hero__inner">
          <div>
            <p className="eyebrow">Printable PDF learning resources</p>
            <h1>{site.hero.headline}</h1>
            <p className="hero__lead">{site.hero.description}</p>
            <div className="btn-row"><Button to="/shop">{site.hero.primaryCta}</Button><Button to="/shop?category=animal-alphabet-books" variant="ghost">{site.hero.secondaryCta}</Button></div>
          </div>
          {hero && <Link to={`/product/${hero.slug}`} className="hero__art" aria-label={`View ${hero.title}`}><Cover product={hero} eager /></Link>}
        </Container>
      </section>

      {featured.length > 0 && <section className="section"><Container><SectionHeading eyebrow="Featured" title="Featured resources" text="A hand-picked selection from the sample catalog." /><ProductGrid products={featured} /></Container></section>}

      <section className="section section--cream"><Container>
        <SectionHeading eyebrow="Browse" title="Shop by category" />
        <div className="grid grid--cats">{categories.map((c) => (
          <Link key={c.slug} to={`/shop?category=${c.slug}`} className="card cat-card" style={{ background: c.color }}><span aria-hidden="true" className="cat-card__emoji">{c.emoji}</span><h3>{c.name}</h3></Link>))}</div>
      </Container></section>

      <section className="section"><Container>
        <SectionHeading eyebrow="Why printables" title="Why printable educational resources?" center />
        <div className="grid grid--3">{benefits.map(({ icon: I, t, d }) => <div className="card feature" key={t}><I aria-hidden="true" /><h3>{t}</h3><p>{d}</p></div>)}</div>
      </Container></section>

      {coloring.length > 0 && <section className="section section--cream"><Container><SectionHeading title="Alphabet & animal coloring books" text="Letters, animals, and plenty of color." /><ProductGrid products={coloring} /><div className="center"><Button to="/shop" variant="ghost">View all products</Button></div></Container></section>}

      <section className="section"><Container>
        <SectionHeading eyebrow="Simple" title="How digital downloads work" center />
        <ol className="grid grid--3 steps">{steps.map(({ icon: I, t, d }, i) => <li className="card feature" key={t}><span className="steps__n" aria-hidden="true">{i + 1}</span><I aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>)}</ol>
      </Container></section>

      {hero && <section className="section section--cream"><Container>
        <SectionHeading eyebrow="Sneak peek" title="Sample worksheet pages" text="Illustrative mockups of the kind of interior pages you can expect." />
        <div className="grid grid--3 previews"><PagePreview product={hero} variant="a" /><PagePreview product={hero} variant="b" /><PagePreview product={allProducts[2] || hero} variant="a" /></div>
      </Container></section>}

      <section className="section"><Container narrow>
        <SectionHeading eyebrow="For grown-ups" title="For parents and preschool educators" text="Use the pages for quiet time, early-learning centers, or take-home practice. Each product lists its age range, page count and print guidance so you can choose with confidence." center />
        <div className="center"><Button to="/about" variant="ghost">Our approach</Button></div>
      </Container></section>

      <section className="section"><Container narrow><div className="card promo">
        <h2>Be first to hear about new printables</h2><p>Join the list for new releases. This form is a frontend demonstration.</p><NewsletterForm />
      </div></Container></section>

      <section className="section section--cream"><Container narrow>
        <SectionHeading title="What you receive" text="Every product is a digital PDF file for printing at home or in the classroom. No physical book is shipped. The previews on this site are mockups; check each product page for its contents." center />
        <div className="center"><Button to="/digital-downloads" variant="ghost">Digital download details</Button></div>
      </Container></section>
    </>
  );
}

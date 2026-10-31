import { Link } from 'react-router-dom';
import { Download, Printer, Palette, Sparkles, Heart, BookOpen, ShoppingBag } from 'lucide-react';
import { site } from '../config/site.js';
import { sections } from '../data/sections.js';
import { featuredProducts, freeProducts } from '../utils/productHelpers.js';
import { Container, SectionHeading, Button, Mandala } from '../components/common/ui.jsx';
import { ProductGrid } from '../components/products/ProductCard.jsx';
import { NewsletterForm } from '../components/forms/Forms.jsx';
import { useSeo } from '../hooks/useSeo.js';

const benefits = [
  { icon: Sparkles, t: 'Print what you need', d: 'Print pages as often as you like for personal or classroom use, whenever inspiration strikes.' },
  { icon: Heart, t: 'Screen-free time', d: 'Hands-on activities for focus and calm, for little hands and grown-up ones.' },
  { icon: Palette, t: 'Creative practice', d: 'From first letters to detailed mandalas, coloring builds skill and relaxes the mind.' },
];
const steps = [
  { icon: BookOpen, t: 'Pick a resource', d: 'Browse the Kids or Adults collection, or start with a free download.' },
  { icon: Download, t: 'Free: download. Paid: buy', d: 'Free files download straight from this site. Paid products are purchased on the linked marketplace, such as Etsy.' },
  { icon: Printer, t: 'Print and enjoy', d: 'Print at 100% scale on US Letter paper. No physical item is shipped.' },
];

function FeaturedBlock({ section, title, text }) {
  const list = featuredProducts(section).slice(0, 3);
  if (!list.length) return null;
  return (
    <section className={`section theme-${section} ${section === 'adults' ? 'section--cream' : ''}`}><Container>
      <SectionHeading eyebrow={sections[section].label} title={title} text={text} />
      <ProductGrid products={list} />
      <div className="center"><Button to={sections[section].path} variant="ghost">See the full {sections[section].label.toLowerCase()} collection</Button></div>
    </Container></section>
  );
}

export default function Home() {
  useSeo('Printable Coloring Books & Worksheets for Kids and Adults', 'Printable coloring books and worksheets: alphabet activities for kids, mandalas and detailed patterns for adults. Free PDF downloads available.');
  const free = freeProducts().slice(0, 4);
  return (
    <>
      <section className="hero">
        <Container narrow className="hero__center">
          <p className="eyebrow">Printable PDF coloring &amp; learning</p>
          <h1>{site.hero.headline}</h1>
          <p className="hero__lead">{site.hero.description}</p>
          <div className="btn-row btn-row--center"><Button to="/shop">{site.hero.primaryCta}</Button><Button to="/shop?status=free" variant="ghost">{site.hero.secondaryCta}</Button></div>
        </Container>
      </section>

      <section className="section section--tight"><Container>
        <h2 className="sr-only">Choose a collection</h2>
        <div className="grid grid--2">
          {Object.values(sections).map((s) => (
            <Link key={s.key} to={s.path} className={`card section-card theme-${s.key}`}>
              <div className="section-card__art" aria-hidden="true">{s.key === 'adults' ? <Mandala /> : s.art.map((e) => <span key={e}>{e}</span>)}</div>
              <p className="eyebrow">{s.label}</p><h3>{s.cardTitle}</h3><p>{s.cardText}</p><span className="section-card__cta">{s.cardTitle} →</span>
            </Link>
          ))}
        </div>
      </Container></section>

      <FeaturedBlock section="kids" title="Featured for kids" text="Alphabet, tracing and activity resources for young learners." />
      <FeaturedBlock section="adults" title="Featured for adults" text="Mandalas and detailed designs for relaxing, artistic coloring." />

      {free.length > 0 && <section className="section"><Container>
        <SectionHeading eyebrow="No payment needed" title="Free downloads" text="Real printable PDFs you can download right now. No account, no checkout." />
        <ProductGrid products={free} />
        <div className="center"><Button to="/shop?status=free" variant="ghost">All free downloads</Button></div>
      </Container></section>}

      <section className="section section--cream"><Container>
        <SectionHeading eyebrow="Simple" title="How digital downloads work" center />
        <ol className="grid grid--3 steps">{steps.map(({ icon: I, t, d }, i) => <li className="card feature" key={t}><span className="steps__n" aria-hidden="true">{i + 1}</span><I aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>)}</ol>
        <p className="center"><Link to="/digital-downloads">Digital download details</Link></p>
      </Container></section>

      <section className="section"><Container>
        <SectionHeading eyebrow="Why printables" title="The value of printable coloring" center />
        <div className="grid grid--3">{benefits.map(({ icon: I, t, d }) => <div className="card feature" key={t}><I aria-hidden="true" /><h3>{t}</h3><p>{d}</p></div>)}</div>
      </Container></section>

      <section className="section"><Container narrow><div className="card promo">
        <h2>Be first to hear about new printables</h2><p>Join the list for new releases. This form is a frontend demonstration.</p><NewsletterForm />
      </div></Container></section>
    </>
  );
}

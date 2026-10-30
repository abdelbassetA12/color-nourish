import { Link } from 'react-router-dom';
import { categories } from '../data/categories.js';
import { productsInCategory } from '../utils/productHelpers.js';
import { Container, SectionHeading } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function Categories() {
  useSeo('Categories', 'Browse printable learning resources by category.');
  return (
    <section className="section"><Container>
      <SectionHeading as="h1" title="Browse by category" text="Find the right printable resource for your child or classroom." />
      <div className="grid grid--cats grid--cats-lg">{categories.map((c) => {
        const n = productsInCategory(c.name).length;
        return (
          <Link key={c.slug} to={`/shop?category=${c.slug}`} className="card cat-card cat-card--lg" style={{ background: c.color }}>
            <span className="cat-card__emoji" aria-hidden="true">{c.emoji}</span><h2>{c.name}</h2><p>{c.description}</p>
            <span className="muted">{n} product{n === 1 ? '' : 's'}</span>
          </Link>);
      })}</div>
    </Container></section>
  );
}

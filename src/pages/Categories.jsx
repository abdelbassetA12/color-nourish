import { Link } from 'react-router-dom';
import { categories } from '../data/categories.js';
import { sections } from '../data/sections.js';
import { productsInCategory } from '../utils/productHelpers.js';
import { Container, SectionHeading } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function Categories() {
  useSeo('Categories', 'Browse printable coloring and learning resources by category, for kids and adults.');
  return (
    <section className="section"><Container>
      <SectionHeading as="h1" title="Browse by category" text="Find the right printable resource for your child, classroom, or quiet evening." />
      {Object.values(sections).map((s) => (
        <div key={s.key} className={`theme-${s.key} cat-group`}>
          <h2><Link to={s.path}>{s.label}</Link></h2>
          <div className="grid grid--cats grid--cats-lg">{categories.filter((c) => c.section === s.key).map((c) => {
            const n = productsInCategory(c.name).length;
            return (
              <Link key={c.slug} to={`${s.path}?category=${c.slug}`} className="card cat-card cat-card--lg" style={{ background: c.color }}>
                <span className="cat-card__emoji" aria-hidden="true">{c.emoji}</span><h3>{c.name}</h3><p>{c.description}</p>
                <span className="muted">{n} product{n === 1 ? '' : 's'}</span>
              </Link>);
          })}</div>
        </div>
      ))}
    </Container></section>
  );
}

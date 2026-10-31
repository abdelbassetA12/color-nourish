import { Container, Button, Mandala } from '../components/common/ui.jsx';
import ProductBrowser from '../components/products/ProductBrowser.jsx';
import { sections } from '../data/sections.js';
import { useSeo } from '../hooks/useSeo.js';

// Used for both /kids and /adults. Section theming comes from the `theme-<section>` class.
export default function SectionPage({ section }) {
  const s = sections[section];
  useSeo(s.seoTitle, s.seoDesc);
  return (
    <div className={`theme-${section}`}>
      <section className="section-hero">
        <Container className="section-hero__inner">
          <div>
            <p className="eyebrow">{s.eyebrow}</p>
            <h1>{s.title}</h1>
            <p className="hero__lead">{s.text}</p>
            <div className="btn-row"><Button to={`${s.path}?status=free`}>Free downloads</Button><Button to="/shop" variant="ghost">Shop everything</Button></div>
          </div>
          <div className="section-hero__art" aria-hidden="true">{section === 'adults' ? <Mandala /> : s.art.map((e) => <span key={e}>{e}</span>)}</div>
        </Container>
      </section>
      <section className="section"><Container><h2 className="sr-only">{s.label} products</h2><ProductBrowser section={section} /></Container></section>
    </div>
  );
}

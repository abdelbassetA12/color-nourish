import { site } from '../config/site.js';
import { Container, SectionHeading, Button } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

// Editable sample copy: replace with your real brand story.
const blocks = [
  { t: 'Our mission', d: 'To help children learn through creativity, coloring, and simple educational activities.' },
  { t: 'Educational philosophy', d: 'Short, playful, hands-on practice builds confidence. We favor clear layouts and gentle repetition over pressure.' },
  { t: 'How we create products', d: 'Each resource is planned around a single learning goal, with simple illustrations and print-friendly black-and-white pages.' },
  { t: 'For parents and teachers', d: 'Print what you need, when you need it, for home, quiet time, or classroom centers.' },
];
export default function About() {
  useSeo('About', `About ${site.brandName}.`);
  return (
    <section className="section"><Container narrow>
      <SectionHeading as="h1" eyebrow="About us" title={`About ${site.brandName}`} text="Sample brand story: edit this page to share your own." />
      <div className="stack">{blocks.map((b) => <div className="card feature" key={b.t}><h2>{b.t}</h2><p>{b.d}</p></div>)}</div>
      <div className="center"><Button to="/shop">Explore the collection</Button></div>
    </Container></section>
  );
}

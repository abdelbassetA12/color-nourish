import { faq } from '../data/faq.js';
import { Container, SectionHeading, Accordion, Button } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function FAQ() {
  useSeo('FAQ', 'Answers about digital downloads, printing and usage.');
  const groups = [...new Set(faq.map((f) => f.group))];
  return (
    <section className="section"><Container narrow>
      <SectionHeading as="h1" title="Frequently asked questions" text="Sample answers: review them against your real store policies." />
      {groups.map((g) => <div key={g} className="faq-group"><h2>{g}</h2><Accordion items={faq.filter((f) => f.group === g)} /></div>)}
      <p className="center">Still need help? <Button to="/contact" variant="ghost">Contact us</Button></p>
    </Container></section>
  );
}

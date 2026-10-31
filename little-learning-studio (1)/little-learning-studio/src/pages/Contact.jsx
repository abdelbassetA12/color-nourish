import { site } from '../config/site.js';
import { Container, SectionHeading } from '../components/common/ui.jsx';
import { ContactForm } from '../components/forms/Forms.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function Contact() {
  useSeo('Contact', 'Get in touch with our team.');
  return (
    <section className="section"><Container narrow>
      <SectionHeading as="h1" title="Contact us" text={`Questions about a product or download? Email us at ${site.contactEmail}.`} />
      <ContactForm />
    </Container></section>
  );
}

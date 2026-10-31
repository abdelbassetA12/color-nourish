import { Container, SectionHeading } from '../components/common/ui.jsx';
import ProductBrowser from '../components/products/ProductBrowser.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function Shop() {
  useSeo('Shop All Printable Coloring Books & Worksheets', 'Browse every printable coloring book, worksheet and activity pack for kids and adults, including free downloads.');
  return (
    <section className="section"><Container>
      <SectionHeading as="h1" title="Shop all resources" text="Kids and adult printables, free downloads and paid PDF collections." />
      <ProductBrowser />
    </Container></section>
  );
}

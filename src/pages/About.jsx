
import { site } from '../config/site.js';
import {
  Container,
  SectionHeading,
  Button
} from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

// ColorNourish brand story
const blocks = [
  {
    t: 'Our Story',
    d: 'ColorNourish was created around a simple idea: creativity has no age limit. We believe coloring, learning and artistic exploration can bring inspiration and enjoyment to everyday life. Our goal is to make creative experiences accessible through thoughtfully designed printable resources.'
  },
  {
    t: 'Our Mission',
    d: 'Our mission is to inspire creativity, encourage learning and make coloring enjoyable for everyone. From playful educational activities for children to beautiful and intricate coloring designs for teens and adults, we aim to offer something for every creative mind.'
  },
  {
    t: 'Learning Through Creativity',
    d: 'We believe learning can be engaging, enjoyable and hands-on. Our educational printables include alphabet activities, letter tracing worksheets and creative learning resources designed to support children as they explore new skills at their own pace.'
  },
  {
    t: 'Creativity for Every Age',
    d: 'Creativity does not stop at childhood. Our collections also include mandala coloring books, geometric patterns and detailed illustrations for adults and anyone who enjoys artistic expression, relaxing coloring sessions and creative moments.'
  },
  {
    t: 'How We Create Our Products',
    d: 'Every collection is developed with attention to its purpose, visual style and printing experience. We aim to offer clear layouts, enjoyable illustrations and practical digital PDF files that customers can download and print at home.'
  },
  {
    t: 'For Families, Teachers and Creative Minds',
    d: 'Whether you are a parent looking for educational activities, a teacher searching for printable learning resources, or an adult who simply loves coloring, ColorNourish welcomes you. Explore our collections and discover the designs that inspire you.'
  },
];

export default function About() {
  useSeo(
    'About',
    `Discover the story behind ${site.brandName} — printable coloring books, educational activities and creative designs for all ages.`
  );

  return (
    <section className="section">
      <Container narrow>
        <SectionHeading
          as="h1"
          eyebrow="About ColorNourish"
          title={`Welcome to ${site.brandName}`}
          text="A creative space where learning, imagination and coloring come together. Discover printable experiences designed to inspire every age."
        />

        <div className="stack">
          {blocks.map((b) => (
            <div className="card feature" key={b.t}>
              <h2>{b.t}</h2>
              <p>{b.d}</p>
            </div>
          ))}
        </div>

        <div className="center">
          <Button to="/shop">
            Explore the Collection
          </Button>
        </div>
      </Container>
    </section>
  );
}
/*
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
*/
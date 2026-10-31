import { policies } from '../data/policies.js';
import { Container, SectionHeading } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

function Policy({ data }) {
  useSeo(data.title);
  return (
    <section className="section"><Container narrow>
      <SectionHeading as="h1" title={data.title} />
      <p className="notice notice--warn">Draft sample content. Review and adapt before publishing. No company address or jurisdiction is specified.</p>
      <div className="prose">{data.sections.map((s) => <div key={s.h}><h2>{s.h}</h2><p>{s.p}</p></div>)}</div>
    </Container></section>
  );
}
export const Privacy = () => <Policy data={policies.privacy} />;
export const Terms = () => <Policy data={policies.terms} />;
export const RefundPolicy = () => <Policy data={policies.refund} />;
export const DigitalDownloads = () => <Policy data={policies.downloads} />;

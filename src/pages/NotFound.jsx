import { Container, EmptyState, Button } from '../components/common/ui.jsx';
import { useSeo } from '../hooks/useSeo.js';

export default function NotFound({ title = 'Page not found', text = 'The page you are looking for does not exist.' }) {
  useSeo(title);
  return <section className="section"><Container><EmptyState emoji="🧭" title={title} text={text}><div className="btn-row btn-row--center"><Button to="/">Go home</Button><Button to="/shop" variant="ghost">Browse the shop</Button></div></EmptyState></Container></section>;
}

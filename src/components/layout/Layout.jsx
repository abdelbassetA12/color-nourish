import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { site } from '../../config/site.js';
import { useCart } from '../../context/CartContext.jsx';
import { Container, Toast } from '../common/ui.jsx';

const Logo = () => (
   <Link
    to="/"
    className="logo"
    aria-label={`${site.brandName} home`}
  >
    <img
      src={site.logoImage || '/images/brand/logo.jpeg'}
      alt={site.brandName}
      className="logo__image"
    />
    <span className="logo__text">{site.brandName}</span>
  </Link>
  
);

function Header() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const { count } = useCart();
  const loc = useLocation();
  const nav = useNavigate();
  useEffect(() => { setOpen(false); setSearching(false); }, [loc.pathname]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSearching(false); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const submit = (e) => { e.preventDefault(); nav(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : '/shop'); setQ(''); };
  return (
    <header className="header">
      <Container className="header__inner">
        <Logo />
        <nav id="main-nav" aria-label="Main" className={`nav ${open ? 'nav--open' : ''}`}>
          {site.nav.map((n) => <NavLink key={n.to} to={n.to} end={n.to === '/' || n.to.includes('?')} className={({ isActive }) => `nav__link ${(n.to.includes('?') ? loc.pathname === '/shop' && loc.search === '?status=free' : n.to === '/shop' ? isActive && loc.search !== '?status=free' : isActive) ? 'is-active' : ''}`}>{n.label}</NavLink>)}
        </nav>
        <div className="header__actions">
          <button type="button" className="icon-btn" aria-label="Search products" aria-expanded={searching} onClick={() => setSearching((s) => !s)}><Search size={20} aria-hidden="true" /></button>
          <Link to="/cart" className="icon-btn cart-link" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            <ShoppingBag size={20} aria-hidden="true" />{count > 0 && <span className="cart-link__count">{count}</span>}
          </Link>
          <button type="button" className="icon-btn menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>
      {searching && (
        <Container>
          <form className="header-search" role="search" onSubmit={submit}>
            <label htmlFor="hs" className="sr-only">Search products</label>
            <input id="hs" autoFocus type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search alphabet, coloring, tracing…" />
            <button className="btn btn--primary" type="submit">Search</button>
          </form>
        </Container>
      )}
    </header>
  );
}

function Footer() {
  const socials = site.social.filter((s) => /^https?:\/\//.test(s.url));
  return (
    <footer className="footer">
      <Container className="footer__grid">
        <div><Logo /><p className="footer__blurb">{site.footer.blurb}</p>
          {socials.length > 0 && <ul className="footer__social">{socials.map((s) => <li key={s.label}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>}
        </div>
        <nav aria-label="Shop links"><h2>Shop</h2><ul>{[{ to: '/kids', label: 'Kids collection' }, { to: '/adults', label: 'Adults collection' }, { to: '/shop?status=free', label: 'Free downloads' }, { to: '/shop', label: 'All products' }, { to: '/categories', label: 'Categories' }, { to: '/cart', label: 'Cart' }, { to: '/about', label: 'About' }].map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="Support"><h2>Support</h2><ul>{site.footer.support.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul></nav>
        <nav aria-label="Policies"><h2>Policies</h2><ul>{site.footer.policies.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}</ul></nav>
      </Container>
      <Container><p className="footer__copy">© {new Date().getFullYear()} {site.brandName}. {site.footer.copyright} Sample demo store: content is placeholder.</p></Container>
    </footer>
  );
}

export default function Layout() {
  const { toast } = useCart();
  return (
    <>
      <a href="#content" className="skip-link">Skip to content</a>
      <div className="announcement"><Container><p>{site.announcement}</p></Container></div>
      <Header />
      <main id="content" tabIndex="-1"><Outlet /></main>
      <Footer />
      <Toast message={toast} />
    </>
  );
}

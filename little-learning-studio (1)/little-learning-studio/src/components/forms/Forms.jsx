import { useState } from 'react';
import { site } from '../../config/site.js';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ error: '', done: false });
  const submit = (e) => {
    e.preventDefault();
    if (!emailOk(email.trim())) return setState({ error: 'Please enter a valid email address.', done: false });
    setEmail('');
    setState({ error: '', done: true });
  };
  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-invalid={!!state.error} aria-describedby="nl-msg" />
      <button className="btn btn--primary" type="submit">Notify me</button>
      <p id="nl-msg" className={state.error ? 'field-error' : 'form-note'} role={state.error ? 'alert' : 'status'}>
        {state.error || (state.done ? 'Demo only: no email was saved. Connect an email service to enable subscriptions.' : 'Frontend demo form. Nothing is stored or sent.')}
      </p>
    </form>
  );
}

export function ContactForm() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = 'Please enter your name.';
    if (!v.email.trim()) er.email = 'Please enter your email address.'; else if (!emailOk(v.email.trim())) er.email = 'Please enter a valid email address.';
    if (!v.subject.trim()) er.subject = 'Please enter a subject.';
    if (v.message.trim().length < 10) er.message = 'Please write a message of at least 10 characters.';
    setErrors(er); setDone(false);
    if (Object.keys(er).length) return;
    const body = `${v.message.trim()}\n\n— ${v.name.trim()} (${v.email.trim()})`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(v.subject.trim())}&body=${encodeURIComponent(body)}`;
    setDone(true);
  };
  const field = (id, label, Tag = 'input', extra = {}) => (
    <div className="field">
      <label htmlFor={`c-${id}`}>{label} <span aria-hidden="true">*</span></label>
      <Tag id={`c-${id}`} value={v[id]} onChange={set(id)} aria-required="true" aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `c-${id}-e` : undefined} {...extra} />
      {errors[id] && <p className="field-error" id={`c-${id}-e`} role="alert">{errors[id]}</p>}
    </div>
  );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      {field('name', 'Name', 'input', { type: 'text', autoComplete: 'name' })}
      {field('email', 'Email', 'input', { type: 'email', autoComplete: 'email' })}
      {field('subject', 'Subject', 'input', { type: 'text' })}
      {field('message', 'Message', 'textarea', { rows: 6 })}
      <button className="btn btn--primary" type="submit">Prepare email</button>
      <p className="form-note" role="status">
        {done ? 'Your email application should now open with your message ready. Nothing has been sent until you press send there. If nothing opened, write to us directly at the address shown.' : 'This site has no server. Submitting opens your email app with your message prefilled; it does not send anything by itself.'}
      </p>
    </form>
  );
}

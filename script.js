import ecosystemCopy from './src/ecosystem-copy.json';
import sourceEnglish from './src/copy-en.json';
import {french} from './src/localization';
import {navigateToFragment} from './src/scroll-position';

'use strict';

const english={...sourceEnglish};
Object.assign(english, ecosystemCopy.en);
Object.assign(french, ecosystemCopy.fr);
french.formRequired = 'Tous les champs sont obligatoires. Votre email sert uniquement à vous répondre.';

let currentLanguage = document.documentElement.lang;
function writeCopy(element, value) {
  const parts = String(value).split('\n');
  const fragment = document.createDocumentFragment();
  parts.forEach((part, index) => { if (index) fragment.append(document.createElement('br')); fragment.append(document.createTextNode(part)); });
  element.replaceChildren(fragment);
}
function setLanguage(language) {
  const nextLanguage = language === 'fr' ? 'fr' : 'en';
  const copyChanged = currentLanguage !== nextLanguage;
  currentLanguage = nextLanguage;
  const copy = currentLanguage === 'fr' ? french : english;
  if (document.documentElement.lang !== currentLanguage) document.documentElement.lang = currentLanguage;
  // The initial English document already contains this copy; keep its existing nodes.
  if (copyChanged) document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[element.dataset.i18n] ?? english[element.dataset.i18n];
    if (value !== undefined) writeCopy(element, value);
  });
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage)));
  const description = currentLanguage === 'fr'
    ? 'Product Owner à Paris. Shopify Plus, 5 marketplaces, automatisation n8n et produits IA. Expérience complémentaire en ingénierie d’affaires et qualité industrielle.'
    : 'Product Owner in Paris. Shopify Plus, 5 marketplaces, n8n automation and AI products. Supported by business-engineering and industrial-quality experience.';
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector).content = description;
  const title=currentLanguage==='fr'?'Saad Bayahia — Product Owner à Paris':'Saad Bayahia — Product Owner in Paris';document.title=title;for(const selector of ['meta[property="og:title"]','meta[name="twitter:title"]'])document.querySelector(selector).content=title;
  const coverAlt = currentLanguage === 'fr' ? 'Saad Bayahia — Product Owner à Paris' : 'Saad Bayahia — Product Owner in Paris';
  for (const selector of ['meta[property="og:image:alt"]', 'meta[name="twitter:image:alt"]']) document.querySelector(selector).content = coverAlt;
  document.querySelector('.desktop-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation principale' : 'Main navigation');
  document.querySelector('.mobile-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation mobile' : 'Mobile navigation');
  document.querySelector('.contact-arrow').setAttribute('aria-label', currentLanguage === 'fr' ? 'Réserver un appel avec Saad Bayahia' : 'Book a call with Saad Bayahia');
  document.querySelector('.creator-scroll').setAttribute('aria-label', currentLanguage === 'fr' ? 'Voir les travaux sélectionnés' : 'View selected work');
  updateMenuLabel();
  updateFormFeedback();
  form.querySelectorAll('[aria-invalid="true"]').forEach(field => validateField(field));
  try { localStorage.setItem('portfolio-language', currentLanguage); } catch {}
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {const link=document.querySelector('link[rel=alternate][hreflang="'+button.dataset.language+'"]');if(link&&button.dataset.language!==currentLanguage)location.assign(new URL(link.href).pathname+location.search+location.hash);}));

const menuButton = document.querySelector('.menu-toggle');
const mobileNavigation = document.querySelector('.mobile-nav');
function updateMenuLabel() {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-label', currentLanguage === 'fr' ? (open ? 'Fermer la navigation' : 'Ouvrir la navigation') : (open ? 'Close navigation' : 'Open navigation'));
}
function closeMenu(restoreFocus = false) {
  mobileNavigation.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  updateMenuLabel();
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown') return;
  event.preventDefault();
  mobileNavigation.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  updateMenuLabel();
  mobileNavigation.querySelector('a')?.focus();
});
document.addEventListener('focusin', event => {
  if (!mobileNavigation.hidden && !mobileNavigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileNavigation.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  updateMenuLabel();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNavigation.hidden) closeMenu(true); });
document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="#"]');
  if (anchor) {
    closeMenu();
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target||anchor.hasAttribute('download'))return;
    let target;try{target=document.getElementById(decodeURIComponent(anchor.getAttribute('href').slice(1)));}catch{return;}
    if(!target)return;
    event.preventDefault();
    if(location.hash!==anchor.hash)history.pushState(null,'',anchor.hash);
    navigateToFragment(target,matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('motion-paused')?'instant':'smooth');
  } else if (!mobileNavigation.hidden && !mobileNavigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width:761px)').addEventListener('change', event => { if (event.matches) closeMenu(mobileNavigation.contains(document.activeElement)); });

const form = document.querySelector('.contact-form');
const formButton = form.querySelector('button[type="submit"]');
const formButtonLabel = formButton.querySelector('[data-i18n="formSubmit"]');
const formStatus = form.querySelector('.form-status');
let formState = 'idle';
// Native required/type validation remains available when JavaScript is disabled.
form.noValidate = true;
function validateField(field) {
  const fr = currentLanguage === 'fr';
  const missing = !field.value.trim();
  const invalid = missing || !field.validity.valid;
  const message = missing ? (fr ? 'Veuillez renseigner ce champ.' : 'Please complete this field.')
    : field.type === 'email' ? (fr ? 'Saisissez une adresse email valide, par exemple nom@entreprise.fr.' : 'Enter a valid email address, for example name@company.com.')
    : (fr ? 'Veuillez vérifier ce champ.' : 'Please check this field.');
  const error = document.getElementById(field.id + '-error');
  error.hidden = !invalid;
  error.textContent = invalid ? message : '';
  if (invalid) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  return !invalid;
}
form.addEventListener('input', event => {
  if (formState === 'sending') return;
  if (event.target.hasAttribute('aria-invalid')) validateField(event.target);
  formState = 'idle'; updateFormFeedback();
});
form.addEventListener('focusout', event => {
  if (event.target.matches('input,textarea') && event.target.value) validateField(event.target);
});
function updateFormFeedback() {
  const fr = currentLanguage === 'fr';
  const messages = fr ? {
    invalid: 'Vérifiez les champs indiqués avant l’envoi.',
    sending: 'Envoi en cours…',
    success: 'Message envoyé. Merci, je vous réponds rapidement.',
    error: 'Envoi impossible. Réessayez ou contactez-moi directement par email.'
  } : {
    invalid: 'Check the highlighted fields before sending.',
    sending: 'Sending…',
    success: "Message sent. Thank you — I'll get back to you shortly.",
    error: 'Could not send. Please retry or email me directly.'
  };
  formButtonLabel.textContent = formState === 'sending' ? messages.sending : fr ? french.formSubmit : english.formSubmit;
  formStatus.textContent = messages[formState] || '';
  form.dataset.state = formState;
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (formState === 'sending') return;
  const invalid = [...form.querySelectorAll('input,textarea')].filter(field => !validateField(field));
  if (invalid.length) {
    formState = 'invalid'; updateFormFeedback(); invalid[0].focus(); return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  const data = new FormData(form);
  const fields = [...form.querySelectorAll('input, textarea')];
  fields.forEach(field => { field.readOnly = true; });
  formState = 'sending';
  formButton.disabled = true;
  form.setAttribute('aria-busy', 'true');
  updateFormFeedback();
  try {
    const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    formState = 'success';
    form.reset();
  } catch {
    formState = 'error';
  } finally {
    clearTimeout(timeout);
    fields.forEach(field => { field.readOnly = false; });
    formButton.disabled = false;
    form.setAttribute('aria-busy', 'false');
    updateFormFeedback();
  }
});

setLanguage(document.documentElement.lang);
document.getElementById('year').textContent = String(new Date().getFullYear());

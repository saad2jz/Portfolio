'use strict';

// English copy lives in the HTML so the landing page also works without JavaScript.
const english = {};
document.querySelectorAll('[data-i18n]').forEach(element => {
  english[element.dataset.i18n] = Array.from(element.childNodes, node => node.nodeName === 'BR' ? '\n' : node.textContent).join('');
});
const french = {
  leadScreenextension: 'Extension Chrome', leadGalleryNote: '7 vues produit · sélectionnez une image pour explorer', leadInsideTitle: 'Au cœur du produit', leadInsideText: 'Ces sept vues produit présentent le hub des agents IA, le copilote contextuel, la carte des prospects, la configuration des connecteurs, les campagnes multi-clients, le studio d’envoi d’emails et l’extension Chrome sur un profil LinkedIn.', leadScreencopilot: "Copilote contextuel", leadScreenmap: "Carte des prospects", leadScreenintegrations: "Configuration des connecteurs", leadScreencampaigns: "Campagnes de prospection", leadScreensending: "Studio d’envoi d’emails", galleryTitle: 'Images des projets', galleryOriginal: 'Ouvrir l’original', skip: 'Aller au contenu', navWork: 'Projets', navApproach: 'Méthode', navAbout: 'À propos', letsTalk: 'Discutons',
  heroEyebrow: 'PRODUCT OWNER / E-COMMERCE & B2B', location: 'PARIS, FRANCE',
  heroLine1: 'Produit × ingénierie', heroLine2: 'pour les métiers, les équipes', heroLine3: 'et les systèmes connectés',
  heroIntro: "Je transforme des problèmes métier complexes en produits qui fonctionnent. Je relie e-commerce, opérations B2B et équipes.",
  tickerStores: 'boutiques créées', tickerAdmin: 'de charge admin', tickerSkus: 'SKUs synchronisés',
  specialtyTitle: "Je relie stratégie produit, ingénierie et opérations pour construire des systèmes utiles aux utilisateurs.",
  specialtyIntro: "La rigueur d’un ingénieur. Le regard d’un Product Owner. Basé à Paris et ouvert aux postes produit en e-commerce, plateformes B2B et automatisation.",
  viewWork: 'Découvrir mes projets', resume: 'Voir mon CV', profileRole: 'Product Owner · Ingénieur', availability: 'Ouvert aux postes de Product Owner',
  heroBottom: 'STRATÉGIE → SYSTÈMES → DELIVERY', scroll: 'DÉFILER',
  proofStores: 'Boutiques Shopify créées et développées', proofAdmin: 'Charge admin B2B chez FFA', proofPartners: 'Intégrations marketplace', proofNote: 'COMPLEXITÉ EN ENTRÉE.\nCLARTÉ EN SORTIE.',
  workEyebrow: '01 / PROJETS SÉLECTIONNÉS', workTitle: 'Projets produit sélectionnés.\nDe la complexité à la clarté.',
  workIntro: "Des plateformes, des workflows et des idées où les décisions produit rencontrent l'ingénierie.",
  enlargeImage: 'Voir en grand', careerCaption: 'Page d’accès publique · espace privé.', ffaWorkflowCaption: 'Architecture illustrée du workflow de commande FFA.', ffaCaption: 'Photo produit officielle de la boutique FFA.', ffaTitle: 'FFA — Écosystème e-commerce',
  ffaIntro: "Pilotage de la refonte de ffaperitif.com : plateforme Shopify Plus, synchronisation ERP, cinq partenaires marketplace et workflow de fulfillment sans saisie manuelle.",
  ffaResult1: 'de charge administrative', ffaResult2: 'SKUs synchronisés', ffaResult3: 'saisie manuelle sur le flux principal',
  caseStudy: "Lire l'étude de cas", problem: 'Le problème', myRole: 'Mon rôle', delivery: 'La réalisation',
  ffaProblem: 'Une boutique WordPress vieillissante et des opérations fragmentées : commandes recopiées entre systèmes, étiquettes créées manuellement et factures saisies une à une.',
  ffaRole: 'Discovery produit, ownership de la roadmap et priorisation ; alignement des équipes techniques, des opérations et des partenaires marketplace, de la spécification à la mise en production.',
  ffaDelivery: 'Une refonte Shopify Plus B2B/B2C avec synchronisation Erplain, intégrations Mirakl et workflow n8n reliant commandes, expédition et facturation. Redirections et mappings canoniques préservés pendant la migration.',
  visitFFA: 'Visiter ffaperitif.com', leadCaption: 'Hub des agents IA · capture produit fournie par Saad.',
  visitLeadHunt: 'Visiter LeadHunt', leadCapture: "Écran de connexion public, capturé le 7 octobre 2026. Une démo distincte est nécessaire pour le produit authentifié.",
  leadTitle: 'LeadHunt', leadIntro: 'Une plateforme de prospection B2B multitenant reliant découverte de vraies entreprises, contacts vérifiés, pipeline et séquences de prospection.',
  projectDetails: 'Découvrir le projet', leadProblem: 'Données dispersées, qualification répétitive et séquences déconnectées rendent la prospection B2B lente et irrégulière.',
  leadDelivery: "Découverte d'entreprises par sources publiques, enrichissement traçable, vérification des contacts, pipeline Kanban et séquences de prospection. Next.js, TypeScript et PostgreSQL, avec application mobile Expo et extension Chrome.",
  carCaption: 'Visuel de présentation officiel issu du dépôt Cardiag.', carTitle: 'Cardiag',
  carIntro: "Une plateforme d'évaluation de véhicules avec des parcours distincts pour acheteurs, garagistes, vendeurs et propriétaires, des contrôles techniques au rapport structuré.",
  carProblem: "Acheteur, garagiste et propriétaire attendent des informations différentes sur le même véhicule. Une checklist générique ne couvre pas ces décisions.",
  carDelivery: "Fiches adaptées au persona, diagnostic guidé, photos et signatures, comparaison, budgets et rapports PDF. Un assistant atelier côté serveur accompagne le parcours de diagnostic.",
  dtcTitle: 'Commerce indépendant', dtcIntro: "Création et développement de boutiques Shopify avec responsabilité P&L complète, acquisition multicanale et équipe à distance aux Philippines.",
  cursorViewImage: 'VOIR L’IMAGE', toolsLabel: 'MES OUTILS CONNECTÉS',
  labEyebrow: 'PLUS / EXPLORATIONS PRODUIT', labTitle: 'Projets personnels & explorations', productNotes: 'Notes sur le produit',
  secoursCaption: 'Écran d’accueil · capture du prototype fournie par Saad.',
  secoursGalleryNote: '6 vues du prototype · sélectionnez une image pour explorer',
  secoursDemoStatus: 'Prototype de phase 1 · démonstration',
  secoursInsideTitle: 'Au cœur du prototype',
  secoursInsideText: 'Ces six captures présentent l’accueil, le choix du profil, une question de triage, un tutoriel, les contacts d’urgence et le parcours d’aide.',
  secoursScreenprofile: "Choix du profil",
  secoursScreentriage: "Question de triage",
  secoursScreentutorial: "Tutoriel du prototype",
  secoursScreencontacts: "Contacts d’urgence",
  secoursScreenhelp: "Parcours d’aide",
  secoursIntro: "Un prototype d'entraide de premiers secours explorant triage, consignes hors ligne, consentement et itinéraire du secouriste.",
  secoursNotes: "Prototype de phase 1 avec mode démo et tutoriels embarqués. Ce concept d'assistance ne remplace pas les services d'urgence. Déploiement et validation terrain restent des étapes distinctes.",
  rencontreIntro: 'Profils professionnels, annuaire et échange de portfolios par QR code pour le networking.',
  rencontreNotes: 'Un carnet professionnel avec profils publiés, notes privées et export des données. Le lancement se prépare autour de l’accessibilité et des droits sur les données ; les événements restent dans la roadmap V2.',
  careerType: 'PRODUCTIVITÉ / ADAPTATION OPEN SOURCE', careerIntro: 'Un espace privé de recherche professionnelle associant suivi des offres, brouillons de CV et pipeline de candidatures fondé sur des preuves.',
  careerNotes: 'Adaptation du projet open source career-ops avec suivi des pages carrière, studio de CV et accès réservé au propriétaire. Le workflow prépare les décisions sans envoyer automatiquement de candidature.', upstream: 'Projet open source original',
  copilotIntro: 'Un copilote Windows personnel reliant une interface Telegram privée aux outils locaux et à une inférence configurable.',
  copilotNotes: 'Texte, photo et voix se connectent aux actions locales sur les fichiers et le bureau. Le workflow inclut des tentatives de réparation bornées, des connecteurs configurables et un journal d’audit.',
  approachEyebrow: '02 / MA MÉTHODE', approachTitle: "La clarté avant le code.\nL'impact avant le volume.",
  approachIntro: "Une rigueur d'ingénieur appliquée au produit. Comprendre le système, assumer les arbitrages et livrer ce qui compte.",
  discoverTitle: 'Comprendre', discoverText: 'Partir des utilisateurs, des contraintes métier et de la cause racine. Cadrer le problème avant de cadrer la solution.',
  prioritiseTitle: 'Prioriser', prioritiseText: "Équilibrer impact métier et effort de réalisation. Rendre les arbitrages explicites et garder une roadmap ciblée.",
  deliverTitle: 'Livrer', deliverText: 'Relier équipes techniques, opérations et partenaires. Transformer une spécification en produit vivant, avec la qualité intégrée dès le départ.',
  measureTitle: 'Mesurer', measureText: 'Suivre les résultats, apprendre de ce qui a été livré et intégrer ces preuves à la prochaine décision produit.',
  aboutEyebrow: '03 / LA PERSONNE DERRIÈRE LE PRODUIT', aboutTitle: "La profondeur d'un ingénieur.\nLe regard d'un\nProduct Owner.",
  linkedin: 'Échanger sur LinkedIn', aboutIntro: "Mon parcours produit a commencé par l'ingénierie — et par la conviction que chaque décision doit résister à la réalité du terrain.",
  aboutText: "Six années dans des environnements industriels exigeants, de la qualité automobile chez Schaeffler aux dispositifs médicaux chez MASCIR, ont forgé mon approche des systèmes, des risques et des causes racines. J'applique aujourd'hui cette discipline aux plateformes e-commerce, aux opérations B2B et à la delivery produit.",
  aboutPersonal: "En dehors de l'écran : formation au pilotage PPL, sécurité en rallye et mécanique automobile. D'autres systèmes, la même curiosité.",
  background: 'Formation & diplômes', experienceLabel: 'Expérience', present: 'Présent', experienceFFA: 'Product Owner · E-Commerce & B2B',
  experienceQuality: 'Qualité & optimisation des processus', experienceQualityDetail: 'Amélioration des processus interservices', experienceQA: 'QA & support produit',
  experienceQADetail: 'Discovery, causes racines et validation des releases', experienceMascir: 'Ingénieur QHSE · Dispositifs médicaux', experienceSchaeffler: 'Ingénieur Qualité · Automobile',
  educationLabel: 'Formation', educationKedge: "MSc en Ingénierie d'Affaires · 2026", educationQuality: 'Master en Management de la Qualité et de la Performance', educationEngineering: 'Double diplôme de Génie Informatique', educationISEN: 'Parcours Business & Data Analyst',
  contactEyebrow: '04 / PRENONS CONTACT', contactLocation: 'PARIS / FRANCE & REMOTE', contactTitle: 'Un bon produit commence\npar une conversation.',
  bookCall: 'Réserver un appel de 20 minutes', writeMessage: 'Ou laisser un message ici', formName: 'Votre nom', formEmail: 'Adresse email', formMessage: 'Parlez-moi de votre projet ou de votre offre', formSubmit: 'Envoyer le message', backTop: 'Retour en haut ↑'
};

let currentLanguage = 'en';
function writeCopy(element, value) {
  const parts = String(value).split('\n');
  const fragment = document.createDocumentFragment();
  parts.forEach((part, index) => { if (index) fragment.append(document.createElement('br')); fragment.append(document.createTextNode(part)); });
  element.replaceChildren(fragment);
}
function setLanguage(language) {
  currentLanguage = language === 'fr' ? 'fr' : 'en';
  const copy = currentLanguage === 'fr' ? french : english;
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const value = copy[element.dataset.i18n] ?? english[element.dataset.i18n];
    if (value !== undefined) writeCopy(element, value);
  });
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage)));
  const description = currentLanguage === 'fr'
    ? 'Saad Bayahia, Product Owner à Paris. Discovery produit, Shopify Plus, plateformes B2B et automatisation : des problèmes complexes aux résultats mesurables.'
    : 'Saad Bayahia, Product Owner in Paris. Product discovery, Shopify Plus, B2B platforms and automation — from complex problems to measurable outcomes.';
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector).content = description;
  document.querySelector('.desktop-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation principale' : 'Main navigation');
  document.querySelector('.mobile-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation mobile' : 'Mobile navigation');
  document.querySelector('.contact-arrow').setAttribute('aria-label', currentLanguage === 'fr' ? 'Envoyer un email à Saad Bayahia' : 'Email Saad Bayahia');
  updateMenuLabel();
  try { localStorage.setItem('portfolio-language', currentLanguage); } catch {}
}
document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));

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
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  } else if (!mobileNavigation.hidden && !mobileNavigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width:761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const form = document.querySelector('.contact-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const buttonLabel = button.querySelector('[data-i18n="formSubmit"]');
  const status = form.querySelector('.form-status');
  if (button.disabled) return;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  button.disabled = true;
  form.setAttribute('aria-busy', 'true');
  buttonLabel.textContent = currentLanguage === 'fr' ? 'Envoi en cours…' : 'Sending…';
  status.textContent = '';
  try {
    const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, signal: controller.signal });
    if (!response.ok) throw new Error('Submission failed');
    status.textContent = currentLanguage === 'fr' ? 'Message envoyé. Merci, je vous réponds rapidement.' : "Message sent. Thank you — I'll get back to you shortly.";
    form.reset();
  } catch {
    status.textContent = currentLanguage === 'fr' ? 'Envoi impossible. Réessayez ou contactez-moi directement par email.' : 'Could not send. Please retry or email me directly.';
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    form.setAttribute('aria-busy', 'false');
    buttonLabel.textContent = currentLanguage === 'fr' ? french.formSubmit : english.formSubmit;
  }
});

let preferredLanguage = 'en';
try { preferredLanguage = localStorage.getItem('portfolio-language') || 'en'; } catch {}
setLanguage(preferredLanguage);
document.getElementById('year').textContent = String(new Date().getFullYear());

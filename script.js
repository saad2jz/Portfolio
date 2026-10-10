import ecosystemCopy from './src/ecosystem-copy.json';

'use strict';

// English copy lives in the HTML so the landing page also works without JavaScript.
const english = {};
document.querySelectorAll('[data-i18n]').forEach(element => {
  english[element.dataset.i18n] = Array.from(element.childNodes, node => node.nodeName === 'BR' ? '\n' : node.textContent).join('');
});
const french = {
  projectConcept:'Voir le concept',
  moreCaptures:'Autres images du projet', liveProject:'Voir le site', projectRepository:'Dépôt GitHub',
  carWorkshopCaption: "Diagnostic en atelier — illustration de présentation",
  carBodyworkCaption: "Inspection de carrosserie — illustration de présentation annotée",
  carArtworkNote: "Visuels de présentation issus du dépôt Cardiag.",
  reelHint:'DÉFILEZ POUR EXPLORER', careerMobileCaption:'Page d’accès publique sur mobile · espace privé.',
  ffaInsideTitle: 'À travers l’écosystème commerce', ffaInsideText: 'Ces huit captures fournies montrent la boutique Shopify et son assistant, les opérations ERP et B2B Erplain, la gestion des marketplaces, ainsi que la boîte de réception et une conversation du support IA.',
  ffaScreendashboard: "Tableau de bord Erplain", ffaScreenb2b: "Commandes B2B Erplain", ffaScreenastore: "Tableau de bord Astore / Mirakl", ffaScreenkvist: "Catalogue marketplace Kvist", ffaScreeninbox: "Boîte de réception du support IA", ffaScreenconversation: "Conversation du support IA",
  ffaGalleryNote: '8 captures produit fournies · sélectionnez une image pour explorer', ffaScreenstorefront: 'Boutique Shopify & assistant IA', ffaScreenankorstore: 'Page marque Ankorstore',
  leadScreenextension: 'Extension Chrome', leadGalleryNote: '7 vues produit · sélectionnez une image pour explorer', leadInsideTitle: 'Au cœur du produit', leadInsideText: 'Ces sept vues produit présentent le hub des agents IA, le copilote contextuel, la carte des prospects, la configuration des connecteurs, les campagnes multi-clients, le studio d’envoi d’emails et l’extension Chrome sur un profil LinkedIn.', leadScreencopilot: "Copilote contextuel", leadScreenmap: "Carte des prospects", leadScreenintegrations: "Configuration des connecteurs", leadScreencampaigns: "Campagnes de prospection", leadScreensending: "Studio d’envoi d’emails", galleryTitle: 'Images des projets', galleryOriginal: 'Ouvrir l’original', skip: 'Aller au contenu', navWork: 'Projets', navApproach: 'Méthode', navAbout: 'À propos', letsTalk: 'Discutons',
  heroEyebrow: 'PRODUCT OWNER / E-COMMERCE & B2B', location: 'PARIS, FRANCE',
  heroLine1: 'Produit × ingénierie', heroLine2: 'pour les métiers, les équipes', heroLine3: 'et les systèmes connectés',
  heroIntro: "Je transforme des problèmes métier complexes en produits qui fonctionnent. Je relie e-commerce, opérations B2B et équipes.",
  tickerStores: 'boutiques créées', tickerAdmin: 'de charge admin', tickerSkus: 'SKUs synchronisés',
  specialtyTitle: "Product Owner. Ingénieur. Créateur de systèmes.",
  specialtyIntro: "Basé à Paris. Disponible pour des postes produit en e-commerce, B2B et automatisation.",
  viewWork: 'Découvrir mes projets', resume: 'Voir mon CV', profileRole: 'Product Owner · Ingénieur', availability: 'Ouvert aux postes de Product Owner',
  heroBottom: 'STRATÉGIE → SYSTÈMES → DELIVERY', scroll: 'DÉFILER',
  proofStores: 'Boutiques Shopify créées et développées', proofAdmin: 'Charge admin B2B chez FFA', proofPartners: 'Intégrations marketplace', proofNote: 'COMPLEXITÉ EN ENTRÉE.\nCLARTÉ EN SORTIE.',
  indexCommerce: 'Commerce & opérations ↗', indexProspecting: 'Prospection & IA ↗', indexInspection: 'Inspection automobile ↗', indexMutualAid: 'Prototype d’entraide ↗',
  workEyebrow: '01 / PROJETS SÉLECTIONNÉS', workTitle: 'Projets sélectionnés',
  workIntro: "Trois projets, du besoin métier au produit en usage.",
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

// Content adapted from the live portfolio on 8 October 2026.
Object.assign(french, {
  "ffaWholesaleText": "Comptes entreprises, tarifs par client, commandes provisoires et paiements différés. Mapping des stocks en temps réel sur 367 références, avec commandes récurrentes et coffrets saisonniers.",
  "ffaWholesaleTitle": "Grossistes & abonnements",
  "ffaChannelsText": "AstoreShop (Accor), Nature & Découvertes, Veepee, Ankorstore et Kviste : onboarding catalogue, taxonomie produit, mapping des variantes, règles tarifaires et contrôles qualité propres à chaque canal.",
  "ffaChannelsTitle": "Cinq marketplaces connectées",
  "ffaSupportText": "Un chatbot IA adapté d’une application open source s’appuie sur les questions clients et oriente les conversations par intention et criticité. Kwanko complète l’acquisition avec tracking d’affiliation, commissions et activation des éditeurs.",
  "ffaSupportTitle": "Support client & acquisition",
  "ffaSecurityText": "Un sélecteur de points relais Google Maps / Places relie le choix au checkout aux étiquettes Colissimo. Le tagging analytics côté serveur, le mapping des champs API et la validation des données fiabilisent les flux entre systèmes.",
  "ffaSecurityTitle": "Livraison, mesure & sécurité",
  "ffaScopeTitle": "Les fonctionnalités de la plateforme",
  "leadArchitectureText": "Le parcours de prospection associe sources publiques d’entreprises, Google Maps, Apollo et extraction LinkedIn via Apify. Le scoring firmographique qualifie la taille de l’entreprise, le secteur et le rôle du décideur avant les séquences Brevo orchestrées par n8n et le suivi des interactions dans HubSpot.",
  "leadArchitectureTitle": "Le parcours acquisition & CRM",
  "carInspectionText": "Le portfolio présente une inspection à 33 points répartis en sept sections techniques, un scoring pondéré distinguant risques mécaniques et défauts esthétiques, et des rapports PDF illustrés. La PWA vise les inspections terrain hors ligne ; l’assistant de diagnostic s’appuie sur un service en ligne.",
  "carInspectionTitle": "Le parcours d’inspection terrain",
  "dtcOperationsText": "Sourcing et négociation fournisseurs, pilotage des marges et du budget publicitaire, vitrines Liquid sur mesure, tunnels de conversion et optimisation du checkout. L’acquisition combine Google Ads, Meta Ads et SEO avec Semrush.",
  "dtcTeamText": "Une équipe à distance aux Philippines fonctionne avec des workflows asynchrones, tableaux de bord KPI et production de contenu. Abonnements, commandes récurrentes et coffrets saisonniers soutiennent la fidélisation et le réachat.",
  "dtcScopeTitle": "Du sourcing au réachat",
  "ansysType": "B2B / PROPOSITION DE HACKATHON",
  "ansysTitle": "Ansys — Simulation augmentée par l’IA",
  "ansysAward": "1er prix · Projet innovant",
  "ansysIntro": "Une proposition B2B pour les cas d’usage Dassault Aviation : accélérer les itérations de simulation tout en conservant les solveurs physiques certifiés, la validation experte et la maîtrise des données sur site.",
  "ansysOffers": "AeroSignal AI : intégration électromagnétique des antennes. AeroShape AI : préfiltrage des géométries aérodynamiques. Aero Twin Ops : maintenance et modèles d’ordre réduit. Sovereign Secure AI : déploiement sur site et stratégie commerciale par persona.",
  "ansysValidation": "Les cas Rafale et Falcon cadrent la proposition. Les prédictions incertaines repassent par les solveurs rigoureux et les experts ; il s’agit d’un concept commercial de hackathon.",
  "ansysDetailsTitle": "Quatre offres, un principe de validation",
  "debarraText": "Une place de marché de récupération d’objets et de vide-maison associant calcul des distances Haversine et chat temps réel Socket.IO.",
  "debarraTitle": "Debara",
  "dtcActivityDetails": "Détails de l’activité",
  "alxText": "Automatisation shell, administration Linux, réseaux, reverse proxies Nginx, conteneurs et workflows de déploiement.",
  "alxRepo": "Voir le dépôt ALX",
  "alxTitle": "ALX — Ingénierie système & DevOps",
  "academicText": "Traçabilité des contrôles automobiles sur Polygon ; application Android de signalement QHSE ; simulation de flux logistiques ; suivi de température ESP32 avec Grafana / Node-RED ; audits de sécurité réseau ; moteur de recommandation par filtrage collaboratif en Python.",
  "academicTitle": "Prototypes & études académiques",
  "moreProjectsTitle": "Autres réalisations numériques & ingénierie",
  "skillsProductText": "Entretiens de discovery, pilotage de roadmap, priorisation RICE / MoSCoW, user stories, critères d’acceptation, rituels agiles et KPI de résultat.",
  "skillsProductTitle": "Produit & delivery",
  "skillsCommerceText": "Shopify Plus B2B, thèmes Liquid sur mesure, flux produits Mirakl, mapping des stocks Erplain, logistique Colissimo et facturation Pennylane.",
  "skillsCommerceTitle": "Commerce & opérations",
  "skillsCodeText": "n8n, API REST, webhooks, TypeScript, Node.js, Python et Git. Modèles relationnels, requêtes SQL et procédures stockées MySQL / PostgreSQL.",
  "skillsCodeTitle": "Automatisation & données",
  "skillsGrowthText": "Workflows HubSpot, Brevo et Sidely ; scoring firmographique, Google / Meta Ads, SEO Semrush et optimisation des médias Cloudinary.",
  "skillsGrowthTitle": "CRM & acquisition",
  "skillsQualityText": "AMDEC / FMEA, 8D, RETEX, Lean 5S et DMAIC ; tests fonctionnels et validation des releases. Pratique des référentiels ISO 9001 / 14001 / 27001 / 17025 et IATF 16949.",
  "skillsQualityTitle": "Qualité & risques",
  "skillsAIText": "Bases de connaissances issues des questions clients, classification d’intentions, enrichissement et scoring de leads, aide au diagnostic et workflows Claude Code.",
  "skillsAITitle": "IA appliquée",
  "skillsTitle": "Compétences & stack technique",
  "missionFFAText": "Discovery de la plateforme et pilotage du backlog ; delivery transverse de la refonte Shopify Plus, de l’intégration ERP, des marketplaces et de l’automatisation logistique.",
  "missionFFATitle": "FFA — Pilotage produit",
  "missionSITText": "Boucles de RETEX et analyse des causes racines pour transformer les irritants opérationnels en exigences d’amélioration ; cartographie des processus et méthodes Lean pour réduire gaspillage et délais.",
  "missionSITTitle": "SIT Group — Amélioration des processus",
  "missionWebmediaText": "Analyse des tickets techniques, diagnostic de bugs systémiques, plans de tests fonctionnels et validation des releases, à l’interface entre support client et développement.",
  "missionWebmediaTitle": "Webmedia Solutions — Qualité logicielle",
  "missionMascirText": "Cartographie des risques, audits QHSE des sous-traitants, suivi de la sécurité chimique et amélioration des processus interservices.",
  "missionMascirTitle": "MASCIR — Qualité des dispositifs médicaux",
  "missionSchaefflerText": "Analyse des anomalies de production par AMDEC et workflows préventifs ; outil d’archivage numérique pour améliorer traçabilité et recherche documentaire.",
  "missionSchaefflerTitle": "Schaeffler — Qualité automobile",
  "missionAlliancesText": "Évaluation de la sécurité organisationnelle et technique, analyse d’écarts ISO 27001 et roadmap progressive de remédiation.",
  "missionAlliancesTitle": "ALLIANCES — Audit du système d’information",
  "missionTGRText": "Portail interne pour les collaborateurs, plans de tests fonctionnels et environnements de recette, avec procédures stockées SQL pour les traitements backend.",
  "missionTGRTitle": "TGR — Développement web & QA",
  "missionsTitle": "Missions clés & premières expériences",
  "certShopify": "Shopify Partner & Product Certification",
  "certCisco": "Cisco Networking Academy — Introduction to Cybersecurity",
  "certISO": "ISO 27001 — Sensibilisation Lead Implementer / Auditor",
  "certHubspot": "HubSpot Academy — Sales Hub, Inbound Sales & Frictionless Sales",
  "certLean": "Lean Six Sigma Green Belt — 5S & DMAIC",
  "certAnthropic": "Anthropic AI Foundations — Claude Code Workflows",
  "certificationsTitle": "Certifications & formation continue",
  "languagesTitle": "Langues & mobilité",
  "languageFrench": "Français",
  "languageFrenchLevel": "Langue maternelle / bilingue",
  "languageEnglish": "Anglais",
  "languageEnglishLevel": "Professionnel · C1 / C2",
  "languageArabic": "Arabe",
  "languageArabicLevel": "Langue maternelle / bilingue",
  "languageSpanish": "Espagnol",
  "languageSpanishLevel": "Élémentaire · A2",
  "mobilityText": "Basé à Paris · Hybride, remote & mobilité · Permis B, véhiculé.",
  "interestFlyingText": "Formation PPL : navigation, météorologie, check-lists et décisions sous contrainte de temps.",
  "interestFlyingTitle": "Formation de pilote privé",
  "interestRallyText": "Missions de commissaire de sécurité : communication radio, gestion des incidents et respect des protocoles d’épreuve.",
  "interestRallyTitle": "Sécurité en rallye",
  "interestAutoText": "Restauration et préparation de moteurs, des blocs VAG à une Mercedes CL600 V12, avec étude de la télémétrie et de la dynamique du véhicule en simracing.",
  "interestAutoTitle": "Mécanique automobile & simulation",
  "interestTravelText": "Voyages en autonomie à travers 36 pays : préparation d’itinéraires, logistique, adaptation et résolution d’imprévus sur le terrain.",
  "interestTravelTitle": "Expéditions terrestres",
  "interestsTitle": "Passions & expériences de terrain",
  "availability": "Disponible immédiatement · Postes produit",
  "specialtyIntro": "Basé à Paris. Disponible pour des postes produit en e-commerce, B2B et automatisation.",
  "aboutText": "La qualité automobile chez Schaeffler, les dispositifs médicaux à MASCIR et les audits de sécurité chez ALLIANCES ont forgé mon approche des systèmes, des risques et des causes racines. J’applique aujourd’hui cette discipline à l’e-commerce, aux plateformes B2B et à la delivery transverse.",
  "educationKedge": "MSc Ingénierie d’Affaires & Master en Développement Commercial · 2026",
  "educationISEN": "Parcours Génie Informatique · Business & Data Analyst · Blockchain, IA & Data Engineering",
  "discoverText": "Interviewer les utilisateurs et cartographier les flux réels et les contraintes avant de rédiger une user story. Diagnostiquer la cause racine avant de cadrer une solution.",
  "prioritiseText": "Prioriser l’impact métier et la valeur utilisateur avec RICE / MoSCoW. Rendre les arbitrages explicites en équilibrant valeur et effort de réalisation.",
  "deliverText": "Aligner équipes techniques, opérations et partenaires avec des spécifications claires, critères d’acceptation, sprints et rituels agiles.",
  "measureText": "Définir les KPI de succès dès le cadrage. Suivre adoption et usages, apprendre des releases et intégrer ces preuves à la prochaine décision de roadmap.",
  "contactAvailability": "Disponible immédiatement pour un CDI produit · Paris, hybride, remote ou mobilité."
});

Object.assign(english, ecosystemCopy.en);
Object.assign(french, ecosystemCopy.fr);

let currentLanguage = 'en';
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
    ? 'Saad Bayahia, Product Owner, Business Engineer et Quality Engineer à Paris. Prospection B2B, vente complexe, négociation, produits numériques et amélioration continue.'
    : 'Saad Bayahia, Product Owner, Business Engineer and Quality Engineer in Paris. B2B prospecting, complex sales, negotiation, digital products and continuous improvement.';
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector).content = description;
  const coverAlt = currentLanguage === 'fr' ? 'Saad Bayahia — Product Owner, E-Commerce & B2B. Portfolio à Paris.' : 'Saad Bayahia — Product Owner, E-Commerce & B2B. Portfolio in Paris.';
  for (const selector of ['meta[property="og:image:alt"]', 'meta[name="twitter:image:alt"]']) document.querySelector(selector).content = coverAlt;
  document.querySelector('.desktop-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation principale' : 'Main navigation');
  document.querySelector('.mobile-nav').setAttribute('aria-label', currentLanguage === 'fr' ? 'Navigation mobile' : 'Mobile navigation');
  document.querySelector('.contact-arrow').setAttribute('aria-label', currentLanguage === 'fr' ? 'Envoyer un email à Saad Bayahia' : 'Email Saad Bayahia');
  document.querySelector('.wordmark').setAttribute('aria-label', currentLanguage === 'fr' ? 'S.B — Saad Bayahia, accueil' : 'S.B — Saad Bayahia, home');
  document.querySelector('.hero-profile').setAttribute('aria-label', currentLanguage === 'fr' ? 'À propos de Saad Bayahia' : 'About Saad Bayahia');
  updateMenuLabel();
  updateFormFeedback();
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
const formButton = form.querySelector('button[type="submit"]');
const formButtonLabel = formButton.querySelector('[data-i18n="formSubmit"]');
const formStatus = form.querySelector('.form-status');
let formState = 'idle';
form.addEventListener('input', () => { if (formState !== 'sending') { formState = 'idle'; updateFormFeedback(); } });
function updateFormFeedback() {
  const fr = currentLanguage === 'fr';
  const messages = fr ? {
    sending: 'Envoi en cours…',
    success: 'Message envoyé. Merci, je vous réponds rapidement.',
    error: 'Envoi impossible. Réessayez ou contactez-moi directement par email.'
  } : {
    sending: 'Sending…',
    success: "Message sent. Thank you — I'll get back to you shortly.",
    error: 'Could not send. Please retry or email me directly.'
  };
  formButtonLabel.textContent = formState === 'sending' ? messages.sending : fr ? french.formSubmit : english.formSubmit;
  formStatus.textContent = messages[formState] || '';
}
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (formState === 'sending' || !form.reportValidity()) return;
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

let preferredLanguage = 'en';
try { preferredLanguage = localStorage.getItem('portfolio-language') || 'en'; } catch {}
setLanguage(preferredLanguage);
document.getElementById('year').textContent = String(new Date().getFullYear());

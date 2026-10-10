import React from 'react';
import {ArrowUpRight, Blocks, Code2, Handshake, ShoppingBag, Sparkles, ShieldCheck} from 'lucide-react';
import {Reveal} from './ExtensionSections';

type Copy = {en:string;fr:string};
const copy=(en:string,fr:string):Copy=>({en,fr});
const text=(value:Copy,fr:boolean)=>fr?value.fr:value.en;
const domains=[
 {
  id:'product',icon:Blocks,label:copy('Product','Produit'),title:copy('Product & delivery','Produit & delivery'),
  summary:copy('Turn a user need into a release the team can deliver and measure.','Transformer un besoin utilisateur en une livraison que l’équipe peut réaliser et mesurer.'),
  capabilities:[copy('Discovery interviews, workflow mapping and stakeholder alignment.','Entretiens de discovery, cartographie des flux et alignement des parties prenantes.'),copy('Roadmaps, prioritised backlogs, user stories and acceptance criteria.','Roadmaps, backlogs priorisés, user stories et critères d’acceptation.'),copy('Agile rituals, functional validation, adoption and outcome KPIs.','Rituels agiles, validation fonctionnelle, adoption et indicateurs de résultat.')],
  tools:[{name:'Trello',src:'assets/hero-tools/trello.svg'},{name:'Microsoft Office',src:'assets/hero-tools/microsoftoffice.svg'},{name:'Power BI',src:'assets/logos/powerbi.svg'}],
  methods:['RICE','MoSCoW','Agile'],proof:copy('Product ownership at FFA','Pilotage produit chez FFA'),href:'#experience-ffa-title'
 },
 {
  id:'business',icon:Handshake,label:copy('Business','Business'),title:copy('Business & acquisition','Business & acquisition'),
  summary:copy('Connect customer needs, a clear value proposition and commercial execution.','Relier besoins clients, proposition de valeur et exécution commerciale.'),
  capabilities:[copy('B2B prospecting, needs qualification and firmographic lead scoring.','Prospection B2B, qualification des besoins et scoring firmographique.'),copy('Complex sales, negotiation and coordination of decision-makers.','Vente complexe, négociation et coordination des décideurs.'),copy('CRM workflows, email campaigns, SEO and paid acquisition.','Parcours CRM, campagnes e-mail, SEO et acquisition payante.')],
  tools:[{name:'HubSpot',src:'assets/toolkit/hubspot.svg',wide:true},{name:'Brevo',src:'assets/hero-tools/brevo.svg'},{name:'Google Ads',src:'assets/hero-tools/googleads.svg'},{name:'Meta Ads',src:'assets/hero-tools/meta.svg'},{name:'Semrush',src:'assets/hero-tools/semrush.svg'}],
  methods:['CRM','B2B','SEO / SEA'],proof:copy('LeadHunt · prospecting copilot','LeadHunt · copilote de prospection'),href:'#leadhunt-title'
 },
 {
  id:'commerce',icon:ShoppingBag,label:copy('Commerce','Commerce'),title:copy('Commerce & operations','Commerce & opérations'),
  summary:copy('Connect the storefront to the systems that keep the business running.','Connecter la boutique aux systèmes qui font fonctionner l’activité.'),
  capabilities:[copy('Shopify Plus, B2B journeys and custom Liquid development.','Shopify Plus, parcours B2B et développements Liquid sur mesure.'),copy('Marketplace catalogues and feeds; ERP stock and order synchronisation.','Catalogues et flux marketplace ; synchronisation ERP des stocks et commandes.'),copy('Logistics, fulfilment and invoicing integrations.','Intégrations logistiques, expéditions et facturation.')],
  tools:[{name:'Shopify',src:'assets/toolkit/shopify.svg',wide:true},{name:'Mirakl',src:'assets/toolkit/mirakl.svg',wide:true},{name:'Erplain',src:'assets/toolkit/erplain.webp',wide:true},{name:'Colissimo',src:'assets/toolkit/colissimo.svg',wide:true},{name:'Pennylane',src:'assets/toolkit/pennylane.webp',wide:true}],
  methods:['Shopify Plus','Liquid','ERP'],proof:copy('FFA · connected commerce','FFA · commerce connecté'),href:'#ffa-title'
 },
 {
  id:'development',icon:Code2,label:copy('Development','Développement'),title:copy('Development & data','Développement & data'),
  summary:copy('Build the interface, connect the APIs and structure the data behind it.','Construire l’interface, connecter les API et structurer les données qui l’alimentent.'),
  capabilities:[copy('Web interfaces with HTML, CSS, JavaScript and TypeScript.','Interfaces web en HTML, CSS, JavaScript et TypeScript.'),copy('Node.js and Python for application logic, scripts and integrations.','Node.js et Python pour la logique applicative, les scripts et les intégrations.'),copy('Relational modelling, SQL queries and stored procedures in MySQL / PostgreSQL.','Modélisation relationnelle, requêtes SQL et procédures stockées MySQL / PostgreSQL.')],
  tools:[{name:'JavaScript',src:'assets/hero-tools/javascript.svg'},{name:'Python',src:'assets/hero-tools/python.svg'},{name:'MySQL',src:'assets/hero-tools/mysql.svg'},{name:'GitHub',src:'assets/toolkit/github.svg',wide:true},{name:'HTML / CSS',src:'assets/hero-tools/html5.svg'}],
  methods:['TypeScript','Node.js','SQL','Git'],proof:copy('CarDiag · application & vehicle data','CarDiag · application & données véhicule'),href:'#cardiag-title'
 },
 {
  id:'automation',icon:Sparkles,label:copy('AI & automation','IA & automatisation'),title:copy('AI & automation','IA & automatisation'),
  summary:copy('Embed conversational assistance and automation into real workflows.','Inscrire l’assistance conversationnelle et l’automatisation dans les usages réels.'),
  capabilities:[copy('Conversational agents powered by the Gemini API: prospecting and diagnostic assistance.','Agents conversationnels via l’API Gemini : prospection et aide au diagnostic.'),copy('n8n workflows, REST APIs and webhooks connecting business tools.','Workflows n8n, API REST et webhooks reliant les outils métier.'),copy('Knowledge bases, intent classification and lead enrichment.','Bases de connaissances, classification des intentions et enrichissement de contacts.')],
  tools:[{name:'Gemini API',src:'assets/ecosystems/gemini.webp'},{name:'n8n',src:'assets/toolkit/n8n.svg',wide:true},{name:'Apify',src:'assets/hero-tools/apify.svg',wide:true}],
  methods:['REST API','Webhooks','Workflows'],proof:copy('LeadHunt · conversational control','LeadHunt · pilotage conversationnel'),href:'#leadhunt-title'
 },
 {
  id:'quality',icon:ShieldCheck,label:copy('Quality','Qualité'),title:copy('Quality & risk','Qualité & risques'),
  summary:copy('Investigate root causes and make improvement traceable, from industry to digital products.','Chercher les causes racines et rendre l’amélioration traçable, de l’industrie aux produits numériques.'),
  capabilities:[copy('Risk analysis, FMEA, root-cause investigation and corrective actions.','Analyse des risques, AMDEC, recherche des causes racines et actions correctives.'),copy('8D, PDCA, lessons learned, Lean 5S and DMAIC.','8D, PDCA, RETEX, Lean 5S et DMAIC.'),copy('Quality frameworks: ISO 9001, 14001, 27001, 17025 and IATF 16949.','Référentiels qualité : ISO 9001, 14001, 27001, 17025 et IATF 16949.')],
  tools:[],methods:['AMDEC / FMEA','8D','PDCA','RETEX','Lean 5S','DMAIC'],proof:copy('Explore my industrial experience','Voir mes expériences industrielles'),href:'#professional-experience'
 }
];

export function SkillsSection({fr,stopped}:{fr:boolean;stopped:boolean}){
 return <section id="skills" className="extended-section skills-section" aria-labelledby="skills-title" data-stopped={stopped}>
  <div className="extension-heading skills-heading"><p className="creator-eyebrow">{fr?'OUTILS / MÉTHODES / TECHNOLOGIES':'TOOLS / METHODS / TECHNOLOGIES'}</p><Reveal stopped={stopped}><h2 id="skills-title" className="hero-heading extension-title">{fr?'Compétences':'Skills & stack'}</h2></Reveal><div className="skills-introduction"><p className="extension-lead">{fr?'La vision métier. Les outils pour la concrétiser.':'Business perspective. The tools to bring it to life.'}</p><p>{fr?'Six domaines complémentaires, du cadrage produit à la qualité industrielle. Voici les méthodes et la stack technique que je mobilise dans mes projets et mon parcours.':'Six complementary domains, from product framing to industrial quality. These are the methods and technologies I use across my projects and career.'}</p></div></div>
  <nav className="skills-index" aria-label={fr?'Domaines de compétences':'Skill domains'}>{domains.map((domain,i)=><a key={domain.id} href={'#skill-'+domain.id}><span aria-hidden="true">0{i+1}</span>{text(domain.label,fr)}<ArrowUpRight size={15} aria-hidden="true"/></a>)}</nav>
  <div className="skills-grid">{domains.map((domain,i)=><Reveal key={domain.id} stopped={stopped} delay={i%2*.06}><article id={'skill-'+domain.id} className="skill-card" aria-labelledby={'skill-'+domain.id+'-title'}><div className="skill-card-top"><span className="skill-number" aria-hidden="true">0{i+1}</span><domain.icon size={28} strokeWidth={1.4} aria-hidden="true"/></div><h3 id={'skill-'+domain.id+'-title'}>{text(domain.title,fr)}</h3><p className="skill-summary">{text(domain.summary,fr)}</p><ul className="skill-capabilities">{domain.capabilities.map((item,j)=><li key={j}>{text(item,fr)}</li>)}</ul><div className="skill-toolkit"><p className="skill-toolkit-label">{domain.tools.length?(fr?'Outils & technologies':'Tools & technologies'):(fr?'Méthodes & amélioration continue':'Methods & continuous improvement')}</p>{domain.tools.length>0&&<ul className="skill-tools">{domain.tools.map(tool=><li key={tool.name}><img className={'skill-tool-logo'+('wide' in tool&&tool.wide?' skill-tool-wordmark':'')} src={tool.src} alt="" width="72" height="28" loading="lazy" decoding="async"/><span className={'wide' in tool&&tool.wide?'sr-only':undefined}>{tool.name}</span></li>)}</ul>}<ul className="skill-methods" aria-label={fr?'Méthodes et pratiques':'Methods and practices'}>{domain.methods.map(method=><li key={method}>{method}</li>)}</ul></div><a className="skill-proof" href={domain.href}><span><small>{fr?'EN PRATIQUE':'IN PRACTICE'}</small>{text(domain.proof,fr)}</span><ArrowUpRight size={20} aria-hidden="true"/></a></article></Reveal>)}</div>
  <a className="extension-link chapter-next" href="#method">{fr?'Comment je relie ces compétences':'How I bring these skills together'}<ArrowUpRight size={18} aria-hidden="true"/></a>
 </section>;
}

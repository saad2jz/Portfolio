import React, {useEffect, useRef, type ReactNode} from 'react';
import {m, useAnimationControls, useInView, useScroll, useTransform} from 'framer-motion';
import {ArrowUpRight, Compass, Flag, Plane, Settings2, Gauge, MapPin} from 'lucide-react';
import destinations from './travel.json';

type Preferences = {fr:boolean; stopped:boolean};
type Copy = {en:string; fr:string};
const text = (copy:Copy, fr:boolean) => fr ? copy.fr : copy.en;

// Keep semantic, visible HTML before hydration; play entrances only once in view.
function Reveal({children,stopped,className='',delay=0}:{children:ReactNode;stopped:boolean;className?:string;delay?:number}) {
 const ref=useRef<HTMLDivElement>(null),seen=useRef(false),visible=useInView(ref,{once:true,margin:'-30px'}),controls=useAnimationControls();
 useEffect(()=>{if(stopped){controls.stop();controls.set({opacity:1,y:0});if(visible)seen.current=true;}else if(visible&&!seen.current){seen.current=true;controls.start({opacity:[.75,1],y:[24,0],transition:{duration:.65,delay,ease:[.16,1,.3,1]}});}return()=>controls.stop();},[visible,stopped,controls,delay]);
 return <m.div ref={ref} initial={false} animate={controls} className={className}>{children}</m.div>;
}

const phases = [
 {name:{en:'Discover',fr:'Comprendre'},title:{en:'Start with the problem.',fr:'Partir du problème.'},body:{en:'Interview users, map the real workflow and identify operational constraints before writing a user story.',fr:'Interroger les utilisateurs, cartographier le travail réel et identifier les contraintes opérationnelles avant la première user story.'},output:{en:'Interviews · Workflow mapping',fr:'Entretiens · Cartographie des flux'}},
 {name:{en:'Prioritise',fr:'Prioriser'},title:{en:'Make the trade-offs explicit.',fr:'Assumer les arbitrages.'},body:{en:'Use business value and user impact to choose what deserves a place in the roadmap. RICE and MoSCoW make those choices explainable.',fr:'Choisir ce qui mérite une place dans la roadmap selon la valeur métier et l’impact utilisateur. RICE et MoSCoW rendent ces choix explicites.'},output:{en:'RICE / MoSCoW · Prioritised backlog',fr:'RICE / MoSCoW · Backlog priorisé'}},
 {name:{en:'Deliver',fr:'Livrer'},title:{en:'Give the team a clear direction.',fr:'Donner un cap à l’équipe.'},body:{en:'Align stakeholders, write clear specifications and acceptance criteria, and lead the agile rituals that keep delivery moving.',fr:'Aligner les parties prenantes, rédiger les spécifications et critères d’acceptation, puis animer les rituels agiles qui soutiennent le delivery.'},output:{en:'User stories · Acceptance criteria',fr:'User stories · Critères d’acceptation'}},
 {name:{en:'Learn',fr:'Mesurer'},title:{en:'Let usage guide the next decision.',fr:'Faire parler les usages.'},body:{en:'Define success metrics during framing, follow adoption and usage, then refine the product through continuous iteration.',fr:'Définir les indicateurs de succès dès le cadrage, suivre l’adoption et les usages, puis faire évoluer le produit par itérations.'},output:{en:'Outcome KPIs · Adoption · Iteration',fr:'KPIs · Adoption · Itération'}}
];

export function MethodSection({fr,stopped}:Preferences) {
 const ref=useRef<HTMLElement>(null),{scrollYProgress}=useScroll({target:ref,offset:['start .65','end .7']}),rotation=useTransform(scrollYProgress,[0,1],[-18,60]);
 return <section id="method" ref={ref} className="extended-section method-section" aria-labelledby="method-title" data-stopped={stopped}>
  <div className="extension-heading"><p className="creator-eyebrow">{fr?'DU BESOIN À L’USAGE':'FROM NEED TO ADOPTION'}</p><Reveal stopped={stopped}><h2 id="method-title" className="hero-heading extension-title">{fr?'Méthode':'Approach'}</h2></Reveal></div>
  <div className="method-layout">
   <div className="method-principle"><p className="extension-lead">{fr?'Comprendre avant de construire. Mesurer avant de conclure.':'Understand before building. Measure before concluding.'}</p>
    <div className="method-orbit" aria-hidden="true"><m.div className="method-orbit-rings" style={{rotate:stopped?0:rotation}}><i/><i/><i/></m.div><span>01—04</span><small>{fr?'UNE BOUCLE, PAS UNE LIGNE':'A LOOP, NOT A LINE'}</small></div>
    <p className="method-note">{fr?'L’ingénierie qualité m’a appris à chercher la cause racine, documenter les décisions et valider sur des faits. J’applique cette rigueur au produit.':'Quality engineering taught me to investigate root causes, document decisions and validate with evidence. I bring that discipline to product work.'}</p>
   </div>
   <div className="method-steps-track"><m.span className="method-progress" aria-hidden="true" style={{scaleY:stopped?1:scrollYProgress}}/><ol className="method-steps">{phases.map((phase,i)=><li key={phase.name.en}><Reveal stopped={stopped} delay={i*.04}><div className="method-step-heading"><span className="method-number" aria-hidden="true">0{i+1}</span><p className="creator-eyebrow">{text(phase.name,fr)}</p></div><h3>{text(phase.title,fr)}</h3><p className="method-description">{text(phase.body,fr)}</p><p className="method-output">{text(phase.output,fr)}</p></Reveal></li>)}</ol></div>
  </div>
  <a className="extension-link" href="#work">{fr?'Voir cette méthode à l’œuvre':'See the approach in practice'}<ArrowUpRight size={18} aria-hidden="true"/></a>
 </section>;
}

const languages = [
 {code:'FR',name:{en:'French',fr:'Français'},level:{en:'Native / bilingual',fr:'Natif / bilingue'},use:{en:'Discovery workshops, stakeholder alignment and executive reporting.',fr:'Ateliers de discovery, alignement des parties prenantes et reporting de direction.'}},
 {code:'EN',name:{en:'English',fr:'Anglais'},level:{en:'Professional · C1 / C2',fr:'Professionnel · C1 / C2'},use:{en:'Technical specifications, international teams and cross-border suppliers.',fr:'Spécifications techniques, équipes internationales et fournisseurs à l’étranger.'}},
 {code:'AR',name:{en:'Arabic',fr:'Arabe'},level:{en:'Native / bilingual',fr:'Natif / bilingue'},use:{en:'Regional partnerships, business negotiation and multicultural projects.',fr:'Partenariats régionaux, négociation commerciale et projets multiculturels.'}},
 {code:'ES',name:{en:'Spanish',fr:'Espagnol'},level:{en:'Elementary · A2',fr:'Élémentaire · A2'},use:{en:'Everyday conversations and understanding basic professional documents.',fr:'Échanges du quotidien et compréhension de documents professionnels simples.'}}
];

export function InternationalSection({fr,stopped}:Preferences) {
 const ref=useRef<HTMLElement>(null),visible=useInView(ref,{margin:'100px'});
 return <section id="international" ref={ref} className="extended-section international-section" aria-labelledby="international-title" data-stopped={stopped} data-in-view={visible}>
  <div className="extension-heading"><p className="creator-eyebrow">{fr?'LANGUES / COLLABORATION / MOBILITÉ':'LANGUAGES / COLLABORATION / MOBILITY'}</p><Reveal stopped={stopped}><h2 id="international-title" className="hero-heading extension-title">International</h2></Reveal><p className="extension-lead">{fr?'Relier les équipes, au-delà des frontières.':'Connecting teams across borders.'}</p></div>
  <div className="international-layout"><div className="international-context"><div className="connection-orbit" aria-hidden="true"><i/><i/><i/><span>SB</span><b className="orbit-label orbit-paris">PARIS</b><b className="orbit-label orbit-remote">REMOTE</b></div><p>{fr?'Basé à Paris. Ouvert au travail hybride, à distance et à la mobilité internationale.':'Based in Paris. Open to hybrid work, remote collaboration and international mobility.'}</p><span className="mobility-caption"><MapPin size={16} aria-hidden="true"/>{fr?'Permis B · Véhiculé':'Category B licence · Personal vehicle'}</span></div>
   <div className="language-cards">{languages.map((language,i)=><Reveal key={language.code} stopped={stopped} delay={i*.06}><article className="language-card"><span className="language-code" aria-hidden="true">{language.code}</span><h3>{text(language.name,fr)}</h3><p className="language-level">{text(language.level,fr)}</p><p className="language-use">{text(language.use,fr)}</p></article></Reveal>)}</div>
  </div>
  <a className="extension-link chapter-next" href="#beyond">{fr?'Découvrir mes autres terrains':'Explore my other interests'}<ArrowUpRight size={18} aria-hidden="true"/></a>
 </section>;
}

const interests = [
 {icon:Plane,category:{en:'AVIATION',fr:'AVIATION'},title:{en:'Learning to fly.',fr:'Apprendre à voler.'},body:{en:'Private-pilot (PPL) training: navigation, weather, checklists and decisions under time constraints.',fr:'Formation au pilotage privé (PPL) : navigation, météo, check-lists et décisions sous contrainte de temps.'},art:'flight'},
 {icon:Flag,category:{en:'MOTORSPORT',fr:'SPORT AUTOMOBILE'},title:{en:'Safety comes first.',fr:'La sécurité d’abord.'},body:{en:'Rally safety marshal: securing events, radio communication and handling incidents within strict protocols.',fr:'Commissaire de sécurité rallye : sécurisation des épreuves, communication radio et gestion des incidents selon les protocoles.'},art:'rally'},
 {icon:Settings2,category:{en:'HANDS-ON ENGINEERING',fr:'INGÉNIERIE CONCRÈTE'},title:{en:'Understand. Take apart. Rebuild.',fr:'Comprendre. Démonter. Reconstruire.'},body:{en:'Personal vehicle restoration and preparation: VAG TFSI/TDI engines, a Mercedes CL600 V12, a BMW 335d and a Lexus IS200 / 1JZ-GTE drift project.',fr:'Restauration et préparation de véhicules personnels : moteurs VAG TFSI/TDI, Mercedes CL600 V12, BMW 335d et projet drift Lexus IS200 / 1JZ-GTE.'},art:'mechanics'},
 {icon:Gauge,category:{en:'SIMULATION',fr:'SIMULATION'},title:{en:'Feel it. Measure it.',fr:'Ressentir. Mesurer.'},body:{en:'Simracing, telemetry and vehicle dynamics: exploring weight transfer and trajectory control through simulation.',fr:'Simracing, télémétrie et dynamique du véhicule : explorer les transferts de masse et le contrôle de trajectoire par la simulation.'},art:'simulation'}
];

export function BeyondSection({fr,stopped}:Preferences) {
 const ref=useRef<HTMLElement>(null),visible=useInView(ref,{margin:'100px'});
 return <section id="beyond" ref={ref} className="extended-section beyond-section" aria-labelledby="beyond-title" data-stopped={stopped} data-in-view={visible}>
  <div className="extension-heading"><p className="creator-eyebrow">{fr?'CURIOSITÉ / PRÉCISION / TERRAIN':'CURIOSITY / PRECISION / FIELD EXPERIENCE'}</p><Reveal stopped={stopped}><h2 id="beyond-title" className="hero-heading extension-title">{fr?'Hors cadre':'Beyond work'}</h2></Reveal><p className="extension-lead">{fr?'D’autres terrains. La même curiosité.':'Different environments. The same curiosity.'}</p></div>
  <Reveal stopped={stopped}><article className="travel-panel" aria-labelledby="travel-title"><div className="travel-copy"><Compass size={25} aria-hidden="true"/><p className="creator-eyebrow">{fr?'EXPLORATION EN AUTONOMIE':'INDEPENDENT EXPLORATION'}</p><h3 id="travel-title"><strong>36</strong><span>{fr?'pays traversés':'countries explored'}</span></h3><p>{fr?'Planifier l’itinéraire, gérer la logistique et s’adapter aux imprévus. De l’Europe à l’Asie du Sud-Est, en passant par l’Afrique du Nord et le Caucase.':'Planning routes, managing logistics and adapting to the unexpected. Across Europe, North Africa, the Caucasus and Southeast Asia.'}</p></div><figure className="travel-map"><img src="assets/travel-world.svg" alt={fr?'Carte des 36 pays visités, mis en évidence en rose cuivré. Liste complète ci-dessous.':'Map highlighting the 36 visited countries in muted copper. Full list below.'} width="680" height="326" loading="lazy" decoding="async"/><figcaption><i aria-hidden="true"/>{fr?'Pays visités · selon mon parcours':'Visited destinations · from my travels'}</figcaption></figure><details className="travel-destinations"><summary>{fr?'Explorer les 36 destinations':'Explore the 36 destinations'}<span aria-hidden="true">+</span></summary><div className="destination-groups">{destinations.map(group=><div key={group.en}><h4>{text(group,fr)}</h4><p>{group.countries.map(country=>text(country,fr)).join(' · ')}</p></div>)}</div></details></article></Reveal>
  <div className="interest-cards">{interests.map((interest,i)=><Reveal key={interest.art} stopped={stopped} delay={i%2*.08}><article className={'interest-card interest-'+interest.art}><div className="interest-visual" aria-hidden="true"><div className="interest-track"/><interest.icon strokeWidth={1}/></div><div className="interest-copy"><p className="creator-eyebrow">{text(interest.category,fr)}</p><h3>{text(interest.title,fr)}</h3><p>{text(interest.body,fr)}</p></div></article></Reveal>)}</div>
  <a className="extension-link chapter-next" href="#contact">{fr?'Échangeons sur votre prochain projet':'Let’s talk about your next project'}<ArrowUpRight size={18} aria-hidden="true"/></a>
 </section>;
}

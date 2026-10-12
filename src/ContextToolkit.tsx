import React from 'react';
import {Blocks,Car,ClipboardCheck,Code2,Database,FileCheck2,GitBranch,Handshake,HardHat,Leaf,LockKeyhole,ListChecks,Network,PackageCheck,Radar,RefreshCw,ShieldCheck,Sparkles,Target,TrendingUp,Waypoints,type LucideIcon} from 'lucide-react';

type Item={en:string;fr?:string;src?:string;wide?:boolean;icon?:LucideIcon};
const catalogue:Record<string,Item>={
 shopify:{en:'Shopify',src:'assets/toolkit/shopify.svg',wide:true},
 mirakl:{en:'Mirakl',src:'assets/toolkit/mirakl.svg',wide:true},
 erplain:{en:'Erplain',src:'assets/toolkit/erplain.webp',wide:true},
 n8n:{en:'n8n',src:'assets/toolkit/n8n.svg',wide:true},
 hubspot:{en:'HubSpot',src:'assets/toolkit/hubspot.svg',wide:true},
 wordpress:{en:'WordPress',src:'assets/hero-tools/wordpress.svg'},
 woocommerce:{en:'WooCommerce',src:'assets/hero-tools/woocommerce.svg'},
 amazon:{en:'Amazon',src:'assets/hero-tools/amazon.svg'},
 ebay:{en:'eBay',src:'assets/hero-tools/ebay.svg'},
 googleads:{en:'Google Ads',src:'assets/hero-tools/googleads.svg'},
 meta:{en:'Meta Ads',src:'assets/hero-tools/meta.svg'},
 tiktok:{en:'TikTok Ads',src:'assets/tools/tiktok.svg'},
 powerbi:{en:'Power BI',src:'assets/logos/powerbi.svg'},
 aws:{en:'AWS Cloud',src:'assets/hero-tools/amazonaws.svg'},
 javascript:{en:'JavaScript',src:'assets/hero-tools/javascript.svg'},
 typescript:{en:'TypeScript',src:'assets/hero-tools/typescript.svg'},
 python:{en:'Python',src:'assets/hero-tools/python.svg'},
 mysql:{en:'MySQL',src:'assets/hero-tools/mysql.svg'},
 postgresql:{en:'PostgreSQL',src:'assets/hero-tools/postgresql.svg'},
 java:{en:'Java',src:'assets/hero-tools/openjdk.svg'},
 cpp:{en:'C++',src:'assets/hero-tools/cplusplus.svg'},
 html:{en:'HTML',src:'assets/hero-tools/html5.svg'},
 css:{en:'CSS',src:'assets/hero-tools/css3.svg'},
 github:{en:'GitHub',src:'assets/toolkit/github.svg',wide:true},
 node:{en:'Node.js',src:'assets/tools/nodedotjs.svg'},
 next:{en:'Next.js',src:'assets/tools/nextdotjs.svg'},
 nest:{en:'NestJS',src:'assets/tools/nestjs.svg'},
 fmea:{en:'FMEA · Risk management',fr:'AMDEC · Gestion des risques',icon:ShieldCheck},
 risk:{en:'Risk analysis',fr:'Analyse des risques',icon:ShieldCheck},
 pdca:{en:'PDCA',icon:RefreshCw},
 lean:{en:'Lean Six Sigma',icon:TrendingUp},
 dmaic:{en:'DMAIC',icon:TrendingUp},
 fiveS:{en:'5S',icon:ListChecks},
 eightD:{en:'8D',icon:Waypoints},
 rootcause:{en:'Root-cause analysis',fr:'Résolution de problèmes',icon:GitBranch},
 retex:{en:'Lessons learned',fr:'RETEX',icon:RefreshCw},
 project:{en:'Project management',fr:'Gestion de projet',icon:Blocks},
 iso9001:{en:'ISO 9001',icon:ClipboardCheck},
 iso14001:{en:'ISO 14001',icon:Leaf},
 iso27001:{en:'ISO/IEC 27001',icon:LockKeyhole},
 ohsas:{en:'OHSAS 18001',icon:HardHat},
 iatf:{en:'IATF 16949',icon:Car},
 audit:{en:'Audits & action plans',fr:'Audits & plans d’action',icon:ClipboardCheck},
 qa:{en:'Functional testing',fr:'Tests fonctionnels',icon:ListChecks},
 sql:{en:'SQL',icon:Database},
 stats:{en:'Statistical analysis',fr:'Analyse statistique',icon:TrendingUp},
 data:{en:'Business & data analysis',fr:'Analyse métier & données',icon:Database},
 networks:{en:'Systems & networks',fr:'Systèmes & réseaux',icon:Network},
 negotiation:{en:'Complex negotiation',fr:'Négociation complexe',icon:Handshake},
 b2b:{en:'B2B strategy',fr:'Stratégie B2B',icon:Target},
 finance:{en:'Business planning',fr:'Pilotage économique',icon:TrendingUp},
 discovery:{en:'Discovery',icon:Radar},
 rice:{en:'RICE / MoSCoW',icon:Target},
 agile:{en:'Agile delivery',fr:'Delivery agile',icon:Blocks},
 kpi:{en:'KPIs & adoption',fr:'KPIs & adoption',icon:TrendingUp},
 api:{en:'REST APIs',icon:Network},
 automation:{en:'Workflows',icon:Waypoints},
 ai:{en:'AI workflows',fr:'Workflows IA',icon:Sparkles},
 pdf:{en:'PDF & traceability',fr:'PDF & traçabilité',icon:FileCheck2},
 postgis:{en:'PostGIS',icon:Database},
 consent:{en:'Consent & triage',fr:'Consentement & triage',icon:ShieldCheck},
 qr:{en:'QR / vCard',icon:Network},
 validation:{en:'Expert validation',fr:'Validation experte',icon:ClipboardCheck},
 simulation:{en:'HFSS · Fluent · SimAI',icon:Code2},
 realtime:{en:'Socket.IO',icon:Network},
 proximity:{en:'Proximity search',fr:'Recherche de proximité',icon:Radar},
 logistics:{en:'Sourcing & logistics',fr:'Sourcing & logistique',icon:PackageCheck}
};

export const cardToolkits:Record<string,string[]>={
 'experience-ffa':['shopify','mirakl','erplain','n8n','project','pdca'],
 'experience-sit':['fmea','pdca','lean','iso9001','project','rootcause','retex'],
 'experience-webmedia':['qa','rootcause','pdca','project'],
 'experience-mascir':['fmea','pdca','iso9001','iso14001','ohsas','audit'],
 'experience-schaeffler':['fmea','iatf','iso9001','eightD','pdca','rootcause'],
 'experience-alliances':['iso27001','audit','risk','project'],
 'experience-tgr':['sql','qa','project'],
 'education-kedge':['b2b','negotiation','project','finance'],
 'education-isen':['powerbi','aws','data'],
 'education-franche-comte':['fmea','pdca','lean','iso9001','stats','project'],
 'education-uir-nantes':['cpp','java','html','css','sql','networks'],
 'certifications-record':['iso27001','lean','dmaic','fiveS','ai'],
 ffa:['project','automation','pdca'],
 leadhunt:['typescript','api','automation'],
 cardiag:['rootcause','risk','pdf'],
 secoursnow:['nest','postgis','consent'],
 rencontre:['typescript','qr','api'],
 career:['next','typescript','project'],
 remote:['python','automation'],
 ansys:['simulation','validation','b2b'],
 debarra:['node','realtime','proximity'],
 dtc:['shopify','wordpress','woocommerce','amazon','ebay','googleads','meta','tiktok','negotiation','logistics']
};

export function MethodIcon({name}:{name:string}){
 const key=/AMDEC|FMEA/.test(name)?'fmea':/PDCA/.test(name)?'pdca':/27001/.test(name)?'iso27001':/14001/.test(name)?'iso14001':/18001/.test(name)?'ohsas':/9001|17025/.test(name)?'iso9001':/IATF/.test(name)?'iatf':/8D/.test(name)?'eightD':/RETEX/.test(name)?'retex':/Lean|DMAIC/.test(name)?'lean':/SQL/.test(name)?'sql':/API|Webhook/.test(name)?'api':/RICE|MoSCoW/.test(name)?'rice':'project';
 const Icon=catalogue[key].icon||Blocks;
 return <Icon size={17} strokeWidth={1.6} aria-hidden="true"/>;
}

export function ToolkitRow({items,fr,label=true}:{items:string[];fr:boolean;label?:boolean}){
 const entries=items.map(key=>({key,...catalogue[key]})).filter(item=>item.en);
 if(!entries.length)return null;
 return <div className="context-toolkit">
  {label&&<p className="context-toolkit-label">{fr?'Outils, méthodes & référentiels':'Tools, methods & frameworks'}</p>}
  <ul className="context-toolkit-items" aria-label={fr?'Outils et méthodes associés':'Related tools and methods'}>{entries.map(item=>{
   const Icon=item.icon||Code2;
   return <li key={item.key}>{item.src?<img src={item.src} className={item.wide?'context-tool-wordmark':undefined} alt="" width={item.wide?80:28} height="28" loading="lazy" decoding="async"/>:<Icon size={24} strokeWidth={1.5} aria-hidden="true"/>}<span className={item.wide?'sr-only':undefined}>{fr?item.fr||item.en:item.en}</span></li>;
  })}</ul>
 </div>;
}

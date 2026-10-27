import React from 'react';

type Item={en:string;fr?:string;src?:string;wide?:boolean};
const catalogue:Record<string,Item>={
 trello:{en:'Trello',src:'assets/hero-tools/trello.svg'},
 office:{en:'Microsoft Office',src:'assets/hero-tools/microsoftoffice.svg'},
 gemini:{en:'Gemini',src:'assets/ecosystems/gemini.webp'},
 ansys:{en:'Ansys',src:'assets/logos/ansys.webp',wide:true},
 sap:{en:'SAP · training in progress',fr:'SAP · formation en cours',src:'assets/hero-tools/sap.svg'},
 shopify:{en:'Shopify',src:'assets/toolkit/shopify.svg',wide:true},
 mirakl:{en:'Mirakl',src:'assets/toolkit/mirakl.svg',wide:true},
 erplain:{en:'Erplain',src:'assets/toolkit/erplain.webp',wide:true},
 n8n:{en:'n8n',src:'assets/toolkit/n8n.svg',wide:true},
 hubspot:{en:'HubSpot',src:'assets/toolkit/hubspot.svg',wide:true},
 sidely:{en:'Sidely CRM',src:'assets/logos/sidely.svg'},
 react:{en:'React',src:'assets/tools/react.svg'},
 three:{en:'Three.js',src:'assets/tools/threedotjs.svg'},
 leaflet:{en:'Leaflet',src:'assets/tools/leaflet.svg'},
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
 fmea:{en:'FMEA · Risk management',fr:'AMDEC · Gestion des risques'},
 risk:{en:'Risk analysis',fr:'Analyse des risques'},
 pdca:{en:'PDCA'},
 lean:{en:'Lean Six Sigma'},
 dmaic:{en:'DMAIC'},
 fiveS:{en:'5S'},
 eightD:{en:'8D'},
 rootcause:{en:'Root-cause analysis',fr:'Résolution de problèmes'},
 retex:{en:'Lessons learned',fr:'RETEX'},
 project:{en:'Project management',fr:'Gestion de projet'},
 iso9001:{en:'ISO 9001'},
 iso14001:{en:'ISO 14001'},
 iso27001:{en:'ISO/IEC 27001'},
 ohsas:{en:'OHSAS 18001'},
 iatf:{en:'IATF 16949'},
 audit:{en:'Audits & action plans',fr:'Audits & plans d’action'},
 qa:{en:'Functional testing',fr:'Tests fonctionnels'},
 sql:{en:'SQL'},
 stats:{en:'Statistical analysis',fr:'Analyse statistique'},
 data:{en:'Business & data analysis',fr:'Analyse métier & données'},
 networks:{en:'Systems & networks',fr:'Systèmes & réseaux'},
 negotiation:{en:'Complex negotiation',fr:'Négociation complexe'},
 b2b:{en:'B2B strategy',fr:'Stratégie B2B'},
 finance:{en:'Business planning',fr:'Pilotage économique'},
 discovery:{en:'Discovery'},
 rice:{en:'RICE / MoSCoW'},
 agile:{en:'Agile delivery',fr:'Delivery agile'},
 kpi:{en:'KPIs & adoption',fr:'KPIs & adoption'},
 api:{en:'REST APIs'},
 automation:{en:'Workflows'},
 ai:{en:'AI workflows',fr:'Workflows IA'},
 pdf:{en:'PDF & traceability',fr:'PDF & traçabilité'},
 postgis:{en:'PostGIS',src:'assets/tools/postgis.svg',wide:true},
 consent:{en:'Consent & triage',fr:'Consentement & triage'},
 qr:{en:'QR / vCard'},
 validation:{en:'Expert validation',fr:'Validation experte'},
 simulation:{en:'HFSS · Fluent · SimAI'},
 realtime:{en:'Socket.IO',src:'assets/tools/socketio.svg'},
 proximity:{en:'Proximity search',fr:'Recherche de proximité'},
 logistics:{en:'Sourcing & logistics',fr:'Sourcing & logistique'}
};

export const cardToolkits:Record<string,string[]>={
 'experience-ffa':['shopify','mirakl','erplain','n8n','sidely','project','pdca'],
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
 'certifications-record':[],
 ffa:['n8n','hubspot','project','automation','pdca'],
 leadhunt:['typescript','gemini','api','automation'],
 cardiag:['gemini','rootcause','risk','pdf'],
 simulaiz:['react','typescript','three','api'],
 findwhere:['react','node','leaflet','gemini'],
 secoursnow:['nest','postgis','consent'],
 rencontre:['typescript','qr','api'],
 career:['next','typescript','project'],
 remote:['python','automation'],
 ansys:['ansys','simulation','validation','b2b'],
 debarra:['node','realtime','proximity'],
 dtc:['shopify','wordpress','woocommerce','amazon','ebay','googleads','meta','tiktok','negotiation','logistics']
};

// Only vendor products have brand artwork. Methods and standards remain named
// practices, never generic pictograms or invented certification seals.
export function MethodIcon({name}:{name:string}){
 const key:Record<string,string>={'TypeScript':'typescript','Node.js':'node','WooCommerce':'woocommerce'};
 const item=catalogue[key[name]];
 return item?.src?<img className="method-brand-logo" src={item.src} alt="" width="24" height="24" loading="lazy" decoding="async"/>:null;
}

export function ToolkitRow({items,fr,label=true}:{items:string[];fr:boolean;label?:boolean}){
 const entries=items.map(key=>({key,...catalogue[key]})).filter(item=>item.en);
 const brands=entries.filter(item=>item.src),methods=entries.filter(item=>!item.src);
 if(!entries.length)return null;
 return <div className="context-toolkit" data-labelled={label}>
  {brands.length>0&&<ul className="context-toolkit-items" aria-label={fr?'Outils et technologies associés':'Related tools and technologies'}>{brands.map(item=><li key={item.key}>
   <img src={item.src} className={item.wide?'context-tool-wordmark':undefined} alt="" width={item.wide?88:34} height="34" loading="lazy" decoding="async"/><span className={item.wide?'sr-only':undefined}>{fr?item.fr||item.en:item.en}</span>
  </li>)}</ul>}
  {methods.length>0&&<ul className="context-methods" aria-label={fr?'Méthodes et référentiels associés':'Related methods and frameworks'}>{methods.map(item=><li key={item.key}>{fr?item.fr||item.en:item.en}</li>)}</ul>}
 </div>;
}

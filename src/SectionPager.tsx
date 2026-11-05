import React, {useEffect,useRef,type ReactNode} from 'react';
import {ArrowDown,ArrowLeft,ArrowRight} from 'lucide-react';
import {enhanceSectionPager} from './section-pager';

export type PortfolioPart={id:string;anchor:string;label:string;children:ReactNode};

/** Keep the server-rendered content and its stateful galleries/forms mounted.
 * The enhancement exposes one part at a time; native links work without JS. */
export function SectionPager({parts,fr}:{parts:PortfolioPart[];fr:boolean}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>ref.current?enhanceSectionPager(ref.current,fr):undefined,[fr]);
 return <div ref={ref} className="section-pager">
  <div className="section-tabbar">
   <div className="section-tabbar-inner">
    <span className="section-tabbar-caption" aria-hidden="true">{fr?'EXPLORER':'EXPLORE'}</span>
    <nav className="section-tabs" aria-label={fr?'Rubriques du portfolio':'Portfolio sections'}>
     <span className="section-tab-indicator" aria-hidden="true"/>
     {parts.map(part=><a key={part.id} id={'tab-'+part.id} className="section-tab" href={'#'+part.anchor} data-section-tab={part.id} aria-controls={'panel-'+part.id}>{part.label}</a>)}
    </nav>
    <div className="section-tabbar-controls">
     <span className="section-position" aria-hidden="true">01 / {String(parts.length).padStart(2,'0')}</span>
     <button type="button" data-section-step="-1" aria-label={fr?'Rubrique précédente':'Previous section'}><ArrowLeft size={17} aria-hidden="true"/></button>
     <button type="button" data-section-step="1" aria-label={fr?'Rubrique suivante':'Next section'}><ArrowRight size={17} aria-hidden="true"/></button>
    </div>
   </div>
  </div>
  <p className="sr-only section-announcement" role="status" aria-live="polite" aria-atomic="true"/>
  <div className="section-panels">
   {parts.map((part,index)=><div key={part.id} id={'panel-'+part.id} className="section-panel" data-section-panel={part.id} aria-labelledby={'tab-'+part.id}>
    {part.children}
    <nav className="section-footer-nav" aria-label={fr?'Continuer la visite':'Continue exploring'}>
     <span className="section-footer-caption"><small>{String(index+1).padStart(2,'0')} / {String(parts.length).padStart(2,'0')}</small>{index<parts.length-1?<><ArrowDown size={14} aria-hidden="true"/>{fr?'Continuer à défiler':'Keep scrolling'}</>:<>{fr?'Fin de la visite':'End of the tour'}</>}</span>
     {index>0&&<a href={'#'+parts[index-1].anchor} data-section-go={parts[index-1].id}><ArrowLeft size={17} aria-hidden="true"/>{parts[index-1].label}</a>}
     {index<parts.length-1&&<a href={'#'+parts[index+1].anchor} data-section-go={parts[index+1].id}>{parts[index+1].label}<ArrowRight size={17} aria-hidden="true"/></a>}
    </nav>
   </div>)}
  </div>
 </div>;
}

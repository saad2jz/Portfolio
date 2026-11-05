import React, {type ReactNode} from 'react';
import {ArrowLeft,ArrowRight} from 'lucide-react';

type ProjectLink={id:string;title:string};
type ProjectContext={title:string;fr:boolean;previous?:ProjectLink;next?:ProjectLink};
type StackCardProps={id:string;index:number;total:number;children:ReactNode;className?:string;titleId?:string;context?:ProjectContext};

// Projects, career and skills share the same geometry and handoff animation.
export function StackCard({id,index,total,children,className='',titleId=id+'-title',context}:StackCardProps){
 // One shared scroll controller handles every stack and chapter. Keep articles
 // stable: galleries, disclosures and keyboard focus retain their native DOM.
 return <><div className="project-marker" aria-hidden="true"/><article id={id} className={'creator-project project '+className} aria-labelledby={titleId} data-stack-depth={Math.min(2,total-1-index)} style={{top:'var(--stack-top, 96px)','--stack-rest-top':96+Math.min(index,2)*16,zIndex:index+1} as React.CSSProperties}>
  {context&&<div className="project-frame-toolbar">
   <div className="project-frame-identity" aria-hidden="true"><span className="project-frame-count">{String(index+1).padStart(2,'0')}<span> / {String(total).padStart(2,'0')}</span></span><span className="project-frame-name" title={context.title}>{context.title}</span></div>
   <nav className="project-frame-navigation" aria-label={context.fr?'Parcourir les projets':'Browse projects'}>
    {context.previous&&<a href={'#'+context.previous.id+'-title'} aria-label={(context.fr?'Projet précédent : ':'Previous project: ')+context.previous.title} title={context.previous.title}><ArrowLeft size={17} aria-hidden="true"/></a>}
    {context.next&&<a href={'#'+context.next.id+'-title'} aria-label={(context.fr?'Projet suivant : ':'Next project: ')+context.next.title} title={context.next.title}><ArrowRight size={17} aria-hidden="true"/></a>}
   </nav>
   <span className="project-reading-track" aria-hidden="true"><span className="project-reading-fill"/></span>
  </div>}
  <div className="project-scroll-viewport"><div className="project-scroll-content">{children}</div></div></article><div className="project-marker project-handoff" aria-hidden="true"/></>;
}

import React, {type ReactNode} from 'react';

type StackCardProps={id:string;index:number;total:number;children:ReactNode;className?:string;titleId?:string};

// Projects, career and skills share the same geometry and handoff animation.
export function StackCard({id,index,total,children,className='',titleId=id+'-title'}:StackCardProps){
 // One shared scroll controller handles every stack and chapter. Keep articles
 // stable: galleries, disclosures and keyboard focus retain their native DOM.
 return <><div className="project-marker" aria-hidden="true"/><article id={id} className={'creator-project project '+className} aria-labelledby={titleId} data-stack-depth={Math.min(2,total-1-index)} style={{top:'var(--stack-top, 96px)','--stack-rest-top':96+Math.min(index,2)*16,zIndex:index+1} as React.CSSProperties}>{children}</article><div className="project-marker project-handoff" aria-hidden="true"/></>;
}

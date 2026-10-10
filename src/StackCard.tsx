import React, {useRef, type ReactNode} from 'react';
import {m, useScroll, useTransform} from 'framer-motion';

type StackCardProps={id:string;index:number;total:number;stopped:boolean;compact:boolean;children:ReactNode;className?:string;titleId?:string};

// Projects, career and skills share the same geometry and handoff animation.
export function StackCard({id,index,total,stopped,compact,children,className='',titleId=id+'-title'}:StackCardProps){
 const ref=useRef<HTMLDivElement>(null),end=useRef<HTMLDivElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:['start start','start -1']}),scale=useTransform(scrollYProgress,[0,1],[1,1-Math.min(2,total-1-index)*.03]);
 // On phones, wait until the following card enters, after the full content
 // of the current card has passed through the viewport. Markers stay in flow.
 const {scrollYProgress:handoff}=useScroll({target:end,offset:['start .85','start .15']}),mobileScale=useTransform(handoff,[0,1],[1,1-Math.min(2,total-1-index)*.015]);
 return <><div ref={ref} className="project-marker" aria-hidden="true"/><m.article id={id} className={'creator-project project '+className} aria-labelledby={titleId} style={{top:'var(--stack-top, 96px)','--stack-rest-top':96+Math.min(index,2)*16,scale:stopped?1:compact?mobileScale:scale,zIndex:index+1} as React.CSSProperties}>{children}</m.article><div ref={end} className="project-marker project-handoff" aria-hidden="true"/></>;
}

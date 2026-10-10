import React, {useEffect, useRef, type ReactNode, type RefObject} from 'react';
import {m, useInView, useMotionValue, useScroll, useTransform, type MotionValue} from 'framer-motion';

type StackCardProps={id:string;index:number;total:number;stopped:boolean;compact:boolean;children:ReactNode;className?:string;titleId?:string};

// Projects, career and skills share the same geometry and handoff animation.
export function StackCard({id,index,total,stopped,compact,children,className='',titleId=id+'-title'}:StackCardProps){
 const ref=useRef<HTMLDivElement>(null),end=useRef<HTMLDivElement>(null),card=useRef<HTMLElement>(null);
 const nearby=useInView(card,{once:true,margin:'1200px 0px'}),scale=useMotionValue(1);
 // Leave the pre-rendered article in place so native gallery listeners and
 // disclosures survive activation. Only the motion subscriptions are deferred.
 return <><div ref={ref} className="project-marker" aria-hidden="true"/>{nearby&&<StackMotion start={ref} end={end} index={index} total={total} compact={compact} value={scale}/>}<m.article ref={card} id={id} className={'creator-project project '+className} aria-labelledby={titleId} style={{top:'var(--stack-top, 96px)','--stack-rest-top':96+Math.min(index,2)*16,scale:stopped?1:scale,zIndex:index+1} as React.CSSProperties}>{children}</m.article><div ref={end} className="project-marker project-handoff" aria-hidden="true"/></>;
}
function StackMotion({start,end,index,total,compact,value}:{start:RefObject<HTMLDivElement>;end:RefObject<HTMLDivElement>;index:number;total:number;compact:boolean;value:MotionValue<number>}){
 const {scrollYProgress}=useScroll({target:start,offset:['start start','start -1']}),scale=useTransform(scrollYProgress,[0,1],[1,1-Math.min(2,total-1-index)*.03]);
 // On phones, wait until the following card enters, after the full content
 // of the current card has passed through the viewport. Markers stay in flow.
 const {scrollYProgress:handoff}=useScroll({target:end,offset:['start .85','start .15']}),mobileScale=useTransform(handoff,[0,1],[1,1-Math.min(2,total-1-index)*.015]);
 useEffect(()=>{const source=compact?mobileScale:scale;value.set(source.get());return source.on('change',next=>value.set(next));},[compact,mobileScale,scale,value]);
 return null;
}

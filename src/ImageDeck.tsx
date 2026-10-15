import React, {useState, type KeyboardEvent} from 'react';
import {localizeMarkup} from './localization';

export type Capture = {html:string; portrait:boolean};

// Render the final deck on the server. Hydration never moves figures or changes
// the card height; every original gallery link remains available to the lightbox.
export function ImageDeck({id,name,captures,fr}:{id:string;name:string;captures:Capture[];fr:boolean}) {
 const [index,setIndex]=useState(0);
 const move=(step:number)=>setIndex(current=>(current+step+captures.length)%captures.length);
 const stageId=id+'-capture-deck';
 function onKeyDown(event:KeyboardEvent<HTMLDivElement>) {
  if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
  event.preventDefault();
  const next=(index+(event.key==='ArrowLeft'?-1:1)+captures.length)%captures.length;
  setIndex(next);
  if((event.target as Element).closest('.media-link'))requestAnimationFrame(()=>document.querySelector<HTMLElement>(`#${stageId} [data-deck-depth="0"] .media-link`)?.focus({preventScroll:true}));
 }
 return <div className="project-image-deck" role="region" aria-label={`${name} — ${fr?'captures du projet':'project captures'}`} onKeyDown={onKeyDown}>
  <div className="image-deck-controls">
   <span className="image-deck-hint">{fr?'Captures du produit · toucher pour agrandir':'Product captures · select to enlarge'}</span>
   <span className="image-deck-count" aria-live="polite" aria-atomic="true">{index+1} / {captures.length}</span>
   <button type="button" className="image-deck-step" aria-controls={stageId} aria-label={fr?'Capture précédente':'Previous capture'} onClick={()=>move(-1)}>←</button>
   <button type="button" className="image-deck-step" aria-controls={stageId} aria-label={fr?'Capture suivante':'Next capture'} onClick={()=>move(1)}>→</button>
  </div>
  {['ffa','leadhunt','cardiag'].includes(id)&&<p className="capture-privacy">{fr?'Certaines données sensibles sont masquées sur les captures.':'Some sensitive information is masked in the captures.'}</p>}
  <div id={stageId} className="image-deck-stage" data-portrait={captures.filter(capture=>capture.portrait).length>captures.length/2}>
   {captures.map((capture,i)=>{
    const depth=(i-index+captures.length)%captures.length;
    return <div key={i} className="image-deck-slide" data-deck-depth={depth} hidden={depth>2} aria-hidden={depth!==0} {...(depth?{inert:''}:{})} dangerouslySetInnerHTML={{__html:localizeMarkup(capture.html,fr?'fr':'en')}}/>;
   })}
  </div>
 </div>;
}

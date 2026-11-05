import {navigationHeight} from './src/navigation-metrics';
// Shared with chapter transitions: one passive scroll listener, one frame,
// cached flow positions. Long content moves inside a viewport-sized card using
// the native document scroll; no nested wheel scroller or scroll interception.
import {createFlowMeasure} from './flow-geometry';
export function createCardStacks(invalidate){
 const cards=[...document.querySelectorAll('.creator-project.project')].map(card=>({card,window:card.querySelector(':scope > .project-scroll-viewport'),content:card.querySelector(':scope > .project-scroll-viewport > .project-scroll-content'),toolbar:card.querySelector('.project-frame-toolbar'),progress:card.querySelector('.project-reading-fill'),height:0,overflow:0,readingPrevious:-1,progressPrevious:-1,top:0,end:0,pin:0,start:0,finish:0,depth:Number(card.dataset.stackDepth)||0,previous:-1}));
 const observed=new Map();
 const observer=new ResizeObserver(entries=>{
  let changed=false;
  for(const entry of entries){
   const height=entry.borderBoxSize?.[0]?.blockSize||entry.target.offsetHeight;
   if(Math.abs((observed.get(entry.target)??-1)-height)>.5){observed.set(entry.target,height);changed=true;}
  }
  if(changed)invalidate();
 });
 cards.forEach(({card,content,window})=>{observer.observe(card);if(content)observer.observe(content);if(window)observer.observe(window);});
 function measure(viewport,header,width,stopped=false){
  for(const item of cards)item.visible=!item.card.closest('[data-section-panel]')?.hidden;
  for(const item of cards){
   if(!item.visible)continue;
   const {card}=item,rest=Number.parseFloat(card.style.getPropertyValue('--stack-rest-top'))||96;
   const preferred=header+12+(rest-96)*(width<=900?.5:1);
   const enabled=!!item.content&&!stopped&&viewport-preferred-24>=(item.toolbar?300:180);
   item.pin=enabled?preferred:0;
   card.style.setProperty('--stack-top',`${item.pin}px`);
   card.style.setProperty('--stack-height',`${Math.max(0,viewport-preferred-24)}px`);
   card.style.setProperty('--stack-origin','50% 0%');
   card.dataset.stackFit=enabled?'true':'false';
   card.dataset.stackMode=enabled?'frame':'flow';
  }
  // Read the bounded frames together after the sizing writes. Observe the inner
  // content too: opening details does not change the outer card's fixed height.
  for(const item of cards){
   if(!item.visible)continue;
   item.height=item.card.offsetHeight;
   item.overflow=item.card.dataset.stackFit==='true'?Math.max(0,item.content.offsetHeight-item.window.clientHeight):0;
   item.card.dataset.stackOverflow=item.overflow>0?'true':'false';
  }
  for(const item of cards){
   if(!item.visible)continue;
   const {card}=item,enabled=card.dataset.stackFit==='true';
   const handoff=card.nextElementSibling;
   if(handoff?.classList.contains('project-handoff'))handoff.style.setProperty('--stack-hold',`${item.overflow+(enabled&&item.depth?Math.min(160,viewport*.18):1)}px`);
  }
  const flowTop=createFlowMeasure();
  for(const item of cards){
   if(!item.visible)continue;
   const start=item.card.previousElementSibling,end=item.card.nextElementSibling;
   if(!start?.classList.contains('project-marker')||!end?.classList.contains('project-handoff'))continue;
   item.top=flowTop(start);item.end=flowTop(end);
   // Spend the original content height reading inside the clipped frame before
   // allowing the next card to cover it or the stack scale to start.
   item.start=Math.max(item.top-item.pin+item.overflow,item.end+item.overflow-viewport*.88);
   item.finish=Math.max(item.start+Math.min(220,viewport*.28),item.end+item.overflow-header-48);
  }
  return flowTop;
 }
 function paint(y,stopped,width,actualY=y){
  for(const item of cards){
   if(!item.visible)continue;
   const offset=stopped?0:Math.max(0,Math.min(item.overflow,actualY-(item.top-item.pin)));
   const reading=!stopped&&offset>0&&offset<item.overflow?'true':'false';
   if(item.card.dataset.stackReading!==reading)item.card.dataset.stackReading=reading;
   if(item.content&&Math.abs(offset-item.readingPrevious)>.01){item.readingPrevious=offset;item.content.style.transform=offset?`translateY(${-offset}px)`:'none';}
   const completion=item.overflow?offset/item.overflow:0;
   if(item.progress&&Math.abs(completion-item.progressPrevious)>.001){item.progressPrevious=completion;item.progress.style.transform=`scaleX(${completion.toFixed(4)})`;}
   const raw=stopped||item.card.dataset.stackFit!=='true'?0:Math.max(0,Math.min(1,(y-item.start)/Math.max(1,item.finish-item.start)));
   const progress=raw*raw*(3-2*raw),scale=1-progress*item.depth*(width<=900?.012:.025);
   const active=!stopped&&raw>0&&raw<1?'true':'false';
   if(item.card.dataset.stackAnimating!==active)item.card.dataset.stackAnimating=active;
   if(Math.abs(scale-item.previous)<.0001)continue;
   item.previous=scale;item.card.style.transform=scale===1?'none':`scale(${scale.toFixed(5)})`;
  }
 }
 let focused=null,keyboard=false;
 function releaseFocus(){if(focused){delete focused.dataset.stackFocus;focused=null;}}
 // :focus-visible alone can match native summaries on pointer focus. Only a
 // keyboard gesture may release sticky cards; otherwise mousedown moves the
 // summary before mouseup and its disclosure never opens.
 document.addEventListener('keydown',event=>{if(['Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))keyboard=true;},{capture:true});
 document.addEventListener('focusin',event=>{
  releaseFocus();const target=event.target;
  if(!keyboard)return;
  if(!target.matches('a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible'))return;
  const card=target.closest('.creator-project.project');
  if(!card)return;
  focused=card;card.dataset.stackFocus='true';invalidate();
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
   if(focused!==card||document.activeElement!==target)return;
   const rect=target.getBoundingClientRect(),window=card.querySelector(':scope > .project-scroll-viewport'),frame=window?.getBoundingClientRect();
   const bounded=card.dataset.stackFit==='true'&&window?.contains(target)&&frame;
   const top=Math.max(navigationHeight()+16,bounded?frame.top+8:0),bottom=Math.min(innerHeight-16,bounded?frame.bottom-8:innerHeight);
   const delta=rect.top<top?rect.top-top:rect.bottom>bottom?rect.bottom-bottom:0;
   if(delta)scrollBy({top:delta,behavior:'instant'});
  }));
 });
 document.addEventListener('focusout',releaseFocus);
 for(const event of ['pointerdown','wheel','touchstart'])document.addEventListener(event,()=>{keyboard=false;releaseFocus();},{passive:true,capture:true});
 return {measure,paint};
}

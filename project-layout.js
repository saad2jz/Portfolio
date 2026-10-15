// Shared with chapter transitions: one passive scroll listener, one frame,
// cached flow positions. Long cards remain readable before the next handoff.
export function createCardStacks(invalidate){
 const cards=[...document.querySelectorAll('.creator-project.project')].map(card=>({card,height:card.offsetHeight,top:0,end:0,pin:0,start:0,finish:0,depth:Number(card.dataset.stackDepth)||0,previous:-1}));
 const byElement=new Map(cards.map(item=>[item.card,item]));
 const observer=new ResizeObserver(entries=>{
  let changed=false;
  for(const entry of entries){
   const item=byElement.get(entry.target),height=entry.borderBoxSize?.[0]?.blockSize||entry.target.offsetHeight;
   if(Math.abs(item.height-height)>.5){item.height=height;changed=true;}
  }
  if(changed)invalidate();
 });
 cards.forEach(({card})=>observer.observe(card));
 function flowTop(element){let top=0;for(let node=element;node;node=node.offsetParent)top+=node.offsetTop;return top;}
 function measure(viewport,header,width){
  for(const item of cards){
   const {card,height}=item,rest=Number.parseFloat(card.style.getPropertyValue('--stack-rest-top'))||96;
   const preferred=header+12+(rest-96)*(width<=900?.5:1);
   // Short cards pin below the navigation. Tall cards scroll completely first,
   // then pin their bottom edge while the following card slides over them.
   // Native sticky positioning owns both directions; no scroll position writes.
   const enabled=!card.querySelector('details[open]');
   item.pin=enabled?Math.min(preferred,viewport-height-24):0;
   card.style.setProperty('--stack-top',`${item.pin}px`);
   card.style.setProperty('--stack-origin',height>viewport-header-36?'50% 100%':'50% 0%');
   card.dataset.stackFit=enabled?'true':'false';
   card.dataset.stackMode=!enabled?'flow':item.pin<preferred?'bottom':'top';
   const handoff=card.nextElementSibling;
   if(handoff?.classList.contains('project-handoff'))handoff.style.setProperty('--stack-hold',`${enabled&&item.depth?Math.min(160,viewport*.18):1}px`);
  }
  for(const item of cards){
   const start=item.card.previousElementSibling,end=item.card.nextElementSibling;
   if(!start?.classList.contains('project-marker')||!end?.classList.contains('project-handoff'))continue;
   item.top=flowTop(start);item.end=flowTop(end);
   // Never shrink a card while its lower content is still being read.
   item.start=Math.max(item.top-item.pin,item.end-viewport*.88);
   item.finish=Math.max(item.start+Math.min(220,viewport*.28),item.end-header-48);
  }
 }
 function paint(y,stopped,width){
  for(const item of cards){
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
   const rect=target.getBoundingClientRect(),top=(document.querySelector('header')?.getBoundingClientRect().bottom||0)+16,bottom=innerHeight-16;
   const delta=rect.top<top?rect.top-top:rect.bottom>bottom?rect.bottom-bottom:0;
   if(delta)scrollBy({top:delta,behavior:'instant'});
  }));
 });
 document.addEventListener('focusout',releaseFocus);
 for(const event of ['pointerdown','wheel','touchstart'])document.addEventListener(event,()=>{keyboard=false;releaseFocus();},{passive:true,capture:true});
 return {measure,paint};
}

import {PagerWheelIntent} from './pager-wheel-intent';
import {navigationHeight} from './navigation-metrics';
import {captureSectionBookmark,measureReadingAnchors,resolveSectionBookmark,type SectionBookmark} from './reading-anchors';

type Activation={history?:boolean;scroll?:boolean;animate?:boolean;focus?:boolean;entry?:'start'|'end';axis?:'x'|'y';wheelGesture?:boolean};

/** A navigation gesture selects its latest destination immediately. No animation
 * completion handlers queue intermediate sections or lock wheel/touch input. */
export function enhanceSectionPager(root:HTMLElement,fr:boolean){
 const tabs=[...root.querySelectorAll<HTMLAnchorElement>('[data-section-tab]')];
 const panels=[...root.querySelectorAll<HTMLElement>('[data-section-panel]')];
 const tablist=root.querySelector<HTMLElement>('.section-tabs')!;
 const bar=root.querySelector<HTMLElement>('.section-tabbar')!;
 const header=document.querySelector<HTMLElement>('header')!;
 const announcement=root.querySelector<HTMLElement>('.section-announcement')!;
 const counter=root.querySelector<HTMLElement>('.section-position')!;
 const indicator=root.querySelector<HTMLElement>('.section-tab-indicator')!;
 const positions=new Map<number,SectionBookmark>();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const entrances=new Set<Animation>();
 let active=-1,restoreFrame=0,maxY=0,edgeDistance=0,edgeTime=0,edgeDirection=0;
 const horizontalIntent=new PagerWheelIntent();
 let indicatorAnimation:Animation|null=null;
 let touch:{x:number;y:number;width:number;horizontal:boolean;vertical:boolean;edgeStart:number;ignore:boolean}|null=null;
 const stopped=()=>reduced.matches||document.documentElement.classList.contains('motion-paused');
 const cancelEntrances=()=>{for(const animation of entrances)animation.cancel();entrances.clear();};
 const targetForHash=()=>{try{return document.getElementById(decodeURIComponent(location.hash.slice(1)));}catch{return null;}};
 const indexForTarget=(target:Element|null)=>panels.indexOf(target?.closest<HTMLElement>('[data-section-panel]')!);
 const clamp=(index:number)=>Math.max(0,Math.min(panels.length-1,index));
 const cancelRestore=()=>{cancelAnimationFrame(restoreFrame);restoreFrame=0;};
 const canAdvance=(direction:number)=>direction>0?active<panels.length-1&&scrollY>=maxY-3:active>0&&scrollY<=3;
 const advance=(direction:number)=>select(active+direction,{history:true,entry:direction>0?'start':'end',axis:'y'});

 function alignIndicator(animate:boolean){
  if(active<0)return;
  const strip=tablist.getBoundingClientRect(),current=indicator.getBoundingClientRect();
  const left=tabs[active].offsetLeft,width=tabs[active].offsetWidth;
  const previousLeft=current.left-strip.left+tablist.scrollLeft,previousWidth=current.width;
  indicatorAnimation?.cancel();
  indicator.style.width=width+'px';indicator.style.transform=`translateX(${left}px)`;indicator.style.opacity='1';
  if(animate&&!stopped()&&previousWidth>0){
   indicatorAnimation=indicator.animate([{transform:`translateX(${previousLeft}px) scaleX(${previousWidth/width})`},{transform:`translateX(${left}px) scaleX(1)`}],{duration:340,easing:'cubic-bezier(.22,1,.36,1)'});
  }
 }

 function syncGeometry(){
  document.documentElement.style.setProperty('--section-header-height',header.offsetHeight+'px');
  document.documentElement.style.setProperty('--section-tabs-height',bar.offsetHeight+'px');
  maxY=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  alignIndicator(false);
 }
 function select(index:number,options:Activation={}){
  index=clamp(index);
  if(!options.wheelGesture){horizontalIntent.reset(index);edgeDistance=0;edgeDirection=0;}
  if(index===active){if(options.focus)tabs[index].focus({preventScroll:true});return;}
  const previous=active;
  const departing=panels[previous];
  const focusedStep=document.activeElement instanceof HTMLElement?document.activeElement.closest<HTMLElement>('[data-section-step]'):null;
  const disablingFocusedStep=focusedStep&&(Number(focusedStep.dataset.sectionStep)<0?index===0:index===panels.length-1);
  const moveFocus=options.focus||!!departing?.contains(document.activeElement)||!!disablingFocusedStep;
  if(previous>=0)positions.set(previous,captureSectionBookmark(measureReadingAnchors(departing),scrollY,navigationHeight(),maxY));
  if(restoreFrame)cancelAnimationFrame(restoreFrame);
  cancelEntrances();
  active=index;
  panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.inert=i!==index;});
  tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  root.querySelectorAll<HTMLButtonElement>('[data-section-step]').forEach(button=>{button.disabled=Number(button.dataset.sectionStep)<0?index===0:index===panels.length-1;});
  counter.textContent=String(index+1).padStart(2,'0')+' / '+String(panels.length).padStart(2,'0');
  if(previous>=0)announcement.textContent=(fr?'Rubrique ':'Section ')+(index+1)+' / '+panels.length+' · '+tabs[index].textContent;
  if(options.history){
   const state={...history.state};delete state.portfolioReadingPosition;
   history.pushState(state,'',tabs[index].getAttribute('href'));
  }
  if(moveFocus)tabs[index].focus({preventScroll:true});
  // Scroll just the tab strip, without moving the document vertically.
  const strip=tablist.getBoundingClientRect(),label=tabs[index].getBoundingClientRect();
  if(label.left<strip.left+16||label.right>strip.right-16){
   tablist.scrollTo({left:tablist.scrollLeft+label.left-strip.left-(strip.width-label.width)/2,behavior:stopped()?'instant':'smooth'});
  }
  document.documentElement.style.setProperty('--section-header-height',header.offsetHeight+'px');
  document.documentElement.style.setProperty('--section-tabs-height',bar.offsetHeight+'px');
  alignIndicator(previous>=0&&options.animate!==false);
  document.dispatchEvent(new Event('portfolio:sectionchange'));
  maxY=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  if(options.scroll!==false){
   const destination=options.entry==='start'?0:options.entry==='end'?maxY:resolveSectionBookmark(positions.get(index),measureReadingAnchors(panels[index]),navigationHeight(),maxY);
   scrollTo({top:destination,behavior:'instant'});
   // Image decoding and the existing sticky controller may change geometry once.
   const y=scrollY;
   restoreFrame=requestAnimationFrame(()=>{restoreFrame=0;scrollTo({top:y,behavior:'instant'});});
  }
  if(previous>=0&&options.animate!==false&&!stopped()){
   const direction=index>previous?1:-1;
   const candidates=[...panels[index].querySelectorAll<HTMLElement>('.hero-title-layer,.selection-heading,.selection-card,.services-heading,.creator-work-heading,.extension-heading,.contact-heading,.contact-intro')];
   const visible=candidates.map(element=>({element,rect:element.getBoundingClientRect()})).filter(({rect})=>rect.bottom>header.offsetHeight+bar.offsetHeight&&rect.top<innerHeight&&rect.height<innerHeight*1.4).slice(0,5);
   for(const {element} of visible){
    const axis=options.axis==='y'?'Y':'X';
    const animation=element.animate([{opacity:.25,transform:`translate${axis}(${direction*24}px)`},{opacity:1,transform:'translate(0)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
    entrances.add(animation);animation.finished.then(()=>entrances.delete(animation)).catch(()=>{});
   }
  }
 }
 function click(event:MouseEvent){
  const target=(event.target as Element)?.closest<HTMLElement>('[data-section-tab],[data-section-go],[data-section-step]');
  if(!target||!root.contains(target)||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const id=target.dataset.sectionTab||target.dataset.sectionGo;
  const index=id?panels.findIndex(panel=>panel.dataset.sectionPanel===id):active+Number(target.dataset.sectionStep);
  if(index<0)return;
  event.preventDefault();select(index,{history:true,focus:target.hasAttribute('data-section-tab')});
 }
 function keyboard(event:KeyboardEvent){
  if(event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;
  const tab=(event.target as Element)?.closest('[data-section-tab]');
  if(!tab)return;
  const index=tabs.indexOf(tab as HTMLAnchorElement);
  const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key===' '?index:-1;
  if(next<0)return;
  event.preventDefault();select(next,{history:true,focus:true});
 }
 const ownsGesture=(target:EventTarget|null)=>target instanceof Element&&!!target.closest('input,textarea,select,button,summary,[contenteditable],dialog,.section-tabbar,.image-deck-stage,.image-deck-controls,.reel-track,.journey-index,.skill-domain-index,.project-directory nav');
 function wheel(event:WheelEvent){
  cancelRestore();
  if(event.ctrlKey||event.shiftKey||ownsGesture(event.target)||(event.target as Element)?.closest('.creator-header,.mobile-nav'))return;
  if(Math.abs(event.deltaX)<=Math.abs(event.deltaY)*1.2){
   horizontalIntent.reset(active);
   cancelEntrances();
   const direction=Math.sign(event.deltaY),now=performance.now();
   if(!direction||!canAdvance(direction)){edgeDistance=0;edgeDirection=0;return;}
   event.preventDefault();
   if(direction!==edgeDirection||now-edgeTime>220)edgeDistance=0;
   edgeTime=now;edgeDirection=direction;
   edgeDistance+=Math.abs(event.deltaY)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
   if(edgeDistance>=64){edgeDistance=0;edgeDirection=0;advance(direction);}
   return;
  }
  edgeDistance=0;edgeDirection=0;
  event.preventDefault();
  const delta=event.deltaX*(event.deltaMode===1?16:event.deltaMode===2?innerWidth:1);
  const destination=horizontalIntent.destination(delta,performance.now(),active,innerWidth,panels.length);
  if(destination!==active)select(destination,{history:true,wheelGesture:true});
 }
 function touchStart(event:TouchEvent){
  cancelRestore();
  horizontalIntent.reset(active);edgeDistance=0;edgeDirection=0;
  if(event.touches.length!==1){touch=null;return;}
  if(!(event.target as Element)?.closest('.section-panels,.site-footer')){touch=null;return;}
  const point=event.touches[0];touch={x:point.clientX,y:point.clientY,width:innerWidth,horizontal:false,vertical:false,edgeStart:canAdvance(1)?1:canAdvance(-1)?-1:0,ignore:ownsGesture(event.target)};
  cancelEntrances();
 }
 function touchMove(event:TouchEvent){
  if(!touch||touch.ignore||event.touches.length!==1)return;
  const dx=event.touches[0].clientX-touch.x,dy=event.touches[0].clientY-touch.y;
  if(!touch.horizontal&&Math.abs(dy)>16&&Math.abs(dy)>Math.abs(dx))touch.vertical=true;
  if(touch.vertical){
   if(touch.edgeStart===-Math.sign(dy)&&event.cancelable)event.preventDefault();
   return;
  }
  if(Math.abs(dx)>16&&Math.abs(dx)>Math.abs(dy)*1.25)touch.horizontal=true;
  if(touch.horizontal&&event.cancelable)event.preventDefault();
 }
 function touchEnd(event:TouchEvent){
  const gesture=touch;touch=null;
  if(!gesture||gesture.ignore||!event.changedTouches[0])return;
  const dy=event.changedTouches[0].clientY-gesture.y;
  if(gesture.vertical){
   const direction=-Math.sign(dy);
   if(Math.abs(dy)>=64&&direction===gesture.edgeStart&&canAdvance(direction))advance(direction);
   return;
  }
  if(!gesture.horizontal)return;
  const dx=event.changedTouches[0].clientX-gesture.x;
  if(Math.abs(dx)<48)return;
  const steps=Math.max(1,Math.round(Math.abs(dx)/(gesture.width*.55)));
  select(active+(dx<0?steps:-steps),{history:true});
 }
 function touchCancel(){touch=null;}
 function boundaryKey(event:KeyboardEvent){
  if(event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||(event.target as Element)?.closest('input,textarea,select,button,summary,[contenteditable],dialog,.image-deck-stage,.reel-track'))return;
  if(event.shiftKey&&event.key!==' ')return;
  const direction=['PageDown','ArrowDown'].includes(event.key)||(event.key===' '&&!event.shiftKey)?1:['PageUp','ArrowUp'].includes(event.key)||(event.key===' '&&event.shiftKey)?-1:0;
  if(direction&&canAdvance(direction)){event.preventDefault();cancelRestore();advance(direction);}
 }
 function reveal(event:Event){
  const id=(event as CustomEvent<{id:string}>).detail?.id;
  const index=indexForTarget(id?document.getElementById(id):null);
  if(index>=0)select(index,{scroll:false,animate:false});
 }
 function hashChange(){const index=location.hash?indexForTarget(targetForHash()):0;if(index>=0)select(index,{scroll:false,animate:false});}
 function changedMotion(){if(stopped()){cancelEntrances();indicatorAnimation?.cancel();}}
 const motionObserver=new MutationObserver(changedMotion);
 motionObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 const geometry=new ResizeObserver(entries=>{maxY=Math.max(0,document.documentElement.scrollHeight-innerHeight);if(entries.some(entry=>entry.target===header||entry.target===bar))syncGeometry();});geometry.observe(header);geometry.observe(bar);geometry.observe(document.body);
 window.addEventListener('resize',syncGeometry,{passive:true});
 document.fonts?.ready.then(()=>{if(root.isConnected)syncGeometry();});
 tablist.setAttribute('role','tablist');
 tabs.forEach(tab=>tab.setAttribute('role','tab'));
 panels.forEach(panel=>panel.setAttribute('role','tabpanel'));
 document.documentElement.classList.add('sectioned');
 select(Math.max(0,indexForTarget(targetForHash())),{scroll:false,animate:false});
 root.addEventListener('click',click);
 tablist.addEventListener('keydown',keyboard);
 window.addEventListener('wheel',wheel,{passive:false});
 window.addEventListener('touchstart',touchStart,{passive:true});
 window.addEventListener('touchmove',touchMove,{passive:false});
 window.addEventListener('touchend',touchEnd,{passive:true});
 window.addEventListener('touchcancel',touchCancel,{passive:true});
 document.addEventListener('keydown',boundaryKey);
 document.addEventListener('portfolio:reveal-section',reveal);
 window.addEventListener('hashchange',hashChange);
 reduced.addEventListener('change',changedMotion);
 return ()=>{
  cancelEntrances();indicatorAnimation?.cancel();cancelAnimationFrame(restoreFrame);geometry.disconnect();motionObserver.disconnect();
  root.removeEventListener('click',click);tablist.removeEventListener('keydown',keyboard);
  window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchmove',touchMove);window.removeEventListener('touchend',touchEnd);window.removeEventListener('touchcancel',touchCancel);document.removeEventListener('keydown',boundaryKey);
  document.removeEventListener('portfolio:reveal-section',reveal);window.removeEventListener('hashchange',hashChange);reduced.removeEventListener('change',changedMotion);
  window.removeEventListener('resize',syncGeometry);
  document.documentElement.classList.remove('sectioned');
  panels.forEach(panel=>{panel.hidden=false;panel.inert=false;panel.removeAttribute('role');});
  tabs.forEach(tab=>{tab.tabIndex=0;tab.removeAttribute('role');tab.removeAttribute('aria-selected');});
  tablist.removeAttribute('role');
 };
}

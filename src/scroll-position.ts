// History navigation retains the reading position. An explicit refresh starts
// at the hero instead, including when the previous URL contained a fragment.
type Position = {version:1;hash:string;kind:string;id:string;offset:number;y:number};
const key='portfolioReadingPosition';
const navigation=performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined;
const reloading=navigation?.type==='reload';
const saved=history.state?.[key] as Position|undefined;
const restoring=navigation?.type==='back_forward'&&saved?.version===1&&saved.hash===location.hash&&Number.isFinite(saved.y)&&Number.isFinite(saved.offset);
if(reloading||restoring)history.scrollRestoration='manual';
if(reloading){
 const state={...history.state};delete state[key];
 // replaceState avoids adding a history entry or firing a fragment navigation.
 history.replaceState(state,'',location.pathname+location.search);
 scrollTo({top:0,left:0,behavior:'instant'});
}

export function flowTop(element:HTMLElement){
 let top=0;
 for(let node:HTMLElement|null=element;node;node=node.offsetParent as HTMLElement|null)top+=node.offsetTop;
 return top;
}

// Resolve sticky cards against their flow markers, rather than the pile's
// current screen position. Chapter links finish the introduction's zoom.
export function navigateToFragment(target:HTMLElement,behavior:ScrollBehavior='instant'){
 const card=target.closest<HTMLElement>('.creator-project.project');
 const marker=card?.previousElementSibling as HTMLElement|null;
 const stage=target.closest<HTMLElement>('.chapter-stage')||target.querySelector<HTMLElement>('.chapter-stage');
 const track=stage?.parentElement?.classList.contains('chapter-track')?stage.parentElement:null;
 const header=document.querySelector('header')?.offsetHeight||80;
 const top=target.id==='home'||target.id==='main'?0:marker?.classList.contains('project-marker')?flowTop(marker)-header-16:track?flowTop(track)-header+parseFloat(track.style.getPropertyValue('--chapter-travel')||'0'):flowTop(target)-header-16;
 target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
 scrollTo({top:Math.max(0,top),behavior});
}

function fragmentTarget(hash:string){
 try{return document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return null;}
}

function anchors(){
 const hero=document.querySelector<HTMLElement>('.creator-hero-stage');
 const result=hero?[{element:hero,kind:'hero',id:'home'}]:[];
 document.querySelectorAll<HTMLElement>('main section[id]:not(#home)').forEach(element=>result.push({element,kind:'section',id:element.id}));
 document.querySelectorAll<HTMLElement>('.chapter-track').forEach(element=>{
  const id=element.querySelector<HTMLElement>('.chapter-stage')?.dataset.chapter;
  if(id)result.push({element,kind:'chapter',id});
 });
 document.querySelectorAll<HTMLElement>('.creator-project.project[id]').forEach(card=>{
  // Sticky cards' visual positions cannot be used to recover their flow position.
  const marker=card.previousElementSibling as HTMLElement|null;
  if(marker?.classList.contains('project-marker'))result.push({element:marker,kind:'card',id:card.id});
 });
 return result;
}

export function restoreReadingPosition(measure:()=>void){
 let cancelled=false,ready=false;
 let geometryDirty=true,header=80,cachedAnchors:{kind:string;id:string;top:number}[]=[];
 const invalidate=()=>{geometryDirty=true;};
 const geometry=new ResizeObserver(invalidate);
 const main=document.querySelector('main');if(main)geometry.observe(main);
 addEventListener('resize',invalidate,{passive:true});
 document.addEventListener('toggle',invalidate,true);
 new MutationObserver(invalidate).observe(document.documentElement,{attributes:true,attributeFilter:['lang','class']});
 function cacheGeometry(){
  header=document.querySelector('header')?.offsetHeight||80;
  cachedAnchors=anchors().map(item=>({kind:item.kind,id:item.id,top:flowTop(item.element)}));
  geometryDirty=false;
 }
 const initialHash=location.hash;
 const cancel=()=>{cancelled=true;};
 const inputs=['pointerdown','touchstart','wheel','keydown'] as const;
 inputs.forEach(type=>addEventListener(type,cancel,{once:true,passive:true,capture:true}));
 addEventListener('hashchange',cancel,{once:true});
 function finish(){
  ready=true;history.scrollRestoration='auto';
  cacheGeometry();
  inputs.forEach(type=>removeEventListener(type,cancel,true));
  removeEventListener('hashchange',cancel);
 }
 function remember(){
  if(!ready)return;
  if(geometryDirty)cacheGeometry();
  const y=scrollY,limit=y+header;
  let anchor:{kind:string;id:string;top:number}|undefined;
  for(const item of cachedAnchors){
   if(item.top<=limit&&(!anchor||item.top>anchor.top))anchor=item;
  }
  const position:Position={version:1,hash:location.hash,kind:anchor?.kind||'hero',id:anchor?.id||'home',offset:y-(anchor?.top||0),y};
  try{history.replaceState({...history.state,[key]:position},'');}catch{/* Reading still works if the browser disallows history writes. */}
 }
 // Some mobile browsers discard history changes made during pagehide. Save
 // during reading too, at most twice a second plus the end of each gesture.
 let saveTimer=0,checkpoint=0,lastSave=0;
 addEventListener('scroll',()=>{
  clearTimeout(saveTimer);
  const now=performance.now();
  // History writes run after the input event, without walking the layout tree
  // during every gesture. Cached semantic anchors still survive mobile reloads.
  if(now-lastSave>500&&!checkpoint){checkpoint=window.setTimeout(()=>{checkpoint=0;remember();lastSave=performance.now();},0);}
  saveTimer=window.setTimeout(remember,120);
 },{passive:true});
 addEventListener('pagehide',remember);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)remember();});

 // Same-document fragment scrolling also uses sticky rectangles. On history
 // navigation, keep the saved reading position; for a new hash use flow geometry.
 addEventListener('hashchange',()=>{
  if(!ready)return;
  measure();
  const position=history.state?.[key] as Position|undefined;
  if(position?.version===1&&position.hash===location.hash&&Number.isFinite(position.offset)&&Number.isFinite(position.y)){
   const anchor=anchors().find(item=>item.kind===position.kind&&item.id===position.id);
   scrollTo({top:anchor?flowTop(anchor.element)+position.offset:position.y,behavior:'instant'});
  }else{
   const target=fragmentTarget(location.hash);
   if(target)navigateToFragment(target);
  }
 });

 // Fonts, translation, chapter spacers and card pin points must settle before
 // restoring. A bounded stability check avoids arbitrary delayed scroll jumps.
 Promise.all([document.fonts?.ready,document.readyState==='complete'?Promise.resolve():new Promise<void>(resolve=>addEventListener('load',()=>resolve(),{once:true}))]).then(()=>{
  let previous='',stable=0;
  const deadline=performance.now()+1200;
  function settle(){
   measure();
   const geometry=`${document.documentElement.scrollHeight}:${innerWidth}:${innerHeight}`;
   stable=geometry===previous?stable+1:0;previous=geometry;
   if(!cancelled&&stable<2&&performance.now()<deadline){requestAnimationFrame(settle);return;}
   if(!cancelled&&location.hash===initialHash){
    if(reloading){
     scrollTo({top:0,left:0,behavior:'instant'});
    }else if(restoring&&saved){
     const anchor=anchors().find(item=>item.kind===saved.kind&&item.id===saved.id);
     scrollTo({top:anchor?flowTop(anchor.element)+saved.offset:saved.y,behavior:'instant'});
    }else if(initialHash){
     const target=fragmentTarget(initialHash);
     if(target)navigateToFragment(target);
    }
   }
   finish();measure();dispatchEvent(new Event('scroll'));
  }
  requestAnimationFrame(settle);
 });
}

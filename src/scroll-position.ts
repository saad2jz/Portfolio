// Keep a reading position in the current history entry, rather than treating
// its (possibly old) fragment as a new navigation every time the page reloads.
type Position = {version:1;hash:string;kind:string;id:string;offset:number;y:number};
const key='portfolioReadingPosition';
const navigation=performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming|undefined;
const saved=history.state?.[key] as Position|undefined;
const restoring=(navigation?.type==='reload'||navigation?.type==='back_forward')&&saved?.version===1&&saved.hash===location.hash&&Number.isFinite(saved.y)&&Number.isFinite(saved.offset);
if(restoring)history.scrollRestoration='manual';

export function flowTop(element:HTMLElement){
 let top=0;
 for(let node:HTMLElement|null=element;node;node=node.offsetParent as HTMLElement|null)top+=node.offsetTop;
 return top;
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
 const initialHash=location.hash;
 const cancel=()=>{cancelled=true;};
 const inputs=['pointerdown','touchstart','wheel','keydown'] as const;
 inputs.forEach(type=>addEventListener(type,cancel,{once:true,passive:true,capture:true}));
 addEventListener('hashchange',cancel,{once:true});
 function finish(){
  ready=true;history.scrollRestoration='auto';
  inputs.forEach(type=>removeEventListener(type,cancel,true));
  removeEventListener('hashchange',cancel);
 }
 function remember(){
  if(!ready)return;
  const y=scrollY,limit=y+(document.querySelector('header')?.offsetHeight||80);
  let anchor:{kind:string;id:string;top:number}|undefined;
  for(const item of anchors()){
   const top=flowTop(item.element);
   if(top<=limit&&(!anchor||top>anchor.top))anchor={kind:item.kind,id:item.id,top};
  }
  const position:Position={version:1,hash:location.hash,kind:anchor?.kind||'hero',id:anchor?.id||'home',offset:y-(anchor?.top||0),y};
  try{history.replaceState({...history.state,[key]:position},'');}catch{/* Reading still works if the browser disallows history writes. */}
 }
 // Some mobile browsers discard history changes made during pagehide. Save
 // during reading too, at most twice a second plus the end of each gesture.
 let saveTimer=0,lastSave=0;
 addEventListener('scroll',()=>{
  clearTimeout(saveTimer);
  const now=performance.now();
  if(now-lastSave>500){remember();lastSave=now;}
  saveTimer=window.setTimeout(remember,120);
 },{passive:true});
 addEventListener('pagehide',remember);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)remember();});

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
    if(restoring&&saved){
     const anchor=anchors().find(item=>item.kind===saved.kind&&item.id===saved.id);
     scrollTo({top:anchor?flowTop(anchor.element)+saved.offset:saved.y,behavior:'instant'});
    }else if(initialHash){
     let id='';try{id=decodeURIComponent(initialHash.slice(1));}catch{/* Ignore malformed fragments. */}
     const target=document.getElementById(id);
     if(target){
      const card=target.closest<HTMLElement>('.creator-project.project');
      const marker=card?.previousElementSibling as HTMLElement|null;
      const stage=target.closest<HTMLElement>('.chapter-stage')||target.querySelector<HTMLElement>('.chapter-stage');
      const track=stage?.parentElement?.classList.contains('chapter-track')?stage.parentElement:null;
      const header=document.querySelector('header')?.offsetHeight||80;
      const top=id==='home'||id==='main'?0:marker?.classList.contains('project-marker')?flowTop(marker)-header-16:track?flowTop(track)-header+parseFloat(track.style.getPropertyValue('--chapter-travel')||'0'):flowTop(target)-header-16;
      scrollTo({top,behavior:'instant'});
      target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
     }
    }
   }
   finish();measure();dispatchEvent(new Event('scroll'));
  }
  requestAnimationFrame(settle);
 });
}

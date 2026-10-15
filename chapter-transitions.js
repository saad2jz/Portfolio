import {restoreReadingPosition} from './src/scroll-position';
import {createCardStacks} from './project-layout';

// Finish the current chapter with a zoom, then grow the next chapter's title.
// Never transform an ancestor of the sticky card stacks.
// Layout offsets are cached: scroll frames only update the visible scenes.
(() => {
 const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const definitions=[
  ['about','#about-title','.about-title-reveal','mint',true],
  ['expertise','#services-title','.services-heading','forest'],
  ['skills','#skills-title','.extension-heading','blue'],
  ['approach','#method-title','.extension-heading','violet'],
  ['projects','#work-title','.creator-work-heading','mint'],
  ['commerce','#entrepreneurship-title','.creator-work-heading','amber'],
  ['career','#journey-title','.creator-work-heading','blue'],
  ['education','#education-heading','.journey-group-header','violet'],
  ['certifications','#certifications-heading','.journey-group-header','mint'],
  ['international','#international-title','.extension-heading','blue'],
  ['beyond','#beyond-title','.extension-heading','amber'],
  ['contact','#contact-title','.contact-heading','mint']
 ];
 const exits={
  expertise:['#selected-work','nav','mint'],
  skills:['#services','.services-list > div:last-of-type','forest'],
  approach:['#skills','.skill-card:last-of-type','blue'],
  projects:['#method','.method-steps > li:last-child','violet'],
  commerce:['#work','.creator-project:last-of-type','mint'],
  career:['#entrepreneurship','.entrepreneurship-card','amber'],
  education:['#professional-experience','.creator-project:last-of-type','blue'],
  certifications:['#education','.creator-project:last-of-type','violet'],
  international:['#certifications','.creator-project:last-of-type','mint'],
  beyond:['#international','.language-cards > div:last-child','blue'],
  contact:['#beyond','.travel-panel','amber']
 };
 const colors={mint:'139,197,178',forest:'55,105,77',blue:'119,166,208',violet:'164,145,207',amber:'203,162,108'};
 const scenes=definitions.flatMap(([name,selector,container,tone,hero])=>{
  const title=document.querySelector(selector);
  const stage=title&&(container?title.closest(container):title.parentElement);
  if(!stage)return [];
  stage.classList.add('chapter-stage');stage.dataset.chapter=name;stage.dataset.chapterTone=tone;
  if(hero)stage.dataset.chapterHero='true';else title.classList.add('chapter-zoom-title');
  // Pin only the chapter introduction, never an ancestor of the long card stacks.
  let track=stage.parentElement?.classList.contains('chapter-track')?stage.parentElement:null;
  if(!hero){
   if(!track){track=document.createElement('div');track.className='chapter-track';stage.before(track);track.append(stage);}
  }
  const exit=exits[name],source=exit&&document.querySelector(exit[0]),surface=source?.querySelector(exit[1]);
  if(surface){
   surface.classList.add('chapter-exit-surface');
   stage.dataset.chapterFrom=source.id;
  }
  return [{title,stage,track,surface,exitColor:exit&&colors[exit[2]],top:0,travel:0,previous:-1,previousExit:-1,hero:!!hero}];
 });
 // One viewport-sized, clipped layer carries the outgoing palette across the
 // boundary. Vector rings stay sharp and add no height or pointer/focus target.
 const departure=document.createElement('div');departure.className='chapter-departure-art';departure.setAttribute('aria-hidden','true');departure.hidden=true;
 for(let i=0;i<3;i++)departure.append(document.createElement('i'));
 document.body.append(departure);
 // svh keeps sticky geometry stable when a phone's browser bars open/close.
 const viewportProbe=document.createElement('div');viewportProbe.className='motion-viewport-probe';viewportProbe.setAttribute('aria-hidden','true');document.body.append(viewportProbe);
 let frame=0,dirty=true,viewport=innerHeight,maxScroll=0,headerHeight=92,motionY=scrollY,lastStamp=0;
 const coarse=matchMedia('(pointer:coarse)');
 const stacks=createCardStacks(invalidate);
 const paused=()=>reduced.matches||root.classList.contains('motion-paused');
 const clamp=n=>Math.max(0,Math.min(1,n));
 const ease=n=>n*n*(3-2*n);
 function measure(){
  viewport=viewportProbe.offsetHeight||innerHeight;headerHeight=document.querySelector('header').offsetHeight;
  // Read geometry as a batch; changing custom properties follows the reads.
  const geometry=scenes.map(scene=>({scene,height:scene.stage.offsetHeight}));
  for(const {scene,height} of geometry){
   // An introduction taller than the available viewport must stay in flow.
   // Keep the same geometry when animations pause: preferences never move text.
   const fits=height<viewport-headerHeight-24;
   scene.travel=scene.hero||!fits?0:innerWidth<=760?Math.min(80,viewport*.1):Math.min(160,viewport*.2);
   scene.stage.dataset.chapterFits=fits?'true':'false';
   scene.stage.style.setProperty('--chapter-header-height',`${headerHeight}px`);
   if(scene.track)scene.track.style.setProperty('--chapter-travel',`${scene.travel}px`);
  }
  departure.style.setProperty('--chapter-header-height',`${headerHeight}px`);
  // Card handoff spacing can move later chapters. Finish those writes before
  // caching any flow positions so one measurement describes one stable layout.
  const layoutTop=stacks.measure(viewport,headerHeight,innerWidth);
  maxScroll=Math.max(0,document.documentElement.scrollHeight-viewport);
  for(const scene of scenes)scene.top=layoutTop(scene.track||scene.title);
  dirty=false;
 }
 function paint(stamp){
  frame=0;if(document.hidden)return;
  const changed=dirty;if(changed)measure();
  const actualY=scrollY,stop=paused();let activeExit=null;
  // Native scroll owns the page. Only the visual progress is damped: wheel
  // notches become a continuous zoom, while touch keeps a shorter response.
  // Geometry changes, anchors and large jumps settle immediately.
  const delta=actualY-motionY,dt=lastStamp?Math.min(64,stamp-lastStamp):16.67;
  lastStamp=stamp;
  if(stop||changed||Math.abs(delta)>viewport*.75||Math.abs(delta)<.15)motionY=actualY;
  else motionY+=delta*(1-Math.exp(-dt/(coarse.matches?32:70)));
  const y=motionY;stacks.paint(y,stop,innerWidth);
  for(const scene of scenes){
   // The outgoing zoom starts only when the end of the previous chapter is
   // entering the viewport. Cross-fade into the pinned title reveal.
   const exitStart=scene.top-headerHeight-viewport*.9,exitEnd=scene.top-headerHeight-viewport*.08;
   const exitRaw=stop?0:clamp((y-exitStart)/Math.max(1,exitEnd-exitStart)),exitProgress=ease(exitRaw);
   if(scene.surface&&!stop&&exitRaw>0&&exitRaw<1)activeExit={scene,progress:exitProgress,visibility:ease(clamp(exitRaw/.28))*(1-ease(clamp((exitRaw-.52)/.48)))};
   if(scene.surface){
    const exiting=!stop&&exitRaw>0&&exitRaw<1?'true':'false';
    if(scene.surface.dataset.chapterExiting!==exiting)scene.surface.dataset.chapterExiting=exiting;
   }
   if(scene.surface&&Math.abs(exitProgress-scene.previousExit)>=.0005){
    scene.previousExit=exitProgress;
    scene.surface.style.setProperty('--chapter-exit-progress',exitProgress.toFixed(4));
    scene.stage.style.setProperty('--chapter-exit-progress',exitProgress.toFixed(4));
    const visibility=ease(clamp(exitRaw/.28))*(1-ease(clamp((exitRaw-.52)/.48)));
    scene.stage.style.setProperty('--chapter-exit-visibility',visibility.toFixed(4));
   }
   const start=scene.hero?scene.top-viewport*.88:scene.top-viewport*.85,end=Math.min(maxScroll,scene.hero?scene.top-viewport*.27:scene.top-headerHeight+scene.travel*.6);
   const raw=stop?1:clamp((y-start)/Math.max(1,end-start));
   // Smoothstep stays attached to the scroll position in both directions.
   const progress=ease(raw);
   // The title grows where it is in the document. Moving it up by a viewport
   // covered the preceding chapter and made sections appear to skip and return.
   const active=!stop&&raw>0&&raw<1?'true':'false';
   if(scene.stage.dataset.chapterActive!==active)scene.stage.dataset.chapterActive=active;
   if(Math.abs(progress-scene.previous)<.0005)continue;
   scene.previous=progress;
   scene.stage.style.setProperty('--chapter-progress',progress.toFixed(4));
  }
  departure.hidden=!activeExit;
  if(activeExit){
   departure.dataset.chapterFrom=activeExit.scene.stage.dataset.chapterFrom;
   departure.style.setProperty('--chapter-exit-rgb',activeExit.scene.exitColor);
   departure.style.setProperty('--departure-progress',activeExit.progress.toFixed(4));
   departure.style.setProperty('--chapter-exit-visibility',activeExit.visibility.toFixed(4));
  }
  // Continue only the short easing tail, never an idle whole-page loop.
  // Finish even when a reversal enters a scene from its fully settled side.
  if(!stop&&Math.abs(actualY-motionY)>=.15)schedule();
  else {motionY=actualY;lastStamp=0;}
 }
 function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(paint);}
 function invalidate(){dirty=true;schedule();}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',invalidate,{passive:true});
 document.addEventListener('toggle',invalidate,true);
 document.addEventListener('visibilitychange',()=>{motionY=scrollY;lastStamp=0;schedule();});
 reduced.addEventListener('change',invalidate);
 new MutationObserver(invalidate).observe(root,{attributes:true,attributeFilter:['lang','class']});
 const resize=new ResizeObserver(invalidate);
 const main=document.querySelector('main');if(main)resize.observe(main);
 for(const scene of scenes)resize.observe(scene.stage);
 document.fonts?.ready.then(invalidate);
 addEventListener('pageshow',invalidate);
 invalidate();
 restoreReadingPosition(measure);
})();

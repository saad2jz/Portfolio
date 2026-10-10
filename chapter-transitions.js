import {restoreReadingPosition} from './src/scroll-position';

// Finish the current chapter with a zoom, then grow the next chapter's title.
// Never transform an ancestor of the sticky card stacks.
// Layout offsets are cached: scroll frames only update the visible scenes.
(() => {
 const root=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const definitions=[
  ['about','#about-title','.about-title-reveal','mint',true],
  ['expertise','#services-title',null,'forest'],
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
  expertise:['#about','.about-content','mint'],
  skills:['#services','.services-list','forest'],
  approach:['#skills','.skill-card:last-of-type','blue'],
  projects:['#method','.method-steps','violet'],
  commerce:['#work','.creator-project:last-of-type','mint'],
  career:['#entrepreneurship','.entrepreneurship-card','amber'],
  education:['#professional-experience','.creator-project:last-of-type','blue'],
  certifications:['#education','.creator-project:last-of-type','violet'],
  international:['#certifications','.creator-project:last-of-type','mint'],
  beyond:['#international','.language-cards','blue'],
  contact:['#beyond','.interest-cards','amber']
 };
 const colors={mint:'139,197,178',forest:'55,105,77',blue:'119,166,208',violet:'164,145,207',amber:'203,162,108'};
 const scenes=definitions.flatMap(([name,selector,container,tone,hero])=>{
  const title=document.querySelector(selector);
  const stage=title&&(container?title.closest(container):title.parentElement);
  if(!stage)return [];
  stage.classList.add('chapter-stage');stage.dataset.chapter=name;stage.dataset.chapterTone=tone;
  if(hero)stage.dataset.chapterHero='true';else title.classList.add('chapter-zoom-title');
  // Pin only the chapter introduction, never an ancestor of the long card stacks.
  let track=null;
  if(!hero){track=document.createElement('div');track.className='chapter-track';stage.before(track);track.append(stage);}
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
 let frame=0,dirty=true,viewport=innerHeight,maxScroll=0,headerHeight=92;
 const paused=()=>reduced.matches||root.classList.contains('motion-paused');
 const clamp=n=>Math.max(0,Math.min(1,n));
 const ease=n=>n*n*(3-2*n);
 function layoutTop(element){let top=0;for(let node=element;node;node=node.offsetParent)top+=node.offsetTop;return top;}
 function measure(){
  viewport=innerHeight;headerHeight=document.querySelector('header').offsetHeight;
  // Read geometry as a batch; changing custom properties follows the reads.
  const geometry=scenes.map(scene=>({scene,height:scene.stage.offsetHeight}));
  for(const {scene,height} of geometry){
   scene.travel=scene.hero||paused()?0:Math.min(320,viewport*.45);
   if(scene.track){scene.track.style.setProperty('--chapter-height',`${height}px`);scene.track.style.setProperty('--chapter-travel',`${scene.travel}px`);}
  }
  departure.style.setProperty('--chapter-header-height',`${headerHeight}px`);
  maxScroll=Math.max(0,document.documentElement.scrollHeight-viewport);
  for(const scene of scenes)scene.top=layoutTop(scene.track||scene.title);
  dirty=false;
 }
 function paint(){
  frame=0;if(document.hidden)return;
  if(dirty)measure();
  const y=scrollY,stop=paused();let activeExit=null;
  for(const scene of scenes){
   // The outgoing zoom starts only when the end of the previous chapter is
   // entering the viewport. Cross-fade the latter half into the title reveal.
   const exitStart=scene.top-headerHeight-viewport*.9,exitEnd=scene.top-headerHeight-viewport*.08;
   const exitRaw=stop?0:clamp((y-exitStart)/Math.max(1,exitEnd-exitStart)),exitProgress=ease(exitRaw);
   if(scene.surface&&!stop&&exitRaw>0&&exitRaw<1)activeExit={scene,progress:exitProgress,visibility:ease(clamp(exitRaw/.28))*(1-ease(clamp((exitRaw-.52)/.48)))};
   if(scene.surface&&Math.abs(exitProgress-scene.previousExit)>=.0005){
    scene.previousExit=exitProgress;
    scene.surface.style.setProperty('--chapter-exit-progress',exitProgress.toFixed(4));
    scene.surface.dataset.chapterExiting=!stop&&exitRaw>0&&exitRaw<1?'true':'false';
    scene.stage.style.setProperty('--chapter-exit-progress',exitProgress.toFixed(4));
    const visibility=ease(clamp(exitRaw/.28))*(1-ease(clamp((exitRaw-.52)/.48)));
    scene.stage.style.setProperty('--chapter-exit-visibility',visibility.toFixed(4));
   }
   const start=scene.hero?scene.top-viewport*.88:scene.surface?exitStart+(exitEnd-exitStart)*.55:scene.top-headerHeight-viewport*.35,end=Math.min(maxScroll,scene.hero?scene.top-viewport*.27:scene.top-headerHeight+scene.travel);
   const raw=stop?1:clamp((y-start)/Math.max(1,end-start));
   // Smoothstep stays attached to the scroll position in both directions.
   const progress=ease(raw);
   if(Math.abs(progress-scene.previous)<.0005)continue;
   scene.previous=progress;
   scene.stage.style.setProperty('--chapter-progress',progress.toFixed(4));
   scene.stage.dataset.chapterActive=!stop&&raw>0&&raw<1?'true':'false';
  }
  departure.hidden=!activeExit;
  if(activeExit){
   departure.dataset.chapterFrom=activeExit.scene.stage.dataset.chapterFrom;
   departure.style.setProperty('--chapter-exit-rgb',activeExit.scene.exitColor);
   departure.style.setProperty('--chapter-exit-progress',activeExit.progress.toFixed(4));
   departure.style.setProperty('--chapter-exit-visibility',activeExit.visibility.toFixed(4));
  }
 }
 function schedule(){if(!frame&&!document.hidden)frame=requestAnimationFrame(paint);}
 function invalidate(){dirty=true;schedule();}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',invalidate,{passive:true});
 document.addEventListener('toggle',invalidate,true);
 document.addEventListener('visibilitychange',schedule);
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

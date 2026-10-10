// Zoom the chapter entrances, never the ancestors of sticky project cards.
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
 const scenes=definitions.flatMap(([name,selector,container,tone,hero])=>{
  const title=document.querySelector(selector);
  const stage=title&&(container?title.closest(container):title.parentElement);
  if(!stage)return [];
  stage.classList.add('chapter-stage');stage.dataset.chapter=name;stage.dataset.chapterTone=tone;
  if(hero)stage.dataset.chapterHero='true';else title.classList.add('chapter-zoom-title');
  // Pin only the chapter introduction, never an ancestor of the long card stacks.
  let track=null;
  if(!hero){track=document.createElement('div');track.className='chapter-track';stage.before(track);track.append(stage);}
  return [{title,stage,track,top:0,travel:0,previous:-1,hero:!!hero}];
 });
 let frame=0,dirty=true,viewport=innerHeight,maxScroll=0,headerHeight=92;
 const paused=()=>reduced.matches||root.classList.contains('motion-paused');
 const clamp=n=>Math.max(0,Math.min(1,n));
 function layoutTop(element){let top=0;for(let node=element;node;node=node.offsetParent)top+=node.offsetTop;return top;}
 function measure(){
  viewport=innerHeight;headerHeight=document.querySelector('header').offsetHeight;
  // Read geometry as a batch; changing custom properties follows the reads.
  const geometry=scenes.map(scene=>({scene,height:scene.stage.offsetHeight}));
  for(const {scene,height} of geometry){
   scene.travel=scene.hero||paused()?0:Math.min(320,viewport*.45);
   if(scene.track){scene.track.style.setProperty('--chapter-height',`${height}px`);scene.track.style.setProperty('--chapter-travel',`${scene.travel}px`);}
  }
  maxScroll=Math.max(0,document.documentElement.scrollHeight-viewport);
  for(const scene of scenes)scene.top=layoutTop(scene.track||scene.title);
  dirty=false;
 }
 function paint(){
  frame=0;if(document.hidden)return;
  if(dirty)measure();
  const y=scrollY,stop=paused();
  for(const scene of scenes){
   const start=scene.hero?scene.top-viewport*.88:scene.top-headerHeight-viewport*.35,end=Math.min(maxScroll,scene.hero?scene.top-viewport*.27:scene.top-headerHeight+scene.travel);
   const raw=stop?1:clamp((y-start)/Math.max(1,end-start));
   // Smoothstep stays attached to the scroll position in both directions.
   const progress=raw*raw*(3-2*raw);
   if(Math.abs(progress-scene.previous)<.0005)continue;
   scene.previous=progress;
   scene.stage.style.setProperty('--chapter-progress',progress.toFixed(4));
   scene.stage.dataset.chapterActive=!stop&&raw>0&&raw<1?'true':'false';
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
})();

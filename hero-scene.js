'use strict';

// DOM input stays on the page; shader compilation and rendering use a worker.
(() => {
  const hero=document.querySelector('.hero'),stage=document.querySelector('.hero-stage');
  const canvas=document.getElementById('hero-canvas'),art=document.querySelector('.hero-art');
  const control=document.querySelector('.motion-toggle'),root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(pointer: fine)');
  const cursorX=document.getElementById('cursor-x'),cursorY=document.getElementById('cursor-y'),scrollPosition=document.getElementById('scroll-position');
  let paused=false;try{paused=localStorage.getItem('portfolio-motion-paused')==='true';}catch{}
  // ResizeObserver supplies exact layout dimensions before the deferred renderer starts.
  const creator=hero.classList.contains('creator-hero');
  // Allocate for the peak CSS zoom once, instead of resizing GPU buffers while scrolling.
  const peakScale=()=>creator?(innerWidth<=760?1.5:1.75):1;
  const model={width:1,height:1,dpr:devicePixelRatio||1,renderScale:peakScale(),lowPower:navigator.connection?.saveData===true||(navigator.deviceMemory&&navigator.deviceMemory<=4),paused,reduced:reduced.matches,hidden:document.hidden,visible:true,scroll:0,logoAtlasURL:new URL(art.dataset.logoAtlas,document.baseURI).href};
  let resolveDimensions;
  const dimensionsReady=new Promise(resolve=>{resolveDimensions=resolve;});
  let renderer=null,worker=null,ready=false,lost=false,scheduled=0,sequence=0,lastPointer=null;
  const pending=new Map();
  control.dataset.scenePending='true';control.setAttribute('aria-pressed',String(paused||reduced.matches));

  function send(message){if(worker)worker.postMessage(message);else if(renderer){if(message.type==='resize')renderer.resize(message.model);renderer.update(message.model);}}
  function flush(){
    scheduled=0;if(lost)return;
    // Measure only on input/scroll/resize, never in the renderer's animation loop.
    // Canvas-local coordinates remain correct through the sticky CSS zoom.
    if(!model.visible&&ready)return;
    const bounds=(!creator||model.pointerActive)?canvas.getBoundingClientRect():null;
    const scale=creator?peakScale():Math.max(1,Math.ceil((bounds.width/Math.max(1,model.width)-.001)*4)/4),qualityChanged=scale!==model.renderScale;
    model.renderScale=scale;
    if(lastPointer&&model.pointerActive){model.pointerX=(lastPointer.x-bounds.left)*model.width/Math.max(1,bounds.width);model.pointerY=(lastPointer.y-bounds.top)*model.height/Math.max(1,bounds.height);}
    send({type:qualityChanged?'resize':'update',model:{...model}});
    if(model.visible&&!document.hidden){if('pointerX' in model){cursorX.textContent=String(Math.round(model.pointerX));cursorY.textContent=String(Math.round(model.pointerY));}scrollPosition.textContent=String(Math.round(scrollY));}
  }
  function schedule(){if(!scheduled)scheduled=requestAnimationFrame(flush);}
  function progress(){if(creator){if(model.pointerActive&&model.visible&&!paused&&!reduced.matches)schedule();return;}const bounds=stage.getBoundingClientRect();// Only an active pointer needs new canvas-local coordinates during the React zoom.
    const next=reduced.matches||lost||hero.classList.contains('creator-hero')?0:Math.max(0,Math.min(1,-bounds.top/Math.max(1,bounds.height-model.height)));if(next!==model.scroll)stage.style.setProperty('--scene-progress',String(next));model.scroll=next;schedule();}
  function label(){const fr=root.lang==='fr',stopped=paused||reduced.matches;control.disabled=reduced.matches;control.setAttribute('aria-pressed',String(stopped));control.classList.toggle('is-paused',stopped);control.setAttribute('aria-label',reduced.matches?(fr?'Animation désactivée : mouvement réduit':'Animation disabled: reduced motion'):stopped?(fr?'Reprendre les animations':'Resume animations'):(fr?'Mettre les animations en pause':'Pause animations'));control.title=control.getAttribute('aria-label');}
  function finish(){delete control.dataset.scenePending;control.hidden=false;label();document.dispatchEvent(new Event('hero-scene-ready'));}
  function fail(){if(lost)return;lost=true;ready=false;worker?.terminate();worker=null;for(const resolve of pending.values())resolve(null);pending.clear();art.classList.remove('scene-ready');stage.classList.remove('scene-active');stage.classList.add('scene-static');stage.style.removeProperty('--scene-progress');finish();}
  function activate(){if(lost)return;ready=true;art.classList.add('scene-ready');stage.classList.add('scene-active');stage.classList.remove('scene-static');progress();finish();performance.mark('portfolio-scene-ready');}

  // Inspection is pull-based; no per-frame messages or DOM writes are required.
  canvas.sceneController={
    get mode(){return worker?'worker':renderer?'main':'static';},
    inspect(){if(!ready)return Promise.resolve(null);if(!worker)return Promise.resolve(renderer.inspect());const id=++sequence;return new Promise(resolve=>{pending.set(id,resolve);worker.postMessage({type:'inspect',id});});},
    loseContext(){if(worker)worker.postMessage({type:'lose-context'});else renderer?.loseContext();}
  };
  control.addEventListener('click',()=>{paused=!paused;model.paused=paused;try{localStorage.setItem('portfolio-motion-paused',String(paused));}catch{}label();send({type:'update',model:{...model}});});
  new MutationObserver(label).observe(root,{attributes:true,attributeFilter:['lang']});
  addEventListener('pointermove',event=>{if(!model.visible||!fine.matches||paused||reduced.matches||lost)return;lastPointer={x:event.clientX,y:event.clientY};model.pointerActive=true;schedule();},{passive:true});
  hero.addEventListener('pointerleave',()=>{model.pointerActive=false;schedule();});
  addEventListener('scroll',progress,{passive:true});
  document.addEventListener('visibilitychange',()=>{model.hidden=document.hidden;send({type:'update',model:{...model}});});
  reduced.addEventListener('change',()=>{model.reduced=reduced.matches;progress();label();send({type:'update',model:{...model}});});
  new IntersectionObserver(entries=>{model.visible=entries[0].isIntersecting;send({type:'update',model:{...model}});schedule();},{threshold:.01}).observe(hero);
  new ResizeObserver(([entry])=>{model.width=entry.contentRect.width;model.height=entry.contentRect.height;model.dpr=devicePixelRatio||1;if(creator)model.renderScale=peakScale();resolveDimensions();progress();send({type:'resize',model:{...model}});}).observe(hero);
  addEventListener('pagehide',()=>{model.hidden=true;send({type:'update',model:{...model}});});
  addEventListener('pageshow',()=>{model.hidden=document.hidden;schedule();});
  requestAnimationFrame(()=>requestAnimationFrame(async()=>{
    try{
      await dimensionsReady;
      if(typeof Worker==='function'&&typeof canvas.transferControlToOffscreen==='function'){
        worker=new Worker(new URL('hero-worker.js',document.baseURI),{type:'module'});
        worker.addEventListener('error',event=>{event.preventDefault();fail();});
        worker.addEventListener('message',event=>{const data=event.data;if(data.type==='ready')activate();else if(data.type==='failed'||data.type==='lost')fail();else if(data.type==='inspection'){pending.get(data.id)?.(data.state);pending.delete(data.id);}});
        const offscreen=canvas.transferControlToOffscreen();worker.postMessage({type:'init',canvas:offscreen,model:{...model}},[offscreen]);
      }else{
        const {createRenderer}=await import(new URL('hero-renderer.js',document.baseURI).href);
        renderer=await createRenderer(canvas,model,fail);if(!renderer)throw Error('Scene unavailable');activate();
      }
    }catch{fail();}
  }));
})();

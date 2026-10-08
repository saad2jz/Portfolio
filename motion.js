'use strict';

// Scroll reveals and pointer depth. Semantic content stays visible without JS.
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer: fine)');
  const surfaces=[...document.querySelectorAll('.project>figure')];
  const active=new Set();
  const revealed=new WeakSet();
  function clearTilt(surface){surface.classList.remove('is-tilting');for(const key of ['--tilt-x','--tilt-y','--tilt-z'])surface.style.removeProperty(key);}
  for(const surface of surfaces){
    surface.addEventListener('pointermove',event=>{
      if(reduced.matches||!fine.matches)return;
      const rect=surface.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;
      surface.style.setProperty('--tilt-x',`${-y*10}deg`);surface.style.setProperty('--tilt-y',`${x*12}deg`);surface.style.setProperty('--tilt-z','12px');surface.classList.add('is-tilting');
    },{passive:true});
    surface.addEventListener('pointerleave',()=>clearTilt(surface));
    surface.addEventListener('focusout',()=>clearTilt(surface));
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting||reduced.matches||revealed.has(entry.target))continue;
      revealed.add(entry.target);
      const surface=entry.target.tagName==='FIGURE';
      const frames=surface?[{transform:'perspective(1200px) translate3d(0,48px,-70px) rotateX(8deg)',opacity:.65},{transform:'perspective(1200px) translate3d(0,0,0) rotateX(0deg)',opacity:1}]:[{transform:'translate3d(0,22px,0)',opacity:.65,filter:'blur(2px)'},{transform:'translate3d(0,0,0)',opacity:1,filter:'blur(0)'}];
      const animation=entry.target.animate(frames,{duration:surface?850:650,easing:'cubic-bezier(.2,.8,.2,1)'});active.add(animation);animation.finished.then(()=>active.delete(animation)).catch(()=>active.delete(animation));
    }
  },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  for(const element of document.querySelectorAll('.specialty h2,.section-heading,.project>figure,.lab-heading,.lab-card,.about-grid,.contact-heading'))observer.observe(element);
  reduced.addEventListener('change',()=>{if(reduced.matches){for(const animation of active)animation.cancel();active.clear();surfaces.forEach(clearTilt);}});
})();

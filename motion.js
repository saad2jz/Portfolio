'use strict';

// Scroll reveals and pointer depth. Semantic content stays visible without JS.
(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(pointer: fine)');
  const surfaces=[...document.querySelectorAll('.project>figure,.secours-stage,.lab-card-career .lab-capture')];
  surfaces.forEach(surface=>surface.classList.add('depth-surface'));
  const active=new Set();
  const revealed=new WeakSet();
  const pending=new Map();
  function clearTilt(surface){if(pending.has(surface)){cancelAnimationFrame(pending.get(surface));pending.delete(surface);}surface.classList.remove('is-tilting');for(const key of ['--tilt-x','--tilt-y','--tilt-z'])surface.style.removeProperty(key);}
  for(const surface of surfaces){
    let pointerX=0,pointerY=0;
    surface.addEventListener('pointermove',event=>{
      if(reduced.matches||document.documentElement.classList.contains('motion-paused')||!fine.matches)return;
      pointerX=event.clientX;pointerY=event.clientY;
      if(pending.has(surface))return;
      pending.set(surface,requestAnimationFrame(()=>{
        pending.delete(surface);
        const rect=surface.getBoundingClientRect(),x=(pointerX-rect.left)/rect.width-.5,y=(pointerY-rect.top)/rect.height-.5;
        surface.style.setProperty('--tilt-x',`${-y*10}deg`);surface.style.setProperty('--tilt-y',`${x*12}deg`);surface.style.setProperty('--tilt-z','12px');surface.classList.add('is-tilting');
      }));
    },{passive:true});
    surface.addEventListener('pointerleave',()=>clearTilt(surface));
    surface.addEventListener('focusout',()=>clearTilt(surface));
  }
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!entry.isIntersecting||reduced.matches||document.documentElement.classList.contains('motion-paused')||revealed.has(entry.target))continue;
      revealed.add(entry.target);
      const surface=entry.target.classList.contains('depth-surface');
      const frames=surface?[{transform:'perspective(1200px) translate3d(0,48px,-70px) rotateX(8deg)',opacity:.65},{transform:'perspective(1200px) translate3d(0,0,0) rotateX(0deg)',opacity:1}]:[{transform:'translate3d(0,22px,0)',opacity:.65,filter:'blur(2px)'},{transform:'translate3d(0,0,0)',opacity:1,filter:'blur(0)'}];
      const animation=entry.target.animate(frames,{duration:surface?850:650,easing:'cubic-bezier(.2,.8,.2,1)'});active.add(animation);animation.finished.then(()=>active.delete(animation)).catch(()=>active.delete(animation));
    }
  },{threshold:.12,rootMargin:'0px 0px -30px 0px'});
  for(const element of document.querySelectorAll('.project>figure,.lab-card,.about-grid,.timeline>div,.education-list>li'))observer.observe(element);
  new MutationObserver(()=>{if(document.documentElement.classList.contains('motion-paused')){for(const animation of active)animation.cancel();active.clear();surfaces.forEach(clearTilt);}}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change',()=>{if(reduced.matches){for(const animation of active)animation.cancel();active.clear();surfaces.forEach(clearTilt);}});
})();

// A single scheduled update keeps the reading ruler in sync with native scrolling.
(() => {
  let scheduled = false;
  const work = document.getElementById('work');
  const workLink = document.querySelector('.desktop-nav a[href="#work"]');
  function update() {
    scheduled = false;
    const distance = document.documentElement.scrollHeight - innerHeight;
    const rect = work.getBoundingClientRect();
    const current = rect.top < innerHeight * .45 && rect.bottom > 120;
    document.documentElement.style.setProperty('--reading-progress', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
    workLink.classList.toggle('is-current', current);
    if (current) workLink.setAttribute('aria-current', 'location'); else workLink.removeAttribute('aria-current');
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule, {passive: true});
  new ResizeObserver(schedule).observe(document.body);
  // The observer's initial delivery schedules the ruler after the first layout.
})();

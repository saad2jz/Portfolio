'use strict';

// Native horizontal overflow remains available with touch, keyboard, or no JavaScript.
(() => {
  const root=document.documentElement;
  const edge=8; // Ignore the gutter and subpixel visual overflow at either end.
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const stopped=()=>reduced.matches||root.classList.contains('motion-paused');
  const measurements=new WeakMap();
  // Reading slide offsets would force layout of otherwise skipped projects.
  // Only measure rails as they approach the viewport, and after a resize.
  const nearby=new IntersectionObserver(entries=>{
    for(const entry of entries){const observer=measurements.get(entry.target);if(entry.isIntersecting)observer.observe(entry.target);else observer.unobserve(entry.target);}
  },{rootMargin:'400px 0px'});
  for(const reel of document.querySelectorAll('.project-reel')) {
    const track=reel.querySelector('.reel-track');
    const slides=[...track.children];
    const previous=reel.querySelector('[data-direction="previous"]');
    const next=reel.querySelector('[data-direction="next"]');
    const count=reel.querySelector('.reel-count');
    let offsets=[],max=0,index=0,pending=false,wheelTimer=0,keyFocus=false;
    previous.disabled=true;
    count.textContent=`01 / ${String(slides.length).padStart(2,'0')}`;
    reel.querySelector('.reel-controls').hidden=false;
    function labels() {
      const fr=root.lang==='fr';
      track.setAttribute('aria-label',`${reel.dataset.projectName} — ${fr?'galerie d’images':'project images'}`);
      previous.setAttribute('aria-label',fr?'Capture précédente':'Previous capture');
      next.setAttribute('aria-label',fr?'Capture suivante':'Next capture');
    }
    function update() {
      pending=false;
      const left=track.scrollLeft;
      index=max>0&&left>=max-edge?slides.length-1:offsets.reduce((best,x,i)=>Math.abs(x-left)<Math.abs(offsets[best]-left)?i:best,0);
      const text=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
      if(count.textContent!==text)count.textContent=text;
      previous.disabled=left<=edge;
      next.disabled=left>=max-edge;
      reel.style.setProperty('--reel-progress',String(max>0?Math.max(.04,Math.min(1,left/max)):1));
    }
    function schedule() { if(!pending){pending=true;requestAnimationFrame(update);} }
    function go(target,instant=false) {
      clearTimeout(wheelTimer);track.classList.remove('is-wheeling');
      track.scrollTo({left:offsets[Math.max(0,Math.min(slides.length-1,target))]||0,behavior:instant||stopped()?'instant':'smooth'});
    }
    function step(direction) {
      // Several portrait slides can share the final clamped position.
      // Choose a reachable position so Previous always leaves the end.
      const left=track.scrollLeft;
      if(direction>0){const target=offsets.findIndex(x=>x>left+2);return target<0?slides.length-1:target;}
      for(let target=offsets.length-1;target>=0;target--)if(offsets[target]<left-2)return target;
      return 0;
    }
    previous.addEventListener('click',()=>go(step(-1)));
    next.addEventListener('click',()=>go(step(1)));
    track.addEventListener('scroll',schedule,{passive:true});
    const geometry=new ResizeObserver(()=>{
      // Read all geometry together after layout, rather than on every wheel event.
      const origin=slides[0].offsetLeft;
      max=Math.max(0,track.scrollWidth-track.clientWidth);
      offsets=slides.map(slide=>Math.min(max,slide.offsetLeft-origin));
      schedule();
    });
    measurements.set(track,geometry);
    nearby.observe(track);
    track.addEventListener('keydown',event=>{
      if(event.ctrlKey||event.metaKey||event.altKey)return;
      const focused=event.target.closest('.media-link');
      const focusedIndex=focused?slides.indexOf(focused.closest('.reel-slide')):index;
      let target;
      if(event.key==='ArrowRight')target=focused?focusedIndex+1:step(1);else if(event.key==='ArrowLeft')target=focused?focusedIndex-1:step(-1);else if(event.key==='Home')target=0;else if(event.key==='End')target=slides.length-1;else return;
      event.preventDefault();target=Math.max(0,Math.min(slides.length-1,target));go(target);
      if(focused){keyFocus=true;slides[target].querySelector('.media-link')?.focus({preventScroll:true});keyFocus=false;}
    });
    track.addEventListener('focusin',event=>{
      if(keyFocus)return;
      const slide=event.target.closest('.reel-slide');
      const target=slides.indexOf(slide);
      if(target<0)return;
      const left=track.scrollLeft;
      if(offsets[target]<left||offsets[target]>left+track.clientWidth-slide.offsetWidth)go(target,true);
    });
    track.addEventListener('wheel',event=>{
      if(!fine.matches||stopped()||event.ctrlKey||event.metaKey||event.altKey||Math.abs(event.deltaX)>=Math.abs(event.deltaY))return;
      const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?track.clientHeight:1);
      const left=track.scrollLeft;
      // Release vertical scrolling naturally at either end; never intercept the page.
      if(!max||delta<0&&left<=edge||delta>0&&left>=max-edge)return;
      event.preventDefault();track.classList.add('is-wheeling');
      track.scrollLeft=Math.max(0,Math.min(max,left+delta));
      clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>track.classList.remove('is-wheeling'),180);
    },{passive:false});
    labels();
    new MutationObserver(labels).observe(root,{attributes:true,attributeFilter:['lang']});
    new MutationObserver(()=>{if(stopped()){clearTimeout(wheelTimer);track.classList.remove('is-wheeling');track.scrollTo({left:track.scrollLeft,behavior:'instant'});}}).observe(root,{attributes:true,attributeFilter:['class']});
  }
})();

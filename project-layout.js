// Long cards scroll fully into view before pinning by their lower edge.
// ResizeObserver keeps the pin point current after disclosure, font and image changes.
(() => {
  const cards=[...document.querySelectorAll('.creator-project.project')];
  const heights=new Map();
  function fit(card,height){
    heights.set(card,height);
    const top=Number.parseFloat(card.style.getPropertyValue('--stack-rest-top'))||96;
    card.style.setProperty('--stack-top',`${Math.min(top,innerHeight-height-32)}px`);
    const value=innerWidth>900?'true':'false';
    if(card.dataset.stackFit!==value)card.dataset.stackFit=value;
  }
  const observer=new ResizeObserver(entries=>{
    for(const entry of entries){
      const box=entry.borderBoxSize?.[0];
      fit(entry.target,box?box.blockSize:entry.target.offsetHeight);
    }
  });
  cards.forEach(card=>observer.observe(card));
  let scheduled=0;
  addEventListener('resize',()=>{
    if(scheduled)return;
    scheduled=requestAnimationFrame(()=>{scheduled=0;for(const [card,height] of heights)fit(card,height);});
  },{passive:true});
  // A pointer click must not freeze a whole stack. Release only the keyboard
  // reader's card and those after it, so Tab can never land behind another card.
  let focused=null;
  function releaseFocus(){if(focused){delete focused.dataset.stackFocus;focused=null;}}
  document.addEventListener('focusin',event=>{
    releaseFocus();
    const target=event.target;
    if(!target.matches('a:focus-visible,button:focus-visible,summary:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible'))return;
    const card=target.closest('.creator-project.project');
    if(card){
      focused=card;card.dataset.stackFocus='true';
      // Releasing sticky siblings changes geometry after the browser's initial
      // focus scroll. Keep the actual keyboard target below the fixed header.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        if(focused!==card||document.activeElement!==target)return;
        const rect=target.getBoundingClientRect(),top=(document.querySelector('header')?.getBoundingClientRect().bottom||0)+16,bottom=innerHeight-16;
        const delta=rect.top<top?rect.top-top:rect.bottom>bottom?rect.bottom-bottom:0;
        if(delta)scrollBy({top:delta,behavior:'instant'});
      }));
    }
  });
  document.addEventListener('focusout',releaseFocus);
  for(const event of ['pointerdown','wheel','touchstart'])document.addEventListener(event,releaseFocus,{passive:true,capture:true});
})();

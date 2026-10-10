// Stack only cards that fit below the fixed navigation. Tall cards stay in flow.
// ResizeObserver sees native disclosure, translation, font and image-size changes.
(() => {
  const cards=[...document.querySelectorAll('.creator-project.project')];
  const heights=new Map();
  function fit(card,height){
    heights.set(card,height);
    const top=Number.parseFloat(card.style.top)||96;
    const value=innerWidth>900&&height<=innerHeight-top-32?'true':'false';
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
})();

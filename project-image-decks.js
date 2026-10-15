// Compact, progressively enhanced capture decks. Original anchors, captions and
// gallery groups are moved, not cloned: the full-size lightbox keeps every image.
(() => {
 const root=document.documentElement,updates=[];
 for(const card of document.querySelectorAll('#work .creator-project')){
  const slides=[...card.querySelectorAll('figure')].filter(figure=>!figure.querySelector('figure')&&figure.querySelector('.media-link'));
  if(slides.length<2)continue;
  const sources=[...new Set(slides.map(slide=>slide.closest('.project-collage,.project-evidence,.cardiag-evidence')).filter(Boolean))];
  if(!sources.length)continue;
  const deck=document.createElement('div'),stage=document.createElement('div'),controls=document.createElement('div'),hint=document.createElement('span'),count=document.createElement('span');
  deck.className='project-image-deck';deck.setAttribute('role','region');
  stage.className='image-deck-stage';controls.className='image-deck-controls';hint.className='image-deck-hint';count.className='image-deck-count';
  count.setAttribute('aria-live','polite');count.setAttribute('aria-atomic','true');
  const previous=document.createElement('button'),next=document.createElement('button');
  previous.type=next.type='button';previous.textContent='←';next.textContent='→';
  previous.className=next.className='image-deck-step';
  const stageId=`${card.id}-capture-deck`;stage.id=stageId;
  previous.setAttribute('aria-controls',stageId);next.setAttribute('aria-controls',stageId);
  controls.append(hint,count,previous,next);deck.append(stage,controls);sources[0].before(deck);
  for(const source of sources){source.dataset.imageDeckSource='true';source.hidden=true;}
  for(const slide of slides){slide.classList.add('image-deck-slide');stage.append(slide);}
  let index=0;
  function labels(){
   const fr=root.lang==='fr',name=card.querySelector('h3')?.textContent||card.id;
   deck.setAttribute('aria-label',`${name} — ${fr?'captures du projet':'project captures'}`);
   previous.setAttribute('aria-label',fr?'Capture précédente':'Previous capture');next.setAttribute('aria-label',fr?'Capture suivante':'Next capture');
   hint.textContent=fr?'Cliquer sur l’image pour agrandir':'Click the image to enlarge';
  }
  function render(){
   slides.forEach((slide,i)=>{
    const depth=(i-index+slides.length)%slides.length;
    slide.hidden=depth>2;slide.inert=depth!==0;
    slide.setAttribute('aria-hidden',String(depth!==0));slide.dataset.deckDepth=String(depth);
   });
   count.textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
  }
  previous.addEventListener('click',()=>{index=(index-1+slides.length)%slides.length;render();});
  next.addEventListener('click',()=>{index=(index+1)%slides.length;render();});
  deck.addEventListener('keydown',event=>{
   if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
   const imageFocused=event.target.closest('.media-link');
   event.preventDefault();index=(index+(event.key==='ArrowLeft'?-1:1)+slides.length)%slides.length;render();
   if(imageFocused)slides[index].querySelector('.media-link').focus({preventScroll:true});
  });
  labels();render();updates.push(labels);
 }
 new MutationObserver(()=>updates.forEach(update=>update())).observe(root,{attributes:true,attributeFilter:['lang']});
})();

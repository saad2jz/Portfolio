// Slower wheel travel, without transforming the document or changing touch,
// keyboard, nested scroll areas, browser zoom or fragment navigation.
const root=document.documentElement;
const fine=matchMedia('(pointer:fine)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const gain=.65,timeConstant=90;
let frame=0,target=scrollY,written=scrollY,stamp=0,direction=0;
const enabled=()=>fine.matches&&!reduced.matches&&!root.matches('.motion-paused,.gallery-open');
function cancel(){cancelAnimationFrame(frame);frame=0;stamp=0;direction=0;target=written=scrollY;}
function tick(now:number){
 frame=0;
 if(!enabled()||document.hidden||Math.abs(scrollY-written)>2){cancel();return;}
 const dt=stamp?Math.min(64,now-stamp):16.67;stamp=now;
 const distance=target-scrollY;
 if(Math.abs(distance)<.75){scrollTo({top:target,behavior:'instant'});cancel();return;}
 scrollTo({top:scrollY+distance*(1-Math.exp(-dt/timeConstant)),behavior:'instant'});
 written=scrollY;frame=requestAnimationFrame(tick);
}
function ownsScroll(event:WheelEvent){
 for(const node of event.composedPath()){
  if(!(node instanceof HTMLElement)||node===document.body||node===root)continue;
  if(node.matches('input,textarea,select,[contenteditable]:not([contenteditable=false])'))return true;
  const style=getComputedStyle(node);
  // Preserve native scrolling/chaining within menus, dialogs and galleries.
  if((/(auto|scroll)/.test(style.overflowY)&&node.scrollHeight>node.clientHeight+1)||(/(auto|scroll)/.test(style.overflowX)&&node.scrollWidth>node.clientWidth+1))return true;
 }
 return false;
}
addEventListener('wheel',event=>{
 if(!enabled()||!event.cancelable||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey||!event.deltaY||Math.abs(event.deltaX)>Math.abs(event.deltaY)||ownsScroll(event)){cancel();return;}
 const unit=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;
 const delta=event.deltaY*unit*gain,sign=Math.sign(delta);
 if(!frame||direction!==sign){target=written=scrollY;stamp=0;}
 direction=sign;
 target=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,target+delta));
 event.preventDefault();
 if(!frame)frame=requestAnimationFrame(tick);
},{passive:false});
for(const event of ['pointerdown','touchstart','keydown','hashchange','resize','pagehide'])addEventListener(event,cancel,{passive:true});
document.addEventListener('visibilitychange',cancel);
fine.addEventListener('change',cancel);reduced.addEventListener('change',cancel);
new MutationObserver(cancel).observe(root,{attributes:true,attributeFilter:['class']});

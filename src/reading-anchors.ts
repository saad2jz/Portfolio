import {createFlowMeasure} from '../flow-geometry';

export type ReadingAnchor={kind:string;id:string;top:number};
export type SectionBookmark={anchor?:Pick<ReadingAnchor,'kind'|'id'>;offset:number;y:number;edge?:'start'|'end'};

/** Stable flow anchors also work while project cards are pinned in a stack. */
export function readingAnchors(root:ParentNode=document){
 const hero=root.querySelector<HTMLElement>('.creator-hero-stage');
 const result=hero?[{element:hero,kind:'hero',id:'home'}]:[];
 root.querySelectorAll<HTMLElement>('section[id]:not(#home)').forEach(element=>result.push({element,kind:'section',id:element.id}));
 root.querySelectorAll<HTMLElement>('.chapter-track').forEach(element=>{
  const id=element.querySelector<HTMLElement>('.chapter-stage')?.dataset.chapter;
  if(id)result.push({element,kind:'chapter',id});
 });
 root.querySelectorAll<HTMLElement>('.creator-project.project[id]').forEach(card=>{
  const marker=card.previousElementSibling as HTMLElement|null;
  if(marker?.classList.contains('project-marker'))result.push({element:marker,kind:'card',id:card.id});
 });
 return result.filter(item=>!item.element.closest<HTMLElement>('[data-section-panel]')?.hidden&&!item.element.closest('details:not([open])'));
}

export function measureReadingAnchors(root:ParentNode){
 const top=createFlowMeasure();
 return readingAnchors(root).map(({kind,id,element})=>({kind,id,top:top(element)}));
}

export function captureSectionBookmark(anchors:ReadingAnchor[],y:number,header:number,maxY:number):SectionBookmark{
 if(y<=3)return {y,offset:0,edge:'start'};
 if(y>=maxY-3)return {y,offset:0,edge:'end'};
 let anchor:ReadingAnchor|undefined;
 // Fragment links leave a 16px reading gutter below the fixed navigation.
 for(const item of anchors)if(item.top<=y+header+17&&(!anchor||item.top>=anchor.top))anchor=item;
 return {anchor:anchor&&{kind:anchor.kind,id:anchor.id},offset:anchor?y+header-anchor.top:0,y};
}

export function resolveSectionBookmark(bookmark:SectionBookmark|undefined,anchors:ReadingAnchor[],header:number,maxY:number){
 if(!bookmark||bookmark.edge==='start')return 0;
 if(bookmark.edge==='end')return maxY;
 const anchor=anchors.find(item=>item.kind===bookmark.anchor?.kind&&item.id===bookmark.anchor?.id);
 return Math.max(0,Math.min(maxY,anchor?anchor.top+bookmark.offset-header:bookmark.y));
}

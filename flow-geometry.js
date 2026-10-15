// A fresh cache belongs to one layout measurement. Sticky screen rectangles
// cannot locate cards in document flow; shared offset ancestors only need to
// be read once for the entire batch of markers and chapter introductions.
export function createFlowMeasure(){
 const positions=new Map();
 return function top(element){
  if(!element)return 0;
  if(positions.has(element))return positions.get(element);
  const position=element.offsetTop+top(element.offsetParent);
  positions.set(element,position);
  return position;
 };
}

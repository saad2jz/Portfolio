import postcss from 'postcss';

// Drop only selectors whose literal class/ID is absent from both rendered
// languages AND the complete client bundle. Keep functional/attribute/escaped
// selectors conservatively: their alternatives and runtime states need not
// exist in the initial DOM. Source stylesheets remain intact for future work.
export function pruneUnusedSelectors(css,markupAndClient){
 const root=postcss.parse(css),removed=[];
 root.walkRules(rule=>{
  if(/[()[\\]/.test(rule.selector))return;
  const selectors=rule.selector.split(',').map(selector=>selector.trim());
  const keep=selectors.filter(selector=>{
   const names=[...selector.matchAll(/[.#](-?[_a-zA-Z][_a-zA-Z0-9-]*)/g)].map(match=>match[1]);
   const used=names.every(name=>markupAndClient.includes(name));
   if(!used)removed.push(selector);
   return used;
  });
  if(!keep.length)rule.remove();
  else if(keep.length!==selectors.length)rule.selector=keep.join(',');
 });
 return {css:root.toString(),removed};
}

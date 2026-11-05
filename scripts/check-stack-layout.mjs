import assert from 'node:assert/strict';
import {build} from 'esbuild';

const result=await build({entryPoints:['project-layout.js'],bundle:true,write:false,platform:'node',format:'esm'});
const {createCardStacks}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
let checks=0;
function check(name,scenario){scenario();checks++;console.log('PASS '+name);}

// Run the real stack controller against deterministic layout measurements.
// The browser pass separately verifies CSS clipping, details and native scroll.
function fixture({viewport=900,header=135,width=1440,contentHeight=1300,rest=96,toolbar=true}={}){
 let size=contentHeight;
 const properties=new Map([['--stack-rest-top',String(rest)]]);
 const style={getPropertyValue:key=>properties.get(key)||'',setProperty:(key,value)=>properties.set(key,value)};
 const start={classList:{contains:name=>name==='project-marker'},offsetTop:1000,offsetParent:null};
 const content={get offsetHeight(){return size;},style:{}};
 const window={get clientHeight(){return card.offsetHeight-50-(toolbar&&card.dataset.stackFit==='true'?74:0);}};
 const progress={style:{}};
 const card={style,dataset:{stackDepth:'2'},closest:()=>({hidden:false}),querySelector:selector=>selector.endsWith('.project-scroll-content')?content:selector==='.project-reading-fill'?progress:selector==='.project-frame-toolbar'?toolbar?{}:null:window,
  get offsetHeight(){return this.dataset.stackFit==='true'?Math.min(size+50,Number.parseFloat(properties.get('--stack-height'))):size+50;},previousElementSibling:start};
 const handoff={style:{setProperty:(key,value)=>properties.set(key,value)},classList:{contains:name=>name==='project-handoff'},get offsetTop(){return start.offsetTop+card.offsetHeight+44;},offsetParent:null};
 card.nextElementSibling=handoff;
 globalThis.document={querySelectorAll:()=>[card],addEventListener:()=>{}};
 globalThis.ResizeObserver=class {observe(){}};
 const stack=createCardStacks(()=>{});
 const measure=(stopped=false)=>stack.measure(viewport,header,width,stopped);
 measure();
 return {card,content,progress,start,properties,stack,measure,setSize:value=>{size=value;},get pin(){return Number.parseFloat(properties.get('--stack-top'));},get overflow(){return Math.max(0,size-window.clientHeight);}};
}

check('A tall desktop card remains entirely below navigation and inside the viewport',()=>{
 const f=fixture();
 assert.ok(f.pin>=135+12);
 assert.ok(f.pin+f.card.offsetHeight<=900-24);
 assert.equal(f.card.dataset.stackMode,'frame');
});
check('Mobile depth offsets also keep the whole card frame on screen',()=>{
 const f=fixture({viewport:768,header:131,width:390,rest:128,contentHeight:2000});
 assert.ok(f.pin>=131+12);
 assert.ok(f.pin+f.card.offsetHeight<=768-24);
});
check('All lower content is revealed before a tall card starts to shrink',()=>{
 const f=fixture(),readingEnd=f.start.offsetTop-f.pin+f.overflow;
 f.stack.paint(readingEnd,false,1440);
 assert.equal(f.content.style.transform,`translateY(${-f.overflow}px)`);
 assert.equal(f.card.style.transform,'none');
 assert.ok(Number.parseFloat(f.properties.get('--stack-hold'))>=f.overflow);
 f.stack.paint(readingEnd+500,false,1440);
 assert.match(f.card.style.transform,/scale\(0\./);
});
check('Reading follows native scroll immediately and reverses without queued animation',()=>{
 const f=fixture(),readingStart=f.start.offsetTop-f.pin;
 f.stack.paint(readingStart,false,1440,readingStart+100);
 assert.equal(f.content.style.transform,'translateY(-100px)');
 f.stack.paint(readingStart,false,1440,readingStart-1);
 assert.equal(f.content.style.transform,'none');
});
check('The reading indicator reflects actual revealed content and reverses with it',()=>{
 const f=fixture(),readingStart=f.start.offsetTop-f.pin;
 f.stack.paint(readingStart+f.overflow/2,false,1440);
 assert.equal(f.progress.style.transform,'scaleX(0.5000)');
 f.stack.paint(readingStart+f.overflow,false,1440);
 assert.equal(f.progress.style.transform,'scaleX(1.0000)');
 f.stack.paint(readingStart,false,1440);
 assert.equal(f.progress.style.transform,'scaleX(0.0000)');
});
check('Opening more content adds reading distance without enlarging the frame',()=>{
 const f=fixture(),height=f.card.offsetHeight,previous=Number.parseFloat(f.properties.get('--stack-hold'));
 f.setSize(2400);f.measure();
 assert.equal(f.card.offsetHeight,height);
 assert.equal(Number.parseFloat(f.properties.get('--stack-hold'))-previous,1100);
});
check('Paused motion and very short viewports retain the complete content in normal flow',()=>{
 const f=fixture();
 f.measure(true);f.stack.paint(2000,true,1440);
 assert.equal(f.card.dataset.stackFit,'false');
 assert.equal(f.card.offsetHeight,1350);
 assert.equal(f.content.style.transform,'none');
 assert.equal(fixture({viewport:300}).card.dataset.stackFit,'false');
});
check('A short landscape screen keeps readable content instead of a toolbar-sized frame',()=>{
 const f=fixture({viewport:450,toolbar:true});
 assert.equal(f.card.dataset.stackFit,'false');
 assert.equal(f.card.offsetHeight,1350);
});
console.log(`${checks} stack-layout scenarios passed.`);

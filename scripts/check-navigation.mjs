import assert from 'node:assert/strict';
import {build} from 'esbuild';

// Exercise mixed input sequences independently of browser frame timing.
const result=await build({stdin:{contents:"export * from './src/pager-wheel-intent'; export * from './src/reading-anchors';",resolveDir:process.cwd()},bundle:true,write:false,platform:'node',format:'esm'});
const {PagerWheelIntent,captureSectionBookmark,resolveSectionBookmark}=await import('data:text/javascript;base64,'+Buffer.from(result.outputFiles[0].text).toString('base64'));
let checks=0;
function check(name,scenario){scenario();checks++;console.log('PASS '+name);}

check('A continuous gesture can skip intermediate sections',()=>{
 const intent=new PagerWheelIntent();
 assert.equal(intent.destination(240,0,1,1200),2);
 assert.equal(intent.destination(480,60,2,1200),4);
});
check('A tab click discards the momentum of the previous gesture',()=>{
 const intent=new PagerWheelIntent();
 assert.equal(intent.destination(720,0,1,1200),4);
 intent.reset(2);
 assert.equal(intent.destination(-240,70,2,1200),1);
});
check('A keyboard or vertical navigation starts a fresh horizontal gesture',()=>{
 const intent=new PagerWheelIntent();
 intent.destination(-480,0,4,1200);
 intent.reset(3);
 assert.equal(intent.destination(240,40,3,1200),4);
});
check('Pausing input separates two gestures without requiring an animation to finish',()=>{
 const intent=new PagerWheelIntent();
 intent.destination(240,0,0,1200);
 assert.equal(intent.destination(-240,300,4,1200),3);
});
check('Small precision-trackpad deltas accumulate rather than switching on a tremor',()=>{
 const intent=new PagerWheelIntent();
 assert.equal(intent.destination(20,0,2,375),2);
 assert.equal(intent.destination(20,20,2,375),2);
 assert.equal(intent.destination(80,40,2,375),3);
});
check('Changing direction reverses an ongoing gesture around its original section',()=>{
 const intent=new PagerWheelIntent();
 assert.equal(intent.destination(480,0,2,1200),4);
 assert.equal(intent.destination(-240,50,4,1200),3);
 assert.equal(intent.destination(-240,90,3,1200),2);
});
check('Overscrolling an end does not block an immediate reversal',()=>{
 const intent=new PagerWheelIntent();
 assert.equal(intent.destination(2400,0,3,1200,6),5);
 assert.equal(intent.destination(20,20,5,1200,6),5);
 assert.equal(intent.destination(-240,50,5,1200,6),4);
 intent.reset(1);
 assert.equal(intent.destination(-2400,100,1,1200,6),0);
 assert.equal(intent.destination(240,150,0,1200,6),1);
});
const desktop=[{kind:'section',id:'selected-work',top:160},{kind:'card',id:'ffa',top:2000},{kind:'card',id:'cardiag',top:3600}];
const mobile=[{kind:'section',id:'selected-work',top:140},{kind:'card',id:'ffa',top:3200},{kind:'card',id:'cardiag',top:5100}];
check('Returning after a responsive reflow retains the project and reading offset',()=>{
 const bookmark=captureSectionBookmark(desktop,3500,160,9000);
 assert.equal(resolveSectionBookmark(bookmark,mobile,140,12000),5020);
});
check('Returning without a layout change preserves the exact scroll position',()=>{
 const bookmark=captureSectionBookmark(desktop,3571,160,9000);
 assert.equal(resolveSectionBookmark(bookmark,desktop,160,9000),3571);
});
check('An anchored project retains its 16px gutter beneath a resized navigation bar',()=>{
 const bookmark=captureSectionBookmark(desktop,3424,160,9000);
 assert.equal(resolveSectionBookmark(bookmark,mobile,140,12000),4944);
});
check('The top and bottom remain at the corresponding edge after reflow',()=>{
 assert.equal(resolveSectionBookmark(captureSectionBookmark(desktop,0,160,9000),mobile,140,12000),0);
 assert.equal(resolveSectionBookmark(captureSectionBookmark(desktop,9000,160,9000),mobile,140,12000),12000);
});
check('A missing anchor falls back safely and respects the new document bounds',()=>{
 const bookmark=captureSectionBookmark(desktop,3500,160,9000);
 assert.equal(resolveSectionBookmark(bookmark,[],140,12000),3500);
 assert.equal(resolveSectionBookmark(bookmark,[],140,3000),3000);
 assert.equal(resolveSectionBookmark(undefined,mobile,140,12000),0);
});
console.log(`${checks} navigation scenarios passed.`);

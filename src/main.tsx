import React from 'react';
import './scroll-position';
import {hydrateRoot} from 'react-dom/client';
import {App} from './App';

// DOM enhancements must wait for React's committed tree, rather than guessing
// hydration completion with animation frames on slower devices.
function Portfolio(){
 React.useEffect(()=>{void import('./legacy').then(ready);},[]);
 return <App language={document.documentElement.lang}/>;
}
// The complete SSR page is already usable. Let its fonts and portrait paint
// before hydration and decorative layout work compete for the mobile thread.
// First interaction starts immediately, with React's event replay available.
document.documentElement.classList.add('layout-ready');
let started=false;
let pendingAction:HTMLElement|null=null;
function queueAction(event:MouseEvent){
 const target=event.target instanceof Element?event.target.closest<HTMLElement>('.menu-toggle,.motion-toggle,.reading-mode,.image-deck-step,.media-link,[data-open-gallery]'):null;
 if(!target||event.button!==0||event.ctrlKey||event.metaKey||event.altKey||event.shiftKey)return;
 event.preventDefault();event.stopImmediatePropagation();pendingAction=target;start();
}
function ready(){
 window.removeEventListener('click',queueAction,true);
 const target=pendingAction;pendingAction=null;
 if(target?.isConnected)target.click();
}
window.addEventListener('click',queueAction,{capture:true});
const inputs=['pointerdown','keydown','touchstart','wheel'] as const;
function start(){
 if(started)return;started=true;
 inputs.forEach(type=>window.removeEventListener(type,start,true));
 hydrateRoot(document.getElementById('root')!,<Portfolio/>);
}
inputs.forEach(type=>window.addEventListener(type,start,{once:true,passive:true,capture:true}));
const portrait=document.querySelector<HTMLImageElement>('.portrait-frame img');
Promise.allSettled([portrait?.decode?.(),document.fonts?.ready]).then(()=>{
 requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if('requestIdleCallback' in window)window.requestIdleCallback(start,{timeout:1000});else setTimeout(start,0);
 }));
});

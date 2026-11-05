// Shared by anchor navigation and the existing sticky/zoom controllers.
export function navigationHeight(){
 const header=document.querySelector<HTMLElement>('header')?.offsetHeight||80;
 const tabs=document.documentElement.classList.contains('sectioned')
  ?document.querySelector<HTMLElement>('.section-tabbar')?.offsetHeight||0:0;
 return header+tabs;
}

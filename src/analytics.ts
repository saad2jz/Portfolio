// No provider or personal data is sent until the owner supplies a tracker.
type TrackerWindow=Window&{plausible?:(event:string,options:{props:{language:string}})=>void};
const allowed=new Set(['Let’s talk','View CV','Book a call']);
document.addEventListener('click',event=>{
 const link=(event.target as Element|null)?.closest<HTMLAnchorElement>('a[data-cta]');
 const name=link?.dataset.cta;
 if(!name||!allowed.has(name)||navigator.doNotTrack==='1'||(navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl)return;
 (window as TrackerWindow).plausible?.(name,{props:{language:document.documentElement.lang}});
});

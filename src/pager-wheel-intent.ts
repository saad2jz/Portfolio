/** Keep momentum within one gesture, and start fresh after another navigation
 * method takes over. This state contains no animation or DOM timing. */
export class PagerWheelIntent {
 private origin=0;
 private distance=0;
 private previousTime:number|null=null;

 reset(index:number){
  this.origin=index;this.distance=0;this.previousTime=null;
 }

 destination(delta:number,time:number,index:number,viewportWidth:number,sectionCount=Infinity){
  if((index===0&&delta<0)||(index===sectionCount-1&&delta>0)){
   this.reset(index);this.previousTime=time;return index;
  }
  if(this.previousTime===null||time-this.previousTime>220){this.origin=index;this.distance=0;}
  this.previousTime=time;this.distance+=delta;
  const threshold=Math.max(90,Math.min(240,viewportWidth*.3));
  const steps=Math.trunc(Math.abs(this.distance)/threshold)*Math.sign(this.distance);
  const destination=this.origin+steps;
  const bounded=Math.max(0,Math.min(sectionCount-1,destination));
  // Excess travel beyond the end must not be paid back before reversing.
  if(bounded!==destination){this.origin=bounded;this.distance=0;}
  return bounded;
 }
}

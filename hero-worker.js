import {createRenderer} from './hero-renderer.js';

let renderer=null,latest={};
addEventListener('message',async event=>{
  const data=event.data;
  try{
    if(data.type==='init'){
      latest={...data.model,...latest};
      renderer=await createRenderer(data.canvas,latest,()=>postMessage({type:'lost'}));
      if(!renderer)throw Error('WebGL unavailable');
      renderer.resize(latest);renderer.update(latest);postMessage({type:'ready'});
    }else if(data.type==='update'||data.type==='resize'){
      latest={...latest,...data.model};
      if(renderer){if(data.type==='resize')renderer.resize(latest);renderer.update(latest);}
    }else if(data.type==='inspect')postMessage({type:'inspection',id:data.id,state:renderer?.inspect()||null});
    else if(data.type==='lose-context')renderer?.loseContext();
  }catch{postMessage({type:'failed'});}
});

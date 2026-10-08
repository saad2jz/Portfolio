// Shared renderer: native WebGL in a worker, with the same scene as a fallback.
export async function createRenderer(canvas,config,onLost=()=>{}) {
  let {width,height,dpr=1,lowPower=false}=config,heroTop=0,hidden=false,reduced=false;
  const gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'low-power'});
  if(!gl)throw Error('WebGL unavailable');
  const parallel=gl.getExtension('KHR_parallel_shader_compile');
  const vertexSource = `
    attribute vec3 aPosition;attribute vec3 aNormal;attribute float aDetail;
    uniform mat4 uProjection;uniform mat3 uRotation;uniform vec3 uCenter;
    uniform float uScale;uniform float uCamera;uniform float uTime;
    varying vec3 vWorld;varying vec3 vNormal;varying float vDetail;
    void main(){
      vWorld=uRotation*(aPosition*uScale)+uCenter;
      vWorld.y+=sin(uTime*.9+uCenter.x)*.07;
      vNormal=uRotation*aNormal;vDetail=aDetail;
      gl_Position=uProjection*vec4(vWorld-vec3(0.,0.,uCamera),1.);
    }`;
  const fragmentSource = `
    precision highp float;
    uniform vec3 uTint;uniform float uCamera;
    varying vec3 vWorld;varying vec3 vNormal;varying float vDetail;
    float softbox(vec3 r,vec3 axis,float power){return pow(max(dot(r,normalize(axis)),0.),power);}
    void main(){
      vec3 n=normalize(vNormal);if(!gl_FrontFacing)n=-n;
      vec3 view=normalize(vec3(0.,0.,uCamera)-vWorld);
      vec3 reflected=reflect(-view,n);
      vec3 light=normalize(vec3(-3.,5.,6.)-vWorld);
      float diffuse=max(dot(n,light),0.);
      float edge=pow(1.-abs(dot(n,view)),3.);
      float strip=softbox(reflected,vec3(-.8,.8,1.),10.);
      float rim=softbox(reflected,vec3(1.,.1,.7),24.);
      float top=softbox(reflected,vec3(.1,1.,.1),6.);
      float spec=pow(max(dot(n,normalize(light+view)),0.),70.);
      vec3 colour=uTint*(.17+diffuse*.6)+vec3(.94,.78,.71)*strip*.95+vec3(.96,.93,.88)*rim*.65+uTint*top*.7+vec3(1.,.94,.86)*spec*.9+uTint*edge*.22;
      colour=mix(colour,colour*.45+vec3(.43,.26,.20)*.4,vDetail*.7);
      colour=colour/(colour+vec3(.6));
      gl_FragColor=vec4(pow(colour,vec3(.9)),1.);
    }`;
  function compile(type, source) {
    const shader = gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
    if (!parallel && !gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {gl.deleteShader(shader);return null;}
    return shader;
  }
  const vs=compile(gl.VERTEX_SHADER,vertexSource),fs=compile(gl.FRAGMENT_SHADER,fragmentSource);
  if (!vs || !fs) return;
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  if (parallel) while (!gl.getProgramParameter(program,parallel.COMPLETION_STATUS_KHR)) {
    if (gl.isContextLost()) return;
    await new Promise(resolve=>requestAnimationFrame(resolve));
  }
  gl.deleteShader(vs);gl.deleteShader(fs);
  if (!gl.getProgramParameter(program,gl.LINK_STATUS)) return;
  gl.useProgram(program);gl.enable(gl.DEPTH_TEST);gl.clearColor(.031,.031,.031,1);
  const uniforms=Object.fromEntries(['Projection','Rotation','Center','Scale','Camera','Time','Tint'].map(name=>[name,gl.getUniformLocation(program,'u'+name)]));
  const attributes=Object.fromEntries(['Position','Normal','Detail'].map(name=>[name,gl.getAttribLocation(program,'a'+name)]));

  // Bevelled medals and embossed abstract product symbols, built from triangles.
  function geometry(symbol) {
    const vertices=[];
    function vertex(p,n,detail=0){vertices.push(...p,...n,detail);}
    function triangle(a,b,c,na,nb=na,nc=na,detail=0){vertex(a,na,detail);vertex(b,nb,detail);vertex(c,nc,detail);}
    const segments=width<760 || lowPower ? 64 : 100;
    const profile=[[.00,.09],[.89,.09],[.96,.078],[1,.035],[1,-.035],[.96,-.078],[.89,-.09],[.00,-.09]];
    for(let ring=0;ring<profile.length-1;ring++)for(let i=0;i<segments;i++){
      const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;
      const [ra,za]=profile[ring],[rb,zb]=profile[ring+1];
      const point=(r,z,angle)=>[r*Math.cos(angle),r*Math.sin(angle),z];
      const normal=(angle)=>{let nr=za-zb,nz=rb-ra;const l=Math.hypot(nr,nz)||1;return [nr/l*Math.cos(angle),nr/l*Math.sin(angle),nz/l];};
      const pa=point(ra,za,a),pb=point(rb,zb,a),pc=point(rb,zb,b),pd=point(ra,za,b),na=normal(a),nb=normal(b);
      triangle(pa,pb,pc,na,na,nb);triangle(pa,pc,pd,na,nb,nb);
    }
    function box(x,y,w,h,z=.13){
      const p=[[x-w/2,y-h/2,.091],[x+w/2,y-h/2,.091],[x+w/2,y+h/2,.091],[x-w/2,y+h/2,.091],[x-w/2,y-h/2,z],[x+w/2,y-h/2,z],[x+w/2,y+h/2,z],[x-w/2,y+h/2,z]];
      for(const [a,b,c,d,n] of [[4,5,6,7,[0,0,1]],[0,1,5,4,[0,-1,0]],[1,2,6,5,[1,0,0]],[2,3,7,6,[0,1,0]],[3,0,4,7,[-1,0,0]]]){triangle(p[a],p[b],p[c],n,n,n,1);triangle(p[a],p[c],p[d],n,n,n,1);}
    }
    if(symbol%3===0){for(let i=0;i<3;i++)box((i-1)*.29,-.15+i*.10,.16,.30+i*.20);}
    else if(symbol%3===1){for(const x of [-.22,.22])for(const y of [-.22,.22])box(x,y,.28,.28);}
    else{box(0,0,.7,.13);box(0,0,.13,.7);}
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    return {buffer,count:vertices.length/7};
  }
  const meshes=[];
  for (let i=0;i<3;i++) { meshes.push(geometry(i)); await new Promise(resolve=>requestAnimationFrame(resolve)); }
  const layout=[[-4.35,2.65,-.8,.84],[-.75,3.1,-.3,.72],[3.6,2.5,-1.1,.87],[4.6,-.2,.2,.8],[3.35,-2.75,-.5,.8],[.3,-3.15,.3,.72],[-3.45,-2.6,-.5,.84],[-4.65,-.1,.2,.74],[2.7,1.2,-2.1,.58]];
  const mobileLayout=[[-1.15,2.7,-.7,.51],[.35,3.25,-.5,.5],[1.4,2.25,-.9,.53],[1.75,.15,-.7,.52],[1.1,-2.05,-.9,.54],[-.15,-3.05,-.5,.52],[-1.25,-2.4,-.6,.57],[-1.7,.0,-.8,.52],[-.7,1.65,-1.8,.4]];
  const objects=layout.map((_,i)=>({spin:0,hover:0,screenX:0,screenY:0,radius:0,index:i}));
  let pointer={x:0,y:0},smoothed={x:0,y:0},hovered=-1,scroll=0,targetScroll=0,clock=0,last=0,frame=0,visible=true,paused=false,sceneLost=false;

  const projection=new Float32Array(16),rotationMatrix=new Float32Array(9),center=new Float32Array(3);
  const tints=[new Float32Array([.58,.21,.15]),new Float32Array([.59,.36,.31]),new Float32Array([.35,.31,.29])];
  let pointerEvent=null;
  const f=1/Math.tan(.68/2);
  function rotation(x,y,z){
    const cx=Math.cos(x),sx=Math.sin(x),cy=Math.cos(y),sy=Math.sin(y),cz=Math.cos(z),sz=Math.sin(z);
    rotationMatrix[0]=cy*cz;rotationMatrix[1]=cy*sz;rotationMatrix[2]=-sy;
    rotationMatrix[3]=sx*sy*cz-cx*sz;rotationMatrix[4]=sx*sy*sz+cx*cz;rotationMatrix[5]=sx*cy;
    rotationMatrix[6]=cx*sy*cz+sx*sz;rotationMatrix[7]=cx*sy*sz-sx*cz;rotationMatrix[8]=cx*cy;
    return rotationMatrix;
  }
  function paint(){
    if(sceneLost)return;
    const mobile=width<760, positions=mobile?mobileLayout:layout;
    if(pointerEvent){
      const {x,y}=pointerEvent;pointer.x=x/width-.5;pointer.y=y/height-.5;
      hovered=-1;for(const object of objects)if(Math.hypot(x-object.screenX,y-heroTop-object.screenY)<object.radius){hovered=object.index;break;}
      pointerEvent=null;
    }
    const camera=10-scroll*2.5;
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(uniforms.Projection,false,projection);gl.uniform1f(uniforms.Camera,camera);gl.uniform1f(uniforms.Time,clock);
    objects.forEach((object,i)=>{
      const [x,y,z,size]=positions[i];const spread=1+scroll*2.6;
      center[0]=x*spread+smoothed.x*.15;center[1]=y*spread;center[2]=z-scroll*1.4;
      const rx=.35*Math.sin(i*1.7+clock*.30)+smoothed.y*.22+scroll*.8;
      const ry=.65*Math.sin(i*1.4+clock*.34)+object.spin+smoothed.x*.28+scroll*(i%2?1:-1)*1.2;
      const rz=(i%2?-.25:.2)+Math.sin(clock*.24+i)*.14+scroll*.5;
      gl.uniformMatrix3fv(uniforms.Rotation,false,rotation(rx,ry,rz));gl.uniform3fv(uniforms.Center,center);gl.uniform1f(uniforms.Scale,size*(1+object.hover*.08));
      gl.uniform3fv(uniforms.Tint,tints[i%3]);
      const mesh=meshes[i%3];gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);
      gl.enableVertexAttribArray(attributes.Position);gl.vertexAttribPointer(attributes.Position,3,gl.FLOAT,false,28,0);
      gl.enableVertexAttribArray(attributes.Normal);gl.vertexAttribPointer(attributes.Normal,3,gl.FLOAT,false,28,12);
      gl.enableVertexAttribArray(attributes.Detail);gl.vertexAttribPointer(attributes.Detail,1,gl.FLOAT,false,28,24);
      gl.drawArrays(gl.TRIANGLES,0,mesh.count);
      const depth=camera-center[2];
      object.screenX=width/2+(center[0]/depth)*f*height/2;
      object.screenY=height/2-((center[1]+Math.sin(clock*.9+center[0])*.07)/depth)*f*height/2;
      object.radius=size/depth*f*height/2;
    });
  }
  function animate(stamp){
    frame=0;if(!visible||hidden||paused||reduced||sceneLost){last=0;return;}
    const interval=width<760 || lowPower ? 1000/30 : 1000/60;
    if(last && stamp-last<interval-.8){frame=requestAnimationFrame(animate);return;}
    const dt=last?Math.min((stamp-last)/1000,.1):0;last=stamp;
    clock+=dt;const ease=1-Math.exp(-dt*6);
    scroll+=(targetScroll-scroll)*ease;smoothed.x+=(pointer.x-smoothed.x)*ease;smoothed.y+=(pointer.y-smoothed.y)*ease;
    objects.forEach((object,i)=>{object.hover+=((hovered===i?1:0)-object.hover)*ease;object.spin+=dt*(.18+object.hover*3.8);});
    paint();frame=requestAnimationFrame(animate);
  }
  function schedule(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!hidden&&!paused&&!reduced&&!sceneLost)frame=requestAnimationFrame(animate);}
  function resize(next={}){
    width=next.width||width;height=next.height||height;dpr=next.dpr||dpr;
    const mobile=width<760,factor=Math.min(dpr,lowPower?1:mobile?1.25:1.5,(mobile?1200:1600)/Math.max(width,height));
    const nextWidth=Math.round(width*factor),nextHeight=Math.round(height*factor);
    if(canvas.width!==nextWidth||canvas.height!==nextHeight){canvas.width=nextWidth;canvas.height=nextHeight;gl.viewport(0,0,canvas.width,canvas.height);}
    const aspect=width/height;projection.fill(0);projection[0]=f/aspect;projection[5]=f;projection[10]=-1.004;projection[11]=-1;projection[14]=-.2004;
    scroll=targetScroll;paint();
  }

  let frames=0;const originalPaint=paint;
  paint=function(){originalPaint();frames++;};
  function update(next){
    if('pointerX' in next)pointerEvent={x:next.pointerX,y:next.pointerY};
    if(next.pointerActive===false){pointerEvent=null;hovered=-1;pointer.x=pointer.y=0;}
    if('heroTop' in next)heroTop=next.heroTop;
    const oldScroll=targetScroll,wasVisible=visible,wasHidden=hidden;
    if('scroll' in next)targetScroll=next.scroll;
    if('paused' in next)paused=next.paused;
    if('reduced' in next){reduced=next.reduced;if(reduced){smoothed.x=smoothed.y=0;targetScroll=0;}}
    if('hidden' in next)hidden=next.hidden;
    if('visible' in next)visible=next.visible;
    if(visible&&!hidden&&(paused||reduced)&&(oldScroll!==targetScroll||!wasVisible||wasHidden)){scroll=targetScroll;paint();}
    if(paused||reduced||hidden||!visible){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
    else if(!frame)frame=requestAnimationFrame(animate);
  }
  canvas.addEventListener('webglcontextlost',()=>{sceneLost=true;if(frame)cancelAnimationFrame(frame);frame=0;onLost();});
  resize(config);
  update(config);
  return {resize,update,inspect(){return {time:clock,camera:10-scroll*2.5,center:Array.from(center),rotation:Array.from(rotationMatrix),frames,width:canvas.width,height:canvas.height};},loseContext(){gl.getExtension('WEBGL_lose_context')?.loseContext();}};
}

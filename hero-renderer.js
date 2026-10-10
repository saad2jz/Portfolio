// Shared renderer: native WebGL in a worker, with the same scene as a fallback.
import toolkit from './hero-toolkit.json';

export async function createRenderer(canvas,config,onLost=()=>{}) {
  let {width,height,dpr=1,renderScale=1,lowPower=false}=config,hidden=false,reduced=false;
  const gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'low-power'});
  if(!gl)throw Error('WebGL unavailable');
  const parallel=gl.getExtension('KHR_parallel_shader_compile');
  const vertexSource = `
    attribute vec3 aPosition;attribute vec3 aNormal;attribute float aDetail;
    uniform mat4 uProjection;uniform mat3 uRotation;uniform vec3 uCenter;
    uniform float uScale;uniform float uCamera;
    varying vec3 vWorld;varying vec3 vNormal;varying float vDetail;varying vec2 vUV;varying float vFront;
    void main(){
      vWorld=uRotation*(aPosition*uScale)+uCenter;
      vNormal=uRotation*aNormal;vDetail=aDetail;vUV=vec2(aPosition.x*.5+.5,.5-aPosition.y*.5);vFront=aNormal.z;
      gl_Position=uProjection*vec4(vWorld-vec3(0.,0.,uCamera),1.);
    }`;
  const fragmentSource = `
    precision highp float;
    uniform vec3 uTint;uniform float uCamera;uniform sampler2D uLogo;uniform float uLogoIndex;uniform float uLogoReady;
    varying vec3 vWorld;varying vec3 vNormal;varying float vDetail;varying vec2 vUV;varying float vFront;
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
      vec3 colour=uTint*(.17+diffuse*.6)+vec3(.68,.88,.82)*strip*.8+vec3(.86,.96,.91)*rim*.6+uTint*top*.7+vec3(.9,1.,.95)*spec*.8+uTint*edge*.22;
      colour=mix(colour,colour*.45+vec3(.43,.26,.20)*.4,vDetail*.7);
      colour=colour/(colour+vec3(.6));
      vec2 grid=vec2(${toolkit.columns}.0,${toolkit.rows}.0);
      vec2 tile=vec2(mod(uLogoIndex,grid.x),floor(uLogoIndex/grid.x));vec4 logo=texture2D(uLogo,(tile+clamp(vUV,.001,.999))/grid);
      colour=mix(pow(colour,vec3(.9)),logo.rgb,logo.a*step(.98,vFront)*uLogoReady);
      gl_FragColor=vec4(colour,1.);
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
  gl.useProgram(program);gl.enable(gl.DEPTH_TEST);gl.clearColor(.047,.047,.047,1);
  const uniforms=Object.fromEntries(['Projection','Rotation','Center','Scale','Camera','Tint','Logo','LogoIndex','LogoReady'].map(name=>[name,gl.getUniformLocation(program,'u'+name)]));
  const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([0,0,0,0]));
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.uniform1i(uniforms.Logo,0);
  let logosReady=false,atlasWidth=0,atlasHeight=0;
  const attributes=Object.fromEntries(['Position','Normal','Detail'].map(name=>[name,gl.getAttribLocation(program,'a'+name)]));

  // A shared bevelled mesh and compact atlas serve the curated software toolkit.
  function geometry() {
    const vertices=[];
    function vertex(p,n,detail=0){vertices.push(...p,...n,detail);}
    function triangle(a,b,c,na,nb=na,nc=na,detail=0){vertex(a,na,detail);vertex(b,nb,detail);vertex(c,nc,detail);}
    const segments=width<760 || lowPower ? 64 : 112;
    const profile=[[.00,.09],[.89,.09],[.96,.078],[1,.035],[1,-.035],[.96,-.078],[.89,-.09],[.00,-.09]];
    for(let ring=0;ring<profile.length-1;ring++)for(let i=0;i<segments;i++){
      const a=i/segments*Math.PI*2,b=(i+1)/segments*Math.PI*2;
      const [ra,za]=profile[ring],[rb,zb]=profile[ring+1];
      const point=(r,z,angle)=>[r*Math.cos(angle),r*Math.sin(angle),z];
      const normal=(angle)=>{let nr=za-zb,nz=rb-ra;const l=Math.hypot(nr,nz)||1;return [nr/l*Math.cos(angle),nr/l*Math.sin(angle),nz/l];};
      const pa=point(ra,za,a),pb=point(rb,zb,a),pc=point(rb,zb,b),pd=point(ra,za,b),na=normal(a),nb=normal(b);
      triangle(pa,pb,pc,na,na,nb);triangle(pa,pc,pd,na,nb,nb);
    }
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    return {buffer,count:vertices.length/7};
  }
  const meshes=[geometry()];
  // Seeded best-candidate placement gives the scene an open, irregular constellation.
  function scatter(mobile,aspect){
    let seed=mobile?347:937;
    const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
    const positions=[],occupied=[];
    toolkit.tools.forEach((_,i)=>{
      const radius=(mobile?.043:.064)+random()*(mobile?.015:.029);
      // Leave room for the entire orbit, including the larger medallion rim.
      const motion={x:(mobile?.025:.035)+random()*.025,y:.035+random()*.030,speed:.18+random()*.14,direction:i%2?-1:1,phase:random()*Math.PI*2,path:i%3};
      const marginX=radius/aspect+motion.x+.018,minY=.14+radius+motion.y,maxY=.94-radius-motion.y;
      let best=null,score=-Infinity;
      for(let candidate=0;candidate<100;candidate++){
        const x=marginX+random()*(1-2*marginX),y=minY+random()*(maxY-minY);
        let distance=Infinity;
        for(const [px,py,,pr] of occupied)distance=Math.min(distance,Math.hypot((x-px)*aspect,y-py)/(radius+pr));
        if(distance>score){score=distance;best=[x,y];}
      }
      const value=[...best,-.15-random()*.65,radius,motion];positions[i]=value;occupied.push(value);
    });
    return positions;
  }
  let layout=scatter(false,width/height),mobileLayout=scatter(true,width/height);
  const objects=layout.map((_,i)=>({time:0,parallaxX:0,parallaxY:0,screenX:0,screenY:0,radius:0,index:i,pose:null}));
  let pointer={x:0,y:0},hovered=-1,scroll=0,targetScroll=0,clock=0,last=0,frame=0,visible=true,paused=false,sceneLost=false;

  const projection=new Float32Array(16),rotationMatrix=new Float32Array(9),center=new Float32Array(3);
  const tints=toolkit.tools.map(({color})=>new Float32Array([1,3,5].map(offset=>parseInt(color.slice(offset,offset+2),16)/255*.55)));
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
      hovered=-1;let nearest=-Infinity;
      for(const object of objects)if(object.pose&&Math.hypot(x-object.screenX,y-object.screenY)<object.radius&&object.pose.center[2]>nearest){hovered=object.index;nearest=object.pose.center[2];}
    }
    const camera=10-scroll*2.5;
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniformMatrix4fv(uniforms.Projection,false,projection);gl.uniform1f(uniforms.Camera,camera);
    objects.forEach((object,i)=>{
      if(mobile&&i>=mobileLayout.length)return;
      const [x,y,z,radius,motion]=positions[i],depth=camera-z,size=radius*2*depth/f;
      if(hovered!==i||!object.pose){
        const t=object.time;
        // Independent slow trajectories; a hovered object retains its entire pose.
        const angle=motion.phase+t*motion.speed*motion.direction;
        const driftX=motion.x*Math.sin(angle);
        const driftY=motion.y*(motion.path===1?Math.sin(angle*2):motion.path===2?Math.sin(angle+.7):Math.cos(angle));
        object.pose={center:[(x+driftX-.5)*2*depth/f*width/height+object.parallaxX*.10,(.5-y-driftY)*2*depth/f+object.parallaxY*.06,z+Math.sin(t*.22+i)*.05],angles:[.26*Math.sin(i*1.7+t*.22)+object.parallaxY*.16+scroll*.8,.28*Math.sin(i*1.4+t*.26)+object.parallaxX*.20+scroll*(i%2?1:-1)*1.2,(i%2?-.18:.15)+Math.sin(t*.18+i)*.12+scroll*.5],size};
      }
      center.set(object.pose.center);
      gl.uniformMatrix3fv(uniforms.Rotation,false,rotation(...object.pose.angles));gl.uniform3fv(uniforms.Center,center);gl.uniform1f(uniforms.Scale,object.pose.size);
      gl.uniform3fv(uniforms.Tint,tints[i]);gl.uniform1f(uniforms.LogoIndex,i);gl.uniform1f(uniforms.LogoReady,logosReady?1:0);
      const mesh=meshes[0];gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);
      gl.enableVertexAttribArray(attributes.Position);gl.vertexAttribPointer(attributes.Position,3,gl.FLOAT,false,28,0);
      gl.enableVertexAttribArray(attributes.Normal);gl.vertexAttribPointer(attributes.Normal,3,gl.FLOAT,false,28,12);
      gl.enableVertexAttribArray(attributes.Detail);gl.vertexAttribPointer(attributes.Detail,1,gl.FLOAT,false,28,24);
      gl.drawArrays(gl.TRIANGLES,0,mesh.count);
      const actualDepth=camera-center[2];
      object.screenX=width/2+(center[0]/actualDepth)*f*height/2;
      object.screenY=height/2-(center[1]/actualDepth)*f*height/2;
      object.radius=object.pose.size/actualDepth*f*height/2;
    });
  }
  function animate(stamp){
    frame=0;if(!visible||hidden||paused||reduced||sceneLost){last=0;return;}
    const interval=width<760 || lowPower ? 1000/30 : 1000/60;
    if(last && stamp-last<interval-.8){frame=requestAnimationFrame(animate);return;}
    const dt=last?Math.min((stamp-last)/1000,.1):0;last=stamp;
    clock+=dt;const ease=1-Math.exp(-dt*6);
    scroll+=(targetScroll-scroll)*ease;
    objects.forEach((object,i)=>{if(hovered===i)return;object.time+=dt;object.parallaxX+=(pointer.x-object.parallaxX)*ease;object.parallaxY+=(pointer.y-object.parallaxY)*ease;});
    paint();frame=requestAnimationFrame(animate);
  }
  function schedule(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(visible&&!hidden&&!paused&&!reduced&&!sceneLost)frame=requestAnimationFrame(animate);}
  function resize(next={}){
    const layoutChanged=next.width&&next.width!==width||next.height&&next.height!==height;
    width=next.width||width;height=next.height||height;dpr=next.dpr||dpr;renderScale=next.renderScale||renderScale;
    if(layoutChanged){layout=scatter(false,width/height);mobileLayout=scatter(true,width/height);}
    const mobile=width<760,maxPixels=lowPower?2200000:mobile?3000000:6000000,maxSize=gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    const factor=Math.min(Math.min(dpr,lowPower?1:2)*renderScale,Math.sqrt(maxPixels/(width*height)),maxSize/Math.max(width,height));
    const nextWidth=Math.round(width*factor),nextHeight=Math.round(height*factor);
    if(canvas.width!==nextWidth||canvas.height!==nextHeight){canvas.width=nextWidth;canvas.height=nextHeight;gl.viewport(0,0,canvas.width,canvas.height);}
    const aspect=width/height;projection.fill(0);projection[0]=f/aspect;projection[5]=f;projection[10]=-1.004;projection[11]=-1;projection[14]=-.2004;
    objects.forEach(object=>{object.pose=null;});scroll=targetScroll;paint();
  }

  let frames=0;const originalPaint=paint;
  paint=function(){originalPaint();frames++;};
  function update(next){
    if('pointerX' in next)pointerEvent={x:next.pointerX,y:next.pointerY};
    if(next.pointerActive===false){pointerEvent=null;hovered=-1;pointer.x=pointer.y=0;}
    const oldScroll=targetScroll,wasVisible=visible,wasHidden=hidden;
    if('scroll' in next)targetScroll=next.scroll;
    if('paused' in next)paused=next.paused;
    if('reduced' in next){reduced=next.reduced;if(reduced){pointer.x=pointer.y=0;targetScroll=0;}}
    if('hidden' in next)hidden=next.hidden;
    if('visible' in next)visible=next.visible;
    if(visible&&!hidden&&(paused||reduced)&&(oldScroll!==targetScroll||!wasVisible||wasHidden)){scroll=targetScroll;paint();}
    if(paused||reduced||hidden||!visible){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
    else if(!frame)frame=requestAnimationFrame(animate);
  }
  canvas.addEventListener('webglcontextlost',()=>{sceneLost=true;if(frame)cancelAnimationFrame(frame);frame=0;onLost();});
  resize(config);
  update(config);
  if(config.logoAtlasURL)fetch(config.logoAtlasURL).then(response=>{if(!response.ok)throw Error('Atlas unavailable');return response.blob();}).then(async blob=>{
    const bitmap=await createImageBitmap(blob),limit=Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE),lowPower?2048:4096);
    if(bitmap.width<=limit)return bitmap;
    const smaller=await createImageBitmap(bitmap,{resizeWidth:limit,resizeHeight:Math.round(bitmap.height*limit/bitmap.width),resizeQuality:'high'});bitmap.close();return smaller;
  }).then(bitmap=>{if(sceneLost){bitmap.close();return;}atlasWidth=bitmap.width;atlasHeight=bitmap.height;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,bitmap);bitmap.close();logosReady=true;paint();}).catch(()=>{sceneLost=true;if(frame)cancelAnimationFrame(frame);onLost();});
  return {resize,update,inspect(){return {time:clock,camera:10-scroll*2.5,center:Array.from(center),rotation:Array.from(rotationMatrix),frames,logosReady,logoCount:logosReady?objects.length:0,visibleLogoCount:logosReady?objects.length:0,width:canvas.width,height:canvas.height,renderScale,atlasWidth,atlasHeight,hovered,paused,reduced,visible,objects:objects.map(object=>({name:toolkit.tools[object.index].name,x:object.screenX,y:object.screenY,radius:object.radius,time:object.time,pose:object.pose}))};},loseContext(){gl.getExtension('WEBGL_lose_context')?.loseContext();}};
}

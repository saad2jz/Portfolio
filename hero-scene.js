'use strict';

// Original procedural sculpture. The SVG remains visible if WebGL is unavailable.
(() => {
  const canvas = document.getElementById('hero-canvas');
  const hero = document.querySelector('.hero');
  const art = document.querySelector('.hero-art');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  const xLabel = document.getElementById('cursor-x');
  const yLabel = document.getElementById('cursor-y');
  const scrollLabel = document.getElementById('scroll-position');
  let gl;
  try { gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' }); } catch {}
  let visible = true, frame = 0, last = 0, motionTime = 0, pointerX = 0, pointerY = 0;
  window.addEventListener('pointermove', event => {
    if (!visible || !finePointer.matches) return;
    xLabel.textContent = String(Math.round(event.clientX));
    yLabel.textContent = String(Math.round(event.clientY));
    pointerX = event.clientX / innerWidth - .5;
    pointerY = event.clientY / innerHeight - .5;
  }, { passive: true });
  window.addEventListener('scroll', () => { if (visible) scrollLabel.textContent = String(Math.round(scrollY)); }, { passive: true });
  if (!gl) return;
  const vertexSource = 'attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.,1.);}';
  const fragmentSource = `
    precision mediump float;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uPointer;
    mat2 rot(float a){return mat2(cos(a),-sin(a),sin(a),cos(a));}
    float scene(vec3 p){
      p.xy=rot(-.35+sin(uTime*.12)*.08+uPointer.x*.08)*p.xy;
      p.yz=rot(.64+sin(uTime*.16)*.10+uPointer.y*.06)*p.yz;
      float a=atan(p.y,p.x);
      float radius=1.20+.16*cos(3.*a);
      float tube=.39+.065*sin(3.*a+.6);
      float z=p.z-.22*sin(3.*a+uTime*.06);
      vec2 q=vec2(length(p.xy)-radius,z);
      return length(q)-tube;
    }
    vec3 normal(vec3 p){vec2 e=vec2(.003,0.);return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}
    float grain(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    void main(){
      vec2 uv=(gl_FragCoord.xy-.5*uResolution)/min(uResolution.x,uResolution.y);
      vec3 origin=vec3(0.,0.,4.5);
      vec3 direction=normalize(vec3(uv*2.6,-4.5));
      float t=0.;float hit=0.;vec3 p=origin;
      for(int i=0;i<60;i++){p=origin+direction*t;float d=scene(p);if(d<.002){hit=1.;break;}t+=max(d*.82,.002);if(t>8.)break;}
      vec3 col=vec3(.031);
      if(hit>.5){
        vec3 n=normal(p);vec3 view=-direction;
        vec3 light=normalize(vec3(-.7,1.0,1.8));
        float diffuse=max(dot(n,light),0.);
        vec3 reflected=reflect(-view,n);
        float band=pow(max(0.,.5+.5*sin(reflected.x*6.+reflected.y*3.)),7.);
        float specular=pow(max(dot(n,normalize(light+view)),0.),45.);
        float rim=pow(1.-max(dot(n,view),0.),3.);
        vec3 copper=vec3(.72,.34,.28);
        col=copper*(.08+diffuse*.40)+vec3(.84,.67,.62)*band*.46+vec3(1.,.84,.77)*specular*.95+copper*rim*.2;
        col*=.65+.35*smoothstep(-1.6,1.6,p.y);
      }
      col+=vec3((grain(gl_FragCoord.xy)-.5)*.007);
      gl_FragColor=vec4(col,1.);
    }`;
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source); gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
    return shader;
  }
  const vertex = compile(gl.VERTEX_SHADER, vertexSource), fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  gl.deleteShader(vertex); gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, 'aPosition'); gl.enableVertexAttribArray(attribute); gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'uResolution'), time = gl.getUniformLocation(program, 'uTime'), pointer = gl.getUniformLocation(program, 'uPointer');
  function resize() {
    const bounds = hero.getBoundingClientRect();
    const factor = Math.min(1, 900 / Math.max(bounds.width, bounds.height));
    canvas.width = Math.max(1, Math.round(bounds.width * factor));
    canvas.height = Math.max(1, Math.round(bounds.height * factor));
    gl.viewport(0, 0, canvas.width, canvas.height);
    paint();
  }
  function paint() {
    gl.uniform2f(resolution, canvas.width, canvas.height);
    gl.uniform1f(time, motionTime);
    gl.uniform2f(pointer, reduced.matches ? 0 : pointerX, reduced.matches ? 0 : pointerY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function animate(stamp) {
    frame = 0;
    if (!visible || document.hidden || reduced.matches || gl.isContextLost()) { last = 0; return; }
    if (!last || stamp - last >= 50) { motionTime += last ? Math.min((stamp - last) / 1000, .1) : 0; paint(); last = stamp; }
    frame = requestAnimationFrame(animate);
  }
  function schedule() { if (frame) cancelAnimationFrame(frame); frame = 0; last = 0; if (visible && !document.hidden && !reduced.matches && !gl.isContextLost()) frame = requestAnimationFrame(animate); }
  resize(); art.classList.add('scene-ready'); schedule();
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: .01 }).observe(hero);
  document.addEventListener('visibilitychange', schedule);
  reduced.addEventListener('change', () => { paint(); schedule(); });
  canvas.addEventListener('webglcontextlost', () => { if (frame) cancelAnimationFrame(frame); frame = 0; art.classList.remove('scene-ready'); });
})();

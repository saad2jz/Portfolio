import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {brotliCompressSync,gzipSync,constants} from 'node:zlib';
import {transform,build} from 'esbuild';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.resolve(root,'dist');
if(path.dirname(dist)!==root||path.basename(dist)!=='dist')throw Error('Invalid build directory');
await fs.rm(dist,{recursive:true,force:true});
await fs.mkdir(path.join(dist,'assets'),{recursive:true});
const read=name=>fs.readFile(path.join(root,name),'utf8');
let html=await read('index.html');
const cssNames=['fonts.css','styles.css','refinements.css','reference-effects.css'];
let css=(await Promise.all(cssNames.map(read))).join('\n');
const scripts=['script.js','hero-scene.js','motion.js','reference-effects.js','gallery.js'];
let js=(await Promise.all(scripts.map(read))).join('\n;\n');
const fingerprint=buffer=>createHash('sha256').update(buffer).digest('hex').slice(0,12);
const rendererFiles=[];
for(const [entry,format] of [['hero-worker.js','iife'],['hero-renderer.js','esm']]){
  const result=await build({entryPoints:[path.join(root,entry)],bundle:true,write:false,minify:true,format,platform:'browser',target:'es2020',charset:'utf8',legalComments:'none'});
  const buffer=result.outputFiles[0].contents;
  const target=`assets/${entry.slice(0,-3)}.${fingerprint(buffer)}.js`;
  await fs.writeFile(path.join(dist,target),buffer);rendererFiles.push(target);
  js=js.replaceAll(`'${entry}'`,`'${target}'`);
}
const map=new Map();
const references=new Set((html+'\n'+css).match(/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2)/g)||[]);
for(const name of [...references].sort()){
  const source=path.resolve(root,name);
  if(!source.startsWith(path.join(root,'assets')+path.sep))throw Error('Invalid asset');
  const buffer=await fs.readFile(source),extension=path.extname(name);
  const target=name.slice(0,-extension.length)+'.'+fingerprint(buffer)+extension;
  map.set(name,target);await fs.mkdir(path.dirname(path.join(dist,target)),{recursive:true});await fs.writeFile(path.join(dist,target),buffer);
}
// HTML paths remain relative to the page; stylesheet URLs are relative to assets/.
html=html.replace(/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2)/g,name=>map.get(name)||name);
css=css.replace(/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2)/g,name=>path.posix.relative('assets',map.get(name)||name));
const cssResult=await transform(css,{loader:'css',minify:true,target:'es2020',charset:'utf8'});
const jsResult=await transform(js,{loader:'js',minify:true,format:'iife',target:'es2020',charset:'utf8',legalComments:'none'});
const cssFile=`assets/site.${fingerprint(cssResult.code)}.css`,jsFile=`assets/site.${fingerprint(jsResult.code)}.js`;
for(const [file,code] of [[cssFile,cssResult.code],[jsFile,jsResult.code]])await fs.writeFile(path.join(dist,file),code);
html=html.replace(/\s*<link rel="stylesheet" href="(?:fonts|styles|refinements|reference-effects)\.css">/g,'');
html=html.replace(/\s*<script src="(?:script|hero-scene|motion|reference-effects|gallery)\.js" defer><\/script>/g,'');
html=html.replace('  <script type="application/ld+json">',`  <link rel="stylesheet" href="${cssFile}">\n  <script src="${jsFile}" defer></script>\n  <script type="application/ld+json">`);
await fs.copyFile(path.join(root,'assets/fonts/OFL.txt'),path.join(dist,'assets/fonts/OFL.txt'));
for(const name of ['index.html','portfolio.html'])await fs.writeFile(path.join(dist,name),html);
await fs.writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
await fs.writeFile(path.join(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Cache-Control: no-cache\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
let compressedBytes=0;
for(const name of ['index.html','portfolio.html',cssFile,jsFile,...rendererFiles,...map.values()]){
  if(!/\.(?:html|css|js|svg)$/.test(name))continue;
  const buffer=await fs.readFile(path.join(dist,name));
  const br=brotliCompressSync(buffer,{params:{[constants.BROTLI_PARAM_QUALITY]:11}}),gz=gzipSync(buffer,{level:9});
  await fs.writeFile(path.join(dist,name+'.br'),br);await fs.writeFile(path.join(dist,name+'.gz'),gz);compressedBytes+=br.length;
}
const manifest={assets:Object.fromEntries(map),css:cssFile,js:jsFile,cssBytes:Buffer.byteLength(cssResult.code),jsBytes:Buffer.byteLength(jsResult.code),brotliTextBytes:compressedBytes};
await fs.writeFile(path.join(dist,'build-manifest.json'),JSON.stringify(manifest,null,2));
console.log(`Built dist/: ${map.size} fingerprinted assets, CSS ${manifest.cssBytes} bytes, JS ${manifest.jsBytes} bytes.`);

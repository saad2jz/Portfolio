import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {brotliCompressSync,gzipSync,constants} from 'node:zlib';
import {transform,build} from 'esbuild';
import {createRequire} from 'node:module';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(await fs.readFile(path.join(root,'site.config.json'),'utf8'));
const configuredUrl=(process.env.SITE_URL ?? config.url ?? '').trim();
let siteUrl=null;
if(configuredUrl){
  siteUrl=new URL(configuredUrl);
  if(!['http:','https:'].includes(siteUrl.protocol)||siteUrl.username||siteUrl.password||siteUrl.search||siteUrl.hash)throw Error('SITE_URL must be an HTTP(S) domain/subfolder without credentials, query or fragment');
  if(!siteUrl.pathname.endsWith('/'))siteUrl.pathname+='/';
}
// Pre-render the React composition: content and native disclosures work without JS.
await fs.mkdir(path.join(root,'.build'),{recursive:true});
const ssrFile=path.join(root,'.build/render.cjs');
await build({entryPoints:[path.join(root,'src/render.tsx')],outfile:ssrFile,bundle:true,platform:'node',format:'cjs',packages:'external',jsx:'automatic'});
const require=createRequire(import.meta.url);delete require.cache[ssrFile];
const markup=require(ssrFile).render();
const template=await fs.readFile(path.join(root,'page-template.html'),'utf8');
const sourceHtml=template.replace('<!--app-->',markup).replace(/[\t ]+$/gm,'');
for(const name of ['index.html','portfolio.html'])await fs.writeFile(path.join(root,name),sourceHtml);
const tailwindCss=await postcss([tailwind()]).process(await fs.readFile(path.join(root,'tailwind-input.css'),'utf8'),{from:path.join(root,'tailwind-input.css')});
await fs.writeFile(path.join(root,'generated-tailwind.css'),tailwindCss.css);
const dist=path.resolve(root,'dist');
if(path.dirname(dist)!==root||path.basename(dist)!=='dist')throw Error('Invalid build directory');
await fs.rm(dist,{recursive:true,force:true});
await fs.mkdir(path.join(dist,'assets'),{recursive:true});
const read=name=>fs.readFile(path.join(root,name),'utf8');
let html=await read('index.html');
const cssNames=['fonts.css','styles.css','refinements.css','reference-effects.css','project-reels.css','profile-content.css','deadwater.css','generated-tailwind.css','creator.css','ecosystems.css','extensions.css','personality.css','chapter-transitions.css'];
let css=(await Promise.all(cssNames.map(read))).join('\n');
const scripts=['src/main.tsx'];
const client=await build({entryPoints:[path.join(root,'src/main.tsx')],bundle:true,write:false,format:'iife',platform:'browser',target:'es2020',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},minify:true,legalComments:'none'});
let js=client.outputFiles[0].text;
const fingerprint=buffer=>createHash('sha256').update(buffer).digest('hex').slice(0,12);
const rendererFiles=[];
for(const [entry,format] of [['hero-worker.js','iife'],['hero-renderer.js','esm']]){
  const result=await build({entryPoints:[path.join(root,entry)],bundle:true,write:false,minify:true,format,platform:'browser',target:'es2020',charset:'utf8',legalComments:'none'});
  const buffer=result.outputFiles[0].contents;
  const target=`assets/${entry.slice(0,-3)}.${fingerprint(buffer)}.js`;
  await fs.writeFile(path.join(dist,target),buffer);rendererFiles.push(target);
  js=js.replaceAll(`'${entry}'`,`'${target}'`).replaceAll(`"${entry}"`,`"${target}"`);
}
const map=new Map();
const assetPattern=/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2|jpg|png)/g;
const references=new Set((html+'\n'+css+'\n'+js).match(assetPattern)||[]);
for(const name of [...references].sort()){
  const source=path.resolve(root,name);
  if(!source.startsWith(path.join(root,'assets')+path.sep))throw Error('Invalid asset');
  const buffer=await fs.readFile(source),extension=path.extname(name);
  const target=name.slice(0,-extension.length)+'.'+fingerprint(buffer)+extension;
  map.set(name,target);await fs.mkdir(path.dirname(path.join(dist,target)),{recursive:true});await fs.writeFile(path.join(dist,target),buffer);
}
// HTML paths remain relative to the page; stylesheet URLs are relative to assets/.
html=html.replace(assetPattern,name=>map.get(name)||name);
js=js.replace(assetPattern,name=>map.get(name)||name);
css=css.replace(assetPattern,name=>path.posix.relative('assets',map.get(name)||name));
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
if(siteUrl){
  const canonical=escape(siteUrl.href),cover=escape(new URL(map.get('assets/og-cover.jpg'),siteUrl).href);
  html=html.replace('  <meta property="og:type"',`  <link rel="canonical" href="${canonical}">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:type"`);
  html=html.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]+("\s*>)/g,(match,start,end)=>start+cover+end);
  html=html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,(match,start,json,end)=>{const person=JSON.parse(json);person.url=siteUrl.href;person['@id']=new URL('#saad-bayahia',siteUrl).href;return start+JSON.stringify(person).replaceAll('<','\\u003c')+end;});
}
const cssResult=await transform(css,{loader:'css',minify:true,target:'es2020',charset:'utf8'});
const jsResult=await transform(js,{loader:'js',minify:true,format:'iife',target:'es2020',charset:'utf8',legalComments:'none'});
const cssFile=`assets/site.${fingerprint(cssResult.code)}.css`,jsFile=`assets/site.${fingerprint(jsResult.code)}.js`;
for(const [file,code] of [[cssFile,cssResult.code],[jsFile,jsResult.code]])await fs.writeFile(path.join(dist,file),code);
// Use the bundle input lists so newly added modules cannot leave stale requests.
// Boolean attributes may be serialized as defer="" by an HTML editor.
html=html.replace(/<link\b[^>]*>/g,tag=>cssNames.includes(tag.match(/\bhref=["']([^"']+)["']/)?.[1])?'':tag);
html=html.replace(/<script\b[^>]*>\s*<\/script>/g,tag=>scripts.includes(tag.match(/\bsrc=["']([^"']+)["']/)?.[1])?'':tag);
html=html.replace('<script type="application/ld+json">',`<link rel="stylesheet" href="${cssFile}">\n  <script src="${jsFile}" defer></script>\n  <script type="application/ld+json">`);
await fs.copyFile(path.join(root,'assets/fonts/OFL.txt'),path.join(dist,'assets/fonts/OFL.txt'));
await fs.copyFile(path.join(root,'assets/fonts/Humane-LICENSE.txt'),path.join(dist,'assets/fonts/Humane-LICENSE.txt'));
await fs.copyFile(path.join(root,'assets/fonts/Kanit-OFL.txt'),path.join(dist,'assets/fonts/Kanit-OFL.txt'));
for(const name of ['SpaceGrotesk-OFL.txt','DMSans-OFL.txt'])await fs.copyFile(path.join(root,'assets/fonts',name),path.join(dist,'assets/fonts',name));
for(const name of ['index.html','portfolio.html'])await fs.writeFile(path.join(dist,name),html);
await fs.writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\n'+(siteUrl?`Sitemap: ${new URL('sitemap.xml',siteUrl).href}\n`:''));
if(siteUrl)await fs.writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(siteUrl.href)}</loc></url></urlset>\n`);
await fs.writeFile(path.join(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Cache-Control: no-cache\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n');
let compressedBytes=0;
for(const name of ['index.html','portfolio.html',cssFile,jsFile,...rendererFiles,...map.values()]){
  if(!/\.(?:html|css|js|svg)$/.test(name))continue;
  const buffer=await fs.readFile(path.join(dist,name));
  const br=brotliCompressSync(buffer,{params:{[constants.BROTLI_PARAM_QUALITY]:11}}),gz=gzipSync(buffer,{level:9});
  await fs.writeFile(path.join(dist,name+'.br'),br);await fs.writeFile(path.join(dist,name+'.gz'),gz);compressedBytes+=br.length;
}
const manifest={url:siteUrl?.href||null,assets:Object.fromEntries(map),css:cssFile,js:jsFile,cssBytes:Buffer.byteLength(cssResult.code),jsBytes:Buffer.byteLength(jsResult.code),brotliTextBytes:compressedBytes};
await fs.writeFile(path.join(dist,'build-manifest.json'),JSON.stringify(manifest,null,2));
console.log(`Built dist/: ${map.size} fingerprinted assets, CSS ${manifest.cssBytes} bytes, JS ${manifest.jsBytes} bytes.`);

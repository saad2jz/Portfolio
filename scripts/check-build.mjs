import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {brotliDecompressSync,gunzipSync} from 'node:zlib';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFile(path.join(root,'dist',name),'utf8');
let count=0;
function check(name,test){assert.ok(test,name);count++;console.log(`PASS ${name}`);}
function build(url){return spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,env:{...process.env,SITE_URL:url},encoding:'utf8'});}
async function verify(url){
  const result=build(url);assert.equal(result.status,0,result.stderr);
  const html=await read('index.html'),manifest=JSON.parse(await read('build-manifest.json'));
  const base=url?url.replace(/\/?$/,'/'):null;
  check('Both entry points have the same canonical document',html===await read('portfolio.html'));
  check('Configured root/subfolder is preserved',manifest.url===base);
  const missing=[];
  for(const asset of new Set([...Object.values(manifest.assets),manifest.css,manifest.js,...(html.match(/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2|jpg|js|css)/g)||[])]))try{await fs.access(path.join(root,'dist',asset));}catch{missing.push(asset);}
  check('Every referenced gallery, preview, font and bundle exists',missing.length===0);
  const cover=manifest.assets['assets/og-cover.jpg'];
  if(base){
    check('Canonical and Open Graph URLs match',html.includes(`rel="canonical" href="${base}"`)&&html.includes(`property="og:url" content="${base}"`));
    check('Social images use an absolute hashed URL',html.includes(`property="og:image" content="${new URL(cover,base).href}"`)&&html.includes(`name="twitter:image" content="${new URL(cover,base).href}"`));
    const person=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    check('Structured data uses the public address',person.url===base&&person['@id']===new URL('#saad-bayahia',base).href);
    check('Sitemap indexes only the canonical page',await read('sitemap.xml').then(xml=>xml.includes(`<loc>${base}</loc>`)&&!xml.includes('portfolio.html')));
    check('Robots points to the public sitemap',await read('robots.txt').then(s=>s.includes(`Sitemap: ${new URL('sitemap.xml',base).href}`)));
  }else{
    check('Local previews do not invent a public canonical',!html.includes('rel="canonical"')&&!html.includes('property="og:url"'));
    check('Local social cover remains available without a public domain',html.includes(`property="og:image" content="${cover}"`));
    check('An unconfigured build has no stale sitemap',await fs.access(path.join(root,'dist/sitemap.xml')).then(()=>false,()=>true));
  }
  const original=await fs.readFile(path.join(root,'dist/index.html'));
  check('Compressed HTML decodes to the delivered document',brotliDecompressSync(await fs.readFile(path.join(root,'dist/index.html.br'))).equals(original)&&gunzipSync(await fs.readFile(path.join(root,'dist/index.html.gz'))).equals(original));
}
try{
  await verify('https://portfolio.example');
  await verify('https://portfolio.example/projects/saad/');
  const previous=await read('index.html');
  const invalid=build('https://user:password@portfolio.example/');
  check('Invalid deployment addresses are rejected before changing the build',invalid.status!==0&&await read('index.html')===previous);
  await verify('');
  console.log(`${count} production-build checks passed.`);
}finally{
  const restored=spawnSync(process.execPath,['scripts/build.mjs'],{cwd:root,env:process.env,encoding:'utf8'});
  if(restored.status!==0)throw Error(restored.stderr);
}

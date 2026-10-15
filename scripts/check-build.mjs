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
  const english=await read('en/index.html');
  check('Dedicated FR and EN pages have matching language and Product Owner positioning',html.includes('<html lang="fr"')&&english.includes('<html lang="en"')&&html.includes('Product Owner à Paris</title>')&&english.includes('Product Owner in Paris</title>'));
  check('Contact guidance is translated in the initial French document',html.includes('Tous les champs sont obligatoires.'));
  const work=html.slice(html.indexOf('<section id="work"'),html.indexOf('<section id="entrepreneurship"'));
  check('All nine projects are visible as full case-study cards',(work.match(/class="[^"]*creator-project project\b/g)||[]).length===9&&!/class="other-projects"/.test(work));
  check('All 27 requested project captures retain their original gallery groups',Object.entries({ffa:9,leadhunt:7,cardiag:5,secoursnow:6}).every(([id,total])=>(work.match(new RegExp(`data-gallery="${id}"`,'g'))||[]).length===total));
  const career=work.slice(work.indexOf('<article id="career"'),work.indexOf('<article id="remote"'));
  check('Career Ops keeps its case study without screenshots',career.includes('Career Ops Workspace')&&!career.includes('media-link'));
  check('Owner certifications and ISEN AWS / Power BI learning remain visible',html.includes('data-i18n="certLean"')&&html.includes('data-i18n="certAnthropic"')&&html.includes('data-i18n="certShopify"')&&html.includes('data-i18n="certCisco"')&&html.includes('data-i18n="certHubspot"')&&(html.match(/data-i18n="isenCloudDataTraining"/g)||[]).length===2&&!/<details class="additional-learning"/.test(html));
  check('Requested hero and language descriptions are removed in both languages',[html,english].every(page=>!page.includes('class="language-use"')&&!page.includes('5 marketplaces · n8n automation')&&!page.includes('5 marketplaces · automatisation n8n')));
  check('English page assets resolve from its own directory',english.includes(`src="../${manifest.js}"`)&&english.includes(`href="../${manifest.css}"`)&&!/\b(?:src|href|data-full-src|data-logo-atlas)="assets\//.test(english));
  check('Both public CV PDFs are valid PDF files',(await fs.readFile(path.join(root,'dist/cv/saad-bayahia-fr.pdf'))).subarray(0,5).toString()==='%PDF-'&&(await fs.readFile(path.join(root,'dist/cv/saad-bayahia-en.pdf'))).subarray(0,5).toString()==='%PDF-');
  check('CV landing pages and language-specific links are delivered',html.includes('href="cv/"')&&english.includes('href="../cv/en/"')&&(await read('cv/index.html')).includes('saad-bayahia-fr.pdf')&&(await read('cv/en/index.html')).includes('saad-bayahia-en.pdf'));
  check('Both entry points have the same canonical document',html===await read('portfolio.html'));
  check('Configured root/subfolder is preserved',manifest.url===base);
  const missing=[];
  for(const asset of new Set([...Object.values(manifest.assets),manifest.css,manifest.js,...(html.match(/assets\/[a-zA-Z0-9_./-]+\.(?:svg|webp|avif|woff2|jpg|js|css)/g)||[])]))try{await fs.access(path.join(root,'dist',asset));}catch{missing.push(asset);}
  check('Every referenced gallery, preview, font and bundle exists',missing.length===0);
  const scriptSources=[...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)].map(m=>m[1]);
  const stylesheets=[...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/g)].map(m=>m[1]);
  check('Production requests only the compiled script and stylesheet',scriptSources.length===1&&scriptSources[0]===manifest.js&&stylesheets.length===1&&stylesheets[0]===manifest.css);
  const stale=[];
  for(const file of [...scriptSources,...stylesheets])try{await fs.access(path.join(root,'dist',file));}catch{stale.push(file);}
  check('Every HTML script and stylesheet request has a delivered file',stale.length===0);
  const cover=manifest.assets['assets/og-cover.jpg'];
  if(base){
    check('Both languages publish reciprocal hreflang and their own canonical',english.includes(`rel="canonical" href="${new URL('en/',base).href}"`)&&[html,english].every(page=>page.includes(`hreflang="fr" href="${base}"`)&&page.includes(`hreflang="en" href="${new URL('en/',base).href}"`)));
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

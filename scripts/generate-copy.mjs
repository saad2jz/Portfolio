import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const inputs=await Promise.all(['src/content.json','src/journey.json'].map(name=>fs.readFile(path.join(root,name),'utf8')));
const copy={};
const decode=s=>s.replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi,value=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'"}[value]??String.fromCodePoint(parseInt(value.slice(2,-1).replace(/^x/i,''),/^&#x/i.test(value)?16:10))));
function visit(value){
 if(typeof value==='string')for(const match of value.matchAll(/<([a-z][a-z0-9]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi))copy[match[2]]=decode(match[3].replace(/<br\s*\/?\s*>/gi,'\n').replace(/<[^>]+>/g,''));
 else if(Array.isArray(value))value.forEach(visit);
 else if(value&&typeof value==='object')Object.values(value).forEach(visit);
}
inputs.forEach(source=>visit(JSON.parse(source)));
await fs.writeFile(path.join(root,'src/copy-en.json'),JSON.stringify(copy,null,2)+'\n');

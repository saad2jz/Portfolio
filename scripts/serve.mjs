import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const repository=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const argument=name=>process.argv.find(x=>x.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const root=path.resolve(repository,argument('root')||'dist');
const port=Number(argument('port')||4175);
await fs.access(path.join(root,'index.html'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.jpg':'image/jpeg','.png':'image/png','.xml':'application/xml; charset=utf-8','.woff2':'font/woff2','.json':'application/json','.txt':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{
  try{
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});return res.end();}
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file=path.resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    const relative=path.relative(root,file);
    if(relative.startsWith('..')||path.isAbsolute(relative)||relative.split(path.sep).some(p=>p.startsWith('.'))||!types[path.extname(file)]){res.writeHead(404);return res.end('Not found');}
    const original=await fs.readFile(file);
    const etag='"'+createHash('sha256').update(original).digest('hex').slice(0,16)+'"';
    res.setHeader('ETag',etag);res.setHeader('Content-Type',types[path.extname(file)]);res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    res.setHeader('Cache-Control',/\.[a-f0-9]{12}\./.test(relative)?'public, max-age=31536000, immutable':'no-cache');
    res.setHeader('Vary','Accept-Encoding');
    if(req.headers['if-none-match']===etag){res.writeHead(304);return res.end();}
    let data=original;
    const accepts=req.headers['accept-encoding']||'';
    for(const [encoding,suffix] of [['br','.br'],['gzip','.gz']]){
      if(!new RegExp(`(?:^|,)\\s*${encoding}(?:\\s*(?:,|$)|\\s*;\\s*q=(?!0(?:\\.0*)?(?:\\s*,|$)))`).test(accepts))continue;
      try{data=await fs.readFile(file+suffix);res.setHeader('Content-Encoding',encoding);break;}catch{}
    }
    res.setHeader('Content-Length',data.length);res.writeHead(200);res.end(req.method==='HEAD'?undefined:data);
  }catch(error){res.writeHead(error.code==='ENOENT'?404:400);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://127.0.0.1:${port}/`));

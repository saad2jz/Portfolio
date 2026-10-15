import fs from 'node:fs/promises';
import path from 'node:path';
export async function writeCVPages(root,dist){
 await fs.mkdir(path.join(dist,'cv/en'),{recursive:true});
 for(const lang of ['fr','en'])await fs.copyFile(path.join(root,`public/cv/saad-bayahia-${lang}.pdf`),path.join(dist,`cv/saad-bayahia-${lang}.pdf`));
 for(const lang of ['fr','en']){
  const fr=lang==='fr',prefix=fr?'':'../';
  const html=`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Saad Bayahia — CV ${lang.toUpperCase()}</title><style>html{color-scheme:dark}body{font:18px/1.6 system-ui,sans-serif;background:#0c0c0c;color:#e7eeea;max-width:760px;margin:0 auto;padding:60px 24px}a{color:#a4d8c5;text-underline-offset:5px}nav{display:flex;gap:28px;flex-wrap:wrap;margin:32px 0}.download{padding:16px 24px;border:1px solid #8bc5b2;border-radius:32px}h1{line-height:1.15}p{color:#bdccc5}a:focus-visible{outline:3px solid #a4d8c5;outline-offset:7px}</style></head><body><main><a href="${fr?'../':'../../en/'}">← ${fr?'Retour au portfolio':'Back to the portfolio'}</a><h1>Saad Bayahia<br>Product Owner · Paris</h1><p>${fr?'CV public, mis à jour avec les périodes confirmées. Les formations en cours sont distinguées des qualifications obtenues.':'Public résumé, updated with confirmed dates. Training in progress is distinguished from awarded qualifications.'}</p><nav aria-label="${fr?'Télécharger le CV':'Download the résumé'}"><a class="download" href="${prefix}saad-bayahia-fr.pdf" download>CV français · PDF</a><a class="download" href="${prefix}saad-bayahia-en.pdf" download>English CV · PDF</a></nav><p>${fr?'Pour échanger sur une opportunité :':'To discuss an opportunity:'} <a href="https://calendly.com/saad-bayahia" target="_blank" rel="noopener noreferrer">Calendly ↗</a></p></main></body></html>`;
  await fs.writeFile(path.join(dist,fr?'cv/index.html':'cv/en/index.html'),html);
 }
}

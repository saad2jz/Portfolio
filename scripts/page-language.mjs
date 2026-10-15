const titles={fr:'Saad Bayahia — Product Owner à Paris',en:'Saad Bayahia — Product Owner in Paris'};
const descriptions={fr:'Product Owner à Paris. Shopify Plus, 5 marketplaces, automatisation n8n et produits IA. Expérience complémentaire en ingénierie d’affaires et qualité industrielle.',en:'Product Owner in Paris. Shopify Plus, 5 marketplaces, n8n automation and AI products. Supported by business-engineering and industrial-quality experience.'};
export const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export function pageLanguage(html,language){
 const title=escape(titles[language]),description=escape(descriptions[language]);
 return html.replace(/<html lang="[^"]+"/,`<html lang="${language}"`).replace(/<title>.*?<\/title>/,`<title>${title}</title>`)
 .replace(/(<meta (?:property="og:title"|name="twitter:title"|property="og:image:alt"|name="twitter:image:alt") content=")[^"]+("\s*>)/g,(_,a,b)=>a+title+b)
 .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]+("\s*>)/g,(_,a,b)=>a+description+b);
}

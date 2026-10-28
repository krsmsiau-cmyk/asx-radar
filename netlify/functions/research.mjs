// Netlify Functions - public Google News RSS discovery (no API key).
// News snippets are leads only, NOT verified facts or financial statements.
const decode=s=>(s||'').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1')
  .replace(/&#(x[0-9a-f]+|\d+);/gi,(_,n)=>String.fromCodePoint(n[0].toLowerCase()==='x'?parseInt(n.slice(1),16):parseInt(n,10)))
  .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'").trim();
const tag=(xml,name)=>decode((xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`,'i'))||[])[1]);
export default async (request)=>{
  const sym=new URL(request.url).searchParams.get('symbol')?.trim().toUpperCase()||'';
  if(!/^[A-Z0-9]{1,8}$/.test(sym))return new Response(JSON.stringify({error:'Invalid ASX symbol'}),{status:400,headers:{'content-type':'application/json'}});
  const names={BHP:'BHP Group',CBA:'Commonwealth Bank of Australia',WBC:'Westpac',NAB:'National Australia Bank',RIO:'Rio Tinto',FMG:'Fortescue',WES:'Wesfarmers',CSL:'CSL Limited',WOW:'Woolworths Group',MQG:'Macquarie Group',XRO:'Xero',WTC:'WiseTech Global',PLS:'Pilbara Minerals',MIN:'Mineral Resources',STO:'Santos',GMG:'Goodman Group'};
  const query=names[sym]?`"${names[sym]}" ASX`:`"${sym}.AX" OR "ASX:${sym}"`;
  const url='https://news.google.com/rss/search?q='+encodeURIComponent(query)+'&hl=en-AU&gl=AU&ceid=AU:en';
  try{
    const controller=new AbortController();const tid=setTimeout(()=>controller.abort(),9000);
    let res;try{res=await fetch(url,{signal:controller.signal,headers:{'User-Agent':'ASXRadarResearch/1.0'}})}finally{clearTimeout(tid)}
    if(!res.ok)throw Error('RSS upstream HTTP '+res.status);
    const xml=await res.text();if(!xml.includes('<rss'))throw Error('RSS unavailable');
    const articles=[...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0,12).map(([,item])=>({title:tag(item,'title'),link:tag(item,'link'),published:tag(item,'pubDate'),source:tag(item,'source')})).filter(a=>a.title&&a.link.startsWith('https://'));
    return new Response(JSON.stringify({symbol:sym,articles,queriedAt:new Date().toISOString(),source:'Google News RSS; unverified headlines'}),{headers:{'content-type':'application/json; charset=utf-8','cache-control':'public, max-age=600'}});
  }catch(e){return new Response(JSON.stringify({error:'News retrieval unavailable',details:String(e.message)}),{status:502,headers:{'content-type':'application/json'}})}
};
export const config={path:'/.netlify/functions/research'};

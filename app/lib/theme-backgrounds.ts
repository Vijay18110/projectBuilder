/** Apply the same theme surfaces to studio CSS, component kits, and app exports.
 * Only background declarations are changed: color tokens remain usable by borders,
 * text, charts, and color-mix(). Existing artwork and semantic colors stay intact.
 */
export function themeBackgrounds(css:string,path=''):string {
 css=css.replace(/\n\/\* White layout surfaces \*\/[\s\S]*?\/\* End white layout surfaces \*\//g,'');
 const surfaces:Record<string,string>={
  surface:'linear-gradient(120deg,color-mix(in srgb,var(--primary) 8%,var(--surface)),color-mix(in srgb,var(--accent) 6%,var(--surface)))',
  muted:'linear-gradient(120deg,color-mix(in srgb,var(--primary) 12%,var(--muted)),color-mix(in srgb,var(--accent) 9%,var(--muted)))',
  bg:'linear-gradient(135deg,color-mix(in srgb,var(--primary) 4%,var(--bg)),var(--bg) 50%,color-mix(in srgb,var(--accent) 4%,var(--bg)))',
  primary:'linear-gradient(115deg,var(--primary),color-mix(in srgb,var(--primary) 82%,var(--accent)))',
  accent:'linear-gradient(115deg,var(--accent),color-mix(in srgb,var(--accent) 82%,var(--primary)))',
 };
 const themed=css.replace(/\bbackground\s*:\s*var\(--(surface|muted|bg|primary|accent)\)(?=\s*[;}])/g,(_,key:string)=>'background:'+surfaces[key])
  .replace(/\bbackground\s*:\s*(color-mix\(in srgb,\s*var\(--primary\)\s+(\d+(?:\.\d+)?)%,\s*var\(--surface\)\))(?=\s*[;}])/g,(_,color:string,amount:string)=>'background:linear-gradient(120deg,'+color+',color-mix(in srgb,var(--accent) '+amount+'%,var(--surface)))');
 const names=['card','panel','header','footer','sidebar','product'];
 if(/(?:^|[\\/])Card\.module\.css$/.test(path))names.push('base');
 if(path.includes('NavbarExample'))names.push('nav');
 if(path.includes('SidebarExample'))names.push('side');
 const targets=names.filter(name=>new RegExp('\\.'+name+'(?=[\\s.{:#>+~\\[])').test(css));
 if(!targets.length)return themed;
 const selectors=targets.map(name=>'.'+name+'.'+name).join(',');
 const scope='--surface:#fff;--text:#23243a;--secondary:#6b6d82;--muted:#f3f4f8;--border:#e8e9f1;background:#fff;color:var(--text);';
 const sidebar=targets.includes('sidebar')?'.sidebar.sidebar .brand{color:var(--text)}.sidebar.sidebar nav a{color:var(--secondary)}.sidebar.sidebar nav a[aria-current=page]{color:var(--primary)}':'';
 return themed+'\n/* White layout surfaces */'+selectors+'{'+scope+'}'+sidebar+'/* End white layout surfaces */';
}

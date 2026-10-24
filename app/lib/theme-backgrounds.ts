/** Apply the same theme surfaces to studio CSS, component kits, and app exports.
 * Surface effects are shared; color tokens remain usable by borders,
 * text, charts, and color-mix(). Existing artwork and semantic colors stay intact.
 */
export function themeBackgrounds(css:string,path=''):string {
 css=css.replace(/\n\/\* White layout surfaces \*\/[\s\S]*?\/\* End white layout surfaces \*\//g,'');
 if(/(?:^|[\\/])marketing[\\/]/.test(path))return css;
 // Normalize the old blanket gradients before applying the selected surface style.
 // Keep deliberate artwork (charts, hero sections and gradient variants) intact.
 const themed=css
  .replace(/linear-gradient\(120deg,color-mix\(in srgb,var\(--primary\) 8%,var\(--surface\)\),color-mix\(in srgb,var\(--accent\) 6%,var\(--surface\)\)\)/g,'var(--surface)')
  .replace(/linear-gradient\(120deg,color-mix\(in srgb,var\(--primary\) 12%,var\(--muted\)\),color-mix\(in srgb,var\(--accent\) 9%,var\(--muted\)\)\)/g,'var(--muted)')
  .replace(/linear-gradient\(135deg,color-mix\(in srgb,var\(--primary\) 4%,var\(--bg\)\),var\(--bg\) 50%,color-mix\(in srgb,var\(--accent\) 4%,var\(--bg\)\)\)/g,'var(--bg)')
  .replace(/linear-gradient\(120deg,(color-mix\(in srgb,var\(--primary\) (\d+(?:\.\d+)?)%,var\(--surface\)\)),color-mix\(in srgb,var\(--accent\) \2%,var\(--surface\)\)\)/g,'$1');
 const names=['card','panel','header','footer','sidebar','product','chart','recent','previewNav','menu'];
 if(/(?:^|[\\/])Card\.module\.css$/.test(path))names.push('base');
 if(path.includes('NavbarExample'))names.push('nav');
 if(path.includes('SidebarExample'))names.push('side');
 const targets=names.filter(name=>new RegExp('\\.'+name+'(?=[\\s.{:#>+~\\[])').test(css));
 if(!targets.length)return themed;
 const selectors=targets.map(name=>'.'+name+'.'+name).join(',');
 const scope='background:var(--design-surface,var(--surface));color:var(--text);box-shadow:var(--design-shadow,var(--shadow));backdrop-filter:var(--design-blur,none);-webkit-backdrop-filter:var(--design-blur,none);border-color:var(--border);';
 const flat=targets.filter(name=>['header','footer','sidebar','previewNav','nav','side'].includes(name)).map(name=>'.'+name+'.'+name).join(',');
 const layout=flat?flat+'{box-shadow:none}':'';
 const controls=css.includes('.demo')?'.demo{font-family:var(--font);font-size:var(--size);line-height:var(--line-height);font-weight:var(--font-weight)}.demo .panel{padding:var(--space)}.demo .button:not(.pill):not(.circle),.demo .input,.demo .panel{border-radius:var(--radius);border-width:var(--border-width,1px)}.demo .button:not(.ghost):not(.outline){box-shadow:var(--design-shadow,var(--shadow))}.demo .input{box-shadow:var(--design-input-shadow,none)}':'';
 const sidebar=targets.includes('sidebar')?'.sidebar.sidebar .brand{color:var(--text)}.sidebar.sidebar nav a{color:var(--secondary)}.sidebar.sidebar nav a[aria-current=page]{color:var(--primary)}':'';
 return themed+'\n/* White layout surfaces */'+selectors+'{'+scope+'}'+layout+controls+sidebar+'/* End white layout surfaces */';
}

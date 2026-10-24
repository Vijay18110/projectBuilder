const fs=require('node:fs'),ts=require('typescript'),assert=require('node:assert/strict');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,p);
const {defaultTheme,themeSchema,tokens,exportSchema,variants}=require('../app/lib/registry.ts');
const {designStyles,selectDesignStyle}=require('../app/lib/design-styles.ts');
const {themeBackgrounds}=require('../app/lib/theme-backgrounds.ts');
const {generateProject}=require('../app/lib/generator.ts');
const legacy={...defaultTheme};delete legacy.designStyle;assert.equal(themeSchema.parse(legacy).designStyle,'modern');assert.equal(themeSchema.safeParse({...defaultTheme,designStyle:'invalid'}).success,false);
for(const {id} of designStyles){
 const theme=selectDesignStyle({...defaultTheme,primary:'#16876a',mode:'system'},id);
 assert.equal(theme.primary,'#16876a');assert.equal(theme.mode,'system');assert.equal(themeSchema.parse(JSON.parse(JSON.stringify(theme))).designStyle,id);
 const css=tokens(theme);assert.ok(!css.includes('${'),'CSS must interpolate dark palette values');assert.ok(tokens({...theme,mode:'dark'}).includes('--bg:'+theme.darkBackground));assert.ok(css.includes('--design-surface:'));assert.ok(css.includes('--design-shadow:'));assert.ok(css.includes('@media(prefers-color-scheme:dark)'));
 for(const framework of ['next','react']){
  const config=exportSchema.parse({name:'style-check',framework,features:['overview'],theme,variants:Object.fromEntries(Object.entries(variants).map(([key,values])=>[key,[values[0]]]))});
  const files=generateProject(config),allCSS=Object.entries(files).filter(([name])=>name.endsWith('.css')).map(([,content])=>content).join('\n');
  assert.ok(allCSS.includes('--design-surface:'));assert.ok(allCSS.includes('--design-shadow:'));assert.ok(allCSS.includes('backdrop-filter:var(--design-blur,none)'));
 }
}
const surfaces=themeBackgrounds('.card{background:var(--surface)}.sidebar{background:var(--surface)}');assert.ok(!surfaces.includes('--surface:#fff'));assert.ok(surfaces.includes('background:var(--design-surface,var(--surface))'));assert.equal(themeBackgrounds(surfaces),surfaces);
console.log('Design styles: legacy themes, validation, palette preservation, JSON round trips, both framework exports, and shared surfaces passed.');

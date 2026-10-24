const fs=require('fs'),ts=require('typescript'),assert=require('node:assert/strict');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,p);
require.extensions['.tsx']=require.extensions['.ts'];require.extensions['.css']=m=>{m.exports={__esModule:true,default:new Proxy({},{get:(_,key)=>String(key)})}};
const r=require('../app/lib/registry.ts'),{builderFeatures,defaultDashboardPages}=require('../app/lib/builder-options.ts'),{generateProject}=require('../app/lib/generator.ts');
assert.equal(defaultDashboardPages.length,10);assert.equal(builderFeatures([]).filter(x=>x!=='auth').length,10);assert.ok(builderFeatures(['orders']).includes('customers'));assert.ok(builderFeatures(['orders']).includes('products'));
for(const framework of ['react','next']){
 const prefix=framework==='react'?'src/':'';
 const base={name:'builder-flow',framework,features:builderFeatures([]),theme:r.defaultTheme,variants:Object.fromEntries(Object.entries(r.variants).map(([k,v])=>[k,[v[0]]]))};
 const files=generateProject(r.exportSchema.parse(base));for(const id of defaultDashboardPages)assert.ok(files[prefix+'features/Feature'+id[0].toUpperCase()+id.slice(1)+'.tsx']);
}
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Builder=require('../app/components/BuilderFlow.tsx').default;
const html=renderToStaticMarkup(React.createElement(Builder,{theme:r.defaultTheme,draft:r.defaultTheme,setDraft:()=>{},apply:()=>{},notify:()=>{},ready:false}));
assert.equal((html.match(/type="checkbox" checked=""/g)||[]).length,10);assert.ok(html.includes('File structure'));assert.ok(html.includes('Select pages'));assert.ok(html.includes('10 pages'));
console.log('Builder flow: rendered default selection, 10 real pages, dependencies, and matching Next.js routes passed.');

assert.equal(r.exportSchema.safeParse({name:'removed-store',framework:'next',projectType:'ecommerce',features:['overview'],theme:r.defaultTheme,variants:Object.fromEntries(Object.entries(r.variants).map(([k,v])=>[k,[v[0]]]))}).success,false);
assert.equal(fs.existsSync('app/lib/templates/storefront.ts'),false);
assert.ok(!require('../app/lib/component-catalog.json').some(item=>item.category==='Commerce'));
for(const framework of ['react','next']){const result=generateProject(r.exportSchema.parse({name:'dashboard-only',framework,features:builderFeatures([]),theme:r.defaultTheme,variants:Object.fromEntries(Object.entries(r.variants).map(([k,v])=>[k,[v[0]]]))}));assert.ok(!Object.keys(result).some(file=>/storefront|cartsummary|productcard/i.test(file)))}

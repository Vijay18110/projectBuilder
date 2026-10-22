const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
require.extensions['.ts']=(module,path)=>module._compile(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,path);
const {exportSchema,defaultTheme,variants}=require('../app/lib/registry.ts');
const {generateProject}=require('../app/lib/generator.ts');
const base={name:'preview-test',framework:'next',features:['overview'],theme:defaultTheme,variants:Object.fromEntries(Object.entries(variants).map(([key,values])=>[key,[values[0]]])),pages:{overview:[{id:'buttons',variant:'outline'},{id:'cards',variant:'bordered'}]}};
// Use catalog-supported variants, independent of the builder's global variant registry.
const catalog=require('../app/lib/component-catalog.json');
base.pages.overview[1].variant=catalog.find(x=>x.id==='cards').variants[0];
for(const framework of ['next','react']){
 const config=exportSchema.parse({...base,framework});const files=generateProject(config);const prefix=framework==='next'?'':'src/';
 assert.ok(files[prefix+'components/composed/ButtonsExample.tsx']);
 assert.ok(!files[prefix+'components/composed/CalendarExample.tsx']);
 assert.ok(files[prefix+'components/PageComposition.tsx'].includes('outline'));
 assert.ok(files[prefix+'App.tsx'].includes('<PageComposition page={page}/>'));
 assert.equal((files[prefix+'App.tsx'].match(/import PageComposition from/g)||[]).length,1);
 assert.equal((files[prefix+'App.tsx'].match(/<PageComposition page=/g)||[]).length,1);
 assert.ok(files[prefix+'App.tsx'].includes('<DashboardLayout'));
 assert.deepEqual(JSON.parse(files['project.config.json']).pages,base.pages);
 for(const [path,source] of Object.entries(files).filter(([p])=>/\.tsx?$/.test(p)&&!p.endsWith('.d.ts'))){const result=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}});assert.equal((result.diagnostics||[]).filter(x=>x.category===ts.DiagnosticCategory.Error).length,0,path)}
}
assert.equal(exportSchema.safeParse({...base,pages:{unknown:base.pages.overview}}).success,false);
assert.equal(exportSchema.safeParse({...base,pages:{overview:[{id:'buttons',variant:'invalid'}]}}).success,false);
assert.equal(exportSchema.safeParse({...base,pages:{overview:Array(21).fill(base.pages.overview[0])}}).success,false);
assert.equal(exportSchema.safeParse({...base,pages:undefined}).success,true);
console.log('Page composition: React/Next generation, component inclusion/exclusion, variants, configuration, syntax, and invalid selections passed.');

const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,p);
const r=require('../app/lib/registry.ts'),{configureProject,applicationConfig,applicationFeatures,projectTypes}=require('../app/lib/project-types.ts'),{generateProject}=require('../app/lib/generator.ts');
const base={name:'preset-project',framework:'next',features:r.features.map(f=>f[0]),theme:r.defaultTheme,variants:Object.fromEntries(Object.entries(r.variants).map(([id,values])=>[id,[values[0]]])),pages:{builder:[{id:'buttons',variant:'solid'}]}};
for(const framework of ['next','react']){
 const legacy=generateProject({...base,framework});const prefix=framework==='next'?'':'src/';
 const manifest=JSON.parse(legacy['project.config.json']);
 for(const id of ['builder','components','theme']){assert.ok(!manifest.features.includes(id));assert.ok(!legacy['app/'+id+'/page.tsx']);assert.ok(!legacy[prefix+'features/Feature'+id[0].toUpperCase()+id.slice(1)+'.tsx']);}
 assert.ok(!Object.keys(legacy).some(p=>p.includes('/studio/')));assert.ok(!JSON.parse(legacy['package.json']).dependencies.jszip);assert.deepEqual(manifest.pages,{});
 for(const type of projectTypes){
  const config=r.exportSchema.parse(configureProject(type.id,{...base,framework}));const files=generateProject(config);assert.equal(JSON.parse(files['project.config.json']).projectType,type.id);
  assert.ok(!config.features.some(id=>['builder','components','theme'].includes(id)));assert.ok(Object.values(config.pages).flat().length>0);
  if(type.id==='dashboard')assert.deepEqual(config.features,applicationFeatures.map(f=>f[0]));
  if(type.id==='ecommerce'){assert.ok(files[prefix+'App.tsx'].includes('Place demo order'));assert.ok(files[prefix+'App.tsx'].includes('localStorage.setItem'));assert.ok(files[prefix+'Storefront.module.css'].includes('@media(max-width:560px)'));assert.ok(!files[prefix+'App.tsx'].includes('__CONFIG__'));assert.ok(!config.features.includes('auth'));}
  for(const [path,source] of Object.entries(files).filter(([p])=>/\.tsx?$/.test(p)&&!p.endsWith('.d.ts'))){const diagnostics=ts.transpileModule(source,{fileName:path,reportDiagnostics:true,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).diagnostics||[];assert.equal(diagnostics.filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,path)}
 }
}
assert.deepEqual(applicationConfig({...base,features:['builder','components','theme']}).features,['overview']);
console.log('Project types: both frameworks, legacy studio exclusions, dashboard completeness, automatic component assignments, storefront generation, and template syntax passed.');

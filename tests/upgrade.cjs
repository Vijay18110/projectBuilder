const fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),assert=require('node:assert/strict');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,p);
const registry=require('../app/lib/registry.ts'),{generateProject}=require('../app/lib/generator.ts'),{readStudioSources}=require('../server/studio-sources.ts');
const base={name:'full-project',features:registry.features.map(x=>x[0]),theme:registry.defaultTheme,variants:Object.fromEntries(Object.entries(registry.variants).map(([k,v])=>[k,[v[0]]])),pages:{customers:[{id:'buttons',variant:'outline'}]}};
const {configureProject,projectTypes}=require('../app/lib/project-types.ts');
for(const framework of ['next','react'])for(const type of [null,...projectTypes.map(t=>t.id)]){
 const config=registry.exportSchema.parse(type?configureProject(type,{...base,framework}):{...base,framework});const files=generateProject(config,readStudioSources());
 assert.ok(files['server/handler.mjs'].includes('createBackend'));assert.ok(!files['server/handler.mjs'].includes('__KINDS__'));assert.ok(!Object.values(files).some(x=>x.includes('admin@demo.forge')||x.includes('PreviewDemo123')),'Exports must exclude preview accounts');
 const dir=path.resolve('.forge-checks',framework+(type?'-'+type:''));for(const [name,text] of Object.entries(files)){const dest=path.resolve(dir,name);assert.ok(dest.startsWith(dir+path.sep));fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,text)}
 if(framework==='react')fs.writeFileSync(path.join(dir,'vite-env.d.ts'),'/// <reference types="vite/client" />\n');
 // A real TypeScript program catches cross-template import and resolver errors.
 const configFile=ts.readConfigFile(path.join(dir,'tsconfig.json'),ts.sys.readFile);
 const parsed=ts.parseJsonConfigFileContent(configFile.config,ts.sys,dir);
 const program=ts.createProgram(parsed.fileNames,parsed.options);
 const diagnostics=[...(configFile.error?[configFile.error]:[]),...parsed.errors,...ts.getPreEmitDiagnostics(program)];
 console.log(framework+(type?' / '+type:'')+': '+Object.keys(files).length+' files');
 if(diagnostics.length){console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>process.cwd(),getNewLine:()=> '\n'}));process.exitCode=1}
}

const ts=require('typescript'),fs=require('node:fs'),assert=require('node:assert/strict');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,p);
const {previewOrigin}=require('../app/lib/preview-url.ts');
assert.equal(previewOrigin('https://glorious-fiesta-r47v9x5495pp2q6v-3000.app.github.dev',43125),'https://glorious-fiesta-r47v9x5495pp2q6v-43125.app.github.dev');
assert.equal(previewOrigin('http://localhost:3000',43125),'http://localhost:43125');
assert.equal(previewOrigin('http://127.0.0.1:3000',43125),'http://127.0.0.1:43125');
assert.throws(()=>previewOrigin('http://localhost:3000',0));
console.log('Codespaces HTTPS forwarded preview hosts, local preview ports, and invalid ports passed.');

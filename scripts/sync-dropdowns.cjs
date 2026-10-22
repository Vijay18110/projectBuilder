const fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(module,path)=>module._compile(ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,path);
const {dropdownCSS}=require('../app/lib/templates/dropdowns.ts');
fs.writeFileSync('app/dropdowns.css',dropdownCSS);

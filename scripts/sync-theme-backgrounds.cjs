const fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,file);
const {themeBackgrounds}=require('../app/lib/theme-backgrounds.ts');
let changed=0;
function visit(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())visit(file);else if(file.endsWith('.css')){const original=fs.readFileSync(file,'utf8'),next=themeBackgrounds(original,file);if(original!==next){fs.writeFileSync(file,next);changed++}}}}
visit('app');
const file='app/lib/component-catalog.json',catalog=JSON.parse(fs.readFileSync(file,'utf8'));
for(const item of catalog)item.css=themeBackgrounds(item.css,item.component+'.module.css');
fs.writeFileSync(file,JSON.stringify(catalog,null,2)+'\n');
console.log('Theme gradients synchronized across '+changed+' stylesheets and '+catalog.length+' component families.');

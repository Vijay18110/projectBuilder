const fs=require('node:fs'),ts=require('typescript'),assert=require('node:assert/strict');
require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,p);require.extensions['.tsx']=require.extensions['.ts'];require.extensions['.css']=m=>m.exports={};
const {quickRange,dateISO,CalendarGrid}=require('../app/components/DatePicker.tsx');
const now=new Date(2024,2,1,12);
assert.deepEqual(quickRange('Last 7 days',now),{from:'2024-02-24',to:'2024-03-01'});
assert.deepEqual(quickRange('Yesterday',now),{from:'2024-02-29',to:'2024-02-29'});
assert.deepEqual(quickRange('Last month',now),{from:'2024-02-01',to:'2024-02-29'});
assert.deepEqual(quickRange('Last month',new Date(2025,0,31,12)),{from:'2024-12-01',to:'2024-12-31'});
assert.deepEqual(quickRange('This month',new Date(2025,5,12,12)),{from:'2025-06-01',to:'2025-06-12'});
assert.equal(dateISO(new Date(2024,1,29,23,59)),'2024-02-29');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const html=renderToStaticMarkup(React.createElement(CalendarGrid,{month:'2024-02',value:'2024-02-29',min:'2024-02-10',max:'2024-02-29',onMonth:()=>{},onSelect:()=>{}}));
assert.equal((html.match(/role="gridcell"/g)||[]).length,42);assert.ok(html.includes('data-date="2024-02-29"'));assert.ok(html.includes('aria-selected="true"'));assert.ok(html.includes('disabled=""'));assert.ok(html.includes('Calendar year'));
const {generateProject}=require('../app/lib/generator.ts'),{componentFiles}=require('../app/lib/component-export.ts'),{exportSchema,defaultTheme,variants}=require('../app/lib/registry.ts');
for(const framework of ['react','next']){const files=generateProject(exportSchema.parse({name:'date-test',framework,features:['customers','tasks','calendar'],theme:defaultTheme,variants:Object.fromEntries(Object.entries(variants).map(([k,v])=>[k,[v[0]]]))}));const prefix=framework==='next'?'':'src/';assert.ok(files[prefix+'components/DatePicker.tsx']);assert.ok(files[prefix+'components/DatePicker.module.css']);assert.ok(files[prefix+'features/Records.tsx'].includes('<DateRangePicker'));assert.ok(files[prefix+'features/FeatureTasks.tsx'].includes('<DatePicker'));assert.ok(files[prefix+'features/FeatureCalendar.tsx'].includes('<CalendarGrid'))}
const kit=componentFiles([{id:'date-picker',variant:'range'}],defaultTheme);assert.ok(kit['src/DatePicker.tsx']);assert.ok(kit['src/DatePicker.module.css']);assert.ok(kit['src/components/DatePickerExample.tsx'].includes('../DatePicker'));
console.log('Date picker: leap days, local dates, quick ranges, bounded calendar, framework exports, and standalone kit passed.');
const path=require('node:path'),dir=path.resolve('.forge-checks/date-picker-kit');
for(const [name,content] of Object.entries(kit)){const target=path.join(dir,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,content)}
const configFile=ts.readConfigFile(path.join(dir,'tsconfig.json'),ts.sys.readFile),parsed=ts.parseJsonConfigFileContent(configFile.config,ts.sys,dir),program=ts.createProgram(parsed.fileNames,parsed.options),diagnostics=ts.getPreEmitDiagnostics(program);
assert.equal(diagnostics.length,0,ts.formatDiagnosticsWithColorAndContext(diagnostics,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>process.cwd(),getNewLine:()=> '\n'}));
console.log('Standalone date picker kit TypeScript compilation passed.');

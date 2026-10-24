const fs=require('fs'),ts=require('typescript');require.extensions['.ts']=(m,p)=>m._compile(ts.transpileModule(fs.readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,p);
const runtime=require('../app/lib/templates/runtime.ts'),pages=require('../app/lib/templates/pages.ts'),{recordsSource}=require('../app/lib/templates/records.ts');
fs.mkdirSync('app/features',{recursive:true});fs.writeFileSync('app/lib/resource.ts',runtime.resourceSource);fs.writeFileSync('app/components/Feedback.tsx',runtime.feedbackSource);fs.writeFileSync('app/components/Feedback.module.css',runtime.feedbackCSS);fs.writeFileSync('app/components/UI.tsx',"export {Button,Card} from './Builder';export function Badge({children}:{children:React.ReactNode}){return <span>{children}</span>}\n");
fs.writeFileSync('app/features/Feature.module.css',runtime.pageFeatureCSS);fs.writeFileSync('app/features/Records.tsx',recordsSource);for(const [key,source] of Object.entries(pages)){const name=key.replace('Source','');fs.writeFileSync('app/features/'+name.charAt(0).toUpperCase()+name.slice(1)+'.tsx',source.replace("href={'/'+id}","href={'/dashboard?page='+id}"))}


fs.writeFileSync('app/features/Work.module.css',require('../app/lib/templates/work-pages.ts').workCSS+require('../app/lib/templates/responsive.ts').responsiveWorkCSS);

import {dropdownCSS} from './templates/dropdowns';
import {applicationSource} from './templates/application';
import {tasksSource,calendarSource,helpSource,workCSS} from './templates/work-pages';
import {storefrontSource,storefrontCSS} from './templates/storefront';
import {themeBackgrounds} from './theme-backgrounds';
import {selectVariantCSS} from './variant-css';
import {ExportConfig} from './registry';
import {backendTemplate,migrationSQL} from './backend-template';
import {feedbackSource,feedbackCSS,resourceSource,featureCSS,variantFeatureCSS,settingsSource} from './templates/runtime';
import {layoutSource,layoutCSS,fixedWorkspaceCSS,laptopWorkspaceCSS} from './templates/layout-template';
import {authSource,authCSS} from './templates/auth';
import {recordsSource} from './templates/records';
import {overviewSource,analyticsSource,notificationsSource,chatSource,profileSource,teamSource,formsSource,carouselSource} from './templates/pages';

export function enhanceProject(files:Record<string,string>,c:ExportConfig,sources:Record<string,string>={}){
 const next=c.framework==='next',prefix=next?'':'src/';
 const adjust=(source:string)=>next?source.replaceAll("from '../../project.config.json'","from '../project.config.json'"):source;
 const put=(path:string,value:string)=>files[prefix+path]=adjust(value);
 const selected=c.features,auth=selected.includes('auth');
 files['server/handler.mjs']=backendTemplate.replace('__AUTH_ENABLED__',String(auth)).replace('__FEATURES__',JSON.stringify(selected)).replace('__KINDS__',JSON.stringify(selected.filter(id=>['customers','products','orders','tables','chat','notifications','theme','carousel','forms','tasks'].includes(id))));
 put('components/Feedback.tsx',feedbackSource);put('components/Feedback.module.css',feedbackCSS);put('lib/resource.ts',resourceSource);put('lib/settings.ts',settingsSource);
 put('layouts/DashboardLayout.tsx',layoutSource);put('layouts/DashboardLayout.module.css',selectVariantCSS(selectVariantCSS(layoutCSS+'\n'+fixedWorkspaceCSS+'\n'+laptopWorkspaceCSS,['expanded','compact','collapsible','floating','dark','minimal','top'],c.variants.navigation),['standard','compact','floating','minimal','search','account'].map(x=>'header_'+x),c.variants.headers.map(x=>'header_'+x)));
 put('features/Feature.module.css',featureCSS+variantFeatureCSS);put('features/Work.module.css',workCSS);
 const pages:Record<string,string>={overview:overviewSource,analytics:analyticsSource,notifications:notificationsSource,chat:chatSource,profile:profileSource,team:teamSource,forms:formsSource,carousel:carouselSource,tasks:tasksSource,calendar:calendarSource,help:helpSource};
 for(const id of selected){if(pages[id])put('features/Feature'+id.charAt(0).toUpperCase()+id.slice(1)+'.tsx',pages[id]);if(['customers','products','orders','tables'].includes(id))put('features/Feature'+id.charAt(0).toUpperCase()+id.slice(1)+'.tsx',`import Records from './Records';export default function Page(){return <Records kind="${id}"/>}`)}
 if(selected.some(id=>['customers','products','orders','tables'].includes(id)))put('features/Records.tsx',recordsSource);
 if(auth){const authComponent=c.pages?.auth?.find(x=>['login-form','register-form'].includes(x.id));let source=authSource;if(c.pages?.auth?.some(row=>!['login-form','register-form'].includes(row.id)))source=source.replace("import config from","import PageComposition from '../components/PageComposition';import config from").replace('</form><div className={s.links}>','</form><PageComposition page="auth"/><div className={s.links}>');if(authComponent?.id==='register-form')source=source.replace("token?'reset':'login'","token?'reset':'register'");if(authComponent)source=source.replace('s[config.variants.authentication[0]]','s[config.variants.authentication[0]],s['+JSON.stringify(authComponent.variant)+']');put('features/Auth.tsx',source);put('features/Auth.module.css',authCSS+'\n.soft .container>section{background:var(--muted)}.minimal .container>section{border:0;background:transparent}.compact .container{font-size:.85em}')}
 if(c.projectType==='ecommerce'){files[prefix+'App.tsx']=storefrontSource.replace('__CONFIG__',next?'./project.config.json':'../project.config.json');files[prefix+'Storefront.module.css']=storefrontCSS;const pkg=JSON.parse(files['package.json']);pkg.dependencies={...pkg.dependencies,'lucide-react':'^1.31.0'};files['package.json']=JSON.stringify(pkg,null,2);files['README.md']+='\n## Storefront\nThe catalogue, saved cart, sample orders, and checkout are demonstration data stored in this browser. Connect a commerce backend and payment provider before accepting real orders.\n'}
 if(c.projectType!=='ecommerce'){files['README.md']+='\n## Sample workspace data\nA realistic editable sample workspace is added automatically on first launch. Set `FORGE_SAMPLE_DATA=0` to start with empty records. Seeded data is created once and is preserved as you edit it.\n';files['.env.example']+='\n# Set to 0 to disable the starter records\nFORGE_SAMPLE_DATA=1\n';if(files['server/index.mjs'])files['server/index.mjs']=files['server/index.mjs'].replace('createBackend({auth,features,kinds})','createBackend({auth,features,kinds,sampleData:process.env.FORGE_SAMPLE_DATA!==\'0\'})');}
 if(c.projectType!=='ecommerce')put('App.tsx',applicationSource(c));
 const pkg=JSON.parse(files['package.json']);pkg.dependencies['lucide-react']='^1.31.0';
 if(selected.some(id=>['auth','customers','products','orders','tables','forms','team','profile'].includes(id)))Object.assign(pkg.dependencies,{'react-hook-form':'7.85.0','zod':'3.25.76','@hookform/resolvers':'5.7.1'});
 files['package.json']=JSON.stringify(pkg,null,2);
 files['server/seed.mjs']="import {seed} from './handler.mjs';seed();console.log('Sample workspace ready.');";
 files['server/schema.sql']=migrationSQL;
 let layout=files[prefix+'layouts/DashboardLayout.tsx'];
 layout=layout.replace('page,user,onLogout,children}:{page:string;','page,user,onLogout,children,onNavigate}:{onNavigate?:(id:string,search?:string)=>void;page:string;')
 .replace("href={'/'+id}","href={'/'+id} onClick={e=>{if(onNavigate){e.preventDefault();onNavigate(id)}}}")
 .replace("if(target)location.assign('/'+target+'?search='+encodeURIComponent(query));","if(target){if(onNavigate)onNavigate(target,query);else location.assign('/'+target+'?search='+encodeURIComponent(query));}");
 files[prefix+'layouts/DashboardLayout.tsx']=layout;
 files[next?'app/globals.css':'src/globals.css']=(files[next?'app/globals.css':'src/globals.css']||'')+dropdownCSS;
 for(const path of Object.keys(files))if(path.endsWith('.module.css'))files[path]=themeBackgrounds(files[path],path);
 return files;
}

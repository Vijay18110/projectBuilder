import catalog from './component-metadata.json';
import {ExportConfig,features,resolveFeatures} from './registry';

export const projectTypes = [
 {id:'dashboard',name:'Complete dashboard',icon:'LayoutDashboard',description:'All dashboard pages, analytics, records, team, chat, and account settings.'},
 {id:'ecommerce',name:'E-commerce website',icon:'ShoppingBag',description:'A public storefront with product search, categories, a saved cart, and demo checkout.'},
 {id:'crm',name:'Customer workspace',icon:'Users',description:'Customers, orders, analytics, team collaboration, and profile pages.'},
] as const;
export type ProjectType=typeof projectTypes[number]['id'];
export const applicationFeatures=features.filter(f=>!['builder','components'].includes(f[0]));
export function applicationConfig(config:ExportConfig):ExportConfig {
 const selected=resolveFeatures(config.features.filter(id=>!['builder','components'].includes(id)));
 const ids=resolveFeatures([...(selected.some(id=>id!=='theme')?selected:['overview']),'theme']);
 return {...config,features:ids,pages:Object.fromEntries(Object.entries(config.pages||{}).filter(([id])=>ids.some(x=>x===id)))};
}
export function configureProject(type:ProjectType,base:ExportConfig):ExportConfig {
 const selected=type==='dashboard'?applicationFeatures.map(f=>f[0]):type==='crm'?resolveFeatures(['overview','analytics','customers','products','orders','team','chat','notifications','profile','tasks','calendar','help']):['overview' as const];
 const assignments:Record<string,string[]>=type==='ecommerce'?{overview:['feature-grid','testimonial','newsletter']}:type==='crm'?{overview:['stat-cards'],customers:['breadcrumbs']}:{overview:['stat-cards'],analytics:['breadcrumbs']};
 const pages=Object.fromEntries(Object.entries(assignments).map(([page,ids])=>[page,ids.flatMap(id=>{const item=catalog.find(x=>x.id===id);return item?[{id,variant:item.variants[0]}]:[]})]));
 return applicationConfig({...base,projectType:type,features:selected,pages,variants:{...base.variants,navigation:[type==='ecommerce'?'top':'expanded'],headers:['account'],dashboard:[type==='crm'?'crm':type==='ecommerce'?'sales':'analytics']}});
}

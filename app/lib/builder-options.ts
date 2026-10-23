import {Feature,resolveFeatures} from './registry';
export const defaultDashboardPages:Feature[]=['overview','analytics','customers','products','orders','forms','team','chat','notifications','profile'];
export function builderFeatures(selected:readonly string[]){return resolveFeatures(selected.length?selected:defaultDashboardPages)}
export function projectFileTree(files:string[]){
 const rows=new Map<string,{path:string;name:string;depth:number;folder:boolean}>();
 for(const path of files){const parts=path.split('/');parts.forEach((name,depth)=>{const key=parts.slice(0,depth+1).join('/');if(!rows.has(key))rows.set(key,{path:key,name,depth,folder:depth<parts.length-1})})}
 return [...rows.values()].sort((a,b)=>{const left=a.path.split('/'),right=b.path.split('/');for(let i=0;i<Math.min(left.length,right.length);i++){if(left[i]!==right[i]){const l=rows.get(left.slice(0,i+1).join('/'))!,r=rows.get(right.slice(0,i+1).join('/'))!;return l.folder!==r.folder?l.folder?-1:1:left[i].localeCompare(right[i])}}return left.length-right.length});
}
export const dashboardPageNames:Record<string,string>={overview:'Dashboard overview',analytics:'Analytics & reports',customers:'Customers',products:'Products & inventory',orders:'Orders',forms:'Enquiries & forms',team:'Team & permissions',chat:'Team chat',notifications:'Notifications',profile:'Profile settings',tasks:'Tasks & projects',calendar:'Calendar',help:'Help center',tables:'Data tables',carousel:'Highlights'};

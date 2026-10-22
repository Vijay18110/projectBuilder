import {ExportConfig} from '../registry';

/** Generate the application once, including its composition import and provider. */
export function applicationSource(c:ExportConfig){
 const ids=c.features.filter(id=>id!=='auth'),auth=c.features.includes('auth');
 return `'use client';
import {useState,useEffect,lazy,Suspense} from 'react';
import config from '${c.framework==='next'?'./':'../'}project.config.json';
import {api} from './lib/api';
import {Feedback,Loading,ErrorState} from './components/Feedback';
import DashboardLayout from './layouts/DashboardLayout';
${auth?"import Auth from './features/Auth';":''}
${c.pages?"import PageComposition from './components/PageComposition';":''}
${ids.map(id=>`const Feature${id}=lazy(()=>import('./features/Feature${id.charAt(0).toUpperCase()+id.slice(1)}'));`).join('\n')}
const modules:Record<string,React.ComponentType>={${ids.map(id=>id+':Feature'+id).join(',')}};
type User={name:string;email:string;role:string};
function Application({initialPage}:{initialPage?:string}){
 const [page,setPage]=useState(initialPage||${JSON.stringify(ids[0]||'auth')}),[user,setUser]=useState<User|null>(null),[ready,setReady]=useState(${!auth}),[error,setError]=useState(''),[revision,setRevision]=useState(0);
 async function load(){try{setUser((await api.get('/auth/me')).data);setError('')}catch(e){if((e as {response?:{status:number}}).response?.status!==401)setError('Unable to connect. Check your connection and try again.')}finally{setReady(true)}}
 useEffect(()=>{const route=location.pathname.slice(1);if(modules[route])setPage(route);${auth?'void load();':''}const expire=()=>setUser(null);window.addEventListener('session-expired',expire);return()=>window.removeEventListener('session-expired',expire)},[]);
 useEffect(()=>{const back=()=>setPage(modules[location.pathname.slice(1)]?location.pathname.slice(1):${JSON.stringify(ids[0]||'auth')});window.addEventListener('popstate',back);return()=>window.removeEventListener('popstate',back)},[]);
 function navigate(id:string,search?:string){if(!modules[id])return;history.pushState(null,'','/'+id+(search?'?search='+encodeURIComponent(search):''));setPage(id);setRevision(n=>n+1);document.getElementById('page-content')?.scrollTo(0,0)}
 if(!ready)return <Loading/>;
 if(error)return <ErrorState message={error} retry={()=>void load()}/>;
 ${auth?'if(!user)return <Auth onSuccess={()=>void load()}/>;':''}
 const Component=modules[page];
 return <DashboardLayout page={page} user={user} onNavigate={navigate} onLogout={async()=>{try{await api.post('/auth/logout');setUser(null)}catch{setError('Could not sign out. Please try again.')}}}><Suspense fallback={<Loading/>}><div key={page+revision}>{Component?<Component/>:<p>Choose a page from the navigation.</p>}${c.pages?'<PageComposition page={page}/>' :''}</div></Suspense></DashboardLayout>
}
export default function App(props:{initialPage?:string}){return <Feedback><Application {...props}/></Feedback>}
`;
}

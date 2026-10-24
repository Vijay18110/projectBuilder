'use client';
import {useEffect,useRef,useState} from 'react';
import {previewOrigin} from '../lib/preview-url';
import {ExportConfig,exportSchema} from '../lib/registry';
import s from './RunningPreview.module.css';

export default function RunningPreview({config,page,openSignal=0,scope='local'}:{scope?:string;config:ExportConfig;page?:string;openSignal?:number}){
 const [open,setOpen]=useState(false),[status,setStatus]=useState(''),[error,setError]=useState(''),[url,setUrl]=useState(''),[version,setVersion]=useState(0),[retry,setRetry]=useState(0),[tabOpen,setTabOpen]=useState(false);
 const previewWindow=useRef<Window|null>(null),pendingLaunch=useRef(false),id=useRef(''),latest=useRef(''),queue=useRef(Promise.resolve()),previousFramework=useRef(config.framework),previousConfig=useRef('');
 const desired=JSON.stringify(config),route=page==='auth'?'/?preview-auth=1':page?'/'+page:'/',previewUrl=url+route+(route.includes('?')?'&':'?')+'revision='+version;

 useEffect(()=>{previousConfig.current=desired},[desired]);
 useEffect(()=>{if(openSignal)setOpen(true)},[openSignal]);
 useEffect(()=>{
  if(!open)return;
  if(previousFramework.current!==config.framework){setUrl('');previousFramework.current=config.framework;setStatus('Switching framework…')}
  if(!id.current){id.current=sessionStorage.getItem('forge-preview:'+scope)||crypto.randomUUID();sessionStorage.setItem('forge-preview:'+scope,id.current)}
  latest.current=desired;const validation=exportSchema.safeParse(config);if(!validation.success){setError(validation.error.issues[0].message);return}
  let cancelled=false;const controller=new AbortController();const timer=setTimeout(()=>{
   setStatus('Updating project…');setError('');queue.current=queue.current.catch(()=>{}).then(async()=>{
    if(cancelled)return;
    try{
     const response=await fetch('/api/preview',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id.current,config:JSON.parse(desired)}),signal:controller.signal});
     const data=await response.json();if(!response.ok)throw Error(data.error||'Unable to start preview');if(cancelled)return;
     setStatus('Starting '+(config.framework==='next'?'Next.js':'React + Vite')+'…');const started=Date.now();
     while(!cancelled&&Date.now()-started<300000){
      const check=await fetch('/api/preview?id='+id.current+'&page='+encodeURIComponent(page||''),{signal:controller.signal,cache:'no-store'}),result=await check.json();
      if(!check.ok)throw Error(result.error||'Preview unavailable');if(result.state==='error')throw Error(result.error);if(result.state==='expired')throw Error('Preview expired. Retry to restart.');
      if(result.state==='ready'){
       if(cancelled||latest.current!==desired)return;const nextUrl=previewOrigin(location.origin,data.port);setUrl(nextUrl);setStatus('Live · '+(config.framework==='next'?'Next.js App Router':'React + Vite'));
       if(pendingLaunch.current&&previewWindow.current&&!previewWindow.current.closed){pendingLaunch.current=false;previewWindow.current.location.href=nextUrl+route+(route.includes('?')?'&':'?')+'revision='+version}
       return;
      }
      await new Promise<void>(resolve=>setTimeout(resolve,1200));
     }
     if(!cancelled)throw Error('Preview is taking longer than expected. Retry to check again.');
    }catch(e){if(!cancelled){setError(e instanceof Error?e.message:'Unable to load preview');setStatus('Preview needs attention')}}
   })
  },900);
  return()=>{cancelled=true;clearTimeout(timer);controller.abort()};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[desired,open,retry]);

 useEffect(()=>{if(!open||!url)return;const timer=setInterval(()=>{void fetch('/api/preview?id='+id.current,{cache:'no-store'}).catch(()=>{})},60000);return()=>clearInterval(timer)},[open,url]);
 useEffect(()=>{if(!tabOpen)return;const timer=setInterval(()=>{if(!previewWindow.current||previewWindow.current.closed)setTabOpen(false)},1000);return()=>clearInterval(timer)},[tabOpen]);
 useEffect(()=>{if(pendingLaunch.current&&previewWindow.current&&!previewWindow.current.closed)previewWindow.current.postMessage({type:'forge-preview-status',status,error},location.origin)},[status,error]);
 useEffect(()=>{if(url&&previewWindow.current&&!previewWindow.current.closed){try{previewWindow.current.location.href=previewUrl}catch{setError('Reopen the project tab to load your latest changes.')}}},[previewUrl,url]);

 // Appearance changes should reach the open project before its source rebuild.
 useEffect(()=>{const target=previewWindow.current;if(!url||!target||target.closed)return;const parsed=exportSchema.safeParse(config);if(parsed.success)target.postMessage({type:'forge-preview-theme',theme:parsed.data.theme},new URL(url).origin)},[config.theme,url,tabOpen]);
 function openProject(){
  if(!id.current){id.current=sessionStorage.getItem('forge-preview:'+scope)||crypto.randomUUID();sessionStorage.setItem('forge-preview:'+scope,id.current)}
  pendingLaunch.current=true;setOpen(true);setRetry(value=>value+1);previewWindow.current=window.open('/preview-loading','_blank');
  if(!previewWindow.current){pendingLaunch.current=false;setError('Your browser blocked the new tab. Allow pop-ups for this site and try again.')}else{setTabOpen(true);setError('')}
 }
 useEffect(()=>{const launch=()=>openProject();window.addEventListener('forge-open-project-preview',launch);return()=>window.removeEventListener('forge-open-project-preview',launch)});
 async function stopPreview(){if(id.current)await fetch('/api/preview?id='+id.current,{method:'DELETE'}).catch(()=>{});previewWindow.current?.close();previewWindow.current=null;pendingLaunch.current=false;setTabOpen(false);setOpen(false);setUrl('');setStatus('')}

 const preparing=!error&&(!url||status==='Updating project…'||status.startsWith('Starting ')||status==='Switching framework…');
 return <section className={s.section} id="running-project-preview"><div className={s.heading}><div><h2>Run your generated project</h2><p>The live application opens in a separate browser tab, with its own full viewport.</p></div><button onClick={openProject}>{tabOpen?'Open another tab':'Open project in new tab ↗'}</button></div>
 {open&&<div className={s.panel}><div className={s.project}><div className={preparing?s.pulse:s.dot} aria-hidden="true"/><div><strong>{config.name||'Your project'}</strong><span role="status">{status||'Preparing preview…'}</span></div><span className={s.framework}>{config.framework==='next'?'Next.js':'React + Vite'}</span></div>
 {error&&<div className={s.error} role="alert">{error}<button onClick={()=>setRetry(x=>x+1)}>Retry</button></div>}
 <div className={s.actions}>{url&&<><a href={previewUrl} target="_blank" rel="noreferrer">Open in new tab ↗</a>{tabOpen&&<button onClick={()=>previewWindow.current?.focus()}>Focus project tab</button>}<button onClick={()=>setVersion(x=>x+1)}>Reload project</button></>}<button onClick={()=>void stopPreview()}>Stop preview</button></div>
 <p className={s.note}>{preparing?'Compiling pages, components, and sample data…':'Changes sync automatically while the preview is running. Preview records stay in its isolated database.'}</p></div>}
 </section>
}

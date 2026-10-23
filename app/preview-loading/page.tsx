'use client';
import {useEffect,useState} from 'react';
import GenerationScreen from '../components/GenerationScreen';
export default function PreviewLoading(){
 const [status,setStatus]=useState('Compiling your selected pages and components. The first build can take a few minutes. This window will open your project automatically.'),[error,setError]=useState('');
 useEffect(()=>{const receive=(event:MessageEvent)=>{if(event.origin!==location.origin||event.source!==window.opener||event.data?.type!=='forge-preview-status')return;setError(typeof event.data.error==='string'?event.data.error:'');if(typeof event.data.status==='string'&&event.data.status)setStatus(event.data.status)};window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[]);
 if(error)return <main style={{maxWidth:680,margin:'12vh auto',padding:32,fontFamily:'system-ui'}}><h1>Preview needs attention</h1><p role="alert" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{error}</p><p>Return to Project Builder and click Retry to restart this preview.</p><button onClick={()=>window.opener?.focus()}>Return to Project Builder</button></main>;
 return <GenerationScreen overlay title="Bringing your project to life" detail={status}/>;
}

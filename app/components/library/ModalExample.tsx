'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ModalExample.module.css';
export default function ModalExample({variant='standard'}:{variant?:string}){
const ref=useRef<HTMLDialogElement>(null);const [done,setDone]=useState(false);return <div className={s.demo}><button className={`${s.button} ${s.primary}`} onClick={()=>ref.current?.showModal()}>Open {variant==='confirmation'?'confirmation':'dialog'}</button>{done&&<p role="status" className={s.muted}>Action confirmed.</p>}<dialog ref={ref} className={`${s.dialog} ${variant==='fullscreen'?s.fullscreen:''}`} aria-label="Example dialog" onClick={e=>{if(e.target===e.currentTarget)ref.current?.close()}}><h3 className={s.title}>{variant==='confirmation'?'Publish your project?':'Make room for your next idea.'}</h3><p className={s.muted}>This is an interactive component preview. No project data will change.</p><div className={s.row} style={{marginTop:24}}><button className={`${s.button} ${s.primary}`} onClick={()=>{setDone(true);ref.current?.close()}}>Confirm</button><button className={s.button} onClick={()=>ref.current?.close()}>Close</button></div></dialog></div>;
}

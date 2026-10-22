'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ToastExample.module.css';
export default function ToastExample({variant='success'}:{variant?:string}){
const [show,setShow]=useState(false);useEffect(()=>{if(show){const timer=setTimeout(()=>setShow(false),3500);return()=>clearTimeout(timer)}},[show]);return <div className={`${s.demo} ${s.stack}`}><button className={s.button} onClick={()=>setShow(true)}>Show {variant} toast</button><div role="status" aria-live="polite" style={{minHeight:46}}>{show&&<div className={`${s.toast} ${variant==='error'?s.error:variant==='success'?s.success:''}`}><span>{variant==='error'?'!':'✓'}</span><strong>{variant==='error'?'Something went wrong. Please retry.':variant==='success'?'Project saved successfully.':'You’re all caught up.'}</strong><button aria-label="Dismiss toast" onClick={()=>setShow(false)}>×</button></div>}</div></div>;
}

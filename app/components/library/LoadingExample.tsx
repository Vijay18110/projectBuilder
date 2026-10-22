'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './LoadingExample.module.css';
export default function LoadingExample({variant='spinner'}:{variant?:string}){
const [loading,setLoading]=useState(true);return <div className={`${s.demo} ${s.row}`} style={{justifyContent:'center',minHeight:65}}>{loading&&(variant==='dots'?<span role="status" aria-label="Loading" className={s.dots}><i/><i/><i/></span>:variant==='button'?<button disabled className={`${s.button} ${s.primary}`}><span className={s.spinner}/>Saving…</button>:<span role="status" aria-label="Loading" className={s.spinner}/>)}<button className={s.button} onClick={()=>setLoading(!loading)}>{loading?'Stop preview':'Start preview'}</button></div>;
}

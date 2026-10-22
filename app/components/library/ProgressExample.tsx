'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ProgressExample.module.css';
export default function ProgressExample({variant='bar'}:{variant?:string}){
const [value,setValue]=useState(64);return <div className={`${s.demo} ${s.stack}`}><div className={s.row} style={{justifyContent:'space-between'}}><span className={s.muted}>Project completion</span><strong>{value}%</strong></div>{variant==='circle'?<div className={s.ring} style={{background:`conic-gradient(var(--primary) ${value}%,var(--muted) 0)`}}><span>{value}%</span></div>:<progress className={`${s.progress} ${variant==='segmented'?s.segmented:''}`} value={value} max="100">{value}%</progress>}<div className={s.row}><button className={s.button} disabled={!value} onClick={()=>setValue(Math.max(0,value-10))}>−10</button><button className={s.button} disabled={value===100} onClick={()=>setValue(Math.min(100,value+10))}>＋10</button></div></div>;
}

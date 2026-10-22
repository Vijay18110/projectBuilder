'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './PopoverExample.module.css';
export default function PopoverExample({variant='standard'}:{variant?:string}){
const [open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null);useEffect(()=>{if(!open)return;const click=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setOpen(false)};const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('pointerdown',click);document.addEventListener('keydown',key);return()=>{document.removeEventListener('pointerdown',click);document.removeEventListener('keydown',key)}},[open]);return <div className={`${s.demo} ${s.wrap}`} ref={ref}><button className={s.button} aria-expanded={open} onClick={()=>setOpen(!open)}>Display options ⌄</button>{open&&<div className={`${s.pop} ${s.panel} ${s[variant]}`}><strong style={{fontSize:12}}>Customize your view</strong><label className={s.row} style={{fontSize:11,marginTop:12}}><input type="checkbox" defaultChecked/>Show completed tasks</label><label className={s.row} style={{fontSize:11,marginTop:10}}><input type="checkbox"/>Compact spacing</label></div>}</div>;
}

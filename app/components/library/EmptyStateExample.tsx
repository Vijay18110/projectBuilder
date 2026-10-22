'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './EmptyStateExample.module.css';
export default function EmptyStateExample({variant='standard'}:{variant?:string}){
const [created,setCreated]=useState(false);return <div className={`${s.demo} ${s.empty} ${variant==='bordered'?s.panel:variant==='soft'?s.soft:''}`}><span className={s.symbol} aria-hidden="true">{created?'✓':'▧'}</span><h3 className={s.title}>{created?'Your first project is ready':'A fresh start awaits'}</h3><p className={s.muted}>{created?'This is a local preview.':'Create your first project to bring this space to life.'}</p><button className={`${s.button} ${s.primary}`} onClick={()=>setCreated(!created)}>{created?'Reset preview':'＋ Create project'}</button></div>;
}

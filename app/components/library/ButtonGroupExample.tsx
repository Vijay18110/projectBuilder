'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ButtonGroupExample.module.css';
export default function ButtonGroupExample({variant='outline'}:{variant?:string}){
const [view,setView]=useState('Week');return <div className={`${s.demo} ${s.stack}`}><div role="group" aria-label="Calendar view" className={`${s.group} ${s[variant]}`}>{['Day','Week','Month'].map(x=><button key={x} aria-pressed={view===x} className={`${s.button} ${view===x?s.selected:''}`} onClick={()=>setView(x)}>{x}</button>)}</div><span className={s.muted}>Showing the {view.toLowerCase()} view</span></div>;
}

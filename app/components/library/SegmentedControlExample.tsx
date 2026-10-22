'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SegmentedControlExample.module.css';
export default function SegmentedControlExample({variant='soft'}:{variant?:string}){
const [selected,setSelected]=useState('Monthly');return <div className={`${s.demo} ${s.stack}`}><div className={`${s.segment} ${s[variant]}`} role="group" aria-label="Billing interval">{['Monthly','Annual'].map(x=><button key={x} aria-pressed={selected===x} className={selected===x?s.active:''} onClick={()=>setSelected(x)}>{x}{x==='Annual'&&<small>−20%</small>}</button>)}</div><span className={s.muted}>{selected} billing selected · preview only</span></div>;
}

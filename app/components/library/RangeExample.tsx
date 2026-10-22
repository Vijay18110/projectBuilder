'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './RangeExample.module.css';
export default function RangeExample({variant='standard'}:{variant?:string}){
const [value,setValue]=useState(64);return <div className={`${s.demo} ${variant==='soft'?s.panel:''} ${s[variant]}`}><label className={s.label}>Volume <strong>{value}%</strong><input aria-label="Volume" type="range" min="0" max="100" value={value} onChange={e=>setValue(+e.target.value)} style={{width:'100%',accentColor:'var(--primary)'}}/></label><div className={s.row} style={{justifyContent:'space-between'}}><span className={s.muted}>Quiet</span><span className={s.muted}>Loud</span></div></div>;
}

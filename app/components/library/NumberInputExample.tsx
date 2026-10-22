'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './NumberInputExample.module.css';
export default function NumberInputExample({variant='outline'}:{variant?:string}){
const [value,setValue]=useState(3);return <div className={s.demo}><label className={s.label}>Team members<div className={s.row} style={{flexWrap:'nowrap'}}><button aria-label="Decrease members" className={`${s.button} ${s[variant]}`} disabled={value<=1} onClick={()=>setValue(value-1)}>−</button><input type="number" min="1" max="20" aria-label="Number of members" className={s.input} value={value} onChange={e=>setValue(Math.max(1,Math.min(20,+e.target.value||1)))} style={{textAlign:'center',maxWidth:90}}/><button aria-label="Increase members" className={`${s.button} ${s[variant]}`} disabled={value>=20} onClick={()=>setValue(value+1)}>＋</button></div></label><p className={s.muted}>Between 1 and 20 members</p></div>;
}

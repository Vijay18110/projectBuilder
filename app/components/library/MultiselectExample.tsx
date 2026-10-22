'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './MultiselectExample.module.css';
export default function MultiselectExample({variant='outline'}:{variant?:string}){
const [values,setValues]=useState(['React']);return <div className={`${s.demo} ${s.stack}`}><span className={s.label}>Your stack</span><div className={s.row}>{['React','Next.js','TypeScript','CSS Modules'].map(x=><button key={x} aria-pressed={values.includes(x)} className={`${s.button} ${s[variant]} ${values.includes(x)?s.selected:''}`} onClick={()=>setValues(values.includes(x)?values.filter(v=>v!==x):[...values,x])}>{values.includes(x)?'✓ ':''}{x}</button>)}</div><span className={s.muted}>{values.length} selected</span></div>;
}

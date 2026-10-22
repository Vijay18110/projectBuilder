'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SelectExample.module.css';
export default function SelectExample({variant='outline'}:{variant?:string}){
const [value,setValue]=useState('Design');return <div className={s.demo}><label className={s.label}>Workspace type<select className={`${s.input} ${s[variant]}`} value={value} onChange={e=>setValue(e.target.value)}>{['Design','Engineering','Marketing','Operations'].map(x=><option key={x}>{x}</option>)}</select></label><p className={s.muted}>{value} workspace selected</p></div>;
}

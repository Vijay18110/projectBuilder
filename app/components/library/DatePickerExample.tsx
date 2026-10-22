'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './DatePickerExample.module.css';
export default function DatePickerExample({variant='single'}:{variant?:string}){
const [start,setStart]=useState('');const [end,setEnd]=useState('');return <div className={`${s.demo} ${s.stack}`}><label className={s.label}>{variant==='range'?'Start date':'Choose a date'}<input type="date" className={`${s.input} ${variant==='filled'?s.filled:''}`} value={start} onChange={e=>{setStart(e.target.value);if(end<e.target.value)setEnd('')}}/></label>{variant==='range'&&<label className={s.label}>End date<input type="date" className={s.input} min={start} value={end} onChange={e=>setEnd(e.target.value)}/></label>}<span className={s.muted}>{start?start+(end?' → '+end:''):'No date selected'}</span></div>;
}

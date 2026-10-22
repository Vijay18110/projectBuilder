'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CheckboxExample.module.css';
export default function CheckboxExample({variant='classic'}:{variant?:string}){
const [selected,setSelected]=useState(['Email updates']);return <div className={`${s.demo} ${s.stack}`}>{['Email updates','Product announcements'].map(x=><label key={x} className={`${s.choice} ${variant!=='classic'?s.panel:''} ${variant==='soft'&&selected.includes(x)?s.soft:''}`}><input type="checkbox" checked={selected.includes(x)} onChange={()=>setSelected(selected.includes(x)?selected.filter(v=>v!==x):[...selected,x])}/><span>{x}</span></label>)}</div>;
}

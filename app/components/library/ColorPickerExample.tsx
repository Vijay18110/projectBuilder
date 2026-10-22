'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ColorPickerExample.module.css';
export default function ColorPickerExample({variant='outline'}:{variant?:string}){
const [color,setColor]=useState('#6258e8');return <div className={`${s.demo} ${s.row}`}><input type="color" aria-label="Choose an accent color" value={color} onChange={e=>setColor(e.target.value)} className={`${s.color} ${variant==='circle'?s.circle:''}`}/><div><strong style={{fontSize:13}}>Accent color</strong><p className={s.muted}>{color.toUpperCase()}</p></div><span style={{background:color,width:35,height:35,borderRadius:'var(--radius)',marginLeft:'auto'}}/></div>;
}

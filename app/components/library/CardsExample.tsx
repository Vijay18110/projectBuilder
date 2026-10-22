'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CardsExample.module.css';
export default function CardsExample({variant='bordered'}:{variant?:string}){
const [open,setOpen]=useState(false);return <article className={`${s.demo} ${s.panel} ${s[variant]}`}><span className={s.badge}>Design system</span><h3 className={s.title} style={{marginTop:15}}>Thoughtfully connected.</h3><p className={s.muted}>A flexible foundation for your next website.</p>{open&&<p className={s.muted}>Your colors, spacing, and typography carry through every surface.</p>}<button className={`${s.button} ${s.soft}`} onClick={()=>setOpen(!open)}>{open?'Show less':'Read more'} →</button></article>;
}

'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './HeroExample.module.css';
export default function HeroExample({variant='centered'}:{variant?:string}){
const [started,setStarted]=useState(false);return <section className={`${s.demo} ${s.hero} ${s[variant]}`}><div><span className={s.badge}>INTRODUCING YOUR NEXT CHAPTER</span><h3>Build something<br/>worth sharing.</h3><p className={s.muted}>A thoughtful starting point for your next big idea.</p><button className={`${s.button} ${s.primary}`} onClick={()=>setStarted(!started)}>{started?'✓ You’re on the list':'Get early access →'}</button></div>{variant==='split'&&<div className={s.visual} aria-hidden="true"><span>✦</span></div>}</section>;
}

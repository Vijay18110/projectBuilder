'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './NewsletterExample.module.css';
export default function NewsletterExample({variant='standard'}:{variant?:string}){
const [done,setDone]=useState(false);return <section className={`${s.demo} ${variant==='soft'?s.panel:''}`}><h3 className={s.title}>A little inspiration, occasionally.</h3><p className={s.muted}>Useful ideas for people who love to build.</p><form className={variant==='inline'?s.row:s.stack} onSubmit={e=>{e.preventDefault();setDone(true)}}><label className={s.label} style={{flex:1}}>Email address<input type="email" className={s.input} required placeholder="you@example.com"/></label><button type="submit" className={`${s.button} ${s.primary}`}>{done?'✓ Preview submitted':'Subscribe'}</button></form><p role="status" className={s.muted}>{done?'Demo complete. No subscription was created.':'Preview only · no email is sent.'}</p></section>;
}

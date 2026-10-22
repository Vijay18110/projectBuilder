'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ContactFormExample.module.css';
export default function ContactFormExample({variant='standard'}:{variant?:string}){
const [done,setDone]=useState(false);return <form className={`${s.demo} ${s.stack} ${variant==='soft'?s.panel:''} ${s[variant]}`} onSubmit={e=>{e.preventDefault();setDone(true)}}><label className={s.label}>Full name<input className={s.input} required minLength={2} maxLength={80} placeholder="Alex Morgan"/></label><label className={s.label}>Email<input className={s.input} required type="email" placeholder="alex@example.com"/></label><label className={s.label}>Message<textarea className={s.input} required minLength={10} maxLength={1000} rows={2} placeholder="Tell us how we can help…"/></label><button className={`${s.button} ${s.primary}`}>Send message →</button>{done&&<p role="status" className={s.muted}>Your form is valid. No message was sent.</p>}</form>;
}

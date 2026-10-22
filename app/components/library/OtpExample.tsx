'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './OtpExample.module.css';
export default function OtpExample({variant='outline'}:{variant?:string}){
const [code,setCode]=useState('');return <div className={s.demo}><label className={s.label}>6-digit verification code<input className={`${s.input} ${s[variant]} ${s.code}`} value={code} onChange={e=>setCode(e.target.value.replace(/[^0-9]/g,'').slice(0,6))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000"/></label><p className={s.muted} role="status">{code.length===6?'✓ Code complete (demo only)':(6-code.length)+' digits remaining'}</p></div>;
}

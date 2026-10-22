'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './PasswordInputExample.module.css';
export default function PasswordInputExample({variant='outline'}:{variant?:string}){
const [value,setValue]=useState('');const [visible,setVisible]=useState(false);const id=useId();return <div className={s.demo}><label className={s.label} htmlFor={id}>Password</label><div className={s.row} style={{flexWrap:'nowrap'}}><input id={id} className={`${s.input} ${s[variant]}`} type={visible?'text':'password'} value={value} onChange={e=>setValue(e.target.value)} autoComplete="new-password" placeholder="Try a sample password"/><button className={s.button} aria-label={visible?'Hide password':'Show password'} onClick={()=>setVisible(!visible)}>{visible?'Hide':'Show'}</button></div><p className={s.muted}>{value.length>=10?'Good length':value.length?'Use at least 10 characters':'This preview does not store your input.'}</p></div>;
}

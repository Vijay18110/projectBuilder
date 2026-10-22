'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TextInputExample.module.css';
export default function TextInputExample({variant='outline'}:{variant?:string}){
const [name,setName]=useState('');const id=useId();return <div className={s.demo}><label className={s.label} htmlFor={id}>Project name<input id={id} className={`${s.input} ${s[variant]}`} value={name} onChange={e=>setName(e.target.value)} placeholder="My next big idea" maxLength={50}/></label><p className={s.muted}>{name.length}/50 characters</p></div>;
}

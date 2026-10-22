'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CommandMenuExample.module.css';
export default function CommandMenuExample({variant='standard'}:{variant?:string}){
const [query,setQuery]=useState('');const [action,setAction]=useState('');return <div className={`${s.demo} ${s.panel} ${s[variant]}`}><input className={s.input} aria-label="Search example commands" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search commands…"/><div className={s.stack} style={{gap:4,marginTop:12}}>{['Create project','Open settings','Invite teammate'].filter(x=>x.toLowerCase().includes(query.toLowerCase())).map((x,i)=><button key={x} className={s.command} onClick={()=>setAction(x)}><span>{x}</span><kbd>↵</kbd></button>)}</div>{action&&<p role="status" className={s.muted}>{action} selected in preview.</p>}</div>;
}

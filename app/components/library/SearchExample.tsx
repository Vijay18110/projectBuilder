'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SearchExample.module.css';
export default function SearchExample({variant='outline'}:{variant?:string}){
const [query,setQuery]=useState('');const results=['Design system','Dashboard analytics','Project settings'].filter(x=>x.toLowerCase().includes(query.toLowerCase()));return <div className={s.demo}><label className={s.label}>Search projects<input type="search" className={`${s.input} ${s[variant]}`} placeholder="Try “design”…" value={query} onChange={e=>setQuery(e.target.value)}/></label>{query&&<div className={s.panel} style={{marginTop:8}}>{results.length?results.map(x=><div key={x} className={s.muted} style={{padding:5}}>{x}</div>):<span className={s.muted}>No projects found.</span>}</div>}</div>;
}

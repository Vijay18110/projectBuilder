'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './NavbarExample.module.css';
export default function NavbarExample({variant='standard'}:{variant?:string}){
const [active,setActive]=useState('Product');const [open,setOpen]=useState(false);return <nav aria-label="Example site navigation" className={`${s.demo} ${s.nav} ${s[variant]}`}><strong>acme<span style={{color:'var(--primary)'}}>.</span></strong><button className={`${s.button} ${s.mobile}`} aria-label="Toggle example menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button><div className={`${s.links} ${open?s.open:''}`}>{['Product','Pricing','About'].map(x=><button key={x} aria-current={active===x?'page':undefined} style={{color:active===x?'var(--primary)':undefined}} onClick={()=>setActive(x)}>{x}</button>)}</div></nav>;
}

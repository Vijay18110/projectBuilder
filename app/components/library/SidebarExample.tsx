'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SidebarExample.module.css';
export default function SidebarExample({variant='expanded'}:{variant?:string}){
const [active,setActive]=useState('Overview');return <nav aria-label="Example sidebar" className={`${s.demo} ${s.side} ${s[variant]}`}>{['Overview','Projects','Messages','Settings'].map((x,i)=><button key={x} title={x} aria-label={x} aria-current={active===x?'page':undefined} className={active===x?s.selected:''} onClick={()=>setActive(x)}><span aria-hidden="true">{['▦','▧','▤','⚙'][i]}</span>{variant!=='compact'&&<span>{x}</span>}</button>)}</nav>;
}

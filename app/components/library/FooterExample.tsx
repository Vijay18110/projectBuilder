'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './FooterExample.module.css';
export default function FooterExample({variant='standard'}:{variant?:string}){
const [page,setPage]=useState('');return <footer className={`${s.demo} ${s.footer} ${s[variant]}`}><strong style={{fontSize:20}}>acme.</strong><p className={s.muted}>A little more clarity. A lot more possibility.</p><nav aria-label="Example footer" className={s.row}>{['About','Careers','Privacy','Contact'].map(x=><button key={x} onClick={()=>setPage(x)}>{x}</button>)}</nav><hr className={s.separator}/><small className={s.muted}>© {new Date().getFullYear()} Acme. Example footer.</small>{page&&<p role="status" className={s.muted}>{page} link selected in preview.</p>}</footer>;
}

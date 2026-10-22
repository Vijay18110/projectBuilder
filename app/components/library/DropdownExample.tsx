'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './DropdownExample.module.css';
export default function DropdownExample({variant='outline'}:{variant?:string}){
const [action,setAction]=useState('No action yet');const menu=useRef<HTMLDetailsElement>(null);return <div className={s.demo}><details className={s.dropdown} ref={menu}><summary className={`${s.button} ${s[variant]}`}>Project actions ⌄</summary><div className={s.menu}>{['Duplicate','Archive','Move to folder'].map(x=><button key={x} className={s.menuItem} onClick={()=>{setAction(x+' selected');if(menu.current)menu.current.open=false}}>{x}</button>)}</div></details><p role="status" className={s.muted}>{action}</p></div>;
}

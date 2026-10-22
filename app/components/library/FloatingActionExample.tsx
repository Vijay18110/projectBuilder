'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './FloatingActionExample.module.css';
export default function FloatingActionExample({variant='solid'}:{variant?:string}){
const [count,setCount]=useState(0);return <div className={`${s.demo} ${s.row}`}><button aria-label="Create new item" className={`${s.button} ${s[variant]}`} style={{height:50,minWidth:50,borderRadius:variant==='pill'?28:'50%'}} onClick={()=>setCount(count+1)}>＋{variant==='pill'?' Create new':''}</button><span role="status" className={s.muted}>{count?count+' example items created':'Your most useful action, one click away.'}</span></div>;
}

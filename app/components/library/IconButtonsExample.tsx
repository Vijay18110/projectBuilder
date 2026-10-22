'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './IconButtonsExample.module.css';
export default function IconButtonsExample({variant='soft'}:{variant?:string}){
const [liked,setLiked]=useState(false);return <div className={`${s.demo} ${s.row}`}><button aria-label={liked?'Remove from favorites':'Add to favorites'} aria-pressed={liked} className={`${s.button} ${s[variant]}`} onClick={()=>setLiked(!liked)} style={{width:44,height:44,padding:0}}>{liked?'♥':'♡'}</button><button aria-label="Copy example text" className={`${s.button} ${s[variant]}`} onClick={()=>{navigator.clipboard?.writeText('Hello from Forge')}}>⧉</button><span className={s.muted}>{liked?'Added to favorites':'Small actions, clearly labeled'}</span></div>;
}

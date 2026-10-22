'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './RatingExample.module.css';
export default function RatingExample({variant='standard'}:{variant?:string}){
const [rating,setRating]=useState(4);return <div className={`${s.demo} ${s.stack}`}><div role="group" aria-label="Rate this example" className={s.row} style={{gap:4}}>{[1,2,3,4,5].map(n=><button key={n} aria-label={'Rate '+n+' out of 5'} aria-pressed={rating===n} onClick={()=>setRating(n)} className={`${s.star} ${variant==='soft'?s.soft:''}`} style={{fontSize:variant==='large'?32:26,color:n<=rating?'var(--primary)':'var(--border)'}}>{n<=rating?'★':'☆'}</button>)}</div><span role="status" className={s.muted}>{rating} out of 5 · your preview rating</span></div>;
}

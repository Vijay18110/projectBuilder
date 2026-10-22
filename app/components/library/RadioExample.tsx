'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './RadioExample.module.css';
export default function RadioExample({variant='classic'}:{variant?:string}){
const [plan,setPlan]=useState('Team');const id=useId();return <fieldset className={`${s.demo} ${s.stack}`} style={{border:0,padding:0,margin:0}}><legend className={s.muted}>Choose a plan</legend>{['Personal','Team','Enterprise'].map(x=><label key={x} className={`${s.choice} ${variant!=='classic'?s.panel:''} ${plan===x&&variant==='soft'?s.soft:''}`}><input name={id} type="radio" checked={plan===x} onChange={()=>setPlan(x)}/>{x}</label>)}</fieldset>;
}

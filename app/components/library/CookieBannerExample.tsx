'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './CookieBannerExample.module.css';
export default function CookieBannerExample({variant='standard'}:{variant?:string}){
const [choice,setChoice]=useState('');return <div className={`${s.demo} ${s.panel} ${s[variant]}`}>{choice?<><h3 className={s.title}>Preference: {choice}</h3><p className={s.muted}>Preview preference only.</p><button className={s.button} onClick={()=>setChoice('')}>Reset preview</button></>:<><h3 className={s.title}>A little note about cookies.</h3><p className={s.muted}>This is a consent-interface example. It does not enable tracking.</p><div className={s.row}><button className={`${s.button} ${s.primary}`} onClick={()=>setChoice('Accepted')}>Accept optional</button><button className={s.button} onClick={()=>setChoice('Essential only')}>Essential only</button></div></>}</div>;
}

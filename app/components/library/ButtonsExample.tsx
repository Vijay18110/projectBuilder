'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ButtonsExample.module.css';
export default function ButtonsExample({variant='solid'}:{variant?:string}){
const [saved,setSaved]=useState(false);return <div className={s.demo}><div className={s.row}><button className={`${s.button} ${s[variant]}`} onClick={()=>setSaved(!saved)}>{saved?'✓ Saved':'Save changes'}</button><button className={s.button} onClick={()=>setSaved(false)}>Cancel</button></div><p className={s.muted} role="status">{saved?'Your example changes are saved.':'Click to try the selected style.'}</p></div>;
}

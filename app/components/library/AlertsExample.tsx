'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './AlertsExample.module.css';
export default function AlertsExample({variant='info'}:{variant?:string}){
const [visible,setVisible]=useState(true);const content:Record<string,string>={info:'A new update is ready to explore.',success:'Your changes have been saved.',warning:'Your trial ends in three days.',error:'We couldn’t complete that action.'};return <div className={s.demo}>{visible?<div role={variant==='error'?'alert':'status'} className={`${s.alert} ${s[variant]}`}><span aria-hidden="true">{variant==='success'?'✓':variant==='error'?'!':'ⓘ'}</span><span>{content[variant]||content.info}</span><button aria-label="Dismiss alert" onClick={()=>setVisible(false)}>×</button></div>:<button className={s.button} onClick={()=>setVisible(true)}>Show alert again</button>}</div>;
}

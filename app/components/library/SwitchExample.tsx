'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SwitchExample.module.css';
export default function SwitchExample({variant='solid'}:{variant?:string}){
const [enabled,setEnabled]=useState(true);return <div className={`${s.demo} ${s.row}`}><button role="switch" aria-checked={enabled} aria-label="Enable notifications" className={`${s.switch} ${enabled?s.on:''} ${s[variant]}`} onClick={()=>setEnabled(!enabled)}><span/></button><div><div style={{fontSize:13}}>Notifications</div><small className={s.muted}>{enabled?'Enabled':'Disabled'}</small></div></div>;
}

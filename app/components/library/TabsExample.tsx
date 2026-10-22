'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TabsExample.module.css';
export default function TabsExample({variant='underline'}:{variant?:string}){
const [tab,setTab]=useState('Overview');const id=useId();return <div className={s.demo}><div role="tablist" className={`${s.tabs} ${s[variant]}`} aria-label="Project information">{['Overview','Activity','Settings'].map(x=><button key={x} role="tab" id={id+x} aria-selected={tab===x} aria-controls={id+'panel'} tabIndex={tab===x?0:-1} className={tab===x?s.active:''} onClick={()=>setTab(x)} onKeyDown={e=>{const list=['Overview','Activity','Settings'];const direction=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(direction){e.preventDefault();const next=list[(list.indexOf(tab)+direction+3)%3];setTab(next);document.getElementById(id+next)?.focus()}}}>{x}</button>)}</div><div role="tabpanel" id={id+'panel'} aria-labelledby={id+tab} className={s.panel} style={{marginTop:16}}><strong style={{fontSize:12}}>{tab}</strong><p className={s.muted}>{tab==='Overview'?'Your project at a glance.':tab==='Activity'?'Your team’s latest updates live here.':'Choose how your project works.'}</p></div></div>;
}

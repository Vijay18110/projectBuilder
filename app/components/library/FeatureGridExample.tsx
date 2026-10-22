'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './FeatureGridExample.module.css';
export default function FeatureGridExample({variant='cards'}:{variant?:string}){
return <div className={`${s.demo} ${s.grid}`}>{[['↗','Built to move','Fast, thoughtful experiences.'],['◈','Make it yours','One connected design system.'],['✓','Ready to grow','Start simple. Go further.']].map(([icon,title,text])=><article key={title} className={`${variant==='cards'?s.panel:''} ${variant==='soft'?s.soft:''}`} style={{padding:12,borderRadius:'var(--radius)'}}><span style={{fontSize:22,color:'var(--primary)'}}>{icon}</span><h3 style={{fontSize:12,margin:'10px 0 5px'}}>{title}</h3><p className={s.muted} style={{margin:0}}>{text}</p></article>)}</div>;
}

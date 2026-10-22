'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TimelineExample.module.css';
export default function TimelineExample({variant='standard'}:{variant?:string}){
return <ol className={`${s.demo} ${s.timeline} ${s[variant]}`}>{[['Project created','Today, 10:24 AM'],['Design approved','Yesterday, 4:10 PM'],['Team invited','12 Oct, 11:00 AM']].map(([title,time],i)=><li key={title}><span className={s.marker}>{i===0?'✓':'•'}</span><div className={variant==='cards'?s.panel:''}><strong style={{fontSize:12}}>{title}</strong><p className={s.muted}>{time} · sample activity</p></div></li>)}</ol>;
}

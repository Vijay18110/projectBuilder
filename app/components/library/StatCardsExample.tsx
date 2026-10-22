'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './StatCardsExample.module.css';
export default function StatCardsExample({variant='standard'}:{variant?:string}){
const [period,setPeriod]=useState('month');return <article className={`${s.demo} ${s.panel} ${s[variant]}`}><div className={s.row} style={{justifyContent:'space-between'}}><span className={s.muted}>Total revenue</span><button className={s.button} style={{padding:'3px 8px',fontSize:10}} onClick={()=>setPeriod(period==='month'?'week':'month')}>This {period} ⌄</button></div><h3 style={{fontSize:30,letterSpacing:'-.05em',margin:'12px 0'}}>{period==='month'?'₹84,250':'₹19,480'}</h3><span className={s.badge}>↗ {period==='month'?'18.4':'8.2'}%</span> <small className={s.muted}>vs previous {period} · sample</small></article>;
}

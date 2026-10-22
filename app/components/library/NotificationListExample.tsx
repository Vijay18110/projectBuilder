'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './NotificationListExample.module.css';
export default function NotificationListExample({variant='standard'}:{variant?:string}){
const [read,setRead]=useState(false);return <div className={`${s.demo} ${s.stack}`}><div className={s.row} style={{justifyContent:'space-between'}}><strong style={{fontSize:12}}>Notifications</strong><button className={s.link} onClick={()=>setRead(!read)}>{read?'Reset preview':'Mark all read'}</button></div>{['Design review is ready','Your export is complete','Welcome to your workspace'].map((x,i)=><div key={x} className={`${s.notice} ${variant==='soft'?s.soft:''}`} style={{opacity:read?.6:1}}><span aria-hidden="true" className={s.indicator} style={{visibility:read?'hidden':'visible'}}/><div><strong style={{fontSize:11}}>{x}</strong><p className={s.muted} style={{margin:'4px 0 0'}}>{i+1} hours ago · example</p></div></div>)}</div>;
}

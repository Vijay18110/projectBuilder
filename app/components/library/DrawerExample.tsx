'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './DrawerExample.module.css';
export default function DrawerExample({variant='right'}:{variant?:string}){
const ref=useRef<HTMLDialogElement>(null);return <div className={s.demo}><button className={s.button} onClick={()=>ref.current?.showModal()}>Open {variant} panel →</button><dialog ref={ref} className={`${s.drawer} ${s[variant]}`} aria-label="Example settings drawer" onClick={e=>{if(e.target===e.currentTarget)ref.current?.close()}}><div className={s.row} style={{justifyContent:'space-between'}}><h3 className={s.title}>Quick settings</h3><button aria-label="Close drawer" className={s.button} onClick={()=>ref.current?.close()}>×</button></div><p className={s.muted}>Context stays close, without leaving the page.</p><label className={s.label}>Display name<input className={s.input} defaultValue="My workspace"/></label><button className={`${s.button} ${s.primary}`} style={{marginTop:20}} onClick={()=>ref.current?.close()}>Done</button></dialog></div>;
}

'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './DividerExample.module.css';
export default function DividerExample({variant='simple'}:{variant?:string}){
return <div className={`${s.demo} ${s.stack}`}><span className={s.muted}>Continue with your account</span><div className={`${s.divider} ${s[variant]}`}>{variant==='labeled'&&<span>or continue with email</span>}</div><span className={s.muted}>A clear separation between choices</span></div>;
}

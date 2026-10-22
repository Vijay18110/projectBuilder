'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TypographyExample.module.css';
export default function TypographyExample({variant='standard'}:{variant?:string}){
return <div className={`${s.demo} ${s[variant]}`}><span className={s.eyebrow}>THE NEXT CHAPTER</span><h3 className={s.heading}>Ideas deserve<br/>a beautiful home.</h3><p className={s.muted}>Readable type brings clarity to every screen. Your selected font and scale apply here.</p><span className={s.badge}>Aa · 0123456789</span></div>;
}

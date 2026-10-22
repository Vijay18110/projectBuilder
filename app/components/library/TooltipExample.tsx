'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TooltipExample.module.css';
export default function TooltipExample({variant='dark'}:{variant?:string}){
const id=useId();return <div className={`${s.demo} ${s.tipWrap}`}><button className={s.button} aria-describedby={id}>Hover or focus me ⓘ</button><span role="tooltip" id={id} className={`${s.tip} ${s[variant]}`}>A little context goes a long way.</span></div>;
}

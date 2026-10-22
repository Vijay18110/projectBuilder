'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './IconWrapperExample.module.css';
export default function IconWrapperExample({variant='rounded'}:{variant?:string}){
return <div className={`${s.demo} ${s.row}`}>{['✦','↗','✓','♡'].map((x,i)=><span key={x} aria-hidden="true" className={`${s.icon} ${s[variant]}`} style={{width:32+i*5,height:32+i*5,fontSize:17+i*2}}>{x}</span>)}</div>;
}

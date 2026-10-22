'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './AvatarsExample.module.css';
export default function AvatarsExample({variant='circle'}:{variant?:string}){
return <div className={`${s.demo} ${s.row}`}>{(variant==='group'?['VR','OR','PB','LS']:['VR','OR','PB']).map((x,i)=><span key={x} className={s.avatar} style={{borderRadius:variant==='rounded'?'var(--radius)':'50%',marginLeft:variant==='group'&&i?-16:0,background:i%2?'color-mix(in srgb,var(--accent) 18%,var(--surface))':'color-mix(in srgb,var(--primary) 15%,var(--surface))'}} aria-label={['Vijay Raj','Olivia Rhye','Phoenix Baker','Lana Steiner'][i]}>{x}<span className={s.status}/></span>)}{variant==='group'&&<span className={s.muted}>+8 teammates</span>}</div>;
}

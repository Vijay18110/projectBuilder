'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './SkeletonExample.module.css';
export default function SkeletonExample({variant='card'}:{variant?:string}){
return <div className={`${s.demo} ${s.stack}`} role="status" aria-label="Loading content">{variant==='card'&&<div className={s.block} style={{height:85}}/>}{(variant==='list'?[1,2,3]:[1,2]).map(i=><div key={i} className={s.row} style={{flexWrap:'nowrap'}}>{variant==='list'&&<div className={s.block} style={{width:34,height:34,borderRadius:'50%',flexShrink:0}}/>}<div className={s.stack} style={{width:'100%',gap:8}}><div className={s.block} style={{height:10,width:'75%'}}/><div className={s.block} style={{height:8,width:'50%'}}/></div></div>)}</div>;
}

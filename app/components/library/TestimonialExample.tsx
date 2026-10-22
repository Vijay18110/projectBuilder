'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TestimonialExample.module.css';
export default function TestimonialExample({variant='standard'}:{variant?:string}){
const [index,setIndex]=useState(0);const quotes=[['“The little details make a big difference. Our team finally has a workspace that feels like us.”','Olivia Rhye','Design lead'],['“A thoughtful foundation that lets us focus on the product instead of starting from scratch.”','Phoenix Baker','Engineering lead']];return <figure className={`${s.demo} ${variant==='bordered'?s.panel:variant==='soft'?s.soft:''}`} style={{margin:0,padding:18,borderRadius:'var(--radius)'}}><span style={{color:'var(--primary)',fontSize:13}} aria-label="5 out of 5 stars">★★★★★</span><blockquote style={{fontSize:14,lineHeight:1.7,margin:'14px 0'}}>{quotes[index][0]}</blockquote><figcaption><strong style={{fontSize:11}}>{quotes[index][1]}</strong><p className={s.muted}>{quotes[index][2]} · fictional example</p></figcaption><button className={s.button} onClick={()=>setIndex((index+1)%2)}>Next story →</button></figure>;
}

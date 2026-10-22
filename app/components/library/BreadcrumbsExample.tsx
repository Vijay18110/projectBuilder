'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './BreadcrumbsExample.module.css';
export default function BreadcrumbsExample({variant='chevron'}:{variant?:string}){
const [current,setCurrent]=useState('Components');return <nav aria-label="Breadcrumb" className={`${s.demo} ${s.row}`} style={{gap:7}}>{['Home','Library','Components'].map((x,i)=><span key={x} className={s.row} style={{gap:7}}>{i>0&&<span className={s.muted} aria-hidden="true">{variant==='slash'?'/':'›'}</span>}<button aria-current={current===x?'page':undefined} className={`${s.crumb} ${variant==='pills'?s.badge:''}`} style={{color:current===x?'var(--primary)':undefined}} onClick={()=>setCurrent(x)}>{x}</button></span>)}</nav>;
}

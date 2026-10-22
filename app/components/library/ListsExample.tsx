'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './ListsExample.module.css';
export default function ListsExample({variant='standard'}:{variant?:string}){
const [selected,setSelected]=useState('Design files');return <div className={`${s.demo} ${variant==='bordered'?s.panel:''}`} role="group" aria-label="Workspace folders">{['Design files','Brand assets','Project notes'].map((x,i)=><button key={x} className={`${s.item} ${selected===x?s.selected:''} ${variant==='soft'?s.soft:''}`} onClick={()=>setSelected(x)} aria-pressed={selected===x}><span>▧ {x}</span><span className={s.muted}>{[12,8,4][i]} →</span></button>)}</div>;
}

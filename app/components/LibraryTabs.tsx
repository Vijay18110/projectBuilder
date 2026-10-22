'use client';
import {useId} from 'react';
import s from './LibraryTabs.module.css';

type Option={value:string;label:string;count?:number};
export default function LibraryTabs({label,options,value,onChange,panelId,idPrefix}:{label:string;options:Option[];value:string;onChange:(value:string)=>void;panelId:string;idPrefix?:string}){
 const generated=useId();const prefix=idPrefix||generated;
 return <div className={s.tabs} role="tablist" aria-label={label} onKeyDown={event=>{
  if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  event.preventDefault();const current=options.findIndex(option=>option.value===value);
  const next=event.key==='Home'?0:event.key==='End'?options.length-1:(current+(event.key==='ArrowRight'?1:-1)+options.length)%options.length;
  onChange(options[next].value);
  event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
 }}>
  {options.map(option=><button type="button" role="tab" id={prefix+'-'+encodeURIComponent(option.value)} key={option.value} aria-selected={value===option.value} aria-controls={panelId} tabIndex={value===option.value?0:-1} className={value===option.value?s.active:''} onClick={()=>onChange(option.value)}>{option.label}{option.count!==undefined&&<span>{option.count}</span>}</button>)}
 </div>;
}

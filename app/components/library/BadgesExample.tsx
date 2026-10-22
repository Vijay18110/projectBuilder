'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './BadgesExample.module.css';
export default function BadgesExample({variant='soft'}:{variant?:string}){
const [tags,setTags]=useState(['Design','React','New']);return <div className={`${s.demo} ${s.row}`}>{tags.map(x=><span key={x} className={`${s.badge} ${s[variant]}`}>{x}<button aria-label={'Remove '+x+' tag'} className={s.remove} onClick={()=>setTags(tags.filter(t=>t!==x))}>×</button></span>)}{tags.length<3&&<button className={s.button} onClick={()=>setTags(['Design','React','New'])}>Reset tags</button>}</div>;
}

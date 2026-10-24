'use client';
import {useEffect,useState} from 'react';
import s from './ThemePanel.module.css';
export default function ThemeColorField({label,description,value,onChange}:{label:string;description:string;value:string;onChange:(value:string)=>void}){
 const [hex,setHex]=useState(value),[error,setError]=useState(false);
 useEffect(()=>{setHex(value);setError(false)},[value]);
 function update(raw:string){setHex(raw);if(/^#[0-9a-f]{6}$/i.test(raw)){onChange(raw.toLowerCase());setError(false)}}
 return <div className={s.color}><div className={s.colorLabel}><strong>{label}</strong><small>{description}</small></div><div className={s.colorValue}><input aria-label={label} type="color" value={value} onChange={e=>onChange(e.target.value)}/><input className={s.hex} aria-label={label+' hex'} aria-invalid={error} value={hex} spellCheck={false} maxLength={7} onChange={e=>update(e.target.value)} onBlur={()=>setError(!/^#[0-9a-f]{6}$/i.test(hex))} onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur();if(e.key==='Escape'){setHex(value);setError(false)}}}/></div>{error&&<small className={s.colorError} role="alert">Use a color like #6258E8.</small>}</div>
}

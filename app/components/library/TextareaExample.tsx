'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './TextareaExample.module.css';
export default function TextareaExample({variant='outline'}:{variant?:string}){
const [text,setText]=useState('');return <div className={s.demo}><label className={s.label}>Description<textarea className={`${s.input} ${s[variant]}`} rows={3} maxLength={200} value={text} onChange={e=>setText(e.target.value)} placeholder="Tell us about your project…"/></label><div className={s.muted} style={{textAlign:'right'}}>{text.length}/200</div></div>;
}

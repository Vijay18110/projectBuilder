'use client';
import {useState,useRef,useEffect,useId} from 'react';
import s from './QuantityExample.module.css';
export default function QuantityExample({variant='outline'}:{variant?:string}){
const [quantity,setQuantity]=useState(1);return <div className={`${s.demo} ${s.stack}`}><div className={`${s.counter} ${s[variant]}`}><button aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(quantity-1)}>−</button><span aria-live="polite">{quantity}</span><button aria-label="Increase quantity" disabled={quantity>=10} onClick={()=>setQuantity(quantity+1)}>＋</button></div><span className={s.muted}>₹{(quantity*2499).toLocaleString('en-IN')} total · up to 10 items</span></div>;
}
